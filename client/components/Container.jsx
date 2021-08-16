import React, { Component, useState } from 'react';
import { TextField, Box, Paper } from '@material-ui/core';
import 'regenerator-runtime/runtime';
import Checkbox from './Checkbox.js';
import DateSelector from './DateSelector.jsx';
import DropDown from './DropDown.js';
import Button from '@material-ui/core/Button';
import apiFunc from '../apiFunc/apiFunc.js';
import CustomizedTables from './DataTable.jsx'

function Container() {

  const [submitState, setSubmit] = useState(false);
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
    resultsObject: {
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
    }
  }

  const handleApiResponse = (response) => {

    const { airfarePrice, hotelPrice, totalPrice } = { ...resultsObject }

    airfarePrice.low = Math.floor(response.airfareSummary.exactDateMinTotalFareWithTaxesAndFees);
    airfarePrice.high = Math.floor(response.airfareSummary.maxTotalFareWithTaxesAndFees);
    airfarePrice.median = Math.floor(response.airfareSummary.medianTotalFareWithTaxesAndFees);

    hotelPrice.low = parseInt(response.hotelPriceSummary.lowPrice, 10);
    hotelPrice.high = parseInt(response.hotelPriceSummary.highPrice, 10);
    hotelPrice.median = parseInt(response.hotelPriceSummary.medianPrice, 10);

    totalPrice.low = Math.floor(airfarePrice.low + hotelPrice.low);
    totalPrice.high = Math.floor(airfarePrice.high + hotelPrice.high);
    totalPrice.median = Math.floor(airfarePrice.median + hotelPrice.median);

    setResults({airfarePrice, hotelPrice, totalPrice});
    console.log('Storing Results from API:');
    console.log(resultsObject);
  }

  //let airlineArray = ['poop'];
  //let hotelsArray = ['pee'];
  //conditional logic here or new components for what to display when checkbox is selected
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

  const todaysDate = () => {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0');
    const month = String(today.getMonth() + 1).padStart(2,'0');
    const year = today.getFullYear();
    return `${year}-${month}-${day}`
  }

  const submitInfo = async () => {
    //create and return object with user information
    //edge case to check if they try to submit with hotels/airfare checked but options not selected
    console.log('say hello')
    const infoObj = {
      destination:null,
      startLocation:null,
      startDate: {
        month:null,
        day:null,
        year:null,
      },
      endDate: {
        month:null,
        day:null,
        year:null
      },
      numberOfTravelers:null,
      numberOfRooms:null,
      airlineIsChecked: null,
      hotelIsChecked: null
    };

    console.log(infoObj);
    //const userDestination = document.getElementById('destinationBox')
    //
    const userDestination = document.getElementById('destinationBox').value;
    infoObj.destination = userDestination;

    const userLocation = document.getElementById('locationBox').value;
    infoObj.startLocation = userLocation;
    
    const startDate = document.getElementById('startDate').value;
    //console.log('this is the start date', startDate)
    infoObj.startDate.month = startDate.slice(0,2);
    infoObj.startDate.day = startDate.slice(3,5);
    infoObj.startDate.year = startDate.slice(6,10);

    const endDate = document.getElementById('endDate').value;
    //console.log('this is the start date', startDate)
    infoObj.endDate.month = endDate.slice(0,2);
    infoObj.endDate.day = endDate.slice(3,5);
    infoObj.endDate.year = endDate.slice(6,10);

    infoObj.airlineIsChecked = state.airlineIsChecked;
    infoObj.hotelIsChecked = state.hotelIsChecked;

    //first find the division with the id tags 'airlineArray' and 'hotelsArray' and save these to consts
    // perform (element).querySelector('input') and save to const. this gives us the input element inside each respective division
    // const.value 
    const airlineBox = document.getElementById('airlineArray');
    const airlineInput = airlineBox.querySelector('input');
    
    const hotelBox = document.getElementById('hotelsArray');
    const hotelInput = hotelBox.querySelector('input');

    if (infoObj.airlineIsChecked === true) infoObj.numberOfTravelers = airlineInput.value;
    if (infoObj.hotelIsChecked === true) infoObj.numberOfRooms = hotelInput.value

    console.log('below is new obj')
    console.log(infoObj);
    
    // call the imported apiFunc to get the cost estimate results from the priceline API
    const apiResults = await apiFunc(infoObj);
    console.log('below is apiResults', apiResults);

    handleApiResponse(apiResults);

    setSubmit(true);

    return infoObj;
  }


  return (
    <div className='page'>
      <h1>
        Vacation Budget Manager
      </h1>
    <div className='container'>
      <div id='userInfo'>
      <div id='inputBoxes'>
      <Box display='flex' alignItems='center' width='auto' height ='15%'>
        Destination: <TextField id='destinationBox' label='Destination' variant='filled'></TextField>
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
        {/* Number of Travelers: <TextField id='destinationBox' label='Number' variant='filled' disabled id="standard-Disabled"></TextField> */}
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
      <div id='dataTable'>
        {submitState === true && <CustomizedTables apiResults={resultsObject}/> }
      </div>
    </div>
    </div>
  )
}

export default Container;