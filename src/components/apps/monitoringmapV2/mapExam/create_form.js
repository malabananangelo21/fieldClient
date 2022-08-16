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
    TextField,
    FormControl,
    Select,
    MenuItem,
    Button,
    Tooltip
} from "@material-ui/core";
import { Breadcrumbs, Backdrop } from '@material-ui/core';
import Link from "@material-ui/core/Link";
import React from "react";
import {
    HashRouter as Router,
    BrowserRouter,
    Route,
    useParams,
    Redirect,
    Link as NewLink,
    useHistory
} from "react-router-dom";
// import Loading from '../../assets/loading2.gif'
import { useSelector, useDispatch } from "react-redux";
import Map from './monitoringMap'
import MapImage1 from './map3.PNG'
import MapImage2 from './map2.jpg'
import axios from "axios"
import AutoComplete from './autocomplete'
import { getData } from "../../../api/api";
import SaveIcon from '@material-ui/icons/Save';
import VisibilityIcon from '@material-ui/icons/Visibility';
import CloseIcon from '@material-ui/icons/Close';
let GOOGLE_MAPS_APIKEY = 'AIzaSyB04YACNd6OwYwtU8eR4t-eeqXDe7jdX_A'
function renderPropsAreEqual(prevProps, nextProps) {
    if (prevProps === nextProps) {
        return true;
    } else {
        return false;
    }
}

