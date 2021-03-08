import { userAuth as actions } from "./../actions/index";
import jwt from "jsonwebtoken";
import { saveState, loadState } from "./../store/sessionStorage";

let initialState;
const emptyState = {
  isLoggedIn: false,
  error: "",
  token: null,
  user: {
    id: "",
    userName: "",
    imageUrl: "",
  },
};
if (loadState() && loadState().token) {
  const decodedToken = jwt.decode(loadState().token);
  initialState = {
    ...loadState(),
    user: {
      id: decodedToken.id,
      userName: decodedToken.userName,
      imageUrl: decodedToken.imageUrl,
    },
  };
} else {
  initialState = { ...emptyState };
}

export const userAuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.LOGIN_SUCCESS:
      let returnedState;
      if (loadState() && loadState().token) {
        const decodedToken = jwt.decode(loadState().token);
        returnedState = {
          ...loadState(),
          user: {
            id: decodedToken.id,
            userName: decodedToken.userName,
            imageUrl: decodedToken.imageUrl,
          },
        };
      }
      return returnedState;

    case actions.LOGOUT:
      saveState(emptyState);
      return emptyState;

    case actions.LOGIN_FAILED:
      if (action.payload) {
        let returnedState = {
          token: null,
          isLoggedIn: false,
          error: action.payload,
        };
        saveState(returnedState);
        return returnedState;
      }

    default:
      return state;
  }
};
