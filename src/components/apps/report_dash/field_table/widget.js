
import Grid from '@material-ui/core/Grid'
import Menu from '@material-ui/core/Menu'
import { useTheme, withStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import MuiAlert from '@material-ui/lab/Alert'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import {
  Document,
  Image as ImagePDF,
  Page,
  PDFViewer,
  StyleSheet,
  Text,
  View
} from '@react-pdf/renderer'
import 'date-fns'
import 'jspdf-autotable'
import moment from 'moment'
import React, { useEffect } from 'react'
import 'react-alice-carousel/lib/alice-carousel.css'
import ReactExport from 'react-data-export'
import { useDispatch, useSelector } from 'react-redux'
import '../../../../App'
import useStyles from '../../../../css/css'
import {
  GetAccomCategories,
  getHandleBranch,
  getJOAuditFilterDashBoard,
  getJOAuditFilterDashBoardPDF,
  getUserLoginData,
  getLiquidChart
} from '../../Functions/home_func'
function WidgetReport ({accomplishments}) {
  const home_reducer = useSelector(state => state.home_reducer)
  const dispatch = useDispatch()
  const theme = useTheme()
  const classes = useStyles()


  return (
    <Grid container spacing={1} style={{marginTop:10}}>
        <Grid item xs={12} md={4}>
        <div style={{marginBottom:10,height:120,width:'100%',backgroundColor:'#487eb0'}}>
            <div style={{position:'relative',width:'100%',height:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>
            <Typography variant="h4" gutterBottom style={{color:'#fff',marginTop:10}}> <b>{accomplishments.length}</b>  </Typography>
            <div style={{position:'absolute',bottom:1,width:'100%',display:'flex',justifyContent:'center'}}>
                <Typography variant="h5" style={{color:'#fff',fontSize:13,marginBottom:10}}> TOTAL JO </Typography>
            </div>
            </div>
        </div>
        </Grid>
        <Grid item xs={12} md={4}>
        <div style={{marginBottom:10,height:120,width:'100%',backgroundColor:'#58B19F'}}>
            <div style={{position:'relative',width:'100%',height:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>
                <Typography variant="h4" gutterBottom style={{color:'#fff',marginTop:10}}> 
                <b>
                    {accomplishments.reduce((count, value) => {
                    if (
                        value.date_accomplished !== '' &&
                        value.date_accomplished !== null
                    ) {
                        count++
                    }
                    return count
                    }, 0)}
                </b>
                </Typography>
                <div style={{position:'absolute',bottom:1,width:'100%',display:'flex',justifyContent:'center'}}>
                <Typography variant="h5" style={{color:'#fff',fontSize:13,marginBottom:10}}> ACCOMPLISHMENTS </Typography>
                </div>
            </div>
        </div>
        </Grid>
        <Grid item xs={12} md={4}>
        <div style={{marginBottom:10,height:120,width:'100%',backgroundColor:'#c0392b'}}>
            <div style={{position:'relative',width:'100%',height:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>
                <Typography variant="h4" gutterBottom style={{color:'#fff',marginTop:10}}>
                    <b>
                    {accomplishments.reduce((count, value) => {
                        if (
                        value.date_accomplished === '' ||
                        value.date_accomplished === null
                        ) {
                        count++
                        }
                        return count
                    }, 0)}
                    </b> 
                </Typography>
                <div style={{position:'absolute',bottom:1,width:'100%',display:'flex',justifyContent:'center'}}>
                <Typography variant="h5" style={{color:'#fff',fontSize:13,marginBottom:10}}> PENDING </Typography>
                </div>
            </div>
        </div>
        </Grid>
    </Grid>
    )
}
export default WidgetReport
