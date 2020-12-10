import React, { useState } from 'react';
import {useDispatch} from 'react-redux';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List'

import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Collapse from '@material-ui/core/Collapse'

import IconExpandLess from '@material-ui/icons/ExpandLess'
import IconExpandMore from '@material-ui/icons/ExpandMore'
import MenuItem from './MenuItem';

const useStyles = makeStyles(theme =>
    createStyles({
      menuItem: {
        paddingLeft: "20px",
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
  
      },
    }),
  )

const MenuListItem = (props) => {
    const { name, link, Icon, items = []} = props;
    const classes = useStyles();
    const isExpandable = items && items.length > 0;
    const [open, setOpen] = useState(false);

    function handleClick() {
        setOpen(!open)
    }

    
      const MenuItemRoot = (
        <MenuItem className={classes.menuItem} onClick={handleClick} style={{ paddingLeft: "40px"}}>
          {/* Display an icon if any */}
          {!!Icon && (
            <ListItemIcon className={classes.menuItemIcon}>
              <Icon />
            </ListItemIcon>
          )}
          <ListItemText primary={name} inset={!Icon} />
          {/* Display the expand menu if the item has children */}
          {isExpandable && !open && <IconExpandMore />}
          {isExpandable && open && <IconExpandLess />}
        </MenuItem>
      )
    
      const MenuItemChildren = isExpandable ? (
        <Collapse in={open} timeout="auto" unmountOnExit>
          <List component="div" disablePadding>
            {items.map((item, index) => {
               return <MenuListItem {...item} key={index}  />
            })}
          </List>
        </Collapse>
      ) : null

    return(
        <React.Fragment>
           {MenuItemRoot}
           {MenuItemChildren}
        </React.Fragment>
    );
};

export default MenuListItem;