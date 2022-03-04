import { v1 as uuid } from "uuid";
import { GET_BOOKS, ADD_BOOKS, DELETE_BOOKS, BOOKS_LOADING } from "../actions/types";
const initialState = {
    books: [],
    loading: false
}

export default function (state = initialState, action) {
    switch (action.type) {
        case GET_BOOKS:
            return {
                ...state,
                books: action.payload,
                loading: false 
            }
        case ADD_BOOKS:
            return {
                ...state,
                books: [action.payload, ...state.books],
                loading: false 
            }
        case DELETE_BOOKS:
            return {
                ...state,
                books: state.books.filter(book => book._id !== action.payload),
                loading: false 
            }
        case BOOKS_LOADING:
            return {
                ...state,
                loading: true
            }
        default:
            return state;
    }
}