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
} from "@material-ui/core";
import { CheckCircleOutlined, CheckCircleSharp } from "@material-ui/icons";
import React from "react";

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
                    </>
                  ) : null}

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
