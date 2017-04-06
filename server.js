const bodyParser = require('body-parser');
const jsonParser = bodyParser.json();
const express = require('express');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
//const {DATABASE_URL, PORT} = require('./config');
const {Instrument} = require('./models');
const config = require("./config");
const DATABASE_URL = config.DATABASE_URL;
const PORT = config.PORT;

const app = express();
app.use(express.static('public'));
app.use(bodyParser.json());




app.get('/instruments', (req, res) => {
    Instrument
    .find()
    //.limit(10)
    .exec()
    .then(instruments => {
        res.json({
            instruments: instruments.map(
                (instrument) => instrument.apiRepr())
        });
    })
    .catch(
        err => {
            console.error(err);
            res.status(500).json(err);
        });
});


app.get('/instruments/:itemNum', (req, res) => {
  Instrument
    .find({itemNum: req.params.itemNum})
    .exec()
    .then(instruments => {
        res.json({
          instruments: instruments.map(
                (instrument) => instrument.apiRepr())
        });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json(err);
    });
});


app.post('/instruments', jsonParser, (req, res) => {
  console.log(req.body);
  if (!('itemNum' in req.body)) { return res.status(400).send('missing itemNum'); }
  if (!('model' in req.body)) { return res.status(400).send('missing model'); }
  if (!('company' in req.body)) { return res.status(400).send('missing company'); }
  if (!('loc' in req.body)) { return res.status(400).send('missing location'); }
  Instrument
    .create({
      itemNum: req.body.itemNum,
      model: req.body.model,
      company: req.body.company,
      loc: req.body.loc,
    })
    .then(Instrument => res.status(201).json(Instrument.apiRepr()))
    .catch(err => {
        console.error(err);
        res.status(500).json(err);
    });  
});  

app.put('/instruments', jsonParser, (req, res) => {
  console.log(req.body);
  const updated = {};
  const updateableField = ['loc'];
  updateableField.forEach(field => {
    if (field in req.body) {
      updated[field] = req.body[field];
    }
  });

  Instrument
    .findOneAndUpdate(req.params.itemNum, {$location: updated}, {new: true})
    .exec()
    .then(updatedPost => res.status(201).json(updatedPost.apiRepr()))
    .catch(err => res.status(500).json(err));
});




app.delete('/instruments', (req, res) => {
  Instrument
    .findOneAndRemove(req.params.itemNum)
    .exec()
    .then(() => {
      res.status(204).json({message: 'success'});
    })
    .catch(err => {
      console.error(err);
      res.status(500).json(err);
    });
});


/*  const updated = {};
  const updateableFields = ['location', 'itemNum'];
  updateableFields.forEach(field => {
    if (field in req.body) {
      updated[field] = req.body[field];
    }
  });

*/





// closeServer needs access to a server object, but that only
// gets created when `runServer` runs, so we declare `server` here
// and then assign a value to it in run
var server;

// this function connects to our database, then starts the server
function runServer(callback) {
  return new Promise((resolve, reject) => {
    mongoose.connect(DATABASE_URL, err => {
      if (err) {
        return reject(err);
      }
      server = app.listen(PORT, () => {
        console.log(`Your app is listening on port ${PORT}`);
        resolve();
      })
      .on('error', err => {
        mongoose.disconnect();
        reject(err);
      });
    });
  });
}

// this function closes the server, and returns a promise. we'll
// use it in our integration tests later.
function closeServer() {
  return mongoose.disconnect().then(() => {
     return new Promise((resolve, reject) => {
       console.log('Closing server');
       server.close(err => {
           if (err) {
               return reject(err);
           }
           resolve();
       });
     });
  });
}

// if server.js is called directly (aka, with `node server.js`), this block
// runs. but we also export the runServer command so other code (for instance, test code) can start the server as needed.
if (require.main === module) {
  runServer().catch(err => console.error(err));
};

module.exports = {runServer, app, closeServer};