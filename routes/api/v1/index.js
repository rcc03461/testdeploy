// var fs = require('fs');
// var _ = require('lodash');
var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var router = express();
const corsOptions = {
  origin: 'http://104.155.212.227',
  credentials: true,
  methods: 'GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS',
  allowedHeaders: ['Content-Type', 'Authorization'],
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

//用户登录
router.post('/users/login', userController.login);








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
