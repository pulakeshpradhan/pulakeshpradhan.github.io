// var image = ee.Image('users/kkraoj/camp_fire_aerial_image').selfMask().add(ee.Image.constant([50,50,50])).cast({'b1':'byte','b2':'byte','b3':'byte'});
var image = ee.ImageCollection.fromImages([ee.Image('users/kkraoj/camp_fire_aerial_image').selfMask().add(ee.Image.constant([50,50,50])).cast({'b1':'byte','b2':'byte','b3':'byte'}),
                    ee.Image('users/kkraoj/damagedstructures/carr_clip_projected').select(['b1','b2','b3']).selfMask()
                    ]).mosaic(); //bigger survey
var segments = ee.FeatureCollection('users/kkraoj/damagedstructures/building_footprints_preds').merge(
                ee.FeatureCollection('users/kkraoj/damagedstructures/building_footprints_preds_carr'));
// print(image)                
var campCenter  = ee.Geometry.Point([-121.5985163049041,39.77012398613876])
var carrCenter = ee.Geometry.Point([-122.42109933994071,40.61237795991003])
//////////////////////////////////////////////////////////////////////////////carr 
// Define a spatial filter as geometries that intersect.
var spatialFilter = ee.Filter.intersects({
  leftField: '.geo',
  rightField: '.geo',
  maxError: 0.3
});
// Define a save all join.
var saveAllJoin = ee.Join.saveAll({
  matchesKey: 'matched',
});
//////////////////////////saved before to savee time
// //// Apply the join.
// var segments = saveAllJoin.apply(buildingsCarr, predsCarr, spatialFilter);
// var getDamage = function(feature){
//   var damage = ee.Feature(ee.List(ee.Feature(feature.get('matched'))).get(0)).get('damage')
//   // Return the state feature with a new property: power plant count.
//   return feature.set('damage', damage)
// };
// segments = segments.map(getDamage);
// var removeProperty = function(feat, property) {
//   var properties = feat.propertyNames()
//   var selectProperties = properties.filter(ee.Filter.neq('item', 'matched'))
//   return feat.select(selectProperties)
// }
// var segments = segments.map(function(feature){
//   return removeProperty(feature, 'matched')})
// // print(getDamage(segements.filt))
// // print(segments.filterMetadata('system:index','equals','00000000000000007967'));
// print(segments.first())
// //error in 00000000000000007967 feature id
// Export.table.toAsset({
//   collection: segments,
//   description:'Exportingbuildingsegment',
//   assetId: 'damagedstructures/building_footprints_preds_carr',
// });
// ////////////////////////////////////////////////////////////
// // Paint the interior of the polygons with different colors.
// var empty = ee.Image().byte()
// var fills_damageCarr = empty.paint({
//   featureCollection: segments.filterMetadata('damage','equals',1),
//   color: 'damage',
// });
// var fills_safeCarr = empty.paint({
//   featureCollection: segments.filterMetadata('damage','equals',0),
//   color: 'damage',
// });
///////////////////////////////////////////////////////paradise
var numdamaged = segments.filterMetadata('damage','equals',1).size().getInfo()
var numsafe = segments.filterMetadata('damage','equals',0).size().getInfo()
var numtotal = numsafe+numdamaged;
var pctsafe = ee.Number(numsafe/numtotal*100).round()
var pctdamaged = ee.Number(numdamaged/numtotal*100).round()
var loss = ee.Number(numdamaged*281654/1e6).round().getInfo()
// print(preds.filterMetadata('damage','equals',1).size().getInfo())
// print(segments.first())
////////////////////////mapping elements
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
var lmap = ui.Map();
var rmap = ui.Map();
// lmap.setOptions({'mapTypeId':'SATELLITE'});
// rmap.setOptions({'mapTypeId': 'SATELLITE'});
// lmap.addLayer(image,{min:60,max:240},'Aerial survey')
rmap.addLayer(image,{min:60,max:240},'Aerial Survey')
// Paint the interior of the polygons with different colors.
var empty = ee.Image().byte()
var fills_damage = empty.paint({
  featureCollection: segments.filterMetadata('damage','equals',1),
  color: 'damage',
});
var fills_safe = empty.paint({
  featureCollection: segments.filterMetadata('damage','equals',0),
  color: 'damage',
});
// 
// Export.image.toAsset({
//   image: fills_safe,
//   description: 'fills_safe',
//   assetId: 'damagedstructures/fills_safe_paradise',
//   scale: .3,
//   region: image.geometry().bounds(),
// });
// rmap.addLayer(image,{min:0,max:200},'Aerial survey')
// rmap.addLayer(fills_damage, {palette: ["#E01E5A"],min:0,max:1,opacity :0.7}, 'Damaged Buildings');
// rmap.addLayer(fills_safe, {palette: ["#2EB67D"],min:0,max:1,opacity :0.7}, 'Safe Buildings');
lmap.addLayer(image,{min:60,max:240},'Aerial Survey')
lmap.addLayer(fills_damage, {palette: ["#E01E5A"],min:0,max:1,opacity :0.7}, 'Damaged Buildings');
lmap.addLayer(fills_safe, {palette: ["#2EB67D"],min:0,max:1,opacity :0.7}, 'Safe Buildings');
///////////mapping misc.
lmap.setControlVisibility(
    {all: true, zoomControl: true, mapTypeControl: false});
