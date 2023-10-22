/*
Author: Alaa Elgendawy (alaa.el-gendawy@students.mq.edu.au; arch.alaa.hosny@gmail.com)
This code is free and open.
By using this code and any data derived with it, you agree to cite the following reference 
in any publications derived from them:
(TO BE UPDATED) Elgendawy, A., Chang, H.-C., Peters, S. and Davies, P. (2021), 
A GIS-based Rapid Assessment Framework for UHI Consideration while Accommodating Future Population,
This code computes the Land Surface Temperature using Landsat 8 over Greater Sydney, Australia for summer 2016.
It uses predefined values for water vapour content according to Devereux and Caccetta (2017).
For more information on the following steps, or full references cited in this code, 
please refer to the previously mentioned publication, where all equations and values are referenced. 
*/
//Plank's radiation constant
var C1 = ee.Number.expression('1.19104*10**8');
var C2 = ee.Number(14387.7);
//Effective wavelength for Landsat 8 B10
var Y = ee.Number(10.896);
/* ------------1 CLOUD MASKING -------------------*/
// This function masks clouds for Raw collection.
function maskL8raw(image){
  //Bit 4 are cloud.
  var cloudsBitMask = (1 << 4);
  //Get the BQA band.
  var qa = image.select('BQA');
  //Flags should be set to zero, indicating clear conditions.
  var mask = qa.bitwiseAnd(cloudsBitMask).eq(0);
  return image.updateMask(mask);
}
// This function masks clouds for Surface Reflectance collection.
function maskL8SR(image) {
  var qa = image.select('QA_PIXEL');
  var mask = qa.bitwiseAnd(1 << 3)
    .and(qa.bitwiseAnd(1 << 9))
    .or(qa.bitwiseAnd(1 << 4));
  return image.updateMask(mask.not());
}
/* ------------2 CONVERT DN TO AT-SENSOR RADIANCE ----------------*/
// This function converts the DN for Landsat 8 Band 10 (Thermal band) to at-sensor radiance.
function CalcRadianceB10(image){
  var radiance = ee.Algorithms.Landsat.calibratedRadiance(image.select('B10')).rename('B10R');
  image = image.addBands(radiance)
  return image;
}
/* ------------3 CONVERT AT-SENSOR RADIANCE TO TOA REFLECTANCE (BRIGHTNESS TEMPERATURE) ----------------*/
// This function converts the at-sensor radiance and returns a band with brightness temperature value.
function BTemp(image){
  var BT = image.select('B10R').expression(
   'C2 / (Y * log((C1/((Y**5)*L) +1)))', {  
     'C1': C1,
     'C2': C2,
     'Y' : Y,
     'L': image.select('B10R')}).rename('BT');
  return image.addBands(BT);
}
/* ------------4 PARAMETERS----------------*/
// This function approximates Gamma paramater used for LST estimation and returns a band with the value.
function CalcH(image){
  var H = image.select('BT').expression(
    '(((C2 * L)/BT**2)*(((Y**4 * L)/C1) + (1/Y)))**-1', {
    'C1': C1,
    'C2': C2,
    'Y' : Y,
    'L': image.select('B10R'),
    'BT': image.select('BT')}).rename('H');
  return image.addBands(H);
}
// This function approximates Delta paramater used for LST estimation and returns a band with the value.
function CalcG(image){
  var G = image.select('BT').expression(
    '(-H * L) + BT', {
    'H': image.select('H'),
    'L': image.select('B10R'),
    'BT': image.select('BT')}).rename('G');
  return image.addBands(G);
}
/* ------------5 ATMOSPHERIC FACTORS----------------*/
// This function calculates the atmpsheric factors according to previously identified values for water vapor 
//date matching
function Date(image){
    var imgDate = image.date();
    var year = ee.Number.parse(imgDate.format('yyyy'));
    var month = ee.Number.parse(imgDate.format('MM'));
    var day = ee.Number.parse(imgDate.format('dd'));
    var date = ee.Date.fromYMD(year,month,day);
    var str = date.format('yyyy-MM-dd');
return ee.Image(image).set('date_string', str);
}
//adding WV value as a property and parameters as a property and image band
function addWV(WV, image){
  var W1 = ee.Number.expression('(0.0109 * (W**3)) + (0.0079 * (W**2)) + (0.0991 * W) + 1.0090', {
    'W': WV
  });
  var W2 = ee.Number.expression('(-0.0620 * W**3) + (-0.4671 * W**2) + (-1.2105 * W) + 0.1176',{
    'W': WV
  });
  var W3 = ee.Number.expression('(-0.0533 * W**3) + (0.4013 * W**2) + (0.8585 * W) - 0.0451',{
    'W': WV
  }) ;
  image = ee.Image(image).set('WV', WV);
  image = image.set('W1', W1);
  image = image.set('W2', W2);
  image = image.set('W3', W3);
  var img_W1 = ee.Image.constant(W1).toFloat().rename('W1');
  var img_W2 = ee.Image.constant(W2).toFloat().rename('W2');
  var img_W3 = ee.Image.constant(W3).toFloat().rename('W3');
  image = image.addBands(img_W1);
  image = image.addBands(img_W2);
  image = image.addBands(img_W3);
  return image
}
/* ------------6 LAND SURFACE EMISSIVITY ----------------*/
// This function calculates bands 4 and 5 scaling factor and offset
function Bands(image){
  var red = image.expression(
    '(B4*0.0000275)+(-0.2)',{
      'B4':image.select('SR_B4')
    }).rename('red');
  var nir = image.expression(
    '(B5*0.0000275)+(-0.2)',{
      'B5':image.select('SR_B5')
    }).rename('nir');
  image = image.addBands(red)
  image = image.addBands(nir)
  return image
} 
// This function approximates NDVI and returns a band with the value.
function NDVI(image){
  var ndvi = image.normalizedDifference(['nir','red']).rename('NDVI');
  return image.addBands(ndvi);
} 
//LSE values from CSIRO report by Devereux and Caccetta (2017)
var e_veg = ee.Number(0.9863);
var e_nonveg = ee.Number(0.93);
//constant values from Yu et al.(2014)
var f = ee.Number (0.55);
var soil_ndvi = ee.Number(0.2);
var veg_ndvi = ee.Number(0.5);
// This function approximates emissivity and returns a band with the value.
function EM(image){
  var fv = image.select('NDVI').expression('((N - Nmin)/(Nmax - Nmin))**2', {
    'N': image.select('NDVI'),
    'Nmin': soil_ndvi,
    'Nmax': veg_ndvi
  });
  var c = fv.expression('((1 - Es)*Ev)*(F*(1 - Pv))', {
    'Ev': e_veg,
    'Pv': fv,
    'Es': e_nonveg,
    'F': f
  });
  var em = image.select('NDVI').expression('(Ev*Pv) + (Es*(1 - Pv)) + C', {
    'Ev': e_veg,
    'Pv': fv,
    'Es': e_nonveg,
    'C': c
  }).rename('EM');
  return image.addBands(em);
}
/* ------------7 Land Surface Temperature ----------------*/
// This function approximates LST and returns a band with the value.
function LST(image){
  var H = image.select('H')
  var E = image.select('EM')
  var W1 = image.select('W1')
  var W2 = image.select('W2')
  var W3 = image.select('W3')
  var L = image.select('B10R')
  var G = image.select('G')
  var lst = L.expression(
    '(H * (1/E * ((W1 * L) + W2) + W3) + G)', {
      'H': H,
      'E': E,
      'W1': W1,
      'W2': W2,
      'W3': W3,
      'L': L,
      'G': G
    }).rename('LST')
return image.addBands(lst)
}
/////////////////////////////////////////////////////////////////////
//filtering the Landsat images to the exact dates from CSIRO report by Devereux and Caccetta (2017)
var FilterD1 = ee.Filter.date('2015-12-13','2015-12-14');//Row 83 and 84 - 2 images per date
var FilterD2 = ee.Filter.date('2015-12-29','2015-12-30');
var FilterD3 = ee.Filter.date('2016-01-30','2016-01-31');
var FilterD4 = ee.Filter.date('2016-02-15','2016-02-16');
var FilterD5 = ee.Filter.date('2016-03-02','2016-03-03');
var FilterD6 = ee.Filter.date('2016-03-18','2016-03-19');
var FilterD7 = ee.Filter.date('2015-12-04','2015-12-05');
var FilterD8 = ee.Filter.date('2016-02-22','2016-02-23');
var FilterD9 = ee.Filter.date('2016-03-25','2016-03-26');
var FilterD10 = ee.Filter.date('2015-12-20','2015-12-21');//Row 83
var FilterD11 = ee.Filter.date('2016-03-09','2016-03-10');//Row 83
var FilterD12 = ee.Filter.date('2016-02-06','2016-02-07');//Row 84
var FilterR1 = ee.Filter.eq('WRS_ROW', 83);
var FilterR2 = ee.Filter.eq('WRS_ROW', 84);
var Filter_2Row = ee.Filter.or(FilterD1,FilterD2,FilterD3,FilterD4,FilterD5,FilterD6,FilterD7,FilterD8,FilterD9);
var Filter_1Row = ee.Filter.or(FilterD10,FilterD11);
var Filter_83 = ee.Filter.and(Filter_1Row,FilterR1);
var Filter_84 = ee.Filter.and(FilterD12,FilterR2);
/////////////////////////////////////////////////////////////////////////
// geometry selecting region of interest, Greater Sydney, Australia
var GreatSyd = ee.Geometry.Polygon(
        [[[149.82011459553758, -32.926757799873684],
          [149.82011459553758, -34.38981185693982],
          [151.72624252522508, -34.38981185693982],
          [151.72624252522508, -32.926757799873684]]], null, false);
