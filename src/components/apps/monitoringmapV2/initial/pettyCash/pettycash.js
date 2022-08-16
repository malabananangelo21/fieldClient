import React, { useEffect } from "react";
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
import FacebookIcon from '@material-ui/icons/Facebook';

function Index({ logo, pettyCash }) {
    return (
        <PDFViewer style={{ width: "100%", height: 550 }}>
            <Document file="somefile.pdf">
                <Page size="A4" orientation="landscape">
                   
                   <View style={{ display: 'flex', alignItems:pettyCash.length > 1?undefined:'center',justifyContent:pettyCash.length > 1?undefined:'center',height:pettyCash.length > 1?undefined:'100%' , flexWrap:pettyCash.length > 1?'wrap':undefined, flexDirection:pettyCash.length > 1?'row':undefined  }}>
                  

                        {pettyCash.map((val, index) => {
                            return <View key={index} style={{ width: '40%', padding: 5, borderWidth: 2, borderStyle: 'solid', borderColor: 'solid' }} break={index > 0 && index % 4 === 0 ? true : false}>
                                <View style={{ display: 'flex', alignItem: 'center', justifyContent: 'center', flexDirection: 'row', position: 'relative' }}>
                                    <View style={{ position: 'absolute', left: 2, top: -5 }}>
                                        {logo.map((val, index) => {
                                            if (val.company_logo !== "")
                                                return (
                                                    <Image
                                                        style={{ width: 40, height: 30 }}
                                                        src={val.logo_base64}
                                                    ></Image>
                                                );
                                        })}
                                    </View>
                                    <View >
                                        <Text style={{ fontSize: 10 }}>PETTY CASH REQUISITION FORM</Text>
                                    </View>
                                </View>

                                <View style={{ display: 'flex', alignItem: 'center', justifyContent: 'space-between', flexDirection: 'row', marginTop: 10 }}>
                                    <Text style={{ fontSize: 9 }}>Ctrl #: _______________</Text>
                                    <Text style={{ fontSize: 9 }}>Company : _____________________</Text>
                                </View>
                                <View style={{ marginTop: 20 }}>
                                    <View style={{ display: 'flex', flexDirection: 'row' }}>
                                        <View style={{ width: '20%' }}>
                                            <View style={{
                                                borderWidth: 1,
                                                borderStyle: "solid",
                                                borderColor: "#000", paddingHorizontal: 5
                                            }}>
                                                <Text style={{ fontSize: 9 }}>Date</Text>
                                            </View>
                                        </View>
                                        <View style={{ width: '55%' }}>
                                            <View style={{
                                                borderWidth: 1,
                                                borderStyle: "solid",
                                                borderColor: "#000"
                                                , paddingHorizontal: 5
                                            }}>
                                                <Text style={{ fontSize: 9 }}>Particular</Text>
                                            </View>
                                        </View>

                                        <View style={{ width: '25%' }}>
                                            <View style={{
                                                borderWidth: 1,
                                                borderStyle: "solid",
                                                borderColor: "#000"
                                                , paddingHorizontal: 5
                                            }}>
                                                <Text style={{ fontSize: 9 }}>Amount</Text>
                                            </View>
                                        </View>
                                    </View>
                                    {val?.jo_location_structure !== null && val.jo_location_structure.map((val3, index) => {
                                        let allowance = val.allownce
                                        if(index > 0){
                                            allowance = ''
                                        }
                                        return <View key={index} style={{   borderWidth: 1,
                                            borderStyle: "solid",
                                            borderColor: "#000",display: 'flex', flexDirection: 'row' }}>
                                            <View style={{ width: '20%' }}>
                                                <View style={{
                                                    paddingHorizontal: 5,
                                                   
                                                }}>
                                                    <Text style={{ fontSize: 9 }}>{val.date}</Text>
                                                </View>
                                            </View>
                                            <View style={{ width: '55%' }}>
                                                <View style={{
                                                    paddingHorizontal: 5,
                                                    borderRightWidth: 1,
                                                    borderLeftWidth: 1,

                                                    borderStyle: "solid",
                                                    borderLeftColor:'#000',
                                                    borderRightColor: "#000"
                                                }}>
                                                    <Text style={{ fontSize: 9 }}>
                                                        {val3.jo.map((val2, index) => {
                                                            if(parseInt(val2.count) !== 0)
                                                            return<Text>{val2.type} - {val2.count} - </Text>
                                                        })}
                                                       <Text>{val3.location.barangay+', '+val3.location.description}</Text>
                                                    </Text>
                                                </View>
                                            </View>

                                            <View style={{ width: '25%' }}>
                                                <View style={{
                                                     
                                                     paddingHorizontal: 5
                                                }}>
                                                    <Text style={{ fontSize: 9 }}>{allowance}</Text>
                                                </View>
                                            </View>
                                        </View>

                                    })

                                    }
                                    <View key={index} style={{   borderWidth: 1,
                                            borderStyle: "solid",
                                            borderColor: "#000",display: 'flex', flexDirection: 'row' }}>
                                            <View style={{ width: '20%' }}>
                                                <View style={{
                                                     paddingHorizontal: 5,
                                                     borderRightWidth: 1,
                                                     borderStyle: "solid",
                                                     borderRightColor: "#000"
                                                   
                                                }}>
                                                    <Text style={{ fontSize: 9,fontWeight:'bold' }}>TOTAL</Text>
                                                </View>
                                            </View>
                                            <View style={{ width: '55%' }}>
                                                <View style={{
                                                    paddingHorizontal: 5,
                                                    borderRightWidth: 1,
                                                    borderLeftWidth: 1,

                                                    borderStyle: "solid",
                                                    borderLeftColor:'#000',
                                                    borderRightColor: "#000"
                                                }}>
                                                    <Text style={{ fontSize: 9 }}>
                                                       
                                                      
                                                    </Text>
                                                </View>
                                            </View>

                                            <View style={{ width: '25%' }}>
                                                <View style={{
                                                       paddingHorizontal: 5,
                                                       borderLeftWidth: 1,
                                                       borderStyle: "solid",
                                                       borderLeftColor:'#000',
                                                }}>
                                                    <Text style={{ fontSize: 9,fontWeight:'bold' }}>{val.allownce === null?'':val.allownce}</Text>
                                                </View>
                                            </View>
                                        </View>

                                </View>
                                <View style={{ display: 'flex', flexDirection: 'row', marginTop: 10 }}>
                                    <View style={{ width: '33.33%', alignItems: 'center', justifyContent: 'column', background: 'red' }}>
                                        <Text style={{ fontSize: 9 }}>Requested by:</Text>
                                        <Text>__________</Text>
                                        <Text style={{ fontSize: 7 }}>Sign Over Printed name/Dept</Text>

                                    </View>
                                    <View style={{ width: '33.33%', alignItems: 'center', justifyContent: 'column' }}>
                                        <Text style={{ fontSize: 9 }}>Checked by:</Text>
                                        <Text>_______</Text>
                                        <Text style={{ fontSize: 7 }}>Dept Head</Text>

                                    </View>
                                    <View style={{ width: '33.33%', alignItems: 'center', justifyContent: 'column' }}>
                                        <Text style={{ fontSize: 9 }}>Approved by:</Text>
                                        <Text>________</Text>
                                        <Text style={{ fontSize: 7 }}>CEO</Text>

                                    </View>
                                </View>
                                <View style={{ display: 'flex', flexDirection: 'row', marginTop: 10 }}>
                                    <View style={{ width: '50%', alignItems: 'center', justifyContent: 'column', background: 'red' }}>
                                        <Text style={{ fontSize: 9 }}>Fieldman</Text>
                                        <Text style={{ fontSize: 9 }}>{val.fullname}</Text>
                                        <Text style={{ fontSize: 7 }}></Text>

                                    </View>
                                    <View style={{ width: '50%', alignItems: 'center', justifyContent: 'column' }}>
                                        <Text style={{ fontSize: 9 }}>Released by:</Text>
                                        <Text>__________</Text>
                                        <Text style={{ fontSize: 7 }}>Accounting Dept.(Sign/Date)</Text>
                                    </View>
                                </View>

                            </View>
                        })

                        }
                    </View>


                </Page>
            </Document>
        </PDFViewer>
    )

}
export default Index;