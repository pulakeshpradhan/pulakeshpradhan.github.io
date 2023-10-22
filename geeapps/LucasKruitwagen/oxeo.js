var aq_21 = ee.FeatureCollection("users/LucasKruitwagen/aqueduct_global_21");
var oxeo_assets = ee.FeatureCollection('ft:1av78tlqQbZgNZD1XSvi7_UBgvTqov3IlMgKCTXaE','geometry')
var tools = require('users/fitoprincipe/geetools:tools');
var oxeo_scripts = require('users/LucasKruitwagen/public:oxeo_scripts');
print (tools)
var colors = {'cyan': '#24C1E0', 'transparent': '#11ffee00', 'gray': '#F8F9FA'};
var collection_s2= ee.ImageCollection('COPERNICUS/S2')
var BORDER_STYLE = '4px solid rgba(97, 97, 97, 0.05)';
var TITLE_STYLE = {
  fontWeight: '100',
  fontSize: '32px',
  padding: '10px',
  color: '#616161',
  backgroundColor: colors.transparent,
};
var SUBTITLE_STYLE = {
  fontSize: '16px',
  fontWeight: '100',
  color: '#616161',
  padding: '8px',
  backgroundColor: colors.transparent,
};
var PARAGRAPH_STYLE = {
  fontSize: '14px',
  fontWeight: '50',
  color: '#9E9E9E',
  padding: '8px',
  backgroundColor: colors.transparent,
};
var LABEL_STYLE = {
  fontWeight: '50',
  textAlign: 'center',
  fontSize: '11px',
  backgroundColor: colors.transparent,
  stretch: 'horizontal'
};
//time series:
//https://gis.stackexchange.com/questions/250426/moving-averages-and-seasonality-filters
//https://code.earthengine.google.com/2f27cd0b544f9cf54a32dc7f5f9476a5
Map.setCenter(0.0, 50.0, 3);
// Load and display aqueduct
var empty = ee.Image().byte();
var map_style = function(feature) {
  return feature.set({style_prop: {
    fillColor: feature.get('disp_color'),//ee.Algorithms.If(feature.get('confidence'),confidence_map.get(ee.Number(feature.get('confidence')).toUint8()),'#333333'),
    pointSize: ee.Algorithms.If(ee.Number(feature.get('payment_sum')),ee.Number(feature.get('payment_sum')).log10(),4),
    width:1
  }
  });
};
var assets_formatted = oxeo_assets.map(map_style);
print (assets_formatted)
//Map.addLayer(aq_21, {}, 'aq_21')
// Paint the edges with different colors, display.
var fills = empty.paint({
  featureCollection: aq_21,
  color: 'BWS_s',
});
var outlines = empty.paint({
  featureCollection: aq_21,
  color: '232323',
  width: 1
});
var fills_colored = fills.visualize({
  min: 0.0,
  max: 5.0,
  palette: ['00FF00', 'FF0000']
});
var aq_fills = ui.Map.Layer(fills_colored, {}, 'AQ - Fills',false)
var aq_outlines = ui.Map.Layer(outlines, {}, 'AQ - Outlines',false)
var mine_asset_visualisation = ui.Map.Layer(assets_formatted.style({styleProperty:'style_prop'}), {}, 'Mine Assets - visualisation')
var mine_asset_layer = ui.Map.Layer(assets_formatted, {}, 'Mine Assets', false)
//Map.addLayer(fills_colored, {},'AQ - Fills');
//Map.addLayer(outlines, {}, 'AQ - Outlines');
//Map.addLayer(mine_assets,{},'Mine Sites')
Map.layers().add(aq_fills)
Map.layers().add(aq_outlines)
Map.layers().add(mine_asset_layer)
Map.layers().add(mine_asset_visualisation)
var sdate = '1985-01-01'
var edate = '2019-01-01'
// declare the selected ft outside of any fn scope
var selected_ft
//var independents = ee.List(['constant', 't']);
//var dependent = ee.String('NDWI');
var showImage = function(){ //, year, month) {
  tools.map.removeLayerByName('NDWI')
  tools.map.removeLayerByName('RGB - Visual Spectrum')
  //Map.addLayer(fills_colored, {},'AQ - Fills');
  //Map.addLayer(outlines, {}, 'AQ - Outlines');
  //Map.addLayer(mine_assets,{},'Mine Sites')
  //print (Map.layers())
  //Map.remove(Map.layers().get(5))
  print ('showing image','year',year,'month',month)
  var year = year_slider.getValue()
  var month = month_slider.getValue()
  var filt_sdate = ee.Date.fromYMD(year, month, 1);
  var filt_edate = filt_sdate.advance(1, 'month');
  var images = collection_s2.filterBounds(selected_ft.geometry()).filterDate(filt_sdate, filt_edate).sort('CLOUD_COVERAGE_ASSESSMENT',false);
  print (images)
  var ndwi = images.map(function(image) {
    return image.select().addBands(image.normalizedDifference(['B8', 'B3']));
  });
  var image = ee.Image(images.mosaic())
  var ndwi_image = ee.Image(ndwi.mosaic())
  // Add RGB Image
  var vis_params = {
      bands: ['B4', 'B3','B2'],
      max: 4000,
      min: 0}
  var rgb_layer = ui.Map.Layer(image.clip(selected_ft.geometry()),vis_params, 'RGB - Visual Spectrum')
  var ndwi_params = {
    min: -1,
    max: 1,
    palette: ['blue', 'white', 'green']
  }
  var ndwi_layer = ui.Map.Layer(ndwi_image.clip(selected_ft.geometry()), ndwi_params, 'NDWI')
  Map.layers().add(rgb_layer)
  Map.layers().add(ndwi_layer)
  //Map.layers().reset([rgb_layer, ndwi_layer]); //aq_fills, aq_outlines,mine_asset_layer, 
};
// Create a panel to hold our widgets.
var panel = ui.Panel();
panel.style().set('width', '300px');
// Create an intro panel with labels.
var intro = ui.Panel([
  ui.Label({
    value: 'OxEO Prototype',
    style: TITLE_STYLE
  })
]);
panel.add(intro);
var geom_label = ui.Label('1. Import Geometry', SUBTITLE_STYLE);
var geom_desc = ui.Label('Generate geojson strings here: geojson.io', PARAGRAPH_STYLE)
var geom_textbox = ui.Textbox('Copy GeoJSON here')
var charts_panel = ui.Panel({
  layout:ui.Panel.Layout.flow('vertical'),
  style:{'border':'2px #9E9E9E'}
})
var geojsons_keys = ee.Dictionary(oxeo_scripts.geojsons).keys()
print ('exg',geojsons_keys)
var example_button = ui.Select({
  items:ee.List(geojsons_keys).getInfo(),
  placeholder: 'Select Example',
  onChange: function(val,widg){
    geom_textbox.setValue(oxeo_scripts.geojsons[val]);
  }
})
var parse_geom_button = ui.Button({
      label: 'Parse Geom',
      onClick: function() {
        //print (ee.String(geom_textbox.getValue()).decodeJSON())
        var inp_geom = ee.Geometry(ee.String(geom_textbox.getValue()).decodeJSON())
        //instructions.style().set('shown', false);
        selected_ft = ee.Feature(ee.String(geom_textbox.getValue()).decodeJSON().getInfo())
        //selected_ft = ee.Feature(inp_geom,{});
        print ('selected_ft',selected_ft)
        Map.addLayer(selected_ft, {}, 'Parsed Geometry')
        Map.centerObject(selected_ft)
        image_control_panel.style().set('shown', true)
        analysis_panel.style().set('shown', true)
        showImage(selected_ft)//, year_slider.getValue(), month_slider.getValue())
        //print ('ndwi collection')
        //print (ndwi_collection.filterBounds(selected_ft.geometry()).filterDate(sdate,edate))
        // Create an NDWI chart.
      }
    });
