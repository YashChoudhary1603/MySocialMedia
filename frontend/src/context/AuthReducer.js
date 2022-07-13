const AuthReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN_START":
      return {
        user: null,
        isFetching: true,
        error: false,
      };
    case "LOGIN_SUCCESS":
      return {
        user: action.payload,
        isFetching: false,
        error: false,
      };
    case "LOGIN_FAILURE":
      return {
        user: null,
        isFetching: false,
        error: true,
      };

    case "Follow":
      return {
        ...state,
        user: {
          ...state.user,
          followings: [...state.user.followings, action.payload],
        },
      };
    case "Unfollow":
      return {
        ...state,
        user: {
          ...state.user,
          followings: state.user.followings.filter((f)=> f !== action.payload),
        },
      };

    default:
      return state;
  }
}
export default AuthReducer;
