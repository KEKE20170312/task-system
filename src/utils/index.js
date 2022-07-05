/*
 * @Description:
 * @Author: keke
 * @Date: 2022-07-03 23:08:08
 * @LastEditors: keke
 * @LastEditTime: 2022-07-04 23:14:19
 * @FilePath: \task-system\src\utils\index.js
 */
/**
 * @description: 数组分组
 * @param {*} arr [Array] 被处理的数组
 * @param {*} group_key [String] 分组字段
 * @return {*}
 */
export function formattingData(arr, group_key) {
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

export function sortBy(field) {
  //根据传过来的字段进行排序
  return (x, y) => {
    return x[field] - y[field]
  }
}
