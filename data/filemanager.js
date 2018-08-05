const { query } = require('../db');

const model = {};

// 
model.findAll = function (option) {
  let _sql = "SELECT * FROM job LIMIT ? , ?"
  return query(_sql, [(option.page - 1) * option.limit, option.limit])
}

model.findAllCount = function () {
  let _sql = "SELECT COUNT(id) as total FROM job"
  return query(_sql, [])
}

model.add = function (filename, path, ext, mimetype, size, createId) {
  let _sql = `INSERT INTO filemanager (filename,  path,  ext,  mimetype, size, createId) VALUES( ? , ? , ? , ? , ? , ?)`;
  return query(_sql, [filename, path, ext, mimetype, size, createId])
}

model.update = function (params) {
  let _sql = `UPDATE job SET jobTitle = ?, noPerPackage = ?, dealDate = ?, deliverySchedule = ? WHERE id = ?`;
  return query(_sql, [params.jobTitle, params.noPerPackage, params.dealDate, params.deliverySchedule, params.id])
}

module.exports = model