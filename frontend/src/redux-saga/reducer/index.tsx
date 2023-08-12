import { combineReducers } from "redux";
import CurriculumReducer from "./curriculumReducer";
import programEntityReducer from "./programEntity/programEntityReducer";
import CategoryReducer from "./categoryReducer";
import SectionReducer from "./sectionReducer";
import SectionDetailReducer from "./sectionDetailReducer";

const rootReducer = combineReducers({
    curriculumState: CurriculumReducer,
    programEntityState: programEntityReducer,
    categoryCurriculumState: CategoryReducer,
    sectionState: SectionReducer,
    sectionDetailReducer: SectionDetailReducer,
})

export default rootReducer