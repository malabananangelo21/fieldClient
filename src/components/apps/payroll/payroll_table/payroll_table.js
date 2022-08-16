import Backdrop from '@material-ui/core/Backdrop'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import CircularProgress from '@material-ui/core/CircularProgress'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import FormControl from '@material-ui/core/FormControl'
import Grid from '@material-ui/core/Grid'
import InputLabel from '@material-ui/core/InputLabel'
import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
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
import Typography from '@material-ui/core/Typography'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import GetAppIcon from '@material-ui/icons/GetApp'
import GridOnIcon from '@material-ui/icons/GridOn'
import TableChartIcon from '@material-ui/icons/TableChart'
import MuiAlert from '@material-ui/lab/Alert'
import {
  StyleSheet
} from '@react-pdf/renderer'
import 'date-fns'
import jsPDF from 'jspdf'
import 'jspdf-autotable'
import moment from 'moment'
import React, { useEffect } from 'react'
import 'react-alice-carousel/lib/alice-carousel.css'
import ReactExport from 'react-data-export'
import { DateRange, DefinedRange } from 'react-date-range'
import 'react-date-range/dist/styles.css' // main css file
import 'react-date-range/dist/theme/default.css' // theme css file
import { useDispatch, useSelector } from 'react-redux'
import '../../../../App'
import useStyles from '../../../../css/css'
import {
  generateAccompBill, GetAccomCategories,
  getHandleBranch, getJOAuditFilterDashBoardPDF,
  getUserLoginData
} from '../../Functions/home_func'

const columns = [
  { id: 'type', label: 'Type' },
  { id: 'name', label: 'Name' },
  { id: 'findings', label: 'Findings' },
  { id: 'date', label: 'Date' },
  { id: 'count', label: 'Count' },
  { id: 'service_rate', label: 'Service Rate' },
  { id: 'total', label: 'Total' }
]

const ITEM_HEIGHT = 48
const ITEM_PADDING_TOP = 8
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
}

