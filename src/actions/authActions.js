import { GET_ERRORS, SET_CURRENT_ID, GET_CURRENT_USER } from "./types";
import axios from "axios";
import jwt_decode from "jwt-decode";
import setAuthToken from "../utils/setAuthToken";

// Register User
export const registerUser = (newUser, history) => dispatch => {
  axios
    .post("/register", newUser)
    .then(res => history.push("/login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

export const loginUser = (userData, history) => dispatch => {
  axios
    .post("/login", userData)
    .then(res => {
      history.push("/");
      // Save to localStorage
      const { token } = res.data;
      // Set token to ls
      localStorage.setItem("jwtToken", token);
      //Set token to Auth header
      setAuthToken(token);
      // Decode token to get user data
      const decoded = jwt_decode(token);
      console.log(decoded);
      // Set current user
      dispatch(setCurrentId(decoded));
      dispatch(getCurrentUser(decoded.id));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

// Set logged in user
export const setCurrentId = decoded => {
  return {
    type: SET_CURRENT_ID,
    payload: decoded.id
  };
};

// Get logged in user data
export const getCurrentUser = id => dispatch => {
  axios
    .get(`/getCurrentUser/${id}`)
    .then(res =>
      dispatch({
        type: GET_CURRENT_USER,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_CURRENT_USER,
        payload: null
      })
    );
};

// Log user out

export const logoutUser = () => dispatch => {
  // Remove token from localStorage
  localStorage.removeItem("jwtToken");
  // Remove auth header for future requests
  setAuthToken(false);
  // Set current user to {} wich will set isAuthenticated to false
  dispatch(setCurrentId({})); // a reducerbe így false-ként fogja visszaadni az isAuthenticatedet
};
