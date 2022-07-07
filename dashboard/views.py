from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import viewsets, views
from django.templatetags.static import static
from django.http import HttpResponse
from .serializers import *
from .models import *
import time
from .utils import *


seoul_bike_raw_data = pd.read_parquet("parquet/220607_bike_record.parquet.gzip")
print("data loading complete")


class stationInformationView(viewsets.ModelViewSet):
    serializer_class = stationInformationSerializer
    queryset = stationInformation.objects.all()


class selector_OptionsView(viewsets.ModelViewSet):
    serializer_class = selector_OptionsSerializer
    queryset = selector_Options.objects.all()


### Class Base View Test
class plots(views.APIView):
    def __init__(self):
        self.bike_info = pd.DataFrame(selector_Options.objects.all().values())
        self.station_info = pd.DataFrame(stationInformation.objects.all().values())
        self.near_sub = pd.DataFrame(station_near_subway.objects.all().values())

    def post(self, request, format=None):
        # queryset
        val = request.data.get("values")

        print("요청받은 대여소 : ", val)

        start_in = time.time()
        filtered_data = raw_data(query_data=seoul_bike_raw_data, val=val)
        print("데이터 정렬 시간", start_in - time.time())

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
