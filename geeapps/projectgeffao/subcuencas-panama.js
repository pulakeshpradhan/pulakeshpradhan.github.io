var gsoc = ui.import && ui.import("gsoc", "image", {
      "id": "users/projectgeffao/GSOCmap150"
    }) || ee.Image("users/projectgeffao/GSOCmap150"),
    color7 = ui.import && ui.import("color7", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "constant"
        ],
        "max": 7,
        "palette": [
          "040404",
          "c00e05",
          "ff4c4c",
          "ffc3a6",
          "fffdcf",
          "c7ff9c",
          "4cf507",
          "2f9904"
        ]
      }
    }) || {"opacity":1,"bands":["constant"],"max":7,"palette":["040404","c00e05","ff4c4c","ffc3a6","fffdcf","c7ff9c","4cf507","2f9904"]},
    TrajectCalNDVI_MK_Sen_7clas_2000_2018 = ui.import && ui.import("TrajectCalNDVI_MK_Sen_7clas_2000_2018", "image", {
      "id": "users/cesarnon/LDN_world_index/TrajectCalNDVI_MK_Sen_7clas_2000_2018"
    }) || ee.Image("users/cesarnon/LDN_world_index/TrajectCalNDVI_MK_Sen_7clas_2000_2018"),
    TrajectCalESPI_MK_Sen_7clas_2000_2018_v1 = ui.import && ui.import("TrajectCalESPI_MK_Sen_7clas_2000_2018_v1", "image", {
      "id": "users/cesarnon/LDN_world_index/TrajectCalESPI_MK_Sen_7clas_2000_2018_v1"
    }) || ee.Image("users/cesarnon/LDN_world_index/TrajectCalESPI_MK_Sen_7clas_2000_2018_v1"),
    SWATI_Cal7Clas_2000_2018 = ui.import && ui.import("SWATI_Cal7Clas_2000_2018", "image", {
      "id": "users/cesarnon/LDN_world_index/SWATI_Cal7Clas_2000_2018"
    }) || ee.Image("users/cesarnon/LDN_world_index/SWATI_Cal7Clas_2000_2018"),
    SWATI_Cal_ESPI7Clas_2000_2018 = ui.import && ui.import("SWATI_Cal_ESPI7Clas_2000_2018", "image", {
      "id": "users/cesarnon/LDN_world_index/SWATI_Cal_ESPI7Clas_2000_2018"
    }) || ee.Image("users/cesarnon/LDN_world_index/SWATI_Cal_ESPI7Clas_2000_2018"),
    SWATIslope_Cal_perc_7clas_nosig_2000_2018 = ui.import && ui.import("SWATIslope_Cal_perc_7clas_nosig_2000_2018", "image", {
      "id": "users/cesarnon/LDN_world_index/SWATIslope_Cal_perc_7clas_nosig_2000_2018"
    }) || ee.Image("users/cesarnon/LDN_world_index/SWATIslope_Cal_perc_7clas_nosig_2000_2018"),
    SWATI_ESPIslope_Cal_perc_7clas_nosig_2000_2018 = ui.import && ui.import("SWATI_ESPIslope_Cal_perc_7clas_nosig_2000_2018", "image", {
      "id": "users/cesarnon/LDN_world_index/SWATI_ESPIslope_Cal_perc_7clas_nosig_2000_2018"
    }) || ee.Image("users/cesarnon/LDN_world_index/SWATI_ESPIslope_Cal_perc_7clas_nosig_2000_2018"),
    UpperSakarya = ui.import && ui.import("UpperSakarya", "table", {
      "id": "users/cesarnon/Sakarya/UpperSakarya_edge_final"
    }) || ee.FeatureCollection("users/cesarnon/Sakarya/UpperSakarya_edge_final"),
    consensus = ui.import && ui.import("consensus", "image", {
      "id": "users/projectgeffao/Turkey/ConsensusModel_2001_2018_UpperSakarya_WGS84"
    }) || ee.Image("users/projectgeffao/Turkey/ConsensusModel_2001_2018_UpperSakarya_WGS84"),
    LSIB = ui.import && ui.import("LSIB", "table", {
      "id": "USDOS/LSIB/2017"
    }) || ee.FeatureCollection("USDOS/LSIB/2017"),
    LC2012unccdCat = ui.import && ui.import("LC2012unccdCat", "image", {
      "id": "users/projectgeffao/Panama/LC2012unccdCat"
    }) || ee.Image("users/projectgeffao/Panama/LC2012unccdCat"),
    LPD = ui.import && ui.import("LPD", "image", {
      "id": "users/projectgeffao/Panama/LPD_Panama_2001_2019"
    }) || ee.Image("users/projectgeffao/Panama/LPD_Panama_2001_2019"),
    subcuencas = ui.import && ui.import("subcuencas", "table", {
      "id": "users/projectgeffao/Panama/Cuencas_Subcuencas_Data8"
    }) || ee.FeatureCollection("users/projectgeffao/Panama/Cuencas_Subcuencas_Data8"),
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [],
      "displayProperties": [],
      "properties": {},
      "color": "#23cba7",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #23cba7 */ee.Geometry.MultiPoint();
