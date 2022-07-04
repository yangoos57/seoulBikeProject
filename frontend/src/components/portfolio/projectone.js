import React from "react";
import ProjectOneSlider from "./projectoneslider";
import { ReactComponent as SeoulIcon } from "./assets/seoulIcon.svg";
import { ReactComponent as MoonIcon } from "./assets/moonIcon.svg";
import { ReactComponent as DashIcon } from "./assets/dashIcon.svg";

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
      <br /> <br />
      <div>
        <div className="poSubTitle"> 프로젝트 소개 </div>
        <div>
          따릉이 대여기록을 분석하며 떠오른 아이디어를 웹 어플리케이션으로 구현하였습니다. 3주간 데이터 마이닝 과정을
          거친 뒤 남은 한 달 동안 디자인부터 서버 업로드까지 웹 개발 전반을 공부하며 직접 구현하였습니다. 따릉이
          대시보드, 달빛 따릉이, 따릉이로 동네투어 순으로 개발을 진행하였으며, 개별 프로젝트 중 느꼈던 개선점을 다음
          프로젝트에 반영하여 개념을 익히고 방법을 숙달하는데에 기술적 중점을 두었습니다.
        </div>
        <br /> <br />
      </div>
      <div className="d-flex flex-column">
        <div className="poSubTitle">사용 스택</div>
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
        <div className="poSubTitle">
          {" "}
          <strong>기술적 성과</strong>{" "}
        </div>
        <div className="mb-2" style={{ listStyleType: "🚲" }}>
          1GB라는 제한된 메모리 용량에 도커 이미지와 3,000만건의 데이터를 온보드 해야하는 문제를 해결하며 메모리 관리의
          필요성을 인지하고 관리 방법을 공부하였습니다.
        </div>
        <div className="my-auto">
          <ul>
            <li className="mb-2">OutLier와 무의미한 데이터를 식별하여 약 300만건의 데이터를 제거하였습니다.</li>
            <li className="mb-2">
              {" "}
              Column별 타입 최적화, OneHotEncoding 적용, 저장 포멧 변경(parquet)등의 방법으로 메모리 온보드 기준
              2.4GB에서 700MB로 감축하였습니다.
            </li>
            <li className="mb-2">
              {" "}
              변수에 할당된 메모리를 감소하고자 변수를 적게 사용하고 동일한 변수명을 반복해서 사용하는 방식으로 코드를
              개선하였습니다.{" "}
            </li>
            <li className="mb-2">
              가상 메모리를 1GB 할당하여 구동중 발생할 수 있는 메모리 부족 현상에 대비하였습니다.
            </li>
          </ul>
          <br />
          <div>
            <div>
              <div className="mb-3">
                <strong>
                  프로젝트 진행중 식별한 문제를 개선하여 마지막 프로젝트의 개발시간을 이전 대비 1/3로 감소시켰습니다.
                </strong>
              </div>
              <ol>
                <li className="mb-2">
                  API 설계 고민없이 프론트엔드와 벡엔드를 개발한 결과, API로 연결하는 단계에서 변수명 혼동, API 연동만을
                  위한 추가적인 함수 작성 등 비효율을 야기하였습니다. 이후 프로젝트에서는 프론트엔드 개발을 하며 API
                  연동에 필요한 변수명, 필요한 데이터를 정의하여 이에 맞게 백엔드 개발을 진행하였습니다.
                </li>
                <li className="mb-2">
                  프로젝트가 진행되는 동안 새롭게 배우는 언어인 React의 활용비중을 늘려나갔습니다. 프로젝트 초기 이미
                  익숙한 파이썬을 사용해 대부분의 기능을 구현하였지만.성능문제나 UI 구현이 제한되는 어려움이 있었습니다.
                  React를 배우고자 백엔드에서 구현했던 많은 기능을 프론트엔드에서 구현하고자 하였습니다. 세번째
                  프로젝트에서는 프론트엔드를 80%이상 사용하였습니다.
                </li>
              </ol>
            </div>
          </div>
        </div>
      </div>
      <div className="poSubTitle">
        {" "}
        <strong>느낀점</strong>{" "}
      </div>
      <ul className="d-flex flex-column">
        <li className="my-2">
          아이디어 구상에서부터 서버 업로드까지 전 과정을 직접 구현하였으며, 수많은 에러를 처리하며 단계별로 자주
          이용되는 프로그램의 작동 원리를 공부했습니다.{" "}
        </li>
        <li className="my-2">
          평소 듣고만 넘어갔던 용어와 개념들을 배울 수 있는 좋은 기회였습니다. 특히 직접 작성한 코드를 보면서 스파게티
          코드란 무엇인지 알게됐으며 에러처리, 타입 명시 등 디버깅에 사용되는 개념들의 필요성을 깨달았습니다.{" "}
        </li>
        <li className="my-2">
          두 달간 프로젝트를 진행하며 얻은 가장 큰 성과는 개발이 생각보다 체질에 맞다는 안심(?)과 앞으로 무엇을 더
          공부해나아가야할지 방향성이 잡혔다는 것에 있습니다.
        </li>
      </ul>
      <br />
      <hr />
      <br />
      <br />
    </div>
  );
};

export default ProjectOne;
