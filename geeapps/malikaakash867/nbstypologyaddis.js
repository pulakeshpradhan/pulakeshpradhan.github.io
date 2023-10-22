var AddisULU20197cat = ui.import && ui.import("AddisULU20197cat", "imageCollection", {
      "id": "users/emackres/AddisULU7cat"
    }) || ee.ImageCollection("users/emackres/AddisULU7cat"),
    pop = ui.import && ui.import("pop", "imageCollection", {
      "id": "WorldPop/GP/100m/pop"
    }) || ee.ImageCollection("WorldPop/GP/100m/pop"),
    geoBadm2 = ui.import && ui.import("geoBadm2", "table", {
      "id": "users/emackres/geoBoundaries/geoBoundariesCGAZ_ADM2"
    }) || ee.FeatureCollection("users/emackres/geoBoundaries/geoBoundariesCGAZ_ADM2"),
    AddisWoredas = ui.import && ui.import("AddisWoredas", "table", {
      "id": "users/emackres/Wards/Addis_Ababa_Woredas"
    }) || ee.FeatureCollection("users/emackres/Wards/Addis_Ababa_Woredas"),
    subcities = ui.import && ui.import("subcities", "table", {
      "id": "users/emackres/Wards/Addis_Ababa_subcities"
    }) || ee.FeatureCollection("users/emackres/Wards/Addis_Ababa_subcities"),
    popAS = ui.import && ui.import("popAS", "imageCollection", {
      "id": "WorldPop/GP/100m/pop_age_sex"
    }) || ee.ImageCollection("WorldPop/GP/100m/pop_age_sex"),
    RwandaVillages = ui.import && ui.import("RwandaVillages", "table", {
      "id": "users/emackres/Wards/Rwanda_ADM5_Villages"
    }) || ee.FeatureCollection("users/emackres/Wards/Rwanda_ADM5_Villages"),
    RwandaCells = ui.import && ui.import("RwandaCells", "table", {
      "id": "users/emackres/Wards/Rwanda_ADM4_Cells"
    }) || ee.FeatureCollection("users/emackres/Wards/Rwanda_ADM4_Cells"),
    KigaliPC = ui.import && ui.import("KigaliPC", "table", {
      "id": "users/emackres/Wards/Kigali_Sectors_2012_PrincipleComponents"
    }) || ee.FeatureCollection("users/emackres/Wards/Kigali_Sectors_2012_PrincipleComponents"),
    MekanisaElevated = ui.import && ui.import("MekanisaElevated", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                38.67997945335182,
                8.980414533663918
              ],
              [
                38.67997945335182,
                8.957523601796865
              ],
              [
                38.71139348533424,
                8.957523601796865
              ],
              [
                38.71139348533424,
                8.980414533663918
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
      "properties": {
        "District": "MekanisaElevated",
        "system:index": "0"
      },
      "color": "#d63000",
      "mode": "Feature",
      "shown": false,
      "locked": false
    }) || 
    /* color: #d63000 */
    /* shown: false */
    /* displayProperties: [
      {
        "type": "rectangle"
      }
    ] */
    ee.Feature(
        ee.Geometry.Polygon(
            [[[38.67997945335182, 8.980414533663918],
              [38.67997945335182, 8.957523601796865],
              [38.71139348533424, 8.957523601796865],
              [38.71139348533424, 8.980414533663918]]], null, false),
        {
          "District": "MekanisaElevated",
          "system:index": "0"
        }),
    MekanisaFarmers = ui.import && ui.import("MekanisaFarmers", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            38.74342820373309,
            8.959565405795521
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "District": "MekanisaFarmers",
        "system:index": "0"
      },
      "color": "#98ff00",
      "mode": "Feature",
      "shown": false,
      "locked": false
    }) || 
    /* color: #98ff00 */
    /* shown: false */
    ee.Feature(
        ee.Geometry.Point([38.74342820373309, 8.959565405795521]),
        {
          "District": "MekanisaFarmers",
          "system:index": "0"
        }),
    AkakiFarmers = ui.import && ui.import("AkakiFarmers", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            38.77667111614509,
            8.865725435753827
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "District": "AkakiFarmers",
        "system:index": "0"
      },
      "color": "#0b4a8b",
      "mode": "Feature",
      "shown": false,
      "locked": false
    }) || 
    /* color: #0b4a8b */
    /* shown: false */
    ee.Feature(
        ee.Geometry.Point([38.77667111614509, 8.865725435753827]),
        {
          "District": "AkakiFarmers",
          "system:index": "0"
        }),
    AbaSamuelFarmers = ui.import && ui.import("AbaSamuelFarmers", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            38.717396035741565,
            8.82828728624774
          ]
        }
      ],
      "displayProperties": [],
      "properties": {
        "District": "AbaSamuelFarmers",
        "system:index": "0"
      },
      "color": "#ffc82d",
      "mode": "Feature",
      "shown": false,
      "locked": false
    }) || 
    /* color: #ffc82d */
    /* shown: false */
    ee.Feature(
        ee.Geometry.Point([38.717396035741565, 8.82828728624774]),
        {
          "District": "AbaSamuelFarmers",
          "system:index": "0"
        }),
    ulu6catVJuly2021 = ui.import && ui.import("ulu6catVJuly2021", "imageCollection", {
      "id": "projects/wri-datalab/urban_land_use/dev/versions/r1dw_17_d4_256x3-ssfw"
    }) || ee.ImageCollection("projects/wri-datalab/urban_land_use/dev/versions/r1dw_17_d4_256x3-ssfw"),
    ulu6cat = ui.import && ui.import("ulu6cat", "imageCollection", {
      "id": "projects/wri-datalab/urban_land_use/v1"
    }) || ee.ImageCollection("projects/wri-datalab/urban_land_use/v1"),
    AddisLandUse = ui.import && ui.import("AddisLandUse", "table", {
      "id": "users/emackres/AddisAbaba_landuse_official"
    }) || ee.FeatureCollection("users/emackres/AddisAbaba_landuse_official"),
    AddisPopbyDistrictULU = ui.import && ui.import("AddisPopbyDistrictULU", "table", {
      "id": "users/emackres/AddisPopbyDistrictULU2020v1release"
    }) || ee.FeatureCollection("users/emackres/AddisPopbyDistrictULU2020v1release"),
    AddisFloodPts = ui.import && ui.import("AddisFloodPts", "table", {
      "id": "users/malikaakash867/Addis_FloodIncidents"
    }) || ee.FeatureCollection("users/malikaakash867/Addis_FloodIncidents");
