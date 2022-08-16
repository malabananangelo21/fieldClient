import React, { useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import clsx from 'clsx';
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
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import useStyles from '../../../../../css/css'
import Menu from '@material-ui/core/Menu';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import ViewArrayIcon from '@material-ui/icons/ViewArray';
import { useSelector, useDispatch } from 'react-redux'
import DateRangeIcon from '@material-ui/icons/DateRange';
import MuiAlert from '@material-ui/lab/Alert';
import { DateRange, DefinedRange } from 'react-date-range'
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
function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function DateToggling({selection,handleDate}) {
    const classes = useStyles()
    const subclasses = substyles()
    const theme = useTheme();
    const { user_id } = useParams()
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [refreshs, setrefreshs] = React.useState(null);
    const [setTimer,setsetTimer] = React.useState("")
    const [searchValue,setsearchValue] = React.useState("")
    const [jo_type,setjo_type] = React.useState("")
    const [singleBA,setsingleBA] = React.useState("ALL")
    const [ba_type,setba_type] = React.useState(['ALL'])
    const [warningDisplay,setwarningDisplay] = React.useState([false])
    const [branchDisplay, setbranchDisplay] = React.useState([]);
    const [branchDisplaybackup, setbranchDisplaybackup] = React.useState([]);
    const [branchSelected, setbranchSelected] = React.useState([]);
    const Dispatch = useDispatch();
    const navigation_reducer = useSelector(state => state.navigation_reducer)

    const [expanded, setExpanded] = React.useState(false);
  
    const handleClick= (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

    useEffect(()=>{
      
    },[])
    return(
        <div>
         <Button
            size='large'
            variant='contained'
            style={{ backgroundColor: 'rgba(6,86,147)', color: 'white',marginRight:10,height:40 }}
            className={classes.button}
            onClick={handleClick}
            endIcon={<DateRangeIcon />} >
            Date filter
        </Button>
        <Menu
            id="simple-menu"
            anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
            }}
            transformOrigin={{
                vertical: 'top',
                horizontal: 'center',
            }}
            anchorEl={anchorEl}
            elevation={2}
            keepMounted
            getContentAnchorEl={null}
            open={Boolean(anchorEl)}
            onClose={handleClose}>
            <div style={{paddingRight: 20,paddingLeft:20,paddingTop:20,paddingBottom:20,maxHeight:500}}>
                <Grid container spacing={2} style={{marginBottom:10}}>
                    <Grid item md={12} xs={12}>
                    <DateRange
                        editableDateInputs={true}
                        autoFocus={true}
                        months={2}
                        direction='horizontal'
                        moveRangeOnFirstSelection={false}
                        onChange={item => handleDate(item)}
                        ranges={[selection]}
                    />
                    </Grid>
                </Grid>
            </div>
                   
        </Menu>
    </div>
    )
}

export default DateToggling;
