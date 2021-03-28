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
    imagePath: "",
  },
};
if (loadState() && loadState().token) {
  const decodedToken = jwt.decode(loadState().token);
  initialState = {
    ...loadState(),
    user: {
      id: decodedToken.id,
      userName: decodedToken.userName,
      imagePath: decodedToken.imagePath,
    },
  };
} else {
  initialState = { ...emptyState };
}

export const userAuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case actions.LOGIN_SUCCESS:
      let newState;
      if (loadState() && loadState().token) {
        const decodedToken = jwt.decode(loadState().token);
        newState = {
          ...loadState(),
          user: {
            id: decodedToken.id,
            userName: decodedToken.userName,
            imagePath: decodedToken.imagePath,
          },
        };
      }
      return newState;

    case actions.UPDATE_USER:
      let updatedState = {
        ...state,
        user: {
          ...state.user,
          imagePath: action.payload.imagePath,
          userName: action.payload.userName,
        },
      };
      saveState(updatedState);
      return updatedState;

    case actions.LOGOUT:
      saveState(emptyState);
      return emptyState;

    case actions.LOGIN_FAILED:
      if (action.payload) {
        let newState = {
          token: null,
          isLoggedIn: false,
          error: action.payload,
        };
        saveState(newState);
        return newState;
      }

    default:
      return state;
  }
};
