import jobType from "@/api/master/jobType";
import { getJobTypeFailed, getJobTypeSuccess } from "@/redux-saga/action/master/jobTypeAction";
import { call, put } from "redux-saga/effects";

function* handleGetJobType(): any {
    try {
        const result = yield call(jobType.getJobType);
        
        yield put(getJobTypeSuccess(result));
    } catch (error) {
        yield put(getJobTypeFailed(error));
    }
}

export {
    handleGetJobType,
}