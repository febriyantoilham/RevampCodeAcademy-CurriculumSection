import * as ActionType from "../../constant/master/jobTypeConstant";

const INIT_STATE = {
    currentJobType: null,
    response: null,
}

const JobTypeReducer = (state = INIT_STATE, action: any) => {
    switch (action.type) {
        case ActionType.GET_JOB_TYPE_SUCCESS:
            return {
                ...state,
                currentJobype: action.payload,
                response: null,
            }
        case ActionType.GET_JOB_TYPE_FAILED:
            return {
                ...state,
                currentJobype: null,
                response: null,
            }
        case ActionType.EDIT_JOB_TYPE_SUCCESS:
            return {
                ...state,
                currentJobype: action.payload,
                response: null,
            }
        case ActionType.EDIT_JOB_TYPE_FAILED:
            return {
                ...state,
                currentJobype: null,
                response: null,
            }
        case ActionType.DELETE_JOB_TYPE_SUCCESS:
            return {
                ...state,
                currentJobype: action.payload,
                response: null,
            }
        case ActionType.DELETE_JOB_TYPE_FAILED:
            return {
                ...state,
                currentJobype: null,
                response: null,
            }
        case 'RESET_JOB_TYPE_STATE':
            return INIT_STATE;
        default:
            return state;
    }
}

export default JobTypeReducer;