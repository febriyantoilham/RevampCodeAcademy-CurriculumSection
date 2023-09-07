import * as action from '../../constant/master/addressTypeConstant';

// get
export const getAddressTypeRequest = () => ({
    type: action.GET_ADDRESS_TYPE_REQUEST,
});

export const getAddressTypeSuccess = (result: any) => ({
    type: action.GET_ADDRESS_TYPE_SUCCESS,
    payload: result,
})

export const getAddressTypeFailed = (error: any) => ({
    type: action.GET_ADDRESS_TYPE_FAILED,
    payload: error,
})

// edit
export const editAddressTypeRequest = (payload: any) => ({
    type: action.EDIT_ADDRESS_TYPE_REQUEST,
    payload,
});

export const editAddressTypeSuccess = (result: any) => ({
    type: action.EDIT_ADDRESS_TYPE_SUCCESS,
    payload: result,
})

export const editAddressTypeFailed = (error: any) => ({
    type: action.EDIT_ADDRESS_TYPE_FAILED,
    payload: error,
})

// Delete
export const deleteAddressTypeRequest = (payload: any) => ({
    type: action.DELETE_ADDRESS_TYPE_REQUEST,
    payload,
});

export const deleteAddressTypeSuccess = (result: any) => ({
    type: action.DELETE_ADDRESS_TYPE_SUCCESS,
    payload: result,
})

export const deleteAddressTypeFailed = (error: any) => ({
    type: action.DELETE_ADDRESS_TYPE_FAILED,
    payload: error,
})

// Reset
export const ResetAddressTypesData = () => ({
    type: 'RESET_ADDRESS_TYPE_STATE'
})