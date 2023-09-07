import * as ActionType from "../../constant/users/signupConstant";
import { deleteCookie } from "cookies-next";

const INIT_STATE = {
    currentUser: null,
}

const signUpReducer = (state = INIT_STATE, action: any) => {
    switch (action.type) {
        case ActionType.USER_SIGNUP_SUCCESS:
            return {
                ...state,
                currentUser: action.payload.data,
            }
        case ActionType.USER_SIGNUP_FAIL:
            return {
                ...state,
                currentUser: null,
            }
        case ActionType.USER_SIGNUP_SET_TOKEN:
            return {
                ...state,
                currentUser: action.payload,
            }
        case 'RESET_SIGNUP_STATE':
            return INIT_STATE;
        default:
            return state;
    }
}

export default signUpReducer;