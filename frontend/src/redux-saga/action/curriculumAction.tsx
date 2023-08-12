import * as ActionCurriculum from '../constant/curriculumConstant'

// Get
export const GetCurriculumReq = (payload : any) => ({
    type: ActionCurriculum.GET_DATA_REQ,
    payload
})

export const GetCurriculumSuccess = (payload : any) => ({
    type: ActionCurriculum.GET_DATA_SUCCESS,
    payload
})

export const GetCurriculumFailed = (payload : any) => ({
    type: ActionCurriculum.GET_DATA_FAILED,
    payload
})

// Search
export const SearchCurriculumReq = (payload : any) => ({
    type: ActionCurriculum.SEARCH_DATA_REQ,
    payload
})

export const SearchCurriculumSuccess = (payload : any) => ({
    type: ActionCurriculum.SEARCH_DATA_SUCCESS,
    payload
})

export const SearchCurriculumFailed = (payload : any) => ({
    type: ActionCurriculum.SEARCH_DATA_FAILED,
    payload
})

// Get One
export const GetOneCurriculumReq = (payload : any) => ({
    type: ActionCurriculum.GET_ONE_DATA_REQ,
    payload
})

export const GetOneCurriculumSuccess = (payload : any) => ({
    type: ActionCurriculum.GET_ONE_DATA_SUCCESS,
    payload
})

export const GetOneCurriculumFailed = (payload : any) => ({
    type: ActionCurriculum.GET_ONE_DATA_FAILED,
    payload
})

// Get New Id
export const GetNewIdReq = () => ({
    type: ActionCurriculum.GET_NEW_ID_REQ,
})

export const GetNewIdSuccess = (payload : any) => ({
    type: ActionCurriculum.GET_NEW_ID_SUCCESS,
    payload
})

export const GetNewIdFailed = (payload : any) => ({
    type: ActionCurriculum.GET_NEW_ID_FAILED,
    payload
})

// Add
export const AddCurriculumReq = (payload : any) => ({
    type: ActionCurriculum.ADD_DATA_REQ,
    payload
})

export const AddCurriculumSuccess = (payload : any) => ({
    type: ActionCurriculum.ADD_DATA_SUCCESS,
    payload
})

export const AddCurriculumFailed = (payload : any) => ({
    type: ActionCurriculum.ADD_DATA_FAILED,
    payload
})

// Edit
export const EditCurriculumReq = (payload : any) => ({
    type: ActionCurriculum.EDIT_DATA_REQ,
    payload
})

export const EditCurriculumSuccess = (payload : any) => ({
    type: ActionCurriculum.EDIT_DATA_SUCCESS,
    payload
})

export const EditCurriculumFailed = (payload : any) => ({
    type: ActionCurriculum.EDIT_DATA_FAILED,
    payload
})

// Delete
export const DeleteCurriculumReq = (payload : any) => ({
    type: ActionCurriculum.DELETE_DATA_REQ,
    payload
})

export const DeleteCurriculumSuccess = (payload : any) => ({
    type: ActionCurriculum.DELETE_DATA_SUCCESS,
    payload
})

export const DeleteCurriculumFailed = (payload : any) => ({
    type: ActionCurriculum.DELETE_DATA_FAILED,
    payload
})

// Delete Bundle
export const DeleteBundleCurriculumReq = (payload : any) => ({
    type: ActionCurriculum.DELETE_BUNDLE_DATA_REQ,
    payload
})

export const DeleteBundleCurriculumSuccess = (payload : any) => ({
    type: ActionCurriculum.DELETE_BUNDLE_DATA_SUCCESS,
    payload
})

export const DeleteBundleCurriculumFailed = (payload : any) => ({
    type: ActionCurriculum.DELETE_BUNDLE_DATA_FAILED,
    payload
})

// Get Category
export const GetCatReq = (payload : any) => ({
    type: ActionCurriculum.GET_CAT_REQ,
    payload
})

export const GetCatSuccess = (payload : any) => ({
    type: ActionCurriculum.GET_CAT_SUCCESS,
    payload
})

export const GetCatFailed = (payload : any) => ({
    type: ActionCurriculum.GET_CAT_FAILED,
    payload
})

// Reset
export const ResetCurriculumState = () => ({
    type: 'RESET_CURRICULUM_STATE'
})