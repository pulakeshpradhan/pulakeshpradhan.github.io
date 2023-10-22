var roi = ui.import && ui.import("roi", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                81.4339622570272,
                27.25622404558744
              ],
              [
                81.4339622570272,
                27.244778354185396
              ],
              [
                81.4471801830526,
                27.244778354185396
              ],
              [
                81.4471801830526,
                27.25622404558744
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        },
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                76.51990949496783,
                30.99872470949796
              ],
              [
                76.51990949496783,
                30.988865519294023
              ],
              [
                76.53364240512408,
                30.988865519294023
              ],
              [
                76.53364240512408,
                30.99872470949796
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#18d61a",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #18d61a */ee.Geometry.MultiPolygon(
        [[[[81.4339622570272, 27.25622404558744],
           [81.4339622570272, 27.244778354185396],
           [81.4471801830526, 27.244778354185396],
           [81.4471801830526, 27.25622404558744]]],
         [[[76.51990949496783, 30.99872470949796],
           [76.51990949496783, 30.988865519294023],
           [76.53364240512408, 30.988865519294023],
           [76.53364240512408, 30.99872470949796]]]], null, false);
//ui.root.clear();
/*var roi = ee.Geometry.Polygon(
        [[[105.72, 21.12],
          [105.72, 20.93],
          [105.93, 20.93],
          [105.93, 21.12]]]);*/