var c360 = require('users/loganbyers/lib:lib_cities360');
var FreetownDistricts = c360.getC360FeaturesForGroup('SLE-Freetown_region', 'ward')
var startyear = 2020 //years between 2000 and 2020 inclusive available
var countryCode = 'ETH' //ISO 3-letter country code
var AOI = 'Addis Ababa' // 'Addis Ababa', 'Freetown', 'Ciudad de México', 'Illinois', 'Cantón San José', 'Provincia San José' //  // Admin Level 1 name - required for geoB state calculations only, and chart titles
var wards = 
  // FreetownDistricts 
  AddisWoredas
  //RwandaVillages.filter(ee.Filter.eq('Prov_Enlgi', 'Kigali Town')) 
  //RwandaCells.filter(ee.Filter.eq('CODE_PROV', '01')) 
  //KigaliPC
var munis = 
  //geoBadm2.filter(ee.Filter.eq('ADM1_sha_1', AOI)); // State scale ADM2 analysis
  //geoBadm2.filter(ee.Filter.eq('shapeName', AOI));
  wards
var fullAOI = munis.union()
var muniName = 'shapeName' // for geoB
var ULU = 
  ulu6cat
  //ulu6catVJuly2021
  //ee.ImageCollection('projects/wri-datalab/urban_land_use/dev/versions/r1dw_17_d4_256x3-ssfw')
  //ee.ImageCollection('users/emackres/ULU/KigaliULU7cat')
  //AddisULU20197cat
  //ee.ImageCollection('users/emackres/ULU/FreetownULU7cat')
var uluband = 'lulc' // 'lulc' for AddisULU20197cat, 'LULC' for ulu6cat
var BACKGROUND='SATELLITE';
Map.setOptions(BACKGROUND); 
Map.centerObject(munis,12)
//Population visualization
var popviz = {
  bands: ['population'],
  min: 0.0,
  max: 600,
  palette: ['24126c', '1fff4f', 'd4ff50']
};
var CLASSES_7=[
  "open_space",
  "nonresidential",
  "atomistic",
  "informal_subdivision",
  "formal_subdivision",
  "housing_project",
  "road"]
