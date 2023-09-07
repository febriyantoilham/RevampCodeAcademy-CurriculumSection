import * as ActionType from "../../constant/users/userExperiencesConstant";

const INIT_STATE = {
    currentUserExperiences: null,
    response: null,
}

const userExperiencesReducer = (state = INIT_STATE, action: any) => {
    switch (action.type) {
        case ActionType.CREATE_USER_EXPERIENCES_SUCCESS:
            return {
                ...state,
                currentUserExperiences: action.payload,
                response: null,
            }
        case ActionType.CREATE_USER_EXPERIENCES_FAILED:
            return {
                ...state,
                currentUserExperiences: null,
                response: null,
            }
        case ActionType.EDIT_USER_EXPERIENCES_SUCCESS:
            return {
                ...state,
                currentUserExperiences: action.payload,
                response: null,
            }
        case ActionType.EDIT_USER_EXPERIENCES_FAILED:
            return {
                ...state,
                currentUserExperiences: null,
                response: null,
            }
        case ActionType.DELETE_USER_EXPERIENCES_SUCCESS:
            return {
                ...state,
                currentUserExperiences: action.payload,
                response: null,
            }
        case ActionType.DELETE_USER_EXPERIENCES_FAILED:
            return {
                ...state,
                currentUserExperiences: null,
                response: null,
            }
        case 'RESET_USER_EXPERIENCES_STATE':
            return INIT_STATE;
        default:
            return state;
    }
}

export default userExperiencesReducer;