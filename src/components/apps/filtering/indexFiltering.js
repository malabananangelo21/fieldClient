import {
  Backdrop,
  Breadcrumbs,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  Divider,
  Grid,
  Typography,
  IconButton,
} from "@material-ui/core";
import React from "react";
import MuiDialogTitle from "@material-ui/core/DialogTitle";
import { withStyles } from "@material-ui/core/styles";
import CardStatus from "./cardStatus";
import Details from "./details";
import HeaderButtons from "./headerButtons";
import Search from "./search";
import SmartComponentsFiltering from "./SmartComponents/smartComponentsFiltering";
import TableList from "./tableList";
import CloseIcon from "@material-ui/icons/Close";
import AuditDetails from "./auditDetails";
import Validation from "./validation";
import SmartComponentValidation from "./SmartComponents/smartComponentsValidation";
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
const IndexFiltering = () => {
  const { ...param } = SmartComponentsFiltering();
  const { ...validationParam } = SmartComponentValidation(
    param.selectedBranch,
    param.selectedJOValidation,
    param.openValidationModal,
    param.updateDetails
  );
  return (
    <>
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
                  Filtering
                </Typography>
              </Breadcrumbs>
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12} md={6}>
          <HeaderButtons
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
            month={param.month}
            handleClickJo={param.handleClickJo}
            handleCloseJo={param.handleCloseJo}
            filterJo={param.filterJo}
            onChangeJo={param.onChangeJo}
            selectedJobOrderDisplay={param.selectedJobOrderDisplay}
            searchButton={param.searchButton}
            filterFieldman={param.filterFieldman}
            handleClickFieldman={param.handleClickFieldman}
            handleCloseFieldman={param.handleCloseFieldman}
            userList={param.userList}
            onSelectFieldman={param.onSelectFieldman}
            selectedFieldman={param.selectedFieldman}
            selectedFieldmanName={param.selectedFieldmanName}
            onChangeTextDate={param.onChangeTextDate}
            date_type={param.date_type}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <CardStatus
            totalCount={param.totalCount}
            highCount={param.highCount}
            lowCount={param.lowCount}
            invalidCount={param.invalidCount}
            normalCount={param.normalCount}
            formatNumber={param.formatNumber}
            onSelectStatus={param.onSelectStatus}
            fieldFindings={param.fieldFindings}
            negativeConsumption={param.negativeConsumption}
            valid={param.valid}
            invalid={param.invalid}
            meter_type_sixteen={param.meter_type_sixteen}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <Search
            onChangeText={param.onChangeText}
            search={param.search}
            onSubmitSearch={param.onSubmitSearch}
          />
        </Grid>
        <Grid item xs={12} md={12}>
          <TableList
            dataList={param.dataList}
            onSelectItem={param.onSelectItem}
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
          <div>{"History"}</div>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Details
            dataList={param.filteringDetails}
            selectedJOValidation={param.selectedJOValidation}
            linegraphData={param.linegraphData}
            handleOpenValidation={param.handleOpenValidation}
            auditView={
              <AuditDetails
                audit={param.audit}
                dataList={param.filteringDetails}
              />
            }
          />
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
      <Dialog
        fullWidth={true}
        maxWidth={"md"}
        open={param.openValidationModal}
        keepMounted
        onClose={param.handleCloseValidation}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle
          onClose={param.handleCloseValidation}
          id="alert-dialog-slide-title"
        >
          <div>{"Validation"}</div>
        </DialogTitle>
        <Divider />
        <DialogContent>
          <Validation
            selectedJOValidation={param.selectedJOValidation}
            {...validationParam}
          />
        </DialogContent>
        <DialogActions></DialogActions>
      </Dialog>
    </>
  );
};

export default IndexFiltering;
