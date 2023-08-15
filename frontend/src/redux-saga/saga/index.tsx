import { takeEvery, all, take } from "redux-saga/effects";
import * as ActionCurriculum from '../constant/curriculumConstant';
import * as ActionSection from '../constant/sectionConstant';
import * as ActionSectionDetail from  '../constant/sectionDetailConstant';
import { handleCreateCurriculum, handleDeleteBundleCurriculum, handleDeleteCurriculum, handleEditCurriculum, handleGetCategoryAndEmployee, handleGetCurriculum, handleGetNewProgramId, handleGetOneCurriculum, handleSearchCurriculum } from "./curriculumSaga";
import { handleAddSection, handleDeleteSection, handleGetSection, handleUpdateSection } from "./sectionSaga";
import { handleAddSectionDetail, handleDeleteOneSectionDetail, handleGetAllSectionDetail, handleGetOneSectionDetail, handleUpdateSectionDetail } from "./sectionDetailSaga";


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
    ])
}

export default watchAll