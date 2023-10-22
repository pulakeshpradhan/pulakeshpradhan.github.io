var NarsapurTank = ui.import && ui.import("NarsapurTank", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                78.28578547778224,
                17.73086267704044
              ],
              [
                78.28432635607814,
                17.729595492960637
              ],
              [
                78.28381137194728,
                17.728573563788938
              ],
              [
                78.28321055712794,
                17.72755162879018
              ],
              [
                78.28269557299708,
                17.72616178784108
              ],
              [
                78.28166560473537,
                17.724935448642544
              ],
              [
                78.28149394335841,
                17.72366822265705
              ],
              [
                78.28205184283351,
                17.72301416703076
              ],
              [
                78.28286723437404,
                17.722564502403536
              ],
              [
                78.28376845660304,
                17.72154253314747
              ],
              [
                78.28501300158595,
                17.721869563943187
              ],
              [
                78.28604296984767,
                17.72146077535533
              ],
              [
                78.28715876879787,
                17.72121550175525
              ],
              [
                78.28745917620753,
                17.72207395788761
              ],
              [
                78.28861789050197,
                17.722809774158197
              ],
              [
                78.28964785876369,
                17.722850652751358
              ],
              [
                78.29140738787746,
                17.722687138322815
              ],
              [
                78.29338149371242,
                17.723177681161037
              ],
              [
                78.29389647784328,
                17.723749979442573
              ],
              [
                78.29432563128566,
                17.724526667045318
              ],
              [
                78.29363898577785,
                17.725630375218458
              ],
              [
                78.29355315508937,
                17.726611443445098
              ],
              [
                78.29299525561427,
                17.726979342645716
              ],
              [
                78.29243735613917,
                17.726611443445098
              ],
              [
                78.29183654131984,
                17.72640705467401
              ],
              [
                78.29106406512355,
                17.72693846499404
              ],
              [
                78.29024867358302,
                17.72804215831679
              ],
              [
                78.2888753825674,
                17.728982336156893
              ],
              [
                78.28763083758449,
                17.729554615905645
              ],
              [
                78.28698710742091,
                17.73090355379706
              ]
            ]
          ],
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#40a9d6",
      "mode": "Geometry",
      "shown": false,
      "locked": true
    }) || 
    /* color: #40a9d6 */
    /* shown: false */
    /* locked: true */
    ee.Geometry.Polygon(
        [[[78.28578547778224, 17.73086267704044],
          [78.28432635607814, 17.729595492960637],
          [78.28381137194728, 17.728573563788938],
          [78.28321055712794, 17.72755162879018],
          [78.28269557299708, 17.72616178784108],
          [78.28166560473537, 17.724935448642544],
          [78.28149394335841, 17.72366822265705],
          [78.28205184283351, 17.72301416703076],
          [78.28286723437404, 17.722564502403536],
          [78.28376845660304, 17.72154253314747],
          [78.28501300158595, 17.721869563943187],
          [78.28604296984767, 17.72146077535533],
          [78.28715876879787, 17.72121550175525],
          [78.28745917620753, 17.72207395788761],
          [78.28861789050197, 17.722809774158197],
          [78.28964785876369, 17.722850652751358],
          [78.29140738787746, 17.722687138322815],
          [78.29338149371242, 17.723177681161037],
          [78.29389647784328, 17.723749979442573],
          [78.29432563128566, 17.724526667045318],
          [78.29363898577785, 17.725630375218458],
          [78.29355315508937, 17.726611443445098],
          [78.29299525561427, 17.726979342645716],
          [78.29243735613917, 17.726611443445098],
          [78.29183654131984, 17.72640705467401],
          [78.29106406512355, 17.72693846499404],
          [78.29024867358302, 17.72804215831679],
          [78.2888753825674, 17.728982336156893],
          [78.28763083758449, 17.729554615905645],
          [78.28698710742091, 17.73090355379706]]]);
