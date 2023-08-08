import { call, put } from "redux-saga/effects";
import sectionDetail from "@/api/sectionDetail";
import { GetSectionDetailSuccess, GetSectionDetailFailed, DeleteSectionDetailSuccess, AddSectionDetailSuccess, AddSectionDetailFailed, UpdateSectionDetailSuccess, UpdateSectionDetailFailed } from "../action/sectionDetailAction";

// function* handleGetSectionDetail(action: any): any {
//     const { payload } = action;
//     try {
//         const result = yield call(sectionDetail., payload)
//         yield put(GetSectionDetailSuccess(result.data))
//     } catch (error) {
//         yield put(GetSectionDetailFailed(error))
//     }
// }

// function* handleDeleteSectionDetail(action: any): any {
//     const { payload } = action;
//     try {
//         const result = yield call(sectionDetail.deleteSection, payload)
//         yield put(DeleteSectionDetailSuccess(result))
//     } catch (error) {
//         yield put(GetSectionDetailFailed(error))
//     }
// }

function* handleAddSectionDetail(action: any): any {
    const { payload } = action
    try {
        const result = yield call(sectionDetail.createSectionDetail, payload)
        yield put(AddSectionDetailSuccess(result.data))
    } catch (error) {
        yield put(AddSectionDetailFailed(error))

    }
}

// function* handleUpdateSectionDetail(action: any): any {
//     const { payload } = action

//     try {
//         const result = yield call(sectionDetail.updateSection, payload)
//         yield put(UpdateSectionDetailSuccess(result.data))
//     } catch (error) {
//         yield put(UpdateSectionDetailFailed(error))

//     }
// }

// function* handleGetCategory(): any {
//     try {
//         const result = yield call(curriculum.getCategory)
//         yield put(GetCatSuccess(result.data))
//     } catch (error) {
//         yield put(GetCatFailed(error))
//     }
// }

export {
    // handleGetSectionDetail,
    // handleDeleteSectionDetail,
    handleAddSectionDetail,
    // handleUpdateSectionDetail,
}