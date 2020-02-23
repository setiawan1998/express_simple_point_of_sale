const connection = require('../config/connection')
const response = require('../config/response')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const code = require('../config/secretCode')

exports.index = (req, res) => {
    connection.query(`SELECT * FROM users`, 
    (err, result) => {
        if(err){
            response.err(res, err)
        }
        response.success(res, result)
    })
}
exports.show = (req, res) => {
    const id = req.params.id
    connection.query(`SELECT * FROM users WHERE id='${id}'`, 
    (err, result) => {
        if(err){
            response.err(res, err)
        }
        response.success(res, result)
    })
}

exports.store = (req, res) => {
    const email = req.body.email
    const password = bcrypt.hashSync(req.body.password.toString(), 8)
    const access = req.body.access
    connection.query(`SELECT * FROM users WHERE email='${email}'`, 
    (err, result) => {
        if(err){
            response.err(res, err)
        }else{
            if(result.length === 0){
                connection.query(`INSERT INTO users (email, password, access) VALUES ('${email}','${password}','${access}')`, 
                (err, result) => {
                    if(err){
                        response.err(res, err)
                    }
                    response.success(res, result)
                })
            }else{
                response.err(res, 'Email already exist')
            }
        }
    })
}

exports.update = (req, res) => {
    const id = req.params.id
    const email = req.body.email
    const password = bcrypt.hashSync(req.body.password, 8)
    const access = req.body.access
    connection.query(`UPDATE users SET email='${email}', password='${password}', access='${access}' WHERE id='${id}'`, 
    (err, result) => {
        if(err){
            response.err(res, err)
        }
        response.success(res, result)
    })
}

exports.destroy = (req, res) => {
    const id = req.params.id
    connection.query(`DELETE FROM users WHERE id='${id}'`, 
    (err, result) => {
        if(err){
            response.err(res, err)
        }
        response.success(res, result)
    })
}

exports.signin = (req, res) => {
    const email = req.body.email
    const password = req.body.password
    connection.query(`SELECT * FROM users WHERE email='${email}'`, 
    (err, result) => {
        if(err){
            response.err(res, err)
        }else{
            if(result.length===0){
                response.denied(res, `Email or Password Wrong`)
            }else{
                if(bcrypt.compareSync(password.toString(), result[0].password)) {
                    const date = new Date();
                    if(result[0].token !== null && date <= result[0].tokenExpired){
                        response.success(res, result)
                    }else{
                        const token = jwt.sign({
                            body: `${result.id}&${result.email}`
                        }, 
                        code.jwt, 
                        {
                            expiresIn: '7d'
                        });
                        const tokenExpired = new Date();
                        tokenExpired.setDate(tokenExpired.getDate()+7);
                        connection.query(`UPDATE users SET token='${token}', tokenExpired='${tokenExpired.toISOString().substring(0,10)}' WHERE id='${result[0].id}'`, (err, result)=>{
                            if(err){
                                response.err(res, err)
                            }
                            connection.query(`SELECT * FROM users WHERE email='${email}'`, 
                            (err, result) => {
                                if(err){
                                    response.err(res, err)
                                }
                                response.success(res, result)
                            })
                        })
                    }
                }else{
                    response.denied(res, `Email or Password Wrong`)
                }
            }
        }
    })
}