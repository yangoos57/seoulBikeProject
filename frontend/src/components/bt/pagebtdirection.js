import React, { useEffect, useState } from "react";
import { Marker, Polyline, useMap } from "react-leaflet";
import { useLocation } from "react-router-dom";
import BkMainFrame from "./btmainframe";
import BkMapData from "./btmapdata";
import BkSelect from "./btselect";
import bikegreen from "./assets/icons/bikegreen.svg";
import arricon from "./assets/icons/arricon.svg";
import L from "leaflet";
import { useNavigate } from "react-router-dom";
import BkDirctionInfo from "./btdirectioninfo";
import axios from "axios";

function ChangeView({ center, zoom }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

function bikeIcon() {
  return L.icon({
    iconUrl: bikegreen,
    iconSize: window.innerWidth > 1441 ? [35, 35] : [28, 28],
  });
}

function arrIcon() {
  return L.icon({
    iconUrl: arricon,
    iconSize: window.innerWidth > 1441 ? [50, 50] : [45, 45],
  });
}

//main
const BtDirection = () => {
  const navigate = useNavigate();

  // 대여소 재검색 기능
  const [stationInfo, setStationInfo] = useState(undefined);

  if (stationInfo !== undefined) {
    navigate("/bikeTour/departure", { state: stationInfo });
  }

  const location = useLocation();
  const params = location.state;
  const dep = params["dep"]; // coor, label, value,
  const arr = params["arr"]; // coor, label, value, min

  // 경로추천
  const [direction, setDirection] = useState([[0, 0]]);
  useEffect(() => {
    axios.post("api/direction", { dep: dep, arr: arr }).then((res) => {
      setDirection(res.data);
    });
  }, [dep, arr]);

  function calCenter(direction, arr) {
    // 거리 보여줄 때 경로가 겹치지 않도록 center Coordination 잡아주는 함수
    var d = direction[Math.round(direction.length / 3)];
    var num = 0;
    // eslint-disable-next-line no-lone-blocks
    {
      arr["dist"] > 5
        ? (num = 0.01)
        : arr["dist"] > 3
        ? (num = 0.005)
        : arr["dist"] > 1
        ? (num = 0.002)
        : (num = 0.001);
    }
    var newCoor = [d[0] - num, d[1]];
    return newCoor;
  }

  //child1 (main함수 1)
  function child1() {
    return <BkSelect setStationInfo={setStationInfo} />;
  }

  //child2s (main함수 2)
  function child2() {
    return (
      <div className="w-100 h-100">
        <BkDirctionInfo dep={dep} arr={arr} />
        <BkMapData>
          <ChangeView
            center={direction !== undefined ? calCenter(direction, arr) : ""}
            zoom={arr["dist"] > 5 ? 12 : arr["dist"] > 3 ? 13 : arr["dist"] > 1 ? 14 : 15} // 이동 거리별 zoom 수준 변경
          />
          <Marker position={JSON.parse(dep["coor"])} icon={bikeIcon()} />
          {/* dep에서는 JSON.parse를 쓴 이유는 station.csv 파일에서 값을 불러와서 '[123,123]'양식이기 떄문임 */}
          <Polyline
            pathOptions={{ color: "var(--black-color)", opacity: 0.9, weight: 4 }} //
            positions={direction}
          />
          <Marker position={JSON.parse(arr["coor"])} icon={arrIcon()} />
        </BkMapData>
      </div>
    );
  }
  return <BkMainFrame children={child1()} children2={child2()} />;
};

export default BtDirection;
