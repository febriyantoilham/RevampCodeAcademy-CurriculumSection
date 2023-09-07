import userExperiences from "@/api/users/userExperiences";
import { createUserExperiencesFailed, createUserExperiencesSuccess, deleteUserExperiencesFailed, deleteUserExperiencesSuccess, editUserExperiencesFailed, editUserExperiencesSuccess } from "@/redux-saga/action/users/userExperiencesAction";
import { call, put } from "redux-saga/effects";

function* handleCreateUserExperiences(action: any): any {
    const { payload } = action;
    try {
        const result = yield call(userExperiences.createUserExperiences, payload);
        
        yield put(createUserExperiencesSuccess(result.data));
    } catch (error) {
        yield put(createUserExperiencesFailed(error));
    }
}

function* handleEditUserExperiences(action: any): any {
    const { payload } = action;
    try {
        const result = yield call(userExperiences.editUserExperiences, payload);
        
        yield put(editUserExperiencesSuccess(result.data));
    } catch (error) {
        yield put(editUserExperiencesFailed(error));
    }
}

function* handleDeleteUserExperiences(action: any): any {
    const { payload } = action;
    try {
        const result = yield call(userExperiences.deleteUserExperiences, payload);
        
        yield put(deleteUserExperiencesSuccess(result.data));
    } catch (error) {
        yield put(deleteUserExperiencesFailed(error));
    }
}

export {
    handleCreateUserExperiences,
    handleEditUserExperiences,
    handleDeleteUserExperiences,
}