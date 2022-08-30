from .bikeTourUtils import *
from .dodoUtils import *
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import viewsets, views
from .serializers import *
from .models import *

# -- 도도모아 API --#
@api_view(["Post"])
def dodoMoa(request) -> dict:
    """
    request로 도서관명, 유저 검색 키워드를 받아온다.
    createbooklist 함수로 해당 도서를 불러온 뒤 반환한다.
    """
    libName = request.data.get("library")
    userWords = request.data.get("keyword")
    try:
        print('이상없음')
        result = createBookList(libName, userWords)
    except:
        print('이상')
        result = pd.DataFrame(["null"], columns=["title"])
    return Response(result.to_dict("records"))


# -- 따릉이로 동네투어 API --#

# 필수 데이터 불러오기
station = pd.read_csv(
    "backend/assets/bikeTour/newStationInfo.csv",
    encoding="CP949",
    index_col=0,
)

# seoul_bike = pd.read_parquet("parquet/220730_bike_record.parquet.gzip")

# btstation = pd.read_csv(
#     "backend/assets/bikeTour/bkstation_info(backup).csv", encoding="CP949", index_col=0
# )
station_record = pd.read_csv(
    "backend/assets/bikeTour/station_record.csv", encoding="CP949", index_col=0
)

print("!! 로드 완료 !!")

# 대여소 정보
@api_view(["Get"])
def BtdepartureInfo(request) -> dict:
    """
    따릉이 대여소 정보를 제공한다.
    """
    btstation = pd.read_csv(
        "backend/assets/bikeTour/bkstation_info(backup).csv",
        encoding="CP949",
        index_col=0,
    )
    return Response(btstation.to_dict("records"))


# 날씨 정보
@api_view(["Get"])
def weather(request) -> dict:
    """
    날씨 대여소 정보를 제공한다.
    """
    result = btweather()
    return Response(result)


# 500m 이내 대여소 정보
@api_view(["Post"])
def btnear_500(request) -> dict:
    """
    현재 좌표 500m 이내 대여소 정보를 불러온다.
    """
    departure_coor = request.data.get("value1")
    result = near_500m(departure_coor)

    return Response(result.to_dict("records"))


# 자전거 경로
@api_view(["Post"])
def btdirection(request) -> dict:
    """
    자전거 경로를 불러온다.
    """
    dep = request.data.get("dep")
    print(dep["coor"])
    arr = request.data.get("arr")
    print(arr["coor"])
    
    data = route_coor(dep["coor"], arr["coor"])
    # print(data)
    return Response(data)


class bt_leaflet_map(views.APIView):
    """
    leaflet 구현에  필요한 정보를 불러온다.
    """

    def get(self, request) -> dict:
        btstation = pd.read_csv(
            "backend/assets/bikeTour/bkstation_info(backup).csv",
            encoding="CP949",
            index_col=0,
        )
        return Response(btstation.to_dict("records"))

    def post(self, request):
        # queryset
        st_id = request.data.get("value")
        
        data = station_record[station_record['st_id1'] == st_id]
         
        minmax = dict(
            mintime=data["time"].min(),
            maxtime=data["time"].max(),
            minrecord=data["record"].min(),
            maxrecord=data["record"].max(),
            mindist=data["dist"].min(),
            maxdist=data["dist"].max(),
        )
        return Response({"data": data.to_dict("records"), "minmax": minmax})
