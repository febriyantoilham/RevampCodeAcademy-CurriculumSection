import * as ActionType from '../../constant/curriculum/sectionConstant';

const INIT_STATE = {
    sectionList: null,
    section: null,
    response: null,
}

const SectionReducer = (state = INIT_STATE, action: any) => {
    switch (action.type) {
        // Get All Sections
        case ActionType.GET_ALL_SECTION_SUCCESS:
            return {
                ...state,
                sectionList: action.result,
                response: null,
            }
        case ActionType.GET_ALL_SECTION_FAILED:
            return {
                ...state,
                sectionList: null,
            }
        // Get Section
        case ActionType.GET_SECTION_SUCCESS:
            return {
                ...state,
                section: action.payload,
            };
        case ActionType.GET_SECTION_FAILED:
            return {
                ...state,
                section: null,
            }
        // Create Section
        case ActionType.CREATE_SECTION_SUCCESS:
            return {
                ...state,
                response: true,
            };
        case ActionType.CREATE_SECTION_FAILED:
            return {
                ...state,
                response: null,
            }
        // Edit Section
        case ActionType.UPDATE_SECTION_SUCCESS:
            return {
                ...state,
                response: true,
            };
        case ActionType.UPDATE_SECTION_FAILED:
            return {
                ...state,
                response: null,
            }
        // Delete Section
        case ActionType.DELETE_SECTION_SUCCESS:
            return {
                ...state,
                response: action.payload,
            };
        case ActionType.DELETE_SECTION_FAILED:
            return {
                ...state,
                response: null,
            }
        case 'RESET_SECTION_STATE':
            return INIT_STATE;
        default:
            return { ...state };
    }
}

export default SectionReducer

