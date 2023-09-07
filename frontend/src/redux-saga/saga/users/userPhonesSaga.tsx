import userPhones from "@/api/users/userPhones";
import { createUserPhoneFailed, createUserPhoneSuccess, deleteUserPhoneFailed, deleteUserPhoneSuccess, editUserPhoneFailed, editUserPhoneSuccess } from "@/redux-saga/action/users/userPhonesAction";
import { call, put } from "redux-saga/effects";

function* handleCreateUserPhones(action: any): any {
    const { payload } = action;
    try {
        const result = yield call(userPhones.createUserPhones, payload);
        
        yield put(createUserPhoneSuccess(result.data));
    } catch (error) {
        yield put(createUserPhoneFailed(error));
    }
}

function* handleEditUserPhones(action: any): any {
    const { payload } = action;
    try {
        const result = yield call(userPhones.editUserPhones, payload);
        
        yield put(editUserPhoneSuccess(result.data));
    } catch (error) {
        yield put(editUserPhoneFailed(error));
    }
}

function* handleDeleteUserPhones(action: any): any {
    const { payload } = action;
    try {
        const result = yield call(userPhones.deleteUserPhones, payload);
        
        yield put(deleteUserPhoneSuccess(result.data));
    } catch (error) {
        yield put(deleteUserPhoneFailed(error));
    }
}

export {
    handleCreateUserPhones,
    handleEditUserPhones,
    handleDeleteUserPhones,
}