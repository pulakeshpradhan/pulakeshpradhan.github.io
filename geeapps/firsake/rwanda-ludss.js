var landslide = ee.FeatureCollection("projects/servir-e-sa/rwanda_ludss/MidiMar/Landslide_midimar"),
    lcc_10_15 = ee.Image("projects/servir-e-sa/rwanda_ludss/RCMRD/SchemeIChangeMap_y10y15"),
    landdegrade_2016 = ee.Image("projects/servir-e-sa/rwanda_ludss/RCMRD/land_degr_2016_rwanda"),
    lulc_2015 = ee.Image("projects/servir-e-sa/rwanda_ludss/RCMRD/RWA_LC_2015"),
    woodycover_alos_2007 = ee.Image("projects/servir-e-sa/rwanda_ludss/RCMRD/WoodyCover_2007_Rwanda"),
    woodycover_alos_2017 = ee.Image("projects/servir-e-sa/rwanda_ludss/RCMRD/WoodyCover_2017_Rwanda"),
    changeType_2007_2017 = ee.Image("projects/servir-e-sa/rwanda_ludss/RCMRD/ChangeType_2007_2017_Rwanda"),
    RWA_IDP_45 = ee.FeatureCollection("projects/servir-e-sa/rwanda_ludss/RHA/new_upgraded_45_IDPs_RWA_RHA"),
    RWA_aquatic_zones = ee.FeatureCollection("projects/servir-e-sa/rwanda_ludss/RLMUA/Aquatic_landA_50K"),
    RWA_aviation_zones = ee.FeatureCollection("projects/servir-e-sa/rwanda_ludss/RLMUA/AviationA_50K"),
    RWA_coffee_wash_stns = ee.FeatureCollection("projects/servir-e-sa/rwanda_ludss/RLMUA/Coffee_Washing_Stations"),
    RWA_DO_locs = ee.FeatureCollection("projects/servir-e-sa/rwanda_ludss/RLMUA/District_Office_Areas"),
    RWA_drainage = ee.FeatureCollection("projects/servir-e-sa/rwanda_ludss/RLMUA/Drainage_50K"),
    RWA_harbour = ee.FeatureCollection("projects/servir-e-sa/rwanda_ludss/RLMUA/HarbourP_50K"),
    RWA_health = ee.FeatureCollection("projects/servir-e-sa/rwanda_ludss/RLMUA/Health_facilitiesP_50K"),
    RWA_place_names = ee.FeatureCollection("projects/servir-e-sa/rwanda_ludss/RLMUA/Place_namesP_50K"),
    RWA_powerlines = ee.FeatureCollection("projects/servir-e-sa/rwanda_ludss/RLMUA/PowerlineL_50K"),
    RWA_roads = ee.FeatureCollection("projects/servir-e-sa/rwanda_ludss/RLMUA/Road_networkL_50K"),
    RWA_runways = ee.FeatureCollection("projects/servir-e-sa/rwanda_ludss/RLMUA/RunwaysA_50K"),
    RWA_schools = ee.FeatureCollection("projects/servir-e-sa/rwanda_ludss/RLMUA/SchoolsP_50K"),
    RWA_tea_factories = ee.FeatureCollection("projects/servir-e-sa/rwanda_ludss/RLMUA/Tea_Factories"),
    RWA_trade_centers = ee.FeatureCollection("projects/servir-e-sa/rwanda_ludss/RLMUA/RWA_trade_centres_WGS84"),
    srtm_30 = ee.Image("USGS/SRTMGL1_003"),
    country = ee.FeatureCollection("projects/servir-e-sa/rwanda_ludss/RWA_country"),
    provinces = ee.FeatureCollection("projects/servir-e-sa/rwanda_ludss/RWA_province"),
    districts = ee.FeatureCollection("projects/servir-e-sa/rwanda_ludss/RWA_district"),
    sectors = ee.FeatureCollection("projects/servir-e-sa/rwanda_ludss/RWA_sectors"),
    cells = ee.FeatureCollection("projects/servir-e-sa/rwanda_ludss/RWA_cells"),
    villages = ee.FeatureCollection("projects/servir-e-sa/rwanda_ludss/RWA_villages"),
    RWA_forest_protected = ee.FeatureCollection("projects/servir-e-sa/rwanda_ludss/RFWA/Rwanda_Forests_ITRF2005"),
    RWA_Airports = ee.FeatureCollection("projects/servir-e-sa/rwanda_ludss/RLMUA/Rwanda_Airports"),
    RWA_Borderposts = ee.FeatureCollection("projects/servir-e-sa/rwanda_ludss/RLMUA/Rwanda_BorderPost"),
    RWA_Industries = ee.FeatureCollection("projects/servir-e-sa/rwanda_ludss/RLMUA/Rwanda_Industries"),
    RWA_SecondarySch = ee.FeatureCollection("projects/servir-e-sa/rwanda_ludss/RLMUA/Rwanda_SecondarySch"),
    RWA_TetiarySch = ee.FeatureCollection("projects/servir-e-sa/rwanda_ludss/RLMUA/Rwanda_TertiarySch"),
    RWA_TourismSpots = ee.FeatureCollection("projects/servir-e-sa/rwanda_ludss/RLMUA/Rwanda_TourismSpots"),
    RWA_PrimarySch = ee.FeatureCollection("projects/servir-e-sa/rwanda_ludss/RLMUA/Rwanda_PrimarySch");
/*/////////////////////////////////////////////////////////////////////////////
SERVIR-EASTERN & SOUTHERN AFRICA 2017-2019
SCRIPT: LUDSS_UI.js
CONTACT INFORMATION: Phoebe Oduor, Steve Firsake, Anastasia Wahome, Lilian Ndung'u
Date: 2019
LINK TO REPORT(S):
DESCRIPTION:
This script accomplishes several tasks:
 1) Loads Rwanda region with ability to display different administrative zones
 2) Loads thematic data (LULC Change, Land degradation, Landslides Susceptibility & Woody Biomass change) that is used in calculation of various vulnerabilities for
    decision making.
 3) Enables overlay of ancilliary information. 
 4) Enables thresholding to view extremeties.
*//////////////////////////////////////////////////////////////////////////////
//center Map on country
Map.centerObject(country);
//variable definition
var province_names;
var district_names;
var sector_names;
var cell_names;
var village_names;
//getting administrative sub-units
var attrib_province = 'Province'; //N,AME_1
var attrib_districts = 'District'; //N,AME_2
var attrib_sectors = 'Sector'; //N,AME_3
var attrib_cells = 'Cellule_1'; //N,AME_4
var attrib_villages = 'Village'; //N,AME_5
provinces.sort(attrib_province).aggregate_array(attrib_province).evaluate(function(result) { province_names = result });
districts.sort(attrib_districts).aggregate_array(attrib_districts).evaluate(function(result) { district_names = result });
sectors.sort(attrib_sectors).aggregate_array(attrib_sectors).evaluate(function(result) { sector_names = result });
cells.sort(attrib_cells).aggregate_array(attrib_cells).evaluate(function(result) { cell_names = result });
villages.sort(attrib_villages).aggregate_array(attrib_villages).evaluate(function(result) { village_names = result });
//variable definition
//Layers definition names - can add a new layer
var rw_landslide = 'Landslide Susceptability';
var rw_landdegradation = 'Land Degradation (2016)';
var rw_landlcc = 'Landcover Change (2010-2015)';
var rw_landlulc = 'Land Use & Land Cover (2015)';
var rw_vulnerability = 'Land Vulnerability';
var rw_changetype_2007_2017 = 'ALOS WoodyCover Changes (2007-2017)';
var rw_woodycover_2007 = 'ALOS WoodyCover 2007';
var rw_woodycover_2017 = 'ALOS WoodyCover 2017';
var rw_srtm = 'Digital Elevation Model (2000)';
var rw_hillshade = 'Hillshade (2000)';
//Make sure to add new layer variable here
var rw_theme_layers = [rw_vulnerability, rw_landslide, rw_landdegradation, rw_landlcc, rw_landlulc, rw_changetype_2007_2017, rw_woodycover_2007, rw_woodycover_2017, rw_srtm, rw_hillshade];
var rw_theme_layers_placeholder = 'Select Theme';
var rw_regions = ["Province", "District","Sector","Cell","Village"];
var rw_regions_placeholder = 'Select Boundary';
var rw_subregions_placeholder = 'Select Region';
//text for labels
var scale = Map.getScale();
var text = require('users/gena/packages:text');
var text_props = { fontType: 'Arial', alignX: 'center', alignY: 'center', fontSize: 32, textColor: '000000', outlineColor: 'ffffff', outlineWidth: 2.5, outlineOpacity: 0.8};
//Thematic Data//////////////////////////////////////////////////////////////////////////////////////////
//all derivable data are normalised.
//landslide - used for vulnerability
var landslide_image_raw = ee.Image().byte().paint(landslide, 'gridcode');
var landslide_visualisation = {min:0, max:100, palette:["006100","7aab00","FFFF00","FF9900","FF2200"]};
var ls_stat = landslide_image_raw.reduceRegion({
                                                reducer: ee.Reducer.minMax(),
                                                geometry: country,
                                                scale: 30,
                                                crs: "EPSG:4326",
                                                maxPixels: 1e13,
                                                bestEffort: true/*,
                                                tileScale: 16*/
                                                });
