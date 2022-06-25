import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { ReactComponent as Sub } from "./assets/icons/sub.svg";
import { ReactComponent as Bus } from "./assets/icons/bus.svg";
import { ReactComponent as Bike } from "./assets/icons/bike.svg";
const MlSlider = ({ mapdata, changeFunc, change }) => {
  const settings = {
    dots: false,
    arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    onSwipe: () => {
      changeFunc(!change);
    },
  };

  const bus = <Bus width="25" height="25" className="m-auto" />;
  const sub = <Sub width="25" height="25" className="m-auto" />;
  const bike = <Bike width="25" height="25" className="m-auto" />;

  var options = [];
  if (mapdata["route_info"] !== undefined) {
    mapdata["route_info"].map((val) => {
      var item = [];
      if (Object.keys(val)[0] === "bus") {
        let a = { label: Object.values(val)[0][0], icon: bus };
        let b = { label: Object.values(val)[0][1], icon: bus };
        let c = { label: Object.values(val)[1][0], icon: bike };
        let d = {
          label: Object.values(val)[1][1],
          icon: bike,
          time: Object.values(val)[1][2],
          record: Object.values(val)[1][3],
        };
        item = [a, b, c, d];
      } else if (Object.keys(val)[0] === "bike") {
        let a = { label: Object.values(val)[0][0], icon: bike };
        let b = {
          label: Object.values(val)[0][1],
          icon: bike,
          time: Object.values(val)[0][2],
          record: Object.values(val)[0][3],
        };
        item = [a, b];
      } else if (Object.keys(val)[0] === "bike2") {
        let a = { label: Object.values(val)[0][0], icon: bike };
        let b = {
          label: Object.values(val)[0][1],
          icon: bike,
          time: Object.values(val)[0][2],
          record: Object.values(val)[0][3],
        };
        item = [a, b];
      } else {
        let a = { label: Object.values(val)[0], icon: sub };
        let b = { label: Object.values(val)[1][0], icon: bike };
        let c = {
          label: Object.values(val)[1][1],
          icon: bike,
          time: Object.values(val)[1][2],
          record: Object.values(val)[1][3],
        };
        item = [a, b, c];
      }
      options.push(item);
    });
  }
  return (
    <div style={{ width: "80%", margin: "auto" }}>
      <Slider {...settings}>
        {options.map((main_value, main_index) => {
          return (
            // card 반복문
            <div key={main_index}>
              <div className="card-recom" style={{ color: "#10E8C1B3" }}>
                {main_index === 0 ? "추천 경로" : "자전거 추천 경로"}
              </div>
              <div className="mlcard m-auto">
                <div className="my-auto p-2" style={{ flexBasis: "95%" }}>
                  {/* 대여소 시각화 */}
                  {main_value.map((item, index) => {
                    return (
                      <div key={index} className="h-100">
                        {/* {console.log("item:", item)}
                        {console.log("index:", index)}
                        {console.log("label:", item.label)}
                        {console.log("time:", item.time)} */}
                        <div className="d-flex px-2 align-items-start">
                          <div className="mx-auto d-flex" style={{ width: "10%", backgroundColor: "#000000" }}>
                            {item.icon}
                          </div>
                          <div
                            className="m-auto"
                            style={{ width: "80%", overflow: "hidden", color: "var(--background-ml-color)" }}>
                            {item.label.length > 20 ? item.label.substring(0, 14) + "..." : item.label}
                            {/* {item.label} */}
                          </div>
                        </div>
                        {/* dots 넣기 위한 삼항 연산자 */}
                        {index !== main_value.length - 1 ? (
                          <div className="d-flex px-2">
                            <div className="d-flex" style={{ width: "15%" }}>
                              <i className="fa-solid fa-ellipsis-vertical m-auto my-1"></i>
                            </div>
                            <div className="m-auto" style={{ width: "80%" }}></div>
                          </div>
                        ) : (
                          <div className="d-flex w-100 pt-2 px-3 align-items-center">
                            <div
                              className="me-2"
                              style={{ fontSize: "22px", color: "var(--background-ml-color)", fontWeight: "lighter" }}>
                              {/* {item.time}분 */}
                              {item.time === 0 ? "" : item.time + "분"}
                            </div>
                            <div style={{ fontSize: "16px", color: "var(--background-ml-color)" }}>
                              {item.time === 0 ? (
                                item.record === 1 ? (
                                  <p className="pt-2 m-0">추천 대여소와 도착 대여소가 동일합니다.(도보이동)</p>
                                ) : (
                                  <p className="pt-2 m-0">해당 경로는 대여기록이 50건 미만이므로 추천하지 않습니다</p>
                                )
                              ) : (
                                "대여기록 " + item.record + "건"
                              )}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
                <div className="my-auto" style={{ flexBasis: "5%" }}>
                  {mapdata["bus"] !== undefined && <i class="fa-solid fa-angle-right fa-lg"></i>}
                </div>
              </div>
              {/* mlcard /div */}
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default MlSlider;
