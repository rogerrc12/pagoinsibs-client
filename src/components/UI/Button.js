import React from "react";

// import classes from "./UI.module.scss";

const Button = (props) => {
  const { type, className, ...rest } = props;

  return (
    <button className={`button ${className} ld-ext-right`} type={type} {...rest}>
      {props.children}
      <div className='ld ld-ring ld-spin'></div>
    </button>
  );
};

export default Button;
