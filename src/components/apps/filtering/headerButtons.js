import { Grid, Menu, MenuItem, TextField, Typography } from "@material-ui/core";
import CloudDownloadIcon from "@material-ui/icons/CloudDownload";
import DateRangeIcon from "@material-ui/icons/DateRange";
import FilterListIcon from "@material-ui/icons/FilterList";
import SearchIcon from "@material-ui/icons/Search";
import WorkIcon from "@material-ui/icons/Work";
import moment from "moment";
import React from "react";
function renderPropsAreEqual(prevProps, nextProps) {
  return (
    prevProps.branchData.length === nextProps.branchData.length &&
    prevProps.filterBranch === nextProps.filterBranch &&
    prevProps.selectedBranch === nextProps.selectedBranch &&
    prevProps.filterDates === nextProps.filterDates &&
    prevProps.date_from === nextProps.date_from &&
    prevProps.month === nextProps.month &&
    prevProps.selectedJobOrder === nextProps.selectedJobOrder &&
    prevProps.filterJo === nextProps.filterJo
  );
}

const HeaderButtons = (props) => {
  const {
    selectedBranch,
    selectedJobOrder,
    branchData,
    filterBranch,
    handleCloseBranch,
    onChangeBranch,
    onChangeJO,
    handleClickBranch,
    handleClickDates,
    handleCloseDates,
    filterDates,
    onChangeText,
    onSubmitDate,
    date_from,
    month,
    ...param
  } = props;
  return (
    <>
      <Grid container spacing={1}>
        <Grid item xs={12} md={12}>
          <div style={{ position: "relative" }}>
            <TextField style={{ width: "100%" }} />
            <SearchIcon style={{ position: "absolute", top: 1, right: 1 }} />
            <div
              style={{ position: "absolute", top: 1, left: 1, display: "flex" }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  borderWidth: 1,
                  borderStyle: "solid",
                  borderColor: "#115293",
                  paddingRight: 10,
                  marginRight: 5,
                }}
              >
                <div
                  style={{
                    height: "100%",
                    paddingRight: 5,
                    paddingLeft: 5,
                    marginRight: 5,
                    backgroundColor: "#115293",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <FilterListIcon style={{ fontSize: 16 }} />
                </div>
                <Typography style={{ fontSize: 12 }}>{`${
                  selectedBranch?.branch_name != undefined
                    ? selectedBranch?.branch_name
                    : ""
                }`}</Typography>
                {/* <CloseIcon style={{ color: '#115293', fontSize: 17, marginLeft: 5, cursor: 'pointer' }} /> */}
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  borderWidth: 1,
                  borderStyle: "solid",
                  borderColor: "#115293",
                  paddingRight: 10,
                  marginRight: 5,
                }}
              >
                <div
                  style={{
                    height: "100%",
                    paddingRight: 5,
                    paddingLeft: 5,
                    marginRight: 5,
                    backgroundColor: "#115293",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <WorkIcon style={{ fontSize: 16 }} />
                </div>
                <Typography style={{ fontSize: 12 }}>
                  {param.selectedJobOrderDisplay}
                </Typography>
                {/* <CloseIcon style={{ color: '#115293', fontSize: 17, marginLeft: 5, cursor: 'pointer' }} /> */}
              </div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  borderWidth: 1,
                  borderStyle: "solid",
                  borderColor: "#115293",
                  paddingRight: 10,
                  marginRight: 5,
                }}
              >
                <div
                  style={{
                    height: "100%",
                    paddingRight: 5,
                    paddingLeft: 5,
                    marginRight: 5,
                    backgroundColor: "#115293",
                    color: "#fff",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  <DateRangeIcon style={{ fontSize: 16 }} />
                </div>
                <Typography style={{ fontSize: 12 }}>
                  {moment(month).format("YYYY-MMM-DD")}
                </Typography>
                {/* <CloseIcon style={{ color: '#115293', fontSize: 17, marginLeft: 5, cursor: 'pointer' }} /> */}
              </div>
            </div>
          </div>
        </Grid>
        <Grid item xs={12} md={12}>
          <button
            onClick={handleClickBranch}
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
            <FilterListIcon style={{ fontSize: 15, marginRight: 5 }} />
            Branch
          </button>
          <Menu
            id="simple-menu"
            anchorEl={filterBranch}
            keepMounted
            open={filterBranch}
            onClose={handleCloseBranch}
          >
            {branchData.map((val, index) => {
              return (
                <MenuItem key={index} onClick={() => onChangeBranch(val)}>
                  {`${val.branch_name}`}
                  <span
                    style={{
                      color: "#115293",
                      fontWeight: "bold",
                      fontSize: 13,
                      marginLeft: 15,
                    }}
                  >{`${val.company_name}`}</span>
                </MenuItem>
              );
            })}
          </Menu>
          <button
            onClick={param.handleClickJo}
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
            <DateRangeIcon style={{ fontSize: 15, marginRight: 5 }} />
            JO Type
          </button>
          <Menu
            id="simple-menu"
            anchorEl={param.filterJo}
            keepMounted
            open={param.filterJo}
            onClose={param.handleCloseJo}
          >
            {[
              { name: "Reading", type: "Reading" },
              { name: "With Audit", type: "Audit Reading" },
            ].map((val, index) => {
              return (
                <MenuItem key={index} onClick={() => param.onChangeJo(val)}>
                  {`${val.name}`}
                </MenuItem>
              );
            })}
          </Menu>
          <button
            onClick={handleClickDates}
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
            <DateRangeIcon style={{ fontSize: 15, marginRight: 5 }} />
            Date Range
          </button>
          <Menu
            id="simple-menu"
            anchorEl={filterDates}
            keepMounted
            open={filterDates}
            onClose={handleCloseDates}
          >
            <div style={{ padding: 10 }}>
              <Grid container spacing={1}>
                <Grid item xs={12} md={12}>
                  <TextField
                    style={{ width: "100%" }}
                    label="Month"
                    type="date"
                    InputLabelProps={{ shrink: true }}
                    onChange={onChangeText}
                    name="month"
                  />
                </Grid>
                <Grid container justify="flex-end" item xs={12} md={12}>
                  <button
                    onClick={onSubmitDate}
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
                    <DateRangeIcon style={{ fontSize: 15, marginRight: 5 }} />
                    Submit
                  </button>
                </Grid>
              </Grid>
            </div>
          </Menu>
          <a
            style={{ textDecoration: "none", color: "#000" }}
            href={
              "https://api.workflow.gzonetechph.com/tracking/getFilteringExport/" +
              selectedJobOrder +
              "/" +
              selectedBranch?.branch_id +
              "/" +
              month +
              "/" +
              localStorage.getItem("u")
            }
            target="_blank"
            download="myFile"
          >
            <button
              // onClick={handleClickDates}
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
              <CloudDownloadIcon style={{ fontSize: 15, marginRight: 5 }} />
              Export
            </button>
          </a>
        </Grid>
      </Grid>
    </>
  );
};

export default React.memo(HeaderButtons, renderPropsAreEqual);
