import { bulkDeleteBatchFail, bulkDeleteBatchSuccess, closeBatchFail, closeBatchSuccess, createBatchFail, createBatchSuccess, editBatchFail, editBatchSuccess, getBatchByIdFail, getBatchByIdSuccess, getBatchFail, getBatchSuccess, getCandidateFail, getCandidateSuccess, getInstructorsFail, getInstructorsSuccess, getProgramFail, getProgramSuccess, getStatusFail, getStatusSuccess, setRunningFail, setRunningSuccess } from "@/redux-saga/action/bootcamp/batchAction";
import { call, put } from "redux-saga/effects";
import batch from '@/api/bootcamp/batch'
import instructorPrograms from "@/api/bootcamp/instructorPrograms";

export function* getStatus(): any {
    try {
        const result = yield call(batch.getStatusList);
        yield put(getStatusSuccess(result));
    } catch (error) {
        yield put(getStatusFail(error));
    }
}

export function* getInstructor(): any {
    try {
        const result = yield call(instructorPrograms.getInstructorList);
        yield put(getInstructorsSuccess(result));
    } catch (error) {
        yield put(getInstructorsFail(error));
    }
}

export function* getProgram(): any {
    try {
        const result = yield call(batch.getProgramList);
        yield put(getProgramSuccess(result));
    } catch (error) {
        yield put(getProgramFail(error));
    }
}

export function* getCandidate(): any {
    try {
        const result = yield call(batch.getCandidateList);
        yield put(getCandidateSuccess(result));
    } catch (error) {
        yield put(getCandidateFail(error));
    }
}

export function* getBatch(action: any): any {
    const { payload } = action;
    try {
        const result = yield call(batch.getBatch, payload);
        yield put(getBatchSuccess(result.data));
    } catch (error) {
        yield put(getBatchFail(error));
    }
}

export function* getBatchById(action: any): any {
    const { payload } = action;
    try {
        const result = yield call(batch.getBatchById, payload);
        yield put(getBatchByIdSuccess(result.data));
    } catch (error) {
        yield put(getBatchByIdFail(error));
    }
}

export function* bulkDelete(action: any): any {
    const { payload } = action;
    try {
        const result = yield call(batch.bulkDelete, payload);
        yield put(bulkDeleteBatchSuccess(result));
    } catch (error) {
        yield put(bulkDeleteBatchFail(error));
    }
}

export function* createBatch(action: any): any {
    const { payload } = action;
    try {
        const result = yield call(batch.createBatch, payload);
        yield put(createBatchSuccess(result));
    } catch (error) {
        yield put(createBatchFail(error));
    }
}

export function* editBatch(action: any): any {
    const { payload } = action;
    try {
        const result = yield call(batch.editBatch, payload);
        yield put(editBatchSuccess(result));
    } catch (error) {
        yield put(editBatchFail(error));
    }
}

export function* closeBatch(action: any): any {
    const { payload } = action;
    try {
        const result = yield call(batch.closeBatch, payload);
        yield put(closeBatchSuccess(result));
    } catch (error) {
        yield put(closeBatchFail(error));
    }
}

export function* setRunning(action: any): any {
    const { payload } = action;
    try {
        const result = yield call(batch.setRunning, payload);
        yield put(setRunningSuccess(result));
    } catch (error) {
        yield put(setRunningFail(error));
    }
}