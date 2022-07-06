<!--
 * @Description: 
 * @Author: keke
 * @Date: 2022-07-05 21:01:21
 * @LastEditors: keke
 * @LastEditTime: 2022-07-06 19:33:05
 * @FilePath: \task-system\README.md
-->
# task-system

## 项目启动准备

### 1. 后端准备：安装 node，express，mongodb，cors，mongoose

### 2. 前端准备: 安装@vue/cli node

## 项目运行准备

### 1. npm i

### 1. 后端运行 node server

### 2. 前端运行 npm run serve | 前端打包 npm run build

## 技术栈说明

### 1. 后端技术栈说明：

> 1. 使用 node+express+mongodb 搭建后端服务，使用了 mongoose 连接数据库，使用 cors 解决跨域问题，定义了 User 和 Task 两个集合分别存储人员信息和任务信息
> 2. 项目涉及到三个接口：1) 带有根据 userId 筛选的任务查询接口 2) 人员查询接口 3) 拖拽批量修改任务排序的接口
> 3. 初始化后端服务时会将 server/files 下的两个文件初始化到数据中，所以需要确保电脑上已经安装了 mongodb 数据库

### 2. 前端技术栈说明：

> 1. 使用 vue+iview+sass/scss 搭建前端项目
> 2. 使用 axios 进行接口请求
> 3. iview 按需引用
> 4. 使用 vuedraggable 拖动组件
> 5. 组件化
