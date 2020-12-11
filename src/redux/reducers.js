import { combineReducers } from "redux";

import projects from './Projects';
import sharedProjects from './SharedProjects';
import favorites from './Favorites';
import maps from './Maps';
import shapes from './Shapes';


export default combineReducers({
    projects: projects.reducer,
    sharedProjects: sharedProjects.reducer,
    favorites: favorites.reducer,
    maps: maps.reducer,
    shapes: shapes.reducer
});