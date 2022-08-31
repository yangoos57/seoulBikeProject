import React from "react";
import "./assets/postyle.css";
import PoNavBar from "./ponavbar";
import PoNavBarMobile from "./ponavbarmobile";
const PoMainFrame = ({ children }) => {
  return (
    <div className="poWhole">
      <div className="poViewPort">
        <div className="poMainFrame">
          <header className="poNavBar" style={{ flexBasis: "10%" }}>
            <div className="my-auto h4" style={{ flexBasis: "15%" }}>
              LeeWay
            </div>
            <div className="my-auto pc" style={{ flexBasis: "45%" }}>
              <PoNavBar></PoNavBar>
            </div>
            <div className="my-auto mobile" style={{ flexBasis: "5%" }}>
              <PoNavBarMobile></PoNavBarMobile>
            </div>
          </header>
          <div className="pomainframe pt-3" style={{ flexBasis: "8%" }}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoMainFrame;
