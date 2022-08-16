// import React, { useEffect,useRef,useCallback } from 'react';
// import '../../../App';
// import Grid from '@material-ui/core/Grid';
// import { makeStyles } from '@material-ui/core/styles';
// import Typography from '@material-ui/core/Typography';
// /*import { getUsers, getJD } from '../Functions/home_func'*/
// import useStyles from '../../../css/css';
// import Breadcrumbs from '@material-ui/core/Breadcrumbs';
// import Link from '@material-ui/core/Link';
// import { NotificationContainer } from 'react-notifications';
// import { useSelector, useDispatch } from 'react-redux'
// import Backdrop from '@material-ui/core/Backdrop';
// import CircularProgress from '@material-ui/core/CircularProgress';
// import {
//   HashRouter as Router,
//   Route,
//   Redirect,
//   useHistory,
//   Link as NewLink
// } from "react-router-dom";
// import clsx from 'clsx';
// import Card from '@material-ui/core/Card';
// import CardHeader from '@material-ui/core/CardHeader';
// import CardMedia from '@material-ui/core/CardMedia';
// import CardContent from '@material-ui/core/CardContent';
// import CardActions from '@material-ui/core/CardActions';
// import Collapse from '@material-ui/core/Collapse';
// import Avatar from '@material-ui/core/Avatar';
// import IconButton from '@material-ui/core/IconButton';
// import { red } from '@material-ui/core/colors';
// import FavoriteIcon from '@material-ui/icons/Favorite';
// import ShareIcon from '@material-ui/icons/Share';
// import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
// import MoreVertIcon from '@material-ui/icons/MoreVert';
// import DirectionsWalkIcon from '@material-ui/icons/DirectionsWalk';
// import FullscreenIcon from '@material-ui/icons/Fullscreen';
// import VisibilityIcon from '@material-ui/icons/Visibility';
// import CloseIcon from '@material-ui/icons/Close';
// import Divider from '@material-ui/core/Divider';

// import Icon from '@material-ui/core/Icon';
// import Button from '@material-ui/core/Button';
// import ReplayIcon from '@material-ui/icons/Replay';
// import TextField from '@material-ui/core/TextField';
// import InputLabel from '@material-ui/core/InputLabel';
// import MenuItem from '@material-ui/core/MenuItem';
// import FormHelperText from '@material-ui/core/FormHelperText';
// import FormControl from '@material-ui/core/FormControl';
// import Select from '@material-ui/core/Select';

// import { getData } from "../../api/api";
// import PieCharts from './pie'
// import AroundPie from './aroundFill'
// import FillChart from './fillChart'
// import ClusteredChart from './clusteredAccom'
// import GraphicalAccom from './fieldmanAccom'
// import io from "socket.io-client";
// import moment from 'moment';
// import MapIcon from '@material-ui/icons/Map';
// import Meralco from '../../../assets/map image/meralco.png'
// import Maynilad from '../../../assets/map image/maynilad.png'
// import Primewater from '../../../assets/map image/prime.png'

// //page visibility when active or inactive
// import { usePageVisibility } from './utilities/visibility'
// import {
//   useCurrentVisibilityTimer,
//   useTotalVisibilityTimer
// } from "./utilities/timerIdentificator";

// import { AssignmentReturnedTwoTone } from '@material-ui/icons';
// // const socketData = io.connect("https://ws.greenzoneph.com");
// // const socketData = io.connect("http://192.168.0.10:4000");
// const socketData = io("https://ws.greenzoneph.com", { transports: ["websocket"] });
// const substyle = makeStyles((theme) => ({
//     root: {
//       maxWidth: 345,
//     },
//     media: {
//       height: 0,
//       paddingTop: '56.25%', // 16:9
//     },
//     expand: {
//       transform: 'rotate(0deg)',
//       marginLeft: 'auto',
//       transition: theme.transitions.create('transform', {
//         duration: theme.transitions.duration.shortest,
//       }),
//     },
//     expandOpen: {
//       transform: 'rotate(180deg)',
//     },
//     avatar: {
//       backgroundColor: red[500],
//     },
//     backdrop: {
//       zIndex: theme.zIndex.drawer + 1,
//       color: '#fff',
//   },
//   box:{
//     position:'relative',
//     backgroundColor:'black',
//     height:'8rem',
//     width:'8rem'
//   },
//   card: {
//     width:'100%',
//     display: "flex"
//   },
//   cardHeader: {
//     display: "block",
//     overflow: "hidden"
//   },
//   formControl: {
//     margin: theme.spacing(1),
//     minWidth: 120,
//   },
//   }));
// var selectedIndex = null
// let FeedIDs = []
// let UploadedIDs = []
// let activateBackup = null
// let idasdas= 0
// var jo_selected = "Show All"
// let joResponse= []
// let socketDataBackup= []
// let socketUploadBackup= []
// let pageDetector = 0
// let receivableTriggere = ""
// function Charts({scrollToBottom}) {
//     // const AnimationEffect = LesterStyle();
//     const subClasses = substyle();
//     const classes = useStyles();
//     const Dispatch = useDispatch();
//     const [state, setState] = React.useState(false);
//     const [refreshs, setrefreshs] = React.useState(false);
//     const [Idrefresh, setIdrefresh] = React.useState("");
//     const [socketIdentifier, setsocketIdentifier] = React.useState("");
//     const [expanded, setExpanded] = React.useState(false);
//     const [openLoader, setopenLoader] = React.useState(false);

