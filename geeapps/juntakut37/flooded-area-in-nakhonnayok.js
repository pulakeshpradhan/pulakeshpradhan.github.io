// ##############################################################################
// Flooding Map in Thailand
// ##############################################################################
// Study area (aoi)
var pt = ee.Geometry.Point(101.015, 14.313); 
// Load Sentinel-1 C-band SAR Ground Range collection (log scaling, VV co-polar)
var collection = ee.ImageCollection('COPERNICUS/S1_GRD').filterBounds(pt)
.filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
.select('VV');
// Add dropdown for year
var thisYear = new Date();
// Check all images of last 3 year, Sentinel-1 images were scarce before 2017
var year = [];
for (var i = 0; i < 7; i ++){
  year.push((thisYear.getFullYear() - i).toString());
}
var selectMonth;
var selectMonthIdx;
var selectMonth2;
var selectMonth2Idx;
var mapLayersList = [];
// Add dropdown for date
var range = {
  'พฤษภาคม' : ['05-01', '05-31'],
  'มิถุนายน' : ['06-01', '06-30'],
  'กรกฏาคม' : ['07-01', '07-31'],
  'สิงหาคม' : ['08-01', '08-31'],
  'กันยายน' : ['09-01', '09-30'],
  'ตุลาคม' : ['10-01', '10-31']
};
// Select year dropdown
var thisMonth = thisYear.toLocaleString('default', { month: 'long' });
var thisMonthIdx = Object.keys(range).indexOf(thisMonth);
var selectYear = ui.Select({
  items: year,
  // value: year[0],
  placeholder: 'ปี (ที่เลือก)',
  style:{padding: '0px 0px 0px 10px', stretch: 'horizontal'},
  onChange: function(){
    // Remove future months from selectable month list
    if(selectYear.getValue() == thisYear.getFullYear()) {
      selectMonths1.items().reset(Object.keys(range).slice(0, thisMonthIdx-1));
      selectMonths2.items().reset(Object.keys(range).slice(1, thisMonthIdx));
    } 
    else if (selectMonths1.getValue() == selectMonths2.getValue()){
      selectMonths1.items().reset(Object.keys(range).slice(0, -1));
      selectMonths2.items().reset(Object.keys(range).slice(1));
    }
    else {
      selectMonths1.items().reset(Object.keys(range).slice(0, -1));
      selectMonths2.items().reset(Object.keys(range).slice(1));
      selectMonths1.setValue(Object.keys(range)[0]);
      selectMonths2.setValue(Object.keys(range)[selectMonthIdx+1]);
    } 
    // runButton.setDisabled(true);
  }
});
var selectMonths1 = ui.Select({
  items: Object.keys(range),
  // value: Object.keys(range)[0],
  placeholder: 'เดือน (เริ่มต้น)',
  style: {stretch: 'horizontal'},
  onChange: function(){
    selectMonth = selectMonths1.getValue();
    selectMonthIdx = Object.keys(range).indexOf(selectMonth);
    selectMonth2 = selectMonths2.getValue();
    selectMonth2Idx = Object.keys(range).indexOf(selectMonth2);
    // Remove future months ensuring month2 comes after month1
    if(selectYear.getValue() == thisYear.getFullYear()){
      selectMonths2.items().reset(Object.keys(range).slice(selectMonthIdx+1, thisMonthIdx));
      if (selectMonthIdx >= selectMonth2Idx){
        selectMonths2.items().reset(Object.keys(range).slice(selectMonthIdx+1, thisMonthIdx));
        selectMonths2.setValue(Object.keys(range)[selectMonthIdx+1]);
        selectMonths1.setValue(Object.keys(range)[0]);
      }
    } 
    else if (selectMonths1.getValue() == selectMonths2.getValue()){
      selectMonths1.items().reset(Object.keys(range).slice(0, -1));
      selectMonths2.items().reset(Object.keys(range).slice(1));
    } 
    else if (selectMonthIdx >= selectMonth2Idx){
      selectMonths2.items().reset(Object.keys(range).slice(selectMonthIdx+1));
      selectMonths2.setValue(Object.keys(range)[selectMonthIdx+1]);
    }
    else {
      selectMonths2.items().reset(Object.keys(range).slice(selectMonthIdx+1));
    }
  }
});
var selectMonths2 = ui.Select({
  items: Object.keys(range),
  // value: Object.keys(range)[thisMonthIdx-1],
  placeholder: 'เดือน (สิ้นสุด)',
  onChange: function(){
    if (selectMonths2.getValue() === null){
      runButton.setDisabled(true);
    }
    else if (selectMonths1.getValue() === null){
      runButton.setDisabled(true);
    }
    else if (selectYear.getValue() === null){
      runButton.setDisabled(true);
    }
    else {
      runButton.setDisabled(false);
    }
  },
  style:{padding: '0px 10px 0px 0px', stretch: 'horizontal'}
});
// Add button to process images
var runButton = ui.Button({
  label: 'บันทึกข้อมูลภาพถ่าย',
  onClick: function(){
    // Threshold smoothed radar intensities to identify "flooded" areas.
    var SMOOTHING_RADIUS = 100;
    var DIFF_UPPER_THRESHOLD = -3;
    var before = collection.filterDate(
      selectYear.getValue() + "-" + range[selectMonths1.getValue()][0], 
      selectYear.getValue() + "-" + range[selectMonths1.getValue()][1])
      .mosaic();
    var after = collection.filterDate(
      selectYear.getValue() + "-" + range[selectMonths2.getValue()][0], 
      selectYear.getValue() + "-" + range[selectMonths2.getValue()][1])
      .mosaic();
    var diffSmoothed = after.focal_median(SMOOTHING_RADIUS, 'circle', 'meters')
                            .subtract(before.focal_median(SMOOTHING_RADIUS, 'circle', 'meters'));
    var diffThresholded = diffSmoothed.lt(DIFF_UPPER_THRESHOLD); 
    var layerName = selectMonths1.getValue()+ "-" + selectMonths2.getValue() + ", " + selectYear.getValue()
    var layer = diffThresholded.updateMask(diffThresholded)
    // Dictionary for splitPanel
    mapLayersList.push({
      label: layerName,
      value: ee.ImageCollection(layer)
    })
    leftSelect.items().reset(mapLayersList)
    rightSelect.items().reset(mapLayersList)
    },
  disabled: true,
  style: {padding: '0px 10px', stretch: 'horizontal', color: 'blue'}
});
// Variables to set a label for maps
var layerLabelLeft = ui.Label('Select a start and end date');
    layerLabelLeft.style().set('position', 'bottom-left')
