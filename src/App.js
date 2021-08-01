import "./App.css";
import React from "react";
import Content from "./components/Content";
import ErrorBoundary from "./components/ErrorBoundary";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Form from "./components/Form";

function App() {
  return (
    <Router>
      <div className="App">
        <Switch>
          <Route path="/" exact>
            <Form />
          </Route>
          <Route path="/script/:slug">
            <Content />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
