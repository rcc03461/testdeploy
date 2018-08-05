/**
 * users 控制器
 *
 * Created by jerry on 2017/11/2.
 */

const Model = require('../data/job');
// import dayjs from 'dayjs'
// Or CommonJS
var dayjs = require('dayjs');

let Controller = {};
// let Model = Client;

/**
 * 检查用户的登录状态
 * @param req
 * @param res
 * @param next
 */
Controller.find = async function(req, res) {
  let page = parseInt(req.query.page || 1); //页码（默认第1页）
  let limit = parseInt(req.query.limit || 10); //每页显示条数（默认10条）
  // let name = req.query.name || ''; //图书名称
  // let total = 0;
  // let rltBooks = [];
  // if (name.length > 0) {
  const rawData = await Model.findAll({
    page:page,
    limit:limit,
  });
  let list = JSON.parse(JSON.stringify(rawData));
  list.map(e => {
    e.dealDate = dayjs(e.dealDate).format('YYYY-MM-DD');
    e.createAt = dayjs(e.createAt).format('YYYY-MM-DD');
    return e
  })
  console.log(list);
  
  const rawDataTotal = await Model.findAllCount();
  let total = JSON.parse(JSON.stringify(rawDataTotal));

  // const rawData = await Model.findAll({
  //   page:page,
  //   limit:limit,
  // });
  // list = JSON.parse(JSON.stringify(rawData));
  // console.log(post);
   
  //   // console.log(_Client.getAllClient());
    
  //   // let mockBooks = _Books.filter(book => {
  //   //   return book.name.indexOf(name) > -1;
  //   // });
  //   // total = mockBooks.length; //总条数
  //   // rltBooks = mockBooks.filter((u, index) => index < limit * page && index >= limit * (page - 1))
  // } else {
  //   // total = _Books.length; //总条数
  //   // rltBooks = _Books.filter((u, index) => index < limit * page && index >= limit * (page - 1))
  // }
  res.json({
    total: total[0].total,
    limit: limit,
    list: list
  })
};

Controller.create = async function(req, res) {
  // let name = req.body.name;
  // let author = req.body.author;
  // let description = req.body.description;
  // let publishAt = req.body.publishAt;
  console.log(req.body.dealDate);
  
  const rawData = await Model.add({
    jobTitle: req.body.jobTitle,
    noPerPackage: req.body.noPerPackage,
    dealDate: req.body.dealDate || '',
    deliverySchedule: req.body.deliverySchedule || ''
  });
  const result = JSON.parse(JSON.stringify(rawData))
  // console.log(JSON.parse(JSON.stringify(queryResult)));
  if (result.affectedRows >= 1) {
    res.json({
      "errcode": 0,
      "errmsg": "新增成功"
    })
  }else{
    res.json({
      "errcode": 0,
      "errmsg": "Add record Fails"
    })
  }

};

Controller.update = async function(req, res) {

  let id = _.trim(req.params.id || '');
  if (!id) {
    return res.json({
      "errcode": 40002,
      "errmsg": "不合法的参数"
    });
  }
  const rawData = await Model.update({
    jobTitle: req.body.jobTitle,
    noPerPackage: req.body.noPerPackage,
    dealDate: req.body.dealDate || '',
    deliverySchedule: req.body.deliverySchedule || '',
    id:id
  })
// console.log(rawData);
// console.log("Raw data ",rawData);

  const result = JSON.parse(JSON.stringify(rawData))

  // console.log(" res ",result);
    
  // let i = _.findIndex(_Books, function (u) {
  //   return u.id === id
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
};


module.exports = Controller;
