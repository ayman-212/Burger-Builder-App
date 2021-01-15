import axios from "axios";

import * as actionTypes from "./actionTypes";

const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    }
}

const authSuccess = (token, userId) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: token,
        userId: userId
    }
}

const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    }
}

export const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("expDate");
    localStorage.removeItem("userId");
    return {
        type: actionTypes.AUTH_LOGOUT
    }
}

const checkAuthTimeout = (expTime) => {
    return dispatch => {
        setTimeout(() => {
            dispatch(logout());
        }, expTime * 1000);
    }
}

export const auth = (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart())
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        let url = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCX1huWuCQ6vTTDZ2BbmIKEV_3gudqIHX4";
        if (isSignUp) {
            url = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCX1huWuCQ6vTTDZ2BbmIKEV_3gudqIHX4"
        }
        axios.post(url, authData)
            .then(response => {
                //console.log(response)
                const expDate = new Date(new Date().getTime() + response.data.expiresIn * 1000)
                localStorage.setItem("token", response.data.idToken);
                localStorage.setItem("expDate", expDate);
                localStorage.setItem("userId", response.data.localId);
                dispatch(authSuccess(response.data.idToken, response.data.localId));
                dispatch(checkAuthTimeout(response.data.expiresIn));
            })
            .catch(error => {
                dispatch(authFail(error.response.data.error))
            })
    }
}

export const setAuthRedirectPath = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
};

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem("token");
        if (!token) {
            dispatch(logout())
        } else {
            const expDate = new Date(localStorage.getItem("expDate"));
            const userId = localStorage.getItem("userId")
            if (expDate > new Date()) {
                dispatch(authSuccess(token, userId));
                dispatch(checkAuthTimeout(
                    (expDate.getTime() - new Date().getTime()) / 1000)
                )
            } else {
                dispatch(logout())
            }
        }
    }
}