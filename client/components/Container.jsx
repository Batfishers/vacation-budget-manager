import React, { Component, useState } from 'react';
import { TextField, Box, Paper } from '@material-ui/core';
import Checkbox from './Checkbox.js';
import DateSelector from './DateSelector.jsx';
import DropDown from './DropDown.js';
import Button from '@material-ui/core/Button';

function Container() {
  const state = {
    airlineIsChecked: false,
    hotelIsChecked: false
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

  const submitInfo =() => {
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
      numberOfRooms:null
    };

    console.log(infoObj);
    //const userDestination = document.getElementById('destinationBox')
    //
    const userDestination = document.getElementById('destinationBox').value;
    infoObj.destination = userDestination;
    console.log('below is new obj')
    console.log(infoObj);
    return infoObj;
  }


  return (
    <div className='container'>
      <div id='userInfo'>
      <div id='inputBoxes'>
      <Box display='flex' alignItems='center' width='auto' height ='15%'>
        Destination: <TextField id='destinationBox' label='Destination' variant='filled'></TextField>
        Starting Location:<TextField id='locationBox' label='Location' variant='filled'></TextField>
      </Box>
      </div>
      <div id='dates'>
        <DateSelector dateText = "Start Date" theDate={todaysDate()}/>
        <DateSelector dateText = "End Date" theDate={todaysDate()}/>
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
        <DropDown option= "Number of Passengers" key= 'airline'/>
      </div>
      <div id= 'hotelsArray'>
        <DropDown option= "Number of Rooms" key= 'hotels'/>
      </div>
      </div>
      </div>
      <div id='submitButton'>
      <Button variant='contained' color='primary' onClick={submitInfo}>Submit</Button>
      </div>
    </div>
  )
}

export default Container;