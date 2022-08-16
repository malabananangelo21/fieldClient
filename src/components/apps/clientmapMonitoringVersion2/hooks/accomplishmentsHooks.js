import React, { useState, useContext } from 'react'
import { useDispatch, useSelector } from "react-redux";
import { getData, serverImageMeter } from "../../../api/api";
import moment from 'moment'
import { ClientMapContext } from '../../../context/clientMapContext/ClientMap'
import BgreenMarker from '../../../.././assets/map image/bgreen-marker.png'
import BlackMarker from '../../../.././assets/map image/black-marker.png'
import BlueMarker from '../../../.././assets/map image/blue-marker.png'
import BrownMarker from '../../../.././assets/map image/brown-marker.png'
import DbrownMarker from '../../../.././assets/map image/dbrown-marker.png'
import GrayMarker from '../../../.././assets/map image/gray-marker.png'
import GreenMarker from '../../../.././assets/map image/green-marker.png'
import LgreenMarker from '../../../.././assets/map image/lgreen-marker.png'
import LpurpleMarker from '../../../.././assets/map image/lpurple-marker.png'
import LyellowMarker from '../../../.././assets/map image/lyellow-marker.png'
import OrangeMarker from '../../../.././assets/map image/orange-marker.png'
import PblueMarker from '../../../.././assets/map image/pblue-marker.png'
import PinkMarker from '../../../.././assets/map image/pink-marker.png'
import PpurpleMarker from '../../../.././assets/map image/ppurple-marker.png'
import PurpleMarker from '../../../.././assets/map image/purple-marker.png'
import RedMarker from '../../../.././assets/map image/red-marker.png'
import SblueMarker from '../../../.././assets/map image/sblue-marker.png'
import SkyBlueMarker from '../../../.././assets/map image/skyBlue-marker.png'
import WhiteMarker from '../../../.././assets/map image/white-marker.png'
import YellowMarker from '../../../.././assets/map image/yellow-marker.png'
import YGreenMarker from '../../../.././assets/map image/ygreen-marker.png'
import { useAccomDetails } from './accomDetails';
export const useAccomplishment = () => {
    const dispatch = useDispatch()
    const home_reducer = useSelector((state) => state.home_reducer);
    const map_reducer = useSelector((state) => state.map_reducer);
    const { onPassdata, onReserData, onFilterFF, accomList, onSearch } = useContext(ClientMapContext)
    const { onClose } = useAccomDetails()
    // const {data_param} = useMap()
    const [state, setState] = useState({
        branch_name: '',
        jo_type: '',
        start_date: new Date(),
        end_date: new Date(),
        jo_count: 0,
        Selected_branch: [],
        open_modal: false,
        selection: {
            startDate: new Date(),
            endDate: new Date(),
            key: 'selection'
        },
        open_date_modal: false,
        modal_employee: false,
        check_all: false,
        comp_id: '',
        accomplishmentList: [],
        accomDailyCount: [],
        field_findings_modal: false,
        search_modal: false,
        field_findings: [],
        selected_field_findings: [],
        search: ''
    })

    const [accomplishmentList, setAccomplishmentList] = useState([])
    const [refreshMap, setRefreshMap] = useState(false)

    React.useEffect(() => {
        getBranches()
    }, [])

    const dispatch_data = (type, data) => {
        dispatch({
            type: type,
            data: data,
        });
    };

    const [personName, setPersonName] = React.useState([]);

    const getBranches = () => {
        dispatch_data("loading_map", true);
        getData("HumanResource/getHandleBranch", {
            user_id: localStorage.getItem("u"),
        }).then((response) => {
            let company = [];

            response.response.map((item) => {
                let match = false;
                company.map((val) => {
                    if (val.company_name == item.company_name) {
                        match = true;
                    }
                });
                if (!match) {
                    company.push({
                        company_name: item.company_name,
                        company_id: item.company_id,
                    });
                }
            });
            dispatch_data("gethandleBranch", response.response);
            dispatch_data("company_name", company);
            dispatch_data("SelectedBranches", []);

            let initialData = sessionStorage.getItem('onSelectSingleDateGraph')
            if (initialData != null) {
                let new_initialData = JSON.parse(initialData)
                let filterBranch = response.response.filter((val) => val.branch_id == new_initialData.selection[0])
                let branches = response.response.filter((val) => val.company_id == new_initialData.company_id)
                let jo_type = []
                let branch_field_details = []
                let branch_name = ""

                response.response.map((val, index) => {
                    if (val.branch_id === new_initialData.selection[0] && branch_name === "") {

                        if (val.branch_field_work !== "") {

                            jo_type = JSON.parse(val.branch_field_work)
                            if (val.branch_field_details != null) {
                                branch_field_details = JSON.parse(val.branch_field_details)
                            }
                        }
                        branch_name = val.branch_name
                    }
                })
                dispatch({
                    type: 'MapReducerState',
                    data: { accom_jo_type: jo_type, accom_branch_field_details: branch_field_details, accom_selected_jo: "" }
                })
                branches.sort(function (a, b) {
                    return a["branch_name"].localeCompare(b["branch_name"]);
                });
                dispatch_data("SelectedBranches", branches);

                setState(prev => ({
                    ...prev,
                    branch_name: filterBranch.length > 0 ? filterBranch[0].branch_name : '',
                    jo_type: new_initialData.jo_type[0],
                    comp_id: new_initialData.company_id,
                    Selected_branch: new_initialData.selection[0],
                }))
                setPersonName(new_initialData.jo_type)
                dispatch({
                    type: 'MapReducerState',
                    data: { job_type_per_branch: new_initialData.jo_type }
                })
                getDataSubmit(new_initialData.selection[0], new_initialData.jo_type, new_initialData.selection[0],new_initialData.company_id)

            } else {
                let jo_type = []
                let branch_field_details = []
                let branch_name = ""
                let branch_initial_data = []
                response.response.map((val, index) => {
                    if (val.branch_field_work !== "" && branch_initial_data.length == 0) {
                        branch_initial_data = val
                        jo_type = JSON.parse(val.branch_field_work)
                        if (val.branch_field_details != null) {
                            branch_field_details = JSON.parse(val.branch_field_details)
                        }
                    }
                })
                console.log(branch_field_details)
                let branches = []
                branches = response.response.filter((val) => val.company_id == branch_initial_data?.company_id)

                dispatch({
                    type: 'MapReducerState',
                    data: { accom_jo_type: jo_type, accom_branch_field_details: branch_field_details, accom_selected_jo: "" }
                })
                branches.sort(function (a, b) {
                    return a["branch_name"].localeCompare(b["branch_name"]);
                });
                dispatch_data("SelectedBranches", branches);
                setState(prev => ({
                    ...prev,
                    branch_name: branch_initial_data?.branch_name,
                    jo_type: jo_type[0],
                    comp_id: branch_initial_data?.company_id,
                    Selected_branch: branch_initial_data?.branch_id,
                }))
                setPersonName([jo_type[0]])
                console.log(branch_initial_data?.company_id)
                let data = {
                    parameter: "branch_id",
                    selection: [branch_initial_data?.branch_id],
                    from: moment(new Date()).format("YYYY-MM-DD"),
                    to: moment(new Date()).format("YYYY-MM-DD"),
                    company_id: branch_initial_data?.company_id,
                    jo_type: [jo_type[0]]
                }
                sessionStorage.setItem('onSelectSingleDateGraph', JSON.stringify(data))
                dispatch({
                    type: 'MapReducerState',
                    data: { job_type_per_branch: [jo_type[0]] }
                })
                getDataSubmit(state.selection, [jo_type[0]], branch_initial_data?.branch_id,branch_initial_data?.company_id)

            }


        });
    };

    const onSubmit = (e) => {
        e.preventDefault()
        getDataSubmit(state.selection, personName, state.Selected_branch,state.comp_id)
    }

    const getDataSubmit = (selection, personName, Selected_branch,company_id) => {
        let data = {
            from: moment(selection.startDate).format('YYYY-MM-DD'),
            to: moment(selection.endDate).format('YYYY-MM-DD'),
            selection: [Selected_branch],
            jo_type: personName,
            parameter: 'branch_id',
            company_id: company_id
        }
        dispatch_data("loading_map", true);
        getData('tracking/GetAllAccomByDate', data).then((res) => {

            let marker = [BgreenMarker,
                BlueMarker,
                DbrownMarker,
                GrayMarker,
                GreenMarker,
                LgreenMarker,
                LpurpleMarker,
                LyellowMarker,
                OrangeMarker,
                PblueMarker,
                PinkMarker,
                PpurpleMarker,
                PurpleMarker,
                RedMarker,
                SblueMarker,
                SkyBlueMarker,
                WhiteMarker,
                YellowMarker,
                YGreenMarker,
            ]
            let marker_count_index = 0;

            res.count.map((val) => {

                if (marker.length === marker_count_index) {
                    marker_count_index = 0
                }
                val.url = marker[marker_count_index]
                if (marker.length > marker_count_index) {
                    marker_count_index++
                }
            })
            let findings = JSON.stringify(res.findings)
            setState(prev => ({
                ...prev,
                accomplishmentList: res.accomplishment,
                accomDailyCount: res.count,
                field_findings: JSON.parse(findings),
                selected_field_findings: res.findings
            }))
            // setAccomplishmentList(res.accomplishment)
            // data_param(res.accomplishment)
            sessionStorage.setItem('onSelectSingleDateGraph', JSON.stringify(data))
            onPassdata(res.accomplishment, res.count)
            dispatch({
                type: 'MapReducerState',
                data: { refresh: !map_reducer.refresh }
            })
        })
    }

    const onChangeCompany = (e) => {
        const branches_data = home_reducer.handleBranch.filter(
            (val) => val.company_id == e.target.value
        );
        branches_data.sort(function (a, b) {
            return a["branch_name"].localeCompare(b["branch_name"]);
        });
        dispatch_data("SelectedBranches", branches_data);
        home_reducer.SelectedBranches = branches_data
        setPersonName([])
        setState(prev => ({ ...prev, Selectedcompany: e.target.value, comp_id: e.target.value }));
    }

    const onChangeBranch = (e) => {
        let jo_type = []
        let branch_field_details = []
        let branch_name = ""

        home_reducer.SelectedBranches.map((val, index) => {
            if (val.branch_id === e.target.value) {
                if (val.branch_field_work !== "") {

                    jo_type = JSON.parse(val.branch_field_work)
                    if (val.branch_field_details != null) {
                        branch_field_details = JSON.parse(val.branch_field_details)
                    }
                }
                branch_name = val.branch_name
            }
        })
        dispatch({
            type: 'MapReducerState',
            data: { accom_jo_type: jo_type, accom_branch_field_details: branch_field_details, accom_selected_jo: "" }
        })
        setState(prev => ({
            ...prev,
            Selected_branch: e.target.value,
            branch_name: branch_name
        }));
    };

    const openModal = () => {
        setState(prev => ({
            ...prev,
            open_modal: true
        }))
        dispatch({
            type: 'MapReducerState',
            data: {
                closeGenerateModal: true,
            }
        })
        onClose()
    }

    const closeModal = () => {
        dispatch({
            type: 'MapReducerState',
            data: {
                closeGenerateModal: false,
            }
        })
    }

    const openDateModal = () => {
        setState(prev => ({
            ...prev,
            open_date_modal: true
        }))
    }

    const closeDateModal = () => {
        setState(prev => ({
            ...prev,
            open_date_modal: false
        }))
    }
    const onChangeDate = (item) => {
        setState({ ...state, ...item })
    }
    const onClickjo_type = () => {
        setState({ ...state, modal_employee: true })
    }

    const handleListItemClick = (event, index, val) => {
        let jo_type = []
        let match = false
        if (val == 'ALL') {
            if (state.check_all == false) {
                map_reducer.accom_jo_type.map((va_data) => {
                    jo_type.push(va_data)
                })
            } else {
                jo_type = []
            }
            setState({ ...state, check_all: !state.check_all })
        } else {
            personName.map((va_data) => {
                if (va_data != val) {
                    jo_type.push(va_data)
                } else {
                    match = true
                }
            })
            if (!match) {
                jo_type.push(val)

            }
        }

        dispatch({
            type: 'MapReducerState',
            data: { job_type_per_branch: jo_type }
        })
        setPersonName(jo_type);
    }
    const changeEmployee = () => {
        setState({ ...state, modal_employee: false, searchDriver2: '' })
    }
    const onClickTotalCount = () => {
        dispatch_data("loading_map", true);
        onReserData()
        dispatch({
            type: 'MapReducerState',
            data: { refresh: !map_reducer.refresh }
        })
        onClose()
    }
    const openFieldFindings = () => {
        setState({ ...state, field_findings_modal: true })
        onClose()
    }
    const closeFieldFindings = () => {
        setState({ ...state, field_findings_modal: false })
        onClose()
    }
    const openSearhModal = () => {
        setState({ ...state, search_modal: true })
    }
    const closesearhModal = () => {
        setState({ ...state, search_modal: false })
    }
    const handleListItemClickFieldFindings = (event, index, val) => {
        if (val === "All") {
            if (state.selected_field_findings.length === state.field_findings.length) {
                setState(prev => ({ ...prev, selected_field_findings: [] }))
            } else {
                setState(prev => ({ ...prev, selected_field_findings: state.field_findings }))
            }

        } else {
            let match = false
            state.selected_field_findings.forEach((val_ff, index) => {
                if (val === val_ff) {
                    state.selected_field_findings.splice(parseInt(index), 1)
                    match = true
                    setState(prev => ({ ...prev }))
                }
            })
            if (!match) {
                state.selected_field_findings.push(val)
                setState(prev => ({ ...prev }))
            }
        }
    }
    const onFilterFieldFindings = () => {
        dispatch_data("loading_map", true);
        onFilterFF(state.selected_field_findings)
        closeFieldFindings()
    }
    const resetFieldFinding = () => {
        let findings = JSON.stringify(state.field_findings)
        setState(prev => ({
            ...prev,
            selected_field_findings: JSON.parse(findings)
        }))
    }
    const formatNumber = (num) => {
        if (num != "") {
            let num2 = parseFloat(num);
            return num2.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
        } else {
            return 0;
        }
    };
    const onChangeText = (e) => {
        let name = e.target.name
        let value = e.target.value
        setState(prev => ({
            ...prev,
            [name]: value
        }))
    }
    const searchReferenceNo = () => {
        dispatch_data("loading_map", true);
        closesearhModal()
        onClose()
        onSearch(state.search)
    }
    return {
        state,
        onSubmit,
        onChangeCompany,
        onChangeBranch,
        personName,
        openModal,
        closeModal,
        onChangeDate,
        openDateModal,
        closeDateModal,
        onClickjo_type,
        handleListItemClick,
        changeEmployee,
        accomplishmentList,
        refreshMap,
        onClickTotalCount,
        openFieldFindings,
        closeFieldFindings,
        openSearhModal,
        closesearhModal,
        handleListItemClickFieldFindings,
        onFilterFieldFindings,
        accomList,
        resetFieldFinding,
        formatNumber,
        onChangeText,
        searchReferenceNo

    }
}
