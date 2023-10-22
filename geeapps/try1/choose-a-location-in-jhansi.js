var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            78.63091600694175,
            25.40588100683536
          ]
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
    ee.Geometry.Point([78.63091600694175, 25.40588100683536]);
var places = {
  Parichha:[78.77285424975119, 25.516289672832396],
    Moth:     [78.95013572994532, 25.73499980750151],
         Babina:[78.46304814675142, 25.247408081331887],
      Mauranipur:   [79.13510081639016, 25.244908873104777],
        Bamour: [79.16731234800412, 25.714998708030652],
         Gursaray:[79.18055876947578, 25.61765883515568],
         Chirgaon:[78.81258505231447, 25.572116592405514],
         Jhansi:[78.56471615402862, 25.45267306525552]
};
//Map.centerObject(geometry)
Map.setOptions("HYBRID")
//Map.addLayer(places)         
var Area = /* color: #d63000 */ee.Geometry.MultiPoint(
        [[78.77285424975119, 25.516289672832396],
         [78.95013572994532, 25.73499980750151],
         [78.46304814675142, 25.247408081331887],
         [79.13510081639016, 25.244908873104777],
         [79.16731234800412, 25.714998708030652],
         [79.18055876947578, 25.61765883515568],
         [78.81258505231447, 25.572116592405514],
         [78.56471615402862, 25.45267306525552]]);
         var palette = ['FF0000', '00FF00', '0000FF'];
//Map.addLayer(outlines, {palette: palette, max: 14}, 'different color edges');
//var palettes = require('users/gena/packages:palettes');
Map.addLayer(Area, {color: 'red'})
// var places = {
//   MTV: [-122.0849, 37.3887],
//   PEK: [116.4056, 39.9097],
//   ZRH: [8.536, 47.376]
// };
var select = ui.Select({
  items: Object.keys(places),
  onChange: function(key) {
    Map.setCenter(places[key][0], places[key][1]);
  }
});
// Set a place holder.
select.setPlaceholder('Choose a location...');
//
//print(select);
// Create a panel that contains both the slider and the label.
var panel = ui.Panel({
  widgets: [select],
  layout: ui.Panel.Layout.flow('vertical'),
  style: {
    position: 'top-center',
    padding: '7px'
  }
});
Map.add(panel);