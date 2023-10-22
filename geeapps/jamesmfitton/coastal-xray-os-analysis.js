var bristol = ee.Image("users/jamesmfitton/Coastal_XRay/4_OutputWaterParcels/Non_Scotland/grid_bristol_channel"),
    humber = ee.Image("users/jamesmfitton/Coastal_XRay/4_OutputWaterParcels/Non_Scotland/grid_humber"),
    thewash = ee.Image("users/jamesmfitton/Coastal_XRay/4_OutputWaterParcels/Non_Scotland/grid_thewash"),
    northwales = ee.Image("users/jamesmfitton/Coastal_XRay/4_OutputWaterParcels/Non_Scotland/grid_northwales"),
    mersey = ee.Image("users/jamesmfitton/Coastal_XRay/4_OutputWaterParcels/Non_Scotland/grid_merseryside"),
    southwales = ee.Image("users/jamesmfitton/Coastal_XRay/4_OutputWaterParcels/Non_Scotland/grid_southwales"),
    london = ee.Image("users/jamesmfitton/Coastal_XRay/4_OutputWaterParcels/Non_Scotland/grid_london"),
    lakes = ee.Image("users/jamesmfitton/Coastal_XRay/4_OutputWaterParcels/Non_Scotland/grid_lakes"),
    iom = ee.Image("users/jamesmfitton/Coastal_XRay/4_OutputWaterParcels/Non_Scotland/grid_iom"),
    scotland = ee.Image("users/jamesmfitton/Coastal_XRay/4_OutputWaterParcels/All/Scotland_2019_05_12"),
    nwwales = ee.Image("users/jamesmfitton/Coastal_XRay/4_OutputWaterParcels/Non_Scotland/grid_nwWales"),
    west_wales = ee.Image("users/jamesmfitton/Coastal_XRay/4_OutputWaterParcels/Non_Scotland/grid_west_wales"),
    barry = ee.Image("users/jamesmfitton/Coastal_XRay/4_OutputWaterParcels/Non_Scotland/grid_barry_island"),
    sw_wales = ee.Image("users/jamesmfitton/Coastal_XRay/4_OutputWaterParcels/Non_Scotland/grid_sw_wales"),
    supermare = ee.Image("users/jamesmfitton/Coastal_XRay/4_OutputWaterParcels/Non_Scotland/grid_supermare"),
    old_grimsby = ee.Image("users/jamesmfitton/Coastal_XRay/4_OutputWaterParcels/Non_Scotland/grid_old_grimsby"),
    s_cornwall = ee.Image("users/jamesmfitton/Coastal_XRay/4_OutputWaterParcels/Non_Scotland/grid_s_cornwall"),
    foreshore = ee.FeatureCollection("users/jamesmfitton/Coastlines/OS_Local/OS_Local_Foreshore_GB_WGS"),
    ncornwall = ee.Image("users/jamesmfitton/Coastal_XRay/4_OutputWaterParcels/Non_Scotland/grid_n_cornwall"),
    weymouth = ee.Image("users/jamesmfitton/Coastal_XRay/4_OutputWaterParcels/Non_Scotland/grid_weymouth"),
    southeast = ee.Image("users/jamesmfitton/Coastal_XRay/4_OutputWaterParcels/Non_Scotland/grid_southeast"),
    norfolk = ee.Image("users/jamesmfitton/Coastal_XRay/4_OutputWaterParcels/Non_Scotland/grid_norfolk"),
    skegness = ee.Image("users/jamesmfitton/Coastal_XRay/4_OutputWaterParcels/Non_Scotland/grid_skegness"),
    scarborough = ee.Image("users/jamesmfitton/Coastal_XRay/4_OutputWaterParcels/Non_Scotland/grid_scarborough"),
    northeast = ee.Image("users/jamesmfitton/Coastal_XRay/4_OutputWaterParcels/Non_Scotland/grid_northeast"),
    iow = ee.Image("users/jamesmfitton/Coastal_XRay/4_OutputWaterParcels/Non_Scotland/grid_iow"),
    clacton = ee.Image("users/jamesmfitton/Coastal_XRay/4_OutputWaterParcels/Non_Scotland/grid_clacton"),
    suffolkCloud = ee.Image("users/jamesmfitton/Coastal_XRay/4_OutputWaterParcels/Non_Scotland/grid_suffolkCloud"),
    shetland = ee.Image("users/jamesmfitton/Coastal_XRay/4_OutputWaterParcels/Non_Scotland/grid_shetlandAgain"),
    oh = ee.Image("users/jamesmfitton/Coastal_XRay/4_OutputWaterParcels/Non_Scotland/grid_OH"),
    lowestoft = ee.Image("users/jamesmfitton/Coastal_XRay/4_OutputWaterParcels/Non_Scotland/grid_lowestoft2"),
    ni = ee.Image("users/jamesmfitton/Coastal_XRay/4_OutputWaterParcels/Non_Scotland/grid_NI"),
    nl1 = ee.Image("users/jamesmfitton/Coastal_XRay/4_OutputWaterParcels/Non_Scotland/grid_nl1"),
    nl2 = ee.Image("users/jamesmfitton/Coastal_XRay/4_OutputWaterParcels/Non_Scotland/grid_nl2"),
    exeter = ee.Image("users/jamesmfitton/Coastal_XRay/4_OutputWaterParcels/Non_Scotland/grid_exeter"),
    line_80 = ee.FeatureCollection("users/jamesmfitton/Coastal_XRay/9_OS_Assessment/GB_XRAY_80_Line"),
    line_80_50 = ee.FeatureCollection("users/jamesmfitton/Coastal_XRay/9_OS_Assessment/GB_XRAY_80_Line_50m_buffer"),
    mlwPoints = ee.FeatureCollection("users/jamesmfitton/Coastal_XRay/9_OS_Assessment/MLW_XRay_Points_Values"),
    MHW = ee.FeatureCollection("users/jamesmfitton/Coastlines/OS_Local/OS_Local_MHW_GB_WGS"),
    MLW = ee.FeatureCollection("users/jamesmfitton/Coastlines/OS_Local/OS_Local_MLW_GB_WGS"),
    line_80_all = ee.FeatureCollection("users/jamesmfitton/Coastal_XRay/9_OS_Assessment/GB_XRAY_80_Line_All");
