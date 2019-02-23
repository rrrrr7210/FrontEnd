import React, { Component } from "react";
import { connect } from "react-redux";
import { getUsers } from "../../actions/usersActions";
import User from "./User";
import FollowsTable from "./FollowsTable";
import isEmpty from "../../helpers/is-empty";

class Users extends Component {
  componentDidMount = () => {
    this.props.getUsers();
  };

  render() {
    const { userId } = this.props.auth;
    const { users } = this.props.users;

    let output;
    let followsTable;

    if (!isEmpty(users)) {
      output = users.map(user =>
        userId !== user._id ? <User user={user} key={user._id} /> : null
      );
      followsTable = users.map(user => (
        <FollowsTable user={user} key={user._id} />
      ));
    }

    return (
      <div>
        <div className="row">
          <div className="col-md-6 text-center mt-3">
            <h1>Users</h1>
            {output}
          </div>
          <div className="d-flex justify-content-end col-md-6">
            <div className="col-md-6 bg-white mt-3">
              <h1>Followed Users</h1>
              <div>{followsTable}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users,
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getUsers }
)(Users);
