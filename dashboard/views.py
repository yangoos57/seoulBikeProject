from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import viewsets, views
from django.templatetags.static import static
from django.http import HttpResponse
from .serializers import *
from .models import *
import time
from .utils import *

matplotlib.use('Agg')
seoul_bike_raw_data = pd.read_parquet('220607_bike_record.parquet.gzip')


class WiseSayingView(viewsets.ModelViewSet):
    serializer_class = WiseSayingSerializer
    queryset = WiseSaying.objects.all()


class stationInformationView(viewsets.ModelViewSet):
    serializer_class = stationInformationSerializer
    queryset = stationInformation.objects.all()


class selector_OptionsView(viewsets.ModelViewSet):
    serializer_class = selector_OptionsSerializer
    queryset = selector_Options.objects.all()


###  통신 Test 용
@api_view(["POST"])
def post(request):
    if request.method == "POST":
        name = request.data.get("name")
        tasting = request.data.get("tasting")
        # if tasting == 'nutty' :
        results = {"status": f"해당 {name}는 {tasting}한 느낌이 있어요."}
        return Response(results)





### Class Base View Test
class plots(views.APIView) :
    def __init__(self) : 
        self.bike_info = pd.DataFrame(selector_Options.objects.all().values()) 
        self.station_info = pd.DataFrame(stationInformation.objects.all().values()) 
        self.near_sub = pd.DataFrame(station_near_subway.objects.all().values()) 
        self.filter_start = "대여소"

    def post(self, request, format=None) :
        filter_start = "대여소"
        # queryset 
        val = request.data.get('values')
        print('val : ', val)
        # dataframe 여기서 시간 단축할 방법을 생각해봐겠다. 현 1.52초
        start_in = time.time()
        filtered_data = raw_data(query_data=seoul_bike_raw_data,val=val)
        print('filtered_data',start_in-time.time())

        start_in = time.time()
        recommend_sub = recommend_sub_station(filtered_data=seoul_bike_raw_data, stat_id=val, near_sub=self.near_sub, station=self.station_info,filter_start=filter_start)
        print('recommend_sub',start_in-time.time())

        # img 여기서도 시간 단축할 수 있을듯 현 1.35초
        start_in = time.time()
        img_1 = day_rent(filtered_data=filtered_data) # 여기서 로드가 좀 걸리는 것 같다.
        img_2 = frequent_station(filtered_data=filtered_data, bike_info=self.bike_info, num=1) # 반납
        img_3 = frequent_station(filtered_data=filtered_data, bike_info=self.bike_info, num=2) # 대여
        img_4 = total_rent(filtered_data=filtered_data)
        print('matplotlib',start_in-time.time())

        #plotly 
        start_in = time.time()
        plotly_1 = recommend_sub.plotly_image()
        print('plotly',start_in-time.time())

        # # table
        table_1 = recommend_sub.table_info().to_json(force_ascii=False)

        result = dict(img_1=img_1, img_2=img_2, img_3=img_3,img_4=img_4, plotly_1=plotly_1, table_1=table_1)
        return Response(result)
        # return Response(table_1)