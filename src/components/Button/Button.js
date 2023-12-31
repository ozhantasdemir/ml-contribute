import React from "react";
import "./Button.css";

const Button = ({ text, type, buttonType, onClick }) => {
  return (
    <button type={type} onClick={onClick} className={"btn " + buttonType}>
      {text}
    </button>
  );
};

export default Button;
