import { takeEvery, all, take } from "redux-saga/effects";
import * as ActionCurriculum from '../constant/curriculumConstant';
import * as ActionSection from '../constant/sectionConstant';
import * as ActionSectionDetail from  '../constant/sectionDetailConstant';
import * as ActionAuth from  '../constant/users/authConstant';
import * as ActionSignUp from  '../constant/users/signupConstant';
import * as ActionUsers from  '../constant/users/usersConstant';
import * as ActionUserEmails from  '../constant/users/userEmailsConstant';
import * as ActionUserPhones from  '../constant/users/userPhonesConstant';
import * as ActionUserAddress from  '../constant/users/userAddressConstant';
import * as ActionUserEducations from  '../constant/users/userEducationsConstant';
import * as ActionUserExperiences from  '../constant/users/userExperiencesConstant';
import * as ActionAddressType from  '../constant/master/addressTypeConstant';
import * as ActionCity from  '../constant/master/cityConstant';
import * as ActionJobType from  '../constant/master/jobTypeConstant';
import * as batch from '../constant/bootcamp/batchConstant';
import { handleCreateCurriculum, handleDeleteBundleCurriculum, handleDeleteCurriculum, handleEditCurriculum, handleGetCategoryAndEmployee, handleGetCurriculum, handleGetNewProgramId, handleGetOneCurriculum, handleSearchCurriculum } from "./curriculumSaga";
import { handleAddSection, handleDeleteSection, handleGetSection, handleUpdateSection } from "./sectionSaga";
import { handleAddSectionDetail, handleDeleteOneSectionDetail, handleGetAllSectionDetail, handleGetOneSectionDetail, handleUpdateSectionDetail } from "./sectionDetailSaga";
import { handledSignIn } from "./users/authSaga";
import { handledSignUp } from "./users/signupSaga";
import { handleUpdatePassword, handleUpdateUserPhoto, handleUpdateUsers, handledGetUserById } from "./users/usersSaga";
import { handleCreateUserEmails, handleDeleteUserEmails, handleEditUserEmails } from "./users/userEmailsSaga";
import { handleCreateUserPhones, handleDeleteUserPhones, handleEditUserPhones } from "./users/userPhonesSaga";
import { handleCreateUserAddress, handleDeleteUserAddress, handleEditUserAddress } from "./users/userAddressSaga";
import { handleGetAddressType } from "./master/addressTypeSaga";
import { getCity } from "./master/citySaga";
import { handleCreateUserEducations, handleDeleteUserEducations, handleEditUserEducations } from "./users/userEducationsSaga";
import { handleCreateUserExperiences, handleDeleteUserExperiences, handleEditUserExperiences } from "./users/userExperiencesSaga";
import { handleGetJobType } from "./master/addressTypeSaga copy";
import { bulkDelete, createBatch, getBatch, getProgram, getStatus } from "./bootcamp/batchSaga";


