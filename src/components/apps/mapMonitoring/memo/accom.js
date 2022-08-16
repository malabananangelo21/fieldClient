import React, { useEffect } from "react";
// import useStyles from '../../../../../css/css';
import { useSelector, useDispatch } from "react-redux";
// import Anna from '../../../../assets/Anna2.png'
import Efren from "../../../../assets/map image/new_efren.png";
import Tracey from "../../../../assets/map image/new_tracey.png";
import Jeannelyn from "../../../../assets/map image/new_jeannelyn.png";
import Louie from "../../../../assets/map image/Loui.png";
import Izy from "../../../../assets/map image/izy2.png";

// import FieldTechImage from '../../../../assets/map image/fieldtech.png'
import NGCImage from "../../../../assets/map image/enterprise_new.png";
import NGCImageFooter from "../../../../assets/map image/enterprise_new_contact.png";

import moment from "moment";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
  Image,
  pdf,
  PDFDownloadLink,
  Font,
} from "@react-pdf/renderer";
// import { getData } from '../../../api/api';
// import NoImage from '../../../../../components/assets/no_image.png'
export const onRenderDocument = ({ blob, filename }) => {
  var blobUrl = URL.createObjectURL(blob);
  saveDocument(blobUrl, filename);
};

export const saveDocument = (function () {
  var a = document.createElement("a");
  document.body.appendChild(a);
  a.style = "display: none";
  return function (blob, fileName) {
    a.href = blob;
    a.download = fileName;
    a.click();
    window.URL.revokeObjectURL(blob);
  };
})();
function Index({ memo_data, memo_details, logo, company_id }) {
  const dispatch = useDispatch();
  const home_reducer = useSelector((state) => state.home_reducer);
  // const classes = useStyles();
  const dispatch_data = (type, data) => {
    dispatch({
      type: type,
      data: data,
    });
  };
  const ref = React.createRef();
  const options = {
    orientation: "portait",
    unit: "px",
    format: [804.38, 585],
    // unit: 'mm',
    // width: 800
    // format: [216,279]
  };
  const [state, setState] = React.useState({
    memo_data: [],
    memo_details: [],
    control_no: "",
    fieldmanName: "",
    date_created_val: "",
    branch_name: "",
  });
  const [control_no, setcontrol_no] = React.useState("");
  const customColumnStyle = {
    width: 122,
    borderBottom: "none",
    fontSize: 12,
    fontWeight: "bold",
    borderStyle: "solid",
    borderColor: "#fff",
    borderWidth: 2,
  };
  const customColumnStyle2 = {
    width: 12,
    borderBottom: "none",
    fontSize: 12,
    fontWeight: "bold",
    borderStyle: "solid",
    borderColor: "#fff",
    borderWidth: 2,
  };
  const styles = StyleSheet.create({
    page: {
      // flexDirection: 'column',
      backgroundColor: "#fff",
      paddingBottom: 50,
      position: "relative",
    },
    page2: {
      // flexDirection: 'column',
      backgroundColor: "#fff",
      paddingBottom: 70,
      position: "relative",
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },
  });
  // useEffect(() => {
  //     let control_no = ''
  //     let fieldmanName = ''
  //     let date_created_val = ''
  //     let branch_name = ''

  //     memo_data.map((val) => {
  //         console.log(val)
  //         let date_created = (String(val.date_created)).split('-')
  //         let c_no = date_created[0] + '-' + date_created[1] + '-' + val.memo_received_list_id
  //         memo_data = val
  //         memo_data['control_no'] = c_no
  //         date_created_val = moment(val.date_created).format('YYYY-MM-DD')
  //        let fman_data = JSON.parse(val.memo_details)
  //         control_no = c_no
  //         fman_data.map(val_fman=>{
  //             fieldmanName = val.FieldmanName
  //             branch_name = val.branch_name
  //         })
  //     })
  // }, [])
  let efren_image = require("../../../../assets/map image/efren.png");
  return (
    <PDFViewer style={{ width: "100%", height: 550 }}>
      <Document file="somefile.pdf">
        <Page size="A4" style={styles.page} wrap>
          <View fixed>
            <View
              style={{
                paddingHorizontal: 10,
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              {logo.map((val, index) => {
                if (val.company_logo !== "")
                  return (
                    <Image
                      style={{ width: 120, height: 100 }}
                      src={val.logo_base64}
                    ></Image>
                  );
              })}
            {company_id === 6? <Image
                style={{
                  width: 120,
                  height: 65,
                  marginTop: 30,
                  marginRight: 20,
                }}
                src={NGCImageFooter}
              ></Image>:undefined

            }
             
            </View>
          </View>
          <View style={{ padding: 10, position: "relative" }}>
            {/* <View style={{ display: 'flex', justifyContent: 'flex-start' }}>
                            <Image style={{ width: 120, height: 100 }} src={FieldTechImage}></Image>
                        </View> */}
            {/* <br/> */}
            {memo_data.map((val, index) => {
              return (
                <View
                  style={{ marginTop: 5, paddingRight: 40, paddingLeft: 40 }}
                >
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View style={{ width: "15%" }}>
                      <Text
                        style={{
                          fontWeight: "bold",
                          fontSize: 10,
                          textAlign: "left",
                        }}
                      >
                        Control No
                      </Text>
                    </View>
                    <View style={{ width: "10%" }}>
                      <Text style={{ fontWeight: "bold", fontSize: 10 }}>
                        :
                      </Text>
                    </View>
                    <View style={{ width: "80%" }}>
                      <Text
                        style={{
                          fontWeight: "bold",
                          fontSize: 10,
                          textAlign: "left",
                        }}
                      >
                        {val.control_no}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View style={{ width: "15%" }}>
                      <Text
                        style={{
                          fontWeight: "bold",
                          fontSize: 10,
                          textAlign: "left",
                        }}
                      >
                        Date To
                      </Text>
                    </View>
                    <View style={{ width: "10%" }}>
                      <Text style={{ fontWeight: "bold", fontSize: 10 }}>
                        :
                      </Text>
                    </View>
                    <View style={{ width: "80%" }}>
                      <Text
                        style={{
                          fontWeight: "bold",
                          fontSize: 10,
                          textAlign: "left",
                        }}
                      >
                        {val.date_created_val}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View style={{ width: "15%" }}>
                      <Text
                        style={{
                          fontWeight: "bold",
                          fontSize: 10,
                          textAlign: "left",
                        }}
                      >
                        To
                      </Text>
                    </View>
                    <View style={{ width: "10%" }}>
                      <Text style={{ fontWeight: "bold", fontSize: 10 }}>
                        :
                      </Text>
                    </View>
                    <View style={{ width: "80%" }}>
                      <Text
                        style={{
                          fontWeight: "bold",
                          fontSize: 10,
                          textAlign: "left",
                        }}
                      >
                        {val.fieldmanName + " (" + val.branch_name + ")"}
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View style={{ width: "15%" }}>
                      <Text
                        style={{
                          fontWeight: "bold",
                          fontSize: 10,
                          textAlign: "left",
                        }}
                      >
                        From
                      </Text>
                    </View>
                    <View style={{ width: "10%" }}>
                      <Text style={{ fontWeight: "bold", fontSize: 10 }}>
                        :
                      </Text>
                    </View>
                    <View style={{ width: "80%" }}>
                      <Text
                        style={{
                          fontWeight: "bold",
                          fontSize: 10,
                          textAlign: "left",
                        }}
                      >
                        HUMAN RESOURCE DEPARTMENT
                      </Text>
                    </View>
                  </View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <View style={{ width: "15%" }}>
                      <Text
                        style={{
                          fontWeight: "bold",
                          fontSize: 10,
                          textAlign: "left",
                        }}
                      >
                        Subject
                      </Text>
                    </View>
                    <View style={{ width: "10%" }}>
                      <Text style={{ fontWeight: "bold", fontSize: 10 }}>
                        :
                      </Text>
                    </View>
                    <View style={{ width: "80%" }}>
                      <Text
                        style={{
                          fontWeight: "bold",
                          fontSize: 10,
                          textAlign: "left",
                        }}
                      >
                        NOTICE TO EXPLAIN
                      </Text>
                    </View>
                  </View>
                </View>
              );
            })}

            <View
              style={{
                borderWidth: 2,
                borderColor: "#000",
                borderTop: "solid",
                marginRight: 40,
                marginLeft: 40,
                marginTop: 10,
              }}
            ></View>
            {/* <hr style={{ borderWidth: 1, borderColor: '#000', marginRight: 40, marginLeft: 40 }} /> */}
            <View style={{ marginRight: 40, marginLeft: 40, marginTop: 10 }}>
              {memo_details.map((val, index) => {
                return (
                  <Text
                    key={index}
                    style={{ textAlign: "justify", fontSize: 10 }}
                  >
                    {val.memo_details_1}
                  </Text>
                );
              })}
            </View>
            <View style={{ marginRight: 40, marginLeft: 40, marginTop: 10 }}>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  width: "100%",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                {memo_data.map((val, index) => {
                  return (
                    <View key={index} style={{ width: "50%" }}>
                      <View
                        style={{
                          display: "flex",
                          alignItems: "center",
                          borderWidth: 1,
                          borderStyle: "solid",
                          borderColor: "#000",
                        }}
                      >
                        <View
                          style={{
                            paddingTop: 5,
                            width: "100%",
                            paddingBottom: 5,
                            alignItems: "flex-start",
                            borderBottomWidth: 1,
                            borderStyle: "solid",
                          }}
                        >
                          <Text style={{ fontSize: 10 }}>
                            {" "}
                            Date of Accomplishment: {val.date_accom}
                          </Text>
                        </View>
                        <View
                          style={{
                            paddingTop: 5,
                            width: "100%",
                            paddingBottom: 5,
                            alignItems: "flex-start",
                            borderBottomWidth: 1,
                            borderStyle: "solid",
                          }}
                        >
                          <Text style={{ fontSize: 10 }}>
                            {" "}
                            Total Delivered: {val.total_delivered}
                          </Text>
                        </View>
                        <View
                          style={{
                            paddingTop: 5,
                            width: "100%",
                            paddingBottom: 5,
                            alignItems: "flex-start",
                            borderBottomWidth: 1,
                            borderStyle: "solid",
                          }}
                        >
                          <Text style={{ fontSize: 10 }}>
                            {" "}
                            Total Pending: {val.total_pending}
                          </Text>
                        </View>
                        <View
                          style={{
                            paddingTop: 5,
                            width: "100%",
                            paddingBottom: 5,
                            alignItems: "flex-start",
                          }}
                        >
                          <Text style={{ fontSize: 10 }}>
                            {" "}
                            Total Bulk:{val.total_bulk}
                          </Text>
                        </View>
                      </View>
                    </View>
                  );
                })}
              </View>
              <View
                style={{
                  marginTop: 10,
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                {memo_details.map((val, index) => {
                  return (
                    <View
                      key={index}
                      style={{ display: "flex", justifyContent: "center" }}
                    >
                      <Text style={{ textAlign: "justify", fontSize: 10 }}>
                        {val.memo_details_2}
                      </Text>
                    </View>
                  );
                })}
              </View>

              <View
                style={{
                  flexDirection: "row",
                  width: "100%",
                  borderWidth: 1,
                  borderStyle: "solid",
                  borderColor: "#fff",
                  backgroundColor: "rgb(98,162,59)",
                  marginTop: 10,
                }}
              >
                <View
                  style={{
                    paddingTop: 10,
                    width: "30%",
                    paddingBottom: 10,
                    alignItems: "center",
                    borderLeftWidth: 1,
                    borderStyle: "solid",
                    borderColor: "#fff",
                    backgroundColor: "#6ab04c",
                  }}
                >
                  <Text style={{ fontSize: 10 }}>Offense</Text>
                </View>
                <View
                  style={{
                    paddingTop: 10,
                    width: "20%",
                    paddingBottom: 10,
                    alignItems: "center",
                    borderLeftWidth: 1,
                    borderStyle: "solid",
                    borderColor: "#fff",
                    backgroundColor: "#6ab04c",
                  }}
                >
                  <Text style={{ fontSize: 10 }}>Type of Infraction</Text>
                </View>
                <View
                  style={{
                    paddingTop: 10,
                    width: "14%",
                    paddingBottom: 10,
                    alignItems: "center",
                    borderLeftWidth: 1,
                    borderStyle: "solid",
                    borderColor: "#fff",
                    backgroundColor: "#6ab04c",
                  }}
                >
                  <Text style={{ fontSize: 10 }}>1st Offense</Text>
                </View>
                <View
                  style={{
                    paddingTop: 10,
                    width: "12%",
                    paddingBottom: 10,
                    alignItems: "center",
                    borderLeftWidth: 1,
                    borderStyle: "solid",
                    borderColor: "#fff",
                    backgroundColor: "#6ab04c",
                  }}
                >
                  <Text style={{ fontSize: 10 }}>2nd Offense</Text>
                </View>
                <View
                  style={{
                    paddingTop: 10,
                    width: "12%",
                    paddingBottom: 10,
                    alignItems: "center",
                    borderLeftWidth: 1,
                    borderStyle: "solid",
                    borderColor: "#fff",
                    backgroundColor: "#6ab04c",
                  }}
                >
                  <Text style={{ fontSize: 10 }}>3rd Offense</Text>
                </View>
                <View
                  style={{
                    paddingTop: 10,
                    width: "12%",
                    paddingBottom: 10,
                    alignItems: "center",
                    borderLeftWidth: 1,
                    borderStyle: "solid",
                    borderColor: "#fff",
                    backgroundColor: "#6ab04c",
                  }}
                >
                  <Text style={{ fontSize: 10 }}>4th Offense</Text>
                </View>
              </View>
              {memo_details.map((val, index) => {
                console.log(val);
                return (
                  <View
                    style={{
                      flexDirection: "row",
                      width: "100%",
                      borderWidth: 1,
                      borderStyle: "solid",
                      borderColor: "#fff",
                      borderLeftColor: "#fff",
                      backgroundColor: "rgb(98,162,59)",
                    }}
                  >
                    <View
                      style={{
                        paddingTop: 10,
                        width: "30%",
                        paddingBottom: 10,
                        alignItems: "center",
                        borderLeftWidth: 1,
                        borderStyle: "solid",
                        borderColor: "#fff",
                        backgroundColor: "#a9f08b",
                        paddingHorizontal: 5,
                      }}
                    >
                      <Text key={index} style={{ fontSize: 10 }}>
                        {val.offence}
                      </Text>
                    </View>
                    <View
                      style={{
                        paddingTop: 10,
                        width: "20%",
                        paddingBottom: 10,
                        alignItems: "center",
                        borderLeftWidth: 1,
                        borderStyle: "solid",
                        borderColor: "#fff",
                        backgroundColor: "#a9f08b",
                        paddingHorizontal: 5,
                      }}
                    >
                      <Text key={index} style={{ fontSize: 10 }}>
                        {val.type_of_Infraction}
                      </Text>
                    </View>
                    <View
                      style={{
                        paddingTop: 10,
                        width: "14%",
                        paddingBottom: 10,
                        alignItems: "center",
                        borderLeftWidth: 1,
                        borderStyle: "solid",
                        borderColor: "#fff",
                        backgroundColor: "#a9f08b",
                        paddingHorizontal: 5,
                      }}
                    >
                      <Text style={{ fontSize: 10 }}>{val.first_off}</Text>
                    </View>
                    <View
                      style={{
                        paddingTop: 10,
                        width: "12%",
                        paddingBottom: 10,
                        alignItems: "center",
                        borderLeftWidth: 1,
                        borderStyle: "solid",
                        borderColor: "#fff",
                        backgroundColor: "#a9f08b",
                        paddingHorizontal: 5,
                      }}
                    >
                      <Text style={{ fontSize: 10 }}> {val.second_off}</Text>
                    </View>
                    <View
                      style={{
                        paddingTop: 10,
                        width: "12%",
                        paddingBottom: 10,
                        alignItems: "center",
                        borderLeftWidth: 1,
                        borderStyle: "solid",
                        borderColor: "#fff",
                        backgroundColor: "#a9f08b",
                        paddingHorizontal: 5,
                      }}
                    >
                      <Text style={{ fontSize: 10 }}>{val.third_off}</Text>
                    </View>
                    <View
                      style={{
                        paddingTop: 10,
                        width: "12%",
                        paddingBottom: 10,
                        alignItems: "center",
                        borderLeftWidth: 1,
                        borderStyle: "solid",
                        borderColor: "#fff",
                        backgroundColor: "#a9f08b",
                        paddingHorizontal: 5,
                      }}
                    >
                      <Text style={{ fontSize: 10 }}>{val.fourth_off}</Text>
                    </View>
                  </View>
                );
              })}

              {memo_details.map((val, index) => {
                return (
                  <Text
                    key={index}
                    style={{
                      textAlign: "justify",
                      fontSize: 10,
                      marginTop: 10,
                    }}
                  >
                    {val.memo_details_3}
                  </Text>
                );
              })}
              <Text
                style={{ textAlign: "justify", fontSize: 10, marginTop: 10 }}
              >
                {"For your information, guidance and compliance."}
              </Text>

              {memo_data.map((val, index) => {
                let approver_1 = [];

                if (val.approver_1 !== null) {
                  let approver = String(val.approver_1).split("=");
                  let approver_array = [];
                  approver_array["type"] = approver[0];
                  approver_array["name"] = approver[1];
                  approver_array["position"] = approver[2];
                  approver_array["image"] = val.approver_1_signature;
                  approver_1.push(approver_array);
                }
                if (val.approver_2 !== null) {
                  let approver = String(val.approver_2).split("=");
                  let approver_array = [];
                  approver_array["type"] = approver[0];
                  approver_array["name"] = approver[1];
                  approver_array["position"] = approver[2];
                  approver_array["image"] = val.approver_2_signature;
                  approver_1.push(approver_array);
                }
                if (val.approver_3 !== null) {
                  let approver = String(val.approver_3).split("=");
                  let approver_array = [];
                  approver_array["type"] = approver[0];
                  approver_array["name"] = approver[1];
                  approver_array["position"] = approver[2];
                  approver_array["image"] = val.approver_3_signature;
                  approver_1.push(approver_array);
                }
                return (
                  <>
                    <View
                      key={index}
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-around",
                        marginTop: 20,
                      }}
                    >
                      {approver_1.map((val_app, index2) => {
                        return (
                          <View
                            style={{
                              alignItems: "center",
                              justifyContent: "center",
                            }}
                          >
                            <Text style={{ fontSize: 10 }}>{val_app.type}</Text>
                            {val_app.image != "" && val_app.image!=null ?
                             <Image
                             style={{ width: 65, height: 55, marginTop: 10 }}
                             src={val_app.image}
                           ></Image>
                            :undefined

                            }
                           
                            <View
                              style={{
                                marginTop: 10,
                                alignItems: "center",
                                justifyContent: "center",
                              }}
                            >
                              <Text
                                style={{ fontSize: 10, fontWeight: "bold" }}
                              >
                                {val_app.name}
                              </Text>
                              <Text style={{ fontSize: 10 }}>
                                {val_app.position}
                              </Text>
                            </View>
                          </View>
                        );
                      })}

                      {/* <View style={{position:'absolute',top:17,left:20}}>
                                                    <Image style={{ width: 70, height: 60 }} src={Tracey}></Image>
                                                </View>
                                                <View style={{position:'absolute',top:17,left:60}}>
                                                    <Image style={{ width: 70, height: 60 }} src={Efren}></Image>
                                                </View>
                                                <View style={{position:'absolute',top:17,left:80}}>
                                                    <Image style={{ width: 70, height: 60 }} src={Jeannelyn}></Image>
                                                </View> */}
                    </View>
                  </>
                );
              })}
              <View>
                <Text
                  style={{ textAlign: "justify", fontSize: 10, marginTop: 30 }}
                >
                  Received and Acknowledged by:
                </Text>
                <View
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexDirection: "row",
                  }}
                >
                  <View>
                    <Text style={{ textAlign: "justify", fontSize: 10 }}>
                      Employee Name with Signature:
                      _____________________________
                    </Text>
                  </View>
                  <View style={{ display: "flex", flexDirection: "column" }}>
                    <Text style={{ textAlign: "justify", fontSize: 10 }}>
                      Date: ___________________________
                    </Text>
                    <Text
                      style={{
                        textAlign: "justify",
                        fontSize: 10,
                        fontWeight: "bold",
                        fontStyle: "italic",
                      }}
                    >
                      Cc: HR / 201 File / Employee
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
          {company_id === 6?
           <View
           style={{
             zIndex: 999,
             position: "absolute",
             bottom: 1,
             width: "100%",
           }}
         >
          
           <View
             style={{ display: "flex", flexDirection: "row", width: "100%" }}
           >
             <View
               style={{ backgroundColor: "#206020", height: 15, width: "33%" }}
             ></View>
             <View
               style={{ backgroundColor: "#206020", height: 15, width: "34%" }}
             ></View>
             <View
               style={{ backgroundColor: "#206020", height: 15, width: "33%" }}
             ></View>
           </View>
         </View>:undefined  
              
          }
         
        </Page>
      </Document>
    </PDFViewer>
  );
}

export default Index;
