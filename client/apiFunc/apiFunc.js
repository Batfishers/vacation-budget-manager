import 'regenerator-runtime/runtime';
/*
apiFunc accepts an object of user inputs with the following format:
const userInputs = {
  destination: string. max length 50. min length 3,
  startLocation: string. max length 50. min length 3,
  startDate: {
    month: **,
    day: **,
    year: ****
  },
  endDate: {
    month: **,
    day: **,
    year: ****
  },
  numberOfTravelers: number,
  numberOfRooms: number,
  airlineIsChecked: boolean,
  hotelIsChecked: boolean
}
*/

async function apiFunc(userInputs) {
  // get the destinationIds and startLocationIds (at the same time using Promise.all)
  const [
    startLocationFlightIdObj, 
    destinationFlightIdObj,
    destinationHotelIdObj
  ] = await Promise.all([
    getFlightLocationId(userInputs.startLocation), 
    getFlightLocationId(userInputs.destination),
    getHotelLocationId(userInputs.destination)
  ]);
  // add the location ids to userInputs so that userInputs can be passed into functions that call API for price data
  userInputs.flightStartLocationId = startLocationFlightIdObj.flightLocationId;
  userInputs.flightDestinationId = destinationFlightIdObj.flightLocationId;
  userInputs.hotelDestinationId = destinationHotelIdObj.hotelLocationId;
  let airfareSummary;
  let hotelPriceSummary;
  // only get airfare/hotel prices if the user checked the boxes for them - this reduces unnecessary fetch calls
  // see getAirfareSummary and getHotelPriceSummary in this file for output structures
  if (userInputs.airlineIsChecked && userInputs.hotelIsChecked) {
    [airfareSummary, hotelPriceSummary] = await Promise.all([getAirfareSummary(userInputs), getHotelPriceSummary(userInputs)]);
  } else if (userInputs.airlineIsChecked) {
    airfareSummary = await getAirfareSummary(userInputs);
  } else if (userInputs.hotelPriceSummary) {
    hotelPriceSummary = await getHotelPriceSummary(userInputs);
  }

  return {
    searchLocations: {
      startAirportName: startLocationFlightIdObj.flightSearchLocation,
      destinationAirportName: destinationFlightIdObj.flightSearchLocation,
      hotelSearchCityName: destinationHotelIdObj.hotelSearchLocation
    },
    hotelPriceSummary,
    airfareSummary,
  }
}

async function getFlightLocationId(locationString) {
  // convert spaces to %20 and commas to %2C to url encode input
  const urlEncodedLocation = locationString.replace(/,/g, '%2C').replace(/ /, '%20');
  try {
    const locationSearch = await fetch(`https://priceline-com-provider.p.rapidapi.com/v1/flights/locations?name=${urlEncodedLocation}`, {
      "method": "GET",
      "headers": {
        "x-rapidapi-key": "fb0eb671b1msh36962598bcbff78p197cddjsn9955af070c1e",
        "x-rapidapi-host": "priceline-com-provider.p.rapidapi.com"
      }
    }).then((res => res.json()));
    const output = {};
    // to get airport for flight price searches, return the id of the first element with the type: AIRPORT
    for (const object of locationSearch) {
      if (object.type === 'AIRPORT') {
        // save the name of the airport used for flight prices so that the user knows where the search is taking place. It can be different from input if input is not specific
        output.flightSearchLocation = object.itemName;
        // object.id looks like 'DEN' or 'LAX'. For hubs like NY, NY with multiple airports, it will be 'NYC', which searches all of NY's airports
        output.flightLocationId = object.id;
        break;
      } 
    }
    return output;
  } catch(e) {
    console.log(e);
    return 'Error getting flight location data from API.'
  }
}

