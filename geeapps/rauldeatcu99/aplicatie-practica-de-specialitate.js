var valea = ui.import && ui.import("valea", "table", {
      "id": "users/rauldeatcu99/ValeaPrahovei"
    }) || ee.FeatureCollection("users/rauldeatcu99/ValeaPrahovei");
Map.setCenter(25.552676638392445,45.34667747589021, 10.20)
Map.drawingTools().setShown(false);
var roi = valea.geometry()
Map.addLayer(valea.draw({color: 'black', strokeWidth: 10}),{},"Limita arealului de studiu")
var srtm = ee.Image("USGS/SRTMGL1_003");
var hillshade = ee.Terrain.hillshade(srtm).clip(valea);
Map.addLayer(hillshade, {min:150, max:255,}, 'Hillshade');
//date pentru GIF
var img1987 = ee.Image('LANDSAT/LT05/C01/T1_SR/LT05_183029_19870914').clip(valea)
var img1992 = ee.Image('LANDSAT/LT05/C01/T1_SR/LT05_183029_19920927').clip(valea)
var img1998 = ee.Image('LANDSAT/LT05/C01/T1_SR/LT05_183029_19980912').clip(valea)
var img2000 = ee.Image('LANDSAT/LE07/C01/T1_SR/LE07_183029_20000909').clip(valea)
var img2001 = ee.Image('LANDSAT/LE07/C01/T1_SR/LE07_183029_20011014').clip(valea)
var img2004 = ee.Image('LANDSAT/LT05/C01/T1_SR/LT05_183029_20040912').clip(valea)
var img2006 = ee.Image('LANDSAT/LT05/C01/T1_SR/LT05_183029_20061004').clip(valea)
var img2010 = ee.Image('LANDSAT/LT05/C01/T1_SR/LT05_183029_20101031').clip(valea)
var img2015 = ee.Image('LANDSAT/LC08/C01/T1_SR/LC08_183029_20151029').clip(valea)
var img2017 = ee.Image('LANDSAT/LC08/C01/T1_SR/LC08_183029_20170831').clip(valea)
var img2018 = ee.Image('LANDSAT/LC08/C01/T1_SR/LC08_183029_20180919').clip(valea)
var img2019 = ee.Image('LANDSAT/LC08/C01/T1_SR/LC08_183029_20190922').clip(valea)
var rawCollection = ee.ImageCollection ([img1987, img1992, img1998, img2000, img2001, img2004, img2006,
                                         img2010, img2015, img2017, img2018, img2019])
var args1 = {
  crs:'EPSG:3857',
  region: roi,
  bands: ['B3', 'B2', 'B1'],
  min: 0,
  max: 3000,
  gamma: 1.4,
  framesPerSecond: 5,
};
var thumb1 = ui.Thumbnail({
  image: rawCollection,
  params: args1,
  style: {
    position: 'bottom-center',
    width: '200px'
  }});
