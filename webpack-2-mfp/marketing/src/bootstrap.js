import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

// Mount function to start up the app
const mount = (el) => {
  ReactDOM.render(<App />, el);
};

// If we are in in isolation, call mount immediately
const devRoot = document.querySelector("#_marketing-dev-root");
if (devRoot) {
  mount(devRoot);
}

// We are running through container
// and we should export the mount function
export { mount };
