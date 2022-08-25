import React from "react";
import PoMainFrame from "./pomainframe";
import PoaboutWorkExpeirence from "./poaboutWorkExperience";
import PoaboutProject from "./poaboutProject";
import PoIntro from "./pointro";

const poHome = () => {
  return (
    <PoMainFrame>
      <div className="poabout">
        <PoIntro />
        <hr className="my-3 text-white" />
        <div className="poSubTitle pb-2">ABOUT ME</div>
        <div className="mb-2" style={{ wordSpacing: "1px", letterSpacing: "1px" }}>
          공군사관학교를 졸업하고 5년간 정보장교로 복무하며 데이터 분석 역량을 쌓았습니다. 전역 후 머신러닝을 활용한
          문제해결 능력 및 MVP 개발 역량을 갖추기 위해 스스로 커리큘럼을 구상하고 프로젝트를 진행했습니다.
          {/* kaggle 같은데서 데이터 분석 결과를 보면 그렇구나~ 하고 넘어간다. 내가 분석한 결과를 알아주지 못한다면 아쉬울 것 같았다.
          그래서 사람들이 직관적으로 이해할 수 있게 내가 생각한 기능을 직접 구현했다. 
          사람들도 확실히 직접 사용해봐야 아하 포인트가 생기고 이 프로그램을 개선할 방법에 대해서 조언해주더라.
          웹 개발에 개인적인 관심도 있었던 찰나에 공부할만한 좋은 명분이 생겨서 배우게 됐다.
            */}
          <div className="mb-2"></div>
          데이터 분야에서 이루고 싶은 목표가 있습니다. 데이터 조직 신설부터 체계를 갖춘 조직으로까지 성장시키는 경험을
          하고 싶습니다. 언제라도 기회가 찾아 온다는 마음가짐으로 꾸준히 준비해나가고 있습니다.
          {/* (무엇이든 처음부터 끝까지 만들어봐야 안다고 말할 수 있기 때문임. 데이터 분야에 대한 애정이 많은 만큼 모든 분야를 경험하고 싶다. 
            세부 분야를 유기적으로 연결 시키는데 관심이 많기 때문에 하나의 분야를 파는 것 보다 여러 분야를 이해하고 어떻게 하나로 묶을수 있을지 고민하는걸 좋아하는 성격이다.) */}
          {/* 조직을 처음부터 만든다는건 새로운 관습, 새로운 문화를 형성하는 것과 마찬가지라 생각한다. 현재로는 조직의 안정을 최우선순위로 여기는 조직 경험만 있다보니
          어떠한 조직을 만들어야겠다는 생각을 하는 단계는 아니다. 경험을 쌓는 과정에서 어떤 조직 문화가 필요한지에 대한 고민도 필요할 것이다. 
           */}
        </div>

        <hr className="my-3 text-white" />
        <PoaboutProject />
        <hr className="my-3 text-white" />
        <PoaboutWorkExpeirence />
        <hr className="my-5 text-white" />
      </div>
    </PoMainFrame>
  );
};

export default poHome;
