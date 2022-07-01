import React, { useEffect, useState } from "react";
import SearchBoxMl from "./mlsearchbox";
import SearchItem from "./mlsearchitem";

function MlSearch2({
  pageChange,
  setPageChange,
  ClickedItemName,
  searchTermEnd,
  setSearchTermEnd,
  setArrival,
  options,
}) {
  const initialstate = [
    {
      value: 207,
      label: "207",
    },
  ];
  const [onlyBike, setOnlyBike] = useState(initialstate);

  useEffect(() => {
    const db = [];
    options.filter((val) => {
      if (val.value < 3000) {
        return db.push(val);
      }
    });
    setOnlyBike(db);
  }, []);

  useEffect(() => {
    setSearchTermEnd("");
    setArrival("");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageChange]);

  return (
    <div className="flex-container flex-column">
      <div className="d-flex" style={{ flexBasis: "5%" }}></div>
      <div className="d-flex flex-column" style={{ flexBasis: "20%" }}>
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
        style={{
          maxHeight: "5%", //
          color: "#10E8C1B3",
          letterSpacing: "1px",
          margin: "5px 0",
        }}>
        도착장소는 따릉이 대여소만 검색 가능합니다.
      </div>
      <div className="flex-item flex-column " style={{ flexBasis: "65%" }}>
        <SearchItem
          searchterm={searchTermEnd}
          options={onlyBike}
          onClick={() => {}}
          appendDirection={setArrival}
          setClickedItemName={() => {}}
          setPageChange={() => {}}
        />
      </div>
    </div>
  );
}

export default MlSearch2;
