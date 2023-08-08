import * as Action from '../constant/sectionConstant'

// Get
export const GetSectionRequest = (payload : any) => ({
    type: Action.GET_SECTION_REQUEST,
    payload
})

export const GetSectionSuccess = (payload : any) => ({
    type: Action.GET_SECTION_SUCCESS,
    payload
})

export const GetSectionFailed = (payload : any) => ({
    type: Action.GET_SECTION_FAILED,
    payload
})

// Add
export const AddSectionRequest = (payload : any) => ({
    type: Action.ADD_SECTION_REQUEST,
    payload
})

export const AddSectionSuccess = (payload : any) => ({
    type: Action.ADD_SECTION_SUCCESS,
    payload
})

export const AddSectionFailed = (payload : any) => ({
    type: Action.ADD_SECTION_FAILED,
    payload
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