import React, { PureComponent, forwardRef, useImperativeHandle } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
    Button,
    Grid,
    IconButton,
    Typography,
    TextField,
    Card,
    CardContent,
    Backdrop,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Slide,
    MenuItem,
    TextareaAutosize
} from "@material-ui/core";
import Carousel from "react-material-ui-carousel";
import moment from "moment";
import "../css/home.css";
import HomeIcon from "@material-ui/icons/Home";
import QueryBuilderIcon from "@material-ui/icons/QueryBuilder";

import { getData } from "../../../api/api";

import { Link as NewLink, withRouter, useParams } from "react-router-dom";
import Mapa from "../../map/map2";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import ClearIcon from "@material-ui/icons/Clear";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import RotateRightIcon from "@material-ui/icons/RotateRight";
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { grep } from "jquery";
import { Scrollbars } from "react-custom-scrollbars"
import CheckIcon from "@material-ui/icons/Check";
import EditIcon from '@material-ui/icons/Edit';
import SendIcon from '@material-ui/icons/Send';
const ValidatorFieldman = forwardRef((props, ref) => {
    const { state,
        loadingImage,
        setState,
        imageLoaded,
        onPrevious,
        dispatch_data,
        trackAccom,
        onNext,
        map_reducer,
        field_findings,
        onrefreshMap,
        resetTrackSpan,
        resetSelected } = props
    const [validState, setValidState] = React.useState({
        validation_status: '',
        validator_comment: '',
        validation_remarks: '',
        category_remarks: [],
        validation_remarks_category: '',
        edit: false,
        editFieldFindings: ''
    })
    const [validation_type, setValidation_type] = React.useState('Random JO');
    const [validation_index, setValidation_index] = React.useState('');
    const [validationState, setValidationState] = React.useState({
        openValidation: false,
        joToValidate: [],
        leftPageSelect: false,
        validateValidator: [],
        loading: false,
        fieldFindings: [],
        editTextField: '',
        reading: '',
        accom_remarks:'',
        editData:''
    });
    const onChangeRemarks = (e) => {
        let category = []
        field_findings.forEach((val) => {
            if (val.findings == e.target.value) {

                if (val.category !== null && val.category !== "") {
                    category = JSON.parse(val.category)
                }
            }
        })

        setValidState(prev => ({ ...prev, validation_remarks: e.target.value, category_remarks: category }));
    };
    const onChangeRemarksCategory = (e) => {
        setValidState(prev => ({ ...prev, validation_remarks_category: e.target.value }));
    };
    const handleChangeStatus = (e, userId) => {
        dispatch_data("loading_map", true);
        let accom_id = "";
        state.selectedDetails.map((val, index) => {
            accom_id = val.accom_id;
        });
        let data = {
            value: e.target.value,
            user_id: localStorage.getItem("u"),
            accom_id: accom_id,
        };
        let val2 = e.target.value;
        let user_id = state.fieldman_id;
        getData("tracking/onChangeValidation", data, state.discon).then((res) => {
            if (res.response === true) {
                state.selectedDetails.map((val, index) => {
                    val.validator_remarks = val2;
                });

                state.fieldman_map.forEach((val) => {
                    if (val.user_id === user_id) {
                        val.jo_accom_list.forEach((jo_accom) => {
                            if (jo_accom.accom_id === accom_id) {
                                jo_accom.validator_remarks = val2;
                            }
                        });
                    }
                });

                setValidState((prev) => ({ ...prev, edit: true, validation_status: e.target.value }));
                onrefreshMap()
            }
            dispatch_data("loading_map", false);
        });
    };
    const onSubmitRemarks = (e) => {
        e.preventDefault();
        dispatch_data("loading_map", true);
        let accom_id = "";
        state.selectedDetails.map((val, index) => {
            accom_id = val.accom_id;
        });
        let data = {
            validation_status: validState.validation_status,
            value: validState.validation_remarks,
            user_id: localStorage.getItem("u"),
            accom_id: accom_id,
            validation_remarks_category: validState.validation_remarks_category,
            validator_comment: validState.validator_comment,

        };
        let validation_remarks = validState.validation_remarks;
        let validation_remarks_category = validState.validation_remarks_category;
        let validator_comment = validState.validator_comment;
        let validation_status = validState.validation_status;


        getData("tracking/onChangeValidationRemarks", data).then((res) => {
            if (res.response === true) {
                state.selectedDetails.map((val, index) => {
                    val.validator_remark_type = validation_remarks;
                    val.validator_remark_type_category = validation_remarks_category;
                    val.validator_comment = validator_comment
                    val.validator_remarks = validation_status;
                });
                setValidState((prev) => ({
                    ...prev, edit: false, validation_status: "", validation_status: '',
                    validator_comment: '',
                    validation_remarks: '',
                    category_remarks: [],
                    validation_remarks_category: '',
                }));
            }
            dispatch_data("loading_map", false);
        });
    };
    useImperativeHandle(ref, () => ({
        getAlert() {
            if (validState.validation_status != "") {
                alert('Please submit the validation')
            } else {
                setState(prev => ({ ...prev, openModalDetails: false }))
                setValidation_type('')
                setValidation_index('')

            }
        }
    }));
    const invalid = (data) => {
        setValidation_type(data)
        setValidation_index('')
    }
    const countValidationPercentage = () => {
        let percent = parseInt(state.trackAccomMasterList.length * (map_reducer.count_validation_logs / 100));
        if (state.trackAccomMasterList.length <= 50) {
            percent = state.trackAccomMasterList.length;
        }
        if (percent < 50) {
            if (state.trackAccomMasterList.length > 50) {
                percent = 50;
            }
        }
        let interval = parseInt(state.trackAccomMasterList.length / percent);
        let interval_array = [];

        for (let index = 0; index < percent; index++) {
            const index_val = interval * index;
            interval_array.push(index_val);
        }

        let total = trackAccom.reduce((count, val, index) => {
            let match_random = interval_array.filter(
                (val) => val == index
            );
            let match_val = false;
            if (match_random.length > 0) {
                match_val = true;
            }
            if (
                (val.validator_remarks === "Invalid" ||
                    val.validator_remarks === "INVALID" ||
                    val.validator_remarks === "Valid" ||
                    val.validator_remarks === "VALID") &&
                match_val
            ) {
                count++;
            }
            return count;
        }, 0);

        let countVal = trackAccom.length * 0.2;
        if (trackAccom.length <= 50) {
            countVal = trackAccom.length;
        }
        if (countVal < 50) {
            if (trackAccom.length > 50) {
                countVal = 50;
            }
        }
        let remaining = parseInt(countVal) - total;
        if (remaining < 0) {
            remaining = 0;
        }
        return remaining;
    };
    const onEditData = (name) => {
        setValidationState(prev => ({
            ...prev,
            editTextField: name
        }))

        if (name === 'Field Findings') {
            let data = {
                branch_id: state.selectedDetails[0].branch_id,
                category_type: state.selectedDetails[0].accom_jo_type + ' ' + 'Field Finding',
            }
            getData("aam/getFieldfindingsForEdit", data).then((res) => {
                setValidationState(prev => ({
                    ...prev,
                    loading: false,
                    fieldFindings: res.res,

                }))
            })
        }

    }
    const onChangeEditFindings = (e, prev_findings) => {
        dispatch_data("loading_map", true);
        let data = {
            accom_id: state.selectedDetails[0].accom_id,
            accom_findings: e.target.value,
            user_id: localStorage.getItem('u'),
            prev_findings: prev_findings
        }
        getData("aam/update_findings", data).then((res) => {
            if (res.res) {
                state.selectedDetails[0].accom_findings = data.accom_findings
                map_reducer.selected_details.forEach((val) => {
                    if (val.name === 'Field Findings') {
                        val.value = data.accom_findings
                    }
                })
            }
            setValidationState(prev => ({ fieldFindings: [] }))
            dispatch_data("loading_map", false);
        })
    }
    const onChangeEdit= (e, key,value,prev_value) => {
        dispatch_data("loading_map", true);
        let data = {
            accom_id: state.selectedDetails[0].accom_id,
            value: value,
            user_id: localStorage.getItem('u'),
            prev: prev_value,
            field: key
        }
        getData("aam/update_remarks", data).then((res) => {
            if (res.res) {
                state.selectedDetails[0][key] = value
                map_reducer.selected_details.forEach((val) => {
                    if (val.key === key) {
                        val.value = value
                    }
                })
            }
            setValidationState(prev => ({  loading: true,fieldFindings: [],editData:'',editTextField:'', }))
            dispatch_data("loading_map", false);
        })
    }
    const onChangeText = (e,val) => {
        setValidationState((prev) => ({
            ...prev,
            editData: e.target.value
        }))
    }
    console.log(map_reducer.selected_details)

    return (
        <div>
            {state.selectedDetails.map((val, index) => {
                let images = [];
                let validator_remarks = "";
                let validator_remark_type = "";
                let validator_remark_type_category = "";
                let validator_name = "";
                let date_validated = "";
                let validator_comment = "";

                let percent = parseInt(state.trackAccomMasterList.length * (parseInt(20) / 100));
                if (state.trackAccomMasterList.length <= 50) {
                    percent = state.trackAccomMasterList.length;
                }
                if (percent < 50) {
                    if (state.trackAccomMasterList.length > 50) {
                        percent = 50;
                    }
                }
                let interval = parseInt(state.trackAccomMasterList.length / percent);
                let interval_array = [];

                for (let index = 0; index < percent; index++) {
                    const index_val = interval * index;
                    interval_array.push(index_val);
                }

                let match_random = interval_array.filter(
                    (val) => val == state.new_pickIndex
                );

                if (val.accom_images !== "" && val.accom_images !== null) {
                    images = JSON.parse(val.accom_images);
                }
                if (
                    val.validator_remarks != "" &&
                    val.validator_remarks != null
                ) {
                    validator_remarks = val.validator_remarks;
                }
                if (
                    val.validator_remark_type != "" &&
                    val.validator_remark_type != null
                ) {
                    validator_remark_type = val.validator_remark_type;
                }
                if (
                    val.validator_remark_type_category != "" &&
                    val.validator_remark_type_category != null
                ) {
                    validator_remark_type_category = val.validator_remark_type_category;
                }
                if (val.user_lname != null) {
                    validator_name = val.user_lname + " " + val.user_fname;
                }
                if (val.date_validated != null) {
                    date_validated = val.date_validated;
                }
                if (val.validator_comment != null && val.validator_comment != "") {
                    validator_comment = val.validator_comment
                }
                let borderColor = undefined;
                let borderWidth = undefined;
                let borderStyle = undefined;
                let display = 'none'
                if (match_random.length > 0) {
                    borderColor = "#e67e22";
                    borderWidth = 4;
                    borderStyle = "solid";
                    display = undefined
                }
                let latlong = String(val.fetched_coordinates);
                let splitlatlng = latlong.split(",");
                let lat_data = splitlatlng[0];
                let lng_data = splitlatlng[1];
                return <Grid container spacing={1}>
                    <Grid item xs={12} md={5}>
                        <Grid container spacing={1}>
                            <Grid item xs={12} md={12}>
                                <Card style={{ position: "relative" }} variant="outlined">
                                    {(val.image_path !== "" && val.image_path !== null) ? (
                                        <div style={{ position: "relative" }}>
                                            <div style={{
                                                display: loadingImage ? "block" : "none", width: "100%",
                                                height: "45vh", position: 'absolute', backgroundColor: '#fff', zIndex: 99
                                            }}>
                                                <div style={{ display: 'flex', width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}>
                                                    <Typography style={{ fontWeight: 'bold' }}>
                                                        Loading image...
                                                    </Typography>
                                                </div>
                                            </div>
                                            <Carousel style={{ display: loadingImage ? "none" : "block", position: 'absolute' }} autoPlay={false} >
                                                {images.map((images, index) => {
                                                    return (
                                                        <TransformWrapper
                                                            defaultScale={1}
                                                            defaultPositionX={200}
                                                            defaultPositionY={100}
                                                        >
                                                            {({
                                                                zoomIn,
                                                                zoomOut,
                                                                resetTransform,
                                                                ...rest
                                                            }) => (
                                                                <React.Fragment>
                                                                    <div
                                                                        className="tools"
                                                                        style={{
                                                                            position: "absolute",
                                                                            display: "flex",
                                                                            flexDirection: "row",

                                                                            marginTop: 10,
                                                                            marginLeft: 10,
                                                                            marginBottom: 10,
                                                                        }}
                                                                    >
                                                                        <IconButton
                                                                            style={{
                                                                                backgroundColor: "rgba(0,0,0,0.6)",
                                                                                fontWeight: "bold",
                                                                                color: "#fff",
                                                                                borderStyle: "none",
                                                                                fontSize: 20,
                                                                                marginRight: 7,
                                                                                width: 40,
                                                                                height: 40,
                                                                                borderRadius: 40 / 2,
                                                                                // borderRadius: 3,
                                                                                outline: "none",
                                                                                zIndex: 999999999999999999,
                                                                            }}
                                                                            onClick={zoomIn}
                                                                        >
                                                                            <AddIcon
                                                                                style={{
                                                                                    color: "#fff",
                                                                                    fontSize: 15,
                                                                                }}
                                                                            />
                                                                        </IconButton>
                                                                        <br />
                                                                        <IconButton
                                                                            style={{
                                                                                backgroundColor: "rgba(0,0,0,0.6)",
                                                                                fontWeight: "bold",
                                                                                color: "#fff",
                                                                                borderStyle: "none",
                                                                                fontSize: 20,
                                                                                marginRight: 7,
                                                                                width: 40,
                                                                                height: 40,
                                                                                borderRadius: 40 / 2,
                                                                                // borderRadius: 3,
                                                                                outline: "none",
                                                                                zIndex: 999999999999999999,
                                                                            }}
                                                                            onClick={zoomOut}
                                                                        >
                                                                            <RemoveIcon
                                                                                style={{
                                                                                    color: "#fff",
                                                                                    fontSize: 22,
                                                                                }}
                                                                            />
                                                                        </IconButton>
                                                                        <br />
                                                                        <IconButton
                                                                            style={{
                                                                                backgroundColor: "rgba(0,0,0,0.6)",
                                                                                fontWeight: "bold",
                                                                                color: "#fff",
                                                                                borderStyle: "none",
                                                                                fontSize: 20,
                                                                                marginRight: 7,
                                                                                width: 40,
                                                                                height: 40,
                                                                                borderRadius: 40 / 2,
                                                                                // borderRadius: 3,
                                                                                outline: "none",
                                                                                zIndex: 999999999999999999,
                                                                            }}
                                                                            onClick={resetTransform}
                                                                        >
                                                                            <ClearIcon
                                                                                style={{
                                                                                    color: "#fff",
                                                                                    fontSize: 22,
                                                                                }}
                                                                            />
                                                                        </IconButton>
                                                                        <IconButton
                                                                            style={{
                                                                                backgroundColor: "rgba(0,0,0,0.6)",
                                                                                fontWeight: "bold",
                                                                                color: "#fff",
                                                                                borderStyle: "none",
                                                                                fontSize: 20,
                                                                                marginRight: 7,
                                                                                width: 40,
                                                                                height: 40,
                                                                                borderRadius: 40 / 2,
                                                                                // borderRadius: 3,
                                                                                outline: "none",
                                                                                zIndex: 999999999999999999,
                                                                            }}
                                                                            onClick={() => {
                                                                                setState(prev => ({ ...prev, degree: state.degree - 90, }))
                                                                            }}
                                                                        >
                                                                            <RotateLeftIcon
                                                                                style={{
                                                                                    color: "#fff",
                                                                                    fontSize: 22,
                                                                                }}
                                                                            />
                                                                        </IconButton>
                                                                        <IconButton
                                                                            style={{
                                                                                backgroundColor: "rgba(0,0,0,0.6)",
                                                                                fontWeight: "bold",
                                                                                color: "#fff",
                                                                                borderStyle: "none",
                                                                                fontSize: 20,
                                                                                marginRight: 7,
                                                                                width: 40,
                                                                                height: 40,
                                                                                borderRadius: 40 / 2,
                                                                                zIndex: 999999999999999999,
                                                                            }}
                                                                            onClick={() => {
                                                                                setState(prev => ({ ...prev, degree: state.degree + 90, }))
                                                                            }}
                                                                        >
                                                                            <RotateRightIcon
                                                                                style={{
                                                                                    color: "#fff",
                                                                                    fontSize: 22,
                                                                                }}
                                                                            />
                                                                        </IconButton>
                                                                    </div>
                                                                    <TransformComponent
                                                                        style={{ zIndex: 999 }}
                                                                    >
                                                                        <img
                                                                            // onClick={() => {
                                                                            //   onCLickImage(images);
                                                                            // }}
                                                                            src={
                                                                                "https://api.workflow.gzonetechph.com/assets/img/meter/" +
                                                                                images.path
                                                                            }
                                                                            onLoad={imageLoaded}
                                                                            alt="test"
                                                                            style={{
                                                                                width: window.innerWidth * 0.400,
                                                                                height: window.innerHeight * 0.450,
                                                                                transform:
                                                                                    "rotate(" +
                                                                                    String(state.degree) +
                                                                                    "deg)",
                                                                            }}
                                                                        />
                                                                    </TransformComponent>
                                                                </React.Fragment>
                                                            )}
                                                        </TransformWrapper>

                                                    );
                                                })
                                                }</Carousel>
                                        </div>
                                    ) : (
                                        <Carousel style={{ display: loadingImage ? "none" : "block", position: 'absolute' }} autoPlay={false} >
                                            <img
                                                src={require("../../../../assets/map image/no_image.png")}
                                                alt="test"
                                                onLoad={imageLoaded}
                                                style={{ width: "100%", height: "40vh" }}
                                            />
                                        </Carousel>)}
                                </Card>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <div >
                                    <Mapa />
                                </div>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={5}>
                        <Card variant={'outlined'}>
                            <CardContent>
                                <Grid container spacing={1}>
                                    <Grid item xs={12} md={12}>
                                        <Typography style={{ textAlign: 'center' }}>Accomplishment Details</Typography>
                                    </Grid>
                                    <Grid item xs={12} md={12}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', padding: 10 }}>
                                            {state.new_pickIndex > 0 ?
                                                <div onClick={() => {
                                                    if (validState.validation_status != "") {
                                                        alert('Please submit the validation')
                                                    } else {
                                                        setValidState(prev => ({ ...prev, edit: false }))
                                                        onPrevious(state.new_pickIndex - 1)
                                                        dispatch_data('latitude', (lat_data))
                                                        dispatch_data('longitude', (lng_data))
                                                    }


                                                }} style={{ cursor: 'pointer', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                                    <ArrowLeftIcon style={{ color: "#1b5ea0" }} />
                                                    <Typography style={{ fontSize: 14, fontWeight: 'bold', color: "#1b5ea0" }}>
                                                        PREVIOUS
                                                    </Typography>
                                                </div> :
                                                <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                                    <ArrowLeftIcon style={{ color: '#969696' }} />
                                                    <Typography style={{ fontSize: 14, color: '#969696', fontWeight: 'bold' }}>
                                                        PREVIOUS
                                                    </Typography>
                                                </div>
                                            }
                                            <div>
                                                <Typography style={{ fontSize: 14, color: '#1b5ea0', fontWeight: 'bold' }}>
                                                    {(state.new_pickIndex + 1) + ' / ' + trackAccom.length}
                                                </Typography>
                                            </div>
                                            {state.new_pickIndex < trackAccom.length - 1 ?
                                                <div onClick={() => {
                                                    if (validState.validation_status != "") {
                                                        alert('Please submit the validation')
                                                    } else {
                                                        setValidState(prev => ({ ...prev, edit: false }))
                                                        onNext(state.new_pickIndex + 1);
                                                        dispatch_data('latitude', (lat_data))
                                                        dispatch_data('longitude', (lng_data))
                                                    }

                                                }} style={{ cursor: 'pointer', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                                    <Typography style={{ fontSize: 14, fontWeight: 'bold', color: "#1b5ea0" }}>
                                                        NEXT
                                                    </Typography>
                                                    <ArrowRightIcon style={{ color: "#1b5ea0" }} />
                                                </div>
                                                : <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center' }}>
                                                    <Typography style={{ fontSize: 14, color: '#969696', fontWeight: 'bold' }}>
                                                        NEXT
                                                    </Typography>
                                                    <ArrowRightIcon style={{ color: '#969696' }} />
                                                </div>
                                            }
                                        </div>
                                    </Grid>
                                    <div style={{ height: 0.9, width: '100%', backgroundColor: '#cfcfcf', marginBottom: 5 }} />
                                    <Grid item xs={12} md={12}>
                                        <Typography style={{
                                            fontSize: 14,
                                            fontWeight: "bold",
                                            color: "#1b5ea0",
                                        }}>VALIDATION</Typography>
                                        <Typography
                                            style={{
                                                fontSize: 13,
                                                color: "rgb(247, 159, 31)",
                                                fontWeight: "bold",
                                                display: display
                                            }}
                                        >
                                            REQUIRED TO VALIDATE
                                        </Typography>
                                    </Grid>
                                    {/* <Grid item xs={12} md={12}>
                                        <CheckCircleIcon/>
                                    </Grid> */}
                                    {val.validator_remarks != "" &&
                                        val.validator_remarks != null ? (
                                        !validState.edit ? <>
                                            <Grid item xs={12} md={6}>
                                                <div style={{}}>
                                                    <TextField
                                                        multiline
                                                        style={{ width: "100%" }}
                                                        size="small"
                                                        id="filled-read-only-input"
                                                        label="Status"
                                                        value={validator_remarks}
                                                        variant="outlined"
                                                    />
                                                </div>
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <div style={{}}>
                                                    <TextField
                                                        multiline
                                                        style={{ width: "100%" }}
                                                        size="small"
                                                        id="filled-read-only-input"
                                                        label="Field Findings"
                                                        value={validator_remark_type}
                                                        variant="outlined"
                                                    />
                                                </div>
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <div style={{}}>
                                                    <TextField
                                                        multiline
                                                        size="small"
                                                        style={{ width: "100%" }}
                                                        id="filled-read-only-input"
                                                        label="Remarks"
                                                        value={validator_remark_type_category}
                                                        variant="outlined"
                                                    />
                                                </div>
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <div style={{}}>
                                                    <TextField
                                                        multiline
                                                        size="small"
                                                        style={{ width: "100%" }}
                                                        id="filled-read-only-input"
                                                        label="Comment"
                                                        value={validator_comment}
                                                        variant="outlined"
                                                    />
                                                </div>
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <div style={{}}>
                                                    <TextField
                                                        multiline
                                                        size="small"
                                                        style={{ width: "100%" }}
                                                        id="filled-read-only-input"
                                                        label="Validator"
                                                        value={validator_name}

                                                        variant="outlined"
                                                    />
                                                </div>
                                            </Grid>
                                            <Grid item xs={12} md={6}>
                                                <div style={{}}>
                                                    <TextField
                                                        multiline
                                                        size="small"
                                                        style={{ width: "100%" }}
                                                        id="filled-read-only-input"
                                                        label="Date"
                                                        value={date_validated}

                                                        variant="outlined"
                                                    />
                                                </div>
                                            </Grid>
                                            <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
                                                <Button
                                                    onClick={() => {
                                                        setValidState(prev => ({ ...prev, edit: true }));
                                                    }}
                                                    variant="contained"
                                                    style={{
                                                        backgroundColor: "rgba(6,86,147)",
                                                        color: "white",
                                                        margin: 15,
                                                    }}
                                                >
                                                    Edit
                                                </Button>
                                            </div>
                                        </> :
                                            <Grid xs={12} md={12}>
                                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingLeft: 20, paddingRight: 20 }}>
                                                    <Card variant='outlined' style={{ width: '60%' }}>
                                                        <CardContent>
                                                            <form onSubmit={onSubmitRemarks}>
                                                                <TextField
                                                                    required
                                                                    select
                                                                    label="Select Status"
                                                                    style={{ width: '100%' }}
                                                                    value={validState.validation_status}
                                                                    onChange={(e) => {
                                                                        // handleChangeStatus(e, val)
                                                                        setValidState(prev => ({ ...prev, validation_status: e.target.value }))
                                                                    }}
                                                                >
                                                                    <MenuItem value='VALID'>
                                                                        VALID
                                                                    </MenuItem>
                                                                    <MenuItem value='INVALID' >
                                                                        INVALID
                                                                    </MenuItem>
                                                                </TextField>
                                                                {validState.validation_status === 'INVALID' ?
                                                                    <>
                                                                        <TextField
                                                                            required
                                                                            select
                                                                            label="Findings"
                                                                            style={{ width: '100%' }}
                                                                            value={validState.validation_remarks}
                                                                            onChange={onChangeRemarks}

                                                                        >
                                                                            {field_findings.map(
                                                                                (val_findings) => {
                                                                                    if (
                                                                                        val_findings.status ===
                                                                                        validState.validation_status
                                                                                    )
                                                                                        return (
                                                                                            <MenuItem
                                                                                                value={
                                                                                                    val_findings.findings
                                                                                                }
                                                                                            >
                                                                                                {val_findings.findings}
                                                                                            </MenuItem>
                                                                                        );
                                                                                }
                                                                            )}
                                                                        </TextField>
                                                                        {validState.category_remarks.length > 0 ?
                                                                            <TextField
                                                                                required
                                                                                select
                                                                                label="Remarks"
                                                                                style={{ width: '100%' }}
                                                                                value={validState.validation_remarks_category}
                                                                                onChange={onChangeRemarksCategory}
                                                                            >
                                                                                {validState.category_remarks.map(
                                                                                    (val_findings) => {

                                                                                        return (
                                                                                            <MenuItem
                                                                                                value={
                                                                                                    val_findings
                                                                                                }
                                                                                            >
                                                                                                {val_findings}
                                                                                            </MenuItem>
                                                                                        );
                                                                                    }
                                                                                )}
                                                                            </TextField>
                                                                            : undefined}

                                                                        <div>
                                                                            <TextareaAutosize onChange={(e) => {
                                                                                setValidState(prev => ({ ...prev, validator_comment: e.target.value }))
                                                                            }} aria-label="minimum height" minRows={4} placeholder="Enter your comment" style={{ width: '100%', marginTop: 10, height: 40 }} />
                                                                        </div>
                                                                    </>
                                                                    : <div>
                                                                        <TextareaAutosize onChange={(e) => {
                                                                            setValidState(prev => ({ ...prev, validator_comment: e.target.value }))
                                                                        }} aria-label="minimum height" minRows={4} placeholder="Enter your comment" style={{ width: '100%', marginTop: 10, height: 40 }} />
                                                                    </div>

                                                                }
                                                                <div
                                                                    style={{
                                                                        display: "flex",
                                                                        justifyContent: "flex-end",
                                                                    }}
                                                                >
                                                                    <Button
                                                                        onClick={() => {

                                                                            setValidState(prev => ({
                                                                                ...prev,
                                                                                edit: false,
                                                                                validation_status: '',
                                                                                validator_comment: '',
                                                                                validation_remarks: '',
                                                                                category_remarks: [],
                                                                                validation_remarks_category: '',
                                                                            }));


                                                                        }}
                                                                        variant="contained"
                                                                        type="button"
                                                                        style={{
                                                                            backgroundColor: "#636e72",
                                                                            color: "white",
                                                                            marginTop: 15,
                                                                            marginBottom: 15,
                                                                        }}
                                                                    >
                                                                        Cancel
                                                                    </Button>
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
                                                        </CardContent>

                                                    </Card>

                                                </div>

                                            </Grid>) :
                                        (<Grid xs={12} md={12}>
                                            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingLeft: 20, paddingRight: 20 }}>
                                                <Card variant='outlined' style={{ width: '60%' }}>
                                                    <CardContent>
                                                        <form onSubmit={onSubmitRemarks}>
                                                            <TextField
                                                                select
                                                                label="Select Status"
                                                                style={{ width: '100%' }}
                                                                value={validState.validation_status}
                                                                onChange={(e) => {
                                                                    // handleChangeStatus(e, val)
                                                                    setValidState(prev => ({ ...prev, validation_status: e.target.value }))


                                                                }}
                                                            >
                                                                <MenuItem value='VALID'>
                                                                    VALID
                                                                </MenuItem>
                                                                <MenuItem value='INVALID' >
                                                                    INVALID
                                                                </MenuItem>
                                                            </TextField>
                                                            {validState.validation_status === 'INVALID' ?
                                                                <>
                                                                    <TextField
                                                                        select
                                                                        label="Findings"
                                                                        style={{ width: '100%' }}
                                                                        value={validState.validation_remarks}
                                                                        onChange={onChangeRemarks}

                                                                    >
                                                                        {field_findings.map(
                                                                            (val_findings) => {
                                                                                if (
                                                                                    val_findings.status ===
                                                                                    validState.validation_status
                                                                                )
                                                                                    return (
                                                                                        <MenuItem
                                                                                            value={
                                                                                                val_findings.findings
                                                                                            }
                                                                                        >
                                                                                            {val_findings.findings}
                                                                                        </MenuItem>
                                                                                    );
                                                                            }
                                                                        )}
                                                                    </TextField>
                                                                    {validState.category_remarks.length > 0 ?
                                                                        <TextField
                                                                            select
                                                                            label="Remarks"
                                                                            style={{ width: '100%' }}
                                                                            value={validState.validation_remarks_category}
                                                                            onChange={onChangeRemarksCategory}
                                                                        >
                                                                            {validState.category_remarks.map(
                                                                                (val_findings) => {

                                                                                    return (
                                                                                        <MenuItem
                                                                                            value={
                                                                                                val_findings
                                                                                            }
                                                                                        >
                                                                                            {val_findings}
                                                                                        </MenuItem>
                                                                                    );
                                                                                }
                                                                            )}
                                                                        </TextField>
                                                                        : undefined}

                                                                    <div>
                                                                        <TextareaAutosize onChange={(e) => {
                                                                            setValidState(prev => ({ ...prev, validator_comment: e.target.value }))
                                                                        }} aria-label="minimum height" minRows={4} placeholder="Enter your comment" style={{ width: '100%', marginTop: 10, height: 40 }} />
                                                                    </div>
                                                                </>
                                                                : <div>
                                                                    <TextareaAutosize onChange={(e) => {
                                                                        setValidState(prev => ({ ...prev, validator_comment: e.target.value }))
                                                                    }} aria-label="minimum height" minRows={4} placeholder="Enter your comment" style={{ width: '100%', marginTop: 10, height: 40 }} />
                                                                </div>

                                                            }
                                                            <div
                                                                style={{
                                                                    display: "flex",
                                                                    justifyContent: "flex-end",
                                                                }}
                                                            >
                                                                <Button
                                                                    onClick={() => {

                                                                        setValidState(prev => ({
                                                                            ...prev,
                                                                            edit: false,
                                                                            validation_status: '',
                                                                            validator_comment: '',
                                                                            validation_remarks: '',
                                                                            category_remarks: [],
                                                                            validation_remarks_category: '',
                                                                        }));


                                                                    }}
                                                                    variant="contained"
                                                                    type="button"
                                                                    style={{
                                                                        backgroundColor: "#636e72",
                                                                        color: "white",
                                                                        marginTop: 15,
                                                                        marginBottom: 15,
                                                                    }}
                                                                >
                                                                    Cancel
                                                                </Button>

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
                                                    </CardContent>

                                                </Card>

                                            </div>

                                        </Grid>)}
                                    {state.comparison.length > 0 ?
                                        <Grid item xs={12} md={12}>
                                            <Typography style={{
                                                fontSize: 14,
                                                fontWeight: "bold",
                                                color: "#1b5ea0",
                                            }}>COMPARISON</Typography>
                                        </Grid> :
                                        undefined

                                    }

                                    {state.comparison.map((val, index) => {
                                        return (
                                            <Grid item xs={12} md={4} key={index}>
                                                <div style={{}}>
                                                    <TextField
                                                        multiline
                                                        size="small"
                                                        style={{ width: "100%" }}
                                                        id="filled-read-only-input"
                                                        label={val.type}
                                                        value={val.value}
                                                        variant="outlined"
                                                    />
                                                </div>
                                            </Grid>
                                        );
                                    })}
                                    <Grid item xs={12} md={12}>
                                        <Typography style={{
                                            fontSize: 14,
                                            fontWeight: "bold",
                                            color: "#1b5ea0",
                                        }}>DETAILS</Typography>
                                    </Grid>
                                    {map_reducer.selected_details.map((val, index) => {
                                        let edit = false
                                        let edit_button = 'none'
                                        if(typeof val?.edit != 'undefined'){
                                            if(val?.edit == 1){
                                                edit = true
                                                edit_button = undefined
                                            }
                                        }
                                        return (
                                            <Grid item xs={12} md={6} key={index}>
                                                <div style={{ position: 'relative' }}>
                                                    <TextField
                                                        multiline
                                                        size="small"
                                                        style={{ display: validationState.editTextField === val.name ? 'none' : undefined, width: "100%" }}
                                                        id="filled-read-only-input"
                                                        label={val.name}
                                                        value={val.value}
                                                        variant="outlined"
                                                    />
                                                    
                                                    {validationState.editTextField === 'Field Findings' && edit == true && val.name === 'Field Findings' ?
                                                        <TextField
                                                            required
                                                            select
                                                            size="small"
                                                            variant="outlined"
                                                            label="Select Status"
                                                            style={{ width: '100%' }}

                                                            onChange={(e) => {
                                                                onChangeEditFindings(e, val.value)
                                                            }}
                                                        >
                                                            {validationState.fieldFindings.map((val, index) => {
                                                                return <MenuItem value={val.category_details}>
                                                                    {val.category_details}
                                                                </MenuItem>
                                                            })

                                                            }

                                                        </TextField> : undefined
                                                    }
                                                    {/* {validationState.editTextField === val.name && val.name === 'Remarks' ?
                                                       <div style={{ position: 'relative' }}>
                                                       <TextField
                                                           multiline
                                                           size="small"
                                                           style={{ width: "100%" }}
                                                           id="filled-read-only-input"
                                                           label='Remarks'
                                                           name='accom_remarks'
                                                           value={validationState.accom_remarks}
                                                           onChange={onChangeText}
                                                           variant="outlined"
                                                       /> <SendIcon onClick={() => onChangeEdit('', val.name,validationState.accom_remarks,val.value)} style={{ position: 'absolute', right: 7, top: 10, height: 18, width: 18, cursor: 'pointer', color: "#1b5ea0" }} /></div>: undefined
                                                    } */}
                                                    {validationState.editTextField !== 'Field Findings' && validationState.editTextField === val.name && edit == true ?
                                                        <div style={{ position: 'relative' }}>
                                                            <TextField
                                                                multiline
                                                                size="small"
                                                                style={{ width: "100%" }}
                                                                id="filled-read-only-input"
                                                                label={val.name}
                                                                name= {val.key}
                                                                onChange={onChangeText}
                                                                variant="outlined"
                                                            /> <SendIcon onClick={() => onChangeEdit('', val.key,validationState.editData,val.value)} style={{ position: 'absolute', right: 7, top: 10, height: 18, width: 18, cursor: 'pointer', color: "#1b5ea0" }} /></div> : undefined
                                                    }
                                                    {
                                                        validationState.editTextField === val.name ?
                                                            <div style={{ display: validationState.loading == true?undefined:'none', position: 'absolute', right: 20, top: 5, height: 10, width: 10 }}>
                                                                <div style={{ height: 15, width: 15 }} className="loadermap2" ></div>
                                                            </div>
                                                            :
                                                            <EditIcon onClick={() => onEditData(val.name)} style={{ display: edit_button, position: 'absolute', right: 7, top: 5, height: 15, width: 15, cursor: 'pointer', color: "#1b5ea0" }} />
                                                    }
                                                </div>
                                            </Grid>
                                        );
                                    })}
                                    {state.actual_reading.length > 0 ?
                                        <Grid item xs={12} md={12}>
                                            <Typography style={{
                                                fontSize: 14,
                                                fontWeight: "bold",
                                                color: "#1b5ea0",
                                            }}>ACTUAL READING</Typography>
                                        </Grid>
                                        : undefined
                                    }

                                    {state.actual_reading.map((val, index) => {
                                        return (
                                            <Grid item xs={12} md={6} key={index}>
                                                <div style={{}}>
                                                    <TextField
                                                        multiline
                                                        size="small"
                                                        style={{ width: "100%" }}
                                                        id="filled-read-only-input"
                                                        label={val.type}
                                                        value={val.value}
                                                        variant="outlined"
                                                    />
                                                </div>
                                            </Grid>
                                        );
                                    })}
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item xs={12} md={2}>
                        {/* <Card variant="outlined"> */}
                        <Grid container spacing={1}>
                            <Grid item xs={12} md={4}>
                                <Card onClick={() => { resetTrackSpan(); invalid('Random JO') }} style={{ backgroundColor: '#e67e22', paddingTop: 15, paddingBottom: 15, cursor: 'pointer' }}>
                                    <Typography style={{ color: '#fff', textAlign: 'center', fontWeight: 'bold', }}>{countValidationPercentage()}</Typography>
                                </Card>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Card onClick={() => { resetTrackSpan(); invalid("Valid") }} style={{ backgroundColor: '#2ecc71', paddingTop: 15, paddingBottom: 15, cursor: 'pointer' }}>
                                    <Typography style={{ color: '#fff', textAlign: 'center', fontWeight: 'bold' }}>{trackAccom.reduce((count, val) => {
                                        if (
                                            val.validator_remarks === "Valid" ||
                                            val.validator_remarks === "VALID"
                                        ) {
                                            count++;
                                        }
                                        return count;
                                    }, 0)}</Typography>
                                </Card>
                            </Grid>
                            <Grid item xs={12} md={4}>
                                <Card onClick={() => { resetTrackSpan(); invalid("Invalid") }} style={{ backgroundColor: '#e74c3c', paddingTop: 15, paddingBottom: 15, cursor: 'pointer' }}>
                                    <Typography style={{ color: '#fff', textAlign: 'center', fontWeight: 'bold' }}>{trackAccom.reduce((count, val) => {
                                        if (
                                            val.validator_remarks === "Invalid" ||
                                            val.validator_remarks === "INVALID"
                                        ) {
                                            count++;
                                        }
                                        return count;
                                    }, 0)}</Typography>
                                </Card>
                            </Grid>
                            {state.comparison.length > 0 ?
                                <Grid item xs={12} md={12}>
                                    <Card onClick={() => {
                                        resetTrackSpan(); invalid("Discripancy")
                                    }} variant="outlined" style={{ padding: 5, display: 'flex', justifyContent: 'space-beteen' }}>
                                        <Typography style={{ fontWeight: 'bold' }}>
                                            DISCREPANCY : {
                                                trackAccom.reduce((count, val) => {
                                                    let previous = val.present_reading - val.previous_reading
                                                    let present = val.present_reading - val.actual_reading
                                                    let percentReading = (previous *.10)
                                                   
                                                    if (percentReading < present || present < 0 ) {
                                                        count++
                                                    }
                                                    return count
                                                }, 0)
                                            }
                                        </Typography>

                                    </Card>
                                </Grid> : undefined

                            }

                            <Grid item xs={12} md={12}>
                                <Card>
                                    {validation_type == "Valid" || validation_type == "Invalid" ? <div
                                    >
                                        <Scrollbars style={{ height: 700 }}>
                                            {trackAccom.map((val, index) => {
                                                let bg_color = undefined
                                                let color = '#000'
                                                if (index === validation_index) {
                                                    bg_color = '#000'
                                                    color = '#fff'
                                                }
                                                let match = false
                                                if (
                                                    val.validator_remarks === validation_type ||
                                                    val.validator_remarks ===
                                                    String(validation_type).toUpperCase()
                                                ) {
                                                    match = true
                                                    if (state.new_pickIndex == index) {
                                                        bg_color = '#000'
                                                        color = '#fff'
                                                    }
                                                }
                                                if (match)
                                                    return (
                                                        <div
                                                            key={index}
                                                            onClick={() => {
                                                                var latlong = "";
                                                                var splitlatlng = "";
                                                                var lat = "";
                                                                var lng = "";
                                                                var complete_name = "";
                                                                splitlatlng = val.fetched_coordinates.split(",");
                                                                lat = splitlatlng[0];
                                                                lng = splitlatlng[1];

                                                                setValidation_index(index)

                                                                resetSelected()
                                                                onNext(index)
                                                                dispatch_data('latitude', (lat))
                                                                dispatch_data('longitude', (lng))

                                                                // setmapOption({
                                                                //   ...mapOption,
                                                                //   lat: parseFloat(lat),
                                                                //   lng: parseFloat(lng),
                                                                //   zoom: 20,
                                                                // });
                                                                // onClickMarker2(
                                                                //   val,
                                                                //   index,
                                                                //   lat,
                                                                //   lng,
                                                                //   val.fetched_coordinates,
                                                                //   "single"
                                                                // );
                                                                // onToggleOpen(index);
                                                            }}
                                                            key={index}
                                                            style={{
                                                                display: "flex",
                                                                flexDirection: "row",
                                                                alignItems: "center",
                                                                justifyContent: "flex-start",
                                                                backgroundColor: bg_color,
                                                                padding: 10,
                                                                cursor: 'pointer'
                                                            }}
                                                        >
                                                            <div
                                                                onClick={(e) => {
                                                                    e.stopPropagation();
                                                                    if (
                                                                        state.validation_priviledge != null &&
                                                                        state.validation_priviledge != ""
                                                                    ) {
                                                                        setValidationState(prev => ({ ...prev, openValidation: true, joToValidate: val }))

                                                                    }
                                                                }}
                                                                style={{
                                                                    display: "flex",
                                                                    width: 13.5,
                                                                    height: 13.5,
                                                                    borderRadius: 13.5 / 2,
                                                                    backgroundColor:
                                                                        validation_type === "Invalid"
                                                                            ? val.validation_validator_status === "Valid"
                                                                                ? "#e74c3c"
                                                                                : "#e74c3c"
                                                                            : val.validation_validator_status === "Invalid"
                                                                                ? "#27ae60"
                                                                                : "#27ae60",
                                                                    marginRight: 10,
                                                                    alignItems: "center",
                                                                    justifyContent: "center",
                                                                    color: "#fff",
                                                                    padding: 5,
                                                                }}
                                                            >
                                                                {val.validation_validator_status === "Valid" ? (
                                                                    <CheckIcon style={{ fontSize: 20 }} />
                                                                ) : val.validation_validator_status === "Invalid" ? (
                                                                    <ClearIcon style={{ fontSize: 20 }} />
                                                                ) : undefined}
                                                            </div>
                                                            <Typography style={{ color: color, fontSize: 14 }}>
                                                                {val.meter_number} | {val.accom_findings}
                                                            </Typography>
                                                        </div>
                                                    );
                                            })}
                                        </Scrollbars>
                                    </div>
                                        : undefined
                                    }
                                    {validation_type == "Random JO" ? <div
                                    >
                                        <Scrollbars style={{ height: 700 }}>
                                            {trackAccom.map((val, index) => {
                                                let bg_color = undefined
                                                let color = '#000'
                                                if (index === validation_index) {
                                                    bg_color = '#000'
                                                    color = '#fff'
                                                }
                                                let match_random = state.index_randomJOToValidate.filter(
                                                    (val) => val == index
                                                );

                                                let match = false;
                                                if (match_random.length > 0) {
                                                    if (
                                                        val.validator_remarks !== "VALID" &&
                                                        val.validator_remarks !== "INVALID"
                                                    ) {
                                                        match = true;
                                                        if (state.new_pickIndex == index) {
                                                            bg_color = '#000'
                                                            color = '#fff'
                                                        }
                                                    }
                                                }
                                                if (match)
                                                    return (
                                                        <div
                                                            key={index}
                                                            onClick={() => {
                                                                if (validState.validation_status != "") {
                                                                    alert('Please submit the validation')
                                                                } else {
                                                                    var latlong = "";
                                                                    var splitlatlng = "";
                                                                    var lat = "";
                                                                    var lng = "";
                                                                    var complete_name = "";
                                                                    splitlatlng = val.fetched_coordinates.split(",");
                                                                    lat = splitlatlng[0];
                                                                    lng = splitlatlng[1];
                                                                    setValidation_index(index)
                                                                    onNext(index)
                                                                    dispatch_data('latitude', (lat))
                                                                    dispatch_data('longitude', (lng))
                                                                }
                                                            }}
                                                            key={index}
                                                            style={{
                                                                display: "flex",
                                                                flexDirection: "row",
                                                                alignItems: "center",
                                                                justifyContent: "flex-start",
                                                                backgroundColor: bg_color,
                                                                padding: 10,
                                                                cursor: 'pointer'
                                                            }}
                                                        >
                                                            <div

                                                                style={{
                                                                    display: "flex",
                                                                    width: 13.5,
                                                                    height: 13.5,
                                                                    borderRadius: 13.5 / 2,
                                                                    backgroundColor: "#e67e22",
                                                                    marginRight: 10,
                                                                    alignItems: "center",
                                                                    justifyContent: "center",
                                                                    color: "#fff",
                                                                    padding: 5,
                                                                    cursor: 'pointer'
                                                                }}
                                                            >
                                                                {val.validation_validator_status === "Valid" ? (
                                                                    <CheckIcon style={{ fontSize: 20 }} />
                                                                ) : val.validation_validator_status === "Invalid" ? (
                                                                    <ClearIcon style={{ fontSize: 20 }} />
                                                                ) : undefined}
                                                            </div>
                                                            <Typography style={{ color: color, fontSize: 14 }}>
                                                                {val.meter_number} | {val.accom_findings}
                                                            </Typography>
                                                        </div>
                                                    );
                                            })}
                                        </Scrollbars>
                                    </div>
                                        : undefined
                                    }
                                    {validation_type == "Discripancy" ? <div
                                    >
                                        <Scrollbars style={{ height: 700 }}>
                                            {trackAccom.map((val, index) => {
                                                let bg_color = undefined
                                                let color = '#000'
                                                if (index === validation_index) {
                                                    bg_color = '#000'
                                                    color = '#fff'
                                                }
                                                let match = false;
                                                let previous = val.present_reading - val.previous_reading
                                                let present = val.present_reading - val.actual_reading
                                                let percentReading = (previous *.10)
                                               
                                                if (percentReading < present || present < 0 ) {
                                                    match = true
                                                }
                                               
                                                if (match)
                                                    return (
                                                        <div
                                                            key={index}
                                                            onClick={() => {
                                                                var latlong = "";
                                                                var splitlatlng = "";
                                                                var lat = "";
                                                                var lng = "";
                                                                var complete_name = "";
                                                                splitlatlng = val.fetched_coordinates.split(",");
                                                                lat = splitlatlng[0];
                                                                lng = splitlatlng[1];
                                                                setValidation_index(index)
                                                                onNext(index)
                                                                dispatch_data('latitude', (lat))
                                                                dispatch_data('longitude', (lng))
                                                                // setmapOption({
                                                                //   ...mapOption,
                                                                //   lat: parseFloat(lat),
                                                                //   lng: parseFloat(lng),
                                                                //   zoom: 20,
                                                                // });
                                                                // onClickMarker2(
                                                                //   val,
                                                                //   index,
                                                                //   lat,
                                                                //   lng,
                                                                //   val.fetched_coordinates,
                                                                //   "single"
                                                                // );
                                                                // onToggleOpen(index);
                                                            }}
                                                            key={index}
                                                            style={{
                                                                display: "flex",
                                                                flexDirection: "row",
                                                                alignItems: "center",
                                                                justifyContent: "flex-start",
                                                                backgroundColor: bg_color,
                                                                padding: 10,
                                                                cursor: 'pointer'
                                                            }}
                                                        >
                                                            <div

                                                                style={{
                                                                    display: "flex",
                                                                    width: 13.5,
                                                                    height: 13.5,
                                                                    borderRadius: 13.5 / 2,
                                                                    backgroundColor: "#e67e22",
                                                                    marginRight: 10,
                                                                    alignItems: "center",
                                                                    justifyContent: "center",
                                                                    color: "#fff",
                                                                    padding: 5,
                                                                    cursor: 'pointer'
                                                                }}
                                                            >
                                                                {val.validation_validator_status === "Valid" ? (
                                                                    <CheckIcon style={{ fontSize: 20 }} />
                                                                ) : val.validation_validator_status === "Invalid" ? (
                                                                    <ClearIcon style={{ fontSize: 20 }} />
                                                                ) : undefined}
                                                            </div>
                                                            <Typography style={{ color: color, fontSize: 14 }}>
                                                                {val.meter_number} | {val.accom_findings}
                                                            </Typography>
                                                        </div>
                                                    );
                                            })}
                                        </Scrollbars>
                                    </div>
                                        : undefined
                                    }
                                </Card>
                            </Grid>

                        </Grid>

                        {/* </Card> */}

                    </Grid>
                </Grid>
            })}

        </div>
    );
})
export default ValidatorFieldman;
