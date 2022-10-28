import {
  Grid,
  Breadcrumbs,
  Typography,
  Divider,
  Backdrop,
  Dialog,
  DialogContent,
  IconButton,
  DialogActions,
  Button,
  Card,
  CardContent,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  TextField,
} from "@material-ui/core";
import React from "react";
import HeaderButton from "./headerButton";
import SmartComponentsAuditReading from "./smartComponents/smartComponentAuditReadiing";
import TableList from "./tableList";
import CardStatus from "./cardStatus";
import CircularProgress from "@material-ui/core/CircularProgress";

import MuiDialogTitle from "@material-ui/core/DialogTitle";
import { withStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import Mapa from "../../map/map4";
import Details from "./details";
import ArrowForwardIosIcon from "@material-ui/icons/ArrowForwardIos";
import ArrowBackIosIcon from "@material-ui/icons/ArrowBackIos";
const styles = (theme) => ({
  root: {
    margin: 0,
    padding: theme.spacing(2),
  },
  closeButton: {
    position: "absolute",
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  },
});

const DialogTitle = withStyles(styles)((props) => {
  const { children, classes, onClose, ...other } = props;
  return (
    <MuiDialogTitle disableTypography className={classes.root} {...other}>
      <Typography variant="h6">{children}</Typography>
      {onClose ? (
        <IconButton
          aria-label="close"
          className={classes.closeButton}
          onClick={onClose}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </MuiDialogTitle>
  );
});

const IndexAuditReading = () => {
  const { ...param } = SmartComponentsAuditReading();

  return (
    <div>
      <Backdrop open={param.loading_map} style={{ zIndex: 999999999 }}>
        <CircularProgress style={{ color: "#fff" }} />
      </Backdrop>
      <Grid container spacing={1}>
        <Grid container item xs={12} md={6}>
          <Grid container spacing={1}>
            <Grid item xs={12} md={12}>
              <Breadcrumbs aria-label="breadcrumb" style={{ margin: 10 }}>
                <Typography
                  style={{ color: "#3973b6", fontWeight: "bold", fontSize: 17 }}
                >
                  Home
                </Typography>
                <Typography
                  style={{ color: "#444b5a", fontWeight: "bold", fontSize: 17 }}
                >
                  Audit Reading
                </Typography>
              </Breadcrumbs>
            </Grid>
          </Grid>
        </Grid>

        <Grid container item xs={12} md={6}>
          <HeaderButton
            handleClickBranch={param.handleClickBranch}
            handleCloseBranch={param.handleCloseBranch}
            branchData={param.branchData}
            filterBranch={param.filterBranch}
            onChangeBranch={param.onChangeBranch}
            selectedBranch={param.selectedBranch}
            selectedJobOrder={param.selectedJobOrder}
            handleClickDates={param.handleClickDates}
            handleCloseDates={param.handleCloseDates}
            filterDates={param.filterDates}
            onChangeText={param.onChangeText}
            onSubmitDate={param.onSubmitDate}
            date_from={param.date_from}
            date_to={param.date_to}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <CardStatus
            discrepancyCount={param.discrepancyCount}
            validCount={param.validCount}
            invalidCount={param.invalidCount}
            totalCardCount={param.totalCardCount}
            loadingProgress={param.loadingProgress}
            formatNumber={param.formatNumber}
            onSelectStatus={param.onSelectStatus}
            ClickDiscrepancy={param.ClickDiscrepancy}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <form onSubmit={param.onSubmit}>
            <input
              name="search"
              value={param.search}
              onChange={param.onChangeText}
              style={{
                height: 30,
                width: 300,
                marginTop: 5,
                outline: "none",
                borderStyle: "solid",
                backgroundColor: "transparent",
                borderWidth: 1,
                borderColor: "#7f8c8d",
              }}
              placeholder="Enter valid reference number"
            />
            <button
              type="submit"
              style={{
                height: 34,
                border: "none",
                background: "#115293",
                color: "#fff",
                paddingLeft: 10,
                paddingRight: 10,
                paddingTop: 5,
                paddingBottom: 5,
                cursor: "pointer",
                marginRight: 10,
                fontWeight: "bold",
              }}
            >
              Search
            </button>
          </form>
        </Grid>
        <Grid
          container
          justify="flex-end"
          alignItems="center"
          item
          xs={12}
          md={6}
        >
          <Typography>
            <b>{String(param.cardStatus).toLocaleUpperCase()}</b>
          </Typography>
        </Grid>
        <Grid container item xs={12} md={12}>
          <Divider />
        </Grid>
        <Grid item xs={12} md={12}>
          <TableList
            dataList={param.dataList}
            columns={param.columns}
            handleChangePage={param.handleChangePage}
            handleChangeRowsPerPage={param.handleChangeRowsPerPage}
            page={param.page}
            rowsPerPage={param.rowsPerPage}
            totalCount={param.totalCount}
            handleOpen={param.handleOpen}
          />
        </Grid>
      </Grid>
      <Dialog
        fullWidth={true}
        maxWidth={"lg"}
        open={param.openModal}
        keepMounted
        onClose={param.handleClose}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle onClose={param.handleClose} id="alert-dialog-slide-title">
          <div>{"Details"}</div>
        </DialogTitle>
        <div
          style={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            marginTop: -20,
            marginRight: 45,
            marginBottom: 4,
          }}
        >
          <div
            onClick={param.onClickPriv}
            style={{
              marginRight: 15,
              display: "flex",
              fontSize: 13,
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <ArrowBackIosIcon style={{ fontSize: 13.5 }} />
            <Typography style={{ fontWeight: "bold", fontSize: 13.5 }}>
              Prev
            </Typography>
          </div>
          <div>
            <Typography style={{ fontWeight: "bold", fontSize: 13.5 }}>
              {param.page * param.rowsPerPage + param.selectedIndex + 1}
              &nbsp;&nbsp;/&nbsp;&nbsp;
              {param.totalCount}
            </Typography>
          </div>
          <div
            onClick={param.onClickNext}
            style={{
              marginLeft: 15,
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <Typography style={{ fontWeight: "bold", fontSize: 13.5 }}>
              Next
            </Typography>
            <ArrowForwardIosIcon style={{ fontSize: 13.5 }} />
          </div>
        </div>
        <Divider />
        <DialogContent>
          <Details
            selectedAccom={param.selectedAccom}
            initialValidation={param.initialValidation}
            branchFieldDtails={param.branchFieldDtails}
            initialActual={param.initialActual}
            validation_status={param.validation_status}
            validation_remarks={param.validation_remarks}
            field_findings={param.field_findings}
            category_remarks={param.category_remarks}
            validation_remarks_category={param.validation_remarks_category}
            validator_comment={param.validator_comment}
            onSubmitRemarks={param.onSubmitRemarks}
            onChangeRemarks={param.onChangeRemarks}
            onChangeText={param.onChangeText}
            validationDisplay={param.validationDisplay}
            onValidationDisplay={param.onValidationDisplay}
            cancelValidation={param.cancelValidation}
            degree={param.degree}
            leftRotate={param.leftRotate}
            rightRotate={param.rightRotate}
          />
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </div>
  );
};

export default IndexAuditReading;
