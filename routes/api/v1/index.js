// var fs = require('fs');
// var _ = require('lodash');
var express = require('express');
var cors = require('cors')
var bodyParser = require('body-parser');
var router = express();
router.use(cors());
router.use(bodyParser.json());

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

//轮询当前目录下的子模块，并挨个加载其路由配置
$fs.readdir(__dirname, function (err, files) {
  files.forEach(function (file) {
    if (!_.startsWith(file, '.') && file !== 'index.js') {
      try {
        router.use('/' + file.replace('.js', ''), require('./' + file).router);
      } catch (ex) {
        console.error('路由加载错误[' + $path.join(__dirname, file) + ']：' + ex.stack);
      }
    }
  });
});

indexRouter.router = router;
module.exports = indexRouter;
