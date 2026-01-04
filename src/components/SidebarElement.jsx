import { Element } from "react-scroll";
import React from "react";

//Element 생성

const SidebarElement = ({ props }) => {
  return <Element name={props.section_name}></Element>;
};

export default SidebarElement;
