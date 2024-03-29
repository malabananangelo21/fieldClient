import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Icon from "@material-ui/core/Icon";
import SwapVertIcon from "@material-ui/icons/SwapVert";
import { Tooltip } from "recharts";

const columns = [
  { id: "mru", label: "MRU" },
  { id: "meter_no", label: "Meter No." },
  { id: "meter_type", label: "Meter Type" },
  { id: "previous_reading", label: "Previous Reading" },
  { id: "present_reading", label: "Present Reading" },
  { id: "consumption", label: "Present Consumption" },
  { id: "reader_tags", label: "Reader Tags" },
  { id: "average_consumption", label: "Average Consumption" },
  { id: "validation_correct_reading", label: "Correct Reading" },
  { id: "date_filter", label: "Date" },
  { id: "status", label: "Status" },
  { id: "completename", label: "Fieldman" },
  { id: "field_findings_value", label: "Field Findings" },
  { id: "validation_status_jo", label: "Validation" },
];

function createData(name, code, population, size) {
  const density = population / size;
  return { name, code, population, size, density };
}

const rows = [
  createData("India", "IN", 1324171354, 3287263),
  createData("China", "CN", 1403500365, 9596961),
  createData("Italy", "IT", 60483973, 301340),
  createData("United States", "US", 327167434, 9833520),
  createData("Canada", "CA", 37602103, 9984670),
  createData("Australia", "AU", 25475400, 7692024),
  createData("Germany", "DE", 83019200, 357578),
  createData("Ireland", "IE", 4857000, 70273),
  createData("Mexico", "MX", 126577691, 1972550),
  createData("Japan", "JP", 126317000, 377973),
  createData("France", "FR", 67022000, 640679),
  createData("United Kingdom", "GB", 67545757, 242495),
  createData("Russia", "RU", 146793744, 17098246),
  createData("Nigeria", "NG", 200962417, 923768),
  createData("Brazil", "BR", 210147125, 8515767),
];

const useStyles = makeStyles({
  root: {
    width: "100%",
  },
  container: {
    maxHeight: 550,
  },
});

const TableList = (props) => {
  const { ...param } = props;
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return (
    <>
      <Paper className={classes.root}>
        <TableContainer className={classes.container}>
          <Table stickyHeader aria-label="sticky table">
            <TableHead>
              <TableRow>
                <TableCell
                  style={{
                    backgroundColor: "#115293",
                    color: "#fff",
                  }}
                ></TableCell>
                {columns.map((column) => (
                  <TableCell
                    key={column.id}
                    align={column.align}
                    style={{
                      minWidth: column.minWidth,
                      backgroundColor: "#115293",
                      color: "#fff",
                    }}
                  >
                    {column.label}
                    {(column.label == "Present Consumption" ||
                      column.label == "Reader Tags") && (
                      // <div style={{ cursor: "pointer" }}>
                      <SwapVertIcon
                        onClick={() => param.onArrangeData(column.label)}
                      />
                      // </div>
                    )}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {param.dataList
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row) => {
                  let bgColor = undefined;
                  let color = undefined;
                  if (row.status === "Normal Consumption") {
                    bgColor = "#27ae60";
                    color = "#fff";
                  } else if (row.status === "High Consumption") {
                    bgColor = "#9b59b6";
                    color = "#fff";
                  } else if (row.status === "Low Consumption") {
                    bgColor = "#f39c12";
                    color = "#fff";
                  } else if (row.status === "Invalid Average") {
                    bgColor = "#e74c3c";
                    color = "#fff";
                  } else if (row.status === "Negative Consumption") {
                    bgColor = "#34495e";
                    color = "#fff";
                  } else if (row.status === "Zero Consumption") {
                    bgColor = "#8395a7";
                    color = "#fff";
                  }
                  if (row.validation_status_jo === "Invalid") {
                    bgColor = "#c0392b";
                    color = "#fff";
                  } else if (row.validation_status_jo === "Valid") {
                    bgColor = "#2ecc71";
                    color = "#fff";
                  }

                  return (
                    <TableRow
                      hover
                      role="checkbox"
                      tabIndex={-1}
                      key={row.code}
                    >
                      <TableCell>
                        <Icon
                          onClick={() => param.onSelectItem(row)}
                          style={{
                            color: "#115293",
                            cursor: "pointer",
                            marginRight: 10,
                          }}
                        >
                          launched
                        </Icon>
                      </TableCell>
                      {columns.map((column) => {
                        const value = row[column.id];
                        return (
                          <TableCell
                            style={{ background: bgColor, color: color }}
                            key={column.id}
                            align={column.align}
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
        </TableContainer>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component="div"
          count={param.dataList.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onChangePage={handleChangePage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
        />
      </Paper>
    </>
  );
};
export default React.memo(TableList);
