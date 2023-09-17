import { call, put } from "redux-saga/effects";
import curriculum from "@/api/curriculum/programEntity";
import { BulkDeleteProgramFailed, BulkDeleteProgramSuccess, CreateProgEntityIdFailed, CreateProgEntityIdSuccess, CreateProgramFailed, CreateProgramSuccess, DeleteProgramFailed, DeleteProgramSuccess, EditProgramFailed, EditProgramSuccess, GetCateAndInstructorFailed, GetCateAndInstructorSuccess, GetProgramByIdFailed, GetProgramByIdSuccess, GetProgramFailed, GetProgramSuccess } from "@/redux-saga/action/curriculum/programEntityAction";

function* GetPrograms(action: any): any {
    const { payload } = action;
    try {
        const result = yield call(curriculum.getPrograms, payload)
        yield put(GetProgramSuccess(result.data))
    } catch (error) {
        yield put(GetProgramFailed(error))
    }
}

function* GetProgramById(action: any): any {
    const { payload } = action;
    try {
        const result = yield call(curriculum.getProgramById, payload)
        yield put(GetProgramByIdSuccess(result.data))
    } catch (error) {
        yield put(GetProgramByIdFailed(error))
    }
}

function* CreateProgEntityId(): any {
    try {
        const result = yield call(curriculum.createProgEntityId)
        yield put(CreateProgEntityIdSuccess(result.data))
    } catch (error) {
        yield put(CreateProgEntityIdFailed(error))
    }
}

function* DeleteProgram(action: any): any {
    const { payload } = action;
    try {
        const result = yield call(curriculum.deleteProgram, payload)
        yield put(DeleteProgramSuccess(result.data))
    } catch (error) {
        yield put(DeleteProgramFailed(error))
    }
}

function* BulkDeletePrograms(action: any): any {
    const { payload } = action;
    try {
        const result = yield call(curriculum.bulkDeleteProgram, payload)
        yield put(BulkDeleteProgramSuccess(result))
    } catch (error) {
        yield put(BulkDeleteProgramFailed(error))
    }
}

function* CreateProgram(action: any): any {
    const { payload } = action
    try {
        const result = yield call(curriculum.createProgram, payload)
        yield put(CreateProgramSuccess(result.data))
    } catch (error) {
        yield put(CreateProgramFailed(error))

    }
}

function* EditProgram(action: any): any {
    const { payload } = action
    try {
        const result = yield call(curriculum.updateProgram, payload)
        yield put(EditProgramSuccess([result.data]))
    } catch (error) {
        yield put(EditProgramFailed(error))

    }
}

function* GetCateAndInstructor(): any {
    try {
        const result = yield call(curriculum.getCatAndEmp)
        yield put(GetCateAndInstructorSuccess(result.data))
    } catch (error) {
        yield put(GetCateAndInstructorFailed(error))
    }
}

export {
    GetPrograms,
    GetProgramById,
    CreateProgEntityId,
    DeleteProgram,
    BulkDeletePrograms,
    CreateProgram,
    EditProgram,
    GetCateAndInstructor,
}