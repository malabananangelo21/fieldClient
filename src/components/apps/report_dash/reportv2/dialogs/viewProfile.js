
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
import Carousel from 'react-material-ui-carousel'
import useStyles from '../../../../../css/css'
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import ViewArrayIcon from '@material-ui/icons/ViewArray';
import { useSelector, useDispatch } from 'react-redux'
import DateRangeIcon from '@material-ui/icons/DateRange';
import MuiAlert from '@material-ui/lab/Alert';
import FilterListIcon from '@material-ui/icons/FilterList';
import FormControl from '@material-ui/core/FormControl';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import moment from 'moment'
import Mapa from '../../../map/map3'
import NoImage from '../../../../../assets/map image/no_image.png'
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
function ProfileDialog({dialogState,handleDialogClose,columndata,initialCat,img_data}) {
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

    return(
        <Dialog
        fullScreen
        open={dialogState.profileDialog}
        // onClose={handleClickDialogClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description" >
        <DialogContent>
          <Grid container spacing={1} style={{ marginTop: 10 }}>
            <Grid item xs={12} md={6}>
              <Card variant="outlined">
                  <CardContent style={{height:370 }}>
                      <Carousel navButtonsAlwaysVisible={true} autoPlay={false}>
                        {img_data.length !== 0 ? (
                          img_data[0].image_path.map((val, index) => {
                            return (
                              <img
                                src={
                                  'https://api.workflow.gzonetechph.com/assets/img/meter/' +
                                  val
                                }
                                style={{ width: '100%', height: '335px' }}
                                onClick={() => {
                                  // handleImageOpen(val)
                                }}
                              />
                            )
                          })
                        ) : (
                          <img
                            src={NoImage}
                            style={{ width: '100%', height: '335px' }}
                            onClick={() => {
                              alert('No image available.')
                            }}
                          />
                        )}
                      </Carousel>
                  </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <Card variant="outlined">
                  <CardContent style={{height:370 }}>
                      <Mapa/>
                  </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={12}>
              <Card variant="outlined">
                  <CardContent>
                  <Typography style={{ color: '#4b4b4b', fontSize: 21,marginBottom:10}}> <b>Accomplishment Details</b></Typography>
                    {columndata.map(row=> {
                      return<Grid container spacing={1}> 
                        {initialCat.map(column => {
                          let bal = 0
                          let vals = row[column.category_field]
                          if (column.category_field === 'date_accomplished') {
                            if (row[column.category_field] === '' || row[column.category_field] === null){
                              vals = ''
                            } else {
                              vals = moment(row[column.category_field]).format('LL')
                            }
                          }
                          if (column.category_field === 'time_accomplished') {
                            if (row[column.category_field] === '' || row[column.category_field] === null) {
                              vals = ''
                            } else {
                              vals = row[column.category_field]
                            }
                          }
                          if (column.category_field === 'all_images') {
                            vals = row.all_images.length
                          }
                          if(column.category_details === 'Outstanding Balance'){
                            if (row[column.category_field] === '' || row[column.category_field] === null ) {
                              vals = '₱ 0.00'
                            }
                          }
                          return  <Grid item xs={12} md={3}>
                            <FormControl style={{ width: '100%'}}>
                              <Typography style={{ color: '#0984e3', fontSize: 18 }}> <b>{column.category_details}</b></Typography>
                              <TextField
                                  value={vals}
                                  style={{ backgroundColor: '#fff',color:'#3d3d3d' }}
                                  id="outlined-size-small"
                                  variant="outlined"
                                  InputProps={{
                                    readOnly: true
                                  }}
                                  size="small" />
                            </FormControl>
                          </Grid>
                        })}
                      </Grid>
                    })}
                    
                  </CardContent>
              </Card>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={()=>handleDialogClose('viewProfile')}
            style={{
              backgroundColor: 'rgba(6,86,147)',
              color: 'white',
              marginLeft: 10
            }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>
    )
}

export default ProfileDialog;

