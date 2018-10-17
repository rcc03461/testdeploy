// var fs = require('fs');
// var _ = require('lodash');
var express = require('express');
// var bodyParser = require('body-parser');
var router = express();

var cors = require('cors');
var whitelist = ['http://localhost:8081', 'http://cre.yching.hk', 'http://104.155.212.227'];
const corsOptions = {
  // origin: function (origin, callback) {
  //   if (whitelist.indexOf(origin) !== -1) {
  //     callback(null, true)
  //   } else {
  //     callback(new Error('Not allowed by CORS'))
  //   }
  // },
  origin: ['http://localhost:8081', 'http://cre.yching.hk', 'http://104.155.212.227'],
  credentials: true,
  methods: ['GET','HEAD','PUT','PATCH','POST','DELETE','OPTIONS'],
  // allowedHeaders: ['Content-Type', 'Authorization'],
};
router.use(cors(corsOptions));
// router.use(bodyParser.json());
var indexRouter = {};

// const connection = require('../../../db');
// router.use(function (req, res, next) {
//   connection.pool.getConnection(function(err, connection) {
//     if (err) {
//       res.json({
//           "errcode": 40000,
//           "errmsg": "Unable to connect to mysql server."
//         });
//     }else{
//       next();
//     }
//   });
// })

// check db connection
// router.use();

var userController = require('../../../controllers/user');
var controller = require('../../../controllers/controller');

router.post('/users/login', userController.login);
router.get('/users/logout', userController.logout);
//先检查登录
// router.use(userController.checkLogin);
router.patch('/users/profile', userController.profile);
router.patch('/users/changepwd', userController.changepwd);
router.get('/users/', userController.find);
router.post('/users/', userController.create);

// client
router.get('/client/detail/:idClient', controller.getClientDetail);
router.get('/client/list', controller.getClientList);
router.get('/client/option', controller.getClientOption);
router.post('/client/create', controller.clientCreate);
router.put('/client/update/:idClient', controller.clientUpdate);
// router.get('/client/detail/:idjob', controller.getJobDetail);
// job
router.get('/job/detail/:idJob', controller.getJobDetail);
router.get('/job/list', controller.getJobList);
router.get('/job/option', controller.getJobOption);
router.post('/job/create', controller.jobCreate);
router.put('/job/update/:idJob', controller.jobUpdate);
// product
router.get('/product/detail/:id', controller.getProductDetail);
router.get('/product/details', controller.getProductDetails);
// router.get('/product/defaults', controller.getProductDefaults);
router.get('/product/list', controller.getProductList);
router.post('/product/create', controller.productCreate);
router.put('/product/update/:idProduct', controller.productUpdate);
// process
router.get('/process/get/:idProduct', controller.processGetProcess);
router.post('/process/update', controller.processUpdate);
// invoice
router.post('/invoice/getdetail', controller.getInvoice);
router.post('/invoice/save', controller.invoiceSave);





//轮询当前目录下的子模块，并挨个加载其路由配置
// $fs.readdir(__dirname, function (err, files) {
//   files.forEach(function (file) {
//     if (!_.startsWith(file, '.') && file !== 'index.js') {
//       try {
//         router.use('/' + file.replace('.js', ''), require('./' + file).router);
//       } catch (ex) {
//         console.error('路由加载错误[' + $path.join(__dirname, file) + ']：' + ex.stack);
//       }
//     }
//   });
// });

indexRouter.router = router;
module.exports = indexRouter;
