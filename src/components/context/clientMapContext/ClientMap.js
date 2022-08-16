import React, { createContext, useState, useEffect, useMemo } from 'react'
import MarkerClusterer from "@google/markerclusterer";
import { useDispatch, useSelector } from "react-redux";
export const ClientMapContext = createContext({});
export const ClientMapProvider = ({ children }) => {
    const dispatch = useDispatch()
    const refresh = useSelector((state) => state.map_reducer.refresh);
    const [accomList, setAccomList] = React.useState([])
    const [accomListData, setAccomListData] = React.useState([])

    const [accomCount, setAccomCount] = React.useState([])
    const [accomColor, setAccomColor] = React.useState([])
    const [selectedIndexDate, setSelectedIndexDate] = React.useState('')
    const [accomMasterList, setAccomMasterList] = React.useState([])
    const [displayEl, setDisplayEl] = React.useState();
    // let [new_marker, setNew_marker] = React.useState([])
    const dispatch_data = (type, data) => {
        dispatch({
            type: type,
            data: data,
        });
    };
    const mapRef = React.useRef();
    const new_marker = React.useRef([]);
    const [mapOption, setmapOption] = useState({
        zoom: 6,
        lat: 13.7565,
        lng: 121.0583,
    });
    // React.useEffect(() => {
    //     displayEl && setAccomList((prev) => [...prev, displayEl]);
    //   }, [displayEl]);

    const onPassdata = (data, count) => {
        setmapOption(prev => ({
            ...prev,
            zoom: 7,
            lat: 13.7565,
            lng: 121.0583,
        }))
        if (data.length <= 60000) {
            setAccomList(data)
            setAccomListData(data)
            // data.map((val)=>{
            //     setDisplayEl(val)
            // })
        } else {
            setAccomList([])
            setAccomListData([])

        }
        setAccomColor(count)
        setAccomCount(count)
        setAccomMasterList(data)
        setSelectedIndexDate('')

    }

    const onPassdataSelected = (data, count, data_fieldman, index) => {
        setmapOption(prev => ({
            ...prev,
            zoom: 7,
            lat: 13.7565,
            lng: 121.0583,
        }))
        setAccomColor(data_fieldman)
        setAccomList(data)
        setAccomListData(data)

    }
    const onPassdataSelectedIndex = (index) => {
        setSelectedIndexDate(index)
    }

    const onReserData = () => {
        setAccomColor(accomCount)
        if (accomList.length >= 60000) {
            setAccomList([])
            setAccomListData([])
        } else {
            setAccomList(accomMasterList)
            setAccomListData(accomMasterList)

        }
        setmapOption(prev => ({
            ...prev,
            zoom: 7,
            lat: 13.7565,
            lng: 121.0583,
        }))
        setSelectedIndexDate('')
    }

    const onMoveCoordinates = (lat, lng) => {
        setmapOption({
            ...mapOption,
            lat: parseFloat(lat),
            lng: parseFloat(lng),
            zoom: 20,
        });
    }
    const myClick = (id) => {
        console.log(mapRef.current)
        console.log(new_marker)

        if (mapRef.current) {
            const { map, maps } = mapRef.current;
            maps.event.trigger(new_marker.current[id], "click");
        }
    }
    const reset_new_marker = () => {
        // setNew_marker([])
    }
    const push_new_marker = (data) => {
        new_marker.push(data)
    }
    const onFilterFF = (selected_field_findings) => {
        console.log(selected_field_findings)
        let data = []
        selected_field_findings.forEach((val) => {
            accomListData.map((val_markers) => {
                if (val === val_markers.accom_findings) {
                    data.push(val_markers)
                }
            })
        })
        setAccomList(data)
        dispatch({
            type: 'MapReducerState',
            data: { refresh: !refresh }
        })

    }
    const onSearch = (search) => {
        let searchData = accomMasterList.filter((val) =>  {return (
            val.meter_number !== null && val.meter_number
                .toLowerCase()
                .indexOf(search.toLocaleLowerCase()) !== -1 ||  val.account_no !== null && val.account_no
                .toLowerCase()
                .indexOf(search.toLocaleLowerCase()) !== -1
        )})
        setAccomList(searchData)
        dispatch({
            type: 'MapReducerState',
            data: { refresh: !refresh }
        })

    }

    return (
        <ClientMapContext.Provider value={{
            accomList, onPassdata, mapOption, accomCount, accomMasterList, onPassdataSelected, onReserData, accomColor, selectedIndexDate, onPassdataSelectedIndex, onMoveCoordinates, mapRef, myClick,
            new_marker, onFilterFF, onSearch
        }}>
            {children}
        </ClientMapContext.Provider>
    )
}