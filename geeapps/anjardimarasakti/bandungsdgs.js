var Bandung_house = ui.import && ui.import("Bandung_house", "table", {
      "id": "users/anjardimarasakti/bandungarea_housePoly"
    }) || ee.FeatureCollection("users/anjardimarasakti/bandungarea_housePoly"),
    VIIRS = ui.import && ui.import("VIIRS", "imageCollection", {
      "id": "NOAA/VIIRS/DNB/MONTHLY_V1/VCMSLCFG"
    }) || ee.ImageCollection("NOAA/VIIRS/DNB/MONTHLY_V1/VCMSLCFG"),
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                107.59183792238422,
                -6.904199426490912
              ],
              [
                107.59183792238422,
                -6.93146529270943
              ],
              [
                107.6296034253139,
                -6.93146529270943
              ],
              [
                107.6296034253139,
                -6.904199426490912
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
      "color": "#d63000",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #d63000 */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[107.59183792238422, -6.904199426490912],
          [107.59183792238422, -6.93146529270943],
          [107.6296034253139, -6.93146529270943],
          [107.6296034253139, -6.904199426490912]]], null, false),
    Jalan = ui.import && ui.import("Jalan", "table", {
      "id": "users/anjardimarasakti/BDG_Jalan"
    }) || ee.FeatureCollection("users/anjardimarasakti/BDG_Jalan"),
    GAIAVisParam = ui.import && ui.import("GAIAVisParam", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "change_year_index"
        ],
        "max": 34,
        "palette": [
          "bc0100",
          "b49807",
          "36d70f",
          "1798d7",
          "1506e3"
        ]
      }
    }) || {"opacity":1,"bands":["change_year_index"],"max":34,"palette":["bc0100","b49807","36d70f","1798d7","1506e3"]},
    BGD_Density = ui.import && ui.import("BGD_Density", "image", {
      "id": "users/anjardimarasakti/BDG_PolulationDensity"
    }) || ee.Image("users/anjardimarasakti/BDG_PolulationDensity"),
    DensityVisParam = ui.import && ui.import("DensityVisParam", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "b1"
        ],
        "min": -12929.578011429126,
        "max": 51535.63476101281,
        "palette": [
          "ff3302",
          "faff14",
          "08ff6d",
          "0e40ff"
        ]
      }
    }) || {"opacity":1,"bands":["b1"],"min":-12929.578011429126,"max":51535.63476101281,"palette":["ff3302","faff14","08ff6d","0e40ff"]},
    DEMVisParam = ui.import && ui.import("DEMVisParam", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "AVE_DSM"
        ],
        "min": 649.4050329919442,
        "max": 755.1603881302474,
        "palette": [
          "04ff53",
          "04ffde",
          "08b9ff",
          "044fff",
          "2b02ff"
        ]
      }
    }) || {"opacity":1,"bands":["AVE_DSM"],"min":649.4050329919442,"max":755.1603881302474,"palette":["04ff53","04ffde","08b9ff","044fff","2b02ff"]},
    Gust_ave = ui.import && ui.import("Gust_ave", "image", {
      "id": "users/anjardimarasakti/gust_ave"
    }) || ee.Image("users/anjardimarasakti/gust_ave"),
    Gust_max = ui.import && ui.import("Gust_max", "image", {
      "id": "users/anjardimarasakti/gust_max"
    }) || ee.Image("users/anjardimarasakti/gust_max"),
    JalanVisParam = ui.import && ui.import("JalanVisParam", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "avg_rad"
        ],
        "min": -4.094785902014188,
        "max": 51.95527484489888,
        "palette": [
          "109d29",
          "dbac21",
          "916b11",
          "910a0a"
        ]
      }
    }) || {"opacity":1,"bands":["avg_rad"],"min":-4.094785902014188,"max":51.95527484489888,"palette":["109d29","dbac21","916b11","910a0a"]},
    Jalan2VisParam = ui.import && ui.import("Jalan2VisParam", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "avg_rad"
        ],
        "min": -15.402147477980332,
        "max": 19.22106329713824,
        "palette": [
          "a9b8c4",
          "79a1a0",
          "539d93",
          "4a9d37",
          "914d11",
          "a10f0f",
          "970000"
        ]
      }
    }) || {"opacity":1,"bands":["avg_rad"],"min":-15.402147477980332,"max":19.22106329713824,"palette":["a9b8c4","79a1a0","539d93","4a9d37","914d11","a10f0f","970000"]},
    LS = ui.import && ui.import("LS", "image", {
      "id": "users/anjardimarasakti/Landsubsidence_Rate_2015_2020"
    }) || ee.Image("users/anjardimarasakti/Landsubsidence_Rate_2015_2020");
// Menambah label judul platform
Map.add(ui.Label(
    'Urban Water Accessibility Index', {fontWeight: 'bold', fontSize: '24px'})); 
