import React, { Component } from "react";
import Slider from "react-slick";
// import { ReactComponent as ProjectOne } from "./assets/projectOne1.svg";
import ProjectThree from "./assets/projectOne3.png";
import ProjectTwo from "./assets/projectOne2.png";
import ProjectOne from "./assets/projectOne1.png";

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
            <img src={ProjectOne} alt="" height={"420px"} width={"100%"} style={{ objectFit: "contain" }} />
          </div>
          <div>
            <img src={ProjectTwo} alt="" height={"420px"} width={"100%"} style={{ objectFit: "contain" }} />
          </div>
          <div>
            <img src={ProjectThree} alt="" height={"420px"} width={"100%"} style={{ objectFit: "contain" }} />
          </div>
        </Slider>
      </div>
    );
  }
}
