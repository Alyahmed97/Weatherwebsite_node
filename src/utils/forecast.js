const request=require('request')
const forecast=(lat,long,callback)=>
{
   const url=
     'http://api.weatherstack.com/current?access_key=1bbc95ea3a3f75b2ed7308f4cb58067c&query='+encodeURIComponent(lat) +','+ encodeURIComponent(long)+'&units=m'
  // http://api.weatherstack.com/current?access_key=1bbc95ea3a3f75b2ed7308f4cb58067c&query=30.0444,31.2357&units=m
   request({url,json:true},(error,{body})=>
   {
       if(error)
       {
        callback('Unable to connect',undefined)

       }
       else if(body.error)
       {
           //console.log(response.body.error)
           callback('unable to find location',undefined)
       }
       else
       {
           callback(undefined, body.current.weather_descriptions[0] + ' It is currently ' + body.current.temperature + ' degress out. Wind speed= ' + body.current.wind_speed 
        )}
   })
}
module.exports=forecast
