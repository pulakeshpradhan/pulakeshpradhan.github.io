var county = ui.import && ui.import("county", "table", {
      "id": "users/snyawacha/kenya_adm0"
    }) || ee.FeatureCollection("users/snyawacha/kenya_adm0"),
    table = ui.import && ui.import("table", "table", {
      "id": "users/snyawacha/TROFMIS_AOI_FINALBOUNDARY"
    }) || ee.FeatureCollection("users/snyawacha/TROFMIS_AOI_FINALBOUNDARY"),
    table2 = ui.import && ui.import("table2", "table", {
      "id": "users/snyawacha/kenya_adm0"
    }) || ee.FeatureCollection("users/snyawacha/kenya_adm0"),
    table3 = ui.import && ui.import("table3", "table", {
      "id": "users/snyawacha/Uganda_corridor"
    }) || ee.FeatureCollection("users/snyawacha/Uganda_corridor"),
    imageCollection = ui.import && ui.import("imageCollection", "imageCollection", {
      "id": "COPERNICUS/S2"
    }) || ee.ImageCollection("COPERNICUS/S2"),
    table4 = ui.import && ui.import("table4", "table", {
      "id": "users/snyawacha/Wind_Erosion_Study_Area"
    }) || ee.FeatureCollection("users/snyawacha/Wind_Erosion_Study_Area");
Map.centerObject(table, 4);
var lulc1 = ee.ImageCollection("COPERNICUS/Landcover/100m/Proba-V-C3/Global")
  .select('discrete_classification')
  .filterBounds(table4);
function lulc(collection){
  var clip = collection.clip(table);
  return clip;
}
var cr = lulc1.map(lulc)
// print(lulc1);
var properties = lulc1.propertyNames();
// print('Metadata properties:', properties);
// print(lulc1.bandNames())
// Map.addLayer(lulc1, {min: 0, 
//                     max: 200, 
//                     palette: ['#282828', '#FFBB22','#FFFF4C','#F096FF','#FA0000',
//                     '#B4B4B4','#F0F0F0','#0032C8','#0096A0','#FAE6A0','#58481F',
//                     '#009900','#70663E','#00CC00','#4E751F','#007800','#666000',
//                     '#8DB400','#8D7400','#A0DC00','#929900','#648C00','#000080']}, 
//                     "Land Cover");
var lulcreclass = lulc1.map(function (img) {
  return ee.Image(img)
    .where(img.eq(10).and(img.lte(40)), 3)
    .where(img.eq(50).and(img.lte(100)), 1)
    .where(img.gte(110).and(img.lte(130)), 2)
    .where(img.gte(210).and(img.lte(210)), 4)
    .where(img.eq(200).and(img.eq(201)), 5);
});
print(lulcreclass);
var clippedCol=lulcreclass.map(function(im){ 
  return im.clip(table);
});
// print(clippedCol);
// // var lulc_clip = lulcreclass.map(im)
// // Map.addLayer(lulcreclass,{},'see');
// Map.addLayer(clippedCol, { 
//                     palette: ['#282828', '#FFBB22','#FFFF4C','#F096FF','#FA0000',
//                     '#B4B4B4','#F0F0F0','#0032C8','#0096A0','#FAE6A0','#58481F',
//                     '#009900','#70663E','#00CC00','#4E751F','#007800','#666000',
//                     '#8DB400','#8D7400','#A0DC00','#929900','#648C00','#000080']},
//                     "LULC RECLASS");
var Start_base_number='2021-01-01';
var End_base_number='2021-12-30';
var filter1 = imageCollection.filterDate(Start_base_number, End_base_number);
//.filterMetadata('CLOUD_COVER','less_than','');
// print (filter1);
var year = '2020'; 
var names = 'sentinel';
// Reduce the collection by taking the median.
var median2 = filter1.median();
var median3 =filter1.median();
var result = median2.select( 'B5', 'B4','B3');
var result2 = median3.select('B2','B6','B5');
var results3 = median3.select('B6','B3','B2');
var results4 = median3.select('B7','B6','B3','B4');
//var median3 = filter2.mean();
//var results2 = median3.select();
print(result);
print(result2);
var clipped = result.clipToCollection(table);
var clipped2 = result2.clipToCollection(table);
var clipped3 = results3.clipToCollection(table);
var clipped4 = results4.clipToCollection(table);
print(clipped);
print(clipped2);
print(clipped3);
print(clipped4);
var ndvi = clipped.normalizedDifference(['B5', 'B4']);
var gndvi = clipped.normalizedDifference(['B5','B3']);
var ndssi = clipped2.normalizedDifference(['B2','B5']);
var mndwi = clipped3.normalizedDifference(['B3','B6']);
var ndwi = clipped2.normalizedDifference(['B5','B6']);
var ndti = clipped.normalizedDifference(['B4','B3']);
var wri = clipped.normalizedDifference(['B3','B4']);
// var boundary = table;
Map.setOptions("SATELLITE");
Map.centerObject(county);
// var bounds = table;
var viz = {min:-1.0,max:1.0,palette: [
    '1b8f14', '7d8c1f', '32f12b', 'fddbc6', 'd7191c'
  ]};
