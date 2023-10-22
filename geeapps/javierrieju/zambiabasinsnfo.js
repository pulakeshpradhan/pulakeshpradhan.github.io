var roi = ui.import && ui.import("roi", "table", {
      "id": "users/javierrieju/Zambia/ZambiaBasins"
    }) || ee.FeatureCollection("users/javierrieju/Zambia/ZambiaBasins");
Map.centerObject(roi,15)
// Print
print('');
print('              Analysis of Soil Characteristics                    ');
///////////////////////             Elevacion              /////////////////////////////
var dataset = ee.Image('NASA/NASADEM_HGT/001');
var elevation = dataset.select('elevation');
Map.addLayer(elevation.clip(roi), {
  min: 900.0,
  max: 1800.0,
  palette:['02ff00','edff04','ffb404','9d480a','ffffff']}, 
    'Elevation',false);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////            Pendiente              /////////////////////////////
var slope = ee.Terrain.slope(elevation);
//Create Class to Slope
var LowSlope = slope.updateMask(slope.lte(5));
var LowSlope2 = LowSlope.expression(
    'N/N', {
      'N': LowSlope.select('slope')
});
LowSlope2 = LowSlope2.toInt()
var LowSlope0 = LowSlope.updateMask(LowSlope.lte(0));
var LowSlope00 = LowSlope0.expression(
    'N+1', {
      'N': LowSlope0.select('slope')
});
LowSlope00 = LowSlope00.toInt()
var LowSlope1 = ee.ImageCollection([LowSlope00, LowSlope2]).mosaic();
//Map.addLayer(LowSlope1.clip(zona), {palette:['green']}, '<15 Slope',false);
var Low2Slope11 = slope.updateMask(slope.gte(5));
var LSlope = Low2Slope11.updateMask(Low2Slope11.lte(10));
var LoSlope = LSlope.expression(
    '(N/N)*2', {
      'N': LSlope.select('slope')
});
LoSlope = LoSlope.toInt()
var MediumSlope11 = slope.updateMask(slope.gte(10));
var MediumSlope = MediumSlope11.updateMask(MediumSlope11.lte(20));
var MediumSlope1 = MediumSlope.expression(
    '(N/N)*3', {
      'N': MediumSlope.select('slope')
});
MediumSlope1 = MediumSlope1.toInt()
var MediumSlope12 = slope.updateMask(slope.gte(20));
var MediumSlope2 = MediumSlope12.updateMask(MediumSlope12.lte(30));
var MediumSlope2 = MediumSlope2.expression(
    '(N/N)*4', {
      'N': MediumSlope2.select('slope')
});
MediumSlope2 = MediumSlope2.toInt()
var MediumSlope13 = slope.updateMask(slope.gte(30));
var MediumSlope3 = MediumSlope13.updateMask(MediumSlope13.lte(40));
var MediumSlope3 = MediumSlope3.expression(
    '(N/N)*5', {
      'N': MediumSlope3.select('slope')
});
MediumSlope3 = MediumSlope3.toInt()
//Map.addLayer(MediumSlope1.clip(zona), {palette:['yellow']}, '15-30 Slope',false);
var HighSlope = slope.updateMask(slope.gte(40));
var HighSlope1 = HighSlope.expression(
    '(N/N)*6', {
      'N': HighSlope.select('slope')
});
HighSlope1 = HighSlope1.toInt()
//Map.addLayer(HighSlope1.clip(zona), {palette:['red']}, '>30 Slope',false);
var slope2 = ee.ImageCollection([LowSlope1,LoSlope,MediumSlope1,MediumSlope2,MediumSlope3,HighSlope1]).mosaic();
Map.addLayer(slope2.clip(roi), {min: 1, max: 6, palette:['green','yellow','orange','red']}, 'Slope class',false);
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////            Orientación                   //////////////////////////////////////7
var aspect = ee.Terrain.aspect(elevation);
var mask = aspect.updateMask(aspect.gte(90));
var sunny = mask.updateMask(mask.lte(270));
//print(sunny)
var sunny1 = sunny.expression(
    '(N/N)*2', {
      'N': sunny.select('aspect')
});
sunny1 = sunny1.toInt().rename('Sunny');
var mask1 = aspect.updateMask(aspect.lte(90));
var mask2 = mask1.updateMask(mask1.gte(1));
var mask3 = aspect.updateMask(aspect.gte(270));
var shady = ee.ImageCollection([mask2, mask3]).mosaic();
var shady2 = shady.expression(
    '(N/N)', {
      'N': shady.select('aspect')
});
shady2 = shady2.toInt()
var mask0 = mask1.updateMask(mask1.lte(0));
var shady0 = mask0.expression(
    '(N+1)', {
      'N': mask0.select('aspect')
});
shady0 = shady0.toInt()
var shady1 = ee.ImageCollection([shady0, shady2]).mosaic().rename('Shady');
var aspect3 = ee.Image.cat([shady1, sunny1]);
var shady1 = shady1.rename('aspect')
var sunny1 = sunny1.rename('aspect')
var aspect2 = ee.ImageCollection([shady1, sunny1]).mosaic().rename('Aspect');
Map.addLayer(aspect2.clip(roi), {min: 1, max: 2, palette:['blue','red']}, 'Aspect Class',false);
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////           PH                     //////////////////////////////
var PH = (ee.Image("OpenLandMap/SOL/SOL_PH-H2O_USDA-4C1A2A_M/v02").select('b0')).multiply(0.1).rename('Ph');
var visualization = {
  min: 4.2,
  max: 11.0,
  palette: [
    "FF0000","FF1C00","FF3900","FF5500","FF7100","FF8E00",
    "FFAA00","FFC600","FFE200","FFFF00","E3FF00","C7FF00",
    "AAFF00","8EFF00","72FF00","55FF00","39FF00","1DFF00",
    "01FF00","00FF1C","00FF38","00FF54","00FF71","00FF8D",
    "00FFA9","00FFC6","00FFE2","00FFFE","00E3FF","00C7FF",
    "00ABFF","008FFF","0072FF","0056FF","003AFF","001DFF",
    "0001FF","1B00FF","3800FF","5400FF",
  ]
};
Map.centerObject(roi);
Map.addLayer(PH.clip(roi), visualization, "Soil pH",false);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////               Soil water content                       ////////////////////////////////////
var water_content = ee.Image("OpenLandMap/SOL/SOL_WATERCONTENT-33KPA_USDA-4B1C_M/v01").select('b0').rename('soil content');
var visualization = {
  min: 0.0,
  max: 52.9740182135385,
  palette: [
    "d29642","eec764","b4ee87","32eeeb","0c78ee","2601b7",
    "083371",
  ]
};
Map.addLayer(water_content.clip(roi), visualization, "Soil water content at 33kPa (field capacity)",false);
var suelo = ee.Image.cat([PH, water_content]);
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////                  soc                         ////////////////////////////////////
var soc = ee.Image("OpenLandMap/SOL/SOL_ORGANIC-CARBON_USDA-6A1C_M/v02").select('b10').multiply(5).rename('soc');
var visualization = {
  min: 0.0,
  max: 50.0,
  palette: [
    "ffffa0","f7fcb9","d9f0a3","addd8e","78c679","41ab5d",
    "238443","005b29","004b29","012b13","00120b",
  ]
};
Map.addLayer(soc.clip(roi), visualization, "SOC",false);
/////////////////                  Texture                         ////////////////////////////////////
var texture = ee.Image("OpenLandMap/SOL/SOL_TEXTURE-CLASS_USDA-TT_M/v02").select('b0').rename('Texture');
var visualization = {
  min: 1.0,
  max: 12.0,
  palette: [
    "d5c36b","b96947","9d3706","ae868f","f86714","46d143",
    "368f20","3e5a14","ffd557","fff72e","ff5a9d","ff005b",
  ]
};
Map.addLayer(texture.clip(roi), visualization, "Texture Soil Class",false);
// Create an empty image into which to paint the features, cast to byte.
var empty = ee.Image().byte();
// Paint all the polygon edges with the same number and width, display.
var outline = empty.paint({
  featureCollection: roi,
  color: 1,
  width: 2
});
Map.addLayer(outline, {palette: 'black'}, 'Zambia Basins')
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////            Grafic                       //////////////////////////////////////////
var chart_El =
    ui.Chart.image
        .byRegion({
          image: elevation,
          regions: roi,
          reducer: ee.Reducer.mean(),
          scale: 250,
          xProperty: 'NAME'
        })
        .setSeriesNames(['Elevation (m)'])
        .setChartType('ColumnChart')
        .setOptions({
          title: 'Elevation by Basins',
          height: 240,
          hAxis:
              {title: 'Basins', titleTextStyle: {italic: false, bold: true}},
          vAxis: {
            title: 'Value',
            titleTextStyle: {italic: false, bold: true}
          },
          colors: ['b96947']
        });
