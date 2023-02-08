const express = require('express');

const hbs = require('hbs');
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');

const app = express();
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.static(path.join(__dirname, 'public')));

// Register the location for handlebars partials here:

hbs.registerPartials(__dirname + "/views/partials");

// Add the route handlers here:

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/beers', (req, res) => {
  punkAPI.getBeers()
    .then((beer) => {
      console.log(beer)
      res.render('beers', beer);
    })
    .catch(err => console.log("error: ", err))

})

app.get('/random-beer', (req, res) => {
  punkAPI.getRandom()
    .then((randomBeer) => {
      console.log(randomBeer)
      // res.render('random-beer', { random: randomBeer })
      res.render('random-beer', randomBeer[0])
    })
    .catch(err => console.log("error: ", err))
})

app.listen(3000, () => console.log('🏃‍ on port 3000'));
