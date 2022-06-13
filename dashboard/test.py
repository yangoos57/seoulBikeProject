from utils import *
import time
start = time.time()

matplotlib.use('Agg')
plt.rc('font', family='Malgun Gothic') # For Windows
seoul_bike_raw_data = pd.read_parquet('D:/git_local_repository/django_data_visualization/dashBoard/static/bike_record_including_datetime.parquet.gzip')
bike_info = pd.read_csv('D:/git_local_repository/django_data_visualization/dashBoard/static/options.csv',encoding='CP949')
station_info = pd.read_csv('D:/git_local_repository/django_data_visualization/dashBoard/static/seoul_bike_station_01_12.csv',encoding='CP949')
near_sub =pd.read_csv('D:/git_local_repository/django_data_visualization/dashBoard/static/near_sub_station.csv',encoding='CP949')
print('load',start-time.time())



# ## Class Base View Test
# class plots() :

#     def get(self) :
#         # queryset 
#         val = 207
#         filter_start = "대여소"

#         # dataframe
#         filtered_data = raw_data(query_data=seoul_bike_raw_data,val=val)

        
#         start = time.time()
#         recommend_sub = recommend_sub_station(filtered_data=filtered_data, stat_id=val, near_sub=near_sub, station=station_info,filter_start=filter_start)
#         print('recommend_sub',start-time.time())

#         # # img
#         start = time.time()
#         img_1 = day_rent(filtered_data=filtered_data)
#         print('img_1',start-time.time())
#         start = time.time()

#         # #plotly
#         start = time.time()
#         plotly_1 = recommend_sub.plotly_image()
#         print('plotly_1',start-time.time())

