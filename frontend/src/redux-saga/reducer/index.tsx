import { combineReducers } from "redux";
import CurriculumReducer from "./curriculumReducer";
import programEntityReducer from "./programEntityReducer";
import CategoryReducer from "./categoryReducer";
import SectionReducer from "./sectionReducer";
import SectionDetailReducer from "./sectionDetailReducer";
import authReducer from "./users/authReducer";
import signUpReducer from "./users/signupReducer";
import usersReducer from "./users/usersReducer";
import userEmailsReducer from "./users/userEmailsReducer";
import userPhonesReducer from "./users/userPhonesReducer";
import userAddressReducer from "./users/userAddressReducer";
import addressTypeReducer from "./master/addressTypeReducer";
import cityReducer from "./master/cityReducer";
import userEducationsReducer from "./users/userEducationsReducer";
import userExperiencesReducer from "./users/userPhonesReducer copy";
import JobTypeReducer from "./master/jobTypeReducer";

const rootReducer = combineReducers({
    curriculumState: CurriculumReducer,
    programEntityState: programEntityReducer,
    categoryCurriculumState: CategoryReducer,
    sectionState: SectionReducer,
    sectionDetailReducer: SectionDetailReducer,
    authState: authReducer,
    signupState: signUpReducer,
    usersState: usersReducer,
    userEmailsState: userEmailsReducer,
    userPhonesState: userPhonesReducer,
    userAddressState: userAddressReducer,
    userEducationsState: userEducationsReducer,
    userExperiencesState: userExperiencesReducer,
    addressTypeState: addressTypeReducer,
    cityState: cityReducer,
    jobTypeState: JobTypeReducer,
})

export default rootReducer