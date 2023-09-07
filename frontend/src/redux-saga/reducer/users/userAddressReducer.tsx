import * as ActionType from "../../constant/users/userAddressConstant";

const INIT_STATE = {
    currentUserAddress: null,
    response: null,
}

const userAddressReducer = (state = INIT_STATE, action: any) => {
    switch (action.type) {
        case ActionType.CREATE_USER_ADDRESS_SUCCESS:
            return {
                ...state,
                currentUserAddress: action.payload,
                response: null,
            }
        case ActionType.CREATE_USER_ADDRESS_FAILED:
            return {
                ...state,
                currentUserAddress: null,
                response: null,
            }
        case ActionType.EDIT_USER_ADDRESS_SUCCESS:
            return {
                ...state,
                currentUserAddress: action.payload,
                response: null,
            }
        case ActionType.EDIT_USER_ADDRESS_FAILED:
            return {
                ...state,
                currentUserAddress: null,
                response: null,
            }
        case ActionType.DELETE_USER_ADDRESS_SUCCESS:
            return {
                ...state,
                currentUserAddress: action.payload,
                response: null,
            }
        case ActionType.DELETE_USER_ADDRESS_FAILED:
            return {
                ...state,
                currentUserAddress: null,
                response: null,
            }
        case 'RESET_USER_ADDRESS_STATE':
            return INIT_STATE;
        default:
            return state;
    }
}

export default userAddressReducer;