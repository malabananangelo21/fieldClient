import axios from "axios";
// import swal from "sweetalert/dist/sweetalert.min.js";
// let serverurl = "http://api.pacificweb.com.ph/";
// let serverurl = "http://localhost/api";
let serverurl = "https://api.workflow.gzonetechph.com/";
// let serverurl ="http://192.168.0.9/backend/api/";
// let serverurl ="http://192.168.5.21/backend/beta_api/";
// let serverurl = "http://beta.api.pacificweb.com.ph/";
// let serverurl ="http://192.168.1.44/api_pacific/";
// let serverurl ="http://192.168.2.36/beta_api3/";
let key = "?key=PocketHR@20190208&type=web";
let key2 = "?key=12345ABCFleet";
const CancelToken = axios.CancelToken;
let source = CancelToken.source();

export function getData(method, param, discon) {
  return new Promise((resolve, reject) => {
    axios
      .post(
        serverurl + method + key,
        {
          param,
        },
        {
          cancelToken: source.token,
        }
      )
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        reject(error);
      });
  });
}
export function cancelRequest() {
  source.cancel("Operation canceled by the user.");
  source = CancelToken.source();
}
export const serverImageMeter =
  "https://api.workflow.gzonetechph.com/assets/img/meter/";
export const serverProfile =
  "https://images.workflow.gzonetechph.com/pockethr/profilepic/";
