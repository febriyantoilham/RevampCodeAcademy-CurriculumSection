import users from "@/api/users/users";
import { userSignInFailed, userSignInSuccess } from "@/redux-saga/action/users/authAction";
import { setCookie } from "cookies-next";
import { call, put } from "redux-saga/effects";

function* handledSignIn(action: any): any {
    const { userData } = action;
    try {
        const result = yield call(users.userSignin, userData);
        console.log(`Saga Result: ${JSON.stringify(result.data)}`);
        
        const {access_token, payload} = result.data;
        console.log(`Saga token: ${JSON.stringify(access_token)}`);
        console.log(`Saga payload: ${JSON.stringify(payload)}`);

        setCookie('access_token', access_token);
        setCookie('userEntityId', payload.userEntityId);
        yield put(userSignInSuccess(result.data));
    } catch (error) {
        yield put(userSignInFailed(error));
    }
}

export {
    handledSignIn
}