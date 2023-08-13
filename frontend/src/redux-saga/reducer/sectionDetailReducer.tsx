import * as ActionType from '../constant/sectionDetailConstant';

const INIT_STATE = {
    SECTION_DETAIL_detail: [],
}

const SectionDetailReducer = (state = INIT_STATE, action: any) => {
    switch (action.type) {
        case ActionType.GET_ONE_SECTION_DETAIL_REQUEST:
            return { ...state };
        case ActionType.GET_ONE_SECTION_DETAIL_SUCCESS:
            return GetOneSectionDetail(state, action);
        case ActionType.GET_ALL_SECTION_DETAIL_REQUEST:
            return { ...state };
        case ActionType.GET_ALL_SECTION_DETAIL_SUCCESS:
            return GetAllSectionDetail(state, action);
        case ActionType.CREATE_SECTION_DETAIL_REQUEST:
            return { ...state };
        case ActionType.CREATE_SECTION_DETAIL_SUCCESS:
            return AddSectionDetail(state, action);
        case ActionType.UPDATE_SECTION_DETAIL_REQUEST:
            return { ...state };
        case ActionType.UPDATE_SECTION_DETAIL_SUCCESS:
            return UpdateSectionDetail(state, action);
        case ActionType.DELETE_ONE_SECTION_DETAIL_REQUEST:
            return { ...state };
        case ActionType.DELETE_ONE_SECTION_DETAIL_SUCCESS:
            return DeleteOneSectionDetail(action);
        default:
            return { ...state };
    }
}

function GetOneSectionDetail(state: any, action: any) {
    return {
        ...state,
        section: action.payload,
    };
};

function GetAllSectionDetail(state: any, action: any) {
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

function DeleteOneSectionDetail(action: any) {
    const {payload} = action
    return {
        section: [payload],
    };
}

export default SectionDetailReducer