//     const [testArray, settestArray] = React.useState([]);
//     const [responseState, setresponseState] = React.useState([]);
//     const history = useHistory()
//     const ParentPie = useSelector(state => state.realtimeReducer.InitialPies)
//     const accountUserID = useSelector(state => state.home_reducer.accountData)


//      // Custom timers which are affected by the page visibility
//     const isVisible = usePageVisibility();
//     // const timerVal = useCurrentVisibilityTimer(isVisible);
//     // const totalTimeVal = useTotalVisibilityTimer(isVisible);
    
//     // Change the title based on page visibility
//     if (isVisible) {
//       document.title = "Active";
//       pageDetector = 'Active'
//       if(activateBackup === false){  // so it will not triggered on initial render
//         activateBackup = true
//       }
//     } else {
//       document.title = "Inactive";
//       pageDetector = 'Inactive'
//       activateBackup = false
//     }
    
//       const getFunction=()=>{
//       setopenLoader(true)
//       getData('jls/getInitialData',localStorage.getItem('u'))
//         .then((response) => {
//           var findiCompanyID6 = ""
//           response.map((p_val,p_index)=>{
//             p_val.fieldman.map((fvalue,findex)=>{
//               fvalue.accom.map((avalue,aindex)=>{
//                 FeedIDs.push(avalue.rover_unique_id)
//               })
//               fvalue.uploaded.map((uvalue,uindex)=>{
//                 UploadedIDs.push(uvalue.rover_unique_id)
//               })
//             })
//           })
//           // let findCompny6 = response.filter(item => item.c_id === "6" && item.branch_field_work != "")
//           // if(findCompny6.length > 0){
//           //   findiCompanyID6 = findCompny6[0].branch_name
//           // }else{
//           //   let findCompny = response.filter(item => item.branch_field_work != "")
//           //   findiCompanyID6 = findCompny[0].branch_name
//           // }
//           // if(findiCompanyID6 != ""){
//           //   const IndexofBranch = response.findIndex(x => x.branch_name === findiCompanyID6)
//           //   selectedIndex = IndexofBranch
//           // }
          
//           joResponse = response
//           setopenLoader(false)
//           activatingSocket(response)
//         })
//       }

//       async function receivedRealtimeData(socketData){
//         await socketData.map((value,index)=>{
//           if(pageDetector === 'Active'){
//             const receiverId =  FeedIDs.indexOf(value.data.rover_unique);
//             if (receiverId === -1) {
//               FeedIDs.push(value.data.rover_unique)
//               joResponse.map((p_val,p_index)=>{
//                 const fieldmanID = p_val.fieldman.findIndex(x => x.user_id=== value.data.user_id)
//                 if (fieldmanID >= 0) {
//                   p_val.totalAccom = p_val.fieldman[fieldmanID].accom.length+1
//                   p_val.fieldman[fieldmanID].accom.push(value.data)
//                   p_val.lastAccomplished = socketData[socketData.length - 1].data.date_created
//                   setIdrefresh(value.data.rover_unique)
//                 }
//               })
//             }
//           }else if(pageDetector === 'Inactive'){
//             const receiverId =  FeedIDs.indexOf(value.data.rover_unique);
//             if (receiverId === -1) {
//               FeedIDs.push(value.data.rover_unique)
//               socketDataBackup.push(value)
//             }
//           }
//         })
//       }

//       async function receivedUploadedData(socketData){
//         await socketData.map((value,index)=>{
//           if(pageDetector === 'Active'){
//             const receiverId =  UploadedIDs.indexOf(value.rover_unique_id);
//             if (receiverId === -1) {
//               UploadedIDs.push(value.rover_unique_id)
//               joResponse.map((p_val,p_index)=>{
//                 const fieldmanID = p_val.fieldman.findIndex(x => x.user_id=== value.user_id)
//                 if (fieldmanID >= 0) {
//                   let dateUploaded = new Date()
//                   p_val.totalUpload = p_val.fieldman[fieldmanID].uploaded.length+1
//                   p_val.fieldman[fieldmanID].uploaded.push(value)
//                   p_val.lastUploaded = moment(dateUploaded).format('YYYY-MM-DD HH:mm:ss')
//                   setIdrefresh(value.rover_unique_id)
//                 }
//               })
//             }
//           }else if(pageDetector === 'Inactive'){
//             const receiverId =  UploadedIDs.indexOf(value.rover_unique_id);
//             if (receiverId === -1) {
//               UploadedIDs.push(value.rover_unique_id)
//               socketUploadBackup.push(value)
//             }
//           }
//         })
//       }

