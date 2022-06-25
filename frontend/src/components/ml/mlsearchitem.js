import React, { useState } from "react";
function MouseOverUserMenu(e) {
  e.target.style.color = "#DFDFDD";
  e.target.style.fontWeight = 400;
  //background는 currenttarget으로 해야 먹힘
  // e.currentTarget.style.background = "#DFDFDD";
}
function MouseOutUserMenu(e) {
  e.target.style.color = "#DFDFDDB3";
  // e.target.style.color = "green";
}

const SearchItem = ({
  searchterm,
  options,
  setClickedItemName = () => {},
  appendDirection = () => {},
  setPageChange = () => {},
}) => {
  "searchterm : searchbox에서 오는 정보";
  "options : item list";
  "setclickeditemname :itemname을 저장함";
  "appendDirection : 최종 결과를 저장함";
  "setPageChange : item을 click하면 page 이동하도록 설정(첫번째 검색창에서만 활용)";
  "setactive(사라졌지만 혹시나) : searchbox와 함께 사용됨. 클릭 해제하거나 글자수 초기화되면 x 사라지게하는 용도 ";

  const nextPage = () => {
    setPageChange(false);
  };
  return (
    <div className="items-box flex-item flex-column">
      {/* 경계 표시용 Div */}
      <div
        className="mx-auto py-2"
        style={{
          height: "5%", //
          width: "85%",
          borderTop: "3px solid #ffffff1a",
        }}></div>
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
            <div
              key={index}
              className="d-flex justify-content-center py-3 w-100"
              onMouseOver={(e) => {
                MouseOverUserMenu(e);
              }}
              onMouseOut={(e) => {
                MouseOutUserMenu(e);
              }}
              onClick={(e) => {
                // 선택한 리스트 이름 추출
                appendDirection(e.currentTarget.textContent);
                setClickedItemName(e.currentTarget.textContent);
                // 색 변하게 하는 function
                // searchBottom으로 이동
                nextPage();
              }}>
              <div className="d-flex" style={{ width: "40px" }}>
                <div className="m-auto">{value.icon}</div>
              </div>
              <div className="ms-3 fs-5 d-flex" style={{ width: "75%", color: "#DFDFDDB3" }}>
                {value.label}
              </div>
            </div>
          );
        })}
    </div>
  );
};

export default SearchItem;
