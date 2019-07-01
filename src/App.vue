<template>
  <div id="app" style="height: 100%; width: 100%;">
    <el-container style="height: 100%; width: 100%;">
      <el-aside class="aside" width="200px">
        <div>
          <h3>{{$t('title')}}</h3>
          <GeometryInput
          ref="geometryInput"
          @add="addGeometry"
          @location="setBounds({ bounds: allBounds })"
          />
          <GeometrySettings
          v-for="(field, index) in fields"
          :key="field.id"
          :geometry="field"
          @change-visible="value => field.visible = value"
          @remove="removeField(index)"
          @location="setBounds(field)"
          />
        </div>
        <div>
          <LangSelect />
          <el-link href="https://github.com/bezany/wkt-map" target="_blank">github source</el-link>
        </div>
      </el-aside>
      <el-main class="main">
        <Map
        :initBounds="defaultBounds"
        :geometries="fields"
        style="height: 100%; width: 100%;"
        ref="map"
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

const defaultBounds = L.latLngBounds(L.latLng(51.582012, 35.126900), L.latLng(49.671058, 39.537911))

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
      id: 1,
      defaultBounds
    }
  },
  computed: {
    allBounds () {
      if (this.fields.length > 0) {
        const result = this.fields.reduce(
          (accumulator, currentValue) => accumulator.extend(currentValue.bounds),
          new L.LatLngBounds()) // start with new latLngBounds for avoid mutation data
        if (!result.isValid()) {
          return defaultBounds
        }
        return result
      }
      return defaultBounds
    }
  },
  methods: {
    addGeometry (geometry) {
      this.fields.push({
        ...geometry,
        id: this.id++,
        visible: true,
        bounds: L.geoJSON(geometry.geodata).getBounds()
      })
      this.$nextTick(() => {
        this.$refs.map.setBounds(this.allBounds)
      })
    },
    removeField (index) {
      this.fields.splice(index, 1)
    },
    setBounds (field) {
      this.$refs.map.setBounds(field.bounds)
    }
  },
  mounted () {
    const letterH = 'POLYGON ((20 10, 20 50, 30 50, 30 35, 40 35, 40 50, 50 50, 50 10, 40 10, 40 25, 30 25, 30 10, 20 10))'
    const letterI = 'POLYGON ((70 10, 70 50, 80 50, 80 10, 70 10))'
    this.$refs.geometryInput.add(`GEOMETRYCOLLECTION(${letterH}, ${letterI})`)
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
