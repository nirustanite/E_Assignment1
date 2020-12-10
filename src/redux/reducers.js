import { combineReducers } from "redux";

import projects from './Projects';
import sharedProjects from './SharedProjects';
import favorites from './Favorites';

export default combineReducers({
    projects: projects.reducer,
    sharedProjects: sharedProjects.reducer,
    favorites: favorites.reducer
});