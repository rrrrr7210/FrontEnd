import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { getUser } from "../../actions/usersActions";

class FollowsTable extends Component {
  componentDidMount = () => {};

  clickToUserPage = id => e => {
    e.preventDefault();
    this.props.getUser(id);
  };

  render() {
    const { userId } = this.props.auth;
    const { user } = this.props;
    let output;

    output = user.followers.includes(userId) ? (
      <div>
        <Link to={`/users/user?id=${user._id}`}>
          <button className="form-control btn btn-info">{user.name}</button>
        </Link>
      </div>
    ) : null;
    return output;
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getUser }
)(FollowsTable);
