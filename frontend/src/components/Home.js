import React from 'react';
import '../App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import Dashboard from "./Dashboard"
import Profile from "./Profile";
import store from '../store';
import { loadUser } from '../actions/authActions';
function App() {
   store.dispatch(loadUser());
  return (<Router>
    <div className="App">
          <Switch>
            <Route exact path='/' component={Login} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
            <Route path='/dashboard' component={Dashboard} />
            <Route path='/profile' component={Profile} />
          </Switch>
    </div>
    </Router>
  );
}

export default App;