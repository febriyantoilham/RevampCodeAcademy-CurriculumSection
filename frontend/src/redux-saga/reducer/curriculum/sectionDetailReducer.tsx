import * as ActionType from '../../constant/curriculum/sectionDetailConstant';

const INIT_STATE = {
    sectionDetailList: null,
    sectionDetail: null,
    response: null,
}

const SectionDetailReducer = (state = INIT_STATE, action: any) => {
    switch (action.type) {
        // Get All Section Details
        case ActionType.GET_ALL_SECTION_DETAIL_SUCCESS:
            return {
                ...state,
                sectionDetailList: action.payload,
            }
        case ActionType.GET_ALL_SECTION_DETAIL_FAILED:
            return {
                ...state,
                sectionDetailList: null,
            }
        // Get Section Detail
        case ActionType.GET_ONE_SECTION_DETAIL_SUCCESS:
            return {
                ...state,
                sectionDetail: action.payload,
            }
        case ActionType.GET_ONE_SECTION_DETAIL_FAILED:
            return {
                ...state,
                sectionDetail: null,
            }
        // Create Section Detail
        case ActionType.CREATE_SECTION_DETAIL_SUCCESS:
            return {
                ...state,
                response: true,
            }
        case ActionType.CREATE_SECTION_DETAIL_FAILED:
            return {
                ...state,
                response: null,
            }
        // Update Section Detail
        case ActionType.UPDATE_SECTION_DETAIL_SUCCESS:
            return {
                ...state,
                response: true,
            }
        case ActionType.UPDATE_SECTION_DETAIL_FAILED:
            return {
                ...state,
                response: null,
            }
        // Delete Section Detail
        case ActionType.DELETE_ONE_SECTION_DETAIL_SUCCESS:
            return {
                ...state,
                response: true,
            }
        case ActionType.DELETE_ONE_SECTION_DETAIL_FAILED:
            return {
                ...state,
                response: null,
            }
        case 'RESET_SECTION_DETAIL_STATE':
            return INIT_STATE;
        default:
            return { ...state };
    }
}

export default SectionDetailReducer

