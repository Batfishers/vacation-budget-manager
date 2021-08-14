import React, { Component, useState } from 'react';
import { TextField, Box, Paper } from '@material-ui/core';
import Checkbox from './Checkbox.js';
import DateSelector from './DateSelector.jsx'
import DropDown from './DropDown.js'

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
        console.log('airline check on')
        airline.style.display = 'block'
        //airlineArray.push(<DropDown option= "Number of Travelers" key= 'airline'/>)
        console.log(airlineArray)
    } else {
        console.log('airline check off')
        airline.style.display = 'none'
    }
}

const hotelFunc =() => {
    state.hotelIsChecked = !state.hotelIsChecked;
    const hotel = document.getElementById('hotelsArray')
    if(state.hotelIsChecked === true) {
        console.log('hotel checked on');
        //hotelsArray.push(<DropDown option= "Number of Passengers" key= 'hotels'/>)
        hotel.style.display = 'block'
        console.log(hotelsArray)
    } else {
        console.log('hotel checked off')
        hotel.style.display = 'none'
        
    }
}
  return (
    <div className='container'>
      <div id='inputBoxes'>
      <Box display='flex' alignItems='center' width='auto' height ='15%'>
        Destination: <TextField id='destinationBox' label='Destination' variant='filled'></TextField>
        Curent Location:<TextField id='locationBox' label='Location' variant='filled' type='password'></TextField>
      </Box>
      </div>
      <div id='dates'>
        <DateSelector dateText = "Start Date"/>
        <DateSelector dateText = "End Date"/>
      </div>
      <div id='checkBoxes'>
        <Checkbox checkPrompt = "Include airfare?" randomLabel="Additional Information" onClickFunction={airlineFunc}/>
        <div id='boxTwo'>
        <Checkbox checkPrompt = "Include hotels?" randomLabel={""} onClickFunction={hotelFunc}/>
        </div>
        {/* Number of Travelers: <TextField id='destinationBox' label='Number' variant='filled' disabled id="standard-Disabled"></TextField> */}
      </div>
      <div id='airlineArray'>
        <DropDown option= "Number of Travelers" key= 'airline'/>
      </div>
      <div id= 'hotelsArray'>
        <DropDown option= "Number of Passengers" key= 'hotels'/>
      </div>
    </div>
  )
}

export default Container;