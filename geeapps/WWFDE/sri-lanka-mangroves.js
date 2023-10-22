var giri = ui.import && ui.import("giri", "imageCollection", {
      "id": "LANDSAT/MANGROVE_FORESTS"
    }) || ee.ImageCollection("LANDSAT/MANGROVE_FORESTS"),
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                79.43358759052008,
                9.870529781003372
              ],
              [
                79.43358759052008,
                5.921113541042655
              ],
              [
                82.09227899677008,
                5.921113541042655
              ],
              [
                82.09227899677008,
                9.870529781003372
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
        }
      ],
      "properties": {},
      "color": "#0b4a8b",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #0b4a8b */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[79.43358759052008, 9.870529781003372],
          [79.43358759052008, 5.921113541042655],
          [82.09227899677008, 5.921113541042655],
          [82.09227899677008, 9.870529781003372]]], null, false),
    Landsat2020 = ui.import && ui.import("Landsat2020", "image", {
      "id": "projects/wwf-de/SriLanka/SL_L8_SR_2020_comp"
    }) || ee.Image("projects/wwf-de/SriLanka/SL_L8_SR_2020_comp"),
    vizParamsFalse = ui.import && ui.import("vizParamsFalse", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "swir1",
          "nir",
          "red"
        ],
        "min": -1.40094,
        "max": 3.73794,
        "gamma": 0.44900000000000007
      }
    }) || {"opacity":1,"bands":["swir1","nir","red"],"min":-1.40094,"max":3.73794,"gamma":0.44900000000000007},
    giriparam = ui.import && ui.import("giriparam", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "1"
        ],
        "max": 1,
        "palette": [
          "e931ff"
        ]
      }
    }) || {"opacity":1,"bands":["1"],"max":1,"palette":["e931ff"]},
    Landsat1995 = ui.import && ui.import("Landsat1995", "image", {
      "id": "projects/wwf-de/SriLanka/SL_SR_1994_1996_comp"
    }) || ee.Image("projects/wwf-de/SriLanka/SL_SR_1994_1996_comp"),
    Landsat2015 = ui.import && ui.import("Landsat2015", "image", {
      "id": "projects/wwf-de/SriLanka/SL_L8_SR_2015_comp"
    }) || ee.Image("projects/wwf-de/SriLanka/SL_L8_SR_2015_comp"),
    GT = ui.import && ui.import("GT", "table", {
      "id": "projects/wwf-de/SriLanka/Gangewadiya_Mang_GT"
    }) || ee.FeatureCollection("projects/wwf-de/SriLanka/Gangewadiya_Mang_GT"),
    Landsat1990 = ui.import && ui.import("Landsat1990", "image", {
      "id": "projects/wwf-de/SriLanka/SL_L5_SR_1988_1992_comp"
    }) || ee.Image("projects/wwf-de/SriLanka/SL_L5_SR_1988_1992_comp"),
    Landsat2010 = ui.import && ui.import("Landsat2010", "image", {
      "id": "projects/wwf-de/SriLanka/SL_L58_SR_2010_comp"
    }) || ee.Image("projects/wwf-de/SriLanka/SL_L58_SR_2010_comp"),
    Landsat2005 = ui.import && ui.import("Landsat2005", "image", {
      "id": "projects/wwf-de/SriLanka/SL_L57_SR_2005_comp"
    }) || ee.Image("projects/wwf-de/SriLanka/SL_L57_SR_2005_comp"),
    SL_S22016 = ui.import && ui.import("SL_S22016", "image", {
      "id": "projects/wwf-de/SriLanka/SL_S2_2016_comp"
    }) || ee.Image("projects/wwf-de/SriLanka/SL_S2_2016_comp"),
    Landsat2000 = ui.import && ui.import("Landsat2000", "image", {
      "id": "projects/wwf-de/SriLanka/SL_L57_1999_2001_comp"
    }) || ee.Image("projects/wwf-de/SriLanka/SL_L57_1999_2001_comp"),
    national = ui.import && ui.import("national", "table", {
      "id": "projects/wwf-de/SriLanka/mangrove_2018"
    }) || ee.FeatureCollection("projects/wwf-de/SriLanka/mangrove_2018"),
    S2param = ui.import && ui.import("S2param", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "swir1",
          "nir",
          "red"
        ],
        "min": 0.01560064498335123,
        "max": 0.35202503204345703,
        "gamma": 0.44900000000000007
      }
    }) || {"opacity":1,"bands":["swir1","nir","red"],"min":0.01560064498335123,"max":0.35202503204345703,"gamma":0.44900000000000007},
    mangparam = ui.import && ui.import("mangparam", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "max"
        ],
        "min": 1,
        "max": 1,
        "palette": [
          "c514ff"
        ]
      }
    }) || {"opacity":1,"bands":["max"],"min":1,"max":1,"palette":["c514ff"]},
    mangparam2020 = ui.import && ui.import("mangparam2020", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "max"
        ],
        "min": 1,
        "max": 1,
        "palette": [
          "277eff"
        ]
      }
    }) || {"opacity":1,"bands":["max"],"min":1,"max":1,"palette":["277eff"]},
    mangparam2015 = ui.import && ui.import("mangparam2015", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "max"
        ],
        "min": 1,
        "max": 1,
        "palette": [
          "ec4eff"
        ]
      }
    }) || {"opacity":1,"bands":["max"],"min":1,"max":1,"palette":["ec4eff"]},
    GMW2016 = ui.import && ui.import("GMW2016", "table", {
      "id": "projects/wwf-de/global/GMW_2016_v2"
    }) || ee.FeatureCollection("projects/wwf-de/global/GMW_2016_v2"),
    watermask = ui.import && ui.import("watermask", "image", {
      "id": "projects/wwf-de/SriLanka/SL_watermask_S2_2020"
    }) || ee.Image("projects/wwf-de/SriLanka/SL_watermask_S2_2020"),
    watermaskparam = ui.import && ui.import("watermaskparam", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "nd"
        ],
        "palette": [
          "2723ff"
        ]
      }
    }) || {"opacity":1,"bands":["nd"],"palette":["2723ff"]},
    SL_S22020 = ui.import && ui.import("SL_S22020", "image", {
      "id": "projects/wwf-de/SriLanka/SL_S2_2020_comp"
    }) || ee.Image("projects/wwf-de/SriLanka/SL_S2_2020_comp"),
    mang2020 = ui.import && ui.import("mang2020", "image", {
      "id": "projects/wwf-de/SriLanka/SL_mangroves_2020"
    }) || ee.Image("projects/wwf-de/SriLanka/SL_mangroves_2020"),
    mang2015 = ui.import && ui.import("mang2015", "image", {
      "id": "projects/wwf-de/SriLanka/SL_mangroves_2015"
    }) || ee.Image("projects/wwf-de/SriLanka/SL_mangroves_2015"),
    mang2010 = ui.import && ui.import("mang2010", "image", {
      "id": "projects/wwf-de/SriLanka/SL_mangroves_2010"
    }) || ee.Image("projects/wwf-de/SriLanka/SL_mangroves_2010"),
    mang2020_S2 = ui.import && ui.import("mang2020_S2", "image", {
      "id": "projects/wwf-de/SriLanka/SL_mangroves_S2_2020"
    }) || ee.Image("projects/wwf-de/SriLanka/SL_mangroves_S2_2020"),
    mang2005 = ui.import && ui.import("mang2005", "image", {
      "id": "projects/wwf-de/SriLanka/SL_mangroves_2005"
    }) || ee.Image("projects/wwf-de/SriLanka/SL_mangroves_2005"),
    mang2000 = ui.import && ui.import("mang2000", "image", {
      "id": "projects/wwf-de/SriLanka/SL_mangroves_2000"
    }) || ee.Image("projects/wwf-de/SriLanka/SL_mangroves_2000"),
    mang1995 = ui.import && ui.import("mang1995", "image", {
      "id": "projects/wwf-de/SriLanka/SL_mangroves_1995"
    }) || ee.Image("projects/wwf-de/SriLanka/SL_mangroves_1995"),
    mang1990 = ui.import && ui.import("mang1990", "image", {
      "id": "projects/wwf-de/SriLanka/SL_mangroves_1990"
    }) || ee.Image("projects/wwf-de/SriLanka/SL_mangroves_1990");
