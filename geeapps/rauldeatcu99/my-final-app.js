//Codul de import pentru geometrie (dedesupt) si geometria importata (sus)
//Import code for geometry (below) and imported geometry (above)
var poly = /* color: #98ff00 */ee.Geometry.Polygon(
       [[[30.6267705187513, 36.85059682096583],
         [30.629860423536456, 36.85289762981703],
         [30.62256481501595, 36.857670728808856],
         [30.619431994886554, 36.85471762358329]]]);
//Selectarea colectiei de imagini si filtrarea acesteia pe data si scena si afisarea acesteia in consola
//Image collection sellection and filter it by date,path and row and print it in the console
var collection = ee.ImageCollection('LANDSAT/LC08/C01/T1_TOA')
  .filterDate('2013-08-01', '2019-10-01')
  .filter(ee.Filter.eq('WRS_PATH', 178))
  .filter(ee.Filter.eq('WRS_ROW', 34))
var panel = ui.Panel();
panel.style().set({
  width: '150px',
  height: '150px',
  position: 'bottom-left'
});
Map.add(panel);
//Selectarea scenei din rezultatele filtrate a colectiei de imagini
//Selection of our interest scene from scene collection
//2013 image collection
var january2013 = ee.Image('LANDSAT/LC08/C01/T1_TOA/LC08_178034_20130427');
var february2013 = ee.Image('LANDSAT/LC08/C01/T1_TOA/LC08_178034_20141007');
var march2013 = ee.Image('LANDSAT/LC08/C01/T1_TOA/LC08_178034_20151010');
var april2013 = ee.Image('LANDSAT/LC08/C01/T1_TOA/LC08_178034_20130427');
var may2013 = ee.Image('LANDSAT/LC08/C01/T1_TOA/LC08_178034_20130513');
var june2013 = ee.Image('LANDSAT/LC08/C01/T1_TOA/LC08_178034_20130630');
var july2013 = ee.Image('LANDSAT/LC08/C01/T1_TOA/LC08_178034_20130716');
var august2013 = ee.Image('LANDSAT/LC08/C01/T1_TOA/LC08_178034_20130817');
var september2013 = ee.Image('LANDSAT/LC08/C01/T1_TOA/LC08_178034_20130902');
var october2013 = ee.Image('LANDSAT/LC08/C01/T1_TOA/LC08_178034_20131020');
var november2013 = ee.Image('LANDSAT/LC08/C01/T1_TOA/LC08_178034_20131121');
var december2013 = ee.Image('LANDSAT/LC08/C01/T1_TOA/LC08_178034_20131223');
//2014 image collection
var january2014 = ee.Image('LANDSAT/LC08/C01/T1_TOA/LC08_178034_20140124');
var february2014 = ee.Image('LANDSAT/LC08/C01/T1_TOA/LC08_178034_20140209');
var march2014 = ee.Image('LANDSAT/LC08/C01/T1_TOA/LC08_178034_20140329');
var april2014 = ee.Image('LANDSAT/LC08/C01/T1_TOA/LC08_178034_20140414');
var may2014 = ee.Image('LANDSAT/LC08/C01/T1_TOA/LC08_178034_20140516');
var june2014 = ee.Image('LANDSAT/LC08/C01/T1_TOA/LC08_178034_20140617');
var july2014 = ee.Image('LANDSAT/LC08/C01/T1_TOA/LC08_178034_20140703');
var august2014 = ee.Image('LANDSAT/LC08/C01/T1_TOA/LC08_178034_20140804');
var september2014 = ee.Image('LANDSAT/LC08/C01/T1_TOA/LC08_178034_20140921');
var october2014 = ee.Image('LANDSAT/LC08/C01/T1_TOA/LC08_178034_20141007');
var november2014 = ee.Image('LANDSAT/LC08/C01/T1_TOA/LC08_178034_20141124');
var december2014 = ee.Image('LANDSAT/LC08/C01/T1_TOA/LC08_178034_20141226');
//2015 image collection
var january2015 = ee.Image('LANDSAT/LC08/C01/T1_TOA/LC08_178034_20150127');
var february2015 = ee.Image('LANDSAT/LC08/C01/T1_TOA/LC08_178034_20150212');
var march2015 = ee.Image('LANDSAT/LC08/C01/T1_TOA/LC08_178034_20150316');
var april2015 = ee.Image('LANDSAT/LC08/C01/T1_TOA/LC08_178034_20150417');
var may2015 = ee.Image('LANDSAT/LC08/C01/T1_TOA/LC08_178034_20150519');
var june2015 = ee.Image('LANDSAT/LC08/C01/T1_TOA/LC08_178034_20150620');
var july2015 = ee.Image('LANDSAT/LC08/C01/T1_TOA/LC08_178034_20150722');
var august2015 = ee.Image('LANDSAT/LC08/C01/T1_TOA/LC08_178034_20150807');
var september2015 = ee.Image('LANDSAT/LC08/C01/T1_TOA/LC08_178034_20150908');
var october2015 = ee.Image('LANDSAT/LC08/C01/T1_TOA/LC08_178034_20151010');
var november2015 = ee.Image('LANDSAT/LC08/C01/T1_TOA/LC08_178034_20151111');
var december2015 = ee.Image('LANDSAT/LC08/C01/T1_TOA/LC08_178034_20151213');
//2016 image collection
var january2016 = ee.Image('LANDSAT/LC08/C01/T1_TOA/LC08_178034_20160130');
var february2016 = ee.Image('LANDSAT/LC08/C01/T1_TOA/LC08_178034_20160215');
var march2016 = ee.Image('LANDSAT/LC08/C01/T1_TOA/LC08_178034_20160318');
var april2016 = ee.Image('LANDSAT/LC08/C01/T1_TOA/LC08_178034_20160403');
var may2016 = ee.Image('LANDSAT/LC08/C01/T1_TOA/LC08_178034_20160505');
var june2016 = ee.Image('LANDSAT/LC08/C01/T1_TOA/LC08_178034_20160622');
var july2016 = ee.Image('LANDSAT/LC08/C01/T1_TOA/LC08_178034_20160724');
var august2016 = ee.Image('LANDSAT/LC08/C01/T1_TOA/LC08_178034_20160809');
var september2016 = ee.Image('LANDSAT/LC08/C01/T1_TOA/LC08_178034_20160910');
var october2016 = ee.Image('LANDSAT/LC08/C01/T1_TOA/LC08_178034_20161028');
var november2016 = ee.Image('LANDSAT/LC08/C01/T1_TOA/LC08_178034_20161113');
var december2016 = ee.Image('LANDSAT/LC08/C01/T1_TOA/LC08_178034_20161215');
//2017 image collection
var january2017 = ee.Image('LANDSAT/LC08/C01/T1_TOA/LC08_178034_20161231'); //luat ca si fiind 1 ianuarie 2017
var february2017 = ee.Image('LANDSAT/LC08/C01/T1_TOA/LC08_178034_20170201');
var march2017 = ee.Image('LANDSAT/LC08/C01/T1_TOA/LC08_178034_20170305');
var april2017 = ee.Image('LANDSAT/LC08/C01/T1_TOA/LC08_178034_20170406');
var may2017 = ee.Image('LANDSAT/LC08/C01/T1_TOA/LC08_178034_20170524');
var june2017 = ee.Image('LANDSAT/LC08/C01/T1_TOA/LC08_178034_20170625');
var july2017 = ee.Image('LANDSAT/LC08/C01/T1_TOA/LC08_178034_20170711');
var august2017 = ee.Image('LANDSAT/LC08/C01/T1_TOA/LC08_178034_20170828');
var september2017 = ee.Image('LANDSAT/LC08/C01/T1_TOA/LC08_178034_20170913');
var october2017 = ee.Image('LANDSAT/LC08/C01/T1_TOA/LC08_178034_20171015');
var november2017 = ee.Image('LANDSAT/LC08/C01/T1_TOA/LC08_178034_20171116');
var december2017 = ee.Image('LANDSAT/LC08/C01/T1_TOA/LC08_178034_20171202');
//2018 image collection
var january2018 = ee.Image('LANDSAT/LC08/C01/T1_TOA/LC08_178034_20180119');
var february2018 = ee.Image('LANDSAT/LC08/C01/T1_TOA/LC08_178034_20180204');
var march2018 = ee.Image('LANDSAT/LC08/C01/T1_TOA/LC08_178034_20180308');
var april2018 = ee.Image('LANDSAT/LC08/C01/T1_TOA/LC08_178034_20180425');
var may2018 = ee.Image('LANDSAT/LC08/C01/T1_TOA/LC08_178034_20180527');
var june2018 = ee.Image('LANDSAT/LC08/C01/T1_TOA/LC08_178034_20180628');
var july2018 = ee.Image('LANDSAT/LC08/C01/T1_TOA/LC08_178034_20180714');
var august2018 = ee.Image('LANDSAT/LC08/C01/T1_TOA/LC08_178034_20180815');
var september2018 = ee.Image('LANDSAT/LC08/C01/T1_TOA/LC08_178034_20180916');
var october2018 = ee.Image('LANDSAT/LC08/C01/T1_TOA/LC08_178034_20181002');
var november2018 = ee.Image('LANDSAT/LC08/C01/T1_TOA/LC08_178034_20181103');
var december2018 = ee.Image('LANDSAT/LC08/C01/T1_TOA/LC08_178034_20181221');
//2019 image collection
var january2019 = ee.Image('LANDSAT/LC08/C01/T1_TOA/LC08_178034_20190106');
var february2019 = ee.Image('LANDSAT/LC08/C01/T1_TOA/LC08_178034_20190223');
var march2019 = ee.Image('LANDSAT/LC08/C01/T1_TOA/LC08_178034_20190311');
var april2019 = ee.Image('LANDSAT/LC08/C01/T1_TOA/LC08_178034_20190428');
var may2019 = ee.Image('LANDSAT/LC08/C01/T1_TOA/LC08_178034_20190514');
var june2019 = ee.Image('LANDSAT/LC08/C01/T1_TOA/LC08_178034_20190615');
var july2019 = ee.Image('LANDSAT/LC08/C01/T1_TOA/LC08_178034_20190701');
var august2019 = ee.Image('LANDSAT/LC08/C01/T1_TOA/LC08_178034_20190802');
var september2019 = ee.Image('LANDSAT/LC08/C01/T1_TOA/LC08_178034_20190919');
var october2019 = ee.Image('LANDSAT/LC08/C01/T1_TOA/LC08_178034_20191005');
var november2019 = ee.Image('LANDSAT/LC08/C01/T1_TOA/LC08_178034_20190919');
var december2019 = ee.Image('LANDSAT/LC08/C01/T1_TOA/LC08_178034_20190919');
//NDVI stack
var  vjanuary2013 =  january2013.normalizedDifference(['B5', 'B4']);
var vfebruary2013 = february2013.normalizedDifference(['B5', 'B4']);
var    vmarch2013 =    march2013.normalizedDifference(['B5', 'B4']);
var    vapril2013 =    april2013.normalizedDifference(['B5', 'B4']);
var      vmay2013 =      may2013.normalizedDifference(['B5', 'B4']);
var     vjune2013 =     june2013.normalizedDifference(['B5', 'B4']);
var     vjuly2013 =     july2013.normalizedDifference(['B5', 'B4']);
var   vaugust2013 =   august2013.normalizedDifference(['B5', 'B4']);
var  vseptember2013 =september2013.normalizedDifference(['B5', 'B4']);
var  voctober2013 =  october2013.normalizedDifference(['B5', 'B4']);
var vnovember2013 = november2013.normalizedDifference(['B5', 'B4']);
var vdecember2013 = december2013.normalizedDifference(['B5', 'B4']);
var  vjanuary2014 =  january2014.normalizedDifference(['B5', 'B4']);
var vfebruary2014 = february2014.normalizedDifference(['B5', 'B4']);
var    vmarch2014 =    march2014.normalizedDifference(['B5', 'B4']);
var    vapril2014 =    april2014.normalizedDifference(['B5', 'B4']);
var      vmay2014 =      may2014.normalizedDifference(['B5', 'B4']);
var     vjune2014 =     june2014.normalizedDifference(['B5', 'B4']);
var     vjuly2014 =     july2014.normalizedDifference(['B5', 'B4']);
var   vaugust2014 =   august2014.normalizedDifference(['B5', 'B4']);
var  vseptember2014 =september2014.normalizedDifference(['B5', 'B4']);
var  voctober2014 =  october2014.normalizedDifference(['B5', 'B4']);
var vnovember2014 = november2014.normalizedDifference(['B5', 'B4']);
var vdecember2014 = december2014.normalizedDifference(['B5', 'B4']);
var  vjanuary2015 =  january2015.normalizedDifference(['B5', 'B4']);
var vfebruary2015 = february2015.normalizedDifference(['B5', 'B4']);
var    vmarch2015 =    march2015.normalizedDifference(['B5', 'B4']);
var    vapril2015 =    april2015.normalizedDifference(['B5', 'B4']);
var      vmay2015 =      may2015.normalizedDifference(['B5', 'B4']);
var     vjune2015 =     june2015.normalizedDifference(['B5', 'B4']);
var     vjuly2015 =     july2015.normalizedDifference(['B5', 'B4']);
var   vaugust2015 =   august2015.normalizedDifference(['B5', 'B4']);
var  vseptember2015 =september2015.normalizedDifference(['B5', 'B4']);
var  voctober2015 =  october2015.normalizedDifference(['B5', 'B4']);
var vnovember2015 = november2015.normalizedDifference(['B5', 'B4']);
var vdecember2015 = december2015.normalizedDifference(['B5', 'B4']);
var  vjanuary2016 =  january2016.normalizedDifference(['B5', 'B4']);
var vfebruary2016 = february2016.normalizedDifference(['B5', 'B4']);
var    vmarch2016 =    march2016.normalizedDifference(['B5', 'B4']);
var    vapril2016 =    april2016.normalizedDifference(['B5', 'B4']);
var      vmay2016 =      may2016.normalizedDifference(['B5', 'B4']);
var     vjune2016 =     june2016.normalizedDifference(['B5', 'B4']);
var     vjuly2016 =     july2016.normalizedDifference(['B5', 'B4']);
var   vaugust2016 =   august2016.normalizedDifference(['B5', 'B4']);
var  vseptember2016 =september2016.normalizedDifference(['B5', 'B4']);
var  voctober2016 =  october2016.normalizedDifference(['B5', 'B4']);
var vnovember2016 = november2016.normalizedDifference(['B5', 'B4']);
var vdecember2016 = december2016.normalizedDifference(['B5', 'B4']);
var  vjanuary2017 =  january2017.normalizedDifference(['B5', 'B4']);
var vfebruary2017 = february2017.normalizedDifference(['B5', 'B4']);
var    vmarch2017 =    march2017.normalizedDifference(['B5', 'B4']);
var    vapril2017 =    april2017.normalizedDifference(['B5', 'B4']);
var      vmay2017 =      may2017.normalizedDifference(['B5', 'B4']);
var     vjune2017 =     june2017.normalizedDifference(['B5', 'B4']);
var     vjuly2017 =     july2017.normalizedDifference(['B5', 'B4']);
var   vaugust2017 =   august2017.normalizedDifference(['B5', 'B4']);
var  vseptember2017 =september2017.normalizedDifference(['B5', 'B4']);
var  voctober2017 =  october2017.normalizedDifference(['B5', 'B4']);
var vnovember2017 = november2017.normalizedDifference(['B5', 'B4']);
var vdecember2017 = december2017.normalizedDifference(['B5', 'B4']);
var  vjanuary2018 =  january2018.normalizedDifference(['B5', 'B4']);
var vfebruary2018 = february2018.normalizedDifference(['B5', 'B4']);
var    vmarch2018 =    march2018.normalizedDifference(['B5', 'B4']);
var    vapril2018 =    april2018.normalizedDifference(['B5', 'B4']);
var      vmay2018 =      may2018.normalizedDifference(['B5', 'B4']);
var     vjune2018 =     june2018.normalizedDifference(['B5', 'B4']);
var     vjuly2018 =     july2018.normalizedDifference(['B5', 'B4']);
var   vaugust2018 =   august2018.normalizedDifference(['B5', 'B4']);
var  vseptember2018 =september2018.normalizedDifference(['B5', 'B4']);
var  voctober2018 =  october2018.normalizedDifference(['B5', 'B4']);
var vnovember2018 = november2018.normalizedDifference(['B5', 'B4']);
var vdecember2018 = december2018.normalizedDifference(['B5', 'B4']);
var  vjanuary2019 =  january2019.normalizedDifference(['B5', 'B4']);
var vfebruary2019 = february2019.normalizedDifference(['B5', 'B4']);
var    vmarch2019 =    march2019.normalizedDifference(['B5', 'B4']);
var    vapril2019 =    april2019.normalizedDifference(['B5', 'B4']);
var      vmay2019 =      may2019.normalizedDifference(['B5', 'B4']);
var     vjune2019 =     june2019.normalizedDifference(['B5', 'B4']);
var     vjuly2019 =     july2019.normalizedDifference(['B5', 'B4']);
var   vaugust2019 =   august2019.normalizedDifference(['B5', 'B4']);
var  vseptember2019 =september2019.normalizedDifference(['B5', 'B4']);
var  voctober2019 =  october2019.normalizedDifference(['B5', 'B4']);
var vnovember2019 = november2019.normalizedDifference(['B5', 'B4']);
var vdecember2019 = december2019.normalizedDifference(['B5', 'B4']);
//NDWI stacks
var   wjanuary2013 =  january2013.normalizedDifference(['B3', 'B5']);
var  wfebruary2013 =  february2013.normalizedDifference(['B3', 'B5']);
var     wmarch2013 =     march2013.normalizedDifference(['B3', 'B5']);
var     wapril2013 =     april2013.normalizedDifference(['B3', 'B5']);
var       wmay2013 =       may2013.normalizedDifference(['B3', 'B5']);
var      wjune2013 =      june2013.normalizedDifference(['B3', 'B5']);
var      wjuly2013 =      july2013.normalizedDifference(['B3', 'B5']);
var    waugust2013 =    august2013.normalizedDifference(['B3', 'B5']);
var wseptember2013 = september2013.normalizedDifference(['B3', 'B5']);
var   woctober2013 =   october2013.normalizedDifference(['B3', 'B5']);
var  wnovember2013 =  november2013.normalizedDifference(['B3', 'B5']);
var  wdecember2013 =  december2013.normalizedDifference(['B3', 'B5']);
var   wjanuary2014 =  january2014.normalizedDifference(['B3', 'B5']);
var  wfebruary2014 =  february2014.normalizedDifference(['B3', 'B5']);
var     wmarch2014 =     march2014.normalizedDifference(['B3', 'B5']);
var     wapril2014 =     april2014.normalizedDifference(['B3', 'B5']);
var       wmay2014 =       may2014.normalizedDifference(['B3', 'B5']);
var      wjune2014 =     june2014.normalizedDifference(['B3', 'B5']);
var      wjuly2014 =      july2014.normalizedDifference(['B3', 'B5']);
var    waugust2014 =    august2014.normalizedDifference(['B3', 'B5']);
var wseptember2014 = september2014.normalizedDifference(['B3', 'B5']);
var   woctober2014 =   october2014.normalizedDifference(['B3', 'B5']);
var  wnovember2014 =  november2014.normalizedDifference(['B3', 'B5']);
var  wdecember2014 =  december2014.normalizedDifference(['B3', 'B5']);
var   wjanuary2015 =  january2015.normalizedDifference(['B3', 'B5']);
var  wfebruary2015 =  february2015.normalizedDifference(['B3', 'B5']);
var     wmarch2015 =     march2015.normalizedDifference(['B3', 'B5']);
var     wapril2015 =     april2015.normalizedDifference(['B3', 'B5']);
var       wmay2015 =       may2015.normalizedDifference(['B3', 'B5']);
var      wjune2015 =     june2015.normalizedDifference(['B3', 'B5']);
var      wjuly2015 =      july2015.normalizedDifference(['B3', 'B5']);
var    waugust2015 =    august2015.normalizedDifference(['B3', 'B5']);
var wseptember2015 = september2015.normalizedDifference(['B3', 'B5']);
var   woctober2015 =   october2015.normalizedDifference(['B3', 'B5']);
var  wnovember2015 =  november2015.normalizedDifference(['B3', 'B5']);
var  wdecember2015 =  december2015.normalizedDifference(['B3', 'B5']);
var   wjanuary2016 =  january2016.normalizedDifference(['B3', 'B5']);
var  wfebruary2016 =  february2016.normalizedDifference(['B3', 'B5']);
var     wmarch2016 =     march2016.normalizedDifference(['B3', 'B5']);
var     wapril2016 =     april2016.normalizedDifference(['B3', 'B5']);
var       wmay2016 =       may2016.normalizedDifference(['B3', 'B5']);
var      wjune2016 =     june2016.normalizedDifference(['B3', 'B5']);
var      wjuly2016 =      july2016.normalizedDifference(['B3', 'B5']);
var    waugust2016 =    august2016.normalizedDifference(['B3', 'B5']);
var wseptember2016 = september2016.normalizedDifference(['B3', 'B5']);
var   woctober2016 =   october2016.normalizedDifference(['B3', 'B5']);
var  wnovember2016 =  november2016.normalizedDifference(['B3', 'B5']);
var  wdecember2016 =  december2016.normalizedDifference(['B3', 'B5']);
var   wjanuary2017 =  january2017.normalizedDifference(['B3', 'B5']);
var  wfebruary2017 =  february2017.normalizedDifference(['B3', 'B5']);
var     wmarch2017 =     march2017.normalizedDifference(['B3', 'B5']);
var     wapril2017 =     april2017.normalizedDifference(['B3', 'B5']);
var       wmay2017 =       may2017.normalizedDifference(['B3', 'B5']);
var      wjune2017 =     june2017.normalizedDifference(['B3', 'B5']);
var      wjuly2017 =      july2017.normalizedDifference(['B3', 'B5']);
var    waugust2017 =    august2017.normalizedDifference(['B3', 'B5']);
var wseptember2017 = september2017.normalizedDifference(['B3', 'B5']);
var   woctober2017 =   october2017.normalizedDifference(['B3', 'B5']);
var  wnovember2017 =  november2017.normalizedDifference(['B3', 'B5']);
var  wdecember2017 =  december2017.normalizedDifference(['B3', 'B5']);
var   wjanuary2018 =  january2018.normalizedDifference(['B3', 'B5']);
var  wfebruary2018 =  february2018.normalizedDifference(['B3', 'B5']);
var     wmarch2018 =     march2018.normalizedDifference(['B3', 'B5']);
var     wapril2018 =     april2018.normalizedDifference(['B3', 'B5']);
var       wmay2018 =       may2018.normalizedDifference(['B3', 'B5']);
var      wjune2018 =     june2018.normalizedDifference(['B3', 'B5']);
var      wjuly2018 =      july2018.normalizedDifference(['B3', 'B5']);
var    waugust2018 =    august2018.normalizedDifference(['B3', 'B5']);
var wseptember2018 = september2018.normalizedDifference(['B3', 'B5']);
var   woctober2018 =   october2018.normalizedDifference(['B3', 'B5']);
var  wnovember2018 =  november2018.normalizedDifference(['B3', 'B5']);
var  wdecember2018 =  december2018.normalizedDifference(['B3', 'B5']);
var   wjanuary2019 =  january2019.normalizedDifference(['B3', 'B5']);
var  wfebruary2019 =  february2019.normalizedDifference(['B3', 'B5']);
var     wmarch2019 =     march2019.normalizedDifference(['B3', 'B5']);
var     wapril2019 =     april2019.normalizedDifference(['B3', 'B5']);
var       wmay2019 =       may2019.normalizedDifference(['B3', 'B5']);
var      wjune2019 =     june2019.normalizedDifference(['B3', 'B5']);
var      wjuly2019 =      july2019.normalizedDifference(['B3', 'B5']);
var    waugust2019 =    august2019.normalizedDifference(['B3', 'B5']);
var wseptember2019 = september2019.normalizedDifference(['B3', 'B5']);
var   woctober2019 =   october2019.normalizedDifference(['B3', 'B5']);
var  wnovember2019 =  november2019.normalizedDifference(['B3', 'B5']);
var  wdecember2019 =  december2019.normalizedDifference(['B3', 'B5']);
//Binary stacks
var   bjanuary2013 =   ee.Image(vjanuary2013.lt(1).and(wjanuary2013.lt(0)));
var  bfebruary2013 =  ee.Image(vfebruary2013.lt(1).and(wfebruary2013.lt(0)));
var     bmarch2013 =     ee.Image(vmarch2013.lt(1).and(wmarch2013.lt(0)));
var     bapril2013 =     ee.Image(vapril2013.lt(1).and(wapril2013.lt(0)));
var       bmay2013 =       ee.Image(vmay2013.lt(1).and(wmay2013.lt(0)));
var      bjune2013 =      ee.Image(vjune2013.lt(1).and(wjune2013.lt(0)));
var      bjuly2013 =      ee.Image(vjuly2013.lt(1).and(wjuly2013.lt(0)));
var    baugust2013 =    ee.Image(vaugust2013.lt(1).and(waugust2013.lt(0)));
var bseptember2013 = ee.Image(vseptember2013.lt(1).and(wseptember2013.lt(0)));
var   boctober2013 =   ee.Image(voctober2013.lt(1).and(woctober2013.lt(0)));
var  bnovember2013 =  ee.Image(vnovember2013.lt(1).and(wnovember2013.lt(0)));
var  bdecember2013 = ee.Image(vdecember2013.lt(1).and(wdecember2013.lt(0)));
var   bjanuary2014 =   ee.Image(vjanuary2014.lt(1).and(wjanuary2014.lt(0)));
var  bfebruary2014 =  ee.Image(vfebruary2014.lt(1).and(wfebruary2014.lt(0)));
var     bmarch2014 =     ee.Image(vmarch2014.lt(1).and(wmarch2014.lt(0)));
var     bapril2014 =     ee.Image(vapril2014.lt(1).and(wapril2014.lt(0)));
var       bmay2014 =       ee.Image(vmay2014.lt(1).and(wmay2014.lt(0)));
var      bjune2014 =      ee.Image(vjune2014.lt(1).and(wjune2014.lt(0)));
var      bjuly2014 =      ee.Image(vjuly2014.lt(1).and(wjuly2014.lt(0)));
var    baugust2014 =    ee.Image(vaugust2014.lt(1).and(waugust2014.lt(0)));
var bseptember2014 = ee.Image(vseptember2014.lt(1).and(wseptember2014.lt(0)));
var   boctober2014 =   ee.Image(voctober2014.lt(1).and(woctober2014.lt(0)));
var  bnovember2014 =  ee.Image(vnovember2014.lt(1).and(wnovember2014.lt(0)));
var  bdecember2014 = ee.Image(vdecember2014.lt(1).and(wdecember2014.lt(0)));
var   bjanuary2015 =   ee.Image(vjanuary2015.lt(1).and(wjanuary2015.lt(0)));
var  bfebruary2015 =  ee.Image(vfebruary2015.lt(1).and(wfebruary2015.lt(0)));
var     bmarch2015 =     ee.Image(vmarch2015.lt(1).and(wmarch2015.lt(0)));
var     bapril2015 =     ee.Image(vapril2015.lt(1).and(wapril2015.lt(0)));
var       bmay2015 =       ee.Image(vmay2015.lt(1).and(wmay2015.lt(0)));
var      bjune2015 =      ee.Image(vjune2015.lt(1).and(wjune2015.lt(0)));
var      bjuly2015 =      ee.Image(vjuly2015.lt(1).and(wjuly2015.lt(0)));
var    baugust2015 =    ee.Image(vaugust2015.lt(1).and(waugust2015.lt(0)));
var bseptember2015 = ee.Image(vseptember2015.lt(1).and(wseptember2015.lt(0)));
var   boctober2015 =   ee.Image(voctober2015.lt(1).and(woctober2015.lt(0)));
var  bnovember2015 =  ee.Image(vnovember2015.lt(1).and(wnovember2015.lt(0)));
var  bdecember2015 = ee.Image(vdecember2015.lt(1).and(wdecember2015.lt(0)));
var   bjanuary2016 =   ee.Image(vjanuary2016.lt(1).and(wjanuary2016.lt(0)));
var  bfebruary2016 =  ee.Image(vfebruary2016.lt(1).and(wfebruary2016.lt(0)));
var     bmarch2016 =     ee.Image(vmarch2016.lt(1).and(wmarch2016.lt(0)));
var     bapril2016 =     ee.Image(vapril2016.lt(1).and(wapril2016.lt(0)));
var       bmay2016 =       ee.Image(vmay2016.lt(1).and(wmay2016.lt(0)));
var      bjune2016 =      ee.Image(vjune2016.lt(1).and(wjune2016.lt(0)));
var      bjuly2016 =      ee.Image(vjuly2016.lt(1).and(wjuly2016.lt(0)));
var    baugust2016 =    ee.Image(vaugust2016.lt(1).and(waugust2016.lt(0)));
var bseptember2016 = ee.Image(vseptember2016.lt(1).and(wseptember2016.lt(0)));
var   boctober2016 =   ee.Image(voctober2016.lt(1).and(woctober2016.lt(0)));
var  bnovember2016 =  ee.Image(vnovember2016.lt(1).and(wnovember2016.lt(0)));
var  bdecember2016 = ee.Image(vdecember2016.lt(1).and(wdecember2016.lt(0)));
var   bjanuary2017 =   ee.Image(vjanuary2017.lt(1).and(wjanuary2017.lt(0)));
var  bfebruary2017 =  ee.Image(vfebruary2017.lt(1).and(wfebruary2017.lt(0)));
var     bmarch2017 =     ee.Image(vmarch2017.lt(1).and(wmarch2017.lt(0)));
var     bapril2017 =     ee.Image(vapril2017.lt(1).and(wapril2017.lt(0)));
var       bmay2017 =       ee.Image(vmay2017.lt(1).and(wmay2017.lt(0)));
var      bjune2017 =      ee.Image(vjune2017.lt(1).and(wjune2017.lt(0)));
var      bjuly2017 =      ee.Image(vjuly2017.lt(1).and(wjuly2017.lt(0)));
var    baugust2017 =    ee.Image(vaugust2017.lt(1).and(waugust2017.lt(0)));
var bseptember2017 = ee.Image(vseptember2017.lt(1).and(wseptember2017.lt(0)));
var   boctober2017 =   ee.Image(voctober2017.lt(1).and(woctober2017.lt(0)));
var  bnovember2017 =  ee.Image(vnovember2017.lt(1).and(wnovember2017.lt(0)));
var  bdecember2017 = ee.Image(vdecember2017.lt(1).and(wdecember2017.lt(0)));
var   bjanuary2018 =   ee.Image(vjanuary2018.lt(1).and(wjanuary2018.lt(0)));
var  bfebruary2018 =  ee.Image(vfebruary2018.lt(1).and(wfebruary2018.lt(0)));
var     bmarch2018 =     ee.Image(vmarch2018.lt(1).and(wmarch2018.lt(0)));
var     bapril2018 =     ee.Image(vapril2018.lt(1).and(wapril2018.lt(0)));
var       bmay2018 =       ee.Image(vmay2018.lt(1).and(wmay2018.lt(0)));
var      bjune2018 =      ee.Image(vjune2018.lt(1).and(wjune2018.lt(0)));
var      bjuly2018 =      ee.Image(vjuly2018.lt(1).and(wjuly2018.lt(0)));
var    baugust2018 =    ee.Image(vaugust2018.lt(1).and(waugust2018.lt(0)));
var bseptember2018 = ee.Image(vseptember2018.lt(1).and(wseptember2018.lt(0)));
var   boctober2018 =   ee.Image(voctober2018.lt(1).and(woctober2018.lt(0)));
var  bnovember2018 =  ee.Image(vnovember2018.lt(1).and(wnovember2018.lt(0)));
var  bdecember2018 = ee.Image(vdecember2018.lt(1).and(wdecember2018.lt(0)));
var   bjanuary2019 =   ee.Image(vjanuary2019.lt(1).and(wjanuary2019.lt(0)));
var  bfebruary2019 =  ee.Image(vfebruary2019.lt(1).and(wfebruary2019.lt(0)));
var     bmarch2019 =     ee.Image(vmarch2019.lt(1).and(wmarch2019.lt(0)));
var     bapril2019 =     ee.Image(vapril2019.lt(1).and(wapril2019.lt(0)));
var       bmay2019 =       ee.Image(vmay2019.lt(1).and(wmay2019.lt(0)));
var      bjune2019 =      ee.Image(vjune2019.lt(1).and(wjune2019.lt(0)));
var      bjuly2019 =      ee.Image(vjuly2019.lt(1).and(wjuly2019.lt(0)));
var    baugust2019 =    ee.Image(vaugust2019.lt(1).and(waugust2019.lt(0)));
var bseptember2019 = ee.Image(vseptember2019.lt(1).and(wseptember2019.lt(0)));
var   boctober2019 =   ee.Image(voctober2019.lt(1).and(woctober2019.lt(0)));
var  bnovember2019 =  ee.Image(vnovember2019.lt(1).and(wnovember2019.lt(0)));
var  bdecember2019 = ee.Image(vdecember2019.lt(1).and(wdecember2019.lt(0)));
//Edge detect stacks
var   ejanuary2013 =   ee.Algorithms.CannyEdgeDetector(bjanuary2013, 1 );
var  efebruary2013 =  ee.Algorithms.CannyEdgeDetector(bfebruary2013, 1 );
var     emarch2013 =     ee.Algorithms.CannyEdgeDetector(bmarch2013, 1 );
var     eapril2013 =     ee.Algorithms.CannyEdgeDetector(bapril2013, 1 );
var       emay2013 =       ee.Algorithms.CannyEdgeDetector(bmay2013, 1 );
var      ejune2013 =      ee.Algorithms.CannyEdgeDetector(bjune2013, 1 );
var      ejuly2013 =      ee.Algorithms.CannyEdgeDetector(bjuly2013, 1 );
var    eaugust2013 =    ee.Algorithms.CannyEdgeDetector(baugust2013, 1 );
var eseptember2013 = ee.Algorithms.CannyEdgeDetector(bseptember2013, 1 );
var   eoctober2013 =   ee.Algorithms.CannyEdgeDetector(boctober2013, 1 );
var  enovember2013 =  ee.Algorithms.CannyEdgeDetector(bnovember2013, 1 );
var  edecember2013 =  ee.Algorithms.CannyEdgeDetector(bdecember2013, 1 );
var   ejanuary2014 =   ee.Algorithms.CannyEdgeDetector(bjanuary2014, 1 );
var  efebruary2014 =  ee.Algorithms.CannyEdgeDetector(bfebruary2014, 1 );
var     emarch2014 =     ee.Algorithms.CannyEdgeDetector(bmarch2014, 1 );
var     eapril2014 =     ee.Algorithms.CannyEdgeDetector(bapril2014, 1 );
var       emay2014 =       ee.Algorithms.CannyEdgeDetector(bmay2014, 1 );
var      ejune2014 =      ee.Algorithms.CannyEdgeDetector(bjune2014, 1 );
var      ejuly2014 =      ee.Algorithms.CannyEdgeDetector(bjuly2014, 1 );
var    eaugust2014 =    ee.Algorithms.CannyEdgeDetector(baugust2014, 1 );
var eseptember2014 = ee.Algorithms.CannyEdgeDetector(bseptember2014, 1 );
var   eoctober2014 =   ee.Algorithms.CannyEdgeDetector(boctober2014, 1 );
var  enovember2014 =  ee.Algorithms.CannyEdgeDetector(bnovember2014, 1 );
var  edecember2014 =  ee.Algorithms.CannyEdgeDetector(bdecember2014, 1 );
var   ejanuary2015 =   ee.Algorithms.CannyEdgeDetector(bjanuary2015, 1 );
var  efebruary2015 =  ee.Algorithms.CannyEdgeDetector(bfebruary2015, 1 );
var     emarch2015 =     ee.Algorithms.CannyEdgeDetector(bmarch2015, 1 );
var     eapril2015 =     ee.Algorithms.CannyEdgeDetector(bapril2015, 1 );
var       emay2015 =       ee.Algorithms.CannyEdgeDetector(bmay2015, 1 );
var      ejune2015 =      ee.Algorithms.CannyEdgeDetector(bjune2015, 1 );
var      ejuly2015 =      ee.Algorithms.CannyEdgeDetector(bjuly2015, 1 );
var    eaugust2015 =    ee.Algorithms.CannyEdgeDetector(baugust2015, 1 );
var eseptember2015 = ee.Algorithms.CannyEdgeDetector(bseptember2015, 1 );
var   eoctober2015 =   ee.Algorithms.CannyEdgeDetector(boctober2015, 1 );
var  enovember2015 =  ee.Algorithms.CannyEdgeDetector(bnovember2015, 1 );
var  edecember2015 =  ee.Algorithms.CannyEdgeDetector(bdecember2015, 1 );
var   ejanuary2016 =   ee.Algorithms.CannyEdgeDetector(bjanuary2016, 1 );
var  efebruary2016 =  ee.Algorithms.CannyEdgeDetector(bfebruary2016, 1 );
var     emarch2016 =     ee.Algorithms.CannyEdgeDetector(bmarch2016, 1 );
var     eapril2016 =     ee.Algorithms.CannyEdgeDetector(bapril2016, 1 );
var       emay2016 =       ee.Algorithms.CannyEdgeDetector(bmay2016, 1 );
var      ejune2016 =      ee.Algorithms.CannyEdgeDetector(bjune2016, 1 );
var      ejuly2016 =      ee.Algorithms.CannyEdgeDetector(bjuly2016, 1 );
var    eaugust2016 =    ee.Algorithms.CannyEdgeDetector(baugust2016, 1 );
var eseptember2016 = ee.Algorithms.CannyEdgeDetector(bseptember2016, 1 );
var   eoctober2016 =   ee.Algorithms.CannyEdgeDetector(boctober2016, 1 );
var  enovember2016 =  ee.Algorithms.CannyEdgeDetector(bnovember2016, 1 );
var  edecember2016 =  ee.Algorithms.CannyEdgeDetector(bdecember2016, 1 );
var   ejanuary2017 =   ee.Algorithms.CannyEdgeDetector(bjanuary2017, 1 );
var  efebruary2017 =  ee.Algorithms.CannyEdgeDetector(bfebruary2017, 1 );
var     emarch2017 =     ee.Algorithms.CannyEdgeDetector(bmarch2017, 1 );
var     eapril2017 =     ee.Algorithms.CannyEdgeDetector(bapril2017, 1 );
var       emay2017 =       ee.Algorithms.CannyEdgeDetector(bmay2017, 1 );
var      ejune2017 =      ee.Algorithms.CannyEdgeDetector(bjune2017, 1 );
var      ejuly2017 =      ee.Algorithms.CannyEdgeDetector(bjuly2017, 1 );
var    eaugust2017 =    ee.Algorithms.CannyEdgeDetector(baugust2017, 1 );
var eseptember2017 = ee.Algorithms.CannyEdgeDetector(bseptember2017, 1 );
var   eoctober2017 =   ee.Algorithms.CannyEdgeDetector(boctober2017, 1 );
var  enovember2017 =  ee.Algorithms.CannyEdgeDetector(bnovember2017, 1 );
var  edecember2017 =  ee.Algorithms.CannyEdgeDetector(bdecember2017, 1 );
var   ejanuary2018 =   ee.Algorithms.CannyEdgeDetector(bjanuary2018, 1 );
var  efebruary2018 =  ee.Algorithms.CannyEdgeDetector(bfebruary2018, 1 );
var     emarch2018 =     ee.Algorithms.CannyEdgeDetector(bmarch2018, 1 );
var     eapril2018 =     ee.Algorithms.CannyEdgeDetector(bapril2018, 1 );
var       emay2018 =       ee.Algorithms.CannyEdgeDetector(bmay2018, 1 );
var      ejune2018 =      ee.Algorithms.CannyEdgeDetector(bjune2018, 1 );
var      ejuly2018 =      ee.Algorithms.CannyEdgeDetector(bjuly2018, 1 );
var    eaugust2018 =    ee.Algorithms.CannyEdgeDetector(baugust2018, 1 );
var eseptember2018 = ee.Algorithms.CannyEdgeDetector(bseptember2018, 1 );
var   eoctober2018 =   ee.Algorithms.CannyEdgeDetector(boctober2018, 1 );
var  enovember2018 =  ee.Algorithms.CannyEdgeDetector(bnovember2018, 1 );
var  edecember2018 =  ee.Algorithms.CannyEdgeDetector(bdecember2018, 1 );
var   ejanuary2019 =   ee.Algorithms.CannyEdgeDetector(bjanuary2019, 1 );
var  efebruary2019 =  ee.Algorithms.CannyEdgeDetector(bfebruary2019, 1 );
var     emarch2019 =     ee.Algorithms.CannyEdgeDetector(bmarch2019, 1 );
var     eapril2019 =     ee.Algorithms.CannyEdgeDetector(bapril2019, 1 );
var       emay2019 =       ee.Algorithms.CannyEdgeDetector(bmay2019, 1 );
var      ejune2019 =      ee.Algorithms.CannyEdgeDetector(bjune2019, 1 );
var      ejuly2019 =      ee.Algorithms.CannyEdgeDetector(bjuly2019, 1 );
var    eaugust2019 =    ee.Algorithms.CannyEdgeDetector(baugust2019, 1 );
var eseptember2019 = ee.Algorithms.CannyEdgeDetector(bseptember2019, 1 );
var   eoctober2019 =   ee.Algorithms.CannyEdgeDetector(boctober2019, 1 );
var  enovember2019 =  ee.Algorithms.CannyEdgeDetector(bnovember2019, 1 );
var  edecember2019 =  ee.Algorithms.CannyEdgeDetector(bdecember2019, 1 );
 //The big code
 var theBigCode = ui.Select({  //Season select
  items: [
    {label: 'Spring', value: 1},
    {label: 'Summer', value: 2},
    {label: 'Autumn', value: 3},
    {label: 'Winter', value: 4}
  ],
  placeholder: 'Select a season...',
  onChange: function(value) {
//Start of spring body code
    if (value == 1) {    
      var springSeason = ui.Select({
  items: [
    {label: 'March', value: 1.1},
    {label: 'April', value: 1.2},
    {label: 'May',   value: 1.3}
  ],
  placeholder: 'Select a month...',
  onChange: function(value) {
//Start of spring months   
//Spring - March
    if (value == 1.1) {
      var yearSelect11 = ui.Select({
        items: [
          {label: '2013', value: 2013},
          {label: '2014', value: 2014},
          {label: '2015', value: 2015},
          {label: '2016', value: 2016},
          {label: '2017', value: 2017},
          {label: '2018', value: 2018},
          {label: '2019', value: 2019}
          ],
          placeholder: "Select a year...",
          onChange: function(value){
            //Spring - March - Years
            if (value == 2013) {
               Map.addLayer(emarch2013.updateMask(emarch2013).clip(poly), {palette: ['Black']}, 'Coastline March 2013')
               var histogram = ui.Chart.image.histogram(ndBIN2013, poly , 1)
               panel2.add(histogram)
            } else if (value == 2014) {
              Map.addLayer(emarch2014.updateMask(emarch2014).clip(poly), {palette: ['Black']}, 'Coastline March 2014')
            } else if (value == 2015) {
              Map.addLayer(emarch2015.updateMask(emarch2015).clip(poly), {palette: ['Black']}, 'Coastline March 2015')
            } else if (value == 2016) {
              Map.addLayer(emarch2016.updateMask(emarch2016).clip(poly), {palette: ['Black']}, 'Coastline March 2016')
            } else if (value == 2017) {
              Map.addLayer(emarch2017.updateMask(emarch2017).clip(poly), {palette: ['Black']}, 'Coastline March 2017')
            } else if (value == 2018) {
              Map.addLayer(emarch2018.updateMask(emarch2018).clip(poly), {palette: ['Black']}, 'Coastline March 2018')
            } else if (value == 2019) {
              Map.addLayer(emarch2019.updateMask(emarch2019).clip(poly), {palette: ['Black']}, 'Coastline March 2019')
            }
          }
      });
    panel.add(yearSelect11);
      //Spring - April
    } else if (value == 1.2) {
      var yearSelect12 = ui.Select({
        items: [
          {label: '2013', value: 2013},
          {label: '2014', value: 2014},
          {label: '2015', value: 2015},
          {label: '2016', value: 2016},
          {label: '2017', value: 2017},
          {label: '2018', value: 2018},
          {label: '2019', value: 2019}
          ],
          placeholder: "Select a year...",
          onChange: function(value){
            //Spring - April - Years
            if (value == 2013) {
              Map.addLayer(eapril2013.updateMask(eapril2013).clip(poly), {palette: ['Black']}, 'Coastline April 2013')
            } else if (value == 2014) {
              Map.addLayer(eapril2014.updateMask(eapril2014).clip(poly), {palette: ['Black']}, 'Coastline April 2014')
            } else if (value == 2015) {
              Map.addLayer(eapril2015.updateMask(eapril2015).clip(poly), {palette: ['Black']}, 'Coastline April 2015')
            } else if (value == 2016) {
              Map.addLayer(eapril2016.updateMask(eapril2016).clip(poly), {palette: ['Black']}, 'Coastline April 2016')
            } else if (value == 2017) {
              Map.addLayer(eapril2017.updateMask(eapril2017).clip(poly), {palette: ['Black']}, 'Coastline April 2017')
            } else if (value == 2018) {
              Map.addLayer(eapril2018.updateMask(eapril2018).clip(poly), {palette: ['Black']}, 'Coastline April 2018')
            } else if (value == 2019) {
              Map.addLayer(eapril2019.updateMask(eapril2019).clip(poly), {palette: ['Black']}, 'Coastline April 2019')
            }
          }
      });
   panel.add(yearSelect12);
      //Spring - May
    } else if (value == 1.3) {
      var yearSelect13 = ui.Select({
        items: [
          {label: '2013', value: 2013},
          {label: '2014', value: 2014},
          {label: '2015', value: 2015},
          {label: '2016', value: 2016},
          {label: '2017', value: 2017},
          {label: '2018', value: 2018},
          {label: '2019', value: 2019}
          ],
          placeholder: "Select a year...",
          onChange: function(value){
            //Spring - May - Years
            if (value == 2013) {
              Map.addLayer(emay2013.updateMask(emay2013).clip(poly), {palette: ['Black']}, 'Coastline May 2013')
            } else if (value == 2014) {
              Map.addLayer(emay2014.updateMask(emay2014).clip(poly), {palette: ['Black']}, 'Coastline May 2014')
            } else if (value == 2015) {
              Map.addLayer(emay2015.updateMask(emay2015).clip(poly), {palette: ['Black']}, 'Coastline May 2015')
            } else if (value == 2016) {
              Map.addLayer(emay2016.updateMask(emay2016).clip(poly), {palette: ['Black']}, 'Coastline May 2016')
            } else if (value == 2017) {
              Map.addLayer(emay2017.updateMask(emay2017).clip(poly), {palette: ['Black']}, 'Coastline May 2017')
            } else if (value == 2018) {
              Map.addLayer(emay2018.updateMask(emay2018).clip(poly), {palette: ['Black']}, 'Coastline May 2018')
            } else if (value == 2019) {
              Map.addLayer(emay2019.updateMask(emay2019).clip(poly), {palette: ['Black']}, 'Coastline May 2019')
            } 
          }
      });
     panel.add(yearSelect13);
      //End of spring body code
    }
  }
});
panel.add(springSeason);  //Spring season end
//Start of summer body code
    } else if (value == 2) {  
      var summerSeason = ui.Select({
  items: [
    {label: 'June',     value: 2.1},
    {label: 'July',     value: 2.2},
    {label: 'August',   value: 2.3}
  ],
  placeholder: 'Select a month...',
  onChange: function(value) {
//Start of summer months   
//Summer - June
    if (value == 2.1) {
      var yearSelect21 = ui.Select({
        items: [
          {label: '2013', value: 2013},
          {label: '2014', value: 2014},
          {label: '2015', value: 2015},
          {label: '2016', value: 2016},
          {label: '2017', value: 2017},
          {label: '2018', value: 2018},
          {label: '2019', value: 2019}
          ],
          placeholder: "Select a year...",
          onChange: function(value){
            //Summer - June - Years
            if (value == 2013) {
              Map.addLayer(ejune2013.updateMask(ejune2013).clip(poly), {palette: ['Black']}, 'Coastline June 2013')
            } else if (value == 2014) {
              Map.addLayer(ejune2014.updateMask(ejune2014).clip(poly), {palette: ['Black']}, 'Coastline June 2014')
            } else if (value == 2015) {
              Map.addLayer(ejune2015.updateMask(ejune2015).clip(poly), {palette: ['Black']}, 'Coastline June 2015')
            } else if (value == 2016) {
              Map.addLayer(ejune2016.updateMask(ejune2016).clip(poly), {palette: ['Black']}, 'Coastline June 2016')
            } else if (value == 2017) {
              Map.addLayer(ejune2017.updateMask(ejune2017).clip(poly), {palette: ['Black']}, 'Coastline June 2017')
            } else if (value == 2018) {
              Map.addLayer(ejune2018.updateMask(ejune2018).clip(poly), {palette: ['Black']}, 'Coastline June 2018')
            } else if (value == 2019) {
              Map.addLayer(ejune2019.updateMask(ejune2019).clip(poly), {palette: ['Black']}, 'Coastline June 2019')
            }
          }
      });
     panel.add(yearSelect21);
      //Summer - July
    } else if (value == 2.2) {
      var yearSelect22 = ui.Select({
        items: [
          {label: '2013', value: 2013},
          {label: '2014', value: 2014},
          {label: '2015', value: 2015},
          {label: '2016', value: 2016},
          {label: '2017', value: 2017},
          {label: '2018', value: 2018},
          {label: '2019', value: 2019}
          ],
          placeholder: "Select a year...",
          onChange: function(value){
            //Summer - July - Years
            if (value == 2013) {
              Map.addLayer(ejuly2013.updateMask(ejuly2013).clip(poly), {palette: ['Black']}, 'Coastline July 2013')
            } else if (value == 2014) {
              Map.addLayer(ejuly2014.updateMask(ejuly2014).clip(poly), {palette: ['Black']}, 'Coastline July 2014')
            } else if (value == 2015) {
              Map.addLayer(ejuly2015.updateMask(ejuly2015).clip(poly), {palette: ['Black']}, 'Coastline July 2015')
            } else if (value == 2016) {
              Map.addLayer(ejuly2016.updateMask(ejuly2016).clip(poly), {palette: ['Black']}, 'Coastline July 2016')
            } else if (value == 2017) {
              Map.addLayer(ejuly2017.updateMask(ejuly2017).clip(poly), {palette: ['Black']}, 'Coastline July 2017')
            } else if (value == 2018) {
              Map.addLayer(ejuly2018.updateMask(ejuly2018).clip(poly), {palette: ['Black']}, 'Coastline July 2018')
            } else if (value == 2019) {
              Map.addLayer(ejuly2019.updateMask(ejuly2019).clip(poly), {palette: ['Black']}, 'Coastline July 2019')
            }
          }
      });
    panel.add(yearSelect22);
      //Summer - August
    } else if (value == 2.3) {
      var yearSelect23 = ui.Select({
        items: [
          {label: '2013', value: 2013},
          {label: '2014', value: 2014},
          {label: '2015', value: 2015},
          {label: '2016', value: 2016},
          {label: '2017', value: 2017},
          {label: '2018', value: 2018},
          {label: '2019', value: 2019}
          ],
          placeholder: "Select a year...",
          onChange: function(value){
            //Summer - August - Years
            if (value == 2013) {
              Map.addLayer(eaugust2013.updateMask(eaugust2013).clip(poly), {palette: ['Black']}, 'Coastline August 2013')
            } else if (value == 2014) {
              Map.addLayer(eaugust2014.updateMask(eaugust2014).clip(poly), {palette: ['Black']}, 'Coastline August 2014')
            } else if (value == 2015) {
              Map.addLayer(eaugust2015.updateMask(eaugust2015).clip(poly), {palette: ['Black']}, 'Coastline August 2015')
            } else if (value == 2016) {
              Map.addLayer(eaugust2016.updateMask(eaugust2016).clip(poly), {palette: ['Black']}, 'Coastline August 2016')
            } else if (value == 2017) {
              Map.addLayer(eaugust2017.updateMask(eaugust2017).clip(poly), {palette: ['Black']}, 'Coastline August 2017')
            } else if (value == 2018) {
              Map.addLayer(eaugust2018.updateMask(eaugust2018).clip(poly), {palette: ['Black']}, 'Coastline August 2018')
            } else if (value == 2019) {
              Map.addLayer(eaugust2019.updateMask(eaugust2019).clip(poly), {palette: ['Black']}, 'Coastline August 2019')
            }
          }
      });
      panel.add(yearSelect23);
      //End of summer body code
    }
  }
});
panel.add(summerSeason);  //Summer season end
//Start of autumn body code
    } else if (value == 3) {  
      var autumnSeason = ui.Select({
  items: [
    {label: 'September',   value: 3.1},
    {label: 'October',     value: 3.2},
    {label: 'November',    value: 3.3}
  ],
  placeholder: 'Select a month...',
  onChange: function(value) {
//Start of autumn months   
//Autumn - September
    if (value == 3.1) {
      var yearSelect31 = ui.Select({
        items: [
          {label: '2013', value: 2013},
          {label: '2014', value: 2014},
          {label: '2015', value: 2015},
          {label: '2016', value: 2016},
          {label: '2017', value: 2017},
          {label: '2018', value: 2018},
          {label: '2019', value: 2019}
          ],
          placeholder: "Select a year...",
          onChange: function(value){
            //Autumn - September - Years
            if (value == 2013) {
              Map.addLayer(eseptember2013.updateMask(eseptember2013).clip(poly), {palette: ['Black']}, 'Coastline September 2013')
            } else if (value == 2014) {
              Map.addLayer(eseptember2014.updateMask(eseptember2014).clip(poly), {palette: ['Black']}, 'Coastline September 2014')
            } else if (value == 2015) {
              Map.addLayer(eseptember2015.updateMask(eseptember2015).clip(poly), {palette: ['Black']}, 'Coastline September 2015')
            } else if (value == 2016) {
              Map.addLayer(eseptember2016.updateMask(eseptember2016).clip(poly), {palette: ['Black']}, 'Coastline September 2016')
            } else if (value == 2017) {
              Map.addLayer(eseptember2017.updateMask(eseptember2017).clip(poly), {palette: ['Black']}, 'Coastline September 2017')
            } else if (value == 2018) {
              Map.addLayer(eseptember2018.updateMask(eseptember2018).clip(poly), {palette: ['Black']}, 'Coastline September 2018')
            } else if (value == 2019) {
              Map.addLayer(eseptember2019.updateMask(eseptember2019).clip(poly), {palette: ['Black']}, 'Coastline September 2019')
            }
          }
      });
      panel.add(yearSelect31);
      //Autumn - October
    } else if (value == 3.2) {
      var yearSelect32 = ui.Select({
        items: [
          {label: '2013', value: 2013},
          {label: '2014', value: 2014},
          {label: '2015', value: 2015},
          {label: '2016', value: 2016},
          {label: '2017', value: 2017},
          {label: '2018', value: 2018},
          {label: '2019', value: 2019}
          ],
          placeholder: "Select a year...",
          onChange: function(value){
            //Autumn - October - Years
            if (value == 2013) {
              Map.addLayer(eoctober2013.updateMask(eoctober2013).clip(poly), {palette: ['Black']}, 'Coastline October 2013')
            } else if (value == 2014) {
              Map.addLayer(eoctober2014.updateMask(eoctober2014).clip(poly), {palette: ['Black']}, 'Coastline October 2014')
            } else if (value == 2015) {
              Map.addLayer(eoctober2015.updateMask(eoctober2015).clip(poly), {palette: ['Black']}, 'Coastline October 2015')
            } else if (value == 2016) {
              Map.addLayer(eoctober2016.updateMask(eoctober2016).clip(poly), {palette: ['Black']}, 'Coastline October 2016')
            } else if (value == 2017) {
              Map.addLayer(eoctober2017.updateMask(eoctober2017).clip(poly), {palette: ['Black']}, 'Coastline October 2017')
            } else if (value == 2018) {
              Map.addLayer(eoctober2018.updateMask(eoctober2018).clip(poly), {palette: ['Black']}, 'Coastline October 2018')
            } else if (value == 2019) {
              Map.addLayer(eoctober2019.updateMask(eoctober2019).clip(poly), {palette: ['Black']}, 'Coastline October 2019')
            }
          }
      });
    panel.add(yearSelect32);
      //Autumn - November
    } else if (value == 3.3) {
      var yearSelect33 = ui.Select({
        items: [
          {label: '2013', value: 2013},
          {label: '2014', value: 2014},
          {label: '2015', value: 2015},
          {label: '2016', value: 2016},
          {label: '2017', value: 2017},
          {label: '2018', value: 2018},
          {label: '2019', value: 2019}
          ],
          placeholder: "Select a year...",
          onChange: function(value){
            //Autumn - November - Years
            if (value == 2013) {
              Map.addLayer(enovember2013.updateMask(enovember2013).clip(poly), {palette: ['Black']}, 'Coastline November 2013')
            } else if (value == 2014) {
              Map.addLayer(enovember2014.updateMask(enovember2014).clip(poly), {palette: ['Black']}, 'Coastline November 2014')
            } else if (value == 2015) {
              Map.addLayer(enovember2015.updateMask(enovember2015).clip(poly), {palette: ['Black']}, 'Coastline November 2015')
            } else if (value == 2016) {
              Map.addLayer(enovember2016.updateMask(enovember2016).clip(poly), {palette: ['Black']}, 'Coastline November 2016')
            } else if (value == 2017) {
              Map.addLayer(enovember2017.updateMask(enovember2017).clip(poly), {palette: ['Black']}, 'Coastline November 2017')
            } else if (value == 2018) {
              Map.addLayer(enovember2018.updateMask(enovember2018).clip(poly), {palette: ['Black']}, 'Coastline November 2018')
            } else if (value == 2019) {
              Map.addLayer(enovember2019.updateMask(enovember2019).clip(poly), {palette: ['Black']}, 'Coastline November 2019')
            }
          }
      });
     panel.add(yearSelect33);
      //End of autumn body code
    }
  }
});
panel.add(autumnSeason);  //Autumn season end
//Start of winter body code
    } else if (value == 4) {  
      var winterSeason = ui.Select({
  items: [
    {label: 'December',    value: 4.1},
    {label: 'January',     value: 4.2},
    {label: 'February',    value: 4.3}
  ],
  placeholder: 'Select a month...',
  onChange: function(value) {
//Start of winter months   
//Winter - December
    if (value == 4.1) {
      var yearSelect41 = ui.Select({
        items: [
          {label: '2013', value: 2013},
          {label: '2014', value: 2014},
          {label: '2015', value: 2015},
          {label: '2016', value: 2016},
          {label: '2017', value: 2017},
          {label: '2018', value: 2018},
          {label: '2019', value: 2019}
          ],
          placeholder: "Select a year...",
          onChange: function(value){
            //Winter - December - Years
            if (value == 2013) {
              Map.addLayer(edecember2013.updateMask(edecember2013).clip(poly), {palette: ['Black']}, 'Coastline December 2013')
            } else if (value == 2014) {
              Map.addLayer(edecember2014.updateMask(edecember2014).clip(poly), {palette: ['Black']}, 'Coastline December 2014')
            } else if (value == 2015) {
              Map.addLayer(edecember2015.updateMask(edecember2015).clip(poly), {palette: ['Black']}, 'Coastline December 2015')
            } else if (value == 2016) {
              Map.addLayer(edecember2016.updateMask(edecember2016).clip(poly), {palette: ['Black']}, 'Coastline December 2016')
            } else if (value == 2017) {
              Map.addLayer(edecember2017.updateMask(edecember2017).clip(poly), {palette: ['Black']}, 'Coastline December 2017')
            } else if (value == 2018) {
              Map.addLayer(edecember2018.updateMask(edecember2018).clip(poly), {palette: ['Black']}, 'Coastline December 2018')
            } else if (value == 2019) {
              Map.addLayer(edecember2019.updateMask(edecember2019).clip(poly), {palette: ['Black']}, 'Coastline December 2019')
            }
          }
      });
     panel.add(yearSelect41);
      //Winter - January
    } else if (value == 4.2) {
      var yearSelect42 = ui.Select({
        items: [
          {label: '2013', value: 2013},
          {label: '2014', value: 2014},
          {label: '2015', value: 2015},
          {label: '2016', value: 2016},
          {label: '2017', value: 2017},
          {label: '2018', value: 2018},
          {label: '2019', value: 2019}
          ],
          placeholder: "Select a year...",
          onChange: function(value){
            //Winter - January - Years
            if (value == 2013) {
              Map.addLayer(ejanuary2013.updateMask(ejanuary2013).clip(poly), {palette: ['Black']}, 'Coastline January 2013')
            } else if (value == 2014) {
              Map.addLayer(ejanuary2014.updateMask(ejanuary2014).clip(poly), {palette: ['Black']}, 'Coastline January 2014')
            } else if (value == 2015) {
              Map.addLayer(ejanuary2015.updateMask(ejanuary2015).clip(poly), {palette: ['Black']}, 'Coastline January 2015')
            } else if (value == 2016) {
              Map.addLayer(ejanuary2016.updateMask(ejanuary2016).clip(poly), {palette: ['Black']}, 'Coastline January 2016')
            } else if (value == 2017) {
              Map.addLayer(ejanuary2017.updateMask(ejanuary2017).clip(poly), {palette: ['Black']}, 'Coastline January 2017')
            } else if (value == 2018) {
              Map.addLayer(ejanuary2018.updateMask(ejanuary2018).clip(poly), {palette: ['Black']}, 'Coastline January 2018')
            } else if (value == 2019) {
              Map.addLayer(ejanuary2019.updateMask(ejanuary2019).clip(poly), {palette: ['Black']}, 'Coastline January 2019')
            }
          }
      });
      panel.add(yearSelect42);
      //Winter - February
    } else if (value == 4.3) {
      var yearSelect43 = ui.Select({
        items: [
          {label: '2013', value: 2013},
          {label: '2014', value: 2014},
          {label: '2015', value: 2015},
          {label: '2016', value: 2016},
          {label: '2017', value: 2017},
          {label: '2018', value: 2018},
          {label: '2019', value: 2019}
          ],
          placeholder: "Select a year...",
          onChange: function(value){
            //Winter - February - Years
            if (value == 2013) {
              Map.addLayer(efebruary2013.updateMask(efebruary2013).clip(poly), {palette: ['Black']}, 'Coastline February 2013')
            } else if (value == 2014) {
              Map.addLayer(efebruary2014.updateMask(efebruary2014).clip(poly), {palette: ['Black']}, 'Coastline February 2014')
            } else if (value == 2015) {
              Map.addLayer(efebruary2015.updateMask(efebruary2015).clip(poly), {palette: ['Black']}, 'Coastline February 2015')
            } else if (value == 2016) {
              Map.addLayer(efebruary2016.updateMask(efebruary2016).clip(poly), {palette: ['Black']}, 'Coastline February 2016')
            } else if (value == 2017) {
              Map.addLayer(efebruary2017.updateMask(efebruary2017).clip(poly), {palette: ['Black']}, 'Coastline February 2017')
            } else if (value == 2018) {
              Map.addLayer(efebruary2018.updateMask(efebruary2018).clip(poly), {palette: ['Black']}, 'Coastline February 2018')
            } else if (value == 2019) {
              Map.addLayer(efebruary2019.updateMask(efebruary2019).clip(poly), {palette: ['Black']}, 'Coastline February 2019')
            }
          }
      });
    panel.add(yearSelect43);
      //End of winter body code
    }
  }
});
panel.add(winterSeason);  //Winter season end
    }
  }
});
panel.add(theBigCode)
Map.setCenter(30.62577658402961,36.85300615614969 , 17.5)