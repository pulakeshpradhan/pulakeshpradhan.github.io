var imageVisParam = ui.import && ui.import("imageVisParam", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "max"
        ],
        "min": 1,
        "max": 4,
        "palette": [
          "f7fb0c",
          "b2b444",
          "87842d",
          "60562f"
        ]
      }
    }) || {"opacity":1,"bands":["max"],"min":1,"max":4,"palette":["f7fb0c","b2b444","87842d","60562f"]},
    sa = ui.import && ui.import("sa", "table", {
      "id": "users/Shree1175/CODA_assets/MSA_UrbanCities_USA2018_biome_final2019_updated"
    }) || ee.FeatureCollection("users/Shree1175/CODA_assets/MSA_UrbanCities_USA2018_biome_final2019_updated"),
    viz_canopy = ui.import && ui.import("viz_canopy", "imageVisParam", {
      "params": {
        "opacity": 0.99,
        "bands": [
          "max"
        ],
        "palette": [
          "f3f5d0",
          "87d45f",
          "367d42"
        ]
      }
    }) || {"opacity":0.99,"bands":["max"],"palette":["f3f5d0","87d45f","367d42"]},
    viz_canopy2 = ui.import && ui.import("viz_canopy2", "imageVisParam", {
      "params": {
        "opacity": 0.99,
        "bands": [
          "max"
        ],
        "min": 0.12715400276756125,
        "max": 0.41460183531315775,
        "palette": [
          "f3f5d0",
          "87d45f",
          "367d42"
        ]
      }
    }) || {"opacity":0.99,"bands":["max"],"min":0.12715400276756125,"max":0.41460183531315775,"palette":["f3f5d0","87d45f","367d42"]},
    viz_gap2 = ui.import && ui.import("viz_gap2", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "max"
        ],
        "min": 0.154,
        "max": 0.35126859719484094,
        "palette": [
          "94ce86",
          "f7ff81",
          "dc5311"
        ]
      }
    }) || {"opacity":1,"bands":["max"],"min":0.154,"max":0.35126859719484094,"palette":["94ce86","f7ff81","dc5311"]},
    canopy = ui.import && ui.import("canopy", "imageCollection", {
      "id": "users/Shree1175/CODA_Canopy/FinalCollection"
    }) || ee.ImageCollection("users/Shree1175/CODA_Canopy/FinalCollection"),
    tiger2010 = ui.import && ui.import("tiger2010", "table", {
      "id": "TIGER/2010/Blocks"
    }) || ee.FeatureCollection("TIGER/2010/Blocks"),
    imageVisParam2 = ui.import && ui.import("imageVisParam2", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "constant"
        ],
        "palette": [
          "ededed"
        ]
      }
    }) || {"opacity":1,"bands":["constant"],"palette":["ededed"]},
    bloc_temp = ui.import && ui.import("bloc_temp", "table", {
      "id": "users/Shree1175/UrbanForest/Block_Summary_Temp"
    }) || ee.FeatureCollection("users/Shree1175/UrbanForest/Block_Summary_Temp"),
    imageVisParam3 = ui.import && ui.import("imageVisParam3", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "max"
        ],
        "min": 35.134614339983386,
        "max": 38.228072232247314,
        "palette": [
          "4425e9",
          "ffffe5",
          "d83611"
        ]
      }
    }) || {"opacity":1,"bands":["max"],"min":35.134614339983386,"max":38.228072232247314,"palette":["4425e9","ffffe5","d83611"]},
    imageVisParam4 = ui.import && ui.import("imageVisParam4", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "constant"
        ],
        "gamma": 1
      }
    }) || {"opacity":1,"bands":["constant"],"gamma":1},
    LowIncome = ui.import && ui.import("LowIncome", "table", {
      "id": "users/charlotteks/AB1550LowIncome"
    }) || ee.FeatureCollection("users/charlotteks/AB1550LowIncome"),
    Disadv = ui.import && ui.import("Disadv", "table", {
      "id": "users/charlotteks/CES3_0Top25PCT"
    }) || ee.FeatureCollection("users/charlotteks/CES3_0Top25PCT"),
    block_suitability = ui.import && ui.import("block_suitability", "table", {
      "id": "users/charlotteks/block_suitability"
    }) || ee.FeatureCollection("users/charlotteks/block_suitability"),
    urban_30m_suitability = ui.import && ui.import("urban_30m_suitability", "image", {
      "id": "users/charlotteks/urbn_suitability"
    }) || ee.Image("users/charlotteks/urbn_suitability"),
    viz_uf30 = ui.import && ui.import("viz_uf30", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "b1"
        ],
        "min": 83.27700578302401,
        "max": 295.86490872332536,
        "palette": [
          "fff6ea",
          "d6ffa9",
          "70a73e"
        ]
      }
    }) || {"opacity":1,"bands":["b1"],"min":83.27700578302401,"max":295.86490872332536,"palette":["fff6ea","d6ffa9","70a73e"]},
    viz_suit = ui.import && ui.import("viz_suit", "imageVisParam", {
      "params": {
        "opacity": 0.7100000000000001,
        "bands": [
          "max"
        ],
        "palette": [
          "c9c5e0",
          "d4adca",
          "6e5c7e"
        ]
      }
    }) || {"opacity":0.7100000000000001,"bands":["max"],"palette":["c9c5e0","d4adca","6e5c7e"]},
    temp_raw = ui.import && ui.import("temp_raw", "imageCollection", {
      "id": "users/Shree1175/UrbanForest/TempCollection"
    }) || ee.ImageCollection("users/Shree1175/UrbanForest/TempCollection"),
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            -118.14660009727532,
            33.90723707978487
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.07519017052522,
            33.90083776762163
          ]
        },
        {
          "type": "Point",
          "coordinates": [
            -118.19364597747722,
            33.99656064450807
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.Geometry.MultiPoint(
        [[-118.14660009727532, 33.90723707978487],
         [-118.07519017052522, 33.90083776762163],
         [-118.19364597747722, 33.99656064450807]]),
    ca_result = ui.import && ui.import("ca_result", "table", {
      "id": "users/Shree1175/CA_UrbanReforestation/BlockSummaries_with_UHI_june2020_v2_completed"
    }) || ee.FeatureCollection("users/Shree1175/CA_UrbanReforestation/BlockSummaries_with_UHI_june2020_v2_completed"),
    uf_rc = ui.import && ui.import("uf_rc", "image", {
      "id": "users/Shree1175/CA_UrbanReforestation/Urban_rc3"
    }) || ee.Image("users/Shree1175/CA_UrbanReforestation/Urban_rc3"),
    vis_diff = ui.import && ui.import("vis_diff", "imageVisParam", {
      "params": {
        "opacity": 0.65,
        "bands": [
          "Diff_Temp"
        ],
        "min": 0.7587195282776702,
        "max": 4.973918160785177,
        "palette": [
          "076ce9",
          "b8fff5",
          "ffb8ad",
          "ff0a0a"
        ]
      }
    }) || {"opacity":0.65,"bands":["Diff_Temp"],"min":0.7587195282776702,"max":4.973918160785177,"palette":["076ce9","b8fff5","ffb8ad","ff0a0a"]},
    vis_diff2 = ui.import && ui.import("vis_diff2", "imageVisParam", {
      "params": {
        "opacity": 0.86,
        "bands": [
          "Diff_UHI"
        ],
        "min": 0.6326751028892161,
        "max": 5.340266191703516,
        "palette": [
          "175bf1",
          "89c3ff",
          "fffdeb",
          "ff220c"
        ]
      }
    }) || {"opacity":0.86,"bands":["Diff_UHI"],"min":0.6326751028892161,"max":5.340266191703516,"palette":["175bf1","89c3ff","fffdeb","ff220c"]},
    can_diff = ui.import && ui.import("can_diff", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "Diff_Can"
        ],
        "min": -9,
        "max": 0,
        "palette": [
          "357237",
          "7fc661",
          "b2f5aa",
          "feffe7"
        ]
      }
    }) || {"opacity":1,"bands":["Diff_Can"],"min":-9,"max":0,"palette":["357237","7fc661","b2f5aa","feffe7"]},
    acs2015 = ui.import && ui.import("acs2015", "table", {
      "id": "users/Shree1175/CA_UrbanReforestation/CaCensusBlockGroup2015"
    }) || ee.FeatureCollection("users/Shree1175/CA_UrbanReforestation/CaCensusBlockGroup2015"),
    imageVisParam5 = ui.import && ui.import("imageVisParam5", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "max"
        ],
        "min": 1.9122026530560814,
        "max": 4.167507491871454,
        "palette": [
          "91d2c0",
          "fcff39",
          "f5beff",
          "5e1d8f"
        ]
      }
    }) || {"opacity":1,"bands":["max"],"min":1.9122026530560814,"max":4.167507491871454,"palette":["91d2c0","fcff39","f5beff","5e1d8f"]},
    canopy_acres_RIV = ui.import && ui.import("canopy_acres_RIV", "table", {
      "id": "users/charlotteks/Canopy_Acres_Export_Riv"
    }) || ee.FeatureCollection("users/charlotteks/Canopy_Acres_Export_Riv"),
    imageVisParam6 = ui.import && ui.import("imageVisParam6", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "TreeNeeded"
        ],
        "min": 2,
        "max": 10.8,
        "palette": [
          "b0e44b",
          "fff03b",
          "ffa500",
          "ff2812",
          "5e1a0a"
        ]
      }
    }) || {"opacity":1,"bands":["TreeNeeded"],"min":2,"max":10.8,"palette":["b0e44b","fff03b","ffa500","ff2812","5e1a0a"]},
    imageVisParam7 = ui.import && ui.import("imageVisParam7", "imageVisParam", {
      "params": {
        "opacity": 0.7100000000000001,
        "bands": [
          "Urban Heat Island"
        ],
        "min": 0.18530161552817725,
        "max": 5.394785543942257,
        "palette": [
          "b8d5ff",
          "ffc883",
          "ff8572",
          "c23d30",
          "741b17"
        ]
      }
    }) || {"opacity":0.7100000000000001,"bands":["Urban Heat Island"],"min":0.18530161552817725,"max":5.394785543942257,"palette":["b8d5ff","ffc883","ff8572","c23d30","741b17"]},
    vis_potacre = ui.import && ui.import("vis_potacre", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "Pot_Acres"
        ],
        "min": 0.5,
        "max": 65,
        "palette": [
          "ffe000",
          "a3d800",
          "0e7e00",
          "008f88"
        ]
      }
    }) || {"opacity":1,"bands":["Pot_Acres"],"min":0.5,"max":65,"palette":["ffe000","a3d800","0e7e00","008f88"]};
