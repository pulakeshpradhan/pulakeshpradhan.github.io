var borde = ui.import && ui.import("borde", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -79.47581104518116,
                -2.697106386603716
              ],
              [
                -79.47581104518116,
                -3.007085331129995
              ],
              [
                -79.06794361354054,
                -3.007085331129995
              ],
              [
                -79.06794361354054,
                -2.697106386603716
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
      "shown": true,
      "locked": false
    }) || 
    /* color: #d63000 */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Geometry.Polygon(
        [[[-79.47581104518116, -2.697106386603716],
          [-79.47581104518116, -3.007085331129995],
          [-79.06794361354054, -3.007085331129995],
          [-79.06794361354054, -2.697106386603716]]], null, false);
var f= require('users/dpacheco/modulos:funciones_globales.js');
//https://gis.stackexchange.com/questions/333883/removing-clouds-from-sentinel-2-surface-reflectance-in-google-earth-engine
var cld = require('users/fitoprincipe/geetools:cloud_masks')
var finicio=null;
var ffinal=null;
var S2=null;
var r_union=null;
var masked =null;
var test_image=null;
var collection=null;
// "2019-5-17","2019-08-10","2019-12-13","2020-01-07","2020-02-06","2020-02-11","2020-02-11","2020-03-22","2020-04-21","2020-08-04"  
//"2020-02-06","2020-02-11","2020-03-22","2020-04-21","2020-07-25","2020-08-04","2020-08-24"
    var vizParams = {
      bands: ['TCI_R', 'TCI_G', 'TCI_B']
    };
