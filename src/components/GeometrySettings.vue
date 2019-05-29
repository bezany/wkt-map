<template>
  <div>
    <hr/>
    {{geometry.id}}
    <div
    class="color-box"
    :style="{ 'background-color': geometry.color }"
    >
    </div>
    <el-checkbox
    :value="geometry.visible"
    @change="(value) => $emit('change-visible', value)"
    >Показывать</el-checkbox>
    <el-button
    type="info"
    icon="el-icon-delete"
    size="mini"
    @click="() => $emit('remove')"
    >Удалить</el-button>
  </div>
</template>

<script>
export default {
  props: {
    geometry: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      color: 'red'
    }
  }
}
</script>

<style scoped>
  .color-box {
    width: 13px;
    height: 13px;
    display: inline-block;
  }
</style>