var country = LSIB.filterMetadata('COUNTRY_NA', 'equals', 'Panama')
var zona = country
var microbasin= subcuencas
print (microbasin, 'microbasin')
///***************    Mapa favorito de LTI
var seleLTI = TrajectCalESPI_MK_Sen_7clas_2000_2018_v1.clip(zona)
Map.addLayer(seleLTI,color7,'Tendencia del ESPI 2001-2018',false)
var colorLTI = ['#040404','#c00e05','#ff4c4c','#ffc3a6',
'#fffdcf','#c7ff9c','#4cf507','#2f9904']
var namesLTIalf = ['0_SinDato','1_Fuerte Tendencia Negativa', '2_Moderada Tendencia Negativa',
'3_Suave Tendencia Negativa', '4_Sin tendencia significativa', 
'5_Suave Tendencia Positiva', '6_Moderada Tendencia Positiva',
'7_Fuerte Tendencia Positiva']
var areaClassLTI = seleLTI.eq([0,1, 2, 3, 4, 5, 6,7]).rename(namesLTIalf);
var areaEstimateLTI = areaClassLTI.multiply(ee.Image.pixelArea()).divide(10000);
///***************    Primera parte preparo el mapa de 7 categorias 
//2018
/*
var dataset2018 = ee.Image('COPERNICUS/CORINE/V20/100m/2018');
var landCover2018 = dataset2018.select('landcover').clip(zona);
//Map.setCenter(16.436, 39.825, 6);
//Map.addLayer(landCover2018, {}, 'Land Cover2018');
var corineRec = function(imagen) {
  var imagen2 = ee.Image(0)
                .where (imagen.gte(111).and(imagen.lte(199)),5) //Artificial
                .where (imagen.gte(211).and(imagen.lte(299)),3) //Cropland
                .where (imagen.gte(311).and(imagen.lte(319)),1) //Tree-Covered
                .where (imagen.gte(321).and(imagen.lte(323)),2) //Grassland
                .where (imagen.eq(324),1) //Tree-Covered
                .where (imagen.gte(331).and(imagen.lte(332)),6) //Other Land
                .where (imagen.gte(333).and(imagen.lte(334)),2) //Grassland
                .where (imagen.eq(335),6) //Other Land
                .where (imagen.gte(411).and(imagen.lte(499)),4) //Wetlands
                .where (imagen.gte(511).and(imagen.lte(599)),7) //Water Body
                .clip(zona)
  return imagen2
}
*/
var colorCorine = ['#377e3f','#c19511', '#fcdb00', '#18eebe','#d7191c', '#cfdad2', '#4458eb']
var namesCorine = ['Bosque', 'Pastizal', 'Cultivo', 'Humedal', 'Artificial', 'Otras_Tierras', 'Agua']
var namesCorinealf = ['1_Bosque', '2_Pastizal', '3_Cultivo', '4_Humedal', '5_Artificial', '6_Otras_Tierras', '7_Agua']
var landCover2018rec = LC2012unccdCat.selfMask().clip(zona)
Map.addLayer(landCover2018rec, {min:1, max:7, palette:colorCorine}, 'Cobertura del suelo 2012 (UNCCD class)',true)
var areaClass = landCover2018rec.eq([1, 2, 3, 4, 5, 6,7]).rename(namesCorinealf);
var areaEstimate = areaClass.multiply(ee.Image.pixelArea()).divide(10000);
//print (areaEstimate)
//************              Preparo el Gsoc
var gsocup = gsoc.unmask().clip(zona)
///***************      LPD
var lpd0306 = LPD //ee.Image('users/cesarnon/Sakarya/LPD_sakarya_min03_max06').unmask().clip(zona)
var lpd_vispar = {max: 5,
min: 0,
opacity: 1,
palette: ["#000000","ff0000","ffbebe","ffff73","a3ff73","267300"],
};
var colorlpd = ["#000000","ff0000","ffbebe","ffff73","a3ff73","267300"]
var nameslpd = ['SinDato','Decreciente', 'Signo temprano de declive', 'Estable pero estresada', 'Estable', 'Incrementando']
var nameslpdalf = ['0_SinDato','1_Decreciente', '2_Signo temprano de declive', '3_Estable pero estresada', '4_Estable', '5_Incrementando']
Map.addLayer(lpd0306,lpd_vispar,'Dinamica de la Productividad (JRC)',false)
//Map.addLayer(lpdsd,lpd_vispar,'lpdsd LPD FAO',false)
var areaClasslpd = lpd0306.eq([0,1, 2, 3, 4, 5]).rename(nameslpdalf);
var areaEstimatelpd = areaClasslpd.multiply(ee.Image.pixelArea()).divide(10000);
///***************      LTI models
/*
var SWATIslope_ESPI_2001_2018 = SWATI_ESPIslope_Cal_perc_7clas_nosig_2000_2018.clip(zona)     
var SWATIslope_NDVI_2001_2018 = SWATIslope_Cal_perc_7clas_nosig_2000_2018.clip(zona)    
var SWATI_ESPI_2001_2018 = SWATI_Cal_ESPI7Clas_2000_2018.clip(zona)    
var SWATI_NDVI_2001_2018 = SWATI_Cal7Clas_2000_2018.clip(zona)    
var ESPI_MKSen_2001_2018 = TrajectCalESPI_MK_Sen_7clas_2000_2018_v1.clip(zona)    
var NDVI_MKSen_2001_2018 = TrajectCalNDVI_MK_Sen_7clas_2000_2018.clip(zona)   
/*
var consensus = SWATIslope_ESPI_2001_2018
  .add(SWATIslope_NDVI_2001_2018)
  .add(SWATI_ESPI_2001_2018)
  .add(SWATI_NDVI_2001_2018)
  .add(ESPI_MKSen_2001_2018)
  .add(NDVI_MKSen_2001_2018)
  .divide(6)
  .round()
//var color7n = {"opacity":1,"bands":["constant"],"min":-3,"max":3,"palette":["040404","c00e05","ff4c4c","ffc3a6","fffdcf","c7ff9c","4cf507","2f9904"]}
*/
// var allimages = SWATIslope_ESPI_2001_2018.rename('SWATIslope_ESPI')
//   .addBands(SWATIslope_NDVI_2001_2018.rename('SWATIslope_AM'))
//   .addBands(SWATI_ESPI_2001_2018.rename('SWATI_ESPI'))
//   .addBands(SWATI_NDVI_2001_2018.rename('SWATI_AM'))
//   .addBands(ESPI_MKSen_2001_2018.rename('LTT_ESPI'))
//   .addBands(NDVI_MKSen_2001_2018.rename('LTT_AM'))
// print (allimages)
///////////*************************   AM NDVI
var yrStart = 2000;
var yrEnd = 2019; 
//make a list for calendar year computation / year 2000 is not complete so I added a +1
var years = ee.List.sequence(yrStart+1, yrEnd);
//print(years, 'years for calendar analysis')
//Load NDVI collection
var modis = ee.ImageCollection('MODIS/006/MOD13Q1')
.filterDate('2000-07-01', '2019-12-31');
//print(modis, 'collection to process');
var modisFilter =ee.ImageCollection('MODIS/006/MOD13Q1')
.filterDate('2001-01-01', '2018-12-31')
.select('NDVI');
var months2 = ee.List.sequence(1, 12);
var years2 = ee.List.sequence(2001, 2019);
var byMonthYear = ee.ImageCollection.fromImages(
  years2.map(function(y) {
    return months2.map(function (m) {
      return modisFilter
        .filter(ee.Filter.calendarRange(y, y, 'year'))
        .filter(ee.Filter.calendarRange(m, m, 'month'))
        .mean()
        .set('system:time_start',ee.Date.fromYMD(y,m,1))
        //.set('month', m).set('year', y);
  });
}).flatten());
//print(byMonthYear,'byMonthYear')
var byMonthYear2 = byMonthYear.select('NDVI')
//Load water cover from same sensor
//make a mask for more permanent water bodies
var modiswater = ee.ImageCollection('MODIS/006/MOD44W').select('water_mask')
var waterMask = modiswater.sum().gte(12)// limit set on 12 years
var waterSum = modiswater.sum().reproject('SR-ORG:6974', null, 250)
//Map.addLayer(waterSum,{},'waterMask',false)
//create a variable for band naming
var nn = ee.String('ndvi_')
// Get the NDVI, EVI and ESPI Annual mean for every calendar Year 
// and replace bad quality pixels with anual mean
var byYear = ee.ImageCollection.fromImages(
      years.map(function (y) {
        //get the subset for the target year
        var modisYear = modis.filter(ee.Filter.calendarRange(y, y, 'year'))
        //get the mean for NDVI
        var modisYearMean = modisYear.select('NDVI').mean()
        // Make a funtion to replace bad pixels with the mean
        var maskQAYear = function(image) {
          var image2 = image.select('NDVI');
          var image2 = image2.where(image.select("SummaryQA").gte(2),modisYearMean);
        return image2.rename('NDVI');
        }
        var ModisYearCorrected = modisYear.map(maskQAYear)
        var ModisYearCorrmean = ModisYearCorrected.mean()//.reproject('SR-ORG:6974', null, 250)
                        .set('year', y)
                        .set('system:time_start',ee.Date.fromYMD(y,1,1))
                        .rename('AM')
                        //.rename(nn.cat(ee.String(ee.Number(y).toInt()))); // to name each band like "NDVI_yyyy"
        // Make a funtion to calculate ESPI
        var ModisYearmeanNDVI = ModisYearCorrmean.select('AM')
        var ModisYearstdDeNDVI = ModisYearCorrected.select('NDVI').reduce(ee.Reducer.stdDev()).rename('NDVIs')
        var ModisYearcvNDVI = ModisYearstdDeNDVI.divide(ModisYearmeanNDVI).rename('NDVIcv')
        var uno = ee.Image(1)
        var ipse = ModisYearmeanNDVI.multiply(uno.subtract(ModisYearcvNDVI)).rename('ESPI')
        //add ESPI to corrected NDVI and EVI and return
        return ModisYearCorrmean.addBands(ipse)
}));
//print(byYear,'Colection of calendar year means');
//***************** Create Panel in the left to accomodate every widget, panel, chart and legend.
// -------Create User Interface portion-----
// **  Also taken from a GEE example : 'Two Chart Inspector'
// Create a panel to hold our widgets.
var panel = ui.Panel();
panel.style().set('width', '400px');
// Create an intro panel with labels.
var intro = ui.Panel([
  ui.Label({
    value: 'Plataforma de Conocimiento',
    style: {fontSize: '20px', fontWeight: 'bold'}
  }),
  ui.Label('Por favor, respoda la encuesta en:'),
  ui.Label('https://forms.gle/LLemxofDW96eHJVy6')
]);
panel.add(intro);
var intro2 = ui.Panel([
  ui.Label({
    value: 'Haga click en una subcuenca para ver sus datos - (paciencia que demora unos segundos)',
    style: {fontSize: '20px', fontWeight: 'bold', color: '#0b57f3'}
  })
]);
//panel.add(intro);
//********************************* Create legend Corine.
var legendCorine = ui.Panel({
  style: {
    position: 'bottom-right',
    //position: 'bottom-left',
    padding: '8px 15px'
  }
});
// Create and add the legend title.
var legendTitleCorine = ui.Label({
  value: 'Mapa de Cobertura 2012',
  style: {
    fontWeight: 'bold',
    fontSize: '16px',
    margin: '0 0 4px 0',
    padding: '0'
  }
});
legendCorine.add(legendTitleCorine);
//var loading = ui.Label('Loading legend...', {margin: '2px 0 4px 0'});
//legend.add(loading);
// Creates and styles 1 row of the legend.
var makeRowCorine = function(color, name) {
  // Create the label that is actually the colored box.
  var colorBoxCorine = ui.Label({
    style: {
      backgroundColor: color,
      // Use padding to give the box height and width.
      padding: '6px',
      margin: '0 0 3px 0'
          }
  });
// Create the label filled with the colorCorine text.
  var descriptionCorine = ui.Label({
    value: name,
    style: {margin: '0 0 2px 4px'}
  });
  return ui.Panel({
    widgets: [colorBoxCorine, descriptionCorine],
    layout: ui.Panel.Layout.Flow('horizontal')
  });
};
//Colors from the original corine metadata
/*
var namesCorine = dataset2018.get('landcover_class_names').getInfo()
var colorCorine = dataset2018.get('landcover_class_palette').getInfo()
print (namesCorine)
print (colorCorine)
*/
for (var i = 0; i < namesCorine.length; i++) {
    legendCorine.add(makeRowCorine(colorCorine[i], namesCorine[i]));
    //print(color[i], names[i])
  }
