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
var axios = require("axios").default;
// define a function to get the destination and current locations
function getLocationId(userInputs) {
  // if the input has anything other than nums, letters, spaces and commas, return a response string
  // convert spaces to %20 and commas to %2C
  // fetch from hotel locations API

  var options = {
    method: 'GET',
    url: 'https://priceline-com-provider.p.rapidapi.com/v1/cars-rentals/locations',
    params: {name: 'London'},
    headers: {
      'x-rapidapi-key': 'fb0eb671b1msh36962598bcbff78p197cddjsn9955af070c1e',
      'x-rapidapi-host': 'priceline-com-provider.p.rapidapi.com'
    }
  };

  axios.request(options).then(function (response) {
    console.log(response.data);
  }).catch(function (error) {
    console.error(error);
  });

}

getLocationId();