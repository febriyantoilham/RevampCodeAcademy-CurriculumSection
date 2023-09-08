import * as actionType from "../../constant/bootcamp/batchConstant";

const INIT_STATE = {
    currentBatch: null,
    statusList: null,
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
        case 'RESET_BATCH':
            return INIT_STATE;
        default:
            return state;
    }
}

export default batchReducer;