////////////////////////////////////////////////////////////////////////////////////////////////////////////
// This script is to create app to share the information with Ashley and Sydney for their Policy Mapping work
////////////////////////////////////////////////////////////////////////////////////////////////////////////
var outputCRS = 'EPSG:5070';
var cities =ee.FeatureCollection(sa)
//var sa = cities.filter(ee.Filter.inList('zone',[12]));
var sa = cities.filter(ee.Filter.inList('Name',['Sacramento, CA','Los Angeles--Long Beach--Anaheim, CA', 'Riverside--San Bernardino, CA']));
//var empty = ee.Image().byte();
var sa_outline = ee.Image().byte().paint({featureCollection:sa, color: 2, width: 3});
//print('cities selected', sa)
var city_la  = cities.filter(ee.Filter.inList('Name',['Los Angeles--Long Beach--Anaheim, CA']));
Map.centerObject(city_la, 10);
//print(block_suitability.limit(5))
///////////////////////////////////////
//load Urban Atlas Summary data
//////////////////////////////////////
//var table = ee.FeatureCollection('users/charlotteks/TreeGap_Block')
//var TreeGap = table.filterBounds(sa)
var block_summary =ee.FeatureCollection(bloc_temp).filterBounds(sa)
//////////////////////////
//load acs data - annual median income 'b19025ae1'
//////////////////////////
var ca_census = ee.FeatureCollection(acs2015).filterBounds(sa).select('b19025ae1','aland','awater','blkgrpce','countyfp','geoid','geoid_data','namelsad','shape_area','tractce','intptlat', 'intptlin')
print('check acs data', ca_census.limit(5))
var acs_outline = ee.Image().byte().paint({featureCollection:ca_census, color: 1, width: 1});
//load Tiger blocks
var sel_blocks = ee.FeatureCollection(tiger2010).filterBounds(sa)
var cityblock_outline = ee.Image().byte().paint({featureCollection:sel_blocks, color: 3, width: 1});
print('check tiger data', sel_blocks.limit(5))
////////////////////////////////////////
// Load Raw Canopy from Urbn Tree Atlas 2016
////////////////////////////////////////
var canopy_ca = ee.ImageCollection(canopy).mosaic().clip(ca_census)
//////////////////////////////////////////////////////////////
/////////// load block level summary from US Urban Atlas 
/////////////////////////////////////////////////////////////
var empty = ee.Image().byte(); // Create an empty image into which to paint the features, cast to byte
var LowIncomeOutline = empty.paint({      // Paint the edges with color
  featureCollection: LowIncome,
  width: 2
}); 
var DisadvCommOutline = empty.paint({      // Paint the edges with color
  featureCollection: Disadv,
  width: 2
}); 
//////////////////////////////////////////////////////////////////////
// load ca summary of results from urban analysis US Atlas and CA-NCS
/////////////////////////////////////////////////////////////////////
var ca_results = ee.FeatureCollection(ca_result)
print(ca_results.limit(5));
var treeRed_all = ca_results.reduceToImage(["fc_in_BG_g"],ee.Reducer.max()).rename('Tree canopy'); // NEW 
var can1m = ca_results.reduceToImage(["cal_per_Tr"],ee.Reducer.max()).rename('Tree canopy'); // NEW 
var can1m = ca_results.reduceToImage(["PER_CAN"],ee.Reducer.max()).rename('Tree canopy'); // NEW 
var treeGap_US = ca_results.reduceToImage(["TreeTarget"],ee.Reducer.max()).rename('Tree target'); // NEW 
var income = ca_results.reduceToImage(["IncomeGrp"],ee.Reducer.max());
var Surf_temp = ca_results.reduceToImage(["SurfaceTem"],ee.Reducer.max()).rename('Temperature'); // NEW ;
var uhi = ca_results.reduceToImage(["UHI"],ee.Reducer.max()).rename('Urban Heat Island'); // NEW ;
var diff_can = ca_results.reduceToImage(["Diff_can"],ee.Reducer.max()).rename('Diff_Can'); // NEW ;
var diff_temp = ca_results.reduceToImage(["Diff_temp"],ee.Reducer.max()).rename('Diff_Temp'); // NEW ;
var diff_uhi = ca_results.reduceToImage(["Diff_uhi"],ee.Reducer.max()).rename('Diff_UHI'); // NEW ;
var suit= ca_results.reduceToImage(["SUITABILIT"],ee.Reducer.max()).rename('Suitability for RF'); // NEW ;
//var suit_rc= ca_results.reduceToImage(["SUIT_CLASS"],ee.Reducer.max()); // NEW ;
var tree_needed= ca_results.reduceToImage(["ACRES_NEED"],ee.Reducer.max()).rename('TreeNeeded'); // NEW 
var popGrp= ca_results.reduceToImage(["PopDensGrp"],ee.Reducer.max());
var pot_acres= ca_results.reduceToImage(["RESTORATIO"],ee.Reducer.max()).rename('Pot_Acres');
//tree needed - mask out values below 0
var tree_needed_mask = tree_needed.select('TreeNeeded').gt(0);
var tree_needed_masked = tree_needed.updateMask(tree_needed_mask)
// calculate numerical values for suit_class
// set new suit_class field with number = 0 for no suitability
var add_suitclass_value0 = function(feature) {
  return feature.set({SUIT_CLASS_NUM: 0});
};
var add_suitclass_value1 = function(feature) {
  return feature.set({SUIT_CLASS_NUM: 1});
};
var add_suitclass_value2 = function(feature) {
  return feature.set({SUIT_CLASS_NUM: 2});
};
var add_suitclass_value3 = function(feature) {
  return feature.set({SUIT_CLASS_NUM: 3});
};
var ca_results_nosuit = ca_results.filterMetadata("SUIT_CLASS","equals","").map(add_suitclass_value0);
var ca_results_lowsuit = ca_results.filterMetadata("SUIT_CLASS","equals","Low Suitability").map(add_suitclass_value1);
var ca_results_medsuit = ca_results.filterMetadata("SUIT_CLASS","equals","Medium Suitability").map(add_suitclass_value2);
var ca_results_highsuit = ca_results.filterMetadata("SUIT_CLASS","equals","High Suitability").map(add_suitclass_value3);
var ca_results2 = ca_results_nosuit.merge(ca_results_lowsuit).merge(ca_results_medsuit).merge(ca_results_highsuit);
var suit_rc = ca_results2.reduceToImage(["SUIT_CLASS_NUM"],ee.Reducer.max()); // NEW ;
var masked_suit_rc = suit_rc.updateMask((suit_rc.select('max')).neq(0));
//var tree_canopy = ca_results.reduceToImage(["fc_in_BG_g"],ee.Reducer.max());
//var treeGap = ca_results.reduceToImage(["TreeTarget"],ee.Reducer.max());
//var temp = ca_results.reduceToImage(["SurfaceTem"],ee.Reducer.max());
//var prime_blocks = ca_results.reduceToImage(["suitabilit"],ee.Reducer.max());
//var can1m = ca_results.reduceToImage(["cal_per_Tr"],ee.Reducer.max()).rename('Tree canopy'); // NEW 
//var uhi = ca_results.reduceToImage(["UHI"],ee.Reducer.max()).rename('Urban Heat Island'); // NEW ;
var redPalette = {min:0, max : 1, palette:["e93c3d","FFFFE5","238433","004529"]};
var greenPalette = {min:6.5, max :23.5, palette:["e4e9b9","81bd6e","238433","004529"]};
var bluePalette = {min:0, max : 1, palette:["084081","41B6C4","FFFFE5","D9F0A3","78C679","238443","004529"]};
var yellowPalette = {min:1, max: 4, opacity: 0.71, palette: ["f7fb0c","b2b444","87842d","60562f"]};
var popPalette = {min:1, max: 4, opacity: 0.50, palette: ["91d2c0","fcff39","f5beff","5e1d8f"]}; 
var incPalettePRPL = {min:1, max: 4, opacity: 0.50, palette: ["91d2c0","fcff39","f5beff","5e1d8f"]};//1.9 - 4.1
var incPalette = {min:1, max: 4, opacity: 0.50, palette: ["f2e4f3","d6b6d5","a178a5","744b89"]};
var treeviz = {bands:"classification", max:1, palette: ["43b747"]};
var treeviz2 = {bands:"Tree canopy", max:1, palette: ["43b747"]};
var vis_temp = {max: 38.2, min: 35.1, opacity: 1, palette: ["4425e9","ffffe5","d83611"]}
var viz_diff = {max: 5.3, min: 0.63, opacity: 0.86, palette: ["f3f0ef","ffcbb6","d81704"]}
var vis_suit = {max: 25, min: 0, opacity: 0.71, palette: ["c9c5e0","d4adca","6e5c7e"]}
var vis_uhi = {min:1, max:5, opacity: 0.71, palette:['blue','green','yellow','orange','red','brown']}
var vis_uhi = {min:2, max:9, opacity: 0.71, palette:['a7ceff','ffd28f','ff420a','c40000']}
var vis_tree_need = {min:5, max:25.3, palette:['brown', 'red', 'orange', 'yellow', 'green', 'blue']}
var potPalette = {min:0.5, max : 495, palette: ["white", "green", "cyan"]}; 
//var potPalette = {min:0.5, max : 65, palette: ['white', 'yellow', 'green', 'blue']}; 
// palette:["fafbb5", "c0e4ba", "7b9b3d","4a6437"]
//Map.addLayer(new_temp_canopy_acres, {min: 10.2, max: 25.3, palette:['brown', 'red', 'orange', 'yellow', 'green', 'blue']}, 'new_temp_canopy_acres v1', false)
//////////////////
//visulize Results
/////////////////
//Map.addLayer(temp_raw, vis_temp, 'Landsat Temperature (deg C)', false)
//Map.addLayer(cityblock_outline,{palette: 'ededed', opacity: 0.6}, 'census block city', false)
//Map.addLayer(canopy_ca,treeviz, 'raw-canoy (2m)', false)
Map.addLayer(income, incPalette, 'Household Income', false)
//Map.addLayer(popGrp, popPalette, 'Population Density Group', true)
//Map.addLayer(treeGap, viz_gap2, 'Tree Gap', false)
Map.addLayer(treeRed_all, redPalette,"Current Tree Cover (%) within census block", false)
//Map.addLayer(can1m, greenPalette,"Percent Tree Cover (CA) within census blocks", false)
//Map.addLayer(Surf_temp, vis_temp, 'Summer Temperature (C deg)', false);
Map.addLayer(uhi,vis_uhi,'Average Urban Heat Island (UHI) intensity (deg C)', false)
//////////////////////////////
// load data from Suitability Analysis and Statewide Suitability
/////////////////////////////
//Map.addLayer(urban_30m_suitability.clip(cities), {min:100, max: 500, palette: ["white","yellow","brown", "green", "blue"]}, "CA Urban Reforestation Potential (30m)", false)
//Map.addLayer(urban_30m_suitability.clip(cities), {min:100, max: 500, palette: ["ffffff","ffff00","8ce070","008000"] }, "CA Urban Reforestation Potential (30m)", false)
//Map.addLayer(prime_blocks, vis_suit, 'Prime Reforestation Blocks')
//Map.addLayer(diff_can,can_diff, 'Diff in Canopy from High Income Quartile', false);
//Map.addLayer(diff_temp, viz_diff, 'Diff in Summer Temperature (C deg)', false);
Map.addLayer(diff_uhi, viz_diff, 'Diff in UHI intensity in Low Income from High Income (C deg)', false);
//Map.addLayer(pot_acres, potPalette, 'Available Acres for Reforestation', false);
Map.addLayer(pot_acres, vis_potacre, 'Available Acres for Reforestation', false);
Map.addLayer(tree_needed_masked, {min: 2, max: 10.8, palette:["b0e44b","fff03b","ffa500","ff2812","5e1a0a"]}, 'Canopy Acres (needed)', true)
//Map.addLayer(suit,vis_suit,'Suitability Score (0-1)', false)
Map.addLayer(masked_suit_rc,{min:1,max:3, opacity:0.73, palette:["d1fff8 ","85e9d9","00bda0","005b4d"]},'Prime Urban Reforestation Blocks', false)
//Map.addLayer(suit_rc,{},'Blocks Classified', true)
//////////////// generic overlays ///////////////
Map.addLayer(sa_outline,{palette: '0000FF'}, 'City Boundary', true)
Map.addLayer(acs_outline,{opacity:0.15}, 'ACS block group', true)
Map.addLayer(LowIncomeOutline, {opacity:0.75, palette: ['686868']}, 'AB 1550 Low-Income Communities', false);
Map.addLayer(DisadvCommOutline, {opacity:0.75, palette: ['654321']}, 'SB 535 Disadvantaged Communities', false)
//////////////////////////////
// adding legends
/////////////////////////////
//////////////////////////////////////////////////////////
// Legend - Tree Canopy and Income
//////////////////////////////////////////////////////////
var Simple_Legend = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
  style: {
    position: 'bottom-left',
    padding: '8px 10px'
  }
});
Simple_Legend.style().set('width', '500px')
//Map.add(Simple_Legend)
ui.root.add(Simple_Legend);
///////// Map legend
var MapLegendTitle = ui.Label({
  value: 'Closing Urban Tree Cover Inequity (CUTI):',
  style: {
    fontWeight: 'bold',
    fontSize: '24px',
    margin: '10px 0 4px 0',
    padding: '0'
    }
});
var MapLegendSubTitle = ui.Label({
  //value: 'Inequality in Urban Tree Cover by Income',
  value: 'Closing the gap in tree cover while reducing urban heat island impact',
  style: {
    fontWeight: 'bold',
    fontSize: '14px',
    margin: '10px 0 4px 0',
    padding: '0'
    }
});
/////////////// add description 
var MapDescription = ui.Label({
  //value: 'The TreeGap Closing tool (The Nature Conservancy 2020), proposes an approach to strategically plan new urban tree planting projects at a census block that can reduce Urban Heat Island (UHI) impacts while sequestring carbon and benefiting low-income and disadvantageous communities across three pilot urban areas (Greater Los Angeles, the Inland Empire of San Bernardino and Riverside Counties, and the Sacramento area) in California. Use the "Layers" button in the left to flip through different layers. For additional information see the description below.',
  value: 'CUTI : a beta tree gap closing tool (The Nature Conservancy 2020) proposes an approach to strategically plant new trees within three urban areas in California: Greater Los Angeles, the Inland Empire of San Bernardino and Riverside Counties, and the Sacramento area. Planting trees can reduce Urban Heat Island (UHI) impacts while sequestering carbon and benefitting low-income and disadvantaged communities. Use the "Layers" button in the top left to flip through different layers.',
  style: {
    fontWeight: 'regular',
    fontSize: '16px',
    margin: '10px 0 4px 0',
    padding: '0'
    }
});
var MapDescription2 = ui.Label({
  //value: 'Description : The tool provides an overview of the disparity in urban tree cover, summer temperature and Urban Heat Island (UHI) by income at census block level. It identifies the prime suitable blocks for new urban tree planting  to close the gaps between high and low income communities by increasing tree cover, and thereby reducing summer temperature and UHI. The prime suitable blocks show total canopy acres needed to close the gap in tree canopy cover between high and low income communities while optimizing for population density, income group, and available area for new tree planting. In addition to reducing summer temperatures and greenhouse gas (GHG) emissions, urban tree planting can provide multiple additional benefits for people and nature (McDonald et al., 2019, Wang and Akbar 2016, Ziter et al., 2019).',
  value: 'The tool provides an overview of the disparity in urban tree cover, summer temperature, and Urban Heat Island (UHI) by income at the census block level. It identifies the most suitable census blocks for new urban trees, which can help close the tree cover gap between high-income and low-income communities, thereby reducing summer temperature and UHI. In addition, urban tree planning can reduce greenhouse gas emissions and provide multiple additional benefits for people and nature (McDonald et al., 2019, Wang and Akbar 2016, Ziter et al., 2019). The prime suitable blocks show total canopy acres needed to close the gap in tree cover between high- and low-income communities, while optimizing for population density, income group, and available area for tree planting.',
  style: {
    fontWeight: 'regular',
    fontSize: '14px',
    margin: '10px 0 4px 0',
    padding: '0'
    }
});
var Authors = ui.Label({
  value: 'Tanushree Biswas1, Tirthankar Chakraborty2 and Charlotte Stanley1; 1The Nature Conservancy California, 2Yale School of the Environment, New Haven, CT, USA. Please contact tanushree.biswas@tnc.org if you have any questions.',
  style: {
    fontWeight: 'regular',
    fontSize: '12px',
    margin: '10px 0 4px 0',
    padding: '0'
    }
});
var citation = ui.Label({
  value:'Citation: Chamberlin, S., Passero M., Saydah A. C., Biswas T., Stanley C.k., Nature-Based Climate Solutions: A Roadmap to Accelerate Action in California. The Nature Conservancy (2020), 113 pp',
  style:{fontSize:'12px',
  margin: '10px 0 4px 0',
  padding: '0'
  }
});
var EmptySpace = ui.Label({
  value: '  ',
  style: {
    fontWeight: 'regular',
    fontSize: '18px',
    margin: '10px 0 4px 0',
    padding: '0'
    }
});
///////////////// add TNC logo
var logo = ee.Image('users/charlotteks/TNC_Logo').visualize({
    bands:  ['b1', 'b2', 'b3'],
    min: 0,
    max: 255
    });
