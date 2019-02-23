import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { logoutUser } from "../../actions/authActions";

class Navbar extends Component {
  onLogout = e => {
    e.preventDefault();
    this.props.logoutUser();
  };

  render() {
    const { auth } = this.props;
    return (
      <nav className="navbar navbar-expand-lg navbar-dark bg-warning">
        <Link className="navbar-brand" to="/">
          <h2>User Todo</h2>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/">
                <h3>Home</h3>
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/users">
                <h3>Users</h3>
              </Link>
            </li>
          </ul>

          {auth.isAuthenticated === true ? (
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to={`/users/user?id=${auth.userId}`}>
                  <h3>My Page</h3>
                </Link>
              </li>
              <li className="nav-item">
                <Link onClick={this.onLogout} className="nav-link" to="/logout">
                  <h3>Logout</h3>
                </Link>
              </li>
            </ul>
          ) : (
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to="/register">
                  <h3>Register</h3>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/login">
                  <h3>Log In</h3>
                </Link>
              </li>
            </ul>
          )}
        </div>
      </nav>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { logoutUser }
)(Navbar);
