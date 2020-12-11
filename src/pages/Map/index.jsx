import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Page from 'Pages/Page';
import MapsStore from 'Store/Maps';
import MapDetail from 'Components/MapDetail/MapDetail';


const Map = () => {

    const { mapId } = useParams();

    console.log(mapId);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(MapsStore.actions.getMap(mapId));
    },[])

    return(
       <Page>
          <MapDetail />
       </Page>
    );
};


export default Map;