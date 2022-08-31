import React, { useEffect } from "react";

const BtFiltering = ({ setClickedName, clickedName }) => {
  function mouseOn(e) {
    e.currentTarget.style.backgroundColor = "var(--green-color)";
    e.currentTarget.style.color = "var(--silver-color)";
  }
  function mouseOut(e) {
    e.currentTarget.style.backgroundColor = "var(--silver-color)";
    e.currentTarget.style.color = "var(--black-color)";
  }

  function mouseClick(e) {
    e.target.innerText !== clickedName ? setClickedName(e.target.innerText) : setClickedName(undefined);
    e.currentTarget.style.backgroundColor = "var(--green-color)";
    e.currentTarget.style.color = "var(--black-color)";
  }

  return (
    <div className="flex-container flex-column fontSet">
      <div
        style={{
          color: "var(--black-color)",
          fontFamily: "NEXON",
          flexBasis: "50%",
        }}>
        도착대여소 선택하기
      </div>
      <div className="d-flex justify-content-between" style={{ flexBasis: "50%" }}>
        <div
          className="d-flex px-2 filterBoxStyle"
          //
          onMouseOver={clickedName === "이동시간" ? undefined : mouseOn}
          onMouseOut={clickedName === "이동시간" ? undefined : mouseOut}
          onClick={mouseClick}
          style={{ backgroundColor: clickedName === "이동시간" ? "var(--green-color)" : "var(--silver-color)" }}>
          <div className="m-auto">이동시간</div>
        </div>
        <div
          className="d-flex px-2 filterBoxStyle py-1"
          onMouseOver={clickedName === "이동거리" ? undefined : mouseOn}
          onMouseOut={clickedName === "이동거리" ? undefined : mouseOut}
          onClick={mouseClick}
          style={{ backgroundColor: clickedName === "이동거리" ? "var(--green-color)" : "var(--silver-color)" }}>
          <div className="m-auto">이동거리</div>
        </div>
        <div
          className="d-flex px-2 filterBoxStyle py-1 "
          onMouseOver={clickedName === "대여기록" ? undefined : mouseOn}
          onMouseOut={clickedName === "대여기록" ? undefined : mouseOut}
          onClick={mouseClick}
          style={{ backgroundColor: clickedName === "대여기록" ? "var(--green-color)" : "var(--silver-color)" }}>
          <div className="m-auto">대여기록</div>
        </div>
      </div>
    </div>
  );
};

export default BtFiltering;