var clear_geom_button = ui.Button({
      label: 'Clear Geom',
      onClick: function() {
        selected_ft = null;
        charts_panel.clear();
        tools.map.removeLayerByName('Parsed Geometry');
      }
    });
var geom_textbox_panel = ui.Panel({
  widgets:[geom_textbox],
  layout:ui.Panel.Layout.flow('horizontal')
})
var geom_control_panel = ui.Panel([example_button, parse_geom_button, clear_geom_button],ui.Panel.Layout.flow('horizontal') )
//add two buttons: run geometry; clear geom
//control_panel.add(run_geom_button)
var geom_panel = ui.Panel({
  widgets:[geom_label,geom_desc,geom_textbox_panel, geom_control_panel],
  layout:ui.Panel.Layout.flow('vertical'),
  style:{'border':'2px #9E9E9E'}
});
// Create panels to hold lon/lat values.
panel.add(geom_panel)
var analyse_yrbox = ui.Textbox({
  placeholder:'Enter analysis year (int [2020:2099])'
})
// Register a callback on the map to be invoked when the map is clicked.
var run_geom_button = ui.Button({
  label: 'Run Geom',
  onClick: function() {
    var ndwi_collection = oxeo_scripts.ndwiChartGenerator()
    charts_panel.add(ui.Chart.image.series(ndwi_collection.filterDate(sdate,edate).select('NDWI'), selected_ft.geometry(), ee.Reducer.mean(), 500)
    .setOptions({
      title: 'NDWI Over Time',
      vAxis: {title: 'NDWI'},
      hAxis: {title: 'date', format: 'MM-yy', gridlines: {count: 7}},
      trendlines: {0: {
        color: 'CC0000'
      }},
    }));
    var test=ee.Number(2060)
    print ('test',test)
    var projection_img_collection = oxeo_scripts.ndwiPrecipProjectionGenerator(sdate,edate,selected_ft.geometry(),ee.Number.parse(analyse_yrbox.getValue()).getInfo())
    //print ('proj_img_collection')
    //print (projection_img_collection)
    charts_panel.add(ui.Chart.image.series(
          projection_img_collection.select(['NDWI','fitted','rcp45','rcp85','precip_5', 'precip_30','precip_90','precip_180']), selected_ft.geometry(), null, 500)
            //.setSeriesNames(['NDWI','fitted','precip_5', 'precip_30','precip_90','precip_180','rcp45','rcp85'])
            .setOptions({
              title: 'Precipitation model and climate projections',
              lineWidth: 1,
              colors: ['#0061ff', '#540066','#2d2d2d',  '#a3a3a3','#c1c1c1','#5b5b5b','#66ceff', '#ff009d'],
              series: {
                  0: {targetAxisIndex: 0},
                  1: {targetAxisIndex: 0},
                  2: {targetAxisIndex: 1},
                  3: {targetAxisIndex: 1},
                  4: {targetAxisIndex: 1},
                  5: {targetAxisIndex: 1},
                  6: {targetAxisIndex: 0},
                  7: {targetAxisIndex: 0},
                },
              pointSize: 3,
        }));
  }
});
var analysis_control_panel = ui.Panel({
  widgets:[analyse_yrbox,run_geom_button],
  layout:ui.Panel.Layout.flow('horizontal')
})
var analysis_title = ui.Label('3. Analyse Timeseries',SUBTITLE_STYLE)
var analysis_desc = ui.Label('Obtain NDWI projections using precipitation projections for 21 general circulation models through 2100',PARAGRAPH_STYLE)
var analysis_panel = ui.Panel({
  widgets:[analysis_title,analysis_desc,analysis_control_panel, charts_panel],
  layout:ui.Panel.Layout.flow('vertical'),
  style: {shown:false},
})
// Create a slider.
var year_slider = ui.Slider({
  min: 2016,
  max: 2018,
  value: 2018,
  step: 1,
  onChange: showImage,
  style: LABEL_STYLE
});
var month_slider = ui.Slider({
  min: 1,
  max: 12,
  step: 1,
  onChange: showImage,
  style: LABEL_STYLE
});
var yrpanel = ui.Panel({
  widgets: [ui.Label('Year:',LABEL_STYLE), year_slider],
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {shown: true}
  });