//Panouri
var legenda = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
  style: {width: '130px', height: '500px',position: 'bottom-left'}
});
Map.add(legenda)
var legenda2 = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
  style: {width: '110px', height: '380px',position: 'bottom-right'}
});
Map.add(legenda2)
var panel = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
  style: {width: '255px', height: '160px',position: 'top-right'}
});
Map.add(panel)
var mesaj1 = ui.Label('GHID', {fontWeight:'bold', color:'red', fontSize:'15px'})
panel.add(mesaj1)
var mesajj = ui.Label('Pentru a vizualiza datele, accesați ”Layers” din colțul drept, sus.', { fontSize:'10px'})
panel.add(mesajj)
var mesajjj = ui.Label('Cele 4 animații prezente în josul ecranului reprezintă, de la dreapta la stânga:', { fontSize:'10px'})
panel.add(mesajjj)
var mesajjjj = ui.Label('1. Dinamica utilizării terenului în perioada 1990-2018', { fontSize:'10px'})
panel.add(mesajjjj)
var mesajjjjj = ui.Label('2. Scimbarea arealului de studiu prin imagini satelitare, 1987-2019', { fontSize:'10px'})
panel.add(mesajjjjj)
var mesajjjjjj = ui.Label('3. Dinamica indicelui de umiditate (NDMI) în perioada 1987-2019', { fontSize:'10px'})
panel.add(mesajjjjjj)
var mesajjjjjjj = ui.Label('4. Modificarea indicelui de vegetație (NDVI) în intervalul de timp 1987-2019', { fontSize:'10px'})
panel.add(mesajjjjjjj)
var mesajjjjjjjj = ui.Label('NOTĂ: Pentru animațiile 3 și 4, nuanțele deschise redau prezența vegetației, respectiv umiditate puternică. Iar nuanțele închise ilustrează lipsa vegetației sau o umiditate scăzută', { fontSize:'10px'})
panel.add(mesajjjjjjjj)
var creditUVT0 = ui.Label('Universitatea de Vest din Timișoara', {position:'bottom-center'});
var creditUVT1 = ui.Label('Facultatea de Chimie, Biologie, Geografie', {position:'bottom-center'});
var creditUVT2 = ui.Label('Departamentul de Geografie', {position:'bottom-center'});
var label0 = ui.Label('_________________Autor: Raul DEATCU________________', {position:'bottom-center',fontWeight:'bold', width: '350px'});
var label2 = ui.Label('Acoperirea terenului în Valea Prahovei (1990 - 2018) și modificările antropice (2016)', {position:'top-center', fontSize:'18px',fontWeight:'bold', color:'green'});
Map.add(label2);
var dataset = ee.ImageCollection('CSP/HM/GlobalHumanModification');
var visualization = {
  bands: ['gHM'],
  min: 0.0,
  max: 1.0,
  palette: ['#ffffff', '#ffffff', '#95ff00', '#feff00', '#ffb200', '#ff0000'],
  opacity: 0.5
};
Map.addLayer(dataset, visualization, 'Modificare antropică').setShown(0)
var image1990 = ee.Image("COPERNICUS/CORINE/V20/100m/1990").clip(valea)
var image2000 = ee.Image("COPERNICUS/CORINE/V20/100m/2000").clip(valea)
var image2006 = ee.Image("COPERNICUS/CORINE/V20/100m/2006").clip(valea)
var image2012 = ee.Image("COPERNICUS/CORINE/V20/100m/2012").clip(valea)
var image2018 = ee.Image("COPERNICUS/CORINE/V20/100m/2018").clip(valea)
Map.addLayer(image1990,{}, "Acoperirea terenului în 1990").setShown(0).setOpacity(0.5)
Map.addLayer(image2000,{}, "Acoperirea terenului în 2000").setShown(0).setOpacity(0.5)
Map.addLayer(image2006,{}, "Acoperirea terenului în 2006").setShown(0).setOpacity(0.5)
Map.addLayer(image2012,{}, "Acoperirea terenului în 2012").setShown(0).setOpacity(0.5)
Map.addLayer(image2018,{}, "Acoperirea terenului în 2018").setOpacity(0.5)
//GIF terenuri
var classCollection = ee.ImageCollection([image1990, image2000, image2006, image2012, image2018]);
var args2 = {
  crs:'EPSG:3857',
  region: roi,
  //min: -2000,
  //max: 10000,
  //palette: 'black, blanchedalmond, green, green',
  framesPerSecond: 3,
};
var thumb2 = ui.Thumbnail({
  // Specifying a collection for "image" animates the sequence of images.,
  image: classCollection,
  params: args2,
  style: {
    position: 'bottom-center',
    width: '200px'
  }});
