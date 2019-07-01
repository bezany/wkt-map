<template>
  <div>
    <div>
      <span>{{$t('polygon_color')}}: </span>
      <div
      style="display: inline-block"
      >
        <el-color-picker
        v-model="color"
        size="mini"></el-color-picker>
      </div>
    </div>
    <div>
      <FileAdded
      @fileAdded="fileAdded"
      />
    </div>
    <div>
      <el-input
      type="textarea"
      :autosize="{ minRows: 2, maxRows: 4}"
      placeholder="Введтие WKT или GeoJSON"
      v-model="textInput">
      </el-input>
    </div>
    <div>
      <el-button
      size="mini"
      @click="addFromTextInput"
      >Добавить</el-button>
    </div>
  </div>
</template>

<script>
import FileAdded from './FileAdded'
import wktParse from 'wellknown'

function parseData (rawData) {
  try {
    return JSON.parse(rawData)
  } catch (err) {
    return wktParse(rawData)
  }
}

export default {
  components: {
    FileAdded
  },
  data () {
    return {
      color: '#600054',
      textInput: ''
    }
  },
  computed: {
    newColor () {
      if (this.color && this.color.length > 1) {
        return this.color
      }
      return '#600054'
    }
  },
  methods: {
    addFromTextInput () {
      if (!this.textInput) {
        this.$notify.error({
          message: 'Введите данные!'
        })
        return
      }
      this.add(this.textInput)
      this.textInput = ''
    },
    fileAdded (text) {
      if (!text) {
        this.$notify.error({
          message: 'Файл пуст!'
        })
        return
      }
      this.add(text)
    },
    add (rawData) {
      const parsed = parseData(rawData)
      if (!parsed) {
        this.$notify.error({
          message: 'Ошибка парсинга! Требуется формат WKT или GeoJSON.'
        })
        return
      }
      this.$emit('add', {
        geodata: parsed,
        rawData: rawData,
        color: this.newColor
      })
    }
  }
}
</script>

<style>

</style>
