var dlt2018 = ui.import && ui.import("dlt2018", "image", {
      "id": "users/wiesehahn/waldmaske/DLT_2018_010m_de_v020"
    }) || ee.Image("users/wiesehahn/waldmaske/DLT_2018_010m_de_v020"),
    treespecies_de = ui.import && ui.import("treespecies_de", "image", {
      "id": "users/wiesehahn/baumarten/classification/map/species_map_de"
    }) || ee.Image("users/wiesehahn/baumarten/classification/map/species_map_de");
Map.setCenter(9.9783, 51.7984, 12);
var gaul = ee.FeatureCollection("FAO/GAUL_SIMPLIFIED_500m/2015/level1");
var DE = gaul.filter(ee.Filter.eq('ADM0_NAME', 'Germany'));
var forest18 = dlt2018
  .updateMask(dlt2018.neq(0))
  .clip(DE);
// set visualization options
var colors11 = ["efefa9","bf7013", "a5027c","fecc00", "1b9859","a6e06c", "4066aa","94a6b0", "e20030", "F08080", "FFFFFF"];
var names11 = ["BI", "BU", "DGL", "EI", "ERL", "ES", "FI", "KI","LAE", "REI", "NULL"]; 
var specVizParms = {
  min: 0,
  max: 10,
  palette: colors11
};
// mask maps
var treespecies_de = treespecies_de.updateMask(forest18.neq(0));
// add legend
var legend = ui.Panel({style: {position: 'bottom-left'}}); 
  legend.add(ui.Label({   
  value: "Species Classification",   
  style: {     
    fontWeight: 'bold',     
    fontSize: '16px',     
    margin: '0 0 4px 0',     
    padding: '0px'   
    } 
  })); 
// Iterate classification legend entries 
var entry; for (var x = 0; x<11; x++){   
  entry = [     
    ui.Label({style:{color:colors11[x],margin: '0 0 4px 0'}, value: '◍'}),
    ui.Label({       
      value: names11[x],       
      style: {         
        margin: '0 0 4px 4px'  
      }     
    })   
    ];   
    legend.add(ui.Panel(entry, ui.Panel.Layout.Flow('horizontal'))); } 
Map.add(legend);
Map.addLayer(treespecies_de, specVizParms, 'Tree Species');