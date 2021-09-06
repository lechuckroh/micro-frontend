import React from "react";
import ReactDOM from "react-dom";
import { createBrowserHistory, createMemoryHistory } from "history";
import App from "./App";

// Mount function to start up the app
const mount = (el, { defaultHistory, onNavigate }) => {
  const history = defaultHistory || createMemoryHistory();

  if (onNavigate) {
    history.listen(onNavigate);
  }

  ReactDOM.render(<App history={history} />, el);

  return {
    onParentNavigate(location) {
      const nextPathname = location.pathname;
      const pathname = history.pathname;
      if (pathname !== nextPathname) {
        history.push(nextPathname);
      }
    },
  };
};

// If we are in in isolation, call mount immediately
const devRoot = document.querySelector("#_auth-dev-root");
if (devRoot) {
  mount(devRoot, { defaultHistory: createBrowserHistory() });
}

// We are running through container
// and we should export the mount function
export { mount };
