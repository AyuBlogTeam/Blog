import React from "react";
import ReactDOM from "react-dom";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import store from "./store";

import "Styles/reset.styl";
import "Styles/index.styl";

import { BrowserRouter, Switch, Route } from "react-router-dom";
import Index from "./Components/Index/index";
import Login from "./Components/Login/login";

export const App = () => (
  <Provider store={store}>
    <BrowserRouter basename="/manage">
      <Switch>
        <Route path="/" exact component={Index} />
        <Route path="/login" exact component={Login} />
      </Switch>
    </BrowserRouter>
  </Provider>
);

ReactDOM.render(<App />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
