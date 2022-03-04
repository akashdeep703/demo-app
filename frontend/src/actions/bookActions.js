import axios from "axios";
import { GET_BOOKS, ADD_BOOKS, DELETE_BOOKS, BOOKS_LOADING } from "./types";

export const getBooks = () => dispatch => {
    dispatch(setBooksLoading());
    axios.get('/api/books').then(res =>
        dispatch({
            type: GET_BOOKS,
            payload: res.data
        }))
};

export const AddBook = book => dispatch => {
    axios.post('/api/books', book)
        .then(res =>
            dispatch({
                type: ADD_BOOKS,
                payload: res.data
            })
        )

};

export const deleteBook = id => dispatch => {
console.log("🚀 ~ file: bookActions.js ~ line 25 ~ id", id)
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