var bristol = ee.Image("users/jamesmfitton/Coastal_XRay/4_OutputWaterParcels/Non_Scotland/grid_bristol_channel"),
    humber = ee.Image("users/jamesmfitton/Coastal_XRay/4_OutputWaterParcels/Non_Scotland/grid_humber"),
    thewash = ee.Image("users/jamesmfitton/Coastal_XRay/4_OutputWaterParcels/Non_Scotland/grid_thewash"),
    northwales = ee.Image("users/jamesmfitton/Coastal_XRay/4_OutputWaterParcels/Non_Scotland/grid_northwales"),
    mersey = ee.Image("users/jamesmfitton/Coastal_XRay/4_OutputWaterParcels/Non_Scotland/grid_merseryside"),
    kilderry = ee.Image("users/jamesmfitton/Coastal_XRay/4_OutputWaterParcels/Non_Scotland/grid_kilderry"),
    limerick = ee.Image("users/jamesmfitton/Coastal_XRay/4_OutputWaterParcels/Non_Scotland/grid_limerick"),
    southwales = ee.Image("users/jamesmfitton/Coastal_XRay/4_OutputWaterParcels/Non_Scotland/grid_southwales"),
    london = ee.Image("users/jamesmfitton/Coastal_XRay/4_OutputWaterParcels/Non_Scotland/grid_london"),
    nz = ee.Image("users/jamesmfitton/Coastal_XRay/4_OutputWaterParcels/Non_Scotland/grid_NZ"),
    lakes = ee.Image("users/jamesmfitton/Coastal_XRay/4_OutputWaterParcels/Non_Scotland/grid_lakes"),
    iom = ee.Image("users/jamesmfitton/Coastal_XRay/4_OutputWaterParcels/Non_Scotland/grid_iom"),
    scotland = ee.Image("users/jamesmfitton/Coastal_XRay/4_OutputWaterParcels/All/Scotland_2019_05_12"),
    nwwales = ee.Image("users/jamesmfitton/Coastal_XRay/4_OutputWaterParcels/Non_Scotland/grid_nwWales"),
    esbjerg = ee.Image("users/jamesmfitton/Coastal_XRay/4_OutputWaterParcels/Non_Scotland/grid_esbjerg"),
    west_wales = ee.Image("users/jamesmfitton/Coastal_XRay/4_OutputWaterParcels/Non_Scotland/grid_west_wales"),
    barry = ee.Image("users/jamesmfitton/Coastal_XRay/4_OutputWaterParcels/Non_Scotland/grid_barry_island"),
    sw_wales = ee.Image("users/jamesmfitton/Coastal_XRay/4_OutputWaterParcels/Non_Scotland/grid_sw_wales"),
    limfjord = ee.Image("users/jamesmfitton/Coastal_XRay/4_OutputWaterParcels/Non_Scotland/grid_limfjord"),
    supermare = ee.Image("users/jamesmfitton/Coastal_XRay/4_OutputWaterParcels/Non_Scotland/grid_supermare"),
    old_grimsby = ee.Image("users/jamesmfitton/Coastal_XRay/4_OutputWaterParcels/Non_Scotland/grid_old_grimsby"),
    s_cornwall = ee.Image("users/jamesmfitton/Coastal_XRay/4_OutputWaterParcels/Non_Scotland/grid_s_cornwall"),
    foreshore = ee.FeatureCollection("users/jamesmfitton/Coastlines/OS_Local/OS_Local_Foreshore_GB_WGS"),
    ncornwall = ee.Image("users/jamesmfitton/Coastal_XRay/4_OutputWaterParcels/Non_Scotland/grid_n_cornwall"),
    MHW = ee.FeatureCollection("users/jamesmfitton/Coastlines/OS_Local/OS_Local_MHW_GB_WGS"),
    MLW = ee.FeatureCollection("users/jamesmfitton/Coastlines/OS_Local/OS_Local_MLW_GB_WGS"),
    w_jutland = ee.Image("users/jamesmfitton/Coastal_XRay/4_OutputWaterParcels/Non_Scotland/grid_west_jutland"),
    exeter = ee.Image("users/jamesmfitton/Coastal_XRay/4_OutputWaterParcels/Non_Scotland/grid_exeter"),
    weymouth = ee.Image("users/jamesmfitton/Coastal_XRay/4_OutputWaterParcels/Non_Scotland/grid_weymouth"),
    southeast = ee.Image("users/jamesmfitton/Coastal_XRay/4_OutputWaterParcels/Non_Scotland/grid_southeast"),
    norfolk = ee.Image("users/jamesmfitton/Coastal_XRay/4_OutputWaterParcels/Non_Scotland/grid_norfolk"),
    skegness = ee.Image("users/jamesmfitton/Coastal_XRay/4_OutputWaterParcels/Non_Scotland/grid_skegness"),
    scarborough = ee.Image("users/jamesmfitton/Coastal_XRay/4_OutputWaterParcels/Non_Scotland/grid_scarborough"),
    northeast = ee.Image("users/jamesmfitton/Coastal_XRay/4_OutputWaterParcels/Non_Scotland/grid_northeast"),
    iow = ee.Image("users/jamesmfitton/Coastal_XRay/4_OutputWaterParcels/Non_Scotland/grid_iow"),
    ne_jutland = ee.Image("users/jamesmfitton/Coastal_XRay/4_OutputWaterParcels/Non_Scotland/grid_ne_jutland"),
    east_jutland = ee.Image("users/jamesmfitton/Coastal_XRay/4_OutputWaterParcels/Non_Scotland/grid_east_jutland"),
    nw_jutland = ee.Image("users/jamesmfitton/Coastal_XRay/4_OutputWaterParcels/Non_Scotland/grid_nw_jutland"),
    arhus = ee.Image("users/jamesmfitton/Coastal_XRay/4_OutputWaterParcels/Non_Scotland/grid_arhus"),
    clacton = ee.Image("users/jamesmfitton/Coastal_XRay/4_OutputWaterParcels/Non_Scotland/grid_clacton"),
    odense = ee.Image("users/jamesmfitton/Coastal_XRay/4_OutputWaterParcels/Non_Scotland/grid_odense"),
    se_jutland = ee.Image("users/jamesmfitton/Coastal_XRay/4_OutputWaterParcels/Non_Scotland/grid_se_jutland"),
    e_zld = ee.Image("users/jamesmfitton/Coastal_XRay/4_OutputWaterParcels/Non_Scotland/grid_e_zld"),
    cph = ee.Image("users/jamesmfitton/Coastal_XRay/4_OutputWaterParcels/Non_Scotland/grid_cph"),
    roskilde = ee.Image("users/jamesmfitton/Coastal_XRay/4_OutputWaterParcels/Non_Scotland/grid_roskilde"),
    anholt = ee.Image("users/jamesmfitton/Coastal_XRay/4_OutputWaterParcels/Non_Scotland/grid_anholt"),
    s_zld = ee.Image("users/jamesmfitton/Coastal_XRay/4_OutputWaterParcels/Non_Scotland/grid_s_zld"),
    s_zld2 = ee.Image("users/jamesmfitton/Coastal_XRay/4_OutputWaterParcels/Non_Scotland/grid_s_zld2"),
    derry = ee.Image("users/jamesmfitton/Coastal_XRay/4_OutputWaterParcels/Non_Scotland/grid_derry"),
    suffolkCloud = ee.Image("users/jamesmfitton/Coastal_XRay/4_OutputWaterParcels/Non_Scotland/grid_suffolkCloud"),
    shetland = ee.Image("users/jamesmfitton/Coastal_XRay/4_OutputWaterParcels/Non_Scotland/grid_shetlandAgain"),
    oh = ee.Image("users/jamesmfitton/Coastal_XRay/4_OutputWaterParcels/Non_Scotland/grid_OH"),
    lowestoft = ee.Image("users/jamesmfitton/Coastal_XRay/4_OutputWaterParcels/Non_Scotland/grid_lowestoft2"),
    borre = ee.Image("users/jamesmfitton/Coastal_XRay/4_OutputWaterParcels/Non_Scotland/grid_borre"),
    ger1 = ee.Image("users/jamesmfitton/Coastal_XRay/4_OutputWaterParcels/Non_Scotland/grid_ger1"),
    ger2 = ee.Image("users/jamesmfitton/Coastal_XRay/4_OutputWaterParcels/Non_Scotland/grid_ger2"),
    fra1 = ee.Image("users/jamesmfitton/Coastal_XRay/4_OutputWaterParcels/Non_Scotland/grid_fra1"),
    fra2 = ee.Image("users/jamesmfitton/Coastal_XRay/4_OutputWaterParcels/Non_Scotland/grid_fra2"),
    ni = ee.Image("users/jamesmfitton/Coastal_XRay/4_OutputWaterParcels/Non_Scotland/grid_NI"),
    nl1 = ee.Image("users/jamesmfitton/Coastal_XRay/4_OutputWaterParcels/Non_Scotland/grid_nl1"),
    nl2 = ee.Image("users/jamesmfitton/Coastal_XRay/4_OutputWaterParcels/Non_Scotland/grid_nl2"),
    irl1 = ee.Image("users/jamesmfitton/Coastal_XRay/4_OutputWaterParcels/Non_Scotland/grid_irl1"),
    irl2 = ee.Image("users/jamesmfitton/Coastal_XRay/4_OutputWaterParcels/Non_Scotland/grid_irl2"),
    irl3 = ee.Image("users/jamesmfitton/Coastal_XRay/4_OutputWaterParcels/Non_Scotland/grid_irl3"),
    fra3 = ee.Image("users/jamesmfitton/Coastal_XRay/4_OutputWaterParcels/Non_Scotland/grid_fra3"),
    irl4 = ee.Image("users/jamesmfitton/Coastal_XRay/4_OutputWaterParcels/Non_Scotland/grid_irl4"),
    irl5 = ee.Image("users/jamesmfitton/Coastal_XRay/4_OutputWaterParcels/Non_Scotland/grid_irl5"),
    fundy = ee.Image("users/jamesmfitton/Coastal_XRay/4_OutputWaterParcels/Non_Scotland/grid_fundy"),
    canada = ee.Image("users/jamesmfitton/Coastal_XRay/4_OutputWaterParcels/Non_Scotland/grid_canada_test"),
    fra5 = ee.Image("users/jamesmfitton/Coastal_XRay/4_OutputWaterParcels/Non_Scotland/grid_fra5"),
    fra4 = ee.Image("users/jamesmfitton/Coastal_XRay/4_OutputWaterParcels/Non_Scotland/grid_fra4"),
    mdcr = ee.Image("users/jamesmfitton/Coastal_XRay/4_OutputWaterParcels/Non_Scotland/grid_madagascar"),
    lisbon = ee.Image("users/jamesmfitton/Coastal_XRay/4_OutputWaterParcels/Non_Scotland/grid_lisbon"),
    mdcr2 = ee.Image("users/jamesmfitton/Coastal_XRay/4_OutputWaterParcels/Non_Scotland/grid_madagascar2"),
    van = ee.Image("users/jamesmfitton/Coastal_XRay/4_OutputWaterParcels/Non_Scotland/grid_van"),
    nw_aus = ee.Image("users/jamesmfitton/Coastal_XRay/4_OutputWaterParcels/Non_Scotland/grid_nw_Aus");
