import React, { forwardRef } from 'react'
import ListItem from '@material-ui/core/ListItem'
import { NavLink, NavLinkProps } from 'react-router-dom'

const MenuItem = (props) => {
  const { className, onClick, link, children } = props

  if (!link || typeof link !== 'string') {
    return (
      <ListItem
        button
        className={className}
        children={children}
        onClick={onClick}
      />
    )
  }

  return (
    <ListItem
      button
      className={className}
      children={children}
    />
  )
}

export default MenuItem;
