import React from "react";

const libName1 = [
  "전 체",
  "어린이도서관",
  "용산도서관",
  "정독도서관",
  "종로도서관",
  "강남도서관",
  "강동도서관",
  "강서도서관",
  "개포도서관",
];

const libName2 = [
  "양천도서관",
  "고척도서관",
  "구로도서관",
  "남산도서관",
  "도봉도서관",
  "동대문도서관",
  "동작도서관",
  "서대문도서관",
  "송파도서관",
];
function customInput(v, i) {
  var checkid = "checkbox" + i;
  console.log(checkid);
  return (
    <div className="ms-3">
      <input type="checkbox" class="css-checkbox" id={checkid} />
      <label for={checkid} name="checkbox1_lbl" class="css-label lite-gray-check">
        {v}
      </label>
    </div>
  );
}

const dodoLabel = () => {
  return (
    <div className="flex-container">
      <div className="d-flex flex-column" style={{ flexBasis: "50%" }}>
        {libName1.map((val, i) => {
          return customInput(val, i);
        })}
      </div>
      <div className="d-flex flex-column" style={{ flexBasis: "50%" }}>
        {libName2.map((val, i) => {
          return customInput(val, i + 100);
        })}
      </div>
    </div>
  );
};

export default dodoLabel;
