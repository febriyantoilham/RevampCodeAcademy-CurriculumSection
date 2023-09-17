import * as action from '../../constant/curriculum/programEntityConstant'

// Get Program
export const GetProgramReq = (payload: any) => ({
    type: action.GET_PROGRAMS_REQ,
    payload,
})

export const GetProgramSuccess = (result : any) => ({
    type: action.GET_PROGRAMS_SUCCESS,
    payload: result
})

export const GetProgramFailed = (error : any) => ({
    type: action.GET_PROGRAMS_FAILED,
    payload: error
})

// Get Program by Id
export const GetProgramByIdReq = (payload : any) => ({
    type: action.GET_ONE_DATA_REQ,
    payload
})

export const GetProgramByIdSuccess = (payload : any) => ({
    type: action.GET_ONE_DATA_SUCCESS,
    payload
})

export const GetProgramByIdFailed = (payload : any) => ({
    type: action.GET_ONE_DATA_FAILED,
    payload
})

// Create newest progEntityId
export const CreateProgEntityIdReq = () => ({
    type: action.GET_NEW_ID_REQ,
})

export const CreateProgEntityIdSuccess = (payload : any) => ({
    type: action.GET_NEW_ID_SUCCESS,
    payload
})

export const CreateProgEntityIdFailed = (payload : any) => ({
    type: action.GET_NEW_ID_FAILED,
    payload
})

// Create
export const CreateProgramReq = (payload : any) => ({
    type: action.ADD_DATA_REQ,
    payload
})

export const CreateProgramSuccess = (payload : any) => ({
    type: action.ADD_DATA_SUCCESS,
    payload
})

export const CreateProgramFailed = (payload : any) => ({
    type: action.ADD_DATA_FAILED,
    payload
})

// Edit
export const EditProgramReq = (payload : any) => ({
    type: action.EDIT_DATA_REQ,
    payload
})

export const EditProgramSuccess = (payload : any) => ({
    type: action.EDIT_DATA_SUCCESS,
    payload
})

export const EditProgramFailed = (payload : any) => ({
    type: action.EDIT_DATA_FAILED,
    payload
})

// Delete
export const DeleteProgramReq = (payload : any) => ({
    type: action.DELETE_DATA_REQ,
    payload
})

export const DeleteProgramSuccess = (payload : any) => ({
    type: action.DELETE_DATA_SUCCESS,
    payload
})

export const DeleteProgramFailed = (payload : any) => ({
    type: action.DELETE_DATA_FAILED,
    payload
})

// Bulk Delete
export const BulkDeleteProgramReq = (payload : any) => ({
    type: action.BULK_DELETE_REQ,
    payload
})

export const BulkDeleteProgramSuccess = (payload : any) => ({
    type: action.BULK_DELETE_SUCCESS,
    payload
})

export const BulkDeleteProgramFailed = (payload : any) => ({
    type: action.BULK_DELETE_FAILED,
    payload
})

// Get Category and Instructor
export const GetCateAndInstructorReq = () => ({
    type: action.GET_CAT_REQ,
})

export const GetCateAndInstructorSuccess = (payload : any) => ({
    type: action.GET_CAT_SUCCESS,
    payload
})

export const GetCateAndInstructorFailed = (payload : any) => ({
    type: action.GET_CAT_FAILED,
    payload
})

// Reset
export const ResetProgram = () => ({
    type: 'RESET_PROGRAM'
})