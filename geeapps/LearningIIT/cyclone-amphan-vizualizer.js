//////////////////////////////////////////////////////////////////////////////////
// CODE: sentinel Forest Fire Visualization  //
// // 
// Recoded by: Sachchidanand Singh, Ph.D. IIT Roorkee  //
// 
// email: sachin.iirs@gmail.com //
// //
// INPUTS/ARGUMENTS: Just Select dates //
// //
// //
// LAST UPDATED: 2020-5-19 //
//////////////////////////////////////////////////////////////////////////////////
// Demonstrates before/after imagery comparison using sentinel 2 .
var images = 
{
  ' 14 May 2020 ': CycloneComposite('2020-05-14'),
  ' 15 May 2020 ': CycloneComposite('2020-05-15'),
  ' 16 May 2020 ': CycloneComposite('2020-05-16'),
  ' 17 May 2020 ': CycloneComposite('2020-05-17'),
  ' 18 May 2020 ': CycloneComposite('2020-05-18'),
  ' 19 May 2020 ': CycloneComposite('2020-05-19'),
  ' 20 May 2020 ': CycloneComposite('2020-05-20'),
  ' 21 May 2020' : CycloneComposite('2020-05-21'),
  ' 22 May 2020 ': CycloneComposite('2020-05-22'),
  ' 23 May 2020 ': CycloneComposite('2020-05-23'),
  ' 24 May 2020' : CycloneComposite('2020-05-24'),
};
// Composite the sentinel-5 ImageCollection for 30 days (inclusive) after the
// given date.
function CycloneComposite(date) {
   date = ee.Date(date);
  var sentinel1 = ee.ImageCollection('JAXA/GPM_L3/GSMaP/v6/operational').select('hourlyPrecipRate')
                      .filterDate(date, date.advance(1, 'Day')).max();
  return sentinel1.visualize({
  min:0,
  max:30,
 palette: ['blue', 'purple', 'cyan', 'green', 'yellow', 'red'],
  opacity:0.7
  });
}
var viz = {
 min:0,
  max:30,
    opacity:0.7,
 palette: ['blue', 'purple', 'cyan', 'green', 'yellow', 'red'],
};
// Create the left map, and have it display non flood layer .
var leftMap = ui.Map();
leftMap.add(createLegend())
leftMap.setControlVisibility(false);
var leftSelector = addLayerSelector(leftMap, 0, 'top-left');
// Create the right map, and have it display flood layer .
var rightMap = ui.Map();
rightMap.add(createLegend())
//rightMap.setControlVisibility(true);
var rightSelector = addLayerSelector(rightMap,3, 'top-right');
function addLayerSelector(mapToChange, defaultValue, position) {
  var label = ui.Label('Choose a Date ');
  // This function changes the given map to show the selected image.
  function updateMap(selection) {
    mapToChange.layers().set(1, ui.Map.Layer(images[selection]));
  }
  // Configure a selection dropdown to allow the user to choose between images,
  // and set the map to update when a user makes a selection.
  var select = ui.Select({items: Object.keys(images), onChange: updateMap});
  select.setValue(Object.keys(images)[defaultValue], true);
  var controlPanel = 
      ui.Panel({widgets: [label, select], style: {position: position}});
  mapToChange.add(controlPanel);
} 
function createLegend() {
    var legend = ui.Panel({
    style: {
      position: 'bottom-left',
      padding: '4px 8px'
    }
  })
  // Create legend title
  var legendTitle = ui.Label({
    value: 'Precipitation  ',
    style: {
      fontWeight: 'bold',
      fontSize: '12px',
      margin: '0 0 2px 0',
      padding: '0'
      }
  });
legend.add(legendTitle);
  // create text on top of legend
  var panel = ui.Panel({
      widgets: [
        ui.Label('High')
      ],
    });
  legend.add(panel);
  var lon = ee.Image.pixelLonLat().select('latitude');
  var gradient = lon.multiply((viz.max-viz.min)/100.0).add(viz.min);
  var legendImage = gradient.visualize(viz);
  var thumbnail = ui.Thumbnail({
    image: legendImage, 
    params: {bbox:'0,0,10,100', dimensions:'5x50'},  
    style: {padding: '0.25px', position: 'bottom-left'}
  });
  // add the thumbnail to the legend
  legend.add(thumbnail);
  // create text on top of legend
  panel = ui.Panel({
      widgets: [
        ui.Label('Low')
      ],
    });
  legend.add(panel);
  return legend
}
// Create a SplitPanel to hold the adjacent, linked maps.
var splitPanel = ui.SplitPanel({
  firstPanel: leftMap,
  secondPanel: rightMap,
  wipe: true,
  style: {stretch: 'both'}
});
// Set the SplitPanel as the only thing in the UI root.
ui.root.widgets().reset([splitPanel]);
var linker = ui.Map.Linker([leftMap, rightMap]);
leftMap.setCenter(89.2, 14.27,4);