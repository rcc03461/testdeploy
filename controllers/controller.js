/**
 * users 控制器
 *
 * Created by jerry on 2017/11/2.
 */

const Model = require('../data/model');
var dayjs = require('dayjs');
let Controller = {};
// let Model = Client;

/**
 * 检查用户的登录状态
 * @param req
 * @param res
 * @param next
 */
Controller.invoiceGetDetail = async function (req, res) {

  // let page = parseInt(req.query.page || 1); //页码（默认第1页）
  // let limit = parseInt(req.query.limit || 10); //每页显示条数（默认10条）
  let productIds = req.body.products;
  let idJob = req.body.idjob;
  let products = [];
  for (const idProduct of productIds) {
    let productDetail = {};
    console.log("query Id",idProduct);
    productDetail['detail'] = await Model.getProductDetail(idProduct).then(e=>{
      if (e) {
        return e[0]
      }
    });
    productDetail['print'] = await Model.invoiceGetProductDetail("detail_print", idProduct);
    productDetail['binding'] = await Model.invoiceGetProductDetail("detail_binding", idProduct);
    productDetail['package'] = await Model.invoiceGetProductDetail("detail_package", idProduct);
    productDetail['delivery'] = await Model.invoiceGetProductDetail("detail_delivery", idProduct);
    productDetail['finishing'] = await Model.invoiceGetProductDetail("detail_finishing", idProduct);
    productDetail['other'] = await Model.invoiceGetProductDetail("detail_other", idProduct);
    products.push(productDetail)
  }
  console.log("inv : P",products);
  
  res.json(products)
  // console.log("invoice :::::", req.body);
  // await Model.invoiceGetProductDetail("", )
  // const products = await Model.invoiceGetDetail(option).then(list => {
  //     // return list
  //     console.log(list);
      
  //     res.json(list)
  // });

};
Controller.getInvoice = async function (req, res) {

  // let page = parseInt(req.query.page || 1); //页码（默认第1页）
  // let limit = parseInt(req.query.limit || 10); //每页显示条数（默认10条）
  let idJob = req.body.idJob;
  const clientDetail = await Model.getJobClient(idJob).then(rawData =>{
    rawData[0].jobSetting = JSON.parse(rawData[0].jobSetting);
    return rawData[0]
  });

  const products = await Model.getJobProduct(idJob).then(rawData => {
    rawData.forEach(element => {
      element.productSetting = JSON.parse(element.productSetting)
      element.jobSetting = JSON.parse(element.jobSetting)
    });
    return rawData
  });

  res.json({
    clientDetail: clientDetail,
    products:products
  })
  // await Model.getInvoice(idJob).then(async function(e){
  //   console.log("getJobDetail:", idJob , e);
  //   if( e ){
  //     let jobDetail = e[0];
  //   }else{
      


  //   }
  // })

  // console.log("inv : P", idJob);
  


};
Controller.compareSetting = function (upper, lower) {
  lower.map(e=>{
    e.map(f=>{
      if (!f) {
        delete f
      }
    })
  })
  return {...upper, ...lower}
}
Controller.invoiceSave = async function (req, res) {

  // let page = parseInt(req.query.page || 1); //页码（默认第1页）
  // let limit = parseInt(req.query.limit || 10); //每页显示条数（默认10条）
  let productIds = req.body.products;
  let idJob = req.body.idjob;
  let products = [];
  for (const idProduct of productIds) {
    let productDetail = {};
    console.log("query Id",idProduct);
    productDetail['detail'] = await Model.getProductDetail(idProduct).then(e=>{
      if (e) {
        return e[0]
      }
    });
    productDetail['print'] = await Model.invoiceGetProductDetail("detail_print", idProduct);
    productDetail['binding'] = await Model.invoiceGetProductDetail("detail_binding", idProduct);
    productDetail['package'] = await Model.invoiceGetProductDetail("detail_package", idProduct);
    productDetail['delivery'] = await Model.invoiceGetProductDetail("detail_delivery", idProduct);
    productDetail['finishing'] = await Model.invoiceGetProductDetail("detail_finishing", idProduct);
    productDetail['other'] = await Model.invoiceGetProductDetail("detail_other", idProduct);
    products.push(productDetail)
  }
  console.log("inv : P",products);
  
  res.json(products)
  // console.log("invoice :::::", req.body);
  // await Model.invoiceGetProductDetail("", )
  // const products = await Model.invoiceGetDetail(option).then(list => {
  //     // return list
  //     console.log(list);
      
  //     res.json(list)
  // });

};
















