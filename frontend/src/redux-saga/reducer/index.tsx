import { combineReducers } from "redux";
import { CurriculumReducer, getOneCurriculumReducer } from "./curriculumReducer";
import CategoryReducer from "./categoryReducer";
import SectionReducer from "./sectionReducer";

const rootReducer = combineReducers({
    curriculumState: CurriculumReducer,
    searchcurriculumState: CurriculumReducer,
    getOneCurriculumState: getOneCurriculumReducer,
    deletecurriculumState: CurriculumReducer,
    categoryCurriculumState: CategoryReducer,
    sectionState: SectionReducer,
})

export default rootReducer