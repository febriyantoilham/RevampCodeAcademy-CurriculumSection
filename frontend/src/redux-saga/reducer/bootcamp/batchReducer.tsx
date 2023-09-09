import * as actionType from "../../constant/bootcamp/batchConstant";

const INIT_STATE = {
    currentBatch: null,
    statusList: null,
    programList: null,
    response: null,
    instructors: null,
    candidateList: null
}

const batchReducer = (state = INIT_STATE, action: any) => {
    switch (action.type) {
        case actionType.GET_STATUS_SUCCESS:
            return {
                ...state,
                statusList: action.payload,
            }
        case actionType.GET_STATUS_FAIL:
            return {
                ...state,
                statusList: null,
            }
        case actionType.GET_PROGRAM_SUCCESS:
            return {
                ...state,
                programList: action.payload,
            }
        case actionType.GET_PROGRAM_FAIL:
            return {
                ...state,
                programList: null,
            }
        case actionType.GET_BATCH_SUCCESS:
            return {
                ...state,
                currentBatch: action.payload,
            }
        case actionType.GET_BATCH_FAIL:
            return {
                ...state,
                currentBatch: null,
            }
        case actionType.BULK_DELETE_BATCH_SUCCESS:
            return {
                ...state,
                currentBatch: null,
            }
        case actionType.BULK_DELETE_BATCH_FAIL:
            return {
                ...state,
            }
        case actionType.CREATE_BATCH_SUCCESS:
            return {
                ...state,
                response: action.payload,
            }
        case actionType.CREATE_BATCH_FAIL:
            return {
                ...state,
                response: null,
            }
        case actionType.GET_INSTRUCTOR_SUCCESS:
            return {
                ...state,
                instructors: action.payload,
            }
        case actionType.GET_INSTRUCTOR_FAIL:
            return {
                ...state,
                instructors: null,
            }
        case actionType.GET_CANDIDATE_SUCCESS:
            return {
                ...state,
                candidateList: action.payload,
            }
        case actionType.GET_CANDIDATE_FAIL:
            return {
                ...state,
                candidateList: null,
            }
        case 'RESET_BATCH':
            return INIT_STATE;
        default:
            return state;
    }
}

export default batchReducer;