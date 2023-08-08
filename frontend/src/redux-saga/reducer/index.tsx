import { combineReducers } from "redux";
import { CurriculumReducer, getOneCurriculumReducer } from "./curriculumReducer";
import CategoryReducer from "./categoryReducer";
import SectionReducer from "./sectionReducer";
import SectionDetailReducer from "./sectionDetailReducer";

const rootReducer = combineReducers({
    curriculumState: CurriculumReducer,
    getOneCurriculumState: getOneCurriculumReducer,
    categoryCurriculumState: CategoryReducer,
    sectionState: SectionReducer,
    sectionDetailReducer: SectionDetailReducer,
})

export default rootReducer