Controller.getClientDetail = async function (req, res) {

  let idClient = _.trim(req.params.idClient || '');

  await Model.getClientDetail(idClient).then(async (list) => {
      res.json(list[0])
  }).catch(err=>{
    res.json({
        "errcode": 40009,
        "errmsg": "Fails to get client list"
    })
  });

};


Controller.getClientList = async function (req, res) {

  let page = parseInt(req.query.page || 1); //页码（默认第1页）
  let limit = parseInt(req.query.limit || 10); //每页显示条数（默认10条）

  await Model.getClientList({
    page: page,
    limit: limit,
  }).then(async (list) => {
    await Model.getClientAllCount().then((total)=>{
      res.json({
        total: total[0].total,
        limit: limit,
        list: list
      })
    });
  }).catch(err=>{
    res.json({
        "errcode": 40009,
        "errmsg": "Fails to get client list"
    })
  });

};


Controller.getClientOption = async function (req, res) {
  await Model.getClientOption().then((e) => {
    const response = _.map(e, (result) => {
      return {
        value: result.id,
        label: result.clientName
      }
    })
    res.json(response)
  });
};

Controller.clientCreate = async function (req, res) {
  // let name = req.body.name;
  // let author = req.body.author;
  // let description = req.body.description;
  // let publishAt = req.body.publishAt;
  await Model.clientCreate({
    clientCode: req.body.clientCode,
    clientName: req.body.clientName,
    attn: req.body.attn || null,
    clientMail: req.body.clientMail || null,
    billingAddress: req.body.billingAddress || null
  }).then(result => {
    // console.log(result);
    
    if (result.affectedRows >= 1) {
      res.json({
        "errcode": 0,
        "errmsg": "新增成功"
      })
    } else {
      res.json({
        "errcode": 0,
        "errmsg": "处理失败"
      })
    }
  }).catch(error =>{
    console.log(error);
    res.json({
      "errcode": 0,
      "errmsg": error
    })
  });
  // const result = JSON.parse(JSON.stringify(rawData))
  // console.log(JSON.parse(JSON.stringify(queryResult)));

};

Controller.clientUpdate = async function (req, res) {

  let idClient = _.trim(req.params.idClient || '');
  if (!idClient) {
    return res.json({
      "errcode": 40002,
      "errmsg": "不合法的参数"
    });
  }
  await Model.clientUpdate({
    clientCode: req.body.clientCode,
    clientName: req.body.clientName,
    attn: req.body.attn || null,
    clientMail: req.body.clientMail || null,
    billingAddress: req.body.billingAddress || null,
    idClient: idClient
  }).then(result => {
    if (result.affectedRows >= 1) {
      res.json({
        "errcode": 0,
        "errmsg": "修改成功"
      });
    } else {
      res.json({
        "errcode": 40009,
        "errmsg": "处理失败"
      });
    }
  })

};



// ===========================job ====================


Controller.getJobDetail = async function (req, res) {
  // let page = parseInt(req.query.page || 1); //页码（默认第1页）
  // let limit = parseInt(req.query.limit || 10); //每页显示条数（默认10条）
  const idJob = req.params.idJob;
  await Model.getJobDetail(idJob).then(async (rawData) => {
    
    let list = rawData.map(e => {
      e.jobSetting = JSON.parse(e.jobSetting);
      e.dealDate = dayjs(e.dealDate).format('YYYY-MM-DD');
      // e.deliverySchedule = dayjs(e.deliverySchedule).format('YYYY-MM-DD');
      e.createdAt = dayjs(e.createdAt).format('YYYY-MM-DD');
      return e
    })

    res.json(list[0])

  });
  
};

Controller.getJobList = async function (req, res) {
  let page = parseInt(req.query.page || 1); //页码（默认第1页）
  let limit = parseInt(req.query.limit || 10); //每页显示条数（默认10条）

  await Model.getJobList({
    page: page,
    limit: limit,
  }).then(async (rawData) => {
    
    let list = rawData.map(e => {
      e.jobSetting = JSON.parse(e.jobSetting);
      e.dealDate = dayjs(e.dealDate).format('YYYY-MM-DD');
      e.createdAt = dayjs(e.createdAt).format('YYYY-MM-DD');
      return e
    })

    await Model.getJobAllCount().then(total=>{
      console.log(total);
      res.json({
        total: total[0].total,
        limit: limit,
        list: list
      })
    });
  }).catch(error=>{
    console.log("Controller.getJobList Error", error);
    res.json({
      msg: error
    })
  });
  
};

