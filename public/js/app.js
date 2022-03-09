console.log('client side javascript file is loaded')
/* fetch('http://puzzle.mead.io/puzzle').then((response)=>{
response.json().then((data)=>{
console.log(data)
})
}) */

const weatherform=document.querySelector('form')
const search=document.querySelector('input')
const msg1=document.querySelector('#msg1')
const msg2=document.querySelector('#msg2')
const msg3=document.querySelector('#msg3')
const msg4=document.querySelector('#msg4')
//msg1.textContent='From js'

weatherform.addEventListener('submit',(e)=>
{
    e.preventDefault()
    const location=search.value
    msg1.textContent='Loading...'
    msg2.textContent=' '
   
    fetch('/weather?address=' + location).then((response)=>{
      response.json().then((data)=>{
            if(data.error)
            {
                //console.log(data.error)
                msg1.textContent=data.error
            }
            else
            {
                msg1.textContent=data.location
                msg2.textContent=data.forecast.description[0]
                msg3.textContent="Feels like= "+data.forecast.feelslike
                msg4.textContent="Temprature= "+data.forecast.temperature
                //console.log(data.location)
                //console.log(data.forecast)
            }
        console.log(data.forecast)
        })
        })
            console.log(location)
        }
        )