// Center the map
// print(image.geometry())
var defaultLocation = {lon:campCenter.coordinates().get(0), 
    lat:campCenter.coordinates().get(1), 
    zoom:18};
// var defaultLocation = {lon:image.geometry().centroid().coordinates().get(0), 
//     lat:image.geometry().centroid().coordinates().get(1), 
//     zoom:18};
lmap.setCenter(defaultLocation.lon.getInfo(), defaultLocation.lat.getInfo(), defaultLocation.zoom);
var rmaplabel = ui.Panel({
  style:
      {position: 'top-right',fontSize: '16px', padding: '0'}
});
rmaplabel.add(ui.Label('Aerial Image'))
rmap.add(rmaplabel)
rmap.setControlVisibility(
    {all: true, zoomControl: true, mapTypeControl: false});
var lmaplabel = ui.Panel({
  style:
      {position: 'top-left',fontSize: '16px', padding: '0'}
});
lmaplabel.add(ui.Label('Damaged structures'))
lmap.add(lmaplabel)
// Create a SplitPanel to hold the adjacent, linked maps.
var splitPanel = ui.SplitPanel({
  firstPanel: lmap,
  secondPanel: rmap,
  wipe: true,
  style: {stretch: 'both'}
});
ui.root.widgets().reset([splitPanel]);
var linker = ui.Map.Linker([lmap, rmap]);
var logo = ee.Image('users/kkraoj/damagedstructures/dmlogo5').visualize({
    bands:  ['b1', 'b2', 'b3'],
    min: 0,
    max: 255
    });
var thumb = ui.Thumbnail({
    image: logo,
    params: {
        dimensions: '1800x450',
        format: 'png'
        },
    style: {height: '65px', width: '260px',padding :'0px 0px 0px 40px',position:'top-center'}
    });
var toolPanel = ui.Panel(thumb, 'flow', {width: '330px'});
// ui.root.widgets().add(toolPanel);
// var toolPanel = ui.Panel([table], 'flow', {width: '330px', padding: '0px'});
toolPanel.add(ui.Label(
    'DamageMap is an AI-based damaged structures identifier. Use it to visualize damage, download images and addresses of damaged structures, or analyse socio-economic impact of wildfires.',
    {fontSize: '13px',padding:'0px'})) 
// toolPanel.add(ui.Label(
    // 'Click to upload your own GeoTIFF survey ...', {},
    // 'https://drive.google.com/open?id=1AVxidy1vpga5378DubjaO1a9prqdKB7q'));
toolPanel.add(ui.Label(
    'Analyse damage after Camp, or Carr Fire, CA. Use top search bar to pan to any address in survey. Click "Crop Image" download cropped image.',
    {fontSize: '13px', fontWeight:'bold'}))  
