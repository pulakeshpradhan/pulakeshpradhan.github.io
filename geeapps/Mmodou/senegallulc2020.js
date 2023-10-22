var esri_lulc10  =ee.ImageCollection('projects/sat-io/open-datasets/landcover/ESRI_Global-LULC_10m')
var senegal=ee.FeatureCollection("FAO/GAUL_SIMPLIFIED_500m/2015/level1").filter(ee.Filter.eq('ADM0_NAME', 'Senegal'))
var limits = ee.Image().toByte().paint(senegal, 'black', 2); 
Map.addLayer(limits, {}, 'limits')
var aoi=senegal.union()
var baseMap = require('users/tl2581/packages:baseMap.js')
Map.setOptions('Dark', {'Dark': baseMap.darkTheme})
//Map.setOptions('SATELLITE')
Map.setCenter(-14.83154296875,14.955399325942631,8)
Map.style().set('cursor', 'crosshair')
// ESRI LULC 
var lulc=esri_lulc10.mosaic().clip(senegal)
var water=lulc.eq(1).selfMask()
var grass=lulc.eq(3).selfMask()
var floodedVegetation=lulc.eq(4).selfMask()
var crops=lulc.eq(5).selfMask()
var buildups=lulc.eq(7).selfMask()
////////////////////////////////////////////////
///
//////////////////////////////////////////////
var crop2020=ui.Map.Layer(crops, {min:1, max:1, palette:["#FFDB5C"]}, 'Crop Extent ',false)
var floodVegetation2020=ui.Map.Layer(floodedVegetation, {min:1, max:1, palette:["#87D19E"]}, 'Flooded Vegetation',false)
var grass2020=ui.Map.Layer(grass, {min:1, max:1, palette:["#A7D282"]}, 'Grass Extent',false)
var water2020=ui.Map.Layer(water, {min:1, max:1, palette:["#1A5BAB"]}, 'Water Extent',false)
var buildup2020=ui.Map.Layer(buildups, {min:1, max:1, palette:["#ED022A"]}, 'Grass',false)
Map.add(crop2020)
Map.add(floodVegetation2020)
Map.add(grass2020)
Map.add(water2020)
Map.add(buildup2020)
////////////////////////////////////////////////
///
//////////////////////////////////////////////
var title = ui.Label("Statistique et Cartographie de l'Occupation du sol au Sénégal  en 2020 ", {fontSize: '15px', fontWeight: 'bold', color: '#005824'});
var resume = ui.Label(
  "Cette Application permet de visualiser les statistiques de l'occupation du sol au Sénégal en 2020 " +
  'en utilisant les resultats de la publication suivante (Karra, Kontgis, et al. “Global land use/land cover with Sentinel-2 and deep learning”)',
    {fontSize: '10px'});
var contactInfo = ui.Label({
    value: 'Contact : modou2812.mbaye@ucad.edu.sn', 
    style: {fontSize: '11px',color:'#67a9cf', 
            stretch: 'horizontal',
    }
})
// , 
var contactInfo2 = ui.Label({
    value: " Centre d'Etude Régional pour l'Amélioration de l'Adaptation à la Sécheresse (CERAAS), Institut Sénégalais de Recherche Agricole (ISRA), Thiès Sénégal ", 
    style: {fontSize: '11px',color:'#737373', 
            stretch: 'horizontal',
    }
})
var panel = ui.Panel({
  widgets:[title, resume],
  style:{width: '300px'}});
var intro = ui.Panel([
  ui.Label({
    value: '',
    style: {fontWeight: 'bold',  color: '4A997E'},
  }),
  ui.Label({
    value:'Select LULC to display.',
    style: {fontSize: '15px', fontWeight: 'bold', color:'#005824'}
  })]);
