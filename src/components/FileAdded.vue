<template>
  <el-upload
  action=""
  :before-upload="handleUpload">
    <el-button type="primary">{{$t('loadFile')}}</el-button>
  </el-upload>
</template>

<script>
export default {
  props: {
    onAdded: Function
  },
  methods: {
    handleUpload (file) {
      const reader = new FileReader()
      reader.onload = () => {
        const text = reader.result
        this.$emit('fileAdded', text)
      }
      reader.readAsText(file)
      return false
    }
  }
}
</script>
