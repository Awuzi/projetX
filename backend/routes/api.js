const express = require('express');
const router = express.Router();
require('dotenv').config()
const crypto = require('crypto');
const jwt = require('jsonwebtoken');
const jwtAuth = require('../middlewares/auth');

const User = require('../models/User');

/* GET home page. */


router.get('/', (req, res) => {
  res.send('it work');
});


/*router.get('/:token', jwtAuth, async (req, res) => {
  console.log("user", req.user)
  const items = await Shopping.find()
  res.send({items: items, user: [req.user]});
});

router.post('/', async (req, res) => {
  await new Shopping(req.body).save()
  console.log('Added !');
  res.status(200);
});

router.post('/update', async (req, res) => {
  await Shopping.updateOne(req.body, {$set: {isDone: !req.body.isDone}});
  res.status(204);
});

router.post('/delete', async (req, res) => {
  await Shopping.findOneAndDelete(req.body);
  res.status(200);
});*/

router.post('/register', async (req, res) => {
  if (!await User.findOne({username: req.body.username})) {
    await new User({
      username: req.body.username,
      password: crypto
        .createHash('sha256')
        .update(req.body.password)
        .digest('base64'),
      role: 'member',
    }).save();
    res.send({message: 'Correctly registered', isUserFind: true, status: 'success'})
  } else {
    res.send({message: 'This username already exists', isUserFind: false, status: 'warning'})
  }
});


router.post('/login', async (req, res) => {
  const {username, password} = req.body;
  const user = await User.find({
    username: username,
    password: crypto
      .createHash('sha256')
      .update(password)
      .digest('base64')
  }).then(user => {
    let getUser = user[0];
    if (user[0]) {
      const accessToken = generateToken({
        userId: getUser._id,
        username: getUser.username
      });
      /*req.setHeader('Authorization', accessToken);*/
      res.json({accessToken: accessToken});
    }
    res.send({message: 'Invalid Credentials !'});
  }).catch(err => {
    console.log("Erreur : ", err.message);
  });
});


const generateToken = (credentials) => {
  return jwt.sign(credentials, process.env.TOKEN_SECRET, {expiresIn: "3600s"})
}

module.exports = router;
