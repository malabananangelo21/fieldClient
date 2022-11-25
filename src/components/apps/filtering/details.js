import {
  Grid,
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
  Divider,
  Typography,
} from "@material-ui/core";
import { CheckCircleSharp } from "@material-ui/icons";
import React from "react";
import LineGraph from "./charts/lineChart";
const columns = [
  { id: "meter_no", label: "Meter No." },
  { id: "meter_type", label: "Meter Type" },
  { id: "previous_reading", label: "Previous Reading" },
  { id: "present_reading", label: "Present Reading" },
  { id: "consumption", label: "Present Consumption" },
  { id: "completename", label: "Fieldman" },
  { id: "date_filter", label: "Date" },
];
const renderPropsAreEqual = (prevProps, nextProps) => {
  return (
    JSON.stringify(prevProps.dataList) === JSON.stringify(nextProps.dataList)
  );
};
const Details = (props) => {
  const { ...param } = props;
  return (
    <div>
      <Grid container spacing={1}>
        <Grid item xs={12} md={12}>
          <LineGraph dataList={param.linegraphData} />
        </Grid>
        <Grid item xs={12} md={12}>
          <Divider />
        </Grid>
        <Grid item xs={12} md={12}>
          <button
            onClick={param.handleOpenValidation}
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
            <CheckCircleSharp style={{ fontSize: 15, marginRight: 5 }} />
            Validate
          </button>
        </Grid>
        <Grid item xs={12} md={12}>
          <Typography>
            <b>
              <i>
                {" "}
                3 Months Average Consumption :{" "}
                {param.selectedJOValidation?.average_consumption}
              </i>
            </b>
          </Typography>
        </Grid>
        <Grid item xs={12} md={12}>
          <Typography>
            <b>
              <i>
                {" "}
                Present Consumption: {param.selectedJOValidation?.consumption}
              </i>
            </b>
          </Typography>
        </Grid>

        <Grid item xs={12} md={12}>
          <Table size="small">
            <TableHead>
              <TableRow>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{
                      minWidth: column.minWidth,
                      backgroundColor: "#115293",
                      color: "#fff",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {column.label}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {param.dataList.map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell
                          key={column.id}
                          align={column.align}
                          style={{ whiteSpace: "noWrap" }}
                        >
                          {column.format && typeof value === "number"
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </Grid>
        <Grid item xs={12} md={12}>
          {param.auditView}
        </Grid>
      </Grid>
    </div>
  );
};

export default React.memo(Details, renderPropsAreEqual);
