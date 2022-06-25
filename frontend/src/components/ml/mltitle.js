import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBuilding } from "@fortawesome/free-solid-svg-icons";
import { faMoon } from "@fortawesome/free-solid-svg-icons";
import { faBicycle } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";

function MlTitle() {
  const building = (
    <FontAwesomeIcon //
      icon={faBuilding}
      className="icons"
      size="3x"
      color="#6B6B6Bb0"
    />
  );
  const bicycle = (
    <FontAwesomeIcon //
      icon={faBicycle}
      className="icons"
      size="2x"
      color="#DFDFDD80"
      transform={"left-15 down-6"}
    />
  );
  const moon = (
    <FontAwesomeIcon //
      icon={faMoon}
      size="lg"
      className="icons"
      color="#E8D210b0"
      transform={"right-30 up-20"}
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
              <div className="text-center mb-2 me-3">
                <span className="fa-layers">
                  {moon}
                  {building}
                  {bicycle}
                </span>
              </div>
              <div className="text fs-1 fw-bold">달빛 따릉이</div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default MlTitle;
