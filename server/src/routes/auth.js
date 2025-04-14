const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../connect/database'); // 引入数据库模块
const router = express.Router();

const salt = bcrypt.genSaltSync(10);
const secret = process.env.JWT_SECRET || 'default_secret'; // 从环境变量中读取密钥

// 注册接口
router.post('/register', async (req, res) => {
    const {
        username,
        password
    } = req.body;

    try {
        // 检查用户名是否存在
        const [results] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
        if (results.length > 0) {
            return res.status(400).send({
                code: 0,
                msg: '用户名已存在'
            });
        }

        // 加密密码并保存用户
        const hashPassword = bcrypt.hashSync(password, salt);
        await db.query('INSERT INTO users (username, password) VALUES (?, ?)', [username, hashPassword]);
        res.send({
            code: 1,
            msg: '注册成功'
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({
            code: 0,
            msg: '注册失败'
        });
    }
});

// 登录接口
router.post('/login', async (req, res) => {
    const {
        username,
        password
    } = req.body;

    try {
        const [results] = await db.query('SELECT * FROM users WHERE username = ?', [username]);
        if (results.length === 0) {
            return res.status(400).send({
                code: 0,
                msg: '用户名不存在'
            });
        }

        const hash = results[0].password;
        const isOk = bcrypt.compareSync(password, hash);
        if (!isOk) {
            return res.status(400).send({
                code: 0,
                msg: '密码错误'
            });
        }

        const token = jwt.sign({
            time: Date.now(),
            expire: 60 * 60 * 1000
        }, secret);
        res.send({
            code: 1,
            msg: '登录成功',
            data: {
                username,
                token
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).send({
            code: 0,
            msg: '登录失败'
        });
    }
});

// 鉴权接口
router.post('/auth', (req, res) => {
    const token = req.headers.token;

    jwt.verify(token, secret, (err, decode) => {
        if (err) {
            return res.status(401).send({
                code: 410,
                msg: '非法token,请重新登录'
            });
        }

        const {
            time,
            expire
        } = decode;
        if (Date.now() - time > expire) {
            return res.status(401).send({
                code: 410,
                msg: 'token已过期,请重新登录'
            });
        }

        res.send({
            code: 1,
            msg: 'token验证通过,欢迎访问'
        });
    });
});

module.exports = router;