//load Raw collection and filter dates
var Filtered_Date = ee.ImageCollection("LANDSAT/LC08/C01/T1")
    .filterBounds(GreatSyd)
    .filter(ee.Filter.or(Filter_2Row,Filter_83,Filter_84))
    ;
//apply mask and run date function
var Filtered_Col =  Filtered_Date
    .map(maskL8raw)
    .map(Date)
    ;
//this is a list to add WV as property to images according to date
var list = Filtered_Col.toList(21);
for(var i = 0;i < 21; i++){
  var img = list.get(i);
  img = ee.Image(img);
  var _tempImg1 = addWV(1.4488516, img);
  var _tempImg2 = addWV(1.2584964, img);
  var _tempImg3 = addWV(2.5165224, img);
  var _tempImg4 = addWV(2.207205, img);
  var _tempImg5 = addWV(1.8433016, img);
  var _tempImg6 = addWV(2.0032082, img);
  var _tempImg7 = addWV(1.4488516, img);
  var _tempImg8 = addWV(1.2584964, img);
  var _tempImg9 = addWV(2.5165224, img);
  var _tempImg10 = addWV(2.207205, img);
  var _tempImg11 = addWV(1.8433016, img);
  var _tempImg12 = addWV(2.0032082, img);
  var _tempImg13 = addWV(1.2377302, img);
  var _tempImg14 = addWV(1.8495932, img);
  var _tempImg15 = addWV(2.1145362, img);
  var _tempImg16 = addWV(2.1785498, img);
  var _tempImg17 = addWV(1.8322668, img);
  var _tempImg18 = addWV(1.2377302, img);
  var _tempImg19 = addWV(2.04036, img);
  var _tempImg20 = addWV(2.1145362, img);
  var _tempImg21 = addWV(1.8322668, img);
  if(i == 0){
     _tempImg1;
     list = list.set(i, _tempImg1);
  }
  else if(i == 1){
    list = list.set(i, _tempImg2);
  }
  else if(i == 2){
    list = list.set(i, _tempImg3);
  }
  else if(i == 3){
    list = list.set(i, _tempImg4);
  }
  else if(i == 4){
    list = list.set(i, _tempImg5);
  }
  else if(i == 5){
    list = list.set(i, _tempImg6);
  }
  else if(i == 6){
    list = list.set(i, _tempImg7);
  }
  else if(i == 7){
    list = list.set(i, _tempImg8);
  }
  else if(i == 8){
    list = list.set(i, _tempImg9);
  }
  else if(i == 9){
    list = list.set(i, _tempImg10);
  }
  else if(i == 10){
    list = list.set(i, _tempImg11);
  }
  else if(i == 11){
    list = list.set(i, _tempImg12);
  }
  else if(i == 12){
    list = list.set(i, _tempImg13);
  }
  else if(i == 13){
    list = list.set(i, _tempImg14);
  }
  else if(i == 14){
    list = list.set(i, _tempImg15);
  }
  else if(i == 15){
    list = list.set(i, _tempImg16);
  }
  else if(i == 16){
    list = list.set(i, _tempImg17);
  }
  else if(i == 17){
    list = list.set(i, _tempImg18);
  }
  else if(i == 18){
    list = list.set(i, _tempImg19);
  }
  else if(i == 19){
    list = list.set(i, _tempImg20);
  }
  else if(i == 20){
    list = list.set(i, _tempImg21);
  }
}
Filtered_Col = ee.ImageCollection.fromImages(list);
//load Surface Reflectance collection for NDVI
var SR_Filtered = ee.ImageCollection("LANDSAT/LC08/C02/T1_L2")
  .filterBounds(GreatSyd)
  .filter(ee.Filter.or(Filter_2Row,Filter_83,Filter_84))
  .map(maskL8SR)
  .map(Bands)
  .map(NDVI)
  .map(EM)
  ;
