const { query } = require('../db');

const model = {};

// 
model.findAll = function (option) {
  let _sql = "SELECT * FROM client LIMIT ? , ?"
  return query(_sql, [(option.page - 1) * option.limit, option.limit])
}

model.getAll = function (option) {
  let _sql = "SELECT * FROM client"
  return query(_sql, [])
}

model.findAllCount = function () {
  let _sql = "SELECT COUNT(id) as total FROM client"
  return query(_sql, [])
}

// {
//   obj.clientCode,: req.body.clientCode,
//   obj.clientName,: req.body.clientName,
//   obj.attn,: req.body.attn,
//   obj.clientMail,: req.body.clientMail,
//   obj.billingAddress,: req.body.billingAddress
// }
model.add = function (obj) {
  let _sql = `INSERT INTO client (clientCode,  clientName,  attn,  clientMail,  billingAddress) VALUES( ? , ? , ? , ? , ? )`;
  console.log(obj);
  
  return query(_sql, [obj.clientCode, obj.clientName, obj.attn, obj.clientMail,    obj.billingAddress ])
}

model.update = function (obj) {
  // return obj
  let _sql = `UPDATE client SET clientCode = ?, clientName = ?, attn = ?, clientMail = ?, billingAddress = ? WHERE id = ?`;

  return query(_sql, [obj.clientCode, obj.clientName, obj.attn, obj.clientMail, obj.billingAddress, obj.id])
}

module.exports = model