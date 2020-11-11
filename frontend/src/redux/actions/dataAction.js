import {
  SET_SCREAMS,
  LOADING_DATA,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
  SET_ERRORS,
  COMMENT_SCREAM,
  DELETE_SCREAM,
  POST_SCREAM,
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
      console.log(res.data);
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
export const postScream = (newScream) => (dispatch) => {
  axios
    .post(`/scream/`, newScream)
    .then((res) => {
      dispatch({
        type: POST_SCREAM,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const commentScream = (screamId, comment) => (dispatch) => {
  axios
    .post(`/scream/${screamId}/comment`, comment)
    .then((res) => {
      dispatch({
        type: COMMENT_SCREAM,
        payload: res.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

// export const uploadImage = (formData) => (dispatch) => {
//   dispatch({ type: LOADING_USER });
//   axios
//     .post("/user/image", formData)
//     .then(() => {
//       dispatch(getUserData());
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };
// app.get("/scream/:screamId/", getScream);
// app.post("/scream/:screamId/comment", FBAuth, commentScream);
