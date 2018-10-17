const { query } = require('../db');

const model = {};


//---------------------------------------------Client-------------------



model.getClientDetail = function (idClient) {
  let _sql = "SELECT * FROM client WHERE id = ?"
  return query(_sql, [idClient])
}
model.getClientList = function (option) {
  let _sql = "SELECT * FROM client LIMIT ? , ?"
  return query(_sql, [(option.page - 1) * option.limit, option.limit])
}

model.getClientOption = function (option) {
  let _sql = "SELECT * FROM client"
  return query(_sql, [])
}

model.getClientAllCount = function () {
  let _sql = "SELECT COUNT(idClient) as total FROM client"
  return query(_sql, [])
}

model.clientCreate = function (obj) {
  let _sql = `INSERT INTO client (clientCode,  clientName,  attn,  clientMail,  billingAddress) VALUES( ? , ? , ? , ? , ? )`;
  console.log(obj);
  
  return query(_sql, [
    obj.clientCode, 
    obj.clientName || null, 
    obj.attn || null, 
    obj.clientMail || null,    
    obj.billingAddress || null ])
}

model.clientUpdate = function (obj) {
  // return obj
  let _sql = `UPDATE client SET clientCode = ?, clientName = ?, attn = ?, clientMail = ?, billingAddress = ? WHERE idClient = ?`;

  return query(_sql, [obj.clientCode, obj.clientName, obj.attn, obj.clientMail, obj.billingAddress, obj.idClient])
}

//------------------------------------------Job----------------

model.getJobDetail = function (idJob) {
  // console.log("getJobDetail : ", idJob);
  
  let _sql = "SELECT * FROM job WHERE job.idJob = ?"
  return query(_sql, [idJob])
}

model.getJobList = function (option) {
  let _sql = "SELECT * FROM job LIMIT ? , ?"
  return query(_sql, [(option.page - 1) * option.limit, option.limit])
}

model.getJobOption = function (option) {
  let _sql = "SELECT * FROM job"
  return query(_sql, [])
}

model.getJobAllCount = function () {
  let _sql = "SELECT COUNT(idJob) as total FROM job"
  return query(_sql, [])
}
model.jobCreate = function (params) {
  let _sql = `INSERT INTO job (jobTitle,  noPerPackage,  dealDate,  deliverySchedule, jobSetting, idClient, createId) VALUES( ? , ? , ? , ? ,? ,?,?)`;
  return query(_sql, [
    params.jobTitle, 
    params.noPerPackage || null,
    params.dealDate || null,
    params.deliverySchedule || null,
    JSON.stringify(params.jobSetting) || null,
    params.idClient, 
    params.createId])
}
model.jobUpdate = function (params) {
  // return params
  let _sql = `UPDATE job SET jobTitle = ?, noPerPackage = ?, dealDate = ?, deliverySchedule = ?, specialInstruction = ?, jobSetting = ? WHERE idJob = ?`;
  console.log(_sql);
  
  return query(_sql, [
    params.jobTitle, 
    params.noPerPackage || null, 
    params.dealDate || null, 
    params.deliverySchedule || null, 
    params.specialInstruction || null,
    JSON.stringify(params.jobSetting) || null,
    params.idJob
  ])
}

model.jobAddDefaultSetting = function (params) {

  let _sql = `INSERT INTO default_job (
    idJob,size,color,material,materialWeight,qty,pageCount,binding,pagination,unitPrice,amount,sample,finishing,specialInstruction) VALUES( 
      ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? )
    `;
  console.log(params);

  return query(_sql, [
    params.idJob,
    params.size || null,
    params.color || null,
    params.material || null,
    params.materialWeight || null,
    params.qty || null,
    params.pageCount || null,
    params.binding || null,
    params.pagination || null,
    params.unitPrice || null,
    params.amount || null,
    params.sample || null,
    params.finishing || null,
    params.specialInstruction || null
  ])
}