Map.setCenter(-3.5, 55.5, 6);
Map.setOptions('HYBRID')
//Sentinel 2 Median Basemap
var collection = ee.ImageCollection('COPERNICUS/S2_SR')
    .filterDate('2016-01-01', '2020-01-01')
    // .filterBounds(geometry) // mangroves 
    .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE', 50))
    .select(['B2','B3','B4', 'B8', 'SCL'])
    .map(function(image){
      return image.float()
    })
var cloudMask2A = function(image){
      var maskDarkArea = image.select('SCL').eq(2)
      var maskCloudShadows = image.select('SCL').eq(3)
      var maskCloudsLowProb = image.select('SCL').eq(7)
      var maskCloudsMedProb = image.select('SCL').eq(8)
      var maskCloudsHighProb = image.select('SCL').eq(9)
      var maskCloudsCirrus = image.select('SCL').eq(10)
      var mask = maskDarkArea
          .add(maskCloudShadows)
          // .add(maskCloudsLowProb)
          .add(maskCloudsMedProb)
          .add(maskCloudsHighProb) 
          .add(maskCloudsCirrus)
          .gt(0)
      return image.updateMask(mask.eq(0)).float()
}
var compositeVis = {"opacity":1,"bands":["B4","B3","B2"],"min":0,"max":2000,"gamma":1};
Map.addLayer(collection.median(), compositeVis, 'S2A Median Composite', false)
//Global Surface Water Mask
var gsw = ee.Image('JRC/GSW1_0/GlobalSurfaceWater');
//GSW Water Mask
var gswWater = gsw.select('occurrence').gt(0).rename(['land/water']);
// var water = ee.FeatureCollection('users/tocimap/OSM/water_polygons')
var paletteYelBlu = ['#ffffd9', '#edf8b1', '#c7e9b4', '#7fcdbb', '#41b6c4', '#1d91c0', '#225ea8', '#253494', '#081d58', '#020f33'];
var collectionMosaic = ee.ImageCollection.fromImages(ee.List([humber,borre, mdcr,mdcr2,lisbon, nz, van, fundy, fra4, fra5, canada, irl1, irl2, irl3, irl4,irl5, fra3, nl2, fra1, fra2, ni, nl1,ger1, ger2, suffolkCloud,lowestoft, scarborough,s_zld,oh, s_zld2, anholt, roskilde, cph,  e_zld, se_jutland, odense, clacton, arhus, nw_jutland, ne_jutland, east_jutland,  iow, northeast, skegness, norfolk, southeast, thewash, bristol, northwales, mersey, kilderry, london, southwales, lakes, iom, scotland, nwwales, west_wales, barry, sw_wales, supermare, old_grimsby, s_cornwall, ncornwall, limfjord, exeter, weymouth, esbjerg, w_jutland,shetland, nw_aus])).mosaic()
var ndwiSum = collectionMosaic.select('ndwi_sum')
// print(collectionMosaic)
var xray = ndwiSum.updateMask(ndwiSum.gt(0))
Map.addLayer(ndwiSum.updateMask(ndwiSum.gt(0)), {min: 0, max: 100, palette: paletteYelBlu}, 'Coastal X-Ray', false)
Map.addLayer(ndwiSum.updateMask(ndwiSum.gt(0)).updateMask(gswWater.eq(1)), {min: 0, max: 100, palette: paletteYelBlu}, 'Coastal X-Ray Clipped', true)
Map.addLayer(ndwiSum.updateMask(ndwiSum.gt(80)), {min: 0, max: 100, palette: paletteYelBlu}, 'Coastal X-Ray 80%', false)
//LABEL: Start up title
var problemsTitle = ui.Label({
    value: 'Areas for Improvemnent',
    style: {
        margin: '1px 10px 5px 5px',
      fontSize: '24px',
        padding: '10px',
        color: '#616161',
        backgroundColor: '#11ffee00',
        }
});
var problemsLabel1 = ui.Label({
    value: '- Shadows create a problem for the NDWI filter, creating errors above MHWS.',
    style: {
        margin: '1px 10px 5px 5px',
        fontSize: '14px',
        color: '#000000',
        padding: '8px',
        backgroundColor: '#11ffee00'
    }
});
//LABEL: Problems
var problemsLabel2 = ui.Label({
    value: '- Shadows can be created by buildings, sea walls, forests, cliffs, dunes.',
    style: {
        margin: '1px 10px 5px 5px',
        fontSize: '14px',
        color: '#000000',
        padding: '8px',
        backgroundColor: '#11ffee00'
    }
});
//LABEL: Problems
var problemsLabel3 = ui.Label({
    value: '- In active ports and harbours, boats can create the effect of no water presence. ',
    style: {
        margin: '1px 10px 5px 5px',
        fontSize: '14px',
        color: '#000000',
        padding: '8px',
        backgroundColor: '#11ffee00'
    }
});
//BUTTON: add water images
var closeButton = ui.Button({
    label: 'Close',
    style: {
        fontSize: '14px',
        color: '#000000',
        backgroundColor: '#11ffee00'
    },
    onClick: function(){
      Map.remove(startUpPanel);
    }
});
//PANEL: Start up Panel
var startUpPanel = ui.Panel({
    widgets:[
        problemsTitle, //start up title
        problemsLabel1,
        problemsLabel2,
        problemsLabel3,
        closeButton
    ],
    style: {
    position: 'bottom-left',
    border: '2px solid black',
    width: '340px'
    }
});
// Map.add(startUpPanel)
// Make UI components.
var label = ui.Label({
  value:'Click on the map for water occurence information',
  style: {
        margin: '1px 10px 5px 5px',
        fontSize: '14px',
        color: '#000000',
        padding: '8px',
        backgroundColor: '#11ffee00'
    }
});
var inspector = ui.Panel({
  widgets: [label],
  layout: ui.Panel.Layout.flow('horizontal')
});
function inspect(coords) {
  inspector.clear();
  inspector.add(ui.Label('Loading...', {color: 'gray'}));
  inspector.style().set('shown', true);
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var getNDWISum = ndwiSum.reduceRegion({
    reducer: ee.Reducer.first(), 
    geometry: point, 
    scale: 30,
  }).get('ndwi_sum');
   var NDWISum = ee.Number(getNDWISum).round()
  var getImageCount = collectionMosaic.reduceRegion({
    reducer: ee.Reducer.first(), 
    geometry: point, 
    scale: 30,
  }).get('collectionLength');
  var titleLabel = ui.Label({
    value: 'Water Occurence:',
    style: {
      fontWeight: 'bold',
      stretch: 'vertical',
    }
  });
  var elevationLabel = ui.Label(
    {
      value: NDWISum.getInfo()+'% (of '+getImageCount.getInfo()+ ' images)', 
      style: {
        fontSize: '14px',
        fontWeight: '50',
        color: '#000000',
        padding: '8px',
        backgroundColor: '#11ffee00',
        stretch: 'vertical'
    }
    })
    ;
  var closeButton = ui.Button({
    label: 'Close', 
    onClick: function() {
      inspector.clear();
      inspector.style().set('shown', false);
    }
  });
  inspector.clear();
  inspector.add(titleLabel);
  inspector.add(elevationLabel);
  inspector.add(closeButton);
}
// Set up the map.
Map.add(inspector);
Map.onClick(inspect);
Map.style().set('cursor', 'crosshair');
Map.addLayer(foreshore, {color: 'fc4e2a'}, 'Foreshore (OS Local)', false)
Map.addLayer(MLW, {color: 'fd8d3c'}, 'MLW (OS Local)', false)
Map.addLayer(MHW, {color: 'bd0026'}, 'MHW (OS Local)', false) 
//MURRAY Intertidal -acts as a guide
var intertidal =  ee.ImageCollection("UQ/murray/Intertidal/v1_1/global_intertidal");
Map.addLayer(intertidal.filterMetadata('system:index', 'equals','2014-2016'), {"opacity":1,"bands":["classification"],"palette":["48918a"]}, 'Murray Intertidal 2014-16', false)
//OSM coastline
var coastline = ee.FeatureCollection("users/gena/eo-bathymetry/osm-coastline")
Map.addLayer(coastline, {}, 'OSM Coastline', false)
// Export.image.toDrive({
//   image: ndwiSum.float().clip(geometry),
//   description: 'CoastalXRay_GB_2019_06_18',
//   region: geometry,
//   scale: 10,
//   maxPixels: 1e13
// })
 /***  * from https://snazzymaps.com  */ 
 var MAP_STYLES = {'Light Grey': [
    {
        "featureType": "administrative",
        "elementType": "all",
        "stylers": [
            {
                "saturation": "-100"
            }
        ]
    },
    {
        "featureType": "administrative.province",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": 65
            },
            {
                "visibility": "on"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "all",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "lightness": "50"
            },
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "saturation": "-100"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "all",
        "stylers": [
            {
                "lightness": "30"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "all",
        "stylers": [
            {
                "lightness": "40"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "saturation": -100
            },
            {
                "visibility": "simplified"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "hue": "#ffff00"
            },
            {
                "lightness": -25
            },
            {
                "saturation": -97
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "labels",
        "stylers": [
            {
                "lightness": -25
            },
            {
                "saturation": -100
            }
        ]
    }
], 'Dark Grey': [
    {
        "featureType": "all",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "saturation": 36
            },
            {
                "color": "#000000"
            },
            {
                "lightness": 40
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#000000"
            },
            {
                "lightness": 16
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 20
            }
        ]
    },
    {
        "featureType": "administrative",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 17
            },
            {
                "weight": 1.2
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 20
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 21
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 17
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 29
            },
            {
                "weight": 0.2
            }
        ]
    },
    {
        "featureType": "road.arterial",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 18
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 16
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 19
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#000000"
            },
            {
                "lightness": 17
            }
        ]
    }
]
}
Map.setOptions('Light Grey', MAP_STYLES)