var tree_plantation = ui.import && ui.import("tree_plantation", "table", {
      "id": "users/hadicu06/IIASA/vector/Tree_plantations_INA_20210212"
    }) || ee.FeatureCollection("users/hadicu06/IIASA/vector/Tree_plantations_INA_20210212");
//////////////////////////////////////////////////////////////////////////////////
// Tree Plantation
///////////////////////////////////////////////////////////////////////////////
// print("tree_plantation.first()", tree_plantation.first())
// print("spec_simp", tree_plantation.reduceColumns(ee.Reducer.frequencyHistogram(), ['spec_simp']))
// print("spec_org", tree_plantation.reduceColumns(ee.Reducer.frequencyHistogram(), ['spec_org']))
/////////////////////////////////////////////////////////////////////////////
// Add Tree Plantations
//////////////////////////////////////////////////////////////////////////
var spec_simp_items = ee.Dictionary(ee.Dictionary(tree_plantation.reduceColumns(ee.Reducer.frequencyHistogram(), ['spec_simp']))
                      .get('histogram'))
                      .keys()
var spec_org_items = ee.Dictionary(ee.Dictionary(tree_plantation.reduceColumns(ee.Reducer.frequencyHistogram(), ['spec_org']))
                      .get('histogram'))
                      .keys()                  
// print("spec_simp_items", spec_simp_items)                      
var ui_TP_selSpecSimp = ui.Select({
  items: spec_simp_items.getInfo(), 
  placeholder: "Select 'spec_simp'", 
  value: 'Rubber', 
  style: {'position':'top-center'}
})
var ui_TP_selSpecOrg = ui.Select({
  items: spec_org_items.getInfo(), 
  placeholder: "Select 'spec_org'", 
  value: 'Hevea', 
  style: {'position':'top-center'}
})
Map.add(ui_TP_selSpecSimp)   // 17
Map.add(ui_TP_selSpecOrg)    // 18
Map.layers().set(0, ui.Map.Layer(ee.Image([]), {palette:'yellow'}, "Tree Plantation - spec_simp = "))
Map.layers().set(1, ui.Map.Layer(ee.Image([]), {palette:'orange'}, "Tree Plantation - spec_org = "))
ui_TP_selSpecSimp.onChange(function(value){
  var sel_TP_polygons = tree_plantation.filterMetadata('spec_simp', 'equals', value)
  var sel_TP_lyr = ee.Image().byte().paint(sel_TP_polygons, 'yellow', 2)
  Map.layers().set(0, ui.Map.Layer(sel_TP_lyr, {palette:'yellow'}, "Tree Plantation - spec_simp = " + value))
})
ui_TP_selSpecOrg.onChange(function(value){
  var sel_TP_polygons = tree_plantation.filterMetadata('spec_org', 'equals', value)
  var sel_TP_lyr = ee.Image().byte().paint(sel_TP_polygons, 'orange', 2)
  Map.layers().set(1, ui.Map.Layer(sel_TP_lyr, {palette:'orange'}, "Tree Plantation - spec_org = " + value))
})
// Map.centerObject(tree_plantation.geometry().bounds())
Map.setCenter(114.12882950150063, -0.052287438943613124, 5)
Map.setOptions('SATELLITE')