import * as action from '../../constant/master/jobTypeConstant';

// get
export const getJobTypeRequest = () => ({
    type: action.GET_JOB_TYPE_REQUEST,
});

export const getJobTypeSuccess = (result: any) => ({
    type: action.GET_JOB_TYPE_SUCCESS,
    payload: result,
})

export const getJobTypeFailed = (error: any) => ({
    type: action.GET_JOB_TYPE_FAILED,
    payload: error,
})

// edit
export const editJobTypeRequest = (payload: any) => ({
    type: action.EDIT_JOB_TYPE_REQUEST,
    payload,
});

export const editJobTypeSuccess = (result: any) => ({
    type: action.EDIT_JOB_TYPE_SUCCESS,
    payload: result,
})

export const editJobTypeFailed = (error: any) => ({
    type: action.EDIT_JOB_TYPE_FAILED,
    payload: error,
})

// Delete
export const deleteJobTypeRequest = (payload: any) => ({
    type: action.DELETE_JOB_TYPE_REQUEST,
    payload,
});

export const deleteJobTypeSuccess = (result: any) => ({
    type: action.DELETE_JOB_TYPE_SUCCESS,
    payload: result,
})

export const deleteJobTypeFailed = (error: any) => ({
    type: action.DELETE_JOB_TYPE_FAILED,
    payload: error,
})

// Reset
export const ResetJobTypesData = () => ({
    type: 'RESET_JOB_TYPE_STATE'
})