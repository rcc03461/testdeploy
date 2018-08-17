/***
 * books相关路由
 * 采用 restful api 风格
 */
var express = require('express');
var bodyParser = require('body-parser');
var router = express();
router.use(bodyParser.json());
var indexRouter = {};
var userController = require('../../../controllers/user');
// var bookController = require('../../../controllers/book');
var controller = require('../../../controllers/index');

//先检查登录
router.use(userController.checkLogin);

//返回集合
router.get('/list', controller.getClientList);

router.get('/option', controller.getClientOption);

// //返回指定的book
// router.get('/:id', bookController.findById);

//创建book
router.post('/create', controller.clientCreate);

// //更新book全部信息
router.put('/update/:id', controller.clientUpdate);

// //更新book部分信息
// router.patch('/:id', bookController.patch);

// //批量删除
// router.delete('/batch/:ids', bookController.deleteBatch);

// //删除指定的book
// router.delete('/:id', bookController.delete);



indexRouter.router = router;

module.exports = indexRouter;
