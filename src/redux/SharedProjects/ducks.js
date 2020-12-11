import { takeEvery, call, put } from "redux-saga/effects";
import request from 'superagent';
import ConfigData from "ConfigData";
import endpoints from 'Util/endpoints';

const types = {
    FETCH_SHARED_PROJECTS_MAPS_REQUESTED: 'FETCH_SHARED_PROJECTS_MAPS_REQUESTED',
    FETCH_SHARED_PROJECTS_MAPS_SUCCEEDED: 'FETCH_SHARED_PROJECTS_MAPS_SUCCEEDED',
    FETCH_SHARED_PROJECTS_MAPS_FAILED: 'FETCH_SHARED_PROJECTS_MAPS_FAILED',
    FETCH_SHARED_PROJECTS_SHAPES_REQUESTED: 'FETCH_SHARED_PROJECTS_SHAPES_REQUESTED',
    FETCH_SHARED_PROJECTS_SHAPES_SUCCEEDED: 'FETCH_SHARED_PROJECTS_SHAPES_SUCCEEDED',
    FETCH_SHARED_PROJECTS_SHAPES_FAILED: 'FETCH_SHARED_PROJECTS_SHAPES_FAILED',
};

export const actions = {
    sharedProjectsMapsFetch : (callback) => ({
        type: types.FETCH_SHARED_PROJECTS_MAPS_REQUESTED,
        callback
    }),
    sharedProjectsMapsSucceeded: (sharedProjectsMaps) => ({
        type: types.FETCH_SHARED_PROJECTS_MAPS_SUCCEEDED,
        sharedProjectsMaps
    }),
    sharedProjectsMapsFailed: (error) => ({
        type: types.FETCH_SHARED_PROJECTS_MAPS_FAILED,
        error
    }),
    sharedProjectsShapesFetch : (callback) => ({
        type: types.FETCH_SHARED_PROJECTS_SHAPES_REQUESTED,
        callback
    }),
    sharedProjectsShapesSucceeded: (sharedProjectsShapes) => ({
        type: types.FETCH_SHARED_PROJECTS_SHAPES_SUCCEEDED,
        sharedProjectsShapes
    }),
    sharedProjectsShapesFailed: (error) => ({
        type: types.FETCH_SHARED_PROJECTS_SHAPES_FAILED,
        error
    }),
};

const initialState = {
    sharedProjectsMaps: [],
    sharedProjectsShapes: [],
    error: "",
    loading: false
};

export default function reducer(state=initialState, action){
    switch(action.type){
        case types.FETCH_SHARED_PROJECTS_MAPS_REQUESTED:
        case types.FETCH_SHARED_PROJECTS_SHAPES_REQUESTED:
            return {
                ...state,
               loading: true
            };
        case types.FETCH_SHARED_PROJECTS_MAPS_SUCCEEDED:
            return {
                ...state,
                sharedProjectsMaps: action.sharedProjectsMaps,
                loading: false
            };
        case types.FETCH_SHARED_PROJECTS_SHAPES_SUCCEEDED:
            return {
                ...state,
                sharedProjectsShapes: action.sharedProjectsShapes,
                loading: false
            };
        case types.FETCH_SHARED_PROJECTS_MAPS_FAILED:
        case types.FETCH_SHARED_PROJECTS_SHARED_FAILED:
            return {
                ...state,
                error: action.error,
                loading: false
            };
        default:
            return state;
    };
};

export function* saga(){
    yield takeEvery(types.FETCH_SHARED_PROJECTS_MAPS_REQUESTED,getSharedProjectsMaps);
    yield takeEvery(types.FETCH_SHARED_PROJECTS_SHAPES_REQUESTED,getSharedProjectsShapes);
};
 

export function* getSharedProjectsMaps({callback}){
    try{
        const response  = yield call(callSharedProjectsMaps);
        yield put(actions.sharedProjectsMapsSucceeded(response.body));

        typeof callback == "function" && callback(response.body);
    }
    catch(error){
        yield put(actions.sharedProjectsMapsFailed("Server Error"));
    } 
};

export function* getSharedProjectsShapes({callback}){
    try{
        const response  = yield call(callSharedProjectsShapes);
        yield put(actions.sharedProjectsShapesSucceeded(response.body));

        typeof callback == "function" && callback(response.body);
    }
    catch(error){
        yield put(actions.sharedProjectsShapesFailed("Server Error"));
    } 
};

function callSharedProjectsMaps() {
    return request.get(`${ConfigData.url}/${endpoints.MAPS}?categoryId=2`);
}

function callSharedProjectsShapes() {
    return request.get(`${ConfigData.url}/${endpoints.SHAPES}?categoryId=2`);
}
