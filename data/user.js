/**
 * Created by jerry on 2017/11/13.
 * 初始化用户(user)模拟数据
 *
 * Created by jerry on 2017/11/13.
 */
// const Users = [];
// Users.push({
//   id: 1,
//   username: 'admin', //用户名
//   // name: "Admin", //姓名
//   password: '123456', //密码
//   email: 'abc@cre8.com', //邮箱
//   nickname: 'Superman', //昵称
//   // sex: 1, //性别
//   // addr: '北京市海淀区上地七街'
// });


// module.exports = Users;


const { query } = require('../db');

const model = {};

// 
model.findAll = function (option) {
  let _sql = "SELECT * FROM user LIMIT ? , ?"
  return query(_sql, [(option.page - 1) * option.limit, option.limit])
}

model.findAllCount = function () {
  let _sql = "SELECT COUNT(idUser) as total FROM user"
  return query(_sql, [])
}

model.findUser = function (username) {
  let _sql = "SELECT * FROM user WHERE username = ? LIMIT 1"
  return query(_sql, [username])
}

model.createUser = function (username, password, email, permission) {
  let _sql = "INSERT INTO user (username, password, email, permission) VALUES (?,?,?,?)"
  return query(_sql, [username, password, email, permission])
}

// {
//   obj.clientCode,: req.body.clientCode,
//   obj.clientName,: req.body.clientName,
//   obj.attn,: req.body.attn,
//   obj.clientMail,: req.body.clientMail,
//   obj.billingAddress,: req.body.billingAddress
// }
// model.add = function (obj) {
//   let _sql = `INSERT INTO client (clientCode,  clientName,  attn,  clientMail,  billingAddress) VALUES( ? , ? , ? , ? , ? )`;
//   console.log(obj);

//   return query(_sql, [obj.clientCode, obj.clientName, obj.attn, obj.clientMail, obj.billingAddress])
// }

// model.update = function (obj) {
//   // return obj
//   let _sql = `UPDATE client SET clientCode = ?, clientName = ?, attn = ?, clientMail = ?, billingAddress = ? WHERE id = ?`;

//   return query(_sql, [obj.clientCode, obj.clientName, obj.attn, obj.clientMail, obj.billingAddress, obj.id])
// }

module.exports = model