var COLORS_7=[
  '33A02C',
  'E31A1C',
  'FB9A99',
  'FFFF99',
  '1F78B4',
  'A6CEE3',
  'bdbdbd']
var CLASSES=CLASSES_7
var colors7=COLORS_7
var ULU7Params = {bands: [uluband], min: 0, max: 6, opacity: 1, palette: colors7};
//var ULUfiltered = ULU.map(function(image) { return image.clip(munis); }).filterBounds(munis)
var ULUfiltered = ULU.select(uluband).reduce(ee.Reducer.firstNonNull()).rename(uluband)
print(ULUfiltered)
Map.addLayer(ULUfiltered, ULU7Params, '7-class land use 2020 (WRI)',false,0.5);
var ULUfilteredVul = ULUfiltered.updateMask(ULUfiltered.neq(4)).updateMask(ULUfiltered.neq(5)) 
//Map.addLayer(ULUfilteredVul, ULU7Params, '7-class land use 2020 - vulnerable',false,0.5);
//Filter population layers for start and end years
var popStart = pop
  .map(function(image) { return image.clip(munis); })
  .filterMetadata('year', 'equals', startyear)
  .filterMetadata('country', 'equals', countryCode)
print(popStart)
Map.addLayer(popStart, popviz, 'Population '+startyear+' (WorldPop)',false,0.5);
var mergedpopStart = popStart.toBands().rename('population')
print(mergedpopStart.projection().nominalScale())
// Reproject population to match ULU projection
var ULUprojection = ULUfiltered.projection(); 
print('ULU projection:', ULUprojection);
// Resample population raster (100m) to match ULU raster (5m) 
var PopImg5m = mergedpopStart//popStart.first()//.reduce(ee.Reducer.mode()).rename('population')
    // Force the next reprojection to aggregate instead of resampling.
    .resample('bilinear')
    // Request the data at the scale and projection of the ULU image.
    .reproject({
      crs: ULUprojection
    })
//Recalculate pixel values to new resolution [Float / (100/5)*(100/5)]
var PopImgRecalc = PopImg5m
    .expression('b(0) / ((oldRes/newRes)*(oldRes/newRes))', 
    {oldRes: mergedpopStart.projection().nominalScale(), newRes: ULUprojection.nominalScale()})