Map.add(thumb2);
Map.add(thumb1);
Map.add(label0);
//Legenda1
var titluL1 = ui.Label('LEGENDĂ', {fontSize:'20px', fontWeight:'bold'})
legenda.add(titluL1)
var subtitluL1 = ui.Label('Tipurile de acoperire a terenului', {fontSize:'10px', fontWeight:'bold'})
legenda.add(subtitluL1)
var l0 = ui.Label('■', {fontWeight:'bold',fontSize:'40px', color:'E6004D'})
legenda.add(l0)
var l0m = ui.Label('Așezări umane continue', {fontSize:'10px'})
legenda.add(l0m)
var l1 = ui.Label('■', {fontWeight:'bold',fontSize:'40px', color:'FF0000'})
legenda.add(l1)
var l1m = ui.Label('Așezări umane discontinue', {fontSize:'10px'})
legenda.add(l1m)
var l2 = ui.Label('■', {fontWeight:'bold',fontSize:'40px', color:'CC4DF2'})
legenda.add(l2)
var l2m = ui.Label('Industire/centre comerciale', {fontSize:'10px'})
legenda.add(l2m)
var l3 = ui.Label('■', {fontWeight:'bold',fontSize:'40px', color:'CC0000'})
legenda.add(l3)
var l3m = ui.Label('Rețea drumuri/căi ferate', {fontSize:'10px'})
legenda.add(l3m)
var l32 = ui.Label('■', {fontWeight:'bold',fontSize:'40px', color:'FFA6FF'})
legenda.add(l32)
var l32m = ui.Label('Zone urbane verzi', {fontSize:'10px'})
legenda.add(l32m)
var l4 = ui.Label('■', {fontWeight:'bold',fontSize:'40px', color:'FFE6FF'})
legenda.add(l4)
var l4m = ui.Label('Sport/agrement', {fontSize:'10px'})
legenda.add(l4m)
var l5 = ui.Label('■', {fontWeight:'bold',fontSize:'40px', color:'F2A64D'})
legenda.add(l5)
var l5m = ui.Label('Copaci fructiferi', {fontSize:'10px'})
legenda.add(l5m)
var l6 = ui.Label('■', {fontWeight:'bold',fontSize:'40px', color:'E6E64D'})
legenda.add(l6)
var l6m = ui.Label('Pășuni', {fontSize:'10px'})
legenda.add(l6m)
var l7 = ui.Label('■', {fontWeight:'bold',fontSize:'40px', color:'FFE64D'})
legenda.add(l7)
var l7m = ui.Label('Cultivații complexe', {fontSize:'10px'})
legenda.add(l7m)
var l8 = ui.Label('■', {fontWeight:'bold',fontSize:'40px', color:'E6CC4D'})
legenda.add(l8)
var l8m = ui.Label('Teren principal ocupat de agricultură', {fontSize:'10px'})
legenda.add(l8m)
var l82 = ui.Label('■', {fontWeight:'bold',fontSize:'40px', color:'F2CCA6'})
legenda.add(l82)
var l82m = ui.Label('Agropăduri', {fontSize:'10px'})
legenda.add(l82m)
var l9 = ui.Label('■', {fontWeight:'bold',fontSize:'40px', color:'80FF00'})
legenda.add(l9)
var l9m = ui.Label('Pădure deasă', {fontSize:'10px'})
legenda.add(l9m)
var l10 = ui.Label('■', {fontWeight:'bold',fontSize:'40px', color:'00A600'})
legenda.add(l10)
var l10m = ui.Label('Pădure de conifere', {fontSize:'10px'})
legenda.add(l10m)
var l11 = ui.Label('■', {fontWeight:'bold',fontSize:'40px', color:'4DFF00'})
legenda.add(l11)
var l11m = ui.Label('Pădure mixtă', {fontSize:'10px'})
legenda.add(l11m)
var l12 = ui.Label('■', {fontWeight:'bold',fontSize:'40px', color:'CCF24D'})
legenda.add(l12)
var l12m = ui.Label('Pajiște naturală', {fontSize:'10px'})
legenda.add(l12m)
var l13 = ui.Label('■', {fontWeight:'bold',fontSize:'40px', color:'A6FF80'})
legenda.add(l13)
var l13m = ui.Label('Mauri', {fontSize:'10px'})
legenda.add(l13m)
var l14 = ui.Label('■', {fontWeight:'bold',fontSize:'40px', color:'A6F200'})
legenda.add(l14)
var l14m = ui.Label('Tranzitie pădure-arbuști', {fontSize:'10px'})
legenda.add(l14m)
var l15 = ui.Label('■', {fontWeight:'bold',fontSize:'40px', color:'E6E6E6'})
legenda.add(l15)
var l15m = ui.Label('Nisip', {fontSize:'10px'})
legenda.add(l15m)
var l16 = ui.Label('■', {fontWeight:'bold',fontSize:'40px', color:'CCCCCC'})
legenda.add(l16)
var l16m = ui.Label('Roci goale', {fontSize:'10px'})
legenda.add(l16m)
var l162 = ui.Label('■', {fontWeight:'bold',fontSize:'40px', color:'CCFFCC'})
legenda.add(l162)
var l162m = ui.Label('Zone slab vegetate', {fontSize:'10px'})
legenda.add(l162m)
var l17 = ui.Label('■', {fontWeight:'bold',fontSize:'40px', color:'00CCF2'})
legenda.add(l17)
var l17m = ui.Label('Curs de apă', {fontSize:'10px'})
legenda.add(l17m)
//Legenda2
var titluL2 = ui.Label('LEGENDĂ', {fontSize:'15px', fontWeight:'bold'})
legenda2.add(titluL2)
var subtitluL2 = ui.Label('Rata modificării antropice', {fontSize:'10px', fontWeight:'bold'})
legenda2.add(subtitluL2)
var ll1 = ui.Label('■', {fontWeight:'bold',fontSize:'40px', color:'#ff0000'})
legenda2.add(ll1)
var ll1m = ui.Label('80% - 100%', {fontSize:'10px'})
legenda2.add(ll1m)
var ll2 = ui.Label('■', {fontWeight:'bold',fontSize:'40px', color:'#ffb200'})
legenda2.add(ll2)
var ll2m = ui.Label('60% - 79.9%', {fontSize:'10px'})
legenda2.add(ll2m)
var ll3 = ui.Label('■', {fontWeight:'bold',fontSize:'40px', color:'#feff00'})
legenda2.add(ll3)
var ll3m = ui.Label('40% - 59.9%', {fontSize:'10px'})
legenda2.add(ll3m)
var ll4 = ui.Label('■', {fontWeight:'bold',fontSize:'40px', color:'#95ff00'})
legenda2.add(ll4)
var ll4m = ui.Label('20% - 39.9%', {fontSize:'10px'})
legenda2.add(ll4m)
var ll4 = ui.Label('□', {fontWeight:'bold',fontSize:'40px'})
legenda2.add(ll4)
var ll4m = ui.Label('0% - 19.9%', {fontSize:'10px'})
legenda2.add(ll4m)
//NDVI
var ndvi1987 = img1987.normalizedDifference(['B4', 'B3'])
var ndvi1992 = img1992.normalizedDifference(['B4', 'B3'])
var ndvi1998 = img1998.normalizedDifference(['B4', 'B3'])
var ndvi2000 = img2000.normalizedDifference(['B4', 'B3'])
var ndvi2001 = img2001.normalizedDifference(['B4', 'B3'])
var ndvi2004 = img2004.normalizedDifference(['B4', 'B3'])
var ndvi2006 = img2006.normalizedDifference(['B4', 'B3'])
var ndvi2010 = img2010.normalizedDifference(['B4', 'B3'])
var ndvi2015 = img2015.normalizedDifference(['B5', 'B4'])
var ndvi2017 = img2017.normalizedDifference(['B5', 'B4'])
var ndvi2018 = img2018.normalizedDifference(['B5', 'B4'])
var ndvi2019 = img2019.normalizedDifference(['B5', 'B4'])
var ndviCollection = ee.ImageCollection([ndvi1987, ndvi1992, ndvi1998, ndvi2000, ndvi2001, ndvi2004, ndvi2006,
                                         ndvi2010, ndvi2015, ndvi2017, ndvi2018, ndvi2019]);
