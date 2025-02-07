import React, { Component } from "react";
import Tooltip from "@material-ui/core/Tooltip";
import IconButton from "@material-ui/core/IconButton";
export default ({
  children,
  onClick,
  tip,
  btnClassName,
  tipClassName,
  component,
  to,
}) => (
  <Tooltip title={tip} className={tipClassName}>
    <IconButton
      onClick={onClick}
      className={btnClassName}
      component={component}
      to={to}
    >
      {children}
    </IconButton>
  </Tooltip>
);