// Add recalculated population to map 
var popvizR = {
  bands: ['population'],
  min: 0.0,
  max: 1.5,
  palette: ['24126c', '1fff4f', 'd4ff50']
};
//Map.addLayer(PopImgRecalc, popvizR, 'Population '+startyear+' 5m',false,0.5);
// combine pop and ULU layers in one image.
var bulu=ULUfiltered.select(uluband)//.toBands()//.reduce(ee.Reducer.mode()).rename(uluband)//.first()//
print('bulu', bulu)
var bpop=PopImgRecalc
var get_lulc_pop=function(lulc_value){
  return ee.Image(bpop.updateMask(bulu.eq(lulc_value)).unmask(0))
              .rename(ee.String('') //'pop_lulc-'
              .cat(ee.Number(lulc_value).toInt().format()))
}
var lulc_pop=ee.Image(get_lulc_pop(0)).addBands([
  get_lulc_pop(1),  
  get_lulc_pop(2),  
  get_lulc_pop(3),  
  get_lulc_pop(4),  
  get_lulc_pop(5),
  get_lulc_pop(6),  
])
print(lulc_pop)
// Get sum of population for each land use class for each feature 
var histo=lulc_pop.reduceRegions({
  reducer: ee.Reducer.sum(), 
  collection: munis, 
  scale: 5, 
  tileScale: 1
})
//var histo=histo.makeArray(['0','1','2','3','4','5','6'], 'population')
print('histogram:', histo.limit(5))
// Calculate new variables to add to feature collection 
var count_to_percent=function(feat){
  feat=ee.Feature(feat)
  var hist=ee.Dictionary(feat
  //.get('population'))
  .toDictionary(['0','1','2','3','4','5','6'
    //'pop_lulc-0','pop_lulc-1','pop_lulc-2','pop_lulc-3','pop_lulc-4','pop_lulc-5','pop_lulc-6'
    ]))
  hist=hist.set('0',hist.get('0',0))
  hist=hist.set('1',hist.get('1',0))
  hist=hist.set('2',hist.get('2',0))
  hist=hist.set('3',hist.get('3',0))
  hist=hist.set('4',hist.get('4',0))
  hist=hist.set('5',hist.get('5',0))
  hist=hist.set('6',hist.get('6',0))
  var total=hist.values().reduce(ee.Reducer.sum())
  var inc=hist.values(['2','3','4','5']).reduce(ee.Reducer.sum()) // ULU classes to include in the final share calculations
  var exc=hist.values(['0','1','6']).reduce(ee.Reducer.sum()) // ULU classes to exclude from the final share calculations
  var denom=hist.values(['0','1','2','3','4','5','6']).reduce(ee.Reducer.sum())
  var built=hist.values(['1','2','3','4','5','6']).reduce(ee.Reducer.sum())
  var nonres=hist.values(['1']).reduce(ee.Reducer.sum())
  var incCounts=ee.Dictionary(feat.toDictionary(['2','3','4','5']));
    incCounts=incCounts.set('2',incCounts.get('2',0))
    incCounts=incCounts.set('3',incCounts.get('3',0))
    incCounts=incCounts.set('4',incCounts.get('4',0))
    incCounts=incCounts.set('5',incCounts.get('5',0))
  var pct_hist=hist.map(function(k,v){
    return ee.Number(v).divide(total)
  })
  var inc_hist=incCounts.map(function(k,v){
    return ee.Number(v).divide(inc)
  })
  var adjPop=hist.map(function(k,v){
    return ee.Number(exc).multiply(ee.Number(inc_hist.get(k,0)))
    .add(ee.Number(incCounts.get(k,0)));
  })
  var res_ratio=ee.Number(inc).divide(denom)
  var nonresBU=ee.Number(nonres).divide(built)
  var adjPopPct=adjPop.map(function(k,v){
    return ee.Number(v).divide(total)
  })
  var nonFormalPct=ee.Number(adjPopPct.get('2')).add(ee.Number(adjPopPct.get('3')))//.add(ee.Number(adjPopPct.get('5'))); //Select which classes to consider "non-formal"
  var nonFormalPop=ee.Number(adjPop.get('2')).add(ee.Number(adjPop.get('3')))//.add(ee.Number(adjPop.get('5'))); //Select which classes to consider "non-formal"
  var area=feat.area({maxError:10}).divide(1000000)
  var nonFormalPopKM2 = nonFormalPop.divide(area)
  return feat.set({
    TotalPop: total,
    NotResTotal: exc,
    percentiles: pct_hist,
    ResPercent: res_ratio,
    incPercentiles: inc_hist,
    ResOnlyAdjPop: adjPop,
    ResOnlyAdjPercent: adjPopPct,
    NonFormalPct: nonFormalPct,
    NonFormalPop: nonFormalPop,
    NonResPctofBuiltup: nonresBU,
    areaKM2: area,
    NonFormalPopPerKM2: nonFormalPopKM2
  })
}
var concat=function(feat){
  feat=ee.Feature(feat)
  var sub = feat.get('Sub_City')
  var wor = feat.get('Woreda')
  var district = ee.String(sub).cat(wor)
  return feat.set({
    District: district
  })
}
var group=function(feat){
  feat=ee.Feature(feat)
  var grp = ColGroup
  return feat.set({
    Group: grp
  })
}
// updated FeatureCollection  
var ColGroup = 'Woredas'
var pop_pcts=histo.map(concat).map(group).map(count_to_percent)
print('Population by Land Use (%) for Wards',pop_pcts);
// Get sum of population for each land use class for full area of interest
var histoCum=lulc_pop.reduceRegions({
  reducer: ee.Reducer.sum(), 
  collection: fullAOI, 
  scale: 5, 
  tileScale: 1
})
var popCum_pcts=histoCum.map(count_to_percent)
print('Population by Land Use (%) for full AOI',popCum_pcts);
// Check city-wide totals based on orignal raster scale
var alttotal = mergedpopStart.reduceRegions({collection:fullAOI, reducer: ee.Reducer.sum()}) 
print(alttotal)
//var SumPop_pcts=histo.union().map(count_to_percent)
//print('Population by Land Use (%) city total',SumPop_pcts.limit(5));
//Calculate totals by land use for whole area of interest
//var AOItotal = function(feat, k,v){
//  feat = ee.Feature(feat)
//  var PopArray = ee.Dictionary(feat.get('ResOnlyAdjPop'))
//  return PopArray.reduceColumns({reducer: ee.Reducer.sum(), selectors: k})}
//AllAOIpops =pop_pcts.map(AOItotal)
//var PopArray = ee.Dictionary(pop_pcts.get('ResOnlyAdjPop'))
//var AllAOIpops = pop_pcts.map(AOItotal)
//  )
// AllAOIpops = pop_pcts.flatten().reduceColumns({reducer: ee.Reducer.sum().repeat(4), selectors: ['2','3','4','5']})
//var AllAOIpops = pop_pcts.flatten().aggregate_sum(ResOnlyAdjPop.propertyNames())
//.forEachElement()
//print('Population by land use for whole area of interest', AllAOIpops)
// Paint and add layer of population by land use for each feature. 
var empty = ee.Image().byte();
var Ppctfills = empty.paint({
  featureCollection: pop_pcts,
  color: 'NonFormalPct', //'NonFormalPct', 'NonFormalPop', 'NonResPctofBuiltup'
});
var Pcountfills = empty.paint({
  featureCollection: pop_pcts,
  color: 'NonFormalPopPerKM2', //'NonFormalPct', 'NonFormalPop', 'NonFormalPopPerKM2', 'NonResPctofBuiltup'
});
//var fillspalette = ['0000FF', '00FF00', 'FF0000']; //
var fillspalette = ['green', 'yellow', 'red'];
var popPalette = ['A6CEE3', 'E31A1C']
//Map.addLayer(Ppctfills, {palette: fillspalette, min: 0, max: 1}, '% of residential population in non-Formal Subdivision land use', false, 0.65); 
//Map.addLayer(Pcountfills, {palette: fillspalette, min: 0, max: 20000}, 'Per km2 count of residential population in non-Formal Subdivision land use', false, 0.65); 
var legend=require('users/brookwilliams/utils:apps/legend');
//var lgndULU=legend.build(CLASSES,colors7,"Urban Land Use")
var lgndPop=legend.build(['20%','100%'],popPalette,"% Population in non-Formal Subdivision",'bottom-right')
//Map.add(lgndULU)
//Map.add(lgndPop)
//Map.addLayer(subcities, {color: '000000'}, AOI, false, 0.5)
var AOIs4 = ee.FeatureCollection(
  [MekanisaElevated,
  MekanisaFarmers.buffer(1500),
  AkakiFarmers.buffer(1500),
  AbaSamuelFarmers.buffer(3000)])
