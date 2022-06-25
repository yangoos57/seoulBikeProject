import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

function MlTitle() {
  const moon = (
    <FontAwesomeIcon //
      icon={faMoon}
      size="2x"
      className="icons"
      color="#F3DB03"
      // transform={"right-30 up-20"}
    />
  );
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => navigate("/ml"), 2500);
  }, []);

  return (
    <>
      <div className="whole-ml d-flex ">
        <div className="main-ml m-auto ">
          <div className="title-ml flex-column flex-item">
            <div className="m-auto">
              <div className="d-flex flex-column justify-content-start">
                <div className="d-flex">
                  <div className="align-bottom" style={{ color: "var(--text-ml-color)", fontSize: "40px" }}>
                    달빛
                  </div>
                  <div className="my-auto ms-1">{moon}</div>
                </div>
                <div className="" style={{ color: "var(--text-ml-color)", fontSize: "40px" }}>
                  따릉이
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default MlTitle;
