import React, { useState } from 'react';
import {useDispatch} from 'react-redux';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List'

import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import ListItem from '@material-ui/core/ListItem';
import Collapse from '@material-ui/core/Collapse'

import IconExpandLess from '@material-ui/icons/ExpandLess'
import IconExpandMore from '@material-ui/icons/ExpandMore'
import MenuItem from './MenuItem';
import ProjectsStore from 'Store/Projects';
import SharedProjectsStore from 'Store/SharedProjects';
import Favorites from 'Store/Favorites';
import { Link } from "react-router-dom";

const useStyles = makeStyles(theme =>
    createStyles({
      menuItem: {
        paddingLeft: "30px",
        '&.active': {
          background: 'rgba(0, 0, 0, 0.08)',
          '& .MuiListItemIcon-root': {
            color: 'rgba(0, 0, 0, 0.54)',
            display: 'inline-flex',
            minWidth: '56px',
            flexShrink: 0,
          },
        },
      },
      menuItemIcon: {
        paddingLeft: '25px',
        paddingBottom: '6px'
      },
      menuListText: {
        paddingLeft: '30%',
      },
    }),
  )

const SubMenuList = (props) => {
    const { name, Icon, items = [], category} = props;

    const classes = useStyles();
    const isExpandable = items && items.length >= 0;
    const [open, setOpen] = useState(false);

    const [maps, setMaps] = useState([]);
    const [shapes, setShapes] = useState([]);

    const dispatch = useDispatch();

    const ProjectFetch = (type) => {
        if(type === "Maps" && !open){
            dispatch(ProjectsStore.actions.projectsMapsFetch(response => {
                setMaps(response);
            }));
        }
        if(type === "Shapes" && !open){
            dispatch(ProjectsStore.actions.projectsShapesFetch(response => {
                setShapes(response);
            }));
        }
    }

    const SharedProjectsFetch = (type) => {
        if(type === "Maps" && !open){
            dispatch(SharedProjectsStore.actions.sharedProjectsMapsFetch(response => {
                setMaps(response);
            }));
        }
        if(type === "Shapes" && !open){
            dispatch(SharedProjectsStore.actions.sharedProjectsShapesFetch(response => {
                setShapes(response);
            }));
        }
    }

    const FavoritesFetch = (type) => {
        if(type === "Maps" && !open){
            dispatch(Favorites.actions.favoritesMapsFetch(response => {
                setMaps(response);
            }));
        }
        if(type === "Shapes" && !open){
            dispatch(Favorites.actions.favoritesShapesFetch(response => {
                setShapes(response);
            }));
        }
    }

    function handleClick(name) {
        if(category === "Projects"){
            ProjectFetch(name);
        }
        if(category === "Shared with me"){
            SharedProjectsFetch(name);
        }
        if(category === "Favorites"){
            FavoritesFetch(name);
        }
        setOpen(!open)
    }

    
    const MenuItemRoot = (
        <MenuItem className={classes.menuItem} onClick={() => handleClick(name)} style={{ paddingLeft: "40px"}}>
          {!!Icon && (
            <ListItemIcon className={classes.menuItemIcon}>
              <Icon />
            </ListItemIcon>
          )}
          <ListItemText primary={name} inset={!Icon} /> 
          {isExpandable && !open && <IconExpandMore />}
          {isExpandable && open && <IconExpandLess />}
        </MenuItem>
    )
    
      const MenuItemChildren = isExpandable ? (
        <Collapse in={open} timeout="auto" unmountOnExit>
        {maps && <List component="nav" className={classes.menuListText}>
            {maps && maps.map((map, i) => {
                 return <ListItem button component={Link} to={`/map/${map.id}`} onClick={props.handleItemClick} key={i}>
                            <ListItemText primary={map.name}/>
                        </ListItem>
           })}
        </List>}
        {shapes && <List component="nav" className={classes.menuListText}>
            {shapes && shapes.map((shape, i) => {
                 return <ListItem button component={Link} to={`/shape/${shape.id}`} onClick={props.handleItemClick} key={i}>
                            <ListItemText primary={shape.name}  key={i}/>
                        </ListItem>
           })}
        </List>}
      </Collapse>
      ) : null

    return(
        <React.Fragment>
           {MenuItemRoot}
           {MenuItemChildren}
        </React.Fragment>
    );
};

export default SubMenuList;