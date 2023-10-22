var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -17.455895194368075,
                27.738174992008197
              ],
              [
                -20.532067069368075,
                15.767075557427306
              ],
              [
                -13.500817069368075,
                2.4340410259320935
              ],
              [
                6.098792305631924,
                1.2042160671321769
              ],
              [
                9.890459930470351,
                -16.007775799694475
              ],
              [
                13.581866180470351,
                -33.251530071080616
              ],
              [
                18.591631805470353,
                -36.77759235377977
              ],
              [
                29.05061618047035,
                -34.63680304821048
              ],
              [
                35.55452243047035,
                -26.080445168287014
              ],
              [
                42.40999118047035,
                -26.317029281153516
              ],
              [
                48.73811618047035,
                -26.7102631146145
              ],
              [
                51.32149544725678,
                -11.760974932095877
              ],
              [
                41.21407357225678,
                -5.770214997806113
              ],
              [
                50.00313607225678,
                3.4464416753734595
              ],
              [
                52.20040169725678,
                12.403231472694197
              ],
              [
                46.48751107225678,
                11.801674152678565
              ],
              [
                43.09808616680966,
                12.878948269370731
              ],
              [
                32.02386741680966,
                32.08507618935283
              ],
              [
                27.629336166809654,
                32.382454920617995
              ],
              [
                13.566836166809656,
                34.50898968520291
              ],
              [
                11.281679916809656,
                37.63397301482875
              ],
              [
                1.965273666809657,
                37.14515699849414
              ],
              [
                -6.472226333190343,
                35.80238861687417
              ]
            ]
          ],
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #d63000 */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[-17.455895194368075, 27.738174992008197],
          [-20.532067069368075, 15.767075557427306],
          [-13.500817069368075, 2.4340410259320935],
          [6.098792305631924, 1.2042160671321769],
          [9.890459930470351, -16.007775799694475],
          [13.581866180470351, -33.251530071080616],
          [18.591631805470353, -36.77759235377977],
          [29.05061618047035, -34.63680304821048],
          [35.55452243047035, -26.080445168287014],
          [42.40999118047035, -26.317029281153516],
          [48.73811618047035, -26.7102631146145],
          [51.32149544725678, -11.760974932095877],
          [41.21407357225678, -5.770214997806113],
          [50.00313607225678, 3.4464416753734595],
          [52.20040169725678, 12.403231472694197],
          [46.48751107225678, 11.801674152678565],
          [43.09808616680966, 12.878948269370731],
          [32.02386741680966, 32.08507618935283],
          [27.629336166809654, 32.382454920617995],
          [13.566836166809656, 34.50898968520291],
          [11.281679916809656, 37.63397301482875],
          [1.965273666809657, 37.14515699849414],
          [-6.472226333190343, 35.80238861687417]]]),
    borders = ui.import && ui.import("borders", "table", {
      "id": "USDOS/LSIB_SIMPLE/2017"
    }) || ee.FeatureCollection("USDOS/LSIB_SIMPLE/2017"),
    ROI = ui.import && ui.import("ROI", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                29.243454151889463,
                31.76293087887923
              ],
              [
                29.243454151889463,
                23.162795108951027
              ],
              [
                33.261703663608216,
                23.162795108951027
              ],
              [
                33.261703663608216,
                31.76293087887923
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #d63000 */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[29.243454151889463, 31.76293087887923],
          [29.243454151889463, 23.162795108951027],
          [33.261703663608216, 23.162795108951027],
          [33.261703663608216, 31.76293087887923]]], null, false),
    image73 = ui.import && ui.import("image73", "image", {
      "id": "users/kakooeimohammd/2018/Africa_2018_G112_01"
    }) || ee.Image("users/kakooeimohammd/2018/Africa_2018_G112_01"),
    image74 = ui.import && ui.import("image74", "image", {
      "id": "users/kakooeimohammd/2018/Africa_2018_G112_02"
    }) || ee.Image("users/kakooeimohammd/2018/Africa_2018_G112_02"),
    image75 = ui.import && ui.import("image75", "image", {
      "id": "users/kakooeimohammd/2018/Africa_2018_G112_03"
    }) || ee.Image("users/kakooeimohammd/2018/Africa_2018_G112_03"),
    image76 = ui.import && ui.import("image76", "image", {
      "id": "users/kakooeimohammd/2018/Africa_2018_G112_04"
    }) || ee.Image("users/kakooeimohammd/2018/Africa_2018_G112_04"),
    image77 = ui.import && ui.import("image77", "image", {
      "id": "users/kakooeimohammd/2018/Africa_2018_G112_05"
    }) || ee.Image("users/kakooeimohammd/2018/Africa_2018_G112_05");
