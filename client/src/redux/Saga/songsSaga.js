import {call,put,takeEvery} from 'redux-saga/effects';
import { getSongsSuccess } from '../songSlice';

function* workGetSongsFetch(){
    const songs = yield call(()=>fetch('http://localhost:3001/api/songs/getAll'))
    const formatedSongs = yield songs.json();
    yield put(getSongsSuccess(formatedSongs))
}

function* songsSaga(){
    yield takeEvery('songs/getSongsFetch',workGetSongsFetch)
}

export default songsSaga;