var AOIs3 = ee.FeatureCollection(
  [MekanisaElevated,
  MekanisaFarmers.buffer(1500),
  AkakiFarmers.buffer(1500),
  AbaSamuelFarmers.buffer(3000)])
var histo=lulc_pop.reduceRegions({
  reducer: ee.Reducer.sum(), 
  collection: AOIs3, 
  scale: 5, 
  tileScale: 1
})
ColGroup = 'AOIs'
var AOIs_pcts=histo.map(group).map(count_to_percent)
var aoiPpctfills = empty.paint({
  featureCollection: AOIs_pcts,
  color: 'NonFormalPct', //'NonFormalPct', 'NonFormalPop', 'NonResPctofBuiltup'
});
//Map.addLayer(AOIs4,{palette:['black']},'Potential study site AOIs',false,0.5)
//Map.addLayer(aoiPpctfills, {palette: fillspalette, min: 0, max: 1}, 'Potential study site AOIs - % of residential population in non-Formal Subdivision land use', false, 0.65); 
//Map.addLayer(MekanisaElevated,{palette:['black']},'AOI - Mekanisa elevated',1,0.5)
//Map.addLayer(MekanisaFarmers.buffer(1500),{palette:['black']},'AOI - Mekanisa farmers',1,0.5)
//Map.addLayer(AkakiFarmers.buffer(1500),{palette:['black']},'AOI - Akaki farmers',1,0.5)
//Map.addLayer(AbaSamuelFarmers.buffer(3000),{palette:['black']},'AOI - Aba Samuel farmers',1,0.5)
var pop_pctsFiltSort = pop_pcts.select(['District','Group','NonFormalPct','NonResPctofBuiltup','NonFormalPop','areaKM2']).sort('NonFormalPct', false)
print(pop_pctsFiltSort)
Export.table.toAsset({
  collection: pop_pctsFiltSort,
  description: 'AddisPopbyDistrictULU',
});
//create dictionaries to translate city land use codes to AUE values
var mapdicAddis = ee.Dictionary({
  'Administration':2,
  'Commercial':1,
  'Cultural & Social Walefare':2,
  'Education':2,
  'Green':0,
  'Health':2,
  'Infrastructre and utilties':2,
  'Manufacturing & Storage':3,
  'Mixed Residential':4,
  'Municipal Services':2,
  'Open Space':0,
  'Recreation':0,
  'Religious Institution':2,
  'Residential':4,
  'River':1,
  'Road network':5,
  'Special use':6,
  'Transport terminal':5,
  'Under Construction':6
  })
