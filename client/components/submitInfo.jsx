import handleApiResponse from './handleApiResponse.jsx'
import React, { Component, useState } from 'react';
export default async function submitInfo() {
    //create and return object with user information
    //edge case to check if they try to submit with hotels/airfare checked but options not selected
    const state = {
        airlineIsChecked: false,
        hotelIsChecked: false,
        }
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

    // pass the results of apiFunc into our handle function that will parse and set the states of relevant variables
    handleApiResponse(apiResults);

    // changes the state of the Submit button from false to true for conditional rendering
    setSubmit(true);

    return infoObj;
  }