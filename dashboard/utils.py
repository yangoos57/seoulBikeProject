from bs4 import BeautifulSoup
import plotly.express as px
import plotly.graph_objects as go
import plotly
import matplotlib.pyplot as plt
import matplotlib.patches as patches
import matplotlib
import matplotlib
import pandas as pd
import numpy as np
import base64
import ast
from io import BytesIO
from matplotlib import font_manager, rc
# 한글폰트
font_name = [f.name for f in matplotlib.font_manager.fontManager.ttflist if 'Nanum' in f.name]
plt.rcParams["font.family"] = 'NanumGothic' 
# rc('font', family=font_name)

# def time_check(func):
#     def wrapper():
#         start_in = time.time()
#         func()
#         print(func.__name__, '결과', start_in-time.time())
#     return wrapper

################## 기본 함수
def get_graph():
    buffer = BytesIO()
    plt.savefig(buffer, format="png", bbox_inches="tight")
    buffer.seek(0)
    image_png = buffer.getvalue()
    graph = base64.b64encode(image_png)
    graph = graph.decode("utf-8")
    buffer.close()
    return graph


def haversine_np(lon1, lat1, lon2, lat2):
    """
    Calculate the great circle distance between two points
    on the earth (specified in decimal degrees)

    All args must be of equal length.    

    """
    lon1, lat1, lon2, lat2 = map(np.radians, [lon1, lat1, lon2, lat2])

    dlon = lon2 - lon1
    dlat = lat2 - lat1

    a = np.sin(dlat / 2.0) ** 2 + np.cos(lat1) * np.cos(lat2) * np.sin(dlon / 2.0) ** 2

    c = 2 * np.arcsin(np.sqrt(a))
    m = 6367 * c * 1000
    return m


def raw_data(query_data, val):
    quert_st_id1 = query_data[query_data["st_id1"] == val]
    quert_st_id2 = query_data[query_data["st_id2"] == val]
    filtered_data = pd.concat([quert_st_id1, quert_st_id2], axis=0).drop_duplicates()
    filtered_data.drop(columns="index", inplace=True)
    # filtered_data.reset_index(drop=True, inplace=True)

    # 대여
    filtered_data_start = filtered_data[
        (filtered_data["st_id1"] == val) & (filtered_data["st_id2"] != val)
    ]

    # 반납
    filtered_data_end = filtered_data[
        (filtered_data["st_id2"] == val) & (filtered_data["st_id1"] != val)
    ]

    return [filtered_data, filtered_data_end, filtered_data_start]


def day_rent(filtered_data):
    # 일별 자전거 대여
    filtered_data = filtered_data[0]
    filtered_data["weekday"] = filtered_data["date"].dt.weekday
    data = filtered_data.groupby("weekday").size()
    data_numpy = data.to_numpy()

    # max 요일
    max_value = np.where(data_numpy == data_numpy.max())[0][0]
    max_value

    # min 요일
    min_value = np.where(data_numpy == data_numpy.min())[0][0]
    min_value

    # 높이 normalize 후 0.5 더함( 0.5는 막대 길이를 의미함)
    height = list(
        map(
            lambda x: round(
                ((x - data_numpy.min()) / (data_numpy.max() - data_numpy.min())) * 0.8
                + 0.5,
                2,
            ),
            data_numpy,
        )
    )

    # 사각형 정보
    bars = []
    for num, h in enumerate(height):
        ist = [num, 0, h, 0.8]  # x,y,h,w
        bars.append(ist)
    # 날짜
    days = ["월", "화", "수", "목", "금", "토", "일"]

    # plot
    fig, ax = plt.subplots(figsize=(12, 8))

    # bar = rect
    for num, (bar, days) in enumerate(zip(bars, days)):
        x = bar[0]
        y = bar[1]
        h = bar[2]
        w = bar[3]
        # max
        if num == max_value:
            color = ["blue", "white"]  # full color, font-color
        # min
        elif num == min_value:
            color = ["green", "black"]  # full color, font-color
        # 나머지
        else:
            color = ["gray", "black"]  # full color, font-color

        bbox = patches.FancyBboxPatch(
            (x, y),
            w,
            h,
            boxstyle="round,pad=-0.01,rounding_size=0.2",
            ec="none",
            fc=color[0],
            mutation_aspect=0.5,
            alpha=0.5,
        )
        ax.add_patch(bbox)

        # 요일 넣기(padding고려해서 num으로 조정)
        plt.text(x + 0.3, y + 0.05, days, fontdict={"fontsize": 27, "color": color[1]})

        # 개수 넣기
        plt.text(
            x + 0.3,
            h - 0.25,
            data[num],
            rotation=90,
            fontdict={"fontsize": 25, "color": color[1]},
        )

    plt.xlim(0, 6.8)  # 넓이가 0.8이라서 그럼
    plt.ylim(0, 1.3)
    plt.axis("off")
    graph = get_graph()
    plt.close()
    return graph


