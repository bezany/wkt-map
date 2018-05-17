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
    <l-geo-json v-if="!!geojsonDayTrack" :geojson="geojsonDayTrack" :options="getStyle('indigo')"></l-geo-json>
    <l-geo-json
    v-if="!!geojsonField"
    :geojson="geojsonField"
    :options="getStyle('#C400AB')"
    ></l-geo-json>
    <l-geo-json v-if="!!geojsonTrack" :geojson="geojsonTrack" :options="getStyle('black')"></l-geo-json>
    <l-geo-json v-if="!!geojsonShape" :geojson="geojsonShape" :options="getStyle('red')"></l-geo-json>
    <l-geo-json v-if="!!geojsonFilteredShape" :geojson="geojsonFilteredShape" :options="getStyle('blue')"></l-geo-json>
    <l-geo-json v-if="!!geojsonV3Shape" :geojson="geojsonV3Shape" :options="getStyle('#FFD700')"></l-geo-json>
    <template
    v-if="nearFields">
      <l-geo-json
      v-for="field in nearFields"
      :key="field.sapId"
      :geojson="field.geodata"
      :options="getStyle('#600054', field.sapId)"
      ></l-geo-json>
    </template>
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
    geojsonTrack: {
      type: Object
    },
    geojsonShape: {
      type: Object
    },
    geojsonFilteredShape: {
      type: Object
    },
    geojsonV3Shape: {
      type: Object
    },
    geojsonField: {
      type: Object
    },
    geojsonDayTrack: {
      type: Object
    },
    bounds: {
      type: Object,
      required: true
    },
    nearFields: {
      type: Array
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