Controller.getJobOption = async function (req, res) {
  const rawData = await Model.getJobOption().then((e) => {
    const response = _.map(e, (result) => {
      return {
        value: result.id,
        label: result.jobTitle
      }
    })
    res.json(response)
  });
};

Controller.jobCreate = async function (req, res) {

  // console.log("jobCreate ", req.body);

  // res.json({
  //   "errcode": 40009,
  //   "errmsg": "处理失败"
  // })
  await Model.jobCreate({
    jobTitle: req.body.jobTitle,
    noPerPackage: req.body.noPerPackage || null,
    dealDate: req.body.dealDate || null,
    deliverySchedule: req.body.deliverySchedule || null,
    jobSetting: req.body.jobSetting || null,
    idClient: req.body.idClient || 0,
    createId: req.body.createId || 0
  }).then(async result => {

    // console.log("jobCreate resule : ", result.insertId);
    
    // await Model.jobAddDefaultSetting({
    //         idJob: result.insertId,
    //         size: req.body.size || null,
    //         color: req.body.color || null,
    //         material: req.body.material || null,
    //         materialWeight: req.body.materialWeight || null,
    //         qty: req.body.qty || null,
    //         pageCount: req.body.pageCount || null,
    //         binding: req.body.binding || null,
    //         pagination: req.body.pagination || null,
    //         unitPrice: req.body.unitPrice || null,
    //         amount: req.body.amount || null,
    //         sample: req.body.sample || null,
    //         finishing: req.body.finishing || null,
    //         specialInstruction: req.body.specialInstruction || null
    // }).then(setting=>{
    //   console.log("affectedRows :", setting.affectedRows);
    // })

    if (result.affectedRows) {
      res.json({
        "errcode": 0,
        "errmsg": "新增成功"
      })
    } else {
      res.json({
        "errcode": 40009,
        "errmsg": "处理失败"
      })
    }
  });

};

Controller.jobUpdate = async function (req, res) {
  // console.log("jobUpdate id:", req.params.id, req.body.jobTitle);
  

  let idJob = _.trim(req.params.idJob || '');
  
  if (!idJob) {
    return res.json({
      "errcode": 40002,
      "errmsg": "不合法的参数"
    });
  }
  console.log(req.body);

  await Model.jobUpdate({
    jobTitle: req.body.jobTitle,
    noPerPackage: req.body.noPerPackage || null,
    dealDate: req.body.dealDate || null,
    deliverySchedule: req.body.deliverySchedule || null,
    specialInstruction: req.body.specialInstruction || null,
    jobSetting: req.body.jobSetting || null,
    idJob: idJob
  }).then(result => {
    console.log(result);
    
    // console.log("jobUpdate data:::", req.body);
      
    // await Model.jobEditDefaultSetting({
    //   idDefaultJob: req.body.idDefaultJob,
    //   size: req.body.size || null,
    //   color: req.body.color || null,
    //   material: req.body.material || null,
    //   materialWeight: req.body.materialWeight || null,
    //   qty: req.body.qty || null,
    //   pageCount: req.body.pageCount || null,
    //   binding: req.body.binding || null,
    //   pagination: req.body.pagination || null,
    //   unitPrice: req.body.unitPrice || null,
    //   amount: req.body.amount || null,
    //   sample: req.body.sample || null,
    //   finishing: req.body.finishing || null,
    //   specialInstruction: req.body.specialInstruction || null
    // }).then(setting => {
    //   console.log("affectedRows :", setting.affectedRows);
    // })

    if (result.affectedRows >= 1) {
      res.json({
        "errcode": 0,
        "errmsg": "jobUpdate修改成功"
      });
    } else {
      res.json({
        "errcode": 40009,
        "errmsg": "jobUpdate处理失败"
      });
    }
  }).catch(error=>{
    console.log(error)
  });
  
};

// =========================== Product ====================

Controller.getProductDefaults = async function (req, res) {
  // console.log("getProductDefaults : ", req.body);
  console.log("getProductDefaults : ", req.query);
  let productIds = req.query;
  // let id = parseInt(req.params.id || 0);
  let product = await Model.getProductDefaults(productIds);
  res.json(product)
};

