<template>
  <div class="column">
    <div>
      <FileAdded
      @fileAdded="fileAdded"
      />
    </div>
    <div>
      <el-input
      type="textarea"
      :autosize="{ minRows: 2, maxRows: 4}"
      :placeholder="$t('inputPlaceholder')"
      v-model="textInput">
      </el-input>
    </div>
    <div class="row">
      <div>
        <el-color-picker
        :title="$t('polygon_color')"
        v-model="color"></el-color-picker>
      </div>
      <div
      style="margin-left: 5px;"
      >
        <el-button
        type="primary"
        @click="addFromTextInput"
        >{{$t('add')}}</el-button>
      </div>
      <div
      style="margin-left: 5px;"
      >
        <el-button
        icon="el-icon-location-outline"
        @click="() => $emit('location')"
        :title="$t('centerAll')"
        ></el-button>
      </div>
    </div>
  </div>
</template>

<script>
import FileAdded from './FileAdded'
import wktParse from 'wellknown'

function parseData (rawData) {
  try {
    return {
      geodata: JSON.parse(rawData),
      type: 'GeoJSON'
    }
  } catch (err) {
    const wkt = wktParse(rawData)
    if (!wkt) {
      return null
    }
    return {
      geodata: wkt,
      type: 'WKT'
    }
  }
}

const defaultColor = '#C522B1'

export default {
  components: {
    FileAdded
  },
  data () {
    return {
      color: defaultColor,
      textInput: ''
    }
  },
  computed: {
    newColor () {
      if (this.color && this.color.length > 1) {
        return this.color
      }
      return defaultColor
    }
  },
  methods: {
    addFromTextInput () {
      if (!this.textInput) {
        this.$notify.error({
          message: this.$t('notifyEmptyData')
        })
        return
      }
      this.add(this.textInput)
      this.textInput = ''
    },
    fileAdded (text) {
      if (!text) {
        this.$notify.error({
          message: this.$t('notifyFileEmpty')
        })
        return
      }
      this.add(text)
    },
    add (rawData) {
      const parsed = parseData(rawData)
      if (!parsed) {
        this.$notify.error({
          message: this.$t('notifyParseError')
        })
        return
      }
      this.$emit('add', {
        geodata: parsed.geodata,
        type: parsed.type,
        rawData: rawData,
        color: this.newColor
      })
    }
  }
}
</script>

<style scoped>
.row {
  display: flex;
}

.column > div:not(:last-child) {
  margin-bottom: 5px;
}
</style>
