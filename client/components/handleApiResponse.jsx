import React, { Component, useState } from 'react';


export default function handleApiResponse(response){

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
    setHotelName(response.searchLocations.hotelSearchCityName);
    setAirportStart(response.searchLocations.startAirportName);
    setAirportEnd(response.searchLocations.destinationAirportName);

    console.log('Storing Results from API:');
    console.log(resultsObject);
  }
