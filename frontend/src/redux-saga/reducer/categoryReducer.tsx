import * as ActionType from '../constant/curriculumConstant';

const INIT_STATE = {
    category: [],
}

const CategoryReducer = (state = INIT_STATE, action: any) => {
    switch (action.type) {
        case ActionType.GET_CAT_REQ:
            return { ...state };
        case ActionType.GET_CAT_SUCCESS:
            return GetCategory(state, action);
        case ActionType.DELETE_BUNDLE_DATA_REQ:
            return { ...state };
        case ActionType.DELETE_BUNDLE_DATA_SUCCESS:
            return DeleteBundleCurriculum(action);
        default:
            return { ...state };
    }
}

function GetCategory(state: any, action: any) {
    return {
        ...state,
        category: action.payload.category,
        instructor: action.payload.instructor
    };
};

function DeleteBundleCurriculum(action: any) {
    const {payload} = action
    return {
        curriculum: [payload],
    };
}

export default CategoryReducer

