import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL;
const USERS_API = `${BASE_URL}/api/users`;
const TUITS_API = `${BASE_URL}/api/tuits`;

const api = axios.create({
    withCredentials: true
});

export const userTuitLikes = (uid, tid) =>
    api.put(`${USERS_API}/${uid}/likes/${tid}`)
        .then(response => response.data);

export const userTuitDisLikes = (uid, tid) =>
    api.put(`${USERS_API}/${uid}/unlikes/${tid}`)
        .then(response => response.data);

export const findAllTuitsLikedByUser = (userId) =>
    api.get(`${USERS_API}/${userId}/likes`)
        .then(response => response.data);

export const findAllTuitsDislikedByUser = (userId) =>
    api.get(`${USERS_API}/${userId}/dislikes`)
        .then(response => response.data);

export const findAllUsersThatLikedTuit = (tid) =>
    api.get(`${TUITS_API}/${tid}/likes`)
        .then(response => response.data);

export const userLikesTuit = (uid, tid) =>
    api.put(`${USERS_API}/${uid}/likes/${tid}`)
        .then(response => response.data);

export const findUserLikesTuit = (uid, tid) =>
    api.post(`${USERS_API}/${uid}/find-like/${tid}`)
        .then(response => response.data);

export const findUserDisLikesTuit = (uid, tid) =>
    api.post(`${USERS_API}/${uid}/find-dislike/${tid}`)
        .then(response => response.data);