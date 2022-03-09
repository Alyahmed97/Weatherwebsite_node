const express=require('express')
//const { path } = require('express/lib/application')
const path = require('path')
const hbs=require('hbs')
const geocode=require('./utils/geocode.js')
const forecast=require('./utils/forecast.js')
console.log(__dirname)
console.log(__filename)



//console.log(path.join(__dirname,'../public'))
const app =express()
const port=process.env.PORT || 3000

//Define paths for express config
const publicdirpath=path.join(__dirname,'../public')
const viewspath=path.join(__dirname,'../templates/views')
const partailspath=path.join(__dirname,'../templates/partials')


//setup handelbars
app.set('view engine','hbs')
app.set('views',viewspath)
hbs.registerPartials(partailspath)

//Setup static directory to use
app.use(express.static(publicdirpath))
app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather app',
        name:'Aly'
    })
})
app.get('/about',(req,res)=>
{
    res.render('about',{
        title:'About me',
        name:'Aly'
    })
})
app.get('/help',(req,res)=>
{
    res.render('help',{
        title:'Help page',
        body:'Hello here you can ask about what you want'
        ,name:' Aly'
    })
})
/* app.get('',(req, res)=>{
      res.send('<h1>Reached</h1>')
}) */
/* app.get('/help',(req,res)=>
{
//res.send('Help page')
res.send([{name:'Aly'},
{age:24}])
})
app.get('/about',(req,res)=>
{
res.send('<h1>About page</h1>')
}) */
app.get('/weather',(req,res)=>
{
    if(!req.query.address) {
        return  res.send(
              {
                  error:"You must provide address"
              }
          ) 
       }
       else{
        geocode(req.query.address,(error,{lat,long,location}={})=>
        {
            if (error)
            {
                return res.send({error})
            }
            
            forecast(lat,long,(error,foredata)=>
        {
            if (error)
            {
                return console.log(error)
            }

                res.send({
                forecast:foredata,location,
                address:req.query.address})
        
        })
        
        }) }
    
/* res.send({forecast:"Looks clear",
location:'cairo',
address:req.query.address})
}) */})





app.get('/products',(req,res)=>
{
    if(!req.query.search) {
     return  res.send(
           {
               error:"You must provide error message"
           }
       ) 
    }
    console.log(req.query.search)
    res.send(
        {products:[]}       
    )//can't send twice willl generat an error 'cannot set header error'
})
app.get('/help/*',(req,res)=>
{
    res.send('404',{
        title:'Help article not found',
        name:'Aly',
        errormessage:'Sorry for inconvinence'
    })
})
app.get('*',(req,res)=>{

    res.send('404',{
        title:'Page not found',
        name: 'Aly',
        errormessage:'Sorry for inconvinence'
    })
    
})// * wild card character for replacing anything not mentioned above, must be at last
app.listen(port,()=>{
    console.log('server is up, this is only for the developer not displayed on the website')
})