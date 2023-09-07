import * as ActionType from "../../constant/users/userEmailsConstant";

const INIT_STATE = {
    currentUserEmails: null,
    response: null,
}

const userEmailsReducer = (state = INIT_STATE, action: any) => {
    switch (action.type) {
        case ActionType.CREATE_USER_EMAIL_SUCCESS:
            return {
                ...state,
                currentUserEmails: action.payload,
                response: null,
            }
        case ActionType.CREATE_USER_EMAIL_FAILED:
            return {
                ...state,
                currentUserEmails: null,
                response: null,
            }
        case ActionType.EDIT_USER_EMAIL_SUCCESS:
            return {
                ...state,
                currentUserEmails: action.payload,
                response: null,
            }
        case ActionType.EDIT_USER_EMAIL_FAILED:
            return {
                ...state,
                currentUserEmails: null,
                response: null,
            }
        case ActionType.DELETE_USER_EMAIL_SUCCESS:
            return {
                ...state,
                currentUserEmails: action.payload,
                response: null,
            }
        case ActionType.DELETE_USER_EMAIL_FAILED:
            return {
                ...state,
                currentUserEmails: null,
                response: null,
            }
        case 'RESET_USER_EMAILS_STATE':
            return INIT_STATE;
        default:
            return state;
    }
}

export default userEmailsReducer;