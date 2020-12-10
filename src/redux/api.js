import request from 'superagent';
import ConfigData from "ConfigData";
import endpoints from 'Util/endpoints';

const api = {
    callProjects: () => {
        return request.get(`${ConfigData.url}/${endpoints.MAPS}?categoryId=1`);
    },
    callSharedProjects: () => {
        return request.get(`${ConfigData.url}/${endpoints.SHARED_PROJECTS}`);
    },
    callFavorites: () => {
        return request.get(`${ConfigData.url}/${endpoints.FAVORITES}`);
    },
}

export default api;