const connection = require('../config/connection')
const response = require('../config/response')
const bcrypt = require('bcrypt')

exports.index = (req, res) => {
    connection.query(`SELECT *, orders.id as id FROM orders ORDER BY orders.createdAt DESC`, 
    (err, result) => {
        if(err){
            response.err(res, err)
        }
        response.success(res, result)
    })
}
exports.show = (req, res) => {
    const id = req.params.id
    connection.query(`SELECT *, orders.id as id FROM orders LEFT JOIN orderDetail ON orders.id=orderDetail.orderId LEFT JOIN products ON orderDetail.productId=products.id WHERE orders.id='${id}' ORDER BY orders.createdAt DESC`, 
    (err, result) => {
        if(err){
            response.err(res, err)
        }
        response.success(res, result)
    })
}

exports.search = (req, res) => {
    const customer = req.body.customer
    connection.query(`SELECT *, orders.id as id FROM orders WHERE orders.customer LIKE'%${customer}%' ORDER BY orders.createdAt DESC`, 
    (err, result) => {
        if(err){
            response.err(res, err)
        }
        response.success(res, result)
    })
}

exports.store = (req, res) => {
    const orderNumber = `${new Date().valueOf()}`;
    const customer = req.body.customer
    const operator = req.body.operator
    const subtotal = req.body.subtotal
    connection.query(`INSERT INTO orders (orderNumber, customer, operator, subtotal) VALUES ('${orderNumber}','${customer}','${operator}','${subtotal}')`, 
    (err, result) => {
        if(err){
            response.err(res, err)
        }
        response.success(res, result)
    })
}

exports.detail = (req, res) => {
    const orderId = req.body.orderId
    const productId = req.body.productId
    const price = req.body.price
    const qty = req.body.qty
    const total = req.body.total
    const remark = req.body.remark
    const operator = req.body.operator
    connection.query(`INSERT INTO orderDetail (orderId, productId, price, qty, total, remark) VALUES ('${orderId}', '${productId}', '${price}', '${qty}', '${total}', '${remark}')`, 
    (err, result) => {
        if(err){
            response.err(res, err)
        }
        connection.query(`UPDATE products SET stock=stock-'${qty}' WHERE id='${productId}'`, 
        (err, result) => {
            if(err){
                response.err(res, err)
            }
            connection.query(`INSERT INTO stockHistories (productId, category, qty, operator, remark) VALUES ('${productId}','1','${qty}','${operator}','Transaction')`, 
            (err, result) => {
                if(err){
                    response.err(res, err)
                }
                response.success(res, result)
            })
        })
    })
}


exports.update = (req, res) => {
    const id = req.params.id
    const customer = req.body.customer
    const operator = req.body.operator
    const subtotal = req.body.subtotal
    connection.query(`UPDATE orders SET customer='${customer}',operator='${operator}',subtotal='${subtotal}' WHERE id='${id}'`, 
    (err, result) => {
        if(err){
            response.err(res, err)
        }
        response.success(res, result)
    })
}