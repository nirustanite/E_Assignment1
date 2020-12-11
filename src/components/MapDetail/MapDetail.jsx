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




const MapDetail = () => {
    
    const mapDetail = useSelector(state => state.maps.map);

    return(
        <React.Fragment>
            <CssBaseline />
                <Typography variant="h5" component="h5" >
                    Map Details
                </Typography>
                <MainDiv >
                    <img src={mapDetail.src}  style={{width: "300px"}}/>
                    <SubDiv>
                        <InnerDiv>
                            <Avatar alt="Remy Sharp" src={mapDetail.avatar} />  &nbsp;
                            <p>
                               {mapDetail.owner}
                            </p> 
                        </InnerDiv>
                        <p>
                           Name : {mapDetail.name}
                        </p>
                        {mapDetail.status === "Progress" ? (
                            <p>
                               Status:  &#8987; {mapDetail.status}
                            </p>
                        ):(
                            <p>
                               Status: <span style={{ color: "green"}}> &#10003;</span> {mapDetail.status}
                            </p>
                        )}
                        <p variant="h5" component="h5" >
                           Date : {mapDetail.date}
                        </p>
                    </SubDiv>
                </MainDiv>
               
        </React.Fragment>
    );
};

export default MapDetail;