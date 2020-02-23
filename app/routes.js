const prefix = require('../config/prefix')
const categories = require('../controllers/categories.controller')
const products = require('../controllers/products.controller')
const users = require('../controllers/users.controller')
const stock = require('../controllers/stock.controller')
const orders = require('../controllers/orders.controller')
const secirity = require('../config/security')

module.exports = (app) => {
    app.post(`${prefix}/signin`, users.signin)

    app.get(`${prefix}/categories`, secirity.authentication, secirity.authorization, categories.index)
    app.get(`${prefix}/category/:id`, secirity.authentication, secirity.authorization, categories.show)
    app.post(`${prefix}/category`, secirity.authentication, secirity.authorization, categories.store)
    app.put(`${prefix}/category/:id`, secirity.authentication, secirity.authorization, categories.update)
    app.delete(`${prefix}/category/:id`, secirity.authentication, secirity.authorization, categories.destroy)

    app.get(`${prefix}/products`, secirity.authentication, secirity.authorization , products.index)
    app.get(`${prefix}/product/:id`, secirity.authentication, secirity.authorization, products.show)
    app.post(`${prefix}/product`, secirity.authentication, secirity.authorization, products.store)
    app.put(`${prefix}/product/:id`, secirity.authentication, secirity.authorization, products.update)
    app.delete(`${prefix}/product/:id`, secirity.authentication, secirity.authorization, products.destroy)

    app.get(`${prefix}/users`, secirity.authentication, secirity.authorization, users.index)
    app.get(`${prefix}/user/:id`, secirity.authentication, secirity.authorization, users.show)
    app.post(`${prefix}/user`, secirity.authentication, users.store)
    app.put(`${prefix}/user/:id`, secirity.authentication, secirity.authorization, users.update)
    app.delete(`${prefix}/user/:id`, secirity.authentication, secirity.authorization, users.destroy)

    app.get(`${prefix}/stocks`, secirity.authentication, secirity.authorization, stock.index)
    app.get(`${prefix}/stock/:id`, secirity.authentication, secirity.authorization, stock.show)
    app.get(`${prefix}/stock-product/:id`, secirity.authentication, secirity.authorization, stock.product)
    app.post(`${prefix}/stock`, secirity.authentication, secirity.authorization, stock.store)

    app.get(`${prefix}/orders`, secirity.authentication, secirity.authorization, orders.index)
    app.post(`${prefix}/order-search`, secirity.authentication, secirity.authorization, orders.search)
    app.get(`${prefix}/order/:id`, secirity.authentication, secirity.authorization, orders.show)
    app.post(`${prefix}/order`, secirity.authentication, secirity.authorization, orders.store)
    app.post(`${prefix}/order-detail`, secirity.authentication, secirity.authorization, orders.detail)
    app.put(`${prefix}/order/:id`, secirity.authentication, secirity.authorization, orders.update)
}