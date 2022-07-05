/*
 * @Description:
 * @Author: keke
 * @Date: 2022-07-03 14:55:12
 * @LastEditors: keke
 * @LastEditTime: 2022-07-05 18:04:45
 * @FilePath: \task-system\server\index.js
 */

const fs = require('fs')

const express = require('express')

const app = express()

const URL = require('url') //引入URL中间件，获取req中的参数需要

app.use(require('cors')()) // 解决跨域问题

app.use(express.json())

const url = 'mongodb://localhost:27017/' // 默认端口

const modal = 'task' // 数据库模型

const mongoose = require('mongoose')

mongoose.connect(`${url}${modal}`, {
  useNewUrlParser: true
})

// 定义用户模型
const UserModel = mongoose.model(
  'User',
  new mongoose.Schema({
    userId: {
      type: String
    },
    Name: {
      type: String
    },
    Email: {
      type: String
    },
    Title: {
      type: String
    }
  })
)

// 定义任务模型
const TaskModel = mongoose.model(
  'Task',
  new mongoose.Schema({
    Priority: {
      type: Number
    },
    Description: {
      type: String
    },
    By_who: {
      type: String
    },
    userId: {
      type: String
    },
    Stage: {
      type: Number
    }
  })
)

// 初始化任务集合
const TaskListData = ReadToFile(
  './server/files/PwC Full Stack Coding Test_v4_Raw Data.csv',
  'Task',
  initDatas,
  TaskModel
)

// 初始化用户集合
const UserListData = ReadToFile(
  './server/files/PwC Full Stack Coding Test_v4_Raw Data 2.csv',
  'userId',
  initDatas,
  UserModel
)

// 批量新增
async function initDatas(Model, sertModel) {
  await Model.insertMany(sertModel)
}

function ReadToFile(files, first, callBack, Model, sertModel) {
  let returnData = []
  fs.readFile(files, 'utf8', function (err, data) {
    var list = new Array()
    if (err) {
      console.log(err.stack)
      return
    }
    ConvertToList(data, function (list) {
      let header = list[0]
      header[0] = first // 表头第一个识别乱码
      const body = list.splice(1)
      body.map(item => {
        let dataItem = {}
        item.map((t, i) => {
          dataItem[header[i]] = t
        })
        if (dataItem[first]) {
          returnData.push(dataItem)
        }
      })
      callBack(Model, returnData)
    })
  })
  return returnData
}

function ConvertToList(data, callBack) {
  data = data.toString()
  var list = new Array()
  var rows = new Array()
  rows = data.split('\r\n')
  for (var i = 0; i < rows.length; i++) {
    list.push(rows[i].split(','))
  }
  callBack(list)
}

// 任务列表 + 根据userId筛选
app.get('/api/taskList', async (req, res) => {
  const params = URL.parse(req.url, true).query
  let whereObj = {}
  if (params.userId) {
    whereObj['userId'] = params.userId
  }
  const newList = await TaskModel.find({
    $or: [whereObj, { userId: null }]
  })
  const returnList = formattingData(newList, 'Stage')
  const resObj = {
    code: 0,
    data: returnList,
    message: 'success'
  }
  res.send(resObj)
})

// 人员列表
app.get('/api/userList', async (req, res) => {
  const userList = await UserModel.find()
  const resObj = {
    code: 0,
    data: userList,
    message: 'success'
  }
  res.send(resObj)
})

// 拖拽接口
app.post('/api/updateTask', async (req, res) => {
  const updateList = req.body.list // 前端参数
  let bulkWriteList = []
  updateList.forEach(async item => {
    const updateObj = {
      updateOne: {
        filter: { _id: item._id },
        update: { $set: { Priority: item.Priority } }
      }
    }
    bulkWriteList.push(updateObj)
  })
  await TaskModel.bulkWrite(bulkWriteList) // 批量修改
  res.send(true)
})

// 合并组方法
function formattingData(arr, group_key) {
  let map = {}
  let res = []
  for (let i = 0; i < arr.length; i++) {
    let ai = arr[i]
    if (!map[ai[group_key]]) {
      map[ai[group_key]] = [ai]
    } else {
      map[ai[group_key]].push(ai)
    }
  }
  Object.keys(map).forEach(key => {
    const list = map[key].sort(sortBy('Priority'))
    res.push({
      [group_key]: key,
      list
    })
  })
  return res
}

// 排序方法
function sortBy(field) {
  //根据传过来的字段进行排序
  return (x, y) => {
    return x[field] - y[field]
  }
}

app.listen(3001, () => {
  console.log('http://localhost:3001/,启动成功')
})
