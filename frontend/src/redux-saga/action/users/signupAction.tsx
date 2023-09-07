import * as action from '../../constant/users/signupConstant';

export const userSignUpReq = (userData: any) => ({
    type: action.USER_SIGNUP_REQ,
    userData,
});

export const userSignUpSuccess = (result: any) => ({
    type: action.USER_SIGNUP_SUCCESS,
    payload: result,
})

export const userSignUpFailed = (error: any) => ({
    type: action.USER_SIGNUP_FAIL,
    payload: error,
})

export const userSignUpSetToken = (token: any) => ({
    type: action.USER_SIGNUP_SET_TOKEN,
    payload: token,
})

// Reset
export const ResetSignUpData = () => ({
    type: 'RESET_SIGNUP_STATE'
})