var Shuklaphanta = ui.import && ui.import("Shuklaphanta", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            80.2198334960596,
            28.85786350236249
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": false,
      "locked": true
    }) || 
    /* color: #d63000 */
    /* shown: false */
    /* locked: true */
    ee.Geometry.Point([80.2198334960596, 28.85786350236249]),
    BardiaBanke = ui.import && ui.import("BardiaBanke", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            81.67306502855254,
            28.328106214296803
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#98ff00",
      "mode": "Geometry",
      "shown": false,
      "locked": true
    }) || 
    /* color: #98ff00 */
    /* shown: false */
    /* locked: true */
    ee.Geometry.Point([81.67306502855254, 28.328106214296803]),
    ChitwanParsa = ui.import && ui.import("ChitwanParsa", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            84.50632830738901,
            27.515252403486027
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#0b4a8b",
      "mode": "Geometry",
      "shown": false,
      "locked": true
    }) || 
    /* color: #0b4a8b */
    /* shown: false */
    /* locked: true */
    ee.Geometry.Point([84.50632830738901, 27.515252403486027]);
// load Nepal boundaries
var roi = ee.FeatureCollection("users/emilioberti90/nepal-boundaries");
var communityForests = ee.FeatureCollection("users/emilioberti90/community-forests");
var georegions = ee.FeatureCollection("users/emilioberti90/nepal-georegions");
var terai = ee.FeatureCollection("users/emilioberti90/terai-arc");
var camera = ee.FeatureCollection("users/emilioberti90/nepal-camera-observation");
var teraiMap = ui.Map.Layer(terai, {color: 'goldenrod'}, "Terai-Arc corridors", false, 0.9);
var cameraMap = ui.Map.Layer(camera, {color: 'purple'}, "Camera-trap observations", false, 0.9);
Map.centerObject(roi, 7); //center map in Nepal
var communityForestsMap = ui.Map.Layer(communityForests, {'color': 'black'}, "Community forests", false, 0.5);
var empty = ee.Image().byte();
var filledOutline = empty.paint({
      featureCollection: georegions,
      color: 'REGION_ID'
  });
var georegionMap = ui.Map.Layer(filledOutline, {palette: ['ff595e', 'ffca3a', '6a4c93'], min: 1, max: 3}, "Geographic regions", false, 0.5);
// mask of DEM < 3200 -----------------
var elevation = ee.Image('NASA/NASADEM_HGT/001')
  .select('elevation')
  .clip(roi)
  .lte(2500)
  .selfMask();
// Map.addLayer(elevation, {palette: "black"}, "Elevation < 3200 meters");
// mask of rivers ------------
var rivers = ee.FeatureCollection("users/emilioberti90/nepal-rivers");
var riverMask = ee.Image.constant(1) //this is the complement of rivers
  .clip(rivers.geometry())
  .mask()
  .not()
  .clip(roi)
  .selfMask();
// Map.addLayer(riverMask, {palette: ['blue']}, "Rivers");
// connectivity -------------------
/*
The connectivity raster was generated using Omniscape.
There are two assets available:
  - nepal-oniscape-150kg, which is the original output of Omniscape at 25.77 meter resolution
  - nepal-oniscape-150kg-100m, which is the previous aggregated at 103 meter resolution (mean)
For testing the script and, potentially, final results, use the aggregate layer. 
This also has the nice property of removing some small-scale artifacts.
*/
var omniscape = ee.Image("users/emilioberti90/nepal-omniscape-150kg-100m");
omniscape = omniscape.mask(riverMask); //remove river cells
var omniPalette = {
              palette: ['326a74', '2a7b80', '258c88', '2d9e8b', '42ae8a',
                        '5dbe85', '7dcd7d', 'a1db74', 'c8e76a', 'f3f164'],
              min: 0, //min and max are correct for the default zoom of 7
              max: 3800 //change them if you zoom in or out
            };
var omniMap = ui.Map.Layer(omniscape, omniPalette, "Landscape connectivity", true, 0.5);
// connectivity quantiles ----------------
var omniscapeQuantiles = omniscape.reduceRegion(
  {
    geometry: roi,
    reducer: ee.Reducer.percentile([10, 20, 30, 40, 50, 60, 70, 80, 90]),
    maxPixels: 15786157,
    scale: 100
  }
);
print('Omniscape quantiles: ', omniscapeQuantiles);
// protected areas -------------
var pa = ee.FeatureCollection("users/emilioberti90/nepal-PA"); //protected areas
var paMap = ui.Map.Layer(pa, {color: 'green'}, "Protected areas", false, 0.5); //add protected areas
// land cover --------------------
var landcover = ee.ImageCollection("ESA/WorldCover/v100")
  .first()
  .clip(roi);