function* watchAll(){
    yield all([
        // Curriculum
        takeEvery(ActionCurriculum.GET_DATA_REQ, handleGetCurriculum),
        takeEvery(ActionCurriculum.SEARCH_DATA_REQ, handleSearchCurriculum),
        takeEvery(ActionCurriculum.DELETE_BUNDLE_DATA_REQ, handleDeleteBundleCurriculum),
        // Category
        takeEvery(ActionCurriculum.GET_CAT_REQ, handleGetCategoryAndEmployee),
        // Program Entity
        takeEvery(ActionCurriculum.GET_NEW_ID_REQ, handleGetNewProgramId),
        takeEvery(ActionCurriculum.GET_ONE_DATA_REQ, handleGetOneCurriculum),
        takeEvery(ActionCurriculum.DELETE_DATA_REQ, handleDeleteCurriculum),
        takeEvery(ActionCurriculum.ADD_DATA_REQ, handleCreateCurriculum),
        takeEvery(ActionCurriculum.EDIT_DATA_REQ, handleEditCurriculum),
        // Section
        takeEvery(ActionSection.GET_SECTION_REQUEST, handleGetSection),
        takeEvery(ActionSection.DELETE_SECTION_REQUEST, handleDeleteSection),
        takeEvery(ActionSection.ADD_SECTION_REQUEST, handleAddSection),
        takeEvery(ActionSection.UPDATE_SECTION_REQUEST, handleUpdateSection),
        // Section Detail
        takeEvery(ActionSectionDetail.CREATE_SECTION_DETAIL_REQUEST, handleAddSectionDetail),
        takeEvery(ActionSectionDetail.GET_ONE_SECTION_DETAIL_REQUEST, handleGetOneSectionDetail),
        takeEvery(ActionSectionDetail.GET_ALL_SECTION_DETAIL_REQUEST, handleGetAllSectionDetail),
        takeEvery(ActionSectionDetail.UPDATE_SECTION_DETAIL_REQUEST, handleUpdateSectionDetail),
        takeEvery(ActionSectionDetail.DELETE_ONE_SECTION_DETAIL_REQUEST, handleDeleteOneSectionDetail),
        // Users
        takeEvery(ActionAuth.USER_SIGNIN_REQ, handledSignIn),
        takeEvery(ActionSignUp.USER_SIGNUP_REQ, handledSignUp),
        takeEvery(ActionUsers.GET_USER_BY_ID_REQUEST, handledGetUserById),
        takeEvery(ActionUsers.UPDATE_USER_REQUEST, handleUpdateUsers),
        takeEvery(ActionUsers.UPDATE_USER_PHOTO_REQUEST, handleUpdateUserPhoto),
        takeEvery(ActionUsers.UPDATE_PASSWORD_REQUEST, handleUpdatePassword),
        // UserEmails
        takeEvery(ActionUserEmails.CREATE_USER_EMAIL_REQUEST, handleCreateUserEmails),
        takeEvery(ActionUserEmails.EDIT_USER_EMAIL_REQUEST, handleEditUserEmails),
        takeEvery(ActionUserEmails.DELETE_USER_EMAIL_REQUEST, handleDeleteUserEmails),
        takeEvery(ActionUsers.UPDATE_PASSWORD_REQUEST, handleUpdatePassword),
        // UserPhones
        takeEvery(ActionUserPhones.CREATE_USER_PHONE_REQUEST, handleCreateUserPhones),
        takeEvery(ActionUserPhones.EDIT_USER_PHONE_REQUEST, handleEditUserPhones),
        takeEvery(ActionUserPhones.DELETE_USER_PHONE_REQUEST, handleDeleteUserPhones),
        // UserAddress
        takeEvery(ActionUserAddress.CREATE_USER_ADDRESS_REQUEST, handleCreateUserAddress),
        takeEvery(ActionUserAddress.EDIT_USER_ADDRESS_REQUEST, handleEditUserAddress),
        takeEvery(ActionUserAddress.DELETE_USER_ADDRESS_REQUEST, handleDeleteUserAddress),
        // UserEducations
        takeEvery(ActionUserEducations.CREATE_USER_EDUCATIONS_REQUEST, handleCreateUserEducations),
        takeEvery(ActionUserEducations.EDIT_USER_EDUCATIONS_REQUEST, handleEditUserEducations),
        takeEvery(ActionUserEducations.DELETE_USER_EDUCATIONS_REQUEST, handleDeleteUserEducations),
        // UserPhones
        takeEvery(ActionUserExperiences.CREATE_USER_EXPERIENCES_REQUEST, handleCreateUserExperiences),
        takeEvery(ActionUserExperiences.EDIT_USER_EXPERIENCES_REQUEST, handleEditUserExperiences),
        takeEvery(ActionUserExperiences.DELETE_USER_EXPERIENCES_REQUEST, handleDeleteUserExperiences),
        // AddressType
        takeEvery(ActionAddressType.GET_ADDRESS_TYPE_REQUEST, handleGetAddressType),
        // City
        takeEvery(ActionCity.GET_CITY_REQUEST, getCity),
        // JobType
        takeEvery(ActionJobType.GET_JOB_TYPE_REQUEST, handleGetJobType),
        // Batch
        takeEvery(batch.GET_BATCH_REQ, getBatch),
        takeEvery(batch.GET_STATUS_REQ, getStatus),
        takeEvery(batch.GET_PROGRAM_REQ, getProgram),
        takeEvery(batch.BULK_DELETE_BATCH_REQ, bulkDelete),
        takeEvery(batch.CREATE_BATCH_REQ, createBatch),
    ])
}

export default watchAll