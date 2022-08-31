import React from "react";

function newLabel(dep) {
  if (dep["label"].length > 15) return dep["label"].substring(0, 15) + " ...";
  else return dep["label"];
}
const BtDirctionInfo = ({ dep, arr }) => {
  return (
    <div
      style={{
        position: "absolute",
        bottom: "10%",
        left: "10%",
        backgroundColor: "var(--black-color)",
        height: "30%",
        width: "80%",
        zIndex: 1000,
        borderRadius: "5px",
        display: "flex",
      }}>
      <div
        className="d-flex flex-column p-2 justify-content-start ms-3" //
        style={{
          color: "var(--silver-color)", //
          paddingLeft: "20px",
          width: "90%",
          fontSize: "15px",
        }}>
        {/* 1 */}
        <div style={{ flexBasis: "5%" }}> </div>
        {/* 2 */}
        <div className="me-auto d-flex directionFontSet" style={{ flexBasis: "15%" }}>
          <div className="ms-3 my-auto directionFontSet" style={{ fontFamily: "NEXON" }}>
            출발
          </div>
          <div className="my-auto ms-3 directionFontSet" style={{}}>
            {newLabel(dep)}
          </div>
        </div>
        {/* 3 */}
        <div className="ms-4 me-auto my-2 directionFontSet">
          <i className="fa-solid fa-arrow-down"></i>
        </div>
        {/* 4 */}
        <div className="ms-3 me-auto d-flex directionFontSet" style={{ flexBasis: "15%" }}>
          <div className="my-auto directionFontSet" style={{ fontFamily: "NEXON" }}>
            도착
          </div>
          <div className="my-auto ms-3 directionFontSet">{newLabel(arr)}</div>
        </div>
        {/* 5 */}
        <div className="p-1 " style={{ flexBasis: "10%" }}></div>
        {/* 6 */}
        <div className="d-flex ms-3" style={{ flexBasis: "15%" }}>
          <div className="my-auto directionFontSet" style={{ fontFamily: "NEXON" }}>
            예상시간
          </div>
          <div className="my-auto ms-2 directionFontSet">{arr["time"]} 분</div>
          <div className="ms-4 my-auto directionFontSet" style={{ fontFamily: "NEXON" }}>
            예상거리
          </div>
          <div className="my-auto ms-2 directionFontSet">{arr["dist"]} km</div>
        </div>
      </div>
    </div>
  );
};

export default BtDirctionInfo;
