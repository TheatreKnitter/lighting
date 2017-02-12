const bodyParser = require('body-parser');
const express = require('express');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const {DATABASE_URL, PORT} = require('./config');
const {Instrument} = require('./models');

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
            res.status(500).json({message: 'internal server error'});
        });
});


app.get('/instruments/:id', (req, res) => {
  Instrument
    .findById(req.params.id)
    .exec()
    .then(instruments => {
        res.json({
          instruments: instruments.map(
                (instrument) => instrument.apiRepr())
        });
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({error: 'internal server error'});
    });
});


app.post('/instruments', (req,res) => {
  Instrument
    .create({
      model: req.body.model,
      company: req.body.company,
      location: req.body.loc,
    })
    .then(Instrument => res.status(201).json(Instrument.apiRepr()))
    .catch(err => {
        console.error(err);
        res.status(500).json({error: 'Something went wrong'});
    });  
});  




app.delete('/posts/:id', (req, res) => {
  Instrument
    .findByIdAndRemove(req.params.id)
    .exec()
    .then(() => {
      res.status(204).json({message: 'success'});
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({error: 'something went terribly wrong'});
    });
});


/*  const updated = {};
  const updateableFields = ['location', 'id'];
  updateableFields.forEach(field => {
    if (field in req.body) {
      updated[field] = req.body[field];
    }
  });

  Instrument
    .findByIdAndUpdate(req.params.id, {$set: updated}, {new: true})
    .exec()
    .then(updatedPost => res.status(201).json(updatedPost.apiRepr()))
    .catch(err => res.status(500).json({message: 'Something went wrong'}));
});*/





// closeServer needs access to a server object, but that only
// gets created when `runServer` runs, so we declare `server` here
// and then assign a value to it in run
let server;

// this function connects to our database, then starts the server
function runServer(databaseUrl=DATABASE_URL, port=PORT) {
  return new Promise((resolve, reject) => {
    mongoose.connect(databaseUrl, err => {
      if (err) {
        return reject(err);
      }
      server = app.listen(port, () => {
        console.log(`Your app is listening on port ${port}`);
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