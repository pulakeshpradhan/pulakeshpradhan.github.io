var ProtectedAreas = ui.import && ui.import("ProtectedAreas", "table", {
      "id": "WCMC/WDPA/current/polygons"
    }) || ee.FeatureCollection("WCMC/WDPA/current/polygons"),
    NativeLands = ui.import && ui.import("NativeLands", "table", {
      "id": "projects/ee-jcvandervoort/assets/NativeLands"
    }) || ee.FeatureCollection("projects/ee-jcvandervoort/assets/NativeLands"),
    modisOceanColor = ui.import && ui.import("modisOceanColor", "imageCollection", {
      "id": "NASA/OCEANDATA/MODIS-Aqua/L3SMI"
    }) || ee.ImageCollection("NASA/OCEANDATA/MODIS-Aqua/L3SMI"),
    bathymetry = ui.import && ui.import("bathymetry", "image", {
      "id": "NOAA/NGDC/ETOPO1"
    }) || ee.Image("NOAA/NGDC/ETOPO1"),
    population = ui.import && ui.import("population", "imageCollection", {
      "id": "WorldPop/GP/100m/pop"
    }) || ee.ImageCollection("WorldPop/GP/100m/pop"),
    fishing_activity = ui.import && ui.import("fishing_activity", "imageCollection", {
      "id": "GFW/GFF/V1/fishing_hours"
    }) || ee.ImageCollection("GFW/GFF/V1/fishing_hours"),
    vessel_activity = ui.import && ui.import("vessel_activity", "imageCollection", {
      "id": "GFW/GFF/V1/vessel_hours"
    }) || ee.ImageCollection("GFW/GFF/V1/vessel_hours"),
    salinity = ui.import && ui.import("salinity", "imageCollection", {
      "id": "HYCOM/sea_temp_salinity"
    }) || ee.ImageCollection("HYCOM/sea_temp_salinity"),
    land_cover = ui.import && ui.import("land_cover", "imageCollection", {
      "id": "COPERNICUS/Landcover/100m/Proba-V-C3/Global"
    }) || ee.ImageCollection("COPERNICUS/Landcover/100m/Proba-V-C3/Global"),
    coral_reef = ui.import && ui.import("coral_reef", "table", {
      "id": "projects/ee-jcvandervoort/assets/CoralReef"
    }) || ee.FeatureCollection("projects/ee-jcvandervoort/assets/CoralReef"),
    reefs_at_risk = ui.import && ui.import("reefs_at_risk", "table", {
      "id": "projects/ee-jcvandervoort/assets/reefs_at_risk"
    }) || ee.FeatureCollection("projects/ee-jcvandervoort/assets/reefs_at_risk"),
    tidal_flat_eco = ui.import && ui.import("tidal_flat_eco", "image", {
      "id": "projects/ee-jcvandervoort/assets/tidal_flat_ecosystems"
    }) || ee.Image("projects/ee-jcvandervoort/assets/tidal_flat_ecosystems"),
    sea_grasses = ui.import && ui.import("sea_grasses", "table", {
      "id": "projects/ee-jcvandervoort/assets/seagrasses"
    }) || ee.FeatureCollection("projects/ee-jcvandervoort/assets/seagrasses"),
    salt_marshes = ui.import && ui.import("salt_marshes", "table", {
      "id": "projects/ee-jcvandervoort/assets/saltmarshes"
    }) || ee.FeatureCollection("projects/ee-jcvandervoort/assets/saltmarshes"),
    benthic_habitat = ui.import && ui.import("benthic_habitat", "image", {
      "id": "ACA/reef_habitat/v1_0"
    }) || ee.Image("ACA/reef_habitat/v1_0"),
    mangroves = ui.import && ui.import("mangroves", "table", {
      "id": "projects/ee-jcvandervoort/assets/mangrove_USGS"
    }) || ee.FeatureCollection("projects/ee-jcvandervoort/assets/mangrove_USGS"),
    seagrass_biome = ui.import && ui.import("seagrass_biome", "table", {
      "id": "projects/ee-jcvandervoort/assets/seagrasses_biome"
    }) || ee.FeatureCollection("projects/ee-jcvandervoort/assets/seagrasses_biome"),
    kelp = ui.import && ui.import("kelp", "table", {
      "id": "projects/ee-jcvandervoort/assets/Kelp"
    }) || ee.FeatureCollection("projects/ee-jcvandervoort/assets/Kelp"),
    minerals = ui.import && ui.import("minerals", "table", {
      "id": "projects/ee-jcvandervoort/assets/minerals"
    }) || ee.FeatureCollection("projects/ee-jcvandervoort/assets/minerals"),
    power_plants = ui.import && ui.import("power_plants", "table", {
      "id": "projects/ee-jcvandervoort/assets/power_plants"
    }) || ee.FeatureCollection("projects/ee-jcvandervoort/assets/power_plants"),
    human_set = ui.import && ui.import("human_set", "image", {
      "id": "JRC/GHSL/P2016/BUILT_LDSMT_GLOBE_V1"
    }) || ee.Image("JRC/GHSL/P2016/BUILT_LDSMT_GLOBE_V1");