//print(chart_El);
var chart_tex =
    ui.Chart.image
        .byRegion({
          image: texture,
          regions: roi,
          reducer: ee.Reducer.mean(),
          scale: 250,
          xProperty: 'NAME'
        })
        .setSeriesNames(['Texture (1:Clay - 12:Sand)'])
        .setChartType('ColumnChart')
        .setOptions({
          title: 'Texture by Basins',
          height: 240,
          hAxis:
              {title: 'Basins', titleTextStyle: {italic: false, bold: true}},
          vAxis: {
            title: 'Value',
            titleTextStyle: {italic: false, bold: true}
          },
          colors: ['addd8e']
        });
//print(chart_tex);
var chart_soc =
    ui.Chart.image
        .byRegion({
          image: soc,
          regions: roi,
          reducer: ee.Reducer.mean(),
          scale: 250,
          xProperty: 'NAME'
        })
        .setSeriesNames(['SOC (g/kg)'])
        .setChartType('ColumnChart')
        .setOptions({
          title: 'Stock Organic Carbon by Basins',
          height: 240,
          hAxis:
              {title: 'Basins', titleTextStyle: {italic: false, bold: true}},
          vAxis: {
            title: 'Value',
            titleTextStyle: {italic: false, bold: true}
          },
          colors: ['368f20']
        });
