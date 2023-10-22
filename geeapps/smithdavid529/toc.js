var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -45.028483509378276,
                48.11261012416079
              ],
              [
                -45.028483509378276,
                46.19280625664454
              ],
              [
                -41.853434681253276,
                46.19280625664454
              ],
              [
                -41.853434681253276,
                48.11261012416079
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#98ff00",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #98ff00 */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[-45.028483509378276, 48.11261012416079],
          [-45.028483509378276, 46.19280625664454],
          [-41.853434681253276, 46.19280625664454],
          [-41.853434681253276, 48.11261012416079]]], null, false);
//////////////////////////////////////////////////////////////////////////////////////
// ---------------------------- USER DATA INPUT ----------------------------------- //
//////////////////////////////////////////////////////////////////////////////////////
// The input data must be assigned to a variable named data.
// For raster inputs, import asset as image into script 
// The image must have two bands.  Name the band of the binary variable Y.  Name the band of the rank variable X.
// EXAMPLE 1:  Book example
// Here is an example of an image input and a way to rename the X and Y bands
var data = ee.Image("projects/ee-tocassets/assets/Xdist_Ygain_1971to1985");
var X = data.select("b1").rename("X");
var Y = data.select("b2").rename("Y");
// You may need to mask your image.  Here is how you mask with a binary image.
var mask = ee.Image("projects/ee-tocassets/assets/mask_1971_nonbuilt");
var data = X.addBands(Y).updateMask(mask);
// The image must be sampled and assigned to a variable named data to run
var data = data.sample({geometries:true});
var gain1985 = ee.Image("projects/ee-tocassets/assets/Xdist_Ygain_1971to1985").select("b2");
var dist71built = ee.Image("projects/ee-tocassets/assets/Xdist_Ygain_1971to1985").select("b1");
Map.addLayer(gain1985,{palette: ["black","pink"], min:0, max:1},"Built Gain 1985");
Map.addLayer(dist71built,{min:0,max:900},"Distance to 1971 Built");
Map.addLayer(mask,{palette: ["purple","black"],min:0,max:1},"Built in 1971");
Map.centerObject(data);
// EXAMPLE 2:  Random inputs
/*
// Here is example data for a case where X and Y are random.
var X = ee.Image.random(3).reproject({crs: "EPSG:4326", scale: 5000}).multiply(10000).log().multiply(100).rename("X").clip(geometry);
var Y = ee.Image.random().reproject({crs: "EPSG:4326", scale: 5000}).round().clip(geometry).rename("Y");
var data = Y.addBands(X);
var data = data.sample({geometries:true});
*/
// EXAMPLE 3:  Perfect classification
// Here is example data for a case where there is a perfect classification.
/*
var X = ee.Image.random().reproject({crs: "EPSG:4326", scale: 5000}).rename("X").clip(geometry);
var Y = X.round().rename("Y");
var data = Y.addBands(X.multiply(100));
var data = data.sample({geometries:true});
*/
/*
// EXAMPLE 4:  High severity fire Random Forest regression output
// The input data must be assigned to a variable named data.
// For feature inputs, import asset as FeatureCollection into script 
// The FeatureCollection must have two properties named X and Y.  
// Name the property of the binary variable Y.  Name the property of the rank variable X.
var data = ee.FeatureCollection("users/mtlazarz/TOC_curve_fireExample");
*/
//////////////////////////////////////////////////////////////////////////////
//  Do not edit // Do not edit // Do not edit // Do not edit // Do not edit //
//////////////////////////////////////////////////////////////////////////////
// ------------------------------- Functions ------------------------------ //
// Function takes user inputted number of thresholds and plotting order
function compute(threshold, order, digits){
    // Find the minimum and maximum values of rank varible
    var min = data.reduceColumns(ee.Reducer.min(),["X"]).get("min");
    var max = data.reduceColumns(ee.Reducer.max(),["X"]).get("max");
    // Create list of thresholds from min X to max X using number of thresholds
    var cutofflist = ee.List.sequence(0, max, null, threshold);  
    // Number of observations in data
    var extent = ee.Number(data.size());
    // Total number of presence points in Y-- vertical bound
    var bound = ee.Number(data.filter(ee.Filter.eq('Y', 1)).size()).getInfo();
    // Total number of absence points in Y
    var abs_Y = ee.Number(data.filter(ee.Filter.eq('Y', 0)).size()).getInfo();
    // Function to calculate confusion matrix at every threshold
    var TOCfunction = function (cutoff) {
        var decimals = ee.String(digits).getInfo();
        cutoff = ee.Number.parse(ee.Number(cutoff).format("%." + decimals + "f")); // format rounds to 2 decimal places
        // Observed presence points and size of presence in Y
        var present = data.filter(ee.Filter.eq('Y', 1));
        var p_size = ee.Number(present.size());
        // Observed absence points and size of absence in Y
        var absent = data.filter(ee.Filter.eq('Y', 0));
        var a_size = ee.Number(absent.size());
        // Count of Hits, Misses, False Alarms, and Correct Rejections
        // These are dependent on ascending or descending
        var H  = ee.Number(ee.Algorithms.If(order, ee.Number(present.filter(ee.Filter.gte('X', cutoff)).size()),
                                                   ee.Number(present.filter(ee.Filter.lte('X', cutoff)).size())));
        var M  = ee.Number(ee.Algorithms.If(order, ee.Number(present.filter(ee.Filter.lt('X', cutoff)).size()),
                                                   ee.Number(present.filter(ee.Filter.gt('X', cutoff)).size())));
        var FA = ee.Number(ee.Algorithms.If(order, ee.Number(absent.filter(ee.Filter.gte('X', cutoff)).size()),
                                                   ee.Number(absent.filter(ee.Filter.lte('X', cutoff)).size())));
        var CR = ee.Number(ee.Algorithms.If(order, ee.Number(absent.filter(ee.Filter.lt('X', cutoff)).size()),
                                                   ee.Number(absent.filter(ee.Filter.gt('X', cutoff)).size())));
        // Count of Hits + False Alarms
        var H_FA = H.add(FA);
        // Top -- This is the size of presence in Y
        var top = p_size;
        // Maximum line = 1:1 line -- This is the Hits + False Alarms
        var max = H_FA.min(top);
        // Uniform line = Uniform Hit Intensity
        var uni = H_FA.multiply(top.divide(extent));
        // Minimum line
        var H_M = H.add(M);
        var min = ee.Number(0).max(H_FA.add(H_M).subtract(extent));
        // True Positive Rate and False Positive Rate for ease of AUC calculation
        var TPR = H.divide(p_size);
        var FPR = FA.divide(FA.add(CR));
        // Row list -- Create list of elements at threshold to plot TOC curve
        var row = ee.List([H_FA, max, min, top, max, min, uni, H, cutoff]);
        // Return a feature will all elements to plot TOC and calculate AUC
        return ee.Feature(null, {'row': row, 
                                 'FPR': FPR, 
                                 'TPR': TPR, 
                                 'Threshold': cutoff, 
                                 'H': H, 
                                 'M': M, 
                                 'FA': FA, 
                                 'CR': CR, 
                                 'H_FA': H_FA});
    }; // end TOCfunction
    // --Map TOC function using list of thresholds--
    var output = ee.FeatureCollection(cutofflist.map(TOCfunction));
    // Create Parallelogram corners
    // origin
    var bearing = ee.Feature(null, {'row': [0, 0, 0, null, 0, 0, null, null, null], 
                                 'FPR': null, 
                                 'TPR': null, 
                                 'Threshold': null, 
                                 'H': null, 
                                 'M': null, 
                                 'FA': null, 
                                 'CR': null, 
                                 'H_FA': 0});
    // top right corner
    var bearing2 = ee.Feature(null, {'row': [extent, bound, bound, null, bound, bound, null, null, null], 
                                 'FPR': null, 
                                 'TPR': null, 
                                 'Threshold': null, 
                                 'H': null, 
                                 'M': null, 
                                 'FA': null, 
                                 'CR': null, 
                                 'H_FA': extent});
    // correct corner
    var bearing3 = ee.Feature(null, {'row': [bound, bound, null, null, bound, null, null, null, null], 
                                 'FPR': null, 
                                 'TPR': null, 
                                 'Threshold': null, 
                                 'H': null, 
                                 'M': null, 
                                 'FA': null, 
                                 'CR': null, 
                                 'H_FA': bound});
    // incorrect corner
    var bearing4 = ee.Feature(null, {'row': [abs_Y, null, 0, null, null, 0, null, null, null], 
                                 'FPR': null, 
                                 'TPR': null, 
                                 'Threshold': null, 
                                 'H': null, 
                                 'M': null, 
                                 'FA': null, 
                                 'CR': null, 
                                 'H_FA': abs_Y});
    var bearings = ee.FeatureCollection([bearing, bearing2, bearing3, bearing4]);
    output = output.merge(bearings).sort("H_FA");
    // --Create datatable with row lists--
    // These are the data
    var rows = output.aggregate_array('row');
    // These are the column names and types
    var columnHeader = ee.List([[{label: 'H + FA', role: 'domain', type: 'number'},
                                 {label: 'Max_area', role: 'data', type: 'number'},
                                 {label: 'Min_area', role: 'data', type: 'number'},
                                 {label: 'Hits + Misses', role: 'data', type: 'number'},
                                 {label: '1:1 line', role: 'data', type: 'number'},
                                 {label: 'Minimum', role: 'data', type: 'number'},
                                 {label: 'Uniform', role: 'data', type: 'number'},
                                 {label: 'Hits', role: 'data', type: 'number'},
                                 {label: 'Cutoff', role: 'annotation', type: 'number'}]]);
    // Combine data with header
    rows = columnHeader.cat(rows);
    // ----------------------------- Chart Styles ------------------------- //
    // Text Styles
    var titleStyle = {color: 'black', fontSize: 20, bold: true, italic: false};
    var axisTitleStyle = {color: 'black', fontSize: 14, bold: false, italic: false, fontFamily: 'monospace'};
    var axisLabelStyle = {color: 'black', fontSize: 10, bold: false, italic: false};
    var noStyle = {fontSize: 0.01};
    // Line Styles
    var maxLine = {type: 'line', lineWidth: 1.5, lineDashStyle: [6, 4], color: 'e37d05'};
    var minLine = {type: 'line', lineWidth: 1.5, lineDashStyle: [2, 4], color: 'e37d05'};
    // Area Styles
    var maxArea = {type: 'area', areaOpacity: 1, color: 'FFFFFF', visibleInLegend: false};
    var minArea = {type: 'area', areaOpacity: 1, color: 'F0F0F0', visibleInLegend: false};
    // Axis Styles
    var vaxis_hidden = {gridlines: {count: 0}, viewWindow: {max: bound, min:0}, textStyle: noStyle};
    // -------------------------- Create TOC Curve -------------------------- //
    rows.evaluate(function(rows){
        // -- Create Chart --
        var chart = ui.Chart(rows).setChartType('LineChart')
                    .setOptions({fontSize: 10, //title: "Total Operating Characteristic (TOC) Curve",
                                 interpolateNulls: true,
                                 titleTextStyle: titleStyle, chartArea: {backgroundColor: 'F0F0F0'},
                                 padding: '0px', margin: '0px', 
                                 width: '600px', height: '600px', legend: {textStyle: {fontSize: 11}},
                                 series: {0: maxArea, 
                                          1: minArea,
                                          2: {type: 'line', lineWidth: 4, color: '178219'}, // Hits + Misses line
                                          3: maxLine, 
                                          4: minLine,
                                          5: {type: 'line', lineWidth: 1.5, color: 'FF0000'}, // Uniform line
                                          6: {targetAxisIndex: 1, type: 'line', lineWidth: 2, pointSize: 7, pointShape: 'triangle', color: '1d6b99'}, // Hits line
                                },
                                hAxis: {title: 'Hits + False Alarms', gridlines: {count: 0}, viewWindow: {max: extent, min:0},
                                        titleTextStyle: axisTitleStyle, textStyle: axisLabelStyle, format: 'short'
                                },
                                vAxes: {0: {title: 'Hits', gridlines: {count: 0}, viewWindow: {max: bound, min:0},
                                            titleTextStyle: axisTitleStyle, textStyle: axisLabelStyle, format: 'short'},
                                        1: vaxis_hidden, 2: vaxis_hidden, 3: vaxis_hidden, 4: vaxis_hidden, 5: vaxis_hidden, 6: vaxis_hidden},
                                });
        // -- Calculate AUC -- source: https://groups.google.com/d/msg/google-earth-engine-developers/52ASlA15yLg/E3exyfyTGQAJ original code by Guy Ziv 
        var X = ee.Array(output.aggregate_array('FPR'));
        var Y = ee.Array(output.aggregate_array('TPR'));
        var Xk_m_Xkm1 = X.slice(0, 1).subtract(X.slice(0, 0, -1));
        var Yk_p_Ykm1 = Y.slice(0, 1).add(Y.slice(0, 0, -1));
        var AUC = ee.Number(Xk_m_Xkm1.multiply(Yk_p_Ykm1).multiply(0.5).reduce('sum',[0]).abs().toList().get(0))
                                     .multiply(Math.pow(10,4)).floor().divide(Math.pow(10,4)).getInfo();
        // Create label to display AUC
        var auc_result = ui.Panel([ui.Label({value: "Area Under Curve = " + AUC,
                                             style: {fontSize: '12px', fontWeight: 'bold', margin: '0px 0px 8px 8px'}}),
                                  ]);      
        // Add TOC Chart and AUC calculation to panel
        panel.widgets().set(1, auc_result);  
        panel.widgets().set(2, chart);
        // Function to change map display when clicking threshold
        function action(i){
            Map.clear();
            var feat = output.filterMetadata("H_FA", "equals", i).first();
            var cutoff = feat.get("Threshold").getInfo();
            var h = feat.get("H").getInfo();
            var m = feat.get("M").getInfo();
            var fa = feat.get("FA").getInfo();
            var cr = feat.get("CR").getInfo();
            var count = [h,m,fa,cr];
            // Observed presence points in Y
            var present = data.filter(ee.Filter.eq('Y', 1));
            // Observed absence points in Y
            var absent = data.filter(ee.Filter.eq('Y', 0));
            // Display Hits, Misses, False Alarms, and Correct Rejections at threshold on map
            var H  = ee.FeatureCollection(ee.Algorithms.If(order, present.filter(ee.Filter.gte('X', cutoff)),
                                                                  present.filter(ee.Filter.lte('X', cutoff))));
            var M  = ee.FeatureCollection(ee.Algorithms.If(order, present.filter(ee.Filter.lt('X', cutoff)),
                                                                  present.filter(ee.Filter.gt('X', cutoff))));
            var FA = ee.FeatureCollection(ee.Algorithms.If(order, absent.filter(ee.Filter.gte('X', cutoff)),
                                                                  absent.filter(ee.Filter.lte('X', cutoff))));
            var CR = ee.FeatureCollection(ee.Algorithms.If(order, absent.filter(ee.Filter.lt('X', cutoff)),
                                                                  absent.filter(ee.Filter.gt('X', cutoff))));
            Map.addLayer(mask,{palette: ["purple","black"],min:0,max:1},"Built in 1971",false);
            var gain1985 = ee.Image("projects/ee-tocassets/assets/Xdist_Ygain_1971to1985").select("b2");
            Map.addLayer(gain1985,{palette: ["black","pink"], min:0, max:1},"Built Gain 1985",false);
            Map.addLayer(H.draw({color: '0C00FF', pointRadius: 3}), {}, "Hits");
            Map.addLayer(M.draw({color: 'FF0C00', pointRadius: 3}), {}, "Misses");
            Map.addLayer(FA.draw({color: 'FFA600', pointRadius: 3}), {}, "False Alarms");
            Map.addLayer(CR.draw({color: '757575', pointRadius: 3}), {}, "Correct Rejections");
            Map.centerObject(data);
            // Create Legend Panel
            var legend = ui.Panel({style: {width: '200px', position: 'bottom-left', padding: '10px 10px'}});
            // Create threshold label for legend
            var thresholdLabel = ui.Label({value: 'Threshold:  ' + cutoff,
                                           style: {fontSize: '12px', margin: '4 4 4 4', padding: '0'}});
            // Creates and styles 1 row of the legend at a time
            var makeRow = function(color, name, count) {
                          // Create legend patch
                          var colorBox = ui.Label({
                                         style: {backgroundColor: color, padding: '8px', margin: '0 0 4px 0'}});
                          // Create legend labels
                          var description = ui.Label({value: name,
                                            style: {fontSize: '12px', margin: '0 0 4px 6px'}});
                          // Create legend labels
                          var countLabel = ui.Label({value: count,
                                            style: {fontSize: '12px', margin: '0 0 4px 6px'}});
                          // Return Legend line
                          return ui.Panel({widgets: [colorBox, description, countLabel],
                                           layout: ui.Panel.Layout.Flow('horizontal')});};
            // Legend palette 
            var palette = ee.List(['0C00FF', 'FF0C00', 'FFA600', '757575']);
            // Legend Labels
            var names = ee.List(['Hits', 'Misses', 'False Alarms', 'Correct Rejections']);
            // Add color and and names
            for (var j = 0; j < 4; j++) {
                var p = palette.getString(j).getInfo();
                var n = names.getString(j).getInfo();
                var c = " ("+ count[j] + ")"
                legend.add(makeRow(p, n, c));
                }
            // Add Legend to the map
            Map.add(legend.add(thresholdLabel));
        } // end action function      
    // Initiate map element function on click
    chart.onClick(action);
})} // End rows evalutate function // End compute function
// ------------------------------- User Parameters ---------------------------------- //
// Create main panel for user inputs and TOC curve 
var panel = ui.Panel({layout: ui.Panel.Layout.flow('vertical'), style: {width: '700px'}});
// Insert Panel
ui.root.insert(0, panel);
// Function to take user inputs and map TOC computation
function user_input() {
  var description = ui.Panel({widgets: [ui.Label("Total Operating Characteristic (TOC) Curve GEE Explorer", {fontSize: '16px', margin: "10px 0 0 10px", fontWeight: "bold"}), 
                             ui.Label("This Application Uses Input data from 'Metrics That Make a Difference' by Robert Pontius.", {fontSize: '10px', margin: "10px 0 0 10px"}),
                             ui.Label("User Guide and Tutorial Document.", {color:'Blue',fontSize:'10px', margin: "5px 0 0 10px"}) 
                             .setUrl("https://docs.google.com/document/d/1GVoOwiLy9rzrNpR2q86xvMfHKycvJpwwA_vtMBLUKCc/edit?usp=sharing",{fontSize: '10px', margin: "10px 0 0 10px"}),
                             ui.Label("Section 6 of the help document contains information specific to this tutorial application.", {fontSize: '10px', margin: "5px 0 0 10px"}),
                              ]});
  // Widget for user input of number of thresholds
  var threshold;
  var thres_text = ui.Textbox({
  placeholder: 'Number of Thresholds',
  onChange: function(text){
    var x = ee.Number.parse(text);
    threshold = x}
  });
  // Widget for user input of number of digits in threshold label
  var digits;
  var digits_text = ui.Textbox({
  placeholder: 'Decimal places for labels',
  onChange: function(text){
    var x = ee.Number.parse(text);
    digits = x}
  });
  // Widget for user input of ascending or descending order
  var order;
  var order_dict = {
  Descending: [1],
  Ascending: [0]
  };
  var select_order = ui.Select({
  items: Object.keys(order_dict),
  onChange: function(key) {
    var x = order_dict[key][0];
    order = x;
  }
  });
  select_order.setPlaceholder('Select Ascending or Descending X ...');
  // Widget for run button
  var run_button = ui.Button({label:"Run", 
                              onClick: function(){compute(threshold, order, digits)}, disabled: false});
  var user_panel = ui.Panel([select_order, thres_text, digits_text, run_button], ui.Panel.Layout.Flow('horizontal'));
  // Add user input widgets
  return ui.Panel([description, user_panel], ui.Panel.Layout.Flow('vertical'));
} // end user_input function
// ------------------ Initialize panel UI -------------------- //
function init() {
  panel.widgets().set(0, user_input());
  return panel;
}
var panels = init();
//////////////////////////////////////////////////////////////////////
// End of script // End of script // End of script // End of script //
//////////////////////////////////////////////////////////////////////