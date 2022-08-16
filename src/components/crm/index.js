import React, { useEffect,useState } from 'react';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Typography from '@material-ui/core/Typography';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import clsx from 'clsx';
import useStyles from '../../css/css';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import CreateNewFolderIcon from '@material-ui/icons/CreateNewFolder';
import RecentActorsIcon from '@material-ui/icons/RecentActors';

import AddAccount from './newAccounts';
import MastersData from './mastersData'

const drawerWidth = 400;
const substyle = makeStyles((theme) => ({
    root: {
      display: 'flex',
    },
    appBar: {
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: drawerWidth,
    },
    title: {
      flexGrow: 1,
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
      justifyContent: 'flex-start',
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      marginRight: -drawerWidth,
    },
    contentShift: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: 0,
    },
  }));
function MainCRMNAV(){
    const [selectedTab,setselectedTab] = useState('mastersData')
    const [open, setOpen] = React.useState(false);
    const classes = useStyles();
    const theme = useTheme();
    const subclasses = substyle();


    const handleDrawerOpen = () => {
        setOpen(true);
      };
    
      const handleDrawerClose = () => {
        setOpen(false);
      };

    const renderSelectedTab=()=>{
        switch (selectedTab) {
            case 'mastersData':
              return (<MastersData/>);
              break;
            case 'newAccountsAdded':
              return (<AddAccount />);
              break;
            default:
        }
    }
    return(
        <div className={classes.root}>
              <Breadcrumbs aria-label="breadcrumb" gutterBottom>
                <Link>Home Page</Link>
                <Typography color="textPrimary">CRM</Typography>
                <Typography color="textPrimary"></Typography>
            </Breadcrumbs>
            {/* <Toolbar>
          <Typography variant="h6" noWrap className={classes.title}>
            Persistent drawer
          </Typography>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="end"
            onClick={handleDrawerOpen}
            className={clsx(open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar> */}
            {renderSelectedTab()}
            <Drawer
                className={classes.drawer}
                variant="persistent"
                anchor="right"
                open={open}
                classes={{
                paper: classes.drawerPaper,
                }}>
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
          </IconButton>
        </div>
        <Divider />
        <List>
            <ListItem button onClick={()=>setselectedTab('mastersData')}>
              <ListItemIcon> <RecentActorsIcon/></ListItemIcon>
              <ListItemText primary="Customer Data" />
            </ListItem>
            <Divider />
            <ListItem button onClick={()=>setselectedTab('newAccountsAdded')}>
              <ListItemIcon> <CreateNewFolderIcon/></ListItemIcon>
              <ListItemText primary="Add Customer" />
            </ListItem>
            <Divider />
        </List>
      </Drawer>
        </div>
    )
}
export default MainCRMNAV;