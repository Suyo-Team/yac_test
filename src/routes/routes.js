import React from 'react';
import { Switch, Route } from 'react-router-dom'
import {
    Home,
    Auth
} from "../pages/"

function Router() {
    return (
            <Switch>
                <Route exact path='/' component={Auth} />
                <Route path='/home' component={Home} />
            </Switch>
    )
}


export default Router;