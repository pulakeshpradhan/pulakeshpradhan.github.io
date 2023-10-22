var roi = ui.import && ui.import("roi", "geometry", {
      "geometries": [],
      "displayProperties": [],
      "properties": {},
      "color": "#18d61a",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #18d61a */ee.Geometry.MultiPoint();
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
//var id= IMG.select('B[1-9][1-2]').bandValues();
//var my=IMG.select('B.*|QA.*').bandNames();
//var bu_name = ui.Label();
//panel.add(ui.Panel([bu_name], ui.Panel.Layout.flow('vertical')));   
//print('Match "B" followed by a character in the range 1-9 and then 1-2',
      //IMG.select('B[1-9][1-2]').bandNames())  ;
//var bandNames = IMG.bandNames();
//print('Band names:', bandNames);  // ee.List of band names
//var properties = IMG.propertyNames();
//print('Metadata properties:', properties);  // ee.List of metadata properties
//print('B1:',IMG.select('B1'));
var meanDictionary = IMG.reduceRegion({
  reducer: ee.Reducer.mean(),
  geometry:IMG.geometry(),
  scale: 30,
  maxPixels: 1e9
});
print(meanDictionary);
//print(meanDictionary.keys(), meanDictionary.values());
//labels for output
var T_ine=ui.Label()
T_ine.style().set({shown:true});
T_ine.setValue('OUTPUT');
mainPanel.add(T_ine);
var cine=ui.Label();
cine.setValue('Loading Values...');
cine.style().set({shown:true});
mainPanel.add(cine);
//label to add values to main panel
var mine = ui.Label();
//mine.style().set({shown:true})
//mainPanel.add(mine);
mine.setValue('BANDS: '+JSON.stringify(meanDictionary.getInfo()))
//mine.style().set({stretch:'vertical'})
//print(mine);
mainPanel.add(mine);
var Ndwi = ee.Number.expression('(B3-B8)/(B3+B8)',meanDictionary);
var val=ui.Label();
val.setValue('NDWI: '+JSON.stringify(Ndwi.getInfo()));
//print('NDWI',Ndwi);
//print(IMG_water.toFloat());
//print(val);
mainPanel.add(val);
//other parameters
var Ndci = ee.Number.expression('(B5-B4)/(B5+B4)',meanDictionary);
//var TSS = ee.Number.expression('0.012-0.00003873*(B5)',meanDictionary);
//var TDS= ee.Number.expression('97.863 + 0.376 * ( B8/TCI_B + B8 )',meanDictionary);
//var EC= ee.Number.expression('195.73 + 0.753 * ( B8/TCI_B + B8 )',meanDictionary);
//print('Ndci',Ndci,'TSS',TSS,'TDS',TDS,'EC',EC);
//ndci into mainPanel
var my_val=ui.Label();
my_val.setValue('NDCI: '+JSON.stringify(Ndci.getInfo()));
mainPanel.add(my_val);
 //ui.Checkbox.setLabel(meanDictionary);
//bu_name.setValue(['Values:', meanDictionary]);
//panel.add(ui.Panel([bu_name], ui.Panel.Layout.flow('vertical')));
//print(ee.Feature(meanDictionary.first()).select(IMG.bandNames()));
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
var mine=ui.Label();
var T_ine = ui.Label();
//T_ine.style().set({shown:false});
var mainPanel = ui.Panel({
style: {width: '400px'}
});
var title = ui.Label({
  value: 'Aqua Predict Web view',
  style: {'fontSize': '24px'},
});
// You can add widgets to the panel
mainPanel.add(title)
// You can even add panels to other panels
var dropdownPanel = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
});
mainPanel.add(dropdownPanel); 
mainPanel.add(Main_button)
var authorLabel = ui.Label('App by: TEAM SHOONYA ');
mainPanel.add(authorLabel);
//mainPanel.add(mine);
//mainPanel.update(mine);
//mainPanel.add(mine);