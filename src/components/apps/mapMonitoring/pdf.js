import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import moment from "moment";
import axios from "axios";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  PDFViewer,
  Image,
} from "@react-pdf/renderer";

function Index({ singleDetails, images_base_64, logo, branch_name }) {
  const dispatch = useDispatch();
  const home_reducer = useSelector((state) => state.home_reducer);
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
    image: ["2", "3"],
    memo_details: [],
    images: [],
  });

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
      paddingLeft: 10,
      paddingRight: 10,
    },
    page2: {
      // flexDirection: 'column',
      backgroundColor: "#fff",
      paddingBottom: 70,
    },
    section: {
      margin: 10,
      padding: 10,
      flexGrow: 1,
    },
  });

  return (
    <PDFViewer style={{ width: "100%", height: 550 }}>
      <Document>
        <Page size="A4" style={styles.page} wrap>
          <View fixed>
            <View
              style={{
                display: "row",
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 10,
                paddingHorizontal: 30,
              }}
            >
              {/* <View>
                <Text style={{ fontSize: 15 }}> Accomplishment Report</Text>
                <Text style={{ fontSize: 10.5, marginTop: 6 }}>
                  Company - {branch_name}
                </Text>
                <Text style={{ fontSize: 10.5, marginTop: 6 }}>
                  Date : {moment(singleDetails.date_accom).format('LL')}
                </Text>
              </View> */}
              <View>
                {logo.map((val, index) => {
                  return (
                    <View style={{ alignItems: "center" }}>
                      {val.company_logo !== "" ? (
                        <Image
                          style={{ width: 120, height: 75 }}
                          key={index}
                          src={val.logo_base64}
                        />
                      ) : undefined}

                      {/* <Text style={{ fontSize: 10 }}>
                        Powered by GZONETECH. Inc.
                      </Text> */}
                    </View>
                  );
                })}
              </View>
            </View>
          </View>

          {/* <Text style={{ fontSize: 15,marginTop:10,padding:10 }}>Accomplishment Report</Text> */}
          <View style={{ width: "100%", marginTop: 15, paddingHorizontal: 30 }}>
            {singleDetails.map((val, index) => {
             return <View>
              <View
                style={{
                  justifyContent: "space-between",
                  flexDirection: "row",
                }}
              >
                <View>
                  <Text style={{ fontSize: 13 }}>Field Order Details</Text>
                  <Text style={{ fontSize: 10, marginTop: 1 }}>
                    Field Order Number :{val.tracking_number}
                  </Text>
                  <Text style={{ fontSize: 10, marginTop: 1 }}>
                    Field Order Type : {'Check Reading'}
                  </Text>
                  <Text style={{ fontSize: 10, marginTop: 1 }}>Priority</Text>
                  <Text style={{ fontSize: 10, marginTop: 1 }}>
                    Instructions:
                  </Text>
                </View>
                <View>
                  <View
                    style={{
                      borderStyle: "solid",
                      borderWidth: 1,
                      height: 40,
                      width: 230,
                      paddingHorizontal: 5,
                    }}
                  >
                    <Text style={{ fontSize: 10, marginTop: 1 }}>
                      Last Date Execution : {moment(val.date_accom).format('YYYY-MM-DD hh:mm')}
                    </Text>
                    <Text style={{ fontSize: 10, marginTop: 1 }}>
                      Scheduled Date of Execution
                    </Text>
                    <Text style={{ fontSize: 10, marginTop: 1 }}>
                      Date of Issuance
                    </Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  width: "100%",
                  borderStyle: "dashed",
                  marginTop: 20,
                  borderWidth: 1,
                  borderBottom: "none",
                  borderLeft: "none",
                  borderRight: "none",
                }}
              />
              <View>
                <Text style={{ fontSize: 9, marginTop: 1 }}>Address</Text>
                <Text style={{ fontSize: 9, marginTop: 1 }}>Premise Type</Text>
              </View>
              <View
                style={{
                  width: "100%",
                  borderStyle: "solid",
                  borderWidth: 1,
                  borderBottom: "none",
                  borderLeft: "none",
                  borderRight: "none",
                }}
              />
              <View style={{ display: "flex", flexDirection: "row" }}>
                <View style={{ width: "40%" }}>
                  <Text style={{ fontSize: 9, marginTop: 1 }}>
                    Service Details
                  </Text>
                </View>
                <View style={{ width: "60%" }}>
                  <Text style={{ fontSize: 9, marginTop: 1 }}>
                    Customer Information
                  </Text>
                </View>
              </View>
              <View
                style={{
                  width: "100%",
                  borderStyle: "solid",
                  borderWidth: 1,
                  borderBottom: "none",
                  borderLeft: "none",
                  borderRight: "none",
                }}
              />
              <View style={{ display: "flex", flexDirection: "row" }}>
                <View style={{ width: "40%" }}>
                  <Text style={{ fontSize: 9, marginTop: 1 }}>
                    Service Number:
                  </Text>
                  <Text style={{ fontSize: 9, marginTop: 1 }}>Contracted:</Text>
                  <Text style={{ fontSize: 9, marginTop: 1 }}>
                    Applied Load:
                  </Text>
                  <Text style={{ fontSize: 9, marginTop: 1 }}>Phase:</Text>
                  <Text style={{ fontSize: 9, marginTop: 5 }}>Voltage:</Text>
                </View>
                <View style={{ width: "60%" }}>
                  <Text style={{ fontSize: 9, marginTop: 1 }}>
                    Customer Name:
                  </Text>
                  <Text style={{ fontSize: 9, marginTop: 1 }}>Contact</Text>
                  <Text style={{ fontSize: 9, marginTop: 3 }}>
                    Standard Connection Facilities Information
                  </Text>
                  <View
                    style={{
                      width: "100%",
                      borderStyle: "solid",
                      borderWidth: 0.6,
                      borderBottom: "none",
                      borderLeft: "none",
                      borderRight: "none",
                    }}
                  />
                  <View style={{ display: "flex", flexDirection: "row" }}>
                    <View style={{ width: "60%" }}>
                      <Text style={{ fontSize: 9, marginTop: 1 }}>
                        Service Wire Type:
                      </Text>
                      <Text style={{ fontSize: 9, marginTop: 1 }}>
                        Service Wire Length:
                      </Text>
                    </View>
                    <View style={{ width: "40%" }}>
                      <Text style={{ fontSize: 9, marginTop: 1 }}>
                        Pole Code:
                      </Text>
                      <Text style={{ fontSize: 9, marginTop: 1 }}>TLN:</Text>
                    </View>
                  </View>
                </View>
              </View>
              <View>
                <Text style={{ fontSize: 9, marginTop: 1 }}>
                  Meter Information:
                </Text>
              </View>
              <View
                style={{
                  width: "100%",
                  borderStyle: "solid",
                  borderWidth: 1,
                  borderBottom: "none",
                  borderLeft: "none",
                  borderRight: "none",
                }}
              />
              <View style={{ display: "row", flexDirection: "row" }}>
                <View style={{ width: "40%", flexDirection: "row" }}>
                  <View style={{ width: "55%" }}>
                    <Text style={{ fontSize: 9, marginTop: 1 }}>Meter:</Text>
                  </View>
                  <View style={{ width: "45%" }}>
                    <Text style={{ fontSize: 9, marginTop: 1 }}>Type:</Text>
                  </View>
                </View>
                <View style={{ width: "60%" }}>
                  <View style={{ display: "flex", flexDirection: "row" }}>
                    <View style={{ width: "60%" }}>
                      <Text style={{ fontSize: 9, marginTop: 1 }}>
                        Usage Type:
                      </Text>
                    </View>
                    <View style={{ width: "40%" }}>
                      <Text style={{ fontSize: 9, marginTop: 1 }}>
                        Multiplier:
                      </Text>
                    </View>
                  </View>
                </View>
              </View>
              <View>
                <Text style={{ fontSize: 9, marginTop: 1 }}>Address:</Text>
              </View>
              <View style={{ display: "flex", flexDirection: "row" }}>
                <View style={{ width: "40%" }}>
                  <Text style={{ fontSize: 9, marginTop: 1 }}>
                    Meter Scheme:
                  </Text>
                </View>
                <View style={{ width: "60%" }}>
                  <Text style={{ fontSize: 9, marginTop: 1 }}>
                    Metering Point:
                  </Text>
                </View>
              </View>
            </View>
            })}
            

            <View
              style={{
                width: "100%",
                borderStyle: "solid",
                borderWidth: 1,
                borderBottom: "none",
                borderLeft: "none",
                borderRight: "none",
              }}
            />
            <View>
              <Text style={{ fontSize: 9, marginTop: 1 }}>
                Actions / Field Findings / Results
              </Text>
            </View>
            <View>
              {singleDetails.map((val, index) => {
                let location = "No Address";

                return (
                  <View style={{ marginTop: 5, width: 300 }}>
                    <View style={{}}>
                      <View style={{ display: "flex", flexDirection: "row" }}>
                        <View style={{ width: "40%" }}>
                          <Text style={{ fontSize: 9.5 }}> FIELDMAN </Text>
                        </View>
                        <View style={{ width: "2%" }}>
                          <Text style={{ fontSize: 9.5 }}> :</Text>
                        </View>
                        <View style={{ width: "40%" }}>
                          <Text style={{ fontSize: 9.5 }}>
                            {val.accom_fieldman_name} )
                          </Text>
                        </View>
                      </View>

                      <View style={{ display: "flex", flexDirection: "row" }}>
                        <View style={{ width: "40%" }}>
                          <Text style={{ fontSize: 9.5 }}>
                            {" "}
                            BRANCH{" "}
                          </Text>
                        </View>
                        <View style={{ width: "2%" }}>
                          <Text style={{ fontSize: 9.5 }}> :</Text>
                        </View>
                        <View style={{ width: "40%" }}>
                          <Text style={{ fontSize: 9.5 }}>
                            {branch_name}
                          </Text>
                        </View>
                      </View>

                      <View style={{ display: "flex", flexDirection: "row" }}>
                        <View style={{ width: "40%" }}>
                          <Text style={{ fontSize: 9.5 }}> READING </Text>
                        </View>
                        <View style={{ width: "2%" }}>
                          <Text style={{ fontSize: 9.5 }}> :</Text>
                        </View>
                        <View style={{ width: "40%" }}>
                          <Text style={{ fontSize: 9.5 }}>
                            {val.present_reading}
                          </Text>
                        </View>
                      </View>

                      <View style={{ display: "flex", flexDirection: "row" }}>
                        <View style={{ width: "40%" }}>
                          <Text style={{ fontSize: 9.5 }}> METER CONDITION </Text>
                        </View>
                        <View style={{ width: "2%" }}>
                          <Text style={{ fontSize: 9.5 }}> :</Text>
                        </View>
                        <View style={{ width: "60%" }}>
                          <Text style={{ fontSize: 9.5 }}>
                            {val.meter_condition}
                          </Text>
                        </View>
                      </View>

                      <View style={{ display: "flex", flexDirection: "row" }}>
                        <View style={{ width: "40%" }}>
                          <Text style={{ fontSize: 9.5 }}> SEAL CONDITION </Text>
                        </View>
                        <View style={{ width: "2%" }}>
                          <Text style={{ fontSize: 9.5 }}> :</Text>
                        </View>
                        <View style={{ width: "40%" }}>
                          <Text style={{ fontSize: 9.5 }}>
                            {val.seal_condition}
                          </Text>
                        </View>
                      </View>

                      <View style={{ display: "flex", flexDirection: "row" }}>
                        <View style={{ width: "40%" }}>
                          <Text style={{ fontSize: 9.5 }}> SEAL NUMBER </Text>
                        </View>
                        <View style={{ width: "2%" }}>
                          <Text style={{ fontSize: 9.5 }}> :</Text>
                        </View>
                        <View style={{ width: "40%" }}>
                          <Text style={{ fontSize: 9.5 }}>
                            {val.seal_number}
                          </Text>
                        </View>
                      </View>
                      <View style={{ display: "flex", flexDirection: "row" }}>
                        <View style={{ width: "40%" }}>
                          <Text style={{ fontSize: 9.5 }}> SEAL COLOR</Text>
                        </View>
                        <View style={{ width: "2%" }}>
                          <Text style={{ fontSize: 9.5 }}> :</Text>
                        </View>
                        <View style={{ width: "40%" }}>
                          <Text style={{ fontSize: 9.5 }}>
                            {val.seal_color}
                          </Text>
                        </View>
                      </View>
                      <View style={{ display: "flex", flexDirection: "row" }}>
                        <View style={{ width: "40%" }}>
                          <Text style={{ fontSize: 9.5 }}>PREMISES CONDITION</Text>
                        </View>
                        <View style={{ width: "2%" }}>
                          <Text style={{ fontSize: 9.5 }}> :</Text>
                        </View>
                        <View style={{ width: "40%" }}>
                          <Text style={{ fontSize: 9.5 }}>
                            {val.premises_condition}
                          </Text>
                        </View>
                      </View>
                    </View>
                    {/* <Text style={{ fontSize: 12.5}}>
                    Name : {"name"} ( {val.meter_number} ){" "}
                  </Text>
                  <Text style={{ fontSize: 12.5}}>Field Findings : {val.accom_findings}</Text>
                  <Text style={{ fontSize: 12.5}}>Remarks : {val.accom_remarks}</Text>
                  <Text style={{ fontSize: 12.5}}>Reading : {val.present_reading}</Text>
                  <Text style={{ fontSize: 12.5}}>Address : {location}</Text>
                  <Text style={{ fontSize: 12.5}}>Battery : {val.accom_battery_life}</Text>
                  <Text style={{ fontSize: 12.5}}>Date : {val.date_accom}</Text>
                  <Text style={{ fontSize: 12.5}}>Latlng : {val.fetched_coordinates}</Text> */}
                  </View>
                );
              })}
            </View>
            <View
              style={{
                width: "100%",
                borderStyle: "solid",
                borderWidth: 1,
                borderBottom: "none",
                borderLeft: "none",
                borderRight: "none",
                marginTop: 10,
              }}
            />
            <View
              style={{
                position: "relative",
                alignItems: "center",
                display: "flex",
                flexDirection: "row",
                justifyContent: "space-around",
                marginTop: 30,
              }}
            >
              {images_base_64.map((val_images, index) => {
                if (index === 0)
                  return (
                    <Image
                      style={{ width: 250, height: 250 }}
                      src={
                        val_images.image == ""
                          ? require("../../../assets/map image/no_image.png")
                          : val_images.image
                      }
                    ></Image>
                  );
              })}
              {singleDetails.map((val, index) => {
                return (
                  <Image
                    style={{ width: 250, height: 250 }}
                    // key={index}
                    src={
                      "https://maps.googleapis.com/maps/api/staticmap?zoom=17&size=600x300&maptype=hybrid&markers=color:red%7Clabel:%7C" +
                      val.fetched_coordinates +
                      "&key=AIzaSyB04YACNd6OwYwtU8eR4t-eeqXDe7jdX_A&v=3.exp&libraries=geometry,drawing,places"
                    }
                  />
                );
              })}
              {/* <Image
               style={{ width: 200, height: 200 }}
               // key={index}
               src={'https://maps.googleapis.com/maps/api/staticmap?zoom=13&size=600x300&maptype=roadmap&markers=color:red%7Clabel:%7C'+val.fetched_coordinates+'&key=AIzaSyB04YACNd6OwYwtU8eR4t-eeqXDe7jdX_A&v=3.exp&libraries=geometry,drawing,places'}
               /> */}
            </View>
          </View>
        </Page>
      </Document>
    </PDFViewer>
  );
}

export default Index;