//Map.add(legendCorine)
panel.widgets().set(1, legendCorine)
/////*********************    Legend for the LTI
// Create the panel for the legend items.
// var color = ['040404','c00e05','ff4c4c','ffc3a6',
// 'fffdcf','c7ff9c','4cf507','2f9904']
var legendLTI = ui.Panel({
  style: {
    position: 'bottom-left',
    //position: 'bottom-left',
    padding: '8px 15px'
  }
});
// Create and add the legend title.
var legendTitleLTI = ui.Label({
  value: 'Tendencia de la Productividad',
  style: {
    fontWeight: 'bold',
    fontSize: '16px',
    margin: '0 0 4px 0',
    padding: '0'
  }
});
var legendTitleLTIad = ui.Label({value: 'Tendencia del Ecosystem Service Productivity Index, usado como indicador de la productividad primaria'})
legendLTI.add(legendTitleLTI);
legendLTI.add(legendTitleLTIad);
//var loading = ui.Label('Loading legend...', {margin: '2px 0 4px 0'});
//legend.add(loading);
// Creates and styles 1 row of the legend.
var makeRowLTI = function(colorLTI, namesLTI) {
  // Create the label that is actually the colored box.
  var colorBoxLTI = ui.Label({
    style: {
      backgroundColor: colorLTI,
      // Use padding to give the box height and width.
      padding: '6px',
      margin: '0 0 3px 0'
          }
  });
  // Create the label filled with the description text.
  var descriptionLTI = ui.Label({
    value: namesLTI,
    style: {margin: '0 0 2px 4px'}
  });
  return ui.Panel({
    widgets: [colorBoxLTI, descriptionLTI],
    layout: ui.Panel.Layout.Flow('horizontal')
  });
};
var namesLTI = ['SinDato','Fuerte Tendencia Negativa', 'Moderada Tendencia Negativa',
'Suave Tendencia Negativa', 'Sin tendencia significativa', 
'Suave Tendencia Positiva', 'Moderada Tendencia Positiva',
'Fuerte Tendencia Positiva']
for (var i = 0; i < namesLTI.length; i++) {
    legendLTI.add(makeRowLTI(colorLTI[i], namesLTI[i]));
  }
