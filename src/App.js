import React from "react";
import { Route, Switch } from "react-router";
import Login from "./components/login";
import Main from "./components/main";
import { NavBar } from "./components/navBar";
import UserId from "./components/userId";
import Users from "./components/users";

function App() {
    return (
        <div>
            <NavBar/>
            <Switch>
                <Route path="/" exact component={Main}/>
                <Route path="/login" component={Login}/>
                <Route path="/users/:id" component={UserId}/>
                <Route path="/users" component={Users}/>

            </Switch>
        </div>
    );
};
export default App;
