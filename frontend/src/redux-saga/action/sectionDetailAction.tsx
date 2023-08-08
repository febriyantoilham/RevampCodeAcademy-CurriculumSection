import * as Action from '../constant/sectionDetailConstant'

// Get
export const GetSectionDetailRequest = (payload : any) => ({
    type: Action.GET_SECTION_DETAIL_REQUEST,
    payload
})

export const GetSectionDetailSuccess = (payload : any) => ({
    type: Action.GET_SECTION_DETAIL_SUCCESS,
    payload
})

export const GetSectionDetailFailed = (payload : any) => ({
    type: Action.GET_SECTION_DETAIL_FAILED,
    payload
})

// Add
export const AddSectionDetailRequest = (payload : any) => ({
    type: Action.ADD_SECTION_DETAIL_REQUEST,
    payload
})

export const AddSectionDetailSuccess = (payload : any) => ({
    type: Action.ADD_SECTION_DETAIL_SUCCESS,
    payload
})

export const AddSectionDetailFailed = (payload : any) => ({
    type: Action.ADD_SECTION_DETAIL_FAILED,
    payload
})

// Update
export const UpdateSectionDetailRequest = (payload : any) => ({
    type: Action.UPDATE_SECTION_DETAIL_REQUEST,
    payload
})

export const UpdateSectionDetailSuccess = (payload : any) => ({
    type: Action.UPDATE_SECTION_DETAIL_SUCCESS,
    payload
})

export const UpdateSectionDetailFailed = (payload : any) => ({
    type: Action.UPDATE_SECTION_DETAIL_FAILED,
    payload
})

// Delete
export const DeleteSectionDetailRequest = (payload : any) => ({
    type: Action.DELETE_SECTION_DETAIL_REQUEST,
    payload
})

export const DeleteSectionDetailSuccess = (payload : any) => ({
    type: Action.DELETE_SECTION_DETAIL_SUCCESS,
    payload
})

export const DeleteSectionDetailFailed = (payload : any) => ({
    type: Action.DELETE_SECTION_DETAIL_FAILED,
    payload
})