var mopanel = ui.Panel({
  widgets: [ui.Label('Month:',LABEL_STYLE), month_slider],
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {shown: true}
  });
var image_control_panel = ui.Panel({
  widgets: [ui.Label('2. Visualise Imagery',SUBTITLE_STYLE),ui.Label('Examine NDWI and S2 imagery over time using the sliders',PARAGRAPH_STYLE),yrpanel, mopanel],
  layout: ui.Panel.Layout.flow('vertical'),
  style: {shown: false}
  });
// could try a dateslider: var ui.DateSlider
panel.add(image_control_panel)
panel.add(analysis_panel)
//////// COMAPNY PANEL///////
var display_by = ui.Select({
  items:['Company','Confidence'],
  placeholder:'select thingy'
  //onChange: function
});
var company_panel = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical')
})
var display_select_panel = ui.Panel({
  widgets:[ui.Label('Color by...',SUBTITLE_STYLE ),display_by],
  layout: ui.Panel.Layout.flow('horizontal'),
  style: {stretch:'both',
    textAlign:'left'
  },
});
//company_panel.add(display_select_panel)
company_panel.style().set('width', '300px');
// make the panel for commodities
var commodityCheckpanel = ui.Panel({
    layout: ui.Panel.Layout.flow('vertical', true),
    style: {
      stretch: 'horizontal',
      backgroundColor: colors.transparent,
      height:'100px',
    }
  });
