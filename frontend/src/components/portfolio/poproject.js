import React from "react";
import PoMainFrame from "./pomainframe";
import ProjectOne from "./projectone";
import ProjectTwo from "./projecttwo";

const PoProject = () => {
  return (
    <PoMainFrame>
      <div className="flex-container flex-column">
        <ProjectOne></ProjectOne>
        <ProjectTwo></ProjectTwo>
      </div>
    </PoMainFrame>
  );
};

export default PoProject;
