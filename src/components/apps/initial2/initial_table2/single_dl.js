import React, { useEffect } from 'react';
import useStyles from '../../../../../css/css';
import { useSelector, useDispatch } from 'react-redux'
import Anna from '../../../../assets/analiza.png'
import Efren from '../../../../assets/efren.png'
import FieldTechImage from '../../../../assets/fieldtech.png'
import moment from 'moment'
import { Document, Page, Text, View, StyleSheet, PDFViewer, Image } from '@react-pdf/renderer';
import { getData } from '../../../api/api';
import NoImage from '../../../../../components/assets/no_image.png'

function Index({ pdfDetails,date_created }) {
    const dispatch = useDispatch()
    const home_reducer = useSelector(state => state.home_reducer)
    const classes = useStyles();
    const dispatch_data = (type, data) => {
        dispatch({
            type: type,
            data: data
        })
    }
    const ref = React.createRef();
    const options = {
        orientation: 'portait',
        unit: 'px',
        format: [804.38, 585],
        // unit: 'mm',
        // width: 800
        // format: [216,279]
    };
    const [state, setState] = React.useState({
        image: [],
        memo_details: [],
        first_data: [],
        second_data: [],
        name: '',
        branch: '',
        date: '',
        date_val:new Date()
    })
    React.useEffect(() => {
        async function handlegetJO() {
            // let data = home_reducer.JobOrder.filter((val) => (val.findings != null && val.findings != '' && val.fieldman_id == pdfDetails.fieldman_id))
            // if(type == 'Create'){
            let image_data = []
            // pdfDetails.data_val.map((val) => {
            //     let image = ''
            //     home_reducer.images_audit.map((val_data) => {
            //         if (val_data.jo_id == val.jo_id) {
            //             image = val_data.image_path
            //         }
            //     })
            //     image_data.push({ image: image, jo_id: val.jo_id })
            // })
            // console.log(image_data)
            // console.log(pdfDetails.data_val)    

            getData('audit/convertImage2', { type: 'Late Attendance', data: pdfDetails, hr_id: localStorage.getItem('u'), typefetch: '' }).then((res) => {
                console.log(pdfDetails)
                let memo_details = []
                res.memo.map((val) => {
                    memo_details = val
                })
                // dispatch({
                //     type: 'PDFData',
                //     data: res.data
                // })
                let half = Math.round(pdfDetails.length / 2)
                let first_data = []
                let second_data = []
                let modulos = pdfDetails.length % 2
                let name = ''
                let branch = ''
                let date = ''
                let date_val = ''
                pdfDetails.map((val, index) => {
                    console.log(val)
                    name = val.Name;
                    branch = val.Branch;
                    date = val.date_added
                    let time_in = val.start[0].datetime
                    var oneDay = 24 * 60 * 60 * 1000;
                    var date1 = new Date(moment(time_in).format('YYYY-MM-DD') + " " + '7:00');
                    var date2 = new Date(time_in);
                    var diffDays = Math.abs((date2.getTime() - date1.getTime()) / oneDay * 24);
                    var time = Math.round(diffDays * 60) + ' ' + 'minute/s'
                    if (diffDays > 1) {
                        time = parseFloat(diffDays).toFixed(2) + ' ' + 'hour/s'
                    }
                    let data = {
                        date: moment(time_in).format('LL'),
                        time: time
                    }
                    date_val = moment(time_in).format('YYYY-MM-DD')
                    if (modulos != 0) {
                        if (index < half) {
                            first_data.push(data)
                        } else {
                            second_data.push(data)
                        }
                    } else {
                        if (index < half) {
                            first_data.push(data)
                        } else {
                            second_data.push(data)

                        }
                    }
                })

                setState({ ...state,date_val:date_val, memo_details: memo_details, first_data: first_data, second_data: second_data, branch: branch, name: name, date: date })
            })
            // }

        }
        setTimeout(() => {
            handlegetJO()
        }, 500)

    }, [])
    const customColumnStyle = { width: 122, borderBottom: 'none', fontSize: 12, fontWeight: 'bold', borderStyle: 'solid', borderColor: '#fff', borderWidth: 2 };
    const customColumnStyle2 = { width: 12, borderBottom: 'none', fontSize: 12, fontWeight: 'bold', borderStyle: 'solid', borderColor: '#fff', borderWidth: 2 };
    const styles = StyleSheet.create({
        page: {
            // flexDirection: 'column',
            backgroundColor: '#fff',
            paddingBottom: 50
        },
        page2: {
            // flexDirection: 'column',
            backgroundColor: '#fff',
            paddingBottom: 70
        },
        section: {
            margin: 10,
            padding: 10,
            flexGrow: 1
        }
    });
    console.log(pdfDetails)
    return (

        <PDFViewer style={{ width: '100%', height: 550 }}>
            <Document>
                <Page size="A4" style={styles.page} wrap>

                    <View fixed>
                        <View style={{ paddingHorizontal: 10, paddingTop: 10 }}>
                            <Image style={{ width: 120, height: 100 }} src={FieldTechImage}></Image>
                        </View>
                        <View style={{ zIndex: 999, position: 'absolute', top: 798, width: '100%' }}>

                            <View style={{ borderWidth: 2, borderColor: '#a8e585', borderTop: 'solid', marginBottom: 10, marginHorizontal: 10 }}>

                            </View>
                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10 }}>
                                <View >
                                    <Text style={{ fontSize: 7 }}>(043) 300-4338 LOC. 202 | (043) 741- 8772</Text>
                                </View>
                                <View  >
                                    <Text style={{ fontSize: 7 }}>businessdev@fieldtech-ph.com</Text>

                                </View>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'row', width: '100%', justifyContent: 'space-between', paddingHorizontal: 10 }}>
                                <View style={{ display: 'flex', flexDirection: 'row' }}>
                                    <Text style={{ fontSize: 7 }}>17th Flr., Ayala Avenue, Brgy. San Lorenzo, Makati City, Metro Manila 1226 Philippines</Text>
                                </View>
                                <View style={{ display: 'flex', flexDirection: 'row' }}>
                                    <Text style={{ fontSize: 7 }}>http://fieldtech-ph.com/</Text>
                                </View>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'row', width: '100%' }}>
                                <View style={{ backgroundColor: '#a8e585', height: 25, width: '33%' }}>

                                </View>
                                <View style={{ backgroundColor: '#a0b0a6', height: 25, width: '34%' }}>

                                </View>
                                <View style={{ backgroundColor: '#b2d8c9', height: 25, width: '33%' }}>

                                </View>

                            </View>
                        </View>
                    </View>
                    <View style={{ padding: 10, position: 'relative', }}>
                        {/* <View style={{ display: 'flex', justifyContent: 'flex-start' }}>
                            <Image style={{ width: 120, height: 100 }} src={FieldTechImage}></Image>
                        </View> */}
                        {/* <br/> */}

                        <View style={{ marginTop: 15, paddingRight: 40, paddingLeft: 40 }}>
                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ width: "15%" }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 10, textAlign: 'left' }}>Date</Text>
                                </View>
                                <View style={{ width: '10%' }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 10 }}>:</Text>
                                </View>
                                <View style={{ width: "80%" }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 10, textAlign: 'left' }}>{moment(date_created).format('LL')}</Text>
                                </View>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ width: "15%" }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 10, textAlign: 'left' }}>To</Text>
                                </View>
                                <View style={{ width: '10%' }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 10 }}>:</Text>
                                </View>
                                <View style={{ width: "80%" }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 10, textAlign: 'left' }}>MR. {String(state.name).toUpperCase()}</Text>
                                </View>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ width: "15%" }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 10, textAlign: 'left' }}>Branch</Text>
                                </View>
                                <View style={{ width: '10%' }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 10 }}>:</Text>
                                </View>
                                <View style={{ width: "80%" }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 10, textAlign: 'left' }}>{String(state.branch).toUpperCase()}</Text>
                                </View>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ width: "15%" }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 10, textAlign: 'left' }}>From</Text>
                                </View>
                                <View style={{ width: '10%' }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 10 }}>:</Text>
                                </View>
                                <View style={{ width: "80%" }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 10, textAlign: 'left' }}>HUMAN RESOURCE DEPARTMENT</Text>
                                </View>
                            </View>
                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                                <View style={{ width: "15%" }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 10, textAlign: 'left' }}>Subject</Text>
                                </View>
                                <View style={{ width: '10%' }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 10 }}>:</Text>
                                </View>
                                <View style={{ width: "80%" }}>
                                    <Text style={{ fontWeight: 'bold', fontSize: 10, textAlign: 'left' }}>NOTICE TO EXPLAIN</Text>
                                </View>
                            </View>

                        </View>
                        <View style={{ borderWidth: 2, borderColor: '#000', borderTop: 'solid', marginRight: 40, marginLeft: 40, marginTop: 10 }}>

                        </View>
                        {/* <hr style={{ borderWidth: 1, borderColor: '#000', marginRight: 40, marginLeft: 40 }} /> */}
                        <View style={{ marginRight: 40, marginLeft: 40, marginTop: 10 }}>
                            <Text style={{ textAlign: 'justify', fontSize: 10 }}>
                            Our records show that you have exceeded tolerable limit of tardiness equivalent to a total of {pdfDetails.length} instances during the Reading Cycle Schedule of the branch for the month of {moment(state.date_val).format('MMMM YYYY')}. Hence, we are requesting you to explain in writing why you should not be given any disciplinary action relative to this report that we received.  
                            </Text>

                        </View>


                        <View style={{ marginRight: 40, marginLeft: 40, marginTop: 10 }}>
                            <View style={{ display: 'flex', flexDirection: 'row', width: '70%', justifyContent: 'space-between', alignSelf: 'center' }}>
                                <View style={{ width: '45%' }}>
                                    <View style={{ display: 'flex', alignItems: 'center', borderWidth: 1, borderStyle: 'solid', borderColor: '#000' }}>
                                        <View style={{ flexDirection: 'row', width: '100%' }}>
                                            <View style={{ paddingTop: 5, width: '50%', paddingBottom: 5, alignItems: 'center', borderRightWidth: 1, borderStyle: 'solid', borderColor: '#000' }}><Text style={{ fontSize: 10 }}>Date</Text></View>
                                            <View style={{ paddingTop: 5, width: '50%', paddingBottom: 5, alignItems: 'center', borderStyle: 'solid', borderColor: '#000' }}><Text style={{ fontSize: 10 }}>Time</Text></View>

                                        </View>
                                        {pdfDetails.length == 0 ? undefined : state.first_data.map((val, index) => {
                                            return <View style={{ flexDirection: 'row', width: '100%', borderTopWidth: 1, borderColor: '#000' }}>
                                                <View style={{ paddingTop: 5, width: '50%', paddingBottom: 5, alignItems: 'center', borderRightWidth: 1, borderStyle: 'solid', borderColor: '#000' }}><Text style={{ fontSize: 10 }}>{moment(val.date).format('YYYY-MM-DD')}</Text></View>
                                                <View style={{ paddingTop: 5, width: '50%', paddingBottom: 5, alignItems: 'center', borderStyle: 'solid', borderColor: '#000' }}><Text style={{ fontSize: 10 }}>{val.time}</Text></View>
                                            </View>
                                        })}

                                    </View>
                                </View>
                                <View style={{ width: '45%' }} >
                                    <View style={{ display: 'flex', alignItems: 'center', borderWidth: 1, borderStyle: 'solid', borderColor: '#000' }}>
                                        <View style={{ flexDirection: 'row', width: '100%' }}>
                                            <View style={{ paddingTop: 5, width: '50%', paddingBottom: 5, alignItems: 'center', borderRightWidth: 1, borderStyle: 'solid', borderColor: '#000' }}><Text style={{ fontSize: 10 }}>Date</Text></View>
                                            <View style={{ paddingTop: 5, width: '50%', paddingBottom: 5, alignItems: 'center', borderStyle: 'solid', borderColor: '#000' }}><Text style={{ fontSize: 10 }}>Time</Text></View>

                                        </View>
                                        {pdfDetails.length == 0 ? undefined : state.second_data.map((val, index) => {
                                            return <View style={{ flexDirection: 'row', width: '100%', borderTopWidth: 1, borderColor: '#000' }}>
                                                <View style={{ paddingTop: 5, width: '50%', paddingBottom: 5, alignItems: 'center', borderRightWidth: 1, borderStyle: 'solid', borderColor: '#000' }}><Text style={{ fontSize: 10 }}>{moment(val.date).format('YYYY-MM-DD')}</Text></View>
                                                <View style={{ paddingTop: 5, width: '50%', paddingBottom: 5, alignItems: 'center', borderStyle: 'solid', borderColor: '#000' }}><Text style={{ fontSize: 10 }}>{val.time}</Text></View>
                                            </View>
                                        })}

                                    </View>
                                </View>
                            </View>


                            <View style={{ marginTop: 10 }}>
                                <Text style={{ textAlign: 'justify', fontSize: 10 }}>
                                    {state.memo_details.memo_details_2}

                                </Text>
                            </View>
                            {pdfDetails.length === 4 ?
                                <>
                                    <View style={{ flexDirection: 'row', width: '100%', borderWidth: 1, borderStyle: 'solid', borderColor: '#fff', backgroundColor: 'rgb(98,162,59)', marginTop: 10 }}>
                                        <View style={{ paddingTop: 10, width: '30%', paddingBottom: 10, alignItems: 'center', borderLeftWidth: 1, borderStyle: 'solid', borderColor: '#fff', backgroundColor: '#6ab04c' }}><Text style={{ fontSize: 10 }}>Offense</Text></View>
                                        <View style={{ paddingTop: 10, width: '20%', paddingBottom: 10, alignItems: 'center', borderLeftWidth: 1, borderStyle: 'solid', borderColor: '#fff', backgroundColor: '#6ab04c' }}><Text style={{ fontSize: 10 }}>Type of Infraction</Text></View>
                                        <View style={{ paddingTop: 10, width: '14%', paddingBottom: 10, alignItems: 'center', borderLeftWidth: 1, borderStyle: 'solid', borderColor: '#fff', backgroundColor: '#6ab04c' }}><Text style={{ fontSize: 10 }}>1st Offense</Text></View>
                                        <View style={{ paddingTop: 10, width: '12%', paddingBottom: 10, alignItems: 'center', borderLeftWidth: 1, borderStyle: 'solid', borderColor: '#fff', backgroundColor: '#6ab04c' }}><Text style={{ fontSize: 10 }}>2nd Offense</Text></View>
                                        <View style={{ paddingTop: 10, width: '12%', paddingBottom: 10, alignItems: 'center', borderLeftWidth: 1, borderStyle: 'solid', borderColor: '#fff', backgroundColor: '#6ab04c' }}><Text style={{ fontSize: 10 }}>3rd Offense</Text></View>
                                        <View style={{ paddingTop: 10, width: '12%', paddingBottom: 10, alignItems: 'center', borderLeftWidth: 1, borderStyle: 'solid', borderColor: '#fff', backgroundColor: '#6ab04c' }}><Text style={{ fontSize: 10 }}>4th Offense</Text></View>
                                    </View>
                                    <View style={{ flexDirection: 'row', width: '100%', borderWidth: 1, borderStyle: 'solid', borderColor: '#fff', borderLeftColor: '#fff', backgroundColor: 'rgb(98,162,59)' }}>
                                        <View style={{ paddingTop: 10, width: '30%', paddingBottom: 10, alignItems: 'center', borderLeftWidth: 1, borderStyle: 'solid', borderColor: '#fff', backgroundColor: '#a9f08b', paddingHorizontal: 5 }}><Text style={{ fontSize: 10 }}>
                                            {state.memo_details.offence}
                                        </Text  >
                                        </View>
                                        <View style={{ paddingTop: 10, width: '20%', paddingBottom: 10, alignItems: 'center', borderLeftWidth: 1, borderStyle: 'solid', borderColor: '#fff', backgroundColor: '#a9f08b', paddingHorizontal: 5 }}>

                                            <Text style={{ fontSize: 10 }}>{state.memo_details.type_of_Infraction}
                                            </Text>
                                        </View>
                                        <View style={{ paddingTop: 10, width: '14%', paddingBottom: 10, alignItems: 'center', borderLeftWidth: 1, borderStyle: 'solid', borderColor: '#fff', backgroundColor: '#a9f08b', paddingHorizontal: 5 }}><Text style={{ fontSize: 10 }}>{state.memo_details.first_off}</Text></View>
                                        <View style={{ paddingTop: 10, width: '12%', paddingBottom: 10, alignItems: 'center', borderLeftWidth: 1, borderStyle: 'solid', borderColor: '#fff', backgroundColor: '#a9f08b', paddingHorizontal: 5 }}><Text style={{ fontSize: 10 }}> {state.memo_details.second_off}</Text></View>
                                        <View style={{ paddingTop: 10, width: '12%', paddingBottom: 10, alignItems: 'center', borderLeftWidth: 1, borderStyle: 'solid', borderColor: '#fff', backgroundColor: '#a9f08b', paddingHorizontal: 5 }}><Text style={{ fontSize: 10 }}>{state.memo_details.third_off}</Text></View>
                                        <View style={{ paddingTop: 10, width: '12%', paddingBottom: 10, alignItems: 'center', borderLeftWidth: 1, borderStyle: 'solid', borderColor: '#fff', backgroundColor: '#a9f08b', paddingHorizontal: 5 }}><Text style={{ fontSize: 10 }}>{state.memo_details.fourth_off}</Text></View>
                                    </View>
                                </>
                                :
                                <>
                                    <View style={{ flexDirection: 'row', width: '100%', borderWidth: 1, borderStyle: 'solid', borderColor: '#fff', backgroundColor: 'rgb(98,162,59)', marginTop: 10 }}>
                                        <View style={{ paddingTop: 10, width: '30%', paddingBottom: 10, alignItems: 'center', borderLeftWidth: 1, borderStyle: 'solid', borderColor: '#fff', backgroundColor: '#6ab04c' }}><Text style={{ fontSize: 10 }}>Offense</Text></View>
                                        <View style={{ paddingTop: 10, width: '25%', paddingBottom: 10, alignItems: 'center', borderLeftWidth: 1, borderStyle: 'solid', borderColor: '#fff', backgroundColor: '#6ab04c' }}><Text style={{ fontSize: 10 }}>Type of Infraction</Text></View>
                                        <View style={{ paddingTop: 10, width: '15%', paddingBottom: 10, alignItems: 'center', borderLeftWidth: 1, borderStyle: 'solid', borderColor: '#fff', backgroundColor: '#6ab04c' }}><Text style={{ fontSize: 10 }}>1st Offense</Text></View>
                                        <View style={{ paddingTop: 10, width: '15%', paddingBottom: 10, alignItems: 'center', borderLeftWidth: 1, borderStyle: 'solid', borderColor: '#fff', backgroundColor: '#6ab04c' }}><Text style={{ fontSize: 10 }}>2nd Offense</Text></View>
                                        <View style={{ paddingTop: 10, width: '15%', paddingBottom: 10, alignItems: 'center', borderLeftWidth: 1, borderStyle: 'solid', borderColor: '#fff', backgroundColor: '#6ab04c' }}><Text style={{ fontSize: 10 }}>3rd Offense</Text></View>
                                        {/* <View style={{ paddingTop: 10, width: '10%', paddingBottom: 10, alignItems: 'center', borderLeftWidth: 1, borderStyle: 'solid', borderColor: '#fff', backgroundColor: '#6ab04c' }}><Text style={{ fontSize: 10 }}>4th Offense</Text></View> */}
                                    </View>
                                    <View style={{ flexDirection: 'row', width: '100%', borderWidth: 1, borderStyle: 'solid', borderColor: '#fff', borderLeftColor: '#fff', backgroundColor: 'rgb(98,162,59)' }}>
                                        <View style={{ paddingTop: 10, width: '30%', paddingBottom: 10, alignItems: 'center', borderLeftWidth: 1, borderStyle: 'solid', borderColor: '#fff', backgroundColor: '#a9f08b', paddingHorizontal: 5 }}><Text style={{ fontSize: 10 }}>
                                            {state.memo_details.offence}
                                        </Text  >
                                        </View>
                                        <View style={{ paddingTop: 10, width: '25%', paddingBottom: 10, alignItems: 'center', borderLeftWidth: 1, borderStyle: 'solid', borderColor: '#fff', backgroundColor: '#a9f08b', paddingHorizontal: 5 }}>

                                            <Text style={{ fontSize: 10 }}>{state.memo_details.type_of_Infraction}
                                            </Text>
                                        </View>
                                        <View style={{ paddingTop: 10, width: '15%', paddingBottom: 10, alignItems: 'center', borderLeftWidth: 1, borderStyle: 'solid', borderColor: '#fff', backgroundColor: '#a9f08b', paddingHorizontal: 5 }}><Text style={{ fontSize: 10 }}>{state.memo_details.first_off}</Text></View>
                                        <View style={{ paddingTop: 10, width: '15%', paddingBottom: 10, alignItems: 'center', borderLeftWidth: 1, borderStyle: 'solid', borderColor: '#fff', backgroundColor: '#a9f08b', paddingHorizontal: 5 }}><Text style={{ fontSize: 10 }}> {state.memo_details.second_off}</Text></View>
                                        <View style={{ paddingTop: 10, width: '15%', paddingBottom: 10, alignItems: 'center', borderLeftWidth: 1, borderStyle: 'solid', borderColor: '#fff', backgroundColor: '#a9f08b', paddingHorizontal: 5 }}><Text style={{ fontSize: 10 }}>{state.memo_details.third_off}</Text></View>
                                        {/* <View style={{ paddingTop: 10, width: '10%', paddingBottom: 10, alignItems: 'center', borderLeftWidth: 1, borderStyle: 'solid', borderColor: '#fff', backgroundColor: '#a9f08b', paddingHorizontal: 5 }}><Text style={{ fontSize: 10 }}></Text></View> */}
                                    </View>
                                </>

                            }


                            <Text style={{ textAlign: 'justify', fontSize: 10, marginTop: 10 }}>
                                {state.memo_details.memo_details_3}
                            </Text>
                            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginRight: 70, marginLeft: 70, marginTop: 5 }}>
                                <View>
                                    <Image style={{ width: 100, height: 100 }} src={Anna}></Image>
                                </View>
                                <View>
                                    <Image style={{ width: 100, height: 100 }} src={Efren}></Image>
                                </View>
                            </View>
                            <View>
                                <Text style={{ textAlign: 'justify', fontSize: 10, marginTop: 10 }}>
                                    Received and Acknowledged by:
                                </Text>
                                <View style={{ display: 'flex', justifyContent: 'space-between', flexDirection: 'row' }}>
                                    <View>
                                        <Text style={{ textAlign: 'justify', fontSize: 10 }}>
                                            Employee Name with Signature: _____________________________
                                        </Text>
                                    </View>
                                    <View style={{ display: 'flex', flexDirection: 'column' }}>
                                        <Text style={{ textAlign: 'justify', fontSize: 10 }}>
                                            Date: ___________________________
                                        </Text>
                                        <Text style={{ textAlign: 'justify', fontSize: 10, fontWeight: 'bold', fontStyle: 'italic' }}>
                                            Cc: HR / 201 File / Immediate Superior
                                        </Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    </View>
                </Page>

            </Document>
        </PDFViewer>

    );
}

export default Index;

