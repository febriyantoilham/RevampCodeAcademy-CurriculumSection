import * as ActionType from "../../constant/users/authConstant";
import { deleteCookie } from "cookies-next";

const INIT_STATE = {
    isLoggedIn: false,
    currentUser: null,
}

const authReducer = (state = INIT_STATE, action: any) => {
    switch (action.type) {
        case ActionType.USER_SIGNIN_SUCCESS:
            return {
                ...state,
                isLoggedIn: true,
                currentUser: action.payload.payload,
            }
        case ActionType.USER_SIGNIN_FAIL:
            return {
                ...state,
                isLoggedIn: false,
                currentUser: null,
            }
        case ActionType.USER_LOGOUT:
            deleteCookie('userEntityId');
            deleteCookie('access_token');
            return {
                ...state,
                isLoggedIn: false,
                currentUser: null,
            }
        case ActionType.USER_SIGNIN_SET_TOKEN:
            return {
                ...state,
                isLoggedIn: true,
                currentUser: action.payload,
            }
        default:
            return state;
    }
}

export default authReducer;