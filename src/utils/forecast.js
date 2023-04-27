const request = require("request");

const forecast = (lat, long, callback) => {
    const url =
        "http://api.weatherstack.com/current?access_key=eb43b21692a35fff42281452046d1c5a&query=" +
        lat +
        "," +
        long;

    request({ url, json: true }, (error, { body }) => {
        if (error) {
            callback("Unable to connect to weather service!", undefined);
        } else if (body.error) {
            callback(
                "Unable to find the location. Try another search.",
                undefined
            );
        } else {
            callback(
                undefined,
                `${body.current.weather_descriptions[0]}. It is currently ${body.current.temperature} degress out. It feels like ${body.current.feelslike} degrees out. The wind speed is ${body.current.wind_speed}, and the humidity is ${body.current.humidity}%.`
            );
        }
    });
};

module.exports = forecast;
