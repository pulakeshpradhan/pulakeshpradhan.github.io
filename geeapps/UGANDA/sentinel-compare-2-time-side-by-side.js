var tinh = ee.FeatureCollection("users/lethiquynhhoa/vietnam/gadm36_VNM_1_Provinces")
//Type province name
var provineName = 'Quang Nam'
var aoi = tinh.filter(ee.Filter.eq('VARNAME_1',provineName)).geometry();
//Filter date and collection
var startDate_1 = '2016-06-01'
var endDate_1 = '2016-06-03'
var startDate_2 = '2019-05-17'
var endDate_2 = '2019-05-20'
//Collection
var S2 = ee.ImageCollection("COPERNICUS/S2") 
var collection_1 = S2.filterDate(startDate_1, endDate_1) //Gõ thời gian bạn muốn tìm kiếm ảnh
                .select('B4','B3','B2')  
                .filterBounds(aoi)
                .filterMetadata('CLOUDY_PIXEL_PERCENTAGE',"less_than",30)
                .mosaic().clip(aoi);
var collection_2 = S2.filterDate(startDate_2, endDate_2) //Gõ thời gian bạn muốn tìm kiếm ảnh//
                .select('B4','B3','B2')  
                .filterBounds(aoi)
                .filterMetadata('CLOUDY_PIXEL_PERCENTAGE',"less_than",30)
                .mosaic().clip(aoi);
// Collection array
var images = [collection_1,collection_2]
//Vizualize RGB color
var viz_s2 = {'bands': 'B4,B3,B2',min: 0,max: 2000};
var vis = [viz_s2,viz_s2];
//Add date to Map
var NAMES = [
  startDate_1,
  startDate_2
];
// Create a map for each visualization option.
var maps = [];
NAMES.forEach(function(name,index) {
  var map = ui.Map();
  map.add(ui.Label({value:name,style:{fontWeight:'bold' ,backgroundColor: '#bdbdbd' ,position:'top-left'}}));
  map.addLayer(images[index], vis[index], name);
  map.setControlVisibility(true);
  maps.push(map);
});
var linker = ui.Map.Linker(maps);
// Enable zooming on the top-left map.
maps[0].setControlVisibility({zoomControl: true});
// Show the scale (e.g. '500m') on the bottom-right map.
maps[1].setControlVisibility({scaleControl: true});
// Create a grid of maps.
var mapGrid = ui.Panel([
    ui.Panel([maps[0]], null, {stretch: 'both'}),
    ui.Panel([maps[1]], null, {stretch: 'both'})
  ],
  ui.Panel.Layout.Flow('horizontal'), {stretch: 'both'}
);
// Create a title.
var title = ui.Label('SENTINEL 2 IMAGES OF ' + provineName.toUpperCase(), {
  stretch: 'horizontal',
  textAlign: 'center',
  fontWeight: 'bold',
  fontSize: '24px',
  color: 'FF0000'
});
// Create a panel to hold our widgets.
var panel = ui.Panel();
panel.style().set('width', '300px');
// Add the maps and title to the ui.root.
ui.root.widgets().reset([title, mapGrid]);
ui.root.setLayout(ui.Panel.Layout.Flow('vertical'));
// Center the maps to Quang Son.
maps[0].centerObject(aoi,8)