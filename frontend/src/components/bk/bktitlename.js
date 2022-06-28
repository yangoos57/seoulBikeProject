import React from "react";

const BkTitleName = ({ fontValue = "40px" }) => {
  const style = {
    fontSize: fontValue,
    fontFamily: "NEXON",
  };

  return (
    <div className="bg-white flex-column flex-container">
      <div className="m-auto">
        <div className="d-flex" style={style}>
          <div style={{ color: "#4FC276" }}>따릉이</div>
          <div style={{ color: "#191a3dcd" }}>로</div>
        </div>
        <div className="d-flex" style={style}>
          <div style={{ color: "#191a3dcd" }}>서울</div>
          <div style={{ color: "#4FC276" }}>투어</div>
        </div>
      </div>
    </div>
  );
};

export default BkTitleName;