class recommend_sub_station :

    def __init__(self, filtered_data, stat_id ,near_sub, station,filter_start="대여소") :
        '''

        해당 대여소에서 자주 이용하는 지하철역과 그 주변에 있는 따릉이 대여소를 추천하는 매서드임.
        filtered_data는 원하는 대여소가 sorting 된 DataFrame이 필요함.
        
        filter_start는 "대여소" 또는 "역"만 올 수 있음.

        '''
        self.stat_id = stat_id
        self.near_sub = near_sub
        self.station = station
        self.filter_start = filter_start

        '''
        개별 대여소별로 해당 대여소와 얼마나 교류가 있는지 확인한다.
        '''

        # ex) 기준대여소 to 다른 대여소 (1to2)
        total_num_left = filtered_data[filtered_data["st_id1"] == stat_id]["st_id2"].value_counts()  

        # ex) 다른 대여소 to 기준대여소 (2to1)
        total_num_right = filtered_data[filtered_data["st_id2"] == stat_id]["st_id1"].value_counts()


        # 1to2, 2to1 합치기
        combine_values = pd.concat([total_num_left, total_num_right], axis=1)
        combine_values.fillna((1), inplace=True)
        combine_values.rename(columns=dict(st_id2="1to2", st_id1="2to1"), inplace=True)

        # 계산 결과 종합
        result_concat = (
            combine_values.reset_index().groupby("index")[["1to2", "2to1"]].sum()
        )

        '''
        역 주변 대여소로 특정할 경우 역과 관련된 따릉이 대여소는 제외한다. 
        '''
        # 역 주변 대여소가 검색될 때 해당역 주변 대여소는 제거한다. | 316 대여소는 종각역과 관련됐는데, 종각과 관련된 대여소는 제거했다.
        try:
            filter_sub = near_sub.query("bi_st_id == @stat_id")["sub_name"].iloc[0]
            filter_sub_2 = near_sub.query("sub_name ==@filter_sub")["bi_st_id"].values
            result_concat = result_concat[~result_concat.index.isin(filter_sub_2)]
        except:
            pass

        '''
        총 이동횟수를 구한 뒤 50회 미만인 대여소는 이동량이 없다고 판단.
        '''

        # 이동기록 기록 50건 이하 제거
        count_rent = 50
        result_concat = result_concat[(result_concat['1to2'] > count_rent) | (result_concat['2to1'] > count_rent) ]

        # 지하철역 인근 따릉이 대여소 정보와 종합
        sorted_sub = pd.merge(
            result_concat,
            near_sub,
            how="left",
            left_on=result_concat.index,
            right_on="bi_st_id",
        ).dropna(subset=['sub_name'])   


        '''
        대여소를 기준으로 대여소 거리 계산 
        '''
        # 기준 대여소와 역근처 대여소 직선 거리계산
        station_lat_lon = station[station["st_id"].isin(sorted_sub["bi_st_id"])][
            ["st_id", "st_name", "latitude", "longtitude"]
        ]

        dist_to_station = haversine_np(
            station.loc[station["st_id"] == stat_id, "longtitude"].values,
            station.loc[station["st_id"] == stat_id, "latitude"].values,
            station_lat_lon["longtitude"].values,
            station_lat_lon["latitude"].values,
        )
        station_lat_lon["distance"] = dist_to_station

        #  해당 대여소와의 거리정보 종합
        sorted_sub = pd.merge(
            sorted_sub, station_lat_lon, left_on="bi_st_id", right_on="st_id"
        ).drop(columns=["st_id"])



        '''
        연산 속도를 줄이기 위해 top 10개 대여소만 선정
        '''
        sorted_sub['total'] = sorted_sub['1to2'] + sorted_sub['2to1']
        sorted_sub = sorted_sub.sort_values(by='total', ascending=False)[:10]


        '''
        가는 시간 및 거리 계산
        '''
        start = time.time()
        # 대여소별 예상 도착시간 계산
        result_station = []
        for station_id in sorted_sub["bi_st_id"]:

            # 대여소 기준 해당 역으로 가는 시간
            BM = filtered_data["st_id2"] == station_id
            st_id1_time = (
                filtered_data[BM]["riding_time"]
                .value_counts()
                .sort_values(ascending=False)
            )
            mean_id1 = round(st_id1_time.index[:3].values.mean(), 1)

            # 해당 역에서 대여소로 가는 시간
            BM = filtered_data["st_id1"] == station_id
            st_id2_time = (
                filtered_data[BM]["riding_time"]
                .value_counts()
                .sort_values(ascending=False)
            )
            mean_id2 = round(st_id2_time.index[:3].values.mean(), 1)

            result_station.append([mean_id1, mean_id2])
        print('recommend_sub',start-time.time())


        # 예상시간정보 종합(대여소: 대여소에서 출발)
        est_time = pd.DataFrame(result_station, columns=["대여소", "역"])

        # return 자료 생성
        self.nearest_sub = pd.concat([sorted_sub.reset_index(drop=True), est_time], axis=1)


        '''
        name_sub를 table과 plotly 모두 사용하므로 init으로 빼놨음.
        '''
        # 대여소 출발을 고른 경우
        if filter_start == "대여소":
            sub_sorted_station = (
                self.nearest_sub.groupby("sub_name")["1to2"]
                .sum()
                .sort_values(ascending=False)
                .reset_index(drop=False)
            )  # 대여소 별 이동량 종합
            self.counts = "1to2"

        # 역 출발을 고른 경우
        elif filter_start == "역":
            sub_sorted_station = (
                self.nearest_sub.groupby("sub_name")["2to1"]
                .sum()
                .sort_values(ascending=False)
                .reset_index(drop=False)
            )
            self.counts = "2to1"

        # 결과에 따라 관련 대여소 이름이 다름.
        self.name_sub = sub_sorted_station["sub_name"].tolist()



    def table_info(self) :

        # 대여소 예상시간 테이블 만들기
        nearest_sub_sorted = (
            self.nearest_sub[["bi_st_id","sub_name", self.counts, f"{self.filter_start}"]]
            .sort_values(by=f"{self.filter_start}")
            .query("sub_name == @self.name_sub")
            .reset_index(drop=True)
        )
        nearest_sub_sorted.columns = ["대여소 번호", "역사명", "대여기록", "예상시간"]
        # nearest_sub_sorted = nearest_sub_sorted.query("대여기록 > 50").copy()

        nearest_sub_sorted["예상시간"] = nearest_sub_sorted["예상시간"].apply(
            lambda x: str(int(x)) + "분"
        )
        nearest_sub_sorted["대여기록"] = nearest_sub_sorted["대여기록"].apply(
            lambda x: str(int(x)) + "건"
        )

        return nearest_sub_sorted


    def plotly_image(self) : 

        # figure 만들기
        start = time.time()
        fig = px.scatter_mapbox(
            self.nearest_sub.query("sub_name == @self.name_sub"),
            lat="latitude",
            lon="longtitude",
            hover_name="sub_name",
            hover_data=["1to2", "2to1", "bi_st_id", f"{self.filter_start}"],
            color="sub_name",
            opacity=0.5,
            template="seaborn",
            mapbox_style='carto-positron',
            # size='total', size_max=20,
            zoom=12,
            height=500,
        )
        # marker 정보
        fig.for_each_trace(lambda t: t.update(name="<b>" + t.name + "</b>"))
        fig.update_traces(marker={"size": 15})
        print('load',start-time.time())


        # 해당 따릉이 대여소 색 표시
        start = time.time()
        fig_2 = go.Figure(
            go.Scattermapbox(
                name="대여소",
                lat=self.station.query("st_id==@self.stat_id")["latitude"],
                lon=self.station.query("st_id==@self.stat_id")["longtitude"],
                mode="markers+text",
                marker={"size": 10, "color": "cyan", "opacity": 0.4},
                text=self.station.query("st_id==@self.stat_id")["st_name"].values,
            )
        )

        fig.add_trace(fig_2.data[0])
        print('load',start-time.time())


        fig.update_layout(
            margin=dict(l=0, r=0, t=0, b=0),
        #     mapbox=dict(
        #     accesstoken="pk.eyJ1IjoieWFuZ29vcyIsImEiOiJjbDNqd2tkN2IwbGdmM2pvNzF0c2M4NnZkIn0.J3IjPYg3w28cGiWkUD7bnA",
        #     # style='mapbox://styles/yangoos/cl3jubvl7000c14llgtoev0nm'
        # ),
            legend=dict(
                yanchor="top",
                y=0.99,
                xanchor="right",
                x=0.99,
                bgcolor="rgba(223, 235, 223, 0.3)",
            ),
        )
        start = time.time()
        off_plot = plotly.io.to_html(
            fig, include_plotlyjs=False, full_html=True, include_mathjax=False
        )
        bs = BeautifulSoup(off_plot, features="html.parser")
        div_data = bs.find("div", "plotly-graph-div")
        script_data = (
            bs.find("script")
            .text.replace(" ", "")
            .replace("<br>", "")
            .replace("<extra>", "")
            .replace("</extra>", "")
        )
        context = {"div_data": str(div_data), "script_data": str(script_data)}
        print('load',start-time.time())
        return context

if __name__ == "__main__":
    a = recommend_sub_station(seoul_bike_raw_data, 207, near_sub, station_info)
    a.plotly_image()