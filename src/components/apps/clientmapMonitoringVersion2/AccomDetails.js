import logo from '../../../logo.svg';
import '../../../App.css';
import React, { useContext } from 'react';
import ClientMapContext from '../../context/clientMapContext/ClientMap';
import GoogleMap from './map'
import '../../css/clientMap/clientMap.css'
import Accomplishment from './Accomplishment';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { useDispatch, useSelector } from "react-redux";
import Carousel from "react-material-ui-carousel";
import { getData, serverImageMeter } from "../../api/api";
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
    Checkbox

} from "@material-ui/core";
import moment from 'moment';
import { useAccomDetails } from './hooks/accomDetails'
import { Scrollbars } from "react-custom-scrollbars";
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import CloseIcon from "@material-ui/icons/Close";
import Lightbox from "react-awesome-lightbox";
import FilterListIcon from "@material-ui/icons/FilterList";
import "react-awesome-lightbox/build/style.css";
let width = window.innerWidth;
const DailyAccomplishments = React.memo((props) => {
    const { onShowInfoWindow } = props
    const { state,
        onPrevious,
        onNext,
        NewMarker,
        onClose,
        openLightbox,
        closeLightbox,
        onSelectImage } = useAccomDetails();
    const selected_data = useSelector((state) => state.map_reducer.selected_data);
    const selectedAccomIndex = useSelector((state) => state.map_reducer.selectedAccomIndex);


    return (
        <div style={{ position: 'absolute', right: 5, width: 420, top: 60 }}>
           
            {selected_data.map((val, index) => {
                let imagePath = []
                imagePath = JSON.parse(val.accom_images)
                return <Card>
                    <CardContent>
                        <div style={{ position: 'relative' }}>
                            <Typography style={{ fontSize: 15, fontWeight: 'bold' }}>Accomplishment</Typography>
                            <CloseIcon onClick={() => onClose()} style={{ position: 'absolute', top: 0, right: 0,cursor:'pointer' }} />
                        </div>


                        <Grid container spacing={1}>
                            <Grid item xs={4} md={4}>
                                <div
                                    onClick={() => {
                                        let id = selectedAccomIndex - 1
                                        onShowInfoWindow(id); onPrevious(id)
                                    }}
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",

                                        alignItems: "center",
                                        justifyContent: "center",
                                        cursor: 'pointer'
                                    }}
                                >
                                    <ArrowLeftIcon style={{ fontSize: 40 }} />
                                    <Typography style={{ fontSize: 13 }}>Previous</Typography>
                                </div>
                            </Grid>
                            <Grid item xs={4} md={4}>
                                <div
                                    // onClick={() => onPrevious(state.new_pickIndex - 1)}
                                    style={{
                                        marginTop: 8,
                                        display: "flex",
                                        flexDirection: "row",

                                        alignItems: "center",
                                        justifyContent: "center",
                                    }}
                                >
                                    <Typography style={{ fontSize: 13 }}>{selectedAccomIndex + 1}</Typography>
                                    <Typography style={{ fontSize: 13 }}> /  </Typography>

                                    <Typography style={{ fontSize: 13 }}>{NewMarker.length}</Typography>
                                </div>{" "}
                            </Grid>
                            <Grid item xs={4} md={4}>
                                <div
                                    onClick={() => {
                                        let id = selectedAccomIndex + 1
                                        onShowInfoWindow(id);
                                        onNext(id)

                                    }}
                                    style={{
                                        display: "flex",
                                        flexDirection: "row",

                                        alignItems: "center",
                                        justifyContent: "center",
                                        cursor: 'pointer'
                                    }}
                                >
                                    <Typography style={{ fontSize: 13 }}>Next</Typography>
                                    <ArrowRightIcon style={{ fontSize: 40 }} />
                                </div>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <Carousel
                                    navButtonsAlwaysVisible={true}
                                    autoPlay={false}
                                >
                                    {imagePath.length !== 0 ? (
                                        imagePath.map((valImage, index) => {
                                            return (
                                                <img
                                                    onClick={() => {
                                                        onSelectImage(serverImageMeter, imagePath)
                                                        // setState({
                                                        //     ...state,
                                                        //     selectedPic: valImage.path,
                                                        //     OpenPic: true,
                                                        // });
                                                    }}
                                                    src={
                                                        serverImageMeter +
                                                        valImage.path
                                                    }
                                                    alt="test"
                                                    style={{ width: "100%", height: "200px" }}
                                                />
                                            );
                                        })
                                    ) : (
                                        <img
                                            src={require("../../../assets/map image/no_image.png")}
                                            alt="test"
                                            style={{ width: "100%", height: "300px" }}
                                        />
                                    )}
                                </Carousel>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <Scrollbars style={{ height: 250 }}>
                                    <Card variant='outlined'>
                                        <CardContent>
                                            <Typography style={{ fontSize: 14, fontWeight: 'bold' }}>
                                                Details
                                            </Typography>
                                            <div style={{

                                            }}>
                                                {state.selected_details.map((val) => {
                                                    return (
                                                        <div
                                                            style={{
                                                                display: "flex",
                                                                flexDirection: "row",
                                                                alignItems: "center",
                                                                margin: 10
                                                            }}
                                                        >
                                                            <div
                                                                style={{
                                                                    width: 8,
                                                                    height: 8,
                                                                    borderRadius: 8 / 2,
                                                                    marginRight: 8,
                                                                }}
                                                            />
                                                            <Grid container>
                                                                <Grid item xs={6} md={6}>
                                                                    {val.name}
                                                                </Grid>
                                                                <Grid item xs={1} md={1}>
                                                                    :
                                                                </Grid>
                                                                <Grid item xs={5} md={5}>
                                                                    <span style={{ fontWeight: 'bold' }}>{val.value}</span>
                                                                </Grid>
                                                            </Grid>

                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </CardContent>
                                    </Card>
                                </Scrollbars>
                            </Grid>
                        </Grid>
                    </CardContent>
                </Card>
            })

            }
            <Dialog
                fullWidth
                maxWidth="sm"
                aria-labelledby="responsive-dialog-title"
                onClose={() => {
                    closeLightbox()
                }} open={state.openFile}>
                {/* <DialogContent> */}
                {/* <FilesDIsplay />
                     */}
                <Lightbox image={state.imageDisplay.length === 1 ? state.imageDisplay[0] : state.imageDisplay} images={state.imageDisplay.length > 1 ? state.imageDisplay : undefined} onClose={() => {
                    closeLightbox()
                }} />
                {/* {state.imageDisplay.map((val,index)=>{
                    
                    if(index == 0 )
                    <iframe src={val.url} title="W3Schools Free Online Web Tutorials"></iframe>

                })

                } */}

                {/* </DialogContent> */}
            </Dialog>

        </div >
    );
})
export default DailyAccomplishments;