var argsNDVI = {
  crs:'EPSG:3857',
  region: roi,
  min: 0.4,
  max: 1,
  palette: '#000000, #333333,#666666,#999999,#cccccc,#ffffff',
  framesPerSecond: 3
};
var thumbNDVI = ui.Thumbnail({
  image: ndviCollection,
  params: argsNDVI,
  style: {
    position: 'bottom-center',
    width: '200px'
  }});
Map.add(thumbNDVI)
//NDMI
var ndmi1987 = img1987.normalizedDifference(['B4', 'B5'])
var ndmi1992 = img1992.normalizedDifference(['B4', 'B5'])
var ndmi1998 = img1998.normalizedDifference(['B4', 'B5'])
var ndmi2000 = img2000.normalizedDifference(['B4', 'B5'])
var ndmi2001 = img2001.normalizedDifference(['B4', 'B5'])
var ndmi2004 = img2004.normalizedDifference(['B4', 'B5'])
var ndmi2006 = img2006.normalizedDifference(['B4', 'B5'])
var ndmi2010 = img2010.normalizedDifference(['B4', 'B5'])
var ndmi2015 = img2015.normalizedDifference(['B5', 'B6'])
var ndmi2017 = img2017.normalizedDifference(['B5', 'B6'])
var ndmi2018 = img2018.normalizedDifference(['B5', 'B6'])
var ndmi2019 = img2019.normalizedDifference(['B5', 'B6'])
var ndmiCollection = ee.ImageCollection([ndmi1987, ndmi1992, ndmi1998, ndmi2000, ndmi2001, ndmi2004, ndmi2006,
                                         ndmi2010, ndmi2015, ndmi2017, ndmi2018, ndmi2019]);
var argsNDMI = {
  crs:'EPSG:3857',
  region: roi,
  min: -0.55,
  max: 0.47,
  palette: '#000000, #333333,#666666,#999999,#cccccc,#ffffff',
  framesPerSecond: 3
};
var thumbNDMI = ui.Thumbnail({
  image: ndmiCollection,
  params: argsNDMI,
  style: {
    position: 'bottom-center',
    width: '200px'
  }});
Map.add(thumbNDMI)