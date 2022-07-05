<!--
 * @Description: 
 * @Author: keke
 * @Date: 2022-07-02 12:35:30
 * @LastEditors: keke
 * @LastEditTime: 2022-07-05 14:52:02
 * @FilePath: \task-system\src\components\Header\index.vue
-->
<template>
  <div class="header flex_r_between">
    <div class="header-title">Tasks</div>
    <div class="filter">
      <Select v-model="assigneeId" style="width: 400px" placeholder="fiter by assignee" @on-change="change" clearable>
        <Option v-for="item in userList" :value="item.userId" :key="item.userId"
          >{{ item.Name }} -- {{ item.Email }}</Option
        >
      </Select>
    </div>
  </div>
</template>
<script>
import { Select, Option } from 'view-design'
export default {
  name: 'Header',
  components: { Select, Option },
  data() {
    return {
      assigneeId: '',
      userList: []
    }
  },
  mounted() {
    this.getUser()
  },
  methods: {
    getUser() {
      this.$http.get('userList').then(res => {
        const userList = res.data.data
        this.userList = userList
      })
    },
    change() {
      this.$emit('changeAssigneeId', this.assigneeId)
    }
  }
}
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
