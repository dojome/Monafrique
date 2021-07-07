import React from 'react'
import { useHistory } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import DashboardIcon from '@material-ui/icons/Dashboard'
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket'
import PersonIcon from '@material-ui/icons/Person'
import StorefrontIcon from '@material-ui/icons/Storefront'
import Collapse from '@material-ui/core/Collapse'
import ExpandLess from '@material-ui/icons/ExpandLess'
import ExpandMore from '@material-ui/icons/ExpandMore'
import VisibilityIcon from '@material-ui/icons/Visibility'
import AddShoppingCartSharpIcon from '@material-ui/icons/AddShoppingCartSharp'
const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  menuText: {
    color:'#b6923f',
    fontFamily: "'EBGaramond-Regular', serif",
    textTransform: 'uppercase'
  }
}))
const routes = [
  '/dashboard',
  '',
  '/dashboard/edit-my-products',
  '/dashboard/view-all-products',
  '/dashboard/upload-new-product',
  '/dashboard/view-current-orders',
  '/dashboard/update-profile-info',
]
export const MainMenu = () => {
  const classes = useStyles()
  const [selectedIndex, setSelectedIndex] = React.useState(0)
  const [open, setOpen] = React.useState(false)
  const history = useHistory()
  
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index)

    if (index === 1) {
      setOpen(!open)
    } else{
      history.push(routes[index])
    } 
  }

  return (
    <div>
      <ListItem
        selected={selectedIndex === 0}
        button
        onClick={(event) => handleListItemClick(event, 0)}
      >
        <ListItemIcon>
          <DashboardIcon className={classes.menuText} />
        </ListItemIcon>
        <ListItemText className={classes.menuText} primary="Dashboard" />
      </ListItem>
      <ListItem
        selected={selectedIndex === 1}
        button
        onClick={(event) => handleListItemClick(event, 1)}
      >
        <ListItemIcon>
          <StorefrontIcon className={classes.menuText} />
        </ListItemIcon>
        <ListItemText className={classes.menuText} primary="Products" />
        {open ? <ExpandLess /> : <ExpandMore />}
      </ListItem>
      <Collapse in={open} timeout="auto" unmountOnExit>
        <List component="div" disablePadding>
          <ListItem
            className={classes.nested}
            selected={selectedIndex === 3}
            button
            onClick={(event) => handleListItemClick(event, 3)}
          >
            <ListItemIcon>
              <VisibilityIcon className={classes.menuText} />
            </ListItemIcon>
            <ListItemText className={classes.menuText} primary="View all products" />
          </ListItem>

          <ListItem
            className={classes.nested}
            selected={selectedIndex === 4}
            button
            onClick={(event) => handleListItemClick(event, 4)}
          >
            <ListItemIcon>
              <AddShoppingCartSharpIcon className={classes.menuText} />
            </ListItemIcon>
            <ListItemText className={classes.menuText} primary="Upload a new product" />
          </ListItem>
        </List>
      </Collapse>
      <ListItem
        selected={selectedIndex === 5}
        button
        onClick={(event) => handleListItemClick(event, 5)}
      >
        <ListItemIcon>
          <ShoppingBasketIcon className={classes.menuText} />
        </ListItemIcon>
        <ListItemText className={classes.menuText} primary="View current orders" />
      </ListItem>
      <ListItem
        selected={selectedIndex === 6}
        button
        onClick={(event) => handleListItemClick(event, 6)}
      >
        <ListItemIcon>
          <PersonIcon className={classes.menuText} />
        </ListItemIcon>
        <ListItemText className={classes.menuText} primary="Update profile info" />
      </ListItem>
    </div>
  )
}
