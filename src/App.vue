<template>
  <div id="app" style="height: 100%; width: 100%;">
    <el-container style="height: 100%; width: 100%;">
      <el-aside class="aside" width="200px">
        <div>
          <h3>{{$t('title')}}</h3>
          <GeometryInput
          @add="addGeometry"
          />
          <GeometrySettings
          v-for="(field, index) in fields"
          :key="field.id"
          :geometry="field"
          @change-visible="value => field.visible = value"
          @remove="removeField(index)"
          />
        </div>
        <div>
          <LangSelect />
          <el-link href="https://github.com/bezany/wkt-map" target="_blank">source</el-link>
        </div>
      </el-aside>
      <el-main class="main">
        <Map
        :bounds="mapBounds"
        :geometries="fields"
        style="height: 100%; width: 100%;"
        /></el-main>
    </el-container>
  </div>
</template>

<script>
import Map from './components/Map'
import GeometrySettings from './components/GeometrySettings'
import L from 'leaflet'
import LangSelect from './components/LangSelect'
import GeometryInput from './components/GeometryInput'

export default {
  name: 'App',
  components: {
    Map,
    GeometrySettings,
    LangSelect,
    GeometryInput
  },
  data () {
    return {
      fields: [],
      wktRawData: '',
      geoJsonRawData: '',
      id: 1
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
    }
  },
  methods: {
    addGeometry (geometry) {
      this.fields.push({
        ...geometry,
        id: this.id++,
        visible: true
      })
    },
    removeField (index) {
      this.fields.splice(index, 1)
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
  font-size: 14px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}
</style>
