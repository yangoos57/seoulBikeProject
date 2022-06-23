from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import viewsets, views
from django.core.files import File
from .serializers import *
from .models import *
import time
from .mlutils import *
import os


class departure_infoView(viewsets.ModelViewSet):
    serializer_class = departure_infoSerializer
    queryset = departure_info.objects.all()


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
print("!! 로드 완료 !!")


class leaflet_map(views.APIView):
    def post(self, request):
        # queryset
        departure_id = request.data.get("value1")
        arrival_id = request.data.get("value2")
        # departure_id = 4443
        # arrival_id = 754
        ml = moon_light(
            station=station, near_bus=near_bus, seoul_bike=seoul_bike, sub_info=sub_info
        )
        data = ml.route_data(departure_id, arrival_id)
        return Response(data)
