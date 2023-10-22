// Definable varaibles:
// var e=1,f=2,g=3,h=4,i=5;
// var imageVisParam2 = {"opacity":1,
//                       "bands":["LST_Day_1km"],
//                       "min":7500,"max":65535,
//                       "palette":["56ff10","040cff","60f8ff","2bff1d","fff818"]};
// var Strt_date= ee.Date('2015-03-20'); 
// var End_date = ee.Date('2020-03-19');
// var ScaleForCharts=250;
var ROI=ee.FeatureCollection("users/soleimanisaeed/AnneNg/SydneyDiss");
Map.centerObject(ROI, 8.2);
Map.style().set('cursor', 'crosshair');
// Create an empty panel in which to arrange widgets.                 // The layout is vertical flow by default.
var panel = ui.Panel({
                      style: {
                        width: '400px',
                        position: 'top-right',
                        // shown: true
                              },
                    widgets: [
    ui.Label('Click on the map to collapse the settings panel.')
  ]
                      })
    // .add(ui.Label('Please Choose the Case Study Area:'));
// Create a button to unhide the panel.
var button = ui.Button({
  label: 'Please Choose the Case Study Area:',
  onClick: function() {
    // Hide the button.
    button.style().set('shown', false);
    // Display the panel.
    panel.style().set('shown', true);
    // Temporarily make a map click hide the panel
    // and show the button.
    var listenerId = Map.onClick(function() {
      panel.style().set('shown', false);
      button.style().set('shown', true);
      // Once the panel is hidden, the map should not
      // try to close it by listening for clicks.
      Map.unlisten(listenerId);
    });
  }
});
// Add the button to the map and the panel to root.
Map.add(button);
ui.root.insert(0, panel);    
// Add the panel to the ui.root.
// ui.root.setLayout(ui.Panel.Layout.absolute());
// ui.root.add(panel);
    // Map.add(panel);
// Load some images.
var SydneyShp ={shp: ee.FeatureCollection("users/soleimanisaeed/AnneNg/SydneyDiss"),
                name: "Sydney"};
var DarwinShp ={shp: ee.FeatureCollection("users/soleimanisaeed/AnneNg/CityofDarwin"),
                name: 'Darwin'};
