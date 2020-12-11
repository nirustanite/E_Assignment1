import { takeEvery, call, put } from "redux-saga/effects";
import request from 'superagent';
import ConfigData from "ConfigData";
import endpoints from 'Util/endpoints';

export const types = {
    GET_MAP_REQUESTED: 'GET_MAP_REQUESTED',
    GET_MAP_SUCCEEDED: 'GET_MAP_SUCCEEDED',
    GET_MAP_FAILED: 'GET_MAP_FAILED',
}

export const actions = {
    getMap : (id) => ({
        type: types.GET_MAP_REQUESTED,
        id
    }),
    getMapSucceded : (map) => ({
        type: types.GET_MAP_SUCCEEDED,
        map
    }),
    getMapFailed: (error) => ({
        type: types.GET_MAP_FAILED,
        error
    }),
}

const initialState = {
    map: {},
    error: "",
    loading: false,
};

export default function reducer(state=initialState, action){
    switch(action.type){
        case types.GET_MAP_REQUESTED:
            return {
                ...state,
               loading: true
            };
        case types.GET_MAP_SUCCEEDED:
            return {
                ...state,
                map: action.map,
                loading: false
            };
        case types.GET_MAP_FAILED:
            return {
                ...state,
                error: action.error,
                loading: false
            };
        default:
            return state;
    }
}

export function* saga(){
    yield takeEvery(types.GET_MAP_REQUESTED,getMap);
}
 

export function* getMap({id}){
    try{
        const response  = yield call(callMap, { id });
        yield put(actions.getMapSucceded(response.body));
    }
    catch(error){
        yield put(actions.getMapFailed("Server Error"));
    } 
}


function callMap({ id }) {
    return request.get(`${ConfigData.url}/${endpoints.MAPS}/${id}`);
};