var FromDate='2020-1-01'; 
var ToDate='2020-12-31';
var NDWI_Threshold = -18; 
Map.centerObject(NarsapurTank,15);
Map.addLayer(NarsapurTank,null,"Narsapur Tank",true,0.2);
Map.style().set('cursor', 'crosshair');
// Load data.
var images = ee.ImageCollection('COPERNICUS/S1_GRD')
    .filterDate(FromDate, ToDate)
    .filterBounds(NarsapurTank)
    .select(['VV'])
    .map(function(img){
      var bands= img.focal_mean(50,'circle','meters').rename('Water'); //Apply a focal median filter
      return img.addBands(bands)
  });
var count = images.size();
print('Count: ', count);
print(images);
images = images.limit(25, 'system:time_start', false);
var imageMaxNDWI = images.select('Water').first().clip(NarsapurTank);
var date = ee.Date(imageMaxNDWI.get('system:time_start')).format('dd-MMM-yyyy');
print('Timestamp: ', date); // ee.Date
// Include JRC layer on surface water occurance to mask flood pixels from areas
var swater = ee.Image('JRC/GSW1_0/GlobalSurfaceWater').select('occurrence');
var swater_mask = swater.gte(0).updateMask(swater.gte(0));
// final flooded area without pixels in perennial waterbodies
var flooded = swater_mask.updateMask(swater_mask);
var waterPalette1 = ['lightblue'];
Map.layers().set(1, ui.Map.Layer(imageMaxNDWI.updateMask(flooded),{min: 0, max: 1, palette: waterPalette1}, 'Surface Water',1));
var waterPalette = ['white','blue'];
// select pixels greater than threshold
imageMaxNDWI = imageMaxNDWI.lt(NDWI_Threshold);
Map.layers().set(2, ui.Map.Layer(imageMaxNDWI.updateMask(imageMaxNDWI), {min: -20, max: 0, palette: waterPalette}, 'NDWI on ' + date.getInfo()));
// Print polygon area in square kilometers.
print('Tank Boundary (hectares): ', NarsapurTank.area().divide(100 * 100).round());
// Print polygon area in square kilometers.
// now to calculate water area 
// first change all water pixel values to 1
// then multiply by ee.Image.pixelArea; since that image gives us the area of each pixel
// then rename the band 
  var waterArea = flooded
                         .divide(flooded)
                         .multiply(ee.Image.pixelArea())
                         .rename('waterArea')
                        .divide(1e4);
// calculate area 
  var stats = waterArea.reduceRegion({
    reducer: ee.Reducer.sum(), 
    geometry: NarsapurTank, 
    scale: 10,
  })
print("Max. Water Spread Area (hectares):", parseInt(stats.get("waterArea").getInfo()));
var waterArea1 = imageMaxNDWI
                       .divide(imageMaxNDWI)
                       .multiply(ee.Image.pixelArea())
                       .rename('waterArea')
                      .divide(1e4);
// calculate area 
  var stats1 = waterArea1.reduceRegion({
    reducer: ee.Reducer.sum(), 
    geometry: NarsapurTank, 
    scale: 10,
  })
