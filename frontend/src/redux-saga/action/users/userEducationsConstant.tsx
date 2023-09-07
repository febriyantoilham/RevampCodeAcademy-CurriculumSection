import * as action from '../../constant/users/userEducationsConstant';

// Create
export const createUserEducationsRequest = (payload: any) => ({
    type: action.CREATE_USER_EDUCATIONS_REQUEST,
    payload,
});

export const createUserEducationsSuccess = (result: any) => ({
    type: action.CREATE_USER_EDUCATIONS_SUCCESS,
    payload: result,
})

export const createUserEducationsFailed = (error: any) => ({
    type: action.CREATE_USER_EDUCATIONS_FAILED,
    payload: error,
})

// edit
export const editUserEducationsRequest = (payload: any) => ({
    type: action.EDIT_USER_EDUCATIONS_REQUEST,
    payload,
});

export const editUserEducationsSuccess = (result: any) => ({
    type: action.EDIT_USER_EDUCATIONS_SUCCESS,
    payload: result,
})

export const editUserEducationsFailed = (error: any) => ({
    type: action.EDIT_USER_EDUCATIONS_FAILED,
    payload: error,
})

// Delete
export const deleteUserEducationsRequest = (payload: any) => ({
    type: action.DELETE_USER_EDUCATIONS_REQUEST,
    payload,
});

export const deleteUserEducationsSuccess = (result: any) => ({
    type: action.DELETE_USER_EDUCATIONS_SUCCESS,
    payload: result,
})

export const deleteUserEducationsFailed = (error: any) => ({
    type: action.DELETE_USER_EDUCATIONS_FAILED,
    payload: error,
})

// Reset
export const ResetUserEducationssData = () => ({
    type: 'RESET_USER_EDUCATIONS_STATE'
})