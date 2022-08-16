import AppBar from '@material-ui/core/AppBar'
import Avatar from '@material-ui/core/Avatar'
import CssBaseline from '@material-ui/core/CssBaseline'
import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import IconButton from '@material-ui/core/IconButton'
import Link from '@material-ui/core/Link'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import { makeStyles, useTheme } from '@material-ui/core/styles'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import AssignmentTurnedInOutlinedIcon from '@material-ui/icons/AssignmentTurnedInOutlined'
import BackupIcon from '@material-ui/icons/Backup'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft'
import ChevronRightIcon from '@material-ui/icons/ChevronRight'
import CloudUploadIcon from '@material-ui/icons/CloudUpload'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import HomeIcon from '@material-ui/icons/Home'
import MapIcon from '@material-ui/icons/Map'
import MenuIcon from '@material-ui/icons/Menu'
import MoreVertIcon from '@material-ui/icons/MoreVert'
import clsx from 'clsx'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link as NewLink } from 'react-router-dom'
import { getData } from '../api/api'
import imglogo from '../media/field_logo.gif'
const drawerWidth = 240

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex'
  },
  grow: {
    flexGrow: 1
  },
  appBar: {
    background: '#ffffff',
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    })
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  hide: {
    display: 'none'
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0
  },
  drawerPaper: {
    width: drawerWidth
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end'
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: -drawerWidth
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    }),
    marginLeft: 0
  }
}))
export default function PersistentDrawerLeft () {
  const classes = useStyles()
  const theme = useTheme()
  const [open, setOpen] = React.useState(false)
  const [anchorEl, setAnchorEl] = React.useState(null)
  const menuId = 'primary-search-account-menu'
  const navigation_reducer = useSelector(state => state.navigation_reducer)
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null)
  const isMenuOpen = Boolean(anchorEl)
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)
  const handleProfileMenuOpen = event => {
    setAnchorEl(event.currentTarget)
  }
  const mobileMenuId = 'primary-search-account-menu-mobile'
  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null)
  }
  const handleMenuClose = () => {
    setAnchorEl(null)
    handleMobileMenuClose()
  }
  const logout = () => {
    localStorage.clear()
    window.location.replace('https://client.fieldplus.gzonetechph.com/#/')
    window.location.reload()
  }
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>
        <Typography>
          ACCOUNT : {navigation_reducer.userLoginData.complete_name}
        </Typography>
      </MenuItem>
      <MenuItem
        onClick={() => {
          logout()
        }}
      >
        {['Logout'].map((text, index) => (
          <Link style={{ textDecoration: 'none', color: 'black' }}>
            <Typography> {text}</Typography>
          </Link>
        ))}
      </MenuItem>
    </Menu>
  )
  const handleDrawerOpen = () => {
    setOpen(true)
  }

  const handleDrawerClose = () => {
    setOpen(false)
  }
  const dispatch = useDispatch()
  const dispatch_data = (type, data) => {
    dispatch({
      type: type,
      data: data
    })
  }

  const getPriviledge = () => {
    getData('audit/getappHomeNav', {
      app_id: 13,
      user_id: localStorage.getItem('u')
    }).then(response => {
      let appnav_priv = response.appHomeNav
      appnav_priv.sort(function (a, b) {
        return a['parent_name'].localeCompare(b['parent_name'])
      })
      dispatch_data('appNav', appnav_priv)
    })
  }
  const getUserLoginData = () => {
    getData('users/getPrivilege2', localStorage.getItem('u')).then(response => {
      dispatch_data('userLoginData', response.user_login_data[0])
    })
  }
  const getHandleBranch = () => {
    getData('HumanResource/getHandleBranch', {
      user_id: localStorage.getItem('u')
    }).then(response => {
      let company = []
      response.response.map(item => {
        let match = false
        company.map(val => {
          if (val.company_name == item.company_name) {
            match = true
          }
        })
        if (!match) {
          company.push({
            company_name: item.company_name,
            company_id: item.company_id
          })
        }
      })
      let branch = response.response
      // branch.sort(function(a,b){
      //   return a[4].charCodeAt(0)-b[4].charCodeAt(0)
      // })
      // company.sort(function(a,b){
      //   return a['company_name'].charCodeAt(0)-b['company_name'].charCodeAt(0)
      // })
      branch.sort(function (a, b) {
        return a['branch_name'].localeCompare(b['branch_name'])
      })
      dispatch_data('gethandleBranch', branch)
      dispatch_data('company_name', company)
      dispatch_data('SelectedBranches', [])
    })
  }
  useEffect(() => {
    setTimeout(() => {
      getPriviledge()
      getHandleBranch()
      getUserLoginData()
    }, 500)
  }, [])

  return (
    <div className={classes.root}>
    
    </div>
  )
}
