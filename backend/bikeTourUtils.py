from sklearn.preprocessing import StandardScaler
from sklearn.cluster import KMeans
from sklearn.cluster import DBSCAN
from urllib.parse import unquote
from datetime import datetime
from typing import List
import pandas as pd
import numpy as np
import requests
import json
import time
import ast


def haversine_np(lon1: float, lat1: float, lon2: float, lat2: float) -> np.array:

    """
    - 좌표 활용 거리구하는 공식을 numpy로 구현했다.
    """
    lon1, lat1, lon2, lat2 = map(np.radians, [lon1, lat1, lon2, lat2])

    dlon = lon2 - lon1
    dlat = lat2 - lat1

    a = np.sin(dlat / 2.0) ** 2 + np.cos(lat1) * np.cos(lat2) * np.sin(dlon / 2.0) ** 2

    c = 2 * np.arcsin(np.sqrt(a))
    m = 6367 * c * 1000
    return m


def near_500m(coor: List) -> pd.DataFrame:

    """
    - haversine을 이용, 현재 위치 반경 500m 내 대여소 정보를 불러온다.
    """

    station = pd.read_csv(
        "backend/assets/bikeTour/seoul_bike_station_01_12.csv",
        encoding="CP949",
        index_col=0,
    )
    print("station")
    btstation_info = pd.read_csv(
        "backend/assets/bikeTour/bkstation_info(backup).csv",
        encoding="CP949",
        index_col=0,
    )

    # 거리 계산
    dist = haversine_np(coor[0], coor[1], station["latitude"], station["longtitude"])

    station["dist"] = dist

    # 500m 이내 대여소 제거
    st_id = station[station["dist"] <= 500].reset_index(drop=False)["st_id"]

    result = btstation_info[btstation_info.value.isin(st_id.tolist())]

    return result


def btweather():
    """
    - 기상청 날씨 API를 활용해 날씨 데이터를 불러온다.
    """
    url = "http://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getUltraSrtFcst"
    datenow = datetime.now().strftime("%Y%m%d")
    hournow = datetime.now().strftime("%H") + "00"
    # requests에선 %를 %25로 변환한다. 이를 막기 위해 unquote를 사용한다.
    key = unquote(
        "kweaR5p7XFQ3hpE2XziQSArbOXvFHfhOyD46cjNj1ntsPN%2B5agxteHVt6nU5Ur0OBxaVAlQYNMx9q8wEBMOdLw%3D%3D"
    )
    params = {
        "serviceKey": key,
        "pageNo": "1",
        "numOfRows": "60",
        "dataType": "JSON",
        "base_date": datenow,
        "base_time": hournow,
        "nx": "57",
        "ny": "127",
    }

    response = requests.get(url, params=params)

    result = response.content
    val = result.decode("utf-8")
    val = ast.literal_eval(val)
    result = val["response"]["body"]["items"]["item"]
    return result


