import React, { useEffect } from "react";
import SearchBoxMl from "./mlsearchbox";
import MlSearchButton from "./mlsearchbutton";
import SearchItem from "./mlsearchitem";

function MlSearch({
  pageChange,
  setPageChange,
  setClickedItemName,
  searchTermStart,
  setSearchTermStart,
  setDeparture,
  options,
}) {
  "list item에 들어갈 options 설정";
  " useeffect : 페이지 이동할때 쓰여있는 값들 자동으로 초기화하는 함수 pageChange는 왜 노란색일까 ";

  useEffect(() => {
    // 뒤로가기 시 화면 초기화
    setSearchTermStart("");
    setDeparture("");

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageChange]);

  return (
    <div className="flex-container flex-column">
      <div className="d-flex" style={{ height: "10%" }}></div>
      <div className="d-flex flex-column" style={{ minHeight: "22%" }}>
        <SearchBoxMl
          placeholder={"출발장소 검색"}
          onChange={setSearchTermStart} //
          change={searchTermStart}
          setPageChange={() => {}} //에러방지용
        />
        <SearchBoxMl
          placeholder={"도착 대여소 검색"} //
          setPageChange={() => {}}
          disabled={true}
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