var layerLabelRight = ui.Label('Select a start and end date');
    layerLabelRight.style().set('position', 'bottom-right')
// Set a random color to each map on each onChange
var VizualizeFunc = function(item) {
  return item.visualize({palette : Math.floor(Math.random()*65280).toString(16)})
                                       .copyProperties(item, item.propertyNames());
};
// Select map for split panel
var leftSelect = ui.Select({
  items: mapLayersList,
  placeholder: 'ภาพแสดงทางซ้าย',
  onChange: function(){
    leftMap.layers().set(0, leftSelect.getValue().map(VizualizeFunc));
    // Take the selected item from the dropdown and show its name on the top
    var layerNameLeft = mapLayersList.filter(function (item) {return item.value == leftSelect.getValue()});
    layerLabelLeft.setValue(layerNameLeft[0]['label']);
  },
  style:{padding: '0px 0px 0px 10px', stretch: 'horizontal'}
});
var rightSelect = ui.Select({
  items: mapLayersList,
  placeholder: 'ภาพแสดงทางขวา',
  onChange: function(){
    rightMap.layers().set(0, rightSelect.getValue().map(VizualizeFunc));
    // Take the selected item from the dropdown and show its name on the top
    var layerNameRight = mapLayersList.filter(function (item) {return item.value == rightSelect.getValue()});
    layerLabelRight.setValue(layerNameRight[0]['label']);
  },
  style:{padding: '0px 10px 0px 00px', stretch: 'horizontal'}
});
// Create the left panel 
var panel = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
  style: {width: '400px'}
});
// Add the title
var mapTitle = ui.Label('พื้นที่น้ำท่วมขังในจังหวัดนครนายก (ช่วงฤดูฝน: พ.ค.-ต.ค.)');
mapTitle.style().set('color', 'blue');
mapTitle.style().set('fontWeight', 'bold');
mapTitle.style().set({
  fontSize: '20px',
  padding: '10px'
});
// Add description
var mapDesc = ui.Label("แสดงพื้นที่น้ำท่วมขังในจังหวัดนครนายก ระหว่างฤดูฝน (พ.ค.-ต.ค.) จากการวิเคราะห์ภาพถ่ายดาวเทียม Sentinel-1");
mapDesc.style().set({ fontSize: '16px', padding: '0px 10px'});
// Spilt map
var leftMap = ui.Map().setOptions({mapTypeId: "HYBRID"});
var rightMap = ui.Map().setOptions({mapTypeId: "HYBRID"});
var linkedMaps = ui.Map.Linker([leftMap, rightMap]);
leftMap.setControlVisibility({ layerList : false, zoomControl: false, mapTypeControl : true,fullscreenControl : false });
rightMap.setControlVisibility({ layerList : false, zoomControl: false, mapTypeControl : true, fullscreenControl : false });
leftMap.setCenter(101.015, 14.313, 8);
leftMap.style().set('cursor', 'hand');
rightMap.style().set('cursor', 'hand');
// Add layer name to each maps
leftMap.add(layerLabelLeft);
rightMap.add(layerLabelRight);
// Create a SplitPanel which holds the linked maps side-by-side.
var splitPanel = ui.SplitPanel({
  firstPanel: linkedMaps.get(0),
  secondPanel: linkedMaps.get(1),
  orientation: 'horizontal',
  wipe: true,
  style: {stretch: 'both'}
});
panel.add(mapTitle);
panel.add(mapDesc);
panel.add(ui.Panel([selectYear, selectMonths1, selectMonths2], ui.Panel.Layout.flow('horizontal')));
panel.add(runButton);
panel.add(ui.Panel([leftSelect, rightSelect], ui.Panel.Layout.flow('horizontal')));
ui.root.clear();
ui.root.insert(0, panel);
ui.root.insert(1, splitPanel);