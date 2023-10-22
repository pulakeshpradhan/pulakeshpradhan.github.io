var mod13 = ee.ImageCollection("MODIS/006/MOD13Q1"),
    xlglm = ee.FeatureCollection("users/sunyilin/xlglm_entire"),
    abagaqi = ee.FeatureCollection("users/sunyilin/abagaqi"),
    dongwuzhumuqinqi = ee.FeatureCollection("users/sunyilin/dongwuzhumuqinqi"),
    duolunxian = ee.FeatureCollection("users/sunyilin/duolunxian"),
    erlianhaoteshi = ee.FeatureCollection("users/sunyilin/erlianhaoteshi"),
    suniteyouqi = ee.FeatureCollection("users/sunyilin/suniteyouqi"),
    sunitezuoqi = ee.FeatureCollection("users/sunyilin/sunitezuoqi"),
    taipushiqi = ee.FeatureCollection("users/sunyilin/taipushiqi"),
    xianghuangqi = ee.FeatureCollection("users/sunyilin/xianghuangqi"),
    xilinhaoteshi = ee.FeatureCollection("users/sunyilin/xilinhaoteshi"),
    xiwuzhumuqinqi = ee.FeatureCollection("users/sunyilin/xiwuzhumuqinqi"),
    zhenglanqi = ee.FeatureCollection("users/sunyilin/zhenglanqi"),
    zhengxiangbaiqi = ee.FeatureCollection("users/sunyilin/zhengxiangbaiqi");
// Map.centerObject(xlglm,8);
// Map.addLayer(xlglm,{},'xlglm',true,0.1);
/*
Introduction: the following scripts are supplementary materials
Coder: Yilin Sun
Affiliation: School of Earth Sciences and Surveying and Mapping Engineering, China University of Mining and Technolog, Beijing, 11413
E-mail: sun_yilin@yeah.net
*/
var Map_panel = ui.Map();
var Center = Map_panel.setCenter(116.111,43.915,7);// set the center position
var layers = Map_panel.layers();
/*
 * Panel setup
 */
// Create a panel with vertical flow layout, which could hold title, introduction text, chart and legend components.
var Panel = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
  style: {width: '450px'}
});
// Create an intro panel with labels.
var intro = ui.Panel([
  ui.Label({value:'Grassland Monitoring System of Xilingol League V1.0',
          style:{fontWeight: 'bold',fontSize:'24px',color:'green'}}),
  ui.Label('Note:Developed and maintained by Dr. Sun, Yilin.'),
  ui.Label('E-mail: sun_yilin@yeah.net.')]);
// Creat the first choice
var nu_1 = ui.Panel([
  ui.Label('1) Please select an area',{fontWeight: 'bold',color:'red'})
  ]);
Panel.add(intro).add(nu_1); //sort by the input order
// Set a empty global variable to receive the return value 'TH_boundary'.
var TH_boundary=[];
// Create a ui.Select widget for area selection. This is a dictionary.
var places = {
  Entire_grass: xlglm,
  Abagaqi:abagaqi,
  Dongwuzhumuqinqi:dongwuzhumuqinqi,
  Duolunxian:duolunxian,
  Erlianhaoteshi:erlianhaoteshi,
  Suniteyouqi:suniteyouqi,
  Sunitezuoqi:sunitezuoqi,
  Taipushiqi:taipushiqi,
  Xianghuangqi:xianghuangqi,
  Xilinhaoteshi:xilinhaoteshi,
  Xiwuzhumuqinqi:xiwuzhumuqinqi,
  Zhenglanqi:zhenglanqi,
  Zhengxiangbaiqi:zhengxiangbaiqi
};
var Select_Area = ui.Select({
  placeholder: 'Select an area...',//show the text when no choice
  items: Object.keys(places),
  onChange: function(key) {
    // Convert TH_table to geometry
    TH_boundary = ee.FeatureCollection(places[key]).geometry().buffer(-250); // turn to a geometry
    return TH_boundary;
  }
});
Panel.add(Select_Area);
var nu_2 = ui.Panel([
  ui.Label('2) Please input the study time',{fontWeight:'bold', color:'red'})
  ])
