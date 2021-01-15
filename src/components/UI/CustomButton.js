import React from "react";
import { Link } from "react-router-dom";
import classes from "./UI.module.scss";

const CustomButton = (props) => {
  let Icon;

  if (props.icon) {
    Icon = props.icon;
  }

  return (
    <Link to={props.link} className={classes.CustomButton}>
      <span className={classes.Icon}>
        <Icon />
      </span>
      {props.children}
    </Link>
  );
};

export default CustomButton;
