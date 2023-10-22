var imageVisParam = ui.import && ui.import("imageVisParam", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "B3",
          "B2",
          "B1"
        ],
        "min": 497.70000000000005,
        "max": 1607.3,
        "gamma": 1.721
      }
    }) || {"opacity":1,"bands":["B3","B2","B1"],"min":497.70000000000005,"max":1607.3,"gamma":1.721};
//********** default things *********
var test_chips = ee.FeatureCollection('projects/nicfi-data-sharing/assets/alert-drivers/round2_test_chips_20220217')
var centerPlotID = 18
var centerPlot = test_chips.filterMetadata('PLOTID', 'equals', centerPlotID)
                            .first()
Map.centerObject(centerPlot, 12)
//************ ui things ****************
//************ side panel *****************
// create a panel with vertical flow layout
var panel = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
  style: {width: '300px'}
});
// create title and subtitle
var title = ui.Label('Alert Drivers')
var subtitle = ui.Label('West Kalimantan')
// set title and subtitle styles
title.style().set('fontSize', '24px')
subtitle.style().set('fontSize', '16px')
// add title and subtitle to panel
panel.add(title)
panel.add(subtitle)
// add panel to the UI
ui.root.add(panel)
// add widget to panel for user instruction
panel.widgets().set(2, ui.Label('Click a point'))
//************* functions ****************
//function for masking planet clouds
function maskclouds(image) {
  var qa_clouds = image.select('Q6');
  var mask = qa_clouds.eq(0)  //.and(qa_hhaze.eq(0))
  return image.updateMask(mask) //.divide(10000);
}
//************************************
var locButton = ui.Panel({layout: ui.Panel.Layout.flow('horizontal')});
locButton.style().set({
  //width: '250px',
  position: 'bottom-left',
  padding: '2px',
  margin: '2px'
});
Map.add(locButton);
var centerPlotIDText = ui.Textbox({
  value: centerPlotID,
  placeholder: 'Enter PLOTID here',
  onChange: function(value) {
    // set value with a dedicated method
    centerPlotIDText.setValue(value);
    return(value);
  },
  style: {width:'75px',margin: '2px 2px 2px 2px',padding: '0px'}
});
locButton.add(ui.Label({value:'PLOTID',style: {margin: '2px 2px 2px 2px',padding: '0px',textAlign:'center',fontWeight:'bold'}}));
locButton.add(centerPlotIDText);
var locationButton = ui.Button({
  label: 'Go to Plot',
  onClick: function() {
    centerPlotID = parseInt(centerPlotIDText.getValue());
    centerPlot = test_chips.filterMetadata('PLOTID','equals',centerPlotID).first();
    Map.centerObject(centerPlot, 12);
  },
  style: {margin: '2px 2px 2px 2px',padding: '0px'}
});
locButton.add(locationButton);
//********** update click data************
Map.onClick(function(coords) {
  // Show the loading label.
  panel.widgets().set(2, ui.Label({
    value: 'Loading...',
    style: {color: 'gray'}
  }));
  panel.widgets().set(3, ui.Label({
    value: 'Loading...',
    style: {color: 'gray'}
  }));
  panel.widgets().set(4, ui.Label({
    value: 'Loading...',
    style: {color: 'gray'}
  }));
  panel.widgets().set(5, ui.Label({
    value: 'Loading...',
    style: {color: 'gray'}
  }));
  // Get the location of the click
  var click_point = ee.Geometry.Point(coords.lon, coords.lat);
  // Get the value of the click
  var chip_id = test_chips.filterBounds(click_point)
                .first()
                .get('PLOTID')
                .evaluate(
                  function(val){
                    var text = 'Plot ID: ' + val;
                    panel.widgets().set(2, ui.Label(text));
                  }
                )
  var gladdoy = gladalerts.filterBounds(click_point.buffer(100))
                          .first()
                          .get('julian_day')
  var gladyear = gladalerts.filterBounds(click_point.buffer(100))
                          .first()
                          .get('year')
                          print(gladdoy)
  ee.Date.parse('DDD', gladdoy)
          .update(gladyear)
          .format('MMM dd, yyyy')
          .evaluate(function(dateClient){
            var text = 'GLAD Alert Date: ' + dateClient
            panel.widgets()
                  .set(3, ui.Label(text))
          })
  var viirsdate = viirsalerts.filterBounds(click_point.buffer(100))
                        .first()
                        .get('ACQ_DATE')
  ee.Date(viirsdate).format('MMM dd, yyyy')
          .evaluate(function(dateClient){
            var text = 'VIIRS Alert Date: ' + dateClient
            panel.widgets()
                  .set(4, ui.Label(text))
          })
  var badate = burnarea.reduceRegion(ee.Reducer.first(), click_point, 30)
  var badoy = ee.Number(badate.get('BurnDate'))
  ee.Date.parse('DDD', badoy)
          .update(2019)
          .format('MMM dd, yyyy')
          .evaluate(function(dateClient){
            var text = 'Burned Area Date: ' + dateClient
            panel.widgets()
                  .set(5, ui.Label(text))
          })
  // print(click_point)
});
// function to create 5 km buffer
function buff (feature) {
  return ee.Feature(feature.buffer(5000))
}
var buff_test_chips = test_chips.map(buff)
// make a mask of the study area
var chip_mask = buff_test_chips
  .reduceToImage({
    properties: ['PLOTID'],
    reducer: ee.Reducer.first()
  })
