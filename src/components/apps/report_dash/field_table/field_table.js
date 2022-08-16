import DateFnsUtils from "@date-io/date-fns";
import Backdrop from "@material-ui/core/Backdrop";
import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Button from "@material-ui/core/Button";
import ButtonGroup from "@material-ui/core/ButtonGroup";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Checkbox from "@material-ui/core/Checkbox";
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
import Input from "@material-ui/core/Input";
import InputLabel from "@material-ui/core/InputLabel";
import List from "@material-ui/core/List";
import MenuItem from "@material-ui/core/MenuItem";
import Paper from "@material-ui/core/Paper";
import Select from "@material-ui/core/Select";
import Snackbar from "@material-ui/core/Snackbar";
import { useTheme } from "@material-ui/core/styles";
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
import EditIcon from "@material-ui/icons/Edit";
import FilterListIcon from "@material-ui/icons/FilterList";
import GridOnIcon from "@material-ui/icons/GridOn";
import ListAltIcon from "@material-ui/icons/ListAlt";
import OpenInNewIcon from "@material-ui/icons/OpenInNew";
import RemoveIcon from "@material-ui/icons/Remove";
import RotateLeftIcon from "@material-ui/icons/RotateLeft";
import RotateRightIcon from "@material-ui/icons/RotateRight";
import TableChartIcon from "@material-ui/icons/TableChart";
import NoImage from "../../../../assets/map image/no_image.png";
import MuiAlert from "@material-ui/lab/Alert";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import {
  Document,
  Image as ImagePDF,
  Page,
  pdf,
  PDFViewer,
  StyleSheet,
  Text,
  View,
} from "@react-pdf/renderer";
import "date-fns";
import { saveAs } from "file-saver";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "jspdf-autotable";
import moment from "moment";
import React, { useEffect } from "react";
import "react-alice-carousel/lib/alice-carousel.css";
import ReactExport from "react-data-export";
import Carousel from "react-material-ui-carousel";
import { useDispatch, useSelector } from "react-redux";
import { TransformComponent, TransformWrapper } from "react-zoom-pan-pinch";
import "../../../../App";
import useStyles from "../../../../css/css";
import {
  GetAccomCategories,
  getAccomplishmentsV2,
  getHandleBranch,
  getUserLoginData,
} from "../../Functions/home_func";
import Mapa from "../../map/map";

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
// ====== ILO ILO MMSC BRANCH HEADER TABLE START =======
const columns = [
  {
    id: "customer_meter_no",
    label: "Reference Number",
  },
  {
    id: "findings",
    label: "Field Findings",
  },
  {
    id: "date_accomplished",
    label: "Date & Time",
  },
];
// ====== ILO ILO MMSC BRANCH HEADER TABLE END =======

// ====== NGC ENTERPRISE HEADER TABLE START =======
const columns2 = [
  {
    id: "accom_fieldman_name",
    label: "Fieldman",
  },
  {
    id: "customer_meter_no",
    label: "Reference Number",
  },
  {
    id: "findings",
    label: "Field Findings",
  },
  {
    id: "date_accomplished",
    label: "Date & Time",
  },
];
// ====== NGC ENTERPRISE  HEADER TABLE END =======

