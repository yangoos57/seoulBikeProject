import React from "react";
import "./assets/style.css";
import map from "./assets/map.png";
import chart from "./assets/chart.png";
import bar from "./assets/bar.png";
import table from "./assets/table.png";
import Selector from "./selector";

function Main() {
  return (
    <div className="wrap">
      <div className="header d-flex justify-content-center"></div>
      <div className="content">
        <div className="main">
          <div className="dash">
            <div className="space-box"></div>
            <div className="justify-content-evenly flex-item d-flex w-100">
              <div className="total-col"></div>
              <div className="total-col d-flex flex-column">
                <div className="left-col my-3 d-flex align-items-center justify-content-center">
                  <div className="d-flex align-items-center">
                    <div className="box-green d-flex " style={{ width: "35px", height: "35px" }}>
                      <i className="fa-solid fa-bicycle m-auto icon-gray"></i>
                    </div>{" "}
                    <div className="flex-item fs-5 ms-2">따릉이 대여소</div>
                  </div>
                </div>
                <div className="left-col mb-1 d-flex align-items-center justify-content-center">
                  <div className="d-flex align-items-center gray-box fw-bold border border-2 py-2 px-3">
                    <div className="flex-item gray-box">207 여의나루역 1번출구 앞 길이테스트중입니다.</div>
                  </div>
                </div>
                <div className="left-col mb-1 d-flex h-100">
                  <div className=" flex-item flex-column me-1">
                    <div className="left-col-thr-left border border-1 gray-box p-3">
                      <div className="text-center fs-6 mb-2">하루 평균 이용건수</div>
                      <div className="text-center">333 건</div>
                    </div>
                    <div className="left-col-thr-left border border-1 gray-box mt-1 p-3">
                      <div className="text-center fs-6 mb-2">총 이용건수</div>
                      <div className="text-center">333 건</div>
                    </div>
                  </div>
                  <div className="flex-item border border-1 gray-box flex-column p-1">
                    <div className="text-center fs-6 mx-auto pt-2">반납 대여 비율</div>
                    <div className="img-box">
                      <img src={chart} className="chart-image" alt=" " />
                    </div>
                    {/* <div>ssd</div> */}
                  </div>
                </div>
                <div className="left-col border border-1 gray-box d-flex mb-1 h-100">
                  <div className="img-box me-1">
                    <img src={bar} className="chart-image" alt=" " />
                  </div>
                  <div className="img-box ms-1">
                    <img src={bar} className="chart-image" alt=" " />
                  </div>
                </div>
                <div className="left-col d-flex h-100">
                  <div className="flex-item border border-1 flex-column gray-box me-1">
                    <div className=" pt-3 fs-7 text-center">
                      <i className="fa-solid fa-train-subway me-2 icon-gray"></i>가까운 지하철역
                    </div>
                    <div className="img-box">
                      <img src={table} className="chart-image" alt=" " />
                    </div>
                  </div>
                  <div className=" flex-item border border-1 flex-column gray-box ms-1">
                    <div className=" pt-3 fs-7 text-center">
                      <i className="fa-solid fa-bicycle me-2 icon-gray"></i>자주가는 대여소
                    </div>
                    <div className="img-box">
                      <img src={table} className="chart-image" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="total-col"></div>
              <div className="total-col d-flex flex-column">
                <div className="flex-item" style={{ position: "relative" }}>
                  <div
                    style={{ position: "absolute", width: "100%", height: 80, top: "5%", left: "0", background: "#ebeef242" }}
                    className="d-flex align-items-center justify-content-center"
                  >
                    <div className="box-green fs-7 p-2 w-100 mx-4 text-center fw-bold">
                      {" "}
                      <Selector />{" "}
                    </div>
                  </div>
                  <img className="map-image" src={map} alt=" " />
                  {/* <div
                    style={{ position: "relative", zIndex: 5, height: 80 }}
                    className="flex-item bg-white justify-content-center align-items-center"
                  > */}
                  {/* <div className="img-box">{plotly}</div> */}
                  {/* </div> */}
                </div>
              </div>
            </div>
            <div className="space-box"></div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
