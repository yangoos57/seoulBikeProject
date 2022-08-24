import React from "react";
const poIntro = () => {
  return (
    <div className="flex-container flex-column">
      <div className="flex-columns">
        <div className="h1 my-3">반갑습니다. </div>
        <div className="h2 my-3">
          토스페이먼츠
          <span className="ms-2 h2 ">데이터사이언티스트</span>에
        </div>
        <div className="h2 my-3">
          지원한 <span className="h2 fw-bold poUnderbar">이양우</span>
          입니다.
        </div>
      </div>

      <div className="d-flex my-3 flex-column">
        <div className="d-flex">
          <div className="fw-bold ">Github</div>
          <div className="ms-2">
            <a href="https://github.com/yangoos57" className="poLink">
              github.com/yangoos57
            </a>
          </div>
        </div>
        <div className="d-flex">
          <div className="fw-bold">Email</div>
          <div className="ms-2">679oose@gmail.com</div>
        </div>
      </div>
    </div>
  );
};

export default poIntro;
