//--------------------------------------------------------
//Interior habitat tool - distance based
///Written by: Evan R. DeLancey
///email: edelance@ualberta.ca
///Date: 2018-08-23
//--------------------------------------------------------
//-----------------------------------------------------------------------------------------
//Set map options
//-----------------------------------------------------------------------------------------
Map.setOptions("HYBRID");
//Map.setControlVisibility(true, true, false, false, false, false);
var d = Map.drawingTools();
d.setShown(false);
//-----------------------------------------------------------------------------------------
//
//-----------------------------------------------------------------------------------------
//-----------------------------------------------------------------------------------------
//Load data
//-----------------------------------------------------------------------------------------
var LAR = ee.FeatureCollection('users/edelance/LAR');
var LAR_NSRs = ee.FeatureCollection('users/edelance/LAR_NSRs');
var empty = ee.Image().byte();
Map.centerObject(LAR, 6);
//load individual rasters of different widths
var HA_0_10 = ee.Image('users/abmigc/HF_Raster/HA_0_10');
var HA_10_20 = ee.Image('users/abmigc/HF_Raster/HA_10_20');
var HA_20_30 = ee.Image('users/abmigc/HF_Raster/HA_20_30');
var HA_30_40 = ee.Image('users/abmigc/HF_Raster/HA_30_40');
var HA_40_50 = ee.Image('users/abmigc/HF_Raster/HA_40_50');
var HA_50_60 = ee.Image('users/abmigc/HF_Raster/HA_50_60');
var HA_60_70 = ee.Image('users/abmigc/HF_Raster/HA_60_70');
var HA_70_80 = ee.Image('users/abmigc/HF_Raster/HA_70_80');
var LISL_w3 = ee.Image('users/abmigc/HF_Raster/LISL_w3');
var PLISL_w6 = ee.Image('users/abmigc/HF_Raster/PLISL_w6');
var Road_w12 = ee.Image('users/abmigc/HF_Raster/Road_w12');
var Road_w18 = ee.Image('users/abmigc/HF_Raster/Road_w18');
var RoadRail_w10 = ee.Image('users/abmigc/HF_Raster/RoadRail_w10');
var Trail_w10 = ee.Image('users/abmigc/HF_Raster/RoadRail_w10');
var Trail_w4 = ee.Image('users/abmigc/HF_Raster/Trail_w4');
var Trail_w6 = ee.Image('users/abmigc/HF_Raster/Trail_w6');
//load in all HFI data that has normal buffer widths
var HF = ee.Image('users/abmigc/HF_Raster/HF_normalBuf');
var NSRoutline = empty.paint({
  featureCollection: LAR_NSRs,
  width: 2.5
});
//-----------------------------------------------------------------------------------------
//
//-----------------------------------------------------------------------------------------
//----------------------------------------------------------------------------------------- 
//----------------------------------------------------------------------------------------- 
//----------------------------------------------------------------------------------------- 
//-----------------------------------------------------------------------------------------
//Backend
//----------------------------------------------------------------------------------------- 
//----------------------------------------------------------------------------------------- 
//----------------------------------------------------------------------------------------- 
//----------------------------------------------------------------------------------------- 
//fuction to calculate distance decay from input HF raster.  Change F for feature of different width
//----------------------------------------------------------------------------------------- 
//----------------------------------------------------------------------------------------- 
var distHF = HF.fastDistanceTransform(1000).sqrt().clip(LAR)
  .multiply(ee.Image.pixelArea().sqrt());
