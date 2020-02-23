const connection = require('../config/connection')
const response = require('../config/response')
const fs = require('fs')

exports.index = (req, res) => {
    connection.query(`
        SELECT *, products.id as id, products.name as name, productCategories.name as category FROM products LEFT JOIN productCategories ON products.categoryId=productCategories.id`, 
        (err, result) => {
        if(err){
            response.err(res, err)
        }
        response.success(res, result)
    })
}
exports.show = (req, res) => {
    const id = req.params.id;
    connection.query(`
        SELECT *, products.id as id, products.name as name, productCategories.name as category FROM products LEFT JOIN productCategories ON products.categoryId=productCategories.id WHERE products.id='${id}'`, 
        (err, result) => {
        if(err){
            response.err(res, err)
        }
        response.success(res, result)
    })
}
exports.store = (req, res) => {
    const name = req.body.name;
    const categoryId = req.body.categoryId;
    const price = req.body.price;
    const stock = req.body.stock;

    const imageName = `${Date.now()}.png`;
    const imageFile = req.body.image.replace(/^data:([A-Za-z-+/]+);base64,/, '');
    fs.writeFileSync(`./images/products/${imageName}`, imageFile, { encoding: 'base64' })
    connection.query(`
        INSERT INTO products (name, categoryId, price, stock, image) VALUES ('${name}','${categoryId}','${price}','${stock}','${imageName}')`, 
        (err, result) => {
        if(err){
            response.err(res, err)
        }
        response.success(res, result)
    })
}
exports.update = (req, res) => {
    const id = req.params.id;
    const name = req.body.name;
    const categoryId = req.body.categoryId;
    const price = req.body.price;
    if(req.body.image !== undefined && req.body.image !== null && req.body.image !== ""){
        const imageName = `${Date.now()}.png`;
        const imageFile = req.body.image.replace(/^data:([A-Za-z-+/]+);base64,/, '');
        fs.writeFileSync(`./images/products/${imageName}`, imageFile, { encoding: 'base64' })
        connection.query(`
            UPDATE products SET name='${name}', categoryId='${categoryId}', price='${price}', image='${imageName}' WHERE id='${id}'`, 
            (err, result) => {
            if(err){
                response.err(res, err)
            }
            response.success(res, result)
        })
    }else{
        connection.query(`
            UPDATE products SET name='${name}', categoryId='${categoryId}', price='${price}' WHERE id='${id}'`, 
            (err, result) => {
            if(err){
                response.err(res, err)
            }
            response.success(res, result)
        })
    }
}
exports.destroy = (req, res) => {
    const id = req.params.id;
    connection.query(`DELETE FROM products WHERE id='${id}'`, 
    (err, result) => {
        if(err){
            response.err(res, err)
        }
        response.success(res, result)
    })
}