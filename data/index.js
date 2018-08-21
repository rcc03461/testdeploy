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

model.getJobDetail = function (idjob) {
  console.log("getJobDetail : ", idjob);
  
  let _sql = "SELECT * FROM job LEFT JOIN default_job ON default_job.idJob = job.id WHERE job.id = ?"
  return query(_sql, [idjob])
}

model.getJobList = function (option) {
  let _sql = "SELECT * FROM job  LEFT JOIN default_job ON idJob = job.id LIMIT ? , ?"
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

model.jobAddDefaultSetting = function (params) {

  let _sql = `INSERT INTO default_job (
    idJob,size,color,material,materialWeight,qty,pageCount,binding,pagination,unitPrice,amount,sample,finishing,specialInstruction) VALUES( 
      ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? )
    `;
  console.log(params);

  return query(_sql, [
    params.idJob,
    params.size,
    params.color,
    params.material,
    params.materialWeight,
    params.qty,
    params.pageCount,
    params.binding,
    params.pagination,
    params.unitPrice,
    params.amount,
    params.sample,
    params.finishing,
    params.specialInstruction
  ])
}

model.jobEditDefaultSetting = function (params) {

  let _sql = `UPDATE default_job SET size = ? ,color = ? ,material = ? ,materialWeight = ? ,qty = ? ,pageCount = ? ,binding = ? ,pagination = ? ,unitPrice = ? ,amount = ? ,sample = ? ,finishing = ? ,specialInstruction = ? WHERE idDefaultJob = ?`;
  console.log(params);

  return query(_sql, [
    params.size,
    params.color,
    params.material,
    params.materialWeight,
    params.qty,
    params.pageCount,
    params.binding,
    params.pagination,
    params.unitPrice,
    params.amount,
    params.sample,
    params.finishing || null,
    params.specialInstruction,
    params.idDefaultJob
  ])
}
// model.jobUpdate = function (params) {
//   // return params
//   let _sql = `UPDATE job SET jobTitle = ?, noPerPackage = ?, dealDate = ?, deliverySchedule = ? WHERE id = ?`;
//   return query(_sql, [params.jobTitle, params.noPerPackage, params.dealDate, params.deliverySchedule, params.id])
// }


//------------------------------------------Product----------------

model.getProductDetail = function (idproduct) {
    let _sql = "SELECT * FROM product LEFT JOIN default_product ON default_product.idProduct = product.id WHERE product.id = ?"
    return query(_sql, [idproduct])
}

model.getProductList = function (option) {
  console.log("getProductList : ", option);
  
  if (option.idjob) {
    let _sql = "SELECT * FROM product LEFT JOIN default_product ON default_product.idProduct = product.id WHERE product.idJob = ? LIMIT ? , ?"
    return query(_sql, [option.idjob, (option.page - 1) * option.limit, option.limit])
  }else{
    let _sql = "SELECT * FROM product LEFT JOIN default_product ON default_product.idProduct = product.id LIMIT ? , ?"
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
  let _sql = `UPDATE product SET idJob = ?, productName = ? WHERE id = ?`;
  return query(_sql, [params.idJob, params.productName, params.id])
}

model.productAddDefaultSetting = function (params) {

  let _sql = `INSERT INTO default_product (
    idProduct, size, color, material, materialWeight, qty, pageCount, binding, pagination, unitPrice, amount, sample, finishing, specialInstruction) VALUES(
      ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? ) `;
  console.log(params);

  return query(_sql, [
    params.idProduct,
    params.size,
    params.color,
    params.material,
    params.materialWeight,
    params.qty,
    params.pageCount,
    params.binding,
    params.pagination,
    params.unitPrice,
    params.amount,
    params.sample,
    params.finishing,
    params.specialInstruction
  ])
}

model.productEditDefaultSetting = function (params) {

  let _sql = `UPDATE default_product SET size = ? ,color = ? ,material = ? ,materialWeight = ? ,qty = ? ,pageCount = ? ,binding = ? ,pagination = ? ,unitPrice = ? ,amount = ? ,sample = ? ,finishing = ? ,specialInstruction = ? WHERE idDefaultProduct = ?`;
  console.log(params);

  return query(_sql, [
    params.size,
    params.color,
    params.material,
    params.materialWeight,
    params.qty,
    params.pageCount,
    params.binding,
    params.pagination,
    params.unitPrice,
    params.amount,
    params.sample,
    params.finishing || null,
    params.specialInstruction,
    params.idDefaultProduct
  ])
}

//------------------------------------------Process----------------
// ===========Print
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

model.processPrintGet = function (idProduct) {
  console.log("processGetPrint idProduct: ", idProduct);
  let _sql = "SELECT * FROM detail_print WHERE idProduct = ? AND delected = 0"
  return query(_sql, [idProduct])
}





// ==========Binding
model.processBindingCreate = function (idProduct, option) {
  let _sql = `INSERT INTO detail_binding (idProduct, bindingTitle, binding, pagination ) VALUES (?,?,?,?)`;
  console.log("processBindingCreate :", idProduct, option);
  return query(_sql, [
    idProduct,
    option.bindingTitle,
    option.binding,
    option.pagination
  ])
}

model.processBindingUpdate = function (id, params) {
  let _sql = "UPDATE detail_binding SET bindingTitle = ?, binding = ?, pagination = ? WHERE id = ? "
  return query(_sql, [
    params.bindingTitle,
    params.binding,
    params.pagination,
    id
  ])
}

model.processBindingDelete = function (id) {
  let _sql = "UPDATE detail_binding SET delected = 1 WHERE id = ? "
  return query(_sql, [id])
}

model.processBindingGet = function (idProduct) {
  let _sql = "SELECT * FROM detail_binding WHERE idProduct = ? AND delected = 0"
  return query(_sql, [idProduct])
}



// ==========Finishing
model.processFinishingCreate = function (idProduct, option) {
  let _sql = `INSERT INTO detail_finishing (idProduct, finishingTitle ) VALUES (?,?)`;
  console.log("processFinishingCreate :", idProduct, option);
  return query(_sql, [
    idProduct,
    option.finishingTitle
  ])
}

model.processFinishingUpdate = function (id, params) {
  let _sql = "UPDATE detail_finishing SET finishingTitle = ? WHERE id = ? "
  return query(_sql, [
    params.finishingTitle,
    id
  ])
}

model.processFinishingDelete = function (id) {
  let _sql = "UPDATE detail_finishing SET delected = 1 WHERE id = ? "
  return query(_sql, [id])
}

model.processFinishingGet = function (idProduct) {
  let _sql = "SELECT * FROM detail_finishing WHERE idProduct = ? AND delected = 0"
  return query(_sql, [idProduct])
}


// ==========Package
model.processPackageCreate = function (idProduct, option) {
  let _sql = `INSERT INTO detail_package (idProduct, packageTitle, packageNo, unitPrice ) VALUES (?,?,?,?)`;
  console.log("processPackageCreate :", idProduct, option);
  return query(_sql, [
    idProduct,
    option.packageTitle,
    option.packageNo,
    option.unitPrice
  ])
}

model.processPackageUpdate = function (id, params) {
  let _sql = "UPDATE detail_package SET packageTitle = ?,packageNo = ?,unitPrice = ? WHERE id = ? "
  return query(_sql, [
    params.packageTitle,
    params.packageNo,
    params.unitPrice,
    id
  ])
}

model.processPackageDelete = function (id) {
  let _sql = "UPDATE detail_package SET delected = 1 WHERE id = ? "
  return query(_sql, [id])
}

model.processPackageGet = function (idProduct) {
  let _sql = "SELECT * FROM detail_package WHERE idProduct = ? AND delected = 0"
  return query(_sql, [idProduct])
}



// ==========Delivery
model.processDeliveryCreate = function (idProduct, option) {
  let _sql = `INSERT INTO detail_delivery (idProduct, address, deliveryQty, deliveryDate ) VALUES (?,?,?,?)`;
  console.log("processDeliveryCreate :", idProduct, option);
  return query(_sql, [
    idProduct,
    option.address,
    option.deliveryQty,
    option.deliveryDate
  ])
}

model.processDeliveryUpdate = function (id, params) {
  let _sql = "UPDATE detail_delivery SET address = ?,deliveryQty = ?,deliveryDate = ? WHERE id = ? "
  return query(_sql, [
    params.address,
    params.deliveryQty,
    params.deliveryDate,
    id
  ])
}

model.processDeliveryDelete = function (id) {
  let _sql = "UPDATE detail_delivery SET delected = 1 WHERE id = ? "
  return query(_sql, [id])
}

model.processDeliveryGet = function (idProduct) {
  let _sql = "SELECT * FROM detail_delivery WHERE idProduct = ? AND delected = 0"
  return query(_sql, [idProduct])
}













// ==========Other
model.processOtherCreate = function (idProduct, option) {
  let _sql = `INSERT INTO detail_other (idProduct, otherTitle ) VALUES (?,?)`;
  console.log("processOtherCreate :", idProduct, option);
  return query(_sql, [
    idProduct,
    option.otherTitle
  ])
}

model.processOtherUpdate = function (id, params) {
  let _sql = "UPDATE detail_other SET otherTitle = ? WHERE id = ? "
  return query(_sql, [
    params.otherTitle,
    id
  ])
}

model.processOtherDelete = function (id) {
  let _sql = "UPDATE detail_other SET delected = 1 WHERE id = ? "
  return query(_sql, [id])
}

model.processOtherGet = function (idProduct) {
  let _sql = "SELECT * FROM detail_other WHERE idProduct = ? AND delected = 0"
  return query(_sql, [idProduct])
}







//=====================invoice
model.invoiceGetDetail = function (option) {
  // let _sql = `SELECT * FROM job LEFT JOIN product ON product.idJob = job.id WHERE job.id = ? AND product.delected = 0 AND product.id IN (${"?,".repeat(option.products.length).replace(/,(\s+)?$/, '')})`
  let _sql = `SELECT * FROM job LEFT JOIN product ON product.idJob = job.id WHERE job.id = ? AND product.delected = 0 AND product.id IN (?)`

  // console.log(_.merge([option.idjob], option.products),  option.products.join());
  return query(_sql, [option.idjob, option.products])
}



















module.exports = model