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
import useStyles from '../../../../css/css'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import ViewArrayIcon from '@material-ui/icons/ViewArray';
import { useSelector, useDispatch } from 'react-redux'
import BAToggling from './batoggle.js'
import MuiAlert from '@material-ui/lab/Alert';
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
function Toggling({handledBranch,toggleSubmit}) {
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

    const handleChange = (panel) => (event, isExpanded) => {
      setExpanded(isExpanded ? panel : false);
    };
    const handleClick= (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
      setjo_type("")
      setsingleBA('ALL')
      setwarningDisplay(false)
    };

    const handleAccordion=(type,value)=>{
        if(type === "jo"){
            setjo_type(value)
        }else if(type === "ba"){
            setsingleBA(value)
            // if(value === "ALL"){
            //     setba_type(["ALL"])
            // }else{
            //     if(JSON.stringify(ba_type).includes('ALL')){
            //         ba_type.splice(0, 1);
            //     }
            //     const currentIndex = ba_type.findIndex(x => String(x).toUpperCase() === String(value).toUpperCase())
            //     console.log(currentIndex)
            //     if(currentIndex === -1){
            //         ba_type.push(value)
            //         setrefreshs(!refreshs)
            //     }else{
            //         ba_type.splice(currentIndex, 1);
            //         setrefreshs(!refreshs)
            //     }
            // }
        }
    }
    
    const changeSelectedBranch=(branch)=>{
        if(jo_type === "" || singleBA === ""){
            setwarningDisplay(true)
        }else{
            toggleSubmit(jo_type,singleBA,branch)
            handleClose()
        }
    }

    const filterInput = async (input) => {
        const filtered = JSON.parse(branchDisplaybackup).filter(item => {
         return item.branch_name.toLowerCase().includes(input.toLowerCase())
        })
        setbranchDisplay(filtered)
    }

    const updateInput = async (input) => {
        let holder = input.target.value
        setsearchValue(holder)
        clearTimeout(setTimer)
        const timerSet = setTimeout(()=>{
            filterInput(holder)
        },500)
        setsetTimer(timerSet)
    }

    const setBranches=()=>{
        let BranchwithFieldWork = handledBranch.filter(item => String(item.branch_field_work).trim() !== "" )
        setbranchDisplay(BranchwithFieldWork)
        setbranchDisplaybackup(JSON.stringify(BranchwithFieldWork))
    }

    
    useEffect(()=>{
        if(handledBranch.length > 0){
            setBranches()
            return () => {
                setbranchDisplay([]);
            };
        }
    },[handledBranch])
    return(
        <div>
         <Button
            size='large'
            variant='contained'
            style={{ backgroundColor: 'rgba(6,86,147)', color: 'white' ,marginRight:10,fontSize:13}}
            className={classes.button}
            onClick={handleClick}
            endIcon={<ViewArrayIcon />} >
            Branch
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
            <div style={{width:600,paddingRight: 20,paddingLeft:20,paddingTop:20,paddingBottom:20 }}>
                <Grid container spacing={2} style={{marginBottom:10}}>
                    <Grid item md={12} xs={12}>
                        <FormControl style={{ width: '100%' }}>
                            <Typography style={{ color: '#786fa6', fontSize: 15 }}> <b>Search branch</b></Typography>
                            <TextField
                                style={{ backgroundColor: '#fff' }}
                                id="outlined-size-small"
                                variant="outlined"
                                size="small"
                                name="nameSearch"  
                                value={searchValue}
                                onChange={updateInput}
                                InputProps={{
                                    startAdornment: <InputAdornment position="end">
                                        <IconButton
                                            // onClick={() => fetchCustomer()}
                                            aria-label="toggle password visibility" edge="start">
                                            <SearchIcon />
                                        </IconButton>
                                    </InputAdornment>
                                }} />
                        </FormControl>
                    </Grid>
                </Grid>
                {branchDisplay.length > 0 &&
                    <>
                    {branchDisplay.map((val,index)=>{
                        let id_ = 'panel'+index
                        let fieldWork = []
                        let ba = []
                        try {
                            fieldWork = JSON.parse(val.branch_field_work)
                            if(val.business_area != null){
                                ba =  JSON.parse(val.business_area)
                            }
                        } catch (error) {
                        }
                        return<Accordion expanded={expanded === String(id_)} onChange={handleChange(String(id_))} key={index}>
                            <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}>
                                <Typography>{val.branch_name}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <div style={{width:'100%'}}> 
                                    {warningDisplay === true &&
                                        <Alert severity="warning">Please complete the details!</Alert>
                                    }
                                    <Grid container spacing={1} style={{marginTop:5}}>
                                        <Grid item xs={12} md={6}>
                                            <Card variant="outlined">
                                                <CardContent>
                                                    <Typography><b>Jo type</b></Typography>
                                                    {fieldWork.map((value,index2)=>{
                                                        return<>
                                                        <MenuItem 
                                                            style={{marginTop:5,backgroundColor:jo_type === value ? '#3867d6' : "#fff",
                                                            color:jo_type === value ? '#fff' : "#3d3d3d"}} 
                                                            onClick={()=>{handleAccordion('jo',value,val)}} key={index2}>{value}</MenuItem>
                                                        <Divider style={{marginBottom:5}}/>
                                                        </>
                                                    })}
                                                </CardContent>
                                            </Card>
                                        </Grid>
                                        <Grid item xs={12} md={6}>
                                            <Card variant="outlined">
                                                <CardContent>
                                                    <Typography><b>BA</b></Typography>
                                                    <MenuItem 
                                                        style={{marginTop:5,
                                                        backgroundColor:singleBA === "ALL" ? '#3867d6' : "#fff",
                                                        color:singleBA === "ALL" ? '#fff' : "#3d3d3d"}} 
                                                        // style={{marginTop:5,
                                                        //     backgroundColor:JSON.stringify(ba_type).includes("ALL") ? '#3867d6' : "#fff",
                                                        //     color:JSON.stringify(ba_type).includes('ALL') ? '#fff' : "#3d3d3d"}} 
                                                        onClick={()=>{handleAccordion('ba',"ALL")}}>All</MenuItem>
                                                    <Divider style={{marginBottom:5}}/>
                                                    {ba.map((value,index2)=>{
                                                        return<>
                                                        <MenuItem 
                                                            style={{marginTop:5,
                                                            backgroundColor:singleBA === value ? '#3867d6' : "#fff",
                                                            color:singleBA === value ? '#fff' : "#3d3d3d"}} 
                                                            // style={{marginTop:5,
                                                            //     backgroundColor:JSON.stringify(ba_type).includes(value) ? '#3867d6' : "#fff",
                                                            //     color:JSON.stringify(ba_type).includes(value) ? '#fff' : "#3d3d3d"}} 
                                                            onClick={()=>{ handleAccordion('ba',value)}} key={index2}>{value}</MenuItem>
                                                        <Divider style={{marginBottom:5}}/>
                                                        </>
                                                    })}
                                                </CardContent>
                                            </Card>
                                            
                                        </Grid>
                                    </Grid>
                                    <div style={{width:'100%',display:'flex',justifyContent:'flex-end',marginTop:5}}>
                                        <Button
                                            onClick={()=>changeSelectedBranch(val)}
                                            size='large'
                                            style={{ backgroundColor: 'rgba(6,86,147)', color: 'white' ,fontSize:13}}
                                            className={classes.button}>
                                            Submit
                                        </Button>
                                    </div>
                                </div>
                            </AccordionDetails>
                        </Accordion>
                    })}
                    </>
                }
            </div>
                   
        </Menu>
    </div>
    )
}

export default Toggling;
