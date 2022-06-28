import React, { useState } from "react";
const BkFiltering = ({ setIsBoxOn, isBoxOn, setClickedName, clickedName }) => {
  const boxStyle = {
    flexBasis: "30%",
    backgroundColor: "var(--silver-color)",
    fontSize: "16px",
    borderRadius: "5px",
    cursor: "pointer",
  };
  function MouseOn(e) {
    e.currentTarget.style.backgroundColor = "var(--green-color)";
    e.currentTarget.style.color = "var(--silver-color)";
  }
  function mouseOut(e) {
    e.currentTarget.style.backgroundColor = "var(--silver-color)";
    e.currentTarget.style.color = "var(--black-color)";
  }

  function mouseClick(e) {
    clickedName === undefined && setIsBoxOn(!isBoxOn);
    setClickedName(e.target.innerText);
    e.target.innerText === clickedName && setIsBoxOn(!isBoxOn);
  }

  return (
    <div className="d-flex flex-column w-100">
      <div style={{ color: "var(--black-color)", fontSize: "22px" }}>도착대여소 선택하기</div>
      <div className="d-flex justify-content-between my-2">
        <div
          className="d-flex px-2 py-1"
          style={boxStyle}
          onMouseOver={MouseOn}
          onMouseOut={mouseOut}
          onClick={mouseClick}>
          <div className="m-auto">도착시간</div>
        </div>
        <div
          className="d-flex px-2 py-1 "
          style={boxStyle}
          onMouseOver={MouseOn}
          onMouseOut={mouseOut}
          onClick={mouseClick}>
          <div className="m-auto">대여기록</div>
        </div>
        <div
          className="d-flex px-2 py-1"
          style={boxStyle}
          onMouseOver={MouseOn}
          onMouseOut={mouseOut}
          onClick={mouseClick}>
          <div className="m-auto">이동거리</div>
        </div>
      </div>
    </div>
  );
};

export default BkFiltering;
