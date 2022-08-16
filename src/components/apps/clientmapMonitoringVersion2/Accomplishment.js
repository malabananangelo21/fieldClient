import logo from '../../../logo.svg';
import '../../../App.css';
import React, { useContext } from 'react';
import ClientMapContext from '../../context/clientMapContext/ClientMap';
import GoogleMap from './map'
import '../../css/clientMap/clientMap.css'
import { makeStyles, withStyles, useTheme } from "@material-ui/core/styles";
import { useAccomplishment } from './hooks/accomplishmentsHooks'
import SearchIcon from "@material-ui/icons/Search";
import FilterListIcon from "@material-ui/icons/FilterList";
import {
    Button,
    Card,
    Grid,
    IconButton,
    Typography,
    CardContent,
    Dialog,
    DialogTitle,
    DialogContent,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
    Input,
    TextField,
    DialogActions,
    List,
    Divider,
    FormControlLabel,
    Checkbox,
    Tooltip

} from "@material-ui/core";
import moment from 'moment'
import { useDispatch, useSelector } from "react-redux";
import {
    MuiPickersUtilsProvider,
    KeyboardTimePicker,
    KeyboardDatePicker,
    validate,
    DatePicker
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

import 'react-date-range/dist/styles.css'; // main css file
import 'react-date-range/dist/theme/default.css'; // theme css file
import { DateRange } from 'react-date-range';
import EventNoteIcon from '@material-ui/icons/EventNote';
import DailyAccomplishments from './DailyAccomplishments';
import CallMadeIcon from '@material-ui/icons/CallMade';
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};
let width = window.innerWidth;
let height = window.innerHeight;


