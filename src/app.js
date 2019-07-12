const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
//const fs = require('fs')

//Define paths for Express configuration
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

const app = express()
const port = process.env.PORT || 3000

//Setup Handlebars Template Engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

//Static Directory Serving
app.use(express.static(publicDirectoryPath))


//Served via Handlebars
app.get('', (reg, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Dan'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: 'Daniel'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page',
        name: 'Daniel',
        helpText: 'Welcome to the help page :)'
    })
})

//Weather Page Request
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'Must provide Address / Location'
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({
                error: 'An error occured while fetching the geolocation'
            })
        }

        forecast(latitude, longitude, (error, {summary, temperature, rainChance} = {}) => {
            if (error) {
                return res.send({
                    error: 'An error occured while fetching weather data'
                })
            }

            return res.send({
                address: req.query.address,
                location,
                summary,
                temperature,
                rainChance
            })
        })

    })

    // res.send({
    //     address: req.query.address,
    //     location: 'Melbourne',
    //     forecast: 23
    // })
    // console.log('Weather Page Requested')
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'No search term provided'
        })
    }

    res.send({
        products: []
    })

    console.log(req.query)
})

//Error Handlers
app.get('/help/*', (req, res) => {
    res.render('error', {
        title: 'Page not found',
        name: 'Daniel',
        errorText: 'The help article could not be found'
    })
})

app.get('*', (req, res) => {
    res.render('error', {
        title: '404 Page not Found',
        name: 'Daniel',
        errorText: 'The destination page could not be found!'
    })
})

//Server Listening on Port 3000
app.listen(port, () => {
    console.log('Server Started on Port %i', port)
})