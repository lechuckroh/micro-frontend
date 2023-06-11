import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory, createMemoryHistory } from "history";
import App from "./App";

const mount = (el, { defaultHistory }) => {
  const history =
    defaultHistory ||
    createMemoryHistory({
      initialEntries: [initialPath],
    });

  ReactDOM.render(<App history={history} />, el);
};

const devRoot = document.querySelector("#_marketing-dev-root");
if (devRoot) {
  mount(devRoot, { defaultHistory: createBrowserHistory() });
}

export { mount };
