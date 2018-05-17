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
        <el-button
        size="mini"
        @click="addField"
        >Показать</el-button>
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
import L from 'leaflet'
import wktParse from 'wellknown'

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
    Map
  },
  data () {
    return {
      fields: [],
      wktRawData: '',
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
        geodata: geoJsonData
      })
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