var ls_min = ee.Number(ls_stat.get('constant_min'));
var ls_max = ee.Number(ls_stat.get('constant_max'));
var ls_calc_fin = ((landslide_image_raw.subtract(ls_min)).divide(ls_max.subtract(ls_min))).multiply(ee.Number(100));
var landslide_image = ls_calc_fin;
//Forests & Forest Changes
var woodycover_visualisation = {min: 0, max: 1, palette: ["FFFFFFFF","006100"]};
var alos_woodycover_2007_image = woodycover_alos_2007.clip(country);
var alos_woodycover_2017_image = woodycover_alos_2017.clip(country);
//woody cover change (deforested zones only)- used for vulnerability
var woodycover_change_visualisation = {min: 0, max: 6, palette: ["FF0000","FFA500","FFFF00","008000","0000FF","4B0082","EE82EE"]};
var alos_woodycover_change_image = changeType_2007_2017.clip(country);
var alos_woodycover_change_image_deforested = alos_woodycover_change_image.where(alos_woodycover_change_image.eq(1), ee.Image(ee.Number(100)));
var alos_woodycover_change_image_deforested_normal = alos_woodycover_change_image_deforested.where(alos_woodycover_change_image_deforested.lt(100), ee.Image(ee.Number(0)));
//landcover change
var lcc_visualisation = {min: 0, max: 100, palette: ["006100","7aab00","FFFF00","FF9900","FF2200"]};
var lcc_image_raw = lcc_10_15.clip(country);
var lcc_stat = lcc_image_raw.reduceRegion({   
                                              reducer: ee.Reducer.minMax(),
                                              geometry: country,
                                              scale: 30,
                                              crs: "EPSG:4326",
                                              maxPixels: 1e13,
                                              bestEffort: true,
                                              tileScale: 4
                                            });
var lcc_min = ee.Number(lcc_stat.get('b1_min'));
var lcc_max = ee.Number(lcc_stat.get('b1_max'));
var lcc_calc_fin = (((lcc_image_raw.multiply(ee.Number(-1))).add(lcc_max)).divide(lcc_max.subtract(lcc_min))).multiply(ee.Number(100));
var lcc_image_masked_fifty_to_zero = lcc_calc_fin.where(lcc_calc_fin.eq(50), ee.Image(ee.Number(0)));
var lcc_image = lcc_calc_fin.updateMask(lcc_calc_fin.neq(50)).toInt();//50 represents stable so mask out
//land degradation
var land_degradation_visualisation = {min: 0, max: 100, palette: ["006100","7aab00","FFFF00","FF9900","FF2200"]};
var ld_stat = landdegrade_2016.reduceRegion({   
                                              reducer: ee.Reducer.minMax(),
                                              geometry: country,
                                              scale: 30,
                                              crs: "EPSG:4326",
                                              maxPixels: 1e13,
                                              bestEffort: true,
                                              tileScale: 4
                                            });
var ld_min = ee.Number(ld_stat.get('b1_min'));
var ld_max = ee.Number(ld_stat.get('b1_max'));
var ld_calc_fin = ((landdegrade_2016.subtract(ld_min)).divide(ld_max.subtract(ld_min))).multiply(ee.Number(100));
var landdegrade_image = ld_calc_fin;
//vulnerability
var vulnerability = (landdegrade_image.add(lcc_image_masked_fifty_to_zero).add(landslide_image).add(alos_woodycover_change_image_deforested_normal)).divide(ee.Number(4)).toInt();
var land_vulnerability_visualisation = {min: 0, max: 100, palette: ["006100","FFFF00","FF2200"]};
var lulc_visualisation = {min:1, max:14, palette:["003C00", "009600", "00EB00", "C8FF96", "CDCD00", "FFFF00", "CD8200", "FF8200", "FF82FF", "FFC8C8", "00EEEE", "0000FF", "939393", "000000"]};
var lulc_image = lulc_2015.clip(country);
var srtm_visualisation = {min: 900, max: 4600, palette:['006600', '002200', 'fff700', 'ab7634', 'c4d0ff', 'ffffff']};
var srtm_image = srtm_30.clip(country);
//mask out zones not needed in analysis
//var srtm_mask_high_low = srtm_image.where(srtm_image.gte(1800), ee.Image(ee.Number(1))).and(srtm_image.where(srtm_image.lt(1800), ee.Image(ee.Number(0))));
//Map.addLayer(srtm_mask_high_low,{palette:['000000','FFFFFF']},'highlow');
//var vulnerability_mask_dem_forest = srtm_mask_high_low.where(srtm_mask_high_low.eq(1), vulnerability);
//Map.addLayer(vulnerability_mask_dem_forest,land_vulnerability_visualisation,'non-forest');
var shade = ee.Terrain.hillshade(srtm_image); //terrain algorithms to compute a hillshade with 8-bit values
var visParams = {min: 900, max: 4550, palette: ['006600', '002200', 'fff700', 'ab7634', 'c4d0ff', 'ffffff']};// visualization parameters
var visualized  = srtm_image.visualize(visParams); //custom elevation palette from hex strings
var hsv = visualized.divide(255).rgbToHsv(); //visualized elevation to HSV
var hs = hsv.select(0, 1); //only the hue and saturation bands.
var v = shade.divide(255); //hillshade to [0, 1] data as HSV algorithm
var hillshade_image = hs.addBands(v).hsvToRgb().multiply(255).byte(); //RGB from HSV - cast to byte  for export
  //layer holder parameters
  //Change to add new layer as above
var vulnerabilityLayer    = ui.Map.Layer(vulnerability, land_vulnerability_visualisation, rw_theme_layers[0]);
var landslideLayer        = ui.Map.Layer(landslide_image,landslide_visualisation,rw_theme_layers[1]);
var landdegradeLayer      = ui.Map.Layer(landdegrade_image, land_degradation_visualisation, rw_theme_layers[2]);
var lccLayer              = ui.Map.Layer(lcc_image, lcc_visualisation, rw_theme_layers[3]);
var lulcLayer             = ui.Map.Layer(lulc_image, lulc_visualisation, rw_theme_layers[4]);
var woodycoverChangeLayer = ui.Map.Layer(alos_woodycover_change_image, woodycover_change_visualisation, rw_theme_layers[5]);
var woodycover2007Layer   = ui.Map.Layer(alos_woodycover_2007_image, woodycover_visualisation, rw_theme_layers[6]);
var woodycover2017Layer   = ui.Map.Layer(alos_woodycover_2017_image, woodycover_visualisation, rw_theme_layers[7]);
var srtmLayer             = ui.Map.Layer(srtm_image, srtm_visualisation, rw_theme_layers[8]);
var hillshadeLayer        = ui.Map.Layer(hillshade_image, {}, rw_theme_layers[9]);
  //masked items
  // Add for new layer
var masked_suffix = "_masked";
var masked_vulnerabilityLayer;
var masked_landslideLayer;
var masked_landdegradeLayer;
var masked_lccLayer;
var masked_srtmLayer;
var garbage_collector = [];
var garbage_collector_miniLayers = [];
  //overlay holder parameters
      /*var layers = Map.layers()
      var layer = layers.get(index)
      layers.remove(layer)*/
