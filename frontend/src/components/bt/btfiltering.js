import React from "react";
const BtFiltering = ({ setClickedName, clickedName }) => {
  const boxStyle = {
    flexBasis: "30%",
    backgroundColor: "var(--silver-color)",
    fontSize: "16px",
    borderRadius: "5px",
    cursor: "pointer",
    marginBottom: "10px",
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
    e.target.innerText !== clickedName ? setClickedName(e.target.innerText) : setClickedName(undefined);
  }
  return (
    <div className="flex-container flex-column w-100">
      <div
        style={{
          color: "var(--black-color)", //
          fontSize: "20px",
          fontFamily: "NEXON",
          flexBasis: "50%",
        }}>
        도착대여소 선택하기
      </div>
      <div className="d-flex justify-content-between" style={{ flexBasis: "50%" }}>
        <div
          className="d-flex px-2"
          style={boxStyle} //
          onMouseOver={MouseOn}
          onMouseOut={mouseOut}
          onClick={mouseClick}>
          <div className="m-auto">여행시간</div>
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
          <div className="m-auto">여행거리</div>
        </div>
      </div>
    </div>
  );
};

export default BtFiltering;
