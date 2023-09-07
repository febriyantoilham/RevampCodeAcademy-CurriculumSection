import * as ActionType from "../../constant/master/addressTypeConstant";

const INIT_STATE = {
    currentAddressType: null,
    response: null,
}

const addressTypeReducer = (state = INIT_STATE, action: any) => {
    switch (action.type) {
        case ActionType.GET_ADDRESS_TYPE_SUCCESS:
            return {
                ...state,
                currentAddressType: action.payload,
                response: null,
            }
        case ActionType.GET_ADDRESS_TYPE_FAILED:
            return {
                ...state,
                currentAddressType: null,
                response: null,
            }
        case ActionType.EDIT_ADDRESS_TYPE_SUCCESS:
            return {
                ...state,
                currentAddressType: action.payload,
                response: null,
            }
        case ActionType.EDIT_ADDRESS_TYPE_FAILED:
            return {
                ...state,
                currentAddressType: null,
                response: null,
            }
        case ActionType.DELETE_ADDRESS_TYPE_SUCCESS:
            return {
                ...state,
                currentAddressType: action.payload,
                response: null,
            }
        case ActionType.DELETE_ADDRESS_TYPE_FAILED:
            return {
                ...state,
                currentAddressType: null,
                response: null,
            }
        case 'RESET_ADDRESS_TYPE_STATE':
            return INIT_STATE;
        default:
            return state;
    }
}

export default addressTypeReducer;