import { takeEvery, call, put } from "redux-saga/effects";
import request from 'superagent';
import ConfigData from "ConfigData";
import endpoints from 'Util/endpoints';

export const types = {
    GET_SHAPE_REQUESTED: 'GET_SHAPE_REQUESTED',
    GET_SHAPE_SUCCEEDED: 'GET_SHAPE_SUCCEEDED',
    GET_SHAPE_FAILED: 'GET_SHAPE_FAILED',
}

export const actions = {
    getShape : (id) => ({
        type: types.GET_SHAPE_REQUESTED,
        id
    }),
    getShapeSucceded : (shape) => ({
        type: types.GET_SHAPE_SUCCEEDED,
        shape
    }),
    getShapeFailed: (error) => ({
        type: types.GET_SHAPE_FAILED,
        error
    }),
}

const initialState = {
    shape: {},
    error: "",
    loading: false,
};

export default function reducer(state=initialState, action){
    switch(action.type){
        case types.GET_SHAPE_REQUESTED:
            return {
                ...state,
               loading: true
            };
        case types.GET_SHAPE_SUCCEEDED:
            return {
                ...state,
                shape: action.shape,
                loading: false
            };
        case types.GET_SHAPE_FAILED:
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
    yield takeEvery(types.GET_SHAPE_REQUESTED,getShape);
}
 

export function* getShape({id}){
    try{
        const response  = yield call(callShape, { id });
        yield put(actions.getShapeSucceded(response.body));
    }
    catch(error){
        yield put(actions.getShapeFailed("Server Error"));
    } 
}


function callShape({ id }) {
    return request.get(`${ConfigData.url}/${endpoints.SHAPES}/${id}`);
};