//Examination part
//RWA_PrimarySch
//RWA_SecondarySch
//RWA_TertiarySch
//overlay holder parameters
//add new overlay
var RWA_airports_layer = ui.Map.Layer(RWA_Airports, {color:'c13268'}, "Airports");
var RWA_aquatic_zones_layer = ui.Map.Layer(RWA_aquatic_zones, {color:'73c2d0'}, "Aquatic Zones");
var RWA_aviation_zones_layer = ui.Map.Layer(RWA_aviation_zones, {color:'7b1346'}, "Aviation Zones");
var RWA_borderposts_layer = ui.Map.Layer(RWA_Borderposts, {color:'ff3300'}, "Border Posts");
var RWA_coffee_wash_stns_layer = ui.Map.Layer(RWA_coffee_wash_stns, {color:'2eae5b'}, "Coffee Washing Stations");
var RWA_DO_locs_layer = ui.Map.Layer(RWA_DO_locs, {color:'ffa02a'}, "District Offices");
var RWA_drainage_layer = ui.Map.Layer(RWA_drainage, {color:'0000FF'}, "Drainage");
var RWA_harbour_layer = ui.Map.Layer(RWA_harbour, {color:'eb5252'}, "Harbour");
var RWA_health_layer = ui.Map.Layer(RWA_health, {color:'36365b'}, "Health");
var RWA_IDP_45_layer = ui.Map.Layer(RWA_IDP_45, {color:'984e49'}, "IDP Locations");
var RWA_industries_layer = ui.Map.Layer(RWA_Industries, {color:'585857'}, "Industries");
var RWA_place_names_layer = ui.Map.Layer(RWA_place_names, {color:'181e44'}, "Place Names");
var RWA_powerlines_layer = ui.Map.Layer(RWA_powerlines, {color:'382b2b'}, "Powerlines");
var RWA_forest_protected_layer = ui.Map.Layer(RWA_forest_protected, {color:'006600'}, "Forests");
var RWA_roads_layer = ui.Map.Layer(RWA_roads, {color:'f9e843'}, "Roads");
var RWA_runways_layer = ui.Map.Layer(RWA_runways, {color:'f21f0c'}, "Runways");
var RWA_schools_layer = ui.Map.Layer(RWA_schools, {color:'660000'}, "Schools");
var RWA_tea_factories_layer = ui.Map.Layer(RWA_tea_factories, {color:'9e217c'}, "Tea Factories");
var RWA_tourismspots_layer = ui.Map.Layer(RWA_TourismSpots, {color:'591d44'}, "Tourism Spots");
var RWA_trade_centers_layer = ui.Map.Layer(RWA_trade_centers, {color:'efe554'}, "Trade Centers");
/////////////////////////////////////////////////////////////////////////////////////////////////////////
//Boundary Data//////////////////////////////////////////////////////////////////////////////////////////
var lyr_y = ee.Image().paint(country, 0, 3.5);
var lyr_p = ee.Image().paint(provinces, 0, 3.0);
var lyr_d = ee.Image().paint(districts, 0, 2.5);
var lyr_s = ee.Image().paint(sectors, 0, 2.0);
var lyr_c = ee.Image().paint(cells, 0, 1.5);
var lyr_v = ee.Image().paint(villages, 0, 0.5);
var boundary_palette = ['007777', '006666', '005555', '004444', '003333', '002222'];
  //layer holder
