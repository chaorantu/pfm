import React, { Component } from 'react';
import {BrowserRouter, Switch, Route} from "react-router-dom";
import  Signup from "./Signup"
import App from "./App"
import Main from "./Main"
import Category from "./Category"
import Income from "./Income"
import Spending from "./Spending";

const Router = () => (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
        <Switch>
            <Route path="/" component={App} exact/>
            <Route path="/signup" component={Signup}exact/>
            <Route path="/user/:id" component={Main}exact/>
            <Route path="/user/:id/category" component={Category}exact/>
            <Route path="/user/:id/income" component={Income}exact/>
            <Route path="/user/:id/spending" component={Spending}exact/>
        </Switch>
    </BrowserRouter>
);

export default Router;