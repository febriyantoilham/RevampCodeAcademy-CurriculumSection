import * as ActionType from "../../constant/master/cityConstant";

const INIT_STATE = {
    currentCities: null,
    response: null,
}

const cityReducer = (state = INIT_STATE, action: any) => {
    switch (action.type) {
        case ActionType.GET_CITY_SUCCESS:
            return {
                ...state,
                currentCities: action.payload,
                response: null,
            }
        case ActionType.GET_CITY_FAILED:
            return {
                ...state,
                currentCities: null,
                response: null,
            }
        case ActionType.EDIT_CITY_SUCCESS:
            return {
                ...state,
                currentCities: action.payload,
                response: null,
            }
        case ActionType.EDIT_CITY_FAILED:
            return {
                ...state,
                currentCities: null,
                response: null,
            }
        case ActionType.DELETE_CITY_SUCCESS:
            return {
                ...state,
                currentCities: action.payload,
                response: null,
            }
        case ActionType.DELETE_CITY_FAILED:
            return {
                ...state,
                currentCities: null,
                response: null,
            }
        case 'RESET_CITY_STATE':
            return INIT_STATE;
        default:
            return state;
    }
}

export default cityReducer;