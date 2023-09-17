import * as ActionType from '../../constant/curriculum/programEntityConstant'

const INIT_STATE = {
    programList: null,
    program: null,
    progEntityId: null,
    cateAndInstructor: null,
    response: null,
    result: null,
}

const programEntityReducer = (state = INIT_STATE, action: any) => {
    switch (action.type) {
        // Get All Programs
        case ActionType.GET_PROGRAMS_SUCCESS:
            return {
                ...state,
                programList: action.payload,
                program: null,
                progEntityId: null,
                response: null,
            }
        case ActionType.GET_PROGRAMS_FAILED:
            return {
                ...state,
                programList: null,
                program: null,
                progEntityId: null,
                response: null,
            }
        // Get Program By Id
        case ActionType.GET_ONE_DATA_SUCCESS:
            return {
                ...state,
                program: action.payload,
                response: null,
            }
        case ActionType.GET_ONE_DATA_FAILED:
            return {
                ...state,
                program: null,
                response: null,
            }
        // Create New ProgEntityId
        case ActionType.GET_NEW_ID_SUCCESS:
            return {
                ...state,
                progEntityId: action.payload.data,
            }
        case ActionType.GET_NEW_ID_FAILED:
            return {
                ...state,
                progEntityId: null,
            }
        // Add Programs
        case ActionType.ADD_DATA_SUCCESS:
            return {
                ...state,
                result: action.payload,
                response: true,
            }
        case ActionType.ADD_DATA_FAILED:
            return {
                ...state,
                response: null,
            }
        // Edit Programs
        case ActionType.EDIT_DATA_SUCCESS:
            return {
                ...state,
                result: action.payload,
                response: true,
            }
        case ActionType.EDIT_DATA_FAILED:
            return {
                ...state,
                response: null,
            }
        // Delete Program
        case ActionType.DELETE_DATA_SUCCESS:
            return {
                ...state,
                result: action.payload,
                response: true,
            }
        case ActionType.DELETE_DATA_FAILED:
            return {
                ...state,
                response: action.payload
            }
        // Bulk Delete Programs
        case ActionType.BULK_DELETE_SUCCESS:
            return {
                ...state,
                programList: null,
                response: action.payload
            }
        case ActionType.BULK_DELETE_FAILED:
            return {
                ...state,
                response: action.payload
            }
        // Get Category and Instructor
        case ActionType.GET_CAT_SUCCESS:
            return {
                ...state,
                cateAndInstructor: action.payload
            }
        case ActionType.GET_CAT_FAILED:
            return {
                ...state,
                cateAndInstructor: null
            }
        case 'RESET_PROGRAM':
            return INIT_STATE;
        default:
            return { ...state };
    }
}


export default programEntityReducer
