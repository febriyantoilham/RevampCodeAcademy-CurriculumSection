import { call, put } from "redux-saga/effects";
import sectionDetail from "@/api/curriculum/sectionDetail";
import { CreateSectionDetailFailed, CreateSectionDetailSuccess, DeleteSectionDetailFailed, DeleteSectionDetailSuccess, GetAllSectionDetailFailed, GetAllSectionDetailSuccess, GetOneSectionDetailFailed, GetOneSectionDetailSuccess, UpdateSectionDetailFailed, UpdateSectionDetailSuccess } from "@/redux-saga/action/curriculum/sectionDetailAction";

function* GetAllSectionDetails(action: any): any {
    const { payload } = action;
    try {
        const result = yield call(sectionDetail.getAllSectionDetail, payload)
        yield put(GetAllSectionDetailSuccess(result.data))
    } catch (error) {
        yield put(GetAllSectionDetailFailed(error))
    }
}

function* GetOneSectionDetail(action: any): any {
    const { payload } = action;
    try {
        const result = yield call(sectionDetail.getOneSectionDetail, payload)
        yield put(GetOneSectionDetailSuccess(result.data))
    } catch (error) {
        yield put(GetOneSectionDetailFailed(error))
    }
}

function* CreateSectionDetail(action: any): any {
    const { payload } = action
    try {
        const result = yield call(sectionDetail.createSectionDetail, payload)
        yield put(CreateSectionDetailSuccess(result.data))
    } catch (error) {
        yield put(CreateSectionDetailFailed(error))
        
    }
}

function* UpdateSectionDetail(action: any): any {
    const { payload } = action

    try {
        const result = yield call(sectionDetail.updateSectionDetail, payload)
        yield put(UpdateSectionDetailSuccess(result.data))
    } catch (error) {
        yield put(UpdateSectionDetailFailed(error))

    }
}

function* DeleteOneSectionDetail(action: any): any {
    const { payload } = action;
    try {
        const result = yield call(sectionDetail.deleteOneSectionDetail, payload)
        yield put(DeleteSectionDetailSuccess(result))
    } catch (error) {
        yield put(DeleteSectionDetailFailed(error))
    }
}

export {
    DeleteOneSectionDetail, CreateSectionDetail, GetOneSectionDetail, GetAllSectionDetails, UpdateSectionDetail
};