//function to calculate distance decay from HF distance raster
///Give F adjustment for narrow features or harvest areas
function distanceDecay(inRast, F){
  var distance = inRast.fastDistanceTransform(1000).sqrt().clip(LAR)
    .multiply(ee.Image.pixelArea().sqrt());
  var e = distHF.where(distHF.gt(-1), 2.71828);
  var one = distHF.where(distHF.gt(-1), 1);
  var nfourPtFive = distHF.where(distHF.gt(-1), -4.595);
  var Fconst = distHF.where(distHF.gt(-1), F);
  var Fconst = Fconst.multiply(125)
  var DDfun = distance.divide(Fconst);
  var DDfun = DDfun.subtract(one);
  var DDfun = DDfun.multiply(nfourPtFive);
  var DDfun = e.pow(DDfun);
  var DDfun = one.add(DDfun);
  return one.divide(DDfun);
}
//Calculate DD function for all input rasters
//----------------------------------------------------------------------------------------- 
//----------------------------------------------------------------------------------------- 
var HA_0_10_DD = distanceDecay(HA_0_10, 0.9167);
var HA_10_20_DD = distanceDecay(HA_10_20, 0.75);
var HA_20_30_DD = distanceDecay(HA_20_30, 0.5833);
var HA_30_40_DD = distanceDecay(HA_30_40, 0.4167);
var HA_40_50_DD = distanceDecay(HA_40_50, 0.25);
var HA_50_60_DD = distanceDecay(HA_50_60, 0.0833);
var HA_60_70_DD = distanceDecay(HA_60_70, 0.000000001);
var HA_70_80_DD = distanceDecay(HA_70_80, 0.000000001);
var LISL_w3_DD = distanceDecay(LISL_w3, 0.3625);
var PLISL_w6_DD = distanceDecay(PLISL_w6, 0.475);
var Road_w12_DD = distanceDecay(Road_w12, 0.7);
var Road_w18_DD = distanceDecay(Road_w18, 0.925);
var RoadRail_w10_DD = distanceDecay(RoadRail_w10, 0.625);
var Trail_w4_DD = distanceDecay(Trail_w4, 0.4);
var Trail_w6_DD = distanceDecay(Trail_w6, 0.475);
var HF_DD = distanceDecay(HF, 1);
var colRamp = ['#a50026', '#d73027', '#f46d43', '#fdae61', '#fee08b', '#ffffbf', '#d9ef8b', '#a6d96a', '#66bd63', '#1a9850', '#006837'];
//get minimum distance between the to distance rasters
var IHfunction = ee.ImageCollection([
  HA_0_10_DD,
  HA_10_20_DD,
  HA_20_30_DD,
  HA_30_40_DD,
  HA_40_50_DD,
  HA_50_60_DD,
  HA_60_70_DD,
  HA_70_80_DD,
  LISL_w3_DD,
  PLISL_w6_DD,
  Road_w12_DD,
  Road_w18_DD,
  RoadRail_w10_DD,
  Trail_w4_DD,
  Trail_w6_DD,
  HF_DD
]);
var IHfunction = IHfunction.min();
//Display layers
var colRamp = ['#a50026', '#d73027', '#f46d43', '#fdae61', '#fee08b', '#ffffbf', 
  '#d9ef8b', '#a6d96a', '#66bd63', '#1a9850', '#006837'];
