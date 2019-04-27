var express = require('express');
var router = express.Router();
var data_req = 'qqq', data_res ='qww';
const jsonParser = express.json();

/* GET home page. */
router.get('/', function(req, res, next) {
  data_res = advertisementsArray();
  res.render('advertisements/index', { title: 'Express', data_res: data_res, data_req: data_req  });
});
router.get('/new', function(req, res, next) {
  console.log(req.query);
  res.render('advertisements/new', { title: 'Express'});
});
router.get('/:id', function(req, res, next) {
  console.log(req.query);
  res.render('advertisements/show', { title: 'Express' , data: req.params.id});
});
router.get('/:id/edit', function(req, res, next) {
  console.log(req.query);
  res.render('advertisements/edit', { title: 'Express' , data: req.params.id});
});

function advertisementsArray(){
  return 'gbljss'
}
// router.get('/:id/edit', function(req, res, next) {
//   console.log(req.query);
//   res.render('advertisements/join', { title: 'Express' , data: req.params.id});
// });


module.exports = router;
