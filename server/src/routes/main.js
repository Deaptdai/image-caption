const express = require('express');
const router = express.Router();

router.get('/main', (req, res) => {
    res.send({
        code: 1,
        msg: '欢迎访问主页'
    });
});

module.exports = router;