from bikeTourUtils import *
import pandas as pd
import numpy as np

# 필수 데이터 불러오기
station = pd.read_csv(
    "assets/bikeTour/newStationInfo.csv",
    encoding="CP949",
    index_col=0,
)

seoul_bike = pd.read_parquet("../parquet/220607_bike_record.parquet.gzip")

btstation = pd.read_csv(
    "assets/bikeTour/bkstation_info(backup).csv", encoding="CP949", index_col=0
)
st_id = 754
k = station[station["st_id"] == id]
bt = bikeRecommandation(btstation, seoul_bike, station)
a, b = bt.calculateDistAndTime(st_id)
print(a)
