import users from "@/api/users/users";
import { getUserByIdFailed, getUserByIdSuccess, updatePasswordFailed, updatePasswordSuccess, updateUserFailed, updateUserPhotoFailed, updateUserPhotoSuccess, updateUserSuccess } from "@/redux-saga/action/users/usersAction";
import { getCookie } from "cookies-next";
import { call, put } from "redux-saga/effects";

function* handledGetUserById(action: any): any {
    const { id } = action;
    try {
        const result = yield call(users.getUserById, id);
        
        yield put(getUserByIdSuccess(result.data));
    } catch (error) {
        yield put(getUserByIdFailed(error));
    }
}

function* handleUpdateUsers(action: any): any {
    const { payload } = action;
    try {
        const result = yield call(users.updateUsers, payload);
        
        yield put(updateUserSuccess(result.data));
    } catch (error) {
        yield put(updateUserFailed(error));
    }
}

function* handleUpdateUserPhoto(action: any): any {
    const { payload } = action;
    try {
        const result = yield call(users.updateUserPhoto, payload);
        
        yield put(updateUserPhotoSuccess(result.data));
    } catch (error) {
        yield put(updateUserPhotoFailed(error));
    }
}

function* handleUpdatePassword(action: any): any {
    const { payload } = action;
    try {
        const result = yield call(users.updatePassword, payload);
        
        yield put(updatePasswordSuccess(result));
    } catch (error) {
        yield put(updatePasswordFailed(error));
    }
}

export {
    handledGetUserById,
    handleUpdateUsers,
    handleUpdateUserPhoto,
    handleUpdatePassword,
}