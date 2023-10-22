var imageCollection = ui.import && ui.import("imageCollection", "imageCollection", {
      "id": "NASA/GPM_L3/IMERG_V06"
    }) || ee.ImageCollection("NASA/GPM_L3/IMERG_V06");
 //////////////////////////////////////////////////////////////////////////////////
// CODE: Cyclone Forest Fire Visualization  //
// // 
// Recoded by: Sachchidanand Singh, Ph.D. IIT Roorkee  //
// 
// email: sachin.iirs@gmail.com //
// // 
// INPUTS/ARGUMENTS: Just Select dates //
// //
// //
// LAST UPDATED: 2020-1-5 //
//////////////////////////////////////////////////////////////////////////////////
var viz = {
 min:0,
  max:30,
 palette: ['blue', 'purple', 'cyan', 'green', 'yellow', 'red'],
};
// Demonstrates before/after imagery comparison using Cyclone 8 .
// These images track the major flooding in Odhisha due to Fani cyclone in 2019
var images = {
  //'2020-03-14': CycloneComposite('2020-03-14'),
  ' 25 June 2020': CycloneComposite('2020-06-25'),
  ' 26 June 2020': CycloneComposite('2020-06-26'),
  ' 27 June 2020': CycloneComposite('2020-06-27'),
  ' 28 June 2020': CycloneComposite('2020-06-28'),
  ' 29 June 2020': CycloneComposite('2020-06-29'),
  ' 30 June 2020': CycloneComposite('2020-06-30'),
  ' 01 July 2020': CycloneComposite('2020-07-1'),
  ' 02 July 2020': CycloneComposite('2020-07-2'),
  ' 03 July 2020': CycloneComposite('2020-07-3'),
  ' 04 July 2020': CycloneComposite('2020-07-4'),
  ' 05 July 2020': CycloneComposite('2020-07-5'),
  ' 06 July 2020': CycloneComposite('2020-07-6'),
  ' 07 July 2020': CycloneComposite('2020-07-7'),
  ' 08 July 2020': CycloneComposite('2020-07-8'),
  ' 09 July 2020': CycloneComposite('2020-07-9'),
  ' 10 July 2020': CycloneComposite('2020-07-10'),
  ' 11 July 2020': CycloneComposite('2020-07-11'),
  ' 12 July 2020' : CycloneComposite('2020-07-12'),
};
function CycloneComposite(date) {
   date = ee.Date(date);
  //var polarization = 'VV';
  var Cyclone1 = ee.ImageCollection("NASA/GPM_L3/IMERG_V06").select('precipitationCal')
                      .filterDate(date, date.advance(1, 'Day')).max();
  return Cyclone1.visualize({
    opacity:0.5,
   min: 0,
  max: 30,
  palette: ['blue', 'purple', 'cyan', 'green', 'yellow', 'red']
});
}
// Create the left map, and have it display non flood layer .
var leftMap = ui.Map();
leftMap.add(createLegend())
// Add the panel to the map 
//leftMap.setControlVisibility(true);
var leftSelector = addLayerSelector(leftMap, 0, 'top-left');
//leftMap.drawingTools().setLinked(true);
// Create the right map, and have it display flood layer .
var rightMap = ui.Map();
//rightMap.setControlVisibility(true);
var rightSelector = addLayerSelector(rightMap, 2, 'top-right');
rightMap.drawingTools().setLinked(true);
function addLayerSelector(mapToChange, defaultValue, position) {
  var label = ui.Label('Select a Day ');
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
    value: 'Precipiation ',
    style: {
      fontWeight: 'bold',
      fontSize: '18px',
      margin: '0 0 1px 0',
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
    params: {bbox:'0,0,10,100', dimensions:'10x75'},  
    style: {padding: '01px', position: 'bottom-left'}
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
  panel = ui.Panel({
      widgets: [
        ui.Label('Developed By'),
        ui.Label('Sachchidanand Singh')
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
leftMap.setCenter(78.266, 23.467, 5);