import DateFnsUtils from "@date-io/date-fns";
import Backdrop from "@material-ui/core/Backdrop";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Checkbox from "@material-ui/core/Checkbox";
import CircularProgress from "@material-ui/core/CircularProgress";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Divider from "@material-ui/core/Divider";
import FormControl from "@material-ui/core/FormControl";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormLabel from "@material-ui/core/FormLabel";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import Input from "@material-ui/core/Input";
import InputAdornment from "@material-ui/core/InputAdornment";
import InputLabel from "@material-ui/core/InputLabel";
import List from "@material-ui/core/List";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import OutlinedInput from "@material-ui/core/OutlinedInput";
import Paper from "@material-ui/core/Paper";
import Select from "@material-ui/core/Select";
import Snackbar from "@material-ui/core/Snackbar";
import { useTheme, withStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import AddIcon from "@material-ui/icons/Add";
import CachedIcon from "@material-ui/icons/Cached";
import FilterListIcon from "@material-ui/icons/FilterList";
import GetAppIcon from "@material-ui/icons/GetApp";
import GridOnIcon from "@material-ui/icons/GridOn";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import PictureAsPdfIcon from "@material-ui/icons/PictureAsPdf";
import RemoveIcon from "@material-ui/icons/Remove";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import RotateRightIcon from "@material-ui/icons/RotateRight";
import SearchIcon from "@material-ui/icons/Search";
import TableChartIcon from "@material-ui/icons/TableChart";
import ViewWeekIcon from "@material-ui/icons/ViewWeek";
import MuiAlert from "@material-ui/lab/Alert";
import Avatar from "@material-ui/core/Avatar";
import RefreshIcon from "@material-ui/icons/Refresh";
import jsPDF from "jspdf";
import "jspdf-autotable";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import {
  Document,
  Image as ImagePDF,
  Page,
  PDFViewer,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import "date-fns";
import "jspdf-autotable";
import moment from "moment";
import React, { useEffect } from "react";
import "react-alice-carousel/lib/alice-carousel.css";
import ReactExport from "react-data-export";
import Carousel from "react-material-ui-carousel";
import { useDispatch, useSelector } from "react-redux";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import "../../../../App";
import NoImage from "../../../../assets/map image/no_image.png";
import useStyles from "../../../../css/css";
import {
  GetAccomCategories,
  getHandleBranch,
  getJOAuditFilterDashBoard,
  getJOAuditFilterDashBoardPDF,
  getUserLoginData,
  getLiquidChart,
} from "../../Functions/home_func";
import Mapa from "../../map/map";
import LiquidContainer from "./liquidContainer";
import WidgetReport from "./widget";
import Toggling from "./filterToggle";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css"; // theme css file
import { DateRange, DefinedRange } from "react-date-range";
import Meralco from "../../../../assets/map image/meralco.png";
import Maynilad from "../../../../assets/map image/maynilad.png";
import Primewater from "../../../../assets/map image/prime.png";
import LoadingGif from "../../../../assets/map image/loading.gif";
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const StyledMenu = withStyles({
  paper: {
    border: "1px solid #d3d4d5",
  },
})((props) => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "center",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "center",
    }}
    {...props}
  />
));
function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}
function Schedule_Table() {
  const home_reducer = useSelector((state) => state.home_reducer);
  const dispatch = useDispatch();
  const dispatch_data = (type, data) => {
    dispatch({
      type: type,
      data: data,
    });
  };
  const theme = useTheme();
  const classes = useStyles();
  const matches = useMediaQuery("(max-width:600px)");
  const [image, setImage] = React.useState(false);
  const [page, setPage] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [rowsPerPage, setRowsPerPage] = React.useState(100);
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };
  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };
  const fullScreen = useMediaQuery(theme.breakpoints.down("xl"));
  const [selected_jo_type, setSelected_jo_type] = React.useState([]);
  const [liquidChartArr_, setliquidChartArr_] = React.useState([]);
  const searchinfo = React.useRef();
  const [state, setState] = React.useState({
    branch_id: "",
    date_start: new Date(),
    date_end: new Date(),
    accomplishments: [],
    pdf_accomplishments: [],
    search: "",
    columndata: [],
    printdialog: false,
    customize: false,
    datadialog: false,
    reference: "",
    company: "",
    selectBranch: "",
    disable: true,
    loader: false,
    degree: 0,
    open: false,
    search: "",
    alertSuccess: false,
    alertWarning: false,
    alertError: false,
    alertBlank: false,
    vertical: "top",
    horizontal: "center",
    singleAccom: [],
    accomCat: [],
    initialCat: [],
    gilad: true,
    jason: false,
    antoine: false,
    branch_field_work: [],
    selected_branch: "",
    jo_type: [],
    selected_jo_type: "",
    selected_ba: "",
    printalldialog: false,
    printrowdata: [],
    printSeletedDialog: false,
    modal_jo_type: false,
    select_findings: [],
    master_accom: [],
    new_pdf_accomplishments: [],
    business_area: [],
    jo_images: [],
    filter_dialog: false,
    finding: "ALL",
    status: "ALL",
    img_data: [],
    pending_accom: [],
    accom_accom: [],
    total_accom: [],
    branch_name: "",
    accomplishment_display: [],
    company_logo: "",
    imagepdftable: [],
    countfindings: [],
    selected_filter: "ALL",
    selection: {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  });

  const onChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };
  const onChangeStatus = (e) => {
    let find = "";
    let stat = "";
    if (e.target.value === "Pending" || e.target.value === "ALL") {
      find = "ALL";
      stat = e.target.value;
    } else {
      find = "ALL";
      stat = e.target.value;
    }
    setState({
      ...state,
      finding: find,
      status: stat,
    });
  };
  const handleClickOpen = () => {
    setState({
      ...state,
      open: true,
    });
  };
  const handleClose = () => {
    setState({
      ...state,
      open: false,
    });
  };
  const onChangeCompany = (e) => {
    const branches = home_reducer.handleBranch.filter(
      (val) => val.company_id == e.target.value
    );
    dispatch_data("SelectedBranches", branches);
    setState({
      ...state,
      company: e.target.value,
      jo_type: [],
    });
  };
  const onChangeBranch = (e) => {
    setSelected_jo_type([]);
    let jo_type = [];
    let ba = [];
    let branchname = "";
    home_reducer.SelectedBranches.map((val, index) => {
      if (val.branch_id === e.target.value) {
        if (val.branch_field_work !== "") {
          jo_type = JSON.parse(val.branch_field_work);
          ba = JSON.parse(val.business_area);
          branchname = val.branch_company;
        } else {
          jo_type = JSON.parse(val.branch_field_work);
          ba = [];
          branchname = val.branch_company;
        }
      }
    });

    setState({
      ...state,
      selected_branch: e.target.value,
      jo_type: jo_type,
      business_area: ba,
      branch_name: branchname,
    });
  };
  const handleDateChangeStart = (date) => {
    setState({
      ...state,
      date_start: date,
    });
  };
  const handleDateChangeEnd = (date) => {
    setState({
      ...state,
      date_end: date,
    });
  };
  const { vertical, horizontal } = state;
  const onPrintperPage = () => {
    let sel_filter = state.selected_filter;
    let type_param = "";
    selected_jo_type.map((val) => {
      if (type_param !== "") {
        type_param += "-";
      }
      type_param += val;
    });
    if (
      state.selected_filter === "" ||
      state.selected_filter === "ALL" ||
      state.selected_filter === null ||
      state.selected_filter === undefined
    ) {
      sel_filter = "ALL";
    }
    // window.open('http://api.workflow.gzonetechph.com/test/printingPDFAccom'+momentstate.selection.startDate).format('YYYY-MM-DD')+'/'+moment(state.selection.endDate).format('YYYY-MM-DD')+'/'+[state.selected_branch]+'/'+selected_jo_type+'/'+state.selected_ba);
    window.open(
      // "http://192.168.0.9/backend/api/test/printingPDFAccom/" +
      "http://api.workflow.gzonetechph.com/report/printingPDFAccom/" +
        moment(state.selection.startDate).format("YYYY-MM-DD") +
        "/" +
        moment(state.selection.endDate).format("YYYY-MM-DD") +
        "/" +
        state.selected_branch +
        "/" +
        type_param +
        "/" +
        state.selected_ba +
        "/" +
        sel_filter
    );
  };
  const onDualPrintperPage = () => {
    let sel_filter = state.selected_filter;
    let type_param = "";
    selected_jo_type.map((val) => {
      if (type_param !== "") {
        type_param += "-";
      }
      type_param += val;
    });
    if (
      state.selected_filter === "" ||
      state.selected_filter === "ALL" ||
      state.selected_filter === null ||
      state.selected_filter === undefined
    ) {
      sel_filter = "ALL";
    }
    // window.open('http://api.workflow.gzonetechph.com/test/printingPDFAccom'+momentstate.selection.startDate).format('YYYY-MM-DD')+'/'+moment(state.selection.endDate).format('YYYY-MM-DD')+'/'+[state.selected_branch]+'/'+selected_jo_type+'/'+state.selected_ba);
    window.open(
      // "http://192.168.0.9/backend/api/test/printingPDFAccom/" +
      "http://api.workflow.gzonetechph.com/report/printingPDFDualAccom/" +
        moment(state.selection.startDate).format("YYYY-MM-DD") +
        "/" +
        moment(state.selection.endDate).format("YYYY-MM-DD") +
        "/" +
        state.selected_branch +
        "/" +
        type_param +
        "/" +
        state.selected_ba +
        "/" +
        sel_filter
    );
  };
  const onPrintperImage = () => {
    let sel_filter = state.selected_filter;
    let type_param = "";
    selected_jo_type.map((val) => {
      if (type_param !== "") {
        type_param += "-";
      }
      type_param += val;
    });
    if (
      state.selected_filter === "" ||
      state.selected_filter === "ALL" ||
      state.selected_filter === null ||
      state.selected_filter === undefined
    ) {
      sel_filter = "ALL";
    }
    window.open(
      "http://api.workflow.gzonetechph.com/report/printingPDFAccomIMG/" +
        moment(state.selection.startDate).format("YYYY-MM-DD") +
        "/" +
        moment(state.selection.endDate).format("YYYY-MM-DD") +
        "/" +
        state.selected_branch +
        "/" +
        type_param +
        "/" +
        state.selected_ba +
        "/" +
        sel_filter
    );
  };

  const onFormSubmit = (e) => {
    e.preventDefault();
    if (
      moment(state.selection.startDate).format("YYYY-MM-DD") >
      moment(state.selection.endDate).format("YYYY-MM-DD")
    ) {
      setState({
        ...state,
        alertError: true,
      });
    } else if (
      moment(state.selection.startDate).format("YYYY") ===
      moment("2020-01-01").format("YYYY")
    ) {
      alert(
        "The accomplishments for the year 2020 you need to generate are on the archive. Please email us with any questions or concerns."
      );
    } else {
      dispatch_data("loader", true);
      setliquidChartArr_([]);
      onSubmit(
        state.selection.startDate,
        state.selection.endDate,
        state.selected_branch,
        selected_jo_type,
        state.selected_ba,
        state.company
      );
      liquidFillAccomplishments(
        state.selected_branch,
        selected_jo_type[0],
        state.selection.startDate,
        state.selection.endDate,
        [state.selected_ba]
      );
    }
  };

  const toggleSubmit = (fieldwork, ba, branch) => {
    dispatch_data("loader", true);
    setState((prev) => ({
      ...prev,
      selected_branch: branch.branch_id,
      company: branch.company_id,
      selected_ba: ba,
      branch_name: branch.branch_company,
    }));
    setliquidChartArr_([]);
    setSelected_jo_type([fieldwork]);
    setTimeout(() => {
      onSubmit(
        state.selection.startDate,
        state.selection.endDate,
        branch.branch_id,
        [fieldwork],
        ba,
        branch.company_id
      );
      liquidFillAccomplishments(
        branch.branch_id,
        fieldwork,
        state.selection.startDate,
        state.selection.endDate,
        [ba]
      );
    }, 200);
  };

  const onSubmit = (
    startDate,
    endDate,
    selectedBranch,
    jo_type,
    selected_ba,
    company_id
  ) => {
    let data = {
      date_filter: moment(startDate).format("YYYY-MM-DD"),
      date_filter_end: moment(endDate).format("YYYY-MM-DD"),
      branch: [selectedBranch],
      user_id: localStorage.getItem("u"),
      type: jo_type,
      ba: selected_ba,
    };
    getJOAuditFilterDashBoard(data).then((response) => {
      if (response.header.length != 0) {
        setState((prev) => ({
          ...prev,
          initialCat: response.header,
        }));
      }

      let findings = [];
      let countfindings = [];
      let pending = [];
      let accomplish = [];
      let total = [];
      let logo = "";
      let open_ = false;
      let alertSuccess_ = false;
      dispatch_data("SelectedBranch", selectedBranch);
      dispatch_data("dateFrom", moment(startDate).format("LL"));
      dispatch_data("dateTo", moment(endDate).format("LL"));
      if (response.jobOrders.length != 0) {
        open_ = false;
        alertSuccess_ = true;
        response.jobOrders.map((val) => {
          if (val.date_accomplished !== "") {
            val["time_accomplished"] = moment(val.date_accomplished).format(
              "hh:mm A"
            );
          }
          if (val.date_accomplished !== "") {
            val.date_accomplished = moment(val.date_accomplished).format("LL");
          }
          let find = "";
          let match = false;
          let arrycnt = [];
          find = val.findings;
          findings.map((val1, index) => {
            if (val1 === val.findings) {
              match = true;
              countfindings[index]["count"] += 1;
            }
          });
          if (!match) {
            countfindings.push({ type: val.findings, count: 1 });
            findings.push(val.findings);
          }
        });
        state.business_area.map((val) => {
          let pends = {
            BA: val,
            count: 0,
          };
          let accoms = {
            BA: val,
            count: 0,
          };
          let totals = {
            BA: val,
            count: 0,
          };
          let pend_counting = 0;
          let accom_counting = 0;
          let total_counting = 0;
          response.jobOrders.map((value) => {
            if (
              value.BA === val &&
              (value.date_accomplished === "" ||
                value.date_accomplished === null)
            ) {
              pend_counting++;
              pends.count = pend_counting;
            } else if (value.BA === val && value.date_accomplished !== "") {
              accom_counting++;
              accoms.count = accom_counting;
            }
            if (value.BA === val) {
              total_counting++;
              totals.count = total_counting;
            }
          });
          pending.push(pends);
          accomplish.push(accoms);
          total.push(totals);
        });
        let company_details = response.companies.filter((val) => {
          if (val.company_id == company_id) {
            logo = val.logo_base64;
          }
        });
      } else {
        setState((prev) => ({
          ...prev,
          alertWarning: true,
        }));
      }

      setState((prev) => ({
        ...prev,
        tableheader: state.branch_id,
        accomplishments: response.jobOrders,
        accomplishment_display: response.jobOrders,
        master_accom: response.jobOrders,
        jo_images: response.image,
        open: open_,
        alertSuccess: alertSuccess_,
        select_findings: findings,
        pending_accom: pending,
        accom_accom: accomplish,
        total_accom: total,
        company_logo: logo,
        countfindings: countfindings,
      }));
      dispatch_data("loader", false);
    });
    setPage(0);
  };
  const onFilter = (e) => {
    e.preventDefault();
    let filtered = [];
    let selected_filter = "";
    let start = "";
    let end = "";
    if (state.status === "ALL") {
      filtered = state.master_accom;
    } else if (state.status === "Pending") {
      filtered = state.master_accom.filter(
        (val) => val.date_accomplished === "" || val.date_accomplished === null
      );
    } else {
      filtered = state.master_accom.filter((val) => {
        if (val.date_accomplished !== "" && val.date_accomplished !== null) {
          if (state.finding === "ALL") {
            return val;
          } else if (state.finding === val.accom_findings) {
            start = String(val.accom_findings).replace("(", "__pstart");
            end = String(start).replace(")", "__pend");
            selected_filter = val.accom_findings;
            return val;
          }
        }
      });
    }
    setState({
      ...state,
      accomplishments: filtered,
      accomplishment_display: filtered,
      selected_filter: end,
    });
    setPage(0);
  };
  const handleClickDialogOpen = (data) => {
    const images = state.jo_images.filter((val) => val.jo_id == data.jo_id);
    var coordinates = data.coordinates.split(",");
    var latitude = coordinates[0];
    var longitude = coordinates[1];
    dispatch_data("latitude", latitude);
    dispatch_data("longitude", longitude);
    setState({
      ...state,
      columndata: [data],
      datadialog: true,
      img_data: images,
      // printrowdata: [data],
    });
  };
  const handleClickDialogClose = () => {
    setState({
      ...state,
      datadialog: false,
    });
  };
  const submitsearch = () => {
    dispatch_data("loader", true);
    let accomSearch = state.accomplishments.filter((files) => {
      return (
        (files.account_number !== null &&
          files.account_number !== "" &&
          files.account_number
            .toLowerCase()
            .indexOf(searchinfo.current.value.toLocaleLowerCase()) !== -1) ||
        (files.name !== null &&
          files.name !== "" &&
          files.name
            .toLowerCase()
            .indexOf(searchinfo.current.value.toLocaleLowerCase()) !== -1) ||
        (files.mru !== null &&
          files.mru !== "" &&
          files.mru
            .toLowerCase()
            .indexOf(searchinfo.current.value.toLocaleLowerCase()) !== -1) ||
        (files.fieldman_name !== null &&
          files.fieldman_name !== "" &&
          files.fieldman_name
            .toLowerCase()
            .indexOf(searchinfo.current.value.toLocaleLowerCase()) !== -1) ||
        (files.jo_id !== null &&
          files.jo_id !== "" &&
          files.jo_id
            .toLowerCase()
            .indexOf(searchinfo.current.value.toLocaleLowerCase()) !== -1) ||
        (files.meter_no !== null &&
          files.meter_no !== "" &&
          files.meter_no
            .toLowerCase()
            .indexOf(searchinfo.current.value.toLocaleLowerCase()) !== -1) ||
        (files.zone !== null &&
          files.zone !== "" &&
          files.zone
            .toLowerCase()
            .indexOf(searchinfo.current.value.toLocaleLowerCase()) !== -1) ||
        (files.seal_number !== null &&
          files.seal_number !== "" &&
          files.seal_number
            .toLowerCase()
            .indexOf(searchinfo.current.value.toLocaleLowerCase()) !== -1) ||
        (files.remarks !== null &&
          files.remarks !== "" &&
          files.remarks
            .toLowerCase()
            .indexOf(searchinfo.current.value.toLocaleLowerCase()) !== -1) ||
        (files.customer_meter_no !== null &&
          files.customer_meter_no !== "" &&
          files.customer_meter_no
            .toLowerCase()
            .indexOf(searchinfo.current.value.toLocaleLowerCase()) !== -1) ||
        (files.address !== null &&
          files.address !== "" &&
          files.address
            .toLowerCase()
            .indexOf(searchinfo.current.value.toLocaleLowerCase()) !== -1) ||
        (files.fieldman_name !== null &&
          files.fieldman_name !== "" &&
          files.fieldman_name
            .toLowerCase()
            .indexOf(searchinfo.current.value.toLocaleLowerCase()) !== -1)
      );
    });
    setState({
      ...state,
      accomplishment_display: accomSearch,
    });
    dispatch_data("loader", false);
    setPage(0);
  };
  const onResets = () => {
    setState({
      ...state,
      accomplishments: state.master_accom,
      accomplishment_display: state.master_accom,
      selected_filter: "",
    });
    searchinfo.current.value = "";
    return "return";
  };
  const search_accom = (e) => {
    searchinfo.current.value = e.target.value;
  };
  const handleAlertSuccessClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setState({
      ...state,
      alertSuccess: false,
    });
  };
  const handleAlertWarningClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setState({
      ...state,
      alertWarning: false,
    });
  };
  const handleAlertErrorClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setState({
      ...state,
      alertError: false,
    });
  };
  const handleAlertBlankClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setState({
      ...state,
      alertBlank: false,
    });
  };
  const handleClickPrintDPF = () => {
    if (state.accomplishments.length === 0) {
      setState({
        ...state,
        alertBlank: true,
      });
    } else {
      dispatch_data("loader", true);
      if (state.selected_filter === "") {
        setState({
          ...state,
          selected_filter: "ALL",
        });
      }
      let data = {
        image: state.jo_images,
      };
      getJOAuditFilterDashBoardPDF(data).then((response) => {
        setState({
          ...state,
          imagepdftable: response.images,
        });
        dispatch_data("loader", false);
        const unit = "pt";
        const size = "A4"; // Use A1, A2, A3 or A4
        const orientation = "landscape"; // portrait or landscape
        const doc = new jsPDF(orientation, unit, size);
        let title =
          "(Date - " +
          moment(state.selection.startDate).format("YYYY-MM-DD") +
          " - " +
          moment(state.selection.endDate).format("YYYY-MM-DD") +
          " ) " +
          "(Company - " +
          state.branch_name +
          " ) " +
          " ( BA - " +
          state.selected_ba +
          " ) " +
          " ( Type - " +
          selected_jo_type +
          " ) " +
          " ( Findings - " +
          state.selected_filter +
          " ) " +
          "( TABLE )";
        var img = new Image();
        img.src = state.company_logo;
        doc.addImage(state.company_logo, "PNG", 650, 20, 120, 75);
        doc.setTextColor("#023554");
        doc.setFontSize(10);
        doc.text("SYSTEM GENERATED ACCOMPLISHMENT REPORT", 40, 35, {
          align: "left",
        });
        doc.text("POWERED BY GZONETECH INC.", 40, 55, {
          align: "left",
        });
        doc.setTextColor("#000000");
        doc.text("CLIENT - " + state.branch_name.toUpperCase(), 40, 75, {
          align: "left",
        });
        doc.text(
          String(moment(state.selection.startDate).format("LL").toUpperCase()) +
            " - " +
            String(moment(state.selection.endDate).format("LL").toUpperCase()) +
            " - " +
            "TYPE: " +
            selected_jo_type.map((val) => {
              return val.toUpperCase();
            }) +
            " ( " +
            state.selected_ba +
            " ) ",
          40,
          95,
          {
            align: "left",
          }
        );

        doc.autoTable({
          startY: 105,
          columnStyles: { cellWidth: "auto" },
          styles: { fontSize: 6 },
          html: "#mytable",
          headerStyles: { CellHeight: 15, hAlign: "center" },
          bodyStyles: { minCellHeight: 47, hAlign: "center", valign: "middle" },
          didDrawCell: function (data) {
            var td = data.cell.raw;
            var img = td.getElementsByTagName("img")[0];
            var textPos = data.cell;
            if (
              data.cell.raw.getElementsByTagName("img")[0] != undefined &&
              data.cell.raw.getElementsByTagName("img")[0] != ""
            ) {
              doc.addImage(img.src, textPos.x + 0, textPos.y + 5, 60, 20);
            } else {
            }
          },
        });
        doc.save(title + ".pdf");
      });
    }
  };
  const handleClickPrintSummaryDPF = () => {
    dispatch_data("loader", false);

    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape
    const doc = new jsPDF(orientation, unit, size);
    let title =
      home_reducer.SelectedBranch[0].branch_company +
      " " +
      home_reducer.dateFrom +
      " - " +
      home_reducer.dateTo;

    var img = new Image();
    img.src = state.company_logo;
    doc.addImage(state.company_logo, "PNG", 20, 20, 120, 75);
    doc.setFontSize(10);
    doc.text("SYSTEM GENERATED ACCOMPLISHMENT REPORT", 180, 120, {
      align: "left",
    });
    doc.text("POWERED BY GZONETECH INC.", 220, 135, {
      align: "left",
    });
    doc.text(
      "DATE : " +
        String(home_reducer.dateFrom.toUpperCase()) +
        " - " +
        String(home_reducer.dateTo.toUpperCase()),
      40,
      180,
      {
        align: "left",
      }
    );
    doc.text(
      "CLIENT : " + home_reducer.SelectedBranch[0].branch_company.toUpperCase(),
      40,
      195,
      { align: "left" }
    );
    doc.text(
      "TYPE : " +
        selected_jo_type.map((val) => {
          return val.toUpperCase();
        }),
      40,
      210,
      { align: "left" }
    );
    doc.save(title + ".pdf");
  };
  const handleCLickCloseSinglePagePDF = () => {
    setState({
      ...state,
      printalldialog: false,
    });
  };
  const handleCLickCloseSelectedPagePDF = () => {
    setState({
      ...state,
      printSeletedDialog: false,
    });
  };

  const handleClickNoExcelOpen = () => {
    setState({
      ...state,
      alertBlank: true,
    });
  };
  const handleClickCustomizeOpen = () => {
    setState({
      ...state,
      customize: true,
    });
  };
  const handleClickCustomizeClose = () => {
    setState({
      ...state,
      customize: false,
    });
  };
  const handleClickFilterOpen = () => {
    setState({
      ...state,
      filter_dialog: true,
    });
  };
  const handleClickFilterClose = () => {
    setState({
      ...state,
      filter_dialog: false,
    });
  };
  const handleChange = (val) => {
    let match = false;
    state.initialCat.map((val1, index) => {
      if (val1.category_id === val.category_id) {
        match = true;
        state.initialCat.splice(parseInt(index), 1);
      }
    });
    if (!match) {
      state.initialCat.push(val);
    }
    setState({
      ...state,
    });
  };
  const handleImageOpen = (data) => {
    dispatch_data("image", data);
    setImage(true);
  };
  const handleImageClose = () => {
    setImage(false);
  };
  const styles = StyleSheet.create({
    page: {
      backgroundColor: "#fff",
      paddingBottom: 139,
    },
    page2: {
      backgroundColor: "#fff",
      paddingBottom: 70,
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },
  });
  const handleListItemClick = (event, index, val) => {
    let jo_type = [];
    let match = false;
    selected_jo_type.map((va_data) => {
      if (va_data != val) {
        jo_type.push(va_data);
      } else {
        match = true;
      }
    });
    if (!match) {
      jo_type.push(val);
    }
    setSelected_jo_type(jo_type);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };
  const jotypeChange = (e) => {
    let jo_type = [];
    jo_type.push(e.target.value);
    setSelected_jo_type(jo_type);
  };

  const initialFetchAccomplishment = (branches) => {
    let curr_date = new Date();
    let jo_type = [];
    let ba = [];
    let BranchwithFieldWork = branches.filter(
      (item) => String(item.branch_field_work).trim() !== ""
    );
    if (BranchwithFieldWork.length > 0) {
      jo_type = JSON.parse(BranchwithFieldWork[0].branch_field_work);
      if (BranchwithFieldWork[0].business_area != null) {
        ba = JSON.parse(BranchwithFieldWork[0].business_area);
      }
    }
    setState((prev) => ({
      ...prev,
      selected_branch: BranchwithFieldWork[0].branch_id,
      company: BranchwithFieldWork[0].company_id,
      jo_type: jo_type,
      business_area: ba,
      selected_ba: "ALL",
      branch_name: BranchwithFieldWork[0].branch_company,
    }));
    setSelected_jo_type([
      jo_type[parseInt(BranchwithFieldWork[0].default_jo_type)],
    ]);
    setTimeout(() => {
      onSubmit(
        curr_date,
        curr_date,
        BranchwithFieldWork[0].branch_id,
        [jo_type[parseInt(BranchwithFieldWork[0].default_jo_type)]],
        "ALL",
        BranchwithFieldWork[0].company_id
      );
      liquidFillAccomplishments(
        BranchwithFieldWork[0].branch_id,
        jo_type[parseInt(BranchwithFieldWork[0].default_jo_type)],
        curr_date,
        curr_date,
        ["ALL"]
      );
    }, 200);
  };

  async function liquidFillAccomplishments(
    branch_id,
    active_type,
    start,
    end,
    ba
  ) {
    let chart_ = {
      user_id: localStorage.getItem("u"),
      branch_id: branch_id,
      jo_type: active_type,
      ba: ba,
      start: moment(start).format("YYYY-MM-DD"),
      end: moment(end).format("YYYY-MM-DD"),
    };
    getLiquidChart(chart_).then((response) => {
      if (Array.isArray(response)) {
        let restruct_Arr = response;
        restruct_Arr[0].activeType = active_type;
        setliquidChartArr_(response);
      }
    });
  }

  const onSubmitRefresh = () => {
    dispatch_data("loader", true);
    setliquidChartArr_([]);
    setTimeout(() => {
      onSubmit(
        state.selection.startDate,
        state.selection.endDate,
        state.selected_branch,
        selected_jo_type,
        "ALL",
        state.company
      );
      liquidFillAccomplishments(
        state.selected_branch,
        selected_jo_type[0],
        state.selection.startDate,
        state.selection.endDate,
        ["ALL"]
      );
    }, 200);
  };

  useEffect(() => {
    dispatch_data("loader", true);
    dispatch_data("getAccomplishments", []);
    dispatch_data("searchTable", []);
    dispatch_data("company_name", []);
    async function handleBranch() {
      await getHandleBranch({ user_id: localStorage.getItem("u") }).then(
        (response) => {
          console.log(response);
          let company = [];
          response.response.map((item) => {
            let match = false;
            company.map((val) => {
              if (val.company_name == item.company_name) {
                match = true;
              }
            });
            if (!match) {
              company.push({
                company_name: item.company_name,
                company_id: item.company_id,
                // company_logo: item.logo_base64,
              });
            }
          });
          initialFetchAccomplishment(response.response);
          dispatch_data("gethandleBranch", response.response);
          dispatch_data("company_name", company);
          dispatch_data("SelectedBranches", []);
        }
      );
    }
    async function fetchAccountData() {
      await getUserLoginData().then((response) => {
        response.user_login_data.map((val) => {
          dispatch_data("accountData", val);
        });
      });
    }
    async function GetAccomCategory() {
      await GetAccomCategories().then((response) => {
        setState({
          ...state,
          accomCat: response.data,
          initialCat: response.initial,
        });
      });
    }
    setTimeout(() => {
      handleBranch();
      fetchAccountData();
      GetAccomCategory();
    }, 500);
  }, []);

  return (
    <div className={classes.root}>
      <Breadcrumbs aria-label="breadcrumb" style={{ margin: 10 }}>
        <Typography
          style={{ color: "#3973b6", fontWeight: "bold", fontSize: 17 }}
        >
          Accomplishments
        </Typography>
        {state.selection.endDate !== "" ? (
          <Typography
            style={{ color: "#444b5a", fontWeight: "bold", fontSize: 17 }}
          >
            Date Range:&nbsp;
            {moment(state.selection.startDate).format("LL") +
              " - " +
              moment(state.selection.endDate).format("LL")}{" "}
          </Typography>
        ) : undefined}
        {state.branch_name !== "" ? (
          <Typography
            style={{ color: "#444b5a", fontWeight: "bold", fontSize: 17 }}
          >
            Branch:&nbsp;{state.branch_name}{" "}
          </Typography>
        ) : undefined}
        {selected_jo_type.length !== 0 ? (
          <Typography
            style={{ color: "#444b5a", fontWeight: "bold", fontSize: 17 }}
          >
            Type:&nbsp;
            {selected_jo_type.map((val) => {
              return <span>{val};&nbsp;</span>;
            })}
          </Typography>
        ) : undefined}
        {state.selected_ba !== "" ? (
          <Typography
            style={{ color: "#444b5a", fontWeight: "bold", fontSize: 17 }}
          >
            Business Area:&nbsp;{state.selected_ba}{" "}
          </Typography>
        ) : undefined}
      </Breadcrumbs>

      <Snackbar
        open={state.alertSuccess}
        autoHideDuration={6000}
        onClose={() => {
          handleAlertSuccessClose();
        }}
        key={(vertical, horizontal)}
        anchorOrigin={{ vertical, horizontal }}
      >
        <Alert onClose={handleAlertSuccessClose} severity="info">
          Accomplishment generated successfully!
        </Alert>
      </Snackbar>
      <Snackbar
        open={state.alertWarning}
        autoHideDuration={6000}
        onClose={() => {
          handleAlertWarningClose();
        }}
        key={(vertical, horizontal)}
        anchorOrigin={{ vertical, horizontal }}
      >
        <Alert onClose={handleAlertWarningClose} severity="warning">
          Accomplishment not found. Please try other date/s
        </Alert>
      </Snackbar>
      <Snackbar
        open={state.alertError}
        autoHideDuration={6000}
        onClose={() => {
          handleAlertErrorClose();
        }}
        key={(vertical, horizontal)}
        anchorOrigin={{ vertical, horizontal }}
      >
        <Alert onClose={handleAlertErrorClose} severity="error">
          Invalid date range. Please select other date/s
        </Alert>
      </Snackbar>
      <Snackbar
        open={state.alertBlank}
        autoHideDuration={6000}
        onClose={() => {
          handleAlertBlankClose();
        }}
        key={(vertical, horizontal)}
        anchorOrigin={{ vertical, horizontal }}
      >
        <Alert onClose={handleAlertBlankClose} severity="error">
          No Accomplishment found. Please generate table first!
        </Alert>
      </Snackbar>

      {/* TABLE FILTERATION */}
      <Grid container spacing={3}>
        <Grid
          item
          md={9}
          style={{ display: "flex", justifyContent: "flex-start" }}
        >
          <Toggling
            handledBranch={home_reducer.handleBranch}
            toggleSubmit={toggleSubmit}
          />
          <Button
            size="small"
            variant="contained"
            style={{ backgroundColor: "rgba(6,86,147)", color: "white" }}
            className={classes.button}
            onClick={handleClickOpen}
            endIcon={<TableChartIcon />}
          >
            Date filter
          </Button>
          <Button
            size="small"
            variant="contained"
            style={{
              backgroundColor: "rgba(6,86,147)",
              color: "white",
              marginLeft: 10,
            }}
            className={classes.button}
            onClick={handleClickCustomizeOpen}
            endIcon={<ViewWeekIcon />}
          >
            Customize Columns
          </Button>
          {state.accomplishments.length === 0 ? (
            <Button
              size="small"
              variant="contained"
              style={{
                backgroundColor: "rgba(6,86,147)",
                color: "white",
                marginLeft: 10,
              }}
              className={classes.button}
              onClick={() => {
                handleClickNoExcelOpen();
              }}
              endIcon={<FilterListIcon />}
            >
              Filter Table
            </Button>
          ) : (
            <Button
              size="small"
              variant="contained"
              style={{
                backgroundColor: "rgba(6,86,147)",
                color: "white",
                marginLeft: 10,
              }}
              className={classes.button}
              onClick={handleClickFilterOpen}
              endIcon={<FilterListIcon />}
            >
              Filter Table
            </Button>
          )}
          {home_reducer.accountData.btn_priv !== 0 ? (
            <Button
              aria-controls="customized-menu"
              aria-haspopup="true"
              variant="contained"
              style={{
                backgroundColor: "rgba(6,86,147)",
                color: "white",
                marginLeft: 10,
              }}
              onClick={handleOpenMenu}
              endIcon={<GetAppIcon />}
            >
              EXPORT
            </Button>
          ) : undefined}
          <StyledMenu
            id="customized-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(anchorEl)}
            onClose={handleCloseMenu}
          >
            {state.accomplishments.length === 0 ? (
              <>
                <MenuItem
                  onClick={() => {
                    handleClickNoExcelOpen();
                  }}
                >
                  <ListItemIcon>
                    <GridOnIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="EXCEL" />
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleClickNoExcelOpen();
                  }}
                >
                  <ListItemIcon>
                    <PictureAsPdfIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="PAGE" />
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleClickNoExcelOpen();
                  }}
                >
                  <ListItemIcon>
                    <PictureAsPdfIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="TABLE" />
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleClickNoExcelOpen();
                  }}
                >
                  <ListItemIcon>
                    <PictureAsPdfIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="IMAGES" />
                </MenuItem>
                {/* <MenuItem
                    onClick={() => {
                      handleClickNoExcelOpen();
                    }}
                  >
                    <ListItemIcon>
                      <PictureAsPdfIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="SUMMARY" />
                  </MenuItem> */}
              </>
            ) : (
              <>
                <ExcelFile
                  filename={
                    state.branch_name +
                    "Date: " +
                    "(" +
                    moment(state.selection.startDate).format("LL") +
                    "-" +
                    moment(state.selection.endDate).format("LL") +
                    ") " +
                    "Type: " +
                    "(" +
                    selected_jo_type +
                    ") " +
                    "Business Area: " +
                    "(" +
                    state.selected_ba +
                    ") "
                  }
                  element={
                    <MenuItem>
                      <ListItemIcon>
                        <GridOnIcon fontSize="small" />
                      </ListItemIcon>
                      <ListItemText primary="EXCEL" />
                    </MenuItem>
                  }
                >
                  <ExcelSheet
                    data={state.accomplishment_display}
                    name="Accomplishment"
                  >
                    {state.initialCat.map((val) => {
                      return (
                        <ExcelColumn
                          label={val.category_details}
                          value={val.category_field}
                        />
                      );
                    })}
                  </ExcelSheet>
                </ExcelFile>
                <MenuItem
                  onClick={() => {
                    onPrintperPage();
                  }}
                >
                  <ListItemIcon>
                    <PictureAsPdfIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="PAGE" />
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleClickPrintDPF();
                  }}
                >
                  <ListItemIcon>
                    <PictureAsPdfIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="TABLE" />
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    onPrintperImage();
                  }}
                >
                  <ListItemIcon>
                    <PictureAsPdfIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="IMAGES" />
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    onDualPrintperPage();
                  }}
                >
                  <ListItemIcon>
                    <PictureAsPdfIcon fontSize="small" />
                  </ListItemIcon>
                  <ListItemText primary="DUAL PAGE" />
                </MenuItem>
              </>
            )}
          </StyledMenu>
          <Button
            size="small"
            variant="contained"
            style={{
              backgroundColor: "rgba(6,86,147)",
              color: "white",
              marginLeft: 10,
            }}
            className={classes.button}
            onClick={onSubmitRefresh}
            endIcon={<RefreshIcon />}
          >
            REFRESH
          </Button>
          {/* {state.accomplishments.length === 0 ? (
              <Button
                size='small'
                variant='contained'
                style={{
                  backgroundColor: 'rgba(6,86,147)',
                  color: 'white',
                  marginLeft: 10
                }}
                className={classes.button}
                onClick={() => {
                  handleClickNoExcelOpen()
                }}
                endIcon={<CachedIcon />}
              >
                Reset Filter
              </Button>
            ) : (
              <Button
                size='small'
                variant='contained'
                style={{
                  backgroundColor: 'rgba(6,86,147)',
                  color: 'white',
                  marginLeft: 10
                }}
                className={classes.button}
                onClick={() => {
                  onResets()
                }}
                endIcon={<CachedIcon />}
              >
                Reset Filter
              </Button>
            )} */}
        </Grid>
        <Grid item md={3}>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <FormControl id="searchinput" size="small" variant="outlined">
              <InputLabel>Search</InputLabel>
              <OutlinedInput
                inputRef={searchinfo}
                onChange={(e) => {
                  search_accom(e);
                }}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => {
                        submitsearch();
                      }}
                    >
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                }
              />
            </FormControl>
          </div>
        </Grid>
      </Grid>

      {/* DIVIDER FOR TABLE AND CHART  */}
      <Grid container spacing={1} style={{ marginTop: 10 }}>
        <Grid item xs={12} md={5}>
          <Card variant="outlined">
            <CardContent style={{ height: 700 }}>
              {liquidChartArr_.map((value, index) => {
                let imageDisplay = null;
                if (String(value.branch_name).includes("Meralco")) {
                  imageDisplay = Meralco;
                }
                if (String(value.branch_name).includes("Maynilad")) {
                  imageDisplay = Maynilad;
                }
                if (String(value.branch_name).includes("Primewater")) {
                  imageDisplay = Primewater;
                }
                return (
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "flex-start",
                      alignItems: "center",
                      height: 50,
                      width: "100%",
                    }}
                    key={index}
                  >
                    <div style={{ width: "85%" }}>
                      <Typography
                        variant="h6"
                        style={{ color: "#4b4b4b" }}
                        noWrap
                      >
                        <b>{value.branch_name}</b>{" "}
                      </Typography>
                      <Typography
                        variant="button"
                        style={{ color: "#4b6584", fontSize: 15 }}
                        display="block"
                        noWrap
                        mb={2}
                      >
                        {value.company_name}{" "}
                      </Typography>
                    </div>
                    <div style={{ width: "15%" }}>
                      {imageDisplay != null ? (
                        <img
                          src={imageDisplay}
                          style={{ width: 55, height: 55 }}
                        />
                      ) : (
                        <Avatar aria-label="recipe" className={classes.avatar}>
                          {String(value.company_name).charAt(0)}
                        </Avatar>
                      )}
                    </div>
                  </div>
                );
              })}
              <WidgetReport accomplishments={state.accomplishments} />
              {liquidChartArr_.length > 0 ? (
                <LiquidContainer
                  liquidChartArr_={liquidChartArr_}
                  accomplishments={state.accomplishments.reduce(
                    (count, value) => {
                      if (
                        value.date_accomplished !== "" &&
                        value.date_accomplished !== null
                      ) {
                        count++;
                      }
                      return count;
                    },
                    0
                  )}
                />
              ) : (
                <div
                  style={{
                    width: "100%",
                    height: 400,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    marginTop: 25,
                  }}
                >
                  <div
                    style={{
                      height: 350,
                      width: 350,
                      backgroundColor: "#f5f6fa",
                      borderRadius: 175,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <div
                      style={{
                        height: 320,
                        width: 320,
                        backgroundColor: "#fff",
                        borderRadius: 160,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <img src={LoadingGif} style={{ width: 80, height: 80 }} />
                    </div>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={7}>
          {/* TABLE DISPLAY */}
          <Grid container spacing={2}>
            <Grid item md={12} sm={12} style={{ display: "none" }}>
              <TableContainer>
                <Table className={classes.table} id="mytable">
                  <TableHead>
                    <TableRow>
                      {state.initialCat.map((val) => {
                        return (
                          <TableCell align="center">
                            {val.category_details}
                          </TableCell>
                        );
                      })}
                      <TableCell align="center">
                        Signature/Photo Evidence
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {state.accomplishment_display.map((val, index) => {
                      if (
                        val.date_accomplished !== "" &&
                        val.date_accomplished !== null
                      ) {
                        return (
                          <>
                            <TableRow key={index}>
                              {state.initialCat.map((val1) => {
                                let value = val[val1.category_field];
                                return (
                                  <TableCell
                                    align="center"
                                    style={{ fontSize: 10 }}
                                  >
                                    {value}
                                  </TableCell>
                                );
                              })}
                              {state.imagepdftable.map((img) => {
                                if (img.jo_id === val.jo_id) {
                                  return (
                                    <TableCell align="center">
                                      <img src={img.image_base64} />
                                    </TableCell>
                                  );
                                }
                              })}
                            </TableRow>
                          </>
                        );
                      }
                    })}
                  </TableBody>
                </Table>
              </TableContainer>
            </Grid>
            <Grid item md={12} sm={12}>
              <Paper>
                <TableContainer
                  id="accom_table"
                  className={classes.container}
                  style={{ height: 650, maxWidth: "96vw" }}
                  size="small"
                >
                  <Table
                    size="small"
                    stickyHeader
                    style={{ whiteSpace: "nowrap" }}
                  >
                    <TableHead>
                      <TableRow>
                        <TableCell
                          style={{
                            position: "sticky",
                            zIndex: 5,
                            left: 1,
                            backgroundColor: "rgba(6,86,147)",
                            color: "white",
                          }}
                        >
                          <TableCell
                            style={{
                              backgroundColor: "rgba(6,86,147)",
                              color: "white",
                              borderBottomColor: "rgba(6,86,147)",
                            }}
                          >
                            Action
                          </TableCell>
                          <TableCell
                            style={{
                              backgroundColor: "rgba(6,86,147)",
                              color: "white",
                              borderBottomColor: "rgba(6,86,147)",
                            }}
                          >
                            Status
                          </TableCell>
                        </TableCell>

                        {state.initialCat.map((column) => {
                          return (
                            <TableCell
                              key={column.category_field}
                              // align={column.align}
                              style={{
                                minWidth: column.minWidth,
                                backgroundColor: "rgba(6,86,147)",
                                color: "white",
                              }}
                            >
                              {column.category_details}
                            </TableCell>
                          );
                        })}
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {state.accomplishment_display
                        .slice(
                          page * rowsPerPage,
                          page * rowsPerPage + rowsPerPage
                        )
                        .map((row) => {
                          let status = "Accomplished";
                          let bgcolor = "#58B19F";
                          if (
                            row.date_accomplished === "" ||
                            row.date_accomlished === null
                          ) {
                            status = "Pending";
                            bgcolor = "#E74C3C";
                          }
                          return (
                            <TableRow
                              hover
                              role="checkbox"
                              tabIndex={-1}
                              key={row.code}
                            >
                              <TableCell
                                style={{
                                  position: "sticky",
                                  zIndex: 2,
                                  left: 1,
                                  backgroundColor: "white",
                                }}
                              >
                                <TableCell
                                  style={{
                                    backgroundColor: "white",
                                    borderBottomColor: "white",
                                  }}
                                >
                                  <center
                                    style={{
                                      display: "flex",
                                      flexDirection: "row",
                                    }}
                                  >
                                    <Typography
                                      style={{
                                        cursor: "pointer",
                                        color: "rgba(6,86,147)",
                                      }}
                                      onClick={() => {
                                        handleClickDialogOpen(row);
                                      }}
                                    >
                                      <OpenInNewIcon />
                                    </Typography>
                                  </center>
                                </TableCell>
                                <TableCell
                                  style={{
                                    backgroundColor: "white",
                                    borderBottomColor: "white",
                                  }}
                                >
                                  <center>
                                    <Typography
                                      style={{
                                        color: "white",
                                        backgroundColor: bgcolor,
                                        padding: 3,
                                        borderRadius: 12,
                                      }}
                                    >
                                      {status}
                                    </Typography>
                                  </center>
                                </TableCell>
                              </TableCell>

                              {state.initialCat.map((column) => {
                                let bal = 0;
                                let value = row[column.category_field];
                                if (
                                  column.category_field === "date_accomplished"
                                ) {
                                  if (
                                    row[column.category_field] === "" ||
                                    row[column.category_field] === null
                                  ) {
                                    value = "";
                                  } else {
                                    value = moment(
                                      row[column.category_field]
                                    ).format("LL");
                                  }
                                }
                                if (
                                  column.category_field === "time_accomplished"
                                ) {
                                  if (
                                    row[column.category_field] === "" ||
                                    row[column.category_field] === null
                                  ) {
                                    value = "";
                                  } else {
                                    value = row[column.category_field];
                                  }
                                }
                                if (column.category_field === "all_images") {
                                  value = row.all_images.length;
                                }
                                if (
                                  column.category_details ===
                                  "Outstanding Balance"
                                ) {
                                  if (
                                    row[column.category_field] === "" ||
                                    row[column.category_field] === null
                                  ) {
                                    value = "₱ 0.00";
                                  }
                                }
                                return (
                                  <TableCell
                                    key={column.category_field}
                                    align={column.align}
                                    style={{
                                      whiteSpace: "nowrap",
                                      maxWidth: 150,
                                      overflow: "hidden",
                                      textOverflow: "ellipsis",
                                    }}
                                  >
                                    {column.category_details ===
                                    "Outstanding Balance" ? (
                                      <>₱&nbsp;</>
                                    ) : undefined}
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
                  rowsPerPageOptions={[100, 500, 1000]}
                  component="div"
                  count={state.accomplishment_display.length}
                  rowsPerPage={rowsPerPage}
                  page={page}
                  onChangePage={handleChangePage}
                  onChangeRowsPerPage={handleChangeRowsPerPage}
                />
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Dialog
        fullWidth
        maxWidth="md"
        open={state.open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="simple-dialog-title">
          Generate Accomplishments
        </DialogTitle>
        <DialogContent>
          <form onSubmit={onFormSubmit}>
            <Grid container spacing={1}>
              <Grid item xs={12} md={12}>
                <center
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "flex-start",
                  }}
                >
                  <DefinedRange
                    onChange={(item) => setState({ ...state, ...item })}
                    ranges={[state.selection]}
                  />
                  <DateRange
                    filter
                    editableDateInputs={true}
                    autoFocus={true}
                    months={2}
                    direction="horizontal"
                    moveRangeOnFirstSelection={false}
                    onChange={(item) => setState({ ...state, ...item })}
                    ranges={[state.selection]}
                  />
                </center>
              </Grid>
              {/* <Grid item xs={12} md={12}>
                <Card variant='outlined'>
                  <CardContent>
                    <Grid container spacing={1}>
                      <Grid item xs={12} md={6}>
                        <FormControl
                          variant='outlined'
                          required
                          size='small'
                          className={classes.formControl}
                        >
                          <InputLabel id='demo-simple-select-outlined-label'>
                            Company
                          </InputLabel>
                          <Select
                            labelId='demo-simple-select-outlined-label'
                            id='demo-simple-select-outlined'
                            onChange={onChangeCompany}
                            label='Company'
                            name='company'
                            value={state.company}
                          >
                            {home_reducer.company_name.map(val => {
                              return (
                                <MenuItem value={val.company_id}>
                                  {val.company_name}
                                </MenuItem>
                              )
                            })}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <FormControl
                          variant='outlined'
                          required
                          size='small'
                          className={classes.formControl}
                          value={state.selected_branch}
                          >
                          <InputLabel id='demo-simple-select-outlined-label'>
                            Branch
                          </InputLabel>
                          <Select
                            labelId='demo-simple-select-outlined-label'
                            id='demo-simple-select-outlined'
                            onChange={onChangeBranch}
                            label='branch'
                            name='branch_id'
                          >
                            {home_reducer.SelectedBranches.map((val, index) => {
                              return (
                                <MenuItem value={val.branch_id}>
                                  {val.branch_company}
                                </MenuItem>
                              )
                            })}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <FormControl
                          variant='outlined'
                          required
                          size='small'
                          className={classes.formControl}
                        >
                          <InputLabel htmlFor='select-multiple-native'>
                            Select Type
                          </InputLabel>
                          <Select
                            onChange={jotypeChange}
                            name='selected_jo_type'
                            value={selected_jo_type}
                          >
                            {state.jo_type.map((val, index) => {
                              return (
                                <MenuItem key={index} value={val}>
                                  {val}
                                </MenuItem>
                              )
                            })}
                          </Select>
                        </FormControl>
                      </Grid>
                      <Grid item xs={12} md={6}>
                        <FormControl
                          variant='outlined'
                          required
                          size='small'
                          className={classes.formControl}
                        >
                          <InputLabel id='demo-simple-select-outlined-label'>
                            Select Business Area
                          </InputLabel>
                          <Select value={state.selected_ba} name='selected_ba' onChange={onChange}>
                            <MenuItem value='ALL'>All</MenuItem>
                            {state.business_area.length === 0
                              ? undefined
                              : state.business_area.map(val => {
                                  return <MenuItem value={val}>{val}</MenuItem>
                                })}
                          </Select>
                        </FormControl>
                      </Grid>
                    </Grid>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item xs={12} md={12}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'flex-end'
                  }}
                >
                  <Button
                    type='submit'
                    variant='contained'
                    style={{
                      backgroundColor: 'rgba(6,86,147)',
                      color: 'white',
                      margin: 15
                    }}
                  >
                    Submit
                  </Button>
                </div>
              </Grid> */}
            </Grid>
          </form>
        </DialogContent>
      </Dialog>
      <Dialog
        fullWidth
        maxWidth="xl"
        open={state.datadialog}
        onClose={handleClickDialogClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogContent>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={5}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={12} md={12}>
                  <Carousel navButtonsAlwaysVisible={true} autoPlay={false}>
                    {state.img_data.length !== 0 ? (
                      state.img_data[0].image_path.map((val, index) => {
                        return (
                          <img
                            src={
                              "https://api.workflow.gzonetechph.com/assets/img/meter/" +
                              val
                            }
                            style={{ width: "100%", height: "270px" }}
                            onClick={() => {
                              handleImageOpen(val);
                            }}
                          />
                        );
                      })
                    ) : (
                      <img
                        src={NoImage}
                        style={{ width: "100%", height: "270px" }}
                        onClick={() => {
                          alert("No image available.");
                        }}
                      />
                    )}
                  </Carousel>
                </Grid>
                <Grid item xs={12} sm={12} md={12}>
                  <div style={{ width: "100%" }}>
                    <Mapa />
                  </div>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={7}>
              <Card className={classes.root} variant="outlined">
                <CardContent>
                  <center style={{ marginBottom: 20, marginTop: 10 }}>
                    <Typography
                      style={{
                        fontWeight: "600",
                        fontSize: "1.9em",
                      }}
                    >
                      Accomplishment Details
                    </Typography>
                  </center>
                  {state.columndata.map((row) => {
                    return (
                      <Grid container spacing={2}>
                        {state.initialCat.map((column) => {
                          let bal = 0;
                          let vals = row[column.category_field];
                          if (column.category_field === "date_accomplished") {
                            if (
                              row[column.category_field] === "" ||
                              row[column.category_field] === null
                            ) {
                              vals = "";
                            } else {
                              vals = moment(row[column.category_field]).format(
                                "LL"
                              );
                            }
                          }
                          if (column.category_field === "time_accomplished") {
                            if (
                              row[column.category_field] === "" ||
                              row[column.category_field] === null
                            ) {
                              vals = "";
                            } else {
                              vals = row[column.category_field];
                            }
                          }
                          if (column.category_field === "all_images") {
                            vals = row.all_images.length;
                          }
                          if (
                            column.category_details === "Outstanding Balance"
                          ) {
                            if (
                              row[column.category_field] === "" ||
                              row[column.category_field] === null
                            ) {
                              vals = "₱ 0.00";
                            }
                          }
                          return (
                            <Grid item sm={12} md={6}>
                              <TextField
                                InputProps={{
                                  readOnly: true,
                                }}
                                label={column.category_details}
                                id="outlined-margin-dense"
                                className={classes.textField}
                                margin="dense"
                                variant="outlined"
                                value={vals}
                              />
                            </Grid>
                          );
                        })}
                      </Grid>
                    );
                  })}
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClickDialogClose}
            style={{
              backgroundColor: "rgba(6,86,147)",
              color: "white",
              marginLeft: 10,
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        fullWidth
        maxWidth="xs"
        open={state.filter_dialog}
        onClose={handleClickFilterClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="simple-dialog-title">Table Filter</DialogTitle>
        <DialogContent>
          <form onSubmit={onFilter}>
            <FormControl
              // required
              size="small"
              className={classes.formControl}
            >
              <InputLabel id="demo-simple-select-outlined-label">
                Select Status
              </InputLabel>
              <Select
                labelId="demo-simple-select-outlined-label"
                id="demo-simple-select-outlined"
                onChange={onChangeStatus}
                label="Findings"
                name="status"
              >
                <MenuItem value="ALL">All</MenuItem>
                <MenuItem value="Accomplished">Accomplished</MenuItem>
                <MenuItem value="Pending">Pending</MenuItem>
              </Select>
            </FormControl>
            {state.status === "Pending" ||
            state.status === "ALL" ? //     disabled //     name="finding" //     label="Findings" //     onChange={onChange} //     id="demo-simple-select-outlined" //     labelId="demo-simple-select-outlined-label" //   <Select //   </InputLabel> //     Select Findings //   <InputLabel id="demo-simple-select-outlined-label"> // > //   className={classes.formControl} //   size="small" //   // required // <FormControl
            //   >
            //     <MenuItem value="ALL">ALL</MenuItem>
            //     {state.select_findings.map((val) => {
            //       return <MenuItem value={val}>{val}</MenuItem>;
            //     })}
            //   </Select>
            // </FormControl>
            undefined : (
              <FormControl
                // required
                size="small"
                className={classes.formControl}
              >
                <InputLabel id="demo-simple-select-outlined-label">
                  Select Findings
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  onChange={onChange}
                  label="Findings"
                  name="finding"
                >
                  <MenuItem value="ALL">All</MenuItem>
                  {state.select_findings.map((val) => {
                    return <MenuItem value={val}>{val}</MenuItem>;
                  })}
                </Select>
              </FormControl>
            )}
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: 15,
                marginBotton: 15,
              }}
            >
              <Button
                type="submit"
                style={{
                  backgroundColor: "rgba(6,86,147)",
                  color: "white",
                }}
              >
                Filter
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

      <Dialog
        fullWidth
        maxWidth="xs"
        open={state.customize}
        onClose={handleClickCustomizeClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="simple-dialog-title">Customize Column</DialogTitle>
        <DialogContent>
          <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend">Data Columns</FormLabel>
            <FormGroup>
              {state.accomCat.map((val) => {
                let initial = false;
                let match = state.initialCat.filter(
                  (cat) => cat.category_id === val.category_id
                );
                if (match.length > 0) {
                  initial = true;
                }
                return (
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={initial}
                        style={{ color: "rgba(6,86,147)" }}
                        onChange={() => {
                          handleChange(val);
                        }}
                        name={val.category_field}
                      />
                    }
                    label={val.category_details}
                  />
                );
              })}
            </FormGroup>
            <FormHelperText>
              only selected column/s will be displayed in accomplishment reports
            </FormHelperText>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleClickCustomizeClose}
            style={{
              backgroundColor: "rgba(6,86,147)",
              color: "white",
              marginLeft: 10,
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        fullWidth
        maxWidth="sm"
        open={image}
        onClose={handleImageClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="simple-dialog-title">Image Preview</DialogTitle>
        <DialogContent>
          <TransformWrapper
            defaultScale={1}
            defaultPositionX={200}
            defaultPositionY={100}
          >
            {({ zoomIn, zoomOut, resetTransform, ...rest }) => (
              <React.Fragment>
                <center>
                  <ButtonGroup size="small" variant="text">
                    <Button onClick={zoomIn} endIcon={<AddIcon />}>
                      Zoom&nbsp;in
                    </Button>
                    <Button onClick={zoomOut} endIcon={<RemoveIcon />}>
                      Zoom&nbsp;out
                    </Button>
                    <Button
                      onClick={() => {
                        setState({
                          ...state,
                          degree: state.degree - 90,
                        });
                      }}
                      endIcon={<RotateLeftIcon />}
                    >
                      Rotate&nbsp;Left
                    </Button>
                    <Button
                      onClick={() => {
                        setState({
                          ...state,
                          degree: state.degree + 90,
                        });
                      }}
                      endIcon={<RotateRightIcon />}
                    >
                      Rotate&nbsp;Right
                    </Button>
                  </ButtonGroup>
                  <TransformComponent>
                    <img
                      src={
                        "https://api.workflow.gzonetechph.com/assets/img/meter/" +
                        home_reducer.image
                      }
                      alt="image"
                      style={{
                        width: "100%",
                        height: "400px",
                        transform: "rotate(" + String(state.degree) + "deg)",
                      }}
                    />
                  </TransformComponent>
                </center>
              </React.Fragment>
            )}
          </TransformWrapper>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleImageClose}
            style={{
              backgroundColor: "rgba(6,86,147)",
              color: "white",
              marginLeft: 10,
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        fullWidth
        maxWidth="lg"
        open={state.printalldialog}
        onClose={handleCLickCloseSinglePagePDF}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="simple-dialog-title">Print Preview</DialogTitle>
        <DialogContent>
          <PDFViewer style={{ width: "100%", minHeight: 550 }}>
            <Document>
              {state.pdf_accomplishments.map((info, index) => {
                return (
                  <Page
                    size="A4"
                    style={styles.page}
                    wrap
                    orientation="portrait"
                  >
                    <View fixed>
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "center",
                          marginTop: "15px",
                        }}
                      >
                        <View>
                          <ImagePDF
                            style={{ width: 120, height: 75 }}
                            src={home_reducer.getLogo.logo_base64}
                          ></ImagePDF>
                        </View>
                        <View
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                          }}
                        >
                          <Text style={{ fontSize: 10 }}>
                            SYSTEM GENERATED ACCOMPLISHMENT REPORT
                          </Text>
                          <Text style={{ fontSize: 10 }}>
                            Powered By GZONETECH Inc.
                          </Text>
                          {home_reducer.SelectedBranch.map((val) => {
                            return (
                              <Text style={{ fontSize: 10 }}>
                                Client - {val.branch_company}
                              </Text>
                            );
                          })}
                        </View>
                      </View>
                      <View
                        style={{
                          backgroundColor: "black",
                          width: "95%",
                          margin: "auto",
                          height: 2,
                        }}
                      />
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          marginTop: "15px",
                          padding: 30,
                          margin: "auto",
                          width: "95%",
                        }}
                      >
                        <View
                          style={{
                            width: "50%",
                          }}
                        >
                          <Text style={{ fontSize: 10, marginBottom: 10 }}>
                            Address: {info.address}
                          </Text>
                          <Text style={{ fontSize: 10, marginBottom: 10 }}>
                            Reading Unit: {info.mru}
                          </Text>
                          <Text style={{ fontSize: 10, marginBottom: 10 }}>
                            Customer Name: {info.name}
                          </Text>
                          <Text style={{ fontSize: 10, marginBottom: 10 }}>
                            Reference Number: {info.meter_number}
                          </Text>
                          <Text style={{ fontSize: 10, marginBottom: 10 }}>
                            Account Number: {info.account_number}
                          </Text>
                          <Text style={{ fontSize: 10, marginBottom: 10 }}>
                            Previous Reading: {info.previous_reading}
                          </Text>
                        </View>
                        <View
                          style={{
                            width: "50%",
                          }}
                        >
                          <Text style={{ fontSize: 10, marginBottom: 10 }}>
                            Outstanding Balance {info.balance}
                          </Text>
                          <Text style={{ fontSize: 10, marginBottom: 10 }}>
                            Lock Number: {info.seal_number}
                          </Text>
                          <Text style={{ fontSize: 10, marginBottom: 10 }}>
                            Field Findings: {info.findings}
                          </Text>
                          {/* <Text style={{ fontSize: 10, marginBottom: 10 }}>
                            Remarks: {info.accom_remarks}
                          </Text> */}
                          <Text style={{ fontSize: 10, marginBottom: 10 }}>
                            Date Completed:{" "}
                            {moment(info.date_accomplished).format(
                              "MMMM DD YYYY hh:mm A"
                            )}
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{
                          margin: "auto",
                        }}
                      >
                        <Text style={{ fontSize: 15, marginBottom: 10 }}>
                          {info.jo_type}
                        </Text>
                      </View>
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-around",
                          marginTop: "15px",
                          padding: 30,
                          margin: "auto",
                          width: "95%",
                          flexWrap: "wrap",
                          alignContent: "space-between",
                        }}
                      >
                        {info.all_images_base64.map((val1) => {
                          return (
                            <View style={{ marginBottom: 10 }}>
                              <ImagePDF
                                style={{ width: 150, height: 150 }}
                                src={val1}
                              ></ImagePDF>
                            </View>
                          );
                        })}
                      </View>
                    </View>
                  </Page>
                );
              })}
            </Document>
          </PDFViewer>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCLickCloseSinglePagePDF}
            style={{
              backgroundColor: "rgba(6,86,147)",
              color: "white",
              marginLeft: 10,
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog
        fullWidth
        maxWidth="lg"
        open={state.printSeletedDialog}
        onClose={handleCLickCloseSelectedPagePDF}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="simple-dialog-title">
          Selected Accomplishment Preview
        </DialogTitle>
        <DialogContent>
          <PDFViewer style={{ width: "100%", minHeight: 550 }}>
            <Document>
              {state.printrowdata.map((info, index) => {
                return (
                  <Page
                    size="A4"
                    style={styles.page}
                    wrap
                    orientation="portrait"
                  >
                    <View fixed>
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "center",
                          marginTop: "15px",
                        }}
                      >
                        <View>
                          <ImagePDF
                            style={{ width: 120, height: 75 }}
                            src={home_reducer.getLogo.logo_base64}
                          ></ImagePDF>
                        </View>
                        <View
                          style={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                          }}
                        >
                          <Text style={{ fontSize: 10 }}>
                            SYSTEM GENERATED ACCOMPLISHMENT REPORT
                          </Text>
                          <Text style={{ fontSize: 10 }}>
                            Powered By GZONETECH Inc.
                          </Text>
                          {home_reducer.SelectedBranch.map((val) => {
                            return (
                              <Text style={{ fontSize: 10 }}>
                                Client - {val.branch_company}
                              </Text>
                            );
                          })}
                        </View>
                      </View>
                      <View
                        style={{
                          backgroundColor: "black",
                          width: "95%",
                          margin: "auto",
                          height: 2,
                        }}
                      />
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-between",
                          marginTop: "15px",
                          padding: 30,
                          margin: "auto",
                          width: "95%",
                        }}
                      >
                        <View
                          style={{
                            width: "50%",
                          }}
                        >
                          <Text style={{ fontSize: 10, marginBottom: 10 }}>
                            Address: {info.address}
                          </Text>
                          <Text style={{ fontSize: 10, marginBottom: 10 }}>
                            Reading Unit: {info.mru}
                          </Text>
                          <Text style={{ fontSize: 10, marginBottom: 10 }}>
                            Customer Name: {info.name}
                          </Text>
                          <Text style={{ fontSize: 10, marginBottom: 10 }}>
                            Reference Number: {info.meter_number}
                          </Text>
                          <Text style={{ fontSize: 10, marginBottom: 10 }}>
                            Account Number: {info.account_number}
                          </Text>
                          <Text style={{ fontSize: 10, marginBottom: 10 }}>
                            Previous Reading: {info.previous_reading}
                          </Text>
                        </View>
                        <View
                          style={{
                            width: "50%",
                          }}
                        >
                          <Text style={{ fontSize: 10, marginBottom: 10 }}>
                            Outstanding Balance {info.balance}
                          </Text>
                          <Text style={{ fontSize: 10, marginBottom: 10 }}>
                            Lock Number: {info.seal_number}
                          </Text>
                          <Text style={{ fontSize: 10, marginBottom: 10 }}>
                            Field Findings: {info.findings}
                          </Text>
                          {/* <Text style={{ fontSize: 10, marginBottom: 10 }}>
                            Remarks: {info.accom_remarks}
                          </Text> */}
                          <Text style={{ fontSize: 10, marginBottom: 10 }}>
                            Date Completed:{" "}
                            {moment(info.date_accomplished).format(
                              "MMMM DD YYYY hh:mm A"
                            )}
                          </Text>
                        </View>
                      </View>
                      <View
                        style={{
                          margin: "auto",
                        }}
                      >
                        <Text style={{ fontSize: 15 }}>
                          {info.accom_jo_type}
                        </Text>
                      </View>
                      <View
                        style={{
                          display: "flex",
                          flexDirection: "row",
                          justifyContent: "space-around",
                          marginTop: "15px",
                          padding: 30,
                          margin: "auto",
                          width: "95%",
                          flexWrap: "wrap",
                          alignContent: "space-between",
                        }}
                      >
                        {info.all_images_base64.map((val1) => {
                          return (
                            <View style={{ marginBottom: 10 }}>
                              <ImagePDF
                                style={{ width: 150, height: 150 }}
                                src={val1}
                              ></ImagePDF>
                            </View>
                          );
                        })}
                      </View>
                    </View>
                  </Page>
                );
              })}
            </Document>
          </PDFViewer>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCLickCloseSelectedPagePDF}
            style={{
              backgroundColor: "rgba(6,86,147)",
              color: "white",
              marginLeft: 10,
            }}
          >
            Close
          </Button>
        </DialogActions>
      </Dialog>
      <Dialog
        fullWidth
        maxWidth="xs"
        open={state.modal_jo_type}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="simple-dialog-title">Select Type</DialogTitle>
        <DialogContent>
          <form>
            <Card variant="outlined">
              <CardContent>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={12}>
                    <List component="nav" aria-label="main mailbox folders">
                      {state.jo_type.map((val, index) => {
                        let check = false;
                        let match = selected_jo_type.filter(
                          (type) => type === val
                        );
                        if (match.length > 0) {
                          check = true;
                        }
                        return (
                          <>
                            <Divider />
                            <FormControlLabel
                              control={
                                <Checkbox
                                  checked={check}
                                  onChange={(event) => {
                                    handleListItemClick(event, index, val);
                                  }}
                                  name="checkedB"
                                  color="primary"
                                />
                              }
                              label={val.toUpperCase()}
                            />
                          </>
                        );
                      })}
                      <Divider />
                    </List>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </form>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => setState({ ...state, modal_jo_type: false })}
            color="primary"
          >
            Done
          </Button>
        </DialogActions>
      </Dialog>

      <Backdrop
        style={{ zIndex: 9999 }}
        className={classes.backdrop}
        open={home_reducer.loader}
      >
        <CircularProgress color="inherit" />
      </Backdrop>

      <Backdrop
        style={{ zIndex: 9999 }}
        className={classes.backdrop}
        open={state.loader}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  );
}
export default Schedule_Table;
