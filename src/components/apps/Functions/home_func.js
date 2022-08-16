import { getData } from "../../api/api";
import moment from "moment";
import IconButton from "@material-ui/core/IconButton";
import ImageIcon from "@material-ui/icons/Image";
import React, { useEffect } from "react";
import { Avatar } from "@material-ui/core";
import jsPDF from "jspdf";
import "jspdf-autotable";

export function GetAccomCategories() {
  return new Promise((resolve, reject) => {
    getData("Tracking/GetAccomCategories").then((response) => {
      resolve(response);
    });
  });
}

// export function getJD() {
//     return new Promise((resolve, reject) => {
//         getData("position/getJD").then(response => {
//             resolve(response)
//         })
//     });
// }

export function getUserLoginData() {
  return new Promise((resolve, reject) => {
    getData("users/getPrivilege2", localStorage.getItem("u")).then(
      (response) => {
        resolve(response);
      }
    );
  });
}

export function getLiquidChart(data) {
  return new Promise((resolve, reject) => {
    getData("jls/getRealtimeData", data).then((response) => {
      resolve(response);
    });
  });
}

export function getHandleBranch(data) {
  return new Promise((resolve, reject) => {
    getData("HumanResource/getHandleBranchv2", data).then((response) => {
      resolve(response);
    });
  });
}
export function getJOAuditFilterDashBoard(data) {
  return new Promise((resolve, reject) => {
    getData("aam/getJOAuditFilterDashBoard", data).then((response) => {
      resolve(response);
    });
  });
}
export function getJOAuditFilterDashBoardPDF(data) {
  return new Promise((resolve, reject) => {
    getData("aam/getJOAuditFilterDashBoardPDF", data).then((response) => {
      resolve(response);
    });
  });
}
export function getAccomplishmentsV2(data) {
  return new Promise((resolve, reject) => {
    try {
      getData("Tracking/generateAccomplishmentReportv2", data).then(
        (response) => {
          resolve(response);
        }
      );
    } catch (error) {
      console.log(error);
    }
  });
}
export function getAccomplishments(data) {
  return new Promise((resolve, reject) => {
    getData("Tracking/generateAccomplishmentReport", data).then((response) => {
      let accomplishment = response.accomplishments.map((val) => {
        let comment = "No Comment";
        if (val.battery.includes("|")) {
          let value = val.battery.split("|");
          comment = value[value.length - 1];
        }

        return createData(
          val.user_id,
          `${val.user_lname} ${val.user_fname}`.toUpperCase(),
          val.jo_id,
          val.customer_meter_no,
          val.findings.toUpperCase(),
          moment(val.date_accomplished).format("LLL"),
          val.battery,
          val.image_path,
          <img
            src={
              "http://api.pacificweb.com.ph/assets/img/meter/" + val.image_path
            }
            style={{ width: 100, height: 50 }}
          />,
          val.coordinates,
          val.customer_contact,
          val.customer_email,
          val.image_base64,
          val.present_reading,
          val.all_images,
          val.all_images.length,
          comment,
          val.name,
          val.account_number,
          val.previous_reading,
          val.all_images_base64
        );
      });
      let company = {
        accomplishment: accomplishment,
        logo: response.company,
      };

      resolve(company);
    });
  });
}
function createData(
  id,
  fieldman,
  meternumber,
  customermeternumber,
  fieldfindings,
  timeaccomplishments,
  batterydetails,
  avatar,
  image,
  coordinates,
  contact,
  email,
  img,
  present_reading,
  all_images,
  image_length,
  comment,
  customername,
  account_number,
  previous_reading,
  all_images_base64
) {
  return {
    id,
    fieldman,
    meternumber,
    customermeternumber,
    fieldfindings,
    timeaccomplishments,
    batterydetails,
    avatar,
    image,
    coordinates,
    contact,
    email,
    img,
    present_reading,
    all_images,
    image_length,
    comment,
    customername,
    account_number,
    previous_reading,
    all_images_base64,
  };
}

var getDataUri = function (targetUrl, callback) {
  var xhr = new XMLHttpRequest();
  xhr.onload = function () {
    var reader = new FileReader();
    reader.onloadend = function () {
      callback(reader.result);
    };
    reader.readAsDataURL(xhr.response);
  };
  var proxyUrl = "https://cors-anywhere.herokuapp.com/";
  xhr.open("GET", proxyUrl + targetUrl);
  xhr.responseType = "blob";
  xhr.send();
};

