const path = require('path')
const express = require('express')
const hbs= require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app =express()

//7.3:
//app.com
// app.get('',(req,res)=>{
//     res.send('<h1> Weather </h1>')
// })

// app.get('/help',(req,res)=>{
//     res.send({
//         name:'as',
//         age:'ee'
//     })
// })

// app.get('/about',(req,res)=>{
//     res.send('about !')
// })

// app.get('/weather',(req,res)=>{
//     res.send('weather !')
// })

// app.listen(3000,()=>{
//     console.log('Server is up on port 3000.')
// })



//7.4:  remove all routes theat serve up html and use the following :(this after creating the public folder)
// app.use(express.static(path.join(__dirname,"../public")))
// app.get('/help',(req,res)=>{
//     res.send({
//         name:'as',
//         age:'ee'
//     })
// })



// app.listen(3000,()=>{
//     console.log('Server is up on port 3000.')
// })


//7.6: Using temaplates : here we will serve views => create views folder and serve the views :
// app.set("view engine","hbs")
// app.set("views",path.join(__dirname,"../views"))

// app.get('',(req,res)=>{
//     res.render("index",{
//         title:'as',
//         name:'Asem Dreibati'
//     })
// })

// app.listen(3000,()=>{
//     console.log('Server is up on port 3000.')
// })


//7.8 : Define partials :

//Define path for Express config
const publicDirectoryPath=path.join(__dirname,'../public')
const viewPath=path.join(__dirname,'../templates/views')
const partialsPath=path.join(__dirname,'../templates/partials')

// Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))//infex.html in public folder 

app.get('/',(req,res)=>{
    res.render("index",{
        title:'as',
        name:'Asem Dreibati'
    })
})

app.get('/about',(req,res)=>{
    res.render("about",{
        title:'as',
        name:'Asem Dreibati'
    })
})

app.get('/help',(req,res)=>{
    res.render("help",{
        helpText:'helpful text ...',
        title:'as',
        name:'Asem Dreibati'
    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:'You must provide an address!'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error,forecastData)=>{
            if(error){
                return res.send({error})
            }
            //console.log(req.query.address,forecastData,location)
            res.send({
                forecast:forecastData,
                location,
                address:req.query.address
            })
           // console.log(res)
        })
    })
    // res.send({
    //     forecast:"It is snowing",
    //     location:'Philadelphia',
    //     address:req.query.address
    // })
})

app.get('/help/*',(req,res)=>{
    res.render("404",{
        title:'404',
        name:'Asem Dreibati',
        errorMessage:'Help page not found !'
    })
})

app.get('*',(req,res)=>{
    res.render("404",{
        title:'404',
        name:'Asem Dreibati',
        errorMessage:'Page not found !'
    })
})

app.listen(3000,()=>{
    console.log('Server is up on port 3000.')
})