// Define a palette for the 11 distinct land cover classes.
var lcPalette = [
  '006400', //Trees = 10
  'ffbb22', //Shrubland = 20
  'ffff4c', //Grassland = 30
  'f096ff', //Cropland = 40
  'fa0000', //Built-up = 50
  'b4b4b4', //Barren / sparse vegetation = 60
  'f0f0f0', //Snow and ice = 70
  '0064c8', //Open water = 80
  '0096a0', //Herbaceous wetland = 90
  '00cf75', //Mangroves = 95
  'fae6a0'  //Moss and lichen = 100
];
var landcoverMap = ui.Map.Layer(landcover, {bands: ['Map']}, "Landcover", false, 0.5); //add landcover
var lc_names = ["Forest", "Shrubland", "Grassland",
                "Cropland", "Built-up", "Barren",
                "Snow and ice", "Water", "Wetlands",
                "Mangroves", "Moss and lichens"];
print(landcover)
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px',
    width: '300 px'
  }
});
var legendTitle = ui.Label({
  value: ' Land-cover',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
var makeRow = function(color, name) {
  var colorBox = ui.Label({
    style: {
      backgroundColor: color,
      // Use padding to give the box height and width.
      padding: '8px',
      margin: '0 0 4px 0'
    }
  });
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
legend.add(legendTitle);
for (var i = 0; i < 11; i++) {
  legend.add(makeRow(lcPalette[i], lc_names[i]));
}
Map.add(legend);
// Connectivity classes ---------------
/*
I classify values of connectivity into 10 levels according to their quantile distribution.
The first level contains values: val < 0.10 quantile
The second values: 0.10 <= vals < 0.20
...
the tenth values: 0.90 <= vals < 1.00.
*/
// map connectivity values into levels -----------
var omniscapeLevels = omniscape.selfMask()
  .where(omniscape.lt(ee.Array(omniscapeQuantiles.get('b1_p10'))), 1)
  .where(omniscape.gte(ee.Array(omniscapeQuantiles.get('b1_p10'))).and(omniscape.lte(ee.Array(omniscapeQuantiles.get('b1_p20')))), 2)
  .where(omniscape.gte(ee.Array(omniscapeQuantiles.get('b1_p20'))).and(omniscape.lte(ee.Array(omniscapeQuantiles.get('b1_p30')))), 3)
  .where(omniscape.gte(ee.Array(omniscapeQuantiles.get('b1_p30'))).and(omniscape.lte(ee.Array(omniscapeQuantiles.get('b1_p40')))), 4)
  .where(omniscape.gte(ee.Array(omniscapeQuantiles.get('b1_p40'))).and(omniscape.lte(ee.Array(omniscapeQuantiles.get('b1_p50')))), 5)
  .where(omniscape.gte(ee.Array(omniscapeQuantiles.get('b1_p50'))).and(omniscape.lte(ee.Array(omniscapeQuantiles.get('b1_p60')))), 6)
  .where(omniscape.gte(ee.Array(omniscapeQuantiles.get('b1_p60'))).and(omniscape.lte(ee.Array(omniscapeQuantiles.get('b1_p70')))), 7)
  .where(omniscape.gte(ee.Array(omniscapeQuantiles.get('b1_p70'))).and(omniscape.lte(ee.Array(omniscapeQuantiles.get('b1_p80')))), 8)
  .where(omniscape.gte(ee.Array(omniscapeQuantiles.get('b1_p80'))).and(omniscape.lte(ee.Array(omniscapeQuantiles.get('b1_p90')))), 9)
  .where(omniscape.gte(ee.Array(omniscapeQuantiles.get('b1_p90'))), 10);
// retain only forested, grassland, and shrubland areas
var suitable = omniscapeLevels
  .mask(landcover.eq(10)
  .or(landcover.eq(20))
  .or(landcover.eq(30))
  .or(landcover.eq(60))
  .or(landcover.eq(90))
  .or(landcover.eq(100)))
  .mask(elevation)
  .selfMask();
// zonal statistics for land cover at national level ---------------------
var omniFreq = omniscapeLevels.addBands(landcover)
  .reduceRegion({
    reducer: ee.Reducer.frequencyHistogram().group({
      groupField: 1,
      groupName: 'Map'
    }),
    geometry: roi.geometry(),
    scale: 100,
    maxPixels: 28572315
  });
Export.table.toDrive({
  collection: ee.FeatureCollection([ee.Feature(null, omniFreq)]),
  description: 'zonal-frequency-levels-national',
  fileFormat: 'GeoJSON'
});
// zonal statistics for land cover < 3,200 meters ---------------------
omniFreq = omniscapeLevels.mask(elevation).addBands(landcover)
  .reduceRegion({
    reducer: ee.Reducer.frequencyHistogram().group({
      groupField: 1,
      groupName: 'Map'
    }),
    geometry: roi.geometry(),
    scale: 100,
    maxPixels: 28572315
  });
Export.table.toDrive({
  collection: ee.FeatureCollection([ee.Feature(null, omniFreq)]),
  description: 'zonal-frequency-levels-national-less3200meters',
  fileFormat: 'GeoJSON'
});
// zonal statistics for land cover < 3,200 meters and only within PAs ----------
omniFreq = omniscapeLevels.mask(elevation).addBands(landcover).clip(pa)
  .reduceRegion({
    reducer: ee.Reducer.frequencyHistogram().group({
      groupField: 1,
      groupName: 'Map'
    }),
    geometry: roi.geometry(),
    scale: 100,
    maxPixels: 28572315
  });
Export.table.toDrive({
  collection: ee.FeatureCollection([ee.Feature(null, omniFreq)]),
  description: 'zonal-frequency-levels-national-less3200meters-onlypa',
  fileFormat: 'GeoJSON'
});
// zonal statistics for land cover < 3,200 meters and within community forests ----------
omniFreq = omniscapeLevels.mask(elevation).addBands(landcover).clip(communityForests)
  .reduceRegion({
    reducer: ee.Reducer.frequencyHistogram().group({
      groupField: 1,
      groupName: 'Map'
    }),
    geometry: roi.geometry(),
    scale: 100,
    maxPixels: 28572315
  });
Export.table.toDrive({
  collection: ee.FeatureCollection([ee.Feature(null, omniFreq)]),
  description: 'zonal-frequency-levels-national-less3200meters-CommunityForests',
  fileFormat: 'GeoJSON'
});
// land cover < 3,200 meters and within Terai-Arc ----------
// landcover
Export.image.toDrive({
  image: landcover.clip(terai),
  description: 'lc_terai-arc',
  scale: 100
});
// omniscape within suitable area ----------
var omni = omniscape
  .mask(landcover.eq(10)
  .or(landcover.eq(60))
  .or(landcover.eq(90)))
  .mask(elevation)
  .selfMask();
Export.image.toDrive({
  image: omni,
  description: 'omniscape_within_suitable_area',
  scale: 100
});
// elevation (for masking)
Export.image.toDrive({
  image: elevation.clip(terai),
  description: 'elevation_terai-arc',
  scale: 100
});
// omniFreq
Export.image.toDrive({
  image: omniscapeLevels.clip(terai),
  description: 'omniLevels_terai-arc',
  scale: 100
});
// app --------------------------------
// function to update layers
function updateLayer(value){
  var th = slider.getValue();
  Map.layers().reset([omniMap, landcoverMap, paMap, georegionMap, communityForestsMap, teraiMap, cameraMap]);
  var levs = omniscapeLevels.mask(suitable).gte(value).selfMask();
  Map.addLayer(levs, {palette: ['1b263b']}, 'Selected connectivity levels', true, 0.75);
}
// slider widget
var panel = ui.Panel();
panel.style().set({
  width: '400px',
  height: '315px',
  position: 'top-right',
  backgroundColor: 'f9f9f9'
});
panel.add(ui.Label({
   'value': 'Omniscape',
   'style': {'backgroundColor': 'f9f9f9', 'fontWeight': 'bold', 'fontSize': '20px'}
}));
panel.add(ui.Label({
   'value': 'Landscape connectivity for movement of tigers was \
   calculated using Omniscape, using as resistance matrix the \
   energy cost of travel. Connectivity values do not have a direct \
   physiological interpretation, but rather they show the relative \
   connectivity of cells.',
   'style': {'backgroundColor': 'f9f9f9'}
}));
panel.add(ui.Label({
   'value': 'Select connectivity levels',
   'style': {'backgroundColor': 'f9f9f9', 'fontWeight': 'bold', 'fontSize': '20px'}
}));
var slider = ui.Slider({
  'min': 1,
  'max': 10,
  'value': 5,
  'step': 1,
  'style': {'height': '25px', 'width': '380px', 'backgroundColor': 'f9f9f9'},
  'onChange': updateLayer
});
panel.add(slider);
panel.add(ui.Label({
   'value': 'Slide left to include less-favourable connectivity levels \
   and slide right to include only areas with high connectivity. \
   Connectivity is shown only for forested, grassland, and shurbland areas \
   for regions below 3,200 meters.',
   'style': {'backgroundColor': 'f9f9f9'}
}));
Map.add(panel);
Map.add(omniMap);
Map.add(landcoverMap);
Map.add(georegionMap);
Map.add(communityForestsMap);
Map.add(paMap);
Map.add(teraiMap);
Map.add(cameraMap)