//       const socketFunction = () => {
//         socketData.on("new message", (data) => {
//             receivedRealtimeData(data)
//         });
//         socketData.on("new location", (data) => {
//         });
//         socketData.on("fieldplus upload", (data) => {
//           receivedUploadedData(data)
//         });
//       };

//       const activatingSocket=(response)=>{
//         socketFunction()

//       }

//       const receivableJo=()=>{
//           let loopCount = socketDataBackup.length
//           for (let index = 0; index < loopCount; index++) {
//               if(pageDetector === 'Active'){
//               const receiverId =  FeedIDs.indexOf(socketDataBackup[0].data.rover_unique);
//               if (receiverId === -1) {
//                 FeedIDs.push(socketDataBackup[0].data.rover_unique)
//                 for (let jid = 0; jid < joResponse.length; jid++) {
//                   const fieldmanID = joResponse[jid].fieldman.findIndex(x => x.user_id=== socketDataBackup[0].data.user_id)
//                   if (fieldmanID >= 0) {
//                     joResponse[jid].totalAccom = joResponse[jid].fieldman[fieldmanID].accom.length+1
//                     joResponse[jid].fieldman[fieldmanID].accom.push(socketDataBackup[0].data)
//                     joResponse[jid].lastAccomplished = socketDataBackup[socketDataBackup.length - 1].data.date_created
//                     setIdrefresh(socketDataBackup[0].data.rover_unique)
//                   }
//                 }
//               }
//               socketDataBackup.splice(0,1)
//             }
//           }
//       }

//       const receivableUpload=()=>{
//         let loopCount = socketUploadBackup.length
//         for (let index = 0; index < loopCount; index++) {
//             if(pageDetector === 'Active'){
//             const receiverId =  UploadedIDs.indexOf(socketUploadBackup[0].rover_unique_id);
//             if (receiverId === -1) {
//               UploadedIDs.push(socketUploadBackup[0].rover_unique_id)
//               for (let jid = 0; jid < joResponse.length; jid++) {
//                 const fieldmanID = joResponse[jid].fieldman.findIndex(x => x.user_id=== socketUploadBackup[0].user_id)
//                 if (fieldmanID >= 0) {
//                   let dateUploaded = new Date()
//                   joResponse[jid].totalUpload = joResponse[jid].fieldman[fieldmanID].uploaded.length+1
//                   joResponse[jid].fieldman[fieldmanID].uploaded.push(socketUploadBackup[0])
//                   joResponse[jid].lastUploaded = moment(dateUploaded).format('YYYY-MM-DD HH:mm:ss')
//                   setIdrefresh(socketUploadBackup[0].rover_unique_id)
//                 }
//               }
//             }
//             socketUploadBackup.splice(0,1)
//           }
//         }
//       }


    
//       useEffect(()=>{
//         getFunction()
//       },[])

//       useEffect(()=>{
//         if(activateBackup){
//           receivableJo()
//           receivableUpload()
//           activateBackup = false
//         }
//       },[pageDetector])
//     return (
//         <div className={classes.root}>
          
//           {selectedIndex != null &&
//             <>
//             {[joResponse[selectedIndex]].map((value,index)=>{
//               var last_received = ""
//               var last_uploadreceived = ""
//               let field_work = []
//               let count_AllAccom = 0
//               let count_AllUpload = 0
//               let count_AllAssign = 0
//               let count_AlltotalJo = 0
//               let totalAssignedDisplay = 0
//               let totalTobeValidate = 0
//               let firstValidate = 0
//               let secondValidate = 0
//               let widthAdjustment = 4
//               let imageDisplay = null
//               let multiplierTable = {}
                
//               if(value.validation_multiplier != ""){
//                 multiplierTable = JSON.parse(value.validation_multiplier)
//               }

//               if(String(value.branch_name).includes('Meralco')){
//                 imageDisplay = Meralco
//               }if(String(value.branch_name).includes('Maynilad')){
//                 imageDisplay = Maynilad
//               }if(String(value.branch_name).includes('Primewater')){
//                 imageDisplay = Primewater
//               }
              
//               if(value.branch_field_work != ""){
//                 field_work = JSON.parse(value.branch_field_work)
//               }

//               var fieldmanChart = []
//               let BranchFindinds = []
//               let newStructureFF = []

//               count_AlltotalJo = parseInt(value.total_jo[0].total)
//               value.fieldman.map((f_value,f_index)=>{
//                 var structureClustered = []
//                 var countAssigned = 0
//                 let finalAccomperMR = 0
//                 // var validatePerMR = 0
//                 f_value.totalAccom = f_value.accom.length
//                 count_AllAccom+=f_value.accom.length
//                 f_value.totalUpload = f_value.uploaded.length
//                 count_AllUpload+=f_value.uploaded.length

