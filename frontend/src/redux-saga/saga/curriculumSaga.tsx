import { call, put } from "redux-saga/effects";
import { AddCurriculumFailed, AddCurriculumSuccess, DeleteBundleCurriculumFailed, DeleteBundleCurriculumSuccess, DeleteCurriculumSuccess, EditCurriculumFailed, EditCurriculumSuccess, GetCatFailed, GetCatSuccess, GetCurriculumFailed, GetCurriculumSuccess, GetNewIdFailed, GetNewIdSuccess, GetOneCurriculumFailed, GetOneCurriculumSuccess, SearchCurriculumFailed, SearchCurriculumSuccess } from "../action/curriculumAction";
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

function* handleGetNewProgramId(): any {
    try {
        const result = yield call(curriculum.getNewProgEntityId)
        yield put(GetNewIdSuccess(result.data))
    } catch (error) {
        yield put(GetNewIdFailed(error))
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

function* handleDeleteBundleCurriculum(action: any): any {
    const { payload } = action;
    try {
        const result = yield call(curriculum.deleteBundleCurriculum, payload)
        yield put(DeleteBundleCurriculumSuccess(result))
    } catch (error) {
        yield put(DeleteBundleCurriculumFailed(error))
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

function* handleGetCategoryAndEmployee(): any {
    try {
        const result = yield call(curriculum.getCatAndEmp)
        yield put(GetCatSuccess(result.data))
    } catch (error) {
        yield put(GetCatFailed(error))
    }
}

export {
    handleGetCurriculum,
    handleGetNewProgramId,
    handleGetOneCurriculum,
    handleSearchCurriculum,
    handleDeleteCurriculum,
    handleDeleteBundleCurriculum,
    handleCreateCurriculum,
    handleGetCategoryAndEmployee,
    handleEditCurriculum,
}