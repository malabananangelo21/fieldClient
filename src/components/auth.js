import { useSelector } from "react-redux";
import "../../src/App.css";
import Accomplishments from "./apps/accomplishments/accomplishments";
import Accomplish from "./apps/field_accom/field_accom";
import Accom from "./apps/initial/index";
import UploadFile from "./apps/uploads/uploadfile";
import Test from "./apps/test/text";
import Assigning from "./apps/assigning/index";
import Reports from "./apps/field/field_table/field_report";
import Index from "./apps/landing_page/landing_page";
import MontAccom from "./apps/report/report";
import MeterTracking from "./apps/meter_tracking/meter_tracking";
import TrackMeter from "./apps/trackMeter/indexTrackMeter";
import UploadFileNewVersion from "./apps/upload/index";
import UploadFileAccom from "./apps/uploadAccom/index";
import AssigningAudit from "./apps/assigning_audit/index";
import RealtimeDashboard from "./apps/realtime/monitoring";
import AccountsMasterList from "./apps/masterList/masterList";
import MeterReadingSummary from "./apps/meter_reading_summary/index";
import GradingSystem from "./apps/grading/index";
import Billing from "./apps/billing/billing";
import Payroll from "./apps/payroll/payroll";
import ReportDash from "./apps/report_dash/field_table/field_report";
import FieldReportv2 from "./apps/report_dash/reportv2/fieldmain";
import IndexAuditReading from "./apps/audit/reading/indexAuditReading";

function App(page) {
  const navigation = useSelector((state) => state.navigation_reducer);

  let page_name = "";
  navigation.appNav.map((val) => {
    if (
      page_name == "" &&
      val.parent_name !== "Client Map" &&
      val.parent_name !== "Map Accomplishment"
    ) {
      page_name = val.parent_name;
    }
  });
  // let path = LandingPage
  let matchPage = false;
  if (JSON.stringify(navigation.appNav).includes(page)) {
    matchPage = true;
  }

  if (page == "Home") {
    return Index;
  }
  if (matchPage == true) {
    if (page == "Client Accomplishments") {
      return Accom;
    } else if (page == "Accomplished") {
      return Accomplish;
    } else if (page == "Monitoring Accomplishment") {
      return MontAccom;
    } else if (page == "Upload Data") {
      return UploadFile;
    } else if (page == "Reports") {
      return Reports;
    } else if (page == "Assigning Job Orders") {
      return Assigning;
    } else if (page == "Upload J.O. File") {
      return UploadFileNewVersion;
    } else if (page == "Upload Accom File") {
      return UploadFileAccom;
    } else if (page == "Assigning Audit") {
      return AssigningAudit;
    } else if (page == "Realtime") {
      return RealtimeDashboard;
    } else if (page == "Master List") {
      return MeterTracking;
    } else if (page == "Meter Reading Summary") {
      return MeterReadingSummary;
    } else if (page == "Grading") {
      return GradingSystem;
    } else if (page == "Track and Trace") {
      return TrackMeter;
    } else if (page == "Billing") {
      return Billing;
    } else if (page == "Payroll") {
      return Payroll;
    } else if (page == "Dashboard") {
      return ReportDash;
    } else if (page == "Dashboard2") {
      return FieldReportv2;
    } else if (page == "Audit Reading") {
      return IndexAuditReading;
    }

    // else if (page == 'Assigning Audit'){
    //     return (AccountsMasterList)
    // }
  } else {
    if (page == "Client Accomplishments") {
      if (page_name == "Accomplished") {
        return Accomplish;
      } else if (page_name == "Upload Data") {
        return UploadFile;
      } else if (page_name == "Assigning Job Orders") {
        return Assigning;
      } else if (page_name == "Reports") {
        return Reports;
      } else if (page_name == "Client Map") {
        return true;
      } else if (page_name == "Upload J.O. File") {
        return UploadFileNewVersion;
      } else if (page == "Upload Accom File") {
        return UploadFileAccom;
      } else if (page == "Assigning Audit") {
        return AssigningAudit;
      } else if (page == "Realtime") {
        return RealtimeDashboard;
      } else if (page == "Meter Reading Summary") {
        return MeterReadingSummary;
      } else if (page == "Grading") {
        return GradingSystem;
      }
      // else if (page == 'Assigning Audit'){
      //     return (AccountsMasterList)
      // }
      else if (page_name == "Master List") {
        return MeterTracking;
      } else if (page_name == "Billing") {
        return Billing;
      } else if (page == "Payroll") {
        return Payroll;
      } else if (page == "Dashboard") {
        return ReportDash;
      } else if (page == "Dashboard2") {
        return FieldReportv2;
      } else if (page_name == "Track and Trace") {
        return TrackMeter;
      } else if (page_name == "Audit Reading") {
        return IndexAuditReading;
      }
    }
  }
}

export default App;
