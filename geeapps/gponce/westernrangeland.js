var us_states = ui.import && ui.import("us_states", "table", {
      "id": "TIGER/2018/States"
    }) || ee.FeatureCollection("TIGER/2018/States"),
    huc12 = ui.import && ui.import("huc12", "table", {
      "id": "USGS/WBD/2017/HUC12"
    }) || ee.FeatureCollection("USGS/WBD/2017/HUC12"),
    ftv_huc12_clip = ui.import && ui.import("ftv_huc12_clip", "featureViewLayer", {
      "id": "users/gponce/usda_ars/assets/ft_views/huc12_us_west_clipped_v2",
      "name": "huc12_us_west_clipped_v2"
    }) || ui.Map.FeatureViewLayer("users/gponce/usda_ars/assets/ft_views/huc12_us_west_clipped_v2", null, "huc12_us_west_clipped_v2"),
    r_gaplf = ui.import && ui.import("r_gaplf", "image", {
      "id": "users/gponce/usda_ars/images/gap_landfire_nte2011"
    }) || ee.Image("users/gponce/usda_ars/images/gap_landfire_nte2011"),
    range_huc12 = ui.import && ui.import("range_huc12", "table", {
      "id": "users/gponce/usda_ars/shapefiles/HUC/rangeland_area_by_huc12"
    }) || ee.FeatureCollection("users/gponce/usda_ars/shapefiles/HUC/rangeland_area_by_huc12"),
    ftv_rangehuc12 = ui.import && ui.import("ftv_rangehuc12", "featureViewLayer", {
      "id": "users/gponce/usda_ars/assets/ft_views/rangeland_area_by_huc12",
      "name": "rangeland_area_by_huc12"
    }) || ui.Map.FeatureViewLayer("users/gponce/usda_ars/assets/ft_views/rangeland_area_by_huc12", null, "rangeland_area_by_huc12"),
    ftv_nhd_lines_us_west = ui.import && ui.import("ftv_nhd_lines_us_west", "featureViewLayer", {
      "id": "users/gponce/usda_ars/assets/ft_views/ftv_nhd_lines_us_west",
      "name": "ftv_nhd_lines_us_west"
    }) || ui.Map.FeatureViewLayer("users/gponce/usda_ars/assets/ft_views/ftv_nhd_lines_us_west", null, "ftv_nhd_lines_us_west"),
    ftv_rangehuc12hw = ui.import && ui.import("ftv_rangehuc12hw", "featureViewLayer", {
      "id": "users/gponce/usda_ars/assets/ft_views/rangeland_area_by_huc12hw",
      "name": "rangeland_area_by_huc12hw"
    }) || ui.Map.FeatureViewLayer("users/gponce/usda_ars/assets/ft_views/rangeland_area_by_huc12hw", null, "rangeland_area_by_huc12hw"),
    rangelandGAP = ui.import && ui.import("rangelandGAP", "image", {
      "id": "users/gponce/usda_ars/assets/images/rangeland/rangeland_gap"
    }) || ee.Image("users/gponce/usda_ars/assets/images/rangeland/rangeland_gap"),
    ftv_rangehuc12hw_stream = ui.import && ui.import("ftv_rangehuc12hw_stream", "featureViewLayer", {
      "id": "users/gponce/usda_ars/assets/ft_views/ftv_rangeland_area_stream_density_by_huc12",
      "name": "ftv_rangeland_area_stream_density_by_huc12"
    }) || ui.Map.FeatureViewLayer("users/gponce/usda_ars/assets/ft_views/ftv_rangeland_area_stream_density_by_huc12", null, "ftv_rangeland_area_stream_density_by_huc12");
