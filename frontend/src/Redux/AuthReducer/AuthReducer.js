import * as types from "./actionTypes";

const initState = {
  isAuth: JSON.parse(localStorage.getItem("userDetails")) ? true : false,
  isLoading: false,
  user:JSON.parse(localStorage.getItem("userDetails"))||{}
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
      console.log(payload)
      return {
        ...state,
        isLoading: false,
        isAuth: true,
        user:payload
      };
    }

    default:
      return state;
  }
}
export { AuthReducer };
