import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import querystring from "query-string";
import isEmpty from "../../helpers/is-empty";
import {
  getUser,
  getFollowedUsers,
  updateUserName,
  deleteUser
} from "../../actions/usersActions";

class UserPage extends Component {
  constructor() {
    super();
    this.state = {
      isEdit: false,
      name: ""
    };
  }

  componentDidMount = () => {
    const userId = querystring.parse(this.props.location.search).id;

    const { user } = this.props;

    this.props.getUser(userId);
    if (user !== null) {
      if (!isEmpty(user.followedusers)) {
        user.followedusers.forEach(followeduser =>
          this.props.getFollowedUsers(followeduser)
        );
      }
    }
  };

  editClick = e => {
    e.preventDefault();
    this.setState({ isEdit: !this.state.isEdit });
  };

  updateClick = e => {
    e.preventDefault();
    const { userId } = this.props.auth;
    this.props.updateUserName(this.state.name, userId);
  };

  deleteClick = e => {
    e.preventDefault();
    const { userId } = this.props.auth;
    this.props.deleteUser(userId);
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { userData } = this.props.auth;
    const { user } = this.props;
    const { followedusers } = this.props;
    const { auth } = this.props;
    let userdetails;

    // USER DETAILS AND UPDATE
    if (user) {
      userdetails = (
        <div className="jumbotron mt-3">
          <h2>Details :</h2>

          <div className="card">
            {this.state.isEdit === false ? (
              <div className="card-header">{user.name}</div>
            ) : (
              <input
                onChange={this.onChange}
                value={this.state.name}
                name="name"
                type="text"
              />
            )}

            <div className="card-body">{user.email}</div>
          </div>

          {/* MY PAGE */}
          {user._id === userData._id ? (
            <div className="row text-center mt-3">
              <div className="col">
                <button
                  onClick={this.editClick}
                  className="btn btn-primary form-control"
                >
                  {this.state.isEdit === false ? "Edit" : "Cancel"}
                </button>
              </div>
              <div className="col">
                {this.state.isEdit === false ? (
                  <button
                    onClick={this.deleteClick}
                    className="btn btn-danger form-control"
                  >
                    Delete
                  </button>
                ) : (
                  <button
                    onClick={this.updateClick}
                    className="btn btn-success form-control"
                  >
                    Update
                  </button>
                )}
              </div>
            </div>
          ) : null}
        </div>
      );
    }

    // FOLLOWED USER NAMES

    let output;
    if (!isEmpty(followedusers)) {
      output = followedusers.map(use => (
        <div key={use._id} className="col">
          <button className="btn btn-primary col-md-12">{use.name}</button>
        </div>
      ));
    } else {
      output = (
        <h1 style={{ color: "green" }}>
          {user.name} <p style={{ color: "red" }}>doesn't following anybody</p>
        </h1>
      );
    }

    return (
      <div className="mt-3">
        <h1 className="text-center">{user.name}'s Page</h1>
        <div className="row">
          <div className="col-md-6">{userdetails}</div>
          <div className="d-flex justify-content-end col-md-6">
            <div className="col-md-9 jumbotron mt-3">
              <h1>{user.name} followed</h1>
              {output}
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  followedusers: state.users.followedusers,
  auth: state.auth,
  user: state.users.user
});

export default connect(
  mapStateToProps,
  { getUser, getFollowedUsers, updateUserName, deleteUser }
)(UserPage);