company_panel.add(ui.Label('Filter Commodities: ',SUBTITLE_STYLE))
company_panel.add(commodityCheckpanel);
///
function findSelectedCommodities(containing_panel) {
  var widgets = containing_panel.widgets();
  var ids = [];
  widgets.forEach(function f(e) {
    var id = e.widgets().get(1).getValue();
    var checked = e.widgets().get(0).getValue();
    if (checked) {
      ids.push(id);
    }
  });
  return ids;
}
var onChangeFunc = function(){
  var commodity_ids = findSelectedCommodities(commodityCheckpanel)
  tools.map.removeLayerByName('Mine Assets - visualisation')
  var or_filters = []
  commodity_ids.forEach(function f(id){
    or_filters.push(ee.Filter.eq(id,1))
  })
  var assets_reformatted = assets_formatted.filter(ee.Filter.or(ee.List(or_filters).get(0)))
  mine_asset_visualisation = ui.Map.Layer(assets_reformatted.style({styleProperty:'style_prop'}), {}, 'Mine Assets - visualisation')
  Map.layers().add(mine_asset_visualisation)
}
// fill that panel with commodities
var commodityList = ee.List(['GOLD','COPPER','SZLN','COAL','IRON','URANIUM','AGGREGATES'])
function makeCommodity(commodity) {
  var commodityContainer = ui.Panel({
    layout: ui.Panel.Layout.flow('horizontal'),
    style: {
      backgroundColor: colors.transparent,
      border: BORDER_STYLE,
      padding: '0px',
      margin: '0px',
    },
  });
  // Add the checkbox to specify which thumbnails to include in the mosaic.
  var checkbox = ui.Checkbox(null, true, onChangeFunc, false,LABEL_STYLE);
  commodityContainer.add(checkbox)
  commodityContainer.add(ui.Label(commodity, LABEL_STYLE));
  return commodityContainer;
}
commodityList.evaluate(function(commodities) {
  commodities.forEach(function(commodity) {
    var cbox = makeCommodity(commodity);
    commodityCheckpanel.add(cbox);
  });
});
///
var castToFt = function(list_el) {
  return ee.Feature(null,{companyName:list_el})
};
// fill the companypanel with companies
//get a list of them
var companyList = ee.List(oxeo_assets.aggregate_array('company_name')).distinct()
var companyFC = ee.FeatureCollection(companyList.map(castToFt))
//print (companyFC)
var groupbySum = function(feature) {
  return feature.set({
    payment_sum:ee.Number(oxeo_assets.filter(ee.Filter.eq('company_name',feature.get('companyName'))).reduceColumns(ee.Reducer.sum(),['payment_sum']).get('sum')).divide(1000000),
    label_color:oxeo_assets.filter(ee.Filter.eq('company_name',feature.get('companyName'))).first().get('disp_color'),
  });
};
companyFC = companyFC.map(groupbySum).sort('payment_sum',false);
print (companyFC);
var test_colors = companyFC.limit(10).aggregate_array('label_color');//['#77d86c','#9d24af','#395f9b']
print(test_colors);//companyFC.limit(5).aggregate_array('label_color')//
//ui.Chart.groups(features, 'companyName','payment_sum','label_color')
//ui.Chart.feature.byFeature(companyFC.limit(3),'companyName','payment_sum')
var companyChart = ui.Chart.feature.groups(companyFC.limit(10), 'companyName','payment_sum','companyName') 
  .setChartType('BarChart')
  .setOptions({
    title: 'All royalty payments, taxes, etc. by company',
    colors:test_colors.getInfo(),//company_subcolors
    legend: {position:'none'},
    hAxis: {
      title:'Payment sum ($USmn)'
    },
    vAxis: {
      title:'Company'
    }
  });
