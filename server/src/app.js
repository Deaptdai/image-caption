require('dotenv').config(); // 加载 .env 文件

const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const mainRoutes = require('./routes/main');

const app = express();
const port = process.env.PORT || 3000;

// 使用中间件
app.use(cors({
    origin: ['http://localhost', 'http://localhost:80'], // 允许的前端来源
    credentials: true, // 如果需要支持跨域的 Cookie
}));
app.use(express.json());

// 使用路由
app.use('/api', authRoutes, mainRoutes);

// 启动服务器
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});