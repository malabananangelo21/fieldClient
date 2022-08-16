import React, { PureComponent, forwardRef, useImperativeHandle } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    Button,
    Grid,
    IconButton,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Card,
    CardContent,
    TableCell,
    TableHead,
    TableRow,
    Table,
    Divider,
    TableBody,
    FormControl,
    FormLabel,
    RadioGroup,
    FormControlLabel,
    Radio,
    Select,
    InputLabel,
    TextField,
    TableContainer,
    MenuItem
} from "@material-ui/core";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import moment from "moment";
import HomeIcon from "@material-ui/icons/Home";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";
import PeopleAltIcon from "@material-ui/icons/PeopleAlt";
import Pie from "./charts/pie";
import KeyboardBackspaceIcon from "@material-ui/icons/KeyboardBackspace";
import FilterListIcon from "@material-ui/icons/FilterList";
import ReorderIcon from '@material-ui/icons/Reorder';
import Slide from "@material-ui/core/Slide";
import Filter from "./filter";
import CloseIcon from "@material-ui/icons/Close";
import { getData, cancelRequest } from "../../../api/api";
import EqualizerIcon from "@material-ui/icons/Equalizer";
import axios from "axios"
import RefreshIcon from '@material-ui/icons/Refresh';
import Summary_monitoring from './summary_monitoring'
import MyLocationIcon from '@material-ui/icons/MyLocation';
import LocationSearchingIcon from '@material-ui/icons/LocationSearching';
import AutoComplete from './autocomplete'
import { regions, provinces, cities, barangays } from 'select-philippines-address';
const CancelToken = axios.CancelToken;
const source = CancelToken.source();
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
const MuiTableCell = withStyles({
    root: {
        borderBottom: "none"
    }
})(TableCell);
let counterError = 0;

