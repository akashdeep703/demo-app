import { USER_LOADED, USER_LOADING, LOGIN_FAIL, LOGIN_SUCCESS, REGISTER_FAIL, REGISTER_SUCCESS, LOGOUT_SUCCESS, AUTH_ERROR } from "../actions/types";

const initialState = {
    token: localStorage.getItem('token'),
    isAuthenticated: null,
    isLoading: false,
    user: null
}

export default function (state = initialState, action) {
    switch (action.type) {

        case USER_LOADING:
            return {
                ...state,
                isLoading: true
            };
        case USER_LOADED:
            return {
                ...state,
                isAuthenticated: true,
                isLoading: false,
                user: action.payload
            };
        case LOGIN_SUCCESS:
        case REGISTER_SUCCESS:
            localStorage.setItem('token', action.payload.token)
            localStorage.setItem('user_id', action.payload.user.id)
            localStorage.setItem('user', action.payload.user.name)
            localStorage.setItem('email', action.payload.user.email)
            localStorage.setItem('phone', action.payload.user.phone)
            localStorage.setItem('user_type', action.payload.user.user_type)
            return {
                ...state,
                ...action.payload,
                isAuthenticated: true,
                isLoading: false
            };
        case AUTH_ERROR:
        case LOGIN_FAIL:
        case LOGOUT_SUCCESS:
        case REGISTER_FAIL:
            localStorage.removeItem('token');
            localStorage.removeItem('user');
            localStorage.removeItem('email');
            localStorage.removeItem('phone');
            localStorage.removeItem('user_type');
            return {
                ...state,
                token: null,
                user: null,
                isAuthenticated: false,
                isLoading: false
            }
        default:
            return state;
    }
}