/* 
Goal: 
    + To visualize spatial distribution of the Western U.S. Rangeland area across HUC12 watersheds (headwaters, mainly)
Inputs:
    + USGS WBD, 2013
    + U.S. States Tiger DB, 2018
    + GAP Landfire classification, 2011
Output:
    + A feature view of with the percentage rangeland area within each HUC12 polygon
    + A feature view of the NHD stream features for the Western U.S. States
    + A slider control to filter out watersheds by rangeland area
Author: 
    USDA-ARS Southwest Watershed Research Center, Tucson AZ.
Date: 
    07/25/2022
*/ 
// U.S. States boundaries, filter for western states.
var fcStates = us_states.filter(ee.Filter.inList('NAME', ['Arizona',
                                                           'New Mexico',
                                                           'Utah',
                                                           'Colorado',
                                                           'California',
                                                           'Nevada',
                                                           'Oregon',
                                                           'Idaho',
                                                           'Wyoming',
                                                           'Washington',
                                                           'Montana',
                                                           'North Dakota',
                                                           'South Dakota',
                                                           'Nebraska',
                                                           'Kansas',
                                                           'Oklahoma',
                                                           'Texas']))
var ftv_States = ui.Map.FeatureViewLayer("TIGER/2018/States_FeatureView")
var v_state_visParams = {
     rules: [
      {
        filter: ee.Filter.or(ee.Filter.eq('NAME', 'Arizona'),
                                                          ee.Filter.eq('NAME',  'New Mexico'),
                                                          ee.Filter.eq('NAME',  'Utah'),
                                                          ee.Filter.eq('NAME',  'Colorado'),
                                                          ee.Filter.eq('NAME',  'California'),
                                                          ee.Filter.eq('NAME',  'Nevada'),
                                                          ee.Filter.eq('NAME',  'Oregon'),
                                                          ee.Filter.eq('NAME',  'Idaho'),
                                                          ee.Filter.eq('NAME',  'Wyoming'),
                                                          ee.Filter.eq('NAME',  'Washington'),
                                                          ee.Filter.eq('NAME',  'Montana'),
                                                          ee.Filter.eq('NAME',  'North Dakota'),
                                                          ee.Filter.eq('NAME',  'South Dakota'),
                                                          ee.Filter.eq('NAME',  'Nebraska'),
                                                          ee.Filter.eq('NAME',  'Kansas'),
                                                          ee.Filter.eq('NAME',  'Oklahoma'),
                                                          ee.Filter.eq('NAME',  'Texas')),
        polygonStrokeWidth: 2.5,
        polygonStrokeColor: 'EEFC5E',
        polygonFillOpacity:0
      }
    ]
  }
ftv_States.setVisParams(v_state_visParams)
ftv_States.setName('Western U.S. States')
// Get just the Western boundaries
var dis_states = fcStates.geometry().dissolve(1) 
// Filter GAP Landfire layer for the ecological systems codes that were defined as rangeland
var gapLF = r_gaplf.select('b1')
var rl = [138,136, 1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,41,42,44,45,46,47,48,49,50,51,52,53,54,55,56,65,70,116,118,119,137,139,142,143,144,146,148,155,156,157,159,161,162,163,164,166,170,174,175,176,180,181,182,183,184,185,186,187,188,189,190,191,192,193,194,195,196,197,198,199,201,202,203,204,207,208,210,212,213,214,215,216,217,218,219,220,221,223,224,225,226,227,228,229,230,231,232,233,234,235,236,237,238,239,240,241,242,243,244,245,246,247,248,249,250,251,252,254,255,256,257,258,259,260,261,262,263,264,265,268,270,271,272,277,278,279,280,281,283,284,285,286,287,288,289,300,334,336,341,351,363,413,414,436,469,511,512,  // Rangeland Forest Woodland
          306,442,460,461,462,463,464,465,466,467,468,470,471,472,473,474,475,476,477,478,479,480,481,482,483,484,485,486,487,488,489,490,491,492,493,494,495,496,497,498,499,538,539,540,541,542,543,544,545,546,547,548,  // Desert-Semi-arid           
          59,117,200,253,266,269,274,275,282,290,291,292,293,294,295,296,297,298,299,301,302,303,304,305,307,308,309,310,311,312,313,314,315,316,317,318,319,320,321,322,323,324,325,326,327,328,329,330,331,332,333,335,337,338,339,340,342,343,344,345,346,347,348,349,350,352,353,354,355,356,357,358,359,360,361,362,364,365,366,367,368,370,371,372,373,374,375,376,377,378,379,380,381,382,383,384,385,386,387,388,389,390,391,392,393,395,396,397,398,399,400,401,402,403,404,405,406,407,408,409,410,411,412,415,416,417,420,422,423,424,425,426,427,428,429,430,432,433,434,435,437,438,439,440,441,443,444,445,446,447,448,449,450,451,452,453,454,455,456,457,458,459,508,526,527,528 // Shrub & Herb
          ]
