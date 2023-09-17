import * as Action from '../../constant/curriculum/sectionConstant'

// Get All
export const GetAllSectionRequest = (payload : any) => ({
    type: Action.GET_ALL_SECTION_REQUEST,
    payload
})

export const GetAllSectionSuccess = (result : any) => ({
    type: Action.GET_ALL_SECTION_SUCCESS,
    result
})

export const GetAllSectionFailed = (error : any) => ({
    type: Action.GET_ALL_SECTION_FAILED,
    error
})

// Get
export const GetSectionRequest = (payload : any) => ({
    type: Action.GET_SECTION_REQUEST,
    payload
})

export const GetSectionSuccess = (result : any) => ({
    type: Action.GET_SECTION_SUCCESS,
    result
})

export const GetSectionFailed = (error : any) => ({
    type: Action.GET_SECTION_FAILED,
    error
})

// CREATE
export const CreateSectionRequest = (payload : any) => ({
    type: Action.CREATE_SECTION_REQUEST,
    payload
})

export const CreateSectionSuccess = (result : any) => ({
    type: Action.CREATE_SECTION_SUCCESS,
    result
})

export const CreateSectionFailed = (error : any) => ({
    type: Action.CREATE_SECTION_FAILED,
    error
})

// Update
export const UpdateSectionRequest = (payload : any) => ({
    type: Action.UPDATE_SECTION_REQUEST,
    payload
})

export const UpdateSectionSuccess = (payload : any) => ({
    type: Action.UPDATE_SECTION_SUCCESS,
    payload
})

export const UpdateSectionFailed = (payload : any) => ({
    type: Action.UPDATE_SECTION_FAILED,
    payload
})

// Delete
export const DeleteSectionRequest = (payload : any) => ({
    type: Action.DELETE_SECTION_REQUEST,
    payload
})

export const DeleteSectionSuccess = (payload : any) => ({
    type: Action.DELETE_SECTION_SUCCESS,
    payload
})

export const DeleteSectionFailed = (payload : any) => ({
    type: Action.DELETE_SECTION_FAILED,
    payload
})

// Reset
export const ResetSectionState = () => ({
    type: 'RESET_SECTION_STATE'
})