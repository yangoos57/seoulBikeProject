import React from "react";
import PoProject from "./poproject";
import ProjectOneSlider from "./projectoneslider";
import PoProjectOneButton from "./poprojectonebutton";
import { ReactComponent as SeoulIcon } from "./assets/seoulIcon.svg";
import { ReactComponent as MoonIcon } from "./assets/moonIcon.svg";
import { ReactComponent as DashIcon } from "./assets/dashIcon.svg";
import { width } from "@mui/system";

const ProjectOne = () => {
  return (
    <div className="d-flex flex-column">
      <div className="poTitleBox">
        <div className="d-flex ">
          <div className="m-auto poTitle fs-3">&nbsp; 따릉이 대여소 분석 &nbsp;</div>
        </div>
        <div className="ms-2 pt-3 fs-6" style={{ fontFamily: "NEXON" }}>
          2022.05 - 2022.06
        </div>
      </div>
      <div>
        {/* <div className="poTitle">둘러보기 </div> */}
        <ProjectOneSlider />
      </div>
      <br />

      <div>
        <div className="poSubTitle"> 프로젝트 소개 </div>
        <div>
          3,000만건의 따릉이 대여기록을 분석하여 세 가지 아이디어를 구상하고 이를 웹으로 구현하였습니다. 지하철 정보,
          야간버스 정보, 날씨 정보 등 가용한 데이터를 접목해 다각적인 데이터 분석을 하였고 후술할 “따릉이 대여소
          대시보드”, “달빛 따릉이", “따릉이로 서울투어" 아이디어를 구상했습니다.
        </div>
        <br />
      </div>
      <div className="d-flex flex-column">
        <div className="poSubTitle">기술 스택</div>
        <div className="my-auto">
          Frontend : <i class="fa-brands fa-react"></i> React
        </div>
        <div className="my-auto">
          {" "}
          Backend : <i class="fa-brands fa-python"></i> Python(Django, Pandas){" "}
        </div>
        <div className="my-auto">
          Server : <i class="fa-brands fa-microsoft"></i> Azure, <i class="fa-brands fa-docker"></i> Docker
        </div>
      </div>
      <br />
      <br />
      <div className="poSubTitle pb-2">프로젝트 링크</div>
      <div
        className="d-flex my-auto justify-content-center"
        style={{ backgroundColor: "#ffffff99", borderRadius: "20px", height: "80px", width: "250px" }}>
        <SeoulIcon className="my-auto mx-2" width={"60px"} height={"60px"} />
        <MoonIcon className="my-auto mx-2" width={"60px"} height={"60px"} />
        <DashIcon className="my-auto mx-2" width={"60px"} height={"60px"} />
      </div>
      <br />
      <br />
      <div className="d-flex flex-column">
        <div className="poTitle">
          {" "}
          <strong>성과 및 느낀점</strong>{" "}
        </div>
        <div className="my-auto">• 아이디어 구상에서부터 서버 업로드까지 웹어플리케이션 개발 흐름 이해</div>
        <div className="my-auto">
          • 이전 프로젝트에서 식별한 개선사항을 다음 프로젝트에 반영해서 유의미한 성과를 거뒀다.
          <ul>
            <li>
              서버 업로드 시 1GB라는 제한적인 메모리 용량에 docker image와 700MB 데이터를 온보드하면서 메모리 관리의
              중요성을 인지했고 이를 공부하였음.
            </li>
            <li>
              프로젝트를 진행하수록 백엔드에서 구현했던 기능을 프론트엔드로 구현하였습니다. 프로트엔드를 공부하고
              익숙해지는데 도움을 주었음.
            </li>
            <li>
              프로젝트를 진행하수록 백엔드에서 구현했던 기능을 프론트엔드로 구현하였습니다. 프로트엔드를 공부하고
              익숙해지는데 도움을 주었음.
            </li>
          </ul>
        </div>
      </div>
      <br />
      <hr />
      <br />
      <br />
    </div>
  );
};

export default ProjectOne;
