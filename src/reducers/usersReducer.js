import {
  GET_USERS,
  GET_USER,
  FOLLOW_USER,
  UNFOLLOW_USER,
  GET_FOLLOWED_USERS,
  UPDATE_USER_NAME,
  DELETE_USER
} from "../actions/types";

const initialState = {
  users: [],
  user: [],
  followedusers: [],
  update: []
};

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_USERS:
      return {
        ...state,
        users: action.payload,
        followedusers: []
      };
    case GET_USER:
      return {
        ...state,
        user: action.payload
      };
    case FOLLOW_USER:
      return {
        ...state,
        users: state.users
      };
    case UNFOLLOW_USER:
      return {
        ...state,
        users: state.users
      };
    case GET_FOLLOWED_USERS:
      return {
        ...state,
        followedusers: [...state.followedusers, action.payload]
      };
    case UPDATE_USER_NAME:
      return {
        ...state,
        update: action.payload
      };
    case DELETE_USER:
      return {
        ...state,
        update: action.payload
      };

    default:
      return state;
  }
}
