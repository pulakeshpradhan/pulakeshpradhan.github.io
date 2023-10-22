var po_id = ui.import && ui.import("po_id", "table", {
      "id": "users/ariaesta/Greenpeace/PO_2020"
    }) || ee.FeatureCollection("users/ariaesta/Greenpeace/PO_2020"),
    indo = ui.import && ui.import("indo", "table", {
      "id": "users/ariaesta/Boundary/Province_2019"
    }) || ee.FeatureCollection("users/ariaesta/Boundary/Province_2019"),
    selected = ui.import && ui.import("selected", "geometry", {
      "geometries": [],
      "displayProperties": [],
      "properties": {},
      "color": "#ff0000",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #ff0000 */ee.Geometry.MultiPoint();
/*******************************************************************************
 --------------------------- The Forest Visualizer -------------------------- ||
 ------------- Oil Palm Concession, Tree Cover Loss, Forest Cover ----------- ||
********************************************************************************
 Author: Gilang Aria Seta 
 (gilang.aria.seta@greenpeace.org)
 Last update: 17 Dec 2021
 *******************************************************************************
 * BASEMAP
 ******************************************************************************/
//BasemapsVis
var baseMap = [
  {elementType: 'geometry', stylers: [{color: '#ebe3cd'}]},
  {elementType: 'labels.text.fill', stylers: [{color: '#523735'}]},
  {elementType: 'labels.text.stroke', stylers: [{color: '#f5f1e6'}]},
  {
    featureType: 'administrative',
    elementType: 'geometry.stroke',
    stylers: [{color: '#c9b2a6'}]
  },
  {
    featureType: 'administrative.land_parcel',
    elementType: 'geometry.stroke',
    stylers: [{color: '#dcd2be'}]
  },
  {
    featureType: 'administrative.land_parcel',
    elementType: 'labels.text.fill',
    stylers: [{color: '#ae9e90'}]
  },
  {
    featureType: 'administrative.land_parcel',
    elementType: 'labels.text.stroke',
    stylers: [{color: '#000040'}, {visibility: 'simplified'}]
  },
  {
    featureType: 'administrative.neighborhood',
    elementType: 'labels.text.fill',
    stylers: [{color: '#408080'}]
  },
  {
    featureType: 'landscape.man_made',
    elementType: 'geometry.fill',
    stylers: [{color: '#736666'}]
  },
  {
    featureType: 'landscape.natural',
    elementType: 'geometry',
    stylers: [{color: '#dfd2ae'}]
  },
  {
    featureType: 'landscape.natural',
    elementType: 'geometry.fill',
    stylers: [{color: '#1b1c06'}]
  },
  {
    featureType: 'landscape.natural.terrain',
    elementType: 'geometry.fill',
    stylers: [{color: '#1b1c06'}]
  },
  {
    featureType: 'poi',
    elementType: 'geometry',
    stylers: [{color: '#dfd2ae'}]
  },
  {
    featureType: 'poi',
    elementType: 'labels.text',
    stylers: [{visibility: 'off'}]
  },
  {
    featureType: 'poi',
    elementType: 'labels.text.fill',
    stylers: [{color: '#93817c'}]
  },
  {featureType: 'poi.business', stylers: [{visibility: 'off'}]},
  {
    featureType: 'poi.park',
    elementType: 'geometry.fill',
    stylers: [{color: '#1b1c06'}]
  },
  {
    featureType: 'poi.park',
    elementType: 'labels.text.fill',
    stylers: [{color: '#447530'}]
  },
  {
    featureType: 'road',
    elementType: 'geometry',
    stylers: [{color: '#f5f1e6'}]
  },
  {
    featureType: 'road',
    elementType: 'labels.icon',
    stylers: [{visibility: 'off'}]
  },
  {
    featureType: 'road.arterial',
    elementType: 'geometry',
    stylers: [{color: '#fdfcf8'}]
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry',
    stylers: [{color: '#f8c967'}]
  },
  {
    featureType: 'road.highway',
    elementType: 'geometry.stroke',
    stylers: [{color: '#e9bc62'}]
  },
  {
    featureType: 'road.highway.controlled_access',
    elementType: 'geometry',
    stylers: [{color: '#e98d58'}]
  },
  {
    featureType: 'road.highway.controlled_access',
    elementType: 'geometry.stroke',
    stylers: [{color: '#db8555'}]
  },
  {
    featureType: 'road.local',
    elementType: 'labels.text.fill',
    stylers: [{color: '#806b63'}]
  },
  {featureType: 'transit', stylers: [{visibility: 'off'}]},
  {
    featureType: 'transit.line',
    elementType: 'geometry',
    stylers: [{color: '#dfd2ae'}]
  },
  {
    featureType: 'transit.line',
    elementType: 'labels.text.fill',
    stylers: [{color: '#8f7d77'}]
  },
  {
    featureType: 'transit.line',
    elementType: 'labels.text.stroke',
    stylers: [{color: '#ebe3cd'}]
  },
  {
    featureType: 'transit.station',
    elementType: 'geometry',
    stylers: [{color: '#dfd2ae'}]
  },
  {
    featureType: 'water',
    elementType: 'geometry.fill',
    stylers: [{color: '#c4c4b9'}]
  },
  {
    featureType: 'water',
    elementType: 'labels.text.fill',
    stylers: [{color: '#92998d'}]
  }
];
Map.setOptions('mapStyle', {mapStyle: baseMap});
Map.style().set({cursor:'crosshair'});
/*******************************************************************************
 * PANEL INTERFACE
 ******************************************************************************/
//APP COMPONENT
Map.setControlVisibility({
  zoomControl: true,
  mapTypeControl: false,
  fullscreenControl: true,
  drawingToolsControl: false,
  scaleControl: true
});
var c = {}; 
c.controlPanel = ui.Panel();
//Apps title, description, etc
c.info = {};
c.info.appTitle = ui.Label('The Forest Visualizer');
c.info.aboutLabel = ui.Label(
  'Click on the list of checkbox below to activate a layer. ' +
  'The transparency of each layer can be adjusted in the top right panel. '  +
  'To share location, copy the URL address .'
  ) ;
c.info.panel = ui.Panel([
  c.info.appTitle, c.info.aboutLabel,
  ]);
/*******************************************************************************
 * CHECKBOX
 ******************************************************************************/
//Oil Palm Concession
c.info.concession = ui.Label('Oil Palm'); //PO concession
 var legendBox_1a = ui.Label({
        style: {
          backgroundColor: 'd5e6dc', 
          padding: '6px',
          margin: '10px -5px 0 10px',
          border: '1px solid gray'
        }
      });
    var legendBox_1b = ui.Label({ //Forest conversion
        style: {
          backgroundColor: 'darkred', 
          padding: '6px',
          margin: '10px -5px 0 10px',
          border: '1px solid gray'
        }
      });      
  var legendBox_1c = ui.Label({ //Industrial Plantation 
        style: {
          backgroundColor: '876c1c', 
          padding: '6px',
          margin: '10px -5px 0 10px',
          border: '1px solid gray'
        }
      });
    var legendBox_1d = ui.Label({ //Smallholder Plantation 
        style: {
          backgroundColor: 'ad8f31', 
          padding: '6px',
          margin: '10px -5px 0 10px',
          border: '1px solid gray'
        }
      });
var box_1a = ui.Checkbox('Oil Palm Concession').setValue(true);
box_1a.onChange(function(checked) {Map.layers().get(20).setShown(checked);});
var box_1b = ui.Checkbox('Primary Forest Conversion to Oil Palm').setValue(false);
box_1b.onChange(function(checked) {Map.layers().get(19).setShown(checked);});
var box_1c = ui.Checkbox('Industrial Oil Palm Plantation (2020)').setValue(false);
box_1c.onChange(function(checked) {Map.layers().get(18).setShown(checked);});
var box_1d = ui.Checkbox('Smallholder Oil Palm Plantation (2019)').setValue(false);
box_1d.onChange(function(checked) {Map.layers().get(17).setShown(checked);});
c.info.menu1 = ui.Panel({
  widgets: [c.info.concession]
  });
c.info.box_1a = ui.Panel({
  widgets: [legendBox_1a, box_1a],
  layout: ui.Panel.Layout.Flow('horizontal')
  });
c.info.box_1b = ui.Panel({
  widgets: [legendBox_1b, box_1b],
  layout: ui.Panel.Layout.Flow('horizontal')
  });  
c.info.box_1c = ui.Panel({
  widgets: [legendBox_1c, box_1c],
  layout: ui.Panel.Layout.Flow('horizontal')
  });
c.info.box_1d = ui.Panel({
  widgets: [legendBox_1d, box_1d],
  layout: ui.Panel.Layout.Flow('horizontal')
  });  
//Tree Cover Loss
c.info.treeLoss = ui.Label('Forest/Tree Cover Loss');
c.info.treeLoss_2a1 = ui.Label('2016 - 2020');
c.info.treeLoss_2a2 = ui.Label('2011 - 2015');
c.info.treeLoss_2a3 = ui.Label('2006 - 2010');
c.info.treeLoss_2a4 = ui.Label('2001 - 2005');
c.info.treeLoss_2b1 = ui.Label('Confirmed Tree Cover Loss');
c.info.treeLoss_2b2 = ui.Label('Probable Tree Cover Loss');
c.info.treeLoss_2c = ui.Label('Forest Loss (2001-2020)');
 var legendBox_2a = ui.Label({ //time-series
        style: {
          backgroundColor: 'white', 
          padding: '6px',
          margin: '10px -5px 0 10px',
          border: '1px solid white'
        }
      });
  var legendBox_2a1 = ui.Label({ //2016-2020 white
        style: {
          backgroundColor: 'white', 
          padding: '6px',
          margin: '10px -5px 0 10px',
          border: '1px solid white'
        }
      });
  var legendBox_2a11 = ui.Label({ //2016-2020
        style: {
          backgroundColor: 'd0312d', 
          padding: '6px',
          margin: '10px -5px 0 10px',
          border: '1px solid black'
        }
      });    
  var legendBox_2a2 = ui.Label({ //2011-2015 white
        style: {
          backgroundColor: 'white', 
          padding: '6px',
          margin: '10px -5px 0 10px',
          border: '1px solid white'
        }
      });
  var legendBox_2a21 = ui.Label({ //2011-2015
        style: {
          backgroundColor: 'fb5204', 
          padding: '6px',
          margin: '10px -5px 0 10px',
          border: '1px solid black'
        }
      });    
var legendBox_2a3 = ui.Label({ //2006-2010 white
        style: {
          backgroundColor: 'white', 
          padding: '6px',
          margin: '10px -5px 0 10px',
          border: '1px solid white'
        }
      });
  var legendBox_2a31 = ui.Label({ //2006-2010
        style: {
          backgroundColor: 'ffa600', 
          padding: '6px',
          margin: '10px -5px 0 10px',
          border: '1px solid black'
        }
      });   
var legendBox_2a4 = ui.Label({ //2001-2005 white
        style: {
          backgroundColor: 'white', 
          padding: '6px',
          margin: '10px -5px 0 10px',
          border: '1px solid white'
        }
      });
  var legendBox_2a41 = ui.Label({ //2001-2005
        style: {
          backgroundColor: 'fce74e', 
          padding: '6px',
          margin: '10px -5px 0 10px',
          border: '1px solid black'
        }
      });   
  var legendBox_2b = ui.Label({ //Deforestation Alert
        style: {
          backgroundColor: 'white', 
          padding: '6px',
          margin: '10px -5px 0 10px',
          border: '1px solid white'
        }
      });
  var legendBox_2b1 = ui.Label({ //confirmed loss white
        style: {
          backgroundColor: 'white', 
          padding: '6px',
          margin: '10px -5px 0 10px',
          border: '1px solid white'
        }
      });
  var legendBox_2b11 = ui.Label({ //confirmed Loss
        style: {
          backgroundColor: '800040', 
          padding: '6px',
          margin: '10px -5px 0 10px',
          border: '1px solid gray'
        }
      });
  var legendBox_2b2 = ui.Label({ //probable loss white
        style: {
          backgroundColor: 'white', 
          padding: '6px',
          margin: '10px -5px 0 10px',
          border: '1px solid white'
        }
      });
var legendBox_2b21 = ui.Label({ //probable loss
        style: {
          backgroundColor: 'a35880', 
          padding: '6px',
          margin: '10px -5px 0 10px',
          border: '1px solid gray'
        }
      });
var legendBox_2c = ui.Label({ // Forest loss calculation 2001-2020
        style: {
          backgroundColor: 'b81647', 
          padding: '6px',
          margin: '10px -5px 0 10px',
          border: '1px solid gray'
        }
      });
var box_2a = ui.Checkbox('Tree Cover Loss (Time Series)').setValue(true);
box_2a.onChange(function(checked) {Map.layers().get(14).setShown(checked);});
var box_2b = ui.Checkbox('RADD Alert (2021)').setValue(false);
box_2b.onChange(function(checked) {Map.layers().get(16).setShown(checked);});
var box_2c = ui.Checkbox('Primary Forest Loss (2001-2020)').setValue(false);
box_2c.onChange(function(checked) {Map.layers().get(15).setShown(checked);});
c.info.menu2 = ui.Panel([
  c.info.treeLoss
  ]);
c.info.box_2a = ui.Panel({
  widgets: [box_2a],
  layout: ui.Panel.Layout.Flow('horizontal')
  });
c.info.box_2a1 = ui.Panel({
  widgets: [legendBox_2a1, legendBox_2a11, c.info.treeLoss_2a1],
  layout: ui.Panel.Layout.Flow('horizontal')
  });  
c.info.box_2a2 = ui.Panel({
  widgets: [legendBox_2a2, legendBox_2a21, c.info.treeLoss_2a2],
  layout: ui.Panel.Layout.Flow('horizontal')
  });  
c.info.box_2a3 = ui.Panel({
  widgets: [legendBox_2a3, legendBox_2a31, c.info.treeLoss_2a3],
  layout: ui.Panel.Layout.Flow('horizontal')
  });  
c.info.box_2a4 = ui.Panel({
  widgets: [legendBox_2a4, legendBox_2a41, c.info.treeLoss_2a4],
  layout: ui.Panel.Layout.Flow('horizontal')
  });  
c.info.box_2b = ui.Panel({
  widgets: [box_2b],
  layout: ui.Panel.Layout.Flow('horizontal')
  });  
c.info.box_2b1 = ui.Panel({
  widgets: [legendBox_2b1, legendBox_2b11, c.info.treeLoss_2b1],
  layout: ui.Panel.Layout.Flow('horizontal')
  });    
c.info.box_2b2 = ui.Panel({
  widgets: [legendBox_2b2, legendBox_2b21, c.info.treeLoss_2b2],
  layout: ui.Panel.Layout.Flow('horizontal')
  });      
c.info.box_2c = ui.Panel({
  widgets: [legendBox_2c, box_2c],
  layout: ui.Panel.Layout.Flow('horizontal')
  });  
//Forest Cover
c.info.forest = ui.Label('Forest Cover');
 var legendBox_3a = ui.Label({
        style: {
          backgroundColor: '28870b', 
          padding: '6px',
          margin: '10px -5px 0 10px',
          border: '1px solid black'
        }
      });
 var legendBox_3b = ui.Label({
        style: {
          backgroundColor: '48b069', 
          padding: '6px',
          margin: '10px -5px 0 10px',
          border: '1px solid black'
        }
      });
 var legendBox_3c = ui.Label({
        style: {
          backgroundColor: '6b7513', 
          padding: '6px',
          margin: '10px -5px 0 10px',
          border: '1px solid black'
        }
      });
var box_3a = ui.Checkbox('Undisturbed Tropical Moist Forest (2020)').setValue(true);
box_3a.onChange(function(checked) {Map.layers().get(13).setShown(checked);});
var box_3b = ui.Checkbox('Degraded Tropical Moist Forest (2020)').setValue(false);
box_3b.onChange(function(checked) {Map.layers().get(12).setShown(checked);});
var box_3c = ui.Checkbox('Primary Humid Tropical Forest (2001)').setValue(false);
box_3c.onChange(function(checked) {Map.layers().get(11).setShown(checked);});
c.info.menu3 = ui.Panel([
  c.info.forest
  ]);
c.info.box_3a = ui.Panel({
  widgets: [legendBox_3a, box_3a],
  layout: ui.Panel.Layout.Flow('horizontal')
  });
c.info.box_3b = ui.Panel({
  widgets: [legendBox_3b, box_3b],
  layout: ui.Panel.Layout.Flow('horizontal')
  });
c.info.box_3c = ui.Panel({
  widgets: [legendBox_3c, box_3c],
  layout: ui.Panel.Layout.Flow('horizontal')
  });  
// Tree Cover
c.info.tree = ui.Label('Tree Cover');
 var legendBox_4a = ui.Label({
        style: {
          backgroundColor: '5ad18c', 
          padding: '6px',
          margin: '10px -5px 0 10px',
          border: '1px solid black'
        }
      });
 var legendBox_4b = ui.Label({
        style: {
          backgroundColor: '9aa822', 
          padding: '6px',
          margin: '10px -5px 0 10px',
          border: '1px solid black'
        }
      });
var box_4a = ui.Checkbox('Tree Canopy (2021)').setValue(false);
box_4a.onChange(function(checked) {Map.layers().get(10).setShown(checked);});
var box_4b = ui.Checkbox('Tree Cover (2000)').setValue(false);
box_4b.onChange(function(checked) {Map.layers().get(9).setShown(checked);});
c.info.menu4 = ui.Panel([
  c.info.tree
  ]);
c.info.box_4a = ui.Panel({
  widgets: [legendBox_4a, box_4a],
  layout: ui.Panel.Layout.Flow('horizontal')
  });
c.info.box_4b = ui.Panel({
  widgets: [legendBox_4b, box_4b],
  layout: ui.Panel.Layout.Flow('horizontal')
  });  
//HCS (Indicative)
c.info.hcs = ui.Label('Indicative HCS (2021)'); 
 var legendBox_5a = ui.Label({ //High density forest
        style: {
          backgroundColor: 'fde725', 
          padding: '6px',
          margin: '10px -5px 0 10px',
          border: '1px solid gray'
        }
      });
  var legendBox_5b = ui.Label({ //Medium density forest 
        style: {
          backgroundColor: '7ad251', 
          padding: '6px',
          margin: '10px -5px 0 10px',
          border: '1px solid gray'
        }
      });
    var legendBox_5c = ui.Label({ //Low density forest 
        style: {
          backgroundColor: '22a884', 
          padding: '6px',
          margin: '10px -5px 0 10px',
          border: '1px solid gray'
        }
      });
 var legendBox_5d = ui.Label({ //Young regenerating forest
        style: {
          backgroundColor: '29788e', 
          padding: '6px',
          margin: '10px -5px 0 10px',
          border: '1px solid gray'
        }
      });
  var legendBox_5e = ui.Label({ //Scrub
        style: {
          backgroundColor: '404387', 
          padding: '6px',
          margin: '10px -5px 0 10px',
          border: '1px solid gray'
        }
      });
    var legendBox_5f = ui.Label({ //Open land
        style: {
          backgroundColor: 'a69871', 
          padding: '6px',
          margin: '10px -5px 0 10px',
          border: '1px solid gray'
        }
      });
var box_5a = ui.Checkbox('High Density Forest (HDF)').setValue(false);
box_5a.onChange(function(checked) {Map.layers().get(8).setShown(checked);});
var box_5b = ui.Checkbox('Medium Density Forest (MDF)').setValue(false);
box_5b.onChange(function(checked) {Map.layers().get(7).setShown(checked);});
var box_5c = ui.Checkbox('Low Density Forest (LDF)').setValue(false);
box_5c.onChange(function(checked) {Map.layers().get(6).setShown(checked);});
var box_5d = ui.Checkbox('Young Regenerating Forest (YRF)').setValue(false);
box_5d.onChange(function(checked) {Map.layers().get(5).setShown(checked);});
var box_5e = ui.Checkbox('Scrub (S)').setValue(false);
box_5e.onChange(function(checked) {Map.layers().get(4).setShown(checked);});
var box_5f = ui.Checkbox('Open Land (OL)').setValue(false);
box_5f.onChange(function(checked) {Map.layers().get(3).setShown(checked);});
c.info.menu5 = ui.Panel({
  widgets: [c.info.hcs]
  });
c.info.box_5a = ui.Panel({
  widgets: [legendBox_5a, box_5a],
  layout: ui.Panel.Layout.Flow('horizontal')
  });
c.info.box_5b = ui.Panel({
  widgets: [legendBox_5b, box_5b],
  layout: ui.Panel.Layout.Flow('horizontal')
  });  
c.info.box_5c = ui.Panel({
  widgets: [legendBox_5c, box_5c],
  layout: ui.Panel.Layout.Flow('horizontal')
  });
c.info.box_5d = ui.Panel({
  widgets: [legendBox_5d, box_5d],
  layout: ui.Panel.Layout.Flow('horizontal')
  });
c.info.box_5e = ui.Panel({
  widgets: [legendBox_5e, box_5e],
  layout: ui.Panel.Layout.Flow('horizontal')
  });  
c.info.box_5f = ui.Panel({
  widgets: [legendBox_5f, box_5f],
  layout: ui.Panel.Layout.Flow('horizontal')
  });
//Satellite Imagery
c.info.landsat = ui.Label('Composite Satellite Imagery');
var box_6a = ui.Checkbox('Cloud-free Sentinel-2 Image (2021)').setValue(false);
box_6a.onChange(function(checked) {Map.layers().get(2).setShown(checked);});
var box_6b = ui.Checkbox('Cloud-free Landsat Image (2020)').setValue(false);
box_6b.onChange(function(checked) {Map.layers().get(1).setShown(checked);});
var box_6c = ui.Checkbox('Cloud-free Landsat Image (2000)').setValue(false);
box_6c.onChange(function(checked) {Map.layers().get(0).setShown(checked);});
c.info.menu6 = ui.Panel([
  c.info.landsat, box_6a, box_6b, box_6c
  ]);
/*******************************************************************************
 * DATA STUDIO (Other Information)
 ******************************************************************************/
c.info.other = ui.Label('Other Information:');
var kepoLink = ui.Label(
  'https://kepohutan.greenpeace.org', 
  {margin: '0px 0px 5px 8px', 
  fontSize: '14px',
  color: '#70a2f3'  
  }, 
  'https://kepohutan.greenpeace.org');
var dashLink_a = ui.Label(
  '[Primary Forest Loss in Indonesia]', 
  {margin: '0px 0px 2px 8px', 
  fontSize: '13px',
  color: '#70a2f3'
  }, 
  'https://datastudio.google.com/reporting/454f842c-b731-43dd-af68-1107883cc1f6/');
var dashLink_b = ui.Label(
  '[Tree Cover Loss in Indonesia]', 
  {margin: '0px 0px 2px 8px', 
  fontSize: '13px',
  color: '#70a2f3'  
  }, 
  'https://datastudio.google.com/reporting/9e6495b7-9c50-4926-ac1c-5a3bbf8c8541/');
c.info.link_a = ui.Label(
  'The statistics of Indonesian forest/tree cover loss can be found in dashboard links below:');
c.info.link_b = ui.Label(
  'You can download the shapefile (.shp) of oil palm concessions and build your own story map in:');
c.info.data = ui.Panel([
  c.info.other, c.info.link_a, dashLink_a, dashLink_b, c.info.link_b, kepoLink
  ]);  
/*******************************************************************************
 * REFERENCES
 ******************************************************************************/
c.info.ref = ui.Label('References:');
var davidLink = ui.Label(
  'Gaveau, D.L.A., Locatelli, B., Salim, M.A., Husnayaen, H., Manurung, T., Descals, A., Angelsen, A., Meijaard, E., Sheil, D., 2021. Slowing deforestation in Indonesia follows declining oil palm expansion and lower oil prices. Research Square. https://doi.org/10.21203/rs.3.rs-143515/v1 . Maps available at https://nusantara-atlas.org', 
  {margin: '0px 0px 10px 8px', 
  fontSize: '11.5px',
  }, 
  'https://www.researchsquare.com/article/rs-143515/v1'); 
var hansenLink = ui.Label(
  'Hansen, Matthew C., Peter V. Potapov, Rebecca Moore, Matt Hancher, Svetlana A. Turubanova, Alexandra Tyukavina, David Thau et al. "High-resolution global maps of 21st-century forest cover change." science 342, no. 6160 (2013): 850-853. https://doi.org/10.1126/science.1244693.', 
  {margin: '0px 0px 10px 8px', 
  fontSize: '11.5px',
  }, 
  'https://iopscience.iop.org/article/10.1088/1748-9326/11/3/034008');   
var langLink = ui.Label(
  'Lang, Nico, Konrad Schindler, and Jan Dirk Wegner. "High carbon stock mapping at large scale with optical satellite imagery and spaceborne LIDAR." arXiv preprint arXiv:2107.07431 (2021).', 
  {margin: '0px 0px 10px 8px', 
  fontSize: '11.5px',
  }, 
  'https://arxiv.org/pdf/2107.07431.pdf');   
var raddLink = ui.Label(
  'Reiche, Johannes, Adugna Mullissa, Bart Slagter, Yaqing Gou, Nandin-Erdene Tsendbazar, Christelle Odongo-Braun, Andreas Vollrath et al. "Forest disturbance alerts for the Congo Basin using Sentinel-1." Environmental Research Letters 16, no. 2 (2021): 024005. https://doi.org/10.1088/1748-9326/abd0a8', 
  {margin: '0px 0px 10px 8px', 
  fontSize: '11.5px',
  }, 
  'https://iopscience.iop.org/article/10.1088/1748-9326/abd0a8'); 
var turubanovaLink = ui.Label(
  'Turubanova, Svetlana, Peter V. Potapov, Alexandra Tyukavina, and Matthew C. Hansen. "Ongoing primary forest loss in Brazil, Democratic Republic of the Congo, and Indonesia." Environmental Research Letters 13, no. 7 (2018): 074028. https://doi.org/10.1088/1748-9326/aacd1c.', 
  {margin: '0px 0px 10px 8px', 
  fontSize: '11.5px'
  }, 
  'https://iopscience.iop.org/article/10.1088/1748-9326/aacd1c'); 
var vancutsemLink = ui.Label(
  'Vancutsem, Christelle, Frédéric Achard, J-F. Pekel, Ghislain Vieilledent, S. Carboni, Dario Simonetti, Javier Gallego, Luiz EOC Aragao, and Robert Nasi. "Long-term (1990–2019) monitoring of forest cover changes in the humid tropics." Science Advances 7, no. 10 (2021): eabe1603. https://doi.org/10.1126/sciadv.abe1603. Source: EC JRC', 
  {margin: '0px 0px 10px 8px', 
  fontSize: '11.5px'
  }, 
  'https://www.science.org/doi/10.1126/sciadv.abe1603');   
c.info.references = ui.Panel([
  c.info.ref, davidLink,hansenLink, langLink, raddLink, turubanovaLink, vancutsemLink
  ]);  
/*******************************************************************************
 * STYLING PROPERTIES
 ******************************************************************************/
//Divider
c.dividers = {};
c.dividers.divider1 = ui.Panel(); 
c.dividers.divider2 = ui.Panel();  
c.dividers.divider3 = ui.Panel();
//Placement order
ui.root.insert(0, c.controlPanel);
c.controlPanel.add(c.info.panel);
c.controlPanel.add(c.dividers.divider1); //divider
c.controlPanel.add(c.info.menu1); //title oil palm
c.controlPanel.add(c.info.box_1a); //oil palmconcession
c.controlPanel.add(c.info.box_1b); //forest conversion
c.controlPanel.add(c.info.box_1c); //industrial
c.controlPanel.add(c.info.box_1d); //smallholder
c.controlPanel.add(c.info.menu2); //title tree cover
c.controlPanel.add(c.info.box_2b); //submenu radd alert
c.controlPanel.add(c.info.box_2b2); //radd alert probable
c.controlPanel.add(c.info.box_2b1); //radd alert confirmed
c.controlPanel.add(c.info.box_2c); //forest loss 2001-2020
c.controlPanel.add(c.info.box_2a); //submenu tree cover loss
c.controlPanel.add(c.info.box_2a1); //loss 2016-2020
c.controlPanel.add(c.info.box_2a2); //loss 2011-2015
c.controlPanel.add(c.info.box_2a3); //loss 2006-2010
c.controlPanel.add(c.info.box_2a4); //loss 2001-2005
c.controlPanel.add(c.info.menu3); //title forest cover
c.controlPanel.add(c.info.box_3a); // undisturbed tmc 
c.controlPanel.add(c.info.box_3b); // degraded tmc
c.controlPanel.add(c.info.box_3c); // phtf 
c.controlPanel.add(c.info.menu4); //title tree cover
c.controlPanel.add(c.info.box_4a); // tree canopy
c.controlPanel.add(c.info.box_4b); // tree cover 2000
c.controlPanel.add(c.info.menu5);  //title hcs
c.controlPanel.add(c.info.box_5a); // high density forest
c.controlPanel.add(c.info.box_5b); //medium density forest
c.controlPanel.add(c.info.box_5c); //low density forest
c.controlPanel.add(c.info.box_5d); //young regenerating forest
c.controlPanel.add(c.info.box_5e); //scrub
c.controlPanel.add(c.info.box_5f); //openland
c.controlPanel.add(c.info.menu6); //satellite
c.controlPanel.add(c.dividers.divider2); //divider
c.controlPanel.add(c.info.data); //data studio
c.controlPanel.add(c.dividers.divider3); //divider
c.controlPanel.add(c.info.references); //references
//Text properties
var s = {};
s.menuText = {
  fontSize: '16px',
  fontWeight: 'bold',
  color: '505050',
  padding: '0px'
};
s.bodyText = {
  fontSize: '15px',
  color: '505050'
};
s.otherText = {
  fontSize: '16px',
  fontWeight: 'bold',
  color: 'b51d4d'
};
s.refText = {
  fontSize: '16px',
  fontWeight: 'bold',
  color: '505050'
};
s.stretchHorizontal = {
  stretch: 'horizontal'
};
s.divider = {
  backgroundColor: 'F0F0F0',
  height: '5px',
  margin: '0x 0px'
};
//Control panel properties
c.controlPanel.style().set({
  width: '330px',
  padding: '5x'
});
c.info.appTitle.style().set({
  fontSize: '25px',
  fontWeight: 'bold',
  color: 'green'
});
//Text menu formatting
c.info.aboutLabel.style().set(s.bodyText);
c.info.concession.style().set(s.menuText);
c.info.treeLoss.style().set(s.menuText);
c.info.hcs.style().set(s.menuText);
c.info.landsat.style().set(s.menuText);
c.info.forest.style().set(s.menuText);
c.info.tree.style().set(s.menuText);
c.info.other.style().set(s.otherText);
c.info.ref.style().set(s.refText);
Object.keys(c.dividers).forEach(function(key){
  c.dividers[key].style().set(s.divider);
});
/*******************************************************************************
 * DATASET
 ******************************************************************************/
//Boundary
var countries = ee.FeatureCollection('USDOS/LSIB/2017');
var simpleBorder = countries.filter(ee.Filter.eq('COUNTRY_NA', 'Indonesia')); 
//Hansen data
var hansen = ee.Image('UMD/hansen/global_forest_change_2020_v1_8');
var hansenBand = hansen.select('datamask');
var hansenMask = hansenBand.eq(1);
var hansenMaskUpdate = hansen.updateMask(hansenMask); 
var hansenClip = hansen.clip(indo);
//SENTINEL
var s2Sr = ee.ImageCollection('COPERNICUS/S2_SR');
var s2Clouds = ee.ImageCollection('COPERNICUS/S2_CLOUD_PROBABILITY');
var START_DATE = ee.Date('2021-01-01');
var now = new Date();
var nowStr = now.toLocaleDateString('en-CA'); 
var END_DATE = ee.Date(nowStr);
var MAX_CLOUD_PROBABILITY = 65;
var region = ee.Geometry.Rectangle({coords: [92, -10, 145, 6], geodesic: false});
function maskClouds(img) {
  var clouds = ee.Image(img.get('cloud_mask')).select('probability');
  var isNotCloud = clouds.lt(MAX_CLOUD_PROBABILITY);
  return img.updateMask(isNotCloud);
}
function maskEdges(s2_img) {
  return s2_img.updateMask(
      s2_img.select('B8A').mask().updateMask(s2_img.select('B9').mask()));
}
var criteria = ee.Filter.and(
    ee.Filter.bounds(region), ee.Filter.date(START_DATE, END_DATE));
s2Sr = s2Sr.filter(criteria).map(maskEdges);
s2Clouds = s2Clouds.filter(criteria);
var s2SrWithCloudMask = ee.Join.saveFirst('cloud_mask').apply({
  primary: s2Sr,
  secondary: s2Clouds,
  condition:
      ee.Filter.equals({leftField: 'system:index', rightField: 'system:index'})
});
var s2CloudMasked = ee.ImageCollection(s2SrWithCloudMask).map(maskClouds).median();
var s2Clip = s2CloudMasked.clip(indo);
//Primary humid tropical forest 
var phtf = ee.ImageCollection("UMD/GLAD/PRIMARY_HUMID_TROPICAL_FORESTS/v1").median();
var phtfBand = phtf.select('Primary_HT_forests');
var phtfMask = phtfBand.eq(1);
var phtfPrimary = phtf.updateMask(phtfMask);
var phtfClip = phtfPrimary.clip(indo);
//Tree canopy
var canopy = ee.ImageCollection('users/nlang/canopy_top_height_2020_ID_PH_MY')
            .filterBounds(simpleBorder) 
            .map(function(image){return image.clip(simpleBorder)});
//David Plantation
var opClass = ee.Image('users/thetreemap/plantation/IDN_OP_2020');
var opMask = opClass.select('b1');
var industrialMask = opMask.eq(1);
var smallholderMask = opMask.eq(2);
var industrial = opClass.updateMask(industrialMask);
var smallholder = opClass.updateMask(smallholderMask);
//RADD Alert
var radd = ee.ImageCollection('projects/radar-wur/raddalert/v1')
          .filterMetadata('layer','contains','alert')
          .filterMetadata('geography','contains','asia')
          .sort('system:time_end', false).first();
var raddBand = radd.select('Date');
var raddMask = raddBand.gt(21000);
var radd21 = radd.updateMask(raddMask); 
var raddClip = radd21.clip(indo);
//HCS
var hcs = ee.Image('users/nlang/indicative_HCS_2020_ID_PH_MY');
var hcsBand = hcs.select('b1');
var hcsMask0 = hcsBand.eq(0);
var hcs0 = hcs.updateMask(hcsMask0);
var hcsClip0 = hcs0.clip(indo);
var hcsMask1 = hcsBand.eq(1);
var hcs1 = hcs.updateMask(hcsMask1);
var hcsClip1 = hcs1.clip(indo);
var hcsMask2 = hcsBand.eq(2);
var hcs2 = hcs.updateMask(hcsMask2);
var hcsClip2 = hcs2.clip(indo);
var hcsMask3 = hcsBand.eq(3);
var hcs3 = hcs.updateMask(hcsMask3);
var hcsClip3 = hcs3.clip(indo);
var hcsMask4 = hcsBand.eq(4);
var hcs4 = hcs.updateMask(hcsMask4);
var hcsClip4 = hcs4.clip(indo);
var hcsMask5 = hcsBand.eq(5);
var hcs5 = hcs.updateMask(hcsMask5);
var hcsClip5 = hcs5.clip(indo);
var hcsMask10 = hcsBand.eq(10);
var hcs10 = hcs.updateMask(hcsMask10);
var hcsClip10 = hcs10.clip(indo);
var hcsMask11 = hcsBand.eq(11);
var hcs11 = hcs.updateMask(hcsMask11);
var hcsClip11 = hcs11.clip(indo);
var hcsMask50 = hcsBand.eq(50);
var hcs50 = hcs.updateMask(hcsMask50);
var hcsClip50 = hcs50.clip(indo);
//JRC Tropical Moist Forest
var jrc = ee.ImageCollection('projects/JRC/TMF/v1_2020/TransitionMap_Subtypes').mosaic();
jrc = jrc.where((jrc.gte(10)).and(jrc.lte(12)), 10);
jrc = jrc.where((jrc.gte(21)).and(jrc.lte(26)), 20);
jrc = jrc.where((jrc.gte(61)).and(jrc.lte(62)), 20);
var jrcBand = jrc.select('TransitionClass');
var jrcMask10 = jrcBand.eq(10);
var jrcMask20 = jrcBand.eq(20);
var jrcMaskUpdate10 = jrc.updateMask(jrcMask10);
var jrcMaskUpdate20 = jrc.updateMask(jrcMask20);
var jrcClip10 = jrcMaskUpdate10.clip(indo);
var jrcClip20 = jrcMaskUpdate20.clip(indo);
//Forest loss and conversion to oil palm
var conForest = phtfClip.select('Primary_HT_forests').add(opClass);
var lossForest = hansenClip.select('lossyear').add(phtfClip.select('Primary_HT_forests'));
/*******************************************************************************
 * DATA VISUALIZATION PARAMETER
 ******************************************************************************/
//Hansenvis
var treeCoverVis = { 
  bands: ['treecover2000'],
  min: 0,
  max: 100,
  palette: ['black', '9aa822'] 
};
var treeLossVis = {
  bands: ['lossyear'],
  min: 0,
  max: 20,
  palette: ['fce74e', 'ffa600' ,'fb5204','d0312d']
};
var totalLossVis = {
  bands: ['loss'],
  max: 1,
  palette: '9c2f3f'
};
//Satellitevis
var sentinelVis = {
  bands: ['B11', 'B8', 'B2'], 
  min: 60, 
  max: 5500, 
  gamma: 1
};
var firstVis = {
  bands: ['first_b50', 'first_b40', 'first_b30'],
  min: 5.38, 
  max:119.62, 
  gamma: 1,
};
var lastVis = {
  bands: ['last_b50', 'last_b40', 'last_b30'],
  min: 5.38, 
  max:119.62,
  gamma: 1,
};
//Phtfvis
var phtfVis = {
  bands: ['Primary_HT_forests'],
  min: 0.0,
  max: 1.0,
  palette:['black', '6b7513']
};
//ConvertedVis
var convertVis = {
  min: 1,
  max: 3,
  palette:['darkred'] 
};
//ForestLossVis 
var forestlossVis = {
  min: 1,
  max: 20,
  palette:['b81647', 'b81647'] 
};
//TreeCanopyVis
var canopyVis = {
  bands: ['b1'],
  min: 0,
  max: 50,
  palette: ['black', '5ad18c']
};
var canopyMeterVis = {
  bands: ['b1'],
  min: 0,
  max: 50,
  palette: ['010005', '150b37', '3b0964', '61136e', 
  '85216b', 'a92e5e', 'cc4248', 'e75e2e', 'f78410', 
  'fcae12', 'f5db4c', 'fcffa4'],
};      
//OilPalmVis
var plantedVis = {
  min: 1,
  max: 2,
  palette:['876c1c', 'ad8f31'] 
};
//AlertVis
var raddVis = {
  bands: ['Alert'],
  min: 2,
  max: 3,
  palette: ['a35880','800040']
};
//PO concession vis
var poVis = {
  fillColor: 'b5ffb4', 
  color:'white',
  width: 0.1,
};
var opacity = 0.65;
//JrcTmfVis
var jrcVis10 = {
  bands: ['TransitionClass'],
  min: 10,
  max: 10,
  palette: ['28870b']
};
var jrcVis20 = {
  bands: ['TransitionClass'],
  min: 20,
  max: 20,
  palette: ['48b069']
};
//HCS vis
var hcsVis0 = {bands: ['b1'], value: 0,  palette: ['#a69871']};
var hcsVis1 = {bands: ['b1'], value: 1,  palette: ['#404387']};
var hcsVis2 = {bands: ['b1'], value: 2,  palette: ['#29788e']};
var hcsVis3 = {bands: ['b1'], value: 3,  palette: ['#22a884']};
var hcsVis4 = {bands: ['b1'], value: 4,  palette: ['#7ad251']};
var hcsVis5 = {bands: ['b1'], value: 5,  palette: ['#fde725']};
var hcsVis10 = {bands: ['b1'], value: 10,  palette: ['#fcffa4']};
var hcsVis11 = {bands: ['b1'], value: 11,  palette: ['#a4feff']};
var hcsVis50 = {bands: ['b1'], value: 50,  palette: ['#fa0000']};
//Show maps
Map.addLayer(hansenClip, firstVis, 'Cloud-free Landsat Image (2000)', false);
Map.addLayer(hansenClip, lastVis, 'Cloud-free Landsat Image (2020)', false);
Map.addLayer(s2Clip, sentinelVis, 'Cloud-free Sentinel-2 Image (2021)', false);
Map.addLayer(hcsClip0, hcsVis0, 'Open Land (2021)', false);
Map.addLayer(hcsClip1, hcsVis1, 'Scrub (2021)', false);
Map.addLayer(hcsClip2, hcsVis2, 'Young Regenerating Forest (2021)', false);
Map.addLayer(hcsClip3, hcsVis3, 'Low Density Forest (2021)', false);
Map.addLayer(hcsClip4, hcsVis4, 'Medium Density Forest (2021)', false);
Map.addLayer(hcsClip5, hcsVis5, 'High Density Forest (2021)', false); 
Map.addLayer(hansenClip, treeCoverVis, 'Tree Cover (2000)', false);
Map.addLayer(canopy, canopyVis, 'Tree Canopy (2021)', false);
Map.addLayer(phtfClip, phtfVis, "Primary Humid Tropical Forest (2001)", false);
Map.addLayer(jrcClip20, jrcVis20, 'Degraded Tropical Moist Forest (2020)', false);
Map.addLayer(jrcClip10, jrcVis10, 'Undisturbed Topical Moist Forest (2020)', true);
Map.addLayer(hansenClip, treeLossVis, 'Tree Cover Loss (2001-2020)', true);
Map.addLayer(lossForest, forestlossVis, "Primary Forest Loss (2001-2020)", false);
Map.addLayer(raddClip, raddVis, 'RADD Alert (2021)', false);
Map.addLayer(smallholder, plantedVis, 'Smallholder Oil Palm Plantation (2019)', false);
Map.addLayer(industrial, plantedVis, 'Industrial Oil Palm Plantation (2019)',false);
Map.addLayer(conForest, convertVis, 'Primary Forest Conversion to Oil Palm', false);
//Map.addLayer(po_id, poVis, "Oil Palm Concession", true, opacity);
Map.addLayer(ee.Image().paint(po_id, 0, 2), {palette: ['white']}, 'Oil Palm Concession', true,opacity);
function mapUrl() {
  var lon = ui.url.get('lon', 118.66437423885823); 
  var lat = ui.url.get('lat', -0.5860114533041968);
  var zoom = ui.url.get('zoom', 5);
  Map.setCenter(lon, lat, zoom); 
} 
/*******************************************************************************
 * URL SHARING
 ******************************************************************************/
function updateUrl(params) {
  ui.url.set('lon', params.lon);
  ui.url.set('lat', params.lat);
  ui.url.set('zoom', params.zoom);
}
Map.onChangeBounds(updateUrl);
/*******************************************************************************
 * SHP Attributes
 ******************************************************************************/
var shpPanel = ui.Panel();
var shpInfo = ui.Panel();
var title = ui.Panel([
  ui.Label({
    value: 'Click on concession to see company details',
    style: {fontSize: '13px', 
            fontWeight: 'bold', 
            margin: '5px 8px 5px 8px'}
  })
]);
shpInfo.add(title);
shpPanel.style().set({
  position: 'bottom-right',
  width: '290px',
  fontSize: '14px'
});
shpPanel.add(shpInfo);
var drawingTools = Map.drawingTools();
var layer = ui.Map.GeometryLayer({
  name: 'selected',
  color: 'red',
});
drawingTools.layers().set(0, layer);
function convertToLinearRing(geometry) {
  if (geometry.type == 'Polygon') {
    return ee.Geometry.LinearRing(geometry.coordinates[0]);
  } else {
    return geometry;
  }
}
function setSelectedShape(fc) {
  var lineString = fc.geometry();
  var selectedShp = fc.geometry().evaluate(function(geometry){
    if (!geometry) {
      return;
    }
    if (geometry.geometries) {
      layer.geometries().reset(geometry.geometries.map(convertToLinearRing));
    } else{
      layer.geometries().reset([convertToLinearRing(geometry)]);
    }
  }); 
}
function getFeature(coords) {
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var shpProperties = po_id.select('PO_COM', 'PO_GROUP', 'commodity',
                'HGU', 'IJIN_LOKAS','IUP'
                ).filterBounds(point);
  var selectedShp = ee.Feature(shpProperties.first());
  setSelectedShape(ee.Feature(shpProperties.first()));
  var text1='Processing... ';
  var text2=''; 
  var text3='';
  var text4='';
  var text5='';
  var text6=''; 
  var text7='';
  var text8='';
  var label1 =  ui.Label(text1);
  shpInfo.widgets().set(1, label1);
  var label2 =  ui.Label('');
  shpInfo.widgets().set(2, label2);
  var label3 =  ui.Label();
  shpInfo.widgets().set(3, label3);
  var label4 =  ui.Label();
  shpInfo.widgets().set(4, label4);
  var label5 =  ui.Label();
  shpInfo.widgets().set(5, label5);
  var label6 =  ui.Label();
  shpInfo.widgets().set(6, label6); 
  var size = ee.Number(shpProperties.size()).getInfo();
  if(size>0){
    text1 = ee.String(selectedShp.get('PO_COM')).getInfo();
    text2 = ee.String(selectedShp.get('PO_GROUP')).getInfo();
    text3 = ee.String(selectedShp.get('commodity')).getInfo();
    text4 = ee.String(selectedShp.get('HGU')).getInfo();
    text5 = ee.String(selectedShp.get('IUP')).getInfo();
    text6 = ee.String(selectedShp.get('IJIN_LOKAS')).getInfo();
    label1.setValue('Company: '+text1);
    label2.setValue('Group: '+text2);
    label3.setValue('Commodity: '+text3);
    label4.setValue('HGU: '+text4);
    label5.setValue('IUP: '+text5);
    label6.setValue('Location Permit: '+text6);
  }else{
    label1.setValue('No record found.');
    label2.setValue('Please click on the concession.');
    }
}
Map.add(shpPanel);
Map.onClick(getFeature);
mapUrl();