//function to run and analyse the code using anaylse button
var Main_button = ui.Button({
  label: 'Analyse',
  onClick: function() {
var IMG = ee.ImageCollection("COPERNICUS/S2_SR")
            .filterBounds(roi)
            .sort('CLOUDY_PIXEL_PERCENTAGE',true)
            .first()
            .clip(roi);
print(IMG)
/*Geometry dissolve  
var geometryDissolve = roi.dissolve({'maxError': 0.001});
Map.addLayer(geometryDissolve,
             {'color': 'white'},
             'Result [white]: geometry.dissolve');  */
var IMG_water = ndwi_f(IMG)
var IMG_NDCI = ndci_f(IMG_water)
// print(IMG.get('CLOUDY_PIXEL_PERCENTAGE'))
var viz = {min:0.1,max:0.4,palette:['cyan','orange','red']}
Map.addLayer(IMG,{bands:['B4','B3','B2'],min:0,max:3500},'IMG')
Map.addLayer(IMG_water.select('NDWI'),{palette:['cyan']},"IMG_water")
Map.addLayer(IMG_NDCI.select('NDCI'),viz,"IMG_NDCI")
//IMG=IMG.setroi(null);
function ndwi_f(img){
  //water mask
  var ndwi = img.normalizedDifference(['B3', 'B8']).rename('NDWI');
  return img.addBands(ndwi)
  .updateMask(ndwi.gt(0))
}
function ndci_f(img){
  //water mask
  var ndci = img.normalizedDifference(['B5', 'B4']).rename('NDCI');
  return img.addBands(ndci)
}
//
/////////////Legend///////////////
// set position of panel
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
// Create legend title
var legendTitle = ui.Label({
  // value: 'chl-a \n (mg/m3)',
  value: 'water quality',
  style: {
    fontWeight: 'bold',
    fontSize: '16px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
 // Add the title to the panel
legend.add(legendTitle); 
// create the legend image
var lon = ee.Image.pixelLonLat().select('latitude');
var gradient = lon.multiply((viz.max-viz.min)/100.0).add(viz.min);
var legendImage = gradient.visualize(viz);
// create text on top of legend
var panel = ui.Panel({
    widgets: [
      ui.Label('polluted')
    ],
  });
legend.add(panel);
// create thumbnail from the image
var thumbnail = ui.Thumbnail({
  image: legendImage, 
  params: {bbox:'0,0,10,100', dimensions:'10x200'},  
  style: {padding: '1px', position: 'bottom-center'}
});
// add the thumbnail to the legend
legend.add(thumbnail);
// create text on top of legend
var panel = ui.Panel({
    widgets: [
      ui.Label('normal')
    ],
  });
legend.add(panel);
Map.add(legend);
/////////Test //////
// Create the title label.
/*var title = ui.Label('Click to inspect');
title.style().set('position', 'top-center');
Map.add(title);
// Create a panel to hold the chart.
var panel = ui.Panel();
panel.style().set({
  width: '300px',
  height: '600px',
  position: 'bottom-right'
});
Map.add(panel);*/
//Main change
// Create a panel, initially hidden.
/*var panel_out = ui.Panel({
  style: { width: '300px', shown: false, position:'bottom-right'
  },
 widgets: [
    ui.Label('OUTPUT VIEWER'),
    ui.Label('Click on the map to collapse the settings panel.')
    ]
});*/
//var id= IMG.select('B[1-9][1-2]').bandValues();
//var my=IMG.select('B.*|QA.*').bandNames();
//var bu_name = ui.Label();
//panel.add(ui.Panel([bu_name], ui.Panel.Layout.flow('vertical')));   
//print('Match "B" followed by a character in the range 1-9 and then 1-2',
      //IMG.select('B[1-9][1-2]').bandNames())  ;
var bandNames = IMG.bandNames();
//print('Band names:', bandNames);  // ee.List of band names
var properties = IMG.propertyNames();
//print('Metadata properties:', properties);  // ee.List of metadata properties
//print('B1:',IMG.select('B1'));
var meanDictionary = IMG.reduceRegion({
  reducer: ee.Reducer.mean(),
  geometry:IMG.geometry(),
  scale: 30,
  maxPixels: 1e9
});
print(meanDictionary);
//label to add values to main panel
var mine = ui.Label();
mine.setValue('BANDS: '+JSON.stringify(meanDictionary.getInfo()))
mainPanel.add(mine);
 //ui.Checkbox.setLabel(meanDictionary);
//bu_name.setValue(['Values:', meanDictionary]);
//panel.add(ui.Panel([bu_name], ui.Panel.Layout.flow('vertical')));
//print(ee.Feature(meanDictionary.first()).select(IMG.bandNames()));
//button to close panel
//var close_button = ui.Button('Close setting')
// close_button.style().set('position','bottom-center');
// Create a button to unhide the panel.
/* var button = ui.Button({
  label: 'Open settings',
  onClick: function(){
    // Hide the button.
    button.style().set('shown',false);
    // Display the panel.
   //panel_out.style().set('shown', true);
    mainPanel.style().set('shown',true);
    // Temporarily make a map click hide the panel
    // and show the button.
   /* var listenerId = Map.onClick(function() {
      panel_out.style().set('shown', false);
      button.style().set('shown', true);
      // Once the panel is hidden, the map should not
      // try to close it by listening for clicks.
      Map.unlisten(listenerId);
    });*/
   /* //close button function
      var closeId = close_button.onClick(function() {
      mainPanel.style().set('shown', false);
      button.style().set('shown', true);
      // Once the panel is hidden, the map should not
      // try to close it by listening for clicks.
      Map.unlisten(closeId);
    });
  }
});*/
// button.style().set('position','bottom-center');
// Add the button to the map and the panel to root.
//Map.add(button);
//Map.add(close_button);
//ui.root.insert(0, panel_out);
//Map.roi.clear();
}
});
//button to close panel
var close_button = ui.Button('Close setting')
 close_button.style().set('position','bottom-center');
// Create a button to unhide the panel.
var button = ui.Button({
  label: 'Open settings',
  onClick: function(){
    // Hide the button.
    button.style().set('shown',true);
    // Display the panel.
   //panel_out.style().set('shown', true);
    mainPanel.style().set('shown',true);
    //ui.root.add(mainPanel);
     ui.root.insert(1, mainPanel);
    //close button function
      var closeId = close_button.onClick(function() {
      mainPanel.style().set('shown', false);
      button.style().set('shown', true);
      // Once the panel is hidden, the map should not
      // try to close it by listening for clicks.
      Map.unlisten(closeId);
    });
  }
})
button.style().set('position','bottom-center');
// Add the button to the map and the panel to root.
Map.add(button);
Map.add(close_button);
//label to add values to main panel
var mine = ui.Label();
mine.setValue('Loading value...');
//panel for content
var content = ui.Panel();
content.style().set({
  width: '200px',
  //position: 'bottom-right'
  shown:false
});
//content panel title
var Contenttitle = ui.Label('Output View....');
content.add(Contenttitle);
// Panels are the main container widgets
var mainPanel = ui.Panel({
style: {width: '450px'}
});
var title = ui.Label({
  value: 'Aqua Predict Web view',
  style: {'fontSize': '24px'},
});
// You can add widgets to the panel
mainPanel.add(title)
// You can even add panels to other panels
var dropdownPanel = ui.Panel({
  layout: ui.Panel.Layout.flow('horizontal'),
});
mainPanel.add(dropdownPanel); 
mainPanel.add(Main_button)
var authorLabel = ui.Label('App by: TEAM SHOONYA ');
mainPanel.add(authorLabel);
mainPanel.add(mine);
//mainPanel.update(mine);
//mainPanel.add(mine);