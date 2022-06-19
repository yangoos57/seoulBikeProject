import React, { useEffect } from "react";
import SearchBoxMl from "./searchboxml";
import SearchItem from "./searchitem";
import { ReactComponent as Bike } from "./assets/icons/bike.svg";

const MlSearch2 = ({ pageChange, setPageChange, ClickedItemName, searchTermEnd, setSearchTermEnd, setArrival }) => {
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
      value: 208,
      label: "208 여의도역 7번출구 대..22",
      icon: bike,
    },
  ];
  useEffect(() => {
    setSearchTermEnd("");
    setArrival("");
  }, [pageChange]);

  return (
    <div className="flex-container flex-column">
      <div className="d-flex" style={{ height: "10%" }}></div>
      <div className="d-flex flex-column" style={{ height: "22%" }}>
        <SearchBoxMl
          icon={false} //
          placeholder={ClickedItemName}
          setPageChange={setPageChange}
        />
        <SearchBoxMl
          placeholder={"도착 대여소 검색"} //
          onChange={setSearchTermEnd}
          change={searchTermEnd}
          setPageChange={() => {}}
        />
      </div>
      <div
        className="d-flex fs-6 align-items-center justify-content-center"
        style={{ height: "5%", color: "#10E8C1B3", letterSpacing: "1px" }}
      >
        도착장소는 따릉이 대여소만 검색 가능합니다.
      </div>
      <div className="d-flex flex-column " style={{ height: "65%" }}>
        <SearchItem
          searchterm={searchTermEnd}
          options={options}
          onClick={() => console.log("이게 나와야 완성")}
          appendDirection={setArrival}
          setClickedItemName={() => {}}
          setPageChange={() => {}}
        />
      </div>
    </div>
  );
};

export default MlSearch2;
