<template>
  <l-map
  ref="map"
  :bounds="bounds" >
    <l-control-layers position="topright"/>
    <l-tile-layer
    v-for="tileProvider in tileProviders"
    :key="tileProvider.name"
    layerType="base"
    :name="tileProvider.name"
    :visible="tileProvider.visible"
    :url="tileProvider.url"
    :attribution="tileProvider.attribution" />
    <l-control-scale :imperial="false" />
    <l-geo-json
      v-for="field in fields"
      :key="field.id"
      :geojson="field.geodata"
      :visible="field.visible"
      :options="getStyle(field.color)"
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
    fields: {
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
    const measureControl = new L.Control.Measure({
      primaryLengthUnit: 'meters',
      secondaryLengthUnit: 'kilometers',
      primaryAreaUnit: 'sqmeters',
      secondaryAreaUnit: 'hectares',
      decPoint: ',',
      thousandsSep: '',
      position: 'bottomleft'
    })
    measureControl.addTo(this.$refs.map.mapObject)
  }
}

</script>

<style>

</style>
