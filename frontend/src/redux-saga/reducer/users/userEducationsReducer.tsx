import * as ActionType from "../../constant/users/userEducationsConstant";

const INIT_STATE = {
    currentUserEducations: null,
    response: null,
}

const userEducationsReducer = (state = INIT_STATE, action: any) => {
    switch (action.type) {
        case ActionType.CREATE_USER_EDUCATIONS_SUCCESS:
            return {
                ...state,
                currentUserEducations: action.payload,
                response: null,
            }
        case ActionType.CREATE_USER_EDUCATIONS_FAILED:
            return {
                ...state,
                currentUserEducations: null,
                response: null,
            }
        case ActionType.EDIT_USER_EDUCATIONS_SUCCESS:
            return {
                ...state,
                currentUserEducations: action.payload,
                response: null,
            }
        case ActionType.EDIT_USER_EDUCATIONS_FAILED:
            return {
                ...state,
                currentUserEducations: null,
                response: null,
            }
        case ActionType.DELETE_USER_EDUCATIONS_SUCCESS:
            return {
                ...state,
                currentUserEducations: action.payload,
                response: null,
            }
        case ActionType.DELETE_USER_EDUCATIONS_FAILED:
            return {
                ...state,
                currentUserEducations: null,
                response: null,
            }
        case 'RESET_USER_EMAILS_STATE':
            return INIT_STATE;
        default:
            return state;
    }
}

export default userEducationsReducer;