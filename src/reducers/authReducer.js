import { SET_CURRENT_ID, GET_CURRENT_USER } from "../actions/types";
import isEmpty from "../helpers/is-empty";

const initialState = {
  isAuthenticated: false,
  userId: {},
  userData: {}
};

export default function(state = initialState, action) {
  switch (action.type) {
    case SET_CURRENT_ID:
      return {
        ...state,
        isAuthenticated: !isEmpty(action.payload),
        userId: action.payload
      };
    case GET_CURRENT_USER:
      return {
        ...state,
        userData: action.payload
      };

    default:
      return state;
  }
}