//********** Add layers to map ************
//************ load s2 clearsky *************
var s2 = ee.ImageCollection('projects/nicfi-data-sharing/assets/alert-drivers/s2-ref-imgs/s2_20190805')
            .mosaic()
            .updateMask(chip_mask)
//************ load planet data ************
var planet_jul2019_round_2 = ee.Image('projects/nicfi-data-sharing/assets/alert-drivers/planet_jul2019_round_2')
var planet_aug2019_round_2 = ee.Image('projects/nicfi-data-sharing/assets/alert-drivers/planet_aug2019_round_2')
//************ load burned area ************
var burnarea = ee.ImageCollection('MODIS/006/MCD64A1')
                  .filterDate('2019-04-01', '2019-10-01')
                  .select('BurnDate')
                  .min()
                  .updateMask(chip_mask)
//************ load dnbr ************
var dnbr_2019 = ee.Image('projects/nicfi-data-sharing/assets/alert-drivers/dnbr_julsep2019')
                  .updateMask(chip_mask)
// var dnbr_2020 = ee.Image('projects/nicfi-data-sharing/assets/alert-drivers/dnbr_julsep2020')
//************ load viirs *****************
var viirsalerts = ee.FeatureCollection('projects/anika-alert-drivers/assets/auxiliary_data/viirs_july2019')
                    .filterBounds(test_chips)
//*********** Load fire frequency data *************
// var fire_freq = ee.Image('users/jamesmaccarthy/fire/fire_freq')
//                   .updateMask(chip_mask)
//********** Load primary forest data **********
var primforest = ee.Image('users/jamesmaccarthy/drivers_indonesia/primary_forest_asia')
                    .updateMask(chip_mask)
                    .selfMask()
var primforest_viz = {
  palette: ['green'],
  opacity: 0.75
}
// ********** load mining data (maus) *********
var mining = ee.Image('projects/anika-alert-drivers/assets/auxiliary_data/maus_mining')
                .updateMask(chip_mask)
                .selfMask()
                .gt(0)
var mining_viz = {
  palette: ['bababa'],
  opacity: 0.9
}
//*********** GLAD Alerts ************
var gladalerts = ee.FeatureCollection('projects/anika-alert-drivers/assets/glad_july2019')
                    .filterBounds(test_chips)
// ************** load mining concessions *******************
var minecon = ee.FeatureCollection('projects/anika-alert-drivers/assets/auxiliary_data/gfw_mining_concession_shp')
                .filterBounds(test_chips)
// ************** load logging concessions *******************
var logcon = ee.FeatureCollection('projects/anika-alert-drivers/assets/auxiliary_data/gfw_logging_concessions')
                .filterBounds(test_chips)
// ************** load wood fiber *******************
var woodfiber = ee.Image('projects/anika-alert-drivers/assets/auxiliary_data/gfw_woodfiber')
                .updateMask(chip_mask)
