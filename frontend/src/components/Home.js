import React from 'react';
import '../App.css';
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Login from "./Login";
import Register from "./Register";
function App() {
  return (<Router>
    <div className="App">      
      <div className="auth-wrapper">
        <div className="auth-inner App-header">
          <Switch>            
            <Route exact path='/'  component={Login} />
            <Route path="/login" component={Login} />
            <Route path="/register" component={Register} />
          </Switch>
        </div>
      </div>
    </div></Router>
  );
}

export default App;