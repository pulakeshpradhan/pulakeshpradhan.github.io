// IMPORTS
var snazzy = require("users/aazuspan/snazzy:styles");
var spectral = require("users/dmlmont/spectral:spectral");
var palettes = require('users/gena/packages:palettes');
var poke = require("users/dmlmont/pokepalettes:pokepalettes");
// TAKE AVAILABLE INDICES FOR MODIS
function availableIndices(){
  var vegetationIndices = [];
  var waterIndices = [];
  var urbanIndices = [];
  var snowIndices = [];
  for(var i in spectral.indices){
    var isTrue = spectral.indices[i].platforms.indexOf("MODIS");
    if(isTrue >= 0){
      if(spectral.indices[i].application_domain === "vegetation"){
        vegetationIndices.push(i);
      } else if(spectral.indices[i].application_domain === "water"){
        waterIndices.push(i);
      } else if(spectral.indices[i].application_domain === "snow"){
        snowIndices.push(i);
      } else if(spectral.indices[i].application_domain === "urban"){
        urbanIndices.push(i);
      }
    }
  }
  return {
    vegetation: vegetationIndices,
    water: waterIndices,
    urban: urbanIndices,
    snow: snowIndices
  };
}
// EXTRACT THE INDICES
var idx = availableIndices();
// CONCAT THEM TO COMPUTE THEM ALL
var allIdx = idx.vegetation.concat(idx.water).concat(idx.snow).concat(idx.urban);
// LAND-WATER MASK
var land = ee.Image("MODIS/MOD44W/MOD44W_005_2000_02_24")
  .select("water_mask").eq(0);
// MODIS IMAGE FOR WINTER 2020
var image = ee.ImageCollection("MODIS/006/MCD43A4")
  .filterDate("2020-12-01","2021-03-01")
  .median()
  .updateMask(land);
// SCALE THE IMAGE
var image = spectral.scale(image,"MODIS/006/MCD43A4");
// PARAMETERS FOR COMPUTING ALL INDICES
var params = {
  B: image.select("Nadir_Reflectance_Band3"),
  G: image.select("Nadir_Reflectance_Band4"),
  R: image.select("Nadir_Reflectance_Band1"),
  N: image.select("Nadir_Reflectance_Band2"),
  S1: image.select("Nadir_Reflectance_Band6"),
  S2: image.select("Nadir_Reflectance_Band7"),
  L: spectral.constants.L.default,
  beta: spectral.constants.beta.default,
  alpha: spectral.constants.alpha.default,
  omega: spectral.constants.omega.default,
  sla: spectral.constants.sla.default,
  slb: spectral.constants.slb.default,
  cexp: spectral.constants.cexp.default,
  nexp: spectral.constants.nexp.default,
  PAR: 1,
  k: spectral.constants.k.default,
  lambdaN: spectral.bands.N.modis.wavelength,
  lambdaR: spectral.bands.R.modis.wavelength,
  lambdaG: spectral.bands.G.modis.wavelength,
  gamma: spectral.constants.gamma.default,
  g: spectral.constants.g.default,
  C1: spectral.constants.C1.default,
  C2: spectral.constants.C2.default,
};
// COMPUTE ALL INDICES
var image = spectral.computeIndex(image,allIdx,params);
// VIS PARAMS FOR EACH MAP
var MAP_PARAMS = {
  'Vegetation1': {index: 'NDVI',palette: palettes.matplotlib.viridis[7]},
  'Vegetation2': {index: 'NIRv',palette: palettes.matplotlib.viridis[7]},
  'Water1': {index: 'NDWI',palette: palettes.cmocean.Dense[7]},
  'Water2': {index: 'MNDWI',palette: palettes.cmocean.Dense[7]},
  'Urban1': {index: 'NDBI',palette: palettes.matplotlib.magma[7]},
  'Urban2': {index: 'EMBI',palette: palettes.matplotlib.magma[7]},
  'Snow1': {index: 'NDSI',palette: palettes.cmocean.Ice[7]},
  'Snow2': {index: 'SWI',palette: palettes.cmocean.Ice[7]}
};
// SAME VIS PARAMS FOR ALL MAPS, CHANGE PALETTE
function getVisualization(vis) {
  return {min:0, max:1,bands: vis.index,palette: vis.palette};
}
// CREATE MAPS
var maps = [];
Object.keys(MAP_PARAMS).forEach(function(name) {
  // NEW MAP
  var map = ui.Map();
  // COLORBAR
  var cb = ui.Panel({
    widgets:poke.colorbar(MAP_PARAMS[name].index,0,1,MAP_PARAMS[name].palette),
    style: { width: '30%', position: "top-left"}
  });
  // ADD COLORBAR TO THE MAP
  map.add(cb);
  // ADD NEW LAYER WITH VIS OPTIONS
  map.addLayer(image, getVisualization(MAP_PARAMS[name]), MAP_PARAMS[name].index);
  // DELETE CONTROLS
  map.setControlVisibility(false);
  // ADD MAP TO THE LIST
  maps.push(map);
});
// LINK MAPS
var linker = ui.Map.Linker(maps);
// SHOW SCALE ON THE LAST MAP
maps[7].setControlVisibility({scaleControl: true});
// GRID OF MAPS
var mapGrid = ui.Panel(
    [
      ui.Panel([maps[0], maps[1]], null, {stretch: 'both'}),
      ui.Panel([maps[2], maps[3]], null, {stretch: 'both'}),
      ui.Panel([maps[4], maps[5]], null, {stretch: 'both'}),
      ui.Panel([maps[6], maps[7]], null, {stretch: 'both'})
    ],
    ui.Panel.Layout.Flow('horizontal'), {stretch: 'both'});
// SET CENTER EUROPE
maps[0].setCenter(10, 51, 3);
// STYLES LABELS
var labelStyle = {
    margin: '8px 0 -3px 8px',
    fontSize: '12px',
    color: 'gray'
};
var linkStyle = {
    fontSize: '12px',
    color: 'gray'
};
var titleStyle = {
    margin: '8px 0 -4px 8px',
    fontSize: '16px',
    color: 'gray',
    fontWeight: 'bold'
};
// PANEL
var sidePanel = ui.Panel();
// TITLE
sidePanel.add(ui.Label('Awesome Spectral Indices Visualizer', titleStyle));
// LABEL
sidePanel.add(ui.Label('Made with',labelStyle));
// LINK
sidePanel.add(ui.Label(
  'github.com/awesome-spectral-indices/spectral',
  linkStyle,
  'https://github.com/awesome-spectral-indices/spectral'));
// ADD MAPS AND PANEL
ui.root.widgets().reset([sidePanel, mapGrid]);
ui.root.setLayout(ui.Panel.Layout.Flow('vertical'));