Controller.getProductDetails = async function (req, res) {
  let ids = req.query;
  console.log("ids S", Object.values(ids));
  
  await Model.getProductDetails( Object.values(ids) ).then(rawData => {
    console.log("getProductDetails : ", rawData);
    let list = rawData.map(e => {
      e.productSetting = JSON.parse(e.productSetting);
      e.dealDate = dayjs(e.dealDate).format('YYYY-MM-DD');
      e.createdAt = dayjs(e.createdAt).format('YYYY-MM-DD');
      return e
    })
    res.json(list)
  })
};

Controller.getProductDetail = async function (req, res) {
  let id = parseInt(req.params.id || 0);
  await Model.getProductDetail(id).then(rawData => {
    let list = rawData.map(e => {
      e.productSetting = JSON.parse(e.productSetting);
      e.dealDate = dayjs(e.dealDate).format('YYYY-MM-DD');
      e.createdAt = dayjs(e.createdAt).format('YYYY-MM-DD');
      return e
    })
    res.json(list[0])
  })
};


Controller.getProductList = async function (req, res) {
  let idJob = parseInt(req.query.idJob || 0); //页码（默认第1页）
  let page = parseInt(req.query.page || 1); //页码（默认第1页）
  let limit = parseInt(req.query.limit || 10); //每页显示条数（默认10条）

  let option = idJob ? { idJob: idJob } : {};

  option =  _.merge(option, {
    page: page,
    limit: limit,
  });
  console.log("Controller.getProductList option:", option);
  
  await Model.getProductList(option).then(async (rawData) => {

    console.log("getProductList : ", rawData);
    
    let list = rawData.map(e => {
      e.productSetting = JSON.parse(e.productSetting);
      e.dealDate = dayjs(e.dealDate).format('YYYY-MM-DD');
      e.createdAt = dayjs(e.createdAt).format('YYYY-MM-DD');
      return e
    })

    await Model.getProductAllCount(option).then(total => {
      // console.log("Total    ::: ",total);
      
      res.json({
        total: total[0].total,
        limit: limit,
        list: list
      })
    });
  });

};

Controller.productCreate = async function (req, res) {

  let idJob = req.body.idJob;
  let createId = req.body.createId;
  // let productName = req.body.productName || null;

  // console.log("productCreate ::: ", req.body);
  // res.json({
  //   "errcode": 40009,
  //   "errmsg": "处理失败"
  // })

  console.log("productCreate data::", req.body);
  

  await Model.productCreate(idJob, {
      productName : req.body.productName,
      productSetting: req.body.productSetting,
    }, createId).then(async result => {

    // await Model.productAddDefaultSetting({
    //   idProduct: result.insertId,
    //   size: req.body.size || null,
    //   color: req.body.color || null,
    //   material: req.body.material || null,
    //   materialWeight: req.body.materialWeight || null,
    //   qty: req.body.qty || null,
    //   pageCount: req.body.pageCount || null,
    //   binding: req.body.binding || null,
    //   pagination: req.body.pagination || null,
    //   unitPrice: req.body.unitPrice || null,
    //   amount: req.body.amount || null,
    //   sample: req.body.sample || null,
    //   finishing: req.body.finishing || null,
    //   specialInstruction: req.body.specialInstruction || null
    // }).then(setting=>{
    //   console.log(" productAddDefaultSetting : ", setting.affectedRows);
    // })


    if (result.affectedRows) {
      res.json({
        "errcode": 0,
        "errmsg": "新增成功"
      })
    } else {
      res.json({
        "errcode": 40009,
        "errmsg": "处理失败"
      })
    }
  });

};

Controller.productUpdate = async function (req, res) {

  let idProduct = _.trim(req.params.idProduct || '');
  console.log("productUpdate ", idProduct);

  if (!idProduct) {
    return res.json({
      "errcode": 40002,
      "errmsg": "不合法的参数"
    });
  }
  console.log("productUpdate ", req.body);
  
  await Model.productUpdate({
    idJob: req.body.idJob,
    productName: req.body.productName,
    productSetting: req.body.productSetting,
    // noPerPackage: req.body.noPerPackage || null,
    // dealDate: req.body.dealDate || null,
    // deliverySchedule: req.body.deliverySchedule || null,
    idProduct: req.body.idProduct,
    // idProduct: idProduct
  }).then(async result => {

  //   console.log("productUpdate data:::", req.body);

    // await Model.productEditDefaultSetting({
    //   idDefaultProduct: req.body.idDefaultProduct,
    //   size: req.body.size || null,
    //   color: req.body.color || null,
    //   material: req.body.material || null,
    //   materialWeight: req.body.materialWeight || null,
    //   qty: Number(req.body.qty) || null,
    //   pageCount: req.body.pageCount || null,
    //   binding: req.body.binding || null,
    //   pagination: req.body.pagination || null,
    //   unitPrice: Number(req.body.unitPrice) || null,
    //   amount: Number(req.body.amount) || null,
    //   sample: req.body.sample || null,
    //   finishing: req.body.finishing || null,
    //   specialInstruction: req.body.specialInstruction || null
    // }).then(setting => {
    //   console.log("affectedRows :", setting.affectedRows);
    // })

    if (result.affectedRows >= 1) {
      res.json({
        "errcode": 0,
        "errmsg": "修改成功"
      });
    } else {
      res.json({
        "errcode": 40009,
        "errmsg": "处理失败"
      });
    }
  })


};






