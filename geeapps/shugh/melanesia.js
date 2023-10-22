var Isabel = ui.import && ui.import("Isabel", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                158.02963844210223,
                -7.262114314784885
              ],
              [
                158.01865211397723,
                -7.56715890510922
              ],
              [
                159.90830055147723,
                -8.763381253109623
              ],
              [
                160.10605445772723,
                -8.334243818101003
              ],
              [
                158.80966773897723,
                -7.381978430662671
              ]
            ]
          ],
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#0b4a8b",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #0b4a8b */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[158.02963844210223, -7.262114314784885],
          [158.01865211397723, -7.56715890510922],
          [159.90830055147723, -8.763381253109623],
          [160.10605445772723, -8.334243818101003],
          [158.80966773897723, -7.381978430662671]]]),
    Makira = ui.import && ui.import("Makira", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                161.25055018278135,
                -10.06877846238124
              ],
              [
                161.21209803434385,
                -10.371514399147104
              ],
              [
                161.69000330778135,
                -10.825067375147682
              ],
              [
                162.55243006559385,
                -10.976100720413932
              ],
              [
                162.53595057340635,
                -10.738728344554847
              ],
              [
                162.16241541715635,
                -10.328284124345085
              ],
              [
                162.05804529996885,
                -10.166117839766757
              ]
            ]
          ],
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#ffc82d",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #ffc82d */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[161.25055018278135, -10.06877846238124],
          [161.21209803434385, -10.371514399147104],
          [161.69000330778135, -10.825067375147682],
          [162.55243006559385, -10.976100720413932],
          [162.53595057340635, -10.738728344554847],
          [162.16241541715635, -10.328284124345085],
          [162.05804529996885, -10.166117839766757]]]),
    IsabelWard = ui.import && ui.import("IsabelWard", "table", {
      "id": "users/shugh/Melanesia/IsabelWards"
    }) || ee.FeatureCollection("users/shugh/Melanesia/IsabelWards"),
    MakiraWard = ui.import && ui.import("MakiraWard", "table", {
      "id": "users/shugh/Melanesia/MakiraWard"
    }) || ee.FeatureCollection("users/shugh/Melanesia/MakiraWard"),
    LSIB = ui.import && ui.import("LSIB", "table", {
      "id": "USDOS/LSIB/2013"
    }) || ee.FeatureCollection("USDOS/LSIB/2013"),
    hansen = ui.import && ui.import("hansen", "image", {
      "id": "UMD/hansen/global_forest_change_2018_v1_6"
    }) || ee.Image("UMD/hansen/global_forest_change_2018_v1_6"),
    ifl16 = ui.import && ui.import("ifl16", "table", {
      "id": "users/shugh/IFL/IFL2016"
    }) || ee.FeatureCollection("users/shugh/IFL/IFL2016"),
    lsib2 = ui.import && ui.import("lsib2", "table", {
      "id": "USDOS/LSIB_SIMPLE/2017"
    }) || ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017"),
    pf = ui.import && ui.import("pf", "image", {
      "id": "users/shugh/primaryForest/Asia_2001_primary"
    }) || ee.Image("users/shugh/primaryForest/Asia_2001_primary"),
    B10mean = ui.import && ui.import("B10mean", "image", {
      "id": "users/shugh/Melanesia/B10MeanIslands"
    }) || ee.Image("users/shugh/Melanesia/B10MeanIslands");
// var iList = ["SOLOMAN ISLANDS", "VANUATU"]
// var islands = LSIB.filter(ee.Filter.inList('name', iList))
var iList = ["Solomon Is", "Vanuatu"]
var islands = lsib2.filter(ee.Filter.inList('country_na', iList))
var world2AOI = lsib2.distinct('country_na')
//print(distinctAOI.aggregate_count('.all'))
var world2AOIlist = world2AOI.aggregate_array('country_na')
print("world2",world2AOIlist)
var geometry = islands
var LS = ee.ImageCollection('LANDSAT/LC08/C01/T1_SR')
    .filterBounds(geometry)
    .filterDate('2014-01-01','2019-12-31')
    .filter(ee.Filter.calendarRange(5, 11, 'month'))
///clip timeseries to a boundary            
var Clouds = LS.map(function(img){
              var img_clip = img.clip(geometry)
              return img_clip
            })