var co_list_local = ee.List(companyList).sort().getInfo()
var analyse_companies_label = ui.Label('Select Companies for analysis')
var company_select_panel = ui.Panel({
  layout:ui.Panel.Layout.flow('vertical'),
})
var update_company_label = function(val){
  var widgets = company_select_panel.widgets()
  widgets.forEach(function f(e) {
    var company_name = e.widgets().get(0).getValue();
    e.widgets().get(2).setValue(ee.Number.parse(companyFC.filter(ee.Filter.eq('companyName',company_name)).first().get('payment_sum')).format('%.2f').getInfo()+'$mn')
    e.widgets().get(1).style().set('backgroundColor',companyFC.filter(ee.Filter.eq('companyName',company_name)).first().get('label_color').getInfo())
  });
}
var make_select_company = function(){
  var select_box_company = ui.Select({
    items:co_list_local,
    placeholder:'Select Company',
    onChange:function(val,widg){
      update_company_label(val)
    }
  })
  var select_box_patch = ui.Label('  ',{padding:'10px',position:'middle-right'})
  var select_box_label = ui.Label('',PARAGRAPH_STYLE)
  select_box_label.style().set({position:'middle-right'})
  return ui.Panel({
    widgets:[select_box_company,select_box_patch,select_box_label],
    layout:ui.Panel.Layout.flow('horizontal'),
    style:{stretch:'horizontal'}
  });
};
var sel_company =make_select_company();
/*
/// companies control panel
var view_companies = function(){
  var widgets = company_select_panel.widgets()
  var company_names = []
  widgets.forEach(function f(e) {
    var company_name = e.widgets().get(0).getValue()
    company_names.push(company_name);
    });
  tools.map.removeLayerByName('Mine Assets - visualisation')
  print ('company_names',company_names)
  var assets_reformatted = assets_formatted.filter(ee.Filter.inList('company_name',company_names))
  mine_asset_visualisation = ui.Map.Layer(assets_reformatted.style({styleProperty:'style_prop'}), {}, 'Mine Assets - visualisation')
  Map.layers().add(mine_asset_visualisation)
  Map.centerObject(assets_reformatted)
}*/
var run_company_chart = ui.Panel({
  layout:ui.Panel.Layout.flow('vertical')
})
var run_companies = function(ListOfCompanies){
  print (ListOfCompanies)
  var company_FC_reduced = ee.FeatureCollection(ListOfCompanies.map(function(company_name){
    return ee.Feature(assets_formatted.filter(ee.Filter.eq('company_name',company_name)).geometry().buffer(2000),{company_name:company_name})
    .set({company_color:assets_formatted.filter(ee.Filter.eq('company_name',company_name)).first().get('disp_color')})
  }))
  print ('company_fc_red',company_FC_reduced)
  var ndwi_collection = oxeo_scripts.ndwiChartGenerator()
  var ndwi_collection_filt = ndwi_collection.filterDate('2010-01-01','2019-01-01').filterBounds(company_FC_reduced.geometry()).select('NDWI')
  var month_list = ee.List.sequence(1,12);
  var year_list = ee.List.sequence(2010, 2018)
  var ndwi_collection_monthly =  ee.ImageCollection.fromImages(
    year_list.map(function (ynz) {
    return month_list.map(function(mnz){
    var w = ndwi_collection_filt.filter(ee.Filter.calendarRange(ynz, ynz, 'year'))
                          .filter(ee.Filter.calendarRange(mnz, mnz, 'month'))
                          .mean();
    return w.set('year', ynz)
                          .set('month', mnz)
                          .set('date', ee.Date.fromYMD(ynz,mnz,1))
                          .set('system:time_start',ee.Date.fromYMD(ynz,mnz,1).millis() ) 
  })
  }).flatten())
  //print ('ndwi_coll',ndwi_collection.filterDate('1985-01-01','2018-01-01').filterBounds(company_FC_reduced.geometry()))
  run_company_chart.add(ui.Chart.image.seriesByRegion(ndwi_collection_monthly.filterDate('2010-01-01','2019-01-01').filterBounds(company_FC_reduced.geometry()).select('NDWI'), company_FC_reduced, ee.Reducer.mean(),'NDWI', 1000)
    .setSeriesNames(company_FC_reduced.aggregate_array('company_name'))
    .setOptions({
      title: 'NDWI for Selected Companies at 2km bufferzone',
      colors:company_FC_reduced.aggregate_array('company_color').getInfo(),
      vAxis: {title: 'NDWI'},
      hAxis: {title: 'date', format: 'MM-yy', gridlines: {count: 7}},
    }));
  return company_FC_reduced
}
var add_select_company = ui.Button({
  label:'Add Company',
  onClick:function(){
    company_select_panel.add(make_select_company())
  },
})
var view_companies_button = ui.Button({
  label:'View Companies',
  onClick:function(){
    var widgets = company_select_panel.widgets()
    var company_names = []
    widgets.forEach(function f(e) {
      var company_name = e.widgets().get(0).getValue()
      company_names.push(company_name);
    });
    tools.map.removeLayerByName('Mine Assets - visualisation')
    var assets_reformatted = assets_formatted.filter(ee.Filter.inList('company_name',company_names))
    mine_asset_visualisation = ui.Map.Layer(assets_reformatted.style({styleProperty:'style_prop'}), {}, 'Mine Assets - visualisation')
    Map.layers().add(mine_asset_visualisation)
    Map.centerObject(assets_reformatted)
    },
})
var view_clear_button = ui.Button({
  label:'Clear View',
  onClick:function(){
    tools.map.removeLayerByName('Mine Assets - visualisation')
    mine_asset_visualisation = ui.Map.Layer(assets_formatted.style({styleProperty:'style_prop'}), {}, 'Mine Assets - visualisation')
    Map.layers().add(mine_asset_visualisation)
    Map.centerObject(assets_formatted)
  }
})
var run_companies_button = ui.Button({
  label:'Run Analysis',
  onClick:function(){
    var widgets = company_select_panel.widgets()
    var company_names = []
    widgets.forEach(function f(e) {
      var company_name = e.widgets().get(0).getValue()
      company_names.push(company_name);
    });
    print('button',company_names)
    run_companies(company_names)
  }
})
var companies_control_panel = ui.Panel({
  widgets:[add_select_company,view_companies_button,view_clear_button,run_companies_button],
  layout:ui.Panel.Layout.flow('horizontal',true)
})
company_select_panel.add(make_select_company())
var inspector_panel = ui.Panel({
  layout:ui.Panel.Layout.flow('vertical')
})
var inspector_panel_content = ui.Panel({
  widgets:[ui.Label('Click on a point to get asset information',PARAGRAPH_STYLE)],//paragraph
  layout:ui.Panel.Layout.flow('vertical')
})
inspector_panel.add(ui.Label('Inspect Companies',SUBTITLE_STYLE))//style: sub
inspector_panel.add(inspector_panel_content)
Map.style().set('cursor', 'crosshair');
// Register a callback on the map to be invoked when the map is clicked.
Map.onClick(function(coords) {
  // Clear the panel and show a loading message.
  inspector_panel_content.clear();
  inspector_panel_content.add(ui.Label('Loading...', {color: 'gray'}));
  // Compute the mean NDVI; a potentially long-running server operation.
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var clicked_ft = assets_formatted.filterBounds(point.buffer(ee.Number(377871).multiply(ee.Number(2.71828).pow(Map.getZoom()*-0.5)))).first()
  //var sampledPoint = temporalMean.reduceRegion(ee.Reducer.mean(), point, 30);
  //var computedValue = sampledPoint.get('nd_mean');
  print (clicked_ft)
  //clicked_ft.evaluate(function(ft){
  //  print (ft)
    //var internal_ft = ee.Feature(ft)
  inspector_panel_content.clear()
  inspector_panel_content.add(ui.Label('Project Name: '+clicked_ft.get('projectName').getInfo(),PARAGRAPH_STYLE))
  inspector_panel_content.add(ui.Label('Company Name: '+clicked_ft.get('company_name').getInfo(),PARAGRAPH_STYLE))
  inspector_panel_content.add(ui.Label('Total Payments: '+ee.Number(clicked_ft.get('payment_sum')).format('%.2f').getInfo()+'$mn',PARAGRAPH_STYLE))
  //})
});
company_panel.add(ui.Label('Top Companies',SUBTITLE_STYLE))
company_panel.add(companyChart);
company_panel.add(inspector_panel)
company_panel.add(ui.Label('Analyse Companies',SUBTITLE_STYLE))
company_panel.add(company_select_panel)
company_panel.add(companies_control_panel)
company_panel.add(run_company_chart)
ui.root.insert(3,company_panel);
ui.root.insert(0,panel)