const Tracking = forwardRef((props, ref) => {
    const {
        state,
        setState,
        fieldman_map,
    } = props
    const [indexState, setIndexState] = React.useState({
        name: '',
        location: '',
        assignedData: []
    })
    const dispatch = useDispatch()
    const handleChange = (event) => {
        let data = event.target.value
        setState(prev => ({ ...prev, optionTracking: data }))
        setIndexState(prev => ({
            ...prev,
            name: "", location: ""
        }))
    };
    const dispatch_data = (type, data) => {
        dispatch({
            type: type,
            data: data,
        });
    };

    const handleChangeValue = (event) => {
        let data = event.target.value
        setIndexState(prev => ({
            ...prev,
            name: data
        }))
    }
    const handleChangeValueLocation = (event) => {
        let data = event.target.value
        setIndexState(prev => ({
            ...prev,
            location: data
        }))
    }

    const [regionData, setRegion] = React.useState([]);
    const [provinceData, setProvince] = React.useState([]);
    const [cityData, setCity] = React.useState([]);
    const [barangayData, setBarangay] = React.useState([]);

    const [regionAddr, setRegionAddr] = React.useState("");
    const [provinceAddr, setProvinceAddr] = React.useState("");
    const [cityAddr, setCityAddr] = React.useState("");
    const [barangayAddr, setBarangayAddr] = React.useState("");

    const onSubmitSearch = (e) => {
        e.preventDefault();
        let data = {
            name: indexState.name,
            location: indexState.location,
            branch_id: state.Selected_branch,
            provinceAddr: provinceAddr,
            cityAddr: cityAddr,
            barangayAddr: barangayAddr
        }
        dispatch_data("loading_map", true);
        getData('aam/searchAssignedLocation', data)
            .then((res) => {
                setIndexState(prev => ({
                    ...prev,
                    assignedData: res.res
                }))
                dispatch_data("loading_map", false);
            })
    }
    const region = () => {
        regions().then(response => {
            setRegion(response);
        });
    }

    const province = (e) => {
        let data = regionData.filter((val) => val.region_code === e.target.value)
        setRegionAddr(data[0].region_name);
        provinces(e.target.value).then(response => {
            setProvince(response);
            setCity([]);
            setBarangay([]);
        });
    }

    const city = (e) => {
        let data = provinceData.filter((val) => val.province_code === e.target.value)
        setProvinceAddr(data[0].province_name);
        cities(e.target.value).then(response => {
            setCity(response);
        });
    }

    const barangay = (e) => {
        let data = cityData.filter((val) => val.city_code === e.target.value)
        setCityAddr(data[0].city_name);
        barangays(e.target.value).then(response => {
            setBarangay(response);
        });
    }

    const brgy = (e) => {
        let data = barangayData.filter((val) => val.brgy_code === e.target.value)

        setBarangayAddr(data[0].brgy_name);
    }

    React.useEffect(() => {
        region()
    }, [])
    return (

        <form onSubmit={onSubmitSearch}>
            <Card variant={'outlined'}>
                <CardContent>
                    <Grid container spacing={1}>
                        <Grid item xs={12} md={2}>
                            <FormControl size='small' variant="outlined" style={{ width: '100%' }}>
                                <InputLabel htmlFor="outlined-age-native-simple">Type</InputLabel>
                                <Select value={state.optionTracking} variant='outlined' onChange={handleChange} >
                                    <option value="Name">Name</option>
                                    <option value="Location">Location</option>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} md={10}>
                            {state.optionTracking == "Name" ?
                                <FormControl size="small" variant="outlined" style={{ width: "100%" }}>
                                    <InputLabel id="demo-simple-select-outlined-label">
                                        Name
                                    </InputLabel>
                                    <Select
                                        labelId="demo-simple-select-outlined-label"
                                        id="demo-simple-select-outlined"
                                        onChange={handleChangeValue}
                                        label="Rover ID"
                                        name="selected_rover"
                                        value={indexState.name}
                                    >
                                        {fieldman_map.map((val, index) => {
                                            return <MenuItem key={index} value={val.user_id}>{val.completename}</MenuItem>
                                        })
                                        }
                                    </Select>
                                </FormControl>

                                : undefined
                            }
                            {state.optionTracking == "Location" ?
                                <Grid container spacing={1} >
                                    <Grid item xs={12} md={2}>
                                        <FormControl size="small" variant="outlined" style={{ width: "100%" }}>
                                            <InputLabel id="demo-simple-select-outlined-label">
                                                Region
                                            </InputLabel>
                                            <Select
                                                labelId="demo-simple-select-outlined-label"
                                                id="demo-simple-select-outlined"
                                                onChange={province}
                                                onSelect={region}
                                                label="Rover ID"
                                                name="selected_rover"
                                            //   value={val.location.region_code}
                                            >
                                                {
                                                    regionData && regionData.length > 0 && regionData.map((item) => <MenuItem
                                                        key={item.region_code} value={item.region_code}>{item.region_name}</MenuItem>)
                                                }
                                            </Select>
                                        </FormControl>

                                        {/* <AutoComplete newvalue={val.location.description} locationGet={(location) => {
            setState(prev => ({
              ...prev,
              jo_type_assign: state.jo_type_assign.map((jo_data, index_jo) =>
                index === index_jo ? {
                  ...jo_data,
                  location: location
                } : jo_data)
            }))
          }} /> */}
                                    </Grid>
                                    <Grid item xs={12} md={2}>
                                        <FormControl size="small" variant="outlined" style={{ width: "100%" }}>
                                            <InputLabel id="demo-simple-select-outlined-label">
                                                Province
                                            </InputLabel>
                                            <Select
                                                labelId="demo-simple-select-outlined-label"
                                                id="demo-simple-select-outlined"
                                                onChange={city}
                                                label="Rover ID"
                                                name="selected_rover"
                                            //   value={val.location.province_code}
                                            >
                                                {
                                                    provinceData && provinceData.length > 0 && provinceData.map((item) => <MenuItem
                                                        key={item.province_code} value={item.province_code}>{item.province_name}</MenuItem>)
                                                }
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={2}>
                                        <FormControl size="small" variant="outlined" style={{ width: "100%" }}>
                                            <InputLabel id="demo-simple-select-outlined-label">
                                                City
                                            </InputLabel>
                                            <Select
                                                labelId="demo-simple-select-outlined-label"
                                                id="demo-simple-select-outlined"
                                                onChange={barangay}
                                                label="Rover ID"
                                                name="selected_rover"
                                            //   value={val.location.city_code}
                                            >
                                                {
                                                    cityData && cityData.length > 0 && cityData.map((item) => <MenuItem
                                                        key={item.city_code} value={item.city_code}>{item.city_name}</MenuItem>)
                                                }
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={3}>
                                        <FormControl size="small" variant="outlined" style={{ width: "100%" }}>
                                            <InputLabel id="demo-simple-select-outlined-label">
                                                Barangay
                                            </InputLabel>
                                            <Select
                                                labelId="demo-simple-select-outlined-label"
                                                id="demo-simple-select-outlined"
                                                onChange={brgy}
                                                label="Rover ID"
                                                name="selected_rover"
                                            //   value={val.location.barangay_code}
                                            >
                                                {
                                                    barangayData && barangayData.length > 0 && barangayData.map((item) => <MenuItem
                                                        key={item.brgy_code} value={item.brgy_code}>{item.brgy_name}</MenuItem>)
                                                }
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={3}>

                                        <TextField label='Street(Optional)' size="small" style={{ width: '100%' }}  variant={'outlined'} onChange={(e) => {
                                            let location_details = e.target.value
                                            setState(prev => ({
                                                ...prev,
                                                location:location_details
                 
                                            }))
                                        }} />
                                    </Grid>
                                </Grid>
                                : undefined
                            }
                        </Grid>
                        <Grid container item xs={12} md={12} justify="flex-end">
                            <Button
                                type='submit'
                                //   onClick={() => { closeList(); handleClickOpen() }}
                                variant="contained"
                                size="small"
                                //   startIcon={<FilterListIcon />}
                                style={{
                                    backgroundColor: "rgb(17, 82, 147)",
                                    color: "#fff",

                                }}
                            >
                                Search
                            </Button>
                        </Grid>
                    </Grid>
                </CardContent>
            </Card>
            <Card variant='outlined' style={{ marginTop: 10 }}>
                <CardContent>
                    <Typography style={{ fontSize: 13, fontWeight: 'bold' }}>Result : {indexState.assignedData.length}</Typography>
                    <TableContainer style={{ maxHeight: 350 }}>
                        <Table stickyHeader aria-label="sticky table">
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ fontWeight: "bold", fontSize: 12, textAlign: 'center', color: '#fff', backgroundColor: '#2a5793' }}>
                                        NO.
                                    </TableCell>
                                    {cityAddr !== "" ?
                                        <TableCell style={{ fontWeight: "bold", fontSize: 12, textAlign: 'center', color: '#fff', backgroundColor: '#2a5793' }}>
                                            NAME
                                        </TableCell>
                                        : undefined
                                    }
                                    <TableCell style={{ fontWeight: "bold", fontSize: 12, textAlign: 'center', color: '#fff', backgroundColor: '#2a5793' }}>
                                        CITY
                                    </TableCell>
                                    <TableCell style={{ fontWeight: "bold", fontSize: 12, textAlign: 'center', color: '#fff', backgroundColor: '#2a5793' }}>
                                        BRGY
                                    </TableCell>
                                    <TableCell style={{ fontWeight: "bold", fontSize: 12, textAlign: 'center', color: '#fff', backgroundColor: '#2a5793' }}>
                                        STREET
                                    </TableCell>
                                    <TableCell style={{ fontWeight: "bold", fontSize: 12, textAlign: 'center', color: '#fff', backgroundColor: '#2a5793' }}>
                                        TYPE
                                    </TableCell>
                                    <TableCell style={{ fontWeight: "bold", fontSize: 12, textAlign: 'center', color: '#fff', backgroundColor: '#2a5793' }}>
                                        JO COUNT
                                    </TableCell>
                                    <TableCell style={{ fontWeight: "bold", fontSize: 12, textAlign: 'center', color: '#fff', backgroundColor: '#2a5793' }}>
                                        DATE
                                    </TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>

                                {indexState.assignedData.map((val, index) => {
                                    return <TableRow key={index}>
                                        <TableCell>{index + 1}</TableCell>
                                        {cityAddr !== "" ?
                                        <TableCell>{val.title}</TableCell>:undefined}
                                        <TableCell>{val.city}</TableCell>
                                        <TableCell>{val.barangay}</TableCell>
                                        <TableCell>{val.description}</TableCell>

                                       
                                        <TableCell>{val.jo_type}</TableCell>
                                        <TableCell>{val.total_jo}</TableCell>
                                        <TableCell>{moment(val.date).format('YYYY-MM-DD')}</TableCell>

                                    </TableRow>
                                })

                                }

                            </TableBody>
                        </Table>
                    </TableContainer>
                </CardContent>
            </Card>

        </form>

    );
})
export default React.memo(Tracking);
