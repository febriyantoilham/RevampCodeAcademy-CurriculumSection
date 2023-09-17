import * as Action from '../../constant/curriculum/sectionDetailConstant'

// Create
export const CreateSectionDetailRequest = (payload : any) => ({
    type: Action.CREATE_SECTION_DETAIL_REQUEST,
    payload
})

export const CreateSectionDetailSuccess = (payload : any) => ({
    type: Action.CREATE_SECTION_DETAIL_SUCCESS,
    payload
})

export const CreateSectionDetailFailed = (payload : any) => ({
    type: Action.CREATE_SECTION_DETAIL_FAILED,
    payload
})

// Get One
export const GetOneSectionDetailRequest = (payload : any) => ({
    type: Action.GET_ONE_SECTION_DETAIL_REQUEST,
    payload
})

export const GetOneSectionDetailSuccess = (payload : any) => ({
    type: Action.GET_ONE_SECTION_DETAIL_SUCCESS,
    payload
})

export const GetOneSectionDetailFailed = (payload : any) => ({
    type: Action.GET_ONE_SECTION_DETAIL_FAILED,
    payload
})

// Get All
export const GetAllSectionDetailRequest = (payload : any) => ({
    type: Action.GET_ALL_SECTION_DETAIL_REQUEST,
    payload
})

export const GetAllSectionDetailSuccess = (payload : any) => ({
    type: Action.GET_ALL_SECTION_DETAIL_SUCCESS,
    payload
})

export const GetAllSectionDetailFailed = (payload : any) => ({
    type: Action.GET_ALL_SECTION_DETAIL_FAILED,
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
    type: Action.DELETE_ONE_SECTION_DETAIL_REQUEST,
    payload
})

export const DeleteSectionDetailSuccess = (payload : any) => ({
    type: Action.DELETE_ONE_SECTION_DETAIL_SUCCESS,
    payload
})

export const DeleteSectionDetailFailed = (payload : any) => ({
    type: Action.DELETE_ONE_SECTION_DETAIL_FAILED,
    payload
})

// Reset
export const ResetSectionDetailState = () => ({
    type: 'RESET_SECTION_DETAIL_STATE'
})