Panel.add(nu_2)
// define the format of the input date
var start_time = ui.Panel([
  ui.Label("Start date(Format:'2020-01-01')")])
Panel.add(start_time)
// define a textbox to choose the date
var start_time_textbox = ui.Textbox('XXXX-XX-XX','2020-01-01')
Panel.add(start_time_textbox)
// end time
var end_time = ui.Panel([
  ui.Label("End date(Format:'2020-12-31')")])
Panel.add(end_time)
var end_time_textbox = ui.Textbox('XXXX-XX-XX','2020-12-31');
Panel.add(end_time_textbox)
var nu_3 = ui.Panel([
  ui.Label('3) Calculate the mean of NDVI',{fontWeight:'bold', color:'red'})
  ])
Panel.add(nu_3)
// NDVI
var ndvi_mean_button = ui.Button({
  label:'Calculate NDVI mean value',
  onClick: function() {
    start_time = start_time_textbox.getValue();
    end_time = end_time_textbox.getValue();
    var mod13_filter = mod13.filterBounds(xlglm)
                        .filterDate(start_time,end_time)
                        .select("NDVI");
    //clip the singel image function
    function imageCllection_clip(image){
      var image1 = image.clip(TH_boundary);
      return image1;}
    var mean_clip_img = mod13_filter.map(imageCllection_clip); //Circular cut
    var mean_img= mean_clip_img.reduce(ee.Reducer.mean()).rename('Mean_NDVI'); // Calculate the mean value
    var mean_img_nor = mean_img.multiply(0.0001);
    var mean_img_layer = mean_img_nor.visualize({min:-1,max:1, palette:'e32636,ef5854,efc300,ffdd27,fff94a,b8f237,9cd609,7dd100'});
    var compositeLayer = ui.Map.Layer(mean_img_layer).setName('Mean_NDVI'); // visualize the layer
    layers.add(compositeLayer); //add the layer
    // set an inspector in the panel with the 'historic'
    var inspector = ui.Panel({
      layout: ui.Panel.Layout.flow('horizontal')
    });
    inspector.add(ui.Label('Please click to get pixel value'));
    // add the inspector to the map
    Map_panel.add(inspector);
    // Set the default map's cursor to a "crosshair".
    Map_panel.style().set('cursor', 'crosshair'); 
    // Register a callback on the map to be invoked when the map is clicked.
    Map_panel.onClick(function(coords) {
      // Clear the panel and show a loading message.
      inspector.clear();
      inspector.style().set('shown', true);
      inspector.add(ui.Label('Loading...', {color: 'gray'}));
      // Compute the alage bloom occurrence frequency; a potentially long-running server operation.
      var point = ee.Geometry.Point(coords.lon, coords.lat);
      var sampledPoint = mean_img_nor.select('Mean_NDVI').reduceRegion(ee.Reducer.mean(), point, 250);
      var computedValue = sampledPoint.get('Mean_NDVI');
      //print(sampledPoint);
      // Request the value from the server and use the results in a function.
      computedValue.evaluate(function(result) {
        inspector.clear();
        // Add a label with the results from the server.
        inspector.add(ui.Label({
          value: 'NDVI value: ' + result.toFixed(6), // set the decimal digits
          style: {stretch: 'vertical'}
        }));
        // Add a button to hide the Panel.
        inspector.add(ui.Button({
          label: 'Close',
          onClick: function() {
            inspector.style().set('shown', false);
          }
        }));
      });
    });
  }
  })
