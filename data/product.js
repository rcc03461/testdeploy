const { query } = require('../db');

const model = {};

// 
model.findAll = function (option) {
  let _sql = "SELECT * FROM product LIMIT ? , ?"
  return query(_sql, [(option.page - 1) * option.limit, option.limit])
}
model.findAllCount = function () {
  let _sql = "SELECT COUNT(id) as total FROM product"
  return query(_sql, [])
}

// {
//   obj.clientCode,: req.body.clientCode,
//   obj.clientName,: req.body.clientName,
//   obj.attn,: req.body.attn,
//   obj.clientMail,: req.body.clientMail,
//   obj.billingAddress,: req.body.billingAddress
// }
model.create = function (idJob, productName, createId) {
  let _sql = `INSERT INTO job (idJob,  productName,  createId) VALUES( ? , ? , ?)`;
  console.log(params);
  
  return query(_sql, [idJob, productName, createId])
}

// model.create = function (params) {
//   let _sql = `INSERT INTO job (jobTitle,  noPerPackage,  dealDate,  deliverySchedule) VALUES( ? , ? , ? , ? )`;
//   console.log(params);
  
//   return query(_sql, [params.jobTitle, params.noPerPackage, params.dealDate, params.deliverySchedule ])
// }

model.update = function (params) {
  // return params
  let _sql = `UPDATE job SET jobTitle = ?, noPerPackage = ?, dealDate = ?, deliverySchedule = ? WHERE id = ?`;

  return query(_sql, [params.jobTitle, params.noPerPackage, params.dealDate, params.deliverySchedule, params.id])
}

module.exports = model