function CreateForm({ coordinates, viewcoordinates, refreshData }) {
    const home_reducer = useSelector((state) => state.home_reducer);
    let dispatch = useDispatch()
    const [mapOption, setmapOption] = React.useState({
        zoom: 12,
        lat: 13.7565,
        lng: 121.0583,
    });

    const [setTimer, setsetTimer] = React.useState("")
    const [resultPlaces, setresultPlaces] = React.useState("")
    const [inputedPlace, setinputedPlace] = React.useState("")
    const [state, setState] = React.useState({
        company_id: '',
        data: [],
        branch_id: '',
        location: '',
        lat: '',
        lng: '',
        autoComplete: [],
        selected_location: '',
        selectedData: [],
        exam_location_name: ''


    })
    const dispatch_data = (type, data) => {
        dispatch({
            type: type,
            data: data,
        });
    };

    const getCustomPlaces = (places) => {
        let holder = places
        setinputedPlace(places)
        clearTimeout(setTimer)
        const timerSet = setTimeout(() => {
            // setspinner(true)
            fetchPlacesSearch(holder)
        }, 1000)
        setsetTimer(timerSet)
    }

    async function fetchPlacesSearch(holder) {

        let parameters = '?' + 'input=' + holder + '&' + 'location=13.7565,121.0583' + '&' + 'radius=15000' + '&key=' + GOOGLE_MAPS_APIKEY
        getData('aam/autocomplete', parameters).then((res) => {

            setState(prev => ({
                ...prev,
                autoComplete: JSON.parse(res.res).predictions
            }))
            console.log(JSON.parse(res.res))
        })
    }

    const onChangeCompany = (e) => {
        const branches_data = home_reducer.handleBranch.filter(
            (val) => val.company_id == e.target.value
        );
        branches_data.sort(function (a, b) {
            return a["branch_name"].localeCompare(b["branch_name"]);
        });
        dispatch_data("SelectedBranches", branches_data);

        setState({ ...state, company_id: e.target.value });
    };
    const onChangeBranch = (e) => {
        dispatch_data("loading_map", true);

        let data = {
            branch_id:e.target.value 
        }
        getData('aam/getExamLocation',data).then((res)=>{
            setState({ ...state, branch_id: e.target.value ,data:res.data});
            dispatch_data("loading_map", false);
        })
    }
    const onSubmit = (e) => {
        e.preventDefault();
        if (typeof state.selectedData.description === "undefined") {
            alert('Please select a location.')
        } else {
            let data = {
                company_id: state.company_id,
                branch_id: state.branch_id,
                lat: state.selectedData.lat,
                lng: state.selectedData.lng,
                description: state.selectedData.description,
                number: state.selectedData.number,
                exam_location_name: String(state.exam_location_name).toLocaleUpperCase()
            }
            state.data.push(data)
            setState(prev => ({
                ...prev,
                selected_location: '',
                selectedData: [],
                exam_location_name:''
            }))
        }
    }
    const onSaveCoordinates = (e) => {
        e.preventDefault();
        let data = {
            user_id: localStorage.getItem('u'),
            data: state.data

        }
        console.log(data)
    }


    const handleSelect = (suggestion) => {
        // When user selects a place, we can replace the keyword without request data from API
        // by setting the second parameter as "false"

        let parameters = '?' + 'placeid=' + suggestion.place_id + '&key=' + GOOGLE_MAPS_APIKEY
        getData('aam/getLocation', parameters).then((res) => {
            console.log(JSON.parse(res.res))

            let respJson = JSON.parse(res.res)
            if (respJson.status === "OK") {
                let details_Array = {
                    lat: respJson.result.geometry.location.lat,
                    lng: respJson.result.geometry.location.lng,
                    description: suggestion.description,
                    number: state.data.length + 1,
                    exam_location_name: state.exam_location_name
                }
                coordinates(details_Array)
                setState(prev => ({
                    ...prev,
                    selected_location: suggestion.description,
                    autoComplete: [],
                    selectedData: details_Array
                }))
            }

        })

    }

    const renderSuggestions = () => {
        return <div style={{ maxHeight: 100, overflowY: 'auto' }} variant="outlined">
            <div>
                {
                    state.autoComplete.map((suggestion, index) => {
                        return (
                            <li
                                key={index}
                                onClick={() => handleSelect(suggestion)}
                            >
                                <Typography style={{ fontSize: 14 }}>
                                    <strong>{suggestion.description}</strong>
                                </Typography>

                            </li>
                        )
                    })

                }
            </div>

        </div>

    }
    const onRemoveCoordinates = (index) => {
        if (window.confirm("Are you sure you want to remove this location")) {
            state.data.splice(index, 1)
            setState(prev => ({
                ...prev
            }))
            refreshData()
        }
    }
    const saveData = () => {
        let data = {
            locations: state.data,
            user_id: localStorage.getItem('u')
        }
        if (state.data.length === 0) {
            alert('Please add locations.')
        } else {
            if (window.confirm("Are you sure you want to save these location")) {
                getData('aam/saveLocations', data).then((res) => {

                })

            }
        }

    }

    // async function getPlaceCoords(selectedplace){
    //     let parameters = '?'+'placeid='+selectedplace.place_id+'&key='+GOOGLE_MAPS_APIKEY
    //     let resp = await fetch(`https://maps.googleapis.com/maps/api/place/details/json`+parameters);
    //     let respJson = await resp.json();
    //     var push_array = []

    //     if(respJson.status === "OK"){
    //       var details_Array = {
    //         latitude:respJson.result.geometry.location.lat,
    //         longitude:respJson.result.geometry.location.lng,
    //         type:selected_type,
    //         description:selectedplace.description,
    //       }
    //       const filtered_pin = coordinates_pin.filter(function(item){
    //         return item.type === selected_type;
    //       })
    //       if(filtered_pin.length === 0){
    //         Dispatch({
    //           type:'taxi_concat_coordinates',
    //           location_array:details_Array,
    //         })
    //       }else{
    //         var replaced_index = []
    //         coordinates_pin.map((type,index) => {
    //           if(type.type === selected_type){
    //             replaced_index[index] = details_Array
    //           }else{
    //             replaced_index[index] = type
    //           }
    //         })

    //         Dispatch({
    //           type:'taxi_origin_destination',
    //           location_array:replaced_index,
    //         })
    //       }
    //       Dispatch({
    //         type:'taxi_renderingmap',
    //         update_previouspage:true,
    //       })

    //       setTimeout(()=>{
    //         navigation.navigate('Taxi_Map')
    //       },300)
    //     }
    //   }
    return (
        <div style={{ padding: 10, position: 'absolute' }}>
            <Grid container spacing={1}>
                <Grid item xs={12} md={12}>
                    <Card style={{ background: '#ffff' }}>
                        <CardContent>
                            <form onSubmit={onSubmit}>
                                <Grid container spacing={1}>
                                    <Grid item xs={12} md={12}>
                                        <Typography variant="p" style={{ fontWeight: 'bold', color: '#115293' }}>Create Location</Typography>
                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                        <Typography variant="p" style={{ fontWeight: 'bold' }}>Company</Typography>
                                        <FormControl
                                            required
                                            variant='outlined'
                                            size="small"
                                            style={{ width: "100%" }}
                                        >
                                            <Select
                                                labelId="demo-simple-select-outlined-label"
                                                id="demo-simple-select-outlined"
                                                onChange={onChangeCompany}
                                                name="company"
                                            // value={state.comp_id}
                                            >
                                                {home_reducer.company_name.map((val) => {
                                                    return (
                                                        <MenuItem value={val.company_id}>
                                                            {val.company_name}
                                                        </MenuItem>
                                                    );
                                                })}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                        <Typography variant="p" style={{ fontWeight: 'bold' }}>Branch</Typography>
                                        <FormControl
                                            required
                                            variant="outlined"
                                            size="small"
                                            style={{ width: "100%" }}
                                        >

                                            <Select
                                                labelId="demo-simple-select-outlined-label"
                                                id="demo-simple-select-outlined"
                                                onChange={onChangeBranch}
                                                name="branch_id"
                                            // value={branches.Selected_branch}
                                            >
                                                {home_reducer.SelectedBranches.map((val, index) => {
                                                    return (
                                                        <MenuItem value={val.branch_id}>
                                                            {val.branch_company}
                                                        </MenuItem>
                                                    );
                                                })}
                                            </Select>
                                        </FormControl>
                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                        <Typography variant="p" style={{ fontWeight: 'bold' }}>Exam Location Name</Typography>
                                        <TextField
                                            required
                                            id="standard-multiline-static"
                                            variant='outlined'
                                            multiline
                                            rows={1}
                                            style={{ width: '100%' }}
                                            size='small'
                                            value={state.exam_location_name}
                                            onChange={(e) => {
                                                let data = e.target.value
                                                setState(prev => ({
                                                    ...prev,
                                                    exam_location_name: data
                                                }))
                                            }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                        <Typography variant="p" style={{ fontWeight: 'bold' }}>Find Location</Typography>
                                        <TextField
                                            id="standard-multiline-static"
                                            variant='outlined'
                                            multiline
                                            rows={1}
                                            style={{ width: '100%' }}
                                            size='small'
                                            value={state.selected_location}
                                            onChange={(e) => {
                                                let data = e.target.value
                                                getCustomPlaces(data)
                                                setState(prev => ({
                                                    ...prev,
                                                    selected_location: data
                                                }))
                                            }}
                                        />
                                        {renderSuggestions()}



                                        {/* <AutoComplete locationGet={(location) => {
                                          coordinates(location)
                                            setState(prev => ({
                                                ...prev,
                                                location: location.description,
                                                lat: location.lat,
                                                lng: location.lng
                                            }))
                                        }} /> */}
                                    </Grid>

                                    <Grid container justify="flex-end" item xs={12} md={12}>
                                        <Button
                                            // onClick={() => { closeList(); handleClickOpen() }}
                                            variant="contained"
                                            size="small"
                                            type='submit'

                                            style={{
                                                backgroundColor: "rgb(17, 82, 147)",
                                                color: "#fff",
                                                marginRight: 10,
                                            }}
                                        >
                                            Add
                                        </Button>
                                    </Grid>
                                </Grid>
                            </form>
                        </CardContent>
                    </Card>

                </Grid>

                <Grid item xs={12} md={12}>
                    <Card>
                        <CardContent>
                            <Grid container spacing={1}>
                                <Grid item xs={12} md={12}>
                                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                                        <Typography variant="p" style={{ fontWeight: 'bold', color: '#115293' }}>Locations : <span>{state.data.length}</span></Typography>

                                        <div>
                                            <Tooltip title="Preview">
                                                <VisibilityIcon onClick={() => { viewcoordinates(state.data) }} style={{ color: "rgb(17, 82, 147)", cursor: 'pointer', marginRight: 12 }} /></Tooltip>
                                            <Tooltip title="Save">
                                                <SaveIcon onClick={() => { saveData() }} style={{ color: "rgb(17, 82, 147)", cursor: 'pointer' }} /></Tooltip>
                                        </div>

                                    </div>
                                </Grid>
                                <Grid item xs={12} md={12}>
                                    <div style={{ maxHeight: 130, overflowY: 'auto' }}>
                                        {state.data.map((val, index) => {
                                            return <div style={{ display: 'flex', flexDirection: 'column', marginBottom: 2, marginBottom: 5 }}>
                                                <Card variant="outlined" style={{ padding: 5, display: 'flex', justifyContent: 'space-between' }}>
                                                    <Typography variant="p">{index + 1}. {val.description}</Typography>
                                                    <CloseIcon style={{ cursor: 'pointer' }} onClick={() => { onRemoveCoordinates(index) }} />
                                                </Card>

                                            </div>

                                        })

                                        }
                                    </div>


                                </Grid>
                            </Grid>
                        </CardContent>
                    </Card>

                </Grid>
            </Grid>
        </div>
    );
}
export default React.memo(CreateForm, renderPropsAreEqual);