async function getHotelLocationId(locationString) {
  // convert spaces to %20 and commas to %2C to url encode inputs
  const urlEncodedLocation = locationString.replace(/,/g, '%2C').replace(/ /, '%20');
  try {
    const locationSearch = await fetch(`https://priceline-com-provider.p.rapidapi.com/v1/hotels/locations?name=${urlEncodedLocation}`, {
      "method": "GET",
      "headers": {
        "x-rapidapi-key": "fb0eb671b1msh36962598bcbff78p197cddjsn9955af070c1e",
        "x-rapidapi-host": "priceline-com-provider.p.rapidapi.com"
      }
    }).then((res => res.json()));
    const output = {};
    // to get city Id for searching hotel prices, return the cityID of the first element with the type: CITY
    for (const object of locationSearch) {
      if (object.type === 'CITY') {
        // save the name of the city used for actual hotel search that the user knows where the search is taking place. It can be different from input if input is not specific
        output.hotelSearchLocation = object.itemName;
        // this cityId is a number that the API uses to identify a city
        output.hotelLocationId = object.cityID;
        break;
      } 
    }
    return output;
  } catch(e) {
    console.log(e);
    return 'Error getting hotel location data from API.'
  }
}

async function getAirfareSummary(userInputs) {
  try {
    // flights are sorted by PRICE
    const flightSearch = await fetch(`https://priceline-com-provider.p.rapidapi.com/v1/flights/search?class_type=ECO&location_departure=${userInputs.flightStartLocationId}&itinerary_type=ROUND_TRIP&location_arrival=${userInputs.flightDestinationId}&date_departure=${userInputs.startDate.year}-${userInputs.startDate.month}-${userInputs.startDate.day}&sort_order=PRICE&number_of_passengers=${userInputs.numberOfTravelers}&date_departure_return=${userInputs.endDate.year}-${userInputs.endDate.month}-${userInputs.endDate.day}`, {
      "method": "GET",
      "headers": {
        "x-rapidapi-key": "fb0eb671b1msh36962598bcbff78p197cddjsn9955af070c1e",
        "x-rapidapi-host": "priceline-com-provider.p.rapidapi.com"
      }
    }).then((res => res.json()));
    // totalFare of round-trip pricedItinerary per traveler. Only includes flights that have the number of seats needed
    // the pricline API only provides the airline(s) of the destination flight(s), not the return flights, so the current implementation doesn't use that information.
    // Can be optimized to show airlines for both destination and return flights by getting one way ticket info for destination flight and return flight individually (two fetch requests)
    const airfareSummary = {
      currency: flightSearch.pointOfSale.currency,
      // exactDateMinTotalFareWithTaxesAndFees is assumed to be the minimum price that gets you to your location without overnight layovers
      exactDateMinTotalFareWithTaxesAndFees: flightSearch.filteredTripSummary.exactDateMinTotalFareWithTaxesAndFees,
      medianTotalFareWithTaxesAndFees: flightSearch.pricedItinerary[Math.floor(flightSearch.pricedItinerary.length / 2)].pricingInfo.totalFare,
      maxTotalFareWithTaxesAndFees: flightSearch.filteredTripSummary.maxTotalFareWithTaxesAndFees
    }
    return airfareSummary;
  } catch(e) {
    console.log(e);
    return 'Error getting flight data from API. Please try again or try different options.'
  }
}

async function getHotelPriceSummary(userInputs) {
  try {
    const hotelSearch = await fetch(`https://priceline-com-provider.p.rapidapi.com/v1/hotels/search?location_id=${userInputs.hotelDestinationId}&date_checkin=${userInputs.startDate.year}-${userInputs.startDate.month}-${userInputs.startDate.day}&date_checkout=${userInputs.endDate.year}-${userInputs.endDate.month}-${userInputs.endDate.day}&sort_order=PRICE&rooms_number=${userInputs.numberOfRooms}`, {
      "method": "GET",
      "headers": {
        "x-rapidapi-key": "fb0eb671b1msh36962598bcbff78p197cddjsn9955af070c1e",
        "x-rapidapi-host": "priceline-com-provider.p.rapidapi.com"
      }
    }).then((res => res.json()));
    // return the lowest price, median price, and the highest price per room.
    // these are the minimum room rates for the least expensive hotel, the most expensive hotel, and the median price hotel.
    // add currency
    const hotelPriceSummary = {
      lowPrice: hotelSearch.hotels[0].ratesSummary.minPrice,
      medianPrice: hotelSearch.hotels[Math.floor((hotelSearch.hotels.length - 1) / 2)].ratesSummary.minPrice,
      highPrice: hotelSearch.hotels[hotelSearch.hotels.length - 1].ratesSummary.minPrice
    }
    return hotelPriceSummary; 
  } catch(e) {
    console.log(e);
    return 'Error getting hotel data from API.'
  }
}

export default apiFunc;