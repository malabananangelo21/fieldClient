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
function CustomToggling({accomCat,initialCat,handleChangeCustom}) {
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
    //         initialCat:initialCat,
    //         length:initialCat.length
    //     })
    // },[initialCat])
    return(
        <div>
         <Button
            size='large'
            variant='contained'
            style={{ backgroundColor: 'rgba(6,86,147)', color: 'white',marginRight:10,height:40 }}
            className={classes.button}
            onClick={handleClick}
            endIcon={<GetAppIcon />} >
            Edit Columns
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
            <div style={{paddingRight: 20,paddingLeft:20,paddingTop:20,paddingBottom:20,maxHeight:500,minWidth:300}}>
                <Grid container spacing={2} style={{marginBottom:10}}>
                    <Grid item md={12} xs={12}>
                        <Typography style={{ color: '#0984e3', fontSize: 18 }}> <b>Customize Columns</b></Typography>
                        <Card variant="outlined">
                            <CardContent>
                                <FormControl component='fieldset' className={classes.formControl}>
                                    <FormGroup>
                                        {accomCat.map(val => {
                                            let initial = false
                                            let match = initialCat.filter(
                                                cat => cat.category_details === val.category_details
                                            )
                                            if (match.length > 0) {
                                                initial = true
                                            }
                                            return (
                                                <FormControlLabel
                                                    control={
                                                        <Checkbox
                                                            checked={initial}
                                                            style={{ color: 'rgba(6,86,147)' }}
                                                            onChange={() => {
                                                                handleChangeCustom(val)
                                                            }}
                                                            name={val.category_field}
                                                        />
                                                    }
                                                    label={val.category_details}
                                                />
                                            )
                                        })}
                                    </FormGroup>
                                    <FormHelperText>
                                        only selected column/s will be displayed in accomplishment reports
                                    </FormHelperText>
                                </FormControl>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </div>
                   
        </Menu>
    </div>
    )
}

export default CustomToggling;