model.jobEditDefaultSetting = function (params) {

  let _sql = `UPDATE default_job SET size = ? ,color = ? ,material = ? ,materialWeight = ? ,qty = ? ,pageCount = ? ,binding = ? ,pagination = ? ,unitPrice = ? ,amount = ? ,sample = ? ,finishing = ? ,specialInstruction = ? WHERE idDefaultJob = ?`;
  console.log(params);

  return query(_sql, [
    params.size || null,
    params.color || null,
    params.material || null,
    params.materialWeight || null,
    params.qty || null,
    params.pageCount || null,
    params.binding || null,
    params.pagination || null,
    params.unitPrice || null,
    params.amount || null,
    params.sample || null,
    params.finishing || null,
    params.specialInstruction || null,
    params.idDefaultJob
  ])
}



//------------------------------------------Product----------------

// model.getProductDetail = function (idproduct) {
//     let _sql = "SELECT * FROM product LEFT JOIN default_product ON default_product.idProduct = product.id WHERE product.id = ?"
//     return query(_sql, [idproduct])
// }

// model.getProductDetails = function (ids) {
//     let _sql = "SELECT * FROM product LEFT JOIN default_product ON default_product.idProduct = product.id WHERE product.id IN(?)"
//     return query(_sql, [Object.values(ids)])
// }

// model.getProductDefaults = function (productIds) {
//     let _sql = "SELECT * FROM product LEFT JOIN default_product ON default_product.idProduct = product.id WHERE product.id = ?"
//     return query(_sql, [productIds])
// }

model.getProductList = function (option) {
  console.log("getProductList : ", option);
  
  if (option.idJob) {
    let _sql = "SELECT * FROM product WHERE product.idJob = ? LIMIT ? , ?"
    return query(_sql, [option.idJob, (option.page - 1) * option.limit, option.limit])
  }else{
    let _sql = "SELECT * FROM product LIMIT ? , ?"
    return query(_sql, [(option.page - 1) * option.limit, option.limit])
  }
}

// model.getProductOption = function (option) {
//   let _sql = "SELECT * FROM product"
//   return query(_sql, [])
// }

model.getProductAllCount = function (option) {
  if (option.idJob) {
    let _sql = "SELECT COUNT(idProduct) as total FROM product WHERE idJob = ?"
    return query(_sql, [option.idJob])
  }else{
    let _sql = "SELECT COUNT(idProduct) as total FROM product"
    return query(_sql, [])
  }
}
model.productCreate = function (idJob, params, createId) {
  let _sql = `INSERT INTO product (idJob, productName,productSetting, createId) VALUES( ? , ? , ?, ? )`;

  return query(_sql, [idJob, params.productName, JSON.stringify(params.productSetting), createId])
}
model.productUpdate = function (params) {
  // return params
  let _sql = `UPDATE product SET idJob = ?, productName = ?, productSetting = ? WHERE idProduct = ?`;
  return query(_sql, [params.idJob, params.productName, JSON.stringify(params.productSetting), params.idProduct])
}

// model.productAddDefaultSetting = function (params) {

//   let _sql = `INSERT INTO default_product (
//     idProduct, size, color, material, materialWeight, qty, pageCount, binding, pagination, unitPrice, amount, sample, finishing, specialInstruction) VALUES(
//       ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? , ? ) `;
//   console.log(params);

//   return query(_sql, [
//     params.idProduct,
//     params.size || null,
//     params.color || null,
//     params.material || null,
//     params.materialWeight || null,
//     params.qty || null,
//     params.pageCount || null,
//     params.binding || null,
//     params.pagination || null,
//     params.unitPrice || null,
//     params.amount || null,
//     params.sample || null,
//     params.finishing || null,
//     params.specialInstruction || null
//   ])
// }

// model.productEditDefaultSetting = function (params) {

//   let _sql = `UPDATE default_product SET size = ? ,color = ? ,material = ? ,materialWeight = ? ,qty = ? ,pageCount = ? ,binding = ? ,pagination = ? ,unitPrice = ? ,amount = ? ,sample = ? ,finishing = ? ,specialInstruction = ? WHERE idDefaultProduct = ?`;
//   console.log(params);

//   return query(_sql, [
//     params.size || null,
//     params.color || null,
//     params.material || null,
//     params.materialWeight || null,
//     params.qty || null,
//     params.pageCount || null,
//     params.binding || null,
//     params.pagination || null,
//     params.unitPrice || null,
//     params.amount || null,
//     params.sample || null,
//     params.finishing || null,
//     params.specialInstruction || null,
//     params.idDefaultProduct
//   ])
// }

