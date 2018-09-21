import React from "react";
import ReactDOM from "react-dom";
import Main from "./Components/main";
import Admin from "./Components/admin";
import "./index.css";
import {BrowserRouter, Route, Switch} from 'react-router-dom';
ReactDOM.render(
 
  <BrowserRouter>
  <div>
    <Switch>
    <Route path="/admin" component={Admin} />
      <Route path="/" component={Main} />
    </Switch>
  </div>
</BrowserRouter>
  , 
  
  document.getElementById("root")
);