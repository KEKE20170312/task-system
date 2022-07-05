<!--
 * @Description: 
 * @Author: keke
 * @Date: 2022-07-02 14:08:39
 * @LastEditors: keke
 * @LastEditTime: 2022-07-03 23:22:20
 * @FilePath: \task-system\src\components\PhaseItemCard\index.vue
-->
<template>
  <!-- <Col :span="8" class-name="card-col"> -->
  <div class="phase_item-card flexbox">
    <div class="title">{{ card.Task }}</div>
    <div class="desc flex1" v-html="card.Description"></div>
    <div class="flex_r_between">
      <div class="name flex_r">
        <div class="head_img"></div>
        <div class="assigneeName">{{ card.By_who }}</div>
      </div>
      <div
        class="grade flex_r_center"
        :style="{ backgroundColor: getColor(), color: currentIndex > 1 ? '#000' : '#fff' }"
      >
        Priority{{ currentIndex + 1 }}
      </div>
    </div>
  </div>
  <!-- </Col> -->
</template>
<script>
import { Col } from 'view-design'
export default {
  name: 'PhaseItemCard',
  components: { Col },
  props: {
    card: {
      type: Object
    },
    currentIndex: {
      type: Number
    }
  },
  methods: {
    getColor() {
      if (this.currentIndex > 4) {
        return 'rgb(218, 219, 220)'
      } else {
        return this.changeColor('#5f14e0', (this.currentIndex + 1) * 40)
      }
    },
    changeColor(color, amount) {
      const clamp = val => Math.min(Math.max(val, 0), 0xff)
      const fill = str => ('00' + str).slice(-2)
      const num = parseInt(color.substr(1), 16)
      const red = clamp((num >> 16) + amount)
      const green = clamp(((num >> 8) & 0x00ff) + amount)
      const blue = clamp((num & 0x0000ff) + amount)
      return '#' + fill(red.toString(16)) + fill(green.toString(16)) + fill(blue.toString(16))
    }
  }
}
</script>
<style lang="scss" scoped>
@import './index.scss';
</style>
