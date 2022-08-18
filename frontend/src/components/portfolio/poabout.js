import React from "react";
import PoMainFrame from "./pomainframe";
import PoaboutWorkExpeirence from "./poaboutWorkExperience";
import PoaboutProject from "./poaboutProject";
const poHome = () => {
  return (
    <PoMainFrame>
      <div className="poabout">
        <div className="poSubTitle pb-2">ABOUT ME</div>
        <div className="mb-2" style={{ wordSpacing: "1px", letterSpacing: "1px" }}>
          공군사관학교를 졸업하고 정보장교로 5년간 한미연합부서에서 데이터분석 업무를 담당했습니다. 전역 후 머신러닝
          기반의 MVP 개발 역량과 데이터 파이프라인 구현 역량을 기르기 위해 스스로 커리큘럼을 구상하여 필요한 내용을
          학습하고 프로젝트를 진행했습니다.
          <div className="mb-2"></div>
          데이터 분야에서 이루고 싶은 목표가 있습니다. 데이터 조직을 신설해 시스템을 갖춘 조직으로 성장시키는 경험을
          하고 싶습니다. 기회가 찾아오면 놓치지 않기 위해 현재도 부단히 배우고 경험을 쌓고 있습니다.
        </div>

        <PoaboutWorkExpeirence />
        <PoaboutProject />
      </div>
    </PoMainFrame>
  );
};

export default poHome;