export function PDFdata(data) {
  return new Promise((resolve, reject) => {
    async function handleimage() {
      const unit = "pt";
      const size = "A4"; // Use A1, A2, A3 or A4
      const orientation = "landscape"; // portrait or landscape
      const doc = new jsPDF(orientation, unit, size);
      var count = 10;
      let pdfinfo = data.map((val, index) => {
        setTimeout(() => {
          let baseURL =
            "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAmMAAAI6CAIAAADkK9gVAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAAFiUAABYlAUlSJPAAAAfkSURBVHhe7dUBAQAwDMOg+zfdK1gUgAneAICbKQGgmBIAiikBoJgSAIopAaCYEgCKKQGgmBIAiikBoJgSAIopAaCYEgCKKQGgmBIAiikBoJgSAIopAaCYEgCKKQGgmBIAiikBoJgSAIopAaCYEgCKKQGgmBIAiikBoJgSAIopAaCYEgCKKQGgmBIAiikBoJgSAIopAaCYEgCKKQGgmBIAiikBoJgSAIopAaCYEgCKKQGgmBIAiikBoJgSAIopAaCYEgCKKQGgmBIAiikBoJgSAIopAaCYEgCKKQGgmBIAiikBoJgSAIopAaCYEgCKKQGgmBIAiikBoJgSAIopAaCYEgCKKQGgmBIAiikBoJgSAIopAaCYEgCKKQGgmBIAiikBoJgSAIopAaCYEgCKKQGgmBIAiikBoJgSAIopAaCYEgCKKQGgmBIAiikBoJgSAIopAaCYEgCKKQGgmBIAiikBoJgSAIopAaCYEgCKKQGgmBIAiikBoJgSAIopAaCYEgCKKQGgmBIAiikBoJgSAIopAaCYEgCKKQGgmBIAiikBoJgSAIopAaCYEgCKKQGgmBIAiikBoJgSAIopAaCYEgCKKQGgmBIAiikBoJgSAIopAaCYEgCKKQGgmBIAiikBoJgSAIopAaCYEgCKKQGgmBIAiikBoJgSAIopAaCYEgCKKQGgmBIAiikBoJgSAIopAaCYEgCKKQGgmBIAiikBoJgSAIopAaCYEgCKKQGgmBIAiikBoJgSAIopAaCYEgCKKQGgmBIAiikBoJgSAIopAaCYEgCKKQGgmBIAiikBoJgSAIopAaCYEgCKKQGgmBIAiikBoJgSAIopAaCYEgCKKQGgmBIAiikBoJgSAIopAaCYEgCKKQGgmBIAiikBoJgSAIopAaCYEgCKKQGgmBIAiikBoJgSAIopAaCYEgCKKQGgmBIAiikBoJgSAIopAaCYEgCKKQGgmBIAiikBoJgSAIopAaCYEgCKKQGgmBIAiikBoJgSAIopAaCYEgCKKQGgmBIAiikBoJgSAIopAaCYEgCKKQGgmBIAiikBoJgSAIopAaCYEgCKKQGgmBIAiikBoJgSAIopAaCYEgCKKQGgmBIAiikBoJgSAIopAaCYEgCKKQGgmBIAiikBoJgSAIopAaCYEgCKKQGgmBIAiikBoJgSAIopAaCYEgCKKQGgmBIAiikBoJgSAIopAaCYEgCKKQGgmBIAiikBoJgSAIopAaCYEgCKKQGgmBIAiikBoJgSAIopAaCYEgCKKQGgmBIAiikBoJgSAIopAaCYEgCKKQGgmBIAiikBoJgSAIopAaCYEgCKKQGgmBIAiikBoJgSAIopAaCYEgCKKQGgmBIAiikBoJgSAIopAaCYEgCKKQGgmBIAiikBoJgSAIopAaCYEgCKKQGgmBIAiikBoJgSAIopAaCYEgCKKQGgmBIAiikBoJgSAIopAaCYEgCKKQGgmBIAiikBoJgSAIopAaCYEgCKKQGgmBIAiikBoJgSAIopAaCYEgCKKQGgmBIAiikBoJgSAIopAaCYEgCKKQGgmBIAiikBoJgSAIopAaCYEgCKKQGgmBIAiikBoJgSAIopAaCYEgCKKQGgmBIAiikBoJgSAIopAaCYEgCKKQGgmBIAiikBoJgSAIopAaCYEgCKKQGgmBIAiikBoJgSAIopAaCYEgCKKQGgmBIAiikBoJgSAIopAaCYEgCKKQGgmBIAiikBoJgSAIopAaCYEgCKKQGgmBIAiikBoJgSAIopAaCYEgCKKQGgmBIAiikBoJgSAIopAaCYEgCKKQGgmBIAiikBoJgSAIopAaCYEgCKKQGgmBIAiikBoJgSAIopAaCYEgCKKQGgmBIAiikBoJgSAIopAaCYEgCKKQGgmBIAiikBoJgSAIopAaCYEgCKKQGgmBIAiikBoJgSAIopAaCYEgCKKQGgmBIAiikBoJgSAIopAaCYEgCKKQGgmBIAiikBoJgSAIopAaCYEgCKKQGgmBIAiikBoJgSAIopAaCYEgCKKQGgmBIAiikBoJgSAIopAaCYEgCKKQGgmBIAiikBoJgSAIopAaCYEgCKKQGgmBIAiikBoJgSAIopAaCYEgCKKQGgmBIAiikBoJgSAIopAaCYEgCKKQGgmBIAiikBoJgSAIopAaCYEgCKKQGgmBIAiikBoJgSAIopAaCYEgCKKQGgmBIAiikBoJgSAIopAaCYEgCKKQGgmBIAiikBoJgSAIopAaCYEgCKKQGgmBIAiikBoJgSAIopAaCYEgCKKQGgmBIAiikBoJgSAIopAaCYEgCKKQGgmBIAiikBoJgSAIopAaCYEgCKKQGgmBIAiikBoJgSAIopAaCYEgCKKQGgmBIAiikBoJgSAIopAaCYEgCKKQGgmBIAiikBoJgSAIopAaCYEgCKKQGgmBIAiikBoJgSAIopAaCYEgCKKQGgmBIAiikBoJgSAIopAaCYEgCKKQGgmBIAiikBoJgSAIopAaCYEgCKKQGgmBIAiikBoJgSAIopAaCYEgCKKQGgmBIAiikBoJgSAIopAaCYEgCKKQGgmBIAiikBoJgSAIopAaCYEgCKKQGgmBIAiikBoJgSAIopAaCYEgCKKQGgmBIAiikBoJgSAIopAaCYEgCKKQGgmBIAiikBoJgSAIopAaCYEgCKKQGgmBIAiikBoJgSAIopAeC2fTe2RvUfVNETAAAAAElFTkSuQmCC";
          if (val.img != "" && val.img != null) {
            getDataUri(
              "http://api.pacificweb.com.ph/assets/img/meter/" + val.img,
              function (base64) {
                // base64 availlable here
                baseURL = base64;
              }
            );
          }
          // if (baseURL != '' )
          return [
            val.fieldman,
            val.meternumber,
            val.fieldfindings,
            moment(val.timeaccomplishments).format("lll"),
            doc.addImage(baseURL, "JPEG", 10, 10, 80, 60),
          ];
        }, count * 50);
        count++;
      });
      setTimeout(() => {
        resolve(pdfinfo);
      }, data.length * 50);
    }
    setTimeout(() => {
      handleimage();
    }, 500);
  });
}
// export function getLoginDar(data) {
//     return new Promise((resolve, reject) => {
//         getData('users/getLoginUserDar', data).then(response => {
//             let data_array = []
//             let darDetails = response.data.map((val)=>
//                 createData(val.accomplishment_id,
//                     val.accomplishment_description,
//                     val.accomplishment_type,
//                     val.status,
//                     moment(val.accomplishment_date_start).format('LT'),
//                     moment(val.accomplishment_date_end).format('LT'),
//                     moment(val.accomplishment_date_added).format('LL')
//                 )
//             )
//             resolve(darDetails)
//         })
//     });
// }
// function createData(id, accomplishment, type, status,timeState,timeEnd,dateFiled) {
//     return { id, accomplishment, type, status,timeState,timeEnd,dateFiled };
// }