ui.root.widgets().add(toolPanel);
var places = {
  'Zoom to Camp Fire': [-121.5985163049041,39.77012398613876],
  'Zoom to Carr Fire' : [-122.42109933994071,40.61237795991003]
    };
var select = ui.Select({
  items: Object.keys(places),
  onChange: function(key) {
    lmap.setCenter(places[key][0], places[key][1]);
  }
});
// Set a place holder.
select.setPlaceholder('Zoom to Camp Fire');
toolPanel.add(select)
var exportImage = function(){
  var center = rmap.getCenter()
  // print(center)
  var point = ee.FeatureCollection(center).map(function(feature){
    return feature.buffer(60).bounds() 
  });
  var empty = ee.Image().byte();
  // Paint all the polygon edges with the same number and width, display.
  var outline = empty.paint({
  featureCollection: point,
  color: "white",
  width: 10
  });
  var rsquare = ui.Map.Layer(outline, {palette: 'white'}, 'Crop Extent');
  var lsquare = ui.Map.Layer(outline, {palette: 'white'}, 'Crop Extent');
  lmap.layers().set(4,rsquare);
  rmap.layers().set(2,lsquare);
  // print(image)
  var url = ee.Image(image).getThumbURL({
    // scale:0.3,
    format: 'jpg',
    crs: 'EPSG:3857',
    region: ee.Feature(point.first()).geometry()
  })
  urlLabel.setUrl(url);
  urlLabel.style().set({shown: true});
}
var button = ui.Button("Crop Image",exportImage)
var urlLabel = ui.Label('Download cropped image', {shown: false});
var panel = ui.Panel([button, urlLabel], ui.Panel.Layout.Flow('horizontal'));
toolPanel.add(panel);
toolPanel.add(ui.Label(
    'Download damage report (.csv)', {},
    'https://docs.google.com/spreadsheets/d/1zSmY1tu3dAhgjteocPK3ogYXM1-ORZA167ZYGKCgErk/edit?usp=sharing'));
var opacitySlider = ui.Slider({
  min: 0,
  max: 1,
  value: 0.8,
  step: 0.01,
});
opacitySlider.onSlide(function(value) {
  lmap.layers().get(1).setOpacity(value);
  lmap.layers().get(2).setOpacity(value);
  });
var text = ui.Label(
    'Buildings Opacity',  
    {fontSize: '14px'});
var viewPanel =
    ui.Panel([text, opacitySlider], ui.Panel.Layout.Flow('horizontal'));
// toolPanel.add(viewPanel)
/////////////////////////////
var legendPanel = ui.Panel({
  style:
      {position: 'bottom-left',fontWeight: 'bold', fontSize: '16px', margin: '0 0 0 8px', padding: '10'}
});
lmap.add(legendPanel);
var legendTitle = ui.Label(
    'Legend',
    {fontWeight: 'bold', fontSize: '16px', margin: '0 0 4px 0', padding: '10'});
