import React, { useEffect, useState } from "react";
import MlSearchTop from "./mlsearchtop";
import MlSearchBottom from "./mlsearchbottom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ReactComponent as Sub } from "./assets/icons/sub.svg";
import { ReactComponent as Bus } from "./assets/icons/bus.svg";
import { ReactComponent as Bike } from "./assets/icons/bike.svg";

const MlSearchPage = () => {
  "pageChange : 초기값 true, mlsearch1 listitem onclick시 false 반환";
  "이후 mlsearch2 searchbox에서 첫번째 창 onclick시 true 반환";
  "ClickedItemName : mlsearch2에서 첫번째 검색 값에 넣는 변수. 다만들고 보니";
  "departure 변수를 사용해도 문제 없었음. 다만 4개를 전부 고쳐야하므로 현재는 귀찮아서 남겨둠";
  "searchterm start,end : input값 변화를 추적하는 용도 searchitem과 searchbox를 연결해줌";
  "departure,arrival : 최종 값을 저장하는 용도  두  값 모두 저장되면 다음 페이지로 넘어가도록 세팅";

  const [ClickedItemName, setClickedItemName] = useState("");
  const [searchTermStart, setSearchTermStart] = useState("");
  const [searchTermEnd, setSearchTermEnd] = useState("");
  const [pageChange, setPageChange] = useState(true);
  const [departure, setDeparture] = useState("");
  const [arrival, setArrival] = useState("");
  const navigate = useNavigate();

  // console.log("출발 : ", departure);
  // console.log("도착 : ", arrival);
  if (departure !== "" && arrival !== "") {
    navigate(
      "/ml/direction", //
      { state: { value1: departure, value2: arrival } }
    );
  }
  // navigate({
  //   pathname: "/ml/mapcard",
  //   search: `?${createSearchParams({ state: { value1: departure, value2: arrival } })}`,
  // });

  const options = [
    {
      value: 207,
      label: "207 여의도역 7번출구 대..",
      icon: "bike",
    },
  ];

  const [infoData, setInfoData] = useState(options);
  const [dataNew, setDataNew] = useState(options);

  useEffect(() => {
    axios
      .get("api/departureInfo") //
      .then((res) => setInfoData(res.data));
  }, []);

  useEffect(() => {
    const sub = <Sub width="30" height="30" />;
    const bus = <Bus width="30" height="30" />;
    const bike = <Bike width="30" height="30" />;

    if (typeof infoData === "object") {
      function bikSvg(obj) {
        return { ...obj, icon: bike };
      }
      function busSvg(obj) {
        return { ...obj, icon: bus };
      }
      function subSvg(obj) {
        return { ...obj, icon: sub };
      }
      const newData = [];
      infoData.filter((val) => {
        if (val.value < 3000) {
          return newData.push(bikSvg(val));
        } else if (val.value > 4000) {
          return newData.push(busSvg(val));
        } else {
          return newData.push(subSvg(val));
        }
      });
      setDataNew(newData);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [infoData]);

  return (
    <div className="whole-ml d-flex ">
      <div className="main-ml m-auto ">
        <div className="flex-container flex-column">
          {pageChange ? (
            <MlSearchTop
              pageChange={pageChange}
              setPageChange={setPageChange}
              setClickedItemName={setClickedItemName}
              setSearchTermStart={setSearchTermStart}
              searchTermStart={searchTermStart}
              setDeparture={setDeparture}
              options={dataNew}
            />
          ) : (
            <MlSearchBottom
              pageChange={pageChange}
              setPageChange={setPageChange}
              ClickedItemName={ClickedItemName}
              setSearchTermEnd={setSearchTermEnd}
              searchTermEnd={searchTermEnd}
              setArrival={setArrival}
              options={dataNew}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default MlSearchPage;