//remaining compputations
var Col = Filtered_Col
  .map(CalcRadianceB10)
  .map(BTemp)
  .map(CalcH)
  .map(CalcG)
  ;
//combine collections  
var Combine = Col.combine(SR_Filtered); 
// compute the LST  
var CalcLST = Combine.map(LST);
// compute the mean LST
var mean = CalcLST.mean()
//Map centered to Sydney, Australia
Map.setCenter(150.9141, -33.8774, 11);
var LSTParam = {"opacity":1,"bands":["LST"],"min":286.89309053520014,"max":311.6265598571912,"palette":["ffffff","ff0000"]};
var ParamEM = {"opacity":1,"bands":["EM"],"min":0.9701571156794291,"max":1.0750162681242532,"palette":["ffffff","8f16a5"]};
//Map.addLayer(mean.select('BT'), {min: 285, max: 311, palette: ['white', 'red']}, 'Brightness Temp');
Map.addLayer(mean.select('NDVI'), {min: -1, max: 1, palette: ['blue', 'white', 'green']}, 'NDVI');
Map.addLayer(mean.select('EM'), ParamEM, 'Emissivity');
Map.addLayer(mean.select('LST'), LSTParam, 'LST'); 
// uncomment the code below to export an image band to your Google drive
/*
// Function to export LST image to Google Drive
Export.image.toDrive({
  image: mean.select('LST'),
  description: 'LST_2016', //User input for image name
  region: GreatSyd,
  scale: 30
});
*/