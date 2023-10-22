var naip_collection = ui.import && ui.import("naip_collection", "imageCollection", {
      "id": "USDA/NAIP/DOQQ"
    }) || ee.ImageCollection("USDA/NAIP/DOQQ"),
    vis_clf = ui.import && ui.import("vis_clf", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "classification"
        ],
        "min": 0,
        "max": 3,
        "palette": [
          "ff3300",
          "f7f137",
          "72ff1b",
          "0d15ff"
        ]
      }
    }) || {"opacity":1,"bands":["classification"],"min":0,"max":3,"palette":["ff3300","f7f137","72ff1b","0d15ff"]},
    cities = ui.import && ui.import("cities", "table", {
      "id": "users/Shree1175/CODA_assets/MSA_UrbanCities_USA2018_biome_final2019_updated"
    }) || ee.FeatureCollection("users/Shree1175/CODA_assets/MSA_UrbanCities_USA2018_biome_final2019_updated"),
    final_canopy = ui.import && ui.import("final_canopy", "imageCollection", {
      "id": "users/Shree1175/CODA_Canopy/FinalCollection"
    }) || ee.ImageCollection("users/Shree1175/CODA_Canopy/FinalCollection"),
    naipCollection = ui.import && ui.import("naipCollection", "imageCollection", {
      "id": "projects/GlobalHabitatLoss/US_NAIP2016"
    }) || ee.ImageCollection("projects/GlobalHabitatLoss/US_NAIP2016");
