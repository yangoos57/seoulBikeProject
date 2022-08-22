import json
import requests
import pandas as pd
import numpy as np
import ast
import time
from typing import List
from datetime import datetime
from urllib.parse import unquote


def bthaversine_np(coor1: List[int], coor2: List[int]) -> np.array:

    """
    - 좌표 활용 거리구하는 공식을 numpy로 구현했다.
    """

    lon1 = coor1[0]
    lat1 = coor1[1]
    lon2 = coor2[0]
    lat2 = coor2[1]

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
    print("btstation_info")
    station[["latitude", "longtitude"]].T.values

    # 거리 계산
    dist = bthaversine_np(coor, station[["latitude", "longtitude"]].T.values)

    station["dist"] = dist

    # 500m 이내 대여소 제거
    st_id = station[station["dist"] <= 500].reset_index(drop=False)["st_id"]

    result = btstation_info[btstation_info.value.isin(st_id.tolist())]

    return result


class bike_recommendation:
    def __init__(
        self, btstation: pd.DataFrame, seoul_bike: pd.DataFrame, station: pd.DataFrame
    ):
        self.btstation = btstation
        self.seoul_bike = seoul_bike
        self.station = station

    def extractRentRecord(self, st_id: int) -> pd.DataFrame:
        """
        - 대여소 id를 입력하면 Raw Data에서 해당 대여소의 대여기록을 추출한다.
        - 모든 작업은 extractRentRecord를 통해 특정 대여소의 기록을 추출한 다음 시작된다.
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

    def filterBikeRate(self, id1: int, id2: int, rawData) -> pd.Series:
        """
        - A 대여소에서 B 대여소로 이동 기록과 그 반대인 B 대여소에서 A 대여소로 이동 기록을 비율료 표현
        - rate > 1 A 대여소에서 B 대여소의 이동 기록이 그 반대의 경우보다 많음
        - rate = 1 A 대여소에서 B 대여소의 이동 기록과 그 반대의 기록이 동일함
        - rate < 1 A 대여소에서 B 대여소의 이동 기록이 그 반대의 경우보다 적음
        - 비율이 최소 0.8 이상인 경우만 필터링하기(그보다 작은 경우 A -> B의 경로가 이동하기 어렵다고 생각할 수 있음)
        """
        k = rawData[(rawData["st_id1"] == id1) & (rawData["st_id2"] == id2)]  # 주 목적
        kk = rawData[(rawData["st_id1"] == id2) & (rawData["st_id2"] == id1)]  # 비교 목적
        if len(k) and len(kk):
            rate = len(k) / len(kk)
            if rate > 0.8:
                return k

    def filterIn1000M(self, id: int) -> pd.DataFrame:
        """
        - 출발 대여소 인근 1000m 대여소를 검색한다.
        - 1000m 이내 대여소를 사용자에게 추천하는건 불필요하다.
        - filterconditions에서 사용된다.
        """
        k = self.station[self.station.index == id]
        dist = bthaversine_np(
            k[["longtitude", "latitude"]].T.values,
            self.station[["longtitude", "latitude"]].T.values,
        )

        subInfoCopy = self.station.copy()
        subInfoCopy["dist"] = dist
        bikeSort = subInfoCopy[(dist < 1000)]

        return bikeSort

    def filterConditions(self, id1: int, rawData) -> np.array:
        """
        조건 1 최소 대여기록을 선정해 불필요한 대여소를 필터링한다.
        - 대여소 하나당 300~1000개 대여소와 교류가 있다.
        - BUT 특정 대여소의 90%의 대여기록이 특정 대여소에서 발생한다.
        - 여의나루 대여소의 경우 약 1200개 대여소와 교류하고
          총 20만 건의 대여기록이 있지만 약 100개의 대여소에서 18만건의 대여가 발생한다.
        - 따라서 최소 대여기록을 선정해 해당 기록 이하의 대여소를 제거한다.

        조건 2 1000m 이하의 대여소를 제거한다.

        """
        # 조건 1 최소 대여기록을 선정해 불필요한 대여소를 필터링한다.
        if len(rawData) > 100000:
            limit = 100
        elif len(rawData) > 50000:
            limit = 50
        elif len(rawData) > 25000:
            limit = 30
        else:
            limit = 20

        id1Value = rawData["st_id2"].value_counts()[1:]
        id1List = id1Value[id1Value > limit].index.to_numpy()
        id2List = self.filterIn1000M(id1).index.to_numpy()
        filteredidx = id1List[~np.in1d(id1List, id2List)]

        # 조건 2 1000m 이하의 대여소를 제거한다.
        result = [self.filterBikeRate(id1, id2, rawData) for id2 in filteredidx]

        returnValue: np.array = (
            pd.concat(result)["st_id2"].value_counts().index.to_numpy()
        )
        return returnValue

    def arrStation(self, st_id: int) -> pd.DataFrame:
        """
        도착 대여소의 예상 시간 및 거리를 계산하는 함수
        """
        filtered_data = self.extractRentRecord(st_id)

        # 대여소 idx 추출
        station_id = self.filterConditions(st_id, filtered_data).tolist()

        # 대여소 정보 추출
        result = self.btstation.query("value == @station_id").reset_index(drop=True)
        # result = btstation.query("value == @station_id").reset_index(drop=True)

        result_station = []
        for j in result["value"]:
            # 예상시간 계산
            BM = filtered_data["st_id2"] == j
            all_rent = (
                filtered_data[BM]["riding_time"]
                .value_counts()
                .sort_values(ascending=False)
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
            BM = filtered_data["st_id2"] == j
            all_rent = (
                filtered_data[BM]["dist"].value_counts().sort_values(ascending=False)
            )

            dist = (
                pd.cut(all_rent.index, bins=50)
                .value_counts()
                .sort_values(ascending=False)
            )
            # 상위 3개 값을 평균냄. mid는 pd.interval 매서드에서 쓰는 변수임.
            num = 3
            vals = [dist[:num].index[a].mid * dist.iloc[a] for a in range(num)]
            avg_dist = sum(vals) / sum(dist.to_list()[:num])

            result_station.append([val, total_record, (round(avg_dist / 1000, 2))])

        df = pd.DataFrame(result_station)
        data = pd.concat([result, df], axis=1)
        data.columns = ["value", "label", "coor", "num", "time", "record", "dist"]
        data = data[data["value"] != st_id]

        minmax = dict(
            mintime=data["time"].min(),
            maxtime=data["time"].max(),
            minrecord=data["record"].min(),
            maxrecord=data["record"].max(),
            mindist=data["dist"].min(),
            maxdist=data["dist"].max(),
        )

        return data, minmax

    def btroute_coor(
        self,
        departure_station: list,
        arrival_station: list,
    ) -> List:
        """
        - tmap API를 활용해 자전거 경로를 추출한다.
        """

        if type(departure_station) == str:
            departure_station = ast.literal_eval(departure_station)
        if type(arrival_station) == str:
            arrival_station = ast.literal_eval(arrival_station)

        for i in range(3):
            url = "https://apis.openapi.sk.com/tmap/routes/pedestrian?version=1"

            payload = {
                "angle": 0,
                "speed": 0,
                "reqCoordType": "WGS84GEO",
                "searchOption": "0",
                "resCoordType": "WGS84GEO",
                "sort": "index",
                "startX": departure_station[1],
                "startY": departure_station[0],
                "endX": arrival_station[1],
                "endY": arrival_station[0],
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