//set parameters for city land use table 
var LandUse = AddisLandUse //options: BogotaLandUse, ChicagoLandUse, AddisLandUse
var mapping = mapdicAddis //options: mapdicBogotaUsoResumen, mapdicBogotaUso, mapdicChicagoLANDUSE, mapdicAddis
var field = 'Layer' // options: Bogota: 'UsoResumen', 'Uso', Chicago: 'LANDUSE', Addis: 'Layer'
var OfficialLUremap6cat=LandUse.map(function(f){
  f=ee.Feature(f);
  return f.set('lulc',mapping.get(f.get(field)))
  .set('area',f.area());
  });
var remappedOfficial = OfficialLUremap6cat
var emptyImage = ee.Image().byte();
var ReClassImage = emptyImage.paint({
  featureCollection: remappedOfficial,
  color: 'lulc', 
});
var COLORS_6=['#33a02c','#e31a1c', '#fb9a99','#ffff99','#1f78b4','#a6cee3']
var COLORS_7=[
  '6ADE6A',
  '00ffff',
  'FF5E61',
  'ff1493',
  'EDED87',
  '0b60c8',
  '9400d3']
var CLASSES_7=[
  "Green",
  "Blue",
  "Institutional",
  "Commercial",
  "Residential",
  "Transportation",
  "Other - special use, construction"]
var CLASSES=CLASSES_7
var colors=COLORS_7
var minScale = 0;
var maxScale = 6;
Map.addLayer(ReClassImage, {palette: colors, min: minScale, max: maxScale}, 'LULC in system categories', false, 0.6)
var legend=require('users/brookwilliams/utils:apps/legend');
var lgndULU=legend.build(CLASSES,colors,"Land Use Land Cover (LULC)")
Map.add(lgndULU)
var LandUseRaster = remappedOfficial
  .filter(ee.Filter.notNull(['lulc']))
  .reduceToImage({
    properties: ['lulc'],
    reducer: ee.Reducer.first()
});
// Define the chart and print it to the console.
var chart =
    ui.Chart.feature
        .byFeature({
          features: pop_pctsFiltSort,
          xProperty: 'District', 
          yProperties: ['NonFormalPct']
        })
        .setChartType('ColumnChart')
        .setOptions({
          title: '% of residential population in non-Formal Subdivision land use by Woreda',
          hAxis:
              {title: 'Urban District', titleTextStyle: {italic: false, bold: true}},
          vAxis: {
            title: 'Residential population in non-Formal Subdivision land use (%)',
            titleTextStyle: {italic: false, bold: true}
          },
          //colors: ['brown', 'green']
        });
print(chart);
var AOIs_pctsFiltSort = AOIs_pcts.select(['District','Group','NonFormalPct','NonResPctofBuiltup','NonFormalPop','areaKM2'])
var merged = pop_pctsFiltSort.merge(AOIs_pctsFiltSort).sort('NonFormalPct', false)
// Define the chart and print it to the console.
var chart =
    ui.Chart.feature
        .groups({
          features: merged,
          xProperty: 'District',
          yProperty: 'NonFormalPct',
          seriesProperty: 'Group'
        })
        .setSeriesNames(['Woredas', 'Project sites'])
        .setChartType('ColumnChart')
        .setOptions({
          title: '% of residential population in non-Formal Subdivision land use by area of interest',
          hAxis:
              {title: 'Urban area', titleTextStyle: {italic: false, bold: true}},
          vAxis: {
            title: 'Residential population in non-Formal Subdivision land use (%)',
            titleTextStyle: {italic: false, bold: true}
          },
          bar: {groupWidth: '100%'},
          colors: ['cf513e', '1d6b99'],
          isStacked: true
        });