///------------------------------------------------------------------------
// Assessment of Urban Tree Cover Inequality across US 
// The Nature Conservancy
// Step 1 : View Classified Urban Tree Cover 
// -------------------------------------------------------------------------
// Reference : McDonald R.I, Biswas T, Sachar C, Housman I, Boucher T.M., Balk D, Nowak D, Spotswood E,Stanley C.K., 
// and Leyk S., (2021). PLOSone. The urban tree cover and temperature disparity in US urbanized areas: 
// Quantifying the effect of income across 5,723 communities
// -------------------------------------------------------------------------
// This script provides access to view the urban tree cover mapped at 2m resolution across 
// 5723 US cities using NAIP 2016 following a Random Forest approach to get an estimate to 
// tree cover at census block and explore spatial patterns of tree cover inequality across 
// income and population group. The urbanized areas were grouped into ten geographically 
// defined groups predominantly determined by the biomes (Supplementary 
// Table S1 & Supplementary Fig. S2),as defined by Olson et al., (2001). 
// These biomes were further grouped into smaller zones based on regional vegetation types. 
// Training data created by Nowak and Greenfield (2018)
// was used to train a Random Forest algorithm to map tree and non-tree within each zone.
// Refer to McDonald et al., (2021) for more information on methods. 
// ---------------------------------------------------------------------------
// The overall accuracy of our tree canopy data at 2m resolution across US varies from 70-82% 
// and met the goals of our study to assess tree cover and tree cover inequality at census block level. 
// Please refer to our paper to learn more about the methods. The script is currently set to
// export the canopy cover by each city within a mapped zone **see line 64 - 65** 
// to export the canopy for your study area. For more accurate assessment of tree cover 
// within each block we recommend collecting additional training points to refine 
// the product. Please feel to reach out to us if you are interested in applying or
// expanding our algorithm and tree canopy dataset to your research. 
// ---------------------------------------------------------------------------
// Developed by Tanushree Biswas, PhD
// Spatial Data Scientist,
// The Nature Conservancy, 
// California 
// Email : tanushree.biswas@tnc.org
// ----------------------------------------------------------------------------
// Data Viewer: users/Shree1175/urbanforestatlast2016v25
//-----------------------------------------------------------------------------
// Definations: 
// -------------
// Urban Areas(UAs) : All US urbanized areas larger than 500 km2. This included 100 urbanized area 
// housing 167 million people (nearly 55% of the total US population) and containing a total of  5,723 incorporated
// places (cities and towns) and census-designated places in 2010 (see Methods for definitions of these terms). 
// ----------------
//  Mapping Zones 
// -----------------
//  [Temperate broadleaf and mixed forests (zone 1 - 4, 31)]
//  zone 1  : Temperate broadleaf: Central UAs
//  zone 2  : Temperate broadleaf: Upper North UAs
//  zone 3  : Temperate broadleaf: Northeast UAs
//  zone 4  : Temperate broadleaf: Southern UAs
//  zone 31 : Temperate broadleaf: Upper Northeast UAs
//  zone 5  : Temperate coniferous forests
//  zone 10 : Temperate grasslands, savannas and shrublands
//  zone 12 : Western UAs (Mediterranean and forest biomes)
//  zone 13 : Deserts and xeric shrublands
//  zone 19 : Tropical Forest and Grassland
// --------------------------------------------------------------------------------------
// VIEW CLASSIFIED CANOPY COVER WITHIN US -- select a mapping zone to load NAIP 2016
// --------------------------------------------------------------------------------------
var naip_col = ee.ImageCollection(naipCollection).mosaic();
//print('exported naip : ', ee.ImageCollection('projects/GlobalHabitatLoss/US_NAIP2016'))
// Define City or zone to export Canopy Cover 
var zone = 12;
var sa = ee.FeatureCollection(cities).filter(ee.Filter.inList('zone',[zone]));
var city = ee.Dictionary(sa.aggregate_histogram('Name'))
print('Urban Tree Canopy Mapped within this zone: ', sa.size());
print('Cities mapped within this zone', city)
//Select City to Export Canopy from the object printed in the console
var city_name = 'Portland, OR--WA';
//---- VIEW CLASSIFIED CANOPY FOR US AND EXPORT CANOPY FOR ABOVE CITY --------------------------------
var urbancities = ee.FeatureCollection(cities);
print('Check Urban data', urbancities);
var outputCRS = 'EPSG:5070';
//Select city to export canopy
var sa = urbancities.filter(ee.Filter.inList('Name',[city_name]));
//////////////////////////////////////////////////////////
// Cities Mapped within this zone
/////////////////////////////////////////////////////////
var city_list = ee.Dictionary(sa.aggregate_histogram('Name'))
print('Urban Canopy mapped for following cities', city_list)
//Zoom into the study area
Map.centerObject(sa, 10);
////////////////////////////////
//View Final Canopy on NAIP 2016 
////////////////////////////////
var empty = ee.Image().byte();
var outline2 = empty.paint({featureCollection: sa, color: 2, width: 3});
var redPalette = {min:0, max : 1, palette:["e4e9b9","81bd6e","238433","004529"]};
var vis_can = {bands: ["classification"], opacity: 0.75, palette: ["6fff15"]}
var canopy = ee.ImageCollection(final_canopy).mosaic().clip(sa)
var naip2016 = ee.ImageCollection(naipCollection).mosaic().clip(sa)
Map.addLayer(naip_col, {'bands': ['R', 'G', 'B']}, 'naip 2016');
Map.addLayer(final_canopy.mosaic(),vis_can,'US TreeCanopy Mapped', true);
Map.addLayer(naip2016, {'bands': ['R', 'G', 'B']}, 'naip2016_export', false);
Map.addLayer(canopy,vis_can,'TreeCanopy_city_export', false);
Map.addLayer(outline2, {palette: '0000FF'}, 'City Exported',true);
///////////////////////////////////////////////////
print('Export NAIP and Final Canopy by City ')
///////////////////////////////////////////////////
//getCities_name
var cityNames = ee.Dictionary(sa.aggregate_histogram('Name')).keys().getInfo();
var outputCRS = 'EPSG:5070';
cityNames.map(function(cn){
  var cityBoundary = ee.Feature(sa.filter(ee.Filter.eq('Name',cn)).first());
  var clip_canopy = ee.Image(canopy).clip(cityBoundary)
  var clip_naip = ee.Image(naip2016).clip(cityBoundary)
  cn = cn.replace(/\s+/g,'-');
  cn = cn.replace(/\,/g,'-');
  //Map.addLayer(clip_canopy,{},cn,false)
  var canopyImage = clip_canopy;
  Export.image.toAsset({
      image: canopyImage,
      description: 'Tree_canopy_' +cn,
      scale: 2,
      crs: outputCRS,
      region: cityBoundary.geometry().bounds(),
      maxPixels: 1.0e13,
    })
  var naipImage = clip_naip;
    Export.image.toAsset({
      image: naip2016,
      description: 'NAIP2016_' +cn,
      scale: 2,
      crs: outputCRS,
      region: cityBoundary.geometry().bounds(),
      maxPixels: 1.0e13,
    })
})
// --------------------------------------------------------------------------------------
// CREATE SIDE PANEL
// --------------------------------------------------------------------------------------
// create panel and set style 
var panel = ui.Panel();
panel.style().set('width', '500px');
// create title text 
var intro = ui.Panel([
  ui.Label({
    value: 'Assessment of Urban Tree Cover Inequality across the U.S., The Nature Conservancy, 2021',
    style: {fontSize: '20px', fontWeight: 'bold'}
  })
]);
// add title to panel
panel.add(intro);
// create subtitle text 
var subtitle = ui.Panel([
  ui.Label({
    value: 'View Classified Urban Tree Cover',
    style: {fontSize: '16px', fontWeight: 'bold'}
  })
]);
// add title to panel
panel.add(subtitle);
// upload The Nature Conservancy logo
var logo = ee.Image('users/charlotteks/TNC_Logo').visualize({
    bands:  ['b1', 'b2', 'b3'],
    min: 0,
    max: 255
    });