function getStyles(name, personName, theme) {
    return {
        fontWeight:
            personName.indexOf(name) === -1
                ? theme.typography.fontWeightRegular
                : theme.typography.fontWeightMedium,
    };
}
const Accomplishment = () => {
    const home_reducer = useSelector((state) => state.home_reducer);
    const map_reducer = useSelector((state) => state.map_reducer);
    const {
        state,
        onSubmit,
        onChangeCompany,
        onChangeBranch,
        personName,
        openModal,
        closeModal,
        onChangeDate,
        openDateModal,
        closeDateModal,
        onClickjo_type,
        handleListItemClick,
        changeEmployee,
        accomplishmentList,
        onClickTotalCount,
        openFieldFindings,
        closeFieldFindings,
        openSearhModal,
        closesearhModal,
        handleListItemClickFieldFindings,
        onFilterFieldFindings,
        accomList,
        resetFieldFinding,
        formatNumber,
        onChangeText,
        searchReferenceNo

    } = useAccomplishment();
    const theme = useTheme();

    return (
        <div id="div-details"
            style={{
                width: width < 768 ? '94%' : 320, position: 'absolute', padding: 10, left: "0%"
            }}>
            <div style={{ position: 'relative' }}>
                <Card style={{ marginTop: 55, display: 'flex', alignItems: 'flex-start', justifyContent: 'flex-start', padding: 10, position: 'relative' }}>
                    <div style={{ display: 'flex', flexDirection: 'column' }}>
                        <div
                            onClick={() => {
                                openModal()
                            }} style={{
                                width: 25, height: 25, marginRight: 5,
                                backgroundColor: "#115293"
                                , borderRadius: 15, display: 'flex', alignItems: 'center', justifyContent: "center", cursor: 'pointer'
                            }}>
                            <SearchIcon style={{ color: '#fff' }} />
                        </div>
                    </div>
                    <div>
                        <Typography style={{ fontWeight: 'bold', fontSize: 13 }}>{state.branch_name}</Typography>
                        <Typography style={{ fontWeight: 'bold', fontSize: 13 }}>{personName}</Typography>
                        <Typography style={{ fontWeight: 'bold', fontSize: 13 }}>{`${moment(state.selection.startDate).format('MMM DD, YYYY')} - ${moment(state.selection.endDate).format('MMM DD, YYYY')}`}</Typography>
                        <div style={{ display: 'flex', flexDirection: 'row' }}>
                            <Typography style={{ fontWeight: 'bold', fontSize: 15,color:'#115293' }}>{`Total : ${formatNumber(state.accomplishmentList.length)}`}</Typography>
                            <button  onClick={() => onClickTotalCount()} style={{cursor:'pointer',marginLeft:10,background:'#115293',height:20,diplay:'flex',color:'#fff',alignItems:'center',justifyContent:'center'}}>
                            View
                            </button>
                        </div>
                        <Typography style={{ fontWeight: 'bold', fontSize: 15,color:'#115293' }}>{`Marker Count : ${formatNumber(accomList.length)}`}</Typography>
                    </div>

                </Card>
                <div style={{ position: 'absolute', top: 5, right: -39 }} >
                    <Tooltip  title = 'Search Reference No.'>
                        <div
                        onClick={() => {
                            openSearhModal()
                        }} style={{
                            width: 28, height: 28, marginRight: 5,
                            backgroundColor: "#fff"
                            , borderRadius: 28 / 2, display: 'flex', alignItems: 'center', justifyContent: "center", cursor: 'pointer'
                        }}>
                        <SearchIcon style={{ color: '#115293' }} />
                        </div>
                    </Tooltip>
                </div>
                <div style={{ position: 'absolute', top: 40, right: -39 }} >
                    <Tooltip title = 'Filter Field Findings'>
                    <div
                        onClick={() => {
                            openFieldFindings()
                        }} style={{
                            width: 28, height: 28, marginRight: 5,
                            backgroundColor: "#fff"
                            , borderRadius: 28 / 2, display: 'flex', alignItems: 'center', justifyContent: "center", cursor: 'pointer'
                        }}>
                        <FilterListIcon style={{ color: '#115293' }} />
                        </div>
                    </Tooltip>
                </div>
            </div>

            <Card style={{ marginTop: 10 }}>
                <CardContent>
                    <div style={{ height: height * .57, overflowY: 'auto' }}>
                        <DailyAccomplishments accomDailyCount={state.accomDailyCount} resetFieldFinding={()=>resetFieldFinding()} />
                    </div>
                </CardContent>
            </Card>
            <Dialog
                fullWidth
                maxWidth="xs"
                open={map_reducer.closeGenerateModal}
                onClose={() => closeModal()}
                aria-labelledby="responsive-dialog-title"
            >
                <DialogTitle id="simple-dialog-title">
                    Generate Accomplishments
                </DialogTitle>
                <DialogContent>
                    <form onSubmit={onSubmit}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} md={12}>
                                <div style={{ position: 'relative' }}>
                                    <TextField value={moment(state.selection.startDate).format('YYYY-MM-DD')} readOnly label='Start date' style={{ width: '100%' }} />
                                    <EventNoteIcon type='button' onClick={openDateModal} style={{ position: 'absolute', right: 2, top: 10, cursor: 'pointer', color: "rgba(6,86,147)", }} />
                                </div>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <div style={{ position: 'relative' }}>
                                    <TextField value={moment(state.selection.endDate).format('YYYY-MM-DD')} readOnly label='End date' style={{ width: '100%' }} />
                                    <EventNoteIcon type='button' onClick={openDateModal} style={{ position: 'absolute', right: 2, top: 10, cursor: 'pointer', color: "rgba(6,86,147)", }} />
                                </div>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <FormControl
                                    size="small"
                                    style={{ width: "100%" }}
                                >
                                    <InputLabel id="demo-simple-select-outlined-label">
                                        Company
                                    </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        onChange={(e) => onChangeCompany(e)}
                                        label="Company"
                                        name="company"
                                        value={state.comp_id}
                                    >
                                        {home_reducer.company_name.map((val, index) => {
                                            return (
                                                <MenuItem key={index} value={val.company_id}>
                                                    {val.company_name}
                                                </MenuItem>
                                            );
                                        })}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <FormControl
                                    size="small"
                                    style={{ width: "100%" }}
                                >
                                    <InputLabel id="demo-simple-select-outlined-label">
                                        Branch
                                    </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        onChangeBranch onChange={(e) => onChangeBranch(e)}
                                        label="branch"
                                        name="branch_id"
                                        value={state.Selected_branch}
                                    >
                                        {home_reducer.SelectedBranches.map((val, index) => {
                                            return (
                                                <MenuItem value={val.branch_id} key={index}>
                                                    {val.branch_company}
                                                </MenuItem>
                                            );
                                        })}
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <FormControl style={{ width: "100%" }} onClick={() => onClickjo_type()} >
                                    <InputLabel shrink htmlFor="select-multiple-native" >
                                        Job Order
                                    </InputLabel>
                                    <Select
                                        labelId="demo-mutiple-name-label"
                                        id="demo-mutiple-name"
                                        multiple
                                        value={personName}
                                        // onChange={handleChange}
                                        input={<Input />}
                                        MenuProps={MenuProps}
                                        readOnly
                                    >
                                        {map_reducer.accom_jo_type.map((val, index) => (
                                            <MenuItem key={index} value={val} style={getStyles(val, personName, theme)}>
                                                {val}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>
                        </Grid>
                        <div style={{ display: "flex", justifyContent: "flex-end" }}>
                            <Button
                                type="submit"
                                variant="contained"
                                style={{
                                    backgroundColor: "rgba(6,86,147)",
                                    color: "white",
                                    margin: 15,
                                }}
                            >
                                Submit
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
            <Dialog fullWidth
                maxWidth="xs"
                open={state.open_date_modal}
                onClose={() => closeDateModal()}
                aria-labelledby="responsive-dialog-title">
                <DialogTitle>Select Date</DialogTitle>
                <DialogContent>
                    <Grid container spacing={1}>
                        <Grid item xs={12} md={12}>
                            <Card variant='outlined'>
                                <div style={{ width: '100%', marginTop: 10, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                    <DateRange
                                        editableDateInputs={true}
                                        moveRangeOnFirstSelection={false}
                                        onChange={onChangeDate}
                                        ranges={[state.selection]}
                                    />
                                </div>
                                <DialogActions>
                                    <Button
                                        type="button"
                                        onClick={() => closeDateModal()}
                                        variant="contained"
                                        style={{
                                            backgroundColor: "rgba(6,86,147)",
                                            color: "white",
                                            margin: 15,
                                        }}
                                    >
                                        OK
                                    </Button>
                                </DialogActions>
                            </Card>
                        </Grid>
                    </Grid>
                </DialogContent>
            </Dialog>
            <Dialog fullWidth maxWidth='xs' open={state.modal_employee} aria-labelledby="responsive-dialog-title" >
                <DialogTitle id="simple-dialog-title">Select Job Order Type</DialogTitle>
                <DialogContent>
                    <form>
                        <Card variant='outlined'>
                            <CardContent>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={12}>
                                        <List component="nav" aria-label="main mailbox folders" >
                                            {map_reducer.accom_jo_type.map((val, index) => {
                                                let value = personName.filter((data) => (data == val))
                                                let check = false
                                                if (value.length != 0) {
                                                    check = true
                                                }
                                                return <>
                                                    <Divider key={index} />
                                                    <FormControlLabel
                                                        control={
                                                            <Checkbox
                                                                checked={check}
                                                                onChange={(event) => { handleListItemClick(event, index, val) }}
                                                                name="checkedB"
                                                                color="primary"
                                                            />
                                                        }
                                                        label={val}
                                                    />
                                                </>
                                            })
                                            }
                                            <Divider />
                                        </List>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => changeEmployee()} color="primary">Close</Button>
                </DialogActions>
            </Dialog>
            <Dialog fullWidth maxWidth='xs' open={state.field_findings_modal} aria-labelledby="responsive-dialog-title" >
                <DialogTitle id="simple-dialog-title">Field Findings</DialogTitle>
                <DialogContent>
                    <form>
                        <Card variant='outlined'>
                            <CardContent>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={12}>
                                        <List component="nav" aria-label="main mailbox folders" >
                                            <Divider />
                                            <FormControlLabel
                                                control={
                                                    <Checkbox
                                                        checked={state.field_findings.length === state.selected_field_findings.length ? true : false}
                                                        onChange={(event) => {
                                                            handleListItemClickFieldFindings(event, '', 'All')
                                                        }}
                                                        name="field_findings"
                                                        color="primary"
                                                    />
                                                }
                                                label={'All'}
                                            />
                                            {state.field_findings.map((val, index) => {
                                                let match = state.selected_field_findings.filter((val_ff) => (val === val_ff))
                                                let check = false
                                                if (match.length > 0) {
                                                    check = true
                                                }
                                                return <>
                                                    <Divider />
                                                    <FormControlLabel
                                                        key={index}
                                                        control={
                                                            <Checkbox
                                                                checked={check}
                                                                onChange={(event) => {
                                                                    handleListItemClickFieldFindings(event, index, val)
                                                                }}
                                                                name="field_findings"
                                                                color="primary"
                                                            />
                                                        }
                                                        label={val}
                                                    />
                                                </>
                                            })
                                            }
                                            <Divider />
                                        </List>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => closeFieldFindings()} color="primary">Close</Button>
                    <Button onClick={() => onFilterFieldFindings()} color="primary">Filter</Button>
                </DialogActions>
            </Dialog>
            <Dialog fullWidth maxWidth='xs' open={state.search_modal} aria-labelledby="responsive-dialog-title" >
                <DialogTitle id="simple-dialog-title">Search</DialogTitle>
                <DialogContent>
                    <form>
                        <Card variant='outlined'>
                            <CardContent>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} md={12}>
                                        <TextField placeholder='Reference No.' name='search' value={state.search} onChange={onChangeText} variant='outlined' style={{ width: '100%' }} size='small' />
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </form>
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => closesearhModal()} color="primary">Close</Button>
                    <Button onClick={() => searchReferenceNo()} color="primary">Search</Button>

                </DialogActions>
            </Dialog>
        </div >
    );
}
export default Accomplishment;