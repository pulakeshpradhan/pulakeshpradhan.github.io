var dlt2018 = ui.import && ui.import("dlt2018", "image", {
      "id": "users/wiesehahn/waldmaske/DLT_2018_010m_de_v020"
    }) || ee.Image("users/wiesehahn/waldmaske/DLT_2018_010m_de_v020"),
    dlt2015S = ui.import && ui.import("dlt2015S", "image", {
      "id": "users/wiesehahn/waldmaske/DLT_2015_020m_eu_03035_d04_E40N20"
    }) || ee.Image("users/wiesehahn/waldmaske/DLT_2015_020m_eu_03035_d04_E40N20"),
    dlt2015N = ui.import && ui.import("dlt2015N", "image", {
      "id": "users/wiesehahn/waldmaske/DLT_2015_020m_eu_03035_d04_E40N30"
    }) || ee.Image("users/wiesehahn/waldmaske/DLT_2015_020m_eu_03035_d04_E40N30"),
    lt_de = ui.import && ui.import("lt_de", "image", {
      "id": "users/wiesehahn/waldsterben/lt-gee_de_20210927"
    }) || ee.Image("users/wiesehahn/waldsterben/lt-gee_de_20210927");
Map.setCenter(9.9783, 51.7984, 12);
// import roi
var gaul = ee.FeatureCollection("FAO/GAUL_SIMPLIFIED_500m/2015/level1");
var DE = gaul.filter(ee.Filter.eq('ADM0_NAME', 'Germany'));
// forest mask from HRL
var forest15 = ee.ImageCollection([dlt2015S, dlt2015N]).mosaic();
var forest15 = forest15
  .updateMask(forest15.neq(0))
  .updateMask(forest15.neq(255))
  .clip(DE);
var forest18 = dlt2018
  .updateMask(dlt2018.neq(0))
  .clip(DE);
// load and mask disturbances 
var disturbed = lt_de.select(['yod']).updateMask(lt_de.select(['yod']).neq(0)).updateMask(forest15.neq(0));
// set visualization options
var years = ['2017','2018','2019','2020','2021']
var colors =['#0D0887', '5B02A3', '9A179B', 'CB4678', 'EB7852']
var yodVizParms = {
  min: 2017,
  max: 2021,
  palette: colors
};
// add legend
var legend = ui.Panel({style: {position: 'bottom-left'}}); 
  legend.add(ui.Label({   
  value: "Disturbance Year",   
  style: {     
    fontWeight: 'bold',     
    fontSize: '16px',     
    margin: '0 0 4px 0',     
    padding: '0px'   
    } 
  })); 
// Iterate classification legend entries 
var entry; for (var x = 0; x<5; x++){   
  entry = [     
    ui.Label({style:{color:colors[x],margin: '0 0 4px 0'}, value: '◍'}),
    ui.Label({       
      value: years[x],       
      style: {         
        margin: '0 0 4px 4px'  
      }     
    })   
    ];   
    legend.add(ui.Panel(entry, ui.Panel.Layout.Flow('horizontal'))); } 
Map.add(legend);
Map.addLayer(disturbed, yodVizParms, 'Disturbances (LandTrendR)', true);