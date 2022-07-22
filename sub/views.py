from cProfile import label
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import viewsets, views
from django.core.files import File
from .serializers import *
from .models import *
import time
from .bkutils import *
import os


# class departure_infoView(viewsets.ModelViewSet):
#     serializer_class = departure_infoSerializer
#     queryset = departure_info.objects.all()


bkstation = pd.read_csv(
    "bike_recommendation/assets/bkstation_info.csv", encoding="CP949", index_col=0
)

seoul_bike = pd.read_parquet("parquet/220607_bike_record.parquet.gzip")


print("!! 로드 완료 !!")


@api_view(["Get"])
def departureInfo(request) -> Dict[int:str]:
    search_info = pd.read_csv(
        "bike_moon_light/assets/search_info.csv", encoding="CP949", index_col=0
    )
    bike_search_info = search_info[search_info["value"] < 3000]
    return Response(bike_search_info.to_dict("records"))


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