Map.centerObject(geometry, 14);  
//Map.addLayer(Bandung_house,{color:"blue" },"Bandung_house", false);
//------------------------------------------------------------
//ImperviousSurface
var IS = ee.Image("Tsinghua/FROM-GLC/GAIA/v10");
var ISreclass = ee.Image(1) //RECLASS RENTANG Tahun
          .where(IS.gt(1).and(IS.lte(3)), 5)
          .where(IS.gt(4).and(IS.lte(8)), 4)
          .where(IS.gt(9).and(IS.lte(18)), 3)
          .where(IS.gt(19).and(IS.lte(28)), 2);
var intervals1 =
  '<RasterSymbolizer>' +
    '<ColorMap type="intervals" extended="false" >' +
      '<ColorMapEntry color="#1008ff" quantity="1" label="1"/>' + // Sangat Rendah
      '<ColorMapEntry color="#04fddf" quantity="2" label="2" />' + // Rendah
      '<ColorMapEntry color="#3aff00" quantity="3" label="3" />' + // Sedang
      '<ColorMapEntry color="#f6ff04" quantity="4" label="4" />' + // Tinggi
      '<ColorMapEntry color="#ff3900" quantity="5" label="5" />' + // Sangat Tinggi
    '</ColorMap>' +
  '</RasterSymbolizer>';          
Map.addLayer(ISreclass.sldStyle(intervals1).clip(Bandung_house), {}, 'TahunTerbangun', false);
//ImperviousSurface
var DEM = ee.Image('JAXA/ALOS/AW3D30/V2_2');
var elevation = DEM.select('AVE_DSM');
var elevationVis = {
  min: 649,
  max: 755,
  palette: ['0000ff', '00ffff', 'ffff00', 'ff0000', 'ffffff'],
};
var ELreclass = ee.Image(5) //RECLASS RENTANG Tahun
          .where(elevation.gt(733).and(elevation.lte(755)), 4)
          .where(elevation.gt(712).and(elevation.lte(733)), 3)
          .where(elevation.gt(691).and(elevation.lte(712)), 2)
          .where(elevation.gt(670).and(elevation.lte(691)), 1);
var intervals1 =
  '<RasterSymbolizer>' +
    '<ColorMap type="intervals" extended="false" >' +
      '<ColorMapEntry color="#1008ff" quantity="1" label="1"/>' + // Sangat Rendah
      '<ColorMapEntry color="#04fddf" quantity="2" label="2" />' + // Rendah
      '<ColorMapEntry color="#3aff00" quantity="3" label="3" />' + // Sedang
      '<ColorMapEntry color="#f6ff04" quantity="4" label="4" />' + // Tinggi
      '<ColorMapEntry color="#ff3900" quantity="5" label="5" />' + // Sangat Tinggi
    '</ColorMap>' +
  '</RasterSymbolizer>';          
Map.addLayer(ELreclass.sldStyle(intervals1).clip(Bandung_house), {}, 'Elevasi', false);
//Density
var BGD_Density_1 = BGD_Density
var DENSreclass = ee.Image(5) //RECLASS RENTANG Tahun
          .where(BGD_Density_1.gt(27836).and(BGD_Density_1.lte(37115)), 4)
          .where(BGD_Density_1.gt(18557).and(BGD_Density_1.lte(27836)), 3)
          .where(BGD_Density_1.gt(9278).and(BGD_Density_1.lte(18557)), 2)
          .where(BGD_Density_1.gt(0).and(BGD_Density_1.lte(9278)), 1);
var intervals1 =
  '<RasterSymbolizer>' +
    '<ColorMap type="intervals" extended="false" >' +
      '<ColorMapEntry color="#1008ff" quantity="1" label="1"/>' + // Sangat Rendah
      '<ColorMapEntry color="#04fddf" quantity="2" label="2" />' + // Rendah
      '<ColorMapEntry color="#3aff00" quantity="3" label="3" />' + // Sedang
      '<ColorMapEntry color="#f6ff04" quantity="4" label="4" />' + // Tinggi
      '<ColorMapEntry color="#ff3900" quantity="5" label="5" />' + // Sangat Tinggi
    '</ColorMap>' +
  '</RasterSymbolizer>';   
Map.addLayer(DENSreclass.sldStyle(intervals1).clip(Bandung_house), {}, 'Density', false);
//LS
var BGD_LS_1 = LS
var LSreclass = ee.Image(1) //RECLASS RENTANG Tahun
          .where(BGD_LS_1.gt(-0.04).and(BGD_LS_1.lte(-0.013)), 5)
          .where(BGD_LS_1.gt(-0.013).and(BGD_LS_1.lte(0.00021)), 4)
          .where(BGD_LS_1.gt(0.00021).and(BGD_LS_1.lte(0.01348)), 2)
          .where(BGD_LS_1.gt(0.01348).and(BGD_LS_1.lte(0.02674)), 1);
