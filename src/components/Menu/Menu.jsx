import React from 'react';
import FolderIcon from '@material-ui/icons/Folder';
import FolderSharedIcon from '@material-ui/icons/FolderShared';
import FolderSpecialIcon from '@material-ui/icons/FolderSpecial';
import MapIcon from '@material-ui/icons/Map';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import MenuListItem from './MenuListItem';

const appMenuItems = [
    {
      name: "Projects",
      Icon: FolderIcon,
      items: [
        {
            name: "Maps",
            Icon: MapIcon,
            items: []
        },
        {
            name: "Shapes",
            Icon: StarBorderIcon,
            items:[]
        }
      ]
    },
    {
      name: "Shared with me",
      Icon: FolderSharedIcon,
      items: [
        {
            name: "Maps",
            Icon: MapIcon,
            items:[]
        },
        {
            name: "Shapes",
            Icon: StarBorderIcon,
            items:[]
        }
      ]
    },
    {
        name: "Favorites",
        Icon: FolderSpecialIcon,
        items: [
          {
              name: "Maps",
              Icon: MapIcon,
              items:[]
          },
          {
              name: "Shapes",
              Icon: StarBorderIcon,
              items:[]
          }
        ]
      }
  ];

const Menu = (props) => {
    return(
        <React.Fragment>
            {appMenuItems.map((item,index) => {
                return <MenuListItem {...item} key={index} handleItemClick={props.handleItemClick}/>  
            })}
        </React.Fragment>
    );
};

export default Menu;