const ExcelFile = ReactExport.ExcelFile
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5'
  }
})(props => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center'
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center'
    }}
    {...props}
  />
))
function Alert (props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />
}
function Schedule_Table () {
  const home_reducer = useSelector(state => state.home_reducer)
  const dispatch = useDispatch()
  const dispatch_data = (type, data) => {
    dispatch({
      type: type,
      data: data
    })
  }
  const theme = useTheme()
  const classes = useStyles()
  const matches = useMediaQuery('(max-width:600px)')
  const [image, setImage] = React.useState(false)
  const [page, setPage] = React.useState(0)
  const [open, setOpen] = React.useState(false)
  const [rowsPerPage, setRowsPerPage] = React.useState(100)
  const handleChangePage = (event, newPage) => {
    setPage(newPage)
  }
  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }
  const fullScreen = useMediaQuery(theme.breakpoints.down('xl'))
  const [selected_jo_type, setSelected_jo_type] = React.useState([])
  const searchinfo = React.useRef()
  const [state, setState] = React.useState({
    branch_id: '',
    date_start: new Date(),
    date_end: new Date(),
    accomplishments: [],
    pdf_accomplishments: [],
    search: '',
    columndata: [],
    printdialog: false,
    customize: false,
    datadialog: false,
    reference: '',
    company: '',
    selectBranch: '',
    disable: true,
    loader: false,
    degree: 0,
    open: false,
    search: '',
    alertSuccess: false,
    alertWarning: false,
    alertError: false,
    alertBlank: false,
    vertical: 'top',
    horizontal: 'center',
    singleAccom: [],
    accomCat: [],
    initialCat: [],
    gilad: true,
    jason: false,
    antoine: false,
    branch_field_work: [],
    selected_branch: '',
    jo_type: [],
    selected_jo_type: '',
    selected_ba: '',
    printalldialog: false,
    printrowdata: [],
    printSeletedDialog: false,
    modal_jo_type: false,
    select_findings: [],
    master_accom: [],
    new_pdf_accomplishments: [],
    business_area: [],
    jo_images: [],
    filter_dialog: false,
    finding: 'ALL',
    status: 'ALL',
    img_data: [],
    pending_accom: [],
    accom_accom: [],
    total_accom: [],
    branch_name: '',
    accomplishment_display: [],
    company_logo: '',
    imagepdftable: [],
    countfindings: [],
    selected_filter: 'ALL',
    selection: {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection'
    },
    billing_array: [],
    payroll_array: []
  })
  const onChange = event => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    })
  }
  const onChangeStatus = e => {
    let find = ''
    let stat = ''
    if (e.target.value === 'Pending' || e.target.value === 'ALL') {
      find = 'ALL'
      stat = e.target.value
    } else {
      find = 'ALL'
      stat = e.target.value
    }
    setState({
      ...state,
      finding: find,
      status: stat
    })
  }
  useEffect(() => {
    dispatch_data('getAccomplishments', [])
    dispatch_data('searchTable', [])
    dispatch_data('company_name', [])
    async function handleBranch () {
      await getHandleBranch({ user_id: localStorage.getItem('u') }).then(
        response => {
          let company = []
          response.response.map(item => {
            let match = false
            company.map(val => {
              if (val.company_name == item.company_name) {
                match = true
              }
            })
            if (!match) {
              company.push({
                company_name: item.company_name,
                company_id: item.company_id
                // company_logo: item.logo_base64,
              })
            }
          })
          dispatch_data('gethandleBranch', response.response)
          dispatch_data('company_name', company)
          dispatch_data('SelectedBranches', [])
        }
      )
    }
    async function fetchAccountData () {
      await getUserLoginData().then(response => {
        response.user_login_data.map(val => {
          dispatch_data('accountData', val)
        })
      })
    }
    async function GetAccomCategory () {
      await GetAccomCategories().then(response => {
        setState({
          ...state,
          accomCat: response.data,
          initialCat: response.initial
        })
      })
    }
    setTimeout(() => {
      handleBranch()
      fetchAccountData()
      GetAccomCategory()
    }, 500)
  }, [])
  const handleClickOpen = () => {
    setState({
      ...state,
      open: true
    })
  }
  const handleClose = () => {
    setState({
      ...state,
      open: false
    })
  }
  const onChangeCompany = e => {
    const branches = home_reducer.handleBranch.filter(
      val => val.company_id == e.target.value
    )
    dispatch_data('SelectedBranches', branches)
    setState({
      ...state,
      company: e.target.value,
      jo_type: []
    })
  }
  const onChangeBranch = e => {
    setSelected_jo_type([])
    let jo_type = []
    let ba = []
    let branchname = ''
    home_reducer.SelectedBranches.map((val, index) => {
      if (val.branch_id === e.target.value) {
        if (val.branch_field_work !== '') {
          jo_type = JSON.parse(val.branch_field_work)
          ba = JSON.parse(val.business_area)
          branchname = val.branch_company
        } else {
          jo_type = JSON.parse(val.branch_field_work)
          ba = []
          branchname = val.branch_company
        }
      }
    })
    setState({
      ...state,
      selected_branch: e.target.value,
      jo_type: jo_type,
      business_area: ba,
      branch_name: branchname
    })
  }
  const { vertical, horizontal } = state
  const onSubmit = e => {
    e.preventDefault()
    if (
      moment(state.selection.startDate).format('YYYY-MM-DD') >
      moment(state.selection.endDate).format('YYYY-MM-DD')
    ) {
      setState({
        ...state,
        alertError: true
      })
    } else if (
      moment(state.selection.startDate).format('YYYY') ===
      moment('2020-01-01').format('YYYY')
    ) {
      alert(
        'The job orders for the year 2020 you need to generate are on the archive. Please email us with any questions or concerns.'
      )
    } else {
      dispatch_data('loader', true)
      let data = {
        parameter: 'branch_id',
        reference: state.reference,
        selection: state.selected_branch,
        date_start: moment(state.selection.startDate).format('YYYY-MM-DD'),
        type: '',
        date_end: moment(state.selection.endDate).format('YYYY-MM-DD'),
        company_id: state.company,
        jo_type: state.jo_type,
        ba: state.selected_ba
      }
      generateAccompBill(data).then(response => {
        dispatch_data('loader', false)
        if (response.billing.length !== 0) {
          setState(prev => ({
            ...prev,
            open: false,
            alertSuccess: true,
            payroll_array: response.payroll
          }))
        } else {
          setState(prev => ({
            ...prev,
            alertWarning: true
          }))
        }
      })
      setPage(0)
    }
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
    setState({
      ...state,
      accomplishment_display: accomSearch
    })
    dispatch_data('loader', false)
    setPage(0)
  }
  const onResets = () => {
    setState({
      ...state,
      accomplishments: state.master_accom,
      accomplishment_display: state.master_accom,
      selected_filter: ''
    })
    searchinfo.current.value = ''
    return 'return'
  }
  const search_accom = e => {
    searchinfo.current.value = e.target.value
  }
  const handleAlertSuccessClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setState({
      ...state,
      alertSuccess: false
    })
  }
  const handleAlertWarningClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setState({
      ...state,
      alertWarning: false
    })
  }
  const handleAlertErrorClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setState({
      ...state,
      alertError: false
    })
  }
  const handleAlertBlankClose = (event, reason) => {
    if (reason === 'clickaway') {
      return
    }

    setState({
      ...state,
      alertBlank: false
    })
  }
  const handleClickPrintDPF = () => {
    if (state.accomplishments.length === 0) {
      setState({
        ...state,
        alertBlank: true
      })
    } else {
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
          home_reducer.dateFrom +
          ' - ' +
          home_reducer.dateTo +
          ' ) ' +
          '(Company - ' +
          home_reducer.SelectedBranch[0].branch_company +
          ' ) ' +
          ' ( BA - ' +
          state.selected_ba +
          ' ) ' +
          ' ( Type - ' +
          selected_jo_type +
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
            home_reducer.SelectedBranch[0].branch_company.toUpperCase(),
          40,
          75,
          { align: 'left' }
        )
        doc.text(
          String(home_reducer.dateFrom.toUpperCase()) +
            ' - ' +
            String(home_reducer.dateTo.toUpperCase()) +
            ' - ' +
            'TYPE: ' +
            selected_jo_type.map(val => {
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
  }

  const handleClickNoExcelOpen = () => {
    setState({
      ...state,
      alertBlank: true
    })
  }
  const handleClickFilterClose = () => {
    setState({
      ...state,
      filter_dialog: false
    })
  }
  const handleChange = val => {
    let match = false
    state.initialCat.map((val1, index) => {
      if (val1.category_id === val.category_id) {
        match = true
        state.initialCat.splice(parseInt(index), 1)
      }
    })
    if (!match) {
      state.initialCat.push(val)
    }
    setState({
      ...state
    })
  }
  const handleImageOpen = data => {
    dispatch_data('image', data)
    setImage(true)
  }
  const handleImageClose = () => {
    setImage(false)
  }
  const styles = StyleSheet.create({
    page: {
      backgroundColor: '#fff',
      paddingBottom: 139
    },
    page2: {
      backgroundColor: '#fff',
      paddingBottom: 70
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1
    }
  })
  const handleListItemClick = (event, index, val) => {
    let jo_type = []
    let match = false
    selected_jo_type.map(va_data => {
      if (va_data != val) {
        jo_type.push(va_data)
      } else {
        match = true
      }
    })
    if (!match) {
      jo_type.push(val)
    }
    setSelected_jo_type(jo_type)
  }

  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleOpenMenu = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
  }
  const jotypeChange = e => {
    let jo_type = []
    jo_type.push(e.target.value)
    setSelected_jo_type(jo_type)
  }
  return (
    <div className={classes.root}>
      <Breadcrumbs aria-label='breadcrumb' style={{ margin: 10 }}>
        <Typography color='textPrimary'>Payroll</Typography>
        {state.selection.endDate != '' ? (
          <Typography color='textPrimary'>
            Date Range:&nbsp;
            {moment(state.selection.startDate).format('LL') +
              ' - ' +
              moment(state.selection.endDate).format('LL')}{' '}
          </Typography>
        ) : (
          undefined
        )}
        {state.branch_name != '' ? (
          <Typography color='textPrimary'>
            Branch:&nbsp;{state.branch_name}{' '}
          </Typography>
        ) : (
          undefined
        )}
        {selected_jo_type.length != 0 ? (
          <Typography color='textPrimary'>
            Type:&nbsp;
            {selected_jo_type.map(val => {
              return <span>{val};&nbsp;</span>
            })}
          </Typography>
        ) : (
          undefined
        )}
        {state.selected_ba != '' ? (
          <Typography color='textPrimary'>
            Business Area:&nbsp;{state.selected_ba}{' '}
          </Typography>
        ) : (
          undefined
        )}
      </Breadcrumbs>
      <Snackbar
        open={state.alertSuccess}
        autoHideDuration={6000}
        onClose={() => {
          handleAlertSuccessClose()
        }}
        key={(vertical, horizontal)}
        anchorOrigin={{ vertical, horizontal }}
      >
        <Alert onClose={handleAlertSuccessClose} severity='info'>
          Accomplishment generated successfully!
        </Alert>
      </Snackbar>
      <Snackbar
        open={state.alertWarning}
        autoHideDuration={6000}
        onClose={() => {
          handleAlertWarningClose()
        }}
        key={(vertical, horizontal)}
        anchorOrigin={{ vertical, horizontal }}
      >
        <Alert onClose={handleAlertWarningClose} severity='warning'>
          Accomplishment not found. Please try other date/s
        </Alert>
      </Snackbar>
      <Snackbar
        open={state.alertError}
        autoHideDuration={6000}
        onClose={() => {
          handleAlertErrorClose()
        }}
        key={(vertical, horizontal)}
        anchorOrigin={{ vertical, horizontal }}
      >
        <Alert onClose={handleAlertErrorClose} severity='error'>
          Invalid date range. Please select other date/s
        </Alert>
      </Snackbar>
      <Snackbar
        open={state.alertBlank}
        autoHideDuration={6000}
        onClose={() => {
          handleAlertBlankClose()
        }}
        key={(vertical, horizontal)}
        anchorOrigin={{ vertical, horizontal }}
      >
        <Alert onClose={handleAlertBlankClose} severity='error'>
          Please generate table first!
        </Alert>
      </Snackbar>
      <Grid container spacing={3}>
        <Grid
          item
          md={12}
          style={{ display: 'flex', justifyContent: 'flex-start' }}
        >
          <Button
            size='small'
            variant='contained'
            style={{ backgroundColor: 'rgba(6,86,147)', color: 'white' }}
            className={classes.button}
            onClick={handleClickOpen}
            endIcon={<TableChartIcon />}
          >
            Generate Billing
          </Button>

          {home_reducer.accountData.btn_priv !== 0 ? (
            <Button
              aria-controls='customized-menu'
              aria-haspopup='true'
              variant='contained'
              style={{
                backgroundColor: 'rgba(6,86,147)',
                color: 'white',
                marginLeft: 10
              }}
              onClick={handleOpenMenu}
              endIcon={<GetAppIcon />}
            >
              EXPORT
            </Button>
          ) : (
            undefined
          )}
          <StyledMenu
            id='customized-menu'
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleCloseMenu}
          >
            {state.payroll_array.length === 0 ? (
              <>
                <MenuItem
                  onClick={() => {
                    handleClickNoExcelOpen()
                  }}
                >
                  <ListItemIcon>
                    <GridOnIcon fontSize='small' />
                  </ListItemIcon>
                  <ListItemText primary='EXCEL' />
                </MenuItem>
              </>
            ) : (
              <>
                <ExcelFile
                  filename={
                    state.branch_name +
                    'Date: ' +
                    '(' +
                    moment(state.selection.startDate).format('LL') +
                    '-' +
                    moment(state.selection.endDate).format('LL') +
                    ') ' +
                    'Business Area: ' +
                    '(' +
                    state.selected_ba +
                    ') '
                  }
                  element={
                    <MenuItem>
                      <ListItemIcon>
                        <GridOnIcon fontSize='small' />
                      </ListItemIcon>
                      <ListItemText primary='EXCEL' />
                    </MenuItem>
                  }
                >
                  <ExcelSheet data={state.payroll_array} name='Billing'>
                    {columns.map(val => {
                      return <ExcelColumn label={val.label} value={val.id} />
                    })}
                  </ExcelSheet>
                </ExcelFile>
              </>
            )}
          </StyledMenu>
        </Grid>
      </Grid>
      <Grid container spacing={2}>
        <Grid item md={12} sm={12}>
          <Paper>
            <TableContainer
              id='accom_table'
              className={classes.container}
              style={{ maxHeight: 400, maxWidth: '96vw' }}
              size='small'
            >
              <Table size='small' stickyHeader style={{ whiteSpace: 'nowrap' }}>
                <TableHead>
                  {columns.map(column => (
                    <TableCell
                      key={column.id}
                      style={{
                        backgroundColor: 'rgba(6,86,147)',
                        color: 'white'
                      }}
                    >
                      {column.label}
                    </TableCell>
                  ))}
                </TableHead>

                <TableBody>
                  {state.payroll_array
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map(row => {
                      return (
                        <TableRow
                          hover
                          role='checkbox'
                          tabIndex={-1}
                          key={row.code}
                        >
                          {columns.map(column => {
                            let value = row[column.id]
                            if (column.id === 'date') {
                              if (
                                row[column.category_field] === '' ||
                                row[column.category_field] === null
                              ) {
                                value = ''
                              } else {
                                value = moment(row[column.id]).format('LL')
                              }
                            }
                            return (
                              <TableCell key={column.id} align={column.align}>
                                {column.format && typeof value === 'number'
                                  ? column.format(value)
                                  : value}
                              </TableCell>
                            )
                          })}
                        </TableRow>
                      )
                    })}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[100, 500, 1000]}
              component='div'
              count={state.payroll_array.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </Paper>
        </Grid>
      </Grid>
      <Dialog
        fullWidth
        maxWidth='md'
        open={state.open}
        onClose={handleClose}
        aria-labelledby='responsive-dialog-title'
      >
        <DialogTitle id='simple-dialog-title'>Generate Billing</DialogTitle>
        <DialogContent>
          <form onSubmit={onSubmit}>
            <Grid container spacing={1}>
              <Grid item xs={12} md={12}>
                <center
                  style={{
                    display: 'flex',
                    flexDirection: 'row',
                    justifyContent: 'flex-start'
                  }}
                >
                  <DefinedRange
                    onChange={item => setState({ ...state, ...item })}
                    ranges={[state.selection]}
                  />
                  <DateRange
                    editableDateInputs={true}
                    autoFocus={true}
                    months={2}
                    direction='horizontal'
                    moveRangeOnFirstSelection={false}
                    onChange={item => setState({ ...state, ...item })}
                    ranges={[state.selection]}
                  />
                </center>
              </Grid>
              <Grid item xs={12} md={12}>
                <Card variant='outlined'>
                  <CardContent>
                    <Grid container spacing={1}>
                      <Grid item xs={12} md={4}>
                        <FormControl
                          variant='outlined'
                          required
                          size='small'
                          className={classes.formControl}
                        >
                          <InputLabel id='demo-simple-select-outlined-label'>
                            Company
                          </InputLabel>
                          <Select
                            labelId='demo-simple-select-outlined-label'
                            id='demo-simple-select-outlined'
                            onChange={onChangeCompany}
                            label='Company'
                            name='company'
                            value={state.company}
                          >
                            {home_reducer.company_name.map(val => {
                              return (
                                <MenuItem value={val.company_id}>
                                  {val.company_name}
                                </MenuItem>
                              )
                            })}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <FormControl
                          variant='outlined'
                          required
                          size='small'
                          className={classes.formControl}
                          value={state.selected_branch}
                        >
                          <InputLabel id='demo-simple-select-outlined-label'>
                            Branch
                          </InputLabel>
                          <Select
                            labelId='demo-simple-select-outlined-label'
                            id='demo-simple-select-outlined'
                            onChange={onChangeBranch}
                            label='branch'
                            name='branch_id'
                          >
                            {home_reducer.SelectedBranches.map((val, index) => {
                              return (
                                <MenuItem value={val.branch_id}>
                                  {val.branch_company}
                                </MenuItem>
                              )
                            })}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={4}>
                        <FormControl
                          variant='outlined'
                          required
                          size='small'
                          className={classes.formControl}
                        >
                          <InputLabel id='demo-simple-select-outlined-label'>
                            Select Business Area
                          </InputLabel>
                          <Select
                            value={state.selected_ba}
                            name='selected_ba'
                            onChange={onChange}
                          >
                            <MenuItem value='ALL'>All</MenuItem>
                            {state.business_area.length === 0
                              ? undefined
                              : state.business_area.map(val => {
                                  return <MenuItem value={val}>{val}</MenuItem>
                                })}
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={12}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end'
                  }}
                >
                  <Button
                    type='submit'
                    variant='contained'
                    style={{
                      backgroundColor: 'rgba(6,86,147)',
                      color: 'white',
                      margin: 15
                    }}
                  >
                    Submit
                  </Button>
                </div>
              </Grid>
            </Grid>
          </form>
        </DialogContent>
      </Dialog>
      <Backdrop
        style={{ zIndex: 9999 }}
        className={classes.backdrop}
        open={home_reducer.loader}
      >
        <CircularProgress color='inherit' />
      </Backdrop>

      <Backdrop
        style={{ zIndex: 9999 }}
        className={classes.backdrop}
        open={state.loader}
      >
        <CircularProgress color='inherit' />
      </Backdrop>
    </div>
  )
}
export default Schedule_Table