Panel.add(ndvi_mean_button)
// Create a color bar
var vis = {min: -1, max: 1, palette: 'e32636,ef5854,efc300,ffdd27,fff94a,b8f237,9cd609,7dd100'}; // set the property
function makeColorBarParams(palette) {
  return {
    bbox: [0, 0, 1, 0.1],
    dimensions: '100x10',
    format: 'png',
    min: -1,
    max: 1,
    palette: palette,
  };
}
var colorBar_1 = ui.Thumbnail({ //color bar
  image: ee.Image.pixelLonLat().select(0), 
  params: makeColorBarParams(vis.palette),
  style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
});
var legendLabels_1 = ui.Panel({
  widgets: [
    ui.Label(vis.min, {margin: '4px 8px'}),
    ui.Label(
        ((vis.max + vis.min) / 2),
        {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
    ui.Label(vis.max, {margin: '4px 8px'})
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
var legend_title1 = ui.Label({ //label
  value:'Legend: Mean NDVI',
  style:{fontWeight:'bold'}
});
var legendPanel_1 = ui.Panel([legend_title1, colorBar_1,legendLabels_1]);
//inspectorPanel.widgets().set(3, legendPanel);
Panel.add(legendPanel_1);
//FVC
var fvc_mean_button = ui.Button({
  label:'Calculate FVC mean value',
  onClick: function(){
    start_time = start_time_textbox.getValue();
    end_time = end_time_textbox.getValue();
    var mod13_filter = mod13.filterBounds(xlglm)
                            .filterDate(start_time, end_time)
                            .select("NDVI");
    var mean_img = mod13_filter.reduce(ee.Reducer.mean()).clip(TH_boundary).rename('Mean_NDVI'); //rename the band of the image
    // sort and get the percentage
    var num = mean_img.reduceRegion({
        reducer:ee.Reducer.percentile([1,99]),
        geometry:TH_boundary,
        scale:250,
        maxPixels:1e13
      })
    var ndvi_1 = ee.Number(num.get('Mean_NDVI_p1')); // get the minimum cutoff value
    var ndvi_99 = ee.Number(num.get('Mean_NDVI_p99')); // get the maximum cutoff value
    // var great_part = mean_img.gt(ndvi_1);
    // var less_part = mean_img.lt(ndvi_99);
    // var middle_part = ee.Image(1).subtract(great_part).subtract(less_part);
    var temp_fvc = mean_img.subtract(ndvi_1).divide(ndvi_99.subtract(ndvi_1)).rename('Mean_FVC');
    // var FVC = ee.Image(1).multiply(great_part).add(ee.Image(0).multiply(less_part)).add(temp_fvc.multiply(middle_part));
    function fvc_class(image){
      // modify the band name
      var fvc1 = temp_fvc.select('Mean_FVC').rename('fvc1');
      var fvc2 = temp_fvc.select('Mean_FVC').rename('fvc2');
      var fvc3 = temp_fvc.select('Mean_FVC').rename('fvc3');
      var fvc4 = temp_fvc.select('Mean_FVC').rename('fvc4');
      var fvc5 = temp_fvc.select('Mean_FVC').rename('fvc5');
      // get the image data
      fvc1 = fvc1.updateMask(fvc1.lte(0.2));
      fvc2 = fvc2.updateMask(fvc2.gte(0.2)).updateMask(fvc2.lte(0.4));
      fvc3 = fvc3.updateMask(fvc3.gte(0.4)).updateMask(fvc3.lte(0.6));  
      fvc4 = fvc4.updateMask(fvc4.gte(0.6)).updateMask(fvc4.lte(0.8));  
      fvc5 = fvc5.updateMask(fvc5.gte(0.8)).updateMask(fvc5.lte(1));
      return image.addBands([fvc1,fvc2,fvc3,fvc4,fvc5]); // return the all class bands
    }
    var FVC_class = fvc_class(temp_fvc); // get the result
    var fvc1_vis = {palette:'e32636'}; // set the visualise paraments
    var fvc2_vis = {palette:'ef5854'};
    var fvc3_vis = {palette:'fff94a'};
    var fvc4_vis = {palette:'9cd609'};
    var fvc5_vis = {palette:'7dd100'};
    var fvc1_vis_layer = FVC_class.select('fvc1').visualize(fvc1_vis); // visualize
    var compositeLayer1 = ui.Map.Layer(fvc1_vis_layer).setName("fvc1");
    var fvc2_vis_layer = FVC_class.select('fvc2').visualize(fvc2_vis);
    var compositeLayer2 = ui.Map.Layer(fvc2_vis_layer).setName("fvc2");
    var fvc3_vis_layer = FVC_class.select('fvc3').visualize(fvc3_vis);
    var compositeLayer3 = ui.Map.Layer(fvc3_vis_layer).setName("fvc3");
    var fvc4_vis_layer = FVC_class.select('fvc4').visualize(fvc4_vis);
    var compositeLayer4 = ui.Map.Layer(fvc4_vis_layer).setName("fvc4");
    var fvc5_vis_layer = FVC_class.select('fvc5').visualize(fvc5_vis);
    var compositeLayer5 = ui.Map.Layer(fvc5_vis_layer).setName("fvc5");
    layers.add(compositeLayer1);
    layers.add(compositeLayer2);
    layers.add(compositeLayer3);
    layers.add(compositeLayer4);
    layers.add(compositeLayer5);
    //////////////////////////////// Create a legend of VCI level /////////////////////////////////
    // Create the palatte and VCI name dictionaries.
    var palette = ['e32636','ef5854','fff94a','9cd609','7dd100'];
    var names = ['fvc1','fvc2','fvc3','fvc4','fvc5'];
    // Create the panel for the legend items.
    var panel_VCI_legend = ui.Panel({
      style: {
        position: 'top-right',
        padding: '8px 15px'
      }
    });
    // Create and add the legend title.
    var legendTitle = ui.Label({
      value: 'Legend of fvc level',
      style: {
        fontWeight: 'bold',
        fontSize: '18px',
        margin: '0 0 4px 0',
        padding: '0'
      }
    });
    panel_VCI_legend.add(legendTitle);
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
    for (var i = 0; i < 5; i++) {
      panel_VCI_legend.add(makeRow(palette[i], names[i]));
    }
    Map_panel.add(panel_VCI_legend);    
    // var temp_fvc_layer = temp_fvc.visualize({min:0, max:1, palette:'f12300,ffed08,006400'}) //set the color
    // var compositeLayer = ui.Map.Layer(temp_fvc_layer).setName("Mean_FVC");
    // layers.add(compositeLayer);
    // set an inspector in the panel with the 'historic'
    var inspector = ui.Panel({
      layout: ui.Panel.Layout.flow('horizontal')
    });
    inspector.add(ui.Label('Please click to get pixel value'));
    // add the inspector to the map
    Map_panel.add(inspector);
    // Set the default map's cursor to a "crosshair".
    Map_panel.style().set('cursor', 'crosshair'); 
    // Register a callback on the map to be invoked when the map is clicked.
    Map_panel.onClick(function(coords) {
      // Clear the panel and show a loading message.
      inspector.clear();
      inspector.style().set('shown', true);
      inspector.add(ui.Label('Loading...', {color: 'gray'}));
      // Compute the alage bloom occurrence frequency; a potentially long-running server operation.
      var point = ee.Geometry.Point(coords.lon, coords.lat);
      var sampledPoint = temp_fvc.select('Mean_FVC').reduceRegion(ee.Reducer.mean(), point, 250);
      var computedValue = sampledPoint.get('Mean_FVC');
      //print(sampledPoint);
      // Request the value from the server and use the results in a function.
      computedValue.evaluate(function(result) {
        inspector.clear();
        // Add a label with the results from the server.
        inspector.add(ui.Label({
          value: 'FVC value: ' + result.toFixed(6), // set the decimal digits
          style: {stretch: 'vertical'}
        }));
        // Add a button to hide the Panel.
        inspector.add(ui.Button({
          label: 'Close',
          onClick: function() {
            inspector.style().set('shown', false);
          }
        }));
      });
    });
    /*
    * Zoom box setup
    */
    // Create a map to be used as the zoom box.
    var vis_1 = {min:0, max:1, palette:'f12300,ffed08,006400'};
    var zoomBox = ui.Map({style: {stretch: 'both', shown: false}})
        .setControlVisibility(false);
    zoomBox.addLayer(temp_fvc, vis_1);
    // Update the center of the zoom box map when the base map is clicked.
    Map_panel.onClick(function(coords) {
      centerZoomBox(coords.lon, coords.lat);
    });
    var centerZoomBox = function(lon, lat) {
      instructions.style().set('shown', false);
      zoomBox.style().set('shown', true);
      zoomBox.setCenter(lon, lat, 12);
      var bounds = zoomBox.getBounds();
      var w = bounds[0], e = bounds [2];
      var n = bounds[1], s = bounds [3];
      var outline = ee.Geometry.MultiLineString([
        [[w, s], [w, n]],
        [[e, s], [e, n]],
        [[w, s], [e, s]],
        [[w, n], [e, n]],
      ]);
      var layer = ui.Map.Layer(outline, {color: '000000'}, 'Zoom Box Bounds');
      Map_panel.layers().set(1, layer);
    };
    // Add a label and the zoom box map to the default map.
    var instructions = ui.Label('Click the map to see an area in detail.', {
      stretch: 'both',
      textAlign: 'center',
      backgroundColor: '#d3d3d3'
    });
    var panel = ui.Panel({
      widgets: [zoomBox, instructions],
      style: {
        position: 'bottom-right',
        height: '230px',
        width: '230px',
      }
    });
    Map_panel.add(panel);
  }
})
Panel.add(fvc_mean_button)
// Create a color bar
var vis = {min: 0, max: 1, palette: 'f12300,ffed08,006400'}; // set the property
function makeColorBarParams(palette) {
  return {
    bbox: [0, 0, 1, 0.1],
    dimensions: '100x10',
    format: 'png',
    min: 0,
    max: 1,
    palette: palette,
  };
}
var colorBar_2 = ui.Thumbnail({ //color bar
  image: ee.Image.pixelLonLat().select(0), 
  params: makeColorBarParams(vis.palette),
  style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
});
var legendLabels_2 = ui.Panel({
  widgets: [
    ui.Label(vis.min, {margin: '4px 8px'}),
    ui.Label(
        ((vis.max + vis.min) / 2),
        {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
    ui.Label(vis.max, {margin: '4px 8px'})
  ],
  layout: ui.Panel.Layout.flow('horizontal')
});
var legend_title2 = ui.Label({ //label
  value:'Legend: Mean FVC',
  style:{fontWeight:'bold'}
});
var legendPanel_1 = ui.Panel([legend_title2, colorBar_2,legendLabels_2]);
//inspectorPanel.widgets().set(3, legendPanel);
Panel.add(legendPanel_1);
var fvc_mean_analysis_button = ui.Button({
  label:'Calculate the 16days FVC mean value',
  onClick: function(){
    start_time = start_time_textbox.getValue();
    end_time = end_time_textbox.getValue();
    var mod13_filter = mod13.filterBounds(xlglm)
                            .filterDate(start_time, end_time)
                            .select("NDVI");
    // calculate the each image's fvc
    function fvc_image(image){
        var mean_img = image.clip(TH_boundary).rename('Clip_NDVI'); //rename the band of the image
        // sort and get the percentage
        var num = mean_img.reduceRegion({
          reducer:ee.Reducer.percentile([1,99]),
          geometry:TH_boundary,
          scale:250,
          maxPixels:1e13
        })
        var ndvi_1 = ee.Number(num.get('Clip_NDVI_p1')); // get the minimum cutoff value
        var ndvi_99 = ee.Number(num.get('Clip_NDVI_p99')); // get the maximum cutoff value
        var temp_fvc = mean_img.subtract(ndvi_1).divide(ndvi_99.subtract(ndvi_1));
        return temp_fvc
    }
    // var m = fvc_image(mod13_filter.first());
    // var temp_fvc_layer = m.visualize({min:0, max:1, palette:'f12300,ffed08,006400'}) //set the color
    // var compositeLayer = ui.Map.Layer(temp_fvc_layer).setName("Mean_FVC");
    //     layers.add(compositeLayer);
    // Compute the area of unmasked pixels.
    var Area = function(image){
      var fvc16d = image.select('Clip_NDVI').rename('FVC_16d');
          fvc16d = fvc16d.updateMask(fvc16d.gte(0)); // value 1
      // var area = ee.Image.pixelArea().multiply(fvc16d);
      //     print(area);
      var count = fvc16d.gte(0.4).reduceRegion(ee.Reducer.sum(),TH_boundary,250).get('FVC_16d');
      // var area = ee.Number(0.25).multiply(count);
      // print(area)
    /* 
    '-0.004' is a threshold according to Hu(2018), if this parameter is a variable, we should create a image to store
    the changeable FAI_threshold
    */
      // print(fvc16d.get('system:index')); // get the date
      return ee.Feature(TH_boundary, { date: fvc16d.get('system:index'), count: count });
    // output is pixel counts， after exporting as csv format, we must mutiply 250*250 to get the area result
    };
    var fvc = mod13_filter.map(fvc_image);
    var area1 = fvc.map(Area);   
    // set the chart 
    var AreaChart = ui.Chart.feature.byFeature(ee.FeatureCollection(area1), 'date', 'count')
                    .setOptions({
                    title: 'FVC 16-days area: temporal series',
                    vAxis: {title: 'FVC pixel count (250*250m)'},
                    hAxis: {title: 'Date', format: 'yyyy/MM/dd', gridlines: {count: 20}},
                    series: {
                      0: {
                        color: 'blue',
                        lineWidth: 1,
                        pointsVisible: true,
                        pointSize: 2,
                      },
                    },
                    legend: {position: 'right'},
                    });
    // AreaChart style setup.
    AreaChart.style().set({
      position: 'bottom-left',
      width: '400px',
      height: '250px'
    });
    //mapPanel.clear();
    // Add area change chart to panel.
    Map_panel.add(AreaChart);    
  }
});
Panel.add(fvc_mean_analysis_button);
// clear the map panel
var fvc_mean_clear_button = ui.Button({
  label:'Clear the panel',
  onClick: function(){
    Map_panel.clear()
  }
})
Panel.add(fvc_mean_clear_button)
// Export the current image
var nu_4 = ui.Panel([
  ui.Label('4) Export the current image',{fontWeight:'bold', color:'red'})
])
Panel.add(nu_4);
var export_image1_button = ui.Button({
  label:'Export the current image to the drive',
  onClick: function(){
    // calculate the ndvi
    start_time = start_time_textbox.getValue();
    end_time = end_time_textbox.getValue();
    var mod13_filter = mod13.filterBounds(xlglm)
                        .filterDate(start_time,end_time)
                        .select("NDVI");
    //clip the singel image function
    function imageCllection_clip(image){
      var image1 = image.clip(TH_boundary);
      return image1}
    var mean_clip_img = mod13_filter.map(imageCllection_clip); //Circular cut
    var mean_img= mean_clip_img.reduce(ee.Reducer.mean()).rename('Mean_NDVI'); // Calculate the mean value
    var mean_img_nor = mean_img.multiply(0.0001);
    print('正在输出，请稍等...');
    Export.image.toDrive({
      image:mean_img_nor,
      description:start_time+'_'+end_time+'_Mean_NDVI',
      folder:'NDVI',
      region:TH_boundary.bounds(),
      scale:250,
      maxPixels:1e13
    });
  }
})
Panel.add(export_image1_button);
ui.root.clear();
ui.root.add(ui.SplitPanel(Panel, Map_panel));//left and right