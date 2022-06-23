import React from "react";
import Slider from "react-slick";
import { ReactComponent as Sub } from "./assets/icons/sub.svg";
import { ReactComponent as Bus } from "./assets/icons/bus.svg";
import { ReactComponent as Bike } from "./assets/icons/bike.svg";
const MlSlider = ({ item }) => {
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
    [
      {
        value: 207,
        label: "207 여의도역 7번출구 대..",
        icon: bike,
      },
      {
        value: 207,
        label: "207 여의도역 7번출구 대..",
        icon: bike,
      },
      {
        value: "N26",
        label: "N26 여의도역 정류장",
        icon: bus,
      },
    ],
    [
      {
        value: 207,
        label: "207 여의도역 7번출구 대..",
        icon: bike,
      },
      {
        value: "N26",
        label: "N26 여의도역 정류장",
        icon: bus,
      },
    ],
  ];
  return (
    <div>
      <Slider {...settings} arrows={false}>
        {options.map((main_value, main_index) => {
          return (
            // card 반복문
            <div key={main_index}>
              <div className="card-recom">{main_index === 0 ? "이용 많은 순 " : "이용 기록 순"}</div>
              <div className="mlcard m-auto">
                <div className="px-2 pt-3 pb-2">
                  {/* 대여소 시각화 */}
                  {main_value.map((value, index) => {
                    return (
                      <div key={index} className="h-100">
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
  );
};

export default MlSlider;
