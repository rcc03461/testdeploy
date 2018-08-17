const mysql = require('mysql2')
const pool = mysql.createPool({
  user: 'root',
  password: '',
  database: 'cre',
  host: 'localhost',
})
// const pool = mysql.createPool({
//   user: 'root',
//   password: '',
//   database: 'cre',
//   host: 'localhost',
// })


const query = function (sql, values) {

  return new Promise((resolve, reject) => {
    pool.getConnection(function (err, connection) {
      if (err) {
        resolve(err)
      } else {
        connection.query(sql, values, (err, rows) => {
          console.log("exec : ", sql, ' ', new Date());
          
          if (err) {
            reject(err)
          } else {
            resolve(rows)
          }
          connection.release()
        })
      }
    })
  })

}


module.exports = {
  query,
  pool
}
