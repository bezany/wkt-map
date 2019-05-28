<template>
  <div id="app" style="height: 100%; width: 100%;">
    <el-container style="height: 100%; width: 100%;">
      <el-aside class="aside" width="200px">
        <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4}"
          placeholder="Введтие WKT"
          v-model="wktRawData">
        </el-input>
        <div>
          <span>Цвет полигона: </span>
          <div
          style="display: inline-block"
          >
            <el-color-picker
            v-model="color"
            size="mini"></el-color-picker>
          </div>
          <div>
            <el-button
            size="mini"
            @click="addField"
            >Добавить</el-button>
          </div>
        </div>
        <div>
          <el-input
          type="textarea"
          :autosize="{ minRows: 2, maxRows: 4}"
          placeholder="Введтие GeoJSON"
          v-model="geoJsonRawData">
          </el-input>
          <el-button
            size="mini"
            @click="() => addGeoJSON()"
            >Добавить GeoJSON</el-button>
        </div>
        <div>
          <div>Файл с GeoJSON</div>
          <FileAdded
          @fileAdded="fileAdded"
          />
        </div>
        <FieldSettings
        v-for="(field, index) in fields"
        :key="field.id"
        :field="field"
        @change-visible="value => field.visible = value"
        @remove="removeField(index)"
        />
      </el-aside>
      <el-main class="main">
        <Map
        :bounds="mapBounds"
        :fields="fields"
        style="height: 100%; width: 100%;"
        /></el-main>
    </el-container>
  </div>
</template>

<script>
import Map from './components/Map'
import FieldSettings from './components/FieldSettings'
import L from 'leaflet'
import wktParse from 'wellknown'
import FileAdded from './components/FileAdded'
/*
import {
  mapState,
  mapActions,
  mapMutations,
  mapGetters
} from 'vuex'
*/
export default {
  name: 'App',
  components: {
    Map,
    FieldSettings,
    FileAdded
  },
  data () {
    return {
      fields: [],
      wktRawData: '',
      id: 1,
      color: '#600054',
      geoJsonRawData: ''
    }
  },
  computed: {
    mapBounds () {
      if (this.fields.length > 0) {
        const geojsonLayer = L.geoJSON(this.fields[this.fields.length - 1].geodata)
        const bounds = geojsonLayer.getBounds()
        return bounds
      }
      return L.latLngBounds(L.latLng(51.582012, 35.126900), L.latLng(49.671058, 39.537911))
    },
    newColor () {
      if (this.color && this.color.length > 1) {
        return this.color
      }
      return '#600054'
    }
  },
  methods: {
    addField () {
      if (!this.wktRawData) {
        this.$notify.error({
          message: 'Введите WKT!'
        })
        return
      }
      const geoJsonData = wktParse(this.wktRawData)
      if (!geoJsonData) {
        this.$notify.error({
          message: 'Ошибка парсинга WKT!'
        })
        return
      }
      this.fields.push({
        id: this.id++,
        geodata: geoJsonData,
        visible: true,
        color: this.newColor
      })
      this.wktRawData = ''
    },
    addGeoJSON (text) {
      const geoJsonRawData = text || this.geoJsonRawData
      if (!geoJsonRawData) {
        this.$notify.error({
          message: 'Введите GeoJSON!'
        })
        return
      }
      let geosJsonParsed = null
      try {
        geosJsonParsed = JSON.parse(geoJsonRawData)
      } catch (e) {
        this.$notify.error({
          message: 'GeoJSON не корректен!'
        })
        return
      }
      this.fields.push({
        id: this.id++,
        geodata: geosJsonParsed,
        visible: true,
        color: 'white',
        source: 'geojson'
      })
      this.geoJsonRawData = ''
    },
    removeField (index) {
      this.fields.splice(index, 1)
    },
    fileAdded (text) {
      if (!text) {
        this.$notify.error({
          message: 'Файл пуст!'
        })
        return
      }
      this.addGeoJSON(text)
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

body {
  margin: 0;
  height: 100%;
  width: 100%;
}

html {
    height: 100%;
}

main.main {
  padding: 0;
}

.aside {
  padding: 5px;
  font-size: 14px
}
</style>
