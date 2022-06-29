import React from "react";

const BkDirctionInfo = ({ dep, arr }) => {
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
        style={{ color: "var(--silver-color)", paddingLeft: "20px", width: "90%", fontSize: "15px" }}>
        {/* 1 */}
        <div style={{ flexBasis: "5%" }}> </div>
        {/* 2 */}
        <div className="d-flex" style={{ flexBasis: "15%" }}>
          <div className="my-auto" style={{ fontFamily: "NEXON" }}>
            출발 :
          </div>
          <div className="my-auto ms-2">{dep["label"]}</div>
        </div>
        <div style={{ flexBasis: "15%", marginLeft: "5px" }}>
          <i className="fa-solid fa-arrow-down"></i>
        </div>
        {/* 3 */}
        <div className="d-flex" style={{ flexBasis: "15%" }}>
          <div className="my-auto" style={{ fontFamily: "NEXON" }}>
            도착 :
          </div>
          <div className="my-auto ms-2">{arr["label"]}</div>
        </div>
        {/* 4 */}
        <div className="p-1" style={{ flexBasis: "10%" }}></div>
        {/* 5 */}
        <div className="d-flex" style={{ flexBasis: "20%" }}>
          <div className="my-auto" style={{ fontFamily: "NEXON" }}>
            예상도착시간 :
          </div>
          <div className="my-auto ms-2">{arr["time"]} 분</div>
        </div>
      </div>
    </div>
  );
};

export default BkDirctionInfo;
