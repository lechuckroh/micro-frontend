import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

declare global {
  interface Window {
    renderApp1: (containerId: string) => void;
    unmountApp1: (containerId: string) => void;
  }
}

window.renderApp1 = (containerId: string) => {
  console.log(containerId);
  ReactDOM.render(
    <App />,
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
      <App />
    </React.StrictMode>,
    document.getElementById('root')
  );
}
