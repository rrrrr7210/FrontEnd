import React, { Component } from "react";
import { connect } from "react-redux";
import { loginUser } from "../../actions/authActions";
import classnames from "classnames";
import isEmpty from "../../helpers/is-empty";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      email: "",
      password: "",
      errors: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
    if (nextProps.auth.isAuthenticated === true) {
      this.props.history.push("/");
    }
  }

  componentDidMount = () => {
    if (this.props.auth.isAuthenticated === true) {
      this.props.history.push("/");
    }
  };

  onSubmit = e => {
    e.preventDefault();

    const { email, password } = this.state;
    const userData = {
      email,
      password
    };
    this.props.loginUser(userData, this.props.history);
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { email, password, errors } = this.state;
    return (
      <div className="card mt-4">
        <div className="card-header display-4 text-center bg-warning text-white">
          Login Page
        </div>
        <div className="card-body">
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              {errors.email && (
                <div className="invalid-feedback text-right">
                  {errors.email}
                </div>
              )}
              <label>Email :</label>

              <input
                style={{ height: 50, fontSize: 20 }}
                type="text"
                className={classnames("form-control col-5 float-right", {
                  "form-control col-5 float-right is-invalid": errors.email
                })}
                placeholder="Enter Email"
                onChange={this.onChange}
                value={email}
                name="email"
              />
            </div>
            <div className="form-group">
              {errors.password && (
                <div className="invalid-feedback text-right">
                  {errors.password}
                </div>
              )}
              <label>Password :</label>

              <input
                style={{ height: 50, fontSize: 20 }}
                type="password"
                className={classnames("form-control col-5 float-right", {
                  "form-control col-5 float-right is-invalid": errors.password
                })}
                placeholder="Enter Password"
                onChange={this.onChange}
                value={password}
                name="password"
              />
            </div>
            <div className="form-group">
              <input
                style={{ height: 50, fontSize: 20 }}
                type="submit"
                value="Login"
                className="btn btn-primary form-control"
              />
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { loginUser }
)(Register);
