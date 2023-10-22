var heron_image = ui.import && ui.import("heron_image", "image", {
      "id": "users/mitchest/gbr_reefs/heron_wv2"
    }) || ee.Image("users/mitchest/gbr_reefs/heron_wv2"),
    heron_depth = ui.import && ui.import("heron_depth", "image", {
      "id": "users/mitchest/gbr_reefs/heron_depth"
    }) || ee.Image("users/mitchest/gbr_reefs/heron_depth"),
    heron_geo = ui.import && ui.import("heron_geo", "image", {
      "id": "users/mitchest/gbr_reefs/heron_geo"
    }) || ee.Image("users/mitchest/gbr_reefs/heron_geo"),
    heron_benthic = ui.import && ui.import("heron_benthic", "image", {
      "id": "users/mitchest/gbr_reefs/heron_benthic"
    }) || ee.Image("users/mitchest/gbr_reefs/heron_benthic"),
    gbr_image = ui.import && ui.import("gbr_image", "image", {
      "id": "users/mitchest/gbr_reefs/gbr_sentinel2x"
    }) || ee.Image("users/mitchest/gbr_reefs/gbr_sentinel2x"),
    gbr_depth = ui.import && ui.import("gbr_depth", "image", {
      "id": "users/mitchest/gbr_reefs/gbr_depth30"
    }) || ee.Image("users/mitchest/gbr_reefs/gbr_depth30"),
    gbr_geo = ui.import && ui.import("gbr_geo", "image", {
      "id": "users/mitchest/gbr_reefs/gbr_s2_geo"
    }) || ee.Image("users/mitchest/gbr_reefs/gbr_s2_geo"),
    gbr_benthic = ui.import && ui.import("gbr_benthic", "image", {
      "id": "users/mitchest/gbr_reefs/gbr_s2_benthicx"
    }) || ee.Image("users/mitchest/gbr_reefs/gbr_s2_benthicx"),
    gbr_waves = ui.import && ui.import("gbr_waves", "image", {
      "id": "users/mitchest/gbr_reefs/gbr_hs95"
    }) || ee.Image("users/mitchest/gbr_reefs/gbr_hs95"),
    cancook_dove_waves = ui.import && ui.import("cancook_dove_waves", "image", {
      "id": "users/mitchest/gbr_reefs/cancook_waves"
    }) || ee.Image("users/mitchest/gbr_reefs/cancook_waves"),
    cancook_dove_benthic = ui.import && ui.import("cancook_dove_benthic", "image", {
      "id": "users/mitchest/gbr_reefs/cancook_dove_htv2_benthic-clean-pts"
    }) || ee.Image("users/mitchest/gbr_reefs/cancook_dove_htv2_benthic-clean-pts"),
    cancook_dove_geo = ui.import && ui.import("cancook_dove_geo", "image", {
      "id": "users/mitchest/gbr_reefs/cancook_dove_htv2_geo-clean2"
    }) || ee.Image("users/mitchest/gbr_reefs/cancook_dove_htv2_geo-clean2"),
    cancook_ls = ui.import && ui.import("cancook_ls", "image", {
      "id": "users/mitchest/gbr_reefs/cancook_ls8_ssr"
    }) || ee.Image("users/mitchest/gbr_reefs/cancook_ls8_ssr"),
    cancook_ls_depth = ui.import && ui.import("cancook_ls_depth", "image", {
      "id": "users/mitchest/gbr_reefs/cancook_ls8_depth"
    }) || ee.Image("users/mitchest/gbr_reefs/cancook_ls8_depth"),
    cancook_ls_benthic = ui.import && ui.import("cancook_ls_benthic", "image", {
      "id": "users/mitchest/gbr_reefs/cancook_eomap_benthic"
    }) || ee.Image("users/mitchest/gbr_reefs/cancook_eomap_benthic"),
    cancook_ls_geo = ui.import && ui.import("cancook_ls_geo", "image", {
      "id": "users/mitchest/gbr_reefs/cancook_eomap_geo"
    }) || ee.Image("users/mitchest/gbr_reefs/cancook_eomap_geo"),
    wcmc = ui.import && ui.import("wcmc", "table", {
      "id": "projects/coral_atlas/global_datasets/wcmc_reefs_2018v4_dissolved"
    }) || ee.FeatureCollection("projects/coral_atlas/global_datasets/wcmc_reefs_2018v4_dissolved"),
    swp_pix1 = ui.import && ui.import("swp_pix1", "image", {
      "id": "projects/coral_atlas/sw_pacific/in_out/swp_pixels_east"
    }) || ee.Image("projects/coral_atlas/sw_pacific/in_out/swp_pixels_east"),
    swp_pix2 = ui.import && ui.import("swp_pix2", "image", {
      "id": "projects/coral_atlas/sw_pacific/in_out/swp_pixels_west"
    }) || ee.Image("projects/coral_atlas/sw_pacific/in_out/swp_pixels_west"),
    swp_geo = ui.import && ui.import("swp_geo", "image", {
      "id": "projects/coral_atlas/sw_pacific/in_out/swp_geo_clean3"
    }) || ee.Image("projects/coral_atlas/sw_pacific/in_out/swp_geo_clean3"),
    swp_benthic = ui.import && ui.import("swp_benthic", "image", {
      "id": "projects/coral_atlas/sw_pacific/in_out/swp_benthic_clean2"
    }) || ee.Image("projects/coral_atlas/sw_pacific/in_out/swp_benthic_clean2");