Controller.processGetProcess = async function (req, res) {
  // console.log(req.params.idproduct);
  const idProduct = req.params.idProduct;
  console.log(idProduct);
  const print = await Model.processPrintGet(idProduct).then((result) => {
    console.log('get print: ', result);
    // res.json(JSON.parse(JSON.stringify(result)))
    return JSON.parse(JSON.stringify(result))
  })

  const binding = await Model.processBindingGet(idProduct).then((result) => {
    console.log('get binding: ', result);
    // res.json(JSON.parse(JSON.stringify(result)))
    return JSON.parse(JSON.stringify(result))
  })

  const finishing = await Model.processFinishingGet(idProduct).then((result) => {
    console.log('get finishing: ', result);
    // res.json(JSON.parse(JSON.stringify(result)))
    return JSON.parse(JSON.stringify(result))
  })

  const package = await Model.processPackageGet(idProduct).then((result) => {
    console.log('get package: ', result);
    // res.json(JSON.parse(JSON.stringify(result)))
    return JSON.parse(JSON.stringify(result))
  })

  const other = await Model.processOtherGet(idProduct).then((result) => {
    console.log('get other: ', result);
    // res.json(JSON.parse(JSON.stringify(result)))
    return JSON.parse(JSON.stringify(result))
  })

  const delivery = await Model.processDeliveryGet(idProduct).then((result) => {
    console.log('get delivery: ', result);
    // res.json(JSON.parse(JSON.stringify(result)))
    return JSON.parse(JSON.stringify(result))
  })

  res.json({
    print: print,
    binding: binding,
    finishing: finishing,
    package: package,
    delivery: delivery,
    other: other,
  })

}

Controller.processUpdate = async function (req, res) {
  let success = true;
  // console.log(req.body.idproduct);
  const idProduct = req.body.idproduct;

  // Dealing with Print
  for (const print of req.body.print) {
    console.log("Update Process",print);
    if (!print.show && print.id) { // Delete
      // if (!print.id) return
      await Model.processPrintDelete(print.id).then((result) => {
        if (!result.affectedRows) { success = false }
      })
    } else if (print.show && print.id) { // Update
      await Model.processPrintUpdate(print.id, print).then((result) => {
        console.log(result);
        if (!result.affectedRows) { success = false }
      })
    } else if (print.show && !print.id) { // Add new
      await Model.processPrintCreate(idProduct, print).then((result) => {
        console.log("processPrintCreate :: ", result);
        if (!result.affectedRows) { success = false }
      })
    }
  }

  // Dealing with Binding
  console.log("binding ::::", req.body.binding);
  for (const binding of req.body.binding) {
    // console.log("Update Process", binding);
    if (!binding.show && binding.id) { // Delete
      console.log("Delete Process", binding);
      // if (!binding.id) return
      await Model.processBindingDelete(binding.id).then((result) => {
        if (!result.affectedRows) { success = false }
      })
    } else if (binding.show && binding.id) { // Update
      console.log("Update Process", binding);
      await Model.processBindingUpdate(binding.id, binding).then((result) => {
        console.log(result);
        if (!result.affectedRows) { success = false }
      })
    } else if (binding.show && !binding.id) { // Add new
      console.log("Add Process", binding);
      await Model.processBindingCreate(idProduct, binding).then((result) => {
        console.log(result);
        if (!result.affectedRows) { success = false }
      })
    }
  }

  // Dealing with Finishing
  console.log("finishing ::::", req.body.binding);
  // const finishing = req.body.finishing;
  for (const finishing of req.body.finishing) {
    // console.log("Update Process", finishing);
    if (!finishing.show && finishing.id) { // Delete
      console.log("Delete Process", finishing);
      // if (!finishing.id) return
      await Model.processFinishingDelete(finishing.id).then((result) => {
        if (!result.affectedRows) { success = false }
      })
    } else if (finishing.show && finishing.id) { // Update
      console.log("Update Process", finishing);
      await Model.processFinishingUpdate(finishing.id, finishing).then((result) => {
        console.log(result);
        if (!result.affectedRows) { success = false }
      })
    } else if (finishing.show && !finishing.id) { // Add new
      console.log("Add Process", finishing);
      await Model.processFinishingCreate(idProduct, finishing).then((result) => {
        console.log(result);
        if (!result.affectedRows) { success = false }
      })
    }
  }

  // Dealing with Package
  console.log("Package ::::", req.body.package);
  // const package = req.body.package;
  for (const package of req.body.package) {
    // console.log("Update Process", Package);
    if (!package.show && package.id) { // Delete
      console.log("Delete Process", package);
      // if (!package.id) return
      await Model.processPackageDelete(package.id).then((result) => {
        if (!result.affectedRows) { success = false }
      })
    } else if (package.show && package.id) { // Update
      console.log("Update Process", package);
      await Model.processPackageUpdate(package.id, package).then((result) => {
        console.log(result);
        if (!result.affectedRows) { success = false }
      })
    } else if (package.show && !package.id) { // Add new
      console.log("Add Process", package);
      await Model.processPackageCreate(idProduct, package).then((result) => {
        console.log(result);
        if (!result.affectedRows) { success = false }
      })
    }
  }



  // Dealing with Delivery
  console.log("Delivery ::::", req.body.delivery);
  // const delivery = req.body.delivery;
  for (const delivery of req.body.delivery) {
    // console.log("Update Process", delivery);
    if (!delivery.show && delivery.id) { // Delete
      console.log("Delete Process", delivery);
      // if (!delivery.id) return
      await Model.processDeliveryDelete(delivery.id).then((result) => {
        if (!result.affectedRows) { success = false }
      })
    } else if (delivery.show && delivery.id) { // Update
      console.log("Update Process", delivery);
      await Model.processDeliveryUpdate(delivery.id, delivery).then((result) => {
        console.log(result);
        if (!result.affectedRows) { success = false }
      })
    } else if(delivery.show && !delivery.id) { // Add new
      console.log("Add Process", delivery);
      await Model.processDeliveryCreate(idProduct, delivery).then((result) => {
        console.log(result);
        if (!result.affectedRows) { success = false }
      })
    }
  }



  
  // Dealing with Other
  console.log("Other ::::", req.body.other);
  // const Other = req.body.other;
  for (const other of req.body.other) {
    // console.log("Update Process", Other);
    if (!other.show && other.id) { // Delete
      console.log("Delete Process", other);
      // if (!other.id) return
      await Model.processOtherDelete(other.id).then((result) => {
        if (!result.affectedRows) { success = false }
      })
    } else if (other.show && other.id) { // Update
      console.log("Update Process", other);
      await Model.processOtherUpdate(other.id, other).then((result) => {
        console.log(result);
        if (!result.affectedRows) { success = false }
      })
    } else if (other.show && !other.id) { // Add new
      console.log("Add Process", other);
      await Model.processOtherCreate(idProduct, other).then((result) => {
        console.log(result);
        if (!result.affectedRows) { success = false }
      })
    }
  }






  if (success) {
    res.json({
      "errcode": 0,
      "errmsg": "修改成功"
    });
  } else {
    res.json({
      "errcode": 40009,
      "errmsg": "处理失败"
    })
  }


  // console.log(req.body.blinding);
  // console.log(req.body.finishing);
  // console.log(req.body.package);
  // console.log(req.body.delivery);
  // console.log(req.body.other);
  
  
  // let id = _.trim(req.params.id || '');
  // if (!id) {
  //   return res.json({
  //     "errcode": 40002,
  //     "errmsg": "不合法的参数"
  //   });
  // }
  // await Model.productUpdate({
  //   jobTitle: req.body.jobTitle,
  //   noPerPackage: req.body.noPerPackage,
  //   dealDate: req.body.dealDate || '',
  //   deliverySchedule: req.body.deliverySchedule || '',
  //   id: id
  // }).then(result => {
  //   if (result.affectedRows >= 1) {
  //     res.json({
  //       "errcode": 0,
  //       "errmsg": "修改成功"
  //     });
  //   } else {
  //     res.json({
  //       "errcode": 40009,
  //       "errmsg": "处理失败"
  //     });
  //   }
  // })

};








module.exports = Controller;
