const request = require("postman-request");

const forecast = (latitude, longitude, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=" +
    process.env.FORECAST_ACCESS_KEY +
    "&query=" +
    latitude +
    "," +
    longitude +
    "&units=f";

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to weather service!", undefined);
    } else if (body.error) {
      callback("Unable to find location. Please try another place.", undefined);
    } else {
      callback(
        undefined,
        body.current.weather_descriptions[0] +
          " throughtout the day. It is currently " +
          body.current.temperature +
          " degrees farenheit. But feels like " +
          body.current.feelslike +
          " degrees farenheit with a humidity of " +
          body.current.humidity +
          "%."
      );
    }
  });
};

module.exports = forecast;
