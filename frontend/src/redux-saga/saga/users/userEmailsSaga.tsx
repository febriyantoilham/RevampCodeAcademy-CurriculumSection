import userEmails from "@/api/users/userEmails";
import { createUserEmailFailed, createUserEmailSuccess, deleteUserEmailFailed, deleteUserEmailSuccess, editUserEmailFailed, editUserEmailSuccess } from "@/redux-saga/action/users/userEmailsAction";
import { call, put } from "redux-saga/effects";

function* handleCreateUserEmails(action: any): any {
    const { payload } = action;
    try {
        // console.log(`Saga Payload: ${payload}`);

        const result = yield call(userEmails.createUserEmails, payload);
        // console.log(`Saga Result: ${JSON.stringify(result.data)}`);
        
        yield put(createUserEmailSuccess(result.data));
    } catch (error) {
        yield put(createUserEmailFailed(error));
    }
}

function* handleEditUserEmails(action: any): any {
    const { payload } = action;
    try {
        const result = yield call(userEmails.editUserEmails, payload);
        
        yield put(editUserEmailSuccess(result.data));
    } catch (error) {
        yield put(editUserEmailFailed(error));
    }
}

function* handleDeleteUserEmails(action: any): any {
    const { payload } = action;
    try {
        const result = yield call(userEmails.deleteUserEmails, payload);
        
        yield put(deleteUserEmailSuccess(result.data));
    } catch (error) {
        yield put(deleteUserEmailFailed(error));
    }
}

export {
    handleCreateUserEmails,
    handleEditUserEmails,
    handleDeleteUserEmails,
}