var countryLayer = ui.Map.Layer(lyr_y, {palette:[boundary_palette[0]]}, 'Country');
var provinceLayer = ui.Map.Layer(lyr_p, {palette:[boundary_palette[1]]}, 'Provinces');
var districtLayer = ui.Map.Layer(lyr_d, {palette:[boundary_palette[2]]}, 'Districts');
var sectorLayer = ui.Map.Layer(lyr_s, {palette:[boundary_palette[3]]}, 'Sectors');
var cellLayer = ui.Map.Layer(lyr_c, {palette:[boundary_palette[4]]}, 'Cells');
var villageLayer = ui.Map.Layer(lyr_v, {palette:[boundary_palette[5]]}, 'Villages');
/////////////////////////////////////////////////////////////////////////////////////////////////////////
//LEGEND/////////////////////////////////////////////////////////////////////////////////////////////////
var legend = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '8px 15px'
  }
});
var legend_lulc = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '8px 15px'
  }
});
var legend_wcc = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '8px 15px'
  }
});
var legend_wc = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '8px 15px'
  }
});
var legend_stats = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '8px 15px'
  }
});
function showStats(percent_list, order_list, image_name){
  var colors_list, desc_list, new_order_list;
  if(image_name == 'woody'){
    colors_list = ee.List(["FF0000","FFA500","FFFF00","008000","0000FF","4B0082","EE82EE"]);
    desc_list = ee.List(["Deforestation",	"Degradation",	"Minor Loss",	"Minor Gain",	"Growth",	"Aforestation",	"Nonforest"]);
    new_order_list = order_list;
  }else if(image_name == 'lulc'){
    colors_list = ee.List(["003C00", "009600", "00EB00", "C8FF96", "CDCD00", "FFFF00", "CD8200", "FF8200", "FF82FF", "FFC8C8", "00EEEE", "0000FF", "939393", "000000"]);
    desc_list = ee.List(["Dense Forest",	"Moderate Forest",	"Sparse Forest",	"Woodland",	"Closed Grassland",	"Open Grassland",	"Closed Shrubland",	"Open Shrubland",	"Perennial Cropland",	"Annual Cropland",	"Wetland",	"Water Body",	"Settlement",	"Otherland"]);
    new_order_list = order_list.map(function(x){
      return ee.Number(x).subtract(ee.Number(1));
    });
  }else{
    colors_list = ee.List(['006100','7AAB00','FFFF00','FF9900','FF2200']);
    desc_list = ee.List(['Very Low','Low','Moderate','High','Very High']);
    new_order_list = order_list.map(function(x){
      return ee.Number(x).subtract(ee.Number(1));
    });
  }
  legend_stats.clear();
  for(var i = 0; i < new_order_list.size().getInfo(); i++){
          var idCode = new_order_list.get(i);
          var clr = colors_list.get(idCode).getInfo();
          var dsc = desc_list.get(idCode).getInfo();
          var pct = percent_list.get(i).getInfo();
          legend_stats.add(makeRowStats(clr,dsc,pct));
  }
  Map.add(legend_stats);
}
// Creates and styles 1 row of the legend.
var makeRow = function(color, name) {
  // Create the label that is actually the colored box.
  var colorBox = ui.Label({
    style: {
      backgroundColor: '#' + color,
      // Use padding to give the box height and width.
      padding: '8px',
      margin: '0 0 4px 0'
    }
  });
  // Create the label filled with the description text.
  var description = ui.Label({
    value: name,
    style: {margin: '0 0 4px 6px'}
  });
  return ui.Panel({
    widgets: [colorBox, description],
    layout: ui.Panel.Layout.Flow('horizontal')
  });
};
var makeRowStats = function(color, name, percent) {
  // Create the label that is actually the colored box.
  var colorBox = ui.Label({
    style: {
      backgroundColor: '#' + color,
      // Use padding to give the box height and width.
      padding: '8px',
      margin: '0 0 4px 0'
    }
  });
  // Create the label filled with the description text.
  var description = ui.Label({
    value: name,
    style: {margin: '0 0 4px 6px'}
  });
  // Create the label filled with the percentage text.
  var percentages = ui.Label({
    value: percent,
    style: {margin: '0 0 4px 6px'}
  });
  return ui.Panel({
    widgets: [colorBox, description,percentages],
    layout: ui.Panel.Layout.Flow('horizontal')
  });
};
//landslide and others
legend.add(makeRow('006100','Very Low'));
legend.add(makeRow('7AAB00','Low'));
legend.add(makeRow('FFFF00','Moderate'));
legend.add(makeRow('FF9900','High'));
legend.add(makeRow('FF2200','Very High'));
//lulc
legend_lulc.add(makeRow( "003C00","Dense Forest"));
legend_lulc.add(makeRow( "009600","Moderate Forest"));
legend_lulc.add(makeRow( "00EB00","Sparse Forest"));
legend_lulc.add(makeRow( "C8FF96","Woodland"));
legend_lulc.add(makeRow( "CDCD00","Closed Grassland"));
legend_lulc.add(makeRow( "FFFF00","Open Grassland"));
legend_lulc.add(makeRow( "CD8200","Closed Shrubland"));
legend_lulc.add(makeRow( "FF8200","Open Shrubland"));
legend_lulc.add(makeRow( "FF82FF","Perennial Cropland"));
legend_lulc.add(makeRow( "FFC8C8","Annual Cropland"));
legend_lulc.add(makeRow( "00EEEE","Wetland"));
legend_lulc.add(makeRow( "0000FF","Water Body"));
legend_lulc.add(makeRow( "939393","Settlement"));
legend_lulc.add(makeRow( "000000","Otherland"));
//woodyChange
legend_wcc.add(makeRow( "FFA500","Deforestation")); //1 A loss of AGB from that crosses the forest_threshold.
legend_wcc.add(makeRow( "FFFF00","Degradation"));   //A loss of AGB in a location above the forest_threshold in both images.
legend_wcc.add(makeRow( "008000","Minor Loss"));    //A loss of AGB that does not cross the change_area_threshold, change_magnitude_threshold, or change_intensity_threshold.
legend_wcc.add(makeRow( "0000FF","Minor Gain"));    //A gain of AGB that does not cross the change_area_threshold, change_magnitude_threshold, or change_intensity_threshold.
legend_wcc.add(makeRow( "4B0082","Growth"));        //A gain of AGB in a location above the forest_threshold in both images.
legend_wcc.add(makeRow( "EE82EE","Aforestation"));  //A gain of AGB that crosses the forest_threshold.
legend_wcc.add(makeRow( "FF0000","Nonforest"));     //Below forest_threshold in both images.
//woodyCover
legend_wc.add(makeRow( "006100","Woody Covered"));
legend_wc.add(makeRow( "FFFFFFFF","Non-Forested"));
// Add the legend to the map.
//removed from here because of dynamic nature
//Map.add(legend);
/////////////////////////////////////////////////////////////////////////////////////////////////
//PANEL/////////////////////////////////////////////////////////////////////////////////////////
var panel = ui.Panel();
//panel.style().set('max-width', '22%');
//panel.style().set('min-width', '20%');
panel.style().set('width', '300px');
// Create an intro panel with labels.
var intro = ui.Panel([
  ui.Label({
    value: 'RWANDA LAND USE DECISION SUPPORT SYSTEM',
    style: {fontSize: '20px', fontWeight: 'bold', color: '#e68234',  textAlign: 'center'}
  }),
  ui.Label(
    {
    value: 'RLMUA/RCMRD',
    style: {fontSize: '15px', fontWeight: 'bold', color: '#3e3f2f', textAlign: 'center',stretch: 'horizontal'}
    }
  )
]);
panel.add(intro);
////////////////////////////////////////////////////////////////////////////////////////////////////////////
//WIDGETS////////////////////////////////////////////////////////////////////////////////////////////////////
var lblLayers = ui.Label(
  {
    value:'Layers',
    style: {fontSize: '12px', fontWeight: 'bold', color: '#8f3334', textAlign: 'left' ,stretch: 'horizontal', margin:'10px 0px 0px 10px'}
  }
);
var sctTheme = ui.Select({
  items: rw_theme_layers,
  placeholder: rw_theme_layers_placeholder,
  style: {textAlign:'center', stretch:'horizontal', margin:'10px'},
  onChange: redraw,
});
/////////////////////////////////////////////////////////////////////////
var chkCountry = ui.Checkbox({
  label:'Country',
  value:true,
  style: {textAlign:'center', stretch:'horizontal'}
});
var chkProvince = ui.Checkbox({
  label:'Provinces',
  value:false,
  style: {textAlign:'center', stretch:'horizontal'}
});
var admPanel1 = ui.Panel([chkCountry, chkProvince], ui.Panel.Layout.Flow('horizontal'));
admPanel1.style().set('margin', '0px 0px 0px 0px');
//////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
var chkDistrict = ui.Checkbox({
  label:'Districts',
  value:false,
  style: {textAlign:'center', stretch:'horizontal'}
});
var chkSector = ui.Checkbox({
  label:'Sectors',
  value:false,
  style: {textAlign:'center', stretch:'horizontal'}
});
var admPanel2 = ui.Panel([chkDistrict, chkSector], ui.Panel.Layout.Flow('horizontal'));
admPanel2.style().set('margin', '0px 0px 0px 0px');
/////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////
var chkCell = ui.Checkbox({
  label:'Cells',
  value:false,
  style: {textAlign:'center', stretch:'horizontal'}
});
var chkVillage = ui.Checkbox({
  label:'Villages',
  value:false,
  style: {textAlign:'center', stretch:'horizontal'}
});
var admPanel3 = ui.Panel([chkCell, chkVillage], ui.Panel.Layout.Flow('horizontal'));
admPanel3.style().set('margin', '0px 0px 10px 0px');
/////////////////////////////////////////////////////////////////////////
var lblMask = ui.Label(
  {
    value:'Layer Threshold (%)',
    style: {fontSize: '12px', fontWeight: 'bold', color: '#8f3334', textAlign: 'left' ,stretch: 'horizontal', margin:'0px 0px 0px 10px'}
  }
);
var sldMask = ui.Slider({
  min: 0,
  max: 100,
  value: 0,
  step: 1,
  style: {textAlign:'center',stretch:'horizontal', margin:'10px'},
  onChange: remask
});
var lblRegionAnalysis = ui.Label(
  {
    value:'Region Analysis',
    style: {fontSize: '12px', fontWeight: 'bold', color: '#8f3334', textAlign: 'left' ,stretch: 'horizontal', margin:'0px 0px 0px 10px'}
  }
);
var sctRegion = ui.Select({
  items: rw_regions,
  placeholder: rw_regions_placeholder,
  style: {textAlign:'center', stretch:'horizontal', margin:'10px'},
  onChange: getBoundaries,
});
var sctRegionName = ui.Select({
  placeholder: rw_subregions_placeholder,
  style: {textAlign:'center', stretch:'horizontal', margin:'10px'},
  onChange: zoomToLayer,
});
/////////////////////////////////////////////////////////////////////
var OverlaysPanel = ui.Panel();
OverlaysPanel.style().set('stretch', 'both');
OverlaysPanel.style().set('margin', '10px 10px 0px 10px');
OverlaysPanel.style().set('height', '100px');
OverlaysPanel.style().set('border', '1px solid #CCCCCC');
var lblOverlays = ui.Label(
  {
    value:'Overlays',
    style: {fontSize: '12px', fontWeight: 'bold', color: '#8f3334', textAlign: 'left' ,stretch: 'horizontal', margin:'0px 0px 0px 10px'}
  }
);
var chkAquatic = ui.Checkbox({
  label:'Aquatic Zones',
  value:false,
  style: {textAlign:'center', stretch:'horizontal', margin:'10px'}
});
var chkAviation = ui.Checkbox({
  label:'Aviation Zones',
  value:false,
  style: {textAlign:'center', stretch:'horizontal', margin:'10px'}
});
var chkCoffee = ui.Checkbox({
  label:'Coffee Washing Stations',
  value:false,
  style: {textAlign:'center', stretch:'horizontal', margin:'10px'}
});
var chkDO = ui.Checkbox({
  label:'District Offices',
  value:false,
  style: {textAlign:'center', stretch:'horizontal', margin:'10px'}
});
var chkDrainage = ui.Checkbox({
  label:'Drainage',
  value:false,
  style: {textAlign:'center', stretch:'horizontal', margin:'10px'}
});
var chkHarbours = ui.Checkbox({
  label:'Harbours',
  value:false,
  style: {textAlign:'center', stretch:'horizontal', margin:'10px'}
});
var chkHealth = ui.Checkbox({
  label:'Health Facilities',
  value:false,
  style: {textAlign:'center', stretch:'horizontal', margin:'10px'}
});
var chkIDP = ui.Checkbox({
  label:'IDP Locations',
  value:false,
  style: {textAlign:'center', stretch:'horizontal', margin:'10px'}
});
var chkPlaces = ui.Checkbox({
  label:'Place Names',
  value:false,
  style: {textAlign:'center', stretch:'horizontal', margin:'10px'}
});
var chkPowerlines = ui.Checkbox({
  label:'Powerlines',
  value:false,
  style: {textAlign:'center', stretch:'horizontal', margin:'10px'}
});
var chkProtectedforests = ui.Checkbox({
  label:'Protected Forests',
  value:false,
  style: {textAlign:'center', stretch:'horizontal', margin:'10px'}
});
var chkRoads = ui.Checkbox({
  label:'Roads',
  value:false,
  style: {textAlign:'center', stretch:'horizontal', margin:'10px'}
});
var chkRunways = ui.Checkbox({
  label:'Runways',
  value:false,
  style: {textAlign:'center', stretch:'horizontal', margin:'10px'}
});
var chkSchools = ui.Checkbox({
  label:'Schools',
  value:false,
  style: {textAlign:'center', stretch:'horizontal', margin:'10px'}
});
var chkTeafactories = ui.Checkbox({
  label:'Tea Factories',
  value:false,
  style: {textAlign:'center', stretch:'horizontal', margin:'10px'}
});
var chkTradecenters = ui.Checkbox({
  label:'Trade Centers',
  value:false,
  style: {textAlign:'center', stretch:'horizontal', margin:'10px'}
});
var chkAirports = ui.Checkbox({
  label:'Airports',
  value:false,
  style: {textAlign:'center', stretch:'horizontal', margin:'10px'}
});
var chkBorderposts = ui.Checkbox({
  label:'Border Posts',
  value:false,
  style: {textAlign:'center', stretch:'horizontal', margin:'10px'}
});
var chkIndustries = ui.Checkbox({
  label:'Industries',
  value:false,
  style: {textAlign:'center', stretch:'horizontal', margin:'10px'}
});
var chkTourismSpots = ui.Checkbox({
  label:'Tourism Spots',
  value:false,
  style: {textAlign:'center', stretch:'horizontal', margin:'10px'}
});
OverlaysPanel.add(chkAquatic)
            .add(chkAirports)
            .add(chkAviation)
            .add(chkBorderposts) 
            .add(chkCoffee)
            .add(chkDO)
            .add(chkDrainage)
            .add(chkHarbours)
            .add(chkHealth)
            .add(chkIDP)
            .add(chkIndustries)
            .add(chkPlaces)
            .add(chkPowerlines)
            .add(chkProtectedforests)
            .add(chkRoads)
            .add(chkRunways)
            .add(chkSchools)
            .add(chkTeafactories)
            .add(chkTourismSpots)
            .add(chkTradecenters);
