const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const Cryptr = require('cryptr');
const cryptr = new Cryptr('myTotalySecretKey');

const app = express();

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/events-api', {
  useNewUrlParser: true
})
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

const Events = require('./models/Events');
const Login = require('./models/Login');

const PORT = process.env.PORT || 5000;

// CORS support
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, GET, PATCH, DELETE");
    return res.status(200).json({});
  }
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// User Login
app.post('/login', function (req, res) {
  if (req.body && req.body.username === '' && req.body.password === '') {
    res.statusCode = 400;
    res.json({ status: 'failure', message: 'User name and password should not be empty.' });
  } else {
    Login.find({ username: req.body.username }, (err, data) => {
      if (err) {
        res.statusCode = 500;
        res.json(err);
      } else if (data.length > 0 && req.body.password === cryptr.decrypt(data[0].password)) {
        data[0].password = cryptr.decrypt(data[0].password);
        const token = jwt.sign(data[0].toJSON(), 'skillathon', { expiresIn: 60 * 5 });
        res.json({ token: token, userDetails: data[0] });
      } else {
        res.statusCode = 404;
        res.json({ status: 'failure', message: 'Invalid username and password' });
      } 
    })
  }
});

// POST singUp
app.post('/signup', (req, res) => {
  if (req.body && req.body.username === '' && req.body.password === '') {
    res.json({ status: 'failure', message: 'User name and password should not be empty.' });
  } else {
    req.body.password = cryptr.encrypt(req.body.password);
    Login.create(req.body, (err, data) => {
      if (err) {
        res.statusCode = 400;
        res.json(err);
      } else {
        data.password = cryptr.decrypt(data.password);
        res.json(data);
      }
    });
  }
});

// Get all events Route
// TODO: Get all events
app.get('/getAll', function (req, res) {
  if (req.query.page <= 0) {
    const response = { status: 'failure', message: "invalid page number, should start with 1" };
    return res.json(response);
  } else if (req.query.page !== undefined && req.query.page !== null && req.query.page >= 1 && req.query.limit !== undefined && req.query.limit !== null) {
    const startNum = parseInt(req.query.limit * (req.query.page - 1));
    const endNum = parseInt(req.query.limit);
    Events.find({}, function (err, data) {
      if (err) {
        res.statusCode = 400;
        res.json(err);
      } else {
        res.json(data);
      }
    }).skip(startNum).limit(endNum)
  } else {
    Events.find({}, function (err, data) {
      if (err) {
        res.statusCode = 400;
        res.json({ status: 'failure', message: 'Something went wrong.' });
      } else {
        res.json(data);
      }
    });
  }
});

// Create a event
// TODO: Create event
app.post('/add', function (req, res) {
  const postData = req.body !== undefined && req.body !== null ? req.body : {};
  Events.create(postData, function (err, data) {
    if (err) {
      res.statusCode = 400;
      res.json(err);
    } else {
      res.json({ status: 'success', message: 'Successfully created new event.' });
    }
  });
});

// Get a event by id
// TODO: Get event by id
app.get('/:id', function (req, res) {
  const id = req.params.id !== undefined && req.params.id !== null ? req.params.id : '';
  Events.findOne({ _id: id }, function (err, data) {
    if (err) {
      res.statusCode = 400;
      res.json(err);
    } else {
      res.json(data);
    }
  });
});

// Delete a event
// TODO: Delete event
app.delete('/delete/:id', (req, res) => {
  const id = req.params.id !== undefined && req.params.id !== null ? req.params.id : '';
  Events.deleteOne({ _id: id }, function (err, data) {
    if (err) {
      res.statusCode = 404;
      res.json(err);
    } else {
      res.json(data);
    }
  });
});

// Update a event
// TODO: Update an event
app.put('/update/:id', function (req, res) {
  const id = req.params.id !== undefined && req.params.id !== null ? req.params.id : '';
  const data = req.body !== undefined && req.body !== null ? req.body : {};
  Events.update({ _id: id }, data, function (err, data) {
    if (err) {
      res.statusCode = 404;
      res.json(err);
    } else {
      res.json(data);
    }
  });
});

// Listen on port
app.listen(PORT, function () {
  console.log('[SERVER]: Running on port ' + PORT);
});