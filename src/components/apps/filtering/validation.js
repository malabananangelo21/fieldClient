import {
  Grid,
  Typography,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  CardContent,
  Card,
  TableRow,
  TableCell,
  Table,
  IconButton,
  Divider
} from "@material-ui/core";
import { CheckCircleOutlined, CheckCircleSharp } from "@material-ui/icons";
import React from "react";
import AddIcon from "@material-ui/icons/Add";
import RemoveIcon from "@material-ui/icons/Remove";
import ClearIcon from "@material-ui/icons/Clear";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import RotateRightIcon from "@material-ui/icons/RotateRight";
import ArrowLeftIcon from "@material-ui/icons/ArrowLeft";
import ArrowRightIcon from "@material-ui/icons/ArrowRight";
import Carousel from "react-material-ui-carousel";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
const ValidationFiltering = (props) => {
  const { ...param } = props;
  console.log(param);
  return (
    <>
      <form onSubmit={param.onSubmit}>
        <Grid container spacing={1}>
          <Grid item xs={12} md={6}>
            <Card variant="outlined">
              <CardContent>
                <Grid container spacing={1}>
                  <Grid item xs={12} md={12}>
                    <FormControl fullWidth>
                      <InputLabel id="demo-simple-select-label">
                        Status
                      </InputLabel>
                      <Select
                        required
                        labelId="demo-simple-select-label"
                        id="demo-simple-select"
                        value={String(param.selectedStatus)}
                        onChange={param.handleChange}
                        name={"selectedStatus"}
                      >
                        {param.status.map((val, index) => {
                          return (
                            <MenuItem key={index} value={val}>
                              {val}
                            </MenuItem>
                          );
                        })}
                      </Select>
                    </FormControl>
                  </Grid>
                  {param.selectedStatus == "Invalid" ? (
                    <>
                      <Grid item xs={12} md={12}>
                        <FormControl fullWidth>
                          <InputLabel id="demo-simple-select-label">
                            Remarks
                          </InputLabel>
                          <Select
                            //   required
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={String(param.selectedRemarks)}
                            onChange={param.handleChange}
                            name={"selectedRemarks"}
                          >
                            {param.field_findings.map((val, index) => {
                              return (
                                <MenuItem key={index} value={val.findings}>
                                  {val.findings}
                                </MenuItem>
                              );
                            })}
                          </Select>
                        </FormControl>
                      </Grid>
                     
                    </>
                  ) : null}
                    <Grid item xs={12} md={12}>
                        <TextField
                          label="Correct Reading"
                          fullWidth
                          type="number"
                          name="reading"
                          onChange={param.handleChange}
                          value={param.reading}
                        />
                      </Grid>
                  
                  <Grid item xs={12} md={12}>
                    <TextField
                      label="Comment"
                      placeholder="Type..."
                      fullWidth
                      multiline
                      rows={4}
                      name="comment"
                      onChange={param.handleChange}
                      value={String(param.comment)}
                    />
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <TextField
                      label="File"
                      multiple
                      placeholdel="Type..."
                      type = "file"
                      fullWidth
                      name="file"
                      onChange={param.onChangeFile}
                    />
                  </Grid>
                  {param.selectedJOValidation?.validator_name ? (
                    <>
                      <Grid item xs={12} md={12}>
                        <TextField
                          label="Validator"
                          fullWidth
                          value={String(
                            param.selectedJOValidation.validator_name
                          )}
                        />
                      </Grid>
                      <Grid item xs={12} md={12}>
                        <TextField
                          label="Date Validated"
                          fullWidth
                          value={String(
                            param.selectedJOValidation.validation_date
                          )}
                        />
                      </Grid>
                    </>
                  ) : null}
                  

                  <Grid item xs={12} md={12}>
                    <button
                      type="sunmit"
                      style={{
                        border: "none",
                        background: "#115293",
                        color: "#fff",
                        paddingLeft: 10,
                        paddingRight: 10,
                        paddingTop: 5,
                        paddingBottom: 5,
                        cursor: "pointer",
                        marginRight: 5,
                      }}
                    >
                      <CheckCircleSharp
                        style={{ fontSize: 15, marginRight: 5 }}
                      />
                      Submit
                    </button>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card variant="outlined">
              <CardContent>
                <Grid container spacing={1}>
                  <Grid item xs={12} md={12}>
                    {" "}
                    <Typography style={{ fontSize: 20, color: "#353b48" }}>
                      Details
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={12}>
                    <Table size="small">
                      <TableRow>
                        <TableCell>
                          <b>MRU</b>
                        </TableCell>
                        <TableCell>{param.selectedJOValidation.mru}</TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <b>Meter No.</b>
                        </TableCell>
                        <TableCell>
                          {param.selectedJOValidation.meter_no}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <b>Meter Type</b>
                        </TableCell>
                        <TableCell>
                          {param.selectedJOValidation.meter_type}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <b>Previous Reading</b>
                        </TableCell>
                        <TableCell>
                          {param.selectedJOValidation.previous_reading}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <b>Present Reading</b>
                        </TableCell>
                        <TableCell>
                          {param.selectedJOValidation.present_reading}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <b>Consumption</b>
                        </TableCell>
                        <TableCell>
                          {param.selectedJOValidation.consumption}
                        </TableCell>
                      </TableRow>
                      <TableRow>
                        <TableCell>
                          <b>Date</b>
                        </TableCell>
                        <TableCell>
                          {param.selectedJOValidation.date_filter}
                        </TableCell>
                      </TableRow>
                    </Table>
                  </Grid>
                  {param.selectedJOValidation.validation_attachments !== "" && param.selectedJOValidation.validation_attachments !== null ?
                  <><Grid item xs={12} md={12}>
                  <Typography style={{ fontSize: 20, color: "#353b48" }}>
                    Validation Attachments
                    </Typography>
                  </Grid>

                  <Grid item xs={12} md={12}>
                  <Card style={{ position: "relative" }} variant="outlined">
                    {param.selectedJOValidation.validation_attachments !== "" && param.selectedJOValidation.validation_attachments !== null ? (
                      <div style={{ position: "relative" }}>
                        <div
                          style={{
                            display: param.loadingImage ? "block" : "none",
                            width: "100%",
                            height: "35vh",
                            position: "absolute",
                            backgroundColor: "#fff",
                            zIndex: 99,
                          }}
                        >
                          <div
                            style={{
                              display: "flex",
                              width: "100%",
                              height: "100%",
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Typography style={{ fontWeight: "bold" }}>
                              Loading image...
                            </Typography>
                          </div>
                        </div>
                        <Carousel
                          style={{
                            display: param.loadingImage ? "none" : "block",
                            position: "absolute",
                          }}
                          autoPlay={false}
                        >
                          {param.selectedJOValidation?.validation_attachments != null && JSON.parse(param.selectedJOValidation?.validation_attachments).map((images, index) => {
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
                                        onClick={param.onLeftRotate}
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
                                        onClick={param.onRightRotate}
                                      >
                                        <RotateRightIcon
                                          style={{
                                            color: "#fff",
                                            fontSize: 22,
                                          }}
                                        />
                                      </IconButton>
                                    </div>
                                    <TransformComponent style={{ zIndex: 999 }}>
                                      <img
                                        // onClick={() => {
                                        //   onCLickImage(images);
                                        // }}
                                        src={
                                          "https://api.workflow.gzonetechph.com/" +
                                          images
                                        }
                                        onLoad={param.imageLoaded}
                                        alt="test"
                                        style={{
                                          width: window.innerWidth * 0.4,
                                          height: window.innerHeight * 0.35,
                                          transform:
                                            "rotate(" +
                                            String(param.degree) +
                                            "deg)",
                                        }}
                                      />
                                    </TransformComponent>
                                  </React.Fragment>
                                )}
                              </TransformWrapper>
                            );
                          })}
                        </Carousel>
                      </div>
                    ) : (
                      <Carousel
                        style={{
                          display: param.loadingImage ? "none" : "block",
                          position: "absolute",
                        }}
                        autoPlay={false}
                      >
                        <img
                          src={require("../../../assets/map image/no_image.png")}
                          alt="test"
                          onLoad={param.imageLoaded}
                          style={{ width: "100%", height: "35vh" }}
                        />
                      </Carousel>
                    )}
                  </Card>

                  </Grid></>
                  :null

                  }
                  
                </Grid>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </form>
    </>
  );
};

export default React.memo(ValidationFiltering);
