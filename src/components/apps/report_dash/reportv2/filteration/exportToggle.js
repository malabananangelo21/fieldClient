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
import { useSelector, useDispatch } from 'react-redux'
import MuiAlert from '@material-ui/lab/Alert';
import GetAppIcon from '@material-ui/icons/GetApp';
import Checkbox from '@material-ui/core/Checkbox'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormGroup from '@material-ui/core/FormGroup'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormLabel from '@material-ui/core/FormLabel'
import ListItemText from '@material-ui/core/ListItemText'
import GridOnIcon from '@material-ui/icons/GridOn'
import ReactExport from 'react-data-export'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import moment from 'moment'
const ExcelFile = ReactExport.ExcelFile
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn

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
function ExportToggling({
    accomCat,
    initialCat,
    exportCat,
    handleExportField,
    selectExportType,
    exportType,
    startDate,
    endDate,
    branch_name,
    selected_jo_type,
    selected_ba,
    accomplishment_display,
    exportAccom}) {
    const classes = useStyles()
    const subclasses = substyles()
    const theme = useTheme();
    const { user_id } = useParams()
    const [anchorEl, setAnchorEl] = React.useState(null);
    const Dispatch = useDispatch();

    const handleClick= (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

    // useEffect(()=>{
    //     console.log({
    //         accomCat:accomCat,
    //         initialCat:initialCat
    //     })
    // },[initialCat])
    return(
        <div>
        {accomplishment_display.length > 0
            ?<Button
                size='large'
                variant='contained'
                style={{ backgroundColor: 'rgba(6,86,147)', color: 'white',marginRight:10,height:40 }}
                className={classes.button}
                onClick={handleClick}
                endIcon={<GetAppIcon />} >
                Export
            </Button>
            :<Button
                size='large'
                variant='contained'
                style={{ backgroundColor: '#576574', color: 'white',marginRight:10,height:40 }}
                className={classes.button}
                endIcon={<GetAppIcon />} >
                Export
            </Button>
        }
        
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
                    <Grid item md={(exportType === 'EXCEL' || exportType === 'TABLE') ? 6 : 12} xs={12}>
                        <Typography style={{ color: '#0984e3', fontSize: 18 }}> <b>Export type</b></Typography>
                        <Card variant="outlined">
                            <CardContent>
                                <MenuItem 
                                    onClick={()=>{selectExportType('EXCEL')}}
                                    style={{marginTop:5,backgroundColor:exportType === "EXCEL" ? 'rgba(6,86,147)' : "#fff",color:exportType === "EXCEL" ? '#fff' : "#3d3d3d"}} >EXCEL</MenuItem>
                                <Divider style={{marginBottom:5}}/>        
                                <MenuItem 
                                    onClick={()=>{selectExportType('PAGE')}}
                                    style={{marginTop:5,backgroundColor:exportType === "PAGE" ? 'rgba(6,86,147)' : "#fff", color:exportType === "PAGE" ? '#fff' : "#3d3d3d"}} >PAGE</MenuItem>
                                <Divider style={{marginBottom:5}}/>         
                                <MenuItem 
                                    onClick={()=>{selectExportType('TABLE')}}
                                    style={{marginTop:5,backgroundColor:exportType === "TABLE" ? 'rgba(6,86,147)' : "#fff", color:exportType === "TABLE" ? '#fff' : "#3d3d3d"}} >TABLE</MenuItem>
                                <Divider style={{marginBottom:5}}/>         
                                <MenuItem 
                                    onClick={()=>{selectExportType('IMAGE')}}
                                    style={{marginTop:5,backgroundColor:exportType === "IMAGE" ? 'rgba(6,86,147)' : "#fff", color:exportType === "IMAGE" ? '#fff' : "#3d3d3d"}} >IMAGE</MenuItem> 
                            </CardContent>
                        </Card>
                    </Grid>
                    {(exportType === 'EXCEL' || exportType === 'TABLE') &&
                        <Grid item md={6} xs={12}>
                            <Typography style={{ color: '#0984e3', fontSize: 18 }}> <b>Data Columns</b></Typography>
                            <Card variant="outlined">
                                <CardContent>
                                    <FormControl component='fieldset' className={classes.formControl}>
                                        {exportType !== "" &&
                                        <FormGroup>
                                                {accomCat.map((val,index) => {
                                                    let initial = false
                                                        let match = exportCat.filter(
                                                            cat => cat.category_details === val.category_details
                                                        )
                                                        if (match.length > 0) {
                                                            initial = true
                                                        }
                                                        return (
                                                        <FormControlLabel
                                                            key={index}
                                                            control={
                                                                <Checkbox
                                                                    checked={initial}
                                                                    style={{ color: 'rgba(6,86,147)' }}
                                                                    onChange={() => {
                                                                        handleExportField(val)
                                                                    }}
                                                                    name={val.category_field}/>
                                                            }
                                                        label={val.category_details}/>
                                                    )
                                                })}
                                            </FormGroup>
                                        }
                                        <FormHelperText>
                                            only selected column/s will be displayed in exported reports
                                        </FormHelperText>
                                    </FormControl>
                                </CardContent>
                            </Card>
                        </Grid>
                    }
                    <Grid item md={12} xs={12}>
                        {exportType !== "" &&
                            <>
                             <div style={{display:'flex',width:'100%',justifyContent:'flex-end'}}>
                                {exportType === 'EXCEL'
                                    ?<>
                                    <ExcelFile
                                        filename={  branch_name + 'Date: (' + moment(startDate).format('LL') + '-' +  moment(endDate).format('LL') + ') Type: (' + selected_jo_type + ') Business Area: (' + selected_ba + ') ' }
                                        element={
                                            <Button
                                                size='large'
                                                variant='contained'
                                                style={{ backgroundColor: 'rgba(6,86,147)', color: 'white',marginRight:10,height:40 }}
                                                className={classes.button}>
                                                EXPORT EXCEL
                                            </Button> }>
                                        <ExcelSheet data={accomplishment_display} name='Accomplishment'>
                                            {exportCat.map((val,index) => {
                                                return<ExcelColumn label={val.category_details} value={val.category_field} key={index}/>
                                            })}
                                        </ExcelSheet>
                                    </ExcelFile>
                                    </> 
                                    : <Button
                                        size='large'
                                        variant='contained'
                                        style={{ backgroundColor: 'rgba(6,86,147)', color: 'white',marginRight:10,height:40 }}
                                        className={classes.button}
                                        onClick={()=>exportAccom(exportType)} >
                                        EXPORT
                                    </Button>
                                }
                            </div>
                            </>
                        }
                       
                    </Grid>
                </Grid>
            </div>
        </Menu>
    </div>
    )
}

export default ExportToggling;
