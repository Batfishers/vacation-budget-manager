import 'regenerator-runtime/runtime';
/*
Accepts an object of user inputs with the following format:
const userInputs = {
  destination: string. max length 50. min length 3. Pattern: ^[a-zA-Z0-9_ ]*$,
  currentLocation: string. max length 50. min length 3. Pattern: ^[a-zA-Z0-9_ ]*$,
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
  numberOfRooms: number
}
*/
async function apiFunc() {
  const userInputs = {
    destination: 'Denver, Colorado',
    startLocation: 'New Orleans',
    startDate: {
      month: 11,
      day: 5,
      year: 2021
    },
    endDate: {
      month: 11,
      day: 7,
      year: 2021
    },
    numberOfTravelers: 4,
    numberOfRooms: 2
  }
  const [min, median, max] = await getHotelPrices(userInputs);
  console.log('min: ', min, 'median: ', median, 'max: ', max);
}

async function getHotelPrices(userInputs) {
  try {
    const destinationId = await getLocationId(userInputs.destination);
    // add inputs
    const hotelSearch = await fetch(`https://priceline-com-provider.p.rapidapi.com/v1/hotels/search?location_id=${destinationId}&date_checkin=${userInputs.startDate.year}-${userInputs.startDate.month}-${userInputs.startDate.day}&date_checkout=${userInputs.endDate.year}-${userInputs.endDate.month}-${userInputs.endDate.day}&sort_order=PRICE&rooms_number=${userInputs.numberOfRooms}`, {
      "method": "GET",
      "headers": {
        "x-rapidapi-key": "fb0eb671b1msh36962598bcbff78p197cddjsn9955af070c1e",
        "x-rapidapi-host": "priceline-com-provider.p.rapidapi.com"
      }
    }).then((res => res.json()));
    // return the lowest price, median price, and the highest price
    const lowPrice = hotelSearch.hotels[0].ratesSummary.minPrice;
    const medianPrice = hotelSearch.hotels[Math.floor((hotelSearch.hotels.length - 1) / 2)].ratesSummary.minPrice;
    const highPrice = hotelSearch.hotels[hotelSearch.hotels.length - 1].ratesSummary.minPrice;
    return [lowPrice, medianPrice, highPrice]; 
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
  // return the cityID and itemName of the first element with the type: CITY
  for (const object of locationSearch) {
    if (object.type === 'CITY') return object.cityID;
  }
} catch(e) {
  console.log(e);
  return 'Error getting location data from API.'
}
}

export default apiFunc;