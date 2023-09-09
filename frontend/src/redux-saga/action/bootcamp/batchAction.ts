import * as action from '../../constant/bootcamp/batchConstant'

// Reset
export const ResetBatch = () => ({
    type: 'RESET_BATCH'
})

// Get Status
export const getStatusReq = () => ({
    type: action.GET_STATUS_REQ,
});

export const getStatusSuccess = (result: any) => ({
    type: action.GET_STATUS_SUCCESS,
    payload: result,
})

export const getStatusFail = (error: any) => ({
    type: action.GET_STATUS_FAIL,
    payload: error,
})

// Get Program
export const getProgramReq = () => ({
    type: action.GET_PROGRAM_REQ,
});

export const getProgramSuccess = (result: any) => ({
    type: action.GET_PROGRAM_SUCCESS,
    payload: result,
})

export const getProgramFail = (error: any) => ({
    type: action.GET_PROGRAM_FAIL,
    payload: error,
})

// Get Batch
export const getBatchReq = (payload: any) => ({
    type: action.GET_BATCH_REQ,
    payload,
});

export const getBatchSuccess = (result: any) => ({
    type: action.GET_BATCH_SUCCESS,
    payload: result,
})

export const getBatchFail = (error: any) => ({
    type: action.GET_BATCH_FAIL,
    payload: error,
})

// Bulk Delete Batch
export const bulkDeleteBatchReq = (payload: any) => ({
    type: action.BULK_DELETE_BATCH_REQ,
    payload,
});

export const bulkDeleteBatchSuccess = (result: any) => ({
    type: action.BULK_DELETE_BATCH_SUCCESS,
    payload: result,
})

export const bulkDeleteBatchFail = (error: any) => ({
    type: action.BULK_DELETE_BATCH_FAIL,
    payload: error,
})

// Bulk Create Batch
export const createBatchReq = (payload: any) => ({
    type: action.CREATE_BATCH_REQ,
    payload,
});

export const createBatchSuccess = (result: any) => ({
    type: action.CREATE_BATCH_SUCCESS,
    payload: result,
})

export const createBatchFail = (error: any) => ({
    type: action.CREATE_BATCH_FAIL,
    payload: error,
})