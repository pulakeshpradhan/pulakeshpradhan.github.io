var imageCollection = ui.import && ui.import("imageCollection", "imageCollection", {
      "id": "COPERNICUS/S5P/OFFL/L3_NO2"
    }) || ee.ImageCollection("COPERNICUS/S5P/OFFL/L3_NO2");
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
// LAST UPDATED: 2020-3-22 //
//////////////////////////////////////////////////////////////////////////////////
// Demonstrates before/after imagery comparison using sentinel 2 .
var images = 
{
  'January': sentinelComposite('2020-01-1'),
  // '2019-04-08': sentinelComposite('2019-04-08'),
  // '2019-04-15': sentinelComposite('2019-04-15'),
  // '2019-04-22': sentinelComposite('2019-04-22'),
  // '2019-04-29': sentinelComposite('2019-04-29'),
  'February': sentinelComposite('2019-02-01'),
  // '2019-05-12': sentinelComposite('2019-05-12'),
  // '2019-05-19': sentinelComposite('2019-05-19'),
  // '2019-05-26': sentinelComposite('2019-05-26'),      
  // '2019-06-03': sentinelComposite('2019-06-03'),
  // '2019-06-10': sentinelComposite('2019-06-10'),
  // '2019-06-17': sentinelComposite('2019-06-17'),
  // '2019-06-24': sentinelComposite('2019-06-24'),
  'March': sentinelComposite('2020-03-1'),
};
// Composite the sentinel-5 ImageCollection for 30 days (inclusive) after the
// given date.
function sentinelComposite(date) {
   date = ee.Date(date);
  var sentinel1 = ee.ImageCollection("COPERNICUS/S5P/OFFL/L3_NO2").select('tropospheric_NO2_column_number_density')
                      .filterDate(date, date.advance(1, 'month')).mean()
                      ;
  return sentinel1.visualize({
  min:0,
  max:0.0002,
 palette: ['black', 'blue', 'purple', 'cyan', 'green', 'yellow', 'red']
  });
}
var viz = {
 min:0,
  max:0.0002,
 palette: ['black', 'blue', 'purple', 'cyan', 'green', 'yellow', 'red'],
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
var rightSelector = addLayerSelector(rightMap,2, 'top-right');
function addLayerSelector(mapToChange, defaultValue, position) {
  var label = ui.Label('Choose a Month ');
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
      padding: '8px 15px'
    }
  })
  // Create legend title
  var legendTitle = ui.Label({
    value: 'Nitrogen oxides ',
    style: {
      fontWeight: 'bold',
      fontSize: '18px',
      margin: '0 0 4px 0',
      padding: '0'
      }
  });
   // Add the title to the panel
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
    params: {bbox:'0,0,10,100', dimensions:'10x50'},  
    style: {padding: '0.5px', position: 'bottom-left'}
  });
  // add the thumbnail to the legend
  legend.add(thumbnail);
  // create text on top of legend
  var panel = ui.Panel({
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
leftMap.setCenter(77.3015, 28.6154, 9);