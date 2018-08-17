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
// router.get('/list', controller.getProductList);

// //返回指定的book
// router.get('/:id', bookController.findById);
router.get('/get/:idproduct', controller.processGetProcess);
// router.get('/get/:idproduct', ()=>{
//     console.log('1111111')}
// );

//创建book
// router.post('/create', controller.productCreate);

// //更新book全部信息
router.post('/update', controller.processUpdate);

// //更新book部分信息
// router.patch('/:id', bookController.patch);

// //批量删除
// router.delete('/batch/:ids', bookController.deleteBatch);

// //删除指定的book
// router.delete('/:id', bookController.delete);



indexRouter.router = router;

module.exports = indexRouter;
