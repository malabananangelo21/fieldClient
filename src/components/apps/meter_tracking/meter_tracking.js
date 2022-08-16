import Backdrop from '@material-ui/core/Backdrop'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import Button from '@material-ui/core/Button'
import ButtonGroup from '@material-ui/core/ButtonGroup'
import CircularProgress from '@material-ui/core/CircularProgress'
import Dialog from '@material-ui/core/Dialog'
import DialogContent from '@material-ui/core/DialogContent'
import DialogTitle from '@material-ui/core/DialogTitle'
import FormControl from '@material-ui/core/FormControl'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import InputAdornment from '@material-ui/core/InputAdornment'
import InputLabel from '@material-ui/core/InputLabel'
import Link from '@material-ui/core/Link'
import MenuItem from '@material-ui/core/MenuItem'
import OutlinedInput from '@material-ui/core/OutlinedInput'
import Paper from '@material-ui/core/Paper'
import Select from '@material-ui/core/Select'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TablePagination from '@material-ui/core/TablePagination'
import TableRow from '@material-ui/core/TableRow'
import Typography from '@material-ui/core/Typography'
import AddIcon from '@material-ui/icons/Add'
import BurstModeIcon from '@material-ui/icons/BurstMode'
import MapIcon from '@material-ui/icons/Map'
import OpenInNewIcon from '@material-ui/icons/OpenInNew'
import RemoveIcon from '@material-ui/icons/Remove'
import RotateLeftIcon from '@material-ui/icons/RotateLeft'
import RotateRightIcon from '@material-ui/icons/RotateRight'
import SearchIcon from '@material-ui/icons/Search'
import TableChartIcon from '@material-ui/icons/TableChart'
import moment from 'moment'
import React from 'react'
import 'react-alice-carousel/lib/alice-carousel.css'
import Carousel from 'react-material-ui-carousel'
import { useDispatch, useSelector } from 'react-redux'
import { TransformComponent, TransformWrapper } from 'react-zoom-pan-pinch'
import '../../../App'
import useStyles from '../../../css/css'
import { MeterTracking, MeterTrackingHistory } from '../Functions/home_func'
const columns = [
  { id: 'account_no', label: 'Account Number' },
  { id: 'completename', label: 'Account Name' },
  { id: 'cust_address', label: 'Address' },
  { id: 'cust_type', label: 'Account Type' },
]

const inside = [
  { id: 'account_number', label: 'Account No.' },
  { id: 'address', label: 'Account Address' },
  { id: 'accom_findings', label: 'Account Findings' },
  { id: 'date_accom', label: 'Date Accomplished' },
  { id: 'accom_fieldman_name', label: 'Fieldman' },
  { id: 'coordinates', label: 'Location' },
  { id: 'accom_images', label: 'Image Count' }
]

