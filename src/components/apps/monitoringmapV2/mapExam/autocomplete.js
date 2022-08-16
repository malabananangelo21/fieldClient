import React, { useEffect } from 'react';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import useOnclickOutside from 'react-cool-onclickoutside';
import TextField from '@material-ui/core/TextField';
import { useSelector, useDispatch } from 'react-redux';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import PinDropIcon from '@material-ui/icons/PinDrop';
let initial = true
let GOOGLE_MAPS_APIKEY = 'AIzaSyB04YACNd6OwYwtU8eR4t-eeqXDe7jdX_A'

const PlacesAutocomplete = ({ newvalue, locationGet }) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions
  } = usePlacesAutocomplete({
    requestOptions: {
      componentRestrictions: {
        country: 'PH',
      }
    },
    debounce: 300
  });
  useEffect(() => {
    setValue(newvalue)
  }, [newvalue])
  const registerRef = useOnclickOutside(() => {
    // When user clicks outside of the component, we can dismiss
    // the searched suggestions by calling this method
    clearSuggestions();
  });
  const dispatch = useDispatch();
  const dispatch_data = (type, data) => {
    dispatch({
      type: type,
      data: data
    })
  }
  const [inputedPlace, setinputedPlace] = React.useState("")
  const [setTimer, setsetTimer] = React.useState("")

  const getCustomPlaces = (places) => {
    let holder = places
    setinputedPlace(places)
    clearTimeout(setTimer)
    const timerSet = setTimeout(() => {
      // setspinner(true)
      handleInput(holder)
    }, 1000)
    setsetTimer(timerSet)
  }

  const handleInput = holder => {
    // Update the keyword of the input element
    initial = false
    setValue(holder);
  };

  const handleSelect = ({ description }) => () => {
    // When user selects a place, we can replace the keyword without request data from API
    // by setting the second parameter as "false"
    setinputedPlace(description)
    setValue(description, false);
    clearSuggestions();

    
    // fetch('https://maps.googleapis.com/maps/api/geocode/json?address=['+description+']&key=['+GOOGLE_MAPS_APIKEY+']').then(()=>{

    // })
    // Get latitude and longitude via utility functions
    getGeocode({ address: description, })
      .then(results => getLatLng(results[0]))
      .then(({ lat, lng }) => {
        let data = {
          Coordinates: { lat, lng },
          address: description
        }
        let struct = {
          lat: lat,
          lng: lng,
          description: description
        }

        // console.log(type.type)
        initial = true
        locationGet(struct)
        // console.log('📍 Coordinates: ', { lat, lng ,description});
      }).catch(error => {
        console.log('😱 Error: ', error)
      });
  };

  const renderSuggestions = () =>
    data.map(suggestion => {
      const {
        id,
        structured_formatting: { main_text, secondary_text }
      } = suggestion;

      return (
        <li
          key={id}
          onClick={handleSelect(suggestion)}
        >
          <strong>{main_text}</strong> <small>{secondary_text}</small>
        </li>
      );
    });

  return (
    <div ref={registerRef}>
      <TextField variant='outlined'
         onChange={(e) => {
          let data = e.target.value
          getCustomPlaces(data)
      }}
        value={inputedPlace}
        disabled={!ready} style={{ width: '100%', marginBottom: 20 }}
        size="small"
        InputProps={{
          startAdornment: <InputAdornment position="end">
            {/* <IconButton onClick={() => { }} aria-label="toggle password visibility" edge="start">
                <PinDropIcon />
              </IconButton> */}
          </InputAdornment>,
        }} />

      {/* <TextField onClick={()=>  {
              if(type.type === 'Origin'){
                // dispatch_data('OriginCoordinates',[])
              }else{
                // dispatch_data('DestinationCoordinates',[])
              }
         }}size='small' value={value}
        onChange={handleInput}
        disabled={!ready} style={{ width: '100%', marginBottom: 20 }} label={type.type+" "+"Location"} variant="outlined" /> */}
      {/* <input
        value={value}
        onChange={handleInput}
        disabled={!ready}
        placeholder="Where are you going?" */}
      {/* /> */}
      {/* We can use the "status" to decide whether we should display the dropdown or not */}
      {(status === 'OK' && !initial) && <ul>{renderSuggestions()}</ul>}
    </div>
  );
};
export default PlacesAutocomplete;