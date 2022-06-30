import React from "react";
import { Link } from "react-router-dom";
import Tooltip from "@mui/material/Tooltip";

const BkTitleName = ({ fontValue = "40px" }) => {
  const style = {
    fontSize: fontValue,
    fontFamily: "NEXON",
    lineHeight: "120%",
  };
  return (
    <Link to="/bk/departure" style={{ textDecoration: "none" }}>
      <Tooltip title="대여소 검색으로 이동" placement="right-start" followCursor>
        <div className="bg-white flex-column flex-container">
          <div className="m-auto">
            <div className="d-flex" style={style}>
              <div style={{ color: "#4FC276" }}>따릉이</div>
              <div style={{ color: "#191a3dcd" }}>로</div>
            </div>
            <div className="d-flex" style={style}>
              <div style={{ color: "#191a3dcd" }}>동네</div>
              <div style={{ color: "#4FC276" }}>투어</div>
            </div>
          </div>
        </div>
      </Tooltip>
    </Link>
  );
};

export default BkTitleName;
