<template>
  <div>
    <hr/>
    {{field.id}}
    <el-checkbox
    :value="field.visible"
    @change="(value) => $emit('change-visible', value)"
    >Показывать</el-checkbox>
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
