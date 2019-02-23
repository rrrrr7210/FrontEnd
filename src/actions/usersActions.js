import axios from "axios";
import {
  GET_USERS,
  GET_USER,
  GET_ERRORS,
  FOLLOW_USER,
  UNFOLLOW_USER,
  GET_FOLLOWED_USERS,
  UPDATE_USER_NAME,
  DELETE_USER
} from "./types";

export const getUsers = () => dispatch => {
  axios
    .get("/users")
    .then(res =>
      dispatch({
        type: GET_USERS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_USERS,
        payload: null
      })
    );
};

export const getUser = id => dispatch => {
  axios
    .get(`/users/user/${id}`)
    .then(res =>
      dispatch({
        type: GET_USER,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_USER,
        payload: err.response.data
      })
    );
};

export const getFollowedUsers = id => dispatch => {
  axios
    .get(`/users/followedusers/${id}`)
    .then(res =>
      dispatch({
        type: GET_FOLLOWED_USERS,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_FOLLOWED_USERS,
        payload: err.response.data
      })
    );
};

export const updateUserName = (name, id) => dispatch => {
  axios
    .post(`/users/update`, { id, name })
    .then(res =>
      dispatch({
        type: UPDATE_USER_NAME,
        payload: res.data
      })
    )
    .catch(err => console.log(err));
};

export const deleteUser = id => dispatch => {
  axios
    .post(`/users/delete/${id}`)
    .then(res =>
      dispatch({
        type: DELETE_USER,
        payload: res.data
      })
    )
    .catch(err => console.log(err));
};

export const followUser = (id, currId) => async dispatch => {
  const response = axios.post(`/users/follow/${currId}/${id}`);
  const result = await response;
  dispatch({ type: FOLLOW_USER, payload: result.data });

  dispatch(getUsers());
};

export const unFollowUser = (id, currId) => async dispatch => {
  const response = axios.post(`/users/unfollow/${currId}/${id}`);
  const result = await response;
  dispatch({ type: UNFOLLOW_USER, payload: result.data });

  dispatch(getUsers());
};