Map.centerObject(geometry,9)
//Sri Lanka imagery composites
Map.addLayer(Landsat1990.divide(1000),vizParamsFalse,'Landsat 1990', false)
Map.addLayer(Landsat1995.divide(1000),vizParamsFalse,'Landsat 1995', false)
Map.addLayer(Landsat2000.divide(1000),vizParamsFalse,'Landsat 2000', false)
Map.addLayer(Landsat2005.divide(1000),vizParamsFalse,'Landsat 2005', false)
Map.addLayer(Landsat2010.divide(1000),vizParamsFalse,'Landsat 2010', false)
Map.addLayer(Landsat2015.divide(1000),vizParamsFalse,'Landsat 2015', false)
Map.addLayer(SL_S22016,S2param,'Sentinel 2016')
Map.addLayer(SL_S22020,S2param,'Sentinel 2020')
Map.addLayer(Landsat2020.divide(1000),vizParamsFalse,'Landsat 2020')
Map.addLayer(watermask, watermaskparam, 'water mask 2020 from Sentinel-2', false)
var empty1 = ee.Image().byte();
var mang_outline = empty1.paint({
  featureCollection: national,
  color: 3,
  width: 0
});
Map.addLayer(mang_outline, {palette: '0000FF'}, "National Mangrove Data (2018)",false);
var GMW2016SL = ee.FeatureCollection(GMW2016).filterBounds(geometry)
Map.addLayer(GMW2016SL, {color: '#2a9d8f'}, 'Global Mangrove Watch (2016)', false)
var giri = giri.max();
var mada_giri = giri.clip(geometry)
Map.addLayer(giri,giriparam,'Giri Mangrove (2000)', false)
Map.addLayer(GT,{},'Gangewadiya', false)
//Map.addLayer(mang2010, {}, 'mapped mangroves 2000')
Map.addLayer(mang1990, {min: 1, max: 1, palette: '#ff6113'}, 'mapped mangroves 1990')
Map.addLayer(mang1995, {min: 1, max: 1, palette: '#f63b4f'}, 'mapped mangroves 1995')
Map.addLayer(mang2000, {min: 1, max: 1, palette: '#d63174'}, 'mapped mangroves 2000')
Map.addLayer(mang2005, {min: 1, max: 1, palette: '#a53c89'}, 'mapped mangroves 2005')
Map.addLayer(mang2010, {min: 1, max: 1, palette: '#6d458a'}, 'mapped mangroves 2010')
Map.addLayer(mang2015, {min: 1, max: 1, palette: '#394479'}, 'mapped mangroves 2015')
Map.addLayer(mang2020, {min: 1, max: 1, palette: '#153c5c'}, 'mapped mangroves 2020')
Map.addLayer(mang2020_S2, mangparam2020, 'mapped mangroves 2020 from Sentinel-2', false)
var class_palette =[ //Define a palette for the distinct classes
'ff6113',  //1990
'f63b4f', //1995
'd63174', //2000
'a53c89', //2005
'6d458a', //2010
'394479', //2015
'153c5c', //2020
];
// Adding a legend, derived from https://code.earthengine.google.com/8562c7194aaff1a899e92e293fd10ef8
var add_legend = function(title, lbl, pal) {
  var legend = ui.Panel({style: {position: 'bottom-left'}}), entry;
  legend.add(ui.Label({value: title, style: { fontWeight: 'bold', fontSize: '18px', margin: '0 0 4px 0', padding: '0px' } }));
  for (var x = 0; x < lbl.length; x++){
    entry = [ ui.Label({style:{color: pal[x], margin: '0 0 4px 0'}, value: '██'}),
      ui.Label({ value: labels[x], style: { margin: '0 0 4px 4px' } }) ];
    legend.add(ui.Panel(entry, ui.Panel.Layout.Flow('horizontal')));
  } Map.add(legend); };
var labels = ['1990','1995','2000','2005','2010', '2015','2020'];
add_legend('Mangrove Extent', labels, class_palette);