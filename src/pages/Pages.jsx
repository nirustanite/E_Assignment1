import React from 'react';
import { Route, Switch } from 'react-router-dom';
import routes from './routes';
import ErrorBoundary from 'Util/ErrorBoundary';
import HomePage from './HomePage';
import Map from './Map';
import Shape from './Shape';



const Pages = () => {
    return(
        <ErrorBoundary>
            <Switch>
                <Route path={routes.HOME} exact component={HomePage} />
                <Route path={routes.MAP} component={Map} />
                <Route path={routes.SHAPE} component={Shape} />
            </Switch>
        </ErrorBoundary>
    );
};

export default Pages;