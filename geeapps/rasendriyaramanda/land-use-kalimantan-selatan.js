var kalsel = ui.import && ui.import("kalsel", "table", {
      "id": "users/rasendriyaramanda/Kal_Sel"
    }) || ee.FeatureCollection("users/rasendriyaramanda/Kal_Sel");
//var igbpLandCover = ee.ImageCollection('MODIS/006/MCD12Q1')
                     //.filter(ee.Filter.date('2019-01-01', '2019-12-31'))
                     //.select('LC_Type1');
var dataset = ee.ImageCollection('MODIS/006/MCD12Q1');
var igbpLandCover = dataset.select('LC_Type1');
var spatialFiltered = igbpLandCover.filterBounds(kalsel);
// Menentukan waktu perekaman data yang diinginkan
var thn2010 = spatialFiltered.filterDate('2010-01-01', '2010-12-31');
var thn2011 = spatialFiltered.filterDate('2011-01-01', '2011-12-31');
var thn2012 = spatialFiltered.filterDate('2012-01-01', '2012-12-31');
var thn2013 = spatialFiltered.filterDate('2013-01-01', '2013-12-31');
var thn2014 = spatialFiltered.filterDate('2014-01-01', '2014-12-31');
var thn2015 = spatialFiltered.filterDate('2015-01-01', '2015-12-31');
var thn2016 = spatialFiltered.filterDate('2016-01-01', '2016-12-31');
var thn2017 = spatialFiltered.filterDate('2017-01-01', '2017-12-31');
var thn2018 = spatialFiltered.filterDate('2018-01-01', '2018-12-31');
var thn2019 = spatialFiltered.filterDate('2019-01-01', '2019-12-31');
var median2010 = thn2011.median();
var median2011 = thn2012.median();
var median2012 = thn2013.median();
var median2013 = thn2014.median();
var median2014 = thn2015.median();
var median2015 = thn2016.median();
var median2016 = thn2016.median();
var median2017 = thn2017.median();
var median2018 = thn2018.median();
var median2019 = thn2019.median();
//Clipping
var image2010= median2010.clip(kalsel);
var image2011= median2011.clip(kalsel);
var image2012= median2012.clip(kalsel);
var image2013= median2013.clip(kalsel);
var image2014= median2014.clip(kalsel);
var image2015= median2015.clip(kalsel);
var image2016= median2016.clip(kalsel);
var image2017= median2017.clip(kalsel);
var image2018= median2018.clip(kalsel);
var image2019= median2019.clip(kalsel);
var igbpLandCoverVis = {
  min: 1.0,
  max: 17.0,
  palette: [
     '05450a', //hitam
    '086a10', //hijau tua banget
    '54a708', //hijau tua
    '78d203', //hijau muda
    '009900', //hijau tua juga astaga
    'c6b044', //coklat tai kuda
    'dcd159', //coklat muda tai kuda
    'dade48', //hijau army muda //vegetasi renggang
    'fbff13', // kuning
    'b6ff05', //hijau muda biasa
    '27ff87', //hijau muda terang stabilo
    'c24f44', //maroon // permukiman padat
    'a5a5a5', //abu-abu // lahan terbuka gersang
    'ff6d4c', //orange // permukiman renggang
    '69fff8', //mint
    'f9ffa4', //kuning muda
    '1c0dff' //biru tua //air
  ],
};
Map.centerObject(kalsel,7);
Map.addLayer(image2010, igbpLandCoverVis, 'Land Cover 2010');
Map.addLayer(image2011, igbpLandCoverVis, 'Land Cover 2011');
Map.addLayer(image2012, igbpLandCoverVis, 'Land Cover 2012');
Map.addLayer(image2013, igbpLandCoverVis, 'Land Cover 2013');
Map.addLayer(image2014, igbpLandCoverVis, 'Land Cover 2014');
Map.addLayer(image2015, igbpLandCoverVis, 'Land Cover 2015');
Map.addLayer(image2016, igbpLandCoverVis, 'Land Cover 2016');
Map.addLayer(image2017, igbpLandCoverVis, 'Land Cover 2017');
Map.addLayer(image2018, igbpLandCoverVis, 'Land Cover 2018');
Map.addLayer(image2019, igbpLandCoverVis, 'Land Cover 2019');
/*
  '1f8dff',//water // biru tua
  '152106',// hitam // evergreen needleaf forests
  '225129',//hijau tua banget // evergreen broadleaf forests
  '369b47',//hijau sedeng // deciduous needleleaf forests
  '30eb5b',//hijau terang // deciduoud broadleaf forests
  '387242',// hijau tua dibawahnya hijau tua // mixed deciduous forests
  '6a2325',//maroon// closed shrubland
  'c3aa69',//coklat seragam atasnya pramuka // openshrubland
  'b76031',//coklat bata // woody savanna
  'd9903d',//coklat cadburry // savanna
  '91af40',//hijau army // grasslands
  '111149',//biru dongker // permanenet wetlands
  'cdb33b', //hijau army muda // croplands
  'cc0013', //merah //urban
  '33280d', //crop/natural veg. mosaic
  'd7cdcc',//permanent snow/ice
  'f7e084', //barren/desert
     '05450a', //hitam
    '086a10', //hijau tua banget
    '54a708', //hijau tua
    '78d203', //hijau muda
    '009900', //hijau tua juga astaga
    'c6b044', //coklat tai kuda
    'dcd159', //coklat muda tai kuda
    'dade48', //hijau army muda //vegetasi renggang
    'fbff13', // kuning
    'b6ff05', //hijau muda biasa
    '27ff87', //hijau muda terang stabilo
    'c24f44', //maroon // permukiman padat
    'a5a5a5', //abu-abu // lahan terbuka gersang
    'ff6d4c', //orange // permukiman renggang
    '69fff8', //mint
    'f9ffa4', //kuning muda
    '1c0dff' //biru tua //air
    'FFFFFF', 'CE7E45', 'DF923D', 'F1B555', 'FCD163', '99B718', '74A901',
    '66A000', '529400', '3E8601', '207401', '056201', '004C00', '023B01',
    '012E01', '011D01', '011301'
  */
  //==========================================================================================
