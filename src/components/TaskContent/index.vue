<!--
 * @Description: 
 * @Author: keke
 * @Date: 2022-07-02 14:03:48
 * @LastEditors: keke
 * @LastEditTime: 2022-07-05 14:58:00
 * @FilePath: \task-system\src\components\TaskContent\index.vue
-->
<template>
  <div class="taskContent flex1">
    <Empty v-if="!taskList.length"></Empty>
    <div v-else>
      <div class="task_item" v-for="(item, index) in taskList" :key="item.Stage">
        <Row>
          <Col span="4">
            <div
              class="phase"
              :style="{
                color: index > 1 ? '#000' : '#fff',
                backgroundColor: `rgba(0, 0, 0, ${getOpacity(index)})`
              }"
            >
              {{ 'phase' + item.Stage }}
            </div></Col
          >
          <Col span="20">
            <div class="phase_items flex1">
              <div class="row">
                <draggable
                  :itemKey="item.Stage"
                  v-model="item.list"
                  name="Task"
                  :group="item.Stage"
                  animation="300"
                  dragClass="dragClass"
                  ghostClass="ghostClass"
                  chosenClass="chosenClass"
                  @end="onEnd"
                  style="display: flex; flex-wrap: wrap; width: 100%"
                >
                  <div class="col" :span="8" v-for="(jtem, jndex) in item.list" :key="jtem._id">
                    <PhaseItemCard :card="jtem" :currentIndex="jndex"></PhaseItemCard>
                  </div>
                </draggable>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </div>
  </div>
</template>
<script>
import PhaseItemCard from '@/components/PhaseItemCard/index.vue'
import { Row, Col } from 'view-design'
import draggable from 'vuedraggable'
import { formattingData } from '@/utils/index'
import Empty from '@/components/Empty/index.vue'
export default {
  name: 'taskContent',
  components: { PhaseItemCard, Row, Col, draggable, Empty },
  data() {
    return {
      taskList: []
    }
  },
  mounted() {
    this.getList()
  },
  methods: {
    getList(assigneeId = '') {
      this.$Spin.show()
      this.$http.get(`taskList?userId=${assigneeId}`).then(res => {
        const data = res.data.data
        const newData = data
        this.taskList = newData
        this.$Spin.hide()
      })
    },
    getOpacity(index) {
      const currentIndex = index
      let opacity = 0.5
      if (currentIndex <= 5) {
        opacity = 1 - currentIndex / 5
      } else {
        opacity = 0.5
      }
      return opacity
    },
    onEnd(e) {
      this.$Spin.show()
      let list = []
      this.taskList.map(item => {
        item.list.map((t, i) => {
          t.Priority = i + 1
          list.push(t)
        })
      })
      const params = {
        list
      }
      this.$http
        .post('updateTask', params)
        .then(res => {
          this.$Message.success('操作成功')
          this.$Spin.hide()
        })
        .catch(error => {
          console.error('错了', error)
          this.$Message.error(error)
          this.$Spin.hide()
        })
    }
  }
}
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
