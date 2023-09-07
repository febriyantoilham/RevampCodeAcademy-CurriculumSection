import userEducations from "@/api/users/userEducations";
import { createUserEducationsSuccess, createUserEducationsFailed, editUserEducationsSuccess, editUserEducationsFailed, deleteUserEducationsSuccess, deleteUserEducationsFailed } from "@/redux-saga/action/users/userEducationsConstant";
import { call, put } from "redux-saga/effects";

function* handleCreateUserEducations(action: any): any {
    const { payload } = action;
    try {
        // console.log(`Saga Payload: ${payload}`);

        const result = yield call(userEducations.createUserEducations, payload);
        // console.log(`Saga Result: ${JSON.stringify(result.data)}`);
        
        yield put(createUserEducationsSuccess(result.data));
    } catch (error) {
        yield put(createUserEducationsFailed(error));
    }
}

function* handleEditUserEducations(action: any): any {
    const { payload } = action;
    try {
        const result = yield call(userEducations.editUserEducations, payload);
        
        yield put(editUserEducationsSuccess(result.data));
    } catch (error) {
        yield put(editUserEducationsFailed(error));
    }
}

function* handleDeleteUserEducations(action: any): any {
    const { payload } = action;
    try {
        const result = yield call(userEducations.deleteUserEducations, payload);
        
        yield put(deleteUserEducationsSuccess(result.data));
    } catch (error) {
        yield put(deleteUserEducationsFailed(error));
    }
}

export {
    handleCreateUserEducations,
    handleEditUserEducations,
    handleDeleteUserEducations,
}