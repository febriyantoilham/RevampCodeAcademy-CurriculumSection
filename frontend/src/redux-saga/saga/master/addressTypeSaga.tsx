import addressType from "@/api/master/addressType";
import { getAddressTypeFailed, getAddressTypeSuccess } from "@/redux-saga/action/master/addressTypeAction";
import { call, put } from "redux-saga/effects";

function* handleGetAddressType(): any {
    try {
        const result = yield call(addressType.getAddressType);
        
        yield put(getAddressTypeSuccess(result));
    } catch (error) {
        yield put(getAddressTypeFailed(error));
    }
}

export {
    handleGetAddressType,
}