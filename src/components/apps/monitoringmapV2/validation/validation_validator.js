import React from "react";
import "../../../../../src/App.css";
import {FormControl,InputLabel,Select,MenuItem,Button} from "@material-ui/core";
import { getData } from "../../../api/api";
import { useDispatch, useSelector } from "react-redux";
const ValidationValidator = React.memo(function ({jo,close}){
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

    const onChangeStatus = (e) => {
        setState({...state,status:e.target.value})
    }

    const onSubmit = (e) =>{
        dispatch_data("loading_map", true);
        e.preventDefault();
        let details = {
            accom_id:jo.accom_id,
            validation_validator : localStorage.getItem('u'),
            validation_validator_status: state.status
        }
        validate(details)
    }
    async function validate(details){
        try {
            let res = await getData('aam/validate_validation',details)
            if(res.res){
                jo.validation_validator_status = res.data.validation_validator_status
                jo.validation_validator_date = res.data.validation_validator_date
                jo.validation_validator = res.data.validation_validator

                close(jo)
            }
            dispatch_data("loading_map", false);
          } catch (error) {
              console.log(error)
            let res = String(error).includes('Network Error')
            if(res){
                if(state.countRequest < 5){
                    setTimeout(()=>{
                        validate(details)
                    },2000)
                    setState({...state,countRequest:state.countRequest++})
                }else{
                    dispatch_data("loading_map", false);
                    alert('Please check your internet connection.')
                } 
            }else{
                dispatch_data("loading_map", false);
                alert('Something went wrong.')

            }
          }
    }
    return(
        <form onSubmit={onSubmit}>
            <FormControl
            size="small"
            style={{ width: "100%" }}
            >
                <InputLabel id="demo-simple-select-outlined-label">
                    Status
                </InputLabel>
                <Select
                    // required
                    labelId="demo-simple-select-outlined-label"
                    id="demo-simple-select-outlined"
                    onChange={onChangeStatus}
                    label="Company"
                    name="company"
                    value={state.status}
                >
                    <MenuItem value="Valid"> 
                    Valid  
                    </MenuItem>
                    <MenuItem value="Invalid"> 
                    Invalid  
                    </MenuItem>
                </Select>
            </FormControl>
            <div style={{display:'flex',justifyContent:'flex-end'}}>
            <Button
            type="submit"
              variant="contained"
              style={{
                backgroundColor: "rgba(6,86,147)",
                color: "white",
                marginTop: 15,
              }}
              onClick={() => {
              
              }}
            >
              Submit
            </Button>
            </div>
        </form>
    )
})


export default ValidationValidator;