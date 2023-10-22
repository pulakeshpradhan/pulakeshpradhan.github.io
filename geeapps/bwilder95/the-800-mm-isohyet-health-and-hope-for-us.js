// Map inspired from 'The 800-mm isohyet: Health and hope',
// a text from Dr. V.M. Ponce
// Code edited by B.A. Wilder (Feb 2021)
// load 126 years (1,512 months) of PRISM rainfall data
var data = ee.ImageCollection('OREGONSTATE/PRISM/AN81m')
                  .filter(ee.Filter.date('1895-01-01', '2020-12-31'));
var precipitation = data.select('ppt');
print(precipitation)
// sum image collection for the entire period,
// then divide by 126-years to get average annual rainfall
var P_annual = precipitation.sum().divide(126)
var precipitationVis = {
  min: 600,
  max: 1000,
  palette: ['FFFF66', '99FFFF','006600'],
};
Map.setCenter(-100.55, 37.71, 5);
Map.addLayer(P_annual, precipitationVis, 'Precipitation',true,0.8);
// load state outlines
var stateDataset = ee.FeatureCollection('TIGER/2016/States');
var image = ee.Image().float().paint(stateDataset, 'STATEFP');
var stateOutlines = ee.Image().float().paint({
  featureCollection: stateDataset,
  color: 'black',
  width: 3
});
Map.addLayer(stateOutlines, {}, 'state outlines');
///////////////////////////////////////////////////////////////////////////////
var GRAYMAP = [
{   // Dial down the map saturation.
stylers: [ { saturation: -100 } ]
},{ // Dial down the label darkness.
elementType: 'labels',
stylers: [ { lightness: 20 } ]
},{ // Simplify the road geometries.
featureType: 'road',
elementType: 'geometry',
stylers: [ { visibility: 'simplified' } ]
},{ // Turn off road labels.
featureType: 'road',
elementType: 'labels',
stylers: [ { visibility: 'off' } ]
},{ // Turn off all icons.
elementType: 'labels.icon',
stylers: [ { visibility: 'off' } ]
},{ // Turn off all POIs.
featureType: 'poi',
elementType: 'all',
stylers: [ { visibility: 'off' }]
}
];
Map.setOptions('Gray', {'Gray': GRAYMAP});
/////////////////////////////////////////////////////////////////////////////////////////////////
// set position of panel
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
// Create legend title
var legendTitle = ui.Label({
  value: 'The 800-mm isohyet: Health and hope (for U.S.)',
  style: {
    fontWeight: 'bold',
    fontSize: '24px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
// Add the title to the panel
legend.add(legendTitle);
// Creates and styles 1 row of the legend.
var makeRow = function(color, name) {
      // Create the label that is actually the colored box.
      var colorBox = ui.Label({
        style: {
          backgroundColor: '#' + color,
          // Use padding to give the box height and width.
          padding: '12px',
          margin: '0 0 12px 0'
        }
      });
      // Create the label filled with the description text.
      var description = ui.Label({
        value: name,
        style: {margin: '0 0 4px 6px',
                fontSize: '24px',
        },
      });
      // return the panel
      return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal')
      });
};
//  Palette with the colors
var palette =[ '006600', '99FFFF','FFFF66'];
// name of the legend
var names = ['> 1000-mm','600 to 1000-mm','< 600-mm'];
// Add color and and names
for (var i = 0; i < 3; i++) {
  legend.add(makeRow(palette[i], names[i]));
  }  
// add legend to map (alternatively you can also print the legend to the console)
Map.add(legend);