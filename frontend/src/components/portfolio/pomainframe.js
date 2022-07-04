import React from "react";
import { Link } from "react-router-dom";
import "./assets/postyle.css";
import PoNavBar from "./ponavbar";
import PoNavBarMobile from "./ponavbarmobile";
const PoMainFrame = ({ children }) => {
  return (
    <div className="poWhole">
      <div className="poViewPort">
        <div className="poMainFrame">
          <header className="poNavBar">
            <div className="my-auto h4" style={{ flexBasis: "15%" }}>
              <Link to="/about" className="leewayLink">
                LEEWAY
              </Link>
            </div>
            <div className="my-auto pc" style={{ flexBasis: "45%" }}>
              <PoNavBar></PoNavBar>
            </div>
            <div className="my-auto mobile" style={{ flexBasis: "5%" }}>
              <PoNavBarMobile></PoNavBarMobile>
            </div>
          </header>
          <div className="poBody" style={{ flexBasis: "90%" }}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PoMainFrame;
