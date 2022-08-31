import React from "react";
import PoMainFrame from "./modules/pomainframe";
import PoaboutWorkExpeirence from "./modules/poaboutWorkExperience";
import PoaboutProject from "./modules/poaboutProject";
import PoIntro from "./modules/poaboutIntro";
import PoaboutEducation from "./modules/poaboutEducation";
import PoaboutMotivation from "./modules/poaboutMotivation";
import Poabout from "./modules/poabout";
const poHome = () => {
  return (
    <PoMainFrame>
      <div className="poabout">
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
