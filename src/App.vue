<template>
  <div id="app" style="height: 100%; width: 100%;">
    <el-container style="height: 100%; width: 100%;">
      <el-aside class="aside" width="200px">
      </el-aside>
      <el-main class="main">
        <Map
        :bounds="mapBounds"
        style="height: 100%; width: 100%;"
        /></el-main>
    </el-container>
  </div>
</template>

<script>
import Map from './components/Map'
import L from 'leaflet'
// import wktParse from 'wellknown'

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
  computed: {
    mapBounds () {
      return L.latLngBounds(L.latLng(51.582012, 35.126900), L.latLng(49.671058, 39.537911))
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
