import React, { Component } from "react";
import { connect } from "react-redux";
import { getCurrentUser } from "../actions/authActions";

class Home extends Component {
  componentDidMount = () => {
    const { userId } = this.props.auth;
  };
  render() {
    return <div>{}</div>;
  }
}

const mapStateToProps = state => ({
  auth: state.auth
});

export default connect(
  mapStateToProps,
  { getCurrentUser }
)(Home);