print(chart);
// link to the code that computes the Landsat LST
var LandsatLST = require('users/emackres/DataPortal:/Landsat_LST.js');
var cloudmask = require('users/emackres/DataPortal:/cloudmask.js');
/*
Author: Sofia Ermida (sofia.ermida@ipma.pt; @ermida_sofia)
This code is free and open. 
By using this code and any data derived with it, 
you agree to cite the following reference 
in any publications derived from them:
Ermida, S.L., Soares, P., Mantas, V., Göttsche, F.-M., Trigo, I.F., 2020. 
    Google Earth Engine open-source code for Land Surface Temperature estimation from the Landsat series.
    Remote Sensing, 12 (9), 1471; https://doi.org/10.3390/rs12091471
*/
// select region of interest, date range, and landsat satellite
var satellite = 'L8';
var date_start = '2018-03-01';
var date_end = '2021-06-30';
var month_start = 2;
var month_end = 4;
var use_ndvi = true;
var country = 'ETH';
//var AOI = 
  //AddisWoredas
  //BangaloreWards
  //geoBadm2.filter(ee.Filter.eq('ADM1_sha_1', 'Ciudad de México')); // State scale ADM2 analysis
  //AGEBs.filter(ee.Filter.eq('cve_sun', 'M14.01')); // Mexico City: 'M09.01'
  //RwandaVillages.filter(ee.Filter.eq('Prov_Enlgi', 'Kigali Town'))//.filter(ee.Filter.gte('SUM_Popula', 1000));
// get landsat collection with added variables: NDVI, FVC, TPW, EM, LST
var LandsatColl = LandsatLST.collection(satellite, date_start, date_end, wards, use_ndvi)
  .filter(ee.Filter.calendarRange(month_start, month_end, 'month'))
//print(LandsatColl)
// select the first feature
var exImage = 
  //LandsatColl.first();
  //ee.Algorithms.Landsat.simpleComposite(LandsatColl)
  LandsatColl
  //.filterBounds(wards)
  //.mosaic()
  .qualityMosaic('pixel_qa')
var LSTmean = LandsatColl.select('LST').reduce(ee.Reducer.mean()).subtract(273.15)
var cmap1 = ['blue', 'cyan', 'green', 'yellow', 'red'];
Map.addLayer(LSTmean,{min:20, max:45, palette:cmap1}, 'Mean land surface temperature C',false)
var LST90pfull = LSTmean.reduceRegions({collection:fullAOI, reducer: ee.Reducer.percentile({percentiles:[90,95], maxRaw:1000}), scale:500})
var area90p = ee.Number(LST90pfull.first().get('p90'))
var area95p = ee.Number(LST90pfull.first().get('p95'))
var LSTthres = area90p
var highheatrisk = LandUseRaster.updateMask(LSTmean.gte(LSTthres))
Map.addLayer(highheatrisk, {palette: colors, min: minScale, max: maxScale}, 'LULC with high heat hazard', false, 1)
var WorldPop = ee.ImageCollection("WorldPop/GP/100m/pop")
  .select('population')
  .filterMetadata('year', 'equals', 2020)
  .reduce(ee.Reducer.firstNonNull())
