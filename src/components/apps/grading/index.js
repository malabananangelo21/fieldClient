import AppBar from '@material-ui/core/AppBar'
import Backdrop from '@material-ui/core/Backdrop'
import Box from '@material-ui/core/Box'
import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import Button from '@material-ui/core/Button'
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
import Tab from '@material-ui/core/Tab'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Tabs from '@material-ui/core/Tabs'
import TextField from '@material-ui/core/TextField'
import Typography from '@material-ui/core/Typography'
import CachedIcon from '@material-ui/icons/Cached'
import SearchIcon from '@material-ui/icons/Search'
import StarBorderIcon from '@material-ui/icons/StarBorder'
import TableChartIcon from '@material-ui/icons/TableChart'
import moment from 'moment'
import PropTypes from 'prop-types'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import useStyles from '../../../css/css'
import { GetSingleEvalMonth, LogEvaluation } from '../Functions/home_func'
import ReactExport from 'react-data-export'
import GetAppIcon from '@material-ui/icons/GetApp'
import Filter from './filter'
const ExcelFile = ReactExport.ExcelFile
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn
function TabPanel (props) {
  const { children, value, index, ...other } = props

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  )
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
}

function a11yProps (index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  }
}

function Index () {
  const home_reducer = useSelector(state => state.home_reducer)
  const navigation_reducer = useSelector(state => state.navigation_reducer)

  const dispatch = useDispatch()
  const classes = useStyles()
  const searchinfo = React.useRef()
  const dispatch_data = (type, data) => {
    dispatch({
      type: type,
      data: data
    })
  }
  const [state, setState] = React.useState({
    filter_modal: false,
    eval_modal: false,
    break_modal: false,
    fieldman: [
      {
        complete_productivity: 20,
        accuracy: 40,
        attendance: 10,
        tardiness: 10,
        attitude: 10,
        completename: 'Test'
      },
      {
        complete_productivity: 10,
        accuracy: 15,
        attendance: 10,
        tardiness: 35,
        attitude: 10,
        completename: 'Juan Dela Cruz'
      },
      {
        complete_productivity: 30,
        accuracy: 40,
        attendance: 10,
        tardiness: 10,
        attitude: 10,
        completename: 'Cruz'
      }
    ],
    submit_data: [],
    details: [],
    passing_score: 0,
    sel_elav: [],
    score: '',
    break_data: [],
    accuracy_break: [],
    completeness_break: [],
    absent_break: [],
    tardiness_break: [],
    completeness_rate: '',
    absentism_present: 0,
    absentism_absent: 0,
    late_hour: new Date(),
    tardiness_count: 0,
    attitude_break: [],
    attitude_overwrite: '',
    b_name: ''
  })
  const [sort, setSort] = React.useState('')
  const handleSortChange = e => {
    setSort(e.target.value)
    let TosortGrade = []
    switch (e.target.value) {
      case 'Rate Low - High':
        TosortGrade = state.submit_data.sort((a, b) => {
          return parseInt(a.total) - parseInt(b.total)
        })
        setState(prev => ({
          ...prev,
          submit_data: TosortGrade
        }))
        break
      case 'Rate High - Low':
        TosortGrade = state.submit_data.sort((a, b) => {
          return parseInt(b.total) - parseInt(a.total)
        })
        setState(prev => ({
          ...prev,
          submit_data: TosortGrade
        }))
        break
      case 'Accuracy Low - High':
        TosortGrade = state.submit_data.sort((a, b) => {
          return parseInt(a.accuracy) - parseInt(b.accuracy)
        })
        setState(prev => ({
          ...prev,
          submit_data: TosortGrade
        }))
        break
      case 'Accuracy High - Low':
        TosortGrade = state.submit_data.sort((a, b) => {
          return parseInt(b.accuracy) - parseInt(a.accuracy)
        })
        setState(prev => ({
          ...prev,
          submit_data: TosortGrade
        }))
        break
      case 'Completeness Low - High':
        TosortGrade = state.submit_data.sort((a, b) => {
          return parseInt(a.completeness) - parseInt(b.completeness)
        })
        setState(prev => ({
          ...prev,
          submit_data: TosortGrade
        }))
        break
      case 'Completeness High - Low':
        TosortGrade = state.submit_data.sort((a, b) => {
          return parseInt(b.completeness) - parseInt(a.completeness)
        })
        setState(prev => ({
          ...prev,
          submit_data: TosortGrade
        }))
        break
      case 'Absentism Low - High':
        TosortGrade = state.submit_data.sort((a, b) => {
          return parseInt(a.absentism) - parseInt(b.absentism)
        })
        setState(prev => ({
          ...prev,
          submit_data: TosortGrade
        }))
        break
      case 'Absentism High - Low':
        TosortGrade = state.submit_data.sort((a, b) => {
          return parseInt(b.absentism) - parseInt(a.absentism)
        })
        setState(prev => ({
          ...prev,
          submit_data: TosortGrade
        }))
        break
      case 'Timeliness Low - High':
        TosortGrade = state.submit_data.sort((a, b) => {
          return parseInt(a.tardiness) - parseInt(b.tardiness)
        })
        setState(prev => ({
          ...prev,
          submit_data: TosortGrade
        }))
        break
      case 'Timeliness High - Low':
        TosortGrade = state.submit_data.sort((a, b) => {
          return parseInt(b.tardiness) - parseInt(a.tardiness)
        })
        setState(prev => ({
          ...prev,
          submit_data: TosortGrade
        }))
        break
      case 'Attitude Low - High':
        TosortGrade = state.submit_data.sort((a, b) => {
          return parseInt(a.total_att) - parseInt(b.total_att)
        })
        setState(prev => ({
          ...prev,
          submit_data: TosortGrade
        }))
        break
      case 'Attitude High - Low':
        TosortGrade = state.submit_data.sort((a, b) => {
          return parseInt(b.total_att) - parseInt(a.total_att)
        })
        setState(prev => ({
          ...prev,
          submit_data: TosortGrade
        }))
        break
      default:
        break
    }
  }
  const search_accom = e => {
    searchinfo.current.value = e.target.value
  }
  const submitsearch = () => {
    dispatch_data('loader', true)
    let accomSearch = state.submit_data.filter(files => {
      return (
        files.completename !== null &&
        files.completename !== '' &&
        files.completename
          .toLowerCase()
          .indexOf(searchinfo.current.value.toLocaleLowerCase()) !== -1
      )
    })
    setState(prev => ({ ...prev, submit_data: accomSearch }))
    dispatch_data('loader', false)
    // setPage(0);
  }
  const onResets = () => {
    if (state.master_data !== undefined) {
      setState(prev => ({
        ...prev,
        submit_data: state.master_data,
        selected_filter: ''
      }))
      searchinfo.current.value = ''
      return 'return'
    } else {
      alert('Please generate table first!')
    }
  }
  const onEvaluate = e => {
    dispatch_data('loader', true)
    let eval_id = ''
    state.sel_elav.map(val => {
      val.attitude_data.map(att => {
        if (att.user_id === navigation_reducer.userLoginData.user_id) {
          return (eval_id = att.evaluation_id)
        }
      })
    })
    e.preventDefault()
    let data = {
      fieldman_id: state.sel_elav[0].user_id,
      admin_id: navigation_reducer.userLoginData.user_id,
      evaluation_grade: state.score,
      evaluation_type: 'Evaluation',
      evaluation_delete_id: 0,
      evaluation_month: moment(state.details.date).format('Y-MM'),
      branch_id: state.details.branch_id[0],
      evaluation_id: eval_id
    }
    LogEvaluation(data).then(response => {
      if (response.status === 'Success') {
        state.sel_elav.map(val => {
          val.attitude_data.map(att => {
            if (att.user_id === navigation_reducer.userLoginData.user_id) {
              att.evaluation_grade = state.score
              att.evaluation_id = response.id
            }
            if (navigation_reducer.userLoginData.user_id === '33') {
              val.attitude = state.score
            }
          })
        })
        setState(prev => ({ ...prev, eval_modal: false }))
        alert('Successfully added grade!')
      }
      dispatch_data('loader', false)
    })
  }
  const onChange = event => {
    setState({
      ...state,
      [event.target.name]: event.target.value
    })
  }
  const onClickBreak = data => {
    let param = {
      user_id: data.user_id,
      branch_id: state.details.branch_id,
      company_id: state.details.company_id,
      date: state.details.date,
      jo_type: state.details.jo_type,
      parameter: state.details.parameter
    }
    GetSingleEvalMonth(param).then(response => {
      let complete_details = response.data[0].breakdown_completeness
      let complete_rate =
        (parseInt(complete_details.count_accomplish) /
          parseInt(complete_details.count_assign)) *
        25
      let absent_details_attendance =
        response.data[0].breakdown_absentism.attendance
      let absent_details_schedule =
        response.data[0].breakdown_absentism.schedule
      let tardiness_details_attendance =
        response.data[0].breakdown_tardiness.attendance
      let tardiness_details_schedule =
        response.data[0].breakdown_tardiness.schedule
      let atd_break = response.data[0].attitude_data
      let attnd = []
      let present = 0
      let absent = 0
      let tardiness = []
      let late = 0
      absent_details_schedule.map(val => {
        if (typeof absent_details_attendance[val] === 'object') {
          attnd.push({
            date: val,
            status: 'Present'
          })
          present++
        } else {
          attnd.push({
            date: val,
            status: 'Absent'
          })
          absent++
        }
      })
      tardiness_details_schedule.map(val => {
        if (typeof tardiness_details_attendance[val] === 'object') {
          if (
            moment(tardiness_details_attendance[val][0].date_added).format(
              'hh:mm'
            ) < moment(state.late_hour).format('hh:mm')
          ) {
            tardiness.push({
              in: moment(
                tardiness_details_attendance[val][0].date_added
              ).format('LLL'),
              status: 'Early'
            })
          } else {
            tardiness.push({
              in: moment(
                tardiness_details_attendance[val][0].date_added
              ).format('LLL'),
              status: 'Late'
            })
            late++
          }
        }
      })

      setState(prev => ({
        ...prev,
        break_modal: true,
        break_data: response.data[0],
        accuracy_break: response.data[0].breakdown_accuracy,
        completeness_break: response.data[0].breakdown_completeness,
        absent_break: attnd,
        absentism_present: present,
        absentism_absent: absent,
        tardiness_break: tardiness,
        tardiness_count: late,
        completeness_rate: complete_rate.toFixed(2),
        attitude_break: response.data[0].attitude_data,
        attitude_overwrite: response.data[0].attitude
      }))
    })
  }
  const [value, setValue] = React.useState(0)
  const handleChange = (event, newValue) => {
    setValue(newValue)
  }
  return (
    <div className={classes.root}>
      <Backdrop
        className={classes.backdrop}
        open={home_reducer.loadingIndex}
        style={{ zIndex: 99999999 }}
      >
        <div className='loader'></div>
      </Backdrop>
      <Breadcrumbs aria-label='breadcrumb' gutterBottom>
        <Link href='#/'>Home Page</Link>
        <Typography color='textPrimary'>Grading System</Typography>
      </Breadcrumbs>

      <Grid container spacing={1}>
        <Grid item xs={12} md={6}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-start'
            }}
          >
            <Button
              onClick={() =>
                setState(prev => ({ ...prev, filter_modal: true }))
              }
              variant='contained'
              startIcon={<TableChartIcon />}
              style={{
                backgroundColor: 'rgb(17, 82, 147)',
                color: '#fff',
                margin: 5
              }}
              size='small'
            >
              Generate
            </Button>
            <ExcelFile
              filename={
                'Evaluation Rating for ' +
                state.b_name +
                ' (' +
                moment(state.details.date).format('MMMM YYYY') +
                ') '
              }
              element={
                <Button
                  size='large'
                  variant='contained'
                  className={classes.button}
                  style={{
                    backgroundColor: 'rgb(17, 82, 147)',
                    color: '#fff',
                    margin: 5,
                    fontSize: '0.8150rem'
                  }}
                  endIcon={<GetAppIcon />}
                >
                  Export Table
                </Button>
              }
            >
              <ExcelSheet
                data={state.submit_data}
                name='Evaluation Grade Details'
              >
                <ExcelColumn label='Name' value='completename' />
                <ExcelColumn label='Accuracy' value='accuracy' />
                <ExcelColumn label='Completeness' value='completeness' />
                <ExcelColumn label='Attendant' value='absentism' />
                <ExcelColumn label='Timeliness' value='tardiness' />
                <ExcelColumn label='Attitude' value='total_att' />
                <ExcelColumn label='Overwrite Attitude' value='attitude' />
                <ExcelColumn label='Rate' value='total' />
              </ExcelSheet>
            </ExcelFile>
          </div>
        </Grid>
        <Grid item xs={12} md={6}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'flex-end'
            }}
          >
            {/* <div>
              <TextField
                id="standard-textarea"
                label="Search Fieldman"
                placeholder="Search"
                variant={"outlined"}
                size="small"
                style={{ margin: 5 }}
              />
            </div> */}
            <div>
              <FormControl
                id='searchinput'
                size='small'
                variant='outlined'
                style={{ minWidth: 150, margin: 5 }}
              >
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
                      <IconButton
                        onClick={() => {
                          onResets()
                        }}
                      >
                        <CachedIcon />
                      </IconButton>
                    </InputAdornment>
                  }
                />
              </FormControl>
            </div>
            <div>
              {state.submit_data.reduce((count, val) => {
                let atts = val.attitude_data.filter(function (info) {
                  return parseInt(info.evaluation_id) !== 0
                })
                if (atts.length === val.attitude_data.length) {
                  count++
                }
              }, 0) === state.submit_data.length ||
              navigation_reducer.userLoginData.user_id === '33' ? (
                <FormControl
                  style={{ minWidth: 150, margin: 5 }}
                  size='small'
                  variant='outlined'
                >
                  <InputLabel id='demo-simple-select-outlined-label'>
                    Sort by
                  </InputLabel>
                  <Select
                    labelId='demo-simple-select-outlined-label'
                    id='demo-simple-select-outlined'
                    onChange={handleSortChange}
                    label='Sort'
                    name='sort'
                    value={sort}
                    autoWidth
                  >
                    <MenuItem value='' disabled>
                      Select
                    </MenuItem>
                    <MenuItem value='Rate Low - High'>Rate Low - High</MenuItem>
                    <MenuItem value='Rate High - Low'>Rate High - Low</MenuItem>
                    <MenuItem value='Accuracy Low - High'>
                      Accuracy Low - High
                    </MenuItem>
                    <MenuItem value='Accuracy High - Low'>
                      Accuracy High - Low
                    </MenuItem>
                    <MenuItem value='Completeness Low - High'>
                      Completeness Low - High
                    </MenuItem>
                    <MenuItem value='Completeness High - Low'>
                      Completeness High - Low
                    </MenuItem>
                    <MenuItem value='Absentism Low - High'>
                      Attendant Low - High
                    </MenuItem>
                    <MenuItem value='Absentism High - Low'>
                      Attendant High - Low
                    </MenuItem>
                    <MenuItem value='Tardiness Low - High'>
                      Tardiness Low - High
                    </MenuItem>
                    <MenuItem value='Tardiness High - Low'>
                      Tardiness High - Low
                    </MenuItem>
                    <MenuItem value='Attitude Low - High'>
                      Attitude Low - High
                    </MenuItem>
                    <MenuItem value='Attitude High - Low'>
                      Attitude High - Low
                    </MenuItem>
                  </Select>
                </FormControl>
              ) : (
                <FormControl
                  style={{ minWidth: 150, margin: 5 }}
                  size='small'
                  variant='outlined'
                >
                  <InputLabel id='demo-simple-select-outlined-label'>
                    Sort by
                  </InputLabel>
                  <Select
                    labelId='demo-simple-select-outlined-label'
                    id='demo-simple-select-outlined'
                    onChange={handleSortChange}
                    label='Sort'
                    name='sort'
                    value={sort}
                    autoWidth
                  >
                    <MenuItem value='' disabled>
                      Select
                    </MenuItem>
                  </Select>
                </FormControl>
              )}
            </div>
          </div>
        </Grid>
        <Grid item xs={12} md={12}>
          <TableContainer component={Paper} style={{ maxHeight: '60vh' }}>
            <Table
              className={classes.table}
              aria-label='simple table'
              size='small'
              stickyHeader
            >
              <TableHead>
                <TableRow>
                  <TableCell>Name</TableCell>
                  <TableCell>Month</TableCell>
                  <TableCell>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        flexDirection: 'row'
                      }}
                    >
                      <Typography color='textPrimary'>Accuracy (20%)</Typography>
                      <Box
                        variant='rounded'
                        style={{
                          width: 20,
                          height: 20,
                          borderRadius: 50,
                          backgroundColor: '#54B063'
                        }}
                      />
                    </div>
                  </TableCell>

                  <TableCell>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        flexDirection: 'row'
                      }}
                    >
                      <Typography color='textPrimary'>Completeness (25%)</Typography>
                      <Box
                        variant='rounded'
                        style={{
                          width: 20,
                          height: 20,
                          borderRadius: 50,
                          backgroundColor: '#58B0E9'
                        }}
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        flexDirection: 'row'
                      }}
                    >
                      <Typography color='textPrimary'>Attendant (30%)</Typography>
                      <Box
                        variant='rounded'
                        style={{
                          width: 20,
                          height: 20,
                          borderRadius: 50,
                          backgroundColor: '#E63336'
                        }}
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        flexDirection: 'row'
                      }}
                    >
                      <Typography color='textPrimary'>Timeliness (20%)</Typography>
                      <Box
                        variant='rounded'
                        style={{
                          width: 20,
                          height: 20,
                          borderRadius: 50,
                          backgroundColor: '#EFD536'
                        }}
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'flex-start',
                        flexDirection: 'row'
                      }}
                    >
                      <Typography color='textPrimary'>Attitude (5%)</Typography>
                      <Box
                        variant='rounded'
                        style={{
                          width: 20,
                          height: 20,
                          borderRadius: 50,
                          backgroundColor: '#7A4AAA'
                        }}
                      />
                    </div>
                  </TableCell>
                  <TableCell>Rating</TableCell>
                  <TableCell>Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {state.submit_data.map((val, index) => {
                  let atts = val.attitude_data.filter(function (info) {
                    return parseInt(info.evaluation_id) !== 0
                  })
                  let result_color = 'green'
                  let accuracy = val.accuracy + '%'
                  let completeness = val.completeness + '%'
                  let absentism = val.absentism + '%'
                  let tardiness = val.tardiness + '%'
                  let attitude = val.attitude + '%'
                  let total_attitude = 0
                  let attitude2 = 0
                  val.attitude_data.map(data => {
                    total_attitude += parseInt(data.evaluation_grade)
                  })
                  attitude2 = total_attitude / val.attitude_data.length
                  let attitude_data = parseFloat(attitude2) + '%'
                  let total =
                    parseFloat(val.accuracy) +
                    parseFloat(val.completeness) +
                    parseFloat(val.absentism) +
                    parseFloat(val.tardiness) +
                    parseFloat(val.attitude !== null ? val.attitude : attitude2)
                  if (total < state.passing_score) {
                    result_color = 'red'
                  }
                  if (val.attitude === null) {
                    state.submit_data[index].total_att = attitude2
                  } else {
                    state.submit_data[index].total_att = val.attitude
                  }
                  state.submit_data[index].total = total
                  return (
                    <TableRow hover key={index}>
                      <TableCell component='th' scope='row'>
                        {val.completename}
                      </TableCell>
                      <TableCell component='th' scope='row'>
                        {String(
                          moment(state.details.date).format('MMMM')
                        ).toUpperCase()}
                      </TableCell>
                      <TableCell component='th' scope='row' colSpan={5}>
                        {atts.length === val.attitude_data.length ||
                        navigation_reducer.userLoginData.user_id === '33' ? (
                          <div
                            style={{
                              width: '100%',
                              height: 15,
                              backgroundColor: '#e2e2e2',
                              borderRadius: 12,
                              display: 'flex',
                              justifyContent: 'flex-start',
                              flexDirection: 'row',
                              cursor: 'pointer'
                            }}
                            onClick={() => {
                              onClickBreak(val)
                            }}
                          >
                            {val.accuracy !== '0.00' && (
                              <div
                                style={{
                                  width: accuracy,
                                  height: 15,
                                  backgroundColor: '#54B063',
                                  borderTopLeftRadius: 12,
                                  borderBottomLeftRadius: 12,
                                  color: 'white',
                                  fontSize: 10,
                                  paddingLeft: 5
                                }}
                              >
                                {accuracy}
                              </div>
                            )}
                            {val.completeness !== '0.00' && (
                              <div
                                style={{
                                  width: completeness,
                                  height: 15,
                                  backgroundColor: '#58B0E9',
                                  borderRightRaduis: 12,
                                  color: 'white',
                                  fontSize: 10,
                                  paddingLeft: 5
                                }}
                              >
                                {completeness}
                              </div>
                            )}
                            {val.absentism !== '0.00' && (
                              <div
                                style={{
                                  width: absentism,
                                  height: 15,
                                  backgroundColor: '#E63336',
                                  borderRightRaduis: 12,
                                  color: 'white',
                                  fontSize: 10,
                                  paddingLeft: 5
                                }}
                              >
                                {absentism}
                              </div>
                            )}
                            {val.tardiness !== '0.00' && (
                              <div
                                style={{
                                  width: tardiness,
                                  height: 15,
                                  backgroundColor: '#EFD536',
                                  borderRightRaduis: 12,
                                  color: 'black',
                                  fontSize: 10,
                                  paddingLeft: 5
                                }}
                              >
                                {tardiness}
                              </div>
                            )}
                            {val.attitude === null ? (
                              <div
                                style={{
                                  width: attitude_data,
                                  height: 15,
                                  backgroundColor: '#7A4AAA',
                                  borderRightRaduis: 12,
                                  color: 'white',
                                  fontSize: 10,
                                  paddingLeft: 5
                                }}
                              >
                                {attitude_data}
                              </div>
                            ) : (
                              <div
                                style={{
                                  width: attitude,
                                  height: 15,
                                  backgroundColor: '#7A4AAA',
                                  borderRightRaduis: 12,
                                  color: 'white',
                                  fontSize: 10,
                                  paddingLeft: 5
                                }}
                              >
                                {attitude + ' (o)'}
                              </div>
                            )}
                          </div>
                        ) : navigation_reducer.userLoginData.user_id ===
                          '408' ? (
                          <Typography
                            style={{ color: 'grey', fontWeight: 900 }}
                            onClick={() => {
                              onClickBreak(val)
                            }}
                          >
                            Evaluation not done
                          </Typography>
                        ) : (
                          <Typography
                            style={{ color: 'grey', fontWeight: 900 }}
                          >
                            Evaluation not done
                          </Typography>
                        )}
                      </TableCell>
                      <TableCell component='th' scope='row'>
                        {atts.length === val.attitude_data.length ||
                        navigation_reducer.userLoginData.user_id === '33' ? (
                          <Typography
                            style={{ color: result_color, fontWeight: 900 }}
                          >
                            {parseFloat(total).toFixed(2) + '%'}
                          </Typography>
                        ) : (
                          <Typography
                            style={{ color: 'grey', fontWeight: 900 }}
                          >
                            {'**.**%'}
                          </Typography>
                        )}
                      </TableCell>
                      {/* <TableCell component="th" scope="row">
                        {
                          (navigation_reducer.userLoginData.user_id === '33' || navigation_reducer.userLoginData.user_id === '408' || navigation_reducer.userLoginData.user_id === '455' || navigation_reducer.userLoginData.user_id === '472' || navigation_reducer.userLoginData.user_id === '454') ?

                            <Button
                              variant="contained"
                              size="small"
                              endIcon={<StarBorderIcon />}
                              style={{
                                backgroundColor: "rgb(17, 82, 147)",
                                color: "#fff",
                                marginRight: 10,
                              }}
                              onClick={() => {
                                setState((prev) => ({ ...prev, eval_modal: true, sel_elav: [val] }))
                              }
                              }
                            >
                              Overwrite
                            </Button>
                            :
                            val.attitude_data.map((check) => {
                              let match = false
                              if (check.admin_id === navigation_reducer.userLoginData.user_id || check.user_id === navigation_reducer.userLoginData.user_id) {
                                if (parseInt(check.evaluation_id) === 0) {
                                  match = true
                                }
                              }
                              if (match)
                                return <Button
                                  variant="contained"
                                  size="small"
                                  endIcon={<StarBorderIcon />}
                                  style={{
                                    backgroundColor: "rgb(17, 82, 147)",
                                    color: "#fff",
                                    marginRight: 10,
                                  }}
                                  onClick={() => {
                                    setState((prev) => ({ ...prev, eval_modal: true, sel_elav: [val] }))
                                  }
                                  }
                                >
                                  Rate
                                </Button>
                            })
                        }
                      </TableCell> */}
                      <TableCell component='th' scope='row'>
                        {navigation_reducer.userLoginData.user_id === '33' ? (
                          <Button
                            variant='contained'
                            size='small'
                            endIcon={<StarBorderIcon />}
                            style={{
                              backgroundColor: 'rgb(17, 82, 147)',
                              color: '#fff',
                              marginRight: 10
                            }}
                            onClick={() => {
                              setState(prev => ({
                                ...prev,
                                eval_modal: true,
                                sel_elav: [val]
                              }))
                            }}
                          >
                            Overwrite
                          </Button>
                        ) : (
                          val.attitude_data.map(check => {
                            let match = false
                            if (
                              check.admin_id ===
                                navigation_reducer.userLoginData.user_id ||
                              check.user_id ===
                                navigation_reducer.userLoginData.user_id
                            ) {
                              if (parseInt(check.evaluation_id) === 0) {
                                match = true
                              }
                            }
                            if (match)
                              return (
                                <Button
                                  variant='contained'
                                  size='small'
                                  endIcon={<StarBorderIcon />}
                                  style={{
                                    backgroundColor: 'rgb(17, 82, 147)',
                                    color: '#fff',
                                    marginRight: 10
                                  }}
                                  onClick={() => {
                                    setState(prev => ({
                                      ...prev,
                                      eval_modal: true,
                                      sel_elav: [val]
                                    }))
                                  }}
                                >
                                  Rate
                                </Button>
                              )
                          })
                        )}
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>
      </Grid>
      <Dialog
        fullWidth
        maxWidth='xs'
        open={state.filter_modal}
        aria-labelledby='responsive-dialog-title'
      >
        <DialogTitle id='simple-dialog-title'>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}
          >
            <Typography>Generate Grading Records</Typography>
            <Button
              onClick={() =>
                setState(prev => ({ ...prev, filter_modal: false }))
              }
              color='primary'
              size='small'
            >
              Close
            </Button>
          </div>
        </DialogTitle>
        <DialogContent>
          <Filter
            onResponse={(data, dets) => {
              let details = data.data
              let total_attitude = 0
              let branch = 'No Branch'
              details.map(val => {
                val.attitude_data.map(txt => {
                  total_attitude += parseInt(txt.evaluation_grade)
                })
              })
              home_reducer.handleBranch.map(val => {
                if (val.branch_id === dets.branch_id[0]) {
                  branch = val.branch_name
                }
              })

              setState(prev => ({
                ...prev,
                submit_data: data.data,
                master_data: data.data,
                passing_score: data.passing,
                late_hour: data.late,
                details: dets,
                b_name: branch,
                filter_modal: false
              }))
              setSort('')
            }}
          />
        </DialogContent>
      </Dialog>

      <Dialog
        fullWidth
        maxWidth='xs'
        open={state.eval_modal}
        aria-labelledby='responsive-dialog-title'
      >
        <DialogTitle id='simple-dialog-title'>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}
          >
            <Typography>Evaluation Form</Typography>
            <Button
              onClick={() => setState(prev => ({ ...prev, eval_modal: false }))}
              color='primary'
            >
              Close
            </Button>
          </div>
        </DialogTitle>
        <DialogContent>
          {state.sel_elav.map(val => {
            return (
              <Grid container spacing={2} style={{ marginBottom: 10 }}>
                <Grid item sm={12} md={12}>
                  <TextField
                    id='outlined-basic'
                    label='Fieldman Name:'
                    value={val.completename}
                    variant='outlined'
                    size='small'
                    disabled
                    style={{ width: '100%' }}
                  />
                </Grid>
                <Grid item sm={12} md={12}>
                  <TextField
                    id='outlined-basic'
                    label='Fieldman Position:'
                    value={val.user_jobposition}
                    disabled
                    size='small'
                    variant='outlined'
                    style={{ width: '100%' }}
                  />
                </Grid>
              </Grid>
            )
          })}

          <form onSubmit={onEvaluate}>
            <TextField
              id='outlined-basic'
              label='Attutude Score:'
              type='number'
              variant='outlined'
              name='score'
              style={{ width: '100%' }}
              size='small'
              onChange={onChange}
              helperText='Scale of 0 to 5 (5-highest, 0-lowest)'
              inputProps={{ min: 0, max: 5 }}
              min={0}
              max={5}
            />
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
        maxWidth='xl'
        open={state.break_modal}
        aria-labelledby='responsive-dialog-title'
      >
        <DialogTitle id='simple-dialog-title'>
          <div
            style={{
              display: 'flex',
              flexDirection: 'row',
              justifyContent: 'space-between'
            }}
          >
            <Typography>Grading Breakdown Details</Typography>
            <Button
              onClick={() =>
                setState(prev => ({ ...prev, break_modal: false }))
              }
              color='primary'
              size='small'
            >
              Close
            </Button>
          </div>
        </DialogTitle>
        <DialogContent>
          <AppBar position='static' color='default' variant='outlined'>
            <Tabs
              value={value}
              onChange={handleChange}
              indicatorColor='primary'
              textColor='primary'
              variant='fullWidth'
            >
              <Tab label='Accuracy' {...a11yProps(0)} />
              <Tab label='Completeness' {...a11yProps(1)} />
              <Tab label='Attendant' {...a11yProps(2)} />
              <Tab label='Timeliness' {...a11yProps(3)} />
              <Tab label='Attitude' {...a11yProps(4)} />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>
            Accuracy
            <TableContainer>
              <Table
                className={classes.table}
                aria-label='simple table'
                size='small'
                stickyHeader
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Total Accomplishment</TableCell>
                    <TableCell>No of invalid</TableCell>
                    <TableCell>Accuracy Rate</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      {state.accuracy_break.count_accomplish}
                    </TableCell>
                    <TableCell> {state.accuracy_break.count_invalid}</TableCell>
                    {parseInt(state.accuracy_break.count_invalid) <= 10 && (
                      <TableCell>20%</TableCell>
                    )}
                    {parseInt(state.accuracy_break.count_invalid) > 10 &&
                      parseInt(state.accuracy_break.count_invalid) <= 16 && (
                        <TableCell>15%</TableCell>
                      )}
                    {parseInt(state.accuracy_break.count_invalid) > 16 &&
                      parseInt(state.accuracy_break.count_invalid) <= 20 && (
                        <TableCell>10%</TableCell>
                      )}
                    {parseInt(state.accuracy_break.count_invalid) > 20 && (
                      <TableCell>5%</TableCell>
                    )}
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>
          <TabPanel value={value} index={1}>
            Completeness
            <TableContainer>
              <Table
                className={classes.table}
                aria-label='simple table'
                size='small'
                stickyHeader
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Total Assigned</TableCell>
                    <TableCell>No of Accomplishment</TableCell>
                    <TableCell>Completeness Rate</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>
                      {state.completeness_break.count_accomplish}
                    </TableCell>
                    <TableCell>
                      {' '}
                      {state.completeness_break.count_assign}
                    </TableCell>
                    <TableCell>{state.completeness_rate + '%'}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>
          <TabPanel value={value} index={2}>
          Attendant
            <TableContainer style={{ marginBottom: 25 }}>
              <Table
                className={classes.table}
                aria-label='simple table'
                size='small'
                stickyHeader
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Total Attendance</TableCell>
                    <TableCell>Total Absent</TableCell>
                    <TableCell>Total Schedule</TableCell>
                    <TableCell>Rating</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>{state.absentism_present}</TableCell>
                    <TableCell>{state.absentism_absent}</TableCell>
                    <TableCell>{state.absent_break.length}</TableCell>
                    <TableCell>{state.break_data.absentism + '%'}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <TableContainer style={{ maxHeight: 450 }}>
              <Table
                className={classes.table}
                aria-label='simple table'
                size='small'
                stickyHeader
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {state.absent_break.map(val => {
                    let present = 'green'

                    if (val.status === 'Absent') {
                      present = 'red'
                    }
                    return (
                      <TableRow>
                        <TableCell>{moment(val.date).format('LL')}</TableCell>
                        <TableCell style={{ color: present, fontWeight: 900 }}>
                          {val.status}
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>
          <TabPanel value={value} index={3}>
            Timeliness
            <TableContainer style={{ marginBottom: 25 }}>
              <Table
                className={classes.table}
                aria-label='simple table'
                size='small'
                stickyHeader
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Total Late</TableCell>
                    <TableCell>Rating</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow>
                    <TableCell>{state.tardiness_count}</TableCell>
                    <TableCell>{state.break_data.tardiness + '%'}</TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>
            <TableContainer style={{ maxHeight: 450 }}>
              <Table
                className={classes.table}
                aria-label='simple table'
                size='small'
                stickyHeader
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Status</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {state.tardiness_break.map(val => {
                    let present = 'green'

                    if (val.status === 'Late') {
                      present = 'red'
                    }
                    return (
                      <TableRow>
                        <TableCell>{moment(val.in).format('LLL')}</TableCell>
                        <TableCell style={{ color: present, fontWeight: 900 }}>
                          {val.status}
                        </TableCell>
                      </TableRow>
                    )
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </TabPanel>
          <TabPanel value={value} index={4}>
            Attitude
            {state.attitude_overwrite !== null ? (
              <TableContainer style={{ maxHeight: 450 }}>
                <Table
                  className={classes.table}
                  aria-label='simple table'
                  size='small'
                  stickyHeader
                >
                  <TableHead>
                    <TableRow>
                      <TableCell>Evaluation Grade</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    <TableRow>
                      <TableCell>
                        {state.attitude_overwrite + '/' + '5'}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>
            ) : (
              <TableContainer style={{ maxHeight: 450 }}>
                <Table
                  className={classes.table}
                  aria-label='simple table'
                  size='small'
                  stickyHeader
                >
                  <TableHead>
                    <TableRow>
                      <TableCell>Evaluator</TableCell>
                      <TableCell>Evaluation Grade</TableCell>
                      <TableCell>Date Added</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {state.attitude_break.map(val => {
                      let name = val.level
                      if (val.evaluation_id === 0) {
                        name = 'n/a'
                      }
                      return (
                        <TableRow>
                          <TableCell>{name}</TableCell>
                          <TableCell>
                            {val.evaluation_grade + '/' + '5'}
                          </TableCell>
                          <TableCell>
                            {moment(val.evaluation_date_added).format('LL')}
                          </TableCell>
                        </TableRow>
                      )
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            )}
          </TabPanel>
        </DialogContent>
      </Dialog>
      <Backdrop
        style={{ zIndex: 9999 }}
        className={classes.backdrop}
        open={home_reducer.loader}
      >
        <CircularProgress color='inherit' />
      </Backdrop>
    </div>
  )
}

export default Index
