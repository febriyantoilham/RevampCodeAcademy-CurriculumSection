import { takeEvery, all, take } from "redux-saga/effects";
import * as ActionProgramEntity from '../constant/curriculum/programEntityConstant';
import * as ActionSection from '../constant/curriculum/sectionConstant';
import * as ActionSectionDetail from  '../constant/curriculum/sectionDetailConstant';
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
import { bulkDelete, closeBatch, createBatch, editBatch, getBatch, getBatchById, getCandidate, getInstructor, getProgram, getStatus, setRunning } from "./bootcamp/batchSaga";
import { BulkDeletePrograms, CreateProgEntityId, CreateProgram, DeleteProgram, EditProgram, GetCateAndInstructor, GetProgramById, GetPrograms } from "./curriculum/programEntitySaga";
import { CreateSection, DeleteSection, GetAllSections, GetSection, UpdateSection } from "./curriculum/sectionSaga";
import { CreateSectionDetail, DeleteOneSectionDetail, GetAllSectionDetails, GetOneSectionDetail, UpdateSectionDetail } from "./curriculum/sectionDetailSaga";


function* watchAll(){
    yield all([
        // Program Entity
        takeEvery(ActionProgramEntity.GET_CAT_REQ, GetCateAndInstructor),
        takeEvery(ActionProgramEntity.GET_PROGRAMS_REQ, GetPrograms),
        takeEvery(ActionProgramEntity.GET_ONE_DATA_REQ, GetProgramById),
        takeEvery(ActionProgramEntity.GET_NEW_ID_REQ, CreateProgEntityId),
        takeEvery(ActionProgramEntity.ADD_DATA_REQ, CreateProgram),
        takeEvery(ActionProgramEntity.BULK_DELETE_REQ, BulkDeletePrograms),
        takeEvery(ActionProgramEntity.DELETE_DATA_REQ, DeleteProgram),
        takeEvery(ActionProgramEntity.EDIT_DATA_REQ, EditProgram),
        // Section
        takeEvery(ActionSection.GET_ALL_SECTION_REQUEST, GetAllSections),
        takeEvery(ActionSection.GET_SECTION_REQUEST, GetSection),
        takeEvery(ActionSection.DELETE_SECTION_REQUEST, DeleteSection),
        takeEvery(ActionSection.CREATE_SECTION_REQUEST, CreateSection),
        takeEvery(ActionSection.UPDATE_SECTION_REQUEST, UpdateSection),
        // Section Detail
        takeEvery(ActionSectionDetail.CREATE_SECTION_DETAIL_REQUEST, CreateSectionDetail),
        takeEvery(ActionSectionDetail.GET_ONE_SECTION_DETAIL_REQUEST, GetOneSectionDetail),
        takeEvery(ActionSectionDetail.GET_ALL_SECTION_DETAIL_REQUEST, GetAllSectionDetails),
        takeEvery(ActionSectionDetail.UPDATE_SECTION_DETAIL_REQUEST, UpdateSectionDetail),
        takeEvery(ActionSectionDetail.DELETE_ONE_SECTION_DETAIL_REQUEST, DeleteOneSectionDetail),
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
        takeEvery(batch.GET_BATCH_BY_ID_REQ, getBatchById),
        takeEvery(batch.GET_STATUS_REQ, getStatus),
        takeEvery(batch.GET_INSTRUCTOR_REQ, getInstructor),
        takeEvery(batch.GET_PROGRAM_REQ, getProgram),
        takeEvery(batch.BULK_DELETE_BATCH_REQ, bulkDelete),
        takeEvery(batch.CREATE_BATCH_REQ, createBatch),
        takeEvery(batch.EDIT_BATCH_REQ, editBatch),
        takeEvery(batch.CLOSE_BATCH_REQ, closeBatch),
        takeEvery(batch.RUNNING_BATCH_REQ, setRunning),
        takeEvery(batch.GET_CANDIDATE_REQ, getCandidate),
    ])
}

export default watchAll