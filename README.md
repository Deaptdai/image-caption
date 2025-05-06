# 图像标注系统

## 项目简介

本项目旨在解决海量多模态数据标注效率低、人工依赖强等问题，构建基于主动学习与标签重分配机制的交互式智能标注系统。通过跨模态特征融合技术，将图像、文本、音频等异构数据映射为统一的高维向量空间，解决传统单模态标注的局限性。

系统功能包括：
- 无监督聚类筛选关键样本集。
- 主动学习策略优先标注信息熵最高的样本。
- 半监督学习实现标签的动态重分配与传播。
- 交互式修正模块支持用户实时校准标注结果。

该系统是一个基于 Vue 3 和 Spring Boot 的全栈项目，前端使用 Vue 3 和 Element Plus 构建，后端使用 Spring Boot 和 MySQL 提供 API 支持。

---

## 项目结构

```
image-caption/
├── frontend/          # 前端代码
│   ├── src/           # 前端源码
│   ├── public/        # 静态资源
│   ├── package.json   # 前端依赖配置
│   ├── vite.config.ts # Vite 配置文件
│   └── tsconfig.json  # TypeScript 配置文件
├── backend/           # 后端代码
│   ├── src/           # 后端源码
│   ├── sql/           # 数据库脚本
│   ├── pom.xml        # Maven 配置文件
│   └── application.yml # Spring Boot 配置文件
└── README.md          # 项目说明文件
```

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
- **框架**: Spring Boot
- **数据库**: MySQL
- **ORM**: MyBatis-Plus
- **日志管理**: SLF4J
- **认证**: JSON Web Token (JWT)

---

## 环境配置

### 前端

1. 安装依赖：
   ```bash
   cd image-caption-frontend
   npm install
   ```

2. 启动开发服务器：
   ```bash
   npm run dev
   ```

3. 构建生产环境：
   ```bash
   npm run build
   ```

4. 预览生产环境：
   ```bash
   npm run preview
   ```

### 后端

1. 启动后端服务：
   ```bash
   cd image-caption-backend
   mvn spring-boot:run
   ```

---

## 功能模块

### 前端功能
1. **交互组件**: 提供图像上传、交互模式切换等功能。
2. **约束图**: 可视化显示图像标注的约束关系。
3. **控制台**: 实时显示交互信息和日志。
4. **统计页面**: 提供统计数据的展示。

### 后端功能
1. **用户注册与登录**: 使用 JWT 进行认证。
2. **数据存储**: 使用 MySQL 存储用户和交互数据。
3. **API 接口**: 提供前端所需的 RESTful API。

---

## 代理配置

前端通过 Vite 的代理功能将 `/api` 请求转发到后端：

```javascript
server: {
  proxy: {
    '/api': {
      target: 'http://47.108.95.177:8889',
      rewrite: (path) => path.replace(/^\/api/, ''),
      changeOrigin: true,
    }
  }
}
```

---

## 贡献指南

1. Fork 本仓库。
2. 创建新分支：
   ```bash
   git checkout -b feature/your-feature
   ```
3. 提交更改：
   ```bash
   git commit -m "Add your message"
   ```
4. 推送分支：
   ```bash
   git push origin feature/your-feature
   ```
5. 创建 Pull Request。

---

## 许可证

本项目遵循 [MIT License](LICENSE)。