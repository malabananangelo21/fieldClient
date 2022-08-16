import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Box from '@material-ui/core/Box';
import PhoneIcon from '@material-ui/icons/Phone';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import InputLabel from '@material-ui/core/InputLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import NativeSelect from '@material-ui/core/NativeSelect';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import MenuItem from '@material-ui/core/MenuItem';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import useStyles from '../../css/css';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';
import DirectionsIcon from '@material-ui/icons/Directions';
import InputAdornment from '@material-ui/core/InputAdornment';
const subStyles = makeStyles((theme) => ({
    root: {
      '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '100%',
      },
    },
  }));
  

export default function AddAccount() {
  const classes = useStyles();
  const subClasses = subStyles();
  const [tabValue, setTabValue] = React.useState(0);
  const [progress, setProgress] = React.useState(25);
  const [formstate, setformstate] = React.useState({
    firstname: '',
    lastname: '',
    middlename: '',
    suffixes: '',
    birthdate: new Date(),
    maritalstatus: '',
    emailadd: '',
    gender: '',
  });


  return (
    <div className={classes.root}>
        <Typography variant="h5" gutterBottom> <b style={{color:'#3d3d3d'}}>Customers Master Data</b></Typography>
        <Grid container spacing={1} style={{marginTop:10}}>
            <Grid container item xs={12} spacing={1}>
                <form style={{width:'100%'}}>
                    <FormControl style={{width:300}}>
                        <TextField
                        label="Search Customer's name"
                        id="outlined-size-small"
                        variant="outlined"
                        size="small"
                        InputProps={{
                            startAdornment: <InputAdornment position="end">
                                <IconButton  aria-label="toggle password visibility" edge="start">
                                    <SearchIcon />
                                </IconButton>
                            </InputAdornment>,
                          }} />
                   </FormControl>
                </form>
            </Grid>
        </Grid>
        <Grid container spacing={2} style={{marginTop:10}}>
            <Grid container item xs={12} md={3} spacing={2} >
                    
            </Grid>
            <Grid container item xs={12} md={9} spacing={2}>
                <Grid container spacing={3} >
                    <Grid item xs={12} md={12}> 
                        <Card variant="outlined">
                            <CardContent>
                                <Grid container spacing={1} style={{marginBottom:5}}>
                                    <Grid item xs={12} md={4}>
                                        <div style={{width:'100%',display:'flex',justifyContent:'center'}}>
                                            <img src={require('../../assets/map image/boy.png')} style={{ width: '70%', height: '70%' }} />
                                        </div>
                                    </Grid>
                                    <Grid item xs={12} md={8}>
                                        <TextField required id="standard-required" label="Account name"  value="John lester santos" variant="outlined" size="small" name="firstname" style={{width:'100%',marginBottom:10}}/>
                                        <Grid container spacing={1} style={{marginBottom:5}}>
                                            <Grid item xs={12} md={6}>
                                                <TextField id="outlined-basic" label="Email" value="jqsantos@usiphil.com"  variant="outlined" size="small" name="emailadd" style={{width:'100%'}}/>
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <TextField id="outlined-basic" label="Gender" value="MALE"  variant="outlined" size="small" name="suffixes" style={{width:'100%'}}/>
                                            </Grid>
                                        </Grid>
                                        <TextField required id="standard-required" label="Address"  value="Lynville residences bauan batangas city" variant="outlined" size="small" name="firstname" style={{width:'100%',marginBottom:10}}/>
                                        <Grid container spacing={1} style={{marginBottom:5}}>
                                            <Grid item xs={12} md={6}>
                                                <TextField id="outlined-basic" label="Mobile No." value="09102463865"  variant="outlined" size="small" name="emailadd" style={{width:'100%'}}/>
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <TextField id="outlined-basic" label="Telephone No." value="123-456-7891"  variant="outlined" size="small" name="suffixes" style={{width:'100%'}}/>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                                <Divider style={{marginTop:10,marginBottom:10}}/>
                                <Grid container spacing={1} style={{marginBottom:5}}>
                                    <Grid item xs={12} md={4}>
                                        <TextField id="outlined-basic" label="Customer Type" value="Personnal"  variant="outlined" size="small" name="suffixes" style={{width:'100%'}}/>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <TextField id="outlined-basic" label="Account No."  value="12345667" variant="outlined" size="small" name="middlename" style={{width:'100%'}}/>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <TextField id="outlined-basic" label="Account Status" value="Active"  variant="outlined" size="small" name="suffixes" style={{width:'100%'}}/>
                                    </Grid>
                                </Grid>
                                <Grid container spacing={1} style={{marginBottom:5}}>
                                    <Grid item xs={12} md={4}>
                                        <TextField id="outlined-basic" label="Meter Status" value="Disconnected"  variant="outlined" size="small" name="suffixes" style={{width:'100%'}}/>
                                    </Grid>
                                    <Grid item xs={12} md={4}>
                                        <FormControl variant="outlined" className={classes.formControl} size="small">
                                            <InputLabel id="demo-simple-select-outlined-label">Country</InputLabel>
                                            <Select
                                                labelId="demo-simple-select-outlined-label"
                                                id="demo-simple-select-outlined"
                                                value="Residential"
                                                // onChange={handleChange}
                                                label="Rate Class">
                                                <MenuItem value="">
                                                <em>None</em>
                                                </MenuItem>
                                                <MenuItem value={10}>Ten</MenuItem>
                                                <MenuItem value={20}>Twenty</MenuItem>
                                                <MenuItem value={30}>Thirty</MenuItem>
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    </div>
  );
}