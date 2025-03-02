const express = require('express');
const app = express();

app.use(express.json())

app.get('/:userId/:productId', function (req, res) {
    // res.send('Hello');
    // res.json([1,2,3]);
    // res.status(201);
    // res.status(201).json({ key: 1 }) //链式调用

    res.json({
        query: req.query,
        route: req.params,
        body: req.body
    })
})

/**
 * 如何从request获取数据
 * 1.route params  /users/:id        /users/:userId/products/procductId
 *   req.params    req.params.id    req.params.userId req.params.productId
 *      GET, PUT/PATCH, DELETE
 * 2.query params   /users?sortBy=name  (默认情况区分大小写)
 *   req.query      req.query.sortBy   const {sortBy} = req.query;
 *      GET
 * 3.body
 *   req.body 需要用到（body-parser）这个package 可直接调用express.json()，把body里面的数据当成json再转换成object赋值给req.body里面，
 *      使用方法app.use（express.json()）
 * 
 * express.json() -> middleware function
 * 
 *      POST, PUT/PATCH
 * 4.from headers(authorization token)
 */

app.listen(3000);