# 반납 : filtered_data_end(=num 1), 대여 : filtered_data_start(=num 2)


def frequent_station(filtered_data, bike_info, num=1):
    data = (
        filtered_data[num]
        .groupby(f"st_id{num}")
        .size()
        .sort_values(ascending=False)[:3]
    )
    data_index = data.index
    labels = [bike_info.query("value == @i")["label"].iloc[0] for i in data_index]
    data_numpy = data.to_numpy()
    height = list(
        map(
            lambda x: round(
                ((x - data_numpy.min()) / (data_numpy.max() - data_numpy.min())) + 0.5,
                2,
            ),
            data_numpy,
        )
    )

    bars = []
    for num, w in enumerate(height[::-1]):
        ist = [0, num, 1, w]  # x,y,h,w
        bars.append(ist)
    # 날짜
    days = ["월", "화", "수", "목", "금", "토", "일"]

    # plot
    fig, ax = plt.subplots(figsize=(7, 3))

    # bar = rect
    for num, (bar, label) in enumerate(zip(bars, labels)):
        x = bar[0]
        y = bar[1]
        h = bar[2]
        w = bar[3]
        color = ["#A1C9EE", "#79B2E7", "#579FE1"]  # full color, font-color
        bbox = patches.FancyBboxPatch(
            (x, y),
            w,
            h,
            boxstyle="round,pad=-0.0001,rounding_size=0",
            ec="none",
            fc=color[num],
            mutation_aspect=0.5,
            # alpha=1
        )
        ax.add_patch(bbox)

        # 대여소 이름 넣기
        plt.text(
            0.01, y + 0.4, f"{label[:20]}", fontdict={"fontsize": 16, "color": "black"}
        )

        # # 개수 넣기
        # len(data)-1-num으로 한 이유는 역순으로 뽑아야 하기때문
        plt.text(
            1.4,
            y + 0.25,
            data.iloc[len(data) - 1 - num],
            rotation=90,
            fontdict={"fontsize": 16, "color": "black"},
        )

    plt.xlim(0, 1.5)  # 넓이가 0.8이라서 그럼
    plt.ylim(0, 2.8)
    plt.axis("off")
    graph = get_graph()
    plt.close()
    return graph


def total_rent(filtered_data):
    fig, ax = plt.subplots(figsize=(6, 3), subplot_kw=dict(aspect="equal"))

    # 데이터 정제
    a = len(filtered_data[1])
    b = len(filtered_data[2])
    percent = int(a / (a + b) * 100)

    # plot에 필요한 변수 설정
    tag = [f"반납 : {percent}%", f"대여 :{100-percent}%"]
    data = [a, b]
    wedge_properties = {"edgecolor": "white", "linewidth": 2}
    bbox_props = dict(boxstyle="square,pad=0.3", fc="w", ec="k", lw=0.72)
    kw = dict(bbox=bbox_props, zorder=0, va="center")

    # pie plot
    wedges, texts = ax.pie(
        data,
        wedgeprops=dict(width=0.3, edgecolor="k", linewidth=0.5),
        startangle=-40,
        colors=["#79B2E7", "#DCDEDF"],
    )

    # annotation 설정
    for i, p in enumerate(wedges):
        ang = (p.theta2 - p.theta1) / 2.0 + p.theta1
        y = np.sin(np.deg2rad(ang))
        x = np.cos(np.deg2rad(ang))
        horizontalalignment = {-1: "right", 1: "left"}[int(np.sign(x))]
        connectionstyle = "angle,angleA=0,angleB={}".format(ang)
        ax.annotate(
            tag[i],
            xy=(x, y),
            xytext=(1 * np.sign(x), 1 * y),
            horizontalalignment=horizontalalignment,
            **kw,
        )
        ax.text(-0.5, 0.05, "대여소 이용", fontdict={"color": "black", "fontsize": 14})
        ax.text(-0.4, -0.15, f"{a+b}건", fontdict={"color": "black", "fontsize": 14})

    graph = get_graph()
    plt.close()
    return graph


