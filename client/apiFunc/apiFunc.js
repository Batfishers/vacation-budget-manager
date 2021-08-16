import 'regenerator-runtime/runtime';
/*
Accepts an object of user inputs with the following format:
const userInputs = {
  destination: string. max length 50. min length 3. Pattern: ^[a-zA-Z0-9_ ]*$,
  startLocation: string. max length 50. min length 3. Pattern: ^[a-zA-Z0-9_ ]*$,
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


async function getAirfareSummary(userInputs) {
  try {
    const flightSearch = await fetch(`https://priceline-com-provider.p.rapidapi.com/v1/flights/search?class_type=ECO&location_departure=${userInputs.flightStartLocationId}&itinerary_type=ROUND_TRIP&location_arrival=${userInputs.flightDestinationId}&date_departure=${userInputs.startDate.year}-${userInputs.startDate.month}-${userInputs.startDate.day}&sort_order=PRICE&number_of_passengers=${userInputs.numberOfTravelers}&date_departure_return=${userInputs.endDate.year}-${userInputs.endDate.month}-${userInputs.endDate.day}`, {
      "method": "GET",
      "headers": {
        "x-rapidapi-key": "fb0eb671b1msh36962598bcbff78p197cddjsn9955af070c1e",
        "x-rapidapi-host": "priceline-com-provider.p.rapidapi.com"
      }
    }).then((res => res.json()));
    // totalFare of pricedItinerary per traveler. Can be optimized to show airline chosen by getting one way info for destination flight and return flight
    console.log(flightSearch);
    const airfareSummary = {
      currency: flightSearch.pointOfSale.currency,
      exactDateMinTotalFareWithTaxesAndFees: flightSearch.filteredTripSummary.exactDateMinTotalFareWithTaxesAndFees,
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
    // add inputs
    const hotelSearch = await fetch(`https://priceline-com-provider.p.rapidapi.com/v1/hotels/search?location_id=${userInputs.hotelDestinationId}&date_checkin=${userInputs.startDate.year}-${userInputs.startDate.month}-${userInputs.startDate.day}&date_checkout=${userInputs.endDate.year}-${userInputs.endDate.month}-${userInputs.endDate.day}&sort_order=PRICE&rooms_number=${userInputs.numberOfRooms}`, {
      "method": "GET",
      "headers": {
        "x-rapidapi-key": "fb0eb671b1msh36962598bcbff78p197cddjsn9955af070c1e",
        "x-rapidapi-host": "priceline-com-provider.p.rapidapi.com"
      }
    }).then((res => res.json()));
    // return the lowest price, median price, and the highest price per room
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

async function getLocationId(locationString) {
  // convert spaces to %20 and commas to %2C
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
  // for hotelId, return the cityID (add itemName later) of the first element with the type: CITY
  for (const object of locationSearch) {
    if (object.type === 'CITY') {
      output.hotelSearchLocation = object.itemName;
      output.hotelLocationId = object.cityID;
      break;
    } 
  }
  // for airportCityId, return the id (add itemName later) of the first element with the type: AIRPORT
  for (const object of locationSearch) {
    if (object.type === 'AIRPORT') {
      output.flightSearchLocation = object.itemName;
      output.flightLocationId = object.id;
      break;
    } 
  }
  return output;
} catch(e) {
  console.log(e);
  return 'Error getting location data from API.'
}
}

async function apiFunc(userInputs) {
  // TEST userInputs
  // const userInputs = {
  //   destination: 'Denver, Colorado',
  //   startLocation: 'New Orleans',
  //   startDate: {
  //     month: 11,
  //     day: 5,
  //     year: 2021
  //   },
  //   endDate: {
  //     month: 11,
  //     day: 7,
  //     year: 2021
  //   },
  //   numberOfTravelers: 4,
  //   numberOfRooms: 2
  // }
  // get the destinationIds and startLocationIds (at the same time using Promise.all)
  const [destinationIdObj, startLocationIdObj] = await Promise.all([getLocationId(userInputs.destination), getLocationId(userInputs.startLocation)]);

  userInputs.hotelDestinationId = destinationIdObj.hotelLocationId;
  userInputs.flightDestinationId = destinationIdObj.flightLocationId;
  userInputs.flightStartLocationId = startLocationIdObj.flightLocationId;

  const hotelPriceSummary = await getHotelPriceSummary(userInputs);
  const airfareSummary = await getAirfareSummary(userInputs);

  return {
    airfareSummary,
    hotelPriceSummary,
  }
}

export default apiFunc;