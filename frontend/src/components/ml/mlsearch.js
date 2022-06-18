import React, { useState, useRef, useEffect } from "react";
import { ReactComponent as Sub } from "./assets/icons/sub.svg";
import { ReactComponent as Bus } from "./assets/icons/bus.svg";
import { ReactComponent as Bike } from "./assets/icons/bike.svg";
function MlSearch() {
  const sub = <Sub width="25" height="27" />;
  const bus = <Bus width="30" height="30" />;
  const bike = <Bike width="30" height="30" />;
  const [searchterm, setSearchTerm] = useState("");
  const [isActive, setIsActive] = useState("");
  const [isclicked, setIsClicked] = useState(true);
  const searchclick = useRef();

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
  // 화면 진입하자마자 focus 되도록 설정
  useEffect(() => {
    searchclick.current.focus();
  }, []);

  return (
    <div style={{ position: "relative" }} className="w-100 h-100 d-flex">
      <div className="search-box px-4 d-flex">
        <div className="search-box-inner mx-auto py-3 px-4 flex-item justify-content-start ">
          <i className="fa-solid fa-angle-left my-auto me-3"></i>
          <input
            ref={searchclick}
            type="text"
            placeholder="출발 장소 검색"
            className="search-input"
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
          />
        </div>
      </div>
      <div className="flex-item flex-column">
        <div className="flex-item" style={{ flexGrow: 0.35 }}></div>
        <div className="items-box flex-item flex-column pt-2">
          <div
            className="mx-auto mb-2"
            style={{ width: "85%", borderBottom: "3px solid #ffffff1a" }}
          ></div>
          {options
            .filter((val) => {
              if (searchterm === "") {
                return null;
              }
              if (val.label.toLocaleLowerCase().includes(searchterm.toLowerCase())) {
                return val;
              }
            })
            .map((value, index) => {
              return (
                <>
                  <div
                    className="d-flex justify-content-center pt-2 pb-3 w-100"
                    key={value.key}
                    style={{
                      flexBasis: "0px",
                      backgroundColor: index === isActive ? "#DFDFDD80" : "",
                      color: index === isActive ? "#56667B" : "",
                    }}
                  >
                    <div className="d-flex" style={{ width: "40px" }}>
                      <div className="m-auto">{value.icon}</div>
                    </div>
                    <div
                      className="ms-3 fs-5 d-flex"
                      style={{ width: "75%" }}
                      onClick={(e) => {
                        // 선택한 리스트 이름 추출
                        console.log(e.currentTarget.textContent);
                        // 선택한 리스트 index 추출
                        console.log(index);
                        // 색 변하게 하는 function
                        setIsClicked((current) => !current);
                        isclicked ? setIsActive(index) : setIsActive("");
                      }}
                    >
                      {value.label}
                    </div>
                  </div>
                </>
              );
            })}
        </div>
      </div>
    </div>
  );
}

export default MlSearch;
