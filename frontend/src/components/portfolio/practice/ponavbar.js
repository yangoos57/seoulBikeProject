import React from "react";
import { Link } from "react-router-dom";
const poNavBar = () => {
  return (
    <div className="d-flex justify-content-evenly">
      <Link className="poLink" to="/">
        <div className="m-auto">Home</div>
      </Link>
      <Link className="poLink" to="/project">
        <div className="m-auto">Project</div>
      </Link>
      <a
        className="poLink"
        href="https://github.com/yangoos57" //
        target="_blank"
        rel="noreferrer noopener">
        <div className="m-auto">
          <i className="fa-brands fa-github me-1"></i>
          Github
        </div>
      </a>
    </div>
  );
};

export default poNavBar;
