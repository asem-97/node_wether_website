const request = require('request');
const forecast = (latitude,longitude, callback)=>{
    const url = 'https://api.weatherapi.com/v1/forecast.json?key=9e414d68b97b4bd480f173856232403&q='+encodeURIComponent(latitude) +','+encodeURIComponent(longitude);
    request({url:url , json:true } , (error, response)=>{
        if(error){
            callback('Unable to connect to location services', undefined);
        }else if(response.body.error){
            callback('Unable to find location try another search [ ] ', undefined);
        }else{
            callback(undefined ,response.body.forecast.forecastday[0].day.condition.text );
        }
    });
};

module.exports = forecast