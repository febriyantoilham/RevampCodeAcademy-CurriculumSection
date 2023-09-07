import * as action from '../../constant/users/userExperiencesConstant';

// Create
export const createUserExperiencesRequest = (payload: any) => ({
    type: action.CREATE_USER_EXPERIENCES_REQUEST,
    payload,
});

export const createUserExperiencesSuccess = (result: any) => ({
    type: action.CREATE_USER_EXPERIENCES_SUCCESS,
    payload: result,
})

export const createUserExperiencesFailed = (error: any) => ({
    type: action.CREATE_USER_EXPERIENCES_FAILED,
    payload: error,
})

// edit
export const editUserExperiencesRequest = (payload: any) => ({
    type: action.EDIT_USER_EXPERIENCES_REQUEST,
    payload,
});

export const editUserExperiencesSuccess = (result: any) => ({
    type: action.EDIT_USER_EXPERIENCES_SUCCESS,
    payload: result,
})

export const editUserExperiencesFailed = (error: any) => ({
    type: action.EDIT_USER_EXPERIENCES_FAILED,
    payload: error,
})

// Delete
export const deleteUserExperiencesRequest = (payload: any) => ({
    type: action.DELETE_USER_EXPERIENCES_REQUEST,
    payload,
});

export const deleteUserExperiencesSuccess = (result: any) => ({
    type: action.DELETE_USER_EXPERIENCES_SUCCESS,
    payload: result,
})

export const deleteUserExperiencesFailed = (error: any) => ({
    type: action.DELETE_USER_EXPERIENCES_FAILED,
    payload: error,
})

// Reset
export const ResetUserExperiencessData = () => ({
    type: 'RESET_USER_EXPERIENCES_STATE'
})