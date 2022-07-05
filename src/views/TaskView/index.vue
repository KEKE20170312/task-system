<!--
 * @Description: 
 * @Author: keke
 * @Date: 2022-07-02 12:27:19
 * @LastEditors: keke
 * @LastEditTime: 2022-07-05 17:23:04
 * @FilePath: \task-system\src\views\TaskView\index.vue
-->
<template>
  <div class="task-view flexbox">
    <Header @changeAssigneeId="changeAssigneeId"></Header>
    <TaskContent ref="taskContent"></TaskContent>
  </div>
</template>
<script>
import Header from '@/components/Header/index.vue'
import TaskContent from '@/components/TaskContent/index.vue'
export default {
  name: 'TaskView',
  components: { Header, TaskContent },
  methods: {
    changeAssigneeId(assigneeId) {
      this.$refs.taskContent.getList(assigneeId)
    }
  }
}
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