var proj = r_gaplf.projection()      
var imgRange = gapLF.remap(rl, rl).rename('Rangeland');
var maskRange1 = imgRange.neq(0)
var gapRangeMask2 = imgRange.updateMask(maskRange1).rename('Rangelands');
var boundsWest = fcStates.geometry().bounds()
var rangeLand = "FF3419"
//"FF3419"
// Export rangeland area
// Export.image.toAsset({image:ee.Image(gapRangeMask2).select('Rangelands'), 
//                       description:'Rangeland_based_GAP', 
//                       assetId:'users/gponce/usda_ars/assets/images/rangeland/rangeland_gap_v2', 
//                       region:fcStates.geometry(), 
//                       //scale:30, 
//                       crs:proj.crs().getInfo(),
//                       crsTransform: [30,0,-2361135,0,-30,3177315],
//                       maxPixels:1e13})
//Map.addLayer(gapRangeMask2.clip(fcStates), {palette:rangeLand}, 'Rangeland', true, 0.7)    
// To load it faster, make it an asset instead of reclassifying 'on the fly'.
Map.addLayer(rangelandGAP.clip(fcStates), {palette:rangeLand}, 'Rangeland', true, 0.7)  
var updateVisParams = function() {
  ftv_rangehuc12hw_stream.setVisParams({
    polygonStrokeColor:'darkblue',
    polygonFillOpacity:0.7,
    polygonStrokeWidth: 1.0,
    polygonFillColor: {
      property: 'stream_den',
      mode: 'interval',
      palette: [
        [0, '8cd3ff'],
        [1.5, '26abff'],
        [2.0, '1065c0'],
        [3.0, '0747a1']
      ]
    },
    rules: [
      {
        filter: ee.Filter.lte('pct_rangel', filterSlider.getValue()),
        isVisible: false,
      }
    ],
  });
};
// Slider widget that calls the updateVisParams function on change.
var filterSlider = ui.Slider({
  min: 1,
  max: 100,
  step: 1,
  value: 50,
  style: { stretch: 'horizontal',maxWidth:'300px', minWidth:'300px'},
  onChange: updateVisParams,
});
var filterSliderLabel = ui.Label({value:'Use the slider to adjust the visibility of HUC12 headwaters based on the percentage of rangeland area (%) that you specify.',
                                  style: { 
                                  fontSize: '12px',
                                  width: '300px',
                                  whiteSpace: 'pre-wrap'}})
