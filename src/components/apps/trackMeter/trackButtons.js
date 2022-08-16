// import MarkerClusterer from '@google/markerclustererplus';
import {
    Typography,
    Grid,
    Card,
    CardContent,
    TableContainer,
    TableHead,
    TableCell,
    Table,
    TableRow,
    TableBody,
    Dialog,
    AppBar,
    Toolbar,
    IconButton,
    TextField
} from "@material-ui/core";
import { Breadcrumbs, Backdrop } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Link from "@material-ui/core/Link";
import React from "react";
// import Loading from '../../assets/loading2.gif'
import { useSelector, useDispatch } from "react-redux";
import moment from 'moment'
import CloseIcon from '@material-ui/icons/Close';
import FilterListIcon from '@material-ui/icons/FilterList';
import WorkIcon from '@material-ui/icons/Work';
import SearchIcon from '@material-ui/icons/Search';
import GetAppIcon from '@material-ui/icons/GetApp';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { getData } from "../../api/api";
import TableChartIcon from '@material-ui/icons/TableChart';
const useStyles = makeStyles({
    root: {
        width: '100%',
        // overflowX: "auto",
    },
    container: {
        maxHeight: 440,

    },
    outlined: {
        borderWidth: 2
    },
    cardFont: {
        fontSize: 13,
        fontWeight: 'bold',
        color: '#fff'
    },
    cardFontCount: {
        fontSize: 29,
        fontWeight: 'bold',
        color: '#fff',
        position: 'absolute'
    },
    cardColor: {
        backgroundColor: '#2ecc71'
    },
    cardColorPending: {
        backgroundColor: '#e67e22'
    },
    cardColorDenied: {
        backgroundColor: '#e74c3c'
    },
    tableHeight: {
        maxHeight: 300
    },
    appBar: {
        backgroundColor: '#fff', color: '#000',
        position: 'fixed',
        width: '100%'
    },
    iconSize: {
        height: 17,
        width: 17,
        cursor: 'pointer'
    }
});

