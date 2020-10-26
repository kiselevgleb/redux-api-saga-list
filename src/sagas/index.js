import { takeEvery, take, put, spawn, debounce, retry } from 'redux-saga/effects';
import { getListSuccess, getListFailure, getDetSuccess, getDetFailure } from '../actions/actionCreators';
import { GET_LIST_REQUEST, GET_DET_REQUEST } from '../actions/actionTypes';
import { listSkills, detSkills } from '../api/index';

function filterGetDetAction({ type, payload }) {
    return type === GET_DET_REQUEST && payload.id !== ''
}

// watcher
function* watchGetDetSaga() {
    yield debounce(100, filterGetDetAction, handleGetDetSaga);
}

// worker
function* handleGetDetSaga(action) {
    try {
        const retryCount = 3;
        const retryDelay = 1 * 1000; // ms
        const data = yield retry(retryCount, retryDelay, detSkills, action.payload.id);
        yield put(getDetSuccess(data));
    } catch (e) {
        yield put(getDetFailure(e.message));
    }
}

function* handleGetListSaga(action) {
    try {
        const retryCount = 3;
        const retryDelay = 1 * 1000; // ms
        const data = yield retry(retryCount, retryDelay, listSkills);
        yield put(getListSuccess(data));
    } catch (e) {
        yield put(getListFailure(e.message));
    }
}

// watcher
function* watchGetListSaga() {
    yield takeEvery(GET_LIST_REQUEST, handleGetListSaga);
}

export default function* saga() {
    yield spawn(watchGetDetSaga);
    yield spawn(watchGetListSaga)
}