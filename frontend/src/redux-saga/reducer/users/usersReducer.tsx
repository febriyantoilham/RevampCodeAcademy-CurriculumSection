import * as ActionType from "../../constant/users/usersConstant";
import { deleteCookie } from "cookies-next";

const INIT_STATE = {
    currentUser: null,
    response: null,
}

const usersReducer = (state = INIT_STATE, action: any) => {
    switch (action.type) {
        case ActionType.GET_USER_BY_ID_SUCCESS:
            return {
                ...state,
                currentUser: action.payload,
                response: null,
            }
        case ActionType.GET_USER_BY_ID_FAILED:
            return {
                ...state,
                currentUser: null,
                response: null,
            }
        case ActionType.UPDATE_USER_SUCCESS:
            return {
                ...state,
                currentUser: action.payload,
                response: null,
            }
        case ActionType.UPDATE_USER_FAILED:
            return {
                ...state,
                currentUser: null,
                response: null,
            }
        case ActionType.UPDATE_USER_PHOTO_SUCCESS:
            return {
                ...state,
                response: action.payload,
            }
        case ActionType.UPDATE_USER_PHOTO_FAILED:
            return {
                ...state,
                response: null,
            }
        case ActionType.UPDATE_PASSWORD_SUCCESS:
            return {
                ...state,
                response: action.payload,
            }
        case ActionType.UPDATE_PASSWORD_FAILED:
            return {
                ...state,
                response: null,
            }
        case 'RESET_USER_STATE':
            return INIT_STATE;
        default:
            return state;
    }
}

export default usersReducer;