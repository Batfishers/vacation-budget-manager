import React, { Component, useState } from 'react';
import { TextField, Box, Paper, Typography } from '@material-ui/core';
import 'regenerator-runtime/runtime';
import Checkbox from './Checkbox.js';
import DateSelector from './DateSelector.jsx';
import DropDown from './DropDown.js';
import Button from '@material-ui/core/Button';
import apiFunc from '../apiFunc/apiFunc.js';
import CustomizedTables from './DataTable.jsx'
import handleApiResponse from './handleApiResponse.jsx'
import submitInfo from './submitInfo.jsx'
function Container() {

  const [submitState, setSubmit] = useState(false); 
  const [hotelName, setHotelName] = useState(null);
  const [airportStart, setAirportStart] = useState(null);
  const [airportEnd, setAirportEnd] = useState(null);
  const [resultsObject, setResults] =useState({
    airfarePrice: {
      low: null,
      median: null,
      high: null,
    },
    hotelPrice: {
      low: null,
      median: null,
      high: null,
    },
    totalPrice: {
      low: null,
      median: null,
      high: null,
    }
  })

  const state = {
    airlineIsChecked: false,
    hotelIsChecked: false,
    }
  
  // Takes the results from the apiFunc function and parses the information into states 
  const airlineFunc = () => {
    state.airlineIsChecked = !state.airlineIsChecked;
    const airline = document.getElementById('airlineArray')
    if(state.airlineIsChecked === true) {
        airline.style.display = 'block'
        //airlineArray.push(<DropDown option= "Number of Travelers" key= 'airline'/>)
        console.log(airlineArray)
    } else {
        airline.style.display = 'none'
    }
}

  const hotelFunc =() => {
    state.hotelIsChecked = !state.hotelIsChecked;
    const hotel = document.getElementById('hotelsArray')
    if(state.hotelIsChecked === true) {
        //hotelsArray.push(<DropDown option= "Number of Passengers" key= 'hotels'/>)
        hotel.style.display = 'block'
    } else {
        hotel.style.display = 'none'
        
    }
}

  // conditional logic here or new components for what to display when checkbox is selected
 

  const todaysDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2,'0');
    const year = today.getFullYear();
    return `${year}-${month}-${day}`
  }




  return (
    <div className='page'>
      <h1>
        Nomad
      </h1>
      <h4>
        Your favorite vacation cost estimator
      </h4>
    <div className='container'>
      <div id='userInfo'>
        <div id='inputBoxes'>
          <Box display='flex' aligntems='center' width='auto' height ='15%'> 
            Destination: <TextField id='destinationBox' label='Destination' variant='filled'></TextField>
          </Box>
          <Box display='flex' alignItems='center' width='auto' height ='15%'>
            Starting Location:<TextField id='locationBox' label='Location' variant='filled'></TextField>
          </Box>
        </div>
        <div id='dates'>
          <DateSelector id='startDate' dateText = "Start Date" theDate={todaysDate()}/>
          <DateSelector id='endDate' dateText = "End Date" theDate={todaysDate()}/>
        </div>
        <div id='checkBoxes'>
          <Checkbox checkPrompt = "Include airfare?" randomLabel="Additional Information" onClickFunction={airlineFunc}/>
          <div id='boxTwo'>
          <Checkbox checkPrompt = "Include hotels?" randomLabel={""} onClickFunction={hotelFunc}/>
        </div>
      </div>
      <div id='optionalParam'>
        <div id='airlineArray'>
          <DropDown id='airlineDropDown'option= "Number of Passengers" key= 'airline'/>
        </div>
        <div id= 'hotelsArray'>
          <DropDown id='hotelDropDown'option= "Number of Rooms" key= 'hotels'/>
        </div>
      </div>
      </div>
        <div id='submitButton'>
          <Button variant='contained' color='primary' onClick={submitInfo}>Submit</Button>
        </div>
        <div id='responseInformation'>
          {submitState === true && 
              <p id='submitText'>
                Showing results for hotels near {hotelName} and round-trip flights from {airportStart} to {airportEnd} and back. Please refine your search parameters if these are not the locations you are looking for.
              </p> }
        </div>
        <div id='dataTable'>
          {submitState === true && <CustomizedTables apiResults={resultsObject}/> }
        </div>
      </div>
    </div>
  )
}

export default Container;