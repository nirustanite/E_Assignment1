import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import Page from 'Pages/Page';
import ShapesStore from 'Store/Shapes';
import ShapeDetail from 'Components/ShapeDetail/ShapeDetail'


const Shape = () => {

    const { shapeId } = useParams();


    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(ShapesStore.actions.getShape(shapeId));
    },[])

    return(
       <Page>
           <ShapeDetail />
       </Page>
    );
};


export default Shape;