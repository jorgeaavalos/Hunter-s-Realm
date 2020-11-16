import scream from "../../components/scream";
import {
  SET_SCREAMS,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  LOADING_DATA,
  COMMENT_SCREAM,
  DELETE_SCREAM,
  POST_SCREAM,
  SET_SCREAM,
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
      return {
        ...state,
      };

    case COMMENT_SCREAM:
      let commentIndex = state.screams.findIndex(
        (scream) => scream.screamId === action.payload.screamId
      );
      let commentScream = state.screams[commentIndex];
      commentScream.commentCount += 1;
      state.screams[commentIndex] = commentScream;

      return {
        ...state,
      };

    case POST_SCREAM:
      return {
        ...state,
        screams: [action.payload, ...state.screams],
      };

    case SET_SCREAM:
      return {
        ...state,
        scream: action.payload,
      };

    default:
      return state;
  }
}