// ====== IRIGA MMSC HEADER TABLE START =======
const columns3 = [
  {
    id: "customer_meter_no",
    label: "References Number",
  },
  {
    id: "account_number",
    label: "Account No",
  },
  {
    id: "previous_reading",
    label: "Previous Reading",
  },
  {
    id: "present_reading",
    label: "Present Reading",
  },
  {
    id: "findings",
    label: "Field Findings",
  },
  {
    id: "accom_remarks",
    label: "Remarks",
  },
  {
    id: "date_accomplished",
    label: "Date & Time",
  },
];
// ====== IRIGA MMSC  HEADER TABLE END =======

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
    printalldialog: false,
    printrowdata: [],
    printSeletedDialog: false,
    modal_jo_type: false,
    select_findings: [],
    master_accom: [],
    new_pdf_accomplishments: [],
    filter_dialog: false,
    business_area: [],
    branch_name: "",
    selected_ba: "",
  });
  const onChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.value,
    });
  };
  useEffect(() => {
    dispatch_data("getAccomplishments", []);
    dispatch_data("searchTable", []);
    // dispatch_data("gethandleBranch", []);
    // dispatch_data("company_name", []);

    async function handleBranch() {
      await getHandleBranch({ user_id: localStorage.getItem("u") }).then(
        (response) => {
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
              });
            }
          });
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
  const handleClickOpen = () => {
    setState({
      ...state,
      reference: "",
      branch_id: "",
      open: true,
    });
    dispatch_data("SelectedBranches", []);
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
    });
  };

  const onChangeFilterFindings = (e) => {
    let filtered = [];
    if (e.target.value === "All") {
      filtered = state.master_accom;
    } else {
      filtered = state.master_accom.filter(
        (val) => String(val.findings).toUpperCase() === e.target.value
      );
    }
    setState({
      ...state,
      accomplishments: filtered,
    });
  };
  // const onChangeBranch = (e) => {
  //   let jo_type = [];
  //   home_reducer.SelectedBranches.map((val, index) => {
  //     if (val.branch_id === e.target.value) {
  //       if (val.branch_field_work !== "") {
  //         jo_type = JSON.parse(val.branch_field_work);
  //       }
  //     }
  //   });
  //   setState({
  //     ...state,
  //     selected_branch: e.target.value,
  //     jo_type: jo_type,
  //   });
  // };

  const onChangeBranch = (e) => {
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

  const onSubmit = (e) => {
    e.preventDefault();
    if (
      moment(state.date_start).format("YYYY-MM-DD") >
      moment(state.date_end).format("YYYY-MM-DD")
    ) {
      setState({
        ...state,
        alertError: true,
      });
    } else if (
      moment(state.date_start).format("YYYY") ===
      moment("2020-01-01").format("YYYY")
    ) {
      alert(
        "The accomplishments for the year 2020 you need to generate are on the archive. Please email us with any questions or concerns."
      );
    } else {
      let data = {
        parameter: "branch_id",
        reference: state.reference,
        selection: state.selected_branch,
        date_start: moment(state.date_start).format("YYYY-MM-DD"),
        type: "download",
        date_end: moment(state.date_end).format("YYYY-MM-DD"),
        company_id: state.company,
        jo_type: selected_jo_type,
        ba: state.selected_ba,
      };
      dispatch_data("loader", true);
      getAccomplishmentsV2(data).then((response) => {
        dispatch_data("loader", false);
        if (response.accomplishments.length != 0) {
          dispatch_data("SelectedBranch", state.selected_branch);
          dispatch_data("dateFrom", moment(state.date_start).format("LL"));
          dispatch_data("dateTo", moment(state.date_end).format("LL"));
          dispatch_data("getLogo", response.company[0]);
          let findings = [];
          response.accomplishments.map((val) => {
            if (val.date_accomplished !== "") {
              val["time_accomplished"] = moment(val.date_accomplished).format(
                "hh:mm A"
              );
            }
            if (val.date_accomplished !== "") {
              val.date_accomplished = moment(val.date_accomplished).format(
                "LL"
              );
            }
            let find = "";
            let match = false;
            find = val.findings;
            findings.map((val1) => {
              if (val1 === String(val.findings).toUpperCase()) {
                match = true;
              }
            });
            if (!match) {
              findings.push(String(val.findings).toUpperCase());
            }
          });
          setState({
            ...state,
            tableheader: state.branch_id,
            accomplishments: response.accomplishments,
            master_accom: response.accomplishments,
            open: false,
            alertSuccess: true,
            select_findings: findings,
          });
        } else {
          setState({
            ...state,
            alertWarning: true,
          });
        }
      });
      setPage(0);
    }
  };
  const handleClickDialogOpen = (data) => {
    var coordinates = data.coordinates.split(",");
    var latitude = coordinates[0];
    var longitude = coordinates[1];
    dispatch_data("latitude", latitude);
    dispatch_data("longitude", longitude);
    setState({
      ...state,
      columndata: data,
      datadialog: true,
      printrowdata: [data],
    });
  };
  const handleClickDialogClose = () => {
    setState({
      ...state,
      datadialog: false,
    });
  };
  let accomSearch = state.accomplishments.filter((files) => {
    return (
      files.customer_meter_no
        .toLowerCase()
        .indexOf(state.search.toLocaleLowerCase()) !== -1 ||
      files.coordinates
        .toLowerCase()
        .indexOf(state.search.toLocaleLowerCase()) !== -1 ||
      files.accom_fieldman_name
        .toLowerCase()
        .indexOf(state.search.toLocaleLowerCase()) !== -1
    );
  });
  const search_accom = (e) => {
    setState({
      ...state,
      search: e.target.value,
    });
    setPage(0);
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
  const handleClickPrintOpen = (data) => {
    setState({
      ...state,
      singleAccom: data,
      printdialog: true,
    });
  };
  const handleClickPrintClose = () => {
    setState({
      ...state,
      printdialog: false,
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
      let data = {
        parameter: "branch_id",
        reference: state.reference,
        selection: state.selected_branch,
        date_start: moment(state.date_start).format("YYYY-MM-DD"),
        type: "download",
        date_end: moment(state.date_end).format("YYYY-MM-DD"),
        company_id: state.company,
        jo_type: selected_jo_type,
        ba: state.selected_ba,
      };
      console.log(data);
      getAccomplishmentsV2(data).then((response) => {
        if (response.accomplishments.length != 0) {
          response.accomplishments.map((val) => {
            if (val.date_accomplished !== "") {
              val["time_accomplished"] = moment(val.date_accomplished).format(
                "hh:mm A"
              );
            }
            if (val.date_accomplished !== "") {
              val["date_accomplished"] = moment(val.date_accomplished).format(
                "LL"
              );
            }
          });
          setState({
            ...state,
            pdf_accomplishments: response.accomplishments,
          });
          dispatch_data("loader", false);
          const unit = "pt";
          const size = "A4"; // Use A1, A2, A3 or A4
          const orientation = "landscape"; // portrait or landscape
          const doc = new jsPDF(orientation, unit, size);
          let title =
            moment(state.date_start).format("LL") +
            " - " +
            moment(state.date_end).format("LL") +
            " " +
            state.branch_name +
            " ( " +
            selected_jo_type +
            " ) " +
            " ( " +
            state.selected_ba +
            " ) " +
            " ( " +
            " TABLE " +
            " ) ";

          var img = new Image();
          img.src = home_reducer.getLogo.logo_base64;
          doc.setFontSize(20);
          doc.addImage(
            home_reducer.getLogo.logo_base64,
            "PNG",
            650,
            20,
            120,
            75
          );
          doc.text("Accomplishment Report", 40, 35, { align: "left" });
          doc.setFontSize(11);
          doc.text(
            "Client - " + home_reducer.SelectedBranch[0].branch_company,
            40,
            55,
            { align: "left" }
          );
          doc.text(
            "Date - " + home_reducer.dateFrom + " - " + home_reducer.dateTo,
            40,
            75,
            {
              align: "left",
            }
          );
          doc.text("Powered by GZONETECH, Inc.", 40, 100, {
            align: "left",
          });
          doc.autoTable({
            startY: 105,
            // columnStyles: { cellWidth: "auto" },
            styles: { fontSize: 5 },
            html: "#mytable",
            headerStyles: { CellHeight: 15, hAlign: "center" },
            bodyStyles: {
              minCellHeight: 47,
              hAlign: "center",
              valign: "middle",
            },
            didDrawCell: function (data) {
              var td = data.cell.raw;
              var img = td.getElementsByTagName("img")[0];
              var textPos = data.cell;
              if (
                data.cell.raw.getElementsByTagName("img")[0] != undefined &&
                data.cell.raw.getElementsByTagName("img")[0] != ""
              ) {
                doc.addImage(img.src, textPos.x + 0, textPos.y + 10, 45, 20);
              } else {
              }
            },
          });
          doc.save(title + ".pdf");
        }
      });
    }
  };
  const handleClickNewPrintDPF = () => {
    let data = {
      parameter: "branch_id",
      reference: state.reference,
      selection: state.selected_branch,
      date_start: moment(state.date_start).format("YYYY-MM-DD"),
      type: "download",
      date_end: moment(state.date_end).format("YYYY-MM-DD"),
      company_id: state.company,
      jo_type: selected_jo_type,
    };
    // getAccomplishmentsV2(data).then((response) => {
    // });
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

  const handleCLickOpenSinglePagePDF = () => {
    if (state.accomplishments.length === 0) {
      setState({
        ...state,
        alertBlank: true,
      });
    } else {
      dispatch_data("loader", true);
      let data = {
        parameter: "branch_id",
        reference: state.reference,
        selection: state.selected_branch,
        date_start: moment(state.date_start).format("YYYY-MM-DD"),
        type: "download",
        date_end: moment(state.date_end).format("YYYY-MM-DD"),
        company_id: state.company,
        jo_type: selected_jo_type,
        ba: state.selected_ba,
      };
      getAccomplishmentsV2(data).then((response) => {
        let newPdfArray = [];
        let count = 1;
        let arrayDivision = [];
        response.accomplishments.map((val, index) => {
          if (count <= 50) {
            arrayDivision.push(val);
            count++;
            if (index === response.accomplishments.length - 1) {
              newPdfArray.push(arrayDivision);
            }
          } else {
            newPdfArray.push(arrayDivision);
            arrayDivision = [];
            arrayDivision.push(val);
            count = 2;
          }
        });
        setState({
          ...state,
          // pdf_accomplishments: response.accomplishments,
          new_pdf_accomplishments: newPdfArray,
          // printalldialog: true,
        });

        pdfFunction(newPdfArray, -1);
      });
    }
  };
  const handleClickPrintDPFSingles = () => {
    if (state.accomplishments.length === 0) {
      setState({
        ...state,
        alertBlank: true,
      });
    } else {
      dispatch_data("loader", true);

      let data = {
        parameter: "branch_id",
        reference: state.reference,
        selection: state.selected_branch,
        date_start: moment(state.date_start).format("YYYY-MM-DD"),
        type: "download",
        date_end: moment(state.date_end).format("YYYY-MM-DD"),
        company_id: state.company,
        jo_type: selected_jo_type,
      };
      getAccomplishmentsV2(data).then((response) => {
        setState({
          ...state,
          pdf_accomplishments: response.accomplishments,
        });
        dispatch_data("loader", false);
        html2canvas(document.querySelector("#content"), {
          allowTaint: true,
          logging: true,
          width: 1300,
          height: 500,
          useCORS: true,
          // onrendered: function (canvas) {},
        }).then((canvas) => {
          const unit = "pt";
          const size = "A4"; // Use A1, A2, A3 or A4
          const orientation = "portrait"; // portrait or landscape
          const doc = new jsPDF(orientation, unit, size);
          var details = document.getElementById("content");
          var img = new Image();
          var body_details = new Image();
          img.src = home_reducer.getLogo.logo_base64;
          body_details.src = canvas.toDataURL("image/jpeg");
          doc.addImage(
            home_reducer.getLogo.logo_base64,
            "PNG",
            150,
            20,
            120,
            75
          );
          doc.setFontSize(10);
          doc.text("SYSTEM GENERATED ACCOMPLISHMENT REPORT", 260, 45);
          doc.text("Powered by GZONETECH Inc.", 260, 60);
          doc.text(
            "Client - " + home_reducer.SelectedBranch[0].branch_company,
            260,
            75
          );
          doc.addImage(
            home_reducer.getLogo.logo_base64,
            "PNG",
            150,
            20,
            120,
            75
          );
          doc.addImage(
            canvas.toDataURL("image/jpeg"),
            "JPG",
            20,
            100,
            500,
            700
          );
          doc.save("test" + ".pdf");
        });
      });
    }
  };

  const DownloadingPDFAuto = () => {
    return;
  };
  const handleClickPrintAllOpen = () => {
    if (state.accomplishments.length === 0) {
      setState({
        ...state,
        alertBlank: true,
      });
    } else {
      const unit = "pt";
      const size = "A4"; // Use A1, A2, A3 or A4
      const orientation = "landscape"; // portrait or landscape
      const doc = new jsPDF(orientation, unit, size);
      let title =
        home_reducer.SelectedBranch[0].branch_company +
        " " +
        home_reducer.dateFrom +
        " - " +
        home_reducer.dateTo;
      var img = new Image();
      img.src = home_reducer.getLogo.logo_base64;
      doc.setFontSize(20);
      doc.addImage(home_reducer.getLogo.logo_base64, "PNG", 550, 20, 240, 40);
      doc.text("Accomplishment Report", 40, 35, { align: "left" });
      doc.setFontSize(11);
      doc.text(
        "Company - " + home_reducer.SelectedBranch[0].branch_company,
        40,
        55,
        { align: "left" }
      );
      doc.text("Date Start - " + home_reducer.dateFrom, 40, 75, {
        align: "left",
      });
      doc.text("Date End - " + home_reducer.dateTo, 40, 100, { align: "left" });
      doc.text("Powered by GZONETECH, Inc.", 750, 80, { align: "right" });
      doc.autoTable({
        startY: 105,
        columnStyles: { cellWidth: "auto" },
        // columnStyles: { 6: { cellWidth: 120 }, 4: { cellWidth: 90 }, 5: { cellWidth: 70 } },
        html: "#mytable",
        headerStyles: { CellHeight: 15, hAlign: "center" },
        bodyStyles: { minCellHeight: 47, hAlign: "center", valign: "middle" },
        didDrawCell: function (data) {
          {
            /* ====== NGC ENTERPRISE BRANCH TABLE START ======= */
          }
          if (
            state.tableheader !== "50" &&
            state.tableheader !== "51" &&
            state.tableheader !== "67"
          ) {
            var td = data.cell.raw;
            var img = td.getElementsByTagName("img")[0];
            var textPos = data.cell;
            if (
              data.cell.raw.getElementsByTagName("img")[0] != undefined &&
              data.cell.raw.getElementsByTagName("img")[0] != ""
            ) {
              doc.addImage(img.src, textPos.x + 15, textPos.y + 5, 80, 40);
            } else {
            }
            {
              /* ====== NGC ENTERPRISE BRANCH TABLE END======= */
            }

            {
              /* ====== ILO ILO MMSC BRANCH TABLE START ID: 50 ======= */
            }
          } else if (state.tableheader == "50") {
            var td = data.cell.raw;
            var img = td.getElementsByTagName("img")[0];
            var textPos = data.cell;
            if (
              data.cell.raw.getElementsByTagName("img")[0] != undefined &&
              data.cell.raw.getElementsByTagName("img")[0] != ""
            ) {
              doc.addImage(img.src, textPos.x + 5, textPos.y + 5, 80, 40);
            } else {
            }
            {
              /* ====== ILO ILO MMSC BRANCH TABLE START ID: 50 ======= */
            }

            {
              /* ====== IRIGA MMSC BRANCH TABLE START ID: 51 ======= */
            }
          } else if (state.tableheader == "51" || state.tableheader == "67") {
            var td = data.cell.raw;
            var img = td.getElementsByTagName("img")[0];
            var textPos = data.cell;
            if (
              data.cell.raw.getElementsByTagName("img")[0] != undefined &&
              data.cell.raw.getElementsByTagName("img")[0] != ""
            ) {
              doc.addImage(img.src, textPos.x + 10, textPos.y + 5, 80, 40);
            } else {
            }
          }
          {
            /* ====== IRIGA MMSC BRANCH TABLE END ID: 51======= */
          }
        },
      });
      doc.save(title + ".pdf");
    }
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
  const passBranchDetails = (data) => {
    setState({
      ...state,
      branch_field_work: JSON.parse(data.branch_field_work),
    });
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
  const delay = (t) => new Promise((resolve) => setTimeout(resolve, t));
  const delay_v2 = (ms) =>
    new Promise((res) => {
      setTimeout(() => {
        res();
      }, ms);
    });
  async function getProps(item, index) {
    await delay(100 * (1 + index));
    return {
      data: item,
    };
  }
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
  const MyDoc = ({ data }) => (
    <Document>
      {data.map((info, index) => {
        return (
          <Page
            key={index}
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
                    Customer Name: {info.name}
                  </Text>
                  <Text style={{ fontSize: 10, marginBottom: 10 }}>
                    Address: {info.address}
                  </Text>
                  <Text style={{ fontSize: 10, marginBottom: 10 }}>
                    Zone: {info.zone}
                  </Text>
                  <Text style={{ fontSize: 10, marginBottom: 10 }}>
                    Nature of Work: {info.accom_jo_type}
                  </Text>
                  <Text style={{ fontSize: 10, marginBottom: 10 }}>
                    Meter Number: {info.meter_number}
                  </Text>
                  <Text style={{ fontSize: 10, marginBottom: 10 }}>
                    Previous Reading: {info.previous_reading}
                  </Text>
                  <Text style={{ fontSize: 10, marginBottom: 10 }}>
                    Reading Unit: {info.mru}
                  </Text>
                  <Text style={{ fontSize: 10, marginBottom: 10 }}>
                    Field Findings: {info.findings}
                  </Text>
                  <Text style={{ fontSize: 10, marginBottom: 10 }}>
                    Fieldman: {info.accom_fieldman_name}
                  </Text>
                  <Text style={{ fontSize: 10, marginBottom: 10 }}>
                    Date Completed:{" "}
                    {moment(info.date_accomplished).format("LL")}
                  </Text>
                </View>
                <View
                  style={{
                    width: "50%",
                  }}
                >
                  <Text style={{ fontSize: 10, marginBottom: 10 }}>
                    Account Number: {info.account_number}
                  </Text>
                  <Text style={{ fontSize: 10, marginBottom: 10 }}>
                    Meter Reading Unit (MRU): {info.mru}
                  </Text>
                  <Text style={{ fontSize: 10, marginBottom: 10 }}>
                    Business Area: {info.BA}
                  </Text>
                  <Text style={{ fontSize: 10, marginBottom: 10 }}>
                    Outstanding Balance:{" "}
                    {info.accom_jo_type !== "Disconnection" ? 0 : info.balance}
                  </Text>
                  <Text style={{ fontSize: 10, marginBottom: 10 }}>
                    Lock Number: {info.seal_number}
                  </Text>
                  <Text style={{ fontSize: 10, marginBottom: 10 }}>
                    Present Reading: {info.present_reading}
                  </Text>
                  <Text style={{ fontSize: 10, marginBottom: 10 }}>
                    Remarks:{" "}
                    {info.accom_remarks === "" ||
                    info.accom_remarks === null ||
                    info.accom_remarks === undefined
                      ? "N/A"
                      : info.accom_remarks}
                  </Text>
                  <Text style={{ fontSize: 10, marginBottom: 10 }}>
                    Location: {info.coordinates}
                  </Text>
                  <Text style={{ fontSize: 10, marginBottom: 10 }}>
                    Date Completed:{" "}
                    {moment(info.date_accomplished).format("hh:mm A")}
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
  );
  async function pdfFunction(newPdfArray, index) {
    let new_index = index + 1;
    let title =
      moment(state.date_start).format("LL") +
      " - " +
      moment(state.date_end).format("LL") +
      " " +
      state.branch_name +
      " ( " +
      selected_jo_type +
      " ) " +
      " ( " +
      state.selected_ba +
      " ) " +
      " ( " +
      " PAGE " +
      " ) ";
    if (new_index < newPdfArray.length) {
      let item = newPdfArray[new_index];

      const props = await getProps(item, new_index);
      const doc = <MyDoc {...props} />;
      const asPdf = pdf([]); // {} is important, throws without an argument
      asPdf.updateContainer(doc);
      const blob = await asPdf.toBlob();
      saveAs(blob, title + "(" + new_index + ")" + ".pdf");
      pdfFunction(newPdfArray, new_index);
    } else {
      dispatch_data("loader", false);
    }
  }
  return (
    <div className={classes.root}>
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
      <Breadcrumbs aria-label="breadcrumb" style={{ margin: 10 }}>
        <Typography color="textPrimary">Accomplishments</Typography>
        {state.date_end != "" ? (
          <Typography color="textPrimary">
            Date Range:&nbsp;
            {moment(state.date_start).format("LL") +
              " - " +
              moment(state.date_end).format("LL")}{" "}
          </Typography>
        ) : undefined}
        {state.branch_name != "" ? (
          <Typography color="textPrimary">
            Branch:&nbsp;{state.branch_name}{" "}
          </Typography>
        ) : undefined}
        {selected_jo_type.length != 0 ? (
          <Typography color="textPrimary">
            Type:&nbsp;
            {selected_jo_type.map((val) => {
              return <span>{val};&nbsp;</span>;
            })}
          </Typography>
        ) : undefined}
        {state.selected_ba != "" ? (
          <Typography color="textPrimary">
            Business Area:&nbsp;{state.selected_ba}{" "}
          </Typography>
        ) : undefined}
      </Breadcrumbs>
      <Grid container spacing={3}>
        <Grid
          item
          md={9}
          style={{ display: "flex", justifyContent: "flex-start" }}
        >
          <Button
            size="small"
            variant="contained"
            style={{ backgroundColor: "rgba(6,86,147)", color: "white" }}
            className={classes.button}
            onClick={handleClickOpen}
            endIcon={<FilterListIcon />}
          >
            Generate
          </Button>
          {/* <Button
            size="small"
            variant="contained"
            style={{ backgroundColor: "rgba(6,86,147)", color: "white" }}
            className={classes.button}
            onClick={handleClickNewPrintDPF}
            endIcon={<FilterListIcon />}
          >
            Downloads
          </Button> */}
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
            endIcon={<EditIcon />}
          >
            Customize
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
              Filter
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
              Filter
            </Button>
          )}

          {home_reducer.accountData.btn_priv != 0 ? (
            <>
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
                  handleClickPrintDPF();
                }}
                endIcon={<TableChartIcon />}
              >
                Save as Table
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
                onClick={() => {
                  handleCLickOpenSinglePagePDF();
                }}
                endIcon={<ListAltIcon />}
              >
                Save as Page
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
                  endIcon={<GridOnIcon />}
                >
                  Save as Excel
                </Button>
              ) : (
                <ExcelFile
                  filename="Accomplishment Report"
                  element={
                    <Button
                      size="large"
                      variant="contained"
                      style={{
                        fontSize: "0.8125rem",
                        backgroundColor: "rgba(6,86,147)",
                        color: "white",
                        marginLeft: 10,
                      }}
                      className={classes.button}
                      endIcon={<GridOnIcon />}
                    >
                      Save as Excel
                    </Button>
                  }
                >
                  <ExcelSheet data={accomSearch} name="Accomplishment">
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
              )}
              {/* <button
    onClick={()=>{
      if( state.new_pdf_accomplishments.length > 0){
      pdfFunction(0)
      }
    }}
  >
    Download PDF
  </button> */}
            </>
          ) : undefined}
        </Grid>

        <Grid item md={3}>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
            <TextField
              size="small"
              id="outlined-basic"
              label="Search"
              onChange={(e) => {
                search_accom(e);
              }}
              variant="outlined"
            />
          </div>
        </Grid>
        {/* {state.accomplishments.length !== 0 ? (
          <>
            <Grid item md={6}>
              <div style={{ display: "flex", justifyContent: "flex-start" }}>
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
                    onChange={onChangeFilterFindings}
                    label="Findings"
                    name="findings"
                  >
                    <MenuItem value="">All</MenuItem>
                    {state.select_findings.map((val) => {
                      return <MenuItem value={val}>{val}</MenuItem>;
                    })}
                  </Select>
                </FormControl>
              </div>
            </Grid>
            <Grid item md={6}></Grid>
          </>
        ) : undefined} */}
      </Grid>
      <Grid container spacing={3}>
        <Grid item md={12} sm={12}>
          <TableContainer
            style={{ maxHeight: 400, width: "96vw", display: "none" }}
          >
            <Table
              className={classes.table}
              size="small"
              stickyHeader
              style={{ whiteSpace: "nowrap" }}
              id="mytable"
            >
              <TableHead>
                <TableRow>
                  {state.initialCat.map((val) => {
                    return (
                      <TableCell align="center">
                        {val.category_details}
                      </TableCell>
                    );
                  })}
                  <TableCell align="center">Signature/Photo Evidence</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {state.pdf_accomplishments.map((val, index) => {
                  return (
                    <TableRow key={index}>
                      {state.initialCat.map((val1, index1) => {
                        let value = val[val1.category_field];
                        if (val1.category_field === "all_images") {
                          value = val.all_images.length;
                        }
                        if (val1.category_field === "date_accomplished") {
                          if (
                            val[val1.category_field] === "" ||
                            val[val1.category_field] === null
                          ) {
                            value = "";
                          } else {
                            value = moment(val[val1.category_field]).format(
                              "LL"
                            );
                          }
                        }
                        if (val1.category_field === "time_accomplished") {
                          if (
                            val[val1.category_field] === "" ||
                            val[val1.category_field] === null
                          ) {
                            value = "";
                          } else {
                            value = val[val1.category_field];
                          }
                        }
                        if (val1.category_details === "Outstanding Balance") {
                          if (
                            val[val1.category_field] === "" ||
                            val[val1.category_field] === null
                          ) {
                            value = "0.00";
                          }
                        }
                        return (
                          <TableCell align="center" style={{ fontSize: 10 }}>
                            {value}
                          </TableCell>
                        );
                      })}
                      <TableCell align="center">
                        <img src={val.image_base64} />
                      </TableCell>
                    </TableRow>
                  );
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
              style={{ maxHeight: 400, width: "96vw" }}
              size="small"
            >
              <Table size="small" stickyHeader style={{ whiteSpace: "nowrap" }}>
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
                  {accomSearch
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row) => {
                      let status = "Accomplished";
                      let bgcolor = "#43a047";
                      if (
                        row.date_accomplished === "" ||
                        row.date_accomlished === null
                      ) {
                        status = "Pending";
                        bgcolor = "#ff5722";
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
                            let value = row[column.category_field];
                            if (column.category_field === "date_accomplished") {
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
                            if (column.category_field === "time_accomplished") {
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
                              column.category_details === "Outstanding Balance"
                            ) {
                              if (
                                row[column.category_field] === "" ||
                                row[column.category_field] === null
                              ) {
                                value = "0.00";
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
              count={accomSearch.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onChangePage={handleChangePage}
              onChangeRowsPerPage={handleChangeRowsPerPage}
            />
          </Paper>
        </Grid>
      </Grid>
      <Dialog
        fullWidth
        maxWidth="xs"
        open={state.open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="simple-dialog-title">
          Generate Accomplishments
        </DialogTitle>
        <DialogContent>
          <form onSubmit={onSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} md={12}>
                <MuiPickersUtilsProvider utils={DateFnsUtils} size="small">
                  <KeyboardDatePicker
                    id="date-picker-dialog"
                    label="Filter Date Start"
                    format="MM-dd-yyyy"
                    name="date_start"
                    value={state.date_start}
                    style={{ width: "100%" }}
                    onChange={handleDateChangeStart}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid item xs={12} md={12}>
                <MuiPickersUtilsProvider utils={DateFnsUtils} size="small">
                  <KeyboardDatePicker
                    id="date-picker-dialog"
                    label="Filter Date End"
                    format="MM-dd-yyyy"
                    name="date_end"
                    value={state.date_end}
                    style={{ width: "100%" }}
                    onChange={handleDateChangeEnd}
                    KeyboardButtonProps={{
                      "aria-label": "change date",
                    }}
                  />
                </MuiPickersUtilsProvider>
              </Grid>
              <Grid item xs={12} md={12}>
                <FormControl
                  required
                  size="small"
                  className={classes.formControl}
                >
                  <InputLabel id="demo-simple-select-outlined-label">
                    Company
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    onChange={onChangeCompany}
                    label="Company"
                    name="company"
                  >
                    {home_reducer.company_name.map((val) => {
                      return (
                        <MenuItem value={val.company_id}>
                          {val.company_name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={12}>
                <FormControl
                  required
                  size="small"
                  className={classes.formControl}
                >
                  <InputLabel id="demo-simple-select-outlined-label">
                    Branch
                  </InputLabel>
                  <Select
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    onChange={onChangeBranch}
                    label="branch"
                    name="branch_id"
                  >
                    {home_reducer.SelectedBranches.map((val, index) => {
                      return (
                        <MenuItem value={val.branch_id}>
                          {val.branch_company}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={12}>
                <FormControl
                  required
                  className={classes.formControl}
                  onClick={() => setState({ ...state, modal_jo_type: true })}
                >
                  <InputLabel shrink htmlFor="select-multiple-native">
                    Select Type
                  </InputLabel>
                  <Select
                    labelId="demo-mutiple-name-label"
                    id="demo-mutiple-name"
                    multiple
                    value={selected_jo_type}
                    // onChange={handleChange}

                    input={<Input />}
                    MenuProps={MenuProps}
                    disabled
                  >
                    a{" "}
                    {state.jo_type.map((val, index) => (
                      <MenuItem key={index} value={val}>
                        {val}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={12}>
                <FormControl
                  required
                  size="small"
                  className={classes.formControl}
                >
                  <InputLabel id="demo-simple-select-outlined-label">
                    Select Business Area
                  </InputLabel>
                  <Select name="selected_ba" onChange={onChange}>
                    <MenuItem value="ALL">All</MenuItem>
                    {state.business_area.length === 0
                      ? undefined
                      : state.business_area.map((val) => {
                          return <MenuItem value={val}>{val}</MenuItem>;
                        })}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  name="reference"
                  onChange={onChange}
                  helperText="Specific customer generation"
                  size="small"
                  style={{ width: "100%" }}
                  id="outlined-basic"
                  label="Customer Number (Optional)"
                  variant="outlined"
                />
              </Grid>
            </Grid>
            <div style={{ display: "flex", justifyContent: "flex-end" }}>
              <Button
                type="submit"
                variant="contained"
                style={{
                  backgroundColor: "rgba(6,86,147)",
                  color: "white",
                  margin: 15,
                }}
              >
                Submit
              </Button>
            </div>
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
            <Grid item xs={12} xs={12} md={5}>
              <Grid container spacing={2}>
                <Grid item xs={12} xs={12} md={12}>
                  <Carousel navButtonsAlwaysVisible={true} autoPlay={false}>
                    {state.columndata.length !== 0 ? (
                      state.columndata.all_images.map((val, index) => {
                        return (
                          <img
                            src={
                              "https://api.workflow.gzonetechph.com/assets/img/meter/" +
                              val.path
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
                  <Grid item xs={12} xs={12} md={12}>
                    <div style={{ width: "100%" }}>
                      <Mapa />
                    </div>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} xs={12} md={7}>
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
                  <Grid container spacing={2}>
                    <Grid item sm={12} md={6}>
                      <TextField
                        style={{
                          color: "black",
                        }}
                        label="Customer Name"
                        id="outlined-margin-dense"
                        className={classes.textField}
                        margin="dense"
                        variant="outlined"
                        value={
                          state.columndata.name === null ||
                          state.columndata.name === "" ||
                          state.columndata.name === undefined
                            ? "N/A"
                            : state.columndata.name
                        }
                      />
                      <TextField
                        style={{
                          color: "black",
                        }}
                        label="Address"
                        id="outlined-margin-dense"
                        className={classes.textField}
                        margin="dense"
                        variant="outlined"
                        value={state.columndata.address}
                      />
                      <TextField
                        style={{
                          color: "black",
                        }}
                        label="Zone"
                        id="outlined-margin-dense"
                        className={classes.textField}
                        margin="dense"
                        variant="outlined"
                        value={state.columndata.zone}
                      />
                      <TextField
                        style={{
                          color: "black",
                        }}
                        label="Nature of Work"
                        id="outlined-margin-dense"
                        className={classes.textField}
                        margin="dense"
                        variant="outlined"
                        value={state.columndata.accom_jo_type}
                      />
                      <TextField
                        style={{
                          color: "black",
                        }}
                        label="Meter Number"
                        id="outlined-margin-dense"
                        className={classes.textField}
                        margin="dense"
                        variant="outlined"
                        value={state.columndata.customer_meter_no}
                      />

                      <TextField
                        style={{
                          color: "black",
                        }}
                        label="Previous Reading"
                        id="outlined-margin-dense"
                        className={classes.textField}
                        margin="dense"
                        variant="outlined"
                        value={state.columndata.previous_reading}
                      />

                      <TextField
                        style={{
                          color: "black",
                        }}
                        label="Field Findings"
                        id="outlined-margin-dense"
                        className={classes.textField}
                        margin="dense"
                        variant="outlined"
                        value={state.columndata.findings}
                      />
                      <TextField
                        style={{
                          color: "black",
                        }}
                        label="Fieldman"
                        id="outlined-margin-dense"
                        className={classes.textField}
                        margin="dense"
                        variant="outlined"
                        value={state.columndata.accom_fieldman_name}
                      />
                      <TextField
                        style={{
                          color: "black",
                        }}
                        label="Date Completed"
                        id="outlined-margin-dense"
                        className={classes.textField}
                        margin="dense"
                        variant="outlined"
                        value={moment(
                          state.columndata.date_accomplished
                        ).format("LL")}
                      />
                    </Grid>
                    <Grid item sm={12} md={6}>
                      <TextField
                        style={{
                          color: "black",
                        }}
                        label="Account Number"
                        id="outlined-margin-dense"
                        className={classes.textField}
                        margin="dense"
                        variant="outlined"
                        value={state.columndata.account_number}
                      />
                      <TextField
                        style={{
                          color: "black",
                        }}
                        label="Meter Reading Unit (MRU)"
                        id="outlined-margin-dense"
                        className={classes.textField}
                        margin="dense"
                        variant="outlined"
                        value={state.columndata.mru}
                      />
                      <TextField
                        style={{
                          color: "black",
                        }}
                        label="Business Area"
                        id="outlined-margin-dense"
                        className={classes.textField}
                        margin="dense"
                        variant="outlined"
                        value={state.columndata.BA}
                      />
                      <TextField
                        style={{
                          color: "black",
                        }}
                        label="Outstanding Balance"
                        id="outlined-margin-dense"
                        className={classes.textField}
                        margin="dense"
                        variant="outlined"
                        value={
                          state.columndata.balance === null ||
                          state.columndata.balance === undefined
                            ? "₱ 0.00"
                            : "₱" + " " + state.columndata.balance
                        }
                      />
                      <TextField
                        style={{
                          color: "black",
                        }}
                        label="Lock Number"
                        id="outlined-margin-dense"
                        className={classes.textField}
                        margin="dense"
                        variant="outlined"
                        value={state.columndata.seal_number}
                      />
                      <TextField
                        style={{
                          color: "black",
                        }}
                        label="Present Reading"
                        id="outlined-margin-dense"
                        className={classes.textField}
                        margin="dense"
                        variant="outlined"
                        value={state.columndata.present_reading}
                      />
                      <TextField
                        style={{
                          color: "black",
                        }}
                        label="Remarks"
                        id="outlined-margin-dense"
                        className={classes.textField}
                        margin="dense"
                        variant="outlined"
                        value={
                          state.columndata.accom_remarks === "" ||
                          state.columndata.accom_remarks === null ||
                          state.columndata.accom_remarks === undefined
                            ? "N/A"
                            : state.columndata.accom_remarks
                        }
                      />
                      <TextField
                        style={{
                          color: "black",
                        }}
                        label="Location"
                        id="outlined-margin-dense"
                        className={classes.textField}
                        margin="dense"
                        variant="outlined"
                        value={state.columndata.coordinates}
                      />
                      <TextField
                        style={{
                          color: "black",
                        }}
                        label="Time Completed"
                        id="outlined-margin-dense"
                        className={classes.textField}
                        margin="dense"
                        variant="outlined"
                        value={state.columndata.time_accomplished}
                      />
                    </Grid>
                  </Grid>
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
        maxWidth="lg"
        open={state.printdialog}
        onClick={() => {
          handleClickPrintClose();
        }}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="simple-dialog-title">Print Preview</DialogTitle>
        <DialogContent></DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleClickPrintClose();
            }}
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
        open={state.customize}
        onClose={handleClickCustomizeClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="simple-dialog-title">Table Customization</DialogTitle>
        <DialogContent>
          <FormControl component="fieldset" className={classes.formControl}>
            <FormLabel component="legend">Table Data Columns</FormLabel>

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
                        home_reducer.image.path
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

      <Dialog
        fullWidth
        maxWidth="xs"
        open={state.filter_dialog}
        onClose={handleClickFilterClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="simple-dialog-title">Table Filter</DialogTitle>
        <DialogContent>
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
              onChange={onChangeFilterFindings}
              label="Findings"
              name="findings"
            >
              <MenuItem value="All">All</MenuItem>
              {state.select_findings.map((val) => {
                return <MenuItem value={val}>{val}</MenuItem>;
              })}
            </Select>
          </FormControl>
        </DialogContent>
        <DialogActions>
          <Button onClose={handleClickFilterClose} color="primary">
            Filter
          </Button>
        </DialogActions>
      </Dialog>

      <Backdrop
        className={classes.backdrop}
        open={home_reducer.loader}
        style={{ zIndex: 9999 }}
      >
        <div className="loadermap"></div>
      </Backdrop>
    </div>
  );
}
export default Schedule_Table;