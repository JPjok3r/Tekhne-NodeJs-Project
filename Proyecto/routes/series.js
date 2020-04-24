let express = require('express');
let router = express.Router();

let mongoContext = require('../mongo');
let Series = mongoContext.Series;
let Users = mongoContext.Users;

/* GET home page. */
router.get('/', function(req, res, next) {
  
  if(req.session.name){
    return Series.find()
      .then(series=>{
        console.log(series);
        res.render('series', { title: 'StarStreams', files: series });
        //res.status(200).json(flights); //httpStatus.OK
      })
      .catch (next);
  } else
    res.redirect('/users/login')
});

router.get('/:id', function(req, res, next) {
  if(req.session.name){
    let _id = req.params.id;
    let username = req.session.name;
    return Users.findOne({username})
      .then(users=>{
        if(users.state === 'Pagado'){
          return Series.findOne({_id})
            .then(series=>{
              console.log(series);
              res.render('player', { title: 'StarStreams', file: series });
              //res.status(200).json(flights); //httpStatus.OK
            })
            .catch (next);
        } else
          res.redirect('/payment');
      })
      .catch (next);
  } else
    res.redirect('/users/login')
});

module.exports = router;