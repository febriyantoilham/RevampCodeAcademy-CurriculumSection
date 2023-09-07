import * as action from '../../constant/users/userPhonesConstant';

// Create
export const createUserPhoneRequest = (payload: any) => ({
    type: action.CREATE_USER_PHONE_REQUEST,
    payload,
});

export const createUserPhoneSuccess = (result: any) => ({
    type: action.CREATE_USER_PHONE_SUCCESS,
    payload: result,
})

export const createUserPhoneFailed = (error: any) => ({
    type: action.CREATE_USER_PHONE_FAILED,
    payload: error,
})

// edit
export const editUserPhoneRequest = (payload: any) => ({
    type: action.EDIT_USER_PHONE_REQUEST,
    payload,
});

export const editUserPhoneSuccess = (result: any) => ({
    type: action.EDIT_USER_PHONE_SUCCESS,
    payload: result,
})

export const editUserPhoneFailed = (error: any) => ({
    type: action.EDIT_USER_PHONE_FAILED,
    payload: error,
})

// Delete
export const deleteUserPhoneRequest = (payload: any) => ({
    type: action.DELETE_USER_PHONE_REQUEST,
    payload,
});

export const deleteUserPhoneSuccess = (result: any) => ({
    type: action.DELETE_USER_PHONE_SUCCESS,
    payload: result,
})

export const deleteUserPhoneFailed = (error: any) => ({
    type: action.DELETE_USER_PHONE_FAILED,
    payload: error,
})

// Reset
export const ResetUserPhonesData = () => ({
    type: 'RESET_USER_PHONE_STATE'
})