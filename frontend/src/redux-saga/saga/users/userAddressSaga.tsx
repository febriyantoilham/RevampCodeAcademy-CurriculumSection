import userAddress from "@/api/users/userAddress";
import { createUserAddressFailed, createUserAddressSuccess, deleteUserAddressFailed, deleteUserAddressSuccess, editUserAddressFailed, editUserAddressSuccess } from "@/redux-saga/action/users/userAddressAction";
import { call, put } from "redux-saga/effects";

function* handleCreateUserAddress(action: any): any {
    const { payload } = action;
    try {
        const result = yield call(userAddress.createUserAddress, payload);
        
        yield put(createUserAddressSuccess(result.data));
    } catch (error) {
        yield put(createUserAddressFailed(error));
    }
}

function* handleEditUserAddress(action: any): any {
    const { payload } = action;
    try {
        const result = yield call(userAddress.editUserAddress, payload);
        
        yield put(editUserAddressSuccess(result.data));
    } catch (error) {
        yield put(editUserAddressFailed(error));
    }
}

function* handleDeleteUserAddress(action: any): any {
    const { payload } = action;
    try {
        const result = yield call(userAddress.deleteUserAddress, payload);
        
        yield put(deleteUserAddressSuccess(result.data));
    } catch (error) {
        yield put(deleteUserAddressFailed(error));
    }
}

export {
    handleCreateUserAddress,
    handleEditUserAddress,
    handleDeleteUserAddress,
}