//var imageVisParam = {"opacity":1,"bands":["B1"],"min":0,"max":1,"palette":["000000","ffded4","ffdead","e0ff95","7cff8c","6effa8","70fff2","5cbbff","788fff","8f60ff","9f62ff","d554ff","ff41aa","ff2763","ff0000"]};
var imageVisParam = {"opacity":1,"bands":["B1"],"min":0,"max":1,
"palette":["ff0000", "ff41aa","d554ff","8f60ff","788fff","5cbbff","70fff2",
"e0ff95","7cff8c","50ee99"]}; 
var Africa_list = borders.filter(ee.Filter.eq('wld_rgn','Africa')).sort('country_na').aggregate_array('country_na');
//print('Africa_list',Africa_list);
//Map.addLayer(borders.filter(ee.Filter.eq('country_na',Africa_list.get(33))),{},'borders',false);
// Map.centerObject(borders.filter(ee.Filter.eq('country_na',Africa_list.get(33))),15);
 var imageF2 = ee.ImageCollection.fromImages([image73,image74, image75,image76,image77]).max().rename('B1');
//Map.addLayer(imageF2,imageVisParam,'imageF2',false);
///////////////////////////////////////////////////////////////////////
 var CityCenter = /* color: #d63000 */ee.Geometry.Point([9.72, 16.75]);
// Map.centerObject(CityCenter,4);
// var CRSinfo = 'EPSG:32632';
 var CRSinfo = 'EPSG:4326';
