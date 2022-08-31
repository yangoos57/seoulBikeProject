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
        <ul style={{ fontSize: "17px" }}>
          <li className="me-auto">
            머신러닝을 활용한 비즈니스 문제해결 능력 배양을 위해 머신러닝 이론, 비즈니스 방법론, 데이터 수집 및 전처리
            방법 등 학습
          </li>
          <li className="me-auto">분석 결과를 MVP로 제작할 수 있는 개발 역량을 기르기 위해 4건의 개인프로젝트 진행</li>
        </ul>
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
      <ul style={{ fontSize: "17px" }}>
        <li className="me-auto">신입생 훈련지도, 중대 학년 대표 등 조직 내 다양한 직책을 수행하며 리더십 배양</li>
        <li className="me-auto">복종, 모범, 자율, 지도라는 학년별 모토를 경험하며 역지사지의 자세 함양</li>
      </ul>
      <div className="mb-2"></div>
    </div>
  );
};

export default poEducation;
