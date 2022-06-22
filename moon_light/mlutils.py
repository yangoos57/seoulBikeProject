import json
import urllib
import requests
from urllib.request import Request, urlopen
import pandas as pd
import numpy as np
from tqdm import notebook
import plotly.graph_objects as go
import plotly.express as px
import ast


## 데이터 불러오기


class moon_light:
    def __init__(self):
        self.station = pd.read_csv(
            "assets/seoul_bike_station_01_12.csv", encoding="CP949", index_col=0
        )
        self.near_bus = pd.read_csv(
            "assets/near_bus_500m.csv", encoding="CP949", index_col=0
        )
        self.seoul_bike = pd.read_parquet(
            "/Users/yangwoolee/git_repo/seoul_bike_dash/parquet/220607_bike_record.parquet.gzip"
        )
        self.sub_info = pd.read_csv(
            "assets/sub_and_bike_info.csv", encoding="CP949", index_col=0
        )

        self.search_info = pd.read_csv(
            "assets/search_info.csv", encoding="CP949", index_col=0
        )

    def search_infomation(self, name):
        search_list = self.search_info[
            self.search_info["name"].str.contains(name)
        ].drop_duplicates("name")
        return search_list

    def departure_info(self, search_id):
        if search_id < 3000:
            info = self.station.iloc[search_id]
        elif search_id > 4000:
            info = self.near_bus.iloc[search_id - 4000]
        else:
            info = self.sub_info.iloc[search_id - 3000]

        return pd.DataFrame(info).T

    def arrivial_info(self, id):
        return self.station[self.station.index == id]

    def route_recommend(self, departure_id, arrival_id):
        departure_info = self.departure_info(departure_id)  # dataframe
        arrival_info = self.arrivial_info(arrival_id)  # dataframe
        if departure_id < 3000:
            # print('자전거')
            bike_route_coor = self.route_coor(departure_info, arrival_info)
            return [bike_route_coor]

        elif departure_id > 4000:
            # print('버스')
            # * -- 자전거 대여소 정보 추출 -- *
            bike_recommend = self.near_bus_bike_info(
                departure_info, arrival_info
            ).sort_values(by="dist")

            # * -- 출도착 버스 정보-- *
            route_info = self.finding_start_end(departure_info, arrival_info)

            # * -- 경로 선택 및 경로 노선 추출 -- *
            route_whole, waypoint, route_start_and_end = self.bus_route_info(route_info)

            # * -- 좌표 받기 -- *
            departure_bike_station = pd.DataFrame(bike_recommend.iloc[0]).T
            arrival_transportation = pd.DataFrame(route_start_and_end.iloc[1]).T
            bus_route_coor = self.bus_route_coor(route_start_and_end, waypoint)
            walk_route_coor = self.route_coor(
                arrival_transportation, departure_bike_station
            )
            bike_route_coor = self.route_coor(departure_bike_station, arrival_info)
            return [bus_route_coor, walk_route_coor, bike_route_coor]

        else:
            # print('지하철')
            # * -- 자전거 대여소 정보 추출 -- *
            bike_recommend = self.near_bus_bike_info(
                departure_info, arrival_info
            ).sort_values(by="dist")
            departure_bike_station = pd.DataFrame(bike_recommend.iloc[0]).T

            # * -- 자전거 경로(사실 보행로 추천이라는 사실~)-- *
            walk_route_coor = self.route_coor(departure_info, departure_bike_station)
            bike_route_coor = self.route_coor(departure_bike_station, arrival_info)
            return [walk_route_coor, bike_route_coor]

    def raw_data(self, val):
        quert_st_id1 = self.seoul_bike[self.seoul_bike["st_id1"] == val]
        quert_st_id2 = self.seoul_bike[self.seoul_bike["st_id2"] == val]
        filtered_data = pd.concat(
            [quert_st_id1, quert_st_id2], axis=0
        ).drop_duplicates()
        filtered_data.drop(columns="index", inplace=True)
        bm = (filtered_data["st_id1"] == val) & (filtered_data["st_id2"] == val)
        filtered_data = filtered_data[~bm]
        # 반납
        filtered_data_end = filtered_data[
            (filtered_data["st_id2"] == val) & (filtered_data["st_id1"] != val)
        ]

        return filtered_data_end

    def haversine_np(self, lon1, lat1, lon2, lat2):
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

    # def departure_info(self, name):
    #     return self.near_bus[
    #         self.near_bus["name"].str.contains(name)
    #     ]  # 버스, 대여소, 역 모두 넣어놓는 리스트로 만들기

    # -- 버스 루트 정보 -- #
    def finding_start_end(self, departure_info, arrival_info):
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

        # 주변에 겹치는 결과가 없으면 검색 종료(검색 반경을 늘려서 검색하도록 유도할 수도 있겠다. 기능 추가할때 구현고민해보자.)
        if bus_route_inter == []:
            print("검색결과 없음")

            # 정류장,지하철역, 대여소 등 관련 내용이 없으면 station => station 검색 함수로 옮김
            return print("station_to_station")

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
                bus_df = bus_df.append(df)
                df = ending_order.sort_values(by="order", ascending=False)[:1]
                bus_df = bus_df.append(df)
                # print(f"{num}하행 노선입니다.")

            # 상행노선 찾기
            elif ending_order["order"].max() - starting_order["order"].max() < 0:
                df = starting_order.sort_values(by="order")[:1]
                bus_df = bus_df.append(df)
                df = ending_order.sort_values(by="order")[:1]
                bus_df = bus_df.append(df)
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
    def bus_route_info(self, pick):
        if pick.iloc[-1]["id"] == pick.iloc[0]["id"]:
            print("버스를 타지 않았네")
            return [], [], []
        else:
            # 범위선택
            bus_order_start = pick["order"].iloc[0]
            bus_order_end = pick["order"].iloc[-1]
            bus_name = pick["bus"].iloc[0]

            # 자료 sorting
            route_whole = self.near_bus.query(
                "@bus_order_start <= order <= @bus_order_end & bus == @bus_name"
            )[["name", "longtitude", "latitude", "order"]].sort_values(by="order")

            route_start = route_whole.iloc[0]
            route_end = route_whole.iloc[-1]
            route_start_and_end = pd.concat([route_start, route_end], axis=1).T

            waypoint = route_whole.iloc[int(len(route_whole) / 2)]

        return route_whole, waypoint, route_start_and_end

    # -- 정류장 근처 자전거 정보 -- #
    def near_bus_bike_info(self, pick, arrival_info):
        """
        추천 대여소 정보를 만드는 함수임

        bike_id : 가능한 자전거 대여소 id
        bike_station_id : 목적지 대여소 id
        """
        bike_id = pick.iloc[-1]["bike_id"]  # bike_id는 무조건 리스트 형태로
        bike_station_id = arrival_info.index[0]
        # 추천_대여소_선정 : ast : '[123,]' => [123]으로 만들어줌 --> list
        if type(bike_id) == str:
            bike_id = ast.literal_eval(bike_id)

        # 버스정류장 근처 대여소와 집 근처 대여소 거리 비교
        # ending point를 외부에서 받아야하네 (클래스로 함수를 만들어야하나.)

        # 추천 대여소 리스트 만들기
        BM_2 = (self.seoul_bike["st_id2"] == bike_station_id) & (
            self.seoul_bike["st_id1"].isin(bike_id)
        )
        BM_1 = (self.seoul_bike["st_id1"] == bike_station_id) & (
            self.seoul_bike["st_id2"].isin(bike_id)
        )
        seoul_bike_sorting = self.seoul_bike.loc[BM_1 | BM_2]  # 거리 및 시간 계산을 위해 따로 추출

        bike_recommend = []
        for starting_station in bike_id:
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
    def route_coor(self, departure_station, arrival_station):
        """departure_station과 arrival_station은 모두 dataframe으로!"""
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
        return pd.DataFrame(finish_data).T.values

    # -- 대중교통 추천 경로 그리기 -- #
    def bus_route_coor(self, route_start_and_end, waypoint, option="traoptimal"):
        start = route_start_and_end[["longtitude", "latitude"]].values[0]
        goal = route_start_and_end[["longtitude", "latitude"]].values[1]
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
            return pd.DataFrame(filtered_body).values.T

        else:
            print("ERROR")