Map.setOptions('SATELLITE')
Map.style().set('cursor', 'hand');
var panel = ui.Panel({style:{position:'bottom-right', width: '300px', 
backgroundColor:'FFFFFF', fontFamily:'calibri light', textAlign: 'center'}})
              .add(ui.Label(
                {
                  value: 'Mapping Vegetation',
                  style: {fontWeight: 'bold', fontSize:'24px', margin: '0', color: 'black', textAlign: 'center'}
                }))
              .add(ui.Label(''));
var Header = ui.Label('An algal bloom is the overgrowth of microscopic algae or algae-like bacteria in fresh, salt, or brackish waters. Depending on the type of algae or bacteria that cause it, an algal bloom may produce bad-smelling scum, foam, froth, or a paintlike slick.',
{fontWeight: 'bold', fontSize: '15px', textAlign: 'left'});
var start_date = ui.Label('Start Date', {fontWeight: 'bold'});
var label_Start_base_select = ui.Label('Start:');
var Start_base_select = ui.Textbox({
value: '2017-01-01',
style: {width : '90px'},
onChange: function(text) {
var Start_base = text;
}
});
var end_date = ui.Label('End Date:', {fontWeight: 'bold'});
var label_Start_base_select = ui.Label('End:');
var End_base_select = ui.Textbox({
value: '2017-12-31',
style: {width : '90px'},
onChange: function(text) {
var End_base = text;
}
});
var Panel = ui.Panel();
Panel.style().set({
  width: '400px',
  position: 'bottom-right',
  border : '1px solid #000000',
});
    var Label_filter = ui.Label('Select Filter Type',{fontWeight: 'bold'});
    var Filter  = ui.Select({
      items:[
        {label: 'NDVI', value: 'NDVI'},
        {label: 'NDWI', value: 'NDWI'},
        {label: 'SAVI', value: 'SAVI'},
        {label: 'NDCI', value: 'NDCI'},
        {label: 'COVER', value: 'COVER'},
        ],
      value: 'NDVI',
      onChange: function(value){
        var countyval = value;
        var cfil = table
        Map.clear()
        Map.centerObject(cfil, 10)
        if (value === 'NDVI'){
          Map.clear()
          var ndvi = clipped.normalizedDifference(['B5', 'B4']);
          Map.addLayer(ndvi,viz,'global_ndvi')
          Map.add(legend)
        }else if (value === 'NDWI'){
          Map.clear()
          var ndwi = clipped2.normalizedDifference(['B5','B6']);
          Map.addLayer(ndwi,viz,'global_ndwi')
          Map.add(legend)
        }else if (value === 'COVER'){
          Map.clear()
          Map.addLayer(cr, {
                    palette: ['#282828', '#FFBB22','#FFFF4C','#F096FF','#FA0000',
                    '#B4B4B4','#F0F0F0','#0032C8','#0096A0','#FAE6A0','#58481F',
                    '#009900','#70663E','#00CC00','#4E751F','#007800','#666000',
                    '#8DB400','#8D7400','#A0DC00','#929900','#648C00','#000080']},'RAW LULC')
        }else if (value === 'SAVI'){
            Map.clear()
          var gndvi = clipped.normalizedDifference(['B5','B3']);
            Map.addLayer(gndvi,viz,'global_gndvi')
            Map.add(legend)
        }else if (value === 'NDCI')
          Map.clear()
          var ndvi2 = clipped.normalizedDifference(['B5', 'B4']);
          Map.addLayer(table,{},'Farms')
          Map.add(legend)
      }});
    // Panel.add(ui.Label('Chose Filter', {fontWeight: 'bold', color: 'black'})).add(Filter);
    var county_filter = ui.Label('Select County',{fontWeight: 'bold'});
    var County  = ui.Select({
      items:[
        {label: 'Kenya', value: 'KENYA'},
        {label: 'Uganda', value: 'UGANDA'},
        {label: 'Sudan', value: 'SUDAN'},
        {label: 'Rwanda', value: 'RWANDA'},
        {label: 'South Sudan', value: 'SOUTH SUDAN'},
        {label: 'All Polygons', value: 'All Polygons'},
        ],
      value: 'All Polygons',
      onChange: function(value){
        // var cfil = table.select(table('NAME_0').eq(value))
        var cfil = table.filter(ee.Filter.eq('COUNTRY', value))
        Map.clear()
        Map.centerObject(cfil, 10)
        var ndvi = clipped.normalizedDifference(['B5', 'B4']);
        Map.addLayer(ndvi.clip(cfil),viz,'country_ndvi')
        Map.add(legend)
        if (value === 'All Polygons'){
        Map.clear()
        Map.centerObject(table, 5)
        Map.addLayer (table.draw('brown'),{},'All Farms')
        var ndvi3 = clipped.normalizedDifference(['B5', 'B4']);
          Map.addLayer(ndvi3,viz,'global_ndvi')
          Map.add(legend);
        // Map.addLayer(out.clip(cfil),{}, value);
    }
         Map.addLayer(cfil.draw('ff9716'),{}, 'Farm'+ value)
        // Map.add(legend)
      },
      style: {width: '200px'}
      });
