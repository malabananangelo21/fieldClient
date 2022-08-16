import React from "react";
import "../../../../../src/App.css";
import {FormControl,InputLabel,Select,MenuItem,Button} from "@material-ui/core";
import { getData } from "../../../api/api";
import { useDispatch, useSelector } from "react-redux";
const ValidationValidator = React.memo(function ({jo,close}){
    console.log(jo)
    const dispatch = useDispatch();

    const dispatch_data = (type, data) => {
        dispatch({
          type: type,
          data: data,
        });
    };

    const [state,setState] = React.useState({
        status : '',
        countRequest:0,
    })

    return(
        <form onSubmit={onSubmit}>
            
        </form>
    )
})


export default ValidationValidator;