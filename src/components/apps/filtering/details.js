import {
  Grid,
  Table,
  TableCell,
  TableHead,
  TableRow,
  TableBody,
  Divider,
} from "@material-ui/core";
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