var thumb = ui.Thumbnail({
    image: logo,
    params: {
        dimensions: '1329x384', 
        format: 'png'
        },
    style: {height: '48px', width: '166px',padding :'0'}
    });
var Logo = ui.Panel(thumb, 'flow', {width: '300px'});
// add hyperlink to US viewer
var label_url_viewer = ui.Label({
    value:'Click here to view the US Urban Tree Cover Inequality Atlas.',
    style: {fontSize: '13px', fontWeight: 'bold'}
  });
label_url_viewer.setUrl('https://shree1175.users.earthengine.app/view/urbanforestatlast2016v25');
// add hyperlink to github
var label_url_github = ui.Label({
    value:'Click here to view the script and data in Github.',
    style: {fontSize: '13px', fontWeight: 'bold'}
  });
label_url_github.setUrl('https://github.com/tnc-ca-geo/urban-tree-inequality');
var label_paper = ui.Label({
    value:'Link to the manuscript.',
    style: {fontSize: '14px', fontWeight: 'bold'}
  });
label_paper.setUrl('https://doi.org/10.1371/journal.pone.0249715');
// write description text
var description = ui.Panel([
  ui.Label({
  value: 'This script provides access to view the urban tree cover mapped at 2-meter resolution across 5,723 US cities using NAIP 2016 following a Random Forest model to estimate tree cover inequality at census block level across income and population groups. The urbanized areas were grouped into ten geographically defined groups predominantly determined by the biomes (Supplementary Table S1 & Supplementary Fig. S2), as defined by Olson et al., (2001). These biomes were further grouped into smaller zones based on regional vegetation types. Training data created by Nowak and Greenfield (2018) was used to train a Random Forest algorithm to map tree and non-tree within each zone. Refer to McDonald et al., (2021) for more information on methods.',
  style: {fontSize: '13px' }
  }),
  ui.Label({
  value: 'The overall accuracy of our tree canopy data across US varies from 70-82% and met the goals of our study to assess tree cover and tree cover inequality at census block level. Please refer to our paper to learn more about the methods. For more accurate assessment of tree cover within each block we recommend collecting additional training points to refine the product. Please feel to reach out to us if you are interested in applying or expanding our algorithm and tree canopy dataset to your research. ',
  style: {fontSize: '13px' }
  }),
  label_url_viewer, label_url_github, 
  label_paper,
  ui.Label({
    value:'Point of Contact',
    style: {fontSize: '11px', fontWeight: 'bold'}
  }),
    ui.Label({
    value:'Technical Lead: Tanushree Biswas, PhD, Spatial Data Scientist, The Nature Conservancy, California; Email: tanushree.biswas@tnc.org',
    style: {fontSize: '11px'}
  }),
      ui.Label({
    value:'Manuscript Author: Robert McDonald, PhD, Lead Scientist, Nature Based Solutions; Email: rob_mcdonald@tnc.org', 
    style: {fontSize: '11px'}, 
  }),
    ui.Label({
    value:'Reference',
    style: {fontSize: '11px', fontWeight: 'bold'}
  }),
      ui.Label({
  value: 'McDonald R.I, Biswas T, Sachar C, Housman I, Boucher T.M., Balk D, Nowak D, Spotswood E, Stanley C.K., and Leyk S., The urban tree cover and temperature disparity in US urbanized areas: Quantifying the effect of income across 5,723 communities (PLOSone April 2021).',
  style: {fontSize: '11px' }
  }),
]);
// add description to panel
panel.add(description);
// add logo to panel
panel.add(Logo);
// add panel to display 
ui.root.insert(0, panel);