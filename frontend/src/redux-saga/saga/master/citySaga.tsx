import city from "@/api/master/city";
import { getcityFailed, getcitySuccess } from "@/redux-saga/action/master/cityAction";
import { call, put } from "redux-saga/effects";

function* getCity(): any {
    try {
        const result = yield call(city.getCity);
        
        yield put(getcitySuccess(result));
    } catch (error) {
        yield put(getcityFailed(error));
    }
}

export {
    getCity,
}