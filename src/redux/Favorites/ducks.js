import { takeEvery, call, put } from "redux-saga/effects";
import request from 'superagent';
import ConfigData from "ConfigData";
import endpoints from 'Util/endpoints';

const types = {
    FETCH_FAVORITES_MAPS_REQUESTED: 'FETCH_FAVORITES_MAPS_REQUESTED',
    FETCH_FAVORITES_MAPS_SUCCEEDED: 'FETCH_FAVORITES_MAPS_SUCCEEDED',
    FETCH_FAVORITES_MAPS_FAILED: 'FETCH_FAVORITES_MAPS_FAILED',
    FETCH_FAVORITES_SHAPES_REQUESTED: 'FETCH_FAVORITES_SHAPES_REQUESTED',
    FETCH_FAVORITES_SHAPES_SUCCEEDED: 'FETCH_FAVORITES_SHAPES_SUCCEEDED',
    FETCH_FAVORITES_SHAPES_FAILED: 'FETCH_FAVORITES_SHAPES_FAILED',
}

export const actions = {
    favoritesMapsFetch : (callback) => ({
        type: types.FETCH_FAVORITES_MAPS_REQUESTED,
        callback
    }),
    favoritesMapsSucceeded: (favoritesMaps) => ({
        type: types.FETCH_FAVORITES_MAPS_SUCCEEDED,
        favoritesMaps
    }),
    favoritesMapsFailed: (error) => ({
        type: types.FETCH_FAVORITES_MAPS_FAILED,
        error
    }),
    favoritesShapesFetch : (callback) => ({
        type: types.FETCH_FAVORITES_SHAPES_REQUESTED,
        callback
    }),
    favoritesShapesSucceeded: (favoritesShapes) => ({
        type: types.FETCH_FAVORITES_SHAPES_SUCCEEDED,
        favoritesShapes
    }),
    favoritesShapesFailed: (error) => ({
        type: types.FETCH_FAVORITES_SHAPES_FAILED,
        error
    }),
}

const initialState = {
    favoritesMaps: [],
    favoritesShapes: [],
    error: "",
    loading: false
};

export default function reducer(state=initialState, action){
    switch(action.type){
        case types.FETCH_FAVORITES_MAPS_REQUESTED:
        case types.FETCH_FAVORITES_SHAPES_REQUESTED:
            return {
                ...state,
               loading: true
            };
        case types.FETCH_FAVORITES_MAPS_SUCCEEDED:
            return {
                ...state,
                favoritesMaps: action.favoritesMaps,
                loading: false
            };
        case types.FETCH_FAVORITES_SHAPES_SUCCEEDED:
            return {
                ...state,
                favoritesShapes: action.favoritesShapes,
                loading: false
            };
        case types.FETCH_FAVORITES_MAPS_FAILED:
        case types.FETCH_FAVORITES_SHAPES_FAILED:
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
    yield takeEvery(types.FETCH_FAVORITES_MAPS_REQUESTED,getFavoritesMapsData);
    yield takeEvery(types.FETCH_FAVORITES_SHAPES_REQUESTED,getFavoritesShapesData);
}
 

export function* getFavoritesMapsData({ callback }){
    try{
        const response  = yield call(callFavoritesMaps);
        yield put(actions.favoritesMapsSucceeded(response.body));

        typeof callback == "function" && callback(response.body);
    }
    catch(error){
        yield put(actions.favoritesMapsFailed("Server Error"));
    } 
}

export function* getFavoritesShapesData({ callback }){
    try{
        const response  = yield call(callFavoritesShapes);
        yield put(actions.favoritesShapesSucceeded(response.body));

        typeof callback == "function" && callback(response.body);
    }
    catch(error){
        yield put(actions.favoritesShapesFailed("Server Error"));
    } 
}


function callFavoritesMaps() {
    return request.get(`${ConfigData.url}/${endpoints.MAPS}?favorite=true`);
}

function callFavoritesShapes() {
    return request.get(`${ConfigData.url}/${endpoints.SHAPES}?favorite=true`);
}