//********************************* Create legend lpd.
var legendlpd = ui.Panel({
  style: {
    position: 'bottom-right',
    //position: 'bottom-left',
    padding: '8px 15px'
  }
});
// Create and add the legend title.
var legendTitlelpd = ui.Label({
  value: 'Dinamica de la Productividad de la Tierra 2001-2019',
  style: {
    fontWeight: 'bold',
    fontSize: '16px',
    margin: '0 0 4px 0',
    padding: '0'
  }
});
var legendTitlelpdad = ui.Label({value: 'Indicador de la de capacidad productiva de la tierra basado en la metodologia del JRC'})
legendlpd.add(legendTitlelpd);
legendlpd.add(legendTitlelpdad);
//var loading = ui.Label('Loading legend...', {margin: '2px 0 4px 0'});
//legend.add(loading);
// Creates and styles 1 row of the legend.
var makeRowlpd = function(color, name) {
  // Create the label that is actually the colored box.
  var colorBoxlpd = ui.Label({
    style: {
      backgroundColor: color,
      // Use padding to give the box height and width.
      padding: '6px',
      margin: '0 0 3px 0'
          }
  });
// Create the label filled with the colorlpd text.
  var descriptionlpd = ui.Label({
    value: name,
    style: {margin: '0 0 2px 4px'}
  });
  return ui.Panel({
    widgets: [colorBoxlpd, descriptionlpd],
    layout: ui.Panel.Layout.Flow('horizontal')
  });
};
//Colors from the original lpd metadata
/*
var nameslpd = dataset2018.get('landcover_class_names').getInfo()
var colorlpd = dataset2018.get('landcover_class_palette').getInfo()
print (nameslpd)
print (colorlpd)
*/
for (var i = 0; i < nameslpd.length; i++) {
    legendlpd.add(makeRowlpd(colorlpd[i], nameslpd[i]));
    //print(color[i], names[i])
  }
