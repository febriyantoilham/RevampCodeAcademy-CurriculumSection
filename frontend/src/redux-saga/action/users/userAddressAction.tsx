import * as action from '../../constant/users/userAddressConstant';

// Create
export const createUserAddressRequest = (payload: any) => ({
    type: action.CREATE_USER_ADDRESS_REQUEST,
    payload,
});

export const createUserAddressSuccess = (result: any) => ({
    type: action.CREATE_USER_ADDRESS_SUCCESS,
    payload: result,
})

export const createUserAddressFailed = (error: any) => ({
    type: action.CREATE_USER_ADDRESS_FAILED,
    payload: error,
})

// edit
export const editUserAddressRequest = (payload: any) => ({
    type: action.EDIT_USER_ADDRESS_REQUEST,
    payload,
});

export const editUserAddressSuccess = (result: any) => ({
    type: action.EDIT_USER_ADDRESS_SUCCESS,
    payload: result,
})

export const editUserAddressFailed = (error: any) => ({
    type: action.EDIT_USER_ADDRESS_FAILED,
    payload: error,
})

// Delete
export const deleteUserAddressRequest = (payload: any) => ({
    type: action.DELETE_USER_ADDRESS_REQUEST,
    payload,
});

export const deleteUserAddressSuccess = (result: any) => ({
    type: action.DELETE_USER_ADDRESS_SUCCESS,
    payload: result,
})

export const deleteUserAddressFailed = (error: any) => ({
    type: action.DELETE_USER_ADDRESS_FAILED,
    payload: error,
})

// Reset
export const ResetUserAddresssData = () => ({
    type: 'RESET_USER_ADDRESS_STATE'
})