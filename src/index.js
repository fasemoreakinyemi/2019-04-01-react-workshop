import React from "react";
import ReactDOM from "react-dom";

import { App } from "./App";
import { createMuiTheme } from "@material-ui/core";

const rootElement = document.getElementById("root");

const theme = createMuiTheme({
  palette: {
    type: "light"
  }
});

ReactDOM.render(<App theme={theme} />, rootElement);
