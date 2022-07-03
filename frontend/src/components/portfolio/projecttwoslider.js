import React, { Component } from "react";
import Slider from "react-slick";
import { ReactComponent as ProjectOne } from "./assets/weaponeering (1).svg";
// import { ReactComponent as ProjectTwo } from "./assets/weaponeering (1).svg";
import weaponeeringTwo from "./assets/weaponeering (2).png";

export default class SimpleSlider extends Component {
  render() {
    const settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 1,
      slidesToScroll: 1,
    };
    return (
      <div className=" m-auto" style={{ width: "95%" }}>
        <Slider {...settings}>
          <div>
            <img src={weaponeeringTwo} alt="" height={"420px"} width={"100%"} style={{ objectFit: "contain" }} />
          </div>
          <div>
            <ProjectOne height={"420px"} width={"100%"} />
          </div>
        </Slider>
      </div>
    );
  }
}
