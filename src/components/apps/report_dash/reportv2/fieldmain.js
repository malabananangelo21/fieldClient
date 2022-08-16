import DateFnsUtils from '@date-io/date-fns'
import Backdrop from '@material-ui/core/Backdrop'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Checkbox from '@material-ui/core/Checkbox'
import CircularProgress from '@material-ui/core/CircularProgress'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import Divider from '@material-ui/core/Divider'
import FormControl from '@material-ui/core/FormControl'
import FormControlLabel from '@material-ui/core/FormControlLabel'
import FormGroup from '@material-ui/core/FormGroup'
import FormHelperText from '@material-ui/core/FormHelperText'
import FormLabel from '@material-ui/core/FormLabel'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import Input from '@material-ui/core/Input'
import InputAdornment from '@material-ui/core/InputAdornment'
import InputLabel from '@material-ui/core/InputLabel'
import List from '@material-ui/core/List'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import Paper from '@material-ui/core/Paper'
import Select from '@material-ui/core/Select'
import Snackbar from '@material-ui/core/Snackbar'
import { useTheme, withStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import AddIcon from '@material-ui/icons/Add'
import CachedIcon from '@material-ui/icons/Cached'
import FilterListIcon from '@material-ui/icons/FilterList'
import GetAppIcon from '@material-ui/icons/GetApp'
import GridOnIcon from '@material-ui/icons/GridOn'
import OpenInNewIcon from '@material-ui/icons/OpenInNew'
import PictureAsPdfIcon from '@material-ui/icons/PictureAsPdf'
import RemoveIcon from '@material-ui/icons/Remove'
import RotateLeftIcon from '@material-ui/icons/RotateLeft'
import RotateRightIcon from '@material-ui/icons/RotateRight'
import SearchIcon from '@material-ui/icons/Search'
import TableChartIcon from '@material-ui/icons/TableChart'
import ViewWeekIcon from '@material-ui/icons/ViewWeek'
import MuiAlert from '@material-ui/lab/Alert'
import Avatar from '@material-ui/core/Avatar';
import RefreshIcon from '@material-ui/icons/Refresh';
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider
} from '@material-ui/pickers'
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
import Carousel from 'react-material-ui-carousel'
import { useDispatch, useSelector } from 'react-redux'
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch'
import '../../../../App'
import NoImage from '../../../../assets/map image/no_image.png'
import useStyles from '../../../../css/css'
import {
  GetAccomCategories,
  getHandleBranch,
  getJOAuditFilterDashBoard,
  getJOAuditFilterDashBoardPDF,
  getUserLoginData,
  getLiquidChart
} from '../../Functions/home_func'
// import Mapa from '../../map/map'
// import LiquidContainer from './liquidContainer'
// import WidgetReport from './widget'
// import Toggling from './filterToggle'

import 'react-date-range/dist/styles.css' // main css file
import 'react-date-range/dist/theme/default.css' // theme css file
import { DateRange, DefinedRange } from 'react-date-range'
import Meralco from '../../../../assets/map image/meralco.png'
import Maynilad from '../../../../assets/map image/maynilad.png'
import Primewater from '../../../../assets/map image/prime.png'
import LoadingGif from '../../../../assets/map image/loading.gif'

