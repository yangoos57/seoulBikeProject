import React from "react";
import PoMainFrame from "./pomainframe";
import PoaboutWorkExpeirence from "./poaboutWorkExperience";
import PoaboutProject from "./poaboutProject";
import PoIntro from "./poaboutIntro";
import PoaboutEducation from "./poaboutEducation";
import PoaboutMotivation from "./poaboutMotivation";
import Poabout from "./poabout";
const poHome = () => {
  return (
    <PoMainFrame>
      <div className="poabout">
        <PoaboutMotivation />
        <PoIntro />
        <hr className="my-4 text-white" />
        <Poabout />
        <hr className="my-4 text-white" />
        <PoaboutProject />
        <hr className="my-4 text-white" />
        <PoaboutWorkExpeirence />
        <hr className="my-4 text-white" />
        <PoaboutEducation />
        <hr className="my-4 text-white" />
        <PoaboutMotivation />
        <hr className="my-5 text-white" />
      </div>
    </PoMainFrame>
  );
};

export default poHome;
