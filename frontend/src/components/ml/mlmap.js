import React, { useRef, useState } from "react";
import "./assets/mlstyle.css";
import mapimg from "./assets/여의나루역 2.png";
import { ReactComponent as Search } from "./assets/icons/Search.svg";
import { Link } from "react-router-dom";
import MlTitle from "./mltitle";
function MlMap() {
  const [isLogo, setIsLogo] = useState(true);
  setTimeout(() => setIsLogo(false), 2000);
  return (
    <>
      {isLogo ? (
        <MlTitle />
      ) : (
        <div className="whole-ml d-flex ">
          <div className="main-ml m-auto ">
            <div style={{ position: "relative" }} className="flex-container">
              {/* 검색창 관련 항목 */}
              <div style={{ position: "absolute", height: "20%", width: "100%" }}>
                <div className="d-flex" style={{ height: "45%", width: "100%" }}></div>
                <div className="search-box px-4">
                  <Link to="/ml/search" className="search-box-inner mx-auto py-3 px-4 flex-item justify-content-start ">
                    <Search />
                  </Link>
                </div>
              </div>
              <div className="flex-item">
                <img src={mapimg} alt="" className="map-ml" />
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default MlMap;
