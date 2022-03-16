import axios from "axios";
import { GET_BOOKS, ADD_BOOKS, GET_BOOK, DELETE_BOOKS, BOOKS_LOADING, UPDATE_BOOK, SEARCH_BOOK } from "./types";
import { tokenConfig } from "./authActions";
import { returnErrors } from "./errorActions";

export const getbooks = user_id => (dispatch, getState) => {
    dispatch(setBooksLoading());
    axios.get(`/api/books/${user_id}`, tokenConfig(getState)).then(res =>
        dispatch({
            type: GET_BOOKS,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status))
        })
};

export const addbook = book => (dispatch, getState) => {
    axios.post('/api/books', book, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: ADD_BOOKS,
                payload: res.data
            })
        ).catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status))
        })
};

export const getbook = id => (dispatch, getState) => {
    axios.get(`/api/books/singlebook/${id._id}`, tokenConfig(getState))
        .then(res => dispatch({
            type: GET_BOOK,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status))
        })
};

export const updatebook = (id, book) => (dispatch, getState) => {
    axios.post(`/api/books/${id}`, book, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: UPDATE_BOOK,
                payload: res.data
            })
        ).catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status))
        })
};

export const searchbook = (key) => (dispatch, getState) => {
    axios.get(`/api/books/search/${key}`, tokenConfig(getState))
        .then(res =>
            dispatch({
                type: SEARCH_BOOK,
                payload: res.data
            })
        ).catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status))
        })
};


export const deletebook = id => (dispatch, getState) => {
    axios.delete(`/api/books/${id._id}`, tokenConfig(getState)).then(res => dispatch({
        type: DELETE_BOOKS,
        payload: id
    }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status))
        })
};

export const setBooksLoading = () => {
    return {
        type: BOOKS_LOADING,
    };
};