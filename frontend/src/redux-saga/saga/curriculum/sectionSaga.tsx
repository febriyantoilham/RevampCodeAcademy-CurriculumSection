import { call, put } from "redux-saga/effects";
import section from "@/api/curriculum/section";
import { CreateSectionFailed, CreateSectionSuccess, DeleteSectionFailed, DeleteSectionSuccess, GetAllSectionFailed, GetAllSectionSuccess, GetSectionFailed, GetSectionSuccess, UpdateSectionFailed, UpdateSectionSuccess } from "@/redux-saga/action/curriculum/sectionAction";

function* GetAllSections(action: any): any {
    const { payload } = action;
    try {
        const result = yield call(section.getAllSections, payload)
        yield put(GetAllSectionSuccess(result.data))
    } catch (error) {
        yield put(GetAllSectionFailed(error))
    }
}

function* GetSection(action: any): any {
    const { payload } = action;
    try {
        const result = yield call(section.getSection, payload)
        yield put(GetSectionSuccess(result.data))
    } catch (error) {
        yield put(GetSectionFailed(error))
    }
}

function* DeleteSection(action: any): any {
    const { payload } = action;
    try {
        const result = yield call(section.deleteSection, payload)
        yield put(DeleteSectionSuccess(result))
    } catch (error) {
        yield put(DeleteSectionFailed(error))
    }
}

function* CreateSection(action: any): any {
    const { payload } = action
    try {
        const result = yield call(section.createSection, payload)
        yield put(CreateSectionSuccess(result.data))
    } catch (error) {
        yield put(CreateSectionFailed(error))

    }
}

function* UpdateSection(action: any): any {
    const { payload } = action

    try {
        const result = yield call(section.updateSection, payload)
        yield put(UpdateSectionSuccess(result.data))
    } catch (error) {
        yield put(UpdateSectionFailed(error))

    }
}

export {
    GetAllSections,
    GetSection,
    DeleteSection,
    CreateSection,
    UpdateSection,
}