class recommend_sub_station:
    def __init__(self, filtered_data, stat_id, near_sub, station, filter_start="대여소"):
        """

        해당 대여소에서 자주 이용하는 지하철역과 그 주변에 있는 따릉이 대여소를 추천하는 매서드임.
        filtered_data는 원하는 대여소가 sorting 된 DataFrame이 필요함.
        
        filter_start는 "대여소" 또는 "역"만 올 수 있음.

        """
        self.stat_id = stat_id
        self.near_sub = near_sub
        self.station = station
        self.filter_start = filter_start
        self.filtered_data = filtered_data

        """
        개별 대여소별로 해당 대여소와 얼마나 교류가 있는지 확인한다.
        """

        # ex) 기준대여소 to 다른 대여소 (1to2)
        total_num_left = filtered_data[filtered_data["st_id1"] == stat_id][
            "st_id2"
        ].value_counts()

        # ex) 다른 대여소 to 기준대여소 (2to1)
        total_num_right = filtered_data[filtered_data["st_id2"] == stat_id][
            "st_id1"
        ].value_counts()

        # 1to2, 2to1 합치기
        combine_values = pd.concat([total_num_left, total_num_right], axis=1)
        combine_values.fillna((1), inplace=True)
        combine_values.rename(columns=dict(st_id2="1to2", st_id1="2to1"), inplace=True)

        # 계산 결과 종합
        result_concat = (
            combine_values.reset_index().groupby("index")[["1to2", "2to1"]].sum()
        )

        """
        역 주변 대여소로 특정할 경우 역과 관련된 따릉이 대여소는 제외한다. 
        """
        # 역 주변 대여소가 검색될 때 해당역 주변 대여소는 제거한다. | 316 대여소는 종각역과 관련됐는데, 종각과 관련된 대여소는 제거했다.
        try:
            filter_sub = near_sub.query("bi_st_id == @stat_id")["sub_name"].iloc[0]
            filter_sub_2 = near_sub.query("sub_name ==@filter_sub")["bi_st_id"].values
            result_concat = result_concat[~result_concat.index.isin(filter_sub_2)]
        except:
            pass

        """
        총 이동횟수를 구한 뒤 50회 미만인 대여소는 이동량이 없다고 판단.
        """

        # 이동기록 기록 50건 이하 제거
        count_rent = 50
        result_concat = result_concat[
            (result_concat["1to2"] > count_rent) | (result_concat["2to1"] > count_rent)
        ]

        # 지하철역 인근 따릉이 대여소 정보와 종합
        sorted_sub = pd.merge(
            result_concat,
            near_sub,
            how="left",
            left_on=result_concat.index,
            right_on="bi_st_id",
        ).dropna(subset=["sub_name"])

        """
        대여소를 기준으로 대여소 거리 계산 
        """
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

        """
        연산 속도를 줄이기 위해 top 10개 대여소만 선정
        """
        sorted_sub["total"] = sorted_sub["1to2"] + sorted_sub["2to1"]
        sorted_sub = sorted_sub.sort_values(by="total", ascending=False)[
            :10
        ]  #####################

        """
        가는 시간 및 거리 계산
        """
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

        # 예상시간정보 종합(대여소: 대여소에서 출발)
        est_time = pd.DataFrame(result_station, columns=["대여소", "역"])

        # return 자료 생성
        self.nearest_sub = pd.concat(
            [sorted_sub.reset_index(drop=True), est_time], axis=1
        )

        """
        name_sub를 table과 plotly 모두 사용하므로 init으로 빼놨음.
        """
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

    def table_info(self):

        # 대여소 예상시간 테이블 만들기
        nearest_sub_sorted = (
            self.nearest_sub[
                ["bi_st_id", "sub_name", self.counts, f"{self.filter_start}"]
            ]
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

    def plotly_image(self):

        # figure 만들기
        fig = px.scatter_mapbox(
            self.nearest_sub.query("sub_name == @self.name_sub"),
            lat="latitude",
            lon="longtitude",
            hover_name="sub_name",
            hover_data=["1to2", "2to1", "bi_st_id", f"{self.filter_start}"],
            color="sub_name",
            opacity=0.5,
            template="seaborn",
            mapbox_style="carto-positron",
            # size='total', size_max=20,
            zoom=13,
        )
        # marker 정보
        fig.for_each_trace(lambda t: t.update(name="<b>" + t.name + "</b>"))
        fig.update_traces(marker={"size": 15})

        # 해당 따릉이 대여소 색 표시
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
        fig.update_layout(
            margin=dict(l=0, r=0, t=0, b=0),
            #     mapbox=dict(
            #     # accesstoken="pk.eyJ1IjoieWFuZ29vcyIsImEiOiJjbDNqd2tkN2IwbGdmM2pvNzF0c2M4NnZkIn0.J3IjPYg3w28cGiWkUD7bnA",
            # #     # style='mapbox://styles/yangoos/cl3jubvl7000c14llgtoev0nm'
            # ),
            legend=dict(
                yanchor="top",
                y=0.99,
                xanchor="right",
                x=0.99,
                bgcolor="rgba(223, 235, 223, 0.3)",
            ),
        )

        off_plot = plotly.io.to_html(
            fig,
            config=dict(displayModeBar=False),
            include_plotlyjs=False,
            full_html=True,
            include_mathjax=False,
        )
        bs = BeautifulSoup(off_plot, features="html.parser")
        div_data = bs.find("div", "plotly-graph-div")
        script_data = bs.find("script").text.replace(" ", "")
        context = {"div_data": str(div_data), "script_data": str(script_data)}
        return context
