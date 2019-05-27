webpackJsonp([1],{"57rx":function(e,t){},EYnv:function(e,t){},NHnr:function(e,t,o){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=o("7+uW"),r=o("AMV0"),n=o.n(r),a=o("MdIv"),s=(o("EYnv"),o("nrd6")),l=o.n(s),c=(o("GInK"),o("R8Y0"),o("3yuE"),o("4SWg")),d=o.n(c).a.scale(["green","red"]);delete l.a.Icon.Default.prototype._getIconUrl,l.a.Icon.Default.mergeOptions({iconRetinaUrl:o("qXhe"),iconUrl:o("TJ5S"),shadowUrl:o("wkq0")});var u=[{name:"OpenStreetMap",visible:!1,attribution:'&copy; <a target="_blank" href="http://osm.org/copyright">OpenStreetMap</a> contributors',url:"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"},{name:"Esri WorldImagery",visible:!0,url:"https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",attribution:"Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community"}];var p={props:{bounds:{type:Object,required:!0},fields:{type:Array,required:!0},heatMap:{type:Array}},components:{LMap:a.LMap,LTileLayer:a.LTileLayer,LControlScale:a.LControlScale,LControlLayers:a.LControlLayers,LGeoJson:a.LGeoJson},data:function(){return{tileProviders:u}},computed:{geoJsonOptions:function(){return{style:function(e){var t={color:"gray",fillOpacity:1},o=e.properties.msg_count/e.properties.all_msgs;return n()(o)?t.color=d(o):e.properties.color&&(t.color=e.properties.color),t},onEachFeature:function(e,t){if(e.properties){var o="imei_count: "+e.properties.imei_count+"<br/>\n            msg_count: "+e.properties.msg_count+"<br/>\n            all_msgs: "+e.properties.all_msgs+"<br/>\n            ";t.bindTooltip(o)}}}}},methods:{getStyle:function(e,t){return{style:{color:e},onEachFeature:t?function(e){return function(t,o){o.bindTooltip(e,{permanent:!0,opacity:.7,direction:"center"})}}(t):void 0}}},mounted:function(){var e=this;this.$nextTick(function(){new l.a.Control.Measure({primaryLengthUnit:"meters",secondaryLengthUnit:"kilometers",primaryAreaUnit:"sqmeters",secondaryAreaUnit:"hectares",decPoint:",",thousandsSep:"",position:"bottomleft"}).addTo(e.$refs.map.mapObject),e.heat=l.a.heatLayer([],{radius:20}),e.heat.addTo(e.$refs.map.mapObject)})},watch:{heatMap:function(e){e=e||[],this.heat.setLatLngs(e)}}},g={render:function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("l-map",{ref:"map",attrs:{bounds:e.bounds}},[o("l-control-layers",{attrs:{position:"topright",collapsed:!1}}),e._v(" "),e._l(e.tileProviders,function(e){return o("l-tile-layer",{key:e.name,attrs:{layerType:"base",name:e.name,visible:e.visible,url:e.url,attribution:e.attribution}})}),e._v(" "),o("l-control-scale",{attrs:{imperial:!1,position:"bottomright"}}),e._v(" "),e._l(e.fields,function(t){return o("l-geo-json",{key:t.id,attrs:{geojson:t.geodata,visible:t.visible,options:"geojson"===t.source?e.geoJsonOptions:e.getStyle(t.color)}})})],2)},staticRenderFns:[]},f=o("VU/8")(p,g,!1,null,null,null).exports,h={props:{field:{type:Object,required:!0}},data:function(){return{color:"red"}}},A={render:function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",[o("hr"),e._v("\n  "+e._s(e.field.id)+"\n  "),o("div",{staticClass:"color-box",style:{"background-color":e.field.color}}),e._v(" "),o("el-checkbox",{attrs:{value:e.field.visible},on:{change:function(t){return e.$emit("change-visible",t)}}},[e._v("Показывать")]),e._v(" "),o("el-button",{attrs:{type:"info",icon:"el-icon-delete",size:"mini"},on:{click:function(){return e.$emit("remove")}}},[e._v("Удалить")])],1)},staticRenderFns:[]};var m=o("VU/8")(h,A,!1,function(e){o("z1gI")},null,null).exports,v=o("KGwW"),b=o.n(v),k={name:"App",components:{Map:f,FieldSettings:m},data:function(){return{fields:[],wktRawData:"",id:1,color:"#600054",geoJsonRawData:"",heatMap:null}},computed:{mapBounds:function(){return this.fields.length>0?l.a.geoJSON(this.fields[this.fields.length-1].geodata).getBounds():l.a.latLngBounds(l.a.latLng(51.582012,35.1269),l.a.latLng(49.671058,39.537911))},newColor:function(){return this.color&&this.color.length>1?this.color:"#600054"}},methods:{addField:function(){if(this.wktRawData){var e=b()(this.wktRawData);e?(this.fields.push({id:this.id++,geodata:e,visible:!0,color:this.newColor}),this.wktRawData=""):this.$notify.error({message:"Ошибка парсинга WKT!"})}else this.$notify.error({message:"Введите WKT!"})},addGeoJSON:function(e){var t=e||this.geoJsonRawData;if(t){var o=null;try{o=JSON.parse(t)}catch(e){return void this.$notify.error({message:"GeoJSON не корректен!"})}this.fields.push({id:this.id++,geodata:o,visible:!0,color:"white",source:"geojson"}),this.geoJsonRawData=""}else this.$notify.error({message:"Введите GeoJSON!"})},removeField:function(e){this.fields.splice(e,1)},processFile:function(e,t){var o=this,i=e.target,r=new FileReader;r.onload=function(){var e=r.result;e?t(e):o.$notify.error({message:"Файл пуст!"})},r.readAsText(i.files[0])},tryAddHeatMap:function(e){if(e){var t=null;try{t=JSON.parse(e)}catch(e){return void this.$notify.error({message:"JSON в файле не корректен!"})}this.heatMap=t}else this.$notify.error({message:"Файл пуст!"})}}},w={render:function(){var e=this,t=e.$createElement,o=e._self._c||t;return o("div",{staticStyle:{height:"100%",width:"100%"},attrs:{id:"app"}},[o("el-container",{staticStyle:{height:"100%",width:"100%"}},[o("el-aside",{staticClass:"aside",attrs:{width:"200px"}},[o("el-input",{attrs:{type:"textarea",autosize:{minRows:2,maxRows:4},placeholder:"Введтие WKT"},model:{value:e.wktRawData,callback:function(t){e.wktRawData=t},expression:"wktRawData"}}),e._v(" "),o("div",[o("span",[e._v("Цвет полигона: ")]),e._v(" "),o("div",{staticStyle:{display:"inline-block"}},[o("el-color-picker",{attrs:{size:"mini"},model:{value:e.color,callback:function(t){e.color=t},expression:"color"}})],1),e._v(" "),o("div",[o("el-button",{attrs:{size:"mini"},on:{click:e.addField}},[e._v("Добавить")])],1)]),e._v(" "),o("div",[o("el-input",{attrs:{type:"textarea",autosize:{minRows:2,maxRows:4},placeholder:"Введтие GeoJSON"},model:{value:e.geoJsonRawData,callback:function(t){e.geoJsonRawData=t},expression:"geoJsonRawData"}}),e._v(" "),o("el-button",{attrs:{size:"mini"},on:{click:function(){return e.addGeoJSON()}}},[e._v("Добавить GeoJSON")])],1),e._v(" "),o("div",[o("div",[e._v("Файл с точками для HeatMap")]),e._v(" "),o("input",{attrs:{type:"file"},on:{change:function(t){e.processFile(t,e.tryAddHeatMap)}}})]),e._v(" "),o("div",[o("div",[e._v("Файл с GeoJSON")]),e._v(" "),o("input",{attrs:{type:"file"},on:{change:function(t){e.processFile(t,e.addGeoJSON)}}})]),e._v(" "),e._l(e.fields,function(t,i){return o("FieldSettings",{key:t.id,attrs:{field:t},on:{"change-visible":function(e){return t.visible=e},remove:function(t){e.removeField(i)}}})})],2),e._v(" "),o("el-main",{staticClass:"main"},[o("Map",{staticStyle:{height:"100%",width:"100%"},attrs:{bounds:e.mapBounds,fields:e.fields,heatMap:e.heatMap}})],1)],1)],1)},staticRenderFns:[]};var y=o("VU/8")(k,w,!1,function(e){o("57rx")},null,null).exports,x=o("zL8q"),S=o.n(x),M=(o("tvR6"),o("UMRm")),N=o.n(M);i.default.use(S.a,{locale:N.a}),i.default.config.productionTip=!1,new i.default({el:"#app",components:{App:y},template:"<App/>"})},R8Y0:function(e,t){},TJ5S:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABkAAAApCAYAAADAk4LOAAAFgUlEQVR4Aa1XA5BjWRTN2oW17d3YaZtr2962HUzbDNpjszW24mRt28p47v7zq/bXZtrp/lWnXr337j3nPCe85NcypgSFdugCpW5YoDAMRaIMqRi6aKq5E3YqDQO3qAwjVWrD8Ncq/RBpykd8oZUb/kaJutow8r1aP9II0WmLKLIsJyv1w/kqw9Ch2MYdB++12Onxee/QMwvf4/Dk/Lfp/i4nxTXtOoQ4pW5Aj7wpici1A9erdAN2OH64x8OSP9j3Ft3b7aWkTg/Fm91siTra0f9on5sQr9INejH6CUUUpavjFNq1B+Oadhxmnfa8RfEmN8VNAsQhPqF55xHkMzz3jSmChWU6f7/XZKNH+9+hBLOHYozuKQPxyMPUKkrX/K0uWnfFaJGS1QPRtZsOPtr3NsW0uyh6NNCOkU3Yz+bXbT3I8G3xE5EXLXtCXbbqwCO9zPQYPRTZ5vIDXD7U+w7rFDEoUUf7ibHIR4y6bLVPXrz8JVZEql13trxwue/uDivd3fkWRbS6/IA2bID4uk0UpF1N8qLlbBlXs4Ee7HLTfV1j54APvODnSfOWBqtKVvjgLKzF5YdEk5ewRkGlK0i33Eofffc7HT56jD7/6U+qH3Cx7SBLNntH5YIPvODnyfIXZYRVDPqgHtLs5ABHD3YzLuespb7t79FY34DjMwrVrcTuwlT55YMPvOBnRrJ4VXTdNnYug5ucHLBjEpt30701A3Ts+HEa73u6dT3FNWwflY86eMHPk+Yu+i6pzUpRrW7SNDg5JHR4KapmM5Wv2E8Tfcb1HoqqHMHU+uWDD7zg54mz5/2BSnizi9T1Dg4QQXLToGNCkb6tb1NU+QAlGr1++eADrzhn/u8Q2YZhQVlZ5+CAOtqfbhmaUCS1ezNFVm2imDbPmPng5wmz+gwh+oHDce0eUtQ6OGDIyR0uUhUsoO3vfDmmgOezH0mZN59x7MBi++WDL1g/eEiU3avlidO671bkLfwbw5XV2P8Pzo0ydy4t2/0eu33xYSOMOD8hTf4CrBtGMSoXfPLchX+J0ruSePw3LZeK0juPJbYzrhkH0io7B3k164hiGvawhOKMLkrQLyVpZg8rHFW7E2uHOL888IBPlNZ1FPzstSJM694fWr6RwpvcJK60+0HCILTBzZLFNdtAzJaohze60T8qBzyh5ZuOg5e7uwQppofEmf2++DYvmySqGBuKaicF1blQjhuHdvCIMvp8whTTfZzI7RldpwtSzL+F1+wkdZ2TBOW2gIF88PBTzD/gpeREAMEbxnJcaJHNHrpzji0gQCS6hdkEeYt9DF/2qPcEC8RM28Hwmr3sdNyht00byAut2k3gufWNtgtOEOFGUwcXWNDbdNbpgBGxEvKkOQsxivJx33iow0Vw5S6SVTrpVq11ysA2Rp7gTfPfktc6zhtXBBC+adRLshf6sG2RfHPZ5EAc4sVZ83yCN00Fk/4kggu40ZTvIEm5g24qtU4KjBrx/BTTH8ifVASAG7gKrnWxJDcU7x8X6Ecczhm3o6YicvsLXWfh3Ch1W0k8x0nXF+0fFxgt4phz8QvypiwCCFKMqXCnqXExjq10beH+UUA7+nG6mdG/Pu0f3LgFcGrl2s0kNNjpmoJ9o4B29CMO8dMT4Q5ox8uitF6fqsrJOr8qnwNbRzv6hSnG5wP+64C7h9lp30hKNtKdWjtdkbuPA19nJ7Tz3zR/ibgARbhb4AlhavcBebmTHcFl2fvYEnW0ox9xMxKBS8btJ+KiEbq9zA4RthQXDhPa0T9TEe69gWupwc6uBUphquXgf+/FrIjweHQS4/pduMe5ERUMHUd9xv8ZR98CxkS4F2n3EUrUZ10EYNw7BWm9x1GiPssi3GgiGRDKWRYZfXlON+dfNbM+GgIwYdwAAAAASUVORK5CYII="},qXhe:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADIAAABSCAMAAAAhFXfZAAAC91BMVEVMaXEzeak2f7I4g7g3g7cua5gzeKg8hJo3grY4g7c3grU0gLI2frE0daAubJc2gbQwd6QzeKk2gLMtd5sxdKIua5g1frA2f7IydaM0e6w2fq41fK01eqo3grgubJgta5cxdKI1f7AydaQydaMxc6EubJgvbJkwcZ4ubZkwcJwubZgubJcydqUydKIxapgubJctbJcubZcubJcvbJYubJcvbZkubJctbJctbZcubJg2f7AubJcrbZcubJcubJcua5g3grY0fq8ubJcubJdEkdEwhsw6i88vhswuhcsuhMtBjMgthMsrg8srgss6is8qgcs8i9A9iMYtg8spgcoogMo7hcMngMonf8olfso4gr8kfck5iM8jfMk4iM8he8k1fro7itAgesk2hs8eecgzfLcofssdeMg0hc4cd8g2hcsxeLQbdsgZdcgxeLImfcszhM0vda4xgckzhM4xg84wf8Yxgs4udKsvfcQucqhUndROmdM1fK0wcZ8vb5w0eqpQm9MzeKhXoNVcpdYydKNWn9VZotVKltJFjsIwcJ1Rms9OlslLmtH///8+kc9epdYzd6dbo9VHkMM2f7FHmNBClM8ydqVcpNY9hro3gLM9hLczealQmcw3fa46f7A8gLMxc6I3eagyc6FIldJMl9JSnNRSntNNl9JPnNJFi75UnM9ZodVKksg8kM45jc09e6ZHltFBk883gbRBh7pDk9EwcaBzn784g7dKkcY2i81Om9M7j85Llc81is09g7Q4grY/j9A0eqxKmdFFltBEjcXf6fFImdBCiLxJl9FGlNFBi78yiMxVndEvbpo6js74+vx+psPP3+o/ks5HkcpGmNCjwdZCkNDM3ehYoNJEls+lxNkxh8xHks0+jdC1zd5Lg6r+/v/H2ufz9/o3jM3t8/edvdM/k89Th61OiLBSjbZklbaTt9BfptdjmL1AicBHj8hGk9FAgK1dkLNTjLRekrdClc/k7fM0icy0y9tgp9c4jc2NtM9Dlc8zicxeXZn3AAAAQ3RSTlMAHDdTb4yPA+LtnEQmC4L2EmHqB7XA0d0sr478x4/Yd5i1zOfyPkf1sLVq4Nh3FvjxopQ2/STNuFzUwFIwxKaejILpIBEV9wAABhVJREFUeF6s1NdyFEcY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"},tvR6:function(e,t){},wkq0:function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACkAAAApCAQAAAACach9AAACMUlEQVR4Ae3ShY7jQBAE0Aoz/f9/HTMzhg1zrdKUrJbdx+Kd2nD8VNudfsL/Th///dyQN2TH6f3y/BGpC379rV+S+qqetBOxImNQXL8JCAr2V4iMQXHGNJxeCfZXhSRBcQMfvkOWUdtfzlLgAENmZDcmo2TVmt8OSM2eXxBp3DjHSMFutqS7SbmemzBiR+xpKCNUIRkdkkYxhAkyGoBvyQFEJEefwSmmvBfJuJ6aKqKWnAkvGZOaZXTUgFqYULWNSHUckZuR1HIIimUExutRxwzOLROIG4vKmCKQt364mIlhSyzAf1m9lHZHJZrlAOMMztRRiKimp/rpdJDc9Awry5xTZCte7FHtuS8wJgeYGrex28xNTd086Dik7vUMscQOa8y4DoGtCCSkAKlNwpgNtphjrC6MIHUkR6YWxxs6Sc5xqn222mmCRFzIt8lEdKx+ikCtg91qS2WpwVfBelJCiQJwvzixfI9cxZQWgiSJelKnwBElKYtDOb2MFbhmUigbReQBV0Cg4+qMXSxXSyGUn4UbF8l+7qdSGnTC0XLCmahIgUHLhLOhpVCtw4CzYXvLQWQbJNmxoCsOKAxSgBJno75avolkRw8iIAFcsdc02e9iyCd8tHwmeSSoKTowIgvscSGZUOA7PuCN5b2BX9mQM7S0wYhMNU74zgsPBj3HU7wguAfnxxjFQGBE6pwN+GjME9zHY7zGp8wVxMShYX9NXvEWD3HbwJf4giO4CFIQxXScH1/TM+04kkBiAAAAAElFTkSuQmCC"},z1gI:function(e,t){}},["NHnr"]);
//# sourceMappingURL=app.1767646734e3d1febc25.js.map