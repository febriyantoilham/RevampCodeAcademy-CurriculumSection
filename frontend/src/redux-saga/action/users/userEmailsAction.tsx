import * as action from '../../constant/users/userEmailsConstant';

// Create
export const createUserEmailRequest = (payload: any) => ({
    type: action.CREATE_USER_EMAIL_REQUEST,
    payload,
});

export const createUserEmailSuccess = (result: any) => ({
    type: action.CREATE_USER_EMAIL_SUCCESS,
    payload: result,
})

export const createUserEmailFailed = (error: any) => ({
    type: action.CREATE_USER_EMAIL_FAILED,
    payload: error,
})

// edit
export const editUserEmailRequest = (payload: any) => ({
    type: action.EDIT_USER_EMAIL_REQUEST,
    payload,
});

export const editUserEmailSuccess = (result: any) => ({
    type: action.EDIT_USER_EMAIL_SUCCESS,
    payload: result,
})

export const editUserEmailFailed = (error: any) => ({
    type: action.EDIT_USER_EMAIL_FAILED,
    payload: error,
})

// Delete
export const deleteUserEmailRequest = (payload: any) => ({
    type: action.DELETE_USER_EMAIL_REQUEST,
    payload,
});

export const deleteUserEmailSuccess = (result: any) => ({
    type: action.DELETE_USER_EMAIL_SUCCESS,
    payload: result,
})

export const deleteUserEmailFailed = (error: any) => ({
    type: action.DELETE_USER_EMAIL_FAILED,
    payload: error,
})

// Reset
export const ResetUserEmailsData = () => ({
    type: 'RESET_USER_EMAILS_STATE'
})