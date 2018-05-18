<template>
  <div>
    <hr/>
    {{field.id}}
    <div
    class="color-box"
    :style="{ 'background-color': field.color }"
    >
    </div>
    <el-checkbox
    :value="field.visible"
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
    field: {
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

<style>
  .color-box {
    width: 13px;
    height: 13px;
    display: inline-block;
  }
</style>
