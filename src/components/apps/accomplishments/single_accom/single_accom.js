import React, { useEffect } from 'react';
import useStyles from '../../../../css/css';
import { useSelector, useDispatch } from 'react-redux'
import moment from 'moment'
import { Document, Page, Text, View, StyleSheet, PDFViewer, Image } from '@react-pdf/renderer';
import Mapa from '../../../apps/map/map';
function Index() {
    const classes = useStyles();
    const home_reducer = useSelector(state => state.home_reducer)
    const dispatch = useDispatch()
    const dispatch_data = (type, data) => {
        dispatch({
            type: type,
            data: data
        })
    }
    const [state, setState] = React.useState({
        image: [],
        memo_details: [],
        first_data: [],
        second_data: [],
        name: '',
        branch: '',
        date: ''
    })
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
    return (

        <PDFViewer style={{ width: '100%', height: 550 }}>
            <Document>
                <Page size="A4" style={styles.page} wrap>
                    <View fixed>
                        {/* <Mapa /> */}
                        <View style={{ paddingHorizontal: 10, paddingTop: 10 }}>
                            <Image src={'https://www.google.com/maps/@' + home_reducer.latitude +','+ home_reducer.longitude}/>
                            {/* <Image src='data:image/jpeg;base64,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'/> */}
                        </View>
                        <View >
                            <Text style={{ fontSize: 7 }}>(043) 300-4338 LOC. 202 | (043) 741- 8772</Text>
                        </View>
                    </View>
                </Page>
            </Document>
        </PDFViewer>

    );
}

export default Index;
