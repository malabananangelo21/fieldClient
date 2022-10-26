import React, { useEffect } from "react";
import { HashRouter as Router, Route, Redirect } from "react-router-dom";
import Accom from "./apps/initial/index";
import Test from "./apps/test/text";
import Accomplishments from "./apps/accomplishments/accomplishments";
import Maps from "./apps/map/map";
import ClientMaps from "./apps/clientmapMonitoring/monitoringMap";
import Accomplish from "./apps/field_accom/field_accom";
import Reports from "./apps/field/field_table/field_report";
import UploadFile from "./apps/uploads/uploadfile";
import Assigning from "./apps/assigning/index";
import AssigningAudit from "./apps/assigning_audit/index";
import UploadFileNewVersion from "./apps/assigning/index";
import UploadFileAccom from "./apps/uploadAccom/index";
import RealtimeDashboard from "./apps/realtime/monitoring";
import AccountsMasterList from "./apps/masterList/masterList";
import Index from "./apps/landing_page/landing_page";
import MontAccom from "./apps/report/report";
import MeterTracking from "./apps/meter_tracking/meter_tracking";
import MeterReadingSummary from "./apps/meter_reading_summary/index";
import GradingSystem from "./apps/grading/index";
import Billing from "./apps/billing/billing";
import Payroll from "./apps/payroll/payroll";
import ReportDash from "./apps/report_dash/field_table/field_report";
import FieldReportv2 from "./apps/report_dash/reportv2/fieldmain";
import TrackMeter from "./apps/trackMeter/indexTrackMeter";
import PlaylistAddCheckIcon from "@material-ui/icons/PlaylistAddCheck";
import IndexAuditReading from "./apps/audit/reading/indexAuditReading";
const routes = [
  {
    path: "/",
    exact: true,
    component: Index,
    page_name: "Home",
    icon: "task_alt",
  },
  {
    path: "/metertracking/",
    exact: true,
    component: MeterTracking,
    page_name: "Meter Tracking",
    icon: "task_alt",
  },
  {
    path: "/monitoring-accom/",
    exact: true,
    component: MontAccom,
    page_name: "Monitoring Accomplishment",
    icon: "task_alt",
  },
  {
    path: "/accom/",
    exact: true,
    component: Accom,
    page_name: "Client Accomplishments",
    icon: "task_alt",
  },
  {
    path: "/accomplishment/",
    exact: true,
    component: Accomplish,
    page_name: "Accomplished",
    icon: "assignment_turned_in",
  },
  {
    path: "/reports/",
    exact: true,
    component: Reports,
    page_name: "Reports",
    icon: "summarize",
  },
  {
    path: "/surveyaccom/",
    exact: true,
    component: Test,
    page_name: "Field Accomplishments",
    icon: "task_alt",
  },
  {
    path: "/dash-accoms/",
    exact: true,
    component: Accomplishments,
    page_name: "Dash Accomplishment",
    icon: "task_alt",
  },
  {
    path: "/map/",
    exact: true,
    component: Maps,
    page_name: "Client Map",
    icon: "task_alt",
  },
  {
    path: "/client_map/",
    exact: true,
    component: Maps,
    page_name: "Client Map2",
    icon: "task_alt",
  },
  {
    path: "/uploading/",
    exact: false,
    component: UploadFile,
    page_name: "Upload Data",
    icon: "task_alt",
  },
  {
    path: "/assigning_job_orders/",
    exact: false,
    component: Assigning,
    page_name: "Assigning Job Orders",
    icon: "task_alt",
  },
  {
    path: "/uploading_jo/",
    exact: false,
    component: UploadFileNewVersion,
    page_name: "Upload J.O. File",
    icon: "task_alt",
  },
  {
    path: "/uploading_accomplishments/",
    exact: false,
    component: UploadFileAccom,
    page_name: "Upload Accom File",
    icon: "task_alt",
  },
  {
    path: "/assigning_job_orders_audit/",
    exact: false,
    component: AssigningAudit,
    page_name: "Assigning Audit",
    icon: "task_alt",
  },
  {
    path: "/realtime_charts/",
    exact: false,
    component: RealtimeDashboard,
    page_name: "Realtime",
    icon: "task_alt",
  },
  {
    path: "/meter_reading_summary/",
    exact: false,
    component: MeterReadingSummary,
    page_name: "Meter Reading Summary",
    icon: "task_alt",
  },
  {
    path: "/gradingSystem/",
    exact: false,
    component: GradingSystem,
    page_name: "Grading",
    icon: "task_alt",
  },
  {
    path: "/trackTrace/",
    exact: false,
    component: TrackMeter,
    page_name: "Track and Trace",
    icon: "task_alt",
  },

  // {
  //     path: '/accountsMasterList/',
  //     exact: false,
  //     component: AccountsMasterList,
  //     page_name : 'Assigning Audit'
  // },
];
const routes2 = [
  {
    path: "/metertracking/",
    exact: true,
    component: MeterTracking,
    page_name: "Master List",
    icon: "summarize ",
  },
  {
    path: "/monitoring-accom/",
    exact: true,
    component: MontAccom,
    page_name: "Monitoring Accomplishment",
    icon: "task_alt",
  },
  {
    path: "/accom/",
    exact: true,
    component: Accom,
    page_name: "Client Accomplishments",
    icon: "task_alt",
  },
  {
    path: "/accomplishment/",
    exact: true,
    component: Accomplish,
    page_name: "Accomplished",
    icon: "assignment_turned_in",
  },
  {
    path: "/reports/",
    exact: true,
    component: Reports,
    page_name: "Reports",
    icon: "list",
  },
  {
    path: "/surveyaccom/",
    exact: true,
    component: Test,
    page_name: "Field Accomplishments",
    icon: "task_alt",
  },
  {
    path: "/dash-accoms/",
    exact: true,
    component: Accomplishments,
    page_name: "Dash Accomplishment",
    icon: "task_alt",
  },
  {
    path: "/map/",
    exact: true,
    component: Maps,
    page_name: "Client Map",
    icon: "task_alt",
  },
  {
    path: "/client_map/",
    exact: true,
    component: Maps,
    page_name: "Client Map2",
    icon: "task_alt",
  },
  {
    path: "/uploading/",
    exact: false,
    component: UploadFile,
    page_name: "Upload Data",
    icon: "upload",
  },
  {
    path: "/assigning_job_orders/",
    exact: false,
    component: Assigning,
    page_name: "Assigning Job Orders",
    icon: "drive_file_rename_outline",
  },
  {
    path: "/uploading_jo/",
    exact: false,
    component: UploadFileNewVersion,
    page_name: "Upload J.O. File",
    icon: "upload",
  },
  {
    path: "/uploading_accomplishments/",
    exact: false,
    component: UploadFileAccom,
    page_name: "Upload Accom File",
    icon: "upload",
  },
  {
    path: "/assigning_job_orders_audit/",
    exact: false,
    component: AssigningAudit,
    page_name: "Assigning Audit",
    icon: "drive_file_rename_outline",
  },
  {
    path: "/realtime_charts/",
    exact: false,
    component: RealtimeDashboard,
    page_name: "Realtime",
    icon: "access_time_filled",
  },
  {
    path: "/meter_reading_summary/",
    exact: false,
    component: MeterReadingSummary,
    page_name: "Meter Reading Summary",
    icon: "fact_check",
  },
  {
    path: "/gradingSystem/",
    exact: false,
    component: GradingSystem,
    page_name: "Grading",
    icon: "score",
  },
  {
    path: "/trackTrace/",
    exact: false,
    component: TrackMeter,
    page_name: "Track and Trace",
    icon: "track_changes",
  },
  {
    path: "/billing/",
    exact: false,
    component: Billing,
    page_name: "Billing",
    icon: "point_of_sale",
  },
  {
    path: "/payroll/",
    exact: false,
    component: Payroll,
    page_name: "Payroll",
    icon: "money",
  },

  // {
  //     path: '/accountsMasterList/',
  //     exact: false,
  //     component: AccountsMasterList,
  //     page_name : 'Assigning Audit'
  // },

  {
    path: "/report_dash/",
    exact: true,
    component: ReportDash,
    page_name: "Dashboard",
    icon: "space_dashboard",
  },
  {
    path: "/dash2/",
    exact: true,
    component: FieldReportv2,
    page_name: "Dashboard2",
    icon: "space_dashboard",
  },
  {
    path: "/auditReading/",
    exact: true,
    component: IndexAuditReading,
    page_name: "Audit Reading",
    icon: "space_dashboard",
  },
];
export default routes2;
