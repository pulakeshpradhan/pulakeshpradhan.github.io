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
var im_collection =[collection_1,collection_2];
var rgb_vis = {min:0, max:2000, bands:['B4','B3','B2']};
//  Split Panel and Selection
// Image Input
var split_images = {
  'Sentinel 2016': collection_1
  .visualize(rgb_vis),
  'Sentinel 2019': collection_2
  .visualize(rgb_vis)
};
// Map creation
var leftMap = ui.Map();
var leftSelector = addLayerSelector(leftMap, 0, 'top-left');
var rightMap = ui.Map();
var rightSelector = addLayerSelector(rightMap, 1, 'top-right');
function addLayerSelector(mapToChange, defaultValue, position){
  var label = ui.Label('Choose image');
  function updateMap(selection){
    mapToChange.layers().set(0, ui.Map.Layer(split_images[selection]));
  }
  var select = ui.Select({items: Object.keys(split_images), onChange: updateMap});
  select.setValue(Object.keys(split_images)[defaultValue],true);
  var controlPanel =
    ui.Panel({widgets: [label, select], style: {position: position}});
  mapToChange.add(controlPanel);
}
leftMap.setControlVisibility({zoomControl:true});
//Link Maps
var linker = new ui.Map.Linker([leftMap, rightMap]);
// Create Split Panel
var splitPanel = ui.SplitPanel({
  firstPanel: leftMap,
  secondPanel: rightMap,
  orientation: 'horizontal',
  wipe: true
});
ui.root.widgets().reset([splitPanel]);
leftMap.centerObject(aoi,10);
//
// // Create a title.
// var title = ui.Label('SENTINEL 2 IMAGES ' + provineName.toUpperCase(), {
//   stretch: 'horizontal',
//   textAlign: 'center',
//   fontWeight: 'bold',
//   fontSize: '24px',
//   color: 'FF0000'
// });
// // Create a panel to hold our widgets.
// var panel = ui.Panel();
// panel.style().set('width', '300px');
// // Add the maps and title to the ui.root.
// ui.root.widgets().reset([title,splitPanel]);
// ui.root.setLayout(ui.Panel.Layout.Flow('vertical'));
//Panel
var panel = ui.Panel();
var hide_panel = {
  position: 'bottom-left',
  width: '1px',
  height: '1px'
};
var show_panel = {
  position: 'bottom-left',
  width: '',
  height: ''
};
// Add the maps and title to the ui.root.
panel.style().set(hide_panel);
leftMap.add(panel);