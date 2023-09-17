import { combineReducers } from "redux";
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
import batchReducer from "./bootcamp/batchReducer";
import programEntityReducer from "./curriculum/programEntityReducer";
import SectionReducer from "./curriculum/sectionReducer";
import SectionDetailReducer from "./curriculum/sectionDetailReducer";

const rootReducer = combineReducers({
    // Curriculum
    programEntityState: programEntityReducer,
    sectionState: SectionReducer,
    sectionDetailReducer: SectionDetailReducer,
    // Users
    authState: authReducer,
    signupState: signUpReducer,
    usersState: usersReducer,
    userEmailsState: userEmailsReducer,
    userPhonesState: userPhonesReducer,
    userAddressState: userAddressReducer,
    userEducationsState: userEducationsReducer,
    userExperiencesState: userExperiencesReducer,
    addressTypeState: addressTypeReducer,
    // Master
    cityState: cityReducer,
    jobTypeState: JobTypeReducer,
    // Bootcamp
    batchState: batchReducer,
})

export default rootReducer