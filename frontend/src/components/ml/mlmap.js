import React from "react";
import mapimg from "./assets/여의나루역 2.png";
import { ReactComponent as Search } from "./assets/icons/Search.svg";
function MlMap() {
  return (
    <>
      <div style={{ position: "relative" }} className="w-100 h-100 d-flex">
        <div>
          <div className="search-box d-flex px-4">
            <div className="search-box-inner mx-auto py-3 px-4 flex-item justify-content-start ">
              <Search />
            </div>{" "}
          </div>
        </div>
        <div className="flex-item">
          <img src={mapimg} alt="" className="map-ml" />
        </div>
      </div>
    </>
  );
}

export default MlMap;
