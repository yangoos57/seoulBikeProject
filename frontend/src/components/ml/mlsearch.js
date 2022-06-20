import React, { useEffect } from "react";
import { ReactComponent as Sub } from "./assets/icons/sub.svg";
import { ReactComponent as Bus } from "./assets/icons/bus.svg";
import { ReactComponent as Bike } from "./assets/icons/bike.svg";
import SearchBoxMl from "./searchboxml";
import SearchItem from "./searchitem";

function MlSearch({
  pageChange,
  setPageChange,
  setClickedItemName,
  searchTermStart,
  setSearchTermStart,
  setDeparture,
}) {
  "list item에 들어갈 options 설정";
  " useeffect : 페이지 이동할때 쓰여있는 값들 자동으로 초기화하는 함수 pageChange는 왜 노란색일까 ";
  const sub = <Sub width="25" height="27" />;
  const bus = <Bus width="30" height="30" />;
  const bike = <Bike width="30" height="30" />;
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
  useEffect(() => {
    setSearchTermStart("");
    setDeparture("");
  }, [pageChange]);

  return (
    <div className="flex-container flex-column">
      <div className="d-flex" style={{ height: "10%" }}></div>
      <div className="d-flex" style={{ height: "11%" }}>
        <SearchBoxMl
          placeholder={"출발 대여소 검색"}
          onChange={setSearchTermStart} //
          change={searchTermStart}
          setPageChange={() => {}} //에러방지용
        />
      </div>

      <div className="d-flex flex-column " style={{ height: "80%" }}>
        <SearchItem
          searchterm={searchTermStart}
          options={options}
          setClickedItemName={setClickedItemName}
          setPageChange={setPageChange}
          appendDirection={setDeparture}
        />
      </div>
    </div>
  );
}

export default MlSearch;
