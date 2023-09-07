import { call, put } from "redux-saga/effects";
import sectionDetail from "@/api/sectionDetail";
import { DeleteOneSectionDetailSuccess, DeleteOneSectionDetailFailed, CreateSectionDetailSuccess, CreateSectionDetailFailed, GetAllSectionDetailSuccess, GetAllSectionDetailFailed, UpdateSectionDetailSuccess, UpdateSectionDetailFailed, GetOneSectionDetailSuccess, GetOneSectionDetailFailed } from "../action/sectionDetailAction";
import { GetOneCurriculumFailed, GetOneCurriculumSuccess } from "../action/curriculumAction";

function* handleAddSectionDetail(action: any): any {
    const { payload } = action
    try {
        const result = yield call(sectionDetail.createSectionDetail, payload)
        yield put(CreateSectionDetailSuccess(result.data))
    } catch (error) {
        yield put(CreateSectionDetailFailed(error))
        
    }
}

function* handleGetOneSectionDetail(action: any): any {
    const { payload } = action;
    try {
        const result = yield call(sectionDetail.getOneSectionDetail, payload)
        yield put(GetOneSectionDetailSuccess(result.data))
    } catch (error) {
        yield put(GetOneSectionDetailFailed(error))
    }
}

function* handleGetAllSectionDetail(action: any): any {
    const { payload } = action;
    try {
        const result = yield call(sectionDetail.getAllSectionDetail, payload)
        yield put(GetAllSectionDetailSuccess(result.data))
    } catch (error) {
        yield put(GetAllSectionDetailFailed(error))
    }
}


function* handleUpdateSectionDetail(action: any): any {
    const { payload } = action

    try {
        const result = yield call(sectionDetail.updateSectionDetail, payload)
        yield put(UpdateSectionDetailSuccess(result.data))
    } catch (error) {
        yield put(UpdateSectionDetailFailed(error))

    }
}

function* handleDeleteOneSectionDetail(action: any): any {
    const { payload } = action;
    try {
        const result = yield call(sectionDetail.deleteOneSectionDetail, payload)
        yield put(DeleteOneSectionDetailSuccess(result))
    } catch (error) {
        yield put(DeleteOneSectionDetailFailed(error))
    }
}

export {
    handleDeleteOneSectionDetail, handleAddSectionDetail, handleGetOneSectionDetail, handleGetAllSectionDetail, handleUpdateSectionDetail
};