//                 let countFirstValidation = f_value.accom.filter(item => item.validator_remarks != null ).length
//                 let countSecondValidation = f_value.accom.filter(item => item.validation_validator != null).length
//                 f_value.assign.map((a_value,a_index)=>{
//                   count_AllAssign+= parseInt(a_value.total)
//                   countAssigned+=parseInt(a_value.total)
//                 })
//                 // f_value.accom.map(function(ary,index){
//                   f_value.accom.forEach((obj) => {
//                      let match =  BranchFindinds.findIndex(y => String(y.name).toUpperCase() === String(obj.accom_findings).toUpperCase())
//                      if(match === -1){
//                       BranchFindinds.push({ 'name':obj.accom_findings, 'count': 1 })
//                      }else{
//                       BranchFindinds[match]["count"] += 1
//                      }
//                   });

//                 var validateProduct = parseFloat(multiplierTable.multiplier) * f_value.accom.length
//                 if (f_value.accom.length <= parseInt(multiplierTable.min)){
//                   validateProduct =  f_value.accom.length
//                 }
//                 if(parseInt(validateProduct) < parseInt(multiplierTable.min)){
//                   if(f_value.accom.length > parseInt(multiplierTable.min)){
//                     validateProduct = parseInt(multiplierTable.min)
//                   }
//                 }

//                 if(f_value.accom.length > f_value.uploaded.length){
//                   finalAccomperMR = f_value.accom.length
//                 }else{
//                   finalAccomperMR = f_value.uploaded.length
//                 }

//                 totalTobeValidate += parseInt(validateProduct)
//                 firstValidate += countFirstValidation
//                 secondValidate += countSecondValidation
//                 f_value.totalAssigned = countAssigned
//                 structureClustered = {completename:f_value.completename,totalAccom:finalAccomperMR,totalAssigned:countAssigned}
//                 fieldmanChart.push(structureClustered)
//               })
//                 let finalJo = 0
//                 let finalUnasigned = 0
//                 let finalRemaining = 0

//                 //computing Realtime VS Upload
//                 let accomIdentificator = 0
//                 if(count_AllAccom > count_AllUpload){
//                   accomIdentificator = count_AllAccom
//                 }else{
//                   accomIdentificator = count_AllUpload
//                 }
                
//                 //computing the total of remaing jo, totalAssign - accomplished
//                 finalRemaining = count_AllAssign - accomIdentificator
//                 if(parseInt(finalRemaining) <=  0){
//                   finalRemaining = 0
//                 }
//                 if(JSON.stringify(value).includes('lastAccomplished')){
//                   last_received = moment(value.lastAccomplished).format('MMM DD, YYYY h:m:ss')
//                 }
//                 if(JSON.stringify(value).includes('lastUploaded')){
//                   last_uploadreceived = moment(value.lastUploaded).format('MMM DD, YYYY h:m:ss')
//                 }

//                 if(count_AllAssign > accomIdentificator){
//                   totalAssignedDisplay = count_AllAssign
//                 }else{
//                   totalAssignedDisplay = accomIdentificator
//                 }

//                 if(count_AlltotalJo > totalAssignedDisplay){
//                   finalJo = count_AlltotalJo
//                 }else{
//                   finalJo = totalAssignedDisplay
//                 }
//                 //computing the total of unassigned jo, finalJO - totalAssign
//                 finalUnasigned = count_AlltotalJo - count_AllAssign
//                 if(parseInt(finalUnasigned) <= 0){
//                   finalUnasigned = 0
//                 }

//                 var Accompercentage = 0
//                 if(finalJo === 0){
//                   Accompercentage = (accomIdentificator / accomIdentificator) * 100
//                 }else{
//                   Accompercentage = (accomIdentificator / finalJo) * 100
//                 }
//                 //for firstvalidation and revalidation
//                 let unrevalidated = totalTobeValidate - (firstValidate + secondValidate)
//                 var aroundPie = {
//                   parentPie:[{category: "Over All",value: totalTobeValidate,labelDisabled:true}],
//                   childPie:[
//                     {category: "Revalidated",value: secondValidate,color:'#1dd1a1'},
//                     {category: "First Validation",value: firstValidate,color:'#4b83ad',},
//                     {category: "Remaining",value: unrevalidated,color:'#aaa69d',labelDisabled:true}
//                   ]
//                 }
              

