var express = require('express');
var router = express.Router();

let mongoContext = require('../mongo');
let Users = mongoContext.Users;
/* GET users listing. */
router.get('/login', function(req, res, next) {
  
  res.render('login', { title: 'StarStreams'});
});

router.post('/login', function(req, res, next) {
  let data = req.body;
  let username = data.username;
  let password = data.password;
  return Users.findOne({username})
    .then(users=>{
      console.log(users);
      if(password === users.password){
        req.session.name = username;
        res.redirect('/');
      } else
        res.redirect('/users/login');
      //res.render('player', { title: 'StarStreams', file: movies });
      //res.status(200).json(flights); //httpStatus.OK
    })
    .catch (next);
  //res.render('login', { title: 'StarStreams'});
});

let contu = 0;
router.get('/signup', function(req, res, next) {
  contu = 0;
  return Users.find()
    .then(users=>{
      console.log(users);
      for(let i = 0; i < users.length; i++){
        contu++;
      }
      res.render('signup', { title: 'StarStreams'});
    })
    .catch (next);
});

router.post('/signup', function(req, res, next) {
  let data = req.body;
  let username = data.username;
  let password = data.password;
  let email = data.email;
  let state = 'Gratis';
  let id_num = contu+1;
  let item = {
    id_num,
    username,
    password,
    email,
    state
  };
  let u = new Users(item);
    return u.save()
    .then (userCreated=>{
        //res.redirect('admin', {title: 'StarStreams', creation: 'Se guardo con exito la pelicula'});
        req.session.name = username;
        console.log('Movie created');
        console.log(userCreated);
        res.redirect('/');
    })
    .catch(err => {
        next(err);
    });
});

router.get('/account', function(req, res, next) {
  if(req.session.name){
    let username = req.session.name;
    return Users.findOne({username})
      .then(user=>{
        res.render('account', { title: 'StarStreams', user: user });
      })
      .catch(next);
  } else
    res.redirect('/users/login');
});

module.exports = router;
