import React from 'react';
import { useSelector } from 'react-redux';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import styled from 'styled-components';

const MainDiv = styled.div`
    padding-top: 20px;
    display: flex;
    flex-direction: row;
`;

const SubDiv = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    padding-left: 20px;
`;

const InnerDiv = styled.div`
    display: flex;
    flex-direction: row;
`;


const ShapeDetail = () => {
    
    const shapeDetail = useSelector(state => state.shapes.shape);

    return(
        <React.Fragment>
            <CssBaseline />
                <Typography variant="h5" component="h5" >
                    Shape Details
                </Typography>
                <MainDiv >
                    <img src={shapeDetail.src}  style={{width: "300px"}}/>
                    <SubDiv>
                        <InnerDiv>
                            <Avatar alt="Remy Sharp" src={shapeDetail.avatar} />  &nbsp;
                            <p>
                               {shapeDetail.owner}
                            </p> 
                        </InnerDiv>
                        <p>
                           Name : {shapeDetail.name}
                        </p>
                        {shapeDetail.status === "Progress" ? (
                            <p>
                               Status:  &#8987; {shapeDetail.status}
                            </p>
                        ):(
                            <p>
                               Status: <span style={{ color: "green"}}> &#10003;</span> {shapeDetail.status}
                            </p>
                        )}
                        <p variant="h5" component="h5" >
                           Date : {shapeDetail.date}
                        </p>
                    </SubDiv>
                </MainDiv>
               
        </React.Fragment>
    );
};

export default ShapeDetail;