//                 // var array_gauge = {
//                 //   totalAssigned:totalAssignedDisplay,
//                 //   piechart:[
//                 //     //  {name:'Assigned',value:count_AllAssign,color:"#b2a8e3"},
//                 //     {name:'Unassigned',value:finalUnasigned,color:"#f3a683"},
//                 //     {name:'Remaining',value:finalRemaining,color:"#786fa6"},
//                 //     {name:'Accomplished',value:count_AllAccom,color:"#2ecc71"},
//                 //   ]
//                 // }
//               var fieldmanFiltered = fieldmanChart.filter(item => item.totalAccom != 0 || item.totalAssigned != 0)
//               let sortedAccom = fieldmanFiltered.sort((a,b) => b.totalAccom - a.totalAccom); 
//             return <div style={{width:'100%'}}>
//                     <div style={{width:'180vh',overflowX:'auto',marginBottom:10}}>
//                         <div style={{display:'grid',gridTemplateColumns:'auto auto auto auto'}}>
//                         {BranchFindinds.map((bal,balIndx)=>{
//                             return<div style={{gridRow:'1',height:100,width:200,backgroundColor:'#487eb0',marginRight:10}} key={index}>
//                               <div style={{position:'relative',width:'100%',height:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>
//                                 <Typography variant="h4" gutterBottom style={{color:'#fff',marginTop:10}} noWrap> <b>{bal.count}</b></Typography>
//                                 <div style={{position:'absolute',bottom:1,width:'100%',display:'flex',justifyContent:'center'}}>
//                                   <Typography variant="h5" style={{color:'#fff',fontSize:13,marginBottom:10}} noWrap> {bal.name} </Typography>
//                                 </div>
//                               </div>
//                             </div>
//                           })}
//                         </div>
//                     </div>
//                 <Grid container spacing={1} key={index}>
//                   <Grid item xs={12} md={3} >
//                     <Card className={classes.root}>
//                       <CardContent>
//                         <Grid container spacing={1}>
//                           <Grid item xs={12} md={12} >
//                             <div style={{ display: 'flex', justifyContent: 'flex-start', alignItems: 'center', height: 50, width: '100%' }}>
//                               <div style={{ marginLeft: 10, width: '85%' }}>
//                                 <Typography variant="h6" style={{ color: '#4b4b4b' }} noWrap><b>{value.branch_name}</b> </Typography>
//                                 <Typography variant="button" style={{ color: '#4b6584', fontSize: 15 }} display="block" noWrap mb={2}>{value.company_name} </Typography>
//                               </div>
//                             </div>
//                           </Grid>
//                         </Grid>
//                       <div style={{ position: 'relative', display: 'flex', justifyContent: 'center' }}>
//                         <div style={{ width: 350, height: 350, display: 'flex', alignItems: 'center' }}>
//                           <FillChart totalAccom={accomIdentificator} Accompercentage={Accompercentage} totalJo={finalJo} />
//                         </div>
//                         <div style={{ position: 'absolute', alignSelf: 'center', width: 400, height: 400, borderRadius: '50%' }}>
//                           <AroundPie pieId={'pieCharts' + index} aroundData={aroundPie} />
//                         </div>
//                         <div style={{position:'absolute',alignSelf:'center',display:'flex',bottom:-25,alignItems:'center'}}>
//                             <Typography variant="h5" gutterBottom style={{color:'#4b4b4b',marginTop:10}}> <b>{count_AllUpload}</b> </Typography>
//                             <Typography variant="h6" gutterBottom style={{color:'#4b4b4b',marginTop:13,marginLeft:5}}> UPLOADED</Typography>
//                         </div>
//                       </div>
//                       </CardContent>
//                       <CardActions disableSpacing>
//                         <Grid container spacing={1}>
//                           <Grid item xs={8} md={8}>
//                             <IconButton component={NewLink} to="/newmap" target="_blank" onClick={()=>{
//                               let joType = JSON.parse(value.branch_field_work)
//                               let currDate = new Date()
//                               let data = {
//                                 parameter: "branch_id",
//                                 selection: [value.b_id],
//                                 from: moment(currDate).format("YYYY-MM-DD"),
//                                 to: moment(currDate).format("YYYY-MM-DD"),
//                                 company_id: value.c_id,
//                                 jo_type: [joType[0]]
//                               }
//                             localStorage.setItem('onSelectSingleDateGraph',JSON.stringify(data))
//                               //  Dispatch({
//                               //   type:'InitializedPage',
//                               //   passDateStart:moment(currDate).format('YYYY-MM-DD'),
//                               //   passBranch:value.b_id,
//                               //   passJotype:field_work,
//                               //   passCompanyID:value.c_id,
//                               // })
//                               }}>
//                                 <MapIcon style={{color:'#27ae60'}}/>
//                             </IconButton>
//                           </Grid>
//                           <Grid item xs={4} md={4} style={{display:'flex',justifyContent:'flex-end'}}>
//                             {imageDisplay != null
//                                 ?<img src={imageDisplay} style={{ width: 55, height: 55}} />
//                                 : <Avatar aria-label="recipe" className={classes.avatar}>{String(value.company_name).charAt(0)}</Avatar>
//                             }
//                           </Grid>
//                         </Grid>
//                       </CardActions>
//                     </Card>
//                   </Grid>
//                   <Grid item xs={12} md={2}>
//                     <Card className={classes.root}>
//                       <CardContent>
//                         <div style={{display:'flex',justifyContent:'center'}}>
//                           <div style={{marginTop:20,width:'100%'}}>
//                             <div style={{marginBottom:10,height:100,width:'100%',backgroundColor:'#487eb0'}}>
//                               <div style={{position:'relative',width:'100%',height:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>
//                                 <Typography variant="h4" gutterBottom style={{color:'#fff',marginTop:10}}> <b>{count_AllAssign}</b></Typography>
//                                 <div style={{position:'absolute',bottom:1,width:'100%',display:'flex',justifyContent:'center'}}>
//                                   <Typography variant="h5" style={{color:'#fff',fontSize:13,marginBottom:10}}> ASSIGNED </Typography>
//                                 </div>
//                               </div>
//                             </div>
//                             <div style={{marginBottom:10,height:100,width:'100%',backgroundColor:'#58B19F'}}>
//                               <div style={{position:'relative',width:'100%',height:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>
//                                   <Typography variant="h4" gutterBottom style={{color:'#fff',marginTop:10}}> <b>{accomIdentificator}</b> </Typography>
//                                 <div style={{position:'absolute',bottom:1,width:'100%',display:'flex',justifyContent:'center'}}>
//                                   <Typography variant="h5" style={{color:'#fff',fontSize:13,marginBottom:10}}> ACCOMPLISHED </Typography>
//                                 </div>
//                               </div>
//                             </div>
//                             <div style={{marginBottom:10,height:100,width:'100%',backgroundColor:'#f39c12'}}>
//                               <div style={{position:'relative',width:'100%',height:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>
//                                 <Typography variant="h4" gutterBottom style={{color:'#fff',marginTop:10}}> <b>{finalUnasigned}</b>  </Typography>
//                                 <div style={{position:'absolute',bottom:1,width:'100%',display:'flex',justifyContent:'center'}}>
//                                   <Typography variant="h5" style={{color:'#fff',fontSize:13,marginBottom:10}}> UNASSIGNED </Typography>
//                                 </div>
//                               </div>
//                             </div>
//                             <div style={{marginBottom:10,height:100,width:'100%',backgroundColor:'#e74c3c'}}>
//                                 <div style={{position:'relative',width:'100%',height:'100%',display:'flex',justifyContent:'center',alignItems:'center'}}>
//                                   <Typography variant="h4" gutterBottom style={{color:'#fff',marginTop:10}}> <b>{finalRemaining}</b></Typography>
//                                 <div style={{position:'absolute',bottom:1,width:'100%',display:'flex',justifyContent:'center'}}>
//                                   <Typography variant="h5" style={{color:'#fff',fontSize:13,marginBottom:10}}> REMAINING </Typography>
//                                 </div>
//                               </div>
//                             </div>
//                           </div>
//                         </div>
//                       </CardContent>
//                     </Card>
//                   </Grid>
//                   <Grid item xs={12} md={7}>
//                     <Card className={classes.root}>
//                       <CardContent>
//                       <div style={{position:'relative'}}>
//                           {last_received != "" &&
//                               <Typography variant="overline" style={{marginLeft:10}}>Last Accomplishment : <b>{last_received}</b> | </Typography>
//                           }
//                           {last_uploadreceived != "" &&
//                           <Typography variant="overline" style={{marginLeft:10}}>Last Uploaded : <b>{last_uploadreceived}</b></Typography>
//                           }
//                           <br/>
//                             <Typography variant="overline" style={{marginLeft:10}}>VALIDATION : <b style={{fontSize:14}}>{totalTobeValidate}</b> <b style={{fontSize:14}}> | </b> FIRST VALIDATION : <b style={{fontSize:14}}>{firstValidate} </b> <b style={{fontSize:14}}> | </b> REVALIDATED : <b style={{fontSize:14}}>{secondValidate}</b></Typography>
//                           <Divider style={{marginTop:10}}/>
//                           <div style={{height:380,width:'100%',overflowY:'auto'}}>
//                             <ClusteredChart barID={'barChart'+index} fieldmanArr={sortedAccom}/>
//                           </div>
//                           <div style={{position:'absolute',top:-10,right:-10,display:'flex',justifyContent:'flex-end',width:'100%'}}>
//                             <IconButton 
//                               style={{backgroundColor:'#f5f6fa'}}
//                               aria-label="settings" 
//                               onClick={()=>{
//                                 selectedIndex = null
//                                 setState(!state)
//                               }}>
//                               <CloseIcon />
//                             </IconButton>
//                           </div>
//                         </div>
//                       </CardContent>
//                     </Card>
//                   </Grid>
//                 </Grid>
//               </div>
//             })} 
//             </>
//           }
//             <Divider style={{marginTop:10,marginBottom:10}}/>
//             <Grid container spacing={1}>
//               {joResponse.map((value,index)=>{
//                 var last_received = ""
//                 var last_uploadreceived = ""
//                 let field_work = []
//                 let count_AllAccom = 0
//                 let count_AllUpload = 0
//                 let count_AllAssign = 0
//                 let count_AlltotalJo = 0
//                 let totalAssignedDisplay = 0
//                 let totalTobeValidate = 0
//                 let firstValidate = 0
//                 let secondValidate = 0
//                 let widthAdjustment = 4
//                 let imageDisplay = null
//                 let multiplierTable = {}
                