export function fetchAccomplishments(data) {
  return new Promise((resolve, reject) => {
    getData("Tracking/generateAccomplishmentReport", data).then((response) => {
      resolve(response);
    });
  });
}

export function getReportAccomCounts(data) {
  return new Promise((resolve, reject) => {
    getData("test/getReportAccomCount", data).then((response) => {
      resolve(response);
    });
  });
}

export function MeterTracking(data) {
  return new Promise((resolve, reject) => {
    getData("aam/meter_tracking_masterlist", data).then((response) => {
      resolve(response);
    });
  });
}

export function MeterTrackingHistory(data) {
  return new Promise((resolve, reject) => {
    getData("aam/meter_tracking_history", data).then((response) => {
      resolve(response);
    });
  });
}

export function GetEvalMonth(data) {
  return new Promise((resolve, reject) => {
    getData("tracking/getEvaluationMonth", data).then((response) => {
      resolve(response);
    });
  });
}

export function LogEvaluation(data) {
  return new Promise((resolve, reject) => {
    getData("tracking/LogEvaluationGrade", data).then((response) => {
      resolve(response);
    });
  });
}

export function GetSingleEvalMonth(data) {
  return new Promise((resolve, reject) => {
    getData("tracking/getSingleEvaluationMonth", data).then((response) => {
      resolve(response);
    });
  });
}
export function getJOAuditFilterDashBoard3(data) {
  return new Promise((resolve, reject) => {
    getData("aam/getJOAuditFilterDashBoard3", data).then((response) => {
      resolve(response);
    });
  });
}
export function generateAccompBill(data) {
  return new Promise((resolve, reject) => {
    getData("tracking/generateAccomplishmentBilling", data).then((response) => {
      resolve(response);
    });
  });
}