// Create panels to hold lon/lat values.
var lon = ui.Label();
var lat = ui.Label();
//panel.add(ui.minLabel([lon, lat], ui.Panel.Layout.flow('horizontal')));
var panel = ui.Panel();
panel.style().set('width', '250px');
var Dates = {
  '2018 To 2019': ['2018-01-01','2020-01-01'],
};
var selectDate = ui.Select({
  style: {width: '200px'},
  placeholder: 'Select the desired date...',
  items: Object.keys(Dates),
  onChange: function(key) {
   // Map.layers().reset();
 //    start_date = ee.Date(Dates[key][0]);
//     stop_date = ee.Date(Dates[key][1]);
//     Date_index1 = Dates[key][0];
//     Date_index2 = Dates[key][1];
  }
});
/*
var places = {
  Beijing: [116.4386576304687,39.905744731816604,'Beijing','hand',0,0],
  Mexico: [-99.12533994426906,19.42810785771519,'Mexico','hand',0,0],
  Milan: [9.184083720947228,45.47812135157273,'Milan','hand',0,0],
  NewYork: [-74.11529806696655,40.6638355029954,'NewYork','hand',0,0],
  Rio: [-43.382435929375674,-22.80702839990601,'Rio','hand',0,0],
  Stockholm: [18.022221262206926,59.33443740876347,'Stockholm','hand',0,0],
  Others_Slow:[12.50825034085921, 41.869003889805526, 'Temp_App','crosshair',1,1]
};
*/
//var places = ee.Dictionary.fromLists(Africa_list, Africa_list).getInfo();
//print('places',places);
var places = {
'Africa Continent': ['Africa',0,'wld_rgn'],
'Abyei Area': ['Abyei Area',1,'country_na'],
Algeria: ['Algeria',1,'country_na'],
Angola: ['Angola',1,'country_na'],
Benin: ['Benin',1,'country_na'],
//'Bir Tawil': ['Bir Tawil',1,'country_na'],
Botswana: ['Botswana',1,'country_na'],
'Burkina Faso': ['Burkina Faso',1,'country_na'],
Burundi: ['Burundi',1,'country_na'],
//'Cabo Verde': ['Cabo Verde',1,'country_na'],
Cameroon: ['Cameroon',1,'country_na'],
'Central African Rep': ['Central African Rep',1,'country_na'],
Chad: ['Chad',1,'country_na'],
//Comoros: ['Comoros',1,'country_na'],
"Cote d'Ivoire": ["Cote d'Ivoire",1,'country_na'],
'Dem Rep of the Congo': ['Dem Rep of the Congo',1,'country_na'],
Djibouti: ['Djibouti',1,'country_na'],
Egypt: ['Egypt',1,'country_na'],
'Equatorial Guinea': ['Equatorial Guinea',1,'country_na'],
Eritrea: ['Eritrea',1,'country_na'],
Ethiopia: ['Ethiopia',1,'country_na'],
Gabon: ['Gabon',1,'country_na'],
'Gambia': ['Gambia, The',1,'country_na'],
Ghana: ['Ghana',1,'country_na'],
Guinea: ['Guinea',1,'country_na'],
'Guinea-Bissau': ['Guinea-Bissau',1,'country_na'],
'Halaib Triangle': ['Halaib Triangle',1,'country_na'],
Kenya: ['Kenya',1,'country_na'],
//'Koualou Area': ['Koualou Area',1,'country_na'],
Lesotho: ['Lesotho',1,'country_na'],
Liberia: ['Liberia',1,'country_na'],
Libya: ['Libya',1,'country_na'],
Madagascar: ['Madagascar',1,'country_na'],
Malawi: ['Malawi',1,'country_na'],
Mali: ['Mali',1,'country_na'],
Mauritania: ['Mauritania',1,'country_na'],
//Mayotte: ['Mayotte',1,'country_na'],
Morocco: ['Morocco',1,'country_na'],
Mozambique: ['Mozambique',1,'country_na'],
Namibia: ['Namibia',1,'country_na'],
Niger: ['Niger',1,'country_na'],
Nigeria: ['Nigeria',1,'country_na'],
//'Portugal (Madeira Is)': ['Portugal (Madeira Is)',1,'country_na'],
'Rep of the Congo': ['Rep of the Congo',1,'country_na'],
Rwanda: ['Rwanda',1,'country_na'],
//'Sao Tome & Principe': ['Sao Tome & Principe',1,'country_na'],
Senegal: ['Senegal',1,'country_na'],
'Sierra Leone': ['Sierra Leone',1,'country_na'],
Somalia: ['Somalia',1,'country_na'],
'South Africa': ['South Africa',1,'country_na'],
'South Sudan': ['South Sudan',1,'country_na'],
'Spain (Africa)': ['Spain (Africa)',1,'country_na'],
'Spain (Canary Is)': ['Spain (Canary Is)',1,'country_na'],
Sudan: ['Sudan',1,'country_na'],
Swaziland: ['Swaziland',1,'country_na'],
Tanzania: ['Tanzania',1,'country_na'],
Togo: ['Togo',1,'country_na'],
Tunisia: ['Tunisia',1,'country_na'],
Uganda: ['Uganda',1,'country_na'],
'Western Sahara': ['Western Sahara',1,'country_na'],
Zambia: ['Zambia',1,'country_na'],
Zimbabwe: ['Zimbabwe',1,'country_na']
};
var leftMap = ui.Map();
var rightMap = ui.Map();
var splitPanel = ui.SplitPanel({
  firstPanel: leftMap,
  secondPanel: rightMap,
  wipe: true,
  style: {stretch: 'both'}
}); 
ui.root.widgets().reset([splitPanel]);
var linker = ui.Map.Linker([leftMap, rightMap]);
///////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '6px 15px'
  }
});
// Create and add the legend title.
var legendTitle = ui.Label({
  value: 'Wealth Index',
  style: {
    fontWeight: 'bold',
    fontSize: '12px',
    margin: '0 0 2px 0',
    padding: '0'
  }
});
legend.add(legendTitle);
// Creates and styles 1 row of the legend.
var makeRow = function(color, name) {
  // Create the label that is actually the colored box.
  var colorBox = ui.Label({
    style: {
      backgroundColor: '#' + color,
      // Use padding to give the box height and width.
      padding: '11px',
      margin: '0 0 0 0'
    }
  });
   // Create the label filled with the description text.
  var description = ui.Label({
    value: name,
    style: {margin: '0 0 4px 6px'}
  });
  return ui.Panel({
    widgets: [colorBox, description],
    layout: ui.Panel.Layout.Flow('horizontal')
  });
};
var palette = ["ff0000", "ff41aa","d554ff","8f60ff","788fff","5cbbff","70fff2",
"e0ff95","7cff8c","50ee99" ]
//var palette = ["000000","ffff00","00ff00","00ffff","00bfff","8000ff","ff00bf","ff0000"];
var names = ['0',' ','','','','','','','','1'];
  for (var i = 0; i < 10; i++) {
    legend.add(makeRow(palette[i], names[i]));
  }
  var legendTitle2 = ui.Label({
  value: 'The AI and Global Development Lab',
  style: {
    position: 'bottom-right',
    fontWeight: 'bold',
    fontSize: '16px',
    margin: '0 0 20px 0',
    padding: '0'
  },
  targetUrl: 'https://liu.se/en/research/global-lab-ai'
});
// Add the legend to the map.
leftMap.add(legend);
rightMap.add(legendTitle2);
leftMap.centerObject(CityCenter,4);
///////////////////////////////////////////////////////////////////////////
var key1 = 0;
var select = ui.Select({
  style: {width: '200px'},
  placeholder: 'Select a region...',
  items: Object.keys(places),
  onChange: function(key) {
    var Geo = borders.filter(ee.Filter.eq(places[key][2],places[key][0]));
    leftMap.layers().reset();
    leftMap.setControlVisibility(false);
    leftMap.setOptions('ROADMAP');
    leftMap.addLayer(imageF2.clip(Geo),imageVisParam,key);
    leftMap.centerObject(Geo, places[key][1]*3+3);
    leftMap.style().set('cursor','hand');
    // Create the right map, and have it display layer 1.
    rightMap.setControlVisibility(false);
    rightMap.setOptions('HYBRID');
    key1 = key;
  }
});
panel.add(selectDate);
panel.add(select);
ui.root.insert(0, panel);