import * as action from '../../constant/master/cityConstant';

// get
export const getcityRequest = () => ({
    type: action.GET_CITY_REQUEST,
});

export const getcitySuccess = (result: any) => ({
    type: action.GET_CITY_SUCCESS,
    payload: result,
})

export const getcityFailed = (error: any) => ({
    type: action.GET_CITY_FAILED,
    payload: error,
})

// edit
export const editcityRequest = (payload: any) => ({
    type: action.EDIT_CITY_REQUEST,
    payload,
});

export const editcitySuccess = (result: any) => ({
    type: action.EDIT_CITY_SUCCESS,
    payload: result,
})

export const editcityFailed = (error: any) => ({
    type: action.EDIT_CITY_FAILED,
    payload: error,
})

// Delete
export const deletecityRequest = (payload: any) => ({
    type: action.DELETE_CITY_REQUEST,
    payload,
});

export const deletecitySuccess = (result: any) => ({
    type: action.DELETE_CITY_SUCCESS,
    payload: result,
})

export const deletecityFailed = (error: any) => ({
    type: action.DELETE_CITY_FAILED,
    payload: error,
})

// Reset
export const ResetcitysData = () => ({
    type: 'RESET_CITY_STATE'
})