//print(chart_soc);      
var chart_swc =
    ui.Chart.image
        .byRegion({
          image: water_content,
          regions: roi,
          reducer: ee.Reducer.mean(),
          scale: 250,
          xProperty: 'NAME'
        })
        .setSeriesNames(['SWC (%)'])
        .setChartType('ColumnChart')
        .setOptions({
          title: 'Soil Water Content by Basins',
          height: 240,
          hAxis:
              {title: 'Basins', titleTextStyle: {italic: false, bold: true}},
          vAxis: {
            title: 'Value',
            titleTextStyle: {italic: false, bold: true}
          },
          colors: [
            '39a8a7', '0f8755', '76b349', 'f0af07',
            'e37d05', 'cf513e', '96356f', '724173', '9c4f97', '696969'
          ]
        });
//print(chart_swc);
var chart2 =
    ui.Chart.image
        .byRegion({
          image: PH,
          regions: roi,
          reducer: ee.Reducer.mean(),
          scale: 250,
          xProperty: 'NAME'
        })
        .setSeriesNames(['PH'])
        .setChartType('ColumnChart')
        .setOptions({
          title: 'PH by Basins',
          height: 240,
          hAxis:
              {title: 'Basins', titleTextStyle: {italic: false, bold: true}},
          vAxis: {
            title: 'Value',
            titleTextStyle: {italic: false, bold: true}
          },
          colors: ['ffd557']
        });
