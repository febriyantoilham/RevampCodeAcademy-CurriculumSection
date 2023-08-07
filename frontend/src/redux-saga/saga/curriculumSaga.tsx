import { call, put } from "redux-saga/effects";
import { AddCurriculumFailed, AddCurriculumSuccess, DeleteCurriculumSuccess, EditCurriculumFailed, EditCurriculumReq, EditCurriculumSuccess, GetCatFailed, GetCatSuccess, GetCurriculumFailed, GetCurriculumSuccess, GetOneCurriculumFailed, GetOneCurriculumSuccess, SearchCurriculumFailed, SearchCurriculumSuccess } from "../action/curriculumAction";
import curriculum from "@/api/curriculum";

function* handleGetCurriculum(action: any): any {
    const { payload } = action;
    try {
        const result = yield call(curriculum.getCurriculum, payload)
        yield put(GetCurriculumSuccess(result.data))
    } catch (error) {
        yield put(GetCurriculumFailed(error))
    }
}

function* handleGetOneCurriculum(action: any): any {
    const { payload } = action;
    try {
        const result = yield call(curriculum.findOneCurriculum, payload)
        yield put(GetOneCurriculumSuccess(result.data))
    } catch (error) {
        yield put(GetOneCurriculumFailed(error))
    }
}

function* handleSearchCurriculum(action: any): any {
    const { payload } = action;
    try {
        const result = yield call(curriculum.searchCurriculum, payload)
        yield put(SearchCurriculumSuccess(result.data))
    } catch (error) {
        yield put(SearchCurriculumFailed(error))
    }
}

function* handleDeleteCurriculum(action: any): any {
    const { payload } = action;
    try {
        const result = yield call(curriculum.deleteCurriculum, payload)
        yield put(DeleteCurriculumSuccess(result))
    } catch (error) {
        yield put(SearchCurriculumFailed(error))
    }
}

function* handleCreateCurriculum(action: any): any {
    const { payload } = action
    try {
        const result = yield call(curriculum.createCurriculum, payload)
        yield put(AddCurriculumSuccess(result.data))
    } catch (error) {
        yield put(AddCurriculumFailed(error))

    }
}

function* handleEditCurriculum(action: any): any {
    const { payload } = action
    try {
        const result = yield call(curriculum.updateCurriculum, payload)
        yield put(EditCurriculumSuccess([result.data]))
    } catch (error) {
        yield put(EditCurriculumFailed(error))

    }
}

function* handleGetCategory(): any {
    try {
        const result = yield call(curriculum.getCategory)
        yield put(GetCatSuccess(result.data))
    } catch (error) {
        yield put(GetCatFailed(error))
    }
}

export {
    handleGetCurriculum,
    handleGetOneCurriculum,
    handleSearchCurriculum,
    handleDeleteCurriculum,
    handleCreateCurriculum,
    handleGetCategory,
    handleEditCurriculum,
}