// var polygon = table.filter(ee.Filter.eq('NAME', text))
//         var area_poly = polygon.geometry().area().divide(10000).getInfo()
//         print('area ha:'+ area_poly)
//         Map.centerObject(polygon, 10)
//         Map.addLayer(polygon.draw('green'),{}, 'Farm'+text)
//       }
//     });    
    var id_number = ui.Label('Input ID Number',{fontWeight: 'bold'});
    var ID = ui.Textbox({
      placeholder: 'Enter ID',
      onChange: function(text) {
        var idnumber = text;
      },
      style: {width: '200px'}
    });
    // Panel.add(ui.Label('Enter Surname:', {fontWeight: 'bold', color: 'black'})).add(sur);
    var id_number = ui.Label('Input ID Number',{fontWeight: 'bold'});
    var ID = ui.Textbox({
      placeholder: 'Enter ID',
      onChange: function(text) {
       Map.clear()
        var polygon = table.filter(ee.Filter.eq('NAME', text))
        var area_poly = polygon.geometry().area().divide(10000).getInfo()
        print('area ha:'+ area_poly)
        Map.centerObject(polygon, 10)
        Map.addLayer(polygon.draw('black'),{}, 'Farm'+text)
        function clip(image){
          var clipped = image.clip(polygon)
          return clipped;
        }
        var lulc = cr.map(clip)
         Map.addLayer(lulc, {
                    palette: ['#282828', '#FFBB22','#FFFF4C','#F096FF','#FA0000',
                    '#B4B4B4','#F0F0F0','#0032C8','#0096A0','#FAE6A0','#58481F',
                    '#009900','#70663E','#00CC00','#4E751F','#007800','#666000',
                    '#8DB400','#8D7400','#A0DC00','#929900','#648C00','#000080']},'RAW LULC')
      }
    });
  var textbox = ui.Textbox({
  placeholder: 'Enter Farm Id here: ',
  onChange: function(text) {
    // print('So what you are saying is ' + text + '?');\
    Map.clear()
    var polygon = Tromis_ROI_spec.filter(ee.Filter.eq('NAME', text))
    // print(polygon)
    var area_poly = polygon.geometry().area().divide(10000).getInfo()
    print('area ha:'+ area_poly)
    Map.centerObject(polygon, 10)
    Map.addLayer(polygon.draw('ff9716'),{}, 'Farm'+text)
    // Map.addLayer(legend,{},'')
    // Map.addLayer(polygon.draw('green'),{}, 'Farm'+text)
    if (polygon === polygon){
        // Map.centerObject(table, 5)
        Map.addLayer (legend,{},'');
    }}
});
    var checkbox = ui.Checkbox('Show All Farms in the county', true);
    checkbox.onChange(function(checked) {
   // Shows or hides the first map layer based on the checkbox's value.
     var ndvi4 = clipped.normalizedDifference(['B5', 'B4']);
      Map.addLayer(ndvi4,viz,'global_ndvi')
    });
    // Map.addLayer(bounds.draw('ff9716'),{}, 'All Farms');
    // print(checkbox);