legendPanel.add(legendTitle);
// Define an area for the legend key itself.
// This area will be replaced every time the layer pulldown is changed.
var keyPanel = ui.Panel();
legendPanel.add(keyPanel);
function setLegend(legend) {
  // Loop through all the items in a layer's key property,
  // creates the item, and adds it to the key panel.
  keyPanel.clear();
  if (Array.isArray(legend)) {
      for (var i = 0; i < legend.length; i++) {
        var item = legend[i];
        var name = Object.keys(item)[0];
        var color = item[name];
        var colorBox = ui.Label('', {
          backgroundColor: color,
          // Use padding to give the box height and width.
          padding: '8px',
          margin: '0'
        });
        // Create the label with the description text.
        var description = ui.Label(name, {margin: '0 0 4px 6px'});
        keyPanel.add(
            ui.Panel([colorBox, description], ui.Panel.Layout.Flow('horizontal')));
        }
    } else {
      keyPanel.add(colorbar_thumbnail, ui.Panel.Layout.Flow('horizontal'));
        // print(colorbar_thumbnail)
    }
}
var red =  "#E01E5A"
var green = "#2EB67D"
setLegend([{'Damaged':red}, {'Safe': green}])
/////////////////////////////////////////////
// toolPanel.add(ui.Label(
//     '________________________________________________'));
toolPanel.add(ui.Label('-------------------------------------------------------------------------------\nNo. of damaged buildings in survey= ' + numberWithCommas(numdamaged)+ ' ('+pctdamaged.getInfo()+'%)',{whiteSpace:'pre'}));
// toolPanel.add(ui.Label('No. of safe buildings in survey = ' + numberWithCommas(numsafe) + ' ('+pctsafe.getInfo()+'%)'));
toolPanel.add(ui.Label('Estimated loss* = $'+ numberWithCommas(loss) + ' m'));
toolPanel.add(ui.Label('*Calc. using median pre-fire property values. Other losses ignored.\n---------------------------------------------------------------------------------------------------------------',{whiteSpace:'pre',fontSize: '10px'}));
var point = ee.FeatureCollection(ee.Geometry.Point(defaultLocation.lon.getInfo(), defaultLocation.lat.getInfo()));
var rdot = ui.Map.Layer(point.draw({color: '00cdcd', strokeWidth: 8, pointRadius:4}),{},'Crop Center');
var ldot = ui.Map.Layer(point.draw({color: '00cdcd', strokeWidth: 8, pointRadius:4}),{},'Crop Center');
  // Add the dot as the second layer, so it shows up on top of the composite.
  // rmap.addLayer(fills_safe, {palette: ["#2EB67D"],min:0,max:1,opacity :0.7}, 'Safe Buildings');
// rmap.addLayer(point.draw({color: '00cdcd', strokeWidth: 8, pointRadius:4}),{},'clicked location');
// lmap.layers().set(1, ldot);
// rmap.layers().set(3, rdot);
lmap.onChangeCenter(function(center){
  // print(value.lon)
  // print(value.lat)
  point = ee.FeatureCollection(ee.Geometry.Point(center.lon, center.lat));
  // print(point)
  var rdot = ui.Map.Layer(point.draw({color: '00cdcd', strokeWidth: 8, pointRadius:4}),{},'Crop Center');
  var ldot = ui.Map.Layer(point.draw({color: '00cdcd', strokeWidth: 8, pointRadius:4}),{},'Crop Center');
  lmap.layers().set(3, ldot);
  rmap.layers().set(1, rdot);
})
toolPanel.add(ui.Label('Damaged house owners % (Camp Fire only):',{whiteSpace:'pre',color:"#C06C84"}))
var dataTable = [['Type', 'Below poverty line',{ role: 'annotation' }, 'Above poverty line',{ role: 'annotation' }],
                  ['', .40, 'Below poverty line', .60, 'Above poverty line']]
  // Define a dictionary of customization options.
  var options = {
    // title: 'Risk Attribution',
    legend: {position: 'none'},
    padding:'0px',
    hAxis: {
      minValue:0,
      maxValue:1
    },
    // title: '% of damaged houses',
    height:'45px',
    isStacked: 'percent',
    colors:["#C06C84","#F8B195"]
  };
// Make a BarChart from the table and the options.
var chart = new ui.Chart(dataTable, 'BarChart', options);
toolPanel.add(chart)
var dataTable = [
                  ['Type', '<65 Years', { role: 'annotation' },'>65 Years',{ role: 'annotation' }], 
                  ['', .74,'<65 Years', .26,'>65 Years']
                ];
  // Define a dictionary of customization options.
  var options = {
    // title: 'Risk Attribution',
    legend: {position: 'none'},
    padding:'0px',
    hAxis: {
      minValue:0,
      maxValue:1
    },
    // title: '% of damaged houses',
    height:'45px',
    isStacked:'percent',
    colors :["#F8B195","#C06C84"]
  };
// Make a BarChart from the table and the options.
var chart = new ui.Chart(dataTable, 'BarChart', options);
toolPanel.add(chart)
toolPanel.add(ui.Label(
    'See Galanis et al., 2021 for algorithm', {fontSize: '13px',padding:'0px'},
    'https://github.com/MariosGalanis/DamageMap'));