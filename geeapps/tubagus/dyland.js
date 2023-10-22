var ltgee = require('users/tubagus/LandTrendr_TA:LT Landslide/Edited_LandTrendr_2');  
// HISTOGRAM
//####################################################################################
//########### ACTION HANDLER FUNCTION ################################################
//####################################################################################
var mapDisturbance = function(){
  // get landtrendr run parameters
  var runParams = ltgee.getParams(paramPanel);
  var startYear = ltgee.getYears(yearPanel).startYear;
  var endYear = ltgee.getYears(yearPanel).endYear;
  var startDay = ltgee.getDays(datePanel).startDay;
  var endDay = ltgee.getDays(datePanel).endDay;
  var index = ltgee.getIndexSelect(indexPanel);
  var maskThese = ltgee.getMaskSelect(maskPanel);
  var lon = ltgee.getCoords(coordsPanel).lon;
  var lat = ltgee.getCoords(coordsPanel).lat;
  var buffer = ltgee.getBuffer(bufferPanel);
  var aoi = ee.Geometry.Point(lon, lat)
                         .buffer(buffer*1000)
                         .bounds();
  // center the map on the point
  map.centerObject(aoi, 14);
  // run landtrendr and get the segmenation information
  var lt = ltgee.runLT(startYear, endYear, startDay, endDay, aoi, index, [], runParams, maskThese); //maskThese
  //var segInfo = ltgee.getSegmentData(lt, index);
  // get disturbance mapping parameters
  var distParams = {};
  distParams.index = index;
  //distParams.segInfo = segInfo;
  distParams.delta = changeTypeFilter.widgets().get(1).getValue();
  distParams.sort = distTypeFilter.widgets().get(1).getValue();
  var distYearsFilter = ltgee.getYears(yearFilter);
  distParams.year = {
    checked: yearFilter.widgets().get(0).getValue(), 
    start: parseInt(distYearsFilter.startYear), 
    end: parseInt(distYearsFilter.endYear)
  };
  distParams.mag = {
    checked: magFilter.widgets().get(0).getValue(),
    value: parseFloat(magFilter.widgets().get(1).widgets().get(1).getValue()),
    operator: magFilter.widgets().get(1).widgets().get(3).getValue().toString()
  };
  distParams.dur = {
    checked: durFilter.widgets().get(0).getValue(),
    value: parseFloat(durFilter.widgets().get(1).widgets().get(1).getValue()),
    operator: durFilter.widgets().get(1).widgets().get(3).getValue().toString()
  };
  distParams.preval = {
    checked: prevalFilter.widgets().get(0).getValue(),
    value: parseFloat(prevalFilter.widgets().get(1).widgets().get(1).getValue()),
    operator: prevalFilter.widgets().get(1).widgets().get(3).getValue().toString()
  };
  distParams.mmu = {
    checked: mmuFilter.widgets().get(0).getValue(),
    value: parseInt(mmuFilter.widgets().get(1).getValue())
  };
  // get the disturbance map layers
  var distImg = ltgee.getChangeMap(lt, distParams);
//##########################################################################################
// THRESHOLD INPUT
//##########################################################################################
var srtm = ee.Image("USGS/SRTMGL1_003").clip(aoi)
var slope = ee.Terrain.slope(srtm)
var addFilter = slope.gte(15)
//##########################################################################################
// PALETTE
//##########################################################################################
  var yodVizParms = {
    min: 2000,
    max: 2022,
    palette: ['#9400D3', '#4B0082', '#0000FF', '#00FF00', '#FFFF00', '#FF7F00', '#FF0000']
  };
  var magVizParms = {
    min: 300,
    max: 800,
    palette: ['#9400D3', '#4B0082', '#0000FF', '#00FF00', '#FFFF00', '#FF7F00', '#FF0000']
  };
  var preValVizParms = {
    min: 500,
    max: 1000,
    palette: ['#9400D3', '#4B0082', '#0000FF', '#00FF00', '#FFFF00', '#FF7F00', '#FF0000']
  };
//##########################################################################################
// MAPPING
//##########################################################################################
var vektor_yod = distImg.select(['yod']).updateMask(addFilter).reduceToVectors({
  geometry: aoi, 
  scale: 20, 
  geometryType: 'polygon', 
  labelProperty: 'year', 
})
var vektor_mag = distImg.select(['mag']).toInt16().updateMask(addFilter).reduceToVectors({
  geometry: aoi, 
  scale: 20, 
  geometryType: 'polygon', 
  labelProperty: 'magnitude', 
})
var vektor_preval = distImg.select(['preval']).toInt16().updateMask(addFilter).reduceToVectors({
  geometry: aoi, 
  scale: 20, 
  geometryType: 'polygon', 
  labelProperty: 'pre-value', 
})
var empty = ee.Image().byte();
var vektor_yod_map = empty.paint({
  featureCollection: vektor_yod,
  color: 'year',
});
var vektor_mag_map = empty.paint({
  featureCollection: vektor_mag,
  color: 'magnitude',
});
var vektor_preval_map = empty.paint({
  featureCollection: vektor_preval,
  color: 'pre-value',
});
  map.layers().set(0, ui.Map.Layer(slope.gte(15).clip(aoi),   {},                'Kemiringan Lereng',   0));
  map.layers().set(1, ui.Map.Layer(vektor_yod_map.clip(aoi),      yodVizParms,       'Tahun Deteksi',       1));    
  map.layers().set(2, ui.Map.Layer(vektor_mag_map.clip(aoi),      magVizParms,       'Magnitude Perubahan', 0));            
  map.layers().set(3, ui.Map.Layer(vektor_preval_map.clip(aoi),   preValVizParms,    'Pre value',           0));    
  return {lt:lt, distImg:distImg, index:index};
};
//##########################################################################################
// CHART
//##########################################################################################
var chartPoint = function(lt, pixel, index, indexFlip) {
  var pixelTimeSeriesData = ltgee.ltPixelTimeSeriesArray(lt, pixel, indexFlip);
  return ui.Chart(pixelTimeSeriesData.ts, 'LineChart',
            {
              'title' : 'Index: '+index + ' | Fit RMSE:'+ (Math.round(pixelTimeSeriesData.rmse * 100) / 100).toString(),
              'hAxis': 
                {
                  'format':'####'
                },
              'vAxis':
                {
                  'maxValue': 1000,
                  'minValue': -1000   
                }
            },
            {'columns': [0, 1, 2]}
          );
};
//####################################################################################
//########### UI ELEMENT CONSTRUCTION ################################################
//####################################################################################
// SET UP PRIMARY PANELS
// control panel
var controlPanel = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
  style: {width: '370px'}
});
// Initiate new map object.
var map = ui.Map();
var mapStyle = [
  {
    featureType: 'landscape.man_made',
    elementType: 'geometry.fill',
    stylers: [{color: '#32493A'}]
  },
  {
    featureType: 'landscape.natural',
    elementType: 'geometry.fill',
    stylers: [{color: '#32493A'}]
  },
  {
    featureType: 'landscape.natural.terrain',
    elementType: 'geometry.fill',
    stylers: [{color: '#000040'}]
  },
  {
    featureType: 'poi',
    elementType: 'labels',
    stylers: [{visibility: 'off'}]
  },
  {
    featureType: 'transit',
    elementType: 'labels',
    stylers: [{visibility: 'off'}]
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{visibility: 'off'}]
  },
  {
    featureType: 'road',
    elementType: 'labels',
    stylers: [{visibility: 'off'}]
  },
  {
    featureType: 'administrative',
    elementType: 'labels',
    stylers: [{visibility: 'off'}]
  },
  {
        featureType: 'water',
        elementType: 'geometry',
        stylers: [{
                color: '#EAEAEA'
            },
            {
                lightness: 12
            }],
    },
];
map.setOptions('mapStyle', {mapStyle: mapStyle});
// Set the default map's cursor to a 'crosshair'.
map.style().set('cursor', 'crosshair');
// Set the center and zoom level of the new map.
map.setCenter(122.057, -3.957);
// plot panel
var plotsPanelLabel = ui.Panel([
  ui.Label('Intruksi Penggunaan Dynamic Landslide', {fontWeight: 'bold'}),
  ui.Label('1) Klik pada area yang ingin dideteksi atau masukkan koordinat pada panel kiri lalu klik submit'),
  ui.Label('2) Tunggu beberapa saat'),
  ui.Label('3) Hasil deteksi dapat difilter berdasarkan tahun pada panel kiri'),
  ui.Label('4) Jika ingin difilter, ceklis terlebih dahulu lalu tentukan tahun dan submit'),
  ui.Label('UI Medoids untuk Validasi Hasil', {}, 'https://tubagus.users.earthengine.app/view/medoids-dyland'),
  ui.Label('______________________________________________'),
  ui.Label('Intruksi Penggunaan Inspektor Piksel', {fontWeight: 'bold'}),
  ui.Label('1) Ceklis terlebih dahulu kotak inspektor piksel'),
  ui.Label('2) lalu klik salah satu piksel longsor pada peta untuk diinspeksi'),
]);
var inspectorCheck = ui.Checkbox({label:'Inspektor Piksel', value:0, style:{color:'#FF9137'}});
var yodLabel = ui.Label('');
var magLabel = ui.Label('');
var durLabel = ui.Label('');
var prevaLabel = ui.Label('');
var rateLabel = ui.Label('');
var plotPanel = ui.Panel(null, null, {stretch: 'horizontal'});
var warningPanel = ui.Label('');
var plotPanelParent = ui.Panel([
  plotsPanelLabel, 
  inspectorCheck, 
  yodLabel,
  magLabel,
  durLabel,
  prevaLabel,
  rateLabel,
  plotPanel,
  warningPanel], null, {width: '350px'});
