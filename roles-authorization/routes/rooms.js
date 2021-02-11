const router = require("express").Router();
const Room = require('../models/Room');

const loginCheck = () => {
  return (req, res, next) => {
    // in node-basic-auth: req.session.user
    // req.isAuthenticated() -> this is a passport function
    if (req.isAuthenticated()) {
      next();
    } else {
      res.redirect('/login');
    }
  }
}

router.get('/', (req, res) => {
  // this only shows the rooms that the logged in user created
  // Room.find({ owner: req.user._id })
  //   .then(rooms => {
  //     res.render('rooms/index', { roomList: rooms })
  //   })
  //   .catch(err => {
  //     console.log(err);
  //   })
  Room.find()
    .then(rooms => {
      res.render('rooms/index', { roomList: rooms })
    })
    .catch(err => {
      console.log(err);
    })
})

router.get('/add', loginCheck(), (req, res) => {
  res.render('rooms/add')
})

router.post('/', loginCheck(), (req, res) => {
  const { name, price } = req.body;
  Room.create({
    name,
    price,
    // for node basic auth
    // owner: req.session.user._id
    owner: req.user._id
  })
    .then(room => {
      console.log(room);
      res.redirect('/rooms')
    })
    .catch(err => {
      console.log(err);
    })
})

router.get('/:id/delete', (req, res) => {
  const query = { _id: req.params.id }
  // if the user is not an admin 
  if (req.user.role !== 'admin') {
    // they also have to be the owner of the room
    query.owner = req.user._id
  }
  console.log(query);
  Room.findOneAndDelete(query)
    .then(() => {
      res.redirect('/rooms');
    })
    .catch(err => {
      console.log(err);
    })
})

module.exports = router;