//print(chart);
///////////////////////////////////////////////////////////////////////////////////////////////////////
/*
print('                  Analysis of Vegetation/Soil Crossover                 ')
// Define the chart and print it to the console.
var chart =
    ui.Chart.image
        .byRegion({
          image: elevation,
          regions: roi,
          reducer: ee.Reducer.mean(),
          scale: 30,
          xProperty: 'NAME'
        })
        .setSeriesNames(['elevation'])
        .setChartType('ColumnChart')
        .setOptions({
          title: 'Elevation by Ecoregion',
          hAxis:
              {title: 'Ecoregion', titleTextStyle: {italic: false, bold: true}},
          vAxis: {
            title: 'Elevation',
            titleTextStyle: {italic: false, bold: true}
          },
          colors: [
            '39a8a7', '0f8755', '76b349', 'f0af07',
            'e37d05', 'cf513e', '96356f', '724173', '9c4f97', '696969'
          ]
        });
print(chart);
var chart =
    ui.Chart.image
        .byRegion({
          image: aspect3,
          regions: roi,
          reducer: ee.Reducer.sum(),
          scale: 30,
          xProperty: 'NAME'
        })
        .setSeriesNames([
          'Shady','Sunny'])
        .setChartType('ColumnChart')
        .setOptions({
          title: 'Aspect by Ecoregion',
          hAxis:
              {title: 'Ecoregion', titleTextStyle: {italic: false, bold: true}},
          vAxis: {
            title: 'Count',
            titleTextStyle: {italic: false, bold: true}
          },
          colors: [
            '604791', '1d6b99', '39a8a7', '0f8755', '76b349', 'f0af07',
            'e37d05', 'cf513e', '96356f', '724173', '9c4f97', '696969'
          ]
        });
print(chart);
var chart =
    ui.Chart.image
        .byRegion({
          image: slope,
          regions: roi,
          reducer: ee.Reducer.mean(),
          scale: 30,
          xProperty: 'NAME'
        })
        .setSeriesNames([
          'slope'])
        .setChartType('ColumnChart')
        .setOptions({
          title: 'Slope by Ecoregion',
          hAxis:
              {title: 'Ecoregion', titleTextStyle: {italic: false, bold: true}},
          vAxis: {
            title: 'Count',
            titleTextStyle: {italic: false, bold: true}
          },
          colors: [
            '0f8755', '76b349', 'f0af07',
            'e37d05', 'cf513e', '96356f', '724173', '9c4f97', '696969'
          ]
        });
print(chart);
/// Racter to vector
// Aspect
var vector_aspect = aspect2.reduceToVectors({
  geometry: seleccion_especies,
  scale: 30,
  geometryType: 'polygon',
  eightConnected: true,
  labelProperty: 'Aspect',
  maxPixels: 5000000000
});
var display = ee.Image(0).updateMask(0).paint(vector_aspect, 'a95a01', 3);
//Vector of Aspect
var vector_aspect_ = ee.FeatureCollection(vector_aspect);
// Split by Aspect type 1 (Sunny) and 2 (Shady)
var vector_aspect_s=vector_aspect_.filterMetadata('Aspect','equals',1)
var vector_aspect_u=vector_aspect_.filterMetadata('Aspect','equals',2)
// Dissolve each one
var vector_aspect_s_all = vector_aspect_s.union(500);
var vector_aspect_u_all = vector_aspect_u.union(500);
// Combine dissolve type
var vectorAspect_ = vector_aspect_s_all.merge(vector_aspect_u_all);
var vectorAspect = ee.FeatureCollection(vectorAspect_);
// Intersection Veg Formation by ROI
var vectorList = vectorAspect.toList(vectorAspect.size())
var polyIntersect = seleccion_especies.iterate(function(feature, list){
  list = ee.List(list)
  feature = ee.Feature(feature)
  var intersection = vectorList.map(function(feat) {
    feat = ee.Feature(feat)
    var intersection = feat.intersection(feature, ee.ErrorMargin(1));
    var id = feature.getString('NAME')
    var asp = feat.getString('Aspect')
    var codigo = id + asp
    return ee.Feature(intersection)
    .set({'Intersect': intersection.area().divide(1000 * 1000)})
    .set({'ID_roi':codigo})
    .set({'Nom':id})
    .set({'Aspect':asp})
  })
  return list.add(intersection)
}, ee.List([]));
var veg_aspect = ee.FeatureCollection(ee.List(polyIntersect).flatten())
//print(veg_aspect);
var especie1=ee.Feature(veg_aspect.toList(4).get(3));
var especie2=ee.Feature(veg_aspect.toList(4).get(2));
//4-Pinus_solana
//3-Pinus_umbria
//2-
//print(especie1);
//print(especie2);
//Map.addLayer(especie1)
exports.veg_aspect =veg_aspect;
//
Export.image.toDrive({
  image: texture,
  description: 'texture',
  scale: 250,
  region: roi
});
*/
var panel = ui.Panel({style: {width: '700px'}})
var texto = ui.Label('Analysis of Soil Characteristics by Basins Zambia',{fontSize:'24px',position : 'top-center'});
panel.add(texto)
panel.widgets().set(1, chart_El);
panel.widgets().set(2, chart_tex);
panel.widgets().set(3, chart_soc);
panel.widgets().set(4, chart_swc);
panel.widgets().set(5, chart2);
// Add the panel to the ui.root.
ui.root.add(panel);