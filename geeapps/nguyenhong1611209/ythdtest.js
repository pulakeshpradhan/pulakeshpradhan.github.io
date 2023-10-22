/**** Start of imports. If edited, may not auto-convert in the playground. ****/
var table = ee.FeatureCollection("users/nguyenhong1611209/hcm");
/***** End of imports. If edited, may not auto-convert in the playground. *****/
// Panels are the main container widgets
var mainPanel = ui.Panel({
  style: {width: '300px'}
});
var title = ui.Label({
  value: 'Ảnh viễn thám',
  style: {'fontSize': '24px'}
});
// You can add widgets to the panel
mainPanel.add(title)
// You can even add panels to other panelsd
var dropdownPanel = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal', true),
});
mainPanel.add(dropdownPanel);
var yearSelector = ui.Select({
  placeholder: 'please wait..',
  })
var monthSelector = ui.Select({
  placeholder: 'please wait..',
  })
var button = ui.Button('Load dữ liệu')
var clear = ui.Button('xóa layer')
// var download_button = ui.Button('Download_button')
var download_button = ui.Label({
  value:'Load dữ liệu để tải về',
  style:{border:'2px solid black', padding:'4px'}
  })
dropdownPanel.add(yearSelector)
dropdownPanel.add(monthSelector)
dropdownPanel.add(button)
dropdownPanel.add(clear)
dropdownPanel.add(download_button)
// Let's add a dropdown with the years
var years = ee.List.sequence(2021, 2022)
var months = ee.List.sequence(1, 12)
// Dropdown items need to be strings
var yearStrings = years.map(function(year){
  return ee.Number(year).format('%04d')
})
var monthStrings = months.map(function(month){
  return ee.Number(month).format('%02d')
})
// Evaluate the results and populate the dropdown
yearStrings.evaluate(function(yearList) {
  yearSelector.items().reset(yearList)
  yearSelector.setPlaceholder('Chọn năm')
})
monthStrings.evaluate(function(monthList) {
  monthSelector.items().reset(monthList)
  monthSelector.setPlaceholder('Chọn tháng')
})
function maskS2clouds(image) {
  var qa = image.select('QA60');
  // Bits 10 and 11 are clouds and cirrus, respectively.
  var cloudBitMask = 1 << 10;
  var cirrusBitMask = 1 << 11;
  // Both flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudBitMask).eq(0)
      .and(qa.bitwiseAnd(cirrusBitMask).eq(0));
  return image.updateMask(mask).divide(10000);
}
// Define a function that triggers when any value is changed
var loadComposite = function() {
  var col = ee.ImageCollection("COPERNICUS/S2");
  var year = yearSelector.getValue()
  var month = monthSelector.getValue()
  var startDate = ee.Date.fromYMD(
    ee.Number.parse(year), ee.Number.parse(month), 1)
  var endDate = startDate.advance(1, 'month')
  var filtered = col.filterDate(startDate,endDate)
                    .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',20))
                    .map(maskS2clouds);
  var geometry = table.geometry()
  var image = ee.Image(filtered.median().clip(geometry))
  var vis = {
    min: 0,
    max: 0.3,
    bands: ['B4','B3','B2'],
  };
  var name = startDate.format('yyyy-MM')
  var layerName = 'CanGio_S2_RGB_' + name.getInfo()
  Map.addLayer(image, vis, layerName)
  Map.centerObject(geometry,11)
  // return [image,cangio]
image.getDownloadURL({
  params:{name:layerName,
    bands:['B4', 'B3', 'B2'],
    region:geometry,
    scale:50,
    filePerBand:false
    }, 
  callback:function(URL) {
    download_button.setUrl(URL)
    download_button.style().set({backgroundColor:'#90EE90'})
    download_button.setValue(layerName)
  }
})
}
button.onClick(function(){loadComposite()})
clear.onClick(function(){Map.clear()})
ui.root.add(mainPanel);