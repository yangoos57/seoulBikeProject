import React from "react";

function bookInfoBox(imgurl, title, author, lib, num) {
  return (
    <div className="flex-container justify-content-center py-2" style={{ height: "160px" }}>
      {/* Beige 색 박스 설정 */}
      <div
        className="flex-container mx-auto p-2"
        style={{
          backgroundColor: "var(--background-dodo-color)",
          width: "90%",
          height: "90%",
          borderRadius: "5px",
        }}>
        {/* Book Info 배치 : 이미지 35% 나머지 65% */}
        <div className="me-2" style={{ flexBasis: "35%" }}>
          <div className="flex-container m-auto">
            <img style={{ width: "100%", border: "0.3px solid #4F4E4E" }} src={imgurl} alt="" />
          </div>
        </div>
        <div style={{ flexBasis: "65%" }}>
          {" "}
          <div style={{ fontSize: "16px", fontWeight: "Bolder" }}>{title}</div>
          <div style={{ fontSize: "10px", fontWeight: "Bolder" }}>저자 : {author}</div>
          <div style={{ fontSize: "10px", fontWeight: "Bolder" }}>도서관 : {lib}</div>
          <div style={{ fontSize: "10px", fontWeight: "Bolder" }}>청구기호 : {num}</div>
        </div>
      </div>
    </div>
  );
}

// Main Function
const DoDoBookList = ({ item }) => {
  return (
    <div className="flex-container mx-auto resultBox-dodo px-2 flex-column">
      {/* 검색건수 */}
      <div
        className="d-flex ms-auto mt-3"
        style={{
          paddingRight: "5%",
          flexBasis: "5%",
          fontSize: "16px", //
          color: "#FFF5EA",
          fontWeight: "bolder",
        }}>
        총 {item.length}건 검색
      </div>
      {/* 도서 정보 보여주는 칸 */}
      <div className="flex-container bookList-dodo" style={{ overflow: "hidden" }}>
        <div className="flex-column" style={{ overflow: "auto", width: "100%" }}>
          {" "}
          {item.map((v) => {
            return bookInfoBox(v.url, v.title, v.author, v.lib, v.num);
          })}
        </div>
      </div>
      {/* 밑에 더 있다는 표시 */}
      <div className="mx-auto pt-1" style={{ flexBasis: "7%" }}>
        <i className="fa-solid fa-play fa-rotate-90"></i>
      </div>
    </div>
  );
};

export default DoDoBookList;
