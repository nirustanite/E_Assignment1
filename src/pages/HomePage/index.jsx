import React from 'react';
import Page from 'Pages/Page';
import { Typography } from '@material-ui/core';

const HomePage = () => {
    return(
        <Page>
           <Typography variant="h4" component="h4">
               Welcome to the Drive.
           </Typography>
           <Typography variant="h5" component="h5">
                    Please click on the burger menu at the top left of the screen to browse around the app
           </Typography>
        </Page>
    );
};

export default HomePage;