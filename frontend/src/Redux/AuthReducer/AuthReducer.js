import * as types from "./actionTypes";

const initState = {
  isAuth: JSON.parse(localStorage.getItem("userDetails")) ? true : false,
  isLoading: false,
  userName: "",
  userEmail: "",
  token:""
};

function AuthReducer(state = initState, action) {
  const { type, payload } = action;
  switch (type) {
    case types.SIGNUP_REQUEST: {
      return { ...state, isLoading: true };
    }
    case types.SIGNUP_SUCCESS: {
      return { ...state, isLoading: false };
    }
    case types.SIGNUP_FAILIURE: {
      return { ...state, isLoading: false };
    }
    case types.LOGIN_SUCCESS: {
      return {
        ...state,
        isLoading: false,
        isAuth: true,
        userName: payload.name,
        userEmail: payload.user,
        token: payload.token,
      };
    }

    default:
      return state;
  }
}
export { AuthReducer };
