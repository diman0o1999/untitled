var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('advertisements/index', { title: 'Express' });
});

router.get('/:id', function(req, res, next) {
  console.log(req.query);
  res.render('advertisements/show', { title: 'Express' , data: req.params.id});
});
router.get('/:id/edit', function(req, res, next) {
  console.log(req.query);
  res.render('advertisements/edit', { title: 'Express' , data: req.params.id});
});

// router.get('/:id/edit', function(req, res, next) {
//   console.log(req.query);
//   res.render('advertisements/join', { title: 'Express' , data: req.params.id});
// });

router.get('/new', function(req, res, next) {
  console.log(req.query);
  res.render('advertisements/new', { title: 'Express'});
});
module.exports = router;
