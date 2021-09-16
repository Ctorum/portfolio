import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import About from "./About";
import Contact from "./Contact";
import Home from "./Home";
import Skills from "./Skills";

export default function Routes() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/" component={Home}></Route>
        <Route path="/contact" component={Contact}></Route>
        <Route path="/about" component={About}></Route>
        <Route path="/skills" component={Skills}></Route>
      </Switch>
    </BrowserRouter>
  );
}
