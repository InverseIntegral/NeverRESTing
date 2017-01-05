import React from 'react'
import {IndexRoute, Route} from 'react-router';

import App from '../components/App'
import LoginForm from '../containers/LoginForm';
import Home from '../components/Home';

export default (
    <Route path="/" component={App}>
        <IndexRoute component={LoginForm}/>
        <Route path="/home" component={Home}/>
        <Route path="/login" component={LoginForm}/>
    </Route>
);