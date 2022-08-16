import React, { useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';

import Grid from '@material-ui/core/Grid';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import AppsIcon from '@material-ui/icons/Apps';
import Accordion from '@material-ui/core/Accordion';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import Button from '@material-ui/core/Button'
import {
  HashRouter as Router,
  Route,
  useParams,
  Redirect,
  Link as NewLink
} from "react-router-dom";
import useStyles from '../../../../css/css'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import ViewArrayIcon from '@material-ui/icons/ViewArray';
import { useSelector, useDispatch } from 'react-redux'
const drawerWidth = 240;
const substyles = makeStyles((theme) => ({
    root: {
      width: '100%',
    },
    heading: {
      fontSize: theme.typography.pxToRem(15),
      flexBasis: '33.33%',
      flexShrink: 0,
    },
    secondaryHeading: {
      fontSize: theme.typography.pxToRem(15),
      color: theme.palette.text.secondary,
    },
  }));
  export default function BAToggling({action_}) {
    const classes = useStyles()
    const subclasses = substyles()
    const theme = useTheme();
    const { user_id } = useParams()
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [setTimer,setsetTimer] = React.useState("")
    const [searchValue,setsearchValue] = React.useState("")
    const [searchExecutor,setsearchExecutor] = React.useState(false)
    const [searchBranch,setsearchBranch] = React.useState("")
    const [branchDisplay, setbranchDisplay] = React.useState([]);
    const [branchDisplaybackup, setbranchDisplaybackup] = React.useState([]);
    const Dispatch = useDispatch();
    const navigation_reducer = useSelector(state => state.navigation_reducer)

    const [expanded, setExpanded] = React.useState(false);

    const handleClick= (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };
    
    const changeSelectedBranch=(fieldwork,branch)=>{
        // toggleSubmit(fieldwork,branch)
        // handleClose()
    }


    
    useEffect(()=>{
     console.log(action_)
    },[action_])
    return(
        <div>
            <div style={{width:'100%'}}> 
                <Typography><b>Jo type</b></Typography>
                {/* {fieldWork.map((value,index2)=>{
                    return<>
                    <MenuItem onClick={()=>{changeSelectedBranch(value,val)}} key={index2}>{value}</MenuItem>
                    <Divider/>
                    </>
                })} */}
            </div>
    </div>
    )
}