// Map.setCenter(-3.5, 55.5, 6);
Map.setCenter(-3.73799, 57.64586, 13);
var water = ee.FeatureCollection('users/tocimap/OSM/water_polygons')
var paletteYelBlu = ['#ffffd9', '#edf8b1', '#c7e9b4', '#7fcdbb', '#41b6c4', '#1d91c0', '#225ea8', '#253494', '#081d58', '#020f33'];
var collectionMosaic = ee.ImageCollection.fromImages(ee.List([humber,suffolkCloud,lowestoft, scarborough,clacton, iow, northeast, skegness, norfolk, southeast, thewash, bristol, northwales, mersey, london, southwales, lakes, iom, scotland, nwwales, west_wales, barry, sw_wales, supermare, old_grimsby, s_cornwall, ncornwall, exeter, weymouth, shetland])).mosaic()
var ndwiSum = collectionMosaic.select('ndwi_sum')
// print(collectionMosaic)
var xray = ndwiSum.updateMask(ndwiSum.gt(0))
var xrayForeshore = xray.clip(water).clip(foreshore)
var xrayBelowMLWMask = xrayForeshore.not().unmask(99)
xrayBelowMLWMask = xrayBelowMLWMask.updateMask(xrayBelowMLWMask.eq(99))
var xrayBelowMLW = xray.updateMask(xrayBelowMLWMask).clip(water)
// var xrayBelowMLW = xray.updateMask(xrayForeshore.not())
Map.addLayer(ndwiSum.updateMask(ndwiSum.gt(0)), {min: 0, max: 100, palette: paletteYelBlu}, 'Coastal X-Ray', false)
// Map.addLayer(xrayForeshore, {min: 0, max: 100, palette: paletteYelBlu}, 'Coastal X-Ray Foreshore', false)
// Map.addLayer(xrayBelowMLW, {min: 0, max: 100, palette: paletteYelBlu}, 'Coastal X-Ray Below MLW', false)
Map.addLayer(xrayBelowMLW.updateMask(xrayBelowMLW.lt(80)), {min: 0, max: 100, palette: paletteYelBlu}, 'Coastal X-Ray (Below MLW <80)', true)
Map.addLayer(line_80_all, {color: '2ca25f'}, 'XRay 80% contour', false)
Map.addLayer(line_80, {color: 'fde0dd'}, 'XRay 80% contour (outside of OS Foreshore)', false)
Map.addLayer(line_80_50, {color: 'c51b8a'}, 'XRay 80% contour (50 m buffer OS Foreshore)', true) 
Map.addLayer(foreshore, {color: 'fc4e2a'}, 'Foreshore (OS Local)', false)
Map.addLayer(MLW, {color: 'fd8d3c'}, 'MLW (OS Local)', false)
Map.addLayer(MHW, {color: 'bd0026'}, 'MHW (OS Local)', false) 
Map.addLayer(mlwPoints.filterMetadata('RASTERVALU', 'less_than', 70), {color: 'c51b8a'}, 'MLW with XRay Value <70', false) 
// Make UI components.
var label = ui.Label({
  value:'Click on the map for water occurence information',
  style: {
        margin: '1px 10px 5px 5px',
        fontSize: '14px',
        color: '#000000',
        padding: '8px',
        backgroundColor: '#11ffee00'
    }
});
var inspector = ui.Panel({
  widgets: [label],
  layout: ui.Panel.Layout.flow('horizontal')
});
function inspect(coords) {
  inspector.clear();
  inspector.add(ui.Label('Loading...', {color: 'gray'}));
  inspector.style().set('shown', true);
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var getNDWISum = ndwiSum.reduceRegion({
    reducer: ee.Reducer.first(), 
    geometry: point, 
    scale: 30,
  }).get('ndwi_sum');
   var NDWISum = ee.Number(getNDWISum).round()
  var getImageCount = collectionMosaic.reduceRegion({
    reducer: ee.Reducer.first(), 
    geometry: point, 
    scale: 30,
  }).get('collectionLength');
  var titleLabel = ui.Label({
    value: 'Water Occurence:',
    style: {
      fontWeight: 'bold',
      stretch: 'vertical',
    }
  });
  var elevationLabel = ui.Label(
    {
      value: NDWISum.getInfo()+'% (of '+getImageCount.getInfo()+ ' images)', 
      style: {
        fontSize: '14px',
        fontWeight: '50',
        color: '#000000',
        padding: '8px',
        backgroundColor: '#11ffee00',
        stretch: 'vertical'
    }
    })
    ;
  var closeButton = ui.Button({
    label: 'Close', 
    onClick: function() {
      inspector.clear();
      inspector.style().set('shown', false);
    }
  });
  inspector.clear();
  inspector.add(titleLabel);
  inspector.add(elevationLabel);
  inspector.add(closeButton);
}
// Set up the map.
Map.add(inspector);
Map.onClick(inspect);
Map.style().set('cursor', 'crosshair');
//Legend
// https://groups.google.com/forum/#!msg/google-earth-engine-developers/7pccA7oMHYU/ZIYDJZF9GQAJ
// ***Panel*** \\
// var viz = {min: 0, max: 100, palette: paletteYelBlu};
// // set position of panel
// var legend = ui.Panel({
//   layout: ui.Panel.Layout.flow('vertical'),
//   style: {
//     position: 'bottom-left',
//     padding: '30x 30px',
//     color: '000000'
//   }
// });
// // Create legend title
// var legendTitle = ui.Label({
//   value: 'Water Occurence (%)',
//   style: {
//     fontWeight: 'bold',
//     fontSize: '18px',
//     margin: '0 0 0 0',
//     padding: '0'
//     }
// });
// // Add the title to the panel
// legend.add(legendTitle); 
// // create the legend image
// var lon = ee.Image.pixelLonLat().select('latitude');
// var gradient = lon.multiply((viz.max-viz.min)/100.0).add(viz.min);
// var legendImage = gradient.visualize(viz);
// // create text on top of legend
// var panel = ui.Panel({
//     widgets: [
//       ui.Label(viz['max'])
//     ],
//   });
// legend.add(panel);
// // create thumbnail from the image
// var thumbnail = ui.Thumbnail({
//   image: legendImage,
//     params: {bbox:'0,0,10,100', dimensions:'20x200'},  
//     style: {padding: '1px', position: 'bottom-center'},
//   });
// // add the thumbnail to the legend
// legend.add(thumbnail);
// // create text on top of legend
// var panel = ui.Panel({
//     widgets: [
//       ui.Label(viz['min'])
//     ],
//   });
// legend.add(panel);
// Map.add(legend);
//Contours
// var min = 80
// var max = 80
// var step = 100
// var levels = ee.List([80])
// var contours = levels.map(function(level) {
//   var contour = xray
//     // .resample('bicubic')
//     // .convolve(ee.Kernel.gaussian(5, 3))
//     .focal_mean(3, 'square', 'pixels')
//     .subtract(ee.Image.constant(level)).zeroCrossing() // line contours
//     // .gt(ee.Image.constatn(level)) // area
//     .multiply(ee.Image.constant(level)).toFloat();
//   return contour.mask(contour);
// })
// contours = ee.ImageCollection(contours).mosaic()
// // Map.addLayer(ee.Image(1).toByte(), {palette:['000000'], opacity: 0.8}, 'background')
// Map.addLayer(contours, {min: min, max: max, palette:['00ff00', 'ff0000']}, 'XRay 80 Contour')
//Nav panel
// Create a panel to hold the chart.
var panel = ui.Panel();
panel.style().set({
  width: '200px',
  position: 'top-left'
});
Map.add(panel);
panel.add(ui.Label('Sites of Interest', {
  fontSize: '20px',
  fontWeight: '200',
}))
var places = {
  'Ardersier (Scotland)': [-4.01163, 57.60303, 14],
  'Ardnave (Scotland)': [-6.30586, 55.87721, 14],
  'Culbin Sands (Scotland)': [-3.73799, 57.64586, 13],
  'Morrich More (Scotland)': [-3.97042, 57.84372, 14],
  'Midfield (Scotland)': [-4.45187, 58.55082, 15],
  'Llanmadoc (Wales)': [-4.2704, 51.6311, 15],
  'Saundersfoot (Wales)': [-4.6821, 51.69737, 15],
  'Hornsea (England)': [-0.1547, 53.90499, 15],
  'North Cliffs (England)': [-5.31565, 50.25126, 15],
  'Sea Palling (England)': [1.60031, 52.79412, 14],
  'Wells-next-the-Sea (England)': [0.88767, 52.9821, 13]
};
var select = ui.Select({
  items: Object.keys(places),
  onChange: function(key) {
    Map.setCenter(places[key][0], places[key][1], places[key][2]);
  }
});
// Set a place holder.
select.setPlaceholder('Choose a location...');
panel.add(select);
Map.setOptions('HYBRID')
//MEASURE TOOL
var aoiSelect = null
var tools = Map.drawingTools();
tools.setLinked(false);
// tools.setShown(false)
var line = ui.Map.GeometryLayer({name:'Line', color: '#d41ed7'});
//toggle button taken from UI examples
var toggleButton = function(labels, func, tools) {
    var index = 0, l = labels.length;
    var button = ui.Button({
      label: labels[index],
      style: {
    position: 'bottom-center',
    border: '2px solid black',
    // padding: '0px',
    // fontSize: '14px',
    fontWeight: 'bold'
      }
    });
    var toggle = function() {
        var i = index;
        this.setLabel(labels[++index % l]);
        func(labels[i % l], i % l);
    }.bind(button);
    button.toggle = toggle;
    button.onClick(toggle);
    return button;
};
//BUTTON: draw //users/lks/ee-103:(D) Fancy controls/utils/widget
var measureButton = toggleButton(['Measure Distance', 'Cancel'], function(label) {
  if (label == 'Cancel') {
    line.geometries().reset();
    tools.stop();
    Map.remove(measurePanel)
  } else {
    line.geometries().reset();
    if(tools.layers().length() === 0){
      tools.layers().add(line);
    }
    tools.setSelected(line);
    tools.setShape('line');
    tools.draw();
    Map.add(measurePanel)
  }
});
//add the button to the map
Map.add(measureButton)
//Controls what happens when the user finishes drawing the line
tools.onDraw(function(geometry, layer) {
    // tools.stop();
    var length = geometry.length()
    if (length.getInfo() < 1e3){
       lengthLabel.setValue(length.format('%,.0f').getInfo() + ' m')
    } else if (length.getInfo() < 1e5) {
     lengthLabel.setValue(length.divide(1000).format('%,.2f').getInfo() + ' km')
    } else if (length.getInfo() < 1e6) {
     lengthLabel.setValue(length.divide(1000).format('%,.1f').getInfo() + ' km')
    } else {
     lengthLabel.setValue(length.divide(1000).format('%,.0f').getInfo() + ' km')
    }
    print(geometry.length())
    // Map.centerObject(geometry);
    // if (measureButton.getLabel() == 'Clear') {
    //     measureButton.toggle();
    // }
});
var lengthLabel = ui.Label({
    value: 'Draw a line to measure the distance',
    style: {
        // margin: '8px 10px 5px 5px',
        // fontSize: '14px',
        fontWeight: 'bold',
        // color: 'grey',
        padding:'0px'
    }
});
// Measure Panel
var measurePanel = ui.Panel({
    widgets:[
        lengthLabel
    ],
    style: {
    position: 'bottom-center',
    border: '2px solid black',
    padding: '6px'
    // shown: false
    // width: '340px'
    }
});
var tools = Map.drawingTools();
tools.setShown(false);