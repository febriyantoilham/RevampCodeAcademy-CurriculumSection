import * as ActionType from "../../constant/users/userPhonesConstant";

const INIT_STATE = {
    currentUserPhones: null,
    response: null,
}

const userPhonesReducer = (state = INIT_STATE, action: any) => {
    switch (action.type) {
        case ActionType.CREATE_USER_PHONE_SUCCESS:
            return {
                ...state,
                currentUserPhones: action.payload,
                response: null,
            }
        case ActionType.CREATE_USER_PHONE_FAILED:
            return {
                ...state,
                currentUserPhones: null,
                response: null,
            }
        case ActionType.EDIT_USER_PHONE_SUCCESS:
            return {
                ...state,
                currentUserPhones: action.payload,
                response: null,
            }
        case ActionType.EDIT_USER_PHONE_FAILED:
            return {
                ...state,
                currentUserPhones: null,
                response: null,
            }
        case ActionType.DELETE_USER_PHONE_SUCCESS:
            return {
                ...state,
                currentUserPhones: action.payload,
                response: null,
            }
        case ActionType.DELETE_USER_PHONE_FAILED:
            return {
                ...state,
                currentUserPhones: null,
                response: null,
            }
        case 'RESET_USER_PHONE_STATE':
            return INIT_STATE;
        default:
            return state;
    }
}

export default userPhonesReducer;