//Add this new panel to the larger panel we created 
panel.add(intro)
ui.root.insert(0,panel)
var extLabel = ui.Label({value:'Occupation du Sol',
style: {fontWeight: 'bold', fontSize: '16px', margin: '10px 5px'}
});
var cropCheck = ui.Checkbox('Crop').setValue(false)
var floodedVegetationCheck = ui.Checkbox('Flooded Vegetation').setValue(false)
var grassCheck = ui.Checkbox('Grass').setValue(false)
var waterCheck = ui.Checkbox('Water').setValue(false)
var buildupCheck = ui.Checkbox('Build-up').setValue(false)
///////////////
var extentLegend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
// 
var makeRowa = function(color, name) {
      var colorBox = ui.Label({
        style: {
          backgroundColor: '#' + color,
          padding: '8px',
          margin: '0 0 4px 0'
        }
      });
      var description = ui.Label({
        value: name,
        style: {margin: '0 0 4px 6px'}
      });
      return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal')
      });
};
var paletteMAPa = [
'FFDB5C', //CROP
'87D19E',//FLODDED ARA
'A7D282',//GRASS
'1A5BAB',//WATER
'ED022A',//BUILDUP
];
var namesa = ['Crops','Flooded Vegetation','Grass','Water','Build-ups']; 
for (var i = 0; i < 5; i++) {
  extentLegend.add(makeRowa(paletteMAPa[i], namesa[i]));
  }  
panel.add(cropCheck )
      .add(floodedVegetationCheck)
      .add(grassCheck)
      .add(waterCheck)
      .add(buildupCheck)
      .add(extentLegend)
// layer visualisation 
var doCheckbox = function() {
  cropCheck.onChange(function(checked){
  crop2020.setShown(checked)
  })
}
doCheckbox();
var doCheckbox1 = function() {
  floodedVegetationCheck.onChange(function(checked){
  floodVegetation2020.setShown(checked)
  })
}
doCheckbox1()
var doCheckbox3 = function() {
  grassCheck.onChange(function(checked){
  grass2020.setShown(checked)
  })
}
doCheckbox3()
var doCheckbox4 = function() {
  waterCheck.onChange(function(checked){
  water2020.setShown(checked)
  })
}
doCheckbox4()
var doCheckbox5 = function() {
  buildupCheck.onChange(function(checked){
  buildup2020.setShown(checked)
  })
}
doCheckbox5()
/***********************************************************************************************************************
 * var lulc=esri_lulc10.mosaic().clip(senegal)
 * var water=lulc.eq(1).selfMask()
 * var grass=lulc.eq(3).selfMask()
 * var floodedVegetation=lulc.eq(4).selfMask()
 * var crops=lulc.eq(5).selfMask()
 * var buildups=lulc.eq(7).selfMask()
 * 
 * ********************************************************************************************************************/
// /************************************************************************************************************************
// * CROP
// * *********************************************************************************************************************/
//Calcul de la superficie en Hectare
var getCrop2020 = crops.multiply(ee.Image.pixelArea()).divide(1000000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry:aoi,
      scale: 1000,
      maxPixels:1e13,
      tileScale: 16
      }).get('b1');
var featureCrop = ee.Feature(null)
var featureCrop2020 = featureCrop.set('areas', ee.Number(getCrop2020)).set('label', ee.String('Crop'))
var chartCrop2020 = ui.Chart.feature.byFeature(featureCrop2020,'label' ,'areas')
chartCrop2020.setOptions({
  title: 'Total Crop Area',
  vAxis: {title: ''},
  legend: {position: 'none'},
  hAxis: {
    title: 'Area in km²',
    logScale: false
  }
}).setChartType('BarChart');
// /************************************************************************************************************************
// * water
// * *********************************************************************************************************************/
//Calcul de la superficie en Hectare
var getWater2020 = water.multiply(ee.Image.pixelArea()).divide(1000000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry:aoi,
      scale: 1000,
      maxPixels:1e13,
      tileScale: 16
      }).get('b1');
var featureW = ee.Feature(null)
var featureWater2020 = featureW.set('areas', ee.Number(getWater2020)).set('label', ee.String('Water'))
var chartWater2020 = ui.Chart.feature.byFeature(featureWater2020,'label' ,'areas')
chartWater2020.setOptions({
  title: 'Total Water Area',
  vAxis: {title: ''},
  legend: {position: 'none'},
  hAxis: {
    title: 'Area in km²',
    logScale: false
  }
}).setChartType('BarChart');
// /************************************************************************************************************************
// * floodedVegetation
// * *********************************************************************************************************************/
//Calcul de la superficie en Hectare
var getfloodedVegetation2020 = floodedVegetation.multiply(ee.Image.pixelArea()).divide(1000000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry:aoi,
      scale: 1000,
      maxPixels:1e13,
      tileScale: 16
      }).get('b1');