var thumb = ui.Thumbnail({
    image: logo,
    params: {
        dimensions: '1329x384', //'642x291',
        format: 'png'
        },
    style: {height: '38px', width: '132px',padding :'0'}
    });
var Logo = ui.Panel(thumb, 'flow', {width: '300px'});
///////// incomne legend
var IncomeLegendTitle = ui.Label({
  value: 'Average Household Income Quartile',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '10px 0 4px 0',
    padding: '0'
    }
});
function IncomeColorBar(IncomePalette) {
  return ui.Thumbnail({
    image: ee.Image.pixelLonLat().select(0),
    params: {
      bbox: [0, 0, 1, 0.1],
      dimensions: '200x10',
      format: 'png',
      min: 0,
      max: 1,
      palette: IncomePalette,
    },
    style: {stretch: 'horizontal', margin: '0px 8px'},
  });
}
function IncomeLegend(low, high, IncomePalette) {
  var IncomeLabelPanel = ui.Panel(
      [
        ui.Label(low, {margin: '4px 8px'}),
        ui.Label(high, {margin: '4px 8px', textAlign: 'right', stretch: 'horizontal'})
      ],
      ui.Panel.Layout.flow('horizontal'));
  return ui.Panel([IncomeColorBar(IncomePalette), IncomeLabelPanel]);
}
var IncomePanel = IncomeLegend("Low (<$25,000)", "High (>$55,000)", ["f2e4f3","d6b6d5","a178a5","744b89"]);
////////////////////////////
var CanopyLegendTitle = ui.Label({
  value: 'Canopy',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '10px 0 4px 0',
    padding: '0'
    }
});
function CanopyColorBar(CanopyPalette) {
  return ui.Thumbnail({
    image: ee.Image.pixelLonLat().select(0),
    params: {
      bbox: [0, 0, 1, 0.1],
      dimensions: '200x10',
      format: 'png',
      min: 0,
      max: 1,
      palette: CanopyPalette,
    },
    style: {stretch: 'horizontal', margin: '0px 8px'},
  });
}
function CanopyLegend(low, high, CanopyPalette) {
  var CanopyLabelPanel = ui.Panel(
      [
        ui.Label(low, {margin: '4px 8px'}),
        //ui.Label(mid, {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
        ui.Label(high, {margin: '4px 8px', textAlign: 'right', stretch: 'horizontal'})
      ],
      ui.Panel.Layout.flow('horizontal'));
  return ui.Panel([CanopyColorBar(CanopyPalette),CanopyLabelPanel]);
}
var CanopyPanel = CanopyLegend("Low","High", ["f3f5d0","87d45f","367d42"]);
//////////////////////
//// TreeGa legend
/////////////////////////
var TreeGapLegendTitle = ui.Label({
  value: 'Tree Gap',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '10px 0 4px 0',
    padding: '0'
    }
});
function TreeGapColorBar(TreeGapPalette) {
  return ui.Thumbnail({
    image: ee.Image.pixelLonLat().select(0),
    params: {
      bbox: [0, 0, 1, 0.1],
      dimensions: '200x10',
      format: 'png',
      min: 0,
      max: 1,
      palette: TreeGapPalette,
    },
    style: {stretch: 'horizontal', margin: '0px 8px'},
  });
}
function TreeGapLegend(low, high, TreeGapPalette) {
  var TreeGapLabelPanel = ui.Panel(
      [
        ui.Label(low, {margin: '4px 8px'}),
        //ui.Label(mid, {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
        ui.Label(high, {margin: '4px 8px', textAlign: 'right', stretch: 'horizontal'})
      ],
      ui.Panel.Layout.flow('horizontal'));
  return ui.Panel([TreeGapColorBar(TreeGapPalette), TreeGapLabelPanel]);
}
var TreeGapPanel = TreeGapLegend("Low","High", ["084081","41B6C4","FFFFE5","D9F0A3","78C679","238443","004529"]);
////Temp legend 
var TempLegendTitle = ui.Label({
  value: 'Temp',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '10px 0 4px 0',
    padding: '0'
    }
});
function TempColorBar(TempPalette) {
  return ui.Thumbnail({
    image: ee.Image.pixelLonLat().select(0),
    params: {
      bbox: [0, 0, 1, 0.1],
      dimensions: '200x10',
      format: 'png',
      min: 0,
      max: 1,
      palette: TempPalette,
    },
    style: {stretch: 'horizontal', margin: '0px 8px'},
  });
}
function TempLegend(low, high, TempPalette) {
  var TempLabelPanel = ui.Panel(
      [
        ui.Label(low, {margin: '4px 8px'}),
        //ui.Label(mid, {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
        ui.Label(high, {margin: '4px 8px', textAlign: 'right', stretch: 'horizontal'})
      ],
      ui.Panel.Layout.flow('horizontal'));
  return ui.Panel([TempColorBar(TempPalette), TempLabelPanel]);
}
var TempPanel = TempLegend("Low","High", ["4425e9","ffffe5","d83611"]);
/////////////////////
//Suitability legend 
/////////////////////
var SuitLegendTitle = ui.Label({
  value: 'Suitability Score (0-1) :',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '10px 0 4px 0',
    padding: '0'
    },
});
var ScoreDescription = ui.Label({
  value: 'A block level analysis of suitabilty (Low, Medium, High, Very High) for urban tree planting based on Difference in UHI from high income quartile, Available Area for Urban Reforestation, Canopy Acres(needed), and Population Density',
  style: {
    fontWeight: 'regular',
    fontSize: '15px',
    margin: '10px 0 4px 0',
    padding: '0'
    }
});
function SuitColorBar(SuitPalette) {
  return ui.Thumbnail({
    image: ee.Image.pixelLonLat().select(0),
    params: {
      bbox: [0, 0, 1, 0.1],
      dimensions: '200x10',
      format: 'png',
      min: 0,
      max: 1,
      palette: SuitPalette,
    },
    style: {stretch: 'horizontal', margin: '0px 8px'},
  });
}
function SuitLegend(low, high, SuitPalette) {
  var SuitLabelPanel = ui.Panel(
      [
        ui.Label(low, {margin: '4px 8px'}),
        //ui.Label(mid, {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
        ui.Label(high, {margin: '4px 8px', textAlign: 'right', stretch: 'horizontal'})
      ],
      ui.Panel.Layout.flow('horizontal'));
  return ui.Panel([SuitColorBar(SuitPalette), SuitLabelPanel]);
}
var SuitPanel = SuitLegend("Low","High", ["c9c5e0","d4adca","6e5c7e"]);
//////////////////////////
//Urban heat Island Legend
/////////////////////////
var UHILegendTitle = ui.Label({
  value: 'Average Urban Heat Island (UHI) intensity (2015 - 2019) within census blocks (deg C)',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '10px 0 4px 0',
    padding: '0'
    }
});
function UHIColorBar(UHIPalette) {
  return ui.Thumbnail({
    image: ee.Image.pixelLonLat().select(0),
    params: {
      bbox: [0, 0, 1, 0.1],
      dimensions: '200x10',
      format: 'png',
      min: 0,
      max: 1,
      palette: UHIPalette,
    },
    style: {stretch: 'horizontal', margin: '0px 8px'},
  });
}
function UHILegend(low, high, UHIPalette) {
  var UHILabelPanel = ui.Panel(
      [
        ui.Label(low, {margin: '4px 8px'}),
        //ui.Label(mid, {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
        ui.Label(high, {margin: '4px 8px', textAlign: 'right', stretch: 'horizontal'})
      ],
      ui.Panel.Layout.flow('horizontal'));
  return ui.Panel([UHIColorBar(UHIPalette), UHILabelPanel]);
}
var UHIPanel = UHILegend("Low:<2","High >9", ['a7ceff','ffd28f','ff420a','c40000']);
////////////////////
// CanopyAcres(need)
///////////////////
var AcresNeededLegendTitle = ui.Label({
  value: 'Canopy Acres (needed)',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '10px 0 4px 0',
    padding: '0'
    }
});
function AcresNeededColorBar(AcresNeededPalette) {
  return ui.Thumbnail({
    image: ee.Image.pixelLonLat().select(0),
    params: {
      bbox: [0, 0, 1, 0.1],
      dimensions: '200x10',
      format: 'png',
      min: 0,
      max: 1,
      palette: AcresNeededPalette,
    },
    style: {stretch: 'horizontal', margin: '0px 8px'},
  });
}
function AcresNeededLegend(low, high, AcresNeededPalette) {
  var AcresNeededLabelPanel = ui.Panel(
      [
        ui.Label(low, {margin: '4px 8px'}),
        //ui.Label(mid, {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
        ui.Label(high, {margin: '4px 8px', textAlign: 'right', stretch: 'horizontal'})
      ],
      ui.Panel.Layout.flow('horizontal'));
  return ui.Panel([AcresNeededColorBar(AcresNeededPalette), AcresNeededLabelPanel]);
}
var AcresNeededPanel = AcresNeededLegend("2.5",">10.5", ["b0e44b","fff03b","ffa500","ff2812","5e1a0a"]);
///////////////////
//PopGroup legend
///////////////////
var PopLegendTitle = ui.Label({
  value: 'Household Income (Quartile)',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '10px 0 4px 0',
    padding: '0'
    }
});
function PopColorBar(PopPalette) {
  return ui.Thumbnail({
    image: ee.Image.pixelLonLat().select(0),
    params: {
      bbox: [0, 0, 1, 0.1],
      dimensions: '200x10',
      format: 'png',
      min: 0,
      max: 1,
      palette: PopPalette,
    },
    style: {stretch: 'horizontal', margin: '0px 8px'},
  });
}
function PopLegend(low, high, PopPalette) {
  var PopLabelPanel = ui.Panel(
      [
        ui.Label(low, {margin: '4px 8px'}),
        ui.Label(high, {margin: '4px 8px', textAlign: 'right', stretch: 'horizontal'})
      ],
      ui.Panel.Layout.flow('horizontal'));
  return ui.Panel([PopColorBar(PopPalette), PopLabelPanel]);
}
var PopPanel = PopLegend("Low", "High", ["e2d5d3","fbdbaa","c69c71","724c41"]);
////TempDiff legend 
var DiffLegendTitle = ui.Label({
  value: 'Difference in UHI intensity (deg C) in Low Income from High Income',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '10px 0 4px 0',
    padding: '0'
    }
});
function DiffColorBar(DiffPalette) {
  return ui.Thumbnail({
    image: ee.Image.pixelLonLat().select(0),
    params: {
      bbox: [0, 0, 1, 0.1],
      dimensions: '200x10',
      format: 'png',
      min: 0,
      max: 1,
      palette: DiffPalette,
    },
    style: {stretch: 'horizontal', margin: '0px 8px'},
  });
}
function DiffLegend(low, high, DiffPalette) {
  var DiffLabelPanel = ui.Panel(
      [
        ui.Label(low, {margin: '4px 8px'}),
        //ui.Label(mid, {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
        ui.Label(high, {margin: '4px 8px', textAlign: 'right', stretch: 'horizontal'})
      ],
      ui.Panel.Layout.flow('horizontal'));
  return ui.Panel([DiffColorBar(DiffPalette), DiffLabelPanel]);
}
var DiffPanel = DiffLegend("Low","High", ["f3f0ef","ffcbb6","d81704"]);
// class suitability legend (image)
var suitabilityLegendTitle = ui.Label({
  value: 'Suitability for Urban Reforestation',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '10px 0 4px 0',
    padding: '0'
    }
});
var suitLegendImage = ee.Image('users/charlotteks/Color_Teal').visualize({
    bands:  ['b1', 'b2', 'b3'],
    min: 0,
    max: 255
    });
