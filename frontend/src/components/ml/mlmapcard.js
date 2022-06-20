import React from "react";
import mapimg from "./assets/여의나루역 2.png";
import Slider from "react-slick";
import { ReactComponent as Search } from "./assets/icons/Search.svg";
import { ReactComponent as Sub } from "./assets/icons/sub.svg";
import { ReactComponent as Bus } from "./assets/icons/bus.svg";
import { ReactComponent as Bike } from "./assets/icons/bike.svg";
function MlMapCard() {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
  };
  const bus = <Bus width="25" height="25" />;
  const sub = <Sub width="22" height="22" />;
  const bike = <Bike width="25" height="25" />;

  const options = [
    {
      key: 0,
      value: 207,
      label: "207 여의도역 7번출구 대..",
      icon: bike,
    },
    {
      key: 1,
      value: "N26",
      label: "N26 여의도역 정류장",
      icon: bus,
    },
    {
      key: 2,
      value: "9호선",
      label: "9호선 여의도역",
      icon: sub,
    },
  ];
  const optionss = [
    {
      key: 0,
      value: 207,
      label: "207 여의도역 7번출구 대..",
      icon: bike,
    },
    {
      key: 1,
      value: "N26",
      label: "N26 여의도역 정류장",
      icon: bike,
    },
    {
      key: 2,
      value: "9호선",
      label: "9호선 여의도역",
      icon: sub,
    },
    // {
    //   key: 2,
    //   value: "9호선",
    //   label: "9호선 여의도역",
    //   icon: sub,
    // },
  ];
  const options2 = [options, optionss];
  return (
    <div style={{ position: "relative" }} className="flex-container">
      {/* 검색창 관련 항목 */}
      <div style={{ position: "absolute", height: "20%", width: "100%" }}>
        <div className="d-flex" style={{ height: "45%", width: "100%" }}></div>
        <div className="search-box px-4">
          <div className="search-box-inner mx-auto py-3 px-4 flex-item justify-content-start ">
            <Search />
          </div>{" "}
        </div>
      </div>
      {/* card 관련 항목 */}
      <div style={{ position: "absolute", zIndex: 100, width: "100%", top: "55%" }}>
        <Slider {...settings} arrows={false}>
          {options2.map((main_value, main_index) => {
            return (
              // card 표시하는 반복문
              <div key={main_index}>
                <div className="card-recom">{main_index === 0 ? "이용 많은 순 " : "이용 기록 순"}</div>
                <div className="mlcard">
                  <div className="px-2 pt-3 pb-2">
                    {/* 대여소 표시하는 반복문 */}
                    {main_value.map((value, index) => {
                      return (
                        <div key={index}>
                          <div className="d-flex px-2">
                            <div className="m-auto" style={{ width: "10%" }}>
                              {value.icon}
                            </div>
                            <div className="m-auto" style={{ width: "80%" }}>
                              {value.label}
                            </div>
                          </div>
                          {/* dots 넣기 위한 삼항 연산자 */}
                          {index === main_value.length - 1 ? (
                            ""
                          ) : (
                            <div className="d-flex px-2">
                              <div className="d-flex" style={{ width: "15%" }}>
                                <i className="fa-solid fa-ellipsis-vertical m-auto my-1"></i>
                              </div>
                              <div className="m-auto" style={{ width: "80%" }}></div>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  <div className="d-flex w-100 px-4 align-items-end">
                    <div className="me-2" style={{ fontSize: "22px" }}>
                      24분
                    </div>
                    <div className="">7.3km</div>
                  </div>
                </div>
              </div>
            );
          })}
        </Slider>
      </div>
      {/* 지도관련 항목*/}
      <div className="flex-item">
        <img src={mapimg} alt="" className="map-ml" />
      </div>
    </div>
  );
}

export default MlMapCard;
