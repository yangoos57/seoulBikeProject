import React from "react";
// import ProjectOneSlider from "./projectoneslider";
import { ReactComponent as SeoulIcon } from "./assets/seoulIcon.svg";
import { ReactComponent as MoonIcon } from "./assets/moonIcon.svg";
import { ReactComponent as DashIcon } from "./assets/dashIcon.svg";
import ProjectThree from "./assets/projectOne3.png";
import ProjectTwo from "./assets/projectOne2.png";
import ProjectOne from "./assets/projectOne1.png";
import PoProjectOneButton from "./poprojectonebutton";

const Project = () => {
  return (
    <div className="d-flex flex-column">
      <div className="poTitleBox  mb-3">
        <div className="d-flex ">
          <div className=" poTitle fs-3 me-2">따릉이 대여소 분석 &nbsp;</div>
        </div>
        <div className="pt-3 fs-5" style={{ fontFamily: "NEXON" }}>
          2022.05 - 2022.06
        </div>
      </div>
      <div>
        {/* <div className="poTitle">둘러보기 </div> */}
        {/* <ProjectOneSlider /> */}
        <img src={ProjectOne} alt="" className="poProjectImg" />
        <img src={ProjectTwo} alt="" className="poProjectImg" />
        <img src={ProjectThree} alt="" className="poProjectImg" />
      </div>
      <br /> <br />
      <div>
        <div className="poSubTitle"> 프로젝트 소개 </div>
        <div>
          따릉이 대여기록을 분석하며 얻게 된 아이디어를 웹어플리케이션으로 구현하였습니다. 3주간의 데이터 마이닝을 거친
          뒤 한 달 간 디자인부터 서버 업로드까지 웹 개발 전반을 공부하며 직접 구현하였습니다. 따릉이 대시보드, 달빛
          따릉이, 따릉이로 동네투어 순으로 개발을 진행하였으며,{" "}
          <strong>
            개별 프로젝트 중 느꼈던 개선점을 다음 프로젝트에 반영하여 개념을 익히고 새로운 언어와 개념을 숙달하는데에
            기술적 중점을 두었습니다.
          </strong>
        </div>
        <br /> <br />
      </div>
      <div className="d-flex flex-column">
        <div className="poSubTitle">사용 스택</div>
        <div className="my-auto">
          Frontend : <i class="fa-brands fa-react"></i> React
        </div>
        <div className="my-auto">
          Backend : <i class="fa-brands fa-python"></i> Python(Django, Pandas)
        </div>
        <div className="my-auto">
          Server : <i class="fa-brands fa-microsoft"></i> Azure, <i class="fa-brands fa-docker"></i> Docker
        </div>
      </div>
      <br />
      <br />
      <div className="poSubTitle pb-2">프로젝트 링크</div>
      <PoProjectOneButton></PoProjectOneButton>
      <br />
      <br />
      <div className="d-flex flex-column">
        <div className="poSubTitle">
          <strong>기술적 성과</strong>
        </div>
        <div className="mb-3">
          <ul>
            <li>
              <strong>
                1GB라는 제한된 메모리 용량에 도커 이미지와 3,000만건의 데이터를 온보드 해야하는 문제를 해결하면서 메모리
                관리 방법을 배웠습니다.
              </strong>
              <ul className="fs-7">
                <li className="mb-3">
                  Column별 타입 최적화, OneHotEncoding 적용, 저장 포멧 변경(parquet) 등의 방법으로 메모리 온보드 기준
                  2.4GB에서 700MB로 감축하였습니다.
                </li>
                <li className="mb-3">OutLier 식별, 오염된 데이터를 구분하여 약 300만건의 데이터를 제거하였습니다.</li>
                <li className="mb-3">
                  변수에 할당된 불필요한 메모리를 줄이기 위해 불필요하게 사용된 변수를 줄이고 동일한 변수명을 사용하는
                  방식으로 코드를 개선하였습니다.
                </li>
                <li className="mb-3">
                  1GB의 가상 메모리를 할당하여 서버 구동중 발생할 수 있는 메모리 부족 현상에 대비하였습니다.
                </li>
              </ul>
            </li>
          </ul>
        </div>
        <div className="my-auto">
          <div>
            <div>
              <div className="mb-3">
                <ul>
                  <li>
                    <strong>
                      프로젝트 진행중 식별한 문제를 개선하고 효율적인 방법을 연구하여 마지막 프로젝트의 개발 시간을 이전
                      프로젝트 대비 1/3로 단축하였습니다. 시간을 단축시킬 수 있던 이유는 다음과 같습니다.
                    </strong>
                    <ul className="fs-7">
                      <li className="mb-3">
                        <strong>API 설계에 들었던 시간을 절반으로 줄였습니다.</strong> 두번째 프로젝트에서 API 설계
                        고민없이 프론트엔드와 벡엔드 코드를 작성한 결과, 웹과 서버를 연결하는 단계에서 변수명 혼동, API
                        연동에만 사용되는 함수 작성과 같은 비효율이 발생하였습니다. 세번째 프로젝트에서는 이러한
                        문제점을 해결하기위해 프론트엔드 단계에서 통신에 필요한 변수명, 필요한 데이터 타입등을 정의하여
                        백엔드 개발을 진행하였습니다.
                      </li>
                      <li className="mb-3">
                        <strong>새로운 언어를 배워 비효율을 해결했습니다.</strong> 프로젝트 초기 JS계열의 언어를
                        사용하지 않고 파이썬만을 이용해 개발하였습니다. 프로젝트 초기 파이썬 Plotly Dash라는
                        라이브러리로 웹 개발을 하였으나 성능문제, UI 구현 제한과 같은 비효율이 발생하였습니다. 지금
                        생각해보면 리액트로 구현하면 간단히 해결될 문제를 파이썬으로 해결하기 위해 불필요한 시간과
                        노력을 들였습니다. 이러한 문제를 해결하기 위해 리액트를 배우게 됐고 마지막 프로젝트에는
                        익숙하게되어 빠르고 효율적으로 제작할 수 있었습니다.
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="poSubTitle">
        <strong>느낀점</strong>
      </div>
      <ul className="d-flex flex-column">
        <li className="my-2">
          아이디어 구상부터 서버 업로드까지 모든 과정을 직접 구현했으며, 과정중에 수많은 에러를 해결해나가는 과정에서 웹
          개발에 사용되는 언어, 방법론을 공부했습니다.
        </li>
        <li className="my-2">
          평소 듣고만 넘어갔던 용어와 개념을 배울 수 있는 좋은 기회였습니다. 직접 작성한 코드를 디버깅하면서 스파게티
          코드가 무엇인지 왜 심각한 문제인지를 직접 깨닫게 됐고, 코드 설계방법, 함수형 프로그래밍, 에러처리, 타입 명시
          등 여러 개념들을 공부하고 적용하였습니다.
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

export default Project;
