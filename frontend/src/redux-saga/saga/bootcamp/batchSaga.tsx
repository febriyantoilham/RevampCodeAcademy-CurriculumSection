import { bulkDeleteBatchFail, bulkDeleteBatchSuccess, getBatchFail, getBatchSuccess, getStatusFail, getStatusSuccess } from "@/redux-saga/action/bootcamp/batchAction";
import { call, put } from "redux-saga/effects";
import batch from '@/api/bootcamp/batch'

export function* getStatus(): any {
    try {
        const result = yield call(batch.getStatusList);
        yield put(getStatusSuccess(result));
    } catch (error) {
        yield put(getStatusFail(error));
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

export function* bulkDelete(action: any): any {
    const { payload } = action;
    try {
        const result = yield call(batch.bulkDelete, payload);
        yield put(bulkDeleteBatchSuccess(result));
    } catch (error) {
        yield put(bulkDeleteBatchFail(error));
    }
}