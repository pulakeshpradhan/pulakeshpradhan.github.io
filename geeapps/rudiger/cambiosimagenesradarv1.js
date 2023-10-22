// 
// print('Procesando...')
// print('Por favor esperar')
var imcoll='COPERNICUS/S1_GRD'; 
// var imcoll='COPERNICUS/S1_GRD_FLOAT'; 
// var d1='2020-10-28';
var d1='2020-10-31';
var d2='2020-11-30';
var bds=['VV'];
// var bds=['VH'];
var blat=15.483333; // Coban
var blon=-90.366667; // Coban
// var blat=15.4725; // Morales
// var blon=-88.841389; // Morales
// var blat=15.256590; // Los Amates
// var blon=-89.092249; // Los Amates
// var blat=14.648855; // Chimaltenango libramiento
// var blon=-90.858976; // Chimaltenango libramiento
var a=ee.ImageCollection(imcoll).filterBounds(ee.Geometry.Point(blon,blat)).filterDate(d1,d2);
a=a.sort('system:time_start').toList(100);
var n1=a.length() 
var i1
for (i1=0; i1<(n1.getInfo()-1); i1++){
  var a2=a.get(i1)
  var a4=ee.Image(a2).select(bds).reproject('EPSG:4326',null,10);
  var a5=a4.getString('orbitProperties_pass');
  var i2
  var n2=n1.getInfo()-i1;
  if (n2>4){
    n2=4;
  }
  for (i2=1; i2<n2; i2++){  
    var a2_2=a.get(i1+i2)
    var a4_2=ee.Image(a2_2).select(bds).reproject('EPSG:4326',null,10);
    var a5_2=a4_2.getString('orbitProperties_pass');
    if (a5.getInfo()=='ASCENDING'&&a5_2.getInfo()=='ASCENDING'){
      var a6=a4.subtract(a4_2)
      // var a7=a4.getString('system:index').slice(19,25).getInfo()+'-'+a4_2.getString('system:index').slice(19,25).getInfo()
      var a7=a4.getString('system:index').slice(17,21).getInfo()+'-'+a4.getString('system:index').slice(21,23).getInfo()+'-'+a4.getString('system:index').slice(23,25).getInfo()+' al '+a4_2.getString('system:index').slice(17,21).getInfo()+'-'+a4_2.getString('system:index').slice(21,23).getInfo()+'-'+a4_2.getString('system:index').slice(23,25).getInfo()
      var a8=a6.focal_mean(5);
      Map.addLayer(a8,
          {'min': -4, 'max': 4, 'palette': ['00FF00', '0000FF'], 'bands': bds},
          a7+'_ASCENDING',0,0.5);
      Map.setCenter(blon, blat, 11);
    }
    if (a5.getInfo()=='DESCENDING'&&a5_2.getInfo()=='DESCENDING'){
      var a6=a4.subtract(a4_2)
      // var a7=a4.getString('system:index').slice(17,25).getInfo()+'-'+a4_2.getString('system:index').slice(17,25).getInfo()
      var a7=a4.getString('system:index').slice(17,21).getInfo()+'-'+a4.getString('system:index').slice(21,23).getInfo()+'-'+a4.getString('system:index').slice(23,25).getInfo()+' al '+a4_2.getString('system:index').slice(17,21).getInfo()+'-'+a4_2.getString('system:index').slice(21,23).getInfo()+'-'+a4_2.getString('system:index').slice(23,25).getInfo()
      var a8=a6.focal_mean(5);
      Map.addLayer(a8,
          {'min': -4, 'max': 4, 'palette': ['00FF00', '0000FF'], 'bands': bds},
          a7+'_DESCENDING',0,0.5);
      Map.setCenter(blon, blat, 11);
    }
  }
}
Map.setOptions('TERRAIN')
// print('Listo!')