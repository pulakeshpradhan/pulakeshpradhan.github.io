var roi = ui.import && ui.import("roi", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -6.659576634157243,
                37.244099938249356
              ],
              [
                -6.659576634157243,
                36.84071965120075
              ],
              [
                -6.143219212282243,
                36.84071965120075
              ],
              [
                -6.143219212282243,
                37.244099938249356
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #d63000 */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[-6.659576634157243, 37.244099938249356],
          [-6.659576634157243, 36.84071965120075],
          [-6.143219212282243, 36.84071965120075],
          [-6.143219212282243, 37.244099938249356]]], null, false),
    marisma = ui.import && ui.import("marisma", "table", {
      "id": "projects/ee-digdgeografo/assets/Marisma_4326"
    }) || ee.FeatureCollection("projects/ee-digdgeografo/assets/Marisma_4326"),
    recintos = ui.import && ui.import("recintos", "table", {
      "id": "projects/ee-digdgeografo/assets/marisma_recintos_4326"
    }) || ee.FeatureCollection("projects/ee-digdgeografo/assets/marisma_recintos_4326"),
    recintos2 = ui.import && ui.import("recintos2", "table", {
      "id": "projects/ee-digdgeografo/assets/marisma_recintos2_4326"
    }) || ee.FeatureCollection("projects/ee-digdgeografo/assets/marisma_recintos2_4326");
// ///////////////////////////////////////////////////////////////
// //                    1) Import Layers of Interest           //
// ///////////////////////////////////////////////////////////////
var P1 = ee.Image('projects/ee-digdgeografo/assets/P1_Donana_max_01')
var P2 = ee.Image('projects/ee-digdgeografo/assets/P2_Donana_max_01')
var P3 = ee.Image('projects/ee-digdgeografo/assets/P3_Donana_max_01')
var P1_mk = P1.updateMask(P1.eq(1)).clip(recintos)
var P2_mk = P2.updateMask(P2.eq(1)).clip(recintos)
var P3_mk = P3.updateMask(P3.eq(1)).clip(recintos)
// ///////////////////////////////////////////////////////////////
// //      2) Begin setting up map appearance and app layers   //
// ///////////////////////////////////////////////////////////////
// //2.1) Set up general display
// //Set up a satellite background
Map.setOptions('Satellite')
// //Center the map to Guyana
Map.centerObject(roi,9)
// //Change style of cursor to 'crosshair'
Map.style().set('cursor', 'crosshair');
// //2.3) Create variables for GUI layers for each layer
// //We set each layer to "false" so the user can turn them on later
//var simHBA = ui.Map.Layer(hba,viridis,'Simard Canopy Hba',false)
var P1_ = ui.Map.Layer(P1_mk, {palette:['0A24C8'], min:0, max:1}, 'Periodo 1',false)
var P2_ = ui.Map.Layer(P2_mk, {palette:['0A89C8'], min:0, max:1}, 'Perido 2',false)
var P3_ = ui.Map.Layer(P3_mk, {palette:['71F4B7'], min:0, max:1}, 'Periodo 3',false)
// //Add these layers to our map. They will be added but not displayed
Map.add(P1_)
Map.add(P2_)
Map.add(P3_)
//Map.add(simHBA)
// ///////////////////////////////////////////////////////////////
// //      3) Set up panels and widgets for display             //
// ///////////////////////////////////////////////////////////////
// //3.1) Set up title and summary widgets
// //App title
var header = ui.Label('Máscara de máxima Inundación en la Marisma de Doñana por periodos', 
            {fontSize: '25px', fontWeight: 'bold', color: '4A997E'});
// //App summary
var text = ui.Label(
  'Esta herramienta muestra la comparativa de las máscaras de máxima inundación en la marisma de Doñana por periodos (P1: 194-1999; P2: 2000-2010; P3: 2011-2022). Para ello se han usado las imágenes Landsat (5 TM, 7 ETM+ y 8 OLI) con menos del 15% de nubes (173 imágenes P1, 177 imágenes P2 y 219 imágenes P3) sobre las que se ha calculado una máscara de nubes y el índice de agua Normalized Differece Water Index (NDWI). Finalmente se ha creado una imagen compuesta con el máximo valor de cada pixel por periodo, lo que nos da la inundación máxima obtenida en cada periodo',
    {fontSize: '15px'})
// //3.2) Create a panel to hold text
var panel = ui.Panel({
  widgets:[header, text],//Adds header and text
  style:{width: '500px',position:'middle-left'}});