//Map.addLayer(WorldPop, {}, 'Population', true, 0.6)
var Pop90pfull = WorldPop.reduceRegions({collection:fullAOI, reducer: ee.Reducer.percentile({percentiles:[5,10,20,50], maxRaw:1000}), scale:500})
var Poparea5p = ee.Number(Pop90pfull.first().get('p5'))
var Poparea10p = ee.Number(Pop90pfull.first().get('p10'))
var Poparea20p = ee.Number(Pop90pfull.first().get('p20'))
var Poparea50p = ee.Number(Pop90pfull.first().get('p50'))
var Popthres = Poparea50p
print('Popthres:',Popthres)
var highheatriskexposure = highheatrisk.updateMask(WorldPop.gt(Popthres)).updateMask(LandUseRaster.neq(0)).updateMask(LandUseRaster.neq(1))
Map.addLayer(highheatriskexposure, {palette: colors, min: minScale, max: maxScale}, 'LULC with high heat hazard and exposure', false, 1)
var highheatriskexposvul = highheatriskexposure.updateMask(ULUfilteredVul.gte(0))
Map.addLayer(highheatriskexposvul, {palette: colors, min: minScale, max: maxScale}, 'LULC with high heat hazard, exposure, vulnerability', false, 1)
// hydro layers
var flow = ee.Image("MERIT/Hydro/v1_0_1");
var visualizationHAND = {
  bands: ['hnd'],
  min:0,
  max:50
};
Map.addLayer(flow, visualizationHAND, "Height above nearest drainage (m)",1,0.5);
var visualizationWth = {
  bands: ['viswth'],
};
//Map.addLayer(flow.updateMask(flow.select('viswth').gt(0)), visualizationWth, "River width",0);
var basins = ee.FeatureCollection("WWF/HydroSHEDS/v1/Basins/hybas_12");
basins = basins.style({
  color: "white",
  width: 2,
  fillColor: "B2B2B300"
});
Map.addLayer(basins, {}, "Basins");
var visualizationAcc = {
  bands: ['upa'],
  palette:['green','yellow','red'],
  min:0,
  max:500
};
Map.addLayer(flow.updateMask(flow.select('upa').gt(1)), visualizationAcc, "Flow accumulation area (km2)");
var Flood2cm = ee.Image('users/emackres/AA_FloodRisk_Full_02cm')
var Flood8cm = ee.Image('users/emackres/AA_FloodRisk_Full_08cm')
// Values : 1 indicates inundation of 0.15m atleast once in a 24 hour timeperiod. 2 indicates inundation of 0.5m at least once in a 24 hour time period. 
var floodviz = {
  min: 0,
  max: 2,
  palette: ['black', 'orange','red']
};
//Map.addLayer(Flood2cm.updateMask(Flood2cm.gte(1)),floodviz,'2cm rainfall',false)
Map.addLayer(Flood8cm.updateMask(Flood8cm.gte(1)),floodviz,'8cm rainfall',false)
var highfloodrisk = LandUseRaster.updateMask(Flood8cm.gte(1))
//Map.addLayer(highfloodrisk, {palette: colors, min: minScale, max: maxScale}, 'LULC with high flood hazard', false, 1)
var highfloodriskexposure = highfloodrisk.updateMask(WorldPop.gt(Popthres)).updateMask(LandUseRaster.neq(0)).updateMask(LandUseRaster.neq(1))
//Map.addLayer(highfloodriskexposure, {palette: colors, min: minScale, max: maxScale}, 'LULC with high flood hazard and exposure', false, 1)
var highfloodriskexposvul = highfloodriskexposure.updateMask(ULUfilteredVul.gte(0))
//Map.addLayer(highfloodriskexposvul, {palette: colors, min: minScale, max: maxScale}, 'LULC with high flood hazard, exposure, vulnerability', true, 1)
var floodComb = highfloodrisk.rename('Hazard').addBands(highfloodriskexposure.rename('HazardExposure')).addBands(highfloodriskexposvul.rename('HazardExposureVuln'))
print('floodComb:',floodComb)
Export.image.toAsset({
  image:floodComb, 
  description:'floodComb', 
  assetId:'AddisFloodRisk', 
  region:fullAOI, 
  scale:2, 
  maxPixels:500000000})
var floodrisk = ee.Image('users/emackres/AddisFloodRisk')
Map.addLayer(floodrisk.select('Hazard'), {palette: colors, min: minScale, max: maxScale}, 'LULC with high flood hazard', false, 1)
Map.addLayer(floodrisk.select('HazardExposure'), {palette: colors, min: minScale, max: maxScale}, 'LULC with high flood hazard & exposure', false, 1)
Map.addLayer(floodrisk.select('HazardExposureVuln'), {palette: colors, min: minScale, max: maxScale}, 'LULC with high flood hazard, exposure & vulnerability', true, 1)
//district boundaries
var empty = ee.Image().byte();
var AOIimage = empty.paint({
  featureCollection: munis,
  width: 2
});
Map.addLayer(AOIimage,{palette:['#484848']},''+AOI+' district boundaries',1)
Map.addLayer(AddisFloodPts,'','Flood Incidents')
var AOIimage = empty.paint({
  featureCollection: KigaliPC,
  width: 2
});
//Map.addLayer(AOIimage,{palette:['black']},''+AOI+' district boundaries',false)