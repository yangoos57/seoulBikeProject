import React from "react";
const poEducation = () => {
  return (
    <div className="flex-container flex-column">
      <div className="poSubTitle d-flex flex-column">EDUCATION</div>
      <div className="flex-columns mb-2">
        <div className="d-flex justify-content-between mt-3 NotoBold">
          <div className="me-auto mb-3 h5 NotoBold">
            개인 커리큘럼
            <a
              href="https://github.com/yangoos57/dataStudy"
              target="_blank"
              rel="noopener noreferrer"
              className="poGithubIcon ms-2">
              <i className="fa-brands fa-github" style={{ color: "var(--identity-color)" }}></i>
            </a>
          </div>
          <div className="h6 my-auto">2022.1 - 현 재</div>
        </div>
        <div>머신러닝을 활용한 문제해결능력을 기르위해 커리큘럼을 구상해 운영중에 있습니다.</div>
      </div>
      <div className="d-flex justify-content-between mt-4 NotoBold">
        <div className="me-auto mb-3 h5 NotoBold">
          공군사관학교
          <span className="ms-2 h6" style={{ color: "gray" }}>
            군사전략학
          </span>
        </div>
        <div className="h6 my-auto">2012.2 - 2016.2</div>
      </div>
      <div>복종, 모범, 자율, 지도라는 학년별 모토를 경험하며 역지사지의 자세를 배웠습니다.</div>
    </div>
  );
};

export default poEducation;