// Add the slider to the map.
Map.add(ui.Panel([filterSliderLabel, filterSlider]));
// Initialize the FeatureViewLayer style.
updateVisParams();
// Add the FeatureViewLayer to the map.
Map.add(ftv_rangehuc12hw_stream.setName('HUC12'));
// Map.addLayer(fcStates.style({color:'00FF00', fillColor:'FFFFFF00', width:3}),{}, 'Western U.S. States')
Map.add(ftv_States)
Map.setOptions('hybrid')
Map.setCenter(-105.6827,38.9442, 6)
// Add NHD Lines FeatureView for Western US States
var visParams = {
  lineWidth: 1,
  color: {
    property: 'FLOWDIR',
    categories: [
      [0, '00FF00'],
      [1, '00FF00']
    ]
  }
};
ftv_nhd_lines_us_west.setVisParams(visParams)
ftv_nhd_lines_us_west.setName('NHD_Lines')
// Add Hydroshed Free Flowing rivers
var fvLayer = ui.Map.FeatureViewLayer('WWF/HydroSHEDS/v1/FreeFlowingRivers_FeatureView');
visParams = {
  lineWidth:3,
  color: {
    property: 'RIV_ORD',
    mode: 'linear',
    palette: ['00FFFF', '00FFFF', '00FFFF', '00FFFF', '00FFFF'],
    min: 1,
    max: 10
  }
};
fvLayer.setVisParams(visParams);
fvLayer.setName('Rivers (HydroSheds)')
fvLayer.setShown(false)
Map.add(fvLayer)
Map.add(ftv_nhd_lines_us_west)
var legend = ui.Panel({
  style: {
    position: 'bottom-left',
    padding: '8px 15px'
  }
});
// Create and add the legend title.
var legendTitle = ui.Label({
                  value: 'Western U.S. Headwaters (HUC12)',
                  style: {
                    fontWeight: 'bold',
                    fontSize: '26px',
                    margin: '0 0 4px 0',
                    padding: '0'
                  }
});
legend.add(legendTitle);
var strCol = ['FF3419','00FFFF','00FF00','EEFC5E']
//['00FF00','F6CF65','000000','00AAFF','797EF6']
var strDesc = ['Rangeland','Rivers (HydroShed)', 'Streams (NHD)','Western U.S. States']
//['Western States', 'Rangeland', 'Western Headwaters HUC12', 'Streams (NHD)', 'Rivers (HydroShed)']
var di = 0;
var r1;
strCol.forEach(function (col)
{
  var colorBox = ui.Label({
    style: {
      backgroundColor: '#' + col,
      // Use padding to give the box height and width.
      padding: '11px',
      margin: '0 0 4px 0',
    }
  });
  // Create the label filled with the description text.
  var description = ui.Label({
    value: strDesc[di],
    style: {margin: '0 0 4px 6px',fontSize: '24px'}
  });
  var r1 = ui.Panel({
    widgets: [colorBox, description],
    layout: ui.Panel.Layout.Flow('horizontal'),
  });
 di = di + 1  
 legend.add(r1)
});
var cb1 = ui.Label({
  style:
    {
      backgroundColor: '#' + '8cd3ff',
      // Use padding to give the box height and width.
      padding: '11px',
      margin: '3px 0 4px 0',
    }
})
var cb2 = ui.Label({
  style:
    {
      backgroundColor: '#' + '26abff',
      // Use padding to give the box height and width.
      padding: '11px',
      margin: '3px 0 4px 0',
    }
})
var cb3 = ui.Label({
  style:
    {
      backgroundColor: '#' + '1065c0',
      // Use padding to give the box height and width.
      padding: '11px',
      margin: '3px 0 4px 0',
    }
})
var cb4 = ui.Label({
  style:
    {
      backgroundColor: '#' + '0747a1',
      // Use padding to give the box height and width.
      padding: '11px',
      margin: '3px 0 4px 0',
    }
})
var description = ui.Label({
    value: 'Headwaters (Stream density)',
    style: {margin: '0 0 4px 6px',fontSize: '24px'}
  });
var low = ui.Label({
    value: 'Low',
    style: {margin: '1px 0 4px 50px',fontSize: '18px'}
  });
var high = ui.Label({
    value: 'High',
    style: {margin: '1px 0 1px 1px',fontSize: '18px'}
  });  
var r1 = ui.Panel({
    widgets: [description],
    layout: ui.Panel.Layout.Flow('horizontal'),
  });  
legend.add(r1)  
var r1 = ui.Panel({
    widgets: [low,cb1,cb2,cb3,cb4,high],
    layout: ui.Panel.Layout.Flow('horizontal'),
  });
legend.add(r1)
var r1 
// var v_units = ui.Label({
//     value: 'km ⋅ km²',
//     style: {margin: '0px 0px 0px 50px',fontSize: '11px'}
//   });
// var r1 = ui.Panel({
//     widgets: [v_units],
//     layout: ui.Panel.Layout.Flow('horizontal'),
//   });  
// legend.add(r1)  
Map.add(legend)