//                 if(value.validation_multiplier != ""){
//                   multiplierTable = JSON.parse(value.validation_multiplier)
//                 }

//                 if(String(value.branch_name).includes('Meralco')){
//                   imageDisplay = Meralco
//                 }if(String(value.branch_name).includes('Maynilad')){
//                   imageDisplay = Maynilad
//                 }if(String(value.branch_name).includes('Primewater')){
//                   imageDisplay = Primewater
//                 }
                
//                 if(value.branch_field_work != ""){
//                   field_work = JSON.parse(value.branch_field_work)
//                 }
//                 var fieldmanChart = []
//                 count_AlltotalJo = parseInt(value.total_jo[0].total)
//                 value.fieldman.map((f_value,f_index)=>{
//                   var structureClustered = []
//                   var countAssigned = 0
//                   let finalAccomperMR = 0
//                   // var validatePerMR = 0
//                   f_value.totalAccom = f_value.accom.length
//                   f_value.totalUpload = f_value.uploaded.length
//                   count_AllAccom+=f_value.accom.length
//                   count_AllUpload+=f_value.uploaded.length

//                   let countFirstValidation = f_value.accom.filter(item => item.validator_remarks != null ).length
//                   let countSecondValidation = f_value.accom.filter(item => item.validation_validator != null).length

                 
//                   f_value.assign.map((a_value,a_index)=>{
//                     count_AllAssign+= parseInt(a_value.total)
//                     countAssigned+=parseInt(a_value.total)
//                   })
                  