var intervals1 =
  '<RasterSymbolizer>' +
    '<ColorMap type="intervals" extended="false" >' +
      '<ColorMapEntry color="#1008ff" quantity="1" label="1"/>' + // Sangat Rendah
      '<ColorMapEntry color="#04fddf" quantity="2" label="2" />' + // Rendah
      '<ColorMapEntry color="#3aff00" quantity="3" label="3" />' + // Sedang
      '<ColorMapEntry color="#f6ff04" quantity="4" label="4" />' + // Tinggi
      '<ColorMapEntry color="#ff3900" quantity="5" label="5" />' + // Sangat Tinggi
    '</ColorMap>' +
  '</RasterSymbolizer>';   
Map.addLayer(LSreclass.sldStyle(intervals1).clip(Bandung_house), {}, 'Subsidence', false);
//NightLight
var VIIRS_19 = VIIRS
.filter(ee.Filter.date('2019-01-01', '2019-12-30')) 
.select('avg_rad')
.max();
var NLreclass = ee.Image(1) //RECLASS RENTANG Tahun
          .where(VIIRS_19.gt(0).and(VIIRS_19.lte(15)), 5)
          .where(VIIRS_19.gt(15).and(VIIRS_19.lte(23)), 4)
          .where(VIIRS_19.gt(23).and(VIIRS_19.lte(40)), 3)
          .where(VIIRS_19.gt(40).and(VIIRS_19.lte(50)), 2);
var intervals1 =
  '<RasterSymbolizer>' +
    '<ColorMap type="intervals" extended="false" >' +
      '<ColorMapEntry color="#1008ff" quantity="1" label="1"/>' + // Sangat Rendah
      '<ColorMapEntry color="#04fddf" quantity="2" label="2" />' + // Rendah
      '<ColorMapEntry color="#3aff00" quantity="3" label="3" />' + // Sedang
      '<ColorMapEntry color="#f6ff04" quantity="4" label="4" />' + // Tinggi
      '<ColorMapEntry color="#ff3900" quantity="5" label="5" />' + // Sangat Tinggi
    '</ColorMap>' +
  '</RasterSymbolizer>';   
Map.addLayer(NLreclass.sldStyle(intervals1).clip(Bandung_house), {}, 'NightLight', false);
//--------Legenda #1
var legend = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '8px 15px'
  }});
var legendTitle = ui.Label({
  value: 'Index',
  style: {fontWeight: 'bold',
    fontSize: '15px',
    margin: '0 0 4px 0',
    padding: '0'
    }});
legend.add(legendTitle);
Map.add(legend);
var makeRow = function(color, name) {
        var colorBox = ui.Label({
        style: {
          backgroundColor: '#' + color,
          padding: '8px',
          margin: '0 0 4px 0'
        }});
            var description = ui.Label({
        value: name,
        style: {margin: '0 0 4px 6px'}
      });
        return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal')
      })};
var palette =['ff3900','f6ff04','3aff00','04fddf','1008ff'];
var names = ['Very Low','low','medium','high','Very high'];
for (var i = 0; i < 5; i++) {
  legend.add(makeRow(palette[i], names[i]));
  }
//Gabungan semua Parameter
//KATEGORISASI
var all = ISreclass.add(ELreclass).add(DENSreclass).add(LSreclass).add(NLreclass); //reclassify
var allVisParam = { 
  min: 5,
  max: 25,
  palette: ['040274', '040281', '0502a3', '0502b8', '0502ce', '0502e6',
'0602ff', '235cb1', '307ef3', '269db1', '30c8e2', '32d3ef',
'3be285', '3ff38f', '86e26f', '3ae237', 'b5e22e', 'd6e21f',
'fff705', 'ffd611', 'ffb613', 'ff8b13', 'ff6e08', 'ff500d',
'ff0000', 'de0101', 'c21301', 'a71001', '911003']};
Map.addLayer(all.clip(Bandung_house), allVisParam, 'Kerentanan Akses Air 2020');
//2010
var IS = ee.Image("Tsinghua/FROM-GLC/GAIA/v10");
var IS2000 = ee.Image(0) //RECLASS RENTANG Tahun
          .where(IS.gt(9).and(IS.lte(34)), 1);
var KAA2000= all.multiply(IS2000);       
Map.addLayer(all.clip(Bandung_house), allVisParam, 'Kerentanan Akses Air 2010');
//2000
var IS = ee.Image("Tsinghua/FROM-GLC/GAIA/v10");
var IS2000 = ee.Image(0) //RECLASS RENTANG Tahun
          .where(IS.gt(19).and(IS.lte(34)), 1);
var KAA2000= all.multiply(IS2000);       
Map.addLayer(all.clip(Bandung_house), allVisParam, 'Kerentanan Akses Air 2000');