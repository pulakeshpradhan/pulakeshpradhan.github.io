var SRER = ee.ImageCollection("users/gponce/usda_ars/image_collections/neon_srer_2017_rgb"),
    ltar = ee.FeatureCollection("users/gponce/usda_ars/shapefiles/LTAR/ltar_boundaries");
var SRER_2017 = SRER.mosaic()
Map.addLayer(SRER_2017,{},'SRER_NEON_2017')
Map.addLayer(ltar.style({
                          width:2,
                          color:'#FF00FF',
                          fillColor:'#00FF0000'
                        }),{},"LTAR AREAS",true)
Map.add(ui.Select({
    style: {
      'position': 'top-center'
    }
  }).setPlaceholder('SRER-NEON-RGB-10cm_2017'))  
Map.setCenter(-110.87611, 31.84496,12)