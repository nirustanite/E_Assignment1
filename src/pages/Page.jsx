import React from "react";
import Container from '@material-ui/core/Container';
import styled from 'styled-components';
import Nav from 'Components/Nav/Nav';

const StyledContainer = styled(Container)`
    padding-top: 3em;
    padding-bottom: 3em;
`;

const Page = ({ children }) => {
    return (
        <React.Fragment>
            <Nav />
            <StyledContainer>{children}</StyledContainer>
        </React.Fragment>
    );
};

export default Page;