function Index() {
  const home_reducer = useSelector(state => state.home_reducer)
  const dispatch = useDispatch()
  const dispatch_data = (type, data) => {
    dispatch({
      type: type,
      data: data
    })
  }
  const classes = useStyles()
  const searchinfo = React.useRef()
  const [page, setPage] = React.useState(0)
  const [rowsPerPage, setRowsPerPage] = React.useState(100)
  const [state, setState] = React.useState({
    search: '',
    selected_ba: '',
    date_start: new Date(),
    date_end: new Date(),
    company: '',
    selected_branch: '',
    open: false,
    data_dialog: false,
    imageopen: false,
    meterlist: [],
    mastercounter: 0,
    customer_info: [],
    customer_history: [],
    customer_images: [],
    degree: 0
  })
  const onSubmit = e => {
    e.preventDefault()
    let data = {
      company_id: state.company,
      branch_id: state.selected_branch,
      page: page + 1,
      limit: 100,
      search: ''
    }
    MeterTracking(data).then(response => {
      setState({
        ...state,
        meterlist: response.data,
        mastercounter: response.total_count,
        open: false
      })
    })
  }
  const handleChangePage = (event, newPage) => {
    let data = {
      company_id: state.company,
      branch_id: state.selected_branch,
      page: newPage + 1,
      limit: 100,
      search: ''
    }
    MeterTracking(data).then(response => {
      setState({
        ...state,
        meterlist: response.data
      })
    })
    setPage(newPage)
  }
  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value)
    setPage(0)
  }
  const onChangeCompany = e => {
    const branches = home_reducer.handleBranch.filter(
      val => val.company_id == e.target.value
    )
    dispatch_data('SelectedBranches', branches)
    setState({
      ...state,
      company: e.target.value
    })
  }
  const onChangeBranch = e => {
    setState({
      ...state,
      selected_branch: e.target.value
    })
  }
  const handleClickOpen = () => {
    setState({
      ...state,
      open: true
    })
  }
  const handleClickClose = () => {
    setState({
      ...state,
      open: false
    })
  }
  const handleImageOpen = row => {
    setState({
      ...state,
      imageopen: true,
      data_dialog: false,
      customer_images: JSON.parse(row.accom_images)
    })
  }
  const handleImageClose = () => {
    setState({
      ...state,
      imageopen: false,
      data_dialog: true
    })
  }
  const handleDataOpen = info => {
    setTimeout(() => {
      meterHistory(info)
    }, 200)
  }
  const meterHistory = info => {
    var date = new Date(),
      y = date.getFullYear(),
      m = date.getMonth()
    var firstDay = new Date(y, m, 1)
    var lastDay = new Date(y, m + 1, 0)
    let data = {
      date_start: moment(firstDay).format('YYYY-MM-DD'),
      date_end: moment(lastDay).format('YYYY-MM-DD'),
      branch_id: state.selected_branch,
      account_number: info.account_no
    }
    MeterTrackingHistory(data).then(response => {
      setState(prev => ({
        ...prev,
        customer_history: response,
        loader: false,
      }))
    })
  }
  const handleDataClose = () => {
    setState({
      ...state,
      data_dialog: false
    })
  }
  const search_accom = e => {
    searchinfo.current.value = e.target.value
  }
  const submitsearch = () => {
    let data = {
      company_id: state.company,
      branch_id: state.selected_branch,
      page: 1,
      limit: 10,
      search: searchinfo.current.value
    }

    MeterTracking(data).then(response => {
      setState({
        ...state,
        meterlist: response.data,
        mastercounter: response.total_count
      })
    })
    setPage(0)
  }
  return (
    <div className={classes.root}>
      <Backdrop
        style={{ zIndex: 9999 }}
        className={classes.backdrop}
        open={state.loader}
      >
        <CircularProgress color='inherit' />
      </Backdrop>
      <Grid container spacing={2}>
        <Grid item xs={12} md={12}>
          <Breadcrumbs aria-label="breadcrumb" style={{ margin: 10 }}>
            <Link style={{ color: '#3973b6', fontWeight: 'bold', fontSize: 17 }} href="#/">Home Page</Link>
            <Typography style={{ color: '#444b5a', fontWeight: 'bold', fontSize: 17 }}>Master List</Typography>
            <Typography style={{ color: '#444b5a', fontWeight: 'bold', fontSize: 17 }}>{state.branch_name}</Typography>
          </Breadcrumbs>
        </Grid>
        <Grid
          item
          md={9}
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
            Generate
          </Button>
        </Grid>
        <Grid item md={3}>
          <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <FormControl id='searchinput' size='small' variant='outlined'>
              <InputLabel>Search</InputLabel>
              <OutlinedInput
                inputRef={searchinfo}
                onChange={e => {
                  search_accom(e)
                }}
                endAdornment={
                  <InputAdornment position='end'>
                    <IconButton
                      onClick={() => {
                        submitsearch()
                      }}
                    >
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </div>
        </Grid>
        <Grid item xs={12} md={12}>
          <Paper>
            <TableContainer
              id='accom_table'
              className={classes.container}
              style={{ maxHeight: '60vh', maxWidth: '96vw' }}
              size='small'
            >
              <Table size='small' stickyHeader style={{ whiteSpace: 'nowrap', }}>
                <TableHead>
                  <TableRow>
                    <TableCell
                      style={{
                        backgroundColor: 'rgba(6,86,147)',
                        color: 'white',
                        borderBottomColor: 'rgba(6,86,147)',
                        width: '25%'
                      }}
                    >
                      Action
                    </TableCell>
                    {columns.map(column => (
                      <TableCell
                        key={column.id}
                        style={{
                          backgroundColor: 'rgba(6,86,147)',
                          color: 'white',
                          borderBottomColor: 'rgba(6,86,147)',
                          width: '25%'
                        }}
                      >
                        {column.label}
                      </TableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {state.meterlist.map(row => {
                    return (
                      <TableRow
                        hover
                        role='checkbox'
                        tabIndex={-1}
                        key={row.code}
                      >
                        <TableCell>
                          <OpenInNewIcon
                            style={{
                              width: '25%',
                              cursor: 'pointer',
                              color: 'rgba(6,86,147)'
                            }}
                            onClick={() => {
                              setState({
                                ...state,
                                data_dialog: true,
                                loader: true,
                                customer_info: row,
                                customer_history: []
                              })
                              handleDataOpen(row)
                            }}
                          />
                        </TableCell>
                        {columns.map(column => {
                          let value = row[column.id]
                          return (
                            <TableCell
                              key={column.id}
                              align={column.align}
                              style={{ width: '25%' }}
                            >
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
              rowsPerPageOptions={[100]}
              component='div'
              count={state.mastercounter}
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
        maxWidth='xs'
        open={state.open}
        onClose={handleClickClose}
        aria-labelledby='responsive-dialog-title'
      >
        <DialogTitle id='simple-dialog-title'>
          Generate Accomplishments
        </DialogTitle>
        <DialogContent>
          <form onSubmit={onSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={12}>
                <FormControl
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
              <Grid item xs={12} md={12}>
                <FormControl
                  required
                  size='small'
                  className={classes.formControl}
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
            </Grid>
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
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
          </form>
        </DialogContent>
      </Dialog>

      <Dialog
        fullWidth
        maxWidth='md'
        open={state.data_dialog}
        onClose={handleDataClose}
        aria-labelledby='responsive-dialog-title'
      >
        <DialogTitle id='simple-dialog-title'>
          <Typography color='textPrimary'>Meter Details</Typography>
        </DialogTitle>
        <DialogContent>
          <table style={{ width: '100%', marginBottom: 20 }}>
            <tbody>
              <tr>
                <td>CUSTOMER NAME: {state.customer_info.completename}</td>
                <td>ACCOUNT NUMBER: {state.customer_info.account_no}</td>
              </tr>
              <tr>
                <td>CUSTOMER ADDRESS: {state.customer_info.cust_address}</td>
                <td>
                  CUSTOMER LOCATION:{' '}
                  {state.customer_info.cust_location === ''
                    ? '0.0'
                    : state.customer_info.cust_location}
                </td>
              </tr>
              <tr>
                <td>COORDINATES: {state.customer_info.cust_coordinates}</td>
                <td>TYPE: {state.customer_info.cust_type}</td>
              </tr>
              <tr>
                <td>CONTACT EMAIL: {state.customer_info.cust_contact_email}</td>
                <td>
                  CONTACT NUMBER: {state.customer_info.cust_contact_mobile}
                </td>
              </tr>
            </tbody>
          </table>
          <TableContainer
            id='accom_table'
            className={classes.container}
            style={{ maxHeight: 400, maxWidth: '96vw' }}
            size='small'
          >
            <Table
              size='small'
              stickyHeader
              style={{ whiteSpace: 'nowrap', maxHeight: 300 }}
            >
              <TableHead>
                <TableRow>
                  <TableCell
                    style={{
                      backgroundColor: 'rgba(6,86,147)',
                      color: 'white',
                      borderBottomColor: 'rgba(6,86,147)',
                      width: '25%'
                    }}
                  >
                    Location
                  </TableCell>
                  <TableCell
                    style={{
                      backgroundColor: 'rgba(6,86,147)',
                      color: 'white',
                      borderBottomColor: 'rgba(6,86,147)',
                      width: '25%'
                    }}
                  >
                    Image
                  </TableCell>
                  <TableCell
                    style={{
                      backgroundColor: 'rgba(6,86,147)',
                      color: 'white',
                      borderBottomColor: 'rgba(6,86,147)',
                      width: '25%'
                    }}
                  >
                    Account No.
                  </TableCell>
                  <TableCell
                    style={{
                      backgroundColor: 'rgba(6,86,147)',
                      color: 'white',
                      borderBottomColor: 'rgba(6,86,147)',
                      width: '25%'
                    }}
                  >
                    Type
                  </TableCell>
                  <TableCell
                    style={{
                      backgroundColor: 'rgba(6,86,147)',
                      color: 'white',
                      borderBottomColor: 'rgba(6,86,147)',
                      width: '25%'
                    }}
                  >
                    Account Address
                  </TableCell>
                  <TableCell
                    style={{
                      backgroundColor: 'rgba(6,86,147)',
                      color: 'white',
                      borderBottomColor: 'rgba(6,86,147)',
                      width: '25%'
                    }}
                  >
                    Account Findings
                  </TableCell>
                  <TableCell
                    style={{
                      backgroundColor: 'rgba(6,86,147)',
                      color: 'white',
                      borderBottomColor: 'rgba(6,86,147)',
                      width: '25%'
                    }}
                  >
                    Date Accomplished
                  </TableCell>
                  <TableCell
                    style={{
                      backgroundColor: 'rgba(6,86,147)',
                      color: 'white',
                      borderBottomColor: 'rgba(6,86,147)',
                      width: '25%'
                    }}
                  >
                    Fieldman
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {state.customer_history.map(row => {
                  return (
                    <TableRow
                      hover
                      role='checkbox'
                      tabIndex={-1}
                      key={row.code}
                    >
                      <TableCell>
                        <Link
                          href={
                            'http://maps.google.com?q=' +
                            row.fetched_coordinates
                          }
                          target='_blank'
                        >
                          <MapIcon
                            style={{
                              cursor: 'pointer',
                              color: 'rgba(6,86,147)'
                            }}
                          />
                        </Link>
                      </TableCell>
                      <TableCell>
                        {row.accom_images === '' ? (
                          'N/A'
                        ) : (
                          <BurstModeIcon
                            onClick={() => {
                              handleImageOpen(row)
                            }}
                            style={{
                              cursor: 'pointer',
                              color: 'rgba(6,86,147)'
                            }}
                          />
                        )}
                      </TableCell>
                      <TableCell>{row.account_number}</TableCell>
                      <TableCell>{row.accom_jo_type.toUpperCase()}</TableCell>
                      <TableCell>{row.address}</TableCell>
                      <TableCell>
                        {row.accom_findings === ''
                          ? 'N/A'
                          : row.accom_findings.toUpperCase()}
                      </TableCell>
                      <TableCell>
                        {row.date_accom === ''
                          ? 'N/A'
                          : String(
                            moment(row.date_accom).format('LL')
                          ).toUpperCase()}
                      </TableCell>
                      <TableCell>{row.accom_fieldman_name}</TableCell>{' '}
                      {/* <TableCell>
                        {row.accom_images === ""
                          ? "N/A"
                          : JSON.parse(row.accom_images).length}
                      </TableCell> */}
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </DialogContent>
      </Dialog>

      <Dialog
        fullWidth
        maxWidth='sm'
        open={state.imageopen}
        onClose={handleImageClose}
        aria-labelledby='responsive-dialog-title'
      >
        <DialogTitle id='simple-dialog-title'>
          <Typography color='textPrimary'>Meter Images</Typography>
        </DialogTitle>
        <DialogContent>
          <TransformWrapper
            defaultScale={1}
            defaultPositionX={200}
            defaultPositionY={100}
          >
            {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
              <React.Fragment>
                <center>
                  <ButtonGroup size='small' variant='text'>
                    <Button onClick={zoomIn} endIcon={<AddIcon />}>
                      Zoom&nbsp;in
                    </Button>
                    <Button onClick={zoomOut} endIcon={<RemoveIcon />}>
                      Zoom&nbsp;out
                    </Button>
                    <Button
                      onClick={() => {
                        setState({
                          ...state,
                          degree: state.degree - 90
                        })
                      }}
                      endIcon={<RotateLeftIcon />}
                    >
                      Rotate&nbsp;Left
                    </Button>
                    <Button
                      onClick={() => {
                        setState({
                          ...state,
                          degree: state.degree + 90
                        })
                      }}
                      endIcon={<RotateRightIcon />}
                    >
                      Rotate&nbsp;Right
                    </Button>
                  </ButtonGroup>
                  <Carousel navButtonsAlwaysVisible={true} autoPlay={false}>
                    {state.customer_images.map(val => {
                      return (
                        <TransformComponent>
                          <img
                            src={
                              'https://api.workflow.gzonetechph.com/assets/img/meter/' +
                              val.path
                            }
                            style={{
                              transform:
                                'rotate(' + String(state.degree) + 'deg)',
                              width: '100%',
                              height: 'auto'
                            }}
                          />
                        </TransformComponent>
                      )
                    })}
                  </Carousel>
                </center>
              </React.Fragment>
            )}
          </TransformWrapper>
        </DialogContent>
      </Dialog>
    </div>
  )
}

export default Index