Map.addLayer(IHfunction, {min:0, max:1, palette: colRamp}, 'Interior habitat');
Map.addLayer(NSRoutline, {palette: 'black'}, 'Natural Sub-Regions');
//Generate reference condistion where every pixel is 100km from nearest HF
var LARrast = ee.Image(0).byte().paint(LAR, 1).clip(LAR);
var LARrast = LARrast.toFloat();
//----------------------------------------------------------------------------------------- 
//----------------------------------------------------------------------------------------- 
//----------------------------------------------------------------------------------------- 
//-----------------------------------------------------------------------------------------
//
//----------------------------------------------------------------------------------------- 
//----------------------------------------------------------------------------------------- 
//----------------------------------------------------------------------------------------- 
//----------------------------------------------------------------------------------------- 
//----------------------------------------------------------------------------------------- 
//----------------------------------------------------------------------------------------- 
//----------------------------------------------------------------------------------------- 
//-----------------------------------------------------------------------------------------
//User Interface
//----------------------------------------------------------------------------------------- 
//----------------------------------------------------------------------------------------- 
//----------------------------------------------------------------------------------------- 
//----------------------------------------------------------------------------------------- 
//colors
var C1 = '#00000000';//black partial transparency
var C2 = '#00000050';//black full transparency
var C3 = '#238b45';//Green
var C7 = '#ffffff'; //White
//instructions
var title = ui.Panel({
  widgets: [
    ui.Label('OR select Natural Sub-Region to calculate Current condition',{
    fontSize: '15px',
    backgroundColor: C1,
    color: C3,
    fontWeight: 'bold',
  })  
  ],
  style: {
    position: 'top-center',
    backgroundColor: C2
  }
});
Map.add(title);
//--------------------------------------------------------
//define lat and lon
//--------------------------------------------------------
var lon = ui.Label();
var lat = ui.Label();
//--------------------------------------------------------
//--------------------------------------------------------
//--------------------------------------------------------
//On click region selection and Current condition calculation
//--------------------------------------------------------
Map.onClick(function(coords) {
  lon.setValue('lon: ' + coords.lon);
  lat.setValue('lat: ' + coords.lat);
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var region = LAR_NSRs.filterBounds(point);
  var empt = ee.Image().byte();
  var WSoutline = empt.paint({
    featureCollection: region,
    width: 3
  });
  Map.addLayer(WSoutline, {palette: 'yellow'}, 'Selected');
  var name = ee.Feature(region.first()).get('NSRNAME').getInfo();
  var currentState = IHfunction.reduceRegion({
    reducer: ee.Reducer.sum(),
    geometry: region,
    scale: 20,
    maxPixels: 1E11
  });
  var currentState = ee.Number(currentState.get('distance'));
  var referenceCondition = LARrast.reduceRegion({
    reducer: ee.Reducer.sum(),
    geometry: region,
    scale: 20,
    maxPixels: 1E11
  });
  var referenceCondition = ee.Number(referenceCondition.get('constant'));
  var currentCondition = currentState.divide(referenceCondition).multiply(100);
  var currentCondition = currentCondition.format("%.4f")
  var label1 = ui.Label({
    value: name + ' Current condition',
    style: {
      backgroundColor: C1,
      fontWeight: 'bold'
    }
  });
  var label2 = ui.Label({
    value: currentCondition.getInfo() + '%',
    style: {
      backgroundColor: C1
    }
  });
  var panel = ui.Panel({
    widgets: [label1, label2],
    style: {
      width: '300px', 
      backgroundColor: C7, 
      position: 'top-left'
    }
  });
  Map.add(panel);
});
//--------------------------------------------------------
//
//--------------------------------------------------------
var button = ui.Button({
  label: 'CALCULATE!',
  onClick: function () {
    var region = LAR;
    var empt = ee.Image().byte();
    var WSoutline = empt.paint({
      featureCollection: region,
      width: 5
    });
    Map.addLayer(WSoutline, {palette: 'yellow'}, 'Selected');
    var name = ee.Feature(region.first()).get('NSRNAME').getInfo();
    var currentState = IHfunction.reduceRegion({
      reducer: ee.Reducer.sum(),
      geometry: region,
      scale: 30,
      maxPixels: 1E11
    });
    var currentState = ee.Number(currentState.get('distance'));
    var referenceCondition = LARrast.reduceRegion({
      reducer: ee.Reducer.sum(),
      geometry: region,
      scale: 30,
      maxPixels: 1E11
    });
    var referenceCondition = ee.Number(referenceCondition.get('constant'));
    var currentCondition = currentState.divide(referenceCondition).multiply(100);
    var currentCondition = currentCondition.format("%.4f")
    var label1 = ui.Label({
      value: 'LAR Current condition',
      style: {
        backgroundColor: C1,
        fontWeight: 'bold',
        color: C3,
        fontSize: '18px'
      }
    });
    var label2 = ui.Label({
      value: currentCondition.getInfo() + '%',
      style: {
        backgroundColor: C1,
        color: C3,
        fontSize: '18px'
      }
    });
    var panel = ui.Panel({
      widgets: [label1, label2],
      style: {
        width: '300px', 
        backgroundColor: C2, 
        position: 'top-right'
      }
    });
    Map.add(panel);
    },
    style: {
      backgroundColor: C2
    }
});
var lbl = ui.Label('LAR Interior habitat', {
  fontSize: '20px',
  backgroundColor: C1,
  color: C3,
  fontWeight: 'bold',
});
var Panel = ui.Panel({
  widgets: [lbl, button],
  style: {
    position: 'top-left',
    backgroundColor: C2
  }
});
Map.add(Panel);
Map.style().set('cursor', 'crosshair');
//----------------------------------------------------------------------------------------- 
//----------------------------------------------------------------------------------------- 
//----------------------------------------------------------------------------------------- 
//-----------------------------------------------------------------------------------------
//
//----------------------------------------------------------------------------------------- 
//----------------------------------------------------------------------------------------- 
//----------------------------------------------------------------------------------------- 
//-----------------------------------------------------------------------------------------