// SET UP SECONDARY PANELS
var yearPanel = ltgee.yearPanel();
var datePanel = ltgee.datePanel();
var indexPanel = ltgee.indexSelectPanel();
var maskPanel = ltgee.maskSelectPanel();
var bufferPanel = ltgee.bufferPanel();
var coordsPanel = ltgee.coordsPanel();
var paramPanel = ltgee.paramPanel();
// disturbance mapping panel
var changeTypeList = ['Loss'];
var changeTypeFilter = ui.Panel(
  [ui.Label({value:'Tipe Perubahan Nilai:', style:{color:'#FF9137'}}),ui.Select({items:changeTypeList, value:'Loss', style:{stretch: 'horizontal'}})], ui.Panel.Layout.Flow('horizontal')
);
var distTypeList = ['Greatest'];
var distTypeFilter = ui.Panel(
  [ui.Label({value:'Select Vegetation Change Sort:', style:{color:'#FF9137'}}),ui.Select({items:distTypeList, value:'Greatest', style:{stretch: 'horizontal'}})], ui.Panel.Layout.Flow('horizontal')
);
var yearFilter = ltgee.yearPanel();
yearFilter.remove(yearFilter.widgets().get(0));
yearFilter.insert(0, ui.Checkbox({label:'Filter berdasarkan Tahun:', style:{color:'#FF9137'}}));
yearFilter.widgets().get(1).style().set('padding', '0px 0px 0px 20px');
yearFilter.widgets().get(2).style().set('padding', '0px 0px 0px 20px');
var opList1 = ['>'];
var opList2 = ['<'];
var magFilter = ui.Panel(
  [
    ui.Checkbox({label:'Filter berdasarkan Magnitude:', value: true, style:{color:'#FF9137'}}),
    ui.Panel(
      [
        ui.Label('Nilai:'),
        ui.Textbox({value:300, style:{stretch: 'horizontal'}}),
        ui.Label('Operator:'),
        ui.Select({items:opList1, value:'>', style:{stretch: 'horizontal'}})
      ], ui.Panel.Layout.Flow('horizontal'), {stretch: 'horizontal', padding: '0px 0px 0px 20px'})
  ],
  null,
  {stretch: 'horizontal'}
);
var durFilter = ui.Panel(
  [
    ui.Checkbox({label:'Filter berdasarkan Duration:', value: true, style:{color:'#FF9137'}}),
    ui.Panel(
      [
        ui.Label('Nilai:'),
        ui.Textbox({value:2, style:{stretch: 'horizontal'}}),
        ui.Label('Operator:'),
        ui.Select({items:opList2, value:'<', style:{stretch: 'horizontal'}})
      ], ui.Panel.Layout.Flow('horizontal'), {stretch: 'horizontal', padding: '0px 0px 0px 20px'})
  ],
  null,
  {stretch: 'horizontal'}
);
var prevalFilter = ui.Panel(
  [
    ui.Checkbox({label:'Filter berdasarkan Pre-Dist Value:', value: true, style:{color:'#FF9137'}}),
    ui.Panel(
      [
        ui.Label('Nilai:'),
        ui.Textbox({value:500, style:{stretch: 'horizontal'}}),
        ui.Label('Operator:'),
        ui.Select({items:opList1, value:'>', style:{stretch: 'horizontal'}})
      ], ui.Panel.Layout.Flow('horizontal'), {stretch: 'horizontal', padding: '0px 0px 0px 20px'})
  ],
  null,
  {stretch: 'horizontal'}
);
var mmuFilter = ui.Panel(
  [
    ui.Checkbox({label:'Filter berdasarkan MMU:', value: true, style:{color:'#FF9137'}}),
    ui.Textbox({value:4, style:{stretch: 'horizontal'}}) 
  ],
  ui.Panel.Layout.Flow('horizontal'),
  {stretch: 'horizontal'}
);
var distParams = ui.Panel(
  [
    ui.Label('Parameter Perubahan Spasial',{fontWeight: 'bold'}),
    // changeTypeFilter,
    // distTypeFilter,
    yearFilter,
    // magFilter,
    // durFilter,
    // prevalFilter,
    // mmuFilter
  ]
);
var submitButton = ltgee.submitButton();
//####################################################################################
//########### BIND FUNCTIONS TO ACTIONS ##############################################
//####################################################################################
var changeMap;
var ltMap;
var ltIndex;
var dirty = 0;
map.onClick(function(coords) {
  // if in inspector mode, don't do anything - just get out
  if(inspectorCheck.getValue() === true){
    if(dirty === 0){
      plotPanelParent.widgets().get(8).clear();
      plotPanelParent.widgets().get(8).setValue('Warning: Tidak ditemukan perubahan. Nonaktifkan "Inspektor Piksel" & klik titik di peta atau masukkan & submit koordinat untuk perubahan spasial');
      return;
    }
    var point = ee.Geometry.Point(coords.lon, coords.lat);
    var pixel = point.buffer(20).bounds();
    var result = ltgee.getPixelInfo(changeMap, pixel);
    plotPanelParent.widgets().get(2).setValue('Year:      '+result.yod);
    plotPanelParent.widgets().get(3).setValue('Magnitude: '+Math.round(result.mag));
    plotPanelParent.widgets().get(4).setValue('Pre-value: '+Math.round(result.preval));
    plotPanelParent.widgets().get(5).setValue('Post-value:'+Math.round(result.postval));
    var indexFlip = ltgee.indexFlipper(ltIndex);
    var chart = chartPoint(ltMap, pixel, ltIndex, indexFlip);
    plotPanel = plotPanel.clear();
    plotPanel.add(chart);
  } else{  
    // change the coords in the box
    coordsPanel.widgets().get(1).widgets().get(1).setValue(coords.lon);
    coordsPanel.widgets().get(1).widgets().get(3).setValue(coords.lat);
    // draw disturbance layers
    var changeObj = mapDisturbance();
    changeMap = changeObj.distImg;
    ltMap = changeObj.lt;
    ltIndex = changeObj.index;
    dirty = 1;
  }
});
submitButton.onClick(function(){
  var changeObj = mapDisturbance();
  changeMap = changeObj.distImg;
  ltMap = changeObj.lt;
  ltIndex = changeObj.index;
  dirty = 1;
});
var year_palette= ['#9400D3', '#4B0082', '#0000FF', '#00FF00', '#FFFF00', '#FF7F00', '#FF0000'];
var yodVizParms = {
  min: 2000,
  max: 2022,
  palette: year_palette
};
var palette = ['#9400D3', '#4B0082', '#0000FF', '#00FF00', '#FFFF00', '#FF7F00', '#FF0000'];
var magVizParms = {
  min: 300,
  max: 800,
  palette: palette
};
var preVizParms = {
    min: 500,
    max: 1000,
    palette: palette
  };
