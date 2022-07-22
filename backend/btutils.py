import json
import requests
import pandas as pd
import numpy as np
import ast
import time
from typing import Dict, List
from datetime import datetime
from urllib.parse import unquote


def bthaversine_np(coor1: List[int], coor2: List[int]) -> np.array:

    lon1 = coor1[0]
    lat1 = coor1[1]
    lon2 = coor2[0]
    lat2 = coor2[1]

    """
        Calculate the great circle distance between two points
        on the earth (specified in decimal degrees)

        All args must be of equal length.

        """

    lon1, lat1, lon2, lat2 = map(np.radians, [lon1, lat1, lon2, lat2])

    dlon = lon2 - lon1
    dlat = lat2 - lat1

    a = np.sin(dlat / 2.0) ** 2 + np.cos(lat1) * np.cos(lat2) * np.sin(dlon / 2.0) ** 2

    c = 2 * np.arcsin(np.sqrt(a))
    m = 6367 * c * 1000
    return m


def near_500m(coor: List) -> pd.DataFrame:
    station = pd.read_csv(
        "backend/assets/seoul_bike_station_01_12.csv",
        encoding="CP949",
        index_col=0,
    )
    btstation_info = pd.read_csv(
        "backend/assets/bkstation_info(backup).csv", encoding="CP949", index_col=0
    )

    station[["latitude", "longtitude"]].T.values

    dist = bthaversine_np(coor, station[["latitude", "longtitude"]].T.values)

    station["dist"] = dist

    st_id = station[station["dist"] <= 500].reset_index(drop=False)["st_id"]

    result = btstation_info[btstation_info.value.isin(st_id.tolist())]

    return result


class bike_recommendation:
    def __init__(self, btstation: pd.DataFrame, seoul_bike: pd.DataFrame):
        self.btstation = btstation
        self.seoul_bike = seoul_bike

    def raw_data(self, val: int) -> pd.DataFrame:
        quert_st_id1 = self.seoul_bike[self.seoul_bike["st_id1"] == val]
        quert_st_id2 = self.seoul_bike[self.seoul_bike["st_id2"] == val]
        filtered_data = pd.concat(
            [quert_st_id1, quert_st_id2], axis=0
        ).drop_duplicates()
        filtered_data.drop(columns="index", inplace=True)
        bm = (filtered_data["st_id1"] == val) & (filtered_data["st_id2"] == val)
        filtered_data = filtered_data[~bm]

        return filtered_data

    def arrStation(self, st_id: int) -> Dict:
        # 대여소 추출기록
        filtered_data = self.raw_data(st_id)
        st_id1_record = filtered_data.groupby(by="st_id1").size()
        st_id2_record = filtered_data.groupby(by="st_id2").size()

        all_record = st_id1_record.add(st_id2_record, fill_value=0)

        # 대여기록 50건 이상 총 200개 대여소만 추출하기
        sort_info = all_record[all_record > 50].sort_values(ascending=False)[1:201]
        station_id = sort_info.index.to_list()

        result = self.btstation.query("value == @station_id").reset_index(drop=True)

        result_station = []
        for j in result["value"]:

            # 예상시간 계산
            BM = filtered_data["st_id2"] == j
            st_id1_time = (
                filtered_data[BM]["riding_time"]
                .value_counts()
                .sort_values(ascending=False)
            )
            BM = filtered_data["st_id1"] == j
            st_id2_time = (
                filtered_data[BM]["riding_time"]
                .value_counts()
                .sort_values(ascending=False)
            )
            ### 1to2 걸린시간 + 2to1 걸린시간 합
            all_rent = st_id1_time.add(st_id2_time, fill_value=0)

            ### 1to2 & 2to1 대여기록 합
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
            st_id1_time = (
                filtered_data[BM]["dist"].value_counts().sort_values(ascending=False)
            )

            BM = filtered_data["st_id1"] == j
            st_id2_time = (
                filtered_data[BM]["dist"].value_counts().sort_values(ascending=False)
            )

            all_rent = st_id1_time.add(st_id2_time, fill_value=0)
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