print("Water Spread Area (hectares) on " + date.getInfo() + ":", parseInt(stats1.get("waterArea").getInfo()))
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
    var imageMaxNDWI = images.filterDate(imageDate,ee.Date(imageDate).advance(1,"day")).select('Water').first().clip(NarsapurTank);
    var date = ee.Date(imageMaxNDWI.get('system:time_start')).format('dd-MMM-yyyy');
    print('Timestamp: ', date); // ee.Date
     // Include JRC layer on surface water occurance to mask flood pixels from areas
    var swater = ee.Image('JRC/GSW1_0/GlobalSurfaceWater').select('occurrence');
    var swater_mask = swater.gte(0).updateMask(swater.gte(0));
    // final flooded area without pixels in perennial waterbodies
    var flooded = swater_mask.updateMask(swater_mask);
    var waterPalette1 = ['lightblue'];
    Map.layers().set(1, ui.Map.Layer(imageMaxNDWI.updateMask(flooded),{min: 0, max: 1, palette: waterPalette1}, 'Surface Water',1));
    imageMaxNDWI = imageMaxNDWI.lt(NDWI_Threshold);
    Map.layers().set(2, ui.Map.Layer(imageMaxNDWI.updateMask(imageMaxNDWI), {min: -20, max: 0, palette: waterPalette},'NDWI on ' + date.getInfo()));
    var waterArea = flooded
                           .divide(flooded)
                           .multiply(ee.Image.pixelArea())
                           .rename('waterArea')
                          .divide(1e4);
    // calculate area 
    var stats = waterArea.reduceRegion({
      reducer: ee.Reducer.sum(), 
      geometry: NarsapurTank, 
      scale: 10,
    })
    var data = "Max. Water Spread Area (hectares): " + parseInt(stats.get("waterArea").getInfo());
    panel.widgets().set(6, ui.Label(data));
    // Create or update Tank Surface Area
    var waterArea1 = imageMaxNDWI
                             .divide(imageMaxNDWI)
                             .multiply(ee.Image.pixelArea())
                             .rename('waterArea')
                             .divide(1e4);
    // calculate area 
    var stats1 = waterArea1.reduceRegion({
      reducer: ee.Reducer.sum(), 
      geometry: NarsapurTank, 
      scale: 10,
    })
    data = "Water Spread Area on " + date.getInfo() + " (hectares): " + parseInt(stats1.get("waterArea").getInfo());
    panel.widgets().set(6, ui.Label(data));
  }
});
// Set a place holder.
select.setPlaceholder('Choose a Date...');
// Create an empty panel in which to arrange widgets.
// The layout is vertical flow by default.
var panel = ui.Panel({style: {width: '400px'}});
var date = date.getInfo();
var title = "Tanks in Narsapur Mandal (" + date + ")";
var panelTitle = ui.Label(title);
panelTitle.style().set('color', 'red');
panelTitle.style().set('fontWeight', 'bold');
panelTitle.style().set({
  fontSize: '18px',
  padding: '1px'
});
panel.add(panelTitle);
var panelSubTitle = ui.Label('Medak District, Telangana State, India');
panelSubTitle.style().set({
  fontSize: '14px',
   padding: '1px'
});
panel.add(panelSubTitle);
//panel.add(select);
panel.widgets().set(3, select);
panel.add(ui.Label('Click on the Tank to view NDWI Chart (Sentinel 1)'));
var developedBy = ui.Label('Developed by: Dr. P. Rambabu, Professor, BVRIT');
developedBy.style().set({
  fontSize: '12px',
   padding: '1px'
});
developedBy.style().set('color', 'blue');
panel.add(developedBy);
// Set a callback function for when the user clicks the map.
Map.onClick(function(coords) {
  // Add a red dot to the map where the user clicked.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  Map.layers().set(3, ui.Map.Layer(point, {color: 'FF0000'},'Selected Location'));
  // Create a chart of NDWI over time.
  var chart = ui.Chart.image.series(images.select('Water'), point, ee.Reducer.sum(), 10)
      .setOptions({
        title: 'NDWI Over Time',
        vAxis: {title: 'NDWI'},
        lineWidth: 1,
        pointSize: 3,
      });
  // manipulating the widgets list.
  panel.widgets().set(4, chart);
   // Create or update the location label (the second widget in the panel)
  var location = 'Selected Tank: lon: ' + coords.lon.toFixed(2) + ' ' +
                 'lat: ' + coords.lat.toFixed(2);
  panel.widgets().set(5, ui.Label(location));
  //panel.widgets().set(6, developedBy);
});
// Add the panel to the ui.root.
ui.root.add(panel);