/////////////////////////////////////////////////////////
var lblExport = ui.Label(
        {
          value: 'Download Raster',
          style: {fontSize: '12px', fontWeight: 'bold', color: '#8f3334', textAlign: 'left' ,stretch: 'horizontal', margin:'10px 0px 0px 10px'}
        }
      );
var btnExport = ui.Button({
      label: 'Export the current image to Drive',
      style: {textAlign:'center', stretch:'horizontal'},
      onClick: exportn
    });
//////////////////////////////////////////////////////////////////////////
panel.add(lblLayers)
     .add(sctTheme)
     .add(admPanel1)
     .add(admPanel2)
     .add(admPanel3)
     .add(lblMask)
     .add(sldMask)
     .add(lblRegionAnalysis)
     .add(sctRegion)
     .add(sctRegionName)
     .add(lblOverlays)
     .add(OverlaysPanel)
     .add(lblExport)
     .add(btnExport);
// Add the panel to the ui.root.
ui.root.insert(0, panel);
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Boundary shift segment/////////////////////////////////////////////////////////////////////////////////////
function getBoundaries(){
  var selected_layer = sctRegion.getValue();
  if (sctTheme.getValue() !== null){
    switch(selected_layer) {
            case 'Province':
                sctRegionName.items().reset(province_names);
                sctRegionName.setPlaceholder('Select Province');
              break;
            case 'District':
                sctRegionName.items().reset(district_names);
                sctRegionName.setPlaceholder('Select District');
              break;
            case 'Sector':
                sctRegionName.items().reset(sector_names);
                sctRegionName.setPlaceholder('Select Sector');
              break;
            case 'Cell':
                sctRegionName.items().reset(cell_names);
                sctRegionName.setPlaceholder('Select Cell');
              break;
            case 'Village':
                sctRegionName.items().reset(village_names);
                sctRegionName.setPlaceholder('Select Village');
              break;
            default:
              break;
    }
  }else{
      alert("Please select a theme first");
      sctTheme.setPlaceholder(rw_theme_layers_placeholder);
    }
}
function zoomToLayer(){
  var selected_layer = sctRegion.getValue(); 
  var selected_region = sctRegionName.getValue();
  sldMask.setValue(0,false);
  var regionLayer, lyr_region, regionCenter, regionLabel, regionLabelPos, statsDictionary,statsPercentages, processable;
  processable = true;
  resetWidgets();
  var statisticalTheme = sctTheme.getValue();
  var selImage, selImageName;
  var clipped_image_vulnerability, clipped_image_landslide, clipped_image_landdegrade, clipped_image_lcc, clipped_image_lulc, clipped_image_woodycover_change_image;
  switch(statisticalTheme) {
    case rw_theme_layers[0]:
        //resampling vulnerability to 1 - 5 values
        /*
          // Create zones using an expression, display.
          var zonesExp = nl2012.expression(
              "(b('stable_lights') > 62) ? 3" +
                ": (b('stable_lights') > 55) ? 2" +
                  ": (b('stable_lights') > 30) ? 1" +
                    ": 0"
          );
        */
        var newVulnerability = vulnerability.divide(20).toInt();
        newVulnerability = newVulnerability.where(newVulnerability.eq(5), ee.Number(4));
        selImage = newVulnerability.addBands(newVulnerability);
        selImageName = "vulnerability";
      break;
    case rw_theme_layers[1]:
        selImage = landslide_image_raw.addBands(landslide_image_raw);
        selImageName = "landslide";
      break;
    case rw_theme_layers[2]:
        selImage = landdegrade_2016.addBands(landdegrade_2016);
        selImageName = "landdegrade";
      break;
    case rw_theme_layers[3]:
        var newlccImage = lcc_image.divide(20).toInt();
        newlccImage = newlccImage.where(newlccImage.eq(5), ee.Number(4));
        selImage = newlccImage.addBands(newlccImage);
        selImageName = "lcc";
      break;
    case rw_theme_layers[4]:
        selImage = lulc_image.addBands(lulc_image);
        selImageName = "lulc";
      break;
    case rw_theme_layers[5]:
        selImage = alos_woodycover_change_image.addBands(alos_woodycover_change_image);
        selImageName = "woody";
      break;
      default:
        processable = false;
        break;
  }
  /*clipped_vulnerabilityLayer    = ui.Map.Layer(vulnerability, land_vulnerability_visualisation, rw_theme_layers[0]);
clipped_landslideLayer        = ui.Map.Layer(landslide_image,landslide_visualisation,rw_theme_layers[1]);
clipped_landdegradeLayer      = ui.Map.Layer(landdegrade_image, land_degradation_visualisation, rw_theme_layers[2]);
clipped_lccLayer              = ui.Map.Layer(lcc_image, lcc_visualisation, rw_theme_layers[3]);
clipped_lulcLayer             = ui.Map.Layer(lulc_image, lulc_visualisation, rw_theme_layers[4]);
clipped_woodycoverChangeLayer = ui.Map.Layer(alos_woodycover_change_image, woodycover_change_visualisation, rw_theme_layers[5]);*/
  switch(selected_layer) {
    case 'Province':
        //add layer
        lyr_region = ee.Image().paint(region(provinces,selected_region,attrib_province).geometry(), 0, 3.0);
        regionLayer = ui.Map.Layer(lyr_region.clip(region(provinces,selected_region,attrib_province).geometry()), {palette:['000000']}, selected_region + " " + rw_regions[0]);
        Map.centerObject(region(provinces,selected_region,attrib_province).geometry());
        scale = Map.getScale();
        Map.add(regionLayer);
        garbage_collector_miniLayers.push(regionLayer);
        //add label
        regionCenter = region(provinces,selected_region,attrib_province).geometry().centroid()
        regionLabel = ui.Map.Layer(text.draw(selected_region, regionCenter, scale, text_props),{},selected_region);
        Map.add(regionLabel);
        garbage_collector_miniLayers.push(regionLabel);
        if(processable){
          //get stats
          statsDictionary = getZonalStats(selImage, region(provinces,selected_region,attrib_province).geometry()).map(function(key, value) {
                               return value;
                            }).values();
          //get percentage values
          statsPercentages = getZonalPercentages(statsDictionary);
          showStats(ee.List(statsPercentages.get(0)), ee.List(statsPercentages.get(1)), selImageName);
        }
      break;
    case 'District':
        lyr_region = ee.Image().paint(region(districts,selected_region,attrib_districts).geometry(), 0, 2.5);
        regionLayer = ui.Map.Layer(lyr_region.clip(region(districts,selected_region,attrib_districts).geometry()), {palette:['000000']}, selected_region + " " + rw_regions[1]);
        Map.centerObject(region(districts,selected_region,attrib_districts).geometry());
        scale = Map.getScale();
        Map.add(regionLayer);
        garbage_collector_miniLayers.push(regionLayer);
        regionCenter = region(districts,selected_region,attrib_districts).geometry().centroid()
        regionLabel = ui.Map.Layer(text.draw(selected_region, regionCenter, scale, text_props),{},selected_region);
        Map.add(regionLabel);
        garbage_collector_miniLayers.push(regionLabel);
        if(processable){
          statsDictionary = getZonalStats(selImage, region(districts,selected_region,attrib_districts).geometry()).map(function(key, value) {
                               return value;
                            }).values();
          statsPercentages = getZonalPercentages(statsDictionary);
          showStats(ee.List(statsPercentages.get(0)), ee.List(statsPercentages.get(1)), selImageName);
        }
      break;
    case 'Sector':
        lyr_region = ee.Image().paint(region(sectors,selected_region,attrib_sectors).geometry(), 0, 2.0);
        regionLayer = ui.Map.Layer(lyr_region.clip(region(sectors,selected_region,attrib_sectors).geometry()), {palette:['000000']}, selected_region  + " " + rw_regions[2]);
        Map.centerObject(region(sectors,selected_region,attrib_sectors).geometry());
        scale = Map.getScale();
        Map.add(regionLayer);
        garbage_collector_miniLayers.push(regionLayer);
        regionCenter = region(sectors,selected_region,attrib_sectors).geometry().centroid()
        regionLabel = ui.Map.Layer(text.draw(selected_region, regionCenter, scale, text_props),{},selected_region);
        Map.add(regionLabel);
        garbage_collector_miniLayers.push(regionLabel);
        if(processable){
          statsDictionary = getZonalStats(selImage, region(sectors,selected_region,attrib_sectors).geometry()).map(function(key, value) {
                               return value;
                            }).values();
          statsPercentages = getZonalPercentages(statsDictionary);
          showStats(ee.List(statsPercentages.get(0)), ee.List(statsPercentages.get(1)), selImageName);
        }
      break;
    case 'Cell':
        lyr_region = ee.Image().paint(region(cells,selected_region,attrib_cells).geometry(), 0, 1.5);
        regionLayer = ui.Map.Layer(lyr_region.clip(region(cells,selected_region,attrib_cells).geometry()), {palette:['000000']}, selected_region  + " " + rw_regions[3]);
        Map.centerObject(region(cells,selected_region,attrib_cells).geometry());
        scale = Map.getScale();
        Map.add(regionLayer);
        garbage_collector_miniLayers.push(regionLayer);
        regionCenter = region(cells,selected_region,attrib_cells).geometry().centroid()
        regionLabel = ui.Map.Layer(text.draw(selected_region, regionCenter, scale, text_props),{},selected_region);
        Map.add(regionLabel);
        garbage_collector_miniLayers.push(regionLabel);
        if(processable){
          statsDictionary = getZonalStats(selImage, region(cells,selected_region,attrib_cells).geometry()).map(function(key, value) {
                               return value;
                            }).values();
          statsPercentages = getZonalPercentages(statsDictionary);
          showStats(ee.List(statsPercentages.get(0)), ee.List(statsPercentages.get(1)), selImageName);
        }
      break;
    case 'Village':
        lyr_region = ee.Image().paint(region(villages,selected_region,attrib_villages).geometry(), 0, 0.5);
        regionLayer = ui.Map.Layer(lyr_region.clip(region(villages,selected_region,attrib_villages).geometry()), {palette:['000000']}, selected_region  + " " + rw_regions[4]);
        Map.centerObject(region(villages,selected_region,attrib_villages).geometry());
        scale = Map.getScale();
        Map.add(regionLayer);
        garbage_collector_miniLayers.push(regionLayer);
        regionCenter = region(villages,selected_region,attrib_villages).geometry().centroid()
        regionLabel = ui.Map.Layer(text.draw(selected_region, regionCenter, scale, text_props),{},selected_region);
        Map.add(regionLabel);
        garbage_collector_miniLayers.push(regionLabel);
        if(processable){
          statsDictionary = getZonalStats(selImage, region(villages,selected_region,attrib_villages).geometry()).map(function(key, value) {
                               return value;
                            }).values();
          statsPercentages = getZonalPercentages(statsDictionary);
          showStats(ee.List(statsPercentages.get(0)), ee.List(statsPercentages.get(1)), selImageName);
        }
      break;
    default:
      break;
  }
}
var region = function(boundary,name,property) {
  var result = boundary.filter(ee.Filter.eq(property, name)).first();
  return result;
};
var getZonalStats = function(image,region){
        var statsDict = image.reduceRegion({
          reducer: ee.Reducer.count().group(1),
          geometry: region,
          scale: 30,
          maxPixels: 1e13
        });
        return(statsDict);
};
var getZonalPercentages = function(dictionary){
  var statList = ee.List(dictionary.get(0));
  var valList = statList.map(function(x){
    x = ee.Dictionary(x);
    var tot = x.get('count');
    return tot;
  });
  var grpList = statList.map(function(x){
    x = ee.Dictionary(x);
    var tot = x.get('group');
    return tot;
  });
  var valTotal = valList.reduce(ee.Reducer.sum());
  var pctList = valList.map(function(x){
    return (ee.Number(100).multiply(ee.Number(x).divide(ee.Number(valTotal)))).format('%.2f').cat(ee.String(' %'));
  });
  return ee.List([pctList,grpList]);
};
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//SHOW BOUNDARIES/////////////////////////////////////////////////////////////////////////////////////////////////
Map.add(countryLayer);
chkCountry.onChange(function(checked) {
  if(checked){
      Map.add(countryLayer);
  }else{
    Map.remove(countryLayer);
  }
});
chkProvince.onChange(function(checked) {
  if(checked){
      Map.add(provinceLayer);
  }else{
    Map.remove(provinceLayer);
  }
});
chkDistrict.onChange(function(checked) {
  if(checked){
      Map.add(districtLayer);
  }else{
    Map.remove(districtLayer);
  }
});
chkSector.onChange(function(checked) {
  if(checked){
      Map.add(sectorLayer);
  }else{
    Map.remove(sectorLayer);
  }
});
chkCell.onChange(function(checked) {
  if(checked){
      Map.add(cellLayer);
  }else{
    Map.remove(cellLayer);
  }
});
chkVillage.onChange(function(checked) {
  if(checked){
      Map.add(villageLayer);
  }else{
    Map.remove(villageLayer);
  }
});
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//show overlay////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
chkAquatic.onChange(function(checked) {if(checked){ Map.add(RWA_aquatic_zones_layer ) }else{  Map.remove(RWA_aquatic_zones_layer ) }});
chkAviation.onChange(function(checked) {if(checked){ Map.add(RWA_aviation_zones_layer ) }else{  Map.remove(RWA_aviation_zones_layer ) }});
chkCoffee.onChange(function(checked) {if(checked){ Map.add(RWA_coffee_wash_stns_layer ) }else{  Map.remove(RWA_coffee_wash_stns_layer ) }});
chkDO.onChange(function(checked) {if(checked){ Map.add(RWA_DO_locs_layer ) }else{  Map.remove(RWA_DO_locs_layer ) }});
chkDrainage.onChange(function(checked) {if(checked){ Map.add(RWA_drainage_layer ) }else{  Map.remove(RWA_drainage_layer ) }});
chkHarbours.onChange(function(checked) {if(checked){ Map.add(RWA_harbour_layer ) }else{  Map.remove(RWA_harbour_layer ) }});
chkHealth.onChange(function(checked) {if(checked){ Map.add(RWA_health_layer ) }else{  Map.remove(RWA_health_layer ) }});
chkIDP.onChange(function(checked) {if(checked){ Map.add(RWA_IDP_45_layer ) }else{  Map.remove(RWA_IDP_45_layer ) }});
chkPlaces.onChange(function(checked) {if(checked){ Map.add(RWA_place_names_layer ) }else{  Map.remove(RWA_place_names_layer ) }});
chkPowerlines.onChange(function(checked) {if(checked){ Map.add(RWA_powerlines_layer ) }else{  Map.remove(RWA_powerlines_layer ) }});
chkProtectedforests.onChange(function(checked) {if(checked){ Map.add(RWA_forest_protected_layer ) }else{  Map.remove(RWA_forest_protected_layer ) }});
chkRoads.onChange(function(checked) {if(checked){ Map.add(RWA_roads_layer ) }else{  Map.remove(RWA_roads_layer ) }});
chkRunways.onChange(function(checked) {if(checked){ Map.add(RWA_runways_layer ) }else{  Map.remove(RWA_runways_layer ) }});
chkSchools.onChange(function(checked) {if(checked){ Map.add(RWA_schools_layer ) }else{  Map.remove(RWA_schools_layer ) }});
chkTeafactories.onChange(function(checked) {if(checked){ Map.add(RWA_tea_factories_layer ) }else{  Map.remove(RWA_tea_factories_layer ) }});
chkTradecenters.onChange(function(checked) {if(checked){ Map.add(RWA_trade_centers_layer ) }else{  Map.remove(RWA_trade_centers_layer ) }});
chkAirports.onChange(function(checked) {if(checked){ Map.add(RWA_airports_layer ) }else{  Map.remove(RWA_airports_layer ) }});
chkBorderposts.onChange(function(checked) {if(checked){ Map.add(RWA_borderposts_layer ) }else{  Map.remove(RWA_borderposts_layer ) }});
chkIndustries.onChange(function(checked) {if(checked){ Map.add(RWA_industries_layer ) }else{  Map.remove(RWA_industries_layer ) }});
chkTourismSpots.onChange(function(checked) {if(checked){ Map.add(RWA_tourismspots_layer ) }else{  Map.remove(RWA_tourismspots_layer ) }});
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Display Theme///////////////////////////////////////////////////////////////////////////////////////////////////
function redraw(){
  sctRegion.setPlaceholder(rw_regions_placeholder);
  sctRegionName.setPlaceholder(rw_subregions_placeholder);
  resetWidgets();
  sldMask.setValue(0,false);
  var selected_theme = sctTheme.getValue();
  switch(selected_theme) {
    case rw_theme_layers[0]:
        Map.remove(landslideLayer);
        Map.remove(landdegradeLayer);
        Map.remove(lccLayer);
        Map.remove(lulcLayer);
        Map.remove(woodycoverChangeLayer);
        Map.remove(woodycover2007Layer);
        Map.remove(woodycover2017Layer);
        Map.remove(srtmLayer);
        Map.add(vulnerabilityLayer);
        Map.add(legend);
      break;
    case rw_theme_layers[1]:
        Map.remove(landdegradeLayer);
        Map.remove(lccLayer);
        Map.remove(vulnerabilityLayer);
        Map.remove(lulcLayer);
        Map.remove(woodycoverChangeLayer);
        Map.remove(woodycover2007Layer);
        Map.remove(woodycover2017Layer);
        Map.remove(srtmLayer);
        Map.remove(hillshadeLayer);
        Map.add(landslideLayer);
        Map.add(legend);
      break;
    case rw_theme_layers[2]:
        Map.remove(lccLayer);
        Map.remove(vulnerabilityLayer);
        Map.remove(landslideLayer);
        Map.remove(lulcLayer);
        Map.remove(woodycoverChangeLayer);
        Map.remove(woodycover2007Layer);
        Map.remove(woodycover2017Layer);
        Map.remove(srtmLayer);
        Map.remove(hillshadeLayer);
        Map.add(landdegradeLayer);
        Map.add(legend);
      break;
    case rw_theme_layers[3]:
        Map.remove(vulnerabilityLayer);
        Map.remove(landslideLayer);
        Map.remove(landdegradeLayer);
        Map.remove(lulcLayer);
        Map.remove(woodycoverChangeLayer);
        Map.remove(woodycover2007Layer);
        Map.remove(woodycover2017Layer);
        Map.remove(srtmLayer);
        Map.remove(hillshadeLayer);
        Map.add(lccLayer);
        Map.add(legend);
      break;
    case rw_theme_layers[4]:
        Map.remove(vulnerabilityLayer);
        Map.remove(landslideLayer);
        Map.remove(landdegradeLayer);
        Map.remove(lccLayer);
        Map.remove(woodycoverChangeLayer);
        Map.remove(woodycover2007Layer);
        Map.remove(woodycover2017Layer);
        Map.remove(srtmLayer);
        Map.remove(hillshadeLayer);
        Map.add(lulcLayer);
        Map.add(legend_lulc);
      break;
    case rw_theme_layers[5]:
        Map.remove(vulnerabilityLayer);
        Map.remove(landslideLayer);
        Map.remove(landdegradeLayer);
        Map.remove(lccLayer);
        Map.remove(lulcLayer);
        Map.remove(woodycover2007Layer);
        Map.remove(woodycover2017Layer);
        Map.remove(hillshadeLayer);
        Map.remove(srtmLayer);
        Map.add(woodycoverChangeLayer);
        Map.add(legend_wcc);
      break;
    case rw_theme_layers[6]:
        Map.remove(vulnerabilityLayer);
        Map.remove(landslideLayer);
        Map.remove(landdegradeLayer);
        Map.remove(lccLayer);
        Map.remove(lulcLayer);
        Map.remove(woodycover2017Layer);
        Map.remove(woodycoverChangeLayer);
        Map.remove(srtmLayer);
        Map.remove(hillshadeLayer);
        Map.add(woodycover2007Layer);
        Map.add(legend_wc);
      break;
    case rw_theme_layers[7]:
        Map.remove(vulnerabilityLayer);
        Map.remove(landslideLayer);
        Map.remove(landdegradeLayer);
        Map.remove(lccLayer);
        Map.remove(lulcLayer);
        Map.remove(woodycoverChangeLayer);
        Map.remove(woodycover2007Layer);
        Map.remove(srtmLayer);
        Map.remove(hillshadeLayer);
        Map.add(woodycover2017Layer);
        Map.add(legend_wc);
      break;
    case rw_theme_layers[8]:
        Map.remove(vulnerabilityLayer);
        Map.remove(landslideLayer);
        Map.remove(landdegradeLayer);
        Map.remove(lccLayer);
        Map.remove(lulcLayer);
        Map.remove(woodycoverChangeLayer);
        Map.remove(woodycover2007Layer);
        Map.remove(woodycover2017Layer);
        Map.remove(hillshadeLayer);
        Map.add(srtmLayer);
        Map.add(legend_wc);
      break;
    case rw_theme_layers[9]:
        Map.remove(vulnerabilityLayer);
        Map.remove(landslideLayer);
        Map.remove(landdegradeLayer);
        Map.remove(lccLayer);
        Map.remove(lulcLayer);
        Map.remove(woodycoverChangeLayer);
        Map.remove(woodycover2007Layer);
        Map.remove(woodycover2017Layer);
        Map.remove(srtmLayer);
        Map.add(hillshadeLayer);
        Map.add(legend);
      break;
      default:
        break;
  }
}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Exporting//////////////////////////////////////////////////////////////////////////////////////////////////////
function exportn(){
  var selected_theme = "";
  var selected_image;
  var theme_layer = sctTheme.getValue();
  if(sldMask.getValue() === 0){
      switch(theme_layer) {
      case rw_theme_layers[0]:
          selected_theme = "vulnerability";
          selected_image = vulnerability;
        break;
      case rw_theme_layers[1]:
          selected_theme = "landslide_susceptibility";
          selected_image = landslide_image;
        break;
      case rw_theme_layers[2]:
          selected_theme = "land_degradation";
          selected_image = landdegrade_2016;
        break;
      case rw_theme_layers[3]:
          selected_theme = "landcover_change";
          selected_image = lcc_image;
        break;
      case rw_theme_layers[4]:
          selected_theme = "lulc";
          selected_image = lulc_image;
        break;
      case rw_theme_layers[5]:
          selected_theme = "woody_cover_change";
          selected_image = alos_woodycover_change_image;
        break;
      case rw_theme_layers[6]:
          selected_theme = "woody_cover_2007";
          selected_image = alos_woodycover_2007_image;
        break;
      case rw_theme_layers[7]:
          selected_theme = "woody_cover_2017";
          selected_image = alos_woodycover_2007_image;
        break;
      case rw_theme_layers[8]:
          selected_theme = "srtm";
          selected_image = srtm_image;
        break;
      case rw_theme_layers[9]:
          selected_theme = "hillshade";
          selected_image = hillshade_image;
        break;
        default:
          break;
      }
  } else {
    var mask_value = sldMask.getValue();
    selected_image = garbage_collector[0];
       switch(theme_layer) {
      case rw_theme_layers[0]:
          selected_theme = "vulnerability" + "_masked_" + mask_value + "_percent";
        break;
      case rw_theme_layers[1]:
          selected_theme = "landslide_susceptibility" +"_masked_" + mask_value + "_percent";
        break;
      case rw_theme_layers[2]:
          selected_theme = "land_degradation" + "_masked_" + mask_value + "_percent";
        break;
      case rw_theme_layers[3]:
          selected_theme = "landcover_change" + "_masked_" + mask_value + "_percent";
        break;
      case rw_theme_layers[4]:
          selected_theme = "lulc";
        break;
      case rw_theme_layers[5]:
          selected_theme = "woody_cover_change";
        break;
      case rw_theme_layers[6]:
          selected_theme = "woody_cover_2007";
        break;
      case rw_theme_layers[7]:
          selected_theme = "woody_cover_2017";
        break;
      case rw_theme_layers[8]:
          selected_theme = "srtm" + "_masked_" + mask_value + "_percent";
        break;
      case rw_theme_layers[9]:
          selected_theme = "hillshade";
        break;
        default:
          break;
      }
  }
  var theme_region = sctRegion.getValue();
  var theme_region_name = sctRegionName.getValue();
  var d = new Date();
  var time_done = d.getTime();
  var selected_geometry;
  var selected_region = "";
  switch(theme_region) {
          case 'Province':
              selected_geometry = region(provinces,theme_region_name,attrib_province).geometry();
              selected_region = theme_region + "_" + theme_region_name.replace(/\s+/g, '');
            break;
          case 'District':
              selected_geometry = region(districts,theme_region_name,attrib_districts).geometry();
              selected_region = theme_region + "_" + theme_region_name.replace(/\s+/g, '');
            break;
          case 'Sector':
              selected_geometry = region(sectors,theme_region_name,attrib_sectors).geometry();
              selected_region = theme_region + "_" + theme_region_name.replace(/\s+/g, '');
            break;
          case 'Cell':
              selected_geometry = region(cells,theme_region_name,attrib_cells).geometry();
              selected_region = theme_region + "_" + theme_region_name.replace(/\s+/g, '');
            break;
          case 'Village':
              selected_geometry = region(villages,theme_region_name,attrib_villages).geometry();
              selected_region = theme_region + "_" + theme_region_name.replace(/\s+/g, '');
            break;
          default:
              selected_geometry = country;
              selected_region = "country";
            break;
  }
  var image_name = "Rwanda_" + selected_region + "_" + selected_theme + "_" + time_done;
  if (selected_theme.length > 0) {
      Export.image.toDrive({
                              image: selected_image.clip(selected_geometry), 
                              description: image_name, 
                              region:selected_geometry.bounds(),
                              maxPixels: 1e13,
                              scale: 30,
                              crs: "EPSG:4326"
                          });
  }
}
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//Masking////////////////////////////////////////////////////////////////////////////////////////////////////////
function remask(value){
  var masked_image_vulnerability = vulnerability.updateMask(vulnerability.gte(value));
  var masked_image_landslide = landslide_image.updateMask(landslide_image.gte(value));
  var masked_image_landdegrade = landdegrade_image.updateMask(landdegrade_image.gte(value));
  var masked_image_lcc = lcc_image.updateMask(lcc_image.gte(value));
  var masked_image_srtm = srtm_image.updateMask(srtm_image.gte(limitValue(900,4600,value)));
  var masked_suffix = "_masked";
  masked_vulnerabilityLayer = ui.Map.Layer(masked_image_vulnerability, land_vulnerability_visualisation, rw_theme_layers[0]) + masked_suffix;
  masked_landslideLayer     = ui.Map.Layer(masked_image_landslide,landslide_visualisation,rw_theme_layers[1] + masked_suffix);
  masked_landdegradeLayer   = ui.Map.Layer(masked_image_landdegrade, land_degradation_visualisation, rw_theme_layers[2] + masked_suffix);
  masked_lccLayer           = ui.Map.Layer(masked_image_lcc, lcc_visualisation, rw_theme_layers[3] + masked_suffix);
  masked_srtmLayer          = ui.Map.Layer(masked_image_srtm, srtm_visualisation, rw_theme_layers[5] + masked_suffix);
  resetWidgets();
  var theme_layer = sctTheme.getValue();
  var masked_image;
  switch(theme_layer) {
          case rw_theme_layers[0]:
              Map.remove(vulnerabilityLayer);
              Map.add(masked_vulnerabilityLayer);
              garbage_collector.push(masked_vulnerabilityLayer);
            break;
          case rw_theme_layers[1]:
              Map.remove(landslideLayer);
              Map.add(masked_landslideLayer);
              garbage_collector.push(masked_landslideLayer);
            break;
          case rw_theme_layers[2]:
              Map.remove(landdegradeLayer);
              Map.add(masked_landdegradeLayer);
              garbage_collector.push(masked_landdegradeLayer);
            break;
          case rw_theme_layers[3]:
              Map.remove(lccLayer);
              Map.add(masked_lccLayer);
              garbage_collector.push(masked_lccLayer);
            break;
          case rw_theme_layers[4]:
            break;
          case rw_theme_layers[5]:
            break;
          case rw_theme_layers[6]:
            break;
          case rw_theme_layers[7]:
            break;
          case rw_theme_layers[8]:
              Map.remove(srtmLayer);
              Map.add(masked_srtmLayer);
              garbage_collector.push(masked_srtmLayer);
            break;
          case rw_theme_layers[9]:
            break;
            default:
              break;
  }
}
var limitValue = function(min,max,percent){
    var limit_factor = min + ((max - min) * (percent/100));
    //print(limit_factor);
    return limit_factor;
};
function translate(pt, x, y) {
  var x1 = ee.Number(pt.get(0)).subtract(x)
  var y1 = ee.Number(pt.get(1)).subtract(y)
  return ee.Geometry.Point(ee.List([x1, y1]))
}
function resetWidgets(){
    try{
      Map.remove(legend_lulc);
    }catch(error){
    }
    try{
      Map.remove(legend);
    }catch(error){
    }
    try{
      Map.remove(legend_wcc);
    }catch(error){
    }
    try{
      Map.remove(legend_stats);
    }catch(error){
    }
    try{
      Map.remove(legend_wc);
    }catch(error){
    }
    try{
      for (var i = 0; i < garbage_collector.length; i++){
        Map.remove(garbage_collector[i]);
      }
    }catch(error){
    }
    try{
      for (var j = 0; j < garbage_collector_miniLayers.length; j++){
        Map.remove(garbage_collector_miniLayers[j]);
      }
    }catch(error){
    }
    Map.centerObject(country);
}
////////////////////////////////////////////////////////////////////////////////////////////////////////////////