//                   var validateProduct = parseFloat(multiplierTable.multiplier) * f_value.accom.length
//                   if (f_value.accom.length <= parseInt(multiplierTable.min)){
//                     validateProduct =  f_value.accom.length
//                   }
//                   if(parseInt(validateProduct) < parseInt(multiplierTable.min)){
//                     if(f_value.accom.length > parseInt(multiplierTable.min)){
//                       validateProduct = parseInt(multiplierTable.min)
//                     }
//                   }

//                   totalTobeValidate += parseInt(validateProduct)
//                   firstValidate += countFirstValidation
//                   secondValidate += countSecondValidation
//                   f_value.totalAssigned = countAssigned
//                   structureClustered = {completename:f_value.completename,totalAccom:f_value.accom.length,totalAssign:countAssigned}
//                   fieldmanChart.push(structureClustered)
//                   // unique_company.push(BranchFindinds)
//                 })
//                 let finalJo = 0
//                 let finalUnasigned = 0
//                 let finalRemaining = 0

//                 //computing Realtime VS Upload
//                 let accomIdentificator = 0
//                 if(count_AllAccom > count_AllUpload){
//                   accomIdentificator = count_AllAccom
//                 }else{
//                   accomIdentificator = count_AllUpload
//                 }
                
//                 //computing the total of remaing jo, totalAssign - accomplished
//                 finalRemaining = count_AllAssign - accomIdentificator
//                 if(parseInt(finalRemaining) <=  0){
//                   finalRemaining = 0
//                 }
//                 if(JSON.stringify(value).includes('lastAccomplished')){
//                   last_received = moment(value.lastAccomplished).format('MMM DD, YYYY h:m:ss')
//                 }
//                 if(JSON.stringify(value).includes('lastUploaded')){
//                   last_uploadreceived = moment(value.lastUploaded).format('MMM DD, YYYY h:m:ss')
//                 }
                
//                 if(count_AllAssign > accomIdentificator){
//                   totalAssignedDisplay = count_AllAssign
//                 }else{
//                   totalAssignedDisplay = accomIdentificator
//                 }

//                 if(count_AlltotalJo > totalAssignedDisplay){
//                   finalJo = count_AlltotalJo
//                 }else{
//                   finalJo = totalAssignedDisplay
//                 }
                
//                 //computing the total of unassigned jo, finalJO - totalAssign
//                 finalUnasigned = count_AlltotalJo - count_AllAssign
//                 if(parseInt(finalUnasigned) <= 0){
//                   finalUnasigned = 0
//                 }

//                 var Accompercentage = 0
//                 if(finalJo === 0){
//                   Accompercentage = (accomIdentificator / accomIdentificator) * 100
//                 }else{
//                   Accompercentage = (accomIdentificator / finalJo) * 100
//                 }

//                 //for firstvalidation and revalidation
//                 let unrevalidated = totalTobeValidate - (firstValidate + secondValidate)
//                 var aroundPie = {
//                   parentPie:[{category: "Over All",value: totalTobeValidate,labelDisabled:true}],
//                   childPie:[
//                     {category: "Revalidated",value: secondValidate,color:'#1dd1a1'},
//                     {category: "First Validation",value: firstValidate,color:'#4b83ad',},
//                     {category: "Remaining",value: unrevalidated,color:'#aaa69d',labelDisabled:true}
//                   ]
//                 }

//                 // var array_gauge = {
//                 //   totalAssigned:totalAssignedDisplay,
//                 //   piechart:[
//                 //     //  {name:'Assigned',value:count_AllAssign,color:"#b2a8e3"},
//                 //     {name:'Unassigned',value:finalUnasigned,color:"#f3a683"},
//                 //     {name:'Remaining',value:finalRemaining,color:"#786fa6"},
//                 //     {name:'Accomplished',value:count_AllAccom,color:"#2ecc71"},
//                 //   ]
//                 // }

