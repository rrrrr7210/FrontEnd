import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { registerUser } from "../../actions/authActions";
import classnames from "classnames";

class Register extends Component {
  constructor() {
    super();
    this.state = {
      name: "",
      email: "",
      password: "",
      password2: "",
      errors: {}
    };
  }

  componentDidMount = () => {
    if (this.props.auth.isAuthenticated === true) {
      this.props.history.push("/");
    }
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.errors) {
      this.setState({ errors: nextProps.errors });
    }
  }

  onSubmit = e => {
    e.preventDefault();

    const { name, email, password, password2 } = this.state;

    const newUser = {
      name,
      email,
      password,
      password2
    };

    this.props.registerUser(newUser, this.props.history);
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    const { name, email, password, password2, errors } = this.state;

    return (
      <div className="card mt-4">
        <div className="card-header display-4 text-center bg-warning text-white">
          Register Page
        </div>
        <div className="card-body">
          <form onSubmit={this.onSubmit}>
            <div className="form-group">
              {errors.name && (
                <div className="invalid-feedback text-right">{errors.name}</div>
              )}
              <label>Name :</label>
              <input
                style={{ height: 50, fontSize: 20 }}
                type="text"
                className={classnames("form-control col-5 float-right", {
                  "form-control col-5 float-right is-invalid": errors.name
                })}
                placeholder="Enter Name"
                onChange={this.onChange}
                value={name}
                name="name"
              />
            </div>
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
                error={errors.email}
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
                error={errors.password}
              />
            </div>
            <div className="form-group">
              {errors.password2 && (
                <div className="invalid-feedback text-right">
                  {errors.password2}
                </div>
              )}
              <label>Confirm Password :</label>
              <input
                style={{ height: 50, fontSize: 20 }}
                type="password"
                className={classnames("form-control col-5 float-right", {
                  "form-control col-5 float-right is-invalid": errors.password2
                })}
                placeholder="Confirm Password"
                onChange={this.onChange}
                value={password2}
                name="password2"
                error={errors.password2}
              />
            </div>
            <div className="form-group">
              <input
                style={{ height: 50, fontSize: 20 }}
                type="submit"
                value="Register"
                className="btn btn-primary col-lg float-right"
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
  { registerUser }
)(withRouter(Register));
