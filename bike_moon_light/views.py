from urllib import response
from bike_moon_light.bkutils import bike_recommendation, near_500m, bkweather
from .mlutils import *
from .dashutils import *

# from cProfile import label
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import viewsets, views
from django.core.files import File
from .serializers import *
from .models import *
import time

# class departure_infoView(viewsets.ModelViewSet):
#     serializer_class = departure_infoSerializer
#     queryset = departure_info.objects.all()


station = pd.read_csv(
    "bike_moon_light/assets/seoul_bike_station_01_12.csv", encoding="CP949", index_col=0
)

near_bus = pd.read_csv(
    "bike_moon_light/assets/near_bus_500m.csv", encoding="CP949", index_col=0
)

seoul_bike = pd.read_parquet("parquet/220607_bike_record.parquet.gzip")

sub_info = pd.read_csv(
    "bike_moon_light/assets/sub_and_bike_info.csv", encoding="CP949", index_col=0
)

search_info = pd.read_csv(
    "bike_moon_light/assets/search_info.csv", encoding="CP949", index_col=0
)
bkstation = pd.read_csv(
    "bike_moon_light/assets/bkstation_info.csv", encoding="CP949", index_col=0
)
near_sub = pd.read_csv(
    "bike_moon_light/assets/near_sub_station.csv", encoding="CP949", index_col=0
)
print("!! 로드 완료 !!")

###### Bike Recommendation
@api_view(["Get"])
def BkdepartureInfo(request) -> Dict:
    bkstation = pd.read_csv(
        "bike_moon_light/assets/bkstation_info.csv", encoding="CP949", index_col=0
    )
    return Response(bkstation.to_dict("records"))


@api_view(["Get"])
def weather(request) -> Dict:
    result = bkweather()
    return Response(result)


@api_view(["Post"])
def Bknear_500(request) -> Dict:
    # print(request)
    departure_coor = request.data.get("value1")
    result = near_500m(departure_coor)

    return Response(result.to_dict("records"))


@api_view(["Post"])
def Bkdirection(request) -> Dict:
    dep = request.data.get("dep")
    print(dep["coor"])
    arr = request.data.get("arr")
    print(arr["coor"])
    bk = bike_recommendation(bkstation, seoul_bike)
    data = bk.bkroute_coor(dep["coor"], arr["coor"])
    # print(data)
    return Response(data)


class bk_leaflet_map(views.APIView):
    bkstation = pd.read_csv(
        "bike_moon_light/assets/bkstation_info.csv", encoding="CP949", index_col=0
    )

    def get(self, request) -> Dict:
        return Response(bkstation.to_dict("records"))

    def post(self, request):
        # queryset
        st_id = request.data.get("value")
        print(st_id)

        bk = bike_recommendation(bkstation, seoul_bike)
        data, minmax = bk.arrStation(st_id)
        return Response({"data": data.to_dict("records"), "minmax": minmax})


###
####
###### Moon Light
@api_view(["Get"])
def departureInfo(request) -> Dict[int, str]:
    search_info = pd.read_csv(
        "bike_moon_light/assets/search_info.csv", encoding="CP949", index_col=0
    )
    return Response(search_info.drop_duplicates(subset="label").to_dict("records"))


class leaflet_map(views.APIView):
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
        data = ml.route_data(departure_id, arrival_id)
        return Response(data)


##### Dash


### Class Base View Test
class plots(views.APIView):
    def __init__(self):
        self.bike_info = bkstation
        self.station_info = station.reset_index(drop=False)
        self.near_sub = near_sub

    def post(self, request, format=None):
        # queryset
        value = request.data.get("values")
        val = value_to_bkid(self.station_info, value)

        print("요청받은 대여소 id : ", val)
        start_in = time.time()
        filtered_data = dash_raw_data(query_data=seoul_bike, val=val)
        print("데이터 정렬 시간", start_in - time.time())
        print(filtered_data[0])
        start_in = time.time()
        recommend_sub = recommend_sub_station(
            filtered_data=filtered_data[0],
            stat_id=val,
            near_sub=self.near_sub,
            station=self.station_info,
            bike_info=self.bike_info,
        )
        print("recommend_sub 구동 시간", start_in - time.time())

        # img 여기서도 시간 단축할 수 있을듯 현 1.35초
        start_in = time.time()
        img_1 = day_rent(filtered_data=filtered_data)
        img_2 = time_rent(filtered_data=filtered_data, days="weekday")
        img_3 = total_rent(filtered_data=filtered_data)
        img_4 = time_rent(filtered_data=filtered_data, days="weekend")
        print("matplotlib", start_in - time.time())

        # plotly
        start_in = time.time()
        plotly_1 = recommend_sub.plotly_image()
        print("plotly", start_in - time.time())

        # # table
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
        # return Response(table_1)
