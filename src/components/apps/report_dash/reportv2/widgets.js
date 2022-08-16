import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import { useTheme, withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import moment from 'moment'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import '../../../../App'
import useStyles from '../../../../css/css'
import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';

const HtmlTooltip = withStyles((theme) => ({
    tooltip: {
      backgroundColor: '#f5f5f9',
      color: 'rgba(0, 0, 0, 0.87)',
      maxWidth: 220,
      fontSize: theme.typography.pxToRem(12),
      border: '1px solid #dadde9',
    },
}))(Tooltip);

function Widgets ({accomplishments,accom_accom,pending_accom,total_accom}) {
  const home_reducer = useSelector(state => state.home_reducer)
  const dispatch = useDispatch()
 
  const theme = useTheme()
  const classes = useStyles()
  
  
  return (
    <Grid container spacing={1}>
        <Grid item xs={12} md={9} style={{display:'flex',justifyContent: 'flex-start'}}>
            <div style={{marginTop:5}}>
                <center>
                    <HtmlTooltip
                        title={
                        <React.Fragment>
                            {total_accom.map((val,index) => {
                                return (
                                    <>
                                    <Typography color="inherit" key={index}>{String(val.BA).toUpperCase() + ' : ' + val.count}</Typography>
                                    <br/>
                                    </>
                                )
                            })}
                        </React.Fragment>}>
                        <Typography style={{ color: '#2980b9',fontSize:18 }} noWrap><b>Total: </b> 
                            <span style={{ color: '#4b6584',fontSize:20}}>{accomplishments.length}</span>
                        </Typography>
                    </HtmlTooltip>
                </center> 
            </div>
            <Typography variant="h4" style={{color:'#4b4b4b',marginRight:15,marginLeft:15}}> | </Typography>
            <div style={{marginTop:5}}>
                <center>
                    <HtmlTooltip
                        title={
                        <React.Fragment>
                           {accom_accom.map((val,index) => {
                            return (
                                <>
                                  <Typography color="inherit"  key={index}>{String(val.BA).toUpperCase() + ' : ' + val.count}</Typography>
                                  <br/>
                                </>
                                )
                            })}
                        </React.Fragment>}>
                        <Typography style={{ color: '#16a085',fontSize:18 }} noWrap><b>Accomplishments: </b> 
                            <span style={{ color: '#4b6584',fontSize:20}}>
                                {accomplishments.reduce((count, value) => {
                                    if (
                                        value.date_accomplished !== '' &&
                                        value.date_accomplished !== null
                                    ) {
                                        count++
                                    }
                                    return count
                                }, 0)}
                            </span>
                        </Typography>
                    </HtmlTooltip>
                </center> 
            </div>
            <Typography variant="h4" style={{color:'#4b4b4b',marginRight:15,marginLeft:15}}> | </Typography>
            <div style={{marginTop:5}}>
                <center>
                    <HtmlTooltip
                        title={
                        <React.Fragment>
                           {pending_accom.map((val,index) => {
                            return (
                                <>
                                <Typography color="inherit"  key={index}>{String(val.BA).toUpperCase() + ' : ' + val.count}</Typography>
                                <br/>
                                </>
                                )
                            })}
                        </React.Fragment>}>
                        <Typography style={{ color: '#c0392b',fontSize:18 }} noWrap><b>Pending: </b> 
                            <span style={{ color: '#4b6584',fontSize:20}}>
                                {accomplishments.reduce((count, value) => {
                                        if (
                                        value.date_accomplished === '' ||
                                        value.date_accomplished === null
                                        ) {
                                        count++
                                        }
                                        return count
                                }, 0)}
                            </span>
                        </Typography>
                    </HtmlTooltip>
                 
                </center> 
            </div>
        </Grid>
    </Grid>
  )
}
export default Widgets
