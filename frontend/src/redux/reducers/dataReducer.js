import {
  SET_SCREAMS,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  LOADING_DATA,
  COMMENT_SCREAM,
  DELETE_SCREAM,
} from "../types";

const initialState = {
  screams: [],
  scream: {},
  loading: false,
};

export default function (state = initialState, action) {
  switch (action.type) {
    case LOADING_DATA:
      return {
        ...state,
        loading: true,
      };
    case SET_SCREAMS:
      return {
        ...state,
        screams: action.payload,
        loading: false,
      };

    case LIKE_SCREAM:
      let likeIndex = state.screams.findIndex(
        (scream) => scream.screamId === action.payload.screamId
      );
      state.screams[likeIndex] = action.payload;
      return {
        ...state,
      };
    //You can chain these together.
    case UNLIKE_SCREAM:
      let unlikeIndex = state.screams.findIndex(
        (scream) => scream.screamId === action.payload.screamId
      );

      state.screams[unlikeIndex] = action.payload;
      return {
        ...state,
      };

    case DELETE_SCREAM:
      state.screams = state.screams.filter(
        (scream) =>
          scream.screamId !== action.payload.screamId ||
          scream.userName !== action.payload.userName
      );
      console.log(state.screams);

      return {
        ...state,
      };

    default:
      return state;

    // case COMMENT_SCREAM:
    //   return {};
  }
}