//------------------------------------------Process----------------
// ===========Print
model.processPrintCreate = function (idProduct, option) {
  let _sql = `INSERT INTO detail_print (idProduct, printTitle, size, color, material, materialWeight, qtyClient, qtyPrint, pageCount, remark ) VALUES (?,?,?,?,?,?,?,?,?,?)`;

  console.log(idProduct, option);
  
  return query(_sql, [
    idProduct,
    option.printTitle || null,
    option.size || null,
    option.color || null,
    option.material || null,
    option.materialWeight || null,
    option.qtyClient || null,
    option.qtyPrint || null,
    option.pageCount || null,
    option.remark || null
  ])
}

model.processPrintUpdate = function (id, params) {
  let _sql = "UPDATE detail_print SET printTitle = ?, size = ?, color = ?, material = ?, materialWeight = ?, qtyClient = ?, qtyPrint = ?, pageCount = ?, remark= ? WHERE id = ? "
  return query(_sql, [
    params.printTitle || null,
    params.size || null,
    params.color || null,
    params.material || null,
    params.materialWeight || null,
    params.qtyClient || null,
    params.qtyPrint || null,
    params.pageCount || null,
    params.remark || null,
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
    option.bindingTitle || null,
    option.binding || null,
    option.pagination || null
  ])
}

model.processBindingUpdate = function (id, params) {
  let _sql = "UPDATE detail_binding SET bindingTitle = ?, binding = ?, pagination = ? WHERE id = ? "
  return query(_sql, [
    params.bindingTitle || null,
    params.binding || null,
    params.pagination || null,
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
    option.packageTitle || null,
    option.packageNo || null,
    option.unitPrice || null
  ])
}

model.processPackageUpdate = function (id, params) {
  let _sql = "UPDATE detail_package SET packageTitle = ?,packageNo = ?,unitPrice = ? WHERE id = ? "
  return query(_sql, [
    params.packageTitle || null,
    params.packageNo || null,
    params.unitPrice || null,
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
    option.address || null,
    option.deliveryQty || null,
    option.deliveryDate || null
  ])
}

model.processDeliveryUpdate = function (id, params) {
  let _sql = "UPDATE detail_delivery SET address = ?,deliveryQty = ?,deliveryDate = ? WHERE id = ? "
  return query(_sql, [
    params.address || null,
    params.deliveryQty || null,
    params.deliveryDate || null,
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
    option.otherTitle || null
  ])
}

model.processOtherUpdate = function (id, params) {
  let _sql = "UPDATE detail_other SET otherTitle = ? WHERE id = ? "
  return query(_sql, [
    params.otherTitle || null,
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
  console.log("option :",option);
  
  let _sql = `SELECT * FROM job 
  LEFT JOIN product ON product.idJob = job.id 
  LEFT JOIN detail_print ON detail_print.idProduct = product.id
  LEFT JOIN detail_binding ON detail_binding.idProduct = product.id
  LEFT JOIN detail_finishing ON detail_finishing.idProduct = product.id
  LEFT JOIN detail_package ON detail_package.idProduct = product.id
  LEFT JOIN detail_delivery ON detail_delivery.idProduct = product.id
  LEFT JOIN detail_other ON detail_other.idProduct = product.id
  WHERE job.id = ? AND product.delected = 0 AND product.id IN (?)`

  // console.log(_.merge([option.idjob], option.products),  option.products.join());
  return query(_sql, [option.idjob, option.products])
}

model.invoiceGetProductDetail = function (table,id) {
  let _sql = `SELECT * FROM ${table} WHERE idProduct = ? AND delected = 0`
  return query(_sql, [id])
}

model.getInvoice = function (idJob) {
  let _sql = `SELECT * FROM invoice LEFT JOIN job ON invoice.idJob = job.id WHERE idJob = ? `
  return query(_sql, [idJob])
}

model.getJobClient = function (idJob) {
  let _sql = `SELECT * FROM job LEFT JOIN client ON client.idClient = job.idClient WHERE job.idJob = ? `
  return query(_sql, [idJob])
}

model.getJobProduct = function (idJob) {
  let _sql = `SELECT * FROM job LEFT JOIN product ON job.idJob = product.idJob WHERE job.idJob = ?`
  return query(_sql, [idJob])
}



















module.exports = model