var woodfiber_viz = {
  palette: '899878',
  opacity: 0.5
}
// ************** load plantations **********************
var plantations = ee.Image('projects/anika-alert-drivers/assets/auxiliary_data/gfw_plantations')
                      .updateMask(chip_mask)
var plantations_viz = {
  palette: ['A24936'],
  opacity: 0.5
}
// ************* load oil palm concessions **************
var oilpalmcon = ee.FeatureCollection('projects/anika-alert-drivers/assets/auxiliary_data/gfw_oil_palm_concessions')
                .filterBounds(test_chips)
// ************* load oil palm data *********************
var oilpalm = ee.Image('projects/anika-alert-drivers/assets/auxiliary_data/descals_oil_palm')
                // .updateMask(chip_mask)
                // .selfMask()
var oilpalm_mask = oilpalm.eq(1).or(oilpalm.eq(2))//or(oilpalm.lt(1))
var oilpalm_viz = {
  min: 1,
  max: 2,
  palette: ['A24936', 'FFA69E'],
  opacity: 0.5
}
//*********** load oil palm validation *************
var oilpalm_valid = ee.FeatureCollection('projects/anika-alert-drivers/assets/auxiliary_data/descals_oil_palm_validation')
                      .filterBounds(test_chips)
var oilpalm_valid_style = {
  color: 'orange',
  pointSize: 2
}
//************** styling **************
var gladalerts_style = {
  color: '00000000',
  fillColor: '5cfff1',
  pointSize: 2
}
var viirsalerts_style = {
  color: '00000000',
  fillColor: 'red',
  pointSize: 2
}
var chip_style = {
  color: 'cyan',
  width: 2,
  fillColor: '00000000'  // with alpha set for partial transparency
}
var minecon_style = {
  color: 'bababa',
  width: 2,
  fillColor: '00000000'  // with alpha set for partial transparency
}
var logcon_style = {
  color: '899878',
  width: 2,
  fillColor: '00000000'  // with alpha set for partial transparency
}
var oilpalmcon_style = {
  color: 'A24936',
  width: 2,
  fillColor: '00000000'  // with alpha set for partial transparency
}
var planet_2019_viz = {
  bands: ["B3","B2","B1"],
  gamma: 1,
  max: 1440,
  min: 300,
  opacity: 1
}
var planet_2021_viz = {
  bands: ["B3","B2","B1"],
  gamma: 1,
  max: 1200,
  min: 100,
  opacity: 1
}
Map.addLayer(planet_jul2019_round_2, planet_2019_viz, 'planet_jul2019', false)
Map.addLayer(planet_aug2019_round_2, planet_2019_viz, 'planet_aug2019', false)
Map.addLayer(s2, null, 's2')
Map.addLayer(dnbr_2019, {palette:'ffff0050'}, 'dnbr_2019', false)
Map.addLayer(primforest, primforest_viz, 'primary_forest', false)
Map.addLayer(plantations, plantations_viz, 'plantations', false)
Map.addLayer(oilpalm.updateMask(oilpalm_mask), oilpalm_viz, 'oil_palm', false)
Map.addLayer(oilpalm_valid.style(oilpalm_valid_style), null, 'oil_palm_valid', false)
Map.addLayer(woodfiber, woodfiber_viz, 'woodfiber', false)
Map.addLayer(mining, mining_viz, 'mining', false)
Map.addLayer(burnarea, {palette: 'pink'}, 'burned_area', false)
Map.addLayer(viirsalerts.style(viirsalerts_style), null, 'viirs_alerts', true)
Map.addLayer(oilpalmcon.style(oilpalmcon_style), null, 'oilpalm_concessions', false)
Map.addLayer(logcon.style(logcon_style), null, 'log_concessions', false)
Map.addLayer(minecon.style(minecon_style), null, 'mining_concessions', false)
Map.addLayer(gladalerts.style(gladalerts_style), null, 'glad_alerts')
Map.addLayer(test_chips.style(chip_style), null, 'test_chips')
// Export.image.toDrive({
//   image: planet_2018,
//   description: 'planet_2018',
//   maxPixels: 1e13,
//   // folder: 'foo_project',
//   region: test_chips,
//   scale: 5,
//   crs: 'EPSG:4326'
// });