var visParams = {
  bands:['B4','B3','B2'],
  min:0,
  max:3000,
}
//**************************************************************************************
//Clear timeseries of cloud
// var getQABits = function(image, start, end, newName) {
//     // Compute the bits we need to extract.
//     var pattern = 0;
//     for (var i = start; i <= end; i++) {
//       pattern += Math.pow(2, i);
//     }
//     // Return a single band image of the extracted QA bits, giving the band
//     // a new name.
//     return image.select([0], [newName])
//                   .bitwiseAnd(pattern)
//                   .rightShift(start);
// };
// // A function to mask out cloud shadow pixels.
// var cloud_shadows = function(image) {
//   // Select the QA band.
//   var QA = image.select(['pixel_qa']);
//   // Get the internal_cloud_algorithm_flag bit.
//   return getQABits(QA, 3,3, 'cloud_shadows').eq(0);
//   // Return an image masking out cloudy areas.
// };
// // A function to mask out cloudy pixels.
// var clouds = function(image) {
//   // Select the QA band.
//   var QA = image.select(['pixel_qa']);
//   // Get the internal_cloud_algorithm_flag bit.
//   return getQABits(QA, 5,5, 'Cloud').eq(0);
//   // Return an image masking out cloudy areas.
// };
// var maskClouds = function(image) {
//   var cs = cloud_shadows(image);
//   var c = clouds(image);
//   image = image.updateMask(cs);
//   return image.updateMask(c);
// };
// var noClouds = Clouds.map(maskClouds);
// Map.addLayer(noClouds.median(), visParams, "noClouds")  
// var B10 = noClouds.select("B10")
// var B10mean = B10.reduce(ee.Reducer.mean());
var B10minMax = B10mean.reduceRegion({
                reducer:ee.Reducer.minMax(),
                geometry: geometry,
                scale : 30,
                maxPixels: 1e13
                });
print(B10minMax)
// var B10stdDev = B10.reduce(ee.Reducer.stdDev());
// var B10cov = B10mean.divide(B10stdDev)
// Export.image.toDrive({
// image: B10mean,
// description: 'B10_mean_Islands',
// //assetId: "Melanesia",
// scale: 30,
// region: geometry,
// maxPixels:1e13
// })
// Export.image.toDrive({
// image: B10cov,
// description: 'Tanna_b10_cov_Dry_2014_2019',
// scale: 30,
// region: geometry})
//feature visuals
// Create an empty image into which to paint the features, cast to byte.
var empty = ee.Image().byte();
// Paint all the polygon edges with the same number and width, display.
var outline = empty.paint({
  featureCollection: IsabelWard,
  color: 1,
  width: 3
});
// Create an empty image into which to paint the features, cast to byte.
var empty2 = ee.Image().byte();
// Paint all the polygon edges with the same number and width, display.
var outline2 = empty2.paint({
  featureCollection: MakiraWard,
  color: 1,
  width: 3
});
// Create an empty image into which to paint the features, cast to byte.
var empty3 = ee.Image().byte();
// Paint all the polygon edges with the same number and width, display.
var outline3 = empty3.paint({
  featureCollection: islands,
  color: 1,
  width: 2
});
var ifl = ifl16.filterBounds(islands)
var fc = hansen.select('treecover2000').updateMask(hansen.select("loss").eq(0)).clip(islands)
var fc2 = fc.updateMask(fc.gte(70))
var palettes = require('users/gena/packages:palettes');
var palette = palettes.colorbrewer.Spectral[6].reverse()
var viz = {min:2300, max:3200, palette:palette}
var pf1 = pf.updateMask(pf.eq(1).updateMask(hansen.select("loss").eq(0)).clip(islands))
Map.centerObject(islands, 7)
Map.addLayer(pf1, {palette: "005900"}, "Turuvanova primary humid tropical forest")
Map.addLayer(fc2, {palette:"00A800"}, "Hansen canopy cover")
Map.addLayer(ifl, {color: "00E700"}, "Intact forest landscapes 2016")
Map.addLayer(B10mean, viz, "B10mean")
Map.addLayer(outline3, {}, "Solomon Islands and Vanuatu")
Map.addLayer(outline, {palette: "blue"}, "Isabel")
Map.addLayer(outline2, {palette: "red"}, "Makira")
///////////////////////////////////////////////////////////////////////////////////////////////////
///Adding Legend
// set position of panel
var legend = ui.Panel({
style: {
position: 'bottom-left',
padding: '8px 15px'
}
});
 // Create legend title