//                 var fieldmanFiltered = fieldmanChart.filter(item => item.totalAccom != 0 || item.totalAssign != 0)
//                 // var fieldmanFiltered = value.fieldman.filter(item => item.totalAccom != 0);
//                 if(count_AllAssign > 0 || count_AllAccom > 0){
//                 return <Grid item xs={12} md={3} key={index}>
//                           <Card className={classes.root} style={{backgroundColor:selectedIndex === index ? '#bdc3c7' : '#fff'}}>
//                             <CardContent>
//                               {/* {count_AllUpload} */}
//                               <Grid container spacing={1}>
//                                   <Grid item xs={12} md={12} >
//                                       <div style={{display:'flex',justifyContent:'flex-start',alignItems:'center',height:50,width:'100%'}}>
//                                         <div style={{marginLeft:10,width:'85%'}}>
//                                           <Typography variant="h6" style={{color:selectedIndex === index ? '#fff' : '#4b4b4b'}} noWrap><b>{value.branch_name}</b> </Typography>
//                                           <Typography variant="button" style={{color:selectedIndex === index ? '#fff' : '#4b6584',fontSize:15}} display="block" noWrap mb={2}>{value.company_name} </Typography>
//                                         </div>
//                                       </div>
//                                   </Grid>
//                                 </Grid>
//                                 {/* count_AllAssign */}
//                                 <div style={{position:'relative',display:'flex',justifyContent:'center'}}>
//                                   <div style={{width:'100%',position:'absolute',top:15}}>
//                                     <center>
//                                       {parseInt(finalJo) > parseInt(count_AllAssign)  &&
//                                         <Typography variant="h5" style={{color:'#4b4b4b',fontSize:20}} noWrap><b>{count_AllAssign}</b> Assigned </Typography>
//                                       }
//                                     </center>
//                                   </div>
//                                   <div style={{width:350,height:350,display:'flex',alignItems:'center'}}>
//                                     <FillChart totalAccom={accomIdentificator} Accompercentage={Accompercentage} totalJo={finalJo}/>
//                                   </div>
//                                   <div style={{position:'absolute',alignSelf:'center',width:400,height:400,borderRadius:'50%'}}>
//                                     <AroundPie pieId={'pieCharts'+index} aroundData={aroundPie}/>
//                                   </div>
//                                   <div style={{position:'absolute',width:'100%',bottom:-25}}>
//                                       <div style={{width:'85%'}}>
//                                           {last_received != "" &&
//                                             <Typography variant="h6" style={{fontSize:14,color:selectedIndex === index ? '#fff' : '#4b4b4b'}} noWrap> Last Accomplished : <b>{last_received}</b></Typography>
//                                           }
//                                            {last_uploadreceived != "" &&
//                                             <Typography variant="h6" style={{fontSize:14,color:selectedIndex === index ? '#fff' : '#4b4b4b'}} noWrap> Last Uploaded : <b>{last_uploadreceived}</b></Typography>
//                                           }
//                                       </div>
//                                   </div>
//                                 </div>
//                               </CardContent>
//                             <CardActions disableSpacing>
//                               <Grid container spacing={1}>
//                                 <Grid item xs={8} md={8}>
//                                   <IconButton 
//                                     style={{color:selectedIndex === index ? '#fff' : '#4b4b4b'}}
//                                     aria-label="add to favorites" 
//                                     onClick={()=>{
//                                       scrollToBottom()
//                                       selectedIndex=index
//                                       setState(!state)
//                                     }}>
//                                     {fieldmanFiltered.length}/{value.fieldman.length}
//                                     <DirectionsWalkIcon style={{color:selectedIndex === index ? '#fff' : '#4b4b4b'}}/>
//                                   </IconButton>
//                                   <IconButton component={NewLink} to="/newmap" target="_blank" onClick={()=>{
//                                         let currDate = new Date()
//                                         let joType = JSON.parse(value.branch_field_work)
//                                         let data = {
//                                           parameter: "branch_id",
//                                           selection: [value.b_id],
//                                           from: moment(currDate).format("YYYY-MM-DD"),
//                                           to: moment(currDate).format("YYYY-MM-DD"),
//                                           company_id: value.c_id,
//                                           jo_type: [joType[0]]
//                                         }
//                                       localStorage.setItem('onSelectSingleDateGraph',JSON.stringify(data))                                     
//                                       }}>
//                                     <MapIcon style={{color:selectedIndex === index ? '#fff' : '#27ae60'}}/>
//                                   </IconButton>
//                                 </Grid>
//                                 <Grid item xs={4} md={4} style={{display:'flex',justifyContent:'flex-end'}}>
//                                       {imageDisplay != null
//                                           ?<img src={imageDisplay} style={{ width: 55, height: 55}} />
//                                           : <Avatar aria-label="recipe" className={classes.avatar}>{String(value.company_name).charAt(0)}</Avatar>
//                                       }
//                                 </Grid>
//                               </Grid>
//                             </CardActions>
//                           </Card>
//                         </Grid>
//                     }
//                   })}
//               </Grid>
//         <Backdrop className={subClasses.backdrop} open={openLoader}>
//           <CircularProgress color="inherit" />
//       </Backdrop>    
//     </div >
//   );
// }

// export default Charts;
