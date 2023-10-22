var poyanghu = ui.import && ui.import("poyanghu", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                114.37508346154328,
                24.634792781704682
              ],
              [
                115.73738814904328,
                24.754571890398186
              ],
              [
                118.37410689904328,
                28.21511966132336
              ],
              [
                119.60457564904328,
                31.079056257409068
              ],
              [
                117.05574752404328,
                34.077922501599545
              ],
              [
                115.38582564904328,
                33.82274768568228
              ],
              [
                109.45320846154328,
                33.23662767890959
              ],
              [
                107.34383346154328,
                30.777482527022528
              ],
              [
                109.27742721154328,
                29.447020266784772
              ],
              [
                113.62801314904328,
                29.561759420206823
              ],
              [
                113.75984908654328,
                26.53719107063034
              ]
            ]
          ],
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#98ff00",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #98ff00 */ee.Geometry.Polygon(
        [[[114.37508346154328, 24.634792781704682],
          [115.73738814904328, 24.754571890398186],
          [118.37410689904328, 28.21511966132336],
          [119.60457564904328, 31.079056257409068],
          [117.05574752404328, 34.077922501599545],
          [115.38582564904328, 33.82274768568228],
          [109.45320846154328, 33.23662767890959],
          [107.34383346154328, 30.777482527022528],
          [109.27742721154328, 29.447020266784772],
          [113.62801314904328, 29.561759420206823],
          [113.75984908654328, 26.53719107063034]]]);
var image = ee.ImageCollection('COPERNICUS/S1_GRD')
    .filter(ee.Filter.eq('instrumentMode', 'IW'))
    .filter(ee.Filter.listContains('transmitterReceiverPolarisation', 'VV'))
    .filter(ee.Filter.eq('orbitProperties_pass', 'ASCENDING'))
    .select(['VV'])
    .map(function(image) {
      var edge = image.lt(-30.0);
      var maskedImage = image.mask().and(edge.not());
      return image.updateMask(maskedImage);
});
var startdate = {
  '2019Reference':'2019-07-07',
  '05/20-06/01':'2020-05-20',
  '06/02-06/07':'2020-06-02',
  '06/08-06/13':'2020-06-08',
  '06/14-06/19':'2020-06-14',
  '06/20-06/26':'2020-06-20',
  '06/27-07/03':'2020-06-27',
  '07/04-07/10':'2020-07-04',
  '07/11-07/17':'2020-07-11',
  '07/18-07/24':'2020-07-18',
  '07/25-07/31':'2020-07-25',
  '08/01-08/07':'2020-08-01',
  // '08/08-08/13':'2020-08-08',
  // '08/14-08/19':'2020-08-13',
  // '08/20-08/26':'2020-08-19',
  // '08/27-08/31':'2020-08-27',
  // '09/01-09/06':'2020-09-01'
};
var enddate = {
  '2019Reference':'2019-07-20',
  '05/20-06/01':'2020-06-02',
  '06/02-06/07':'2020-06-08',
  '06/08-06/13':'2020-06-14',
  '06/14-06/19':'2020-06-20',
  '06/20-06/26':'2020-06-27',
  '06/27-07/03':'2020-07-04',
  '07/04-07/10':'2020-07-11',
  '07/11-07/17':'2020-07-18',
  '07/18-07/24':'2020-07-25',
  '07/25-07/31':'2020-08-01',
  '08/01-08/07':'2020-08-08',
  // '08/08-08/13':'2020-08-14',
  // '08/14-08/19':'2020-08-20',
  // '08/20-08/26':'2020-08-27',
  // '08/27-08/31':'2020-09-01',
  // '09/01-09/06':'2020-09-07'
};
// Create a map for each visualization option.
var maps = [];
Object.keys(startdate).forEach(function(name) {
  var map = ui.Map().setOptions("HYBRID");
  map.add(ui.Label(name,{position:'top-right'}));
  map.addLayer(image.filterBounds(poyanghu).filterDate(startdate[name],enddate[name]).median(), {min:-30,max:0}, name);
  map.setControlVisibility(false);
  maps.push(map);
});
var linker = ui.Map.Linker(maps);
var grids = ee.FeatureCollection('users/410093033/Marksortgrids').sort('floodsum', false);
var gridlist = grids.toList(grids.size()).getInfo()
var showLayer = ui.util.debounce(function(index) {
  var grid = ee.Feature(gridlist[index]);
  explorelyr.setEeObject(grid);
  maps[0].centerObject(grid,10)
},100);
var explorelyr = ui.Map.Layer({name: 'Grid to Mark',visParams: {color:'yellow',opacity:0.5}})
var textbox = ui.Textbox({placeholder:'gridID',onChange:showLayer})
maps[0].add(explorelyr.setEeObject(ee.Feature(gridlist[0])))
maps[0].setCenter(116.186, 29.005,8).setControlVisibility({scaleControl:true,layerList:true,});
var china = ee.FeatureCollection('users/410093033/China');
var gridIdList = china
  .reduceColumns(ee.Reducer.toList(), ["OBJECTID"])
  .get("list")
  .getInfo();
var floodedpro = ee.ImageCollection("users/410093033/FloodingPotential");
maps[0].addLayer(floodedpro.mosaic().selfMask(),{palette:'#ff8266'},'Potential flooding area')
maps[0].drawingTools().setLinked(false);
var floodlyr =
    ui.Map.GeometryLayer({geometries: null, name: 'floodvalid', color: 'blue'});
