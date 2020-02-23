const connection = require('../config/connection')
const response = require('../config/response')

exports.index = (req, res) => {
    connection.query(`SELECT *,stockHistories.id as id FROM stockHistories LEFT JOIN products ON stockHistories.productId=products.id LEFT JOIN users ON stockHistories.operator=users.id`, 
    (err, result) => {
        if(err){
            response.err(res, err)
        }
        response.success(res, result)
    })
}
exports.show = (req, res) => {
    const id = req.params.id;
    connection.query(`SELECT *,stockHistories.id as id FROM stockHistories LEFT JOIN products ON stockHistories.productId=products.id LEFT JOIN users ON stockHistories.operator=users.id WHERE stockHistories.id='${id}'`, 
    (err, result) => {
        if(err){
            response.err(res, err)
        }
        response.success(res, result)
    })
}
exports.product = (req, res) => {
    const productId = req.params.id;
    connection.query(`SELECT *,stockHistories.id as id FROM stockHistories LEFT JOIN products ON stockHistories.productId=products.id LEFT JOIN users ON stockHistories.operator=users.id WHERE stockHistories.productId='${productId}'`, 
    (err, result) => {
        if(err){
            response.err(res, err)
        }
        response.success(res, result)
    })
}
exports.store = (req, res) => {
    const productId = req.body.productId;
    const category = req.body.category;
    const qty = req.body.qty;
    const operator = req.body.operator;
    const remark = req.body.remark;
    connection.query(`INSERT INTO stockHistories (productId, category, qty, operator, remark) VALUES ('${productId}','${category}','${qty}','${operator}','${remark}')`, 
    (err, result) => {
        if(err){
            response.err(res, err)
        }else{
            if(category===0){
                connection.query(`UPDATE products SET stock=stock+'${qty}' WHERE id='${productId}'`, 
                (err, result) => {
                    if(err){
                        response.err(res, err)
                    }
                    response.success(res, result)
                })
            }else if(category===1){
                connection.query(`UPDATE products SET stock=stock-'${qty}' WHERE id='${productId}'`, 
                (err, result) => {
                    if(err){
                        response.err(res, err)
                    }
                    response.success(res, result)
                })
            }else if(category===2){
                connection.query(`UPDATE products SET stock='${qty}' WHERE id='${productId}'`, 
                (err, result) => {
                    if(err){
                        response.err(res, err)
                    }
                    response.success(res, result)
                })
            }
        }
    })
}