const request = require('request')

const forecast = (lat, lon, callback) => {
    const url = 'https://api.darksky.net/forecast/4c03caa75525e8c43fe36cd67902de09/' + lat + ',' + lon + '?units=si'

    request({url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather data', undefined)
        } else if (body.error) {
            callback('Invalid location data', undefined)
        } else {
            callback(undefined, {

                // TODO - Refactor body response
                summary: body.currently.summary,
                temperature: body.currently.temperature,
                tempMax: body.daily.data[0].temperatureHigh,
                tempMin: body.daily.data[0].temperatureLow,
                rainChance: body.currently.precipProbability*100
            })
        }
    })
}

module.exports = forecast