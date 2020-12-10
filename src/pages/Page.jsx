import React from "react";
import Container from '@material-ui/core/Container';
import styled from 'styled-components';
import Nav from 'Components/Nav/Nav';

const StyledContainer = styled(Container)`
    padding-top: 5em;
    padding-bottom: 5em;

    @media screen and (max-width: 600px)  {
        padding-top: 70%;
    }
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