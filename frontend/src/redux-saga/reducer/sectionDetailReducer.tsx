import * as ActionType from '../constant/sectionDetailConstant';

const INIT_STATE = {
    SECTION_DETAIL_detail: [],
}

const SectionDetailReducer = (state = INIT_STATE, action: any) => {
    switch (action.type) {
        case ActionType.GET_SECTION_DETAIL_REQUEST:
            return { ...state };
        case ActionType.GET_SECTION_DETAIL_SUCCESS:
            return GetSectionDetail(state, action);
        case ActionType.ADD_SECTION_DETAIL_REQUEST:
            return { ...state };
        case ActionType.ADD_SECTION_DETAIL_SUCCESS:
            return AddSectionDetail(state, action);
        case ActionType.UPDATE_SECTION_DETAIL_REQUEST:
            return { ...state };
        case ActionType.UPDATE_SECTION_DETAIL_SUCCESS:
            return UpdateSectionDetail(state, action);
        case ActionType.DELETE_SECTION_DETAIL_REQUEST:
            return { ...state };
        case ActionType.DELETE_SECTION_DETAIL_SUCCESS:
            return DeleteSectionDetail(action);
        default:
            return { ...state };
    }
}

function GetSectionDetail(state: any, action: any) {
    return {
        ...state,
        section: action.payload,
    };
};

function AddSectionDetail(state: any, action: any) {
    return {
        ...state,
        section: action.payload,
    };
}

function UpdateSectionDetail(state: any, action: any) {
    return {
        ...state,
        section: action.payload,
    };
}

function DeleteSectionDetail(action: any) {
    const {payload} = action
    return {
        section: [payload],
    };
}

export default SectionDetailReducer
