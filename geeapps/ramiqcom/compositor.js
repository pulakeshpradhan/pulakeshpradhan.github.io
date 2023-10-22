var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                109.92440843257603,
                -7.5372325421897655
              ],
              [
                109.92440843257603,
                -8.244577477190136
              ],
              [
                110.87609910640415,
                -8.244577477190136
              ],
              [
                110.87609910640415,
                -7.5372325421897655
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #d63000 */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[109.92440843257603, -7.5372325421897655],
          [109.92440843257603, -8.244577477190136],
          [110.87609910640415, -8.244577477190136],
          [110.87609910640415, -7.5372325421897655]]], null, false),
    s2 = ui.import && ui.import("s2", "imageCollection", {
      "id": "COPERNICUS/S2_SR_HARMONIZED"
    }) || ee.ImageCollection("COPERNICUS/S2_SR_HARMONIZED");
Map.centerObject(geometry, 10);
var mainPanel = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical', true),
  style: {width: '450px', padding: '20px'}
});
ui.root.add(mainPanel);
var titleLabel = ui.Label({
  value: 'Composite Creator',
  style: {fontWeight: 'bold', fontSize: '30px', color: 'red'}
});
mainPanel.add(titleLabel);
var startLabel = ui.Label({
  value: 'Start date'
});
mainPanel.add(startLabel);
var startDateText = ui.Textbox({
  value: '2022-01-01',
  placeholder: 'Start date'
});
mainPanel.add(startDateText);
var endLabel = ui.Label({
  value: 'End date'
});
mainPanel.add(endLabel);
var endDateText = ui.Textbox({
  value: '2022-12-31',
  placeholder: 'End date'
});
mainPanel.add(endDateText);
var cloudLabel = ui.Label({
  value: 'Cloud filter'
});
mainPanel.add(cloudLabel);
var cloudSlider = ui.Slider({
  value: 20,
  min: 0,
  max: 100,
  style: {width: '300px'}
});
mainPanel.add(cloudSlider);
// Band list
var bands = ['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8', 'B8A', 'B9', 'B11', 'B12'];
var bandPanel = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal', true)
});
mainPanel.add(bandPanel);
var redSelect = ui.Select({
  value: 'B4',
  items: bands
});
bandPanel.add(redSelect);
var greenSelect = ui.Select({
  value: 'B3',
  items: bands
});
bandPanel.add(greenSelect);
var blueSelect = ui.Select({
  value: 'B2',
  items: bands
});
bandPanel.add(blueSelect);
var stretchPanel = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal', true)
});
mainPanel.add(stretchPanel);
var redSlider = ui.Slider({
  value: 2000,
  min: 0,
  max: 10000,
});
stretchPanel.add(redSlider);
var greenSlider = ui.Slider({
  value: 2000,
  min: 0,
  max: 10000,
});
stretchPanel.add(greenSlider);
var blueSlider = ui.Slider({
  value: 2000,
  min: 0,
  max: 10000,
});
stretchPanel.add(blueSlider);
var compositeButton = ui.Button({
  label: 'Composite!',
  onClick: composite
});
mainPanel.add(compositeButton);
function composite(){
  Map.layers().reset();
  var start = startDateText.getValue();
  var end = endDateText.getValue();
  var cloud = cloudSlider.getValue();
  var aoi = geometry;
  var images = s2.filterBounds(aoi)
    .filterDate(start, end)
    .filter(ee.Filter.lte('CLOUDY_PIXEL_PERCENTAGE', cloud));
  var image = images.median().clip(aoi);
  var red = redSelect.getValue();
  var green = greenSelect.getValue();
  var blue = blueSelect.getValue();
  var redMax = redSlider.getValue();
  var greenMax = greenSlider.getValue();
  var blueMax = blueSlider.getValue();
  var vis = {bands: [red, green, blue], min: 0, max: [redMax, greenMax, blueMax]};
  Map.addLayer(image, vis);
}