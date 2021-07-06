import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import {BrowserHistory} from "history";

declare global {
  interface Window {
    renderApp1: (containerId: string, history: BrowserHistory) => void;
    unmountApp1: (containerId: string) => void;
  }
}

window.renderApp1 = (containerId: string, history: BrowserHistory) => {
  ReactDOM.render(
    <App history={history}/>,
    document.getElementById(containerId),
  );
}

window.unmountApp1 = (containerId: string) => {
  const elem = document.getElementById(containerId);
  if (elem) {
    ReactDOM.unmountComponentAtNode(elem);
  }
}

if (!document.getElementById("App2-container")) {
  ReactDOM.render(
    <React.StrictMode>
      <App/>
    </React.StrictMode>,
    document.getElementById('root')
  );
}
