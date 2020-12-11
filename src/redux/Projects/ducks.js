import { takeEvery, call, put } from "redux-saga/effects";
import request from 'superagent';
import ConfigData from "ConfigData";
import endpoints from 'Util/endpoints';

export const types = {
    FETCH_PROJECTS_MAPS_REQUESTED: 'FETCH_PROJECTS_MAPS_REQUESTED',
    FETCH_PROJECTS_MAPS_SUCCEEDED: 'FETCH_PROJECTS_MAPS_SUCCEEDED',
    FETCH_PROJECTS_MAPS_FAILED: 'FETCH_PROJECTS_MAPS_FAILED',
    FETCH_PROJECTS_SHAPES_REQUESTED: 'FETCH_PROJECTS_SHAPES_REQUESTED',
    FETCH_PROJECTS_SHAPES_SUCCEEDED: 'FETCH_PROJECTS_SHAPES_SUCCEEDED',
    FETCH_PROJECTS_SHAPES_FAILED: 'FETCH_PROJECTS_SHAPES_FAILED',
}

export const actions = {
    projectsMapsFetch : (callback) => ({
        type: types.FETCH_PROJECTS_MAPS_REQUESTED,
        callback
    }),
    projectsShapesFetch : (callback) => ({
        type: types.FETCH_PROJECTS_SHAPES_REQUESTED,
        callback
    }),
    projectsMapsSucceeded : (maps) => ({
        type: types.FETCH_PROJECTS_MAPS_SUCCEEDED,
        maps
    }),
    projectsShapesSucceeded: (shapes) => ({
        type: types.FETCH_PROJECTS_SHAPES_SUCCEEDED,
        shapes
    }),
    projectsMapsFailed: (error) => ({
        type: types.FETCH_PROJECTS_MAPS_FAILED,
        error
    }),
    projectsShapesFailed: (error) => ({
        type: types.FETCH_PROJECTS_SHAPES_FAILED,
        error
    }),
}

const initialState = {
    projectMaps: [],
    projectShapes:[],
    error: "",
    loading: false,
};

export default function reducer(state=initialState, action){
    switch(action.type){
        case types.FETCH_PROJECTS_MAPS_REQUESTED:
        case types.FETCH_PROJECTS_SHAPES_REQUESTED:
            return {
                ...state,
               loading: true
            };
        case types.FETCH_PROJECTS_MAPS_SUCCEEDED:
            return {
                ...state,
                projectMaps: action.maps,
                loading: false
            };
        case types.FETCH_PROJECTS_MAPS_FAILED:
        case types.FETCH_PROJECTS_SHAPES_FAILED:
            return {
                ...state,
                error: action.error,
                loading: false
            };
        case types.FETCH_PROJECTS_SHAPES_SUCCEEDED:
            return {
                ...state,
                projectShapes: action.shapes,
                loading: false
            };
        default:
            return state;
    }
}

export function* saga(){
    yield takeEvery(types.FETCH_PROJECTS_MAPS_REQUESTED,getProjectsMaps);
    yield takeEvery(types.FETCH_PROJECTS_SHAPES_REQUESTED,getProjectsShapes);
}
 

export function* getProjectsMaps({callback}){
    try{
        const response  = yield call(callProjectsMaps);
        yield put(actions.projectsMapsSucceeded(response.body));
        typeof callback == "function" && callback(response.body);
    }
    catch(error){
        yield put(actions.projectsMapsFailed("Server Error"));
    } 
}

export function* getProjectsShapes({ callback }){
    try{
        const response = yield call(callProjectsShapes);
        yield put(actions.projectsShapesSucceeded(response.body));

        typeof callback == "function" && callback(response.body);
    }
    catch(error){
        yield put(actions.projectsShapesFailed("Server Error"));
    } 
}


function callProjectsMaps() {
    return request.get(`${ConfigData.url}/${endpoints.MAPS}?categoryId=1`);
}

function callProjectsShapes() {
    return request.get(`${ConfigData.url}/${endpoints.SHAPES}?categoryId=1`);
}