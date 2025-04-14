# 图像标注系统

## 项目简介

本项目针对海量多模态数据标注效率低、人工依赖强等问题，构建基于主动学习与标签重分配机制的交互式智能标注系统。通过跨模态特征融合技术，将图像、文本、音频等异构数据映射为统一的高维向量空间，解决传统单模态标注的局限性。系统利用无监督聚类筛选关键样本集，结合主动学习策略优先标注信息熵最高的样本，并通过半监督学习实现标签的动态重分配与传播。引入交互式修正模块，支持用户实时校准标注结果，形成“智能推荐-人工干预”的闭环优化机制。该系统是一个基于 Vue 3 和 Express 的全栈项目，旨在提供交互式图像标注功能。前端使用 Vue 3 和 Element Plus 构建，后端使用 Express 和 MySQL 提供 API 支持。

---

## 项目结构
image-caption/  <br>
├── frontend/ # 前端代码 <br>
│ ├── src/ # 前端源码 <br>
│ ├── public/ # 静态资源<br>
│ ├── package.json <br>
│ ├── vite.config.ts <br>
│ └── tsconfig.json <br>
├── server/ # 后端代码 <br>
│ ├── src/ # 后端源码 <br>
│ ├── .env # 环境变量配置 <br>
│ ├── package.json <br>
│ └── app.js <br>
└── README.md # 项目说明文件

---

## 技术栈

### 前端
- **框架**: Vue 3
- **UI 组件库**: Element Plus
- **状态管理**: Pinia
- **路由**: Vue Router
- **图表库**: ECharts
- **HTTP 请求**: Axios
- **构建工具**: Vite

### 后端
- **框架**: Express
- **数据库**: MySQL
- **认证**: JSON Web Token (JWT)
- **环境变量管理**: dotenv

---

## 环境配置

### 前端
1. 安装依赖：
   ```bash
   cd frontend
   npm install

2. 启动开发服务器
npm run dev

3. 构建生产环境
npm run build

4. 预览生产环境
npm run preview

### 后端
1. 配置 .env 文件：
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=123456
DB_NAME=dlc_user
JWT_SECRET=your_secret_key

2. 安装依赖：
cd server
npm install

3. 启动服务器
npm run server

## 功能模块
### 前端功能
1. 交互组件: 提供图像上传、交互模式切换等功能。
2. 约束图: 可视化显示图像标注的约束关系。
3. 控制台: 实时显示交互信息和日志。
4. 统计页面: 提供统计数据的展示。
### 后端功能
1. 用户注册与登录: 使用 JWT 进行认证。
2. 数据存储: 使用 MySQL 存储用户和交互数据。
3. API 接口: 提供前端所需的 RESTful API。

### 代理配置
前端通过 Vite 的代理功能将 /api 请求转发到后端：
```javascript
server: {
  proxy: {
    '/api': {
      target: 'http://localhost:3000',
      rewrite: (path) => path.replace(/^\/api/, ''),
      changeOrigin: true,
    }
  }
}
```
## 贡献指南
1. Fork本仓库
2. 创建新分支
```bash
git checkout -b feature/your-feature
```
3. 提交更改
```bash
git commit -m "Add your message
```
4. 推送分支
```bash
git push origin feature/your-feature
```
5. 创建Pull Request
## 许可证
本项目遵循 MIT License。