/**
 * users 控制器
 *
 * Created by jerry on 2017/11/2.
 */
const Model = require('../data/user');
let userController = {};
// let _Users = Users;

/**
 * 检查用户的登录状态
 * @param req
 * @param res
 * @param next
 */
userController.checkLogin = function (req, res, next) {
  //用户已经登录
  if (req.session.userId) {
    next();
  }
  else {
    res.json({"errcode": 40001, "errmsg": "您还没有登录"});
  }
};

/**
 * 登录
 * @param req
 * @param res
 */
userController.login = async function (req, res) {
  let username = _.trim(req.query.username || req.body.username || '');
  let pwd = req.body.pwd;
  if (!username || !pwd) {
    return res.json({"errcode": 40002, "errmsg": "不合法的参数"});
  }
  
  
  // 通过用户名获取到用户信息
  // let user = _.find(_Users, function (u) {
  //   return u.username === username;
  // });
  // console.log('---_Users----');
  const user = await Model.findUser(username);
  // console.log(user[0].username);
  if (!user) {
    return res.json({"errcode": 40003, "errmsg": "用户不存在"});
  }
  if (user[0].password === pwd) {
    //设置session
    console.log(user, pwd);
    req.session.userId = user[0].idUser;

    return res.json({
      idUser: user[0].idUser,
      username: user[0].username,
      email: user[0].email,
      permission: user[0].permission,
    });
  } else {
    return res.json({"errcode": 40004, "errmsg": "密码错误"});
  }
};

/**
 * 退出登录
 * @param req
 * @param res
 */
userController.logout = function (req, res) {
  req.session.destroy();
  res.json({"errcode": 0, "errmsg": "退出完成"});
};

/**
 * 修改个人部分信息
 * @param req
 * @param res
 */
userController.profile = function (req, res) {
  let nickname = req.body.nickname;
  let email = req.body.email;
  let name  = req.body.name;
  let i = _.findIndex(_Users, function (u) {
    return u.id === req.session.userId
  })
  if (i > -1) {
    _Users[i].nickname = nickname;
    _Users[i].email = email;
    _Users[i].name = name;
    res.json({"errcode": 0, "errmsg": "修改成功"});
  } else {
    res.json({"errcode": 40009, "errmsg": "处理失败"});
  }
};

/**
 * 修改密码
 * @param req
 * @param res
 */
userController.changepwd = function (req, res) {
  //TODO 未开发
};

/**
 * 通过书名查询，获取图书列表
 * @param req
 * @param res
 */
userController.find = async function (req, res) {
  // let page = parseInt(req.query.page || 1); //页码（默认第1页）
  // let limit = parseInt(req.query.limit || 10); //每页显示条数（默认10条）
  // let name = req.query.name || '';
  // let total = 0;
  // let rltUsers = [];
  // if (name.length > 0) {
  //   let mockUsers = _Users.filter(user => {
  //     return (user.username.indexOf(name) > -1 || user.nickname.indexOf(name) > -1 || user.name.indexOf(name) > -1)
  //   });
  //   total = mockUsers.length; //总条数
  //   rltUsers = mockUsers.filter((u, index) => index < limit * page && index >= limit * (page - 1))
  // } else {
  //   total = _Users.length; //总条数
  //   rltUsers = _Users.filter((u, index) => index < limit * page && index >= limit * (page - 1))
  // }
  // res.json({
  //   total: total,
  //   limit: limit,
  //   users: rltUsers
  // })


  const page = parseInt(req.query.page || 1); //页码（默认第1页）
  const limit = parseInt(req.query.limit || 10); //每页显示条数（默认10条）
  // let name = req.query.name || ''; //图书名称
  // let total = 0;
  // let rltBooks = [];
  // if (name.length > 0) {
  const rawData = await Model.findAll({
    page: page,
    limit: limit,
  });
  
  // let list = JSON.parse(JSON.stringify(rawData));
  // console.log(rawData, list);

  // list.map(e => {
  //   e.dealDate = dayjs(e.dealDate).format('YYYY-MM-DD');
  //   e.createAt = dayjs(e.createAt).format('YYYY-MM-DD');
  //   return e
  // })
  // console.log(list);

  const rawDataTotal = await Model.findAllCount();
  // let total = JSON.parse(JSON.stringify(rawDataTotal));

  res.json({
    total: rawDataTotal[0].total,
    limit: limit,
    users: rawData
  })

};



/**
 * Create New User
 * @param req
 * @param res
 */
userController.create = async function (req, res) {

  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  const permission = req.body.permission;

  const rawData = await Model.createUser(username, password, email, permission).then((e)=>{
    if (e.affectedRows) {
      res.json({
        "errcode": 0,
        "errmsg": "修改成功"
      })
    }else{
      res.json({
        "errcode": 40009,
        "errmsg": "处理失败"
      });
    }
  });
  
};

module.exports = userController;
