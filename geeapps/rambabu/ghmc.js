var Hyderabad = ui.import && ui.import("Hyderabad", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            78.47396352619529,
            17.42031528488411
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#ff3812",
      "mode": "Geometry",
      "shown": false,
      "locked": true
    }) || 
    /* color: #ff3812 */
    /* shown: false */
    /* locked: true */
    ee.Geometry.Point([78.47396352619529, 17.42031528488411]),
    Streams = ui.import && ui.import("Streams", "table", {
      "id": "users/rambabu/GHMC/Streams"
    }) || ee.FeatureCollection("users/rambabu/GHMC/Streams");
var FromDate='2020-6-01';
var ToDate='2020-12-31';
var NDWI_Threshold = -16;  
var RecentImageDate;
Map.centerObject(Hyderabad,12);
//Map.addLayer(Streams,null,"streams",true,0.2);
Map.style().set('cursor', 'crosshair');
// Load data.
var images = ee.ImageCollection('COPERNICUS/S1_GRD')
    .filterDate(FromDate, ToDate)
    .filterBounds(Hyderabad)
    .select(['VV'])
    .map(function(img){
      var bands= img.focal_mean(50,'circle','meters').rename('Water'); //Apply a focal median filter
      return img.addBands(bands)
  });
var count = images.size();
print('Count: ', count);
print(images);
var images = images.sort('system:time_start', false).limit(25); //sort on date desc
var imageMaxNDWI = images.select('Water').first();
var date = ee.Date(imageMaxNDWI.get('system:time_start')).format('dd-MMM-yyyy');
print('Timestamp: ', date); // ee.Date
RecentImageDate =date;
// Include JRC layer on surface water occurance to mask flood pixels from areas
var swater = ee.Image('JRC/GSW1_0/GlobalSurfaceWater').select('occurrence');
var swater_mask = swater.gte(0).updateMask(swater.gte(0));
// final flooded area without pixels in perennial waterbodies
var flooded = swater_mask.updateMask(swater_mask);
var waterPalette1 = ['6697C7'];
Map.layers().set(0, ui.Map.Layer(imageMaxNDWI.updateMask(flooded),{min: 0, max: 1, palette: waterPalette1}, 'Max. Surface Water',1));
var waterPalette = ['white','004ED7'];
// select pixels greater than threshold
imageMaxNDWI = imageMaxNDWI.lt(NDWI_Threshold);
Map.layers().set(1, ui.Map.Layer(imageMaxNDWI.updateMask(imageMaxNDWI), {min: -20, max: 0, palette: waterPalette}, 'Surface Water'));
// Create an empty image into which to paint the features, cast to byte.
var empty = ee.Image().byte();
// Paint the edges with different colors and widths.
var outlines = empty.paint({
  featureCollection: Streams,
  color: 'StreamOrde',
  width: '2'
});
var palette = ['0075C4', '004ED7'];
Map.layers().set(2, ui.Map.Layer(outlines, {palette: palette,min:1, max: 5}, 'Streams Network'));
//------------Build Date Combo
var datesIni = ee.Dictionary()
function getDates(img, first)
{
  //#gets the date of the image
  var year = ee.Date(img.get('system:time_start')).format('yyyy-MM-dd');
 // #fills the Dictionary
  return ee.Dictionary(first).set(year, ee.Image(img).id());
}
var dates = ee.Dictionary(images.iterate(getDates, datesIni))
print(dates.getInfo());
//print("Dictionary of means:", dates.getInfo());
var obj = Object.keys(dates.getInfo());
var select = ui.Select({
  items: Object.keys(dates.getInfo()),
  onChange: function(key) {
    var imageDate = [key][0];
    var imageMaxNDWI = images.filterDate(imageDate,ee.Date(imageDate).advance(1,"day")).select('Water').first();
    var date = ee.Date(imageMaxNDWI.get('system:time_start')).format('dd-MMM-yyyy');
    print('Timestamp: ', date); // ee.Date
    imageMaxNDWI = imageMaxNDWI.lt(NDWI_Threshold);
    Map.layers().set(1, ui.Map.Layer(imageMaxNDWI.updateMask(imageMaxNDWI), {min: -20, max: 0, palette: waterPalette},'Surface Water'));
    var panelDate = ui.Label('Image Date: ' + date.getInfo());
    panelSubTitle.style().set({
      fontSize: '14px',
       padding: '1px'
    });
     panel.widgets().set(4, panelDate);
  }
});
// Set a place holder.
select.setPlaceholder('Choose a Date...');
// Create an empty panel in which to arrange widgets.
// The layout is vertical flow by default.
var panel = ui.Panel({style: {width: '400px'}});
var title = "Surface Water in Hyderabad (2020) - SAR";
var panelTitle = ui.Label(title);
panelTitle.style().set('color', 'blue');
panelTitle.style().set('fontWeight', 'bold');
panelTitle.style().set({
  fontSize: '18px',
  padding: '1px'
});
panel.add(panelTitle);
var panelSubTitle = ui.Label('Telangana State, India');
panelSubTitle.style().set({
  fontSize: '14px',
   padding: '1px'
});
panel.add(panelSubTitle);
//panel.add(select);
panel.widgets().set(1, select);
panel.add(ui.Label('Click on the Tank to view NDWI Chart (Sentinel 1)'));
var developedBy = ui.Label('Developed by: Dr. P. Rambabu, Professor, BVRIT');
developedBy.style().set({
  fontSize: '12px',
   padding: '1px'
});
developedBy.style().set('color', 'blue');
panel.add(developedBy);
// Set a callback function for when the user clicks the map.
// Map.onClick(function(coords) {
//   // Add a red dot to the map where the user clicked.
//   var point = ee.Geometry.Point(coords.lon, coords.lat);
//   Map.layers().set(3, ui.Map.Layer(point, {color: 'FF0000'},'Selected Location'));
//   // Create a chart of NDWI over time.
//   var chart = ui.Chart.image.series(images.select('Water'), point, ee.Reducer.sum(), 10)
//       .setOptions({
//         title: 'NDWI Over Time',
//         vAxis: {title: 'NDWI'},
//         lineWidth: 1,
//         pointSize: 3,
//       });
//   // manipulating the widgets list.
//   panel.widgets().set(3, chart);
//   // Create or update the location label (the second widget in the panel)
//   var location = 'Selected Tank: lon: ' + coords.lon.toFixed(2) + ' ' +
//                 'lat: ' + coords.lat.toFixed(2);
//   panel.widgets().set(3, ui.Label(location));
// });
var panelDate = ui.Label('Image Date: ' + date.getInfo());
panelDate.style().set({
  fontSize: '14px',
   padding: '1px'
});
 panel.widgets().set(4, panelDate);
// Add the panel to the ui.root.
//ui.root.add(panel);
// Add Map Title and Prepared By
ui.root.setLayout(ui.Panel.Layout.absolute());
//Add Map Title at Top
var titlePanel = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
  style: {position: 'bottom-center', padding:'1px'}
});
var MapTitle = date.getInfo();
titlePanel.add(ui.Label({value: MapTitle,
    style: {color:'red',fontSize: '18px'}
  }));
ui.root.add(titlePanel);