import React from "react";

function bookInfoBox(imgurl, title, author, lib, num) {
  var a = 0;
  var b = 0;
  var c = 0;
  window.innerWidth > 1441 ? (a = 30) : (a = 23);
  window.innerWidth > 1441 ? (b = 12) : (b = 8);
  window.innerWidth > 1441 ? (c = 15) : (c = 10);
  if (title.length > a) {
    title = title.substring(0, a) + "...";
  }
  if (author.length > b) {
    author = author.substring(0, b) + "...";
  }
  if (lib.length > c) {
    lib = lib.substring(0, c) + "...";
  }
  return (
    <div className="flex-container justify-content-center py-2 bookListBox">
      {/* Beige 색 박스 설정 */}
      <div
        className="flex-container mx-auto p-2"
        style={{
          backgroundColor: "var(--background-dodo-color)",
          width: "90%",
          height: "95%",
          borderRadius: "5px",
        }}>
        {/* Book Info 배치 : 이미지 35% 나머지 65% */}
        <div className="me-2" style={{ flexBasis: "35%" }}>
          <div className="flex-container m-auto">
            <img style={{ width: "100%", border: "0.3px solid #4F4E4E" }} src={imgurl} alt="" />
          </div>
        </div>
        <div className="flex-container flex-column" style={{ flexBasis: "65%" }}>
          {" "}
          <div className="mb-1 bookTitleInfo">{title}</div>
          <div className="bookInfo">저자 : {author}</div>
          <div className="bookInfo">도서관 : {lib}</div>
          <div className="bookInfo">청구기호 : {num}</div>
        </div>
      </div>
    </div>
  );
}

// Main Function
const DoDoBookList = ({ item }) => {
  return (
    <div className="flex-container resultBox-dodo ">
      <div
        className="flex-container flex-column mx-auto px-2"
        style={{ display: item[0].title.length === 0 ? "none" : "" }}>
        {/* 검색건수 */}
        <div
          className="d-flex mt-3 ms-auto"
          style={{
            paddingRight: "5%",
            flexBasis: "5%",
            color: "#FFF5EA",
            fontWeight: "bolder",
          }}>
          총 {item.length}건 검색
        </div>
        <div
          className="flex-container"
          style={{ overflow: "hidden", flexBasis: "90%", position: "relative", height: "auto" }}>
          <div className="d-flex flex-column" style={{ position: "absolute", overflow: "scroll", height: "100%" }}>
            {item.map((v) => {
              return bookInfoBox(v.url, v.title, v.author, v.lib, v.num);
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DoDoBookList;
