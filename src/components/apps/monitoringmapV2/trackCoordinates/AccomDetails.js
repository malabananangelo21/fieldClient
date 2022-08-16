import '../../../../App.css';
import React, { useContext } from 'react';
// import '../../css/clientMap/clientMap.css'
import '../../../css/clientMap/clientMap.css'
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';
import { useDispatch, useSelector } from "react-redux";
import Carousel from "react-material-ui-carousel";
import { getData, serverImageMeter } from "../../../api/api";
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
    Table,
    TableContainer,
    TableHead,
    TableRow,
    TableCell,
    TableBody

} from "@material-ui/core";
import moment from 'moment';
// import { useAccomDetails } from './hooks/accomDetails'
// import {useAccomDetails} from '../../clientmapMonitoringVersion2/hooks/accomDetails'
import { Scrollbars } from "react-custom-scrollbars";
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import CloseIcon from "@material-ui/icons/Close";
import Lightbox from "react-awesome-lightbox";
import FilterListIcon from "@material-ui/icons/FilterList";
import "react-awesome-lightbox/build/style.css";
import { makeStyles, withStyles, useTheme } from "@material-ui/core/styles";
import No_image from '../../../../assets/map image/no_image.png'
let width = window.innerWidth;

const useStyles = makeStyles({
    customTable: {
        "& .MuiTableCell-sizeSmall": {
            padding: "5px 0px 5px 15px" // <-- arbitrary value
        }
    },
});
const DailyAccomplishments = React.memo((props) => {
    const classes = useStyles();
    let dispatch = useDispatch()
    const { imageDisplay,closeLightbox,openFile,onSelectImage,onClose, NewMarker, selected_details, singleDetails, new_pickIndex, onNext, onPrevious } = props
 
    return (
        <div style={{ position: 'absolute', right: 5, width: 420, top: 100 }}>

            {singleDetails.map((val, index) => {
                let imagePath = []
                if (val.accom_images != '' && val.accom_images != null) {
                    imagePath = JSON.parse(val.accom_images)
                }
                return <Card>
                    <CardContent>
                        <div style={{ position: 'relative' }}>
                            <Typography style={{ fontSize: 15, fontWeight: 'bold' }}>Accomplishment</Typography>
                            <CloseIcon onClick={() => {
                                onClose()
                            }} style={{ position: 'absolute', top: 0, right: 0, cursor: 'pointer' }} />
                        </div>
                        <Grid container spacing={1}>
                            <Grid item xs={4} md={4}>
                                <div
                                    onClick={() => {
                                        let id = new_pickIndex - 1
                                        onPrevious(id)
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
                                    <Typography style={{ fontSize: 13 }}>{new_pickIndex + 1}</Typography>
                                    <Typography style={{ fontSize: 13 }}> /  </Typography>

                                    <Typography style={{ fontSize: 13 }}>{NewMarker.length}</Typography>
                                </div>{" "}
                            </Grid>
                            <Grid item xs={4} md={4}>
                                <div
                                    onClick={() => {
                                        let id = new_pickIndex + 1
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
                                                        onSelectImage(serverImageMeter,imagePath)
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
                                                    style={{ width: "100%", height: "200px",cursor:'pointer' }}
                                                />
                                            );
                                        })
                                    ) : (
                                        <img
                                            src={require("../../../../assets/map image/no_image.png")}
                                            alt="test"
                                            style={{ width: "100%", height: "210px" }}
                                        />
                                    )}
                                </Carousel>
                            </Grid>
                            <Grid item xs={12} md={12}>
                                <Scrollbars style={{ height: 210 }}>
                                    <Card variant='outlined'>
                                        <CardContent>
                                            <TableContainer style={{ maxHeight: 365 }}>
                                                <Table hover stickyHeader aria-label="sticky table" classes={{ root: classes.customTable }} size="small">
                                                    <TableHead>
                                                        <TableRow>
                                                            <TableCell>DETAILS</TableCell>
                                                            <TableCell></TableCell>
                                                        </TableRow>
                                                    </TableHead>
                                                    <TableBody>
                                                        {selected_details.map((val) => {
                                                            return <TableRow>
                                                                <TableCell style={{ fontWeight: 600 }}>{val.name}</TableCell>
                                                                <TableCell>{val.value}</TableCell>
                                                            </TableRow>
                                                        })}

                                                    </TableBody>
                                                </Table>
                                            </TableContainer>

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
                }} open={openFile}>
                {/* <DialogContent> */}
                {/* <FilesDIsplay />
                     */}
                <Lightbox image={imageDisplay.length === 1 ? imageDisplay[0] : imageDisplay} images={imageDisplay.length > 1 ? imageDisplay : undefined} onClose={() => {
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