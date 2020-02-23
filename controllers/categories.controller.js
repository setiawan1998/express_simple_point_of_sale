const connection = require('../config/connection')
const response = require('../config/response')

exports.index = (req, res) => {
    connection.query(`SELECT * FROM productCategories`, 
    (err, result) => {
        if(err){
            response.err(res, err)
        }
        response.success(res, result)
    })
}
exports.show = (req, res) => {
    const id = req.params.id;
    connection.query(`SELECT * FROM productCategories WHERE id='${id}'`, 
    (err, result) => {
        if(err){
            response.err(res, err)
        }
        response.success(res, result)
    })
}
exports.store = (req, res) => {
    const name = req.body.name;
    connection.query(`INSERT INTO productCategories (name) VALUES ('${name}')`, 
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
    connection.query(`UPDATE productCategories SET name='${name}' WHERE id='${id}'`, 
    (err, result) => {
        if(err){
            response.err(res, err)
        }
        response.success(res, result)
    })
}
exports.destroy = (req, res) => {
    const id = req.params.id;
    connection.query(`SELECT * FROM products WHERE categoryId='${id}'`, 
    (err, result) => {
        if(err){
            response.err(res, err)
        }
        if(result.length === 0){
            connection.query(`DELETE FROM productCategories WHERE id='${id}'`, 
            (err, result)=> {
                if(err){
                    response.err(res, err)
                }
                response.success(res, result)
            })
        }else{
            response.denied(res, `Cannot Delete`)
        }
    })
}