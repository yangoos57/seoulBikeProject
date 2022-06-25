import json
import urllib
import requests
from urllib.request import Request, urlopen
import pandas as pd
import numpy as np
import ast
import time
from typing import Dict, List

## 데이터 불러오기

# label 정보를 value 정보로 바꿔줌.(검색용으로 불가)
def label_to_value(search_info: pd.DataFrame, search_name: str) -> int:
    return search_info[search_info["label"] == search_name].value.iloc[0]


def search_by_text(search_info: pd.DataFrame, search_name: str) -> pd.DataFrame:
    return search_info[search_info["label"].str.contains(search_name)]


class moon_light:
    def __init__(self, station, near_bus, seoul_bike, sub_info):
        self.station = station
        self.near_bus = near_bus
        self.seoul_bike = seoul_bike
        self.sub_info = sub_info
        # self.search_info = search_info

    def departure_info(self, search_id: int) -> pd.DataFrame:
        # search_id는 frontend에서 value로 보낸다.
        if search_id < 3000:
            info = self.station.iloc[[search_id]]
        elif search_id > 4000:
            info = self.near_bus.iloc[[search_id - 4000]]
        else:
            info = self.sub_info.iloc[[search_id - 3000]]

        return info

    def arrival_info(self, search_id: int) -> pd.DataFrame:
        return self.station.iloc[[search_id]]

    def route_data(self, dep_id: int, arr_id: int) -> Dict:
        dep_info = self.departure_info(dep_id)
        arr_info = self.arrival_info(arr_id)

        if dep_id < 3000:
            print("자전거")
            bike = self.route_coor(dep_info, arr_info)
            center = self.center_data(bike)
            record_info = self.record_info(dep_info.index[0], arr_info.index[0], 50)

            # [{"bike": ["당산 육갑문", "목동1단지아파트 118동 앞"]}]
            route_info = [
                {
                    "bike": [
                        dep_info["st_name"].iloc[0],
                        arr_info["st_name"].iloc[0],
                        record_info[0],
                        record_info[1],
                    ]
                }
            ]

            return dict(bike=bike, center=center, route_info=route_info)

        elif dep_id > 4000:
            print("버스")

            # * -- 출도착 버스 정보-- *
            dep_arr_bus_info = self.finding_start_end(dep_info, arr_info)

            if dep_arr_bus_info.empty:
                print("해당 목적지로 이동가능한 야간버스가 없습니다.")
                return {"error": "해당 목적지로 이동가능한 야간버스가 없습니다."}

            # * -- 경로 선택 및 경로 노선 추출 -- *
            bus_whole, waypoint, bus_start_end = self.bus_route_info(dep_arr_bus_info)

            # * -- 좌표 받기 -- *
            arr_trans = bus_start_end.iloc[[1]]

            arr_bike_info = self.near_bus_bike_info(arr_trans, arr_info)

            if arr_bike_info.empty:
                return {"error": "이용가능한 따릉이 대여소가 없거나, 목적지와 도착지간 대여기록이 50건 미만입니다."}

            arr_bike_info = arr_bike_info.sort_values(by="num", ascending=False)

            bus = self.bus_route_coor(bus_start_end, waypoint)
            center = self.center_data(bus)
            walk = self.route_coor(arr_trans, arr_bike_info.iloc[[0]])
            bike = self.route_coor(arr_bike_info.iloc[[0]], arr_info)
            record_info = self.record_info(
                arr_bike_info["st_id"].iloc[0], arr_info.index[0], 50
            )

            # # -- 자전거 길 네이버 지도로도 표현 -- #
            # a = arr_bike_info.iloc[[0]][["latitude", "longtitude"]]
            # b = arr_info.reset_index()[["latitude", "longtitude"]]
            # start_end = pd.concat([a, b], axis=0)
            # bus # bus_direct

            # if record_info == [0]:
            #     return {"error": "출발 대여소와 도착 대여소가 동일합니다.(2)"}

            route_info = [
                {
                    "bus": [
                        bus_start_end["name"].iloc[0],
                        bus_start_end["name"].iloc[1],
                    ],
                    "bike": [
                        arr_bike_info["st_name"].iloc[0],
                        arr_info["st_name"].iloc[0],
                        record_info[0],
                        record_info[1],
                    ],
                },
            ]
            dep_bike_info = self.near_bus_bike_info(bus_start_end.iloc[[0]], arr_info)
            if dep_bike_info.empty:
                return {"error": "이용가능한 따릉이 대여소가 없거나, 목적지와 도착지간 대여기록이 50건 미만입니다."}

            dep_bike_info = dep_bike_info.sort_values(by="num", ascending=False)
            if dep_bike_info.empty == False:
                bike2 = self.route_coor(dep_bike_info, arr_info)
                center2 = self.center_data(bike2)
                record_info2 = self.record_info(
                    dep_bike_info["st_id"].iloc[0], arr_info.index[0], 50
                )
                bike2_info = (
                    {
                        "bike2": [
                            dep_bike_info["st_name"].iloc[0],
                            arr_info["st_name"].iloc[0],
                            record_info2[0],
                            record_info2[1],
                        ]
                    },
                )
                route_info.extend(bike2_info)

            else:
                bike2 = [""]
                center2 = [""]

            return dict(
                bus=bus,
                walk=walk,
                bike=bike,
                center=center,
                bike2=bike2,
                center2=center2,
                route_info=route_info,
            )

        else:
            print("지하철")
            # * -- 자전거 대여소 정보 추출 -- *
            near_bike_info = self.near_bus_bike_info(dep_info, arr_info)
            if near_bike_info.empty:
                return {"error": "이용가능한 따릉이 대여소가 없거나, 목적지와 도착지간 대여기록이 50건 미만입니다."}

            near_bike_info = near_bike_info.sort_values(by="dist")

            departure_bike_station = pd.DataFrame(near_bike_info.iloc[0]).T

            # * -- 자전거 경로(사실 보행로 추천이라는 사실~)-- *
            sub = self.route_coor(dep_info, departure_bike_station)
            bike = self.route_coor(departure_bike_station, arr_info)
            center = self.center_data(bike)
            record_info = self.record_info(
                departure_bike_station["st_id"].iloc[0], arr_info.index[0], 50
            )
            # sub
            # [{"sub": ["당산역"], "bike": ["당산 육갑문", "목동1단지아파트 118동 앞"]}]
            route_info = [
                {
                    "sub": [dep_info["sub_name"].iloc[0]],
                    "bike": [
                        departure_bike_station["st_name"].iloc[0],
                        arr_info["st_name"].iloc[0],
                        record_info[0],
                        record_info[1],
                    ],
                }
            ]
            return dict(sub=sub, bike=bike, center=center, route_info=route_info)

    def raw_data(self, val: int) -> pd.DataFrame:
        quert_st_id1 = self.seoul_bike[self.seoul_bike["st_id1"] == val]
        quert_st_id2 = self.seoul_bike[self.seoul_bike["st_id2"] == val]
        filtered_data = pd.concat(
            [quert_st_id1, quert_st_id2], axis=0
        ).drop_duplicates()
        filtered_data.drop(columns="index", inplace=True)
        bm = (filtered_data["st_id1"] == val) & (filtered_data["st_id2"] == val)
        filtered_data = filtered_data[~bm]

        # # 반납
        # filtered_data_end = filtered_data[
        #     (filtered_data["st_id2"] == val) & (filtered_data["st_id1"] != val)
        # ]

        return filtered_data

    def haversine_np(
        self, lon1: float, lat1: float, lon2: float, lat2: float
    ) -> np.array:
        """
        Calculate the great circle distance between two points
        on the earth (specified in decimal degrees)

        All args must be of equal length.

        """
        lon1, lat1, lon2, lat2 = map(np.radians, [lon1, lat1, lon2, lat2])

        dlon = lon2 - lon1
        dlat = lat2 - lat1

        a = (
            np.sin(dlat / 2.0) ** 2
            + np.cos(lat1) * np.cos(lat2) * np.sin(dlon / 2.0) ** 2
        )

        c = 2 * np.arcsin(np.sqrt(a))
        m = 6367 * c * 1000
        return m

    # -- 버스 루트 정보 -- #
    def finding_start_end(
        self, departure_info: pd.DataFrame, arrival_info: pd.DataFrame
    ) -> pd.DataFrame:
        """
        최종적으로 자전거 대여소끼리 이동하는 경로를 찾는 함수
        목적지 대여소와 가까운 버스정류소를 찾고 그 근처의 대여소를 추천해준다.

        bus에서 내린 뒤 대여소로 이동하는 경우를 산정함

        departure_info : 출발지 검색용 변수
        ending_bike : 목적지 대여소 번호
        arrival_info = 목적지 대여소 정보
        """

        bus_num = departure_info["bus"].iloc[0]
        bus_name = departure_info["name"].iloc[0]
        departure_info = self.near_bus.query("bus==@bus_num & name==@bus_name")
        # 목적지 대여소와 직선거리 1.5km 이내 버스대여소 모두 선택
        # 결과 : bus_route_near_bike
        result_km = self.haversine_np(
            arrival_info["longtitude"].values,
            arrival_info["latitude"].values,
            self.near_bus["longtitude"].values,
            self.near_bus["latitude"].values,
        )
        near_bus_for_dist = self.near_bus.copy()
        near_bus_for_dist["dist"] = result_km
        bus_route_near_bike = (
            near_bus_for_dist[near_bus_for_dist["dist"] < 1500]
            .dropna()
            .sort_values(by="id")
        )

        # departure_info와 arrival_info 인근 버스 정류장과 겹치는 버스 번호 찾기
        # ex) 합정역 => 754 자전거 대여소 인 경우 754 근처를 지나가는 버스 N26과 N62를 결과로 제공함.
        bus_route_inter = np.intersect1d(
            bus_route_near_bike["bus"].unique(), departure_info["bus"]
        ).tolist()

        # 주변에 겹치는 결과가 없으면 검색 종료
        if bus_route_inter == []:
            print("목적지와 연결된 검색노선 없음.")

            # 정류장,지하철역, 대여소 등 관련 내용이 없으면 station => station 검색 함수로 옮김
            return pd.DataFrame([])

        # 겹치는 노선에 대한 정보만 불러온더
        # 합정의 경우 N26,N62외에도 다양한 야간 버스가 지나친다. 그중 N26,N62버스 만 불러온다.
        # starting_bus = departure_info.query("bus == @bus_route_inter")
        starting_bus = departure_info
        ending_bus = bus_route_near_bike.query("bus == @bus_route_inter")

        # 정류장 시작,종료 지점 모으기.. 머리 간질간질해 죽는줄..
        # A에서 B갈때 거치는 정류장과 B에서 A갈때 거치는 정류장이 다를 수 있음.
        # 정확한 버스노선을 찾기 위해서는 버스 방향이 상행인지 하행인지가 중요하다.
        # 상행과 하행을 찾는 방법에 대한 방법이다.

        bus_df = pd.DataFrame(columns=ending_bus.columns)
        # bus_route_inter : A->B갈때 여러 N버스를 타고 갈 수 있음
        # 합정 => 754인 경우 N26과 N62 둘 다 가능
        for num in bus_route_inter:
            starting_order = starting_bus.query("bus==@num")
            ending_order = ending_bus.sort_values(by=["dist", "order"]).query(
                "bus==@num"
            )[:2]

            # 상행(A->B)인 경우 B가 A보다 bus 정류장 번호(column : bus_order)가 더 크다.
            # 하행(B->A)인 경우 A가 B보다 ""

            # 그 이유는 버스가 이동할때마다 +1씩 증가하기 때문임. 운행중에는 번호가 계속 증가하는 순으로 갔다가
            # 차고지에서 다시 0으로 리셋하고 출발한다는 생각을 하면 쉬움.

            # 따라서 하행인 경우 ending_order .max - starting.max > 0 이며 상행인 경우 그 반대임.

            # 하행노선 찾기
            if ending_order["order"].max() - starting_order["order"].max() >= 0:
                df = starting_order.sort_values(by="order", ascending=False)[:1]
                bus_df = pd.concat([bus_df, df], axis=0)
                # bus_df = bus_df.append(df) ## concat 에러뜨면 append로 다시 바꾸기
                df = ending_order.sort_values(by="order", ascending=False)[:1]
                bus_df = pd.concat([bus_df, df], axis=0)
                # print(f"{num}하행 노선입니다.")

            # 상행노선 찾기
            elif ending_order["order"].max() - starting_order["order"].max() < 0:
                df = starting_order.sort_values(by="order")[:1]
                bus_df = pd.concat([bus_df, df], axis=0)
                df = ending_order.sort_values(by="order")[:1]
                bus_df = pd.concat([bus_df, df], axis=0)
                # print("상행 노선입니다.")

        # 출발지 위치가 목적지 1.5km이내에 있는 경우 버스 경로검색 안하도록 조치
        if starting_order["id"].iloc[0] in bus_route_near_bike["id"].tolist():
            bus_df = starting_order.sort_values(by="order", ascending=False)[:1]
            # print("목적지와 정류장이 직선거리 1.5km 이내에 있습니다.")
            # 아래 함수랑 연동시켜보자
            return bus_df

        # 아래 함수랑 연동시켜보자
        return bus_df  #  노선별 출발 => 도착를 return 한다.

    # -- 버스 이동 경로 좌표 -- #
    def bus_route_info(self, bus_route: pd.DataFrame) -> pd.DataFrame:
        if bus_route.iloc[-1]["id"] == bus_route.iloc[0]["id"]:
            print("버스를 타지 않았네")
            return [], [], []
        else:
            # 범위선택
            bus_order_start = bus_route["order"].iloc[0]
            bus_order_end = bus_route["order"].iloc[-1]
            bus_name = bus_route["bus"].iloc[0]

            # 자료 sorting
            route_whole = self.near_bus.query(
                "@bus_order_start <= order <= @bus_order_end & bus == @bus_name"
            )[["name", "longtitude", "latitude", "order", "bike_id"]].sort_values(
                by="order"
            )

            route_start = route_whole.iloc[0]
            route_end = route_whole.iloc[-1]
            route_start_and_end = pd.concat([route_start, route_end], axis=1).T

            waypoint = route_whole.iloc[int(len(route_whole) / 2)]

        return route_whole, waypoint, route_start_and_end

    # -- 정류장 근처 자전거 정보 -- #
    def near_bus_bike_info(
        self, bus_route: pd.DataFrame, arrival_info: pd.DataFrame
    ) -> pd.DataFrame:
        """
        추천 대여소 정보를 만드는 함수임
        bus_route : 버스 도착지 정보
        arrival_info : 대여소 도착지 정보
        """
        bike_id = bus_route.iloc[-1]["bike_id"]  # bike_id는 무조건 리스트 형태로
        bike_station_id = arrival_info.index[0]

        # # 추천_대여소_선정 : ast : '[123,]' => [123]으로 만들어줌 --> list
        # if type(bike_id) == str:
        #     bike_id = ast.literal_eval(bike_id)

        bike_id = ast.literal_eval(bike_id)

        raw = self.raw_data(bike_station_id)

        br_record = raw.groupby("st_id1").size()

        ### 50건 이상만 list에 담기도록 설정
        br_record_id = br_record[br_record > 50].index

        if br_record_id.empty:
            return br_record_id

        recom_bike_id = np.intersect1d(bike_id, br_record_id).tolist()

        # 버스정류장 근처 대여소와 집 근처 대여소 거리 비교
        # ending point를 외부에서 받아야하네 (클래스로 함수를 만들어야하나.)

        # # 추천 대여소 리스트 만들기
        BM_2 = (self.seoul_bike["st_id2"] == bike_station_id) & (
            self.seoul_bike["st_id1"].isin(recom_bike_id)
        )
        BM_1 = (self.seoul_bike["st_id1"] == bike_station_id) & (
            self.seoul_bike["st_id2"].isin(recom_bike_id)
        )
        seoul_bike_sorting = self.seoul_bike.loc[BM_1 | BM_2]  # 거리 및 시간 계산을 위해 따로 추출

        bike_recommend = []
        for starting_station in recom_bike_id:
            BM_1 = (seoul_bike_sorting["st_id1"] == starting_station) & (
                seoul_bike_sorting["st_id2"] == bike_station_id
            )
            BM_2 = (seoul_bike_sorting["st_id2"] == starting_station) & (
                seoul_bike_sorting["st_id1"] == bike_station_id
            )

            # 평균시간 계산(column : time)
            mean_station = (
                seoul_bike_sorting[BM_1 | BM_2]["riding_time"]
                .value_counts()
                .sort_values(ascending=False)[:5]
                .index.values.mean()
            )

            # 이용기록 계산(column : num)
            num_station = len(seoul_bike_sorting[BM_1 | BM_2])

            # 직선거리 계산(column : dist)
            lat_1 = self.station.query("st_id==@starting_station")["latitude"].values
            lon_1 = self.station.query("st_id==@starting_station")["longtitude"].values
            lat_2 = self.station.query("st_id==@bike_station_id")["latitude"].values
            lon_2 = self.station.query("st_id==@bike_station_id")["longtitude"].values
            dist_station = self.haversine_np(lat_1, lon_1, lat_2, lon_2)

            # 자료 저장
            station_info = self.station.query("st_id==@starting_station")
            bike_recommend.append(
                [
                    station_info["st_name"].iloc[0],
                    station_info["latitude"].iloc[0],
                    station_info["longtitude"].iloc[0],
                    starting_station,
                    mean_station,
                    num_station,
                    f"{dist_station[0]/1000 :.2f}km",
                ]
            )

        # return
        bike_recommend = pd.DataFrame(
            bike_recommend,
            columns=[
                "st_name",
                "latitude",
                "longtitude",
                "st_id",
                "time",
                "num",
                "dist",
            ],
        )

        return bike_recommend

    # -- 자전거 추천 경로 좌표 -- #
    def route_coor(
        self,
        departure_station,
        arrival_station,
    ) -> List:
        """departure_station과 arrival_station은 모두 dataframe으로!"""
        if isinstance(departure_station, pd.Series):
            departure_station = pd.DataFrame(departure_station).T

        if isinstance(arrival_station, pd.Series):
            arrival_station = pd.DataFrame(arrival_station).T
        if departure_station.empty or arrival_station.empty:
            return [""]

        for i in range(3):
            url = "https://apis.openapi.sk.com/tmap/routes/pedestrian?version=1"

            payload = {
                "angle": 0,
                "speed": 0,
                "reqCoordType": "WGS84GEO",
                "searchOption": "0",
                "resCoordType": "WGS84GEO",
                "sort": "index",
                "startX": departure_station["longtitude"].iloc[0],
                "startY": departure_station["latitude"].iloc[0],
                "endX": arrival_station["longtitude"].iloc[0],
                "endY": arrival_station["latitude"].iloc[0],
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
        return pd.DataFrame(finish_data)[[1, 0]].values  ## 위도 경도 위치 바꾸기

    # -- 대중교통 추천 경로 그리기 -- #
    def bus_route_coor(
        self,
        route_start_and_end: pd.DataFrame,
        waypoint=[],
        option="traoptimal",
        waypoint_false=False,
    ) -> List:

        start = route_start_and_end[["longtitude", "latitude"]].values[0]
        goal = route_start_and_end[["longtitude", "latitude"]].values[1]

        if waypoint_false == True:
            waypoints = ["", ""]
        else:
            waypoints = waypoint[["longtitude", "latitude"]].values

        client_id = "44vlsxxinm"
        client_secret = "BOHC6psFnLkjdRrlkLn24S1apLUTsuzrCnMuCi4A"
        # start=/goal=/(waypoint=)/(option=) 순으로 request parameter 지정
        url = f"https://naveropenapi.apigw.ntruss.com/map-direction-15/v1/driving?start={start[0]},{start[1]}&waypoint={waypoints[0]},{waypoints[1]}&goal={goal[0]},{goal[1]}&option={option}"
        request = urllib.request.Request(url)
        request.add_header("X-NCP-APIGW-API-KEY-ID", client_id)
        request.add_header("X-NCP-APIGW-API-KEY", client_secret)

        response = urllib.request.urlopen(request)
        res = response.getcode()

        if res == 200:
            response_body = response.read().decode("utf-8")
            filtered_body = (
                json.loads(response_body).get("route").get(option)[0].get("path")
            )
            return pd.DataFrame(filtered_body)[[1, 0]].values

        else:
            print("ERROR")

    def record_info(self, dep_id: int, arr_id: int, count: int = 50) -> List:
        if dep_id == arr_id:
            print("출발 대여소와 도착 대여소가 동일합니다.")
            return [0, 1]

        BM = (self.seoul_bike["st_id1"] == dep_id) & (
            self.seoul_bike["st_id2"] == arr_id
        )
        raw_data_1 = self.seoul_bike[BM]

        BM = (self.seoul_bike["st_id1"] == arr_id) & (
            self.seoul_bike["st_id2"] == dep_id
        )
        raw_data_2 = self.seoul_bike[BM]

        concat_data = pd.concat([raw_data_1, raw_data_2], axis=0)

        # 정해진 개수 미만 경고창 띄우기
        if len(concat_data) <= count:
            return [0, 0]

        all_time = (
            concat_data["riding_time"].value_counts().sort_values(ascending=False)
        )  # 도달한 시간대
        total_borrow = len(concat_data)

        k = []
        i = 2
        # 일정 비율 이상인 시간대만 구하기
        while len(k) < 1:
            k = all_time[all_time >= (total_borrow / i)]
            i = i * 1.5

        ### 대여시간대
        time_line = k.index

        ### 대여기록
        counts = k.values

        total_counts = k.sum()

        ### 대여시간 * 대여기록
        total_time = sum([a * b for a, b in zip(time_line, counts)])

        # 평균 시간
        avg_time = total_time / total_counts

        # 올림
        result = round(avg_time, 0)

        return [result, total_borrow]

    def center_data(self, rawdata: List) -> List:
        divd = int(len(rawdata) / 2)
        return rawdata[divd]
