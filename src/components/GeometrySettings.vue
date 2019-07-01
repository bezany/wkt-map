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
    >{{$t('visible')}}</el-checkbox>
    <div>
      <el-button
      type="info"
      icon="el-icon-delete"
      @click="() => $emit('remove')"
      :title="$t('remove')"
      ></el-button>
      <el-button
      icon="el-icon-location-outline"
      @click="() => $emit('location')"
      :title="$t('center')"
      ></el-button>
      <el-popover
      placement="right"
      :title="geometry.type"
      trigger="click"
      >
        <el-button
        icon="el-icon-document"
        slot="reference"
        :title="$t('rawData')"
        ></el-button>
        <div
        class="raw-viewer"
        >{{ geometry.rawData }}</div>
      </el-popover>
    </div>
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

  .raw-viewer {
    max-width: 512px;
    word-break: break-word;
  }
</style>