//Widget
// Make left and right maps.
var leftMap = ui.Map();
var rightMap = ui.Map();
// Make predefined data layers that can be selected.
var Img2010 = ui.Map.Layer(image2010, igbpLandCoverVis);
var Img2011 = ui.Map.Layer(image2011, igbpLandCoverVis);
var Img2012 = ui.Map.Layer(image2012, igbpLandCoverVis);
var Img2013 = ui.Map.Layer(image2013, igbpLandCoverVis);
var Img2014 = ui.Map.Layer(image2014, igbpLandCoverVis);
var Img2015 = ui.Map.Layer(image2015, igbpLandCoverVis);
var Img2016 = ui.Map.Layer(image2016, igbpLandCoverVis);
var Img2017 = ui.Map.Layer(image2017, igbpLandCoverVis);
var Img2018 = ui.Map.Layer(image2018, igbpLandCoverVis);
var Img2019 = ui.Map.Layer(image2019, igbpLandCoverVis);
// Add default layers to maps.
leftMap.add(Img2010);
rightMap.add(Img2019);
// Link the maps
var linkedMaps = ui.Map.Linker([leftMap, rightMap]);
// Create a SplitPanel which holds the linked maps side-by-side.
var splitPanel = ui.SplitPanel({
  firstPanel: linkedMaps.get(0),
  secondPanel: linkedMaps.get(1),
  orientation: 'horizontal',
  wipe: true,
  style: {stretch: 'both'}
});
// Make a list of image layers to select from.
var layers = ['Tahun 2011','Tahun 2012','Tahun 2013', 'Tahun 2014', 'Tahun 2015', 'Tahun 2016', 'Tahun 2017', 'Tahun 2018','Tahun 2019'];
// Make a function that will retrieve a layer based on selection.
function getLayer(selection) {
  var layer = Img2010;
  if(selection == 'Tahun 2016') {
    layer = Img2016;
  } else if(selection == 'Tahun 2019'){
    layer = Img2019;
  }else if(selection == 'Tahun 2013'){
    layer = Img2013;
  }else if(selection == 'Tahun 2014'){
    layer = Img2014;
  }else if(selection == 'Tahun 2015'){
    layer = Img2015;
  }else if(selection == 'Tahun 2017'){
    layer = Img2017;
  }else if(selection == 'Tahun 2018'){
    layer = Img2018;
  }else if(selection == 'Tahun 2011'){
    layer = Img2011;
  }else if(selection == 'Tahun 2012'){
    layer = Img2012;
}
  return layer;
}
// Make a callback function for when a selection is made for left map.
function selectLeftOnChange(selection) {
  leftMap.layers().set(0, getLayer(selection));
}
// Make a callback function for when a selection is made for right map.
function selectRightOnChange(selection) {
  rightMap.layers().set(0, getLayer(selection));
}
// Define selection buttons for left and right map layers.
var selectLeft = ui.Select(layers, 'Tahun 2011', 'Tahun 2011', selectLeftOnChange, false, {position: 'top-left'});
var selectRight = ui.Select(layers, 'Tahun 2019', 'Tahun 2019', selectRightOnChange, false, {position: 'top-right'});
// Clear the root, add the splitPanel, and buttons.
ui.root.clear();
ui.root.add(splitPanel);
leftMap.add(selectLeft);
rightMap.add(selectRight);
leftMap.centerObject(kalsel, 10);