// Panel.add(histo2)
// Panel.add(print('area ha:'+ area_poly))
// Panel.add(all);
ui.root.add(Panel);
// *********************************************************************************************************************************************************
// End of the user interface section (for input of the user in a GUI) **************************************************************************************
// *********************************************************************************************************************************************************
// // *********************************************************************************************************************************************************
// // Functions of the script *********************************************************************************************************************************
// // *********************************************************************************************************************************************************
var runFARM = function(){
    Map.clear();
    AddButton();
    var Start_base = Start_base_select.getValue();
    var Start_base_number = ee.Number.parse(Start_base.replace(/-/g,'')).getInfo();
    var End_base = End_base_select.getValue();
    var End_base_number = ee.Number.parse(End_base.replace(/-/g,'')).getInfo();
    var Filter_ = Filter.getValue();
    var Filter_number = ee.Number.parse(countyval.replace(/-/g,'')).getInfo();
    var County_ = County.getValue();
    var County_number = ee.Number.parse(cfil.replace(/-/g,'')).getInfo();
    // var sur_ = sur.getValue();
    // var sur_number = ee.Number.parse(sur_.replace(/-/g,'')).getInfo();
    var ID_ = ID.getValue();
    var ID_number = ee.Number.parse(idnumber.replace(/-/g,'')).getInfo();
    var all_ = all.getValue();
    var all_number = ee.Number.parse(all_.replace(/-/g,'')).getInfo();
};
// // *********************************************************************************************************************************************************
// // Application Functions *********************************************************************************************************************************
// // *********************************************************************************************************************************************************
// Definition of study area
    // var country = ee.FeatureCollection("USDOS/LSIB/2013").filterMetadata('cc','equals',countryname); // Country border polygons of high accuracy
    // var studyarea = table; // The study area is set to above selection
    if (Filter === 1){
      var fil = table.filter(ee.Filter.eq('ID', county ));
      Map.addLayer (fil.draw('brown'),{}, county + 'farm');
    }
    if (Filter  === 3){
      var fil = table.filter(ee.Filter.eq('NAME', county ));
      // var polygon = Tromis_ROI_spec.filter(ee.Filter.eq('NAME', county))
      Map.addLayer (fil.draw('brown'),{}, county + 'farm');
    }    
    if (Filter === 4){
      var fil = table.filter(ee.Filter.eq('Approve', county ));
      // var polygon = Tromis_ROI_spec.filter(ee.Filter.eq('NAME', county))
      Map.addLayer (fil.draw('brown'),{}, county + 'farm');
    } 
    // // Adjustments according to above user selections
    // if (center === true){
    //   Map.centerObject(studyarea, zoomlevel);
    // }
    // if (forest_mask_select === 'No_forest_map'){
    //   var Hansen_map = ee.Image("UMD/hansen/global_forest_change_2015_v1_3").clip(studyarea);
    //   var forest_mask = Hansen_map.select('treecover2000').gte(0); // No forest map selected
    //   Map.addLayer (forest_mask,{},'No Forest map',false);
    // }
