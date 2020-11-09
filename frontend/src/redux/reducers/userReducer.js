import {
  SET_USER,
  LOADING_USER,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
} from "../types";

const initialState = {
  auth: false,
  loading: false,
  credentials: { userName: " " },
  likes: [],
  notifications: [],
};
export default function (state = initialState, action) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        auth: true,
      };
    case SET_UNAUTHENTICATED:
      return {
        ...initialState,
      };
    case SET_USER:
      return {
        auth: true,
        ...action.payload,
        loading: false,
      };
    case LOADING_USER:
      return {
        ...state,
        loading: true,
      };
    case LIKE_SCREAM:
      return {
        ...state,
        likes: [
          ...state.likes,
          {
            userName: state.credentials.userName,
            screamId: action.payload.screamId,
          },
        ],
      };
    case UNLIKE_SCREAM:
      return {
        ...state,
        likes: state.likes.filter(
          (like) => like.screamId !== action.payload.screamId
        ),
      };

    default:
      return state;
  }
}