var featureFV = ee.Feature(null)
var featureFV2020 = featureFV.set('areas', ee.Number(getfloodedVegetation2020)).set('label', ee.String('Flooded Vegetation'))
var chartFV2020 = ui.Chart.feature.byFeature(featureFV2020,'label' ,'areas')
chartFV2020.setOptions({
  title: 'Total Flooded Vegetation Area',
  vAxis: {title: ''},
  legend: {position: 'none'},
  hAxis: {
    title: 'Area in km²',
    logScale: false
  }
}).setChartType('BarChart');
// /************************************************************************************************************************
// * buildups
// * *********************************************************************************************************************/
//Calcul de la superficie en Hectare
var getbuildups2020 = buildups.multiply(ee.Image.pixelArea()).divide(1000000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry:aoi,
      scale: 1000,
      maxPixels:1e13,
      tileScale: 16
      }).get('b1');
var featureB = ee.Feature(null)
var featurebuildups2020 = featureB.set('areas', ee.Number(getbuildups2020)).set('label', ee.String('Build-up'))
var chartBuildup2020 = ui.Chart.feature.byFeature(featurebuildups2020,'label' ,'areas')
chartBuildup2020.setOptions({
  title: 'Total build-up  Area',
  vAxis: {title: ''},
  legend: {position: 'none'},
  hAxis: {
    title: 'Area in km²',
    logScale: false
  }
}).setChartType('BarChart')
// /************************************************************************************************************************
// * GRASS
// * *********************************************************************************************************************/
//Calcul de la superficie en Hectare
var getGrass2020 = grass.multiply(ee.Image.pixelArea()).divide(1000000).reduceRegion({
      reducer:ee.Reducer.sum(),
      geometry:aoi,
      scale: 1000,
      maxPixels:1e13,
      tileScale: 16
      }).get('b1');
var featureG = ee.Feature(null)
var featureGrass2020 = featureG.set('areas', ee.Number(getGrass2020)).set('label', ee.String('Grass'))
var chartGrass2020 = ui.Chart.feature.byFeature(featureGrass2020,'label' ,'areas')
chartGrass2020.setOptions({
  title: 'Total Grass Area',
  vAxis: {title: ''},
  legend: {position: 'none'},
  hAxis: {
    title: 'Area in km²',
    logScale: false
  }
}).setChartType('BarChart');
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  chartCrop2020, chartWater2020; chartFV2020; chartBuildup2020 ; chartGrass2020
/////////////////////////////////////////////////////////////////////////////////////////////////
//Add a panel to hold graphs within main panel
var panelGraph = ui.Panel({
  style:{width: '300px'}
})
//Create key of items for dropdown  'Crops','Flooded Vegetation','Grass','Water','Build-ups'
var cr2020 = 'Crop Extent'
var fv2020 = 'Flooded Vegetation Extent'
var gr2020 = 'Grass Extent'
var wt2020 = 'Water Extent'
var bp2020 = 'Build-up Extent'
//Construct Dropdown
var graphSelect = ui.Select({
  items:[cr2020,fv2020,gr2020,wt2020,bp2020],
  placeholder:'Choisir une OS',
  onChange: selectLayer,
  style: {stretch:'horizontal'}
})
var constraints = []
function selectLayer(){
  var graph = graphSelect.getValue() 
  panelGraph.clear() 
  if (graph == cr2020){
    panelGraph.add(chartCrop2020)
  }
  else if (graph == fv2020){
    panelGraph.add(chartFV2020)
  }
  else if (graph == gr2020){
    panelGraph.add(chartGrass2020)
  } 
  else if (graph ==wt2020){
    panelGraph.add(chartWater2020)
  }
  else if (graph == bp2020) {
    panelGraph.add(chartBuildup2020)
  }
  for (var i = 0; i < constraints.length; ++i) {
    var constraint = select[i];
    var mode = constraint.mode.getValue();
    var value = parseFloat(constraint.value.getValue());
    if (mode == GREATER_THAN) {
      image = image.updateMask(constraint.image.gt(value));
    } else {
      image = image.updateMask(constraint.image.lt(value));
    }
}
}
var graphtitle = ui.Label({value:'Select LULC to display Chart',
style: {fontWeight: 'bold', fontSize: '16px', margin: '10px 5px', color:'#005824'}
});
//Add selecter and graph panel to main panel
panel.add(graphtitle)
      .add(graphSelect)
      .add(panelGraph)