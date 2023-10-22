var locat = ui.import && ui.import("locat", "geometry", {
      "geometries": [
        {
          "type": "Point",
          "coordinates": [
            -69.43141489872629,
            44.213233007391615
          ]
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": false,
      "locked": true
    }) || 
    /* color: #d63000 */
    /* shown: false */
    /* locked: true */
    ee.Geometry.Point([-69.43141489872629, 44.213233007391615]),
    points = ui.import && ui.import("points", "table", {
      "id": "projects/ee-vinfalardeau-maine/assets/MidcoastPoints_Reprojected"
    }) || ee.FeatureCollection("projects/ee-vinfalardeau-maine/assets/MidcoastPoints_Reprojected"),
    table = ui.import && ui.import("table", "table", {
      "id": "projects/ee-vinfalardeau-maine/assets/ServiceAreaPolygon"
    }) || ee.FeatureCollection("projects/ee-vinfalardeau-maine/assets/ServiceAreaPolygon"),
    streams = ui.import && ui.import("streams", "table", {
      "id": "projects/ee-vinfalardeau-maine/assets/Streams25000Reprojected"
    }) || ee.FeatureCollection("projects/ee-vinfalardeau-maine/assets/Streams25000Reprojected"),
    forestpct = ui.import && ui.import("forestpct", "image", {
      "id": "projects/ee-vinfalardeau-maine/assets/forest_percentage"
    }) || ee.Image("projects/ee-vinfalardeau-maine/assets/forest_percentage"),
    i1 = ui.import && ui.import("i1", "image", {
      "id": "projects/ee-vinfalardeau-maine/assets/May2022Basemap"
    }) || ee.Image("projects/ee-vinfalardeau-maine/assets/May2022Basemap"),
    i2 = ui.import && ui.import("i2", "image", {
      "id": "projects/ee-vinfalardeau-maine/assets/BasemapMay2022_b"
    }) || ee.Image("projects/ee-vinfalardeau-maine/assets/BasemapMay2022_b"),
    ccap = ui.import && ui.import("ccap", "image", {
      "id": "projects/ee-vinfalardeau-maine/assets/me_2015_ccap_beta_10meter_landcover"
    }) || ee.Image("projects/ee-vinfalardeau-maine/assets/me_2015_ccap_beta_10meter_landcover"),
    forest = ui.import && ui.import("forest", "table", {
      "id": "projects/ee-vinfalardeau-maine/assets/subbasinForestPct"
    }) || ee.FeatureCollection("projects/ee-vinfalardeau-maine/assets/subbasinForestPct"),
    wsheds2 = ui.import && ui.import("wsheds2", "table", {
      "id": "projects/ee-vinfalardeau-maine/assets/UpslopeForest_v2"
    }) || ee.FeatureCollection("projects/ee-vinfalardeau-maine/assets/UpslopeForest_v2"),
    mlogo = ui.import && ui.import("mlogo", "image", {
      "id": "projects/ee-vinfalardeau-maine/assets/MidcoastLogo"
    }) || ee.Image("projects/ee-vinfalardeau-maine/assets/MidcoastLogo"),
    strahl = ui.import && ui.import("strahl", "table", {
      "id": "projects/ee-vinfalardeau-maine/assets/SimplifiedStrahlerUpslope"
    }) || ee.FeatureCollection("projects/ee-vinfalardeau-maine/assets/SimplifiedStrahlerUpslope"),
    rlogo = ui.import && ui.import("rlogo", "image", {
      "id": "projects/ee-vinfalardeau-maine/assets/rlogo"
    }) || ee.Image("projects/ee-vinfalardeau-maine/assets/rlogo"),
    lc = ui.import && ui.import("lc", "table", {
      "id": "projects/ee-vinfalardeau-maine/assets/NodesWithLandcover"
    }) || ee.FeatureCollection("projects/ee-vinfalardeau-maine/assets/NodesWithLandcover"),
    drainage = ui.import && ui.import("drainage", "image", {
      "id": "projects/ee-vinfalardeau-maine/assets/DrainageMap"
    }) || ee.Image("projects/ee-vinfalardeau-maine/assets/DrainageMap"),
    nds = ui.import && ui.import("nds", "table", {
      "id": "projects/ee-vinfalardeau-maine/assets/Nodes_20220727_1441"
    }) || ee.FeatureCollection("projects/ee-vinfalardeau-maine/assets/Nodes_20220727_1441"),
    drainage4 = ui.import && ui.import("drainage4", "image", {
      "id": "projects/ee-vinfalardeau-maine/assets/drainage4m"
    }) || ee.Image("projects/ee-vinfalardeau-maine/assets/drainage4m");
/*==============================================
MAP SET-UP AND INTRO
==============================================*/
// CCAP Color Palette
var ccapViz = ['#F3F3F3','#A196A3','#8B767D','#C5CA54','#4E2409','#BDA05C','#EABB8E','#6FEC48','#15380A','#489D48','#6F6D1F','#245B5B','#E3752D','#DE3DEA','#37083B','#64166A','#A12AAA','#6CEEF0','#F3F050','#000C73','#0024E8','#6778D4','#F4D147','#BCF8F0'];
// Create Service Region Outline ---- export to asset
var blankImage = ee.Image().byte();
var service = blankImage.paint({featureCollection: table,width: 1});
// Create Text Panel
var mapPanel = ui.Panel();
  mapPanel.style().set('width', '24%');
// Create Map Panel
var map = ui.Map();
map.setOptions('SATELLITE');
//Iinitialize split panel for main layout
var splitPanel = ui.SplitPanel({
  firstPanel: mapPanel,
  secondPanel: map,
});
// Clear root and add split panel
ui.root.clear();
ui.root.add(splitPanel);
// Display Midcoast Logo
var lpal = ['#ffffff','#007db6','#007db6','#007db6','#1f9d44','#1f9d44','#007db6','#007db6','#1f9d44','#1f9d44','#007db6','#1f9d44','#007db6','#007db6','#1f9d44','#1f9d44','#1f9d44','#007db6','#007db6','#1f9d44','#007db6','#1f9d44','#007db6','#007db6','#007db6','#1f9d44','#1f9d44','#1f9d44','#007db6','#1f9d44','#1f9d44','#000000','#000000','#000000','#000000','#000000','#000000','#000000','#000000','#000000','#000000','#000000','#000000','#000000','#000000','#000000','#007db6','#1f9d44','#000000','#0079aa','#486881','#ffffff','#000000','#000000','#000000','#000000','#000000','#000000','#000000','#000000','#000000','#000000','#000000','#000000','#000000','#000000','#000000','#000000','#000000','#000000','#000000','#000000','#000000','#000000','#000000','#000000','#000000','#000000','#000000','#000000','#000000','#000000','#000000','#000000','#000000','#000000','#000000','#000000','#000000','#000000','#000000','#000000','#000000','#000000','#000000','#000000','#000000','#000000','#000000','#000000','#000000','#000000'];
var logo = mlogo.visualize({
    palette:  lpal,
    min: 0,
    max: 101
    });
var thumb = ui.Thumbnail({
    image: logo,
    params: {
        dimensions: '1148x476',
        format: 'png'
        },
    style: {height: '60px', width: '144px',padding :'0'}
    });
var toolPanel = ui.Panel(thumb, 'flow', {width: '300px'});
//mapPanel.add(toolPanel);
var rrlogo = rlogo.visualize({bands:['b4'],min:255,max:0});
var thumb2 = ui.Thumbnail({
    image: rrlogo,
    params: {
        dimensions: '2594x1128',
        format: 'png'
        },
    style: {height: '75px', width: '175px',padding :'0'}
    });
var toolPanel2 = ui.Panel([thumb,thumb2],ui.Panel.Layout.flow('horizontal'));
mapPanel.add(toolPanel2);
// Add spacing in the panel.
mapPanel.add(ui.Panel([ui.Label(' ')]));
// Introductory text of the panel
var intro = ui.Panel([
  ui.Label({
    value: 'Midcoast Watersheds',
    style: {fontSize: '24px', fontWeight: 'bold', fontFamily: 'monospace', color: '#000000'}
  }),
  ui.Label({value: 'Click any stream network node (white dots) within the Midcoast Conservancy service region to see its upslope watershed area.',
    style: {fontSize: '16px', fontFamily: 'monospace', color: '#000000'}
  }),
  ui.Label({value: 'Note: this page takes about 20 seconds to load all map layers.',
    style: {fontSize: '16px', fontFamily: 'monospace', color: '#000000'}
  })
]);
  mapPanel.add(intro);
// Add CCAP map layer
var cc = map.addLayer(ccap,{palette:ccapViz,min:2,max:25},'CCAP Landcover',false);
// Add Drainage Map Layer
var dra = map.addLayer(drainage4.selfMask(),{bands:['b1','b2','b3'],min:0,max:255},'Drainage Map',true);
// Add Service Region Outline Layer
map.addLayer(service,{palette:'#000000'},'Service Region',true,1);
// Add Node Points Layer
map.addLayer(nds,{color:'white',stroke:0.1},'Stream Network Nodes',true);
// Add spacing in the panel.
mapPanel.add(ui.Panel([ui.Label(' ')]));
mapPanel.add(ui.Panel([ui.Label(' ')]));
mapPanel.add(ui.Panel([ui.Label(' ')]));
/*==============================================
Display Layers Checkbox Section
==============================================*/
mapPanel.add(ui.Panel([ui.Label({
    value: 'Display Layers',
    style: {fontSize: '24px', fontWeight: 'bold', fontFamily: 'monospace', color: '#000000'}
  })]));
// DRAINAGE CHECKBOX
var checkdrain = ui.Checkbox({label:' Drainage Map',style:{fontSize: '16px',fontFamily: 'monospace', color: '#000000'}}).setValue(true);
mapPanel.add(checkdrain);
var checkd = function(){
  checkdrain.onChange(function(checked){
    dra.setShown(checked);
  });
};
checkd();
// CCAP CHECKBOX
var checkccap = ui.Checkbox({label:' CCAP Landcover',style:{fontSize: '16px',fontFamily: 'monospace', color: '#000000'}}).setValue(false);
mapPanel.add(checkccap);
var checkc = function(){
  checkccap.onChange(function(checked){
    cc.setShown(checked);
  });
};
checkc();
// Link to CCAP key
var ckey = 'https://coast.noaa.gov/data/digitalcoast/pdf/ccap-class-scheme-regional.pdf';
mapPanel.add(ui.Panel([ui.Label({value:'key to CCAP classes',style:{fontSize: '12px',fontFamily: 'monospace', color: '#0000ff'}}).setUrl(ckey)]));
// Add more panel spacing
mapPanel.add(ui.Panel([ui.Label(' ')]));
mapPanel.add(ui.Panel([ui.Label(' ')]));
mapPanel.add(ui.Panel([ui.Label(' ')]));
/*==============================================
RESULTS SECTION
==============================================*/
var stats = ui.Label({value: 'Outputs:',style: {fontSize: '24px',fontFamily: 'monospace', fontWeight: 'bold', color: '#000000'}});
var downl = ui.Label({style: {fontSize: '16px',fontFamily: 'monospace', color: '#0000ff'}});
var areas = ui.Label({style: {fontSize: '16px',fontFamily: 'monospace', color: '#000000'}});
var areas1 = ui.Label({style: {fontSize: '16px',fontFamily: 'monospace', color: '#000000'}});
var areas2 = ui.Label({style: {fontSize: '16px',fontFamily: 'monospace', color: '#000000'}});
var areas3 = ui.Label({style: {fontSize: '16px',fontFamily: 'monospace', color: '#000000'}});
mapPanel.add(ui.Panel([stats]));
mapPanel.add(ui.Panel([areas]));
mapPanel.add(ui.Panel([areas1]));
mapPanel.add(ui.Panel([areas2]));
mapPanel.add(ui.Panel([areas3]));
var inspector = ui.Panel([ui.Label('Click on a node.')]);
map.add(inspector);
var charty = ui.Panel();
mapPanel.add(charty);
/*==============================================
CLICK-GENERATED MAP AND RESULTS
==============================================*/
var makeWatershed=function (coords) {
  /*---------------- SET UP ------------------*/
  // Clear the whole map
  map.clear();
// Set map type
  map.setOptions('SATELLITE');
  // Prepares map for multiple click iterations.
  map.onClick(makeWatershed);
  map.add(inspector);
  inspector.widgets().set(0, ui.Label({
    value: 'Loading...',
    style: {color: 'gray'}
  }));
  mapPanel.remove(charty);
  mapPanel.add(charty);
  charty.widgets().set(0, ui.Label({
    value: 'Loading...',
    style: {color: 'gray'}
  }));
  /*---------------- CHECKBOX LAYERS ------------------*/
  // Add CCAP Layer
  var cc2 = map.addLayer(ccap,{palette:ccapViz,min:2,max:25},'CCAP Landcover',false);
  // Display CCAP if checked
  var checkc2 = function(){
  checkccap.onChange(function(checked){
    cc2.setShown(checked);
  });
};
checkc2();
  // Add Drainage Map Layer
  var dra2 = map.addLayer(drainage4.selfMask(),{bands:['b1','b2','b3'],min:0,max:255},'Drainage Map',true);
  // Show Drainage Map if checked
  var checkd2 = function(){
  checkdrain.onChange(function(checked){
    dra2.setShown(checked);
  });
};
checkd2();
  /*---------------- OTHER LAYERS ------------------*/
  map.addLayer(nds,{color:'white',stroke:0.4},'Stream Network Nodes',true);
  /*---------------- CLICK MAP ------------------*/
  // Generate point at clicked location
  var point = ee.Geometry.Point(coords.lon, coords.lat);
  var ptcoll = ee.FeatureCollection(point);
  // Creat search radius around clicked point.
  var dist = ptcoll.distance({searchRadius:200});
  // Identify nearest node to clicked location.
  var nearest = dist.sampleRegions({collection:nds,scale:10}).sort('distance').first().get('rowno');
  var nearestpt = nds.filter(ee.Filter.eq('rowno',nearest)).first();
  var nearptfeat = nearestpt.geometry();
  print(nearest);
  print(nearestpt);
  print(nearptfeat);
  var computedValue = ee.String(ee.Number(nearest)).length();
  computedValue.evaluate(function(result) {
    if (result > 0) {
      var lbl = ee.Number(nearest).neq(0);
      lbl.evaluate(function(result) {
        inspector.widgets().set(0, ui.Label({
          value: '- watershed generated -',
        }));
      });
    } else {
      inspector.widgets().set(0, ui.Label({
        value: '- clicked too far away -',
      }));
    }
  });
  // Select associated watershed for clicked node.
  var w = strahl.filter(ee.Filter.eq('VALUE',nearest)).first();
  var wnear = w.geometry();
  // Display Watershed and Clicked Node
  var watershed = map.addLayer(wnear,{color: 'blue'},'Upslope Watershed Area',true,1);
  var node = map.addLayer(nearptfeat,{color: '000000'},'Selected Node',true,1);
  // Display Watershed Area
  areas.setValue('Watershed Area:');
  var ar = nearestpt.get('acres');
      ar.evaluate(function(result){
        areas1.setValue(result.toFixed(3)+' acres');
      });
  var km = nearestpt.get('sqkm');
    km.evaluate(function(result){
        areas2.setValue(result.toFixed(3)+' sq. km.');
      });
  var mi = nearestpt.get('sqmi');
    mi.evaluate(function(result){
        areas3.setValue(result.toFixed(3)+' sq. mi.');
      });
  // Make Download Link for Watershed
  var url1 = ee.FeatureCollection(wnear).getDownloadURL({format:'kml',filename:'Watershed'});
  var u2 = ee.String(url1);
  u2.evaluate(function(result){
    downl.setValue(' - Download Watershed as KML').setUrl(result);
  });
//  mapPanel.add(ui.Panel([downl]));
      /////// PIE CHART
  var pie = nds.filter(ee.Filter.eq('rowno',nearest));
  pie.evaluate(function(result){
    var piech = ui.Chart.feature
                .byProperty({
                  features: ee.FeatureCollection(result),
                  xProperties: ['barren','developed','eaquatic','eewetland', 'eswetalnd', 'forest', 'grassland', 'openwater','paquatic','pewetland', 'pfwetland','pswetland','scrub','shore'],
                  seriesProperty:'id'
                })
                .setChartType('PieChart')
                .setOptions({
                  title: 'CCAP Landcover in Upslope Area',
                  colors: [
                    'bebebe', 'fafafa', '777777', '4d4d4d', 'ababab', '393939',
                    'c6c6c6', '111111', '9a9a9a', '3e3e3e'
                  ]
                });
charty.widgets().set(0,piech).set(1,downl);
});
};
// Set action to underrtake when the map is clicked
map.onClick(makeWatershed);
//map.onClick(generateResults);
// Set cursor style to crosshair
map.style().set('cursor', 'crosshair');
// Center initial map 
map.centerObject(drainage4, 11);