import * as action from '../../constant/users/authConstant';

export const userSignInReq = (userData: any) => ({
    type: action.USER_SIGNIN_REQ,
    userData,
});

export const userSignInSuccess = (result: any) => ({
    type: action.USER_SIGNIN_SUCCESS,
    payload: result,
})

export const userSignInFailed = (error: any) => ({
    type: action.USER_SIGNIN_FAIL,
    payload: error,
})

export const userLogout = () => ({
  type: action.USER_LOGOUT,
});

export const userSignInSetToken = (token: any) => ({
    type: action.USER_SIGNIN_SET_TOKEN,
    payload: token,
})