// little viewing script for looking at reefs and classifications for each region
// imports
var pkg_vis = require('users/mitchest/global_reefs_modules:pkg_vis')
var map_palettes = require('users/mitchest/global_reefs_modules:colour_pals')
////////// UI SET UP //////////
var generate_legend = function() {
  //Generate legend title
  var title = ui.Label({
    value: 'Coral Habitat Classes',
    style: {fontWeight: 'bold', fontSize: '18px'}
  })
  // generate the legend
  var geo_legend = pkg_vis.discrete_legend(map_palettes.geo_names, map_palettes.geo_cols, 'Geomorphic Zone', false)
  var benthic_legend = pkg_vis.discrete_legend(map_palettes.benthic_names, map_palettes.benthic_cols, 'Benthic Habitat', false)
  pkg_vis.add_lgds([title, geo_legend, benthic_legend])
}
var generate_infopanel = function() {
  // info panel
  var title = ui.Label({
    value: 'Information',
    style: {fontSize: '16px'}
  })
  var info = ui.Label({
    value: 'Use the "Layers" tab above to get started - you can click layers on and off, and adjust their transparency, '+
           'and you can also adjust their display properties by clicking the little settings cog. '+
           'Use the drop down box up the top to choose a specific mapping location.',
    style: {fontSize: '12px'}
  })
  var paper = ui.Label({
    value: 'Scientific paper for more details on layers: Lyons et al. (2020) Remote Sensing in Ecology and Conservation',
    style: {fontSize: '12px'},
    targetUrl: 'https://zslpublications.onlinelibrary.wiley.com/doi/full/10.1002/rse2.157'
  })
  var getmaps = ui.Label({
    value: 'Download maps from the Allen Coral Atlas',
    style: {fontSize: '12px'},
    targetUrl: 'https://allencoralatlas.org/'
  })
  var code = ui.Label({
    value: 'Google Earth Engine mapping code on GitHub',
    style: {fontSize: '12px'},
    targetUrl: 'https://github.com/CoralMapping/gee-mapping-source'
  })
  var infoPanel = ui.Panel({
      widgets: [title, info, paper, getmaps, code],
      layout: ui.Panel.Layout.flow('vertical', true),
      style: {
        position: 'bottom-right',
        stretch: 'vertical',
        height: '330px',
        width: '220px'
      }
  })
  //infoPanel.add(info)
  //infoPanel.add(select)
  return(infoPanel)
}
// set up location chooser
/*var places = {
  Heron: [151.9193602655037,-23.451314673015585],
  CairnsCook: [145.7724644805386,-16.42559735199881],
  Fiji: [178.28817408458917,-19.006073615205402]
}*/
// generate the legend and the info panel for the initial landing map
generate_legend()
Map.add(generate_infopanel())
// gbr
Map.setCenter(148.4478013572142, -18.7224115632265, 7)
Map.addLayer(gbr_image, {bands: ['B4','B3','B2'], min: 500, max: 2200}, "Sentinel-2 mosaic", true)
Map.addLayer(gbr_depth.updateMask(gbr_depth.lt(0)).multiply(-1), {min: 0, max: 12, palette:['#d0d1e6','#a6bddb','#74a9cf','#3690c0','#0570b0','#045a8d','#023858']}, "'Deep Reef' water depth (m)", false)
Map.addLayer(gbr_geo, map_palettes.geo, "Geomorphic map", false)
Map.addLayer(gbr_benthic, map_palettes.benthic, "Benthic map", false)
Map.addLayer(gbr_waves, {min:0, max:1.5}, "Wave height (Deep reef depth + wind/propagation model)", false)
Map.addLayer(wcmc, {color:'#d92121'}, "UNEP WCMC 2018 v4", false)
// generate layers and maps based on location choice
var select = ui.Select({
  items: ['Heron Is.', 'Cairns-to-Cooktown', 'South West Pacific', 'Great Barrier Reef'],
  onChange: function(key) {
    if (key == 'Heron Is.') {
      Map.clear()
      generate_legend()
      Map.add(generate_infopanel())
      Map.setCenter(151.9193602655037, -23.451314673015585, 13)
      // heron
      Map.addLayer(heron_image, {bands: ['b4','b3','b2'], min: 650, max: 4000}, "Worldview-2 image", true)
      Map.addLayer(heron_depth, {min: 0, max: 12, palette:['#d0d1e6','#a6bddb','#74a9cf','#3690c0','#0570b0','#045a8d','#023858']}, "CASI water depth (m)", false)
      Map.addLayer(heron_geo, map_palettes.geo, "Geomorphic map", false)
      Map.addLayer(heron_benthic, map_palettes.benthic, "Benthic map", false)
      Map.addLayer(wcmc, {color:'#d92121'}, "UNEP WCMC 2018 v4", false)
      /*for (var i = 0; i < Map.layers().length(); i++) Map.layers().get(i).setShown(false)
      Map.layers().get(0).setShown(true)*/
    }
    if (key == 'Cairns-to-Cooktown') {
      Map.clear()
      generate_legend()
      Map.add(generate_infopanel())
      Map.setCenter(145.7724644805386, -16.42559735199881, 10)
      // cancook
      //Map.addLayer(cancook_dove, {bands: ['b3','b2','b1'], min: 100, max: 1300}, "Planet Dove mosaic", true)
      //Map.addLayer(cancook_dove_depth, {min: -1, max: 1200, palette:['#d0d1e6','#a6bddb','#74a9cf','#3690c0','#0570b0','#045a8d','#023858']}, "Planet water depth (m)", false)
      Map.addLayer(cancook_dove_geo, map_palettes.geo, "Planet Geomorphic map", false)
      Map.addLayer(cancook_dove_benthic, map_palettes.benthic, "Planet Benthic map", false)
      Map.addLayer(cancook_dove_waves, {min:0, max:1.8}, "Wave height (Planet depth + fetch model)", false)
      Map.addLayer(cancook_ls, {bands: ['b4','b3','b2'], min: 250, max: 2800}, "Landsat 8 mosaic", false)
      Map.addLayer(cancook_ls_depth.multiply(-1), {min: 0, max: 12, palette:['#d0d1e6','#a6bddb','#74a9cf','#3690c0','#0570b0','#045a8d','#023858']}, "Landsat water depth (m)", false)
      Map.addLayer(cancook_ls_geo, map_palettes.geo, "Landsat geomorphic map", false)
      Map.addLayer(cancook_ls_benthic, map_palettes.benthic, "Landsat benthic map", false)
      Map.addLayer(gbr_waves.updateMask(cancook_ls.select('b1').gt(0)), {min:0, max:1.5}, "Wave height (Landsat depth + wind/propagation model)", false)
      Map.addLayer(wcmc, {color:'#d92121'}, "UNEP WCMC 2018 v4", false)
      /*for (var i = 0; i < Map.layers().length(); i++) Map.layers().get(i).setShown(false)
      Map.layers().get(8).setShown(true)
      Map.layers().get(3).setShown(true)*/
    }
    if (key == 'South West Pacific') {
      Map.clear()
      generate_legend()
      Map.add(generate_infopanel())
      Map.setCenter(179.5756344117376, -17.533180604022583, 6)
      //swp
      Map.addLayer(ee.ImageCollection([swp_pix1,swp_pix2]).select(['b1','b2','b3']).mosaic(), {bands: ['b3','b2','b1'], min: 200, max: 1200}, "Planet Dove mosaic", true)
      Map.addLayer(ee.ImageCollection([swp_pix1,swp_pix2]).select(['depth']).mosaic(), {min: -1, max: 1200, palette:['#d0d1e6','#a6bddb','#74a9cf','#3690c0','#0570b0','#045a8d','#023858']}, "Water depth (m)", false)
      Map.addLayer(swp_geo.updateMask(swp_geo.gt(2)), map_palettes.geo, "Geomorphic map", false)
      Map.addLayer(swp_benthic, map_palettes.benthic, "Benthic map", false)
      Map.addLayer(wcmc, {color:'#d92121'}, "UNEP WCMC 2018 v4", false)
      /*for (var i = 0; i < Map.layers().length(); i++) Map.layers().get(i).setShown(false)
      Map.layers().get(17).setShown(true)*/
    }
    if (key == 'Great Barrier Reef') {
      Map.clear()
      generate_legend()
      Map.add(generate_infopanel())
      Map.setCenter(148.4478013572142, -18.7224115632265, 7)
      // gbr
      Map.addLayer(gbr_image, {bands: ['B4','B3','B2'], min: 500, max: 2200}, "Sentinel-2 mosaic", true)
      Map.addLayer(gbr_depth.updateMask(gbr_depth.lt(0)).multiply(-1), {min: 0, max: 12, palette:['#d0d1e6','#a6bddb','#74a9cf','#3690c0','#0570b0','#045a8d','#023858']}, "'Deep Reef' water depth (m)", false)
      Map.addLayer(gbr_geo, map_palettes.geo, "Geomorphic map", false)
      Map.addLayer(gbr_benthic, map_palettes.benthic, "Benthic map", false)
      Map.addLayer(gbr_waves, {min:0, max:1.5}, "Wave height (Deep reef depth + wind/propagation model)", false)
      Map.addLayer(wcmc, {color:'#d92121'}, "UNEP WCMC 2018 v4", false)
      /*for (var i = 0; i < Map.layers().length(); i++) Map.layers().get(i).setShown(false)
      Map.layers().get(12).setShown(true)*/
    }
    //Map.setCenter(places[key][0], places[key][1], 12)
  select.setPlaceholder(key)
  Map.add(select)
  }
})
select.setPlaceholder('Great Barrier Reef')
Map.add(select)
//print(Map.layers())