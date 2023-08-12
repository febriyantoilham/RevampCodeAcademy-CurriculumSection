import * as ActionType from '../constant/curriculumConstant';

const INIT_STATE = {
    curriculum: [],
    progEntityId: null,
}

const CurriculumReducer = (state = INIT_STATE, action: any) => {
    switch (action.type) {
        case ActionType.GET_DATA_REQ:
            return { ...state };
        case ActionType.GET_DATA_SUCCESS:
            return GetCurriculum(state, action);
        case ActionType.SEARCH_DATA_REQ:
            return { ...state };
        case ActionType.SEARCH_DATA_SUCCESS:
            return SearchCurriculum(state, action);
        default:
            return { ...state };
    }
}

function GetCurriculum(state: any, action: any) {
    return {
        ...state,
        curriculum: action.payload,
    };
};

function SearchCurriculum(state: any, action: any) {
    return {
        ...state,
        curriculum: action.payload,
    };
};

export default CurriculumReducer

