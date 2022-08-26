import React from "react";
const poEducation = () => {
  return (
    <div className="flex-container flex-column">
      <div className="poSubTitle d-flex flex-column">EDUCATION</div>
      <div className="flex-columns">
        <div className="d-flex justify-content-between mt-3 NotoBold">
          <div className="h4 my-auto">
            공군사관학교
            <span className="ms-2 h6" style={{ color: "gray" }}>
              군사전략학
            </span>
          </div>
          <div className="h6 my-auto">2012.2 - 2016.2</div>
        </div>
        <div>
          <div className="d-flex justify-content-between mt-4 NotoBold">
            <div className="h4 my-auto">
              개인 커리큘럼 운영
              <a
                href="https://github.com/yangoos57/dataStudy"
                target="_blank"
                rel="noopener noreferrer"
                className="poGithubIcon ms-2">
                <i class="fa-brands fa-github"></i>
              </a>
            </div>
            <div className="h6 my-auto">2022.1 - 현 재</div>
          </div>
          <ul>
            {" "}
            <li className="me-auto">
              머신러닝을 활용한 문제해결 능력 배양과 분석결과를 기반으로 MVP를 만들 수 있는 개발 역량을 확보하기 위해
              개인 커리큘럼을 운영 중에 있습니다.
            </li>
            <li className="me-auto">세부 학습 방향 및 공부자료는 Github에서 확인 하실 수 있습니다. </li>
          </ul>{" "}
        </div>
      </div>
    </div>
  );
};

export default poEducation;
