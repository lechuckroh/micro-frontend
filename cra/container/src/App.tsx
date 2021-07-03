import { BrowserHistory, createBrowserHistory } from "history";
import React, { useState } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import "./App.css";
import MicroFrontend from "./MicroFrontend";

const defaultHistory = createBrowserHistory();

const {
  REACT_APP_APP1_HOST: host1,
  REACT_APP_APP2_HOST: host2,
} = process.env;

// ---------------------------------------------------------------------------

interface App1Props {
  history: BrowserHistory;
}
function App1(props: App1Props) {
  return <MicroFrontend history={props.history} host={host1} name="App1"></MicroFrontend>
}

// ---------------------------------------------------------------------------

interface App2Props {
  history: BrowserHistory;
}
function App2(props: App2Props) {
  return <MicroFrontend history={props.history} host={host2} name="App2"></MicroFrontend>
}

// ---------------------------------------------------------------------------

interface HomeProps {
  history: BrowserHistory;
}

function Home(props: HomeProps) {
  return (
    <div>
      <div className="regions">Regions</div>
      <div className="region-details">Region Details</div>
    </div>
  );
}

// ---------------------------------------------------------------------------

function App({ history = defaultHistory }) {
  return (
    <BrowserRouter>
      <React.Fragment>
        <Switch>
          <Route exact path="/" render={() => <Home history={history} />} />
        </Switch>
      </React.Fragment>
    </BrowserRouter>
  );
}

export default App;
