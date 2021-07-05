import {BrowserHistory, createBrowserHistory} from "history";
import React from "react";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import "./App.css";
import MicroFrontend from "./MicroFrontend";

const defaultHistory = createBrowserHistory();

interface App1Props {
  history: BrowserHistory;
}

function App1(props: App1Props) {
  return <MicroFrontend history={props.history} host={process.env.REACT_APP_APP1_HOST} name="App1"/>
}

// ---------------------------------------------------------------------------

interface App2Props {
  history: BrowserHistory;
}

function App2(props: App2Props) {
  return <MicroFrontend history={props.history} host={process.env.REACT_APP_APP2_HOST} name="App2"/>
}

// ---------------------------------------------------------------------------

interface HomeProps {
  history: BrowserHistory;
}

function Home(props: HomeProps) {
  return (
    <div>
      <div className="regions">
        <App1 history={props.history}/>
      </div>
      <div className="region-details">
        <App2 history={props.history}/>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------

function App({history = defaultHistory}) {
  return (
    <BrowserRouter>
      <React.Fragment>
        <Switch>
          <Route exact path="/" render={() => <Home history={history}/>}/>
        </Switch>
      </React.Fragment>
    </BrowserRouter>
  );
}

export default App;