var thumb2 = ui.Thumbnail({
    image: suitLegendImage,
    params: {
        dimensions: '1441x150', //'642x291',
        format: 'png'
        },
    style: {height: '50px', width: '450px',padding :'0'}
    });
var suitLegendImagePanel = ui.Panel(thumb2, 'flow', {width: '460px'});
////////////////////////////////////
Simple_Legend.add(MapLegendTitle);
Simple_Legend.add(MapLegendSubTitle);
Simple_Legend.add(Logo);
Simple_Legend.add(MapDescription);
Simple_Legend.add(Authors);
Simple_Legend.add(citation);
Simple_Legend.add(suitabilityLegendTitle);
Simple_Legend.add(ScoreDescription)
Simple_Legend.add(suitLegendImagePanel)
//Simple_Legend.add(SuitLegendTitle); 
//Simple_Legend.add(SuitPanel);
Simple_Legend.add(AcresNeededLegendTitle); 
Simple_Legend.add(AcresNeededPanel);
Simple_Legend.add(DiffLegendTitle); 
Simple_Legend.add(DiffPanel);
Simple_Legend.add(UHILegendTitle); 
Simple_Legend.add(UHIPanel);
//Simple_Legend.add(TreeGapLegendTitle); 
//Simple_Legend.add(TreeGapPanel);
//Simple_Legend.add(CanopyLegendTitle); 
//Simple_Legend.add(CanopyPanel);
//Simple_Legend.add(PopLegendTitle); 
//Simple_Legend.add(PopPanel);
Simple_Legend.add(IncomeLegendTitle); 
Simple_Legend.add(IncomePanel);
Simple_Legend.add(EmptySpace);
Simple_Legend.add(MapDescription2);
////////////////////////////////////
// ADD a split panel 
///////////////////////////////////