class bikeRecommandation:
    def __init__(
        self, btstation: pd.DataFrame, seoul_bike: pd.DataFrame, station: pd.DataFrame
    ):
        self.btstation = btstation
        self.seoul_bike = seoul_bike
        self.station = station

    def _extractRentalRecord(self, st_id: int) -> pd.DataFrame:
        """
        - 대여소 id를 입력하면 Raw Data에서 해당 대여소의 대여기록을 추출한다.
        - 모든 작업은 extractRentalRecord를 통해 특정 대여소의 기록을 추출한 다음 시작된다.
        """

        # 대여소가 출발지, 목적지인 경우 둘 다 고려
        quert_st_id1 = self.seoul_bike[self.seoul_bike["st_id1"] == st_id]
        quert_st_id2 = self.seoul_bike[self.seoul_bike["st_id2"] == st_id]

        # 중복된 대여기록 제거
        filtered_data = pd.concat(
            [quert_st_id1, quert_st_id2], axis=0
        ).drop_duplicates()
        filtered_data.drop(columns="index", inplace=True)
        bm = (filtered_data["st_id1"] == st_id) & (filtered_data["st_id2"] == st_id)
        filtered_data = filtered_data[~bm]

        return filtered_data

    def _filterIn1000M(self, id: int) -> pd.DataFrame:
        """
        - 출발 대여소 인근 1000m 내 대여소를 검색한다.
        - 1000m 이내 대여소를 사용자에게 추천하는건 불필요하다.
        - filterconditionOne에서 사용된다.
        """

        k = self.station[self.station["st_id"] == id]
        tLong = k["longtitude"].values
        tLat = k["latitude"].values
        bLong = self.station["longtitude"]
        bLat = self.station["latitude"]
        dist = haversine_np(tLong, tLat, bLong, bLat)

        subInfoCopy = self.station.copy()
        subInfoCopy["dist"] = dist
        bikeSort = subInfoCopy[(dist < 1000)]

        return bikeSort

    def _calculateBikeRate(self, id1: int, id2: int, rawData) -> pd.Series:
        """
        - A 대여소에서 B 대여소로 이동 기록과 그 반대인 B 대여소에서 A 대여소로 이동 기록을 비율료 표현
        - 양변에 log2를 취함으로서 양수는 A -> B 이동이 많음 / 음수는 그 반대를 의미함.
        - rate > 0 A 대여소에서 B 대여소의 이동 기록이 그 반대의 경우보다 많음
        - rate = 0 A 대여소에서 B 대여소의 이동 기록과 그 반대의 기록이 동일함
        - rate < 0 A 대여소에서 B 대여소의 이동 기록이 그 반대의 경우보다 적음
        - ratr가 -1 이하인 경우 필터링하기
          (비율이 2배 이상되는 경우 A -> B의 경로를 이동하기 어렵다고 판단.)
        """
        k = rawData[(rawData["st_id1"] == id1) & (rawData["st_id2"] == id2)]  # 주 목적
        kk = rawData[(rawData["st_id1"] == id2) & (rawData["st_id2"] == id1)]  # 비교 목적
        if len(k) and len(kk):
            rate = np.log2(len(k) / len(kk))
            if rate > -1:
                return k

    def _filterConditionOne(self, id1: int, rawData) -> np.array:
        """
        1. 1000m 이하의 대여소를 제거한다.
        - 1000m 이내 대여소를 사용자에게 추천하는건 필요하지 않으므로 제거한다.

        2. 최소 대여기비율 선정해 불필요한 대여소를 필터링한다.
        - 대여소 하나당 300~1000개 대여소와 교류가 있다.
        - BUT 특정 대여소의 90%의 대여기록이 특정 대여소에서 발생한다.
        - 여의나루 대여소의 경우 약 1200개 대여소와 교류하고
          총 20만 건의 대여기록이 있지만 약 100개의 대여소에서 18만건의 대여가 발생한다.
        - 따라서 전체 대여기록의 0.1% 이하인 대여소는 삭제한다.

        3. A -> B 대여기록과 B -> A 대여기록의 비율 차를 계산해 대여소를 제거한다.

        """
        # 조건 1 1000m 이하에 위치한 대여소를 제거한다.
        id2List = self._filterIn1000M(id1)["st_id"].to_numpy()
        # 조건 2 : 대여기록 0.1% 이상
        id1Value = rawData["st_id2"].value_counts()[1:]
        id1List = id1Value[id1Value > int(len(rawData) * 0.001)].index.to_numpy()

        # 조건 3 : 비율 2배 이상 제거
        filteredidx = id1List[~(np.in1d(id1List, id2List))]
        result = [self._calculateBikeRate(id1, id2, rawData) for id2 in filteredidx]

        returnValue: np.array = (
            pd.concat(result)["st_id2"].value_counts().index.to_numpy()
        )
        return returnValue

    # def _calculateDistAndTime(self, st_id: int) -> pd.DataFrame:
    #     """
    #     대여소의 예상 시간과 거리를 DBSCAN으로 계산한다.
    #     DBSCAN을 적용하기 위한 가설은 '대여기록의 상당수가 출발 대여소에서
    #     도착대여소까지 이동을 목적으로한다'이다. 따릉이를 이용하다보면 다른 곳에 잠시 들리거나
    #     가까운 길 대신 일부러 돌아 가는 경우가 있다. 대여기록에는 이러한 경우가 모두 포함되다 보니
    #     평균 이동시간이나 이동거리를 에상하기 어렵다. DBSCAN을 활용해 가장 크게 뭉쳐져있는(가장 빈도수가 많은)
    #     집단을 찾고 평균으로 계산한다.

    #     """
    #     rawRentalData = self._extractRentalRecord(st_id)

    #     # 대여소 idx 추출
    #     station_id = self._filterConditionOne(st_id, rawRentalData).tolist()

    #     result = self.station[self.station["st_id"].isin(station_id)].reset_index(
    #         drop=True
    #     )
    #     result_station = []
    #     for j in result["st_id"]:
    #         # 예상시간 계산
    #         BM = rawRentalData["st_id2"] == j

    #         all_rent = (
    #             rawRentalData[BM]["riding_time"]
    #             .value_counts()
    #             .sort_values(ascending=False)
    #         )

    #         ### 대여기록
    #         total_record = all_rent.sum()

    #         k = []
    #         i = 2
    #         ### 기록 많은 순만 종합
    #         while len(k) < 1:
    #             k = all_rent[all_rent >= (total_record / i)]
    #             i = i * 1.5

    #         ### 대여시간
    #         ind = k.index

    #         ### 대여기록
    #         val = k.values

    #         ### 대여기록 합
    #         a = k.sum()

    #         ### 대여시간 * 대여기록
    #         asddd = sum([a * b for a, b in zip(ind, val)])

    #         # 평균 시간
    #         ddddd = asddd / a

    #         # 올림
    #         val = round(ddddd, 0)

    #         ### 이동거리 계산
    #         BM = rawRentalData["st_id2"] == j
    #         all_rent = (
    #             rawRentalData[BM]["dist"].value_counts().sort_values(ascending=False)
    #         )

    #         dist = (
    #             pd.cut(all_rent.index, bins=50)
    #             .value_counts()
    #             .sort_values(ascending=False)
    #         )
    #         # 상위 3개 값을 평균냄. mid는 pd.interval 매서드에서 쓰는 변수임.
    #         num = 3
    #         vals = [dist[:num].index[a].mid * dist.iloc[a] for a in range(num)]
    #         avg_dist = sum(vals) / sum(dist.to_list()[:num])
    #         result_station.append([val, total_record, (round(avg_dist / 1000, 2))])

    #     # 결과 종합
    #     df = pd.DataFrame(result_station)

    #     # haversineDist 계산
    #     dep = self.station[self.station["st_id"].isin([st_id])]
    #     arr = result

    #     depLong = dep["longtitude"].values
    #     depLat = dep["latitude"].values
    #     arrLong = arr["longtitude"]
    #     arrLat = arr["latitude"]

    #     dist = haversine_np(depLong, depLat, arrLong, arrLat)
    #     dist = pd.DataFrame(round(dist / 1000, 2), columns=["haversineDist"])

    #     # 데이터 종합
    #     data = pd.concat([result, df, dist], axis=1)
    #     data.columns = [
    #         "st_id",
    #         "st_name",
    #         "district",
    #         "latitude",
    #         "longtitude",
    #         "num",
    #         "elevation",
    #         "ridingTime",
    #         "record",
    #         "ridingDist",
    #         "haversineDist",
    #     ]
    #     data = data[data["st_id"] != st_id]
    #     return data

    def _CalNaNDistAndTime(self, id, filtered_data):
        # 예상시간 계산
        all_rent = (
            filtered_data["riding_time"].value_counts().sort_values(ascending=False)
        )

        ### 대여기록
        total_record = all_rent.sum()

        k = []
        i = 2
        ### 기록 많은 순만 종합
        while len(k) < 1:
            k = all_rent[all_rent >= (total_record / i)]
            i = i * 1.5

        ### 대여시간
        ind = k.index

        ### 대여기록
        val = k.values

        ### 대여기록 합
        a = k.sum()

        ### 대여시간 * 대여기록
        asddd = sum([a * b for a, b in zip(ind, val)])

        # 평균 시간
        ddddd = asddd / a

        # 올림
        val = round(ddddd, 0)

        ### 이동거리 계산
        all_rent = filtered_data["dist"].value_counts().sort_values(ascending=False)

        dist = (
            pd.cut(all_rent.index, bins=50).value_counts().sort_values(ascending=False)
        )
        # 상위 3개 값을 평균냄. mid는 pd.interval 매서드에서 쓰는 변수임.
        num = 3
        vals = [dist[:num].index[a].mid * dist.iloc[a] for a in range(num)]
        avg_dist = sum(vals) / sum(dist.to_list()[:num])

        return [id, val, (round(avg_dist / 1000, 2)), total_record]

    def _calculateDistAndTime(self, st_id: int) -> pd.DataFrame:
        """
        대여소의 예상 시간과 거리를 DBSCAN으로 계산한다.
        DBSCAN을 적용하기 위한 가설은 '대여기록의 상당수가 출발 대여소에서
        도착대여소까지 이동을 목적으로한다'이다. 따릉이를 이용하다보면 다른 곳에 잠시 들리거나
        가까운 길 대신 일부러 돌아 가는 경우가 있다. 대여기록에는 이러한 경우가 모두 포함되다 보니
        평균 이동시간이나 이동거리를 에상하기 어렵다. DBSCAN을 활용해 가장 크게 뭉쳐져있는(가장 빈도수가 많은)
        집단을 찾고 평균으로 계산한다.

        """
        std = StandardScaler()

        # 대여소 idx 추출
        filtered_data = self._extractRentalRecord(st_id)
        station_id = self._filterConditionOne(st_id, filtered_data).tolist()
        st_id1_only = filtered_data[filtered_data["st_id1"] == st_id]
        finish = []
        for id in station_id:
            df_raw = st_id1_only[st_id1_only["st_id2"] == id][["riding_time", "dist"]]
            df_std = pd.DataFrame(
                std.fit_transform(df_raw.values.tolist()),
                columns=["riding_time", "dist"],
            )

            db = DBSCAN(eps=0.05).fit(df_std.values.tolist())
            df_raw["label"] = db.labels_
            sr_time = df_raw[df_raw["label"] == 0]["riding_time"].value_counts()
            sr_dist = df_raw[df_raw["label"] == 0]["dist"].value_counts()
            if sr_dist.empty == False:
                time = np.round(np.array(sr_time.index).dot(sr_time) / sum(sr_time), 1)
                dist = np.round(
                    np.array(sr_dist.index).dot(sr_dist) / (sum(sr_dist) * 1000), 1
                )
                finish.append([id, time, dist, len(df_raw)])
            else:
                finish.append(self._CalNaNDistAndTime(id, df_raw))

        result = self.station[self.station["st_id"].isin(station_id)].reset_index(
            drop=True
        )

        df = pd.DataFrame(finish, columns=["id", "ridingTime", "ridingDist", "record"])
        result = result.merge(df, left_on="st_id", right_on="id")

        # haversineDist 계산
        dep = self.station[self.station["st_id"].isin([st_id])]
        arr = result

        depLong = dep["longtitude"].values
        depLat = dep["latitude"].values
        arrLong = arr["longtitude"]
        arrLat = arr["latitude"]

        dist = haversine_np(depLong, depLat, arrLong, arrLat)
        dist = pd.DataFrame(round(dist / 1000, 2), columns=["haversineDist"])

        # 데이터 종합
        data = pd.concat([result, dist], axis=1).drop(columns=["id"])

        return data

    def extractStations(self, id: str) -> pd.DataFrame:
        """
        - 실제로 대여소를 추출하는 하수
        - KMeans Clustering을 2차에 걸쳐서 진행한다.
        - 중복된 대여소를 제거하고 다양한 거리와 다양한 방향에 위치한 대여소를 추출한다.
        """

        # 필터링 된 Station 불러오기
        filteredStation = self._calculateDistAndTime(id)

        # 최대 거리
        maxDist = int(filteredStation["haversineDist"].max())

        resultfinish = []
        for i in range(1, maxDist + 1, 1):
            # 거리별로 나누기
            dist = filteredStation[
                (filteredStation["haversineDist"] >= i)
                & (filteredStation["haversineDist"] < i + 1)
            ]
            val = filteredStation.copy()[
                filteredStation["st_id"].isin(dist["st_id"].tolist())
            ]

            # 거리별 index 추가
            val["distLabel"] = i

            if len(val) > 5:
                # 좌표 추출
                coor = val[["latitude", "longtitude"]].values

                # kmeans 1차
                kmeans = KMeans(n_clusters=5, random_state=42)
                kmeans.fit_transform(coor)
                newK = val.copy()
                newK["label"] = kmeans.labels_
                newK = newK.sort_values(by="record", ascending=False)

                # Kmeans 2차
                result_under = []
                for j in range(5):
                    test12 = newK[newK["label"] == j][["latitude", "longtitude"]]

                    # Cluster = 5
                    if len(test12) >= 25:
                        test = KMeans(n_clusters=5)
                        test.fit(test12)
                        test12["label2"] = test.labels_

                    # Cluster = 1 ~ 4
                    elif len(test12) >= 1:
                        test = KMeans(n_clusters=int(len(test12) / 5 + 1))
                        test.fit(test12)
                        test12["label2"] = test.labels_

                    else:
                        test12["label2"] = 99

                    # 상위 2개만 추출
                    result = []
                    for k in range(int(len(test12) / 2) + 1):
                        v = test12[test12["label2"] == k]
                        v = v.iloc[:1]
                        result.extend(v.index.tolist())

                    # Append Items
                    newcoor = newK[newK.index.isin(result)]
                    result_under.append(newcoor)

                resultfinish.extend(result_under)

            # 5개 미만은 그냥 넣기
            else:
                val["label"] = 999
                resultfinish.append(val)

        # 종합
        result = pd.concat(resultfinish).drop_duplicates(subset="st_id")

        # frontend에 맞게 dataframe 변형
        result["coor"] = result[["latitude", "longtitude"]].values.tolist()
        result = result[
            ["st_id", "st_name", "coor", "num", "ridingTime", "record", "ridingDist"]
        ]
        result.columns = "value", "label", "coor", "num", "time", "record", "dist"

        minmax = dict(
            mintime=result["time"].min(),
            maxtime=result["time"].max(),
            minrecord=result["record"].min(),
            maxrecord=result["record"].max(),
            mindist=result["dist"].min(),
            maxdist=result["dist"].max(),
        )
        return result, minmax

    def route_coor(
        self,
        dep_st: list,
        arr_st: list,
    ) -> List:
        """
        - tmap API를 활용해 자전거 경로를 추출한다.
        """

        if type(dep_st) == str:
            dep_st = ast.literal_eval(dep_st)
        if type(arr_st) == str:
            arr_st = ast.literal_eval(arr_st)

        for i in range(3):
            url = "https://apis.openapi.sk.com/tmap/routes/pedestrian?version=1"

            payload = {
                "angle": 0,
                "speed": 0,
                "reqCoordType": "WGS84GEO",
                "searchOption": "0",
                "resCoordType": "WGS84GEO",
                "sort": "index",
                "startX": dep_st[1],
                "startY": dep_st[0],
                "endX": arr_st[1],
                "endY": arr_st[0],
                "startName": "출발",
                "endName": "도착",
            }
            headers = {
                "Accept": "application/json",
                "Content-Type": "application/json",
                "appKey": "l7xxfdc75c1509a74ecdba02bf5e024ee9d5",
            }

            response = requests.post(url, json=payload, headers=headers).text

            api_data = json.loads(response).get("features")
            if api_data != None:
                time.sleep(0.3)
                break
            print("!!!!!!!!!!!!!", api_data, f"{i+1} 회 시도중")

        coor_raw_data = [
            api_data[i].get("geometry").get("coordinates")
            for i in range(0, len(api_data))
        ]

        finish_data = []
        for data in coor_raw_data:
            # data = api_data[1].get('geometry').get('coordinates')
            if type(data[0]) == list:
                for i in data:
                    finish_data.append(i)
            else:
                pass
        # 끝
        return pd.DataFrame(finish_data)[[1, 0]].values  ## 위도 경도 위치 바꾸기
