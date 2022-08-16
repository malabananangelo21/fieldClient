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
//vertical tab start
function TabPanel(props) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

const subuseStyles = makeStyles((theme) => ({
   subroot: {
        flexGrow: 1,
        backgroundColor: theme.palette.background.paper,
        display: 'flex',
   },
  formcontainer: {
        '& .MuiTextField-root': {
        margin: theme.spacing(1),
        width: '25ch',
        },
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
    },
    tabs: {
        borderRight: `1px solid ${theme.palette.divider}`,
    },
    cardContainer: {
        minWidth: 275,
      },
}));
// vertical tab end

//progess line start
function LinearProgressWithLabel(props) {
    return (
      <Box display="flex" alignItems="center">
        <Box width="100%" mr={1} >
          <LinearProgress variant="determinate" {...props} style={{height:10,borderRadius:5}}/>
        </Box>
        <Box minWidth={35}>
          <Typography variant="body2" color="textSecondary">{`${Math.round(
            props.value,
          )}%`}</Typography>
        </Box>
      </Box>
    );
  }
  LinearProgressWithLabel.propTypes = {
    /**
     * The value of the progress indicator for the determinate and buffer variants.
     * Value between 0 and 100.
     */
    value: PropTypes.number.isRequired,
  };
//progess line end