var nonfloodlyr =
    ui.Map.GeometryLayer({geometries: null, name: 'nonfloodvalid', color: 'yellow'});
maps[0].drawingTools().layers().add(nonfloodlyr);
maps[0].drawingTools().layers().add(floodlyr);
var exportlayer = ui.Map.Layer({name: 'area selection tool', visParams: { color:'red' }})
maps[0].add(exportlayer);
var exportlayer1 = ui.Map.Layer({name: 'area selection tool', visParams: { color:'red' }})
maps[1].add(exportlayer1);
var exportlayer2 = ui.Map.Layer({name: 'area selection tool', visParams: { color:'red' }})
maps[2].add(exportlayer2);
var exportlayer3 = ui.Map.Layer({name: 'area selection tool', visParams: { color:'red' }})
maps[3].add(exportlayer3);
var exportlayer4 = ui.Map.Layer({name: 'area selection tool', visParams: { color:'red' }})
maps[4].add(exportlayer4);
var exportlayer5 = ui.Map.Layer({name: 'area selection tool', visParams: { color:'red' }})
maps[5].add(exportlayer5);
var exportlayer6 = ui.Map.Layer({name: 'area selection tool', visParams: { color:'red' }})
maps[6].add(exportlayer6);
var exportlayer7 = ui.Map.Layer({name: 'area selection tool', visParams: { color:'red' }})
maps[7].add(exportlayer7);
var exportlayer8 = ui.Map.Layer({name: 'area selection tool', visParams: { color:'red' }})
maps[8].add(exportlayer8);
var exportlayer9 = ui.Map.Layer({name: 'area selection tool', visParams: { color:'red' }})
maps[9].add(exportlayer9);
var exportlayer10 = ui.Map.Layer({name: 'area selection tool', visParams: { color:'red' }})
maps[10].add(exportlayer10);
var exportlayer11 = ui.Map.Layer({name: 'area selection tool', visParams: { color:'red' }})
maps[11].add(exportlayer11);
var getGeo = ui.util.debounce(function() {
  var geofeatcol = maps[0].drawingTools().toFeatureCollection('flood')
  exportlayer.setEeObject(geofeatcol)
  exportlayer1.setEeObject(geofeatcol)
  exportlayer2.setEeObject(geofeatcol)
  exportlayer3.setEeObject(geofeatcol)
  exportlayer4.setEeObject(geofeatcol)
  exportlayer5.setEeObject(geofeatcol)
  exportlayer6.setEeObject(geofeatcol)
  exportlayer7.setEeObject(geofeatcol)
  exportlayer8.setEeObject(geofeatcol)
  exportlayer9.setEeObject(geofeatcol)
  exportlayer10.setEeObject(geofeatcol)
  exportlayer11.setEeObject(geofeatcol)
},100);
maps[0].drawingTools().onEdit(getGeo);
maps[0].drawingTools().onDraw(getGeo);
maps[0].drawingTools().onErase(getGeo);
var exportButton = ui.Button({
    label: 'Export validation ROI to your asset',
    onClick: function() {
      var exportgeo = exportlayer.getEeObject()
      maps[0].addLayer(exportgeo,{color:'red'},'exportcheck')
      Export.table.toAsset(exportgeo,'2020FloodingValidRoi')
    },
    style: {
        color: 'blue',
    },
});
maps[11].setControlVisibility({scaleControl:true}).add(textbox);
// Create a grid of maps.
var mapGrid = ui.Panel(
    [
      ui.Panel([maps[0], maps[4],maps[8]], null, {stretch: 'both',border:'1px solid black'}),
      ui.Panel([maps[1], maps[5],maps[9]], null, {stretch: 'both',border:'1px solid black'}),
      ui.Panel([maps[2], maps[6],maps[10]], null, {stretch: 'both',border:'1px solid black'}),
      ui.Panel([maps[3], maps[7],maps[11]], null, {stretch: 'both',border:'1px solid black'}),
    ],
    ui.Panel.Layout.Flow('horizontal'), {stretch: 'both'});
// Create a title.
var title = ui.Label('2020 Sentinel-1 Visualizations', {
  stretch: 'horizontal',
  textAlign: 'center',
  fontWeight: 'bold',
  fontSize: '24px'
});
ui.root.widgets().reset([mapGrid]);
ui.root.setLayout(ui.Panel.Layout.Flow('vertical',false));
// viewport region. 
function downloadFeat(Feat,filename) {
  var downloadArgs = {
    format:'kmz',
    filename: filename,
 };
 return Feat.getDownloadURL(downloadArgs);
}
    var urlLabel1 = ui.Label('Download nonflood', {shown: false});
    var urlLabel2 = ui.Label('Download flood', {shown: false});
var exportButton1 = ui.Button({
    label: 'Export validation ROI to local',
    onClick: function() {
      var nonflood = maps[0].drawingTools().layers().get(0).getEeObject();
      var flood = maps[0].drawingTools().layers().get(1).getEeObject();
      var url1 = downloadFeat(ee.FeatureCollection([nonflood]),'nonflood');
      urlLabel1.setUrl(url1)//.setValue(url1);
      urlLabel1.style().set({shown: true});
      var url2 = downloadFeat(ee.FeatureCollection([flood]),'flood');
      urlLabel2.setUrl(url2)//.setValue(url2);
      urlLabel2.style().set({shown: true});     
    },
    style: {
        color: 'blue',
    },
});
var panel = ui.Panel([exportButton1,urlLabel1,urlLabel2]);
maps[11].add(panel);