function TrackButtons() {
    const classes = useStyles();
    const dispatch = useDispatch()
    const handleBranch = useSelector((state) => state.home_reducer.handleBranch);
    const SelectedBranches = useSelector((state) => state.home_reducer.SelectedBranches);
    const company_name = useSelector((state) => state.home_reducer.company_name);
    const selectedBranch = useSelector((state) => state.trackAndTraceReducer.selectedBranch);
    const joList = useSelector((state) => state.trackAndTraceReducer.joList);
    const selectedJobOrder = useSelector((state) => state.trackAndTraceReducer.selectedJobOrder);
    const initialFields = useSelector((state) => state.trackAndTraceReducer.initialFields);

    const [filterBranch, setFilterBranch] = React.useState(null);
    const [filterJobOrder, setFilterJobOrder] = React.useState(null);
    const [customizeTable, setCustomizeTable] = React.useState(null);



    const handleClickBranch = (event) => {
        setFilterBranch(event.currentTarget);
    };

    const handleCloseBranch = () => {
        setFilterBranch(null);
    };

    const handleClickJobOrder = (event) => {
        setFilterJobOrder(event.currentTarget);
    };

    const handleCloseJobOrder = () => {
        setFilterJobOrder(null);
    };

    const handleClickCustomizeTable = (event) => {
        setCustomizeTable(event.currentTarget);
    };

    let branchData = handleBranch.filter((val) => (val.branch_field_work != "" && val.branch_field_work != null))
    branchData.sort(function (a, b) {
        return a['branch_name'].localeCompare(b['branch_name']);
    });

    const onChangeBranch = (val) => {
        dispatch({
            type: 'onChangeTrackAndTrace',
            data: {
                selectedBranch: val,
                joList: JSON.parse(val.branch_field_work),
                selectedJobOrder: JSON.parse(val.branch_field_work)[0],
            }
        })
        handleCloseBranch()
    }
    const onChangeJO = (val) => {
        dispatch({
            type: 'onChangeTrackAndTrace',
            data: {
                selectedJobOrder: val,
            }
        })
        handleCloseJobOrder()
    }
    const onTrackMeter = () => {
        let data = {
            branch_id: selectedBranch.branch_id,
            jo_type: selectedJobOrder
        }
        getData('aam/onTrackMeter', data)
    }
    React.useEffect(() => {
        let match = branchData.filter((val) => (val.branch_id == 49))
        if (match.length > 0) {
            dispatch({
                type: 'onChangeTrackAndTrace',
                data: {
                    selectedBranch: match[0],
                    joList: JSON.parse(match[0].branch_field_work),
                    selectedJobOrder: JSON.parse(match[0].branch_field_work)[0],
                }
            })
        } else {
            if (branchData.length > 0) {
                dispatch({
                    type: 'onChangeTrackAndTrace',
                    data: {
                        selectedBranch: branchData[0],
                        joList: JSON.parse(branchData[0].branch_field_work),
                        selectedJobOrder: JSON.parse(branchData[0].branch_field_work)[0],
                    }
                })
            }
        }

    }, [handleBranch.length])


    return (
        <Grid container spacing={1}>
            <Grid item xs={12} md={12}>
                <div style={{ position: 'relative' }}>
                    <TextField style={{ width: '100%' }} />
                    <SearchIcon style={{ position: 'absolute', top: 1, right: 1 }} />
                    <div style={{ position: 'absolute', top: 1, left: 1, display: 'flex' }}>
                        <div style={{ display: 'flex', alignItems: 'center', borderWidth: 1, borderStyle: 'solid', borderColor: '#115293', paddingRight: 10, marginRight: 5 }}>
                            <div style={{ height: '100%', paddingRight: 5, paddingLeft: 5, marginRight: 5, backgroundColor: '#115293', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FilterListIcon style={{ fontSize: 16, }} /></div>
                            <Typography style={{ fontSize: 12 }}>{`${selectedBranch?.branch_name != undefined ? selectedBranch?.branch_name : ''}`}</Typography>
                            {/* <CloseIcon style={{ color: '#115293', fontSize: 17, marginLeft: 5, cursor: 'pointer' }} /> */}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', borderWidth: 1, borderStyle: 'solid', borderColor: '#115293', paddingRight: 10, marginRight: 5 }}>
                            <div style={{ height: '100%', paddingRight: 5, paddingLeft: 5, marginRight: 5, backgroundColor: '#115293', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><WorkIcon style={{ fontSize: 16, }} /></div>
                            <Typography style={{ fontSize: 12 }}>{selectedJobOrder}</Typography>
                            {/* <CloseIcon style={{ color: '#115293', fontSize: 17, marginLeft: 5, cursor: 'pointer' }} /> */}
                        </div>
                    </div>
                </div>
            </Grid>
            <Grid item xs={12} md={12}>
                <button onClick={handleClickBranch} style={{ border: 'none', background: '#115293', color: '#fff', paddingLeft: 10, paddingRight: 10, paddingTop: 5, paddingBottom: 5, cursor: 'pointer', marginRight: 5 }}><FilterListIcon style={{ fontSize: 15, marginRight: 5 }} />Branch</button>
                <Menu
                    id="simple-menu"
                    anchorEl={filterBranch}
                    keepMounted
                    open={Boolean(filterBranch)}
                    onClose={handleCloseBranch}
                >
                    {branchData.map((val, index) => {
                        return <MenuItem key={index} onClick={() => onChangeBranch(val)}>{`${val.branch_name}`}<span style={{ color: '#115293', fontWeight: 'bold', fontSize: 13, marginLeft: 15 }}>{`${val.company_name}`}</span></MenuItem>
                    })
                    }
                </Menu>
                <button onClick={handleClickJobOrder} style={{ border: 'none', background: '#115293', color: '#fff', paddingLeft: 10, paddingRight: 10, paddingTop: 5, paddingBottom: 5, cursor: 'pointer', marginRight: 5 }}><WorkIcon style={{ fontSize: 15, marginRight: 5 }} />Job Order</button>
                <Menu
                    id="simple-menu"
                    anchorEl={filterJobOrder}
                    keepMounted
                    open={Boolean(filterJobOrder)}
                    onClose={handleCloseJobOrder}
                >
                    {joList.map((val, index) => {
                        return <MenuItem key={index} onClick={() => onChangeJO(val)}>{`${val}`}</MenuItem>
                    })
                    }
                </Menu>
                {/* <button onClick={handleClickCustomizeTable} style={{ border: 'none', background: '#115293', color: '#fff', paddingLeft: 10, paddingRight: 10, paddingTop: 5, paddingBottom: 5, cursor: 'pointer', marginRight: 5 }}><TableChartIcon style={{ fontSize: 15, marginRight: 5 }} />Customize Table</button>
                <Menu
                    id="simple-menu"
                    anchorEl={customizeTable}
                    keepMounted
                    open={Boolean(customizeTable)}
                    onClose={() => setCustomizeTable(null)}
                >
                    {joList.map((val, index) => {
                        return <MenuItem key={index} onClick={() => onChangeJO(val)}>{`${val}`}</MenuItem>
                    })
                    }
                </Menu> */}
                {/* <button style={{ border: 'none', background: '#115293', color: '#fff', paddingLeft: 10, paddingRight: 10, paddingTop: 5, paddingBottom: 5, cursor: 'pointer' }}><GetAppIcon style={{ fontSize: 15, marginRight: 5 }} />Export</button> */}
            </Grid>
        </Grid>
    );
}
export default TrackButtons;
