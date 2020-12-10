import React, { useState } from 'react';
import { makeStyles } from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";
import Toolbar from "@material-ui/core/Toolbar";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import AppBar from "@material-ui/core/AppBar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";
import List from "@material-ui/core/List";
import ListItem from '@material-ui/core/ListItem';
import ListItemText from "@material-ui/core/ListItemText";
import Divider from '@material-ui/core/Divider';
import { Link } from "react-router-dom";
import Menu from '../Menu/Menu';


const useStyles = makeStyles((theme) => ({
    appBar: {
        background: theme.palette.primary.dark,
        backgroundColor: "#0D2E4C",
        zIndex: theme.zIndex.drawer + 1
    },
    toolbar: theme.mixins.toolbar,
    toolbarIcon: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: '0 8px',
        ...theme.mixins.toolbar,
    },
    toolbarMargin: theme.mixins.toolbar,
    title: {
        flexGrow: 1,
        textDecoration: "none",
        margin: "auto",
        "&:hover": {
            textShadow: "0px 1px 3px #000"
        }
    },
    drawer: {
        zIndex: "0 !important",
    },
    drawerPaper: {
        width: 300
    },
    content: {
        flexGrow: 1,
        height: "100vh",
        overflow: "auto"
    },
    container: {
        paddingTop: theme.spacing(4),
        paddingBottom: theme.spacing(4)
    }
}));


const Nav = () => {

    const classes = useStyles();

    const [drawerOpen, setDrawerOpen] = useState(false);

    const handleDrawerOpen = () => {
      setDrawerOpen(true);
    };
    const handleDrawerClose = () => {
      setDrawerOpen(false);
    };

    const handleDrawer = () => {
        setDrawerOpen(!drawerOpen);
    };

    const handleItemClick = () => {
        setDrawerOpen(!drawerOpen);
    }
    return(
       <React.Fragment> 
            <CssBaseline />
            <AppBar 
                position="sticky" 
                className={classes.appBar} 
            > 
                <Toolbar className={classes.toolbar}>
                    <IconButton 
                        color="inherit"
                        aria-label={drawerOpen ? "Close Menu" : "Open Menu"}
                        onClick={handleDrawer}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h5" className={classes.title}>
                        Ellipsis Drive
                    </Typography>
                </Toolbar>
            </AppBar>
            <SwipeableDrawer
                className={classes.drawer}
                classes={{ paper: classes.drawerPaper }}
                open={drawerOpen}
                onClose={handleDrawerClose}
                onOpen={handleDrawerOpen}
            >
                <div className={classes.toolbarMargin} />
                <List component="nav">
                    <ListItem button component={Link} to="/" onClick={handleItemClick}>
                        <ListItemText>Home</ListItemText>
                     </ListItem>
                    
                </List>
                <Divider />
                <List component="nav">
                    <Menu />
                </List>
            </SwipeableDrawer>
       </React.Fragment>
  
    );
};

export default Nav;