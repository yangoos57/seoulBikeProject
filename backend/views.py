from urllib import response
from .btutils import *
from .mlutils import *
from .dashutils import *
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import viewsets, views
from django.core.files import File
from .serializers import *
from .models import *
import time

# from django.db import connection
# cursor = connection.cursor()
# cursor.execute('''SELECT count(*) FROM people_person''')

#
##
###
####
#####
###### 필수 데이터 불러오기

station = pd.read_csv(
    "backend/assets/seoul_bike_station_01_12.csv", encoding="CP949", index_col=0
)

near_bus = pd.read_csv(
    "backend/assets/near_bus_500m.csv", encoding="CP949", index_col=0
)

seoul_bike = pd.read_parquet("parquet/220607_bike_record.parquet.gzip")

sub_info = pd.read_csv(
    "backend/assets/sub_and_bike_info.csv", encoding="CP949", index_col=0
)

search_info = pd.read_csv(
    "backend/assets/search_info.csv", encoding="CP949", index_col=0
)
btstation = pd.read_csv(
    "backend/assets/bkstation_info(backup).csv", encoding="CP949", index_col=0
)

near_sub = pd.read_csv(
    "backend/assets/near_sub_station.csv", encoding="CP949", index_col=0
)
print("!! 로드 완료 !!")

#
##
###
####
#####
###### 따릉이로 동네투어 API

# 자전거 대여소 정보
@api_view(["Get"])
def BtdepartureInfo(request) -> Dict:
    btstation = pd.read_csv(
        "backend/assets/bkstation_info(backup).csv", encoding="CP949", index_col=0
    )
    return Response(btstation.to_dict("records"))


# 날씨 정보
@api_view(["Get"])
def weather(request) -> Dict:
    result = btweather()
    return Response(result)


# 500m 내 대여소 정보
@api_view(["Post"])
def btnear_500(request) -> Dict:
    # print(request)
    departure_coor = request.data.get("value1")
    result = near_500m(departure_coor)

    return Response(result.to_dict("records"))


# 선택 된 자전거 경로 불러오기
@api_view(["Post"])
def btdirection(request) -> Dict:
    dep = request.data.get("dep")
    print(dep["coor"])
    arr = request.data.get("arr")
    print(arr["coor"])
    bt = bike_recommendation(btstation, seoul_bike)
    data = bt.btroute_coor(dep["coor"], arr["coor"])
    # print(data)
    return Response(data)


# 지도에 띄울 정보
class bt_leaflet_map(views.APIView):
    btstation = pd.read_csv(
        "backend/assets/bkstation_info(backup).csv", encoding="CP949", index_col=0
    )

    def get(self, request) -> Dict:
        return Response(btstation.to_dict("records"))

    def post(self, request):
        # queryset
        st_id = request.data.get("value")
        bt = bike_recommendation(btstation, seoul_bike)
        data, minmax = bt.arrStation(st_id)
        return Response({"data": data.to_dict("records"), "minmax": minmax})


#
##
###
####
#####
###### 달빛 따릉이 API

# 자전거 대여소 정보
@api_view(["Get"])
def departureInfo(request) -> Dict[int, str]:
    search_info = pd.read_csv(
        "backend/assets/search_info.csv", encoding="CP949", index_col=0
    )
    return Response(search_info.drop_duplicates(subset="label").to_dict("records"))


# 지도에 띄울 정보
class ml_leaflet_map(views.APIView):
    def post(self, request):
        # queryset
        departure_name = request.data.get("value1")
        print(departure_name)
        departure_id = label_to_value(search_info, departure_name)

        arrival_name = request.data.get("value2")
        print(arrival_name)
        arrival_id = label_to_value(search_info, arrival_name)

        ml = moon_light(
            station=station, near_bus=near_bus, seoul_bike=seoul_bike, sub_info=sub_info
        )
        data: dict = ml.route_data(departure_id, arrival_id)
        return Response(data)


#
##
###
####
#####
###### 따릉이 대시보드 API

# 대시보드에 띄울 정보
class plots(views.APIView):
    def __init__(self):
        self.bike_info = btstation
        self.station_info = station.reset_index(drop=False)
        self.near_sub = near_sub

    # 대여소 관련 정보
    def post(self, request, format=None):
        # queryset
        value = request.data.get("values")
        val = value_to_bkid(self.station_info, value)
        filtered_data = dash_raw_data(query_data=seoul_bike, val=val)

        # 대어소 정보
        recommend_sub = recommend_sub_station(
            filtered_data=filtered_data[0],
            stat_id=val,
            near_sub=self.near_sub,
            station=self.station_info,
            bike_info=self.bike_info,
        )

        # plot 이미지
        img_1 = day_rent(filtered_data=filtered_data)
        img_2 = time_rent(filtered_data=filtered_data, days="weekday")
        img_3 = total_rent(filtered_data=filtered_data)
        img_4 = time_rent(filtered_data=filtered_data, days="weekend")

        # 지도 정보
        plotly_1 = recommend_sub.plotly_image()

        # # table 정보
        table_1 = recommend_sub.table_info().to_json(force_ascii=False)
        table_2 = recommend_sub.frequent_estimation().to_json(force_ascii=False)

        result = dict(
            img_1=img_1,
            img_2=img_2,
            img_3=img_3,
            img_4=img_4,
            plotly_1=plotly_1,
            table_1=table_1,
            table_2=table_2,
            count_all=len(filtered_data[0]),
            count_day=round(len(filtered_data[0]) / 365, 1),
        )
        return Response(result)