//Map.add(legendlpd)
panel.widgets().set(2, legendlpd)
//*****************               Create Drawing tool.
//1. Get the drawing tools widget object; define it as a variable for convenience in recalling it later.
var drawingToolsLeft = Map.drawingTools()//.and(rightMap.drawingToolsLeft());
//2. Hide the default drawing tools so you can add your own. You can use the default drawing tools for interactive region reduction, but they provide more functionality than is needed when simplicity is the goal.
drawingToolsLeft.setShown(false);
//3. Setup a while loop to clear all existing geometries that have been added as imports from drawing tools (from previously running the script). The design of the app is to handle charting a time series for a single geometry, so remove any that exist.
while (drawingToolsLeft.layers().length() > 0) {
  var layer = drawingToolsLeft.layers().get(0);
  drawingToolsLeft.layers().remove(layer);
}
//4. Initialize a dummy GeometryLayer with null geometry to act as a placeholder for drawn geometries.
var dummyGeometry =
    ui.Map.GeometryLayer({geometries: null, name: 'geometry', color: '23cba7'});
drawingToolsLeft.layers().add(dummyGeometry);
//Event callback functions
//Define callback functions to enable drawing and chart rendering, they will be attached to event listeners in the following sections.
//Drawing buttons
//Define a series of functions that are called when geometry drawing buttons are clicked: one for clearing the previous geometry from the GeometryLayer and one for each drawing mode button (rectangle, polygon, and point).
//1. Define the geometry clearing function.
function clearGeometry() {
  var layers = drawingToolsLeft.layers();
  layers.get(0).geometries().remove(layers.get(0).geometries().get(0));
}
//2. Define functions that will be called when each respective drawing button is clicked. Each function will clear previous drawings using the clearGeometry function and then initialize drawing for the particular drawing mode.
function drawRectangle() {
  clearGeometry();
  drawingToolsLeft.setShape('rectangle');
  drawingToolsLeft.draw();
}
function drawPolygon() {
  clearGeometry();
  drawingToolsLeft.setShape('polygon');
  drawingToolsLeft.draw();
}
function drawPoint() {
  clearGeometry();
  drawingToolsLeft.setShape('point');
  drawingToolsLeft.draw();
}
//***** make the User interface
//This section defines the drawing control panel, which contains instructions and drawing tool buttons.
//1. Define a dictionary of symbols to augment the text label for each of the geometry buttons defined in the following step. The symbols are kept separate from the text to avoid unexpected cursor behavior when mixing symbols and text.
var symbol = {
  rectangle: '⬛',
  polygon: '🔺',
  point: '📍',
};
//2. Define a ui.Panel to hold app instructions and the geometry drawing buttons. Use a ui.Label for each instruction line and a ui.Button for each of the three geometry drawing options. Button labels are the concatenation of the symbols defined in the previous step and text. Set the onClick parameter to each respective drawing mode callback function defined above.
var controlPanel = ui.Panel({
  widgets: [
    ui.Label('1. Select a drawing mode.'),
    ui.Button({
      label: symbol.rectangle + ' Rectangle',
      onClick: drawRectangle,
      style: {stretch: 'horizontal'}
    }),
    ui.Button({
      label: symbol.polygon + ' Polygon',
      onClick: drawPolygon,
      style: {stretch: 'horizontal'}
    }),
    ui.Button({
      label: symbol.point + ' Point',
      onClick: drawPoint,
      style: {stretch: 'horizontal'}
    }),
  /*ui.Label('2. Draw a geometry.'),
    ui.Label('3. Wait for chart to render.'),
  ui.Label(
        '4. Repeat 1-3 or edit/move\ngeometry for a new chart.',
        {whiteSpace: 'pre'})*/
  ],
  style: {position: 'bottom-left'},
  layout: null,
});
///*****************   GSOC legend
// --------
  var legendTitle = ui.Label('Mapa GSOC v1.5',
    {fontWeight: 'bold', fontSize: '16px', margin: '5px 0 6px 8px'});
  var legendSubtitle = ui.Label('SOC tonnes.ha-1',
    {margin: '-6px 0 6px 8px'});
  var vis = {min: 0, max: 100, palette: ['#3288BD','#99D594','#E6F598',
  '#FFFFBF','#FEE08B','#FC8D59','#D53E4F']};
  var makeColorBarParams = function(palette) {
    return {
      bbox: [0, 0, 1, 0.1],
      dimensions: '100x10',
      format: 'png',
      min: 0,
      max: 1,
      palette: palette,
    };
  };
  // Create the color bar for the legend.
  var colorBar = ui.Thumbnail({
    image: ee.Image.pixelLonLat().select(0),
    params: makeColorBarParams(vis.palette),
    style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
  });
  // Create a panel with three numbers for the legend.
  var legendLabels = ui.Panel({
    widgets: [
      ui.Label(vis.min, {margin: '4px 8px'}),
      ui.Label((vis.max / 2),
        {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
      ui.Label(vis.max, {margin: '4px 8px'})
      ],
    layout: ui.Panel.Layout.flow('horizontal')
  });
  var legendGsoc = ui.Panel({
    widgets: [legendTitle, legendSubtitle, colorBar, legendLabels],
    style: {margin: '0px 0px -2px 0px'}
  });
//return legendPanel;
///***************** end GSOC
//*************************** Define the Callback on click ---- CHART and Table RESULTS
var clikear = function(coords) {
  // Update the lon/lat panel with values from the click event.
  //LON.setValue('LON: ' + coords.lon.toFixed(2)),
  //lat.setValue('lat: ' + coords.lat.toFixed(2));
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  //print (point)
  var roi = microbasin//.flatten()
    .filterBounds(point);
  //print (roi,'roi')
  var polyname = ee.String(roi.first().get('Subcuenca'))
  //print (polyname,'polyname')
  // Create roi panel  
    var roipanel = ui.Panel({
    style: {
      position: 'bottom-right',
      //position: 'bottom-left',
      padding: '8px 15px'
      }
    });
// Create unit name panel.
    var roiTitle = ui.Label({
      value: 'La subcuenca seleccionada es:',
      style: {
        fontWeight: 'bold',
        fontSize: '20px',
        //color: '#0b57f3',
        margin: '0 0 4px 0',
        padding: '0'
      }
    });
  roipanel.add(roiTitle);
    var nombre = ui.Label({
    value: 'Name: ' + polyname.getInfo(),
    style: {fontSize: '20px', fontWeight: 'bold', color: '#0b57f3'}
    })
    roipanel.add(ui.Panel([nombre], ui.Panel.Layout.flow('vertical')))
    //nombre.setValue('Name of ROI: ' + polyname.getInfo())
    //panel.add(nombre)
  // // Get the drawn geometry; it will define the reduction region.
  // var roi = drawingToolsLeft.layers().get(0).getEeObject();
  // // Set the drawing mode back to null; turns drawing off.
  // drawingToolsLeft.setShape(null);
  // // Reduction scale is based on map scale to avoid memory/timeout errors.
  // /*
  // var mapScale = Map.getScale();
  // var scale = mapScale > 5000 ? mapScale * 2 : 5000;
  // */
/// Make LTI pie
    var chartLTI = ui.Chart.image
    .regions({
      image: areaEstimateLTI,
      regions: roi,
      reducer: ee.Reducer.sum(),
      scale: 20,
    })
    .setChartType('PieChart').setOptions({
      width: 250,
      height: 350,
      title: 'Tendencia de la Productividad',
      is3D: true,
      //seriesProperty:false,
      //labels:false,
      colors: colorLTI
      //['#e0440e', '#e6693e', '#ec8f6e', '#f3b49f', '#f6c7b6','#ffffcc','#e0440e'],
    });
/// Make corine Pie
    var chartCorine = ui.Chart.image
    .regions({
      image: areaEstimate,
      regions: roi,
      reducer: ee.Reducer.sum(),
      scale: 20,
    })
    .setChartType('PieChart').setOptions({
      width: 250,
      height: 350,
      title: 'Cobertura de la Tierra',
      is3D: true,
      //seriesProperty:false,
      //labels:false,
      colors: colorCorine
      //['#e0440e', '#e6693e', '#ec8f6e', '#f3b49f', '#f6c7b6','#ffffcc','#e0440e'],
    });
///
// Create LCSTAT stat panel  
    var LCstatpanel = ui.Panel({
    style: {
      position: 'bottom-right',
      //position: 'bottom-left',
      padding: '8px 15px'
      }
    });
// Create and add the legend title.
    var LCTitle = ui.Label({
      value: 'Estadisticas de Coberturas',
      style: {
        fontWeight: 'bold',
        fontSize: '16px',
        margin: '0 0 4px 0',
        padding: '0'
      }
    });
  LCstatpanel.add(LCTitle);
  //var mean2 = mean.get('b1')
  //var mean1 = ee.String('Mean: ' + mean.get('b1')).toString()
  //var meancat = ee.String('Mean :  ')
  var nBosque = ee.String(ee.Number(roi.first().get('Bosque')).round())
  var nBosque2019 =ee.String(ee.Number(roi.first().get('Bosque2019')).round())
  var nPasto =ee.String(ee.Number(roi.first().get('Pasto')).round())
  var nArroz =ee.String(ee.Number(roi.first().get('Arroz')).round())
  var nPlatano =ee.String(ee.Number(roi.first().get('Platano')).round())
  var nMaiz =ee.String(ee.Number(roi.first().get('Maiz')).round())
  var nCafe =ee.String(ee.Number(roi.first().get('Café')).round())
  var Bosque = ui.Label({value:'Bosque 2012: ' + nBosque.getInfo() + ' ha'});
  var Bosque2019 = ui.Label({value:'Bosque 2019: ' + nBosque2019.getInfo() + ' ha'});
  var Pasto = ui.Label({value:'Pasto 2012: ' + nPasto.getInfo() + ' ha'});
  var Arroz = ui.Label({value:'Arroz 2012: ' + nArroz.getInfo() + ' ha'});
  var Platano = ui.Label({value:'Platano 2012: ' + nPlatano.getInfo() + ' ha'});
  var Maiz = ui.Label({value:'Maiz 2012: ' + nMaiz.getInfo() + ' ha'});
  var Cafe = ui.Label({value:'Café 2012: ' + nCafe.getInfo() + ' ha'});
    LCstatpanel.add(ui.Panel([Bosque, Bosque2019,Pasto,Arroz,Platano,Maiz,Cafe], ui.Panel.Layout.flow('vertical')))
    var LCTitle2 = ui.Label({
      value: 'Estadisticas de Área',
      style: {
        fontWeight: 'bold',
        fontSize: '16px',
        margin: '0 0 4px 0',
        padding: '0'
      }
    });
    LCstatpanel.add(LCTitle2);
    var nHectareas = ee.String(ee.Number(roi.first().get('Hectareas')).round())
    var nFireXkm2 =ee.String(ee.Number(roi.first().get('FireXkm2')).format('%.2f'))
    var nMontCov =ee.String(ee.Number(roi.first().get('MontCov')).round())
  var Hectareas = ui.Label({value:'Superficie: ' + nHectareas.getInfo() + ' ha'});
  var FireXkm2 = ui.Label({value:'Fuegos (2000-2020): ' + nFireXkm2.getInfo() + ' x Km2'});
  var MontCov = ui.Label({value:'Área de montaña: ' + nMontCov.getInfo() + '%'});
    LCstatpanel.add(ui.Panel([Hectareas, FireXkm2,MontCov], ui.Panel.Layout.flow('vertical')))
/// Make LPD Pie
    var chartlpd = ui.Chart.image
    .regions({
      image: areaEstimatelpd,
      regions: roi,
      reducer: ee.Reducer.sum(),
      scale: 250,
    })
    .setChartType('PieChart').setOptions({
      width: 250,
      height: 350,
      title: 'Dinamica de la Productividad de la Tierra',
      is3D: true,
      //seriesProperty:false,
      //labels:false,
      colors: colorlpd
      //['#e0440e', '#e6693e', '#ec8f6e', '#f3b49f', '#f6c7b6','#ffffcc','#e0440e'],
    });
/// Make SOC stats
// FixSocStock SOC Stock in t/ha	
var socMask = gsoc.unmask().gte(0)	
var socArea = socMask.multiply(ee.Image.pixelArea()).divide(10000);	
var socStock = gsoc.eq(0).rename('cero').addBands(gsoc.multiply(socArea).rename('gsoc_sum'))	
  var escala = 1000
  var mean = gsoc.reduceRegion({
    reducer: ee.Reducer.mean(),
    geometry: roi,
    maxPixels: 1e13,
    scale:escala,
  })
  var max = gsoc.reduceRegion({
    reducer: ee.Reducer.max(),
    geometry: roi,
    maxPixels: 1e13,
    scale:escala,
  })
  var min = gsoc.reduceRegion({
    reducer: ee.Reducer.min(),
    geometry: roi,
    maxPixels: 1e13,
    scale:escala,
  })
  var sum = socStock.reduceRegion({
    reducer: ee.Reducer.sum(),
    geometry: roi,
    maxPixels: 1e13,
    scale:escala,
  })
// Create SOC stat panel  
    var socstatpanel = ui.Panel({
    style: {
      position: 'bottom-right',
      //position: 'bottom-left',
      padding: '8px 15px'
      }
    });
// Create and add the legend title.
    var socTitle = ui.Label({
      value: 'Estadisticas de Carbono Organico (GSOC-FAO)',
      style: {
        fontWeight: 'bold',
        fontSize: '16px',
        margin: '0 0 4px 0',
        padding: '0'
      }
    });
  socstatpanel.add(socTitle);
  //var mean2 = mean.get('b1')
  //var mean1 = ee.String('Mean: ' + mean.get('b1')).toString()
  //var meancat = ee.String('Mean :  ')
  var mean1 = ee.String(ee.Number(mean.get('b1')))
  var sum1 = ee.String(ee.Number(sum.get('gsoc_sum')))
 // var max1 = ee.String(ee.Number(max.get('b1')))
 // var min1 = ee.String(ee.Number(min.get('b1')))
    var media = ui.Label();
    var suma = ui.Label();
//    var maximo = ui.Label();
//    var minimo = ui.Label();
    media.setValue('Promedio: ' + mean1.getInfo() + ' t/ha'),
    suma.setValue('Suma (Stock): ' + sum1.getInfo()+ ' t')
 //   maximo.setValue('Max: ' + max1.getInfo()+ ' Tn/ha')
//    minimo.setValue('Min: ' + min1.getInfo()+ ' Tn/ha')
    socstatpanel.add(ui.Panel([media, suma/*, maximo, minimo*/], ui.Panel.Layout.flow('vertical')))
  // Create chart for AM and ESPI annual values.
  var phenoChart = ui.Chart.image.series(byYear, roi, ee.Reducer.mean(), 250);
  phenoChart.setOptions({
    title: 'Valor promedio anual',
    vAxis: {title: 'Indice * 10000'},//, maxValue: 9000},
    hAxis: {title: 'Año', format: 'yyyy', gridlines: {count: 7}},
  });
// Create chart for monthly NDVI values.
var calChart = ui.Chart.image.series(byMonthYear, roi, ee.Reducer.mean(), 250);
  calChart.setOptions({
    title: 'NDVI mensual (MODIS 250m)',
    vAxis: {title: 'Indice * 10000'},
    hAxis: {title: 'Año', format: 'yyyy', gridlines: {count: 7}},
  });
// Update the panel with the new charts and stats.
  panel.widgets().reset();
  panel.add(intro)
  //panel.widgets().set(1, controlPanel)
  panel.widgets().set(1, roipanel)
//  panel.widgets().set(1, legendCorine)
  panel.widgets().set(2, chartlpd)
  panel.widgets().set(3, legendlpd)
  panel.widgets().set(4, chartCorine)
  panel.widgets().set(5, legendCorine)
  panel.widgets().set(6,LCstatpanel)
  panel.widgets().set(7, chartLTI)
  panel.widgets().set(8, legendLTI)
  panel.widgets().set(9, socstatpanel)
  panel.widgets().set(10, legendGsoc)
  panel.widgets().set(11, phenoChart)
  panel.widgets().set(12, calChart)
}
// Activate the drawing feats that call the previous chart and stat function
// drawingToolsLeft.onDraw(ui.util.debounce(clikear, 500));
// drawingToolsLeft.onEdit(ui.util.debounce(clikear, 500));
Map.onClick (clikear)
//Map.add(legend);
//panel.widgets().set(4, legend)
panel.widgets().set(1, intro2)
//panel.widgets().set(1, legendCorine)
panel.widgets().set(2, legendlpd)
panel.widgets().set(3, legendCorine)
panel.widgets().set(4, legendLTI)
panel.widgets().set(5, legendGsoc)
//panel.widgets().set(2, controlPanel)
Map.setCenter(-81.74, 8.4, 8);
ui.root.add(panel)
Map.addLayer(gsocup, vis, 'Estadisticas de Carbono Organico (GSOC-FAO)',false)
Map.style().set('cursor', 'crosshair');
/// polygons
    // Create an empty image into which to paint the features, cast to byte.
/*
var empty = ee.Image().byte();
var river1 = empty.paint({
  featureCollection: river,
  color: 1,
  width: 1
}).clip(UpperSakarya);
//Map.addLayer(river1, {palette: '#4458eb'}, 'river')
Map.addLayer(river1,{palette: '#4458eb'});
*/
// Paint all the polygon edges with the same number and width, display.
var empty = ee.Image().byte();var outline = empty.paint({
  featureCollection: microbasin,
  color: 1,
  width: 1
});
Map.addLayer(outline, {palette: '#0409b1'}, 'microbasin');
/*
var outline = empty.paint({
  featureCollection: zona,
  color: 1,
  width: 1
});
Map.addLayer(outline, {palette: '#0409b1'}, 'UpperSakaryaLimits');
var outlinekutahya_merkez = empty.paint({
  featureCollection: kutahya_merkez,
  color: 1,
  width: 1
});
Map.addLayer(outlinekutahya_merkez, {palette: '#0409b1'}, 'kutahya_merkez');
var outlinePorsuk_Cayi = empty.paint({
  featureCollection: Porsuk_Cayi,
  color: 1,
  width: 1
});
Map.addLayer(outlinePorsuk_Cayi, {palette: '#0409b1'}, 'Porsuk_Cayi');
var outlineNasreddin_Hoca = empty.paint({
  featureCollection: Nasreddin_Hoca,
  color: 1,
  width: 1
});
Map.addLayer(outlineNasreddin_Hoca, {palette: '#0409b1'}, 'Nasreddin_Hoca');
var outlineAnkara_beypazari = empty.paint({
  featureCollection: Ankara_beypazari,
  color: 1,
  width: 1
});
Map.addLayer(outlineAnkara_beypazari, {palette: '#0409b1'}, 'Ankara_beypazari');
*/