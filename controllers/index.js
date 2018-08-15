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
        "errmsg": "Add record Fails"
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


Controller.getJobList = async function (req, res) {
  let page = parseInt(req.query.page || 1); //页码（默认第1页）
  let limit = parseInt(req.query.limit || 10); //每页显示条数（默认10条）

  await Model.getJobList({
    page: page,
    limit: limit,
  }).then(async (rawData) => {
    
    let list = rawData.map(e => {
      e.dealDate = dayjs(e.dealDate).format('YYYY-MM-DD');
      e.createAt = dayjs(e.createAt).format('YYYY-MM-DD');
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
        "errmsg": "Add record Fails"
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
      e.createAt = dayjs(e.createAt).format('YYYY-MM-DD');
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
        "errmsg": "Add record Fails"
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
  await Model.processGetPrint(idProduct).then((result) => {
    // console.log('asdasd: ',result);
    
    res.json(JSON.parse(JSON.stringify(result)))
  })
}

Controller.processUpdate = async function (req, res) {
  let success = true;
  // console.log(req.body.idproduct);
  const idProduct = req.body.idproduct;
  // console.log(req.body.print);
  for (const print of req.body.print) {
    console.log("Update Process",print);

    if(print.show){
      await Model.processPrintDelete(print.id).then((result) => {
        if (!result.affectedRows) { success = false }
      })
    }else if(print.id) {
      await Model.processPrintUpdate(print.id, print).then((result) => {
        console.log(result);
        if (!result.affectedRows) { success = false }
      })
    }else{
      // await Model.processPrintCreate(idProduct, print).then((result) => {
      //   console.log(result);
      // })
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
      "errmsg": "Add record Fails"
    })
  }


  console.log(req.body.blinding);
  console.log(req.body.finishing);
  console.log(req.body.package);
  console.log(req.body.delivery);
  console.log(req.body.other);
  
  
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