var slopeVizParms = {
  min: 0,
  max: 30,
  palette: ['#0b90f8', '#f80000']
};
function makeColorBarParams(palette) {
  return {
    bbox: [0, 0, 1, 0.1],
    dimensions: '100x10',
    format: 'png',
    min: 0,
    max: 1,
    palette: palette,
  };
}
var colorBar1 = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(yodVizParms.palette),
  style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
});
var legendLabels1 = ui.Panel({
  widgets: [
    ui.Label(yodVizParms.min, {margin: '4px 8px'}),
    ui.Label(
        ((yodVizParms.max-yodVizParms.min) / 2+yodVizParms.min),
        {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
    ui.Label(yodVizParms.max, {margin: '4px 8px'})
  ],
  layout: ui.Panel.Layout.flow('horizontal'),
});
var legendTitle1 = ui.Label({
  value: 'Tahun Deteksi',
  style: {fontWeight: 'bold'}
});
var legendyod = ui.Panel([legendTitle1, colorBar1, legendLabels1]);
var colorBar2 = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(magVizParms.palette),
  style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
});
var legendLabels2 = ui.Panel({
  widgets: [
    ui.Label(magVizParms.min, {margin: '4px 8px'}),
    ui.Label(
        ((magVizParms.max-magVizParms.min) / 2+magVizParms.min),
        {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
    ui.Label(magVizParms.max, {margin: '4px 8px'})
  ],
  layout: ui.Panel.Layout.flow('horizontal'),
});
var legendTitle2 = ui.Label({
  value: 'Magnitude Perubahan',
  style: {fontWeight: 'bold'}
});
var legendmag = ui.Panel([legendTitle2, colorBar2, legendLabels2]);
var colorBar3 = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(preVizParms.palette),
  style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
});
var legendLabels3 = ui.Panel({
  widgets: [
    ui.Label(preVizParms.min, {margin: '4px 8px'}),
    ui.Label(
        ((preVizParms.max-preVizParms.min) / 2+preVizParms.min),
        {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
    ui.Label(preVizParms.max, {margin: '4px 8px'})
  ],
  layout: ui.Panel.Layout.flow('horizontal'),
});
var legendTitle3 = ui.Label({
  value: 'Pre-Value',
  style: {fontWeight: 'bold'}
});
var legendpre = ui.Panel([legendTitle3, colorBar3, legendLabels3]);
var colorBar4 = ui.Thumbnail({
  image: ee.Image.pixelLonLat().select(0),
  params: makeColorBarParams(slopeVizParms.palette),
  style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
});
var legendLabels4 = ui.Panel({
  widgets: [
    ui.Label(slopeVizParms.min, {margin: '4px 8px'}),
    ui.Label(
        ((slopeVizParms.max-slopeVizParms.min) / 2+slopeVizParms.min),
        {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
    ui.Label(slopeVizParms.max, {margin: '4px 8px'})
  ],
  layout: ui.Panel.Layout.flow('horizontal'),
});
var legendTitle4 = ui.Label({
  value: 'Kemiringan Lereng',
  style: {fontWeight: 'bold'}
});
var legendslope = ui.Panel([legendTitle4, colorBar4, legendLabels4]);
var layerName = ui.Panel([
  ui.Label('Layer default merupakan Peta Tahun Deteksi', {fontWeight: 'bold'}),
  ui.Label('Apabila ingin menampilkan layer lain, dapat cek pada tab layer pada peta bagian kanan atas.'),
]);
var website = ui.Panel([
ui.Label('Cek lokasi longsor pada website resmi berikut:'),
  ui.Label('Informasi Bencana Longsor BNPB', {}, 'https://dibi.bnpb.go.id/xdibi2#'),
  ui.Label('Informasi Bencana Longsor PVMBG', {}, 'https://vsi.esdm.go.id/index.php/gerakan-tanah/kejadian-gerakan-tanah'),
  ]);
//####################################################################################
//########### UI DRAWING #############################################################
//####################################################################################
// add panels to interface
// controlPanel.add(yearPanel);
// controlPanel.add(datePanel);
// controlPanel.add(indexPanel);
// controlPanel.add(maskPanel);
controlPanel.add(website);
controlPanel.add(coordsPanel);
// controlPanel.add(bufferPanel);
controlPanel.add(distParams);
// controlPanel.add(paramPanel);
controlPanel.add(submitButton);
controlPanel.add(layerName);
controlPanel.add(legendyod);
controlPanel.add(legendmag);
controlPanel.add(legendpre);
controlPanel.add(legendslope);
ui.root.clear();
ui.root.add(controlPanel);
ui.root.add(map);
ui.root.add(plotPanelParent);