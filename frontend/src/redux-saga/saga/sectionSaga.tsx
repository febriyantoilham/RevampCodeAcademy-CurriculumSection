import { call, put } from "redux-saga/effects";
import section from "@/api/section";
import { AddSectionFailed, AddSectionSuccess, DeleteSectionSuccess, GetSectionFailed, GetSectionSuccess, UpdateSectionFailed, UpdateSectionSuccess } from "../action/sectionAction";

function* handleGetSection(action: any): any {
    const { payload } = action;
    try {
        const result = yield call(section.getSection, payload)
        yield put(GetSectionSuccess(result.data))
    } catch (error) {
        yield put(GetSectionFailed(error))
    }
}

function* handleDeleteSection(action: any): any {
    const { payload } = action;
    try {
        const result = yield call(section.deleteSection, payload)
        yield put(DeleteSectionSuccess(result))
    } catch (error) {
        yield put(GetSectionFailed(error))
    }
}

function* handleAddSection(action: any): any {
    const { payload } = action
    try {
        const result = yield call(section.createSection, payload)
        yield put(AddSectionSuccess(result.data))
    } catch (error) {
        yield put(AddSectionFailed(error))

    }
}

function* handleUpdateSection(action: any): any {
    const { payload } = action

    try {
        const result = yield call(section.updateSection, payload)
        yield put(UpdateSectionSuccess(result.data))
    } catch (error) {
        yield put(UpdateSectionFailed(error))

    }
}

// function* handleGetCategory(): any {
//     try {
//         const result = yield call(curriculum.getCategory)
//         yield put(GetCatSuccess(result.data))
//     } catch (error) {
//         yield put(GetCatFailed(error))
//     }
// }

export {
    handleGetSection,
    handleDeleteSection,
    handleAddSection,
    handleUpdateSection,
}