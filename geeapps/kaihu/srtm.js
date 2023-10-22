var Prism_ppt = ui.import && ui.import("Prism_ppt", "image", {
      "id": "users/kaihu/PRISM/PRISM_ppt_30yr_normal_800mM2_annual_bil"
    }) || ee.Image("users/kaihu/PRISM/PRISM_ppt_30yr_normal_800mM2_annual_bil");
//Author Kai Hu, kai.hu@wisc.edu, Updated: 07/01/2020
//load the palette
var palettes = require('users/gena/packages:palettes'); //import the palettes from ee-palettes
var palette_ppt = palettes.colorbrewer.Spectral[11]; //pick your colorbar
//print(palette_ppt)
Map.setOptions('TERRAIN');
var palette1 = ['5e4fa2','3288bd','66c2a5','abdda4','e6f598','ffffbf','fee08b','fdae61','f46d43','d53e4f','9e0142'];
var palette2 = [];
var palette3 = ['9e0142', 'd53e4f','f46d43','fdae61','fee08b','ffffbf','e6f598','abdda4','66c2a5','3288bd','5e4fa2'];
var image1 = ee.Image("USGS/SRTMGL1_003");
var image2 = ee.Image('USGS/NED').select('elevation');
var image3 = Prism_ppt;
var image4 = ee.Image('NOAA/NGDC/ETOPO1').select('bedrock');
//Map.addLayer (image2,{palette:palette},'NED')
//list of images
var images = {
  'Shuttle Radar Topography Mission (SRTM) 30m': image1,
  'National Elevation Dataset (NED) 10m': image2,
  'NED Hillshade': ee.Terrain.hillshade (image2, 315, 45),
  'PRISM 30yr Normal (1981-2010) precipitation' : image3,
  'Global 1 Arc-Minute Elevation' : image4,
} ;
var units = {
  'Shuttle Radar Topography Mission (SRTM) 30m': 'm',
  'National Elevation Dataset (NED) 10m': 'm',
  'NED Hillshade': [],
  'PRISM 30yr Normal (1981-2010) precipitation' : 'mm',
  'Global 1 Arc-Minute Elevation': 'm',
}
var palettes_ee = {
  'Shuttle Radar Topography Mission (SRTM) 30m': palette1,
  'National Elevation Dataset (NED) 10m': palette1,
  'NED Hillshade': palette2,
  'PRISM 30yr Normal (1981-2010) precipitation': palette3,
  'Global 1 Arc-Minute Elevation': palette1,
}
var centers = {
  'Shuttle Radar Topography Mission (SRTM) 30m': {lon:-91.1496, lat: 42.9996, zoom: 11},
  'National Elevation Dataset (NED) 10m': {lon:-91.1496, lat: 42.9996, zoom: 11},
  'NED Hillshade': {lon:-112.0613, lat: 36.2153, zoom: 10},
  'PRISM 30yr Normal (1981-2010) precipitation': {lon:-123.5719, lat: 47.7619, zoom: 9},
  'Global 1 Arc-Minute Elevation': {lon:96.45, lat: 34.04, zoom: 4},
}
var sources = {
  'Shuttle Radar Topography Mission (SRTM) 30m': 'https://cmr.earthdata.nasa.gov/search/concepts/C1000000240-LPDAAC_ECS.html',
  'National Elevation Dataset (NED) 10m': 'https://www.usgs.gov/core-science-systems/national-geospatial-program/national-map',
  'NED Hillshade': 'https://www.usgs.gov/core-science-systems/national-geospatial-program/national-map',
  'PRISM 30yr Normal (1981-2010) precipitation': 'https://prism.oregonstate.edu/normals/',
  'Global 1 Arc-Minute Elevation': 'https://doi.org/10.7289/V5C8276M',
}
//list of maplayers
//var maplayers = {
  //'SRTM': ui.Map.Layer(image1,[],'SRTM'),
  //'NED': ui.Map.Layer(image2,[],'NED')
//};
//ui.Map.Layer(images[selection]), [], Object.keys(images)[selection]
//Map.onChangeBounds(MaxMininFrame)
var select = ui.Select({items: Object.keys(images), onChange: function(selection){
  //Map.onChangeBounds(MaxMininFrame(images[selection]))
  //var centers = {lon:-91.1496, lat: 42.9996, zoom: 11}
  Map.setCenter(centers[selection].lon, centers[selection]. lat, centers[selection].zoom);
  var maxmin = MaxMininFrame(images[selection]);
  maxmin.evaluate(function(val){
  var max = val.max;
  var min = val.min;
  //print(max); print(min)
  var visParams = {
    min: min,
    max: max,
    opacity: 0.75,
    palette: palettes_ee[selection],
  };
  //print(visParams)
  //Map.layers().set(0,ui.Map.Layer(image,visParams));
  Map.layers().set(0,ui.Map.Layer(images[selection],visParams, selection));
  })
}
  });
