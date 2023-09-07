import * as action from '../../constant/users/usersConstant';

// Get User By Id
export const getUserByIdRequest = (id: any) => ({
    type: action.GET_USER_BY_ID_REQUEST,
    id,
});

export const getUserByIdSuccess = (result: any) => ({
    type: action.GET_USER_BY_ID_SUCCESS,
    payload: result,
})

export const getUserByIdFailed = (error: any) => ({
    type: action.GET_USER_BY_ID_FAILED,
    payload: error,
})

// Update User
export const updateUserRequest = (payload: any) => ({
    type: action.UPDATE_USER_REQUEST,
    payload,
});

export const updateUserSuccess = (result: any) => ({
    type: action.UPDATE_USER_SUCCESS,
    payload: result,
})

export const updateUserFailed = (error: any) => ({
    type: action.UPDATE_USER_FAILED,
    payload: error,
})

// Update User Photo
export const updateUserPhotoRequest = (payload: any) => ({
    type: action.UPDATE_USER_PHOTO_REQUEST,
    payload,
});

export const updateUserPhotoSuccess = (result: any) => ({
    type: action.UPDATE_USER_PHOTO_SUCCESS,
    payload: result,
})

export const updateUserPhotoFailed = (error: any) => ({
    type: action.UPDATE_USER_PHOTO_FAILED,
    payload: error,
})

// Update Password
export const updatePasswordRequest = (payload: any) => ({
    type: action.UPDATE_PASSWORD_REQUEST,
    payload,
});

export const updatePasswordSuccess = (result: any) => ({
    type: action.UPDATE_PASSWORD_SUCCESS,
    payload: result,
})

export const updatePasswordFailed = (error: any) => ({
    type: action.UPDATE_PASSWORD_FAILED,
    payload: error,
})

// Reset
export const ResetUserData = () => ({
    type: 'RESET_USER_STATE'
})