export default function AddAccount() {
  const classes = useStyles();
  const subClasses = subuseStyles();
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
  const [completenessIdentificator, setcompletenessIdentificator] = React.useState(-0);

  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleGender = (event) => {
    const name = event.target.name;
    setformstate({
      ...formstate,
      [name]: event.target.value,
    });
  };
  const handleDateChange = (date) => {
    setformstate({
        ...formstate,
        birthdate: date,
      });
  };

  return (
    <div className={classes.root}>
        <Typography variant="h5" gutterBottom> <b style={{color:'#3d3d3d'}}>New Application | Customer Form (0 out of 4)</b></Typography>
        <LinearProgressWithLabel value={progress} />
        <div className={subClasses.subroot}>
            <Grid container spacing={2} >
                  <Grid item xs={12} md={2}>
                    <Tabs
                      orientation="vertical"
                      variant="scrollable"
                      value={tabValue}
                      onChange={handleChange}
                      indicatorColor="default"
                      textColor="default"
                      aria-label="Vertical tabs example"
                      className={classes.tabs}>
                        <Tab icon={completenessIdentificator > 0 ? <CheckCircleIcon style={{color:'#e1b12c'}}/> : null} label="Personal"  style={{color:completenessIdentificator > 0 ? "#2f3640" : "#7f8c8d"}} disabled={true}/>
                        <Tab icon={completenessIdentificator > 1 ? <CheckCircleIcon style={{color:'#e1b12c'}}/> : null} label="Address" style={{color:completenessIdentificator > 1 ? "#2f3640" : "#7f8c8d"}} disabled={true}/>
                        <Tab icon={completenessIdentificator > 2 ? <CheckCircleIcon style={{color:'#e1b12c'}}/> : null} label="Attachment" style={{color:completenessIdentificator > 2 ? "#2f3640" : "#7f8c8d"}} disabled={true}/>
                        <Tab icon={completenessIdentificator > 3 ? <CheckCircleIcon style={{color:'#e1b12c'}}/> : null} label="Review" style={{color:completenessIdentificator > 3 ? "#2f3640" : "#7f8c8d"}} disabled={true}/>
                    </Tabs>
                  </Grid>
                  <Grid item xs={12} md={10}>
                    <form style={{width:'100%'}}>
                      <TabPanel value={tabValue} index={0}>
                      <Typography variant="h6" gutterBottom> Personal Information </Typography>
                        <Grid container spacing={2} >
                          <Grid item xs={12} md={3}>
                            <Card variant="outlined">
                                <CardContent>
                                  <div style={{width:'100%',display:'flex',justifyContent:'center'}}>
                                    <img src={require('../../assets/map image/uploaduser.png')} style={{ width: '70%', height: '70%' }} />
                                  </div>
                                  <center>
                                    <label htmlFor="contained-button-file">
                                      <Button variant="contained" color="primary" component="span" style={{marginTop:10}}>
                                        Attached Profile
                                      </Button>
                                    </label>
                                  </center>
                                </CardContent>
                            </Card>
                          </Grid>
                          <Grid item xs={12} md={9}>
                            <Grid container spacing={2} >
                                <Grid item xs={12} md={12}>
                                    <Card variant="outlined">
                                        <CardContent>
                                            <Grid container spacing={1} style={{marginBottom:5}}>
                                                <Grid item xs={12} md={6}>
                                                    <TextField required id="standard-required" label="First Name"  variant="outlined" size="small" name="firstname" style={{width:'100%'}}/>
                                                </Grid>
                                                <Grid item xs={12} md={6}>
                                                    <TextField required id="standard-required" label="Last Name"  variant="outlined" size="small" name="lastname" style={{width:'100%'}}/>
                                                </Grid>
                                            </Grid>
                                            <Grid container spacing={1} style={{marginBottom:5}}>
                                                <Grid item xs={12} md={6}>
                                                    <TextField id="outlined-basic" label="Middle Name"  variant="outlined" size="small" name="middlename" style={{width:'100%'}}/>
                                                </Grid>
                                                <Grid item xs={12} md={6}>
                                                    <TextField id="outlined-basic" label="Suffix(JR/III/etc.)"  variant="outlined" size="small" name="suffixes" style={{width:'100%'}}/>
                                                </Grid>
                                            </Grid>
                                            <Grid container spacing={1} >
                                                <Grid item xs={12} md={6}>
                                                    <TextField id="outlined-basic" label="Email"  variant="outlined" size="small" name="emailadd" style={{width:'100%'}}/>
                                                </Grid>
                                            </Grid>
                                            <Grid container spacing={1} style={{marginBottom:5}}>
                                                <Grid item xs={12} md={6}>
                                                    <TextField id="outlined-basic" label="Mobile No."  variant="outlined" size="small" name="mobilenum" style={{width:'100%'}}/>
                                                </Grid>
                                                <Grid item xs={12} md={6}>
                                                    <TextField id="outlined-basic" label="Telephone No."  variant="outlined" size="small" name="telephone" style={{width:'100%'}}/>
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={12}>
                                        <Card variant="outlined">
                                            <CardContent>
                                                <Grid container spacing={1} style={{marginBottom:5}}>
                                                    <Grid item xs={12} md={4}>
                                                        <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                                            <KeyboardDatePicker
                                                                disableToolbar
                                                                variant="inline"
                                                                format="MM/dd/yyyy"
                                                                // margin="normal"
                                                                id="date-picker-inline"
                                                                label="Birthdate"
                                                                value={formstate.birthdate}
                                                                onChange={handleDateChange}
                                                                KeyboardButtonProps={{
                                                                    'aria-label': 'change date',
                                                                }}/>
                                                        </MuiPickersUtilsProvider>
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <FormControl  className={classes.formControl}>
                                                            <InputLabel htmlFor="filled-age-native-simple">Select Gender</InputLabel>
                                                            <Select
                                                            size="small"
                                                            native
                                                            value={formstate.gender}
                                                            onChange={handleGender}
                                                            inputProps={{
                                                                name: 'gender',
                                                                id: 'filled-age-native-simple',
                                                            }}>
                                                            <option aria-label="None" value="" />
                                                            <option value="MALE">MALE</option>
                                                            <option value="FEMALE">FEMALE</option>
                                                            </Select>
                                                        </FormControl>
                                                    </Grid>
                                                    <Grid item xs={12} md={4}>
                                                        <FormControl  className={classes.formControl}>
                                                            <InputLabel htmlFor="filled-age-native-simple">Marital Status</InputLabel>
                                                            <Select
                                                            size="small"
                                                            native
                                                            value={formstate.maritalstatus}
                                                            onChange={handleGender}
                                                            inputProps={{
                                                                name: 'maritalstatus',
                                                                id: 'filled-age-native-simple',
                                                            }}>
                                                            <option aria-label="None" value="" />
                                                            <option value="MALE">SINGLE</option>
                                                            <option value="FEMALE">MARRIED</option>
                                                            <option value="FEMALE">WIDOR(ER)</option>
                                                            <option value="FEMALE">SEPARATED</option>
                                                            <option value="FEMALE">ANNULED</option>
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
                        </Grid>
                            
                            <div style={{width:'100%',display:'flex',justifyContent:'flex-end'}}>
                                <Button  
                                onClick={()=>{
                                setTabValue(1)
                                setProgress(progress+25)
                                setcompletenessIdentificator(1)}}  variant="contained" style={{ backgroundColor: "rgba(6,86,147)", color: "white", margin: 15 }} >Continue</Button>
                            </div>
                      </TabPanel>
                      <TabPanel value={tabValue} index={1}>
                            <Typography variant="h6" gutterBottom> Address Information </Typography>
                            <Grid container spacing={2} >
                            <Grid item xs={12} md={6}>
                                    <Card variant="outlined">
                                        <CardContent>
                                            <Grid container spacing={1} style={{marginBottom:5}}>
                                                <Grid item xs={12} md={6}>
                                                      <FormControl variant="outlined" className={classes.formControl} size="small">
                                                        <InputLabel id="demo-simple-select-outlined-label">Country</InputLabel>
                                                        <Select
                                                          labelId="demo-simple-select-outlined-label"
                                                          id="demo-simple-select-outlined"
                                                          value={formstate.maritalstatus}
                                                          onChange={handleChange}
                                                          label="country">
                                                          <MenuItem value="">
                                                            <em>None</em>
                                                          </MenuItem>
                                                          <MenuItem value={10}>Ten</MenuItem>
                                                          <MenuItem value={20}>Twenty</MenuItem>
                                                          <MenuItem value={30}>Thirty</MenuItem>
                                                        </Select>
                                                      </FormControl>
                                                </Grid>
                                                <Grid item xs={12} md={6}>
                                                    <FormControl variant="outlined" className={classes.formControl} size="small">
                                                      <InputLabel id="demo-simple-select-outlined-label">Region</InputLabel>
                                                      <Select
                                                        labelId="demo-simple-select-outlined-label"
                                                        id="demo-simple-select-outlined"
                                                        value={formstate.maritalstatus}
                                                        onChange={handleChange}
                                                        label="region">
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
                                            <Grid container spacing={1} style={{marginBottom:5}}>
                                                <Grid item xs={12} md={6}>
                                                  <FormControl variant="outlined" className={classes.formControl} size="small">
                                                      <InputLabel id="demo-simple-select-outlined-label">Province</InputLabel>
                                                      <Select
                                                        labelId="demo-simple-select-outlined-label"
                                                        id="demo-simple-select-outlined"
                                                        value={formstate.maritalstatus}
                                                        onChange={handleChange}
                                                        label="province">
                                                        <MenuItem value="">
                                                          <em>None</em>
                                                        </MenuItem>
                                                        <MenuItem value={10}>Ten</MenuItem>
                                                        <MenuItem value={20}>Twenty</MenuItem>
                                                        <MenuItem value={30}>Thirty</MenuItem>
                                                      </Select>
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={12} md={6}>
                                                  <FormControl variant="outlined" className={classes.formControl} size="small">
                                                      <InputLabel id="demo-simple-select-outlined-label">City/Town</InputLabel>
                                                      <Select
                                                        labelId="demo-simple-select-outlined-label"
                                                        id="demo-simple-select-outlined"
                                                        value={formstate.maritalstatus}
                                                        onChange={handleChange}
                                                        label="city">
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
                                            <Grid container spacing={1} style={{marginBottom:5}}>
                                                <Grid item xs={12} md={6}>
                                                    <TextField required id="standard-required" label="Zip Code"  variant="outlined" size="small" name="zipcode" style={{width:'100%'}}/>
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item xs={12} md={6}>
                                    <Card variant="outlined">
                                        <CardContent>
                                            <Grid container spacing={1} style={{marginBottom:5}}>
                                                <Grid item xs={12} md={6}>
                                                    <FormControl required variant="outlined" className={classes.formControl} size="small" error={true}>
                                                      <InputLabel id="demo-simple-select-outlined-label">Select District</InputLabel>
                                                      <Select
                                                        labelId="demo-simple-select-outlined-label"
                                                        id="demo-simple-select-outlined"
                                                        value={formstate.maritalstatus}
                                                        onChange={handleChange}
                                                        label="district">
                                                        <MenuItem value="">
                                                          <em>None</em>
                                                        </MenuItem>
                                                        <MenuItem value={10}>Ten</MenuItem>
                                                        <MenuItem value={20}>Twenty</MenuItem>
                                                        <MenuItem value={30}>Thirty</MenuItem>
                                                      </Select>
                                                    </FormControl>
                                                </Grid>
                                                <Grid item xs={12} md={6}>
                                                  <FormControl required variant="outlined" className={classes.formControl} size="small" error={true}>
                                                      <InputLabel id="demo-simple-select-outlined-label">Barangay</InputLabel>
                                                      <Select
                                                        labelId="demo-simple-select-outlined-label"
                                                        id="demo-simple-select-outlined"
                                                        value={formstate.maritalstatus}
                                                        onChange={handleChange}
                                                        label="barangay">
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
                                            <Grid container spacing={1} style={{marginBottom:5}}>
                                                <Grid item xs={12} md={6}>
                                                    <TextField id="outlined-basic" label="Landmark"  variant="outlined" size="small" name="landmark" style={{width:'100%'}}/>
                                                </Grid>
                                                <Grid item xs={12} md={6}>
                                                  <TextField id="outlined-basic" label="subdivision"  variant="outlined" size="small" name="Subdivision" style={{width:'100%'}}/>
                                                </Grid>
                                            </Grid>
                                            <Grid container spacing={1} >
                                                <Grid item xs={12} md={6}>
                                                    <TextField id="outlined-basic" label="street"  variant="outlined" size="small" name="Street" style={{width:'100%'}}/>
                                                </Grid>
                                                <Grid item xs={12} md={6}>
                                                    <TextField id="outlined-basic" label="housenum"  variant="outlined" size="small" name="House No." style={{width:'100%'}}/>
                                                </Grid>
                                            </Grid>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>
                            <div style={{width:'100%',display:'flex',justifyContent:'flex-end'}}>
                              <Button onClick={()=>{
                                  setTabValue(0)
                                  setProgress(progress-25)
                                  setcompletenessIdentificator(0)
                              }}  variant="contained" style={{ color: "#4b4b4b", margin: 15 }} >Back</Button>
                              <Button  onClick={()=>{
                                  setTabValue(2)
                                  setProgress(progress+25)
                                  setcompletenessIdentificator(2)
                              }}  variant="contained" style={{ backgroundColor: "rgba(6,86,147)", color: "white", margin: 15 }} >Continue</Button>
                            </div>
                      </TabPanel>
                      <TabPanel value={tabValue} index={2}>
                            <Button  onClick={()=>{
                                    setTabValue(1)
                                    setProgress(progress-25)
                                    setcompletenessIdentificator(completenessIdentificator-1)
                                }}  variant="contained" style={{ backgroundColor: "rgba(6,86,147)", color: "white", margin: 15 }} >Back</Button>
                                <Button  onClick={()=>{
                                    setTabValue(3)
                                    setProgress(progress+25)
                                    setcompletenessIdentificator(3)
                                }}  variant="contained" style={{ backgroundColor: "rgba(6,86,147)", color: "white", margin: 15 }} >Continue</Button>
                      </TabPanel>
                      <TabPanel value={tabValue} index={3}>
                          <Button onClick={()=>{
                              setTabValue(2)
                              setProgress(progress-25)
                              setcompletenessIdentificator(completenessIdentificator-2)
                          }}  variant="contained" style={{ backgroundColor: "rgba(6,86,147)", color: "white", margin: 15 }} >Back</Button>
                          <Button  onClick={()=>{
                              setcompletenessIdentificator(4)
                          }}  variant="contained" style={{ backgroundColor: "rgba(6,86,147)", color: "white", margin: 15 }} >Finish</Button>
                    </TabPanel>
                    </form>
                  </Grid>
            </Grid>
        </div> 

     
    </div>
  );
}