// var AddButton = function(){
//       var button = ui.Button('Run Visualizer');
//       button.style().set({
//         position: 'top-center',
//         border : '1px solid #000000',
//         color : '#0e4a1c',
//       });
//       button.onClick(function(){return runFARM()});
//       Map.add(button);
// }
// AddButton();
// set position of panel
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
// // *********************************************************************************************************************************************************
// // Start of Legend Functions *********************************************************************************************************************************
// // *********************************************************************************************************************************************************
// Create legend title
var legendTitle = ui.Label({
  value: 'Legend',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
// Add the title to the panel
legend.add(legendTitle);
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
      // return the panel
      return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal')
      });
};
//  Palette with the colors
var palette =['1b8f14', '7d8c1f', '32f12b', 'fddbc6', 'd7191c'];
// name of the legend
var names = ['Very High','High', 'Moderate','Low','Very Low'];
// Add color and and names
for (var i = 0; i < 5; i++) {
  legend.add(makeRow(palette[i], names[i]));
  }  
var pale = ['282828', 'FFBB22','FFFF4C','F096FF','FA0000',
                    'B4B4B4','F0F0F0','0032C8','0096A0','FAE6A0','58481F',
                    '009900','70663E','00CC00','4E751F','007800','666000',
                    '8DB400','8D7400','A0DC00','929900','648C00','000080']
var name = ['Very High','High', 'Moderate','Low','Very Low'];   
Panel.add(panel)
Panel.add(Header);
Panel.add(start_date)
Panel.add(Start_base_select)
Panel.add(end_date)
Panel.add(End_base_select)
Panel.add(Label_filter);
Panel.add(Filter);
Panel.add(county_filter);
Panel.add(County);
// Panel.add(sur_name)
// Panel.add(sur);
Panel.add(id_number)
Panel.add(ID);
Panel.add(checkbox)
// Panel.print('area ha:')
// add legend to map (alternatively you can also print the legend to the console)  
// Map.add(legend);
// ui.root.add(legend);
// // *********************************************************************************************************************************************************
// // End of Legend Functions *********************************************************************************************************************************
// // *********************************************************************************************************************************************************
// // *********************************************************************************************************************************************************
// // Start of Charting Functions *********************************************************************************************************************************
// // *********************************************************************************************************************************************************
// Create a second histogram
// var ndvi = ee.ImageCollection('MODIS/MOD09GA_006_NDVI')
// var histo2 = ui.Chart.image.LineChart({image:ndvi, region:table.geometry(), scale:100});
// // Create an empty panel in which to arrange widgets.
// // The layout is vertical flow by default.
// var panel = ui.Panel({style: {width: '400px'}})
//     .add(ui.Label('We are attempting to differentiate the "A" from the surrounding landscape using NDVI values from Landsat Imagery. The histogram shows a distribution of all NDVI values found within the "geometry" layer on the map.'))
//     .add(histo2);
// ui.root.add(panel);
// // *********************************************************************************************************************************************************
// // End of Charting Functions *********************************************************************************************************************************
// // *********************************************************************************************************************************************************