const { query } = require('../db');

const model = {};

//---------------------------------------------Client-------------------

model.getClientList = function (option) {
  let _sql = "SELECT * FROM client LIMIT ? , ?"
  return query(_sql, [(option.page - 1) * option.limit, option.limit])
}

model.getClientOption = function (option) {
  let _sql = "SELECT * FROM client"
  return query(_sql, [])
}

model.getClientAllCount = function () {
  let _sql = "SELECT COUNT(id) as total FROM client"
  return query(_sql, [])
}

model.clientCreate = function (obj) {
  let _sql = `INSERT INTO client (clientCode,  clientName,  attn,  clientMail,  billingAddress) VALUES( ? , ? , ? , ? , ? )`;
  console.log(obj);
  
  return query(_sql, [obj.clientCode, obj.clientName, obj.attn, obj.clientMail,    obj.billingAddress ])
}

model.clientUpdate = function (obj) {
  // return obj
  let _sql = `UPDATE client SET clientCode = ?, clientName = ?, attn = ?, clientMail = ?, billingAddress = ? WHERE id = ?`;

  return query(_sql, [obj.clientCode, obj.clientName, obj.attn, obj.clientMail, obj.billingAddress, obj.id])
}

//------------------------------------------Job----------------

model.getJobList = function (option) {
  let _sql = "SELECT * FROM job LIMIT ? , ?"
  return query(_sql, [(option.page - 1) * option.limit, option.limit])
}

model.getJobOption = function (option) {
  let _sql = "SELECT * FROM job"
  return query(_sql, [])
}

model.getJobAllCount = function () {
  let _sql = "SELECT COUNT(id) as total FROM job"
  return query(_sql, [])
}
model.jobCreate = function (params) {
  let _sql = `INSERT INTO job (jobTitle,  noPerPackage,  dealDate,  deliverySchedule, idClient, createId) VALUES( ? , ? , ? , ? ,? ,?)`;
  console.log(params);

  return query(_sql, [params.jobTitle, params.noPerPackage, params.dealDate, params.deliverySchedule, params.idClient, params.createId])
}
model.jobUpdate = function (params) {
  // return params
  let _sql = `UPDATE job SET jobTitle = ?, noPerPackage = ?, dealDate = ?, deliverySchedule = ? WHERE id = ?`;
  return query(_sql, [params.jobTitle, params.noPerPackage, params.dealDate, params.deliverySchedule, params.id])
}


//------------------------------------------Product----------------

model.getProductList = function (option) {
  if (option.idjob) {
    let _sql = "SELECT * FROM product WHERE idjob = ? LIMIT ? , ?"
    return query(_sql, [option.idjob, (option.page - 1) * option.limit, option.limit])
  }else{
    let _sql = "SELECT * FROM product LIMIT ? , ?"
    return query(_sql, [(option.page - 1) * option.limit, option.limit])
  }
}

model.getProductOption = function (option) {
  let _sql = "SELECT * FROM product"
  return query(_sql, [])
}

model.getProductAllCount = function (option) {
  if (option.idjob) {
    let _sql = "SELECT COUNT(id) as total FROM product WHERE idjob = ?"
    return query(_sql, [option.idjob])
  }else{
    let _sql = "SELECT COUNT(id) as total FROM product"
    return query(_sql, [])
  }
}
model.productCreate = function (idJob, productName, createId) {
  let _sql = `INSERT INTO product (idJob, productName, createId) VALUES( ? , ? , ? )`;

  return query(_sql, [idJob, productName, createId])
}
model.productUpdate = function (params) {
  // return params
  let _sql = `UPDATE product SET idJob = ?, productName = ?, createId = ? WHERE id = ?`;
  return query(_sql, [params.idJob, params.productName, params.createId,params.id])
}



//------------------------------------------Process----------------

model.processPrintCreate = function (idProduct, option) {
  let _sql = `INSERT INTO detail_print (idProduct, printTitle, size, color, material, materialWeight, qtyClient, qtyPrint, pageCount, remark ) VALUES (?,?,?,?,?,?,?,?,?,?)`;

  console.log(idProduct, option);
  
  return query(_sql, [
    idProduct,
    option.printTitle,
    option.size,
    option.color,
    option.material,
    option.materialWeight,
    option.qtyClient,
    option.qtyPrint,
    option.pageCount,
    option.remark
  ])
}

model.processPrintUpdate = function (id, params) {
  let _sql = "UPDATE detail_print SET printTitle = ?, size = ?, color = ?, material = ?, materialWeight = ?, qtyClient = ?, qtyPrint = ?, pageCount = ?, remark= ? WHERE id = ? "
  return query(_sql, [
    params.printTitle,
    params.size,
    params.color,
    params.material,
    params.materialWeight,
    params.qtyClient,
    params.qtyPrint,
    params.pageCount,
    params.remark,
    id
  ])
}

model.processPrintDelete = function (id) {
  let _sql = "UPDATE detail_print SET delected = 1 WHERE id = ? "
  return query(_sql, [id])
}

model.processGetPrint = function (idProduct) {
  let _sql = "SELECT * FROM detail_print WHERE idProduct = ? AND delected = 0"
  return query(_sql, [idProduct])
}

// model.getProductOption = function (option) {
//   let _sql = "SELECT * FROM product"
//   return query(_sql, [])
// }

// model.getProductAllCount = function () {
//   let _sql = "SELECT COUNT(id) as total FROM product"
//   return query(_sql, [])
// }
// model.productCreate = function (idJob, productName, createId) {
//   let _sql = `INSERT INTO product (idJob, productName, createId) VALUES( ? , ? , ? )`;

//   return query(_sql, [idJob, productName, createId])
// }
// model.productUpdate = function (params) {
//   // return params
//   let _sql = `UPDATE product SET idJob = ?, productName = ?, createId = ? WHERE id = ?`;
//   return query(_sql, [params.idJob, params.productName, params.createId,params.id])
// }





















module.exports = model