import Breadheader from './breadcrumbs'
import ButContainer from './filteration/container'
import Widgets from './widgets'
import FieldTable from './fieldTable/table'
import LiquidContainer from './fillChart/liquidContainer'
import ProfileDialog from './dialogs/viewProfile'
function FieldReportv2 () {
  const home_reducer = useSelector(state => state.home_reducer)
  const dispatch = useDispatch()
  const dispatch_data = (type, data) => {
    dispatch({
      type: type,
      data: data
    })
  }
  const [refreshs, setrefreshs] = React.useState(0);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [dialogState, setdialogState] = React.useState({
    profileDialog:false
  });
  const [state, setState] = React.useState({
    exportType:"",
    columndata:[],
    img_data:[],
    accomCat: [],
    initialCat: [],
    exportCat: [],
    jo_images:[],
    accomplishments: [],
    accomplishment_display: [],
    master_accom:[],
    selected_branch: '',
    company: '',
    branch_name: '',
    company_logo: '',
    jo_type: [],
    selected_jo_type: [],
    business_area: [],
    selected_ba: '',
    select_findings: [],
    discon_findings:[],
    imagepdftable: [],
    pending_accom: [],
    accom_accom: [],
    total_accom: [],
    selection: {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    },
    selected_filter: 'ALL',
    finding: 'ALL',
    sub_findings:"ALL",
    status: 'ALL',
  })
  const [liquidChartArr_, setliquidChartArr_] = React.useState([])
  const searchinfo = React.useRef()
  const theme = useTheme()
  const classes = useStyles()
  
  const toggleSubmit=(fieldwork,ba,branch,AllBA)=>{
    dispatch_data('loader', true)
    setState((prev)=>({
      ...prev,
      selected_branch:branch.branch_id,
      company:branch.company_id,
      selected_ba:ba,
      business_area:AllBA,
      branch_name: branch.branch_company,
      selected_jo_type:[fieldwork]
    }))
    setliquidChartArr_([])
    // setSelected_jo_type([fieldwork])
    setTimeout(()=>{
      onSubmit(state.selection.startDate,state.selection.endDate,branch.branch_id,[fieldwork],ba,branch.company_id,AllBA)
      liquidFillAccomplishments(branch.branch_id,fieldwork,state.selection.startDate,state.selection.endDate,[ba])
    },200)
  }

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleDate=(item)=>{
    setState({ ...state, ...item })
  }

  const handleStatus=(value)=>{
    setState((prev)=>({
      ...prev,
      finding: 'ALL',
      status: value,
    }))
  }

  const handleFinding=(value)=>{
    setState((prev)=>({
      ...prev,
      finding: value,
    }))
  }

  const handleSubFinding=(selectedFinding,value)=>{
    setState((prev)=>({
      ...prev,
      finding: selectedFinding,
      sub_findings: value,
    }))
  }

  const handleDialogOpen=(dialogType,value)=>{
    if(dialogType === "viewProfile"){
      const images = state.jo_images.filter(val => val.jo_id == value.jo_id)
      var coordinates = value.coordinates.split(',')
      var latitude = coordinates[0]
      var longitude = coordinates[1]
      setdialogState((prev)=>({
        ...prev,
        profileDialog: true,
      }))
      setState((prev)=>({
        ...prev,
        columndata: [value],
        img_data:images
      }))
      dispatch_data('latitude', latitude)
      dispatch_data('longitude', longitude)
    }
  }

  const handleDialogClose=(dialogType)=>{
    if(dialogType === "viewProfile"){
      setdialogState((prev)=>({
        ...prev,
        profileDialog: false,
      }))
    }
  }

  const onSubmit =(startDate,endDate,selectedBranch,jo_type,selected_ba,company_id,AllBA)=> {
    let data = {
      date_filter: moment(startDate).format('YYYY-MM-DD'),
      date_filter_end: moment(endDate).format('YYYY-MM-DD'),
      branch: [selectedBranch],
      user_id: localStorage.getItem('u'),
      type: jo_type,
      ba: selected_ba
    }
    getJOAuditFilterDashBoard(data).then(response => {
      dispatch_data('loader', false)
      let rebindHeader = []
      let findings = []
      let disconFindings = []
      let countfindings = []
      let pending = []
      let accomplish = []
      let total = []
      let logo = ''
      let open_ = false
      let alertSuccess_ =false
      if (response.header.length != 0) {
        rebindHeader = response.header
      }else{
        rebindHeader = state.initialCat
      }
      dispatch_data('SelectedBranch', selectedBranch)
      dispatch_data('dateFrom', moment(startDate).format('LL'))
      dispatch_data('dateTo', moment(endDate).format('LL'))
      if (response.jobOrders.length != 0) {
        response.jobOrders.map(x => {
          
          let match = findings.findIndex(y => String(y).toUpperCase() === String(x.findings).toUpperCase())
          if(match === -1){
            findings.push(x.findings)
          }
          if(String(x.findings).toUpperCase() === "DISCONNECTED"){
            let matchSub = disconFindings.findIndex(y => String(y).toUpperCase() === String(x.installation).toUpperCase())
            if(matchSub === -1){
              disconFindings.push(x.installation)
            }
          }
        })
        let StringFindings = findings.findIndex(y => y === "")
        if(StringFindings > -1){
          findings[StringFindings] = "ALL"
        }
        disconFindings.unshift("ALL")
      //   open_ = false
      //   alertSuccess_ = true
      //   response.jobOrders.map(val => {
      //     if (val.date_accomplished !== '') {
      //       val['time_accomplished'] = moment(val.date_accomplished).format(
      //         'hh:mm A'
      //       )
      //     }
      //     if (val.date_accomplished !== '') {
      //       val.date_accomplished = moment(val.date_accomplished).format('LL')
      //     }
      //     let find = ''
      //     let match = false
      //     let arrycnt = []
      //     find = val.findings
      //     findings.map((val1, index) => {
      //       if (val1 === val.findings) {
      //         match = true
      //         countfindings[index]['count'] += 1
      //       }
      //     })
      //     if (!match) {
      //       countfindings.push({ type: val.findings, count: 1 })
      //       findings.push(val.findings)
      //     }
      //   })
        AllBA.map(val => {
          let pends = {BA: val, count: 0}
          let accoms = {BA: val, count: 0}
          let totals = {BA: val, count: 0}
          let pend_counting = 0
          let accom_counting = 0
          let total_counting = 0
          response.jobOrders.map(value => {
            if (value.BA === val && (value.date_accomplished === '' ||  value.date_accomplished === null)) {
              pend_counting++
              pends.count = pend_counting
            } else if (value.BA === val && value.date_accomplished !== '') {
              accom_counting++
              accoms.count = accom_counting
            }
            if (value.BA === val) {
              total_counting++
              totals.count = total_counting
            }
          })
          pending.push(pends)
          accomplish.push(accoms)
          total.push(totals)
        })


      let matchLogo = response.companies.findIndex(y => y.company_id === company_id)
      if(matchLogo > -1){
        logo = response.companies[matchLogo].logo_base64
      }
      // } else {
      //   setState(prev => ({
      //     ...prev,
      //     alertWarning: true
      //   }))
      }
      let reUnmutable = JSON.stringify(rebindHeader)
      setState((prev)=>({
        ...prev,
        initialCat:rebindHeader,
        exportCat:JSON.parse(reUnmutable),
        accomplishments: response.jobOrders,
        accomplishment_display: response.jobOrders,
        master_accom: response.jobOrders,
        jo_images: response.image,
        // open: open_,
        // alertSuccess: alertSuccess_,
        select_findings: findings,
        discon_findings:disconFindings,
        pending_accom: pending,
        accom_accom: accomplish,
        total_accom: total,
        company_logo: logo,
        // countfindings: countfindings
      }))
      setPage(0)

      // dispatch_data('loader', false)

    })
  }

  const initialFetchAccomplishment=(branches)=>{
    let curr_date = new Date()
    let jo_type = []
    let ba = []
    let BranchwithFieldWork = branches.filter(item => String(item.branch_field_work).trim() !== "" )
    if(BranchwithFieldWork.length > 0){
      jo_type = JSON.parse(BranchwithFieldWork[0].branch_field_work)
      if(BranchwithFieldWork[0].business_area != null){
        ba = JSON.parse(BranchwithFieldWork[0].business_area)
      }
    }
    setState((prev)=>({
      ...prev,
      selected_branch:BranchwithFieldWork[0].branch_id,
      company:BranchwithFieldWork[0].company_id,
      jo_type: jo_type,
      business_area:ba,
      selected_ba:"ALL",
      branch_name: BranchwithFieldWork[0].branch_company,
      selected_jo_type:[jo_type[parseInt(BranchwithFieldWork[0].default_jo_type)]]
    }))
    // setSelected_jo_type([jo_type[parseInt(BranchwithFieldWork[0].default_jo_type)]])
    setTimeout(()=>{
      onSubmit(curr_date,curr_date,BranchwithFieldWork[0].branch_id,[jo_type[parseInt(BranchwithFieldWork[0].default_jo_type)]],"ALL",BranchwithFieldWork[0].company_id,ba)
      liquidFillAccomplishments(BranchwithFieldWork[0].branch_id,jo_type[parseInt(BranchwithFieldWork[0].default_jo_type)],curr_date,curr_date,["ALL"])
    },200)
  }

  async function liquidFillAccomplishments(branch_id,active_type,start,end,ba){
    let chart_ = {
      user_id:localStorage.getItem('u'),
      branch_id:branch_id,
      jo_type:active_type,
      ba:ba,
      start:moment(start).format('YYYY-MM-DD'),
      end:moment(end).format('YYYY-MM-DD')
    }
    getLiquidChart(chart_).then(response => {
      if(Array.isArray(response)){
        let restruct_Arr = response
        restruct_Arr[0].activeType = active_type
        setliquidChartArr_(response)
      }
    })
  }

  async function fetchHandlerData(){
    Promise.all([
      await getHandleBranch({ user_id: localStorage.getItem('u') }),
      await GetAccomCategories()
    ])
    .then((res) => {
      initialFetchAccomplishment(res[0].response)
      dispatch_data('gethandleBranch', res[0].response)
      let reunmutable = JSON.stringify(res[1].initial)
      setState((prev)=>({
        ...prev,
        accomCat: res[1].data,
        initialCat: res[1].initial,
        exportCat:JSON.parse(reunmutable)
      }))
      dispatch_data('SelectedBranches', [])
    })
  }

  const onFilter = () => {
    let filtered = []
    let refiltered = []
    let selected_filter = ''
    let start = ''
    let end = ''
    if (state.status === 'ALL') {
      filtered = state.master_accom
    } else if (state.status === 'Pending') {
      filtered = state.master_accom.filter(
        val => val.date_accomplished === '' || val.date_accomplished === null
      )
    } else {
      refiltered = state.master_accom.filter(val => {
        if (val.date_accomplished !== '' && val.date_accomplished !== null) {
          if (state.finding === 'ALL') {
            return val
          } else if (state.finding === val.accom_findings) {
            start = String(val.accom_findings).replace('(', '__pstart')
            end = String(start).replace(')', '__pend')
            selected_filter = val.accom_findings
            return val
          }
        }
      })

      if(state.finding === "Disconnected"){
        if(state.sub_findings === "ALL"){
          filtered = refiltered
        }else{
          filtered =  refiltered.filter(val => val.installation === state.sub_findings)
        }
      }else{
        filtered = refiltered
      }
    }
    setState((prev)=>({
      ...prev,
      accomplishments: filtered,
      accomplishment_display: filtered,
      selected_filter: end
    }))
    setPage(0)
  }

  const handleExportField=(fields)=>{
    const currentIndex = state.exportCat.findIndex(x => String(x.category_details).toUpperCase() === String(fields.category_details).toUpperCase())
    if(currentIndex === -1){
        state.exportCat.push(fields)
        setrefreshs(!refreshs)
    }else{
        state.exportCat.splice(currentIndex, 1);
        setrefreshs(!refreshs)
    }
  }

  const handleChangeCustom = val => {
    const currentIndex = state.initialCat.findIndex(x =>String(x.category_details).toUpperCase() === String(val.category_details).toUpperCase())
    if(currentIndex === -1){
      state.initialCat.push(val)
      setrefreshs(!refreshs)
    }else{
        state.initialCat.splice(currentIndex, 1);
        setrefreshs(!refreshs)
    }
  }

  const onSubmitRefresh=()=>{
    dispatch_data('loader', true)
    setliquidChartArr_([])
    setTimeout(()=>{
      onSubmit(state.selection.startDate,state.selection.endDate,state.selected_branch,state.selected_jo_type,"ALL",state.company)
      liquidFillAccomplishments(state.selected_branch,state.selected_jo_type[0],state.selection.startDate,state.selection.endDate,["ALL"])
    },200)
  }

  const selectExportType=(val)=>{
    setState((prev)=>({
      ...prev,
      exportType: val,
    }))
  }

  const exportAccom=(type)=>{
    if(state.exportCat.length > 3){
      if(type === "PAGE"){
        let sel_filter = state.selected_filter
        let type_param = ''
        let startDate_ = moment(state.selection.startDate).format('YYYY-MM-DD')
        let endDate_ = moment(state.selection.endDate).format('YYYY-MM-DD')
        state.selected_jo_type.map(val => {
          if (type_param !== '') {
            type_param += '-'
          }
          type_param += val
        })
        if (
          state.selected_filter === '' ||
          state.selected_filter === 'ALL' ||
          state.selected_filter === null ||
          state.selected_filter === undefined
        ) {
          sel_filter = 'ALL'
        }
        window.open('http://api.workflow.gzonetechph.com/report/printingPDFAccom/' +startDate_ +'/'+endDate_ +'/'+state.selected_branch+'/'+type_param+'/'+state.selected_ba +'/'+sel_filter)
      }else if(type === "TABLE"){
        handleClickPrintDPF()
      }else if(type === "IMAGE"){
        onPrintperImage()
      }
    }else{
      alert('Please select at least 3 fields.')
    }
  }

  const handleClickPrintDPF = () => {
      dispatch_data('loader', true)
      if (state.selected_filter === '') {
        setState({
          ...state,
          selected_filter: 'ALL'
        })
      }
      let data = {
        image: state.jo_images
      }
      getJOAuditFilterDashBoardPDF(data).then(response => {
        setState({
          ...state,
          imagepdftable: response.images 
        })
        dispatch_data('loader', false)
        const unit = 'pt'
        const size = 'A4' // Use A1, A2, A3 or A4
        const orientation = 'landscape' // portrait or landscape
        const doc = new jsPDF(orientation, unit, size)
        let title =
          '(Date - ' +
          moment(state.selection.startDate).format('YYYY-MM-DD') +
          ' - ' +
          moment(state.selection.endDate).format('YYYY-MM-DD') + 
          ' ) ' +
          '(Company - ' +
          state.branch_name +
          ' ) ' +
          ' ( BA - ' +
          state.selected_ba +
          ' ) ' +
          ' ( Type - ' +
          state.selected_jo_type +
          ' ) ' +
          ' ( Findings - ' +
          state.selected_filter +
          ' ) ' +
          '( TABLE )'
        var img = new Image()
        img.src = state.company_logo 
        doc.addImage(state.company_logo, 'PNG', 650, 20, 120, 75)
        doc.setTextColor('#023554')
        doc.setFontSize(10)
        doc.text('SYSTEM GENERATED ACCOMPLISHMENT REPORT', 40, 35, {
          align: 'left'
        })
        doc.text('POWERED BY GZONETECH INC.', 40, 55, {
          align: 'left'
        })
        doc.setTextColor('#000000')
        doc.text(
          'CLIENT - ' +
          state.branch_name.toUpperCase(),
          40,
          75,
          { align: 'left' }
        )
        doc.text(
          String(moment(state.selection.startDate).format('LL').toUpperCase()) +
            ' - ' +
            String(moment(state.selection.startDate).format('LL').toUpperCase()) +
            ' - ' +
            'TYPE: ' +
            state.selected_jo_type.map(val => {
              return val.toUpperCase()
            }) +
            ' ( ' +
            state.selected_ba +
            ' ) ',
          40,
          95,
          {
            align: 'left'
          }
        )

        doc.autoTable({
          startY: 105,
          columnStyles: { cellWidth: 'auto' },
          styles: { fontSize: 6 },
          html: '#mytable',
          headerStyles: { CellHeight: 15, hAlign: 'center' },
          bodyStyles: { minCellHeight: 47, hAlign: 'center', valign: 'middle' },
          didDrawCell: function (data) {
            var td = data.cell.raw
            var img = td.getElementsByTagName('img')[0]
            var textPos = data.cell
            if (
              data.cell.raw.getElementsByTagName('img')[0] != undefined &&
              data.cell.raw.getElementsByTagName('img')[0] != ''
            ) {
              doc.addImage(img.src, textPos.x + 0, textPos.y + 5, 60, 20)
            } else {
            }
          }
        })
        doc.save(title + '.pdf')
      })
  }

  const onPrintperImage = () => {
    let sel_filter = state.selected_filter
    let type_param = ''
    state.selected_jo_type.map(val => {
      if (type_param !== '') {
        type_param += '-'
      }
      type_param += val
    })
    if (
      state.selected_filter === '' ||
      state.selected_filter === 'ALL' ||
      state.selected_filter === null ||
      state.selected_filter === undefined
    ) {
      sel_filter = 'ALL'
    }
    window.open(
      'http://api.workflow.gzonetechph.com/report/printingPDFAccomIMG/' +
        moment(state.selection.startDate).format('YYYY-MM-DD') +
        '/' +
        moment(state.selection.endDate).format('YYYY-MM-DD') +
        '/' +
        state.selected_branch +
        '/' +
        type_param +
        '/' +
        state.selected_ba +
        '/' +
        sel_filter
    )
  }

  const search_accom = e => {
    searchinfo.current.value = e.target.value
  }

  const submitsearch = () => {
    dispatch_data('loader', true)
    let accomSearch = state.accomplishments.filter(files => {
      return (
        (files.account_number !== null &&
          files.account_number !== '' &&
          files.account_number
            .toLowerCase()
            .indexOf(searchinfo.current.value.toLocaleLowerCase()) !== -1) ||
        (files.name !== null &&
          files.name !== '' &&
          files.name
            .toLowerCase()
            .indexOf(searchinfo.current.value.toLocaleLowerCase()) !== -1) ||
        (files.mru !== null &&
          files.mru !== '' &&
          files.mru
            .toLowerCase()
            .indexOf(searchinfo.current.value.toLocaleLowerCase()) !== -1) ||
        (files.fieldman_name !== null &&
          files.fieldman_name !== '' &&
          files.fieldman_name
            .toLowerCase()
            .indexOf(searchinfo.current.value.toLocaleLowerCase()) !== -1) ||
        (files.jo_id !== null &&
          files.jo_id !== '' &&
          files.jo_id
            .toLowerCase()
            .indexOf(searchinfo.current.value.toLocaleLowerCase()) !== -1) ||
        (files.meter_no !== null &&
          files.meter_no !== '' &&
          files.meter_no
            .toLowerCase()
            .indexOf(searchinfo.current.value.toLocaleLowerCase()) !== -1) ||
        (files.zone !== null &&
          files.zone !== '' &&
          files.zone
            .toLowerCase()
            .indexOf(searchinfo.current.value.toLocaleLowerCase()) !== -1) ||
        (files.seal_number !== null &&
          files.seal_number !== '' &&
          files.seal_number
            .toLowerCase()
            .indexOf(searchinfo.current.value.toLocaleLowerCase()) !== -1) ||
        (files.remarks !== null &&
          files.remarks !== '' &&
          files.remarks
            .toLowerCase()
            .indexOf(searchinfo.current.value.toLocaleLowerCase()) !== -1) ||
        (files.customer_meter_no !== null &&
          files.customer_meter_no !== '' &&
          files.customer_meter_no
            .toLowerCase()
            .indexOf(searchinfo.current.value.toLocaleLowerCase()) !== -1) ||
        (files.address !== null &&
          files.address !== '' &&
          files.address
            .toLowerCase()
            .indexOf(searchinfo.current.value.toLocaleLowerCase()) !== -1) ||
        (files.fieldman_name !== null &&
          files.fieldman_name !== '' &&
          files.fieldman_name
            .toLowerCase()
            .indexOf(searchinfo.current.value.toLocaleLowerCase()) !== -1)
      )
    })
    setState((prev)=>({
      ...prev,
      accomplishment_display: accomSearch
    }))
    dispatch_data('loader', false)
    setPage(0)
  }



  useEffect(() => {
    dispatch_data('loader', true)
    dispatch_data('getAccomplishments', [])
    dispatch_data('searchTable', [])
    dispatch_data('company_name', [])
    fetchHandlerData()
  }, [])
 
  return (
    <div className={classes.root}>
        <Breadheader 
          startDate={state.selection.startDate}
          endDate={state.selection.endDate}
          branch_name={state.branch_name}
          selected_jo_type={state.selected_jo_type}
          selected_ba={state.selected_ba}/>
        <Card variant="outlined">
          <CardContent>
              <Typography variant="h5"> <b style={{color:'#2980b9',marginBottom:30}}>Report's dashboard</b></Typography>
              <Card variant="outlined">
                <CardContent>
                  <ButContainer 
                    onSubmitRefresh={onSubmitRefresh}
                    toggleSubmit={toggleSubmit} 
                    handleDate={handleDate}
                    handleStatus={handleStatus}
                    handleFinding={handleFinding}
                    onFilter={onFilter}
                    selection={state.selection}
                    status={state.status}
                    select_findings={state.select_findings}
                    finding={state.finding}
                    accomCat={state.accomCat}
                    initialCat={state.initialCat}
                    exportCat={state.exportCat}
                    handleExportField={handleExportField}
                    handleChangeCustom={handleChangeCustom}
                    selectExportType={selectExportType}
                    exportType={state.exportType}
                    startDate={state.selection.startDate}
                    endDate={state.selection.endDate}
                    branch_name={state.branch_name}
                    selected_jo_type={state.selected_jo_type}
                    selected_ba={state.selected_ba}
                    accomplishment_display={state.accomplishment_display}
                    exportAccom={exportAccom}
                    discon_findings={state.discon_findings}
                    sub_findings={state.sub_findings}
                    handleSubFinding={handleSubFinding}
                    searchinfo={searchinfo}
                    search_accom={search_accom}
                    submitsearch={submitsearch}/>
                </CardContent>
              </Card>
              <Grid container spacing={1} style={{ marginTop: 10 }}>
                <Grid item xs={12} md={4}>
                  <Card variant="outlined">
                    <CardContent style={{height:600}}>
                      {liquidChartArr_.length > 0 
                        ? <LiquidContainer
                          liquidChartArr_={liquidChartArr_} 
                          accomplishments={state.accomplishments.reduce((count, value) => {
                            if (
                                value.date_accomplished !== '' &&
                                value.date_accomplished !== null
                            ) {
                                count++
                            }
                            return count
                            }, 0)}/>
                        :<div style={{width:'100%',height:400,display:'flex',alignItems:'center',justifyContent:'center',marginTop:25}}>
                          <div style={{height:350,width:350,backgroundColor:'#f5f6fa',borderRadius:175,display:'flex',alignItems:'center',justifyContent:'center'}}>
                            <div style={{height:320,width:320,backgroundColor:'#fff',borderRadius:160,display:'flex',alignItems:'center',justifyContent:'center'}}>
                              <img src={LoadingGif} style={{ width: 80, height: 80}} />
                            </div>
                          </div>
                        </div>
                      }
                    </CardContent>
                  </Card>
                </Grid>
                <Grid item xs={12} md={8}>
                  <Card variant="outlined">
                    <CardContent>
                      {/* widgets para sa total accom pending */}
                      <Widgets 
                        accomplishments={state.accomplishments}
                        accom_accom={state.accom_accom}
                        pending_accom={state.pending_accom}
                        total_accom={state.total_accom}/>
                      <Grid item md={12} sm={12} style={{ display: 'none' }}>
                        <TableContainer>
                          <Table className={classes.table} id='mytable'>
                            <TableHead>
                              <TableRow>
                                {state.exportCat.map(val => {
                                  return (
                                    <TableCell align='center'>
                                      {val.category_details}
                                    </TableCell>
                                  )
                                })}
                                <TableCell align='center'>Signature/Photo Evidence</TableCell>
                              </TableRow>
                            </TableHead>
                            <TableBody>
                              {state.accomplishment_display.map((val, index) => {
                                if (
                                  val.date_accomplished !== '' &&
                                  val.date_accomplished !== null
                                ) {
                                  return (
                                    <>
                                      <TableRow key={index}>
                                        {state.exportCat.map(val1 => {
                                          let value = val[val1.category_field]
                                          return (
                                            <TableCell
                                              align='center'
                                              style={{ fontSize: 10 }}>
                                              {value}
                                            </TableCell>
                                          )
                                        })}
                                        {state.imagepdftable.map(img => {
                                          if (img.jo_id === val.jo_id) {
                                            return (
                                              <TableCell align='center'>
                                                <img src={img.image_base64} />
                                              </TableCell>
                                            )
                                          }
                                        })}
                                      </TableRow>
                                    </>
                                  )
                                }
                              })}
                            </TableBody>
                          </Table>
                        </TableContainer>
                      </Grid>
                      <FieldTable 
                        page={page}
                        rowsPerPage={rowsPerPage}
                        handleChangePage={handleChangePage}
                        handleChangeRowsPerPage={handleChangeRowsPerPage}
                        initialHeader={state.initialCat} 
                        accomRecords={state.accomplishment_display}
                        handleDialogOpen={handleDialogOpen}/>
                    </CardContent>
                  </Card>
                </Grid>
              </Grid>
          </CardContent>
        </Card>

      <ProfileDialog 
        dialogState={dialogState} 
        handleDialogClose={handleDialogClose} 
        columndata={state.columndata} 
        initialCat={state.initialCat}
        img_data={state.img_data}/>

      

      <Backdrop
        style={{ zIndex: 9999 }}
        className={classes.backdrop}
        open={home_reducer.loader} >
        <CircularProgress color='inherit' />
      </Backdrop>
    </div>
  )
}
export default FieldReportv2