Map.addLayer(SydneyShp.shp)
/*
// Make a drop-down menu of bands.
var CaseSelect = ui.Select({
  items: [
          {label: 'Darwin', value: DarwinShp},
          {label: 'Sydney', value: SydneyShp}
          ],
  onChange: function(value) {
    var ROI=value.shp;
    var ROI_Name=value.name+" - Study Area's Boundary";
    Map.centerObject(value.shp, 10.2);
    Map.addLayer(value.shp, {color: '009F00'},   //visParams
                          ROI_Name,           //name
                          true,               //shown, 
                          0.5                 //opacity
                );
var LST_imgCln = ee.ImageCollection("MODIS/006/MOD11A1")
                .select('LST_Day_1km')
                .filterDate(Strt_date,End_date)
                .filterBounds(ROI)
                .map(function(img){
                      return img.clip(ROI);
                              });
   var LST_median=LST_imgCln.median();
// print(LST_median);
    Map.addLayer(LST_median,imageVisParam2,'LST median - '+value.name);
var chart1 = ui.Chart.image.series({
  imageCollection:LST_imgCln,
  region: ROI,
  reducer:ee.Reducer.mean(),
  scale:ScaleForCharts,
  // xProperty
  }).setOptions({
                 title:chart1title + value.name,
                 hAxis: {title: 'Time'},
                 vAxis: {title: 'mean LST'},
                });
  panel.widgets().set(f, chart1);
Map.onClick(function(coords) {
  // Create or update the location label (the second widget in the panel)
  var location = 'longitude: ' + coords.lon.toFixed(2) + ' ' +
                 'latitude: ' + coords.lat.toFixed(2);
  panel.widgets().set(g, ui.Label((e).toString() +": "+location));
  // Add a red dot to the map where the user clicked.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  Map.layers().set(g, ui.Map.Layer(point, {color: 'FF0000'},(e).toString()));
 // Create a chart of NDVI over time.
  var chart = ui.Chart.image.series(LST_imgCln, point, ee.Reducer.mean(), 200)
      .setOptions({
        title: 'LST Over Time \n'+location,
        vAxis: {title: 'LST'},
        lineWidth: 1,
        pointSize: 3,
                  });
  // Add (or replace) the third widget in the panel by
  // manipulating the widgets list.
  panel.widgets().set(h, chart);
  panel.widgets().set(g++, ui.Label('You can click again!'));
  // print('i=',i , 'j=',j);
  e++,f++,g+=g+2,
   h +=h+4;
});
                            }
                          });
 {
 }
// ======= NDVI TimeSeries as a chart ======= 
{
  var chart1title= 'mean LST over time - scale= '+ScaleForCharts+'m \n';
// Display the chart in the console.
// print(chart1);
}
// -------------------------------------
panel.widgets().set(1, CaseSelect);
// Set a callback function for when the user clicks the map.
// cloud
// obs---> thesis
{/*
Abbreviations:
  ROI:                Region of Interest
  WG:                 Walnut Gulch
  imgCLn:             Image Collection
  WG_MODIS_ImgC:      Walnut Gulch's MODIS Image Collection
  WG_LAI_Cln:         Walnut Gulch's Leaf Area Index Collection
  LAI_Vis:            LAI_Visualization
  LST_imgCln:         Land Surface Temperature
*/
  /*
// ================= showing the Study Area ===================
{
Map.centerObject(ROI,9.2);
Map.addLayer(
  ROI,                //eeObject
 {color: '009F00'},   //visParams
  ROI_Name,           //name
  true,               //shown, 
  0.5                 //opacity
            );                  //specify a 'green' color and a name
}
// ===================== Date of intrest ======================
var Strt_date = ee.Date('2000-03-20'); 
*/
/*
                                  2002-07-04 <--- LAI
                                  2000-03-05 <--- MODIS Mod09A1
                                  2000-03-05 <--- LST
                                  2000-02-24 <--- MODIS Mod09gq
                                      var S_date = 
                                      ee.Date.fromYMD
                                      (2010, 01, 01, 
                                      'America/Los_Angeles');
// Get the number of images.
var count = collection.size();
print('Count: ', count);
// Get the date range of images in the collection.
var range = collection.reduceColumns(ee.Reducer.minMax(), ["system:time_start"])
print('Date range: ', ee.Date(range.get('min')), ee.Date(range.get('max')))
*/
/* 
var End_date = ee.Date('2010-03-19');
{// ================== Creat image collection with NMDI Band ==================
var WG_LST_Cln =LST_imgCln.select('LST_Day_1km')
				.filterDate(Strt_date , End_date)
				.filterBounds(ROI)
				.map(function(image)
              {                         
              return image.clip(ROI);
              }
            );
// End of =========== Defining LAI & LST Collections ==================
}
{// ======================= Prints Block =======================
  // Count # of images
print('count of LST Daily images for the area =', WG_LST_Cln.size());
}
//            NMDI_Vis | MODIS_trueColorVis | LAI_Vis | LST_Vis 
{// ================== Defining Visualization Parameters ==================
var LST_Vis = {
  min: 13000.0,
  max: 16500.0,
  palette: [
    '040274', '040281', '0502a3', '0502b8', '0502ce', '0502e6',
    '0602ff', '235cb1', '307ef3', '269db1', '30c8e2', '32d3ef',
    '3be285', '3ff38f', '86e26f', '3ae237', 'b5e22e', 'd6e21f',
    'fff705', 'ffd611', 'ffb613', 'ff8b13', 'ff6e08', 'ff500d',
    'ff0000', 'de0101', 'c21301', 'a71001', '911003'
  ],
};			 
// End of =========== Defining Visualization Parameters ==================
}
{// ==================== Map Layers Block  =====================
Map.addLayer(WG_LST_Cln.first(), LST_Vis, "1st image's Land Surface Temperature",false);
}
// ====================== Analysis Block  =====================
{
/*                    Min     Max       Scale
  MODIS/006/MOD09GQ
      sur_refl_b01    -100    16000     0.0001
      sur_refl_b02    -100    16000     0.0001
                LAI    0      100       0.1	
                LST    7500   65535     0.02    Day_1km	Kelvin
                NMDI   0.4    0.7
*/
/*
var LST_S = WG_LST_Cln.map(function(img){
  var id= img.id();
  return img.multiply(0.02).rename(id);
  // .copyProperties(img)
                            });     
// ============== Stack
// var modis_Stack=MODIS_S.toBands();
var LST_Stack=LST_S.toBands();
// print('modis_Stack=365 img *8 band=',modis_Stack);
// ============ Export
Export.image.toDrive(
{image: LST_Stack,
  description:'LST_2010-10-09__2017_10_08',
  region:ROI,
  scale:500
});
}
*/