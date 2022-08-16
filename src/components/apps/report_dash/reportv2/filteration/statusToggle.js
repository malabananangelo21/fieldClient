import React, { useEffect } from 'react';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
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
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import ViewArrayIcon from '@material-ui/icons/ViewArray';
import { useSelector, useDispatch } from 'react-redux'
import DateRangeIcon from '@material-ui/icons/DateRange';
import MuiAlert from '@material-ui/lab/Alert';
import FilterListIcon from '@material-ui/icons/FilterList';

import Accordion from '@material-ui/core/Accordion';
import AccordionSummary from '@material-ui/core/AccordionSummary';
import AccordionDetails from '@material-ui/core/AccordionDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';


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
function StatusToggling({status,select_findings,finding,handleStatus,handleFinding,onFilter,discon_findings,sub_findings,handleSubFinding}) {
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
    return(
        <div>
         <Button
            size='large'
            variant='contained'
            style={{ backgroundColor: 'rgba(6,86,147)', color: 'white',marginRight:10,height:40 }}
            className={classes.button}
            onClick={handleClick}
            endIcon={<FilterListIcon />} >
            Filter Table
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
            <div style={{paddingRight: 20,paddingLeft:20,paddingTop:20,paddingBottom:20,maxHeight:500,minWidth:600}}>
                <Grid container spacing={2} style={{marginBottom:10}}>
                    <Grid item md={6} xs={12}>
                        <Typography style={{ color: '#0984e3', fontSize: 18 }}> <b>Filter Table</b></Typography>
                        <Card variant="outlined">
                            <CardContent>
                                <MenuItem 
                                    onClick={()=>{handleStatus('ALL')}}
                                    style={{marginTop:5,backgroundColor:status === "ALL" ? '#3867d6' : "#fff",
                                    color:status === "ALL" ? '#fff' : "#3d3d3d"}} >All</MenuItem>
                                <Divider style={{marginBottom:5}}/>        
                                <MenuItem 
                                    onClick={()=>{handleStatus('Accomplished')}}
                                    style={{marginTop:5,backgroundColor:status === "Accomplished" ? '#3867d6' : "#fff",
                                    color:status === "Accomplished" ? '#fff' : "#3d3d3d"}} >Accomplished</MenuItem>
                                <Divider style={{marginBottom:5}}/>         
                                <MenuItem 
                                    onClick={()=>{handleStatus('Pending')}}
                                    style={{marginTop:5,backgroundColor:status === "Pending" ? '#3867d6' : "#fff",
                                    color:status === "Pending" ? '#fff' : "#3d3d3d"}} >Pending</MenuItem>
                                <Divider style={{marginBottom:5}}/>         
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item md={6} xs={12}>
                        <Typography style={{ color: '#0984e3', fontSize: 18 }}> <b>Field Findings</b></Typography>
                        <Card variant="outlined">
                            <CardContent>
                            {status === "Accomplished" &&
                                <>
                                {JSON.stringify(select_findings).includes('Disconnected') &&
                                   <Accordion>
                                        <AccordionSummary
                                            style={{backgroundColor:finding === "Disconnected" ? "#3867d6" : "#fff",color:finding === "Disconnected" ? "#fff" : "#3d3d3d"}}
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel1a-content"
                                            id="panel1a-header">
                                            {select_findings.map((val,index)=>{
                                                if(val === "Disconnected"){
                                                return<Typography className={classes.heading} key={index}>{val}</Typography>
                                                }
                                            })}
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <div style={{width:'100%'}}>
                                            {discon_findings.map((val,index)=>{
                                                return<div>
                                                    <MenuItem key={index}
                                                    onClick={()=>{handleSubFinding("Disconnected",val)}}
                                                    style={
                                                        {marginTop:5,
                                                        backgroundColor:finding === "Disconnected" ? sub_findings === val ? '#3867d6' : "#fff" :  "#fff",
                                                        color:finding === "Disconnected" ? sub_findings === val ? '#fff' : "#3d3d3d" :  "#3d3d3d"}} >{val}</MenuItem>
                                                    <Divider style={{marginBottom:5}}/>   
                                                </div>
                                            })}
                                            </div>
                                        </AccordionDetails>
                                    </Accordion>
                                }
                                {!JSON.stringify(select_findings).includes('Disconnected')
                                    ? <div style={{width:'100%'}}>
                                        {select_findings.map((val,index)=>{
                                            if(val !== "Disconnected"){
                                                return<div key={index}>
                                                <MenuItem 
                                                    onClick={()=>{handleFinding(val)}}
                                                    style={{marginTop:5,backgroundColor:finding === val ? '#3867d6' : "#fff",
                                                    color:finding === val ? '#fff' : "#3d3d3d"}} >{val}</MenuItem>
                                                <Divider style={{marginBottom:5}}/>         
                                            </div>
                                            }
                                        })}
                                    </div>
                                    :  <Accordion>
                                        <AccordionSummary
                                            style={{backgroundColor:finding !== "Disconnected" ? "#3867d6" : "#fff", color:finding !== "Disconnected" ? "#fff" : "#3d3d3d"}}
                                            expandIcon={<ExpandMoreIcon />}
                                            aria-controls="panel2a-content"
                                            id="panel2a-header">
                                            <Typography className={classes.heading}>Others</Typography>
                                        </AccordionSummary>
                                        <AccordionDetails>
                                            <div style={{width:'100%'}}>
                                                {select_findings.map((val,index)=>{
                                                    if(val !== "Disconnected"){
                                                        return<div key={index}>
                                                        <MenuItem 
                                                            onClick={()=>{handleFinding(val)}}
                                                            style={{marginTop:5,backgroundColor:finding === val ? '#3867d6' : "#fff",
                                                            color:finding === val ? '#fff' : "#3d3d3d"}} >{val}</MenuItem>
                                                        <Divider style={{marginBottom:5}}/>         
                                                    </div>
                                                    }
                                                })}
                                            </div>
                                        </AccordionDetails>
                                    </Accordion>
                                }
                                </>
                            }
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
                <div style={{width:'100%',display:'flex',justifyContent:'flex-end',marginTop:5}}>
                    <Button
                        onClick={()=>{
                            onFilter()
                            handleClose()
                        }}
                        size='large'
                        style={{ backgroundColor: 'rgba(6,86,147)', color: 'white' ,fontSize:13}}
                        className={classes.button}>
                        Submit
                    </Button>
                </div>
            </div>
                   
        </Menu>
    </div>
    )
}

export default StatusToggling;