//var a = ["2020-07-25","2020-08-24"];
var a=["2020-02-06","2020-02-11","2020-03-22","2020-04-21","2020-08-24"];
a.forEach(function(entry) {
    finicio=f.st_nueva_fecha(entry,-2);
    ffinal=f.st_nueva_fecha(entry,2);
    S2 = ee.ImageCollection('COPERNICUS/S2_SR')
    .filterDate(finicio, ffinal)
    .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 100))
    .filterBounds(borde)
    //.map(MascaraNubesS)
    .map(function(image){return image.clip(borde)});
    test_image=S2.mosaic().select(['B1','B2','B3','B4','B5','B6','B7','B8','B8A','B9','B11','B12','AOT','WVP','SCL','TCI_R','TCI_G','TCI_B','QA60']);
    masked = cld.sclMask([ 'cloud_medium','cloud_high','shadow'])(test_image)
   // Map.addLayer(masked, vizParams, 'True RGB S2 ' + entry);
    if (r_union===null)
    {r_union=r_union = ee.ImageCollection(masked)}
    else
    {
      r_union = r_union.merge(masked);
    }
});
//EVI = G*(B8A-B04)/(B8A + C1B04 - C2B02 +1)
var addEVI = function(image) {
var evi = image.expression(
    '2.5 * (NIR - RED) / ((NIR + 6*RED - 7.5*BLUE) + 1)', {
      'NIR': image.select('B8'),
      'RED': image.select('B4'),
      'BLUE': image.select('B2')
});
return image.addBands(evi.rename('EVI'));
};
// Function to calculate and add SIPI
var addSIPI = function(image) {
  var sipi = image.expression(
    '(B08 - B01) / (B08 - B04)', {
      'B08': image.select('B8'),
      'B01': image.select('B1'),
      'B04': image.select('B4')
});
  return image.addBands(sipi.rename('SIPI'));
};
// Function to calculate and add an NDWI Normalized difference water index 1 band
var addNDWI = function(image) {
return image.addBands(image.normalizedDifference(['B3', 'B8']).rename('NDWI'));
};
var addNDII = function(image) {
return image.addBands(image.normalizedDifference(['B8', 'B11']).rename('NDII'));
};
// Function to calculate and add an GI Greeenness Index
var addMSI = function(image) {
var msi = image.select('B11').divide(image.select('B8'));
return image.addBands(msi.rename('MSI'));
};
//EVI2
var addEVI2 = function(image) {
var evi2 = image.expression(
    '2.4 * (NIR - RED) / ((NIR + RED + 1))', {
      'NIR': image.select('B8'),
      'RED': image.select('B4')
});
return image.addBands(evi2.rename('EVI2'));
};
var addARI1 = function(image) {
var ari1 = image.expression(
    '(1/B03)-(1/B05)', {
      'B03': image.select('B3'),
      'B05': image.select('B5')
});
return image.addBands(ari1.rename('ARI1'));
};
// Function to calculate and add an GI Greeenness Index
var addGI = function(image) {
var green = image.select('B3');
var red = image.select('B4');
var gi = green.divide(red);
return image.addBands(gi.rename('GI'));
};
var addNDVIre = function(image) {
return image.addBands(image.normalizedDifference(['B8', 'B5']).rename('NDVIre'));
};
var addGNDVI = function(image) {
return image.addBands(image.normalizedDifference(['B8', 'B3']).rename('GNDVI'));
};
// Function to calculate and add an WBI Water Body Index band
var addWBI = function(image) {
return image.addBands(image.normalizedDifference(['B2', 'B4']).rename('WBI'));
};
//https://assets.forest-atlas.org/geo/PDFs/GISLab_Report.pdf
var addNBR1 = function(image) {
var nbr1 = image.expression(
    '(B08 - B11) / (B08 + B11)', {
      'B08': image.select('B8'),
      'B11': image.select('B11')
});
return image.addBands(nbr1.rename('NBR1'));
};
//https://assets.forest-atlas.org/geo/PDFs/GISLab_Report.pdf
var addNBRI = function(image) {
var nbri = image.expression(
    '(B8 - B12) / (B8 + B12)', {
      'B8': image.select('B8'),
      'B12': image.select('B12')
});
return image.addBands(nbri.rename('NBRI'));
};
//https://www.indexdatabase.de/
//Canopy Chlorophyll Content Index
var addCCCI = function(image) {
var ccci = image.expression(
    '((nir - rededge) / (nir + rededge))/((nir - red) / (nir + red))', {
      'nir': image.select('B8'),
      'rededge': image.select('B5'),
      'red': image.select('B4')
});
return image.addBands(ccci.rename('CCCI'));
};
//Advanced Vegetation Index (AVI):
//https://acolita.com/lista-de-indices-espectrales-en-sentinel-2-y-landsat/
var addAVI = function(image) {
var avi = image.expression(
    '(B08 * (1 - B04) * (B08 - B04))', {
      'B08': image.select('B8'),
      'B04': image.select('B4')
});
return image.addBands(avi.cbrt().rename('AVI'));
};
//https://acolita.com/lista-de-indices-espectrales-en-sentinel-2-y-landsat/
var addSAVI = function(image) {
var savi = image.expression(
    '(B08 - B04) / (B08 + B04 + 0.428) * (1.428)', {
      'B08': image.select('B8'),
      'B04': image.select('B4')
});
return image.addBands(savi.rename('SAVI'));
};
//https://acolita.com/lista-de-indices-espectrales-en-sentinel-2-y-landsat/
var addNDMI = function(image) {
var ndmi = image.expression(
    '(B08 - B11) / (B08 + B11)', {
      'B08': image.select('B8'),
      'B11': image.select('B11')
});
return image.addBands(ndmi.rename('NDMI'));
};
//https://acolita.com/lista-de-indices-espectrales-en-sentinel-2-y-landsat/
var addGCI = function(image) {
var gci = image.expression(
    '(B9 / B3) -1', {
      'B9': image.select('B9'),
      'B3': image.select('B3')
});
return image.addBands(gci.rename('GCI'));
};
//https://acolita.com/lista-de-indices-espectrales-en-sentinel-2-y-landsat/
var addBSI = function(image) {
var bsi = image.expression(
    '(B11 + B4) - (B8 + B2) / (B11 + B4) + (B8 + B2)', {
      'B11': image.select('B11'),
      'B4': image.select('B4'),
      'B8': image.select('B8'),
      'B2': image.select('B2'),
      'B3': image.select('B3')
});
return image.addBands(bsi.rename('BSI'));
};
//https://acolita.com/lista-de-indices-espectrales-en-sentinel-2-y-landsat/
var addNDSI = function(image) {
var ndsi = image.expression(
    '(B11 - B12) / (B11 + B12)', {
      'B11': image.select('B11'),
      'B12': image.select('B12')
});
return image.addBands(ndsi.rename('NDSI'));
};
//kobayashi2019.pdf
var addAFRI1_6 = function(image) {
var afri16 = image.expression(
    '(Band8a - 0.66 * Band11) / (Band8a + 0.66 * Band11)', {
      'Band8a': image.select('B8A'),
      'Band11': image.select('B11')
});
return image.addBands(afri16.rename('AFRI1_6'));
};
var addAFRI2_1 = function(image) {
var afri21 = image.expression(
    '(Band8a - 0.5 * Band12) / (Band8a + 0.5 * Band12)', {
      'Band8a': image.select('B8A'),
      'Band12': image.select('B12')
});
return image.addBands(afri21.rename('AFRI2_1'));
};
var addARVI2 = function(image) {
var arvi2 = image.expression(
    '-0.18 + 1.17 *((band8-band4)/(band8+band4))', {
      'band8': image.select('B8'),
      'band4': image.select('B4')
});
return image.addBands(arvi2.rename('ARVI2'));
};
var addBNDVI = function(image) {
var bndvi = image.expression(
    '(b8-b2)/(b8+b2)', {
      'b8': image.select('B8'),
      'b2': image.select('B2')
});
return image.addBands(bndvi.rename('BNDVI'));
};
var addGLI = function(image) {
var gli = image.expression(
    '2*b3-b5-b2/2*b3+b5+b2', {
      'b3': image.select('B3'),
      'b5': image.select('B5'),
      'b2': image.select('B2')
});
return image.addBands(gli.rename('GLI'));
};
var addGNDVI = function(image) {
return image.addBands(image.normalizedDifference(['B8', 'B3']).rename('GNDVI'));
};
var addGNDVI2 = function(image) {
return image.addBands(image.normalizedDifference(['B7', 'B3']).rename('GNDVI2'));
};
var addNDVI = function(image) {
return image.addBands(image.normalizedDifference(['B8', 'B4']).rename('NDVI'));
};
var addNDVI2 = function(image) {
return image.addBands(image.normalizedDifference(['B12', 'B8']).rename('NDVI2'));
};
var addGRNDVI = function(image) {
var grndvi = image.expression(
    '(b8 -(b3+b5))/(b8+(b3+b5))', {
      'b3': image.select('B3'),
      'b5': image.select('B5'),
      'b8': image.select('B8')
});
return image.addBands(grndvi.rename('GRNDVI'));
};
var addLCI = function(image) {
var lci = image.expression(
    '(b8-b5)/(b8+b4)', {
      'b4': image.select('B4'),
      'b5': image.select('B5'),
      'b8': image.select('B8')
});
return image.addBands(lci.rename('LCI'));
};
var addMSR = function(image) {
var msr = image.expression(
    '(b8-b2)/(b4-b2)', {
      'b4': image.select('B4'),
      'b2': image.select('B2'),
      'b8': image.select('B8')
});
return image.addBands(msr.rename('MSR'));
};
var addNBR = function(image) {
var nbr = image.expression(
    '(B08 - B12) / (B08 + B12)', {
      'B08': image.select('B8'),
      'B12': image.select('B12')
});
return image.addBands(nbr.rename('NBR'));
};
var addNGRDI = function(image) {
return image.addBands(image.normalizedDifference(['B3', 'B5']).rename('NGRDI'));
};
var addPNDVI = function(image) {
var pndvi = image.expression(
    '(b8-(b3+b5+b2))/(b8+(b3+b5+b2)) ', {
      'b8': image.select('B8'),
      'b5': image.select('B5'),
      'b2': image.select('B2'),
      'b3': image.select('B3')
});
return image.addBands(pndvi.rename('PNDVI'));
};
var addPVR = function(image) {
return image.addBands(image.normalizedDifference(['B3', 'B4']).rename('PVR'));
};
var addSIWSI = function(image) {
return image.addBands(image.normalizedDifference(['B8A', 'B11']).rename('SIWSI'));
};
var addSLAVI = function(image) {
var slavi = image.expression(
    'b8/(b4+b12) ', {
      'b8': image.select('B8'),
      'b4': image.select('B4'),
      'b12': image.select('B12')
});
return image.addBands(slavi.rename('SLAVI'));
};
var addVI700 = function(image) {
return image.addBands(image.normalizedDifference(['B5', 'B4']).rename('VI700'));
};
r_union = r_union.map(addEVI);
r_union = r_union.map(addSIPI);
r_union = r_union.map(addNDWI);
r_union = r_union.map(addNDII);
r_union = r_union.map(addMSI);
r_union = r_union.map(addEVI2);
r_union = r_union.map(addARI1);
r_union = r_union.map(addNDVIre);
r_union = r_union.map(addWBI);
r_union = r_union.map(addAVI);
//https://assets.forest-atlas.org/geo/PDFs/GISLab_Report.pdf
r_union = r_union.map(addNBR1);
r_union = r_union.map(addNBRI);
r_union = r_union.map(addCCCI);
r_union = r_union.map(addSAVI);
r_union = r_union.map(addNDMI);
r_union = r_union.map(addGCI);
r_union = r_union.map(addBSI);
r_union = r_union.map(addNDSI);
//Crop classification using spectral indices derived from Sentinel-2A imagery
r_union = r_union.map(addAFRI1_6);
r_union = r_union.map(addAFRI2_1);
r_union = r_union.map(addARVI2);
r_union = r_union.map(addBNDVI);
r_union = r_union.map(addGLI);
r_union = r_union.map(addGNDVI);
r_union = r_union.map(addGNDVI2);
r_union = r_union.map(addGRNDVI);
r_union = r_union.map(addLCI);
r_union = r_union.map(addNBR);
r_union = r_union.map(addNDVI2);
r_union = r_union.map(addPNDVI);
r_union = r_union.map(addPVR);
r_union = r_union.map(addSIWSI);
r_union = r_union.map(addSLAVI);
r_union = r_union.map(addVI700);
S2 = r_union.reduce(ee.Reducer.median());
//quitar el texto "_median" del nombre de las bandas
var bands=S2.bandNames();
var renamed = bands.map(function(b){
var split = ee.String(b).replace("_median", "");
return ee.String(split);
 });
S2=S2.select(bands).rename(renamed);
Map.addLayer(S2, vizParams, 'True RGB S2 MOSAICO');
print(S2);
var carpeta_salida="GEE_INSUMOS/";
Map.centerObject(borde);
var S2_rgb= S2.select(['TCI_R','TCI_G','TCI_B'])
var vizParams = {
  bands: ['TCI_R', 'TCI_G', 'TCI_B']
};
var r1=f.st_exportar_archivo(S2.toFloat(), "S2_cuenca_median_feb_ago2020",carpeta_salida, borde,10);
var r2=f.st_exportar_archivo(S2_rgb.toFloat(), "S2_cuenca_median_RGB_feb_ago2020",carpeta_salida, borde,10);
//print(renamed);