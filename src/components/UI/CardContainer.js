import React from "react";

import classes from "./UI.module.scss";

const CardContainer = (props) => {
  return <div className={`${classes.CardContainer} ${props.className}`}>{props.children}</div>;
};

export default CardContainer;