////////////////////////////////////////////////////////////////////
// Adding a Legend
////////////////////////////////////////////////////////////////////
// set position of panel
var legend = ui.Panel({
  style: {
    position: 'bottom-right',
    padding: '8px 15px'
  }
});
// Create legend title
var legendTitle = ui.Label({
  value: 'Legend',
  style: {
    fontWeight: 'bold',
    fontSize: '18px',
    margin: '0 0 4px 0',
    padding: '0'
    }
});
// Add the title to the panel
legend.add(legendTitle);
// Creates and styles 1 row of the legend.
var makeRow = function(color, name) {
      // Create the label that is actually the colored box.
      var colorBox = ui.Label({
        style: {
          backgroundColor: color,
          // Use padding to give the box height and width.
          padding: '8px',
          margin: '0 0 4px 0'
        }
      });
      // Create the label filled with the description text.
      var description = ui.Label({
        value: name,
        style: {margin: '0 0 4px 6px'}
      });
      // return the panel
      return ui.Panel({
        widgets: [colorBox, description],
        layout: ui.Panel.Layout.Flow('horizontal'),
        style: {shown:false}
      });
};
//// add (still empty) legend to map
Map.add(legend);
/////////////////////////////////////////////////////
/// Continuous Legend
/////////////////////////////////////////////////////
var makeColorBarParams = function(palette){
  return {
    bbox: [0, 0, 1, 0.1],
    dimensions: '100x10',
    format: 'png',
    min: 0,
    max: 1,
    palette: palette,
  };
} ;
var makeColorBar = function(name,vis){
  // Create the color bar for the legend.
  var colorBar = ui.Thumbnail({
    image: ee.Image.pixelLonLat().select(0),
    params: makeColorBarParams(vis.palette),
    style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
  });
  // Create a panel with three numbers for the legend.
  var legendLabels = ui.Panel({
    widgets: [
      ui.Label(vis.min.toFixed(1), {margin: '4px 8px'}),
      ui.Label( ( (vis.max-vis.min)/4+vis.min).toFixed(1) , 
      {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
      ui.Label(
        ((vis.max-vis.min) / 2+vis.min).toFixed(1),
        {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
      ui.Label( ( (vis.max-vis.min)/(4/3)+vis.min).toFixed(1) , 
      {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
      ui.Label(vis.max.toFixed(1), {margin: '4px 8px'})   ],
    layout: ui.Panel.Layout.flow('horizontal')
  });
  var legendTitle = ui.Label({
  value: name,
  style: {fontWeight: 'bold'}
  });
  return ui.Panel({widgets: [legendTitle, colorBar, legendLabels], style:{shown:false} } ) ;
} ;
///////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////
// Creating the User Interface
/////////////////////////////////
// Create a panel with vertical flow layout.
var panel = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
  style: {width: '300px'}
});
/////////////////////////////////////
// Button, Checkbox and Label styles
/////////////////////////////////////
var ButtonStyle = {stretch: 'horizontal', border: '1px solid black'} ;
var ButtonStyleHome = {stretch: 'horizontal', border: '1px solid black', color: 'green'} ;
var ButtonStyleBack = {stretch: 'horizontal', border: '1px solid black', color: 'red' } ;
var CheckBoxStyle = {stretch: 'horizontal', border: '1px solid black'} ;
var LabelStyle = {fontWeight: 'bold'} ;
////////////////////////////////////
//// Home Button
////////////////////////////////////
panel.add(ui.Button({label: 'HOME', style: ButtonStyleHome} ) ) ;
var home = function(){
  ui.root.remove(ui.root.widgets().get(1) ) ; // remove current panel
  ui.root.add(panel) ; // add the home panel
} ;
panel.add(ui.Label('Select one of the IFC Performance Standards.') ) ;
///////////////////////////////////////////////////////////////////////////////////////////////////////////
//// Performance Standard 2: Labor
///////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////
// Labor conditions
/////////////////////
var labor_cond = function() {
    var panel2a = ui.Panel({
      layout: ui.Panel.Layout.flow('vertical') ,
      style: {width: '300px'}
    }) ;
    panel2a.add(ui.Button({label: 'HOME', onClick: home, style: ButtonStyleHome} ) ) ;
    panel2a.add(ui.Button({label: 'BACK', onClick: ps2, style: ButtonStyleBack} ) ) ;
    panel2a.add(ui.Label('Labor Conditions', LabelStyle ) ) ;
    panel2a.add(ui.Label('Choose indicator.') ) ;
// Child labor
    var child_label = ui.Label({value: 'Share of children in employment, per country and per year (until 2016). Source: Our World in Data, based on data from ILO, Unicef and World Bank. Link:', style: {shown:false} } ) ;
    var child_link = ui.Label('Our World in Data', {color:'blue', shown:false}, 'https://ourworldindata.org/grapher/incidence-of-child-labour?tab=map&time=2015') ;
    panel2a.add(ui.Checkbox({label: 'Child labor', value: false, 
    onChange: function(checked){child_label.style().set({shown:checked} ) ;
    child_link.style().set({shown:checked})}, style: CheckBoxStyle }) ) ;
    panel2a.add(child_label) ;
    panel2a.add(child_link) ;
// Decent work
    var decent_label = ui.Label('Latest decent work statistics per country from the International Labour Organization:', {shown: false }) ;
    var decent_link = ui.Label('International Labour Organization', {color:'blue', shown:false}, 'https://ilostat.ilo.org/data/country-profiles/') ;
    panel2a.add(ui.Checkbox({label: 'Decent work', value: false, 
      onChange: function(checked){decent_label.style().set({shown:checked}) ;
        decent_link.style().set({shown:checked}) }, style: CheckBoxStyle }) ) ;
    panel2a.add(decent_label) ;
    panel2a.add(decent_link) ;
// Safety and health and labor inspection
    var inspection_label = ui.Label({value: 'Occupational safety and Health & Labour inspection practices per country from the International Labour Organization:', style: {shown: false }}) ;
    var inspection_link = ui.Label('International Labour Organization', {color:'blue', shown:false}, 'https://www.ilo.org/global/topics/safety-and-health-at-work/country-profiles/lang--en/index.htm') ;
    panel2a.add(ui.Checkbox({label: 'Safety and Health & Labor inspection', value: false, 
      onChange: function(checked){inspection_label.style().set({shown:checked}) ;
        inspection_link.style().set({shown:checked} ) }, style: CheckBoxStyle }) ) ;
    panel2a.add(inspection_label) ;
    panel2a.add(inspection_link) ;
    ui.root.remove(ui.root.widgets().get(1) ) ;
    ui.root.add(panel2a) ;
  } ;
///////////////////////////////
// Human rights
///////////////////////////////
var humanrights = function() {
    var panel2b = ui.Panel({
      layout: ui.Panel.Layout.flow('vertical') ,
      style: {width: '300px'}
    }) ;
    panel2b.add(ui.Button({label: 'HOME', onClick: home, style: ButtonStyleHome} ) ) ;
    panel2b.add(ui.Button({label: 'BACK', onClick: ps2, style: ButtonStyleBack} ) ) ;
    panel2b.add(ui.Label('Human rights', LabelStyle ) ) ;
    panel2b.add(ui.Label('Choose indicator.') ) ;
// Human rights index
    var hum_rights_label = ui.Label('Human rights risk (from Very Low to Very High) from Global Risk Profile:', {shown:false}) ;
    var hum_rights_link = ui.Label('Global Risk Profile', {color: 'blue', shown:false}, 'https://risk-indexes.com/human-rights-map/' ) ;
    var hum_rights_label2 = ui.Label('Human rights scores (up to 2017) from Our World in Data:', {shown:false} ) ;
    var hum_rights_link2 = ui.Label('Our World in Data', {color:'blue', shown:false}, 'https://ourworldindata.org/grapher/human-rights-scores?country=~CHN~HUN~PRK~KOR~NOR~ALB') ;
    panel2b.add(ui.Checkbox({label: 'Human rights index', value: false, 
      onChange: function(checked){hum_rights_label.style().set({shown:checked}) ;
      hum_rights_link.style().set({shown:checked}) ; hum_rights_link2.style().set({shown:checked}) ;
        hum_rights_label2.style().set({shown:checked})  }, style: CheckBoxStyle }) ) ;
    panel2b.add(hum_rights_label) ;
    panel2b.add(hum_rights_link) ;
    panel2b.add(hum_rights_label2) ;
    panel2b.add(hum_rights_link2) ;
// Human rights information
    var hum_info_label = ui.Label('Human rights information per country, according to Amnesty International:', {shown:false} ) ;
    var hum_info_link = ui.Label('Amnesty International', {color: 'blue', shown:false}, 'https://www.amnesty.org/en/countries/' ) ;
    var hum_info_label2 = ui.Label('Human rights information per country, according to the Human Rights Watch:', {shown:false}) ;
    var hum_info_link2 = ui.Label('Human Rights Watch', {color: 'blue', shown:false}, 'https://www.hrw.org/countries') ;
    panel2b.add(ui.Checkbox({label: 'Human rights information', value: false, 
      onChange: function(checked){hum_info_label.style().set({shown:checked}) ;
      hum_info_link.style().set({shown:checked}) ; hum_info_link2.style().set({shown:checked}) ;
        hum_info_label2.style().set({shown:checked}) } , style: CheckBoxStyle }) ) ;
    panel2b.add(hum_info_label) ;
    panel2b.add(hum_info_link) ;
    panel2b.add(hum_info_label2) ;
    panel2b.add(hum_info_link2) ;
    ui.root.remove(ui.root.widgets().get(1) ) ;
    ui.root.add(panel2b) ;
  } ;
var ps2 = function() {
    var panel2 = ui.Panel({
      layout: ui.Panel.Layout.flow('vertical') ,
      style: {width: '300px'}
    }) ;
    panel2.add(ui.Button({label: 'HOME', onClick: home, style: ButtonStyleHome} ) ) ;
    panel2.add(ui.Button({label: 'BACK', onClick: home, style: ButtonStyleBack} ) ) ;
    panel2.add(ui.Label('PS2: Labor', LabelStyle ) ) ;
    panel2.add(ui.Label('Choose risk category.') ) ;
    panel2.add(ui.Button({label: 'Human rights', onClick: humanrights, style: ButtonStyle } ) ) ;
    panel2.add(ui.Button({label: 'Labor conditions', onClick: labor_cond, style: ButtonStyle } )) ;
    ui.root.remove(ui.root.widgets().get(1)) ;
    ui.root.add(panel2) ;
  } ;
panel.add(ui.Button({label: 'PS2: Labor', onClick: ps2, style: ButtonStyle} ) ) ;
///////////////////////////////////////////////////////////////////////////
///// Performance Standard 3: Resource Efficiency
///////////////////////////////////////////////////////////////////////////
/////////////////////////
// Contamination
/////////////////////////
var cont = function() {
    var panel3a = ui.Panel({
      layout: ui.Panel.Layout.flow('vertical') ,
      style: {width: '300px'}
    }) ;
    panel3a.add(ui.Button({label: 'HOME', onClick: home, style: ButtonStyleHome} ) ) ;
    panel3a.add(ui.Button({label: 'BACK', onClick: ps3, style: ButtonStyleBack} ) ) ;
    panel3a.add(ui.Label('Contamination', LabelStyle ) ) ;
    panel3a.add(ui.Label('Choose indicator.') ) ;
// Air quality
    var air_qual_label = ui.Label('Map with air pollution data in micro gram per cubic meter, according to Ventusky. Bases its data on NOAA and DWD. Note: also contains weather data. Link:', {shown:false}) ;
    var air_qual_link = ui.Label('Ventusky', {color:'blue', shown:false}, 'https://www.ventusky.com/?p=16.27;121.60;6&l=pm10' ) ;
    var air_qual_label2 = ui.Label('Global map of air quality, expressed in the Plume Air Quality Index, according to Plume Labs. Note: 3rd party application. Source:', {shown:false}) ;
    var air_qual_link2 = ui.Label('World Air Map', {color:'blue', shown:false}, 'https://air.plumelabs.com/en/') ;
    panel3a.add(ui.Checkbox({label: 'Air quality', value: false, 
      onChange: function(checked){air_qual_label2.style().set({shown:checked}) ;
        air_qual_link2.style().set({shown:checked}) ; air_qual_label.style().set({shown:checked}) ;
        air_qual_link.style().set({shown:checked}) }, style: CheckBoxStyle } ) ) ;
    panel3a.add(air_qual_label) ;
    panel3a.add(air_qual_link) ;
    panel3a.add(air_qual_label2) ;
    panel3a.add(air_qual_link2) ;
// Pollution data
    var poll_label = ui.Label({value: 'Global Pollution Map with data on air pollution, lead pollution and sites contaminated by heavy metals, by the Global Alliance on Health and Pollution. Source:', style: {shown: false }}) ;
    var poll_link = ui.Label('Global Pollution Map', {color:'blue', shown:false}, 'https://www.pollution.org/') ;
    panel3a.add(ui.Checkbox({label: 'Pollution', value: false, 
      onChange: function(checked){poll_label.style().set({shown:checked}) ;
        poll_link.style().set({shown:checked}) }, style: CheckBoxStyle }) ) ;
    panel3a.add(poll_label) ;
    panel3a.add(poll_link ) ;
// Presence of heavy metals
    var heavy_metal_label = ui.Label({value: 'Map of sites contaminated with heavy metals, developed by the Global Alliance on Health and Pollution, together with the Global Commission on Pollution and Health. Source:', style: {shown: false }}) ;
    var heavy_metal_link = ui.Label('Contaminated sites', {color:'blue', shown:false}, 'http://www.globalpollutionmap.org/sites.html') ;
    panel3a.add(ui.Checkbox({label: 'Presence of heavy metals', value: false, 
      onChange: function(checked){heavy_metal_label.style().set({shown:checked}) ;
        heavy_metal_link.style().set({shown:checked}) }, style: CheckBoxStyle }) ) ;
    panel3a.add(heavy_metal_label) ;
    panel3a.add(heavy_metal_link) ;
// Presence of oil and gas
    var oil_gas_label = ui.Label({value: 'Global map of oil and gas pipelines, refineries and deposits (2021), according to the World Oil Map by R. Leal. Source:', style: {shown: false }}) ;
    var oil_gas_link = ui.Label('World Oil Map 2021', {color:'blue', shown:false}, 'https://www.oilmap.xyz/') ;
    var oil_gas_label2 = ui.Label('Global maps of oil and gas basins, pipelines and refineries, according to Fractracker Alliance. Source:', {shown:false}) ;
    var oil_gas_link2 = ui.Label('Fractracker', {color:'blue', shown:false}, 'https://www.fractracker.org/map/international/') ;
    panel3a.add(ui.Checkbox({label: 'Presence of oil and gas', value: false, 
      onChange: function(checked){oil_gas_label.style().set({shown:checked}) ;
        oil_gas_link.style().set({shown:checked}) ; oil_gas_label2.style().set({shown:checked}) ;
        oil_gas_link2.style().set({shown:checked}) }, style: CheckBoxStyle }) ) ;
    panel3a.add(oil_gas_label) ;
    panel3a.add(oil_gas_link) ;
    panel3a.add(oil_gas_label2) ;
    panel3a.add(oil_gas_link2) ;
// Wastewater facilities
    var waste_label = ui.Label({value: 'Map of Nereda wastewater facilities. Source:', style: {shown: false }}) ;
    var waste_link = ui.Label('Nereda', {color:'blue', shown:false}, 'https://www.royalhaskoningdhv.com/nereda') ;
    panel3a.add(ui.Checkbox({label: 'Wastewater facilities', value: false, 
      onChange: function(checked){waste_label.style().set({shown:checked}) ;
        waste_link.style().set({shown:checked}) }, style: CheckBoxStyle }) ) ;
    panel3a.add(waste_label) ;
    panel3a.add(waste_link) ;
// Water quality
    var water_qual_label = ui.Label({value: 'Global water quality data by GEMStat, maintained by the International Centre for Water Resources and Global Change. Source:', style: {shown: false }}) ;
    var water_qual_link = ui.Label('Global Water Quality', {color:'blue', shown:false}, 'https://gemstat.bafg.de/applications/public.html?publicuser=PublicUser#gemstat/Stations') ;
    panel3a.add(ui.Checkbox({label: 'Water quality', value: false, 
      onChange: function(checked){water_qual_label.style().set({shown:checked}) ;
        water_qual_link.style().set({shown:checked}) }, style: CheckBoxStyle }) ) ;
    panel3a.add(water_qual_label) ;
    panel3a.add(water_qual_link) ;
    ui.root.remove(ui.root.widgets().get(1) ) ;
    ui.root.add(panel3a) ;
  } ;
///////////////////////////////////
// Geophysical characteristics
///////////////////////////////////
var nat_res = function() {
    var panel3b = ui.Panel({
      layout: ui.Panel.Layout.flow('vertical') ,
      style: {width: '300px'}
    }) ;
    panel3b.add(ui.Button({label: 'HOME', onClick: home, style: ButtonStyleHome} ) ) ;
    panel3b.add(ui.Button({label: 'BACK', onClick: ps3, style: ButtonStyleBack} ) ) ;
    panel3b.add(ui.Label('Geophysical characteristics', LabelStyle ) ) ;
    panel3b.add(ui.Label('Choose indicator.') ) ;
// Coastal erosion  
    var ero_label = ui.Label('Coastal erosion/accretion between 1984 and 2016 from the Deltares Shoreline Monitor:', {shown: false }) ;
    var ero_link = ui.Label('Deltares Shoreline Monitor', {color:'blue', shown:false}, 'https://aqua-monitor.appspot.com/?datasets=shoreline') ;
    panel3b.add(ui.Checkbox({label: 'Coastal erosion', value: false, 
      onChange: function(checked){ero_label.style().set({shown:checked}) ; 
        ero_link.style().set({shown:checked} ) }, style: CheckBoxStyle }) ) ;
    panel3b.add(ero_label) ;
    panel3b.add(ero_link) ;
// Currents
    var curr_label = ui.Label({value: 'Global map with animated currents, from Earth Null School, author: C. Beccario. For more data about currents see Boskalis World. Source:', style: {shown: false }}) ;
    var curr_link = ui.Label('Global currents animated map', {color:'blue', shown:false}, 'https://earth.nullschool.net/#current/ocean/surface/currents/orthographic') ;
    panel3b.add(ui.Checkbox({label: 'Currents', value: false, 
      onChange: function(checked){curr_label.style().set({shown:checked}) ;
        curr_link.style().set({shown:checked}) }, style: CheckBoxStyle }) ) ;
    panel3b.add(curr_label) ;
    panel3b.add(curr_link) ;
// Land subsidence
    var sub_label = ui.Label({value: 'Global map of land subsidence susceptibility from UNESCO Land Subsidence International Initiative. Information about the map can be found in the Science article by Herrera-Garcia et al. (2021).', style: {shown: false }}) ;
    var sub_link = ui.Label('Global Subsidence Map', {color:'blue', shown:false}, 'https://info.igme.es/visor/?Configuracion=globalsubsidence&idioma=en') ;
    var sub_link2 = ui.Label('Science article Herrera-Garcia et al.', {color:'blue', shown:false}, 'https://www-science-org.tudelft.idm.oclc.org/doi/10.1126/science.abb8549#F1') ;
    panel3b.add(ui.Checkbox({label: 'Land subsidence', value: false, 
      onChange: function(checked){sub_label.style().set({shown:checked}) ;
        sub_link.style().set({shown:checked}) ; sub_link2.style().set({shown:checked} ) }, style: CheckBoxStyle }) ) ;
    panel3b.add(sub_label) ;
    panel3b.add(sub_link) ;
    panel3b.add(sub_link2) ;
// Presence of minerals
    var min_layer = ui.Map.Layer(minerals, {color:'darkred'}, 'Mineral deposits', false) ;
    Map.layers().add(min_layer) ;
    var min_label = makeRow('darkred', 'Mineral deposits') ;
    legend.add(min_label) ;
    var insp_min = ui.Panel({widgets:[ui.Label(''), ui.Label(''), ui.Label('')],
      style:{shown:false,position:'top-center'} }) ;
    var min_info = ui.Label('Mineral deposits according to USGS. Link:', {shown:false} ) ;
    var min_link = ui.Label('Major Deposits (USGS)', {color:'blue', shown:false} , 'https://mrdata.usgs.gov/major-deposits/map-us.html') ;
    var min_info2 = ui.Label({value: 'Map with global mineral resources reports from USGS:', style: {shown: false }}) ;
    var min_link2 = ui.Label('Mineral Resources Data System (USGS)', {color:'blue', shown:false}, 'https://mrdata.usgs.gov/mrds/map-graded.html#home') ;
    panel3b.add(ui.Checkbox({label: 'Presence of minerals', value: false, 
      onChange: function(checked){min_label.style().set({shown:checked}) ;
      min_info.style().set({shown:checked}) ; min_layer.setShown(checked) ;
        min_link.style().set({shown:checked} ) ; min_info2.style().set({shown:checked}) ;
        min_link2.style().set({shown:checked}) ;
    // reset inspector
    insp_min.widgets().set(0,ui.Label('Click on a location to get more information') ) ;
    insp_min.widgets().set(1, ui.Label(''));
    insp_min.widgets().set(2,ui.Label('')) ;
    var cursor = ['hand', 'crosshair'] ;
    Map.style().set('cursor', cursor[checked|0] ) ;  
    insp_min.style().set({shown:checked}) ; 
    Map.onClick(function(coords) {
      var point = ee.Geometry.Point(coords.lon, coords.lat);
      var min_filter = minerals.filter( ee.Filter.withinDistance( 
  { distance: 1e3,
  leftField: '.geo',
  rightValue: point } ) ) ;
      var min_name = min_filter.aggregate_array('DEP_NAME') ;
      var min_com = min_filter.aggregate_array('COMMODITY') ;
      insp_min.widgets().set(0,ui.Label({value:'Mineral Deposit information', style:{fontWeight: 'bold'}})) ;
      insp_min.widgets().set(1,ui.Label({value:'Loading...', style:{color:'grey'}})) ;
      insp_min.widgets().set(2,ui.Label({value:'Loading...', style:{color:'grey'}})) ;
     min_name.evaluate(function(result) {
        insp_min.widgets().set(1, ui.Label( 'Name: ' + result )) ;
      });
     min_com.evaluate(function(result) {
       insp_min.widgets().set(2,ui.Label('Commodity: ' + result)) ;
      }) ;
    });
      }, style: CheckBoxStyle }) ) ;
    Map.add(insp_min) ;
    panel3b.add(min_info) ;
    panel3b.add(min_link ) ;
    panel3b.add(min_info2) ;
    panel3b.add(min_link2) ;
// Seismic and volcanic activity
    var seis_label = ui.Label({value: 'Global Seismic Hazard Map from the Global Earthquake Model Foundation:', style: {shown: false }}) ;
    var seis_link = ui.Label('Global Seismic Hazard Map', {color:'blue',shown:false}, 'https://maps.openquake.org/map/global-seismic-hazard-map/#2/24.7/-18.6') ;
    var vol_label = ui.Label('Map of currently active volcanos and recent earthquakes by VolcanoDiscovery:', {shown:false} ) ;
    var vol_link = ui.Label('VolcanoDiscovery', {color:'blue', shown:false}, 'https://www.volcanoesandearthquakes.com/') ;
    panel3b.add(ui.Checkbox({label: 'Seismic and volcanic activity', value: false, 
      onChange: function(checked){seis_label.style().set({shown:checked}) ;
        seis_link.style().set({shown:checked}) ; vol_label.style().set({shown:checked}) ;
        vol_link.style().set({shown:checked})}, style: CheckBoxStyle }) ) ;
    panel3b.add(seis_label) ;
    panel3b.add(seis_link) ;
    panel3b.add(vol_label) ;
    panel3b.add(vol_link) ;
// Type of soil
    var soil_label = ui.Label({value: 'Soil properties (chemical, physical) and soil classes, according to ISRIC World Soil Information. Link:', style: {shown: false }}) ;
    var soil_link = ui.Label('SoilGrids Map', {color:'blue', shown:false}, 'https://soilgrids.org/') ;
    panel3b.add(ui.Checkbox({label: 'Type of soil', value: false, 
      onChange: function(checked){soil_label.style().set({shown:checked}) ;
        soil_link.style().set({shown:checked} ) }, style: CheckBoxStyle }) ) ;
    panel3b.add(soil_label) ;
    panel3b.add(soil_link) ;
// Wave height
    var wave_label = ui.Label({value: 'Global animated map with Significant Wave Height, according to Earth Null School. More detailed information available from Boskalis World. Source:', style: {shown: false }}) ;
    var wave_link = ui.Label('Earth Null School', {color:'blue', shown:false}, 'https://earth.nullschool.net/#current/ocean/primary/waves/overlay=significant_wave_height/orthographic') ;
    panel3b.add(ui.Checkbox({label: 'Wave height', value: false, 
      onChange: function(checked){wave_label.style().set({shown:checked}) ;
        wave_link.style().set({shown:checked}) }, style: CheckBoxStyle }) ) ;
    panel3b.add(wave_label) ;
    panel3b.add(wave_link) ;
    ui.root.remove(ui.root.widgets().get(1) ) ;
    ui.root.add(panel3b) ;
  } ;
var ps3 = function() {
    var panel3 = ui.Panel({
      layout: ui.Panel.Layout.flow('vertical') ,
      style: {width: '300px'}
    }) ;
    panel3.add(ui.Button({label: 'HOME', onClick: home, style: ButtonStyleHome} ) ) ;
    panel3.add(ui.Button({label: 'BACK', onClick: home, style: ButtonStyleBack} ) ) ;
    panel3.add(ui.Label('PS3: Resource Efficiency', LabelStyle ) ) ;
    panel3.add(ui.Label('Choose risk category.') ) ;
    panel3.add(ui.Button({label: 'Contamination', onClick: cont, style: ButtonStyle } ) ) ;
    panel3.add(ui.Button({label: 'Geophysical characteristics', onClick: nat_res, style: ButtonStyle } )) ;
    ui.root.remove(ui.root.widgets().get(1)) ;
    ui.root.add(panel3) ;
  } ;
panel.add(ui.Button({label: 'PS3: Resource Efficiency', onClick: ps3, style: ButtonStyle} ) ) ;
/////////////////////////////////////////////////////////////////////////////////////
//// Performance Standard 4: Community
/////////////////////////////////////////////////////////////////////////////////////
////////////////////////
// Fisheries
////////////////////////
var fisheries = function() {
    var panel4a = ui.Panel({
      layout: ui.Panel.Layout.flow('vertical') ,
      style: {width: '300px'}
    }) ;
    panel4a.add(ui.Button({label: 'HOME', onClick: home, style: ButtonStyleHome} ) ) ;
    panel4a.add(ui.Button({label: 'BACK', onClick: ps4, style: ButtonStyleBack} ) ) ;
    panel4a.add(ui.Label('Vessel traffic', LabelStyle ) ) ;
    panel4a.add(ui.Label('Choose indicator.') ) ;
// Vessel activity
    var img2 = vessel_activity.filterMetadata("country","equals","WLD") // wld: world data
.filterDate("2016-01-01","2016-12-31").sum();
    var trawlers = img2.select('trawlers') ;
    var drift = img2.select('drifting_longlines') ;
    var purse = img2.select('purse_seines') ;
    var squid = img2.select('squid_jigger') ;
    var other = img2.select('other_fishing') ;
    var fixed = img2.select('fixed_gear') ;
    var vessel = img2.expression( '(a+b+c+d+e+f)', {
    a: trawlers, b:drift, c:purse, d:squid, e:other, f:fixed  } );
    var placeholder = ui.Map.Layer(ee.Image(),{},'Placeholder',false) ;
    Map.layers().add(placeholder) ; // placeholder layer
    // find Placeholder layer
    var num_layers = Map.layers().length() ;
    var layer_names = [] ;
    for (var j = 0; j<num_layers; j++){
      layer_names[j] = Map.layers().get(j).getName() ;
      }
    var layer_index = layer_names.indexOf('Placeholder') ;
    var vis_vessel = {min:30, max:230, palette:['blue', 'green', 'yellow'] } ;
    var options = {'TOTAL': ''  ,  'trawlers': 'trawlers', 'drifting longlines': 'drifting_longlines', 
    'purse seines': 'purse_seines', 'squid jigger' : 'squid_jigger', 'fixed gear':'fixed_gear',
    'other': 'other_fishing'} ;
   var select_span = ui.Select({
      items: Object.keys(options),
      style: {shown:false},
      onChange: function(key) {
        var vess_type ;
        if (options[key] === ''){
          vess_type = vessel.selfMask() ;
        }
        else{
          vess_type = img2.select(options[key]).selfMask() ;
        }
        Map.layers().get(layer_index).setEeObject(vess_type) ;
        Map.layers().get(layer_index).setVisParams(vis_vessel) ;
       }
    });
    select_span.setPlaceholder('Choose a fishing gear type...') ;
    var vessel_label = makeColorBar('Fishing vessel activity [hours per square km]', vis_vessel) ;
    legend.add(vessel_label) ;
    var vessel_info = ui.Label('Fishing vessel activity (2016) in hours per square km according to Global Fishing Watch. Only larger vessels are detected. Note: check Boskalis World for more accurate data. Link:', {shown:false}) ;
    var vessel_link = ui.Label('Global fishing watch', {color:'blue', shown:false}, 'https://globalfishingwatch.org/map/fishing-activity?latitude=10&longitude=-90&zoom=1') ;
    panel4a.add(ui.Checkbox({label: 'Fishing vessel activity', value: false, 
      onChange: function(checked){Map.layers().get(layer_index).setShown(checked) ;
      vessel_label.style().set({shown:checked}) ; vessel_info.style().set({shown:checked}) ;
        vessel_link.style().set({shown:checked} ) ; select_span.style().set({shown:checked}) }, style: CheckBoxStyle }) ) ;
    panel4a.add(select_span) ;
    panel4a.add(vessel_info) ;
    panel4a.add(vessel_link) ;
// Marine traffic
    var traff_label = ui.Label({value: 'Marine traffic according to ShipTraffic.net. Link:', style: {shown:false }}) ;
    var traff_link = ui.Label('ShipTraffic', {color:'blue', shown:false}, 'http://www.shiptraffic.net/2001/05/wave-height-map-sea-depths-tide-scale.html') ;
    panel4a.add(ui.Checkbox({label: 'Marine traffic', value: false, 
      onChange: function(checked){traff_label.style().set({shown:checked}) ;
        traff_link.style().set({shown:checked}) }, style: CheckBoxStyle }) ) ;
    panel4a.add(traff_label) ;
    panel4a.add(traff_link) ;
    ui.root.remove(ui.root.widgets().get(1) ) ;
    ui.root.add(panel4a) ;
  } ;
//////////////////////////
// Opposition
//////////////////////////
var oppo = function() {
    var panel4b = ui.Panel({
      layout: ui.Panel.Layout.flow('vertical') ,
      style: {width: '300px'}
    }) ;
    panel4b.add(ui.Button({label: 'HOME', onClick: home, style: ButtonStyleHome} ) ) ;
    panel4b.add(ui.Button({label: 'BACK', onClick: ps4, style: ButtonStyleBack} ) ) ;
    panel4b.add(ui.Label('Opposition', LabelStyle ) ) ;
    panel4b.add(ui.Label('Choose indicator.') ) ;
// Protests
    var prot_label = ui.Label({value:'Map displaying past projects and the opposition that was shown by the public. Link:', style: {shown:false} } ) ;
    var prot_link = ui.Label('EJAtlas', {color: 'blue', shown:false}, 'https://ejatlas.org/') ;
    panel4b.add(ui.Checkbox({label: 'Opposition against past projects', value: false, 
      onChange: function(checked){prot_label.style().set({shown:checked}) ;
      prot_link.style().set({shown:checked} )}, style: CheckBoxStyle }) ) ;
    panel4b.add(prot_label) ;
    panel4b.add(prot_link) ;
    ui.root.remove(ui.root.widgets().get(1) ) ;
    ui.root.add(panel4b) ;
  } ;
////////////////////////////////////
// Political situation
////////////////////////////////////
var pol_sit = function() {
    var panel4c = ui.Panel({
      layout: ui.Panel.Layout.flow('vertical') ,
      style: {width: '300px'}
    }) ;
    panel4c.add(ui.Button({label: 'HOME', onClick: home, style: ButtonStyleHome} ) ) ;
    panel4c.add(ui.Button({label: 'BACK', onClick: ps4, style: ButtonStyleBack} ) ) ;
    panel4c.add(ui.Label('Corruption', LabelStyle ) ) ;
    panel4c.add(ui.Label('Choose indicator.') ) ;
// Corruption Index
    var corr_label = ui.Label({value: 'Global corruption risk per country (from Very Low to Very High), according to Global Risk Profile. Link:', style: {shown:false }}) ;
    var corr_link = ui.Label('Global Risk Profile', {color:'blue', shown:false}, 'https://risk-indexes.com/corruption-map/') ;
    panel4c.add(ui.Checkbox({label: 'Corruption Index', value: false, 
      onChange: function(checked){corr_label.style().set({shown:checked}) ;
      corr_link.style().set({shown:checked})}, style: CheckBoxStyle }) ) ;
    panel4c.add(corr_label) ;
    panel4c.add(corr_link) ;
    ui.root.remove(ui.root.widgets().get(1) ) ;
    ui.root.add(panel4c) ;
  } ;
////////////////////////////////
// Demographic features
////////////////////////////////
var demo = function() {
    var panel4d = ui.Panel({
      layout: ui.Panel.Layout.flow('vertical') ,
      style: {width: '300px'}
    }) ;
    panel4d.add(ui.Button({label: 'HOME', onClick: home, style: ButtonStyleHome} ) ) ;
    panel4d.add(ui.Button({label: 'BACK', onClick: ps4, style: ButtonStyleBack} ) ) ;
    panel4d.add(ui.Label('Demographic features', LabelStyle ) ) ;
    panel4d.add(ui.Label('Choose indicator.') ) ;
// Access to health care
    var health_label = ui.Label({value: 'Global map with travel time to health care (with and without motorized transport), year: 2019, from the Malaria Atlas Project. Link:', style:{shown:false} } ) ;
    var health_link = ui.Label('Malaria Atlas Project', {color:'blue', shown:false}, 'https://malariaatlas.org/explorer/#/') ;
    panel4d.add(ui.Checkbox({label: 'Access to health care', value: false, 
      onChange: function(checked){health_label.style().set({shown:checked}) ;
      health_link.style().set({shown:checked})}, style: CheckBoxStyle }) ) ;
    panel4d.add(health_label) ;
    panel4d.add(health_link) ;
// Population size
    var vis_pop = {min:0, max:46, palette: ['blue', 'green', 'orange', 'yellow', 'red'] } ;
    var pop_size = population.filterMetadata('year', 'equals', 2020) ;
    var pop_size_layer = ui.Map.Layer(pop_size, vis_pop ,'Population size per grid cell (2020)', false) ;
    Map.layers().add(pop_size_layer) ;
    var pop_size_label = makeColorBar('Population size per grid cell', vis_pop) ;
    legend.add(pop_size_label) ;
    var pop_size_info = ui.Label('Population size (2020) per grid cell of 100m by 100m, data from WorldPop. Source:', {shown:false} ) ;
    var pop_size_link = ui.Label('WorldPop', {color:'blue', shown:false}, 'https://www.worldpop.org/') ;
    panel4d.add(ui.Checkbox({label: 'Population size', value: false, 
      onChange: function(checked){pop_size_layer.setShown(checked) ;
      pop_size_label.style().set({shown:checked}) ; pop_size_info.style().set({shown:checked}) ;
        pop_size_link.style().set({shown:checked}) }, style: CheckBoxStyle } ) ) ;
    panel4d.add(pop_size_info) ;
    panel4d.add(pop_size_link) ;
// Poverty index
    var pov_label = ui.Label({value: 'Global map displaying the percentage of people living in extreme poverty, per country, source: World Data Lab. Link:', style:{shown:false} } ) ;
    var pov_link = ui.Label('World Data Lab', {color:'blue', shown:false}, 'https://worldpoverty.io/map') ;
    panel4d.add(ui.Checkbox({label: 'Poverty', value: false, 
      onChange: function(checked){pov_label.style().set({shown:checked}) ;
      pov_link.style().set({shown:checked})}, style: CheckBoxStyle }) ) ;
    panel4d.add(pov_label) ;
    panel4d.add(pov_link) ;
    ui.root.remove(ui.root.widgets().get(1) ) ;
    ui.root.add(panel4d) ;
  } ;
////////////////////////
//// Public services
////////////////////////
var pub_serv = function() {
    var panel4f = ui.Panel({
      layout: ui.Panel.Layout.flow('vertical') ,
      style: {width: '300px'}
    }) ;
    panel4f.add(ui.Button({label: 'HOME', onClick: home, style: ButtonStyleHome} ) ) ;
    panel4f.add(ui.Button({label: 'BACK', onClick: ps4, style: ButtonStyleBack} ) ) ;
    panel4f.add(ui.Label('Public services', LabelStyle ) ) ;
    panel4f.add(ui.Label('Choose indicator.') ) ;
// health services / hospitals  
    var health_label = ui.Label({value: 'Global map of health facilities by Healthsites.io, link:', style:{shown:false}} ) ;
    var health_link = ui.Label('Healthsites.io', {color:'blue', shown:false}, 'https://healthsites.io/map') ;
    panel4f.add(ui.Checkbox({label: 'Health facilities', value: false, 
      onChange: function(checked){health_label.style().set({shown:checked} ) ;
      health_link.style().set({shown:checked})}, style: CheckBoxStyle }) ) ;
    panel4f.add(health_label) ;
    panel4f.add(health_link) ;
// traffic/roads      
    var infra_label = ui.Label({value: 'World Bank Map contains global infrastructure data (such as ports, railways and roads). Also contains data on energy facilities. Link:', style: {shown:false}} ) ;
    var infra_link = ui.Label('World Bank Map', {color:'blue', shown:false}, 'https://maps.worldbank.org/toolkit') ;
    panel4f.add(ui.Checkbox({label: 'Infrastructure', value: false, 
      onChange: function(checked){infra_label.style().set({shown:checked}) ;
      infra_link.style().set({shown:checked})}, style: CheckBoxStyle }) ) ;
    panel4f.add(infra_label) ;
    panel4f.add(infra_link) ;
// power plants
    var pow_plant_layer = ui.Map.Layer(power_plants,{color:'red'}, 'Power Plants', false) ;
    Map.layers().add(pow_plant_layer) ;
    var pow_plant_label = makeRow('red', 'Power Plants') ;
    legend.add(pow_plant_label) ;
    var pow_plant_info = ui.Label('Global distribution of Power Plants (2021) according to the World Resources Institute. Click on the power plant for its name, primary fuel type and capacity. Link:', {shown:false} ) ;
    var pow_plant_link = ui.Label('World Resources Institute', {color:'blue', shown:false} , 'https://datasets.wri.org/dataset/globalpowerplantdatabase') ;
    var insp_pow = ui.Panel({widgets: [ui.Label(''),ui.Label(''),ui.Label(''), ui.Label('')], 
        style: {shown:false, position:'top-center'} } ) ;
    panel4f.add(ui.Checkbox({label: 'Power Plants', value: false, 
      onChange: function(checked){pow_plant_layer.setShown(checked) ;
      pow_plant_label.style().set({shown:checked}) ; pow_plant_info.style().set({shown:checked}) ;
        pow_plant_link.style().set({shown:checked}) ;
    // reset inspector
    insp_pow.widgets().set(0,ui.Label('Click on a location to get more information') ) ;
    insp_pow.widgets().set(1, ui.Label(''));
    insp_pow.widgets().set(2,ui.Label('')) ;
    insp_pow.widgets().set(3,ui.Label('')) ;
    var cursor = ['hand', 'crosshair'] ;
    Map.style().set('cursor', cursor[checked|0] ) ;  
    insp_pow.style().set({shown:checked}) ;
    Map.onClick(function(coords) {
      var point = ee.Geometry.Point(coords.lon, coords.lat);
      var pow_filter = power_plants.filter( ee.Filter.withinDistance( 
  { distance: 1e3,
  leftField: '.geo',
  rightValue: point } ) ) ;
      var pow_name = pow_filter.aggregate_array('name') ;
      var pow_fuel = pow_filter.aggregate_array('primary_fuel') ;
      var pow_cap = pow_filter.aggregate_array('capacity_mw') ;
      insp_pow.widgets().set(0,ui.Label({value:'Power Plant information', style:{fontWeight: 'bold'}})) ;
      insp_pow.widgets().set(1,ui.Label({value:'Loading...', style:{color:'grey'}})) ;
      insp_pow.widgets().set(2,ui.Label({value:'Loading...', style:{color:'grey'}})) ;
      insp_pow.widgets().set(3,ui.Label({value:'Loading...', style:{color:'grey'}})) ;
     pow_name.evaluate(function(result) {
        insp_pow.widgets().set(1, ui.Label( 'Name: ' + result )) ;
      });
     pow_fuel.evaluate(function(result) {
       insp_pow.widgets().set(2,ui.Label('Primary fuel type: ' + result)) ;
      }) ;
    pow_cap.evaluate(function(result) {
       insp_pow.widgets().set(3,ui.Label('Capacity (MegaWatt): ' + result )) ;
      }) ;
    });
      }, style: CheckBoxStyle }) ) ; 
    Map.add(insp_pow) ;
    panel4f.add(pow_plant_info) ;
    panel4f.add(pow_plant_link) ;
    ui.root.remove(ui.root.widgets().get(1) ) ;
    ui.root.add(panel4f) ;
  } ;
var ps4 = function() {
    var panel4 = ui.Panel({
      layout: ui.Panel.Layout.flow('vertical') ,
      style: {width: '300px'}
    }) ;
    panel4.add(ui.Button({label: 'HOME', onClick: home, style: ButtonStyleHome} ) ) ;
    panel4.add(ui.Button({label: 'BACK', onClick: home, style: ButtonStyleBack} ) ) ;
    panel4.add(ui.Label('PS4: Community', LabelStyle ) ) ;
    panel4.add(ui.Label('Choose risk category.') ) ;
    panel4.add(ui.Button({label: 'Corruption', onClick: pol_sit, style: ButtonStyle } ) ) ;
    panel4.add(ui.Button({label: 'Demographic features', onClick: demo, style: ButtonStyle } ) ) ;
    panel4.add(ui.Button({label: 'Opposition', onClick: oppo, style: ButtonStyle } ) ) ;
    panel4.add(ui.Button({label: 'Public services', onClick: pub_serv, style: ButtonStyle } ) ) ;
    panel4.add(ui.Button({label: 'Vessel traffic', onClick: fisheries, style: ButtonStyle } )) ;
    ui.root.remove(ui.root.widgets().get(1)) ;
    ui.root.add(panel4) ;
  } ;
panel.add(ui.Button({label: 'PS4: Community', onClick: ps4, style: ButtonStyle} ) ) ;
/////////////////////////////////////////////////////////////////////////////////////////
//// Performance Standard 5: Land Resettlement
/////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////
// People working
//////////////////////////
var work = function() {
    var panel5b = ui.Panel({
      layout: ui.Panel.Layout.flow('vertical') ,
      style: {width: '300px'}
    }) ;
    panel5b.add(ui.Button({label: 'HOME', onClick: home, style: ButtonStyleHome} ) ) ;
    panel5b.add(ui.Button({label: 'BACK', onClick: ps5, style: ButtonStyleBack} ) ) ;
    panel5b.add(ui.Label('People working in the area', LabelStyle ) ) ;
    panel5b.add(ui.Label('Choose indicator.') ) ;
// Croplands
    var crops = land_cover.select('crops-coverfraction').filterDate('2019-01-01', '2019-12-31') ;
    var vis_crops = {min:0, max:100, palette:['white', 'red', 'purple'] } ;
    var crops_layer = ui.Map.Layer(crops.mean(), vis_crops, 'Cropland cover fraction (2019)', false) ;
    Map.layers().add(crops_layer) ;
    var crops_label = makeColorBar('Cropland cover fraction [%]', vis_crops) ;
    legend.add(crops_label) ;
    var crops_info = ui.Label('Percentage of land used as croplands (2019), according to Copernicus Global Land Cover dataset. Link: ', {shown:false} ) ;
    var crops_link = ui.Label('Land Cover Viewer', {color:'blue', shown:false}, 'https://lcviewer.vito.be/2019') ;
    panel5b.add(ui.Checkbox({label: 'Croplands', value: false,
      onChange: function(checked){crops_layer.setShown(checked) ;
      crops_label.style().set({shown:checked}) ; crops_info.style().set({shown:checked}) ;
        crops_link.style().set({shown:checked} ) }, style: CheckBoxStyle})) ;
    panel5b.add(crops_info) ;
    panel5b.add(crops_link) ;
// Fishing activity
    var img = fishing_activity.filterMetadata("country","equals","WLD")
    .filterDate('2016-01-01','2016-12-31').sum();
    var fishing = img.expression(
  '(trawlers+drifting_longlines+purse_seines+squid_jigger+other_fishing+fixed_gear)',
  {trawlers: img.select("trawlers"),
  drifting_longlines: img.select("drifting_longlines"),
  purse_seines: img.select('purse_seines'),
  squid_jigger: img.select('squid_jigger'),
  other_fishing: img.select('other_fishing'),
  fixed_gear: img.select('fixed_gear')
  });
    var placeholder = ui.Map.Layer(ee.Image(),{},'Placeholder',false) ;
    Map.layers().add(placeholder) ; // placeholder layer
    // find Placeholder layer
    var num_layers = Map.layers().length() ;
    var layer_names = [] ;
    for (var j = 0; j<num_layers; j++){
      layer_names[j] = Map.layers().get(j).getName() ;
      }
    var layer_index = layer_names.indexOf('Placeholder') ;
    var vis_fish = {min: 0, max:220, palette:['blue', 'green', 'yellow'] } ;
    var options = {'TOTAL': ''  ,  'trawlers': 'trawlers', 'drifting longlines': 'drifting_longlines', 
    'purse seines': 'purse_seines', 'squid jigger' : 'squid_jigger', 'fixed gear':'fixed_gear',
    'other': 'other_fishing'} ;
    var select_span = ui.Select({
      items: Object.keys(options),
      style: {shown:false},
      onChange: function(key) {
        var fish_type ;
        if (options[key] === ''){
          fish_type = fishing.selfMask() ;
        }
        else{
          fish_type = img.select(options[key]).selfMask() ;
        }
        Map.layers().get(layer_index).setEeObject(fish_type) ;
        Map.layers().get(layer_index).setVisParams(vis_fish) ;
       }
    });
    select_span.setPlaceholder('Choose a fishing gear type...') ;
    var fishing_label = makeColorBar('Total fishing activity [hours per square km]',vis_fish) ;
    legend.add(fishing_label) ;
    var fishing_info = ui.Label('Total commercial fishing activity, measured in hours per square km, 2016. Original source:', {shown:false}) ;
    var fishing_link = ui.Label('Global Fishing Watch', {color: 'blue', shown:false}, 'https://globalfishingwatch.org/map/fishing-activity?latitude=10&longitude=-90&zoom=1' ) ;
    var spots_info = ui.Label('Map of global fishing spots, according to Fishing Status:', {shown:false}) ;
    var spots_link = ui.Label('Global Fishing Map', {color:'blue', shown:false}, 'https://maps.fishingstatus.com/fishing-status/maps/95914/world-fishing-map#') ;
    panel5b.add(ui.Checkbox({label: 'Fishing activity', value: false, 
      onChange: function(checked){Map.layers().get(layer_index).setShown(checked) ;
        fishing_label.style().set({shown:checked}) ; fishing_info.style().set({shown:checked}) ;
        fishing_link.style().set({shown:checked}) ; select_span.style().set({shown:checked}) ;
        spots_info.style().set({shown:checked}) ; spots_link.style().set({shown:checked}) }, style: CheckBoxStyle }) ) ;
    panel5b.add(select_span) ;
    panel5b.add(fishing_info) ;
    panel5b.add(fishing_link) ;
    panel5b.add(spots_info) ;
    panel5b.add(spots_link) ;
// Type of crop
    var crop_label = ui.Label({value:'Type of cropland according to Global Croplands. Link:', style:{shown:false}}) ;
    var crop_link = ui.Label('Global Croplands', {color:'blue', shown:false}, 'https://croplands.org/app/map?lat=15.15697&lng=121.08966062776746&zoom=10') ;
    panel5b.add(ui.Checkbox({label: 'Type of crop', value: false, 
      onChange: function(checked){crop_label.style().set({shown:checked}) ;
      crop_link.style().set({shown:checked})}, style: CheckBoxStyle }) ) ;
    panel5b.add(crop_label) ;
    panel5b.add(crop_link) ;
    ui.root.remove(ui.root.widgets().get(1) ) ;
    ui.root.add(panel5b) ;
  } ;
/////////////////////////////////
// People living
////////////////////////////////
var liv = function() {
    var panel5a = ui.Panel({
      layout: ui.Panel.Layout.flow('vertical') ,
      style: {width: '300px'}
    }) ;
    panel5a.add(ui.Button({label: 'HOME', onClick: home, style: ButtonStyleHome} ) ) ;
    panel5a.add(ui.Button({label: 'BACK', onClick: ps5, style: ButtonStyleBack} ) ) ;
    panel5a.add(ui.Label('People living in the area', LabelStyle ) ) ;
    panel5a.add(ui.Label('Choose indicator.') ) ;
// Human settlements (human_set)
    var hum_set = human_set.select('built');
    var hum_set_palette =  ['0c1d60', '000000', '448564', '70daa4', '83ffbf', 'f0fff0'] ;
    var vis_hum_set = {min:1.0, max:6.0, palette: hum_set_palette } ;
    var hum_set_layer = ui.Map.Layer(hum_set, vis_hum_set, 'Human settlements (1975-2015)', false) ;
    Map.layers().add(hum_set_layer) ;
    var hum_set_names = ['Water surface', 'No built-up', 'Built-up from 2000-2015', 'Built-up from 1990-2000', 'Built-up from 1975-1990', 'Built-up before 1975'] ;
    var hum_set_label = [] ;
    for(var i=0;i<6;i++){
      hum_set_label[i] = makeRow(hum_set_palette[i], hum_set_names[i]) ;
      legend.add(hum_set_label[i]) ;
    }
    var hum_set_info = ui.Label('Presence of human settlements, built up in between 1975, 1990, 2000 and 2015. Data from the Joint Research Centre of the European Commission. Link:', {shown:false}) ;
    var hum_set_link = ui.Label('Global Human Settlement Layer', {color:'blue', shown:false}, 'https://ghsl.jrc.ec.europa.eu/index.php') ;
    panel5a.add(ui.Checkbox({label: 'Human settlements', value: false,
      onChange: function(checked){hum_set_layer.setShown(checked) ;
      hum_set_info.style().set({shown:checked}) ; hum_set_link.style().set({shown:checked} ) ;
        for(var i=0;i<6;i++){
          hum_set_label[i].style().set({shown:checked}) ;
        }
      }, style: CheckBoxStyle})) ;
    panel5a.add(hum_set_info) ;
    panel5a.add(hum_set_link) ;
// Population trends
    var placeholder = ui.Map.Layer(ee.Image(),{},'Placeholder',false) ;
    Map.layers().add(placeholder) ; // placeholder layer
    // find Placeholder layer
    var num_layers = Map.layers().length() ;
    var layer_names = [] ;
    for (var j = 0; j<num_layers; j++){
      layer_names[j] = Map.layers().get(j).getName() ;
      }
    var layer_index = layer_names.indexOf('Placeholder') ;
    var vis_pop = {min:-1, max:1, palette: ['red', 'f0ff0f', 'green']};
    var pop_2020 =  population.filterMetadata( "year", "equals", 2020).sum() ;
    var years = {'1 year': 1, '2 years': 2, '3 years': 3, '4 years': 4, '5 years': 5, '10 years': 10,
  '15 years': 15, '20 years': 20 };
    var select_span = ui.Select({
      items: Object.keys(years),
      style: {shown:false},
      onChange: function(key) {
        var year = 2020 - years[key] ;
        var pop_year =  population.filterMetadata( "year", "equals", year).sum() ;
        var pop_diff = ee.Image(pop_2020).subtract(pop_year).round() ;
        Map.layers().get(layer_index).setEeObject(pop_diff) ;
        Map.layers().get(layer_index).setVisParams(vis_pop) ;
       }
    });
    select_span.setPlaceholder('Choose a timespan...') ;
    var pop_diff_label = [] ;
    var pop_diff_names = ['Population decrease', 'No change', 'Population increase'] ;
    for(var k = 0; k<3; k++){
      pop_diff_label[k] = makeRow(vis_pop.palette[k], pop_diff_names[k]) ;
      legend.add(pop_diff_label[k]) ;
    }
    var pop_diff_info = ui.Label('Population change compared to 2020, per grid cell of size 100m x 100m, using WorldPop data. Link:', {shown:false}) ;
    var pop_diff_link = ui.Label('WorldPop', {color:'blue', shown:false}, 'https://www.worldpop.org/') ;
    panel5a.add(ui.Checkbox({label: 'Population trends', value: false, 
      onChange: function(checked){select_span.style().set({shown:checked} ) ; 
      Map.layers().get(layer_index).setShown(checked) ; pop_diff_info.style().set({shown:checked} ) ; 
      pop_diff_link.style().set({shown:checked}) ;
      for(var k=0;k<3;k++){
        pop_diff_label[k].style().set({shown:checked}) ;
      }     }, style: CheckBoxStyle }) ) ;
    panel5a.add(select_span) ;
    panel5a.add(pop_diff_info) ;
    panel5a.add(pop_diff_link) ;
// Urban lands
    var urbs = land_cover.select('urban-coverfraction').filterDate('2019-01-01', '2019-12-31') ;
    var vis_urbs = {min:0, max:100, palette:['white', 'brown', 'black'] } ;
    var urbs_layer = ui.Map.Layer(urbs.mean(), vis_urbs, 'Urban land cover fraction (2019)', false) ;
    Map.layers().add(urbs_layer) ;
    var urbs_label = makeColorBar('Urban land cover fraction [%]', vis_urbs) ;
    legend.add(urbs_label) ;
    var urbs_info = ui.Label('Percentage of land used as urban lands (2019), according to Copernicus Global Land Cover dataset. Link: ', {shown:false} ) ;
    var urbs_link = ui.Label('Land Cover Viewer', {color:'blue', shown:false}, 'https://lcviewer.vito.be/2019') ;
    panel5a.add(ui.Checkbox({label: 'Urban lands', value: false,
      onChange: function(checked){urbs_layer.setShown(checked) ;
      urbs_label.style().set({shown:checked}) ; urbs_info.style().set({shown:checked}) ;
        urbs_link.style().set({shown:checked} ) }, style: CheckBoxStyle})) ;
    panel5a.add(urbs_info) ;
    panel5a.add(urbs_link) ;
    ui.root.remove(ui.root.widgets().get(1) ) ;
    ui.root.add(panel5a) ;
  } ;
var ps5 = function() {
    var panel5 = ui.Panel({
      layout: ui.Panel.Layout.flow('vertical') ,
      style: {width: '300px'}
    }) ;
    panel5.add(ui.Button({label: 'HOME', onClick: home, style: ButtonStyleHome} ) ) ;
    panel5.add(ui.Button({label: 'BACK', onClick: home, style: ButtonStyleBack} ) ) ;
    panel5.add(ui.Label('PS5: Land Resettlement', LabelStyle ) ) ;
    panel5.add(ui.Label('Choose risk category.') ) ;
    panel5.add(ui.Button({label: 'People living in the area', onClick: liv, style: ButtonStyle } )) ;
    panel5.add(ui.Button({label: 'People working in the area', onClick: work, style: ButtonStyle } ) ) ;
    ui.root.remove(ui.root.widgets().get(1)) ;
    ui.root.add(panel5) ;
  } ;
panel.add(ui.Button({label: 'PS5: Land Resettlement', onClick: ps5, style: ButtonStyle} ) ) ;
///////////////////////////////////////////////////////////////////////////////////////////////////////////
//// Performance Standard 6: Biodiversity
///////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////
// In/near protected areas
////////////////////////////
var pro_are = function() {
    var panel6b = ui.Panel({
      layout: ui.Panel.Layout.flow('vertical') ,
      style: {width: '300px'}
    }) ;
    panel6b.add(ui.Button({label: 'HOME', onClick: home, style: ButtonStyleHome} ) ) ;
    panel6b.add(ui.Button({label: 'BACK', onClick: ps6, style: ButtonStyleBack} ) ) ;
    panel6b.add(ui.Label('In/near protected areas', LabelStyle ) ) ;
    panel6b.add(ui.Label('Choose indicator.') ) ;
// All protected areas
    var prot_ar_layer = ui.Map.Layer(ProtectedAreas, {color: 'blue'}, 'All protected areas', false);
    Map.layers().add(prot_ar_layer) ;
    var prot_ar_label = makeRow('blue', 'All protected areas') ;
    legend.add(prot_ar_label) ;
    var prot_ar_info = ui.Label('Locations of all global protected areas from the UN World Database on Protected Areas (WDPA). Note: WDPA may be underrepresenting reaity as countries have to self-report their data. Source link:', {shown: false} ) ;
    var prot_ar_link = ui.Label('Protected Planet', {color: 'blue', shown:false}, 'https://www.protectedplanet.net/en') ;
    var ibat_info = ui.Label('See also IBAT for more protected areas and key biodiversity areas:', {shown:false}) ;
    var ibat_link = ui.Label('IBAT', {color:'blue', shown:false}, 'https://www.ibat-alliance.org/') ;
    var insp_prot_ar = ui.Panel({widgets: [ui.Label(''),ui.Label(''), ui.Label('')], 
        style: {shown:false, position:'top-center'} } ) ;
    panel6b.add(ui.Checkbox({label: 'All protected areas', value: false, 
    onChange: function(checked){prot_ar_layer.setShown(checked) ;
    prot_ar_label.style().set({shown:checked}) ; prot_ar_info.style().set({shown:checked}) ;
      prot_ar_link.style().set({shown:checked}) ; ibat_info.style().set({shown:checked}) ;
      ibat_link.style().set({shown:checked}) ;
// reset inspector
    insp_prot_ar.widgets().set(0,ui.Label('Click on an area to get more information') ) ;
    insp_prot_ar.widgets().set(1,ui.Label('')) ;
    insp_prot_ar.widgets().set(2,ui.Label('')) ;
    var cursor = ['hand', 'crosshair'] ;
    Map.style().set('cursor', cursor[checked|0] ) ;
    insp_prot_ar.style().set({shown:checked}) ;
    Map.onClick(function(coords) {
      var point = ee.Geometry.Point(coords.lon, coords.lat);
      var prot_ar_filter = ProtectedAreas.filterBounds(point) ;
      var prot_name = prot_ar_filter.aggregate_array('NAME') ;
      var prot_cat = prot_ar_filter.aggregate_array('IUCN_CAT') ;
      insp_prot_ar.widgets().set(0,ui.Label({value:'Protected Area information', style:{fontWeight: 'bold'}})) ;
      insp_prot_ar.widgets().set(1,ui.Label({value:'Loading...', style:{color:'grey'}})) ;
      insp_prot_ar.widgets().set(2,ui.Label({value:'Loading...', style:{color:'grey'}})) ;
     prot_name.evaluate(function(result) {
        insp_prot_ar.widgets().set(1, ui.Label( 'Name: ' + result )) ;
      });
     prot_cat.evaluate(function(result) {
       insp_prot_ar.widgets().set(2,ui.Label('IUCN category: ' + result)) ;
      }) ;
    });      
    }, style: CheckBoxStyle }) ) ; 
    panel6b.add(prot_ar_info) ;
    panel6b.add(prot_ar_link) ;
    Map.add(insp_prot_ar) ;
    panel6b.add(ibat_info) ;
    panel6b.add(ibat_link) ;
// Biosphere Reserves
    var biosphere = ProtectedAreas.filter(ee.Filter.stringContains('DESIG_ENG', 'Biosphere') ) ;
    var biosphere_layer = ui.Map.Layer(biosphere, {color: 'green' }, 'Biosphere Reserve', false) ;
    Map.layers().add(biosphere_layer) ;
    var biosphere_label = makeRow('green', 'Biosphere Reserves') ;
    legend.add(biosphere_label) ;
    var biosphere_info = ui.Label('Locations of protected areas with designation UNESCO Biosphere Reserve according to WDPA. Original source:', {shown:false }) ;
    var biosphere_link = ui.Label('Biosphere Reserves', {color:'blue', shown:false}, 'https://en.unesco.org/biosphere') ;
    var insp_bio = ui.Panel({widgets: [ui.Label(''),ui.Label('')], 
        style: {shown:false, position:'top-center'} } ) ;
    panel6b.add(ui.Checkbox({label: 'Biosphere Reserves', value: false, 
    onChange: function(checked){biosphere_layer.setShown(checked) ;
      biosphere_label.style().set({shown:checked}) ; biosphere_info.style().set({shown:checked}) ;
      biosphere_link.style().set({shown:checked}) ;
// reset inspector
    insp_bio.widgets().set(0,ui.Label('Click on an area to get more information') ) ;
    insp_bio.widgets().set(1,ui.Label('')) ;
    var cursor = ['hand', 'crosshair'] ;
    Map.style().set('cursor', cursor[checked|0] ) ;      
    insp_bio.style().set({shown:checked}) ;
    Map.onClick(function(coords) {
      var point = ee.Geometry.Point(coords.lon, coords.lat);
      var bio_filter = biosphere.filterBounds(point) ;
      var bio_name = bio_filter.aggregate_array('NAME') ;
      insp_bio.widgets().set(0,ui.Label({value:'Biosphere Reserve information', style:{fontWeight: 'bold'}})) ;
      insp_bio.widgets().set(1,ui.Label({value:'Loading...', style:{color:'grey'}})) ;
     bio_name.evaluate(function(result) {
        insp_bio.widgets().set(1, ui.Label( 'Name: ' + result )) ;
      });
    });      
    },style: CheckBoxStyle }) ) ;
    panel6b.add(biosphere_info) ;
    panel6b.add(biosphere_link) ;
    Map.add(insp_bio) ;
// Ecologically significant areas
    var ebsa_info = ui.Label('Ecologically or Biologically Significant Marine Areas, according to the Convention on Biological Diversity (CBD). Link:', {shown:false }) ;
    var ebsa_link = ui.Label('EBSA Map', {color:'blue', shown:false}, 'https://www.cbd.int/ebsa/') ;
    panel6b.add(ui.Checkbox({label: 'Ecologically or Biologically Significant Areas', value: false, 
    onChange: function(checked){ebsa_info.style().set({shown:checked}) ;
      ebsa_link.style().set({shown:checked})},style: CheckBoxStyle }) ) ;
    panel6b.add(ebsa_info) ;
    panel6b.add(ebsa_link) ; 
// Fishing protected areas
    var fish_prot_info = ui.Label('Fishing protected areas according to the Marine Protection Atlas. Also includes the fishing protection level for each area. Link:', {shown:false }) ;
    var fish_prot_link = ui.Label('Marine Protection Atlas', {color:'blue', shown:false}, 'https://mpatlas.org/zones/') ;
    panel6b.add(ui.Checkbox({label: 'Fishing protected areas', value: false, 
    onChange: function(checked){fish_prot_info.style().set({shown:checked}) ;
      fish_prot_link.style().set({shown:checked})},style: CheckBoxStyle }) ) ;
    panel6b.add(fish_prot_info) ;
    panel6b.add(fish_prot_link) ;    
// Green listed protected areas
    var green_info = ui.Label('Protected areas that are part of the IUCN Green List. Link:', {shown:false }) ;
    var green_link = ui.Label('IUCN Green List', {color:'blue', shown:false}, 'https://iucngreenlist.org/explore/') ;
    panel6b.add(ui.Checkbox({label: 'Green listed protected areas', value: false, 
    onChange: function(checked){green_info.style().set({shown:checked}) ;
      green_link.style().set({shown:checked})},style: CheckBoxStyle }) ) ;
    panel6b.add(green_info) ;
    panel6b.add(green_link) ;
// Marine Protected Areas   
    var marine_protec = ProtectedAreas.filter(ee.Filter.or(ee.Filter.eq('MARINE', '1'), ee.Filter.eq('MARINE', '2') ) ) ; 
    var marine_protec_layer = ui.Map.Layer(marine_protec,{color: 'navy'}, 'Marine Protected Area', false) ;
    Map.layers().add(marine_protec_layer) ;
    var marine_protec_label = makeRow('navy', 'Marine Protected Areas') ;
    legend.add(marine_protec_label) ;
    var marine_info = ui.Label('Locations of marine protected areas according to the WDPA. Includes both coastal and marine protected areas. Source:', {shown:false}) ;
    var marine_link = ui.Label('Protected Planet', {color:'blue', shown:false}, 'https://www.protectedplanet.net/en') ;
    var insp_marine = ui.Panel({widgets: [ui.Label(''), ui.Label(''), ui.Label('')], 
        style: {shown:false, position:'top-center'} } ) ;
    panel6b.add(ui.Checkbox({label: 'Marine Protected Areas', value: false, 
    onChange: 
    function(checked){marine_protec_layer.setShown(checked) ;
    marine_protec_label.style().set({shown:checked}) ; marine_info.style().set({shown:checked}) ;
      marine_link.style().set({shown:checked}) ;
    // reset inspector
    insp_marine.widgets().set(0,ui.Label('Click on an area to get more information') ) ;
    insp_marine.widgets().set(1,ui.Label('')) ;
    insp_marine.widgets().set(2,ui.Label('')) ;
    var cursor = ['hand', 'crosshair'] ;
    Map.style().set('cursor', cursor[checked|0] ) ;
    insp_marine.style().set({shown:checked}) ;
    Map.onClick(function(coords) {
      var point = ee.Geometry.Point(coords.lon, coords.lat);
      var marine_filter = marine_protec.filterBounds(point) ;
      var park_name = marine_filter.aggregate_array('NAME') ;
      var park_cat = marine_filter.aggregate_array('IUCN_CAT') ;
      insp_marine.widgets().set(0,ui.Label({value:'Marine Protected Area information', style:{fontWeight: 'bold'}})) ;
      insp_marine.widgets().set(1,ui.Label({value:'Loading...', style:{color:'grey'}})) ;
      insp_marine.widgets().set(2,ui.Label({value:'Loading...', style:{color:'grey'}})) ;
     park_name.evaluate(function(result) {
        insp_marine.widgets().set(1, ui.Label( 'Name: ' + result )) ;
      });
     park_cat.evaluate(function(result) {
       insp_marine.widgets().set(2,ui.Label('IUCN category: ' + result)) ;
      }) ;
    });
    },style: CheckBoxStyle }) ) ;
    Map.add(insp_marine) ;
    panel6b.add(marine_info) ;
    panel6b.add(marine_link) ;
// National Parks
    var nat_par = ProtectedAreas.filter(ee.Filter.stringContains('DESIG_ENG', 'National Park') ) ;
    var nat_par_layer = ui.Map.Layer(nat_par, {color:'red'}, 'National Parks',false) ;
    Map.layers().add(nat_par_layer) ;
    var nat_par_label = makeRow('red','National Parks') ;
    legend.add(nat_par_label) ;
    var nat_par_info = ui.Label('Locations of protected areas with designation National Park according to the WDPA. Source:', {shown:false}) ;
    var nat_par_link = ui.Label('Protected Planet', {color:'blue',shown:false}, 'https://www.protectedplanet.net/en') ;
    var insp_nat_par = ui.Panel({widgets: [ui.Label(''),ui.Label(''), ui.Label('')], 
        style: {shown:false, position:'top-center'} } ) ;
    panel6b.add(ui.Checkbox({label: 'National Parks', value: false, 
    onChange: 
    function(checked){nat_par_layer.setShown(checked) ;
    nat_par_label.style().set({shown: checked} ) ; nat_par_info.style().set({shown:checked}) ;
    nat_par_link.style().set({shown:checked}) ;
    // reset inspector
    insp_nat_par.widgets().set(0,ui.Label('Click on an area to get more information') ) ;
    insp_nat_par.widgets().set(1,ui.Label('')) ;
    insp_nat_par.widgets().set(2,ui.Label('')) ;
    var cursor = ['hand', 'crosshair'] ;
    Map.style().set('cursor', cursor[checked|0] ) ;
    insp_nat_par.style().set({shown:checked}) ;
    Map.onClick(function(coords) {
      var point = ee.Geometry.Point(coords.lon, coords.lat);
      var nat_par_filter = nat_par.filterBounds(point) ;
      var park_name = nat_par_filter.aggregate_array('NAME') ;
      var park_cat = nat_par_filter.aggregate_array('IUCN_CAT') ;
      insp_nat_par.widgets().set(0,ui.Label({value:'National park information', style:{fontWeight: 'bold'}})) ;
      insp_nat_par.widgets().set(1,ui.Label({value:'Loading...', style:{color:'grey'}})) ;
      insp_nat_par.widgets().set(2,ui.Label({value:'Loading...', style:{color:'grey'}})) ;
     park_name.evaluate(function(result) {
        insp_nat_par.widgets().set(1, ui.Label( 'Name: ' + result )) ;
      });
     park_cat.evaluate(function(result) {
       insp_nat_par.widgets().set(2,ui.Label('IUCN category: ' + result)) ;
      }) ;
    });
    }, style: CheckBoxStyle }) ) ;
    Map.add(insp_nat_par) ;
    panel6b.add(nat_par_info) ;
    panel6b.add(nat_par_link) ;
// Ramsar sites
    var ramsar = ProtectedAreas.filter(ee.Filter.stringContains('DESIG_ENG', 'Wetland') )  ;
    var ramsar_layer = ui.Map.Layer(ramsar, {color: 'orange'}, 'Ramsar Sites', false) ;
    Map.layers().add(ramsar_layer) ;
    var ramsar_label = makeRow('orange', 'Ramsar sites') ;
    legend.add(ramsar_label) ;
    var insp_ramsar = ui.Panel({widgets: [ui.Label(''),ui.Label(''), ui.Label('')], 
        style: {shown:false, position:'top-center'} } ) ;
    var ramsar_info = ui.Label('Locations of protected areas designated as Ramsar wetlands according to the WDPA. Original source:', {shown:false}) ;
    var ramsar_link = ui.Label('Ramsar Sites Information Service', {color:'blue', shown:false}, 'https://rsis.ramsar.org/') ;
    panel6b.add(ui.Checkbox({label: 'Protected wetlands', value: false, 
    onChange: function(checked){ramsar_layer.setShown(checked) ;
    ramsar_label.style().set({shown:checked} ) ; ramsar_info.style().set({shown:checked}) ;
    ramsar_link.style().set({shown:checked} ) ;
    // reset inspector
    insp_ramsar.widgets().set(0,ui.Label('Click on an area to get more information') ) ;
    insp_ramsar.widgets().set(1,ui.Label('') ) ;
    insp_ramsar.widgets().set(2,ui.Label('')) ;
    var cursor = ['hand', 'crosshair'] ;
    Map.style().set('cursor', cursor[checked|0] ) ;
    insp_ramsar.style().set({shown:checked}) ;
    Map.onClick(function(coords) {
      var point = ee.Geometry.Point(coords.lon, coords.lat);
      var ramsar_filter = ramsar.filterBounds(point) ;
      var ramsar_name = ramsar_filter.aggregate_array('NAME') ;
      var ramsar_cat = ramsar_filter.aggregate_array('INT_CRIT') ;
      insp_ramsar.widgets().set(0,ui.Label({value:'Ramsar site information', style:{fontWeight: 'bold'}})) ;
      insp_ramsar.widgets().set(1,ui.Label({value:'Loading...', style:{color:'grey'}})) ;
      insp_ramsar.widgets().set(2,ui.Label({value:'Loading...', style:{color:'grey'}})) ;
     ramsar_name.evaluate(function(result) {
        insp_ramsar.widgets().set(1, ui.Label( 'Name: ' + result )) ;
      });
     ramsar_cat.evaluate(function(result) {
       insp_ramsar.widgets().set(2,ui.Label('Ramsar criteria: ' + result)) ;
      }) ;
    });
    }, style: CheckBoxStyle }) ) ;
    Map.add(insp_ramsar) ;
    panel6b.add(ramsar_info) ;
    panel6b.add(ramsar_link) ;
    ui.root.remove(ui.root.widgets().get(1) ) ;
    ui.root.add(panel6b) ;
  } ;
////////////////////////////////
// Sensitive species
////////////////////////////////
var sens_spe = function() {
    var panel6c = ui.Panel({
      layout: ui.Panel.Layout.flow('vertical') ,
      style: {width: '300px'}
    }) ;
    panel6c.add(ui.Button({label: 'HOME', onClick: home, style: ButtonStyleHome} ) ) ;
    panel6c.add(ui.Button({label: 'BACK', onClick: ps6, style: ButtonStyleBack} ) ) ;
    panel6c.add(ui.Label('Sensitive species', LabelStyle ) ) ;
    panel6c.add(ui.Label('Choose indicator.') ) ;
// Benthic Habitats
    var benthic_palette = ['#000000', '#ffffbe', '#e0d05e', '#b19c3a', '#668438', '#ff6161', '#9bcc4f'] ;
    var names_legend = ['Unmapped', 'Sand', 'Rubble', 'Rock', 'Seagrass', 'Coral/Algae', 'Microalgal Mats'] ;
    var benthic_layer = ui.Map.Layer(benthic_habitat.select('benthic').selfMask(), {}, 'Benthic habitats', false) ;
    Map.layers().add(benthic_layer) ;
    var panel_list= [ ] ;
    for(var i = 0; i < 7; i++){
      panel_list[i] = makeRow(benthic_palette[i], names_legend[i]) ;
      legend.add(panel_list[i] ) ;
    }
    var benthic_info = ui.Label('Global benthic habitats at 5m resolution, according to Allen Coral Atlas. Note: fine resolution, so zoom in to better see the data. Link:', {shown:false}) ;
    var benthic_link = ui.Label('Allen Coral Atlas', {color:'blue', shown:false}, 'https://allencoralatlas.org/atlas/#6.35/14.2340/121.8732') ;
    panel6c.add(ui.Checkbox({label: 'Benthic habitat', value: false, 
      onChange: function(checked){benthic_layer.setShown(checked);
       for(var i = 0; i < 7; i++){
      panel_list[i].style().set({shown:checked}) ;  }  benthic_info.style().set({shown:checked}) ;
      benthic_link.style().set({shown:checked})}, style: CheckBoxStyle }) ) ;
    panel6c.add(benthic_info) ;
    panel6c.add(benthic_link) ;
// Birds
    var birds_label = ui.Label({value: 'Data from BirdLife International: country profiles including presence of birds and Important Bird Areas, and a seabird distribution map. Links:', style: {shown: false }}) ;
    var birds_link = ui.Label('Bird Country Profiles', {color:'blue', shown:false}, 'http://datazone.birdlife.org/country') ;
    var birds_link2 = ui.Label('Seabird Tracking Database', {color:'blue', shown:false}, 'http://seabirdtracking.org/mapper/index.php') ;
    panel6c.add(ui.Checkbox({label: 'Birds', value: false, 
    onChange: function(checked){birds_label.style().set({shown:checked}) ;
    birds_link.style().set({shown:checked}) ; birds_link2.style().set({shown:checked})}, style: CheckBoxStyle }) ) ;
    panel6c.add(birds_label) ;
    panel6c.add(birds_link) ;
    panel6c.add(birds_link2) ;
// Coral Reefs
    var coral_reef_layer = ui.Map.Layer(coral_reef, {color: 'orange'}, 'Coral Reef', false) ;
    Map.layers().add(coral_reef_layer) ;
    var coral_label = makeRow('orange', 'Coral Reefs') ;
    legend.add(coral_label) ;
    var coral_info = ui.Label('Global distribution of coral reefs (2005), according to UN Ocean Data Viewer. Note: data may be an underrepresentation of reality. Source:', {shown:false}) ;
    var coral_link = ui.Label('UN Ocean Data Viewer', {color:'blue', shown:false}, 'https://data.unep-wcmc.org/datasets/1') ;
    panel6c.add(ui.Checkbox({label: 'Coral Reefs', value: false, 
    onChange: function(checked){coral_reef_layer.setShown(checked) ;
    coral_label.style().set({shown:checked} ) ; coral_info.style().set({shown:checked}) ;
      coral_link.style().set({shown:checked}) }, style: CheckBoxStyle }) ) ;   
    panel6c.add(coral_info) ;
    panel6c.add(coral_link) ;
// Fish species
    var fish_spe_label = ui.Label({value: 'Link to fish species distribution map:', style: {shown: false }}) ;
    var fish_spe_link = ui.Label('AquaMaps', {color:'blue', shown:false}, 'https://www.aquamaps.org/') ;
    panel6c.add(ui.Checkbox({label: 'Fish species', value: false, 
    onChange: function(checked){fish_spe_label.style().set({shown:checked}) ;
    fish_spe_link.style().set({shown:checked})}, style: CheckBoxStyle }) ) ;
    panel6c.add(fish_spe_label) ;
    panel6c.add(fish_spe_link) ;
// Invasive species
    var invasive_label = ui.Label('Link to Global Invasive Species Database:', {shown:false} ) ;
    var invasive_link = ui.Label('IUCN GISD', {color:'blue', shown:false}, 'http://www.iucngisd.org/gisd/') ;
    panel6c.add(ui.Checkbox({label: 'Invasive species', value: false, 
    onChange: function(checked){invasive_label.style().set({shown:checked}) ;
    invasive_link.style().set({shown:checked})}, style: CheckBoxStyle }) ) ;
    panel6c.add(invasive_label) ;
    panel6c.add(invasive_link) ;
// Kelp
    var kelp_layer = ui.Map.Layer(kelp, {color: 'red'}, 'Kelp', false) ;
    Map.layers().add(kelp_layer) ;
    var kelp_label = makeRow('red', 'Kelp') ;
    legend.add(kelp_label) ;
    var kelp_info = ui.Label('Global distribution of the kelp biome (2020), according to UN Ocean Data Viewer. Source:', {shown:false}) ;
    var kelp_link = ui.Label('UN Ocean Data Viewer', {color:'blue', shown:false}, 'https://data.unep-wcmc.org/datasets/49') ;
    panel6c.add(ui.Checkbox({label: 'Kelp biome', value: false, 
    onChange: function(checked){kelp_layer.setShown(checked) ;
    kelp_label.style().set({shown:checked} ) ; kelp_info.style().set({shown:checked}) ;
      kelp_link.style().set({shown:checked}) }, style: CheckBoxStyle }) ) ;   
    panel6c.add(kelp_info) ;
    panel6c.add(kelp_link) ;
// Presence of marine species
    var obis_label = ui.Label({value:'Link to the Ocean Biodiversity Information System (OBIS) database containing global maps of marine species distribution data:', style: {shown:false} } ) ;
    var obis_link = ui.Label('OBIS', {color:'blue', shown:false}, 'https://seamap.env.duke.edu/explore') ;
    var gbif_label = ui.Label('Link to the Global Biodiversity Information System (GBIF) database containing global maps of both marine and terrestrial species distribution data:', {shown:false}) ;
    var gbif_link = ui.Label('GBIF', {color:'blue', shown:false}, 'https://www.gbif.org/occurrence/map') ;
    panel6c.add(ui.Checkbox({label: 'Presence of marine/terrestrial species', value: false, 
    onChange: function(checked){obis_label.style().set({shown:checked}) ;
    obis_link.style().set({shown:checked} ) ; gbif_label.style().set({shown:checked}) ;
      gbif_link.style().set({shown:checked})  }, style: CheckBoxStyle }) ) ;
    panel6c.add(obis_label) ;
    panel6c.add(obis_link) ;
    panel6c.add(gbif_label) ;
    panel6c.add(gbif_link) ;
// Reefs at Risk
    var low = reefs_at_risk.filter(ee.Filter.eq('THREAT_TXT', 'Low') ) ;
    var low_layer = ui.Map.Layer(low, {color:'green'}, 'Low risk reef', false) ;
    var medium = reefs_at_risk.filter(ee.Filter.eq('THREAT_TXT', 'Medium') ) ;
    var medium_layer = ui.Map.Layer(medium, {color:'gold'}, 'Medium risk reef', false) ;
    var high = reefs_at_risk.filter(ee.Filter.eq('THREAT_TXT', 'High') ) ;
    var high_layer = ui.Map.Layer(high, {color:'orange'}, 'High risk reef', false) ;
    var very_high = reefs_at_risk.filter(ee.Filter.eq('THREAT_TXT', 'Very High') ) ;
    var very_high_layer = ui.Map.Layer(very_high, {color:'red'}, 'Very high risk reef', false) ;
    var layers = [low_layer, medium_layer, high_layer, very_high_layer] ;
    var reef_palette = ['green', 'gold', 'orange', 'red'] ;
    var reef_status = ['Low', 'Medium', 'High', 'Very High'] ;
    var panels = [] ;
    for(var j=0; j<4; j++){
      Map.layers().add(layers[j]) ;
      panels[j] = makeRow(reef_palette[j], reef_status[j]) ;
      legend.add(panels[j] ) ;
    }
    var info_reef_risk = ui.Label({value: 'Status of the global coral reefs, 2011. Risk categories are Low, Medium, High and Very High. Source:',
      style: {shown:false} }   ) ;
    var link_reef_risk = ui.Label('UN Ocean Data Viewer', {color:'blue', shown:false}, 'https://data.unep-wcmc.org/datasets/42') ;
    panel6c.add(ui.Checkbox({label: 'Reefs at risk', value: false, 
      onChange: function(checked){ for(var j = 0; j < 4; j++){
      panels[j].style().set({shown:checked}) ;
      layers[j].setShown(checked) }  info_reef_risk.style().set({shown:checked}) ;
      link_reef_risk.style().set({shown:checked})}, style: CheckBoxStyle }) ) ;
    panel6c.add(info_reef_risk) ;
    panel6c.add(link_reef_risk) ;
// Sea Grasses
    var sea_grass_layer = ui.Map.Layer(sea_grasses, {color:'olive'}, 'Sea grasses', false) ;
    Map.layers().add(sea_grass_layer) ;
    var sea_grass_label = makeRow('olive', 'Sea grasses') ;
    legend.add(sea_grass_label) ;
    var sea_grass_layer2 = ui.Map.Layer(seagrass_biome, {color:'green'}, 'Sea grass biome', false) ;
    Map.layers().add(sea_grass_layer2) ;
    var sea_grass_label2 = makeRow('green', 'Sea grass biome') ;
    legend.add(sea_grass_label2) ;
    var sea_grass_info = ui.Label('Global distribution of seagrasses, 2015, according to UN Ocean Data Viewer. Source:', {shown:false}) ;
    var sea_grass_link = ui.Label('UN Ocean Data Viewer', {color:'blue', shown:false}, 'https://data.unep-wcmc.org/datasets/7') ;
    var sea_grass_info2 = ui.Label('Global distribution of the seagrass biome, 2018, according to UN Ocean Data Viewer. Source:', {shown:false} ) ;
    var sea_grass_link2 = ui.Label('UN Ocean Data Viewer', {color:'blue', shown:false}, 'https://data.unep-wcmc.org/datasets/46') ;
    panel6c.add(ui.Checkbox({label: 'Sea grasses', value: false, 
    onChange: function(checked){sea_grass_layer.setShown(checked) ; sea_grass_layer2.setShown(checked);
    sea_grass_label.style().set({shown:checked} ) ; sea_grass_info.style().set({shown:checked}) ;
      sea_grass_link.style().set({shown:checked} ) ; sea_grass_info2.style().set({shown:checked}) ;
      sea_grass_link2.style().set({shown:checked}) ; sea_grass_label2.style().set({shown:checked})}, style: CheckBoxStyle }) ) ;
    panel6c.add(sea_grass_info) ;
    panel6c.add(sea_grass_link) ;
    panel6c.add(sea_grass_info2) ;
    panel6c.add(sea_grass_link2) ;
// Threatened species (IUCN Red List)
    var threat_label = ui.Label({value:'Link to the IUCN Red List of threatened species:', style: {shown:false} } ) ;
    var threat_link = ui.Label('IUCN Red List', {color:'blue', shown:false}, 'https://www.iucnredlist.org/') ;
    panel6c.add(ui.Checkbox({label: 'Threatened species', value: false, 
    onChange: function(checked){threat_label.style().set({shown:checked}) ;
    threat_link.style().set({shown:checked} )}, style: CheckBoxStyle }) ) ;
    panel6c.add(threat_label) ;
    panel6c.add(threat_link) ;
    ui.root.remove(ui.root.widgets().get(1) ) ;
    ui.root.add(panel6c) ;
  } ;
/////////////////////////////////////////
// Indicators for presence of species
/////////////////////////////////////////
var ind_spe = function() {
    var panel6d = ui.Panel({
      layout: ui.Panel.Layout.flow('vertical') ,
      style: {width: '300px'}
    }) ;
    panel6d.add(ui.Button({label: 'HOME', onClick: home, style: ButtonStyleHome} ) ) ;
    panel6d.add(ui.Button({label: 'BACK', onClick: ps6, style: ButtonStyleBack} ) ) ;
    panel6d.add(ui.Label('Indicators for presence of species', LabelStyle ) ) ;
    panel6d.add(ui.Label('Choose indicator.') ) ;
// Bathymetry
    var vis_bath = {bands: 'bedrock', min: -10, max:10, 
    palette:['navy', 'blue', 'aqua', 'orange', 'red'] } ;
    var bath_layer = ui.Map.Layer(bathymetry, vis_bath, 'Bathymetry',false) ;
    Map.layers().add(bath_layer) ;
    var bath_label = makeColorBar('Bathymetry [m]', vis_bath) ;
    legend.add(bath_label) ;
    var bath_info = ui.Label('Land topography and ocean bathymetry, according to the Global Relief Model from NOAA. See Boskalis World for more detailed data. Link:', {shown:false} ) ;
    var bath_link = ui.Label('Global Relief Model', {color:'blue', shown:false}, 'https://www.ngdc.noaa.gov/mgg/global/global.html') ;
    panel6d.add(ui.Checkbox({label: 'Bathymetry', value: false, 
    onChange: function(checked){bath_layer.setShown(checked) ;
      bath_label.style().set({shown:checked} ) ; bath_info.style().set({shown:checked}) ;
      bath_link.style().set({shown:checked})}, style: CheckBoxStyle }) ) ;
    panel6d.add(bath_info) ;
    panel6d.add(bath_link) ;
// Chlorophyll-a  
    var chlor = modisOceanColor.select(['chlor_a']).filterDate('2020-01-01', '2021-01-01');
    var vis_chlor = {min:0, max:20, palette: 'blue,orange,red'} ;
    var chlor_layer = ui.Map.Layer(chlor.mean().visualize(vis_chlor),{}, 'Chlorophyll-a', false) ;
    Map.layers().add(chlor_layer) ;
    var chlor_label = makeColorBar('Chlorophyll-a [mg per m3]', vis_chlor) ;
    legend.add(chlor_label) ;
    var chlor_info = ui.Label('Chlorophyll-a concentration in mg per cubic meter, according to OceanColor Web from NASA. Link:', {shown:false} ) ;
    var chlor_link = ui.Label('NASA OceanColor Web', {color:'blue', shown:false} , 'https://oceancolor.gsfc.nasa.gov/') ;
    panel6d.add(ui.Checkbox({label: 'Chlorophyll a', value: false,
      onChange: function(checked){chlor_layer.setShown(checked) ;
      chlor_label.style().set({shown:checked}) ; chlor_info.style().set({shown:checked}) ;
        chlor_link.style().set({shown:checked}) }, style: CheckBoxStyle})) ;
    panel6d.add(chlor_info) ;
    panel6d.add(chlor_link) ;
// Inter-tidal areas
    var flats = ee.Image(tidal_flat_eco).mask(tidal_flat_eco.eq(1) ) ;
    var flats_layer = ui.Map.Layer(flats, {palette:'blue'}, 'Inter-tidal areas', false) ;
    Map.layers().add(flats_layer) ;
    var flats_label = makeRow('blue', 'Inter-tidal areas') ;
    legend.add(flats_label) ;
    var flats_info = ui.Label('Coastlines that undergo regular tidal inundation, 2019. Source:', {shown:false} ) ;
    var flats_link = ui.Label('UN Ocean Data Viewer', {color:'blue', shown:false}, 'https://data.unep-wcmc.org/datasets/47' ) ;
    panel6d.add(ui.Checkbox({label: 'Inter-tidal areas', value: false, 
      onChange: function(checked){flats_layer.setShown(checked) ; flats_info.style().set({shown:checked}) ;
        flats_link.style().set({shown:checked}) ; flats_label.style().set({shown:checked}) }, style: CheckBoxStyle }) ) ;
    panel6d.add(flats_info) ;
    panel6d.add(flats_link) ;
// Mangroves
    var mangroves_layer = ui.Map.Layer(mangroves, {color:'green'}, 'Mangroves', false) ;
    Map.layers().add(mangroves_layer) ;
    var mangroves_label = makeRow('green', 'Mangroves') ;
    legend.add(mangroves_label) ;
    var mangroves_info = ui.Label('Global distribution of mangrove forests (2011), according to USGS. Link:', {shown:false} ) ;
    var mangroves_link = ui.Label('UN Ocean Data Viewer', {color:'blue', shown:false}, 'https://data.unep-wcmc.org/datasets/4') ;
    panel6d.add(ui.Checkbox({label: 'Mangroves', value: false, 
    onChange: function(checked){mangroves_layer.setShown(checked) ;
    mangroves_label.style().set({shown:checked}) ; mangroves_info.style().set({shown:checked}) ;
      mangroves_link.style().set({shown:checked}) }, style: CheckBoxStyle }) ) ;
    panel6d.add(mangroves_info) ;
    panel6d.add(mangroves_link) ;
// POC
    var poc = modisOceanColor.select(['poc']).filterDate('2020-01-01', '2021-01-01') ;
    var vis_poc = {min:0, max:1000, palette:['white', 'grey', 'black']} ;
    var poc_layer = ui.Map.Layer(poc.mean(), vis_poc, 'Particulate organic carbon', false ) ;
    Map.layers().add(poc_layer) ;
    var poc_label = makeColorBar('Particulate organic carbon [mg per m3]', vis_poc) ;
    legend.add(poc_label) ;
    var poc_info = ui.Label('Particulate organic carbon (POC) concentration [mg per cubic meter] in the ocean, according to NASA OceanColor. Link:', {shown:false} ) ;
    var poc_link = ui.Label('NASA Ocean Color', {color:'blue', shown:false}, 'https://oceancolor.gsfc.nasa.gov/') ;
    panel6d.add(ui.Checkbox({label: 'Particulate organic carbon', value: false,
     onChange: function(checked){poc_layer.setShown(checked) ;
      poc_label.style().set({shown:checked}) ; poc_info.style().set({shown:checked}) ;
       poc_link.style().set({shown:checked}) }, style: CheckBoxStyle})) ;
    panel6d.add(poc_info) ;
    panel6d.add(poc_link) ;
// Salinity
    var sal = salinity.select(['salinity_0']) ;
    var range = sal.reduceColumns(ee.Reducer.minMax(), ["system:time_start"]) ;
    var latest_date = ee.Date(range.get('max') ) ;
    var sal_latest = sal.filterDate(latest_date).sum().divide(1000) ;
    var vis_sal = {min: 0, max:20, palette:['blue', 'green', 'yellow', 'orange', 'red'] } ;
    var sal_layer = ui.Map.Layer(sal_latest,vis_sal,'Salinity', false) ;
    Map.layers().add(sal_layer) ;
    var sal_label = makeColorBar('Salinity in psu', vis_sal) ;
    legend.add(sal_label) ;
    var sal_info = ui.Label('Sea water salinity in practical salinity units (psu), according to the Hybrid Ocean Coordinate Model (HYCOM). Link:', {shown:false} ) ;
    var sal_link = ui.Label('HYCOM', {color:'blue',shown: false}, 'https://www.hycom.org/' ) ;
    panel6d.add(ui.Checkbox({label: 'Salinity', value: false, 
    onChange: function(checked){sal_layer.setShown(checked) ;
    sal_label.style().set({shown:checked}) ; sal_info.style().set({shown:checked}) ;
      sal_link.style().set({shown:checked} ) }, style: CheckBoxStyle }) ) ;
    panel6d.add(sal_info) ;
    panel6d.add(sal_link) ;
// Salt marshes
    var marsh_layer = ui.Map.Layer(salt_marshes, {color:'purple'}, 'Salt marshes', false) ;
    Map.layers().add(marsh_layer) ;
    var marsh_label = makeRow('purple', 'Salt marshes') ;
    legend.add(marsh_label) ;
    var marsh_info = ui.Label('Global distribution of salt marshes, 2017. Source:', {shown:false}) ;
    var marsh_link = ui.Label('UN Ocean Data Viewer', {color:'blue', shown:false}, 'https://data.unep-wcmc.org/datasets/43') ;
    panel6d.add(ui.Checkbox({label: 'Salt marshes', value: false, 
    onChange: function(checked){marsh_layer.setShown(checked) ; marsh_label.style().set({shown:checked}) ;
      marsh_info.style().set({shown:checked} ) ; marsh_link.style().set({shown:checked} ) }, style: CheckBoxStyle }) ) ;
    panel6d.add(marsh_info) ;
    panel6d.add(marsh_link) ;
// Sea temperature   
    var sea_temp = modisOceanColor.select(['sst']).filterDate('2020-01-01', '2021-01-01').mean();
    var vis_temp = {min: 24, max: 36, palette: ['blue','orange','red']}; // navy,blue,aqua
    var sea_temp_layer = ui.Map.Layer(sea_temp, vis_temp, 'Sea temperature (mean 2020)', false) ;
    Map.layers().add(sea_temp_layer) ;
    var sea_temp_label = makeColorBar('Sea temperature [Celsius]', vis_temp) ;
    legend.add(sea_temp_label) ;
    var sea_temp_info = ui.Label('Mean sea surface temperature [degrees Celcius] in 2020, according to NASA OceanColor. Link:', {shown:false} ) ;
    var sea_temp_link = ui.Label('NASA OceanColor', {color:'blue', shown:false}, 'https://oceancolor.gsfc.nasa.gov/') ;
    panel6d.add(ui.Checkbox({label: 'Sea surface temperature', value: false, 
    onChange: function(checked){sea_temp_layer.setShown(checked) ;
    sea_temp_label.style().set({shown:checked}) ; sea_temp_info.style().set({shown:checked}) ;
      sea_temp_link.style().set({shown:checked}) }, style: CheckBoxStyle }) ) ; 
    panel6d.add(sea_temp_info) ;
    panel6d.add(sea_temp_link) ;
// Tree cover   
    var trees = land_cover.select('tree-coverfraction').filterDate('2019-01-01', '2019-12-31') ;
    var vis_trees = {min:0, max:100, palette: ['white', 'lightgreen', 'green', 'darkgreen'] } ;
    var trees_layer = ui.Map.Layer(trees.mean(), vis_trees, 'Tree cover fraction (2019)',false) ;
    Map.layers().add(trees_layer) ;
    var trees_label = makeColorBar('Tree cover fraction [%]', vis_trees) ;
    legend.add(trees_label) ;
    var trees_info = ui.Label('Percentage of land covered by trees (2019), according to Copernicus Global Land Cover dataset. Link:', {shown:false} ) ;
    var trees_link = ui.Label('Land Cover Viewer', {color:'blue', shown:false}, 'https://lcviewer.vito.be/2019') ;
    panel6d.add(ui.Checkbox({label: 'Tree cover', value: false,
      onChange: function(checked){trees_layer.setShown(checked) ;
      trees_label.style().set({shown:checked}) ; trees_info.style().set({shown:checked}) ;
        trees_link.style().set({shown:checked} ) }, style: CheckBoxStyle})) ;
    panel6d.add(trees_info) ;
    panel6d.add(trees_link) ;
    ui.root.remove(ui.root.widgets().get(1) ) ;
    ui.root.add(panel6d) ;
  } ;
var ps6 = function() {
    var panel6 = ui.Panel({
      layout: ui.Panel.Layout.flow('vertical') ,
      style: {width: '300px'}
    }) ;
    panel6.add(ui.Button({label: 'HOME', onClick: home, style: ButtonStyleHome} ) ) ;
    panel6.add(ui.Button({label: 'BACK', onClick: home, style: ButtonStyleBack} ) ) ;
    panel6.add(ui.Label('PS6: Biodiversity', LabelStyle ) ) ;
    panel6.add(ui.Label('Choose risk category.') ) ;
    panel6.add(ui.Button({label: 'Indicators for presence of species', onClick: ind_spe, style:ButtonStyle })) ;
    panel6.add(ui.Button({label: 'In/near protected areas', onClick: pro_are, style: ButtonStyle } )) ;
    panel6.add(ui.Button({label: 'Sensitive species', onClick: sens_spe, style: ButtonStyle } )) ;
    ui.root.remove(ui.root.widgets().get(1) ) ;
    ui.root.add(panel6) ;
  } ;
panel.add(ui.Button({label: 'PS6: Biodiversity', onClick: ps6, style: ButtonStyle} ) ) ;
////////////////////////////////////////////////////////////////////////
//// Performance Standard 7: Indigenous peoples
///////////////////////////////////////////////////////////////////////
var ps7 = function() {
    var panel7a = ui.Panel({
      layout: ui.Panel.Layout.flow('vertical') ,
      style: {width: '300px'}
    }) ;
    panel7a.add(ui.Button({label: 'HOME', onClick: home, style: ButtonStyleHome} ) ) ;
    panel7a.add(ui.Button({label: 'BACK', onClick: home, style: ButtonStyleBack} ) ) ;
    panel7a.add(ui.Label('PS7: Indigenous Peoples', LabelStyle ) ) ;
    panel7a.add(ui.Label('Choose indicator.') ) ;
// Indigenous and Community lands
    var landmark_label = ui.Label({value:'Global map of Indigenous and Community Lands, both acknowledged and not acknowledged by the government, according to LandMark. Source:', style:{shown:false} } ) ;
    var landmark_link = ui.Label('LandMark Map', {color:'blue', shown:false}, 'http://www.landmarkmap.org/map/') ;
    panel7a.add(ui.Checkbox({label: 'Indigenous and Community lands', value: false, 
    onChange: function(checked){ landmark_label.style().set({shown:checked}) ;
    landmark_link.style().set({shown:checked})}, style: CheckBoxStyle }) ) ;
    panel7a.add(landmark_label) ;
    panel7a.add(landmark_link) ;
// Protected areas governed by ind. ppl and local comm.
    var ind_ppl = ProtectedAreas.filter(ee.Filter.or(ee.Filter.stringContains('GOV_TYPE', 'Indigenous people'), ee.Filter.stringContains('GOV_TYPE', 'Local communit') ) ) ;
    var ind_ppl_layer = ui.Map.Layer(ind_ppl, {color: 'purple'}, 'Indigenous peoples',false) ;
    Map.layers().add(ind_ppl_layer) ;
    var ind_ppl_label = makeRow('purple', 'Land governed by indigenous peoples and local communities') ;
    legend.add(ind_ppl_label) ;
    var ind_ppl_info = ui.Label('Locations of protected areas governed by Indigenous Peoples and Local Communities, according to WDPA. Source:', {shown:false}) ;
    var ind_ppl_link = ui.Label('Protected Planet', {color:'blue', shown:false}, 'https://www.protectedplanet.net/en') ;
    var insp_ind_ppl = ui.Panel({widgets: [ui.Label(''),ui.Label(''), ui.Label('')], 
        style: {shown:false, position:'top-center'} } ) ;
    panel7a.add(ui.Checkbox({label: 'Protected areas governed by indigenous peoples and local communities', value: false, 
    onChange: function(checked){ ind_ppl_layer.setShown(checked) ;
    ind_ppl_label.style().set({shown: checked } ) ; ind_ppl_info.style().set({shown:checked}) ;
    ind_ppl_link.style().set({shown:checked }) ;
    // reset inspector
    insp_ind_ppl.widgets().set(0,ui.Label('Click on an area to get more information') ) ;
    insp_ind_ppl.widgets().set(1,ui.Label('')) ;
    insp_ind_ppl.widgets().set(2,ui.Label('')) ;
    var cursor = ['hand', 'crosshair'] ;
    Map.style().set('cursor', cursor[checked|0] ) ;
    insp_ind_ppl.style().set({shown:checked}) ;
    Map.onClick(function(coords) {
      var point = ee.Geometry.Point(coords.lon, coords.lat);
      var ind_ppl_filter = ind_ppl.filterBounds(point) ;
      var ind_name = ind_ppl_filter.aggregate_array('NAME') ;
      var ind_cat = ind_ppl_filter.aggregate_array('IUCN_CAT') ;
      insp_ind_ppl.widgets().set(0,ui.Label({value:'Site information', style:{fontWeight: 'bold'}})) ;
      insp_ind_ppl.widgets().set(1,ui.Label({value:'Loading...', style:{color:'grey'}})) ;
      insp_ind_ppl.widgets().set(2,ui.Label({value:'Loading...', style:{color:'grey'}})) ;
     ind_name.evaluate(function(result) {
        insp_ind_ppl.widgets().set(1, ui.Label( 'Name: ' + result )) ;
      });
     ind_cat.evaluate(function(result) {
       insp_ind_ppl.widgets().set(2,ui.Label('IUCN category: ' + result)) ;
      }) ;
    });
    } , style: CheckBoxStyle }) ) ;
    panel7a.add(ind_ppl_info) ;
    panel7a.add(ind_ppl_link) ;
    Map.add(insp_ind_ppl) ;
// Indigenous peoples' territories
    var styleParams = {fillColor: 'b5ffb488', color: '00909F', width: 3.0 };
    var nat_lands = NativeLands.style(styleParams);
    var nat_lands_layer = ui.Map.Layer(nat_lands, {}, 'Native Lands', false) ;
    Map.layers().add(nat_lands_layer) ;
    var nat_lands_label = makeRow('b5ffb488', 'Indigenous Territories') ;
    legend.add(nat_lands_label) ;
    var nat_lands_info = ui.Label('Territories of indigenous peoples according to Native Lands. Source:', {shown:false}) ;
    var nat_lands_link = ui.Label('Native Lands', {color:'blue', shown:false}, 'https://native-land.ca/') ;
    panel7a.add(ui.Checkbox({label: 'Territories of indigenous peoples', value: false, 
    onChange: function(checked){ nat_lands_layer.setShown(checked) ;
    nat_lands_label.style().set({shown:checked}) ; nat_lands_info.style().set({shown:checked}) ;
      nat_lands_link.style().set({shown:checked}) }, style: CheckBoxStyle }) ) ;
    panel7a.add(nat_lands_info) ;
    panel7a.add(nat_lands_link) ;
    ui.root.remove(ui.root.widgets().get(1) ) ;
    ui.root.add(panel7a) ;
  } ;
panel.add(ui.Button({label: 'PS7: Indigenous Peoples', onClick: ps7, style: ButtonStyle} ) ) ;
////////////////////////////////////////////////////////////////
//// Performance Standard 8
////////////////////////////////////////////////////////////////
var ps8 = function() {
    var panel8a = ui.Panel({
      layout: ui.Panel.Layout.flow('vertical') ,
      style: {width: '300px'}
    }) ;
    panel8a.add(ui.Button({label: 'HOME', onClick: home, style: ButtonStyleHome} ) ) ;
    panel8a.add(ui.Button({label: 'BACK', onClick: home, style: ButtonStyleBack} ) ) ;
    panel8a.add(ui.Label('PS8: Cultural Heritage', LabelStyle ) ) ;
    panel8a.add(ui.Label('Choose indicator.')) ;
// Archaeological, cultural and natural sites
    var arch_label = ui.Label({value:'Search per country for Archaeological, Cultural and Natural sites. Source: ARCHI Information Systems. Link:', style:{shown:false} } ) ;
    var arch_link = ui.Label('ARCHI UK', {color:'blue', shown:false}, 'https://www.archiuk.com/worldwide') ;
    panel8a.add(ui.Checkbox({label: 'Archaeological, cultural and natural sites', value: false, 
    onChange: function(checked){arch_label.style().set({shown:checked}) ;
    arch_link.style().set({shown:checked})} , style: CheckBoxStyle }) ) ;
    panel8a.add(arch_label) ;
    panel8a.add(arch_link) ;
// Historic shipwrecks
    var wreck_label = ui.Label({value:'See ADMIRALITY Charts in Boskalis World.', style:{shown:false} } ) ;
    panel8a.add(ui.Checkbox({label: 'Historic shipwrecks', value: false, 
    onChange: function(checked){wreck_label.style().set({shown:checked}) } , style: CheckBoxStyle }) ) ;
    panel8a.add(wreck_label) ;
// World Heritage
    var wor_her = ProtectedAreas.filter(ee.Filter.stringContains('DESIG_ENG', 'World Heritage') )  ;
    var wor_her_layer = ui.Map.Layer(wor_her, {color: 'purple'}, 'World Heritage Sites',false) ;
    Map.layers().add(wor_her_layer) ;
    var wor_her_label = makeRow('purple', 'World Heritage Sites') ;
    legend.add(wor_her_label) ;
    var insp_wor_her = ui.Panel({widgets: [ui.Label(''),ui.Label(''), ui.Label('')], 
        style: {shown:false, position:'top-center'} } ) ;
    var wor_her_info = ui.Label('Locations of protected areas designated as UNESCO World Heritage site according to the WDPA. Note: does not contain all cultural sites. Original source:', {shown:false} ) ;
    var wor_her_link = ui.Label('UNESCO World Heritage', {color:'blue', shown:false}, 'https://whc.unesco.org/en/interactive-map/') ;
    panel8a.add(ui.Checkbox({label: 'World Heritage sites', value: false, 
    onChange: function(checked){wor_her_layer.setShown(checked) ;
    wor_her_label.style().set({shown:checked} ) ; wor_her_info.style().set({shown:checked}) ;
    wor_her_link.style().set({shown:checked}) ;
      // reset inspector
    insp_wor_her.widgets().set(0,ui.Label('Click on an area to get more information') ) ;
    insp_wor_her.widgets().set(1,ui.Label('')) ;
    insp_wor_her.widgets().set(2,ui.Label('')) ;
    var cursor = ['hand', 'crosshair'] ;
    Map.style().set('cursor', cursor[checked|0] ) ;
    insp_wor_her.style().set({shown:checked}) ;
    Map.onClick(function(coords) {
      var point = ee.Geometry.Point(coords.lon, coords.lat);
      var wor_her_filter = wor_her.filterBounds(point) ;
      var site_name = wor_her_filter.aggregate_array('NAME') ;
      var site_crit = wor_her_filter.aggregate_array('INT_CRIT') ;
      insp_wor_her.widgets().set(0,ui.Label({value:'World Heritage Site information', style:{fontWeight: 'bold'}})) ;
      insp_wor_her.widgets().set(1,ui.Label({value:'Loading...', style:{color:'grey'}})) ;
      insp_wor_her.widgets().set(2,ui.Label({value:'Loading...', style:{color:'grey'}})) ;
     site_name.evaluate(function(result) {
        insp_wor_her.widgets().set(1, ui.Label( 'Name: ' + result )) ;
      });
     site_crit.evaluate(function(result) {
       insp_wor_her.widgets().set(2,ui.Label('World Heritage criteria: ' + result)) ;
      }) ;
    });
    } , style: CheckBoxStyle }) ) ;
    panel8a.add(wor_her_info) ;
    panel8a.add(wor_her_link) ;
    Map.add(insp_wor_her) ;
    ui.root.remove(ui.root.widgets().get(1) ) ;
    ui.root.add(panel8a) ;
  } ;
panel.add(ui.Button({label: 'PS8: Cultural Heritage',onClick: ps8, style: ButtonStyle} ) ) ;
//////////////////////////////////////////////////
/// Add/remove panels from map
//////////////////////////////////////////////////
ui.root.add(panel) ;
Map.setControlVisibility({layerList: false, drawingToolsControl: false}) ;
// Map.setCenter(120,14) ; // Manilla Bay, Philippines