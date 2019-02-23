import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { followUser, unFollowUser } from "../../actions/usersActions";

class User extends Component {
  componentDidMount = () => {};

  followClick = id => e => {
    e.preventDefault();

    const { userId } = this.props.auth;
    this.props.followUser(id, userId);
    // window.location.reload();
  };

  unFollowClick = id => e => {
    e.preventDefault();

    const { userId } = this.props.auth;
    this.props.unFollowUser(id, userId);
    // window.location.reload();
  };

  render() {
    const { user } = this.props;
    const { userId } = this.props.auth;
    return (
      <div className="card mt-3">
        <div className="card-header">
          <Link className="text-info" to={`/users/user?id=${user._id}`}>
            {user.name}
          </Link>
        </div>
        <div className="card-body">
          <div>{user.email}</div>
          <div className="text-right">
            {user.followers.includes(userId) ? (
              <button
                onClick={this.unFollowClick(user._id)}
                className="btn btn-danger"
              >
                Unfollow
              </button>
            ) : (
              <button
                onClick={this.followClick(user._id)}
                className="btn btn-info"
              >
                Follow
              </button>
            )}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { followUser, unFollowUser }
)(User);
