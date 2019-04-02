const express = require('express');
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(express.static('public'));

const mongoose = require('mongoose');

// connect to the database
mongoose.connect('mongodb://localhost:27017/messages', {
  useNewUrlParser: true
});

// Create a scheme for items in the museum: a title and a path to an image.
const itemSchema = new mongoose.Schema({
  id: String,
  handle: String,
  avatar: String,
  timestamp: String,
  source: String,
  score: String,
  //meta: Object,
  isStarred: Boolean,
  isTrashed: Boolean,
  content: String,
});

// Create a model for items in the museum.
const Item = mongoose.model('Item', itemSchema);

// Create a new item in the museum: takes a title and a path to an image.
app.post('/api/items', async (req, res) => {
  const item = new Item({
    id: req.body.id,
    avatar: req.body.avatar,
    handle: req.body.handle,
    timestamp: req.body.timestamp,
    source: req.body.source,
    score: req.body.score,
    isStarred: req.body.isStarred,
    isTrashed: false,
    content: req.body.content,
  });
  try {
    await item.save();
    res.send(item);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

// Get a list of all of the items in the museum.
app.get('/api/items', async (req, res) => {
  try {
    let items = await Item.find();
    res.send(items);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.delete('/api/items/:id', async (req, res) => {
  try {
    await Item.deleteOne({
      _id: req.params.id
    });
    res.sendStatus(200);
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.put('/api/items/:id', async (req, res) => {
  try {
     let item = await Item.findOne({
      _id: req.params.id
    });
    item.id = req.body.id;
    item.content = req.body.content;
    item.isStarred = req.body.isStarred;
    try {
      await item.save();
      res.status(200).send(item);
    } catch (error) {
      console.log(error);
      res.sendStatus(500);
    }
  } catch (error) {
    console.log(error);
    res.sendStatus(500);
  }
});

app.listen(4000, () => console.log('Server listening on port 4000!'));