select.setPlaceholder ('Please select data source...')
Map.add(select)
Map.onChangeBounds(function(){
 var selection = select.getValue()
 //print(s)
 //print(images.filter(ee.Filter.eq(Object.keys(images), 'SRTM 30m'))) 
 //print(images[s])
 var maxmin = MaxMininFrame(images[selection]);
  maxmin.evaluate(function(val){
  var max = val.max;
  var min = val.min;
  //print(Math.round(max)); print(min)
  var visParams = {
    min: min,
    max: max,
    opacity: 0.75,
    palette: palettes_ee[selection],
  };
  //print(visParams)
  //Map.layers().set(0,ui.Map.Layer(image,visParams));
  if (selection === 'Global 1 Arc-Minute Elevation') {
    Map.layers().set(0,ui.Map.Layer(ee.Terrain.hillshade(images[selection], 315, 45), {opacity: 0.75}));
    Map.layers().set(1,ui.Map.Layer(images[selection],visParams, selection));
  }
  else {
  Map.layers().set(0,ui.Map.Layer(images[selection],visParams, selection));
  }
  DataRangePanel(Math.round(max), Math.round(min), 'bottom-left', selection, 1, units[selection], sources[selection]);
  AppBuilderPanel ('bottom-right', 2)
 var button = ui.Button({
  label: 'Dowload data in the viewport',
  onClick: function(){
  var downloadParam = {
  image: images[selection],
  //crs: ee.String(crs_textbox.getValue()),
  scale: images[selection].projection().nominalScale(),
  region: ee.Geometry.Rectangle(Map.getBounds()),
  //maxPixels: 2e10,
}
 var url = images[selection].getDownloadURL(downloadParam);
  urlLabeld.setUrl(url);
  urlLabeld.style().set({shown: true});
  }
})
  var urlLabeld = ui.Label('Download link', {shown: false});
  var downloadURL = ui.Panel([button, urlLabeld]); 
  //print(downloadURL)
  downloadURL.style().set({position: 'bottom-center', padding: '0px 0px', backgroundColor: 'rgba(255, 255, 255, 0.65)'});
  Map.widgets().set(3, downloadURL);
  })
})
function MaxMininFrame(image){
  var geometry = Map.getBounds();
  var scale = Map.getScale();
  //print(scale)
  var MaxMin = image.reduceRegion({
    reducer: ee.Reducer.max().combine(ee.Reducer.min(), null, true), 
    geometry: ee.Geometry.Rectangle(geometry), 
    //crs: 'EPSG:4326',
    scale: scale,
    maxPixels: 2e15,
  });
  MaxMin = MaxMin.rename(MaxMin.keys(), ['max','min']);
  return MaxMin
}
function DataRangePanel(max, min, position, selection, level, unit, sources){
  var label3 = ui.Label('Min: '+(min)+' '+ unit);
  //print(ee.Number(min).round())
  label3.style().set({backgroundColor: 'rgba(255, 255, 255, 0)'})
  var label4 = ui.Label('Max: '+(max)+ ' '+ unit);
  label4.style().set({backgroundColor: 'rgba(255, 255, 255, 0)'})
  var label1 = ui.Label(selection)
  label1.style().set({fontWeight: 'bold', backgroundColor: 'rgba(255, 255, 255, 0)'})
  var label2 = ui.Label('Viewport Value Range')
  label2.style().set({backgroundColor: 'rgba(255, 255, 255, 0)'})
  var urlLabel = ui.Label ('Data Source')
  urlLabel.setUrl(sources)
  //print(sources)
  urlLabel.style().set({backgroundColor: 'rgba(255, 255, 255, 0)', shown: true})
  var labels = ui.Panel([label1,urlLabel, label2,label3, label4]);
  labels.style().set({position: position, backgroundColor: 'rgba(255, 255, 255, 0.65)'})
  Map.widgets().set(level, labels);
}
function AppBuilderPanel(position, level) {
  var label5 = ui.Label('App builder: Kai Hu (kai.hu@wisc.edu)\nUniversity of Wisconsin-Madison\nUpdate: 07/01/2020', {whiteSpace: 'pre'});
  label5.style().set({backgroundColor: 'rgba(255, 255, 255, 0)'})  
  var AppBuilder = ui.Panel([label5]); 
  AppBuilder.style().set({padding: '2px 2px', position: position, backgroundColor: 'rgba(255, 255, 255, 0.65)'})
  //Map.addLayer(image, visParam); 
  Map.widgets().set(level, AppBuilder);
}