// //3.3) Create variable for additional text and separators
// //This creates another panel to house a line separator and instructions for the user
var intro = ui.Panel([
  ui.Label({
    value: '___________________________________________',
    style: {fontWeight: 'bold',  color: '4A997E'},
  }),
  ui.Label({
    value:'Select layers to display.',
    style: {fontSize: '15px', fontWeight: 'bold'}
  })]);
// //Add this new panel to the larger panel we created 
panel.add(intro)
// //3.4) Add our main panel to the root of our GUI
ui.root.insert(1,panel)
// ///////////////////////////////////////////////////////////////
// //         4) Add checkbox widgets and legends               //
// ///////////////////////////////////////////////////////////////
// //4.1) Create a new label for this series of checkboxes
var extLabel = ui.Label({value:'Water Extent',
style: {fontWeight: 'bold', fontSize: '16px', margin: '10px 5px'}
});
// //4.2) Add checkboxes to our display
// //Create checkboxes that will allow the user to view the extent map for different years
// //Creating the checkbox will not do anything yet, we add functionality further 
// // in the code
var extCheck = ui.Checkbox('1984-2000').setValue(false); //false = unchecked
var extCheck2 = ui.Checkbox('2001-2011').setValue(false);// 
var extCheck3 = ui.Checkbox('2012-2022').setValue(false);
// //Extent Legend
// ///////////////
// // Set position of panel
var extentLegend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
// // The following creates and styles 1 row of the legend.
var makeRowa = function(color, name) {
      // Create the label that is actually the colored box.
      var colorBox = ui.Label({
        style: {
          backgroundColor: '#' + color,
          // Use padding to give the box height and width.
          padding: '8px',
          margin: '0 0 4px 0'
        }
      });
      // Create a label with the description text.
      var description = ui.Label({
        value: name,
        style: {margin: '0 0 4px 6px'}
      });
      // Return the panel
      return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal')
      });
};
// //Create a palette using the same colors we used for each extent layer
var paletteMAPa = [
'6D63EB',//2000
'34BFDE',//2010
'71F4B7',//2020
];
// // Name of each legend value
var namesa = ['1984-2000','2001-2011','2012-2022']; 
// // Add color and names to legend
for (var i = 0; i < 3; i++) {
  extentLegend.add(makeRowa(paletteMAPa[i], namesa[i]));
  }  
// //4.4) Add these new widgets to the panel in the order you want them to appear
panel.add(extLabel)
      .add(extCheck)
      .add(extCheck2)
      .add(extCheck3)
      .add(extentLegend)
