const mongoose = require('mongoose');

const MONGO_URI = 'mongodb+srv://jareddlewis:MongoPassword1$@vacation.2l9uh.mongodb.net/Vacation?retryWrites=true&w=majority';

mongoose.connect(MONGO_URI, {
  // options for the connect method to parse the URI
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // sets the name of the DB that our collections are part of
  dbName: 'Vacation'
})
  .then((data) => console.log('Connected to Mongo DB.'))
  .catch(err => {
    console.log(err);
    console.log('Error with the mongoose connection within mongoose.connect.');
  });

const Schema = mongoose.Schema;
const SALT_WORK_FACTOR = 10;
const bcrypt = require('bcryptjs');

const userSchema = new Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  searchHistory: [
    {
      infoObj: { // search input
        destination: String,
        startLocation: String,
        startDate: {
          month: String,
          day: String,
          year: String,
        },
        endDate: {
          month: String,
          day: String,
          year: String
        },
        numberOfTravelers: String,
        numberOfRooms: String,
        airlineIsChecked: Boolean,
        hotelIsChecked: Boolean
      },
      apiResults: { //search output
        searchLocations: {
          hotelSearchCityName: String,
          startAirportName: String,
          destinationAirportName: String,
        },
        hotelPriceSummary: {
          lowPrice: Number,
          medianPrice: Number,
          highPrice: Number
        },
        airfareSummary: {
          currency: Number,
          exactDateMinTotalFareWithTaxesAndFees: Number,
          medianTotalFareWithTaxesAndFees: Number,
          maxTotalFareWithTaxesAndFees: Number
        }
      }
    }
  ] 
});

userSchema.pre('save', function(next) {
  bcrypt.hash(this.password, SALT_WORK_FACTOR, (err, hash) => {
    if (err) return next('Error in userSchema.pre: ' + JSON.stringify(err));
    this.password = hash;
    return next();
  })
})

const User = mongoose.model('user', userSchema);

const testSchema = new Schema({
  test: String,
});

const Test = mongoose.model('test', testSchema);

module.exports = {
  User,
  Test
};
