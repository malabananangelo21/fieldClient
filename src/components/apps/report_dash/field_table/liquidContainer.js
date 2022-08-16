
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
import FillChart from './liquid_fill'


function LiquidContainer({liquidChartArr_,accomplishments}) {
  const home_reducer = useSelector(state => state.home_reducer)
  const dispatch = useDispatch()
  const theme = useTheme()
  const classes = useStyles()

 useEffect(()=>{
 },[accomplishments])
  return (
    <>
        {liquidChartArr_.map((value,index)=>{
            let count_AllAccom = 0
            let count_AllUpload = 0
            let count_AllAssign = 0
            let count_AlltotalJo = 0
            let finalJo = 0
            let accomIdentificator = 0
            let totalAssignedDisplay = 0
            var Accompercentage = 0
            //if any of this two will have a value of 1, i will display the branch
            let baseAccom = 0
            
            value.fieldman.map((f_value,f_index)=>{
            var countAssigned = 0
            let uniqueCountFindings  = []
            let currentJoTypeAssign = f_value.assign.filter(item => item.jo_type === value.activeType )
            let currentJoTypeAccom = f_value.accom.filter(item => item.accom_jo_type === value.activeType )
            let currentJoTypeUploaded = f_value.uploaded.filter(item => item.accom_jo_type === value.activeType )

            if(f_value.accom.length > 0){
                if(baseAccom === 0){
                baseAccom = 1
                }
            }
            currentJoTypeAccom.forEach((obj) => {
                // totalAccomvsUpload
                uniqueCountFindings.push(obj.rover_unique_id)
            });

            currentJoTypeUploaded.forEach((obj) => {
                if(!JSON.stringify(uniqueCountFindings).includes(obj.rover_unique_id)){
                    uniqueCountFindings.push(obj.rover_unique_id)
                }
            });

            f_value.totalAccom = currentJoTypeAccom.length
            f_value.totalUpload = currentJoTypeUploaded.length
            count_AllAccom+=currentJoTypeAccom.length
            count_AllUpload+=currentJoTypeUploaded.length

            currentJoTypeAssign.map((a_value,a_index)=>{
                count_AllAssign+= parseInt(a_value.total)
                countAssigned+=parseInt(a_value.total)
            })


            f_value.totalAssigned = countAssigned
            accomIdentificator += parseInt(f_value.overall)
            })
         
            if(count_AllAssign > accomIdentificator){
                totalAssignedDisplay = count_AllAssign
            }else{
                totalAssignedDisplay = accomIdentificator
            }
            if(count_AlltotalJo > totalAssignedDisplay){
                finalJo = count_AlltotalJo
            }else{
                finalJo = totalAssignedDisplay
            }

            if(finalJo === 0){
                Accompercentage = (accomIdentificator / accomIdentificator) * 100
                
            }else{
                Accompercentage = (accomIdentificator / finalJo) * 100
            }
            
            if(isNaN(Accompercentage)){
            Accompercentage = 0
            }
           
            return <div key={index}>
                <div style={{position:'relative',display:'flex',justifyContent:'center'}}>
                    <div style={{width:'100%',position:'absolute',top:20}}>
                        <center>
                            {parseInt(finalJo) > parseInt(count_AllAssign)  &&
                            <Typography variant="h5" style={{color:'#4b4b4b'}} noWrap><b>{count_AllAssign}</b> Assigned </Typography>
                            }
                        </center>
                    </div>
                    <div style={{width:400,height:400,display:'flex',alignItems:'center',marginTop:25}}>
                        <FillChart totalAccom={accomIdentificator} Accompercentage={Accompercentage} totalJo={finalJo}/>
                    </div>
                    <div style={{position:'absolute',alignSelf:'center',display:'flex',bottom:-32,alignItems:'center'}}>
                        <div>
                            <div style={{display:'flex'}}>
                                <Typography variant="h6" style={{color:'#4b4b4b',marginTop:5}}> <b style={{color:'#2980b9'}}>{count_AllUpload}</b> UPLOADED </Typography>
                                <Typography variant="h6" style={{color:'#4b4b4b',marginTop:5,marginRight:15,marginLeft:15}}> | </Typography>
                                <Typography variant="h6" style={{color:'#4b4b4b',marginTop:5}}> <b style={{color:'#16a085'}}>{Math.abs(accomIdentificator - count_AllUpload)}</b> REALTIME </Typography>
                            </div>
                            {Math.abs(accomIdentificator - accomplishments) === 0
                                ?<></>
                                : <Typography variant="h6" style={{color:'#4b4b4b'}}><b>{Math.abs(accomIdentificator - accomplishments)}</b> BACKLOG ACCOMPLISHMENTS  </Typography>
                            }
                           
                        </div>
                        
                    </div>
                </div>
            </div>
        })}
    </>
    )
}
export default LiquidContainer