var legendTitle = ui.Label({
  value: 'Melanesia Study Area',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
// Add the title to the panel
legend.add(legendTitle);
// Create legend title
var b10Title = ui.Label({
value: 'B10 mean (K)',
style: {
fontWeight: 'bold',
fontSize: '14px',
margin: '0 0 4px 0',
padding: '0'
}
});
///////////////////////////////////////////////////////////////////////////////////////////
//Panel 1
///////////////////////////////////////////////////////////////////////////////////////////
// Add the title to the panel
legend.add(b10Title);
// create the legend image
var lon = ee.Image.pixelLonLat().select('latitude');
var gradient = lon.multiply((viz.max-viz.min)/100.0).add(viz.min);
var legendImage = gradient.visualize(viz);
// create thumbnail from the image
var thumbnail = ui.Thumbnail({
image: legendImage,
params: {bbox:'0,0,10,100', dimensions:'20x50'},
style: {margin: '0 0 0 0',padding: '1px', position: 'bottom-center'}
});
// create text on top of legend
var textPanel = ui.Panel({
widgets: [
ui.Label(viz['max']),  
ui.Label(viz['min'])
],
});
// legend.add(panel);
var panel1 = ui.Panel({
        widgets: [thumbnail, textPanel],
        layout: ui.Panel.Layout.Flow('horizontal')
      })
legend.add(panel1);
////////////////////////////////////////////////////////////////////
//Panel2
////////////////////////////////////////////////////////////////////
var lon = ee.Image.pixelLonLat().select('latitude');
var gradient = lon.multiply(1);
var legendImage = gradient.visualize({palette:"white", opacity: 0.5});
// create thumbnail from the image
      var thumbnail2 = ui.Thumbnail({
      image: legendImage,
      params: {dimensions:'12x12'}, //bbox:'0,0,10,5', 
      style: {margin: '0 0 0 0', border:  '2px solid red', padding: '0px', position: 'bottom-left'}
      });
      var description2 = ui.Label({
        value: "Makira",
        style: {margin: '0 0 4px 6px'}
      });
var panel2 = ui.Panel({
        widgets: [thumbnail2, description2],
        layout: ui.Panel.Layout.Flow('horizontal')
      })
// add the thumbnail to the legend
legend.add(panel2); 
////////////////////////////////////////////////////////////////////
//Panel 3
////////////////////////////////////////////////////////////////////
// create thumbnail from the image
      var thumbnail3 = ui.Thumbnail({
      image: legendImage,
      params: {dimensions:'12x12'}, //bbox:'0,0,10,5', 
      style: {margin: '0 0 0 0', border:  '2px solid blue', padding: '0px', position: 'bottom-left'}
      });
      var description3 = ui.Label({
        value: "Isabel",
        style: {margin: '0 0 4px 6px'}
      });
var panel3 = ui.Panel({
        widgets: [thumbnail3, description3],
        layout: ui.Panel.Layout.Flow('horizontal')
      })
// add the thumbnail to the legend
legend.add(panel3);
////////////////////////////////////////////////////////////////////
//Panel 4
////////////////////////////////////////////////////////////////////
var legendImage2 = gradient.visualize({palette:"00E700", opacity: 0.5});
// create thumbnail from the image
      var thumbnail4 = ui.Thumbnail({
      image: legendImage2,
      params: {dimensions:'12x12'}, //bbox:'0,0,10,5', 
      style: {margin: '0 0 0 0', border:  '2px solid #00E700', padding: '0px', position: 'bottom-left'}
      });
      var description4 = ui.Label({
        value: "IFL 2016",
        style: {margin: '0 0 4px 6px'}
      });
var panel4 = ui.Panel({
        widgets: [thumbnail4, description4],
        layout: ui.Panel.Layout.Flow('horizontal')
      })
// add the thumbnail to the legend
legend.add(panel4); 
////////////////////////////////////////////////////////////////////
//Panel 5
////////////////////////////////////////////////////////////////////
var legendImage3 = gradient.visualize({palette:"00A800", opacity: 1});
// create thumbnail from the image
      var thumbnail5 = ui.Thumbnail({
      image: legendImage3,
      params: {dimensions:'15x15'}, //bbox:'0,0,10,5', 
      style: {margin: '0 0 0 0', padding: '0px', position: 'bottom-left'}
      });
      var description5 = ui.Label({
        value: "Hansen >=70% Canopy Cover",
        style: {margin: '0 0 4px 6px'}
      });
var panel5 = ui.Panel({
        widgets: [thumbnail5, description5],
        layout: ui.Panel.Layout.Flow('horizontal')
      })
// add the thumbnail to the legend
legend.add(panel5);
////////////////////////////////////////////////////////////////////
//Panel 6
////////////////////////////////////////////////////////////////////
var legendImage4 = gradient.visualize({palette:"005900", opacity: 1});
// create thumbnail from the image
      var thumbnail6 = ui.Thumbnail({
      image: legendImage4,
      params: {dimensions:'15x15'}, //bbox:'0,0,10,5', 
      style: {margin: '0 0 0 0', padding: '0px', position: 'bottom-left'}
      });
      var description6 = ui.Label({
        value: "Turubanova primary forest",
        style: {margin: '0 0 4px 6px'}
      });
var panel6 = ui.Panel({
        widgets: [thumbnail6, description6],
        layout: ui.Panel.Layout.Flow('horizontal')
      })
// add the thumbnail to the legend
legend.add(panel6);
var panel7= ui.Panel([
   ui.Label({
    value: 'Layer sources can be found here',
    targetUrl: "https://docs.google.com/document/d/1fUr02lDDtTEiMIcUzip0YC8KUnnuJRAnTSSS6qzH5nA/edit?usp=sharing"
  })
])
legend.add(panel7)
Map.add(legend);