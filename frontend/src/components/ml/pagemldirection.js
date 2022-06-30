import React, { useEffect, useRef, useState } from "react";
import MlSearchButton from "./mlsearchbutton";
import MlSlider from "./mlslider";
import MlMapData from "./mlmapdata";
import axios from "axios";
import { Link, useLocation } from "react-router-dom";
import Modal from "react-modal";

function MlDirection() {
  const [mapData, setMapData] = useState([[]]);
  const location = useLocation();
  const depArrParams = location.state;
  const [changeDirection, setchangeDirection] = useState(true);
  const [modal, setModal] = useState(false);

  const customStyles = {
    overlay: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: "#0000006c",
      zIndex: 10000,
    },
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      backgroundColor: "#000000",
      color: "white",
      border: "0px",
      borderRadius: "18px",
      padding: "30px",
      // width: "25vw",
    },
  };

  useEffect(() => {
    axios
      .post("api/leafletMap", depArrParams) //

      .then((res) => setMapData(res.data));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (mapData["error"] !== undefined) {
      setModal(true);
    }
  }, [mapData]);

  // if (mapData["error"] !== undefined) {
  //   sibal(true);
  // }

  return (
    <div className="whole-ml d-flex ">
      <div className="main-ml m-auto " id="mainMl">
        <div
          style={{ position: "relative" }} //
          className="flex-container">
          {/* 검색창 */}
          <MlSearchButton />
          {/* card */}
          <div
            style={{
              position: "absolute",
              zIndex: 1000,
              width: "100%",
              bottom: "7%",
            }}>
            <MlSlider
              mapdata={mapData} //
              changeFunc={setchangeDirection}
              change={changeDirection}
            />
          </div>

          {/* 지도*/}
          <Modal style={customStyles} isOpen={modal}>
            <p>{mapData["error"]}</p>
            <Link to="/ml/search" style={{ color: "white" }}>
              확인
            </Link>
          </Modal>
          <div className="flex-item">
            <MlMapData mapdata={mapData} change={changeDirection} />
          </div>
        </div>
      </div>
    </div>
  );
}
Modal.setAppElement("#root");
export default MlDirection;
