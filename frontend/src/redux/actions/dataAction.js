import {
  SET_SCREAMS,
  LOADING_DATA,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  SET_ERRORS,
  COMMENT_SCREAM,
  DELETE_SCREAM,
} from "../types";
import axios from "axios";

export const getScreams = () => (dispatch) => {
  dispatch({ type: LOADING_DATA });
  axios
    .get("/scream")
    .then((res) => {
      dispatch({
        type: SET_SCREAMS,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: [],
      });
    });
};
export const likeScream = (screamId) => (dispatch) => {
  axios
    .get(`/scream/${screamId}/like`)
    .then((res) => {
      dispatch({
        type: LIKE_SCREAM,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: [],
      });
    });
};

export const unlikeScream = (screamId) => (dispatch) => {
  axios
    .get(`/scream/${screamId}/unlike`)
    .then((res) => {
      dispatch({
        type: UNLIKE_SCREAM,
        payload: res.data,
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: [],
      });
    });
};

export const deleteScream = (screamId, userName) => (dispatch) => {
  axios
    .delete(`/scream/${screamId}`)
    .then((res) => {
      dispatch({
        type: DELETE_SCREAM,
        payload: { screamId, userName },
      });
    })
    .catch((err) => {
      dispatch({
        type: SET_ERRORS,
        payload: [],
      });
    });
};

// export const commentScream = (screamId) => (dispatch) => {
//   axios
//     .post(`/scream/${screamId}/comment`)
//     .then((res) => {
//       dispatch({
//         type: COMMENT_SCREAM,
//         payload: res.data,
//       });
//     })
//     .catch((err) => {
//       dispatch({
//         type: SET_ERRORS,
//         payload: [],
//       });
//     });
// };

// app.get("/scream/:screamId/", getScream);
// app.delete("/scream/:screamId/", FBAuth, deleteScream);
// app.post("/scream/:screamId/comment", FBAuth, commentScream);
