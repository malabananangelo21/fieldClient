import Breadcrumbs from '@material-ui/core/Breadcrumbs'
import { useTheme, withStyles } from '@material-ui/core/styles'
import moment from 'moment'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import '../../../../../App'
import useStyles from '../../../../../css/css'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import TableChartIcon from '@material-ui/icons/TableChart'
import RefreshIcon from '@material-ui/icons/Refresh';
import GetAppIcon from '@material-ui/icons/GetApp';
import FilterListIcon from '@material-ui/icons/FilterList';
import DateRangeIcon from '@material-ui/icons/DateRange';
import Typography from '@material-ui/core/Typography';
import FormControl from '@material-ui/core/FormControl';
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';

import ExportToggling from './exportToggle'
import Toggling from './filterToggle'
import DateToggling from './dateToggle'
import StatusToggling from './statusToggle'
import CustomToggling from './customFieldToggle'
function ButContainer ({
    onSubmitRefresh,
    toggleSubmit,
    handleDate,
    handleStatus,
    handleFinding,
    onFilter,
    selection,
    status,
    select_findings,
    finding,
    accomCat,
    initialCat,
    exportCat,
    handleExportField,
    handleChangeCustom,
    selectExportType,
    exportType,
    startDate,
    endDate,
    branch_name,
    selected_jo_type,
    selected_ba,
    accomplishment_display,
    exportAccom,
    discon_findings,
    sub_findings,
    handleSubFinding,
    searchinfo,
    search_accom,
    submitsearch}) {
  const home_reducer = useSelector(state => state.home_reducer)
  const dispatch = useDispatch()
 
  const theme = useTheme()
  const classes = useStyles()
  

 
  return (
    <Grid container spacing={3}>
        <Grid item md={9} style={{ display: 'flex',
         justifyContent: 'flex-start',alignItems:'center',paddingBottom:5}}>
            <Toggling 
                handledBranch={home_reducer.handleBranch} 
                toggleSubmit={toggleSubmit}/>
            <DateToggling  
                selection={selection} 
                handleDate={handleDate}/>
            <StatusToggling 
                status={status}
                select_findings={select_findings}
                finding={finding} 
                handleStatus={handleStatus} 
                handleFinding={handleFinding} 
                onFilter={onFilter}
                discon_findings={discon_findings}
                sub_findings={sub_findings}
                handleSubFinding={handleSubFinding}/>
            <CustomToggling
                  accomCat={accomCat}
                  initialCat={initialCat}
                  handleChangeCustom={handleChangeCustom}/>
            <ExportToggling 
                accomCat={accomCat}
                initialCat={initialCat}
                exportCat={exportCat}
                handleExportField={handleExportField}
                selectExportType={selectExportType}
                exportType={exportType}
                startDate={startDate}
                endDate={endDate}
                branch_name={branch_name}
                selected_jo_type={selected_jo_type}
                selected_ba={selected_ba}
                accomplishment_display={accomplishment_display}
                exportAccom={exportAccom}/>
            
            <Button
                size='medium'
                variant='outlined'
                style={{ backgroundColor: 'rgba(6,86,147)', color: 'white',marginRight:10,height:40 }}
                className={classes.button}
                onClick={onSubmitRefresh}
                endIcon={<RefreshIcon />} >
                Refresh
            </Button>
        </Grid>
        <Grid item md={3} style={{ display: 'flex', justifyContent: 'flex-end',alignItems:'center'}}>
            <FormControl style={{ width: '100%',height:40}}>
                {/* <Typography style={{ color: '#786fa6', fontSize: 15 }}> <b>Search</b></Typography> */}
                <TextField
                    style={{backgroundColor:'#f5f6fa'}}
                    placeholder="Search.."
                    id="outlined-size-small"
                    variant="outlined"
                    size="small"
                    inputRef={searchinfo}
                    onChange={e => {
                    search_accom(e)
                    }}
                    InputProps={{
                        startAdornment: <InputAdornment position="end">
                            <IconButton
                                onClick={() => submitsearch()}
                                aria-label="toggle password visibility" edge="start">
                                <SearchIcon />
                            </IconButton>
                        </InputAdornment>
                    }} />
            </FormControl>
        </Grid>
    </Grid>
  )
}
export default ButContainer
