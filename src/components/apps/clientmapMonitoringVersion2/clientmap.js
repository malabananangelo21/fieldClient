import logo from '../../../logo.svg';
import '../../../App.css';
import React, { useContext } from 'react';
import ClientMapContext from '../../context/clientMapContext/ClientMap';
import GoogleMap from './map'
import '../../css/clientMap/clientMap.css'
import Accomplishment from './Accomplishment';
import Backdrop from "@material-ui/core/Backdrop";
import { useDispatch, useSelector } from "react-redux";
import AccomDetails from './AccomDetails'
const ClientMap = () => {
  const map_reducer = useSelector((state) => state.map_reducer);  
  const childRefMap = React.useRef();
  return (
    <div className='client-parent'>
      <Backdrop
        open={map_reducer.loading_map}
        style={{ zIndex: 999999999999999 }}
      >
        <div className="loadermap"></div>
      </Backdrop>
      <Accomplishment />
      <AccomDetails onShowInfoWindow = {(id)=>{childRefMap.current.onShowInfowindow(id)}}/>
      <GoogleMap ref={childRefMap}/>

    </div>
  );
}
export default ClientMap;