var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #d63000 */
    /* shown: false */
    ee.Geometry.MultiPoint(),
    roiHist = ui.import && ui.import("roiHist", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -84.3827456984017,
                43.70049613826796
              ],
              [
                -84.3827456984017,
                43.69734690365341
              ],
              [
                -84.37738128037192,
                43.69734690365341
              ],
              [
                -84.37738128037192,
                43.70049613826796
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
                -84.35339362780515,
                43.661719369870326
              ],
              [
                -84.35339362780515,
                43.660943210190794
              ],
              [
                -84.34798629443112,
                43.660943210190794
              ],
              [
                -84.34798629443112,
                43.661719369870326
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [
        {
          "type": "rectangle"
        },
        {
          "type": "rectangle"
        }
      ],
      "properties": {},
      "color": "#98ff00",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #98ff00 */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      },
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.MultiPolygon(
        [[[[-84.3827456984017, 43.70049613826796],
           [-84.3827456984017, 43.69734690365341],
           [-84.37738128037192, 43.69734690365341],
           [-84.37738128037192, 43.70049613826796]]],
         [[[-84.35339362780515, 43.661719369870326],
           [-84.35339362780515, 43.660943210190794],
           [-84.34798629443112, 43.660943210190794],
           [-84.34798629443112, 43.661719369870326]]]], null, false),
    image = ui.import && ui.import("image", "image", {
      "id": "users/chandana/LandsatFlood"
    }) || ee.Image("users/chandana/LandsatFlood");
var imgVV = ee.ImageCollection('COPERNICUS/S1_GRD')
        .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
        .filter(ee.Filter.eq('instrumentMode', 'IW'))
        .select('VV');
var landsatFloodMI = image;
//
//        .map(function(image) {
//          var edge = image.lt(-30.0);
//          var maskedImage = image.mask().and(edge.not());
//          return image.updateMask(maskedImage);
//        });
var desc = imgVV.filter(ee.Filter.eq('orbitProperties_pass', 'DESCENDING'));
var asc = imgVV.filter(ee.Filter.eq('orbitProperties_pass', 'ASCENDING'));
var flood = imgVV.filter(ee.Filter.eq('orbitProperties_pass', 'ASCENDING')).filterDate('2020-03-10', '2020-05-25');
var spring = ee.Filter.date('2019-03-01', '2019-04-20');
var lateSpring = ee.Filter.date('2019-04-21', '2019-06-10');
var summer = ee.Filter.date('2019-06-11', '2019-08-31');
var flood_date = ee.Filter.date('2020-05-17', '2020-05-25');
print('Summer',summer);
var descChange = ee.Image.cat(
        desc.filter(spring).mean(),
        desc.filter(lateSpring).mean(),
        desc.filter(summer).mean());
var ascChange = ee.Image.cat(
        asc.filter(spring).mean(),
        asc.filter(lateSpring).mean(),
        asc.filter(summer).mean());
Map.setCenter(-84.21349788,43.598001847, 12);
Map.addLayer(ascChange, {min: -25, max: 5}, 'Multi-T Mean ASC', true);
Map.addLayer(descChange, {min: -25, max: 5}, 'Multi-T Mean DESC', true);
//Map.addLayer(asc, {min: -25, max: 5}, 'asc-test', true);
//Map.addLayer(flood, {min: -25, max: 5}, 'flood', true);
var options = {
  title: 'Sentinal-1 SAR image Wabash River, Ohio',
  fontSize: 20,
  hAxis: {title: 'DN'},
  vAxis: {title: 'count of DN'},
  series: {
    0: {color: 'blue'}
}};
/*
// Make the histogram, set the options.
var histogram = ui.Chart.image.histogram(flood, roiHist,5)
    .setSeriesNames(['blue'])
    .setOptions(options);
// Display the histogram.
print(histogram);
*/
//Here we are using -16. This is only an approximation and will result in some errors. Try adjusting the 
var classifyWater = function(img) {
//  var vv = img.select('VV')
  var water = img.lt(-17).rename('Water').and(landsatFloodMI.eq(1))  //Identify all pixels below threshold and set them equal to 1. All other pixels set to 0
  water = water.updateMask(water) //Remove all pixels equal to 0
  return img.addBands(water)  //Return image with added classified water band
}
//-15.5
var background = landsatFloodMI.eq(1)
landsatFloodMI = landsatFloodMI.updateMask(background);
//Map classification across sentinel-1 collection and print to console to inspect
var S1= flood;  //collectionVV;
S1 = S1.map(classifyWater)
print(S1)
//var mask = S1.select('b1').eq(1).and.landsatFloodMI.neq(1);
//S1 = S1.updateMask(mask);
Map.addLayer(landsatFloodMI.select('b1'),{min: 0, max: 1,palette: ['#7aaae0','#7aaae0']}, 'Inundated Area')
Map.addLayer(S1, {min: -10, max: 1}, 'Permanent Water');//'#ADD8E6', '#ADD8E6',#7aaae0,#8f8ce7
//==========Add a legend====================================
// set position of panel
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
// Create legend title
var legendTitle = ui.Label({
  value: 'Michigan Flood 05/17/2020',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
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
          padding: '8px',
          margin: '0 0 4px 0'
        }
      });
      // Create the label filled with the description text.
      var description = ui.Label({
        value: name,
        style: {margin: '0 0 4px 6px'}
      });
      // return the panel
      return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal')
      });
};
//  Palette with the colors
var palette =['1500ff', '7aaae0'];
// name of the legend
var names = ['Permanent Water','Inundated Area'];
// Add color and and names
for (var i = 0; i < 2; i++) {
  legend.add(makeRow(palette[i], names[i]));
  }  
// add legend to map (alternatively you can also print the legend to the console)  
Map.add(legend);