<template>
  <l-map
  ref="map"
  :bounds="bounds" >
    <l-control-layers position="topright" :collapsed="false" />
    <l-tile-layer
    v-for="tileProvider in tileProviders"
    :key="tileProvider.name"
    layerType="base"
    :name="tileProvider.name"
    :visible="tileProvider.visible"
    :url="tileProvider.url"
    :attribution="tileProvider.attribution" />
    <l-control-scale :imperial="false" position="bottomright" />
    <l-geo-json
      v-for="geometry in geometries"
      :key="geometry.id"
      :geojson="geometry.geodata"
      :visible="geometry.visible"
      :options="getStyle(geometry.color)"
      ></l-geo-json>
  </l-map>
</template>

<script>
import {
  LMap,
  LTileLayer,
  LControlScale,
  LControlLayers,
  LGeoJson
} from 'vue2-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import 'leaflet-measure'
import 'leaflet-measure/dist/leaflet-measure.css'

// fix error with marker icon (webpack file loader not load this icons)
// https://github.com/KoRiGaN/Vue2Leaflet/issues/96#issuecomment-341453050
// https://github.com/KoRiGaN/Vue2Leaflet/blob/bd7709d3b7929f4306e279ce5c5e709d8f49e48a/examples/src/main.js
delete L.Icon.Default.prototype._getIconUrl

L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
})

const tileProviders = [
  {
    name: 'OpenStreetMap',
    visible: false,
    attribution: '&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
  },
  {
    name: 'Esri WorldImagery',
    visible: true,
    url: 'https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
    attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
  }
]

function getOnEachFeature (labelText) {
  return (feature, layer) => {
    layer.bindTooltip(labelText, {permanent: true, opacity: 0.7, direction: 'center'})
  }
}

export default {
  props: {
    bounds: {
      type: Object,
      required: true
    },
    geometries: {
      type: Array,
      required: true
    }
  },
  components: {
    LMap,
    LTileLayer,
    LControlScale,
    LControlLayers,
    LGeoJson
  },
  data () {
    return {
      tileProviders: tileProviders
    }
  },
  methods: {
    getStyle (color, labelText) {
      return {
        style: {
          color
        },
        onEachFeature: labelText ? getOnEachFeature(labelText) : undefined
      }
    }
  },
  mounted () {
    this.$nextTick(() => {
      this.measureControl = new L.Control.Measure({
        primaryLengthUnit: 'meters',
        secondaryLengthUnit: 'kilometers',
        primaryAreaUnit: 'sqmeters',
        secondaryAreaUnit: 'hectares',
        decPoint: ',',
        thousandsSep: '',
        position: 'bottomleft'
      }).addTo(this.$refs.map.mapObject)
    })
  },
  beforeDestroy () {
    if (this.measureControl) {
      this.measureControl.remove()
    }
  }
}
</script>
