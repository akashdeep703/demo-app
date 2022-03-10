import axios from "axios";
import { USER_LOADED, USER_LOADING, LOGIN_FAIL, LOGIN_SUCCESS, REGISTER_FAIL, REGISTER_SUCCESS, LOGOUT_SUCCESS, AUTH_ERROR } from "../actions/types";
import { returnErrors } from "./errorActions";

// Check token & load user
export const loadUser = () => (dispatch, getState) => {
    //user loading
    dispatch({ type: USER_LOADING });


    axios.get('/api/auth/user', tokenConfig(getState)).then(res =>
        dispatch({
            type: USER_LOADED,
            payload: res.data
        }))
        .catch(err => {
            dispatch(returnErrors(err.response.data, err.response.status))
            dispatch({
                type: AUTH_ERROR
            });
        });

};
//setup config/headers and token 

export const tokenConfig = getState => {
    // get token from localstorage
    const token = getState().auth.token;

    //Headers
    const config = {
        headers: {
            "Content-type": "application/json"
        }
    }

    // If token, add to headers
    if (token) {
        config.headers['x-auth-token'] = token;

    }

    return config;
}