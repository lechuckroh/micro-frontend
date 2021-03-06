import { createBrowserHistory } from "history";
import React from "react";
import { Route, Router, Switch } from "react-router-dom";
import "./App.css";
import Korea from "./region/Korea";
import US from "./region/US";

const defaultHistory = createBrowserHistory();

function App({ history = defaultHistory }) {
  console.log(history);
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/">
          <div>Home</div>
        </Route>
        <Route path="/region/korea" component={Korea} />
        <Route path="/region/us" component={US} />
        <Route>404 Not Found</Route>
      </Switch>
    </Router>
  );
}

export default App;
