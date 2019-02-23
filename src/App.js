import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import PrivateRoute from "./helpers/PrivateRoute";

import store from "./store";
import { Provider } from "react-redux";

import Navbar from "./components/layouts/Navbar";

import Register from "./components/auth/Register";
import Login from "./components/auth/Login";
import Users from "./components/users/Users";
import UserPage from "./components/users/UserPage";
import Home from "./components/Home";

import "./App.css";
import setAuthToken from "./utils/setAuthToken";
import jwt_decode from "jwt-decode";
import {
  logoutUser,
  setCurrentId,
  getCurrentUser
} from "./actions/authActions";

// Check for token
if (localStorage.jwtToken) {
  // Set auth token header auth
  setAuthToken(localStorage.jwtToken);
  // Decode token and get user info and exp
  const decoded = jwt_decode(localStorage.jwtToken);
  // Set user and isAuthenticated
  store.dispatch(setCurrentId(decoded));
  store.dispatch(getCurrentUser(decoded.id));

  // Check for expire token
  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    //Logout user
    store.dispatch(logoutUser());

    // Redirect to login
    window.location.href = "/login";
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Navbar />
            <div className="container">
              <Route exact path="/register" component={Register} />
              <Route exact path="/login" component={Login} />
              <Switch>
                <PrivateRoute exact path="/" component={Home} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/users" component={Users} />
              </Switch>
              <Switch>
                <PrivateRoute exact path="/users/user/" component={UserPage} />
              </Switch>
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
