/***
 * books相关路由
 * 采用 restful api 风格
 */
var fs = require('fs');
var express = require('express');
var multer = require('multer');
var path = require('path');
var router = express.Router();
var indexRouter = {};
// var userController = require('../../../controllers/user');
// var bookController = require('../../../controllers/book');
var controller = require('../../../controllers/filemanger');

var createFolder = function (folder) {
  try {
    fs.accessSync(folder);
  } catch (e) {
    fs.mkdirSync(folder);
  }
};
var uploadFolder = './uploads';
createFolder(uploadFolder);

// // 通过 filename 属性定制
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadFolder); // 保存的路径，备注：需要自己创建
  },
  filename: function (req, file, cb) {
    // 将保存文件名设置为 字段名 + 时间戳，比如 logo-1478521468943
    // cb(null, file.fieldname + '-' + Date.now());
    cb(null, Date.now() + path.extname(file.originalname))
  }
});
// 通过 storage 选项来对 上传行为 进行定制化
var upload = multer({
  storage: storage
}).single('uploadFileObj')

//先检查登录
// router.use(userController.checkLogin);

//返回集合
// router.get('/', controller.find);

// //返回指定的book
// router.get('/:id', controller.findById);

// 单图上传
router.post('/', upload, controller.upload);

// //更新book全部信息
// router.put('/:id', controller.update);

// //更新book部分信息
// router.patch('/:id', bookController.patch);

// //批量删除
// router.delete('/batch/:ids', bookController.deleteBatch);

// //删除指定的book
// router.delete('/:id', bookController.delete);



indexRouter.router = router;

module.exports = indexRouter;
