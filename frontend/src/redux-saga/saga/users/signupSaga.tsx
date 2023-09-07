import users from "@/api/users/users";
import { userSignUpFailed, userSignUpSuccess } from "@/redux-saga/action/users/signupAction";
import { call, put } from "redux-saga/effects";

function* handledSignUp(action: any): any {
    const { userData } = action;
    try {
        const result = yield call(users.userSignUp, userData);
        console.log(`Saga Result: ${JSON.stringify(result.data)}`);
        
        yield put(userSignUpSuccess(result.data));
    } catch (error) {
        yield put(userSignUpFailed(error));
    }
}

export {
    handledSignUp
}