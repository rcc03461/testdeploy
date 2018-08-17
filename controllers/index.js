/**
 * users 控制器
 *
 * Created by jerry on 2017/11/2.
 */

const Model = require('../data/index');
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
  let option = req.body;
  // console.log("invoice :::::", req.body);
  const products = await Model.invoiceGetDetail(option).then(list => {
      return list
  });


  
  res.json(products)
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
    attn: req.body.attn || '',
    clientMail: req.body.clientMail || '',
    billingAddress: req.body.billingAddress || ''
  }).then(result => {
    console.log(result);
    
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
  });
  // const result = JSON.parse(JSON.stringify(rawData))
  // console.log(JSON.parse(JSON.stringify(queryResult)));

};

Controller.clientUpdate = async function (req, res) {

  let id = _.trim(req.params.id || '');
  if (!id) {
    return res.json({
      "errcode": 40002,
      "errmsg": "不合法的参数"
    });
  }
  await Model.clientUpdate({
    clientCode: req.body.clientCode,
    clientName: req.body.clientName,
    attn: req.body.attn,
    clientMail: req.body.clientMail,
    billingAddress: req.body.billingAddress,
    id: id
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
  const idjob = req.params.idjob;
  await Model.getJobDetail(idjob).then(async (rawData) => {
    
    let list = rawData.map(e => {
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

  const rawData = await Model.jobCreate({
    jobTitle: req.body.jobTitle || '',
    noPerPackage: req.body.noPerPackage || '',
    dealDate: req.body.dealDate || '',
    deliverySchedule: req.body.deliverySchedule || '',
    idClient: req.body.idClient || 0,
    createId: req.body.createId || 0
  }).then(result => {
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
  let id = _.trim(req.params.id || '');
  if (!id) {
    return res.json({
      "errcode": 40002,
      "errmsg": "不合法的参数"
    });
  }
  await Model.jobUpdate({
    jobTitle: req.body.jobTitle,
    noPerPackage: req.body.noPerPackage,
    dealDate: req.body.dealDate || '',
    deliverySchedule: req.body.deliverySchedule || '',
    id: id
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

// =========================== Product ====================

Controller.getProductList = async function (req, res) {
  let idjob = parseInt(req.query.idjob || 0); //页码（默认第1页）
  let page = parseInt(req.query.page || 1); //页码（默认第1页）
  let limit = parseInt(req.query.limit || 10); //每页显示条数（默认10条）

  let option = idjob ? { idjob: idjob } : {};

  option =  _.merge(option, {
    page: page,
    limit: limit,
  });
  
  await Model.getProductList(option).then(async (rawData) => {

    let list = rawData.map(e => {
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

  let idJob = req.body.idJob || '';
  let createId = req.body.createId || '';
  let productName = req.body.productName || '';

  console.log("productCreate ::: ", req.body);
  
  await Model.productCreate(idJob, productName, createId).then(result => {
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
  console.log(req.body);

};






Controller.processGetProcess = async function (req, res) {
  // console.log(req.params.idproduct);
  const idProduct = req.params.idproduct;
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
    if (!print.show) { // Delete
      // if (!print.id) return
      await Model.processPrintDelete(print.id).then((result) => {
        if (!result.affectedRows) { success = false }
      })
    }else if(print.id) { // Update
      await Model.processPrintUpdate(print.id, print).then((result) => {
        console.log(result);
        if (!result.affectedRows) { success = false }
      })
    }else{ // Add new
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
    if (!binding.show) { // Delete
      console.log("Delete Process", binding);
      // if (!binding.id) return
      await Model.processBindingDelete(binding.id).then((result) => {
        if (!result.affectedRows) { success = false }
      })
    } else if (binding.id) { // Update
      console.log("Update Process", binding);
      await Model.processBindingUpdate(binding.id, binding).then((result) => {
        console.log(result);
        if (!result.affectedRows) { success = false }
      })
    }else{ // Add new
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
    if (!finishing.show) { // Delete
      console.log("Delete Process", finishing);
      // if (!finishing.id) return
      await Model.processFinishingDelete(finishing.id).then((result) => {
        if (!result.affectedRows) { success = false }
      })
    } else if (finishing.id) { // Update
      console.log("Update Process", finishing);
      await Model.processFinishingUpdate(finishing.id, finishing).then((result) => {
        console.log(result);
        if (!result.affectedRows) { success = false }
      })
    }else{ // Add new
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
    if (!package.show) { // Delete
      console.log("Delete Process", package);
      // if (!package.id) return
      await Model.processPackageDelete(package.id).then((result) => {
        if (!result.affectedRows) { success = false }
      })
    } else if (package.id) { // Update
      console.log("Update Process", package);
      await Model.processPackageUpdate(package.id, package).then((result) => {
        console.log(result);
        if (!result.affectedRows) { success = false }
      })
    }else{ // Add new
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
    if (!delivery.show) { // Delete
      console.log("Delete Process", delivery);
      // if (!delivery.id) return
      await Model.processDeliveryDelete(delivery.id).then((result) => {
        if (!result.affectedRows) { success = false }
      })
    } else if (delivery.id) { // Update
      console.log("Update Process", delivery);
      await Model.processDeliveryUpdate(delivery.id, delivery).then((result) => {
        console.log(result);
        if (!result.affectedRows) { success = false }
      })
    }else{ // Add new
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
    if (!other.show) { // Delete
      console.log("Delete Process", other);
      // if (!other.id) return
      await Model.processOtherDelete(other.id).then((result) => {
        if (!result.affectedRows) { success = false }
      })
    } else if (other.id) { // Update
      console.log("Update Process", other);
      await Model.processOtherUpdate(other.id, other).then((result) => {
        console.log(result);
        if (!result.affectedRows) { success = false }
      })
    }else{ // Add new
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