// ///////////////////////////////////////////////////////////////
// //          5) Add functionality to widgets                  //
// ///////////////////////////////////////////////////////////////
// //For each checkbox we create function so that clicking the checkbox
// //Turns on layers of interest
// //Extent 2000
var doCheckbox = function() {
  extCheck.onChange(function(checked){
  P1_.setShown(checked)
  })
}
doCheckbox();
// //Extent 2010
var doCheckbox2 = function() {
  extCheck2.onChange(function(checked){
  P2_.setShown(checked)
  })
}
doCheckbox2();
// //Extent 2020
var doCheckbox3 = function() {
  extCheck3.onChange(function(checked){
  P3_.setShown(checked)
  })
}
doCheckbox3();
//Flooding Chart
// Set chart style properties
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
var chartStyle = {
  title: 'Flood extent (ha)',
  hAxis: {
    title: 'Periods',
    titleTextStyle: {italic: false, bold: true},
    gridlines: {color: 'FFFFFF'}
  },
  vAxis: {
    title: 'Surface (ha)',
    titleTextStyle: {italic: false, bold: true},
    gridlines: {color: 'FFFFFF'},
    format: 'short',
    baselineColor: 'FFFFFF'
  },
  legend: {position: 'none'},
  colors: 
    ['yellow', 'yellow', 'red']
  ,
  chartArea: {backgroundColor: 'EBEBEB'}
};
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ////////////////////////////////////////////////////////
// //  8) Create a dropdown menu to display graph results //
// ////////////////////////////////////////////////////////
// //Add a panel to hold graphs within main panel
var panelGraph = ui.Panel({
  style:{width: '300px',position:'middle-right'}
})
// //Create key of items for dropdown
var y2000 = '1984-2000'
var y2010 = '2001-2011'
var y2020 = '2012-2022'
// //Construct Dropdown
var graphSelect = ui.Select({
  items:['Entremuros', 'Caracoles', 'El Rincon del Pescador', 'Marismillas', 'Marisma Oriental', 'Marisma Occidental'],
  placeholder:'Choose area',
  onChange: selectLayer,
  value: 'Marisma Occidental',
  style: {position:'top-right'}
})
var constraints = []
// //Write a function that runs on change of Dropdown
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
function selectLayer(){
  var graph = graphSelect.getValue() // get value from dropdown selection
  var sel = recintos2.filter(ee.Filter.eq('Nombre', graph));
  //print(sel.propertyNames())
  // Paint all the polygon edges with the same number and width, display.
  var outline_ = empty.paint({
    featureCollection: sel,
    color: 2,
    width: 3
  })
  //Map.addLayer(outline_, {}, 'Area')
  var palette = ['000000', '00FF00', '0000FF', '#a8d52a', '#8bacdb', '#83f5c5', '#30b9fd'];
  Map.addLayer(outline_, {palette: palette, min: 1, max: 7}, graph);
  //chartPanel.reset()
  //panel.add(chartPanel)
  //chartPanel.clear()
  // //2000
  //Calculate area in Hectares
  var get2000 = P1_mk.multiply(ee.Image.pixelArea()).divide(10000).reduceRegion({
        reducer:ee.Reducer.sum(),
        geometry:recintos2.filter(ee.Filter.eq('Nombre', graphSelect.getValue())),
        scale: 30,
        maxPixels:1e13,
        tileScale: 16
        }).get('b1');
  // //Get area for the 2000 
  var feature = marisma 
  var feature2000 = feature.set('1984-2000', ee.Number(get2000))
  //print('jjj',get2000)
  // //2010
  //Calculate area in Hectares
  var get2010 = P2_mk.multiply(ee.Image.pixelArea()).divide(10000).reduceRegion({
        reducer:ee.Reducer.sum(),
        geometry:recintos2.filter(ee.Filter.eq('Nombre', graphSelect.getValue())),
        scale: 30,
        maxPixels:1e13,
        tileScale: 16
        }).get('b1');
  // //Get area for the 2010 
  var feature2010 = feature.set('2001-2011', ee.Number(get2010))
  // //2020
  // //Calculate area in Hectares
  var get2020 = P3_mk.multiply(ee.Image.pixelArea()).divide(10000).reduceRegion({
        reducer:ee.Reducer.sum(),
        geometry:recintos2.filter(ee.Filter.eq('Nombre', graphSelect.getValue())),
        scale: 30,
        maxPixels:1e13,
        tileScale: 16
        }).get('b1');
  //Get area for the 2020 
  var feature2020 = feature.set('2020', ee.Number(get2020))
  var data = ee.List([get2000, get2010, get2020])
  var chart = ui.Chart.array.values(data, 0, ['P1', 'P2', 'P3']).setOptions({
                    title: 'Water extent ' + graph,
                    colors: ['1d6b99', 'cf513e', 'orange'],
                    pointSize: 8,
                    dataOpacity: 1,
                    hAxis: {
                      'title': 'Periods',
                      titleTextStyle: {italic: false, bold: true}
                    },
                    vAxis: {
                      'title': 'Surface (ha)',
                      titleTextStyle: {italic: false, bold: true}
                    },
                    legend: {position: 'none'}
                  });
  var chartPanel = ui.Panel(chart);
  panel.add(chartPanel)
  //ui.root.widgets().reset([chartPanel])
}
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////
  //print(graph)
  //clear graph panel between selections so only one graph displays
  //We use "if else" statements to write instructions for drawing graphs
  // ////////////////////////////////////////////////////////
// //  7) Constuct graphs to measure extent for each year and Area //
// ////////////////////////////////////////////////////////
// Paint the edges with different colors and widths.
// //Add selecter and graph panel to main panel
//Create a new label
var graphLabel = ui.Label({value:'Select Marsh Area to show water surface graph',
style: {fontWeight: 'bold', fontSize: '16px', margin: '10px 5px'}
});
// //Add selecter and graph panel to main panel
panel.add(graphLabel)
      .add(graphSelect)
      //.add(chartPanel)
// Create an empty image into which to paint the features, cast to byte.
var empty = ee.Image().byte();
// Paint all the polygon edges with the same number and width, display.
  var outline = empty.paint({
    featureCollection: recintos2,
    color: 1,
    width: 3
  });
var palette = ['000000', '00FF00', '0000FF', '#a8d52a', '#8bacdb', '#83f5c5', '#30b9fd'];
Map.addLayer(outline, {palette: palette, min: 1, max: 7}, 'Areas');
//Map.centerObject(recintos, 12)
Map.setLocked(recintos, 11, 13)
//Map.addLayer(outline_)
//var sel = recintos2.filter(ee.Filter.eq('Nombre', graph));