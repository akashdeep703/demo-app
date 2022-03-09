import axios from "axios";
import { GET_BOOKS, ADD_BOOKS, GET_BOOK, DELETE_BOOKS, BOOKS_LOADING, UPDATE_BOOK } from "./types";

export const getBooks = () => dispatch => {
    dispatch(setBooksLoading());
    axios.get('/api/books').then(res =>
        dispatch({
            type: GET_BOOKS,
            payload: res.data
        }))
};

export const addBook = book => dispatch => {
    axios.post('/api/books', book)
        .then(res =>
            dispatch({
                type: ADD_BOOKS,
                payload: res.data
            })
        )
};

export const getBook = id => dispatch => {
    axios.get(`/api/books/${id._id}`)
        .then(res => dispatch({
            type: GET_BOOK,
            payload: res.data
        }))
};

export const updateBook = (id, book) => dispatch => {
    axios.post(`/api/books/${id}`, book)
        .then(res =>
            dispatch({
                type: UPDATE_BOOK,
                payload: res.data
            })
        )
};

export const deleteBook = id => dispatch => {
    axios.delete(`/api/books/${id._id}`).then(res => dispatch({
        type: DELETE_BOOKS,
        payload: id
    }))
};

export const setBooksLoading = () => {
    return {
        type: BOOKS_LOADING,
    };
};