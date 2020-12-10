import React from 'react';
import FolderIcon from '@material-ui/icons/Folder';
import FolderSharedIcon from '@material-ui/icons/FolderShared';
import FolderSpecialIcon from '@material-ui/icons/FolderSpecial';
import MenuListItem from './MenuListItem';

const appMenuItems = [
    {
      name: "Projects",
      Icon: FolderIcon,
      items: [
        {
            name: "Maps",
            Icon: FolderIcon,
            items: [
                {
                    name: "Map1"
                }
            ]
        },
        {
            name: "Shapes",
            Icon: FolderIcon,
            items: [
                {
                    name: "Shape 1"
                }
            ]
        }
      ]
    },
    {
      name: "Shared with me",
      Icon: FolderSharedIcon,
      items: [
        {
            name: "Maps",
            items: [
                {
                    name: "Map1"
                }
            ]
        },
        {
            name: "Shapes",
            items: [
                {
                    name: "Map1"
                }
            ]
        }
      ]
    },
    {
        name: "Favorites",
        Icon: FolderSpecialIcon,
        items: [
          {
              name: "Maps",
              items: [
                {
                    name: "Map1"
                }
              ]
          },
          {
              name: "Shapes",
              items: [
                {
                    name: "Map1"
                }
              ]
          }
        ]
      }
  ];

const Menu = () => {
    return(
        <React.Fragment>
            {appMenuItems.map((item,index) => {
                return <MenuListItem {...item} key={index}/>  
            })}
        </React.Fragment>
    );
};

export default Menu;