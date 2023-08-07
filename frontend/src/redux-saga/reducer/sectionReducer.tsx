import * as ActionType from '../constant/sectionConstant';

const INIT_STATE = {
    section: [],
}

const SectionReducer = (state = INIT_STATE, action: any) => {
    switch (action.type) {
        case ActionType.GET_SECTION_REQUEST:
            return { ...state };
        case ActionType.GET_SECTION_SUCCESS:
            return GetSection(state, action);
        // case ActionType.SEARCH_SECTION_REQUEST:
        //     return { ...state };
        // case ActionType.SEARCH_SECTION_SUCCESS:
        //     return SearchSection(state, action);
        case ActionType.ADD_SECTION_REQUEST:
            return { ...state };
        case ActionType.ADD_SECTION_SUCCESS:
            return AddSection(state, action);
        // case ActionType.EDIT_SECTION_REQUEST:
        //     return { ...state };
        // case ActionType.EDIT_SECTION_SUCCESS:
        //     return EditSection(state, action);
        case ActionType.DELETE_SECTION_REQUEST:
            return { ...state };
        case ActionType.DELETE_SECTION_SUCCESS:
            return DeleteSection(action);
        default:
            return { ...state };
    }
}

function GetSection(state: any, action: any) {
    return {
        ...state,
        section: action.payload,
    };
};

function SearchSection(state: any, action: any) {
    return {
        ...state,
        section: action.payload,
    };
};


function AddSection(state: any, action: any) {
    return {
        ...state,
        section: action.payload,
    };
}

function EditSection(state: any, action: any) {
    return {
        ...state,
        section: action.payload,
    };
}

function DeleteSection(action: any) {
    const {payload} = action
    return {
        section: [payload],
    };
}

export default SectionReducer

