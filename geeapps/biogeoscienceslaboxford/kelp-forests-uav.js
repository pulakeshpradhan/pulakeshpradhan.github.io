var alos = ee.Image("JAXA/ALOS/AW3D30_V1_1"),
    Diego = ee.Image("users/biogeoscienceslaboxford/DiegoRamirez"),
    table = ee.FeatureCollection("users/biogeoscienceslaboxford/Sitios_macaya_PAPER"),
    fede = ee.FeatureCollection("users/biogeoscienceslaboxford/sitios_federico"),
    capehorn = ee.FeatureCollection("users/biogeoscienceslaboxford/sitios_mathias"),
    chile2 = ee.FeatureCollection("users/biogeoscienceslaboxford/Sitios_PerezMatus_Buschmann_Macaya1"),
    aguirre = ee.FeatureCollection("users/biogeoscienceslaboxford/sitios_hamame"),
    Australia = ee.FeatureCollection("users/biogeoscienceslaboxford/MARINE_HAB_SURVEYS_MACROCYSTIS_1996_2008"),
    p_kergue = /* color: #d63000 */ee.Geometry.Point([70.136, -49.4582]),
    p_tristan = /* color: #98ff00 */ee.Geometry.MultiPoint(
        [[-12.2906, -37.1092],
         [-12.6749, -37.2991],
         [-12.48068, -37.42317]]),
    p_chatham = /* color: #0b4a8b */ee.Geometry.MultiPoint(
        [[-176.4779, -43.8971],
         [-176.217, -44.2837]]),
    p_macquarie = /* color: #ffc82d */ee.Geometry.Point([158.8626, -54.6281]),
    p_antipodes = /* color: #00ffff */ee.Geometry.Point([178.7675, -49.6879]),
    p_bounty = /* color: #bf04c2 */ee.Geometry.Point([179.0317, -47.758]),
    p_estados = /* color: #ff0000 */ee.Geometry.Point([-64.2462, -54.7629]),
    p_tortugas = /* color: #00ff00 */ee.Geometry.Point([-114.9078, 27.6576]),
    p_diego = /* color: #999900 */ee.Geometry.Point([-68.7287, -56.5095]),
    p_barbara = /* color: #0000ff */ee.Geometry.Point([-119.8659, 34.4083]),
    p_charlotte = /* color: #009999 */ee.Geometry.Point([-128.2953, 51.9692]),
    p_tristan2 = /* color: #ff00ff */ee.Geometry.Point([-12.4654, -37.2392]),
    p_montanas = /* color: #ff9999 */ee.Geometry.Point([-73.2841, -51.9319]),
    p_crozet = /* color: #99ff99 */ee.Geometry.Point([51.224, -46.309]),
    p_chatham2 = /* color: #9999ff */ee.Geometry.Point([-176.3026, -44.1134]),
    PSANorte = ee.Image("users/biogeoscienceslaboxford/PuntaStaAnaBahiaBuzos2_Orthomosaic_export_FriFeb01154908"),
    BQuemado = ee.Image("users/alitamoras/1BuqueQuemado2_4Feb19"),
    Chabunco = ee.Image("users/alitamoras/1Chabunco30jan19terrain_30jan19_2"),
    chabunco2 = ee.Image("users/alitamoras/1Chabunco_Orthomosaic_export_MonJan28225211"),
    isidro = ee.Image("users/alitamoras/1FaroSanIsidro2Feb19"),
    SAndres1 = ee.Image("users/alitamoras/1IslaSanAndres1_Orthomosaic_export_SunMar10183239530068"),
    SAndres2 = ee.Image("users/alitamoras/1IslaSanAndres2_Orthomosaic_export_SunMar10184255187073"),
    Maitencillo = ee.Image("users/biogeoscienceslaboxford/Maitencillo_Orthomosaic_240319"),
    niebla = ee.Image("users/alitamoras/1Niebla_150319"),
    MIsabel = ee.Image("users/alitamoras/1PajareraMariaIsabel8mar19_Orthomosaic_export_SunMar10184751849983"),
    PAmparo = ee.Image("users/alitamoras/1PuertoAmparo_050319"),
    PCarrera = ee.Image("users/alitamoras/1PuntaCarrera6Feb19"),
    SGregorio = ee.Image("users/alitamoras/1SanGregorio_4Feb19"),
    PSASur = ee.Image("users/alitamoras/1SantaAnaSur_18Feb19"),
    TussacBottom = ee.Image("users/biogeoscienceslaboxford/2019_07_11_TussacIslands_BottomIsland_20cm"),
    TussacKelly = ee.Image("users/biogeoscienceslaboxford/2019_07_11_TussacIslands_TopIslandKelly_20cm"),
    YendegaiaE2 = ee.Image("users/biogeoscienceslaboxford/YendegaiaE2_Orthomosaic_export_SatAug24153935204139"),
    YendegaiaE3 = ee.Image("users/biogeoscienceslaboxford/YendegaiaE3_Orthomosaic_export_SatAug24153848687001"),
    YendegaiaE1 = ee.Image("users/biogeoscienceslaboxford/YendegaiaE1_Orthomosaic_export_SatAug24154048935265"),
    Alaska = ee.Image("users/biogeoscienceslaboxford/AlaskaOct19"),
    anchorage = ee.Image("users/biogeoscienceslaboxford/AnchorageOct19"),
    arequipa = ee.Image("users/biogeoscienceslaboxford/ArequipaOct19"),
    auckland = ee.Image("users/biogeoscienceslaboxford/AucklandOct19"),
    antipodes = ee.Image("users/biogeoscienceslaboxford/AntipodesOct19"),
    bajacali = ee.Image("users/biogeoscienceslaboxford/BajaCaliOct19"),
    bc = ee.Image("users/biogeoscienceslaboxford/BritishColumbiaOct19"),
    cali = ee.Image("users/biogeoscienceslaboxford/CaliforniaOct19"),
    campbell = ee.Image("users/biogeoscienceslaboxford/CampbellOct19"),
    cchile = ee.Image("users/biogeoscienceslaboxford/CentralChileOct19"),
    chatham = ee.Image("users/biogeoscienceslaboxford/ChathamOct19"),
    crozet = ee.Image("users/biogeoscienceslaboxford/CrozetOct19"),
    diego = ee.Image("users/biogeoscienceslaboxford/DiegoRamirez"),
    eastafrica = ee.Image("users/biogeoscienceslaboxford/EastSouthAfricaOct19"),
    falklands = ee.Image("users/biogeoscienceslaboxford/FalklandsOct19"),
    gough = ee.Image("users/biogeoscienceslaboxford/GoughOct19"),
    heardmd = ee.Image("users/biogeoscienceslaboxford/HeardMDOct19"),
    kerguelen = ee.Image("users/biogeoscienceslaboxford/KerguelenOct19"),
    kodiakis = ee.Image("users/biogeoscienceslaboxford/KodiakIsOct19"),
    lima = ee.Image("users/biogeoscienceslaboxford/LimaOct19"),
    macquarie = ee.Image("users/biogeoscienceslaboxford/MacquarieOct19"),
    melbourne = ee.Image("users/biogeoscienceslaboxford/MelbourneOct19"),
    nwsg = ee.Image("users/biogeoscienceslaboxford/NWSouthGeorgiaOct19"),
    nzn = ee.Image("users/biogeoscienceslaboxford/NZNorteOct19"),
    nzs = ee.Image("users/biogeoscienceslaboxford/NZSurOct19"),
    namibia = ee.Image("users/biogeoscienceslaboxford/NamibiaOct19"),
    oregon = ee.Image("users/biogeoscienceslaboxford/OregonOct19"),
    patagonia = ee.Image("users/biogeoscienceslaboxford/PatagoniaOct19"),
    pedward = ee.Image("users/biogeoscienceslaboxford/PrinceEdwardOct19"),
    sg = ee.Image("users/biogeoscienceslaboxford/SGOct19"),
    tas = ee.Image("users/biogeoscienceslaboxford/TasmaniaOct19"),
    tdf = ee.Image("users/biogeoscienceslaboxford/TierradelFuegoOct19"),
    tristan = ee.Image("users/biogeoscienceslaboxford/TristanOct19"),
    KD_ch = ee.Image("users/biogeoscienceslaboxford/Validation_KD_Chabunco"),
    KD_ma = ee.Image("users/biogeoscienceslaboxford/Validation_KD_Maitencillo"),
    KD_mi = ee.Image("users/biogeoscienceslaboxford/Validation_KD_MariaIsabel"),
    KD_ni = ee.Image("users/biogeoscienceslaboxford/Validation_KD_Niebla"),
    KD_psan = ee.Image("users/biogeoscienceslaboxford/Validation_KD_PSANorte"),
    KD_psas = ee.Image("users/biogeoscienceslaboxford/Validation_KD_PSASur"),
    KD_pa = ee.Image("users/biogeoscienceslaboxford/Validation_KD_PtoAmparo"),
    KD_pc = ee.Image("users/biogeoscienceslaboxford/Validation_KD_PuntaCarrera"),
    KD_sa1 = ee.Image("users/biogeoscienceslaboxford/Validation_KD_SanAndres1"),
    KD_sa2 = ee.Image("users/biogeoscienceslaboxford/Validation_KD_SanAndres2"),
    KD_sg = ee.Image("users/biogeoscienceslaboxford/Validation_KD_SanGregorio"),
    KD_si = ee.Image("users/biogeoscienceslaboxford/Validation_KD_SanIsidro"),
    KD_tb = ee.Image("users/biogeoscienceslaboxford/Validation_KD_Tussacbottom"),
    KD_tk = ee.Image("users/biogeoscienceslaboxford/Validation_KD_Tussackelly"),
    KD_tt = ee.Image("users/biogeoscienceslaboxford/Validation_KD_Tussactop"),
    KD_ye = ee.Image("users/biogeoscienceslaboxford/Validation_KD_Yendegaia"),
    FA_ch = ee.Image("users/biogeoscienceslaboxford/Validation_FAI_Chabunco"),
    FA_Ma = ee.Image("users/biogeoscienceslaboxford/Validation_FAI_Maitencillo"),
    FA_mi = ee.Image("users/biogeoscienceslaboxford/Validation_FAI_MariaIsabel"),
    FA_ni = ee.Image("users/biogeoscienceslaboxford/Validation_FAI_Niebla"),
    FA_psan = ee.Image("users/biogeoscienceslaboxford/Validation_FAI_PSANorte"),
    FA_psas = ee.Image("users/biogeoscienceslaboxford/Validation_FAI_PSASur"),
    FA_pa = ee.Image("users/biogeoscienceslaboxford/Validation_FAI_PtoAmparo"),
    FA_pc = ee.Image("users/biogeoscienceslaboxford/Validation_FAI_PuntaCarrera"),
    FA_sa1 = ee.Image("users/biogeoscienceslaboxford/Validation_FAI_SanAndres1"),
    FA_sa2 = ee.Image("users/biogeoscienceslaboxford/Validation_FAI_SanAndres2"),
    FA_sg = ee.Image("users/biogeoscienceslaboxford/Validation_FAI_SanGregorio"),
    FA_si = ee.Image("users/biogeoscienceslaboxford/Validation_FAI_SanIsidro"),
    FA_tb = ee.Image("users/biogeoscienceslaboxford/Validation_FAI_Tussacbottom"),
    FA_tk = ee.Image("users/biogeoscienceslaboxford/Validation_FAI_Tussackelly"),
    FA_tt = ee.Image("users/biogeoscienceslaboxford/Validation_FAI_Tussactop"),
    FA_ye = ee.Image("users/biogeoscienceslaboxford/Validation_FAI_Yendegaia"),
    ND_ch = ee.Image("users/biogeoscienceslaboxford/Validation_NDVI_Chabunco"),
    ND_ma = ee.Image("users/biogeoscienceslaboxford/Validation_NDVI_Maitencillo"),
    ND_mi = ee.Image("users/biogeoscienceslaboxford/Validation_NDVI_MariaIsabel"),
    ND_ni = ee.Image("users/biogeoscienceslaboxford/Validation_NDVI_Niebla"),
    ND_psan = ee.Image("users/biogeoscienceslaboxford/Validation_NDVI_PSANorte"),
    ND_psas = ee.Image("users/biogeoscienceslaboxford/Validation_NDVI_PSASur"),
    ND_pa = ee.Image("users/biogeoscienceslaboxford/Validation_NDVI_PtoAmparo"),
    ND_pc = ee.Image("users/biogeoscienceslaboxford/Validation_NDVI_PuntaCarrera"),
    ND_sa1 = ee.Image("users/biogeoscienceslaboxford/Validation_NDVI_SanAndres1"),
    ND_sa2 = ee.Image("users/biogeoscienceslaboxford/Validation_NDVI_SanAndres2"),
    ND_sg = ee.Image("users/biogeoscienceslaboxford/Validation_NDVI_SanGregorio"),
    ND_si = ee.Image("users/biogeoscienceslaboxford/Validation_NDVI_SanIsidro"),
    ND_tb = ee.Image("users/biogeoscienceslaboxford/Validation_NDVI_Tussacbottom"),
    ND_tk = ee.Image("users/biogeoscienceslaboxford/Validation_NDVI_Tussackelly"),
    ND_tt = ee.Image("users/biogeoscienceslaboxford/Validation_NDVI_Tussactop"),
    ND_ye = ee.Image("users/biogeoscienceslaboxford/Validation_NDVI_Yendegaia"),
    CP_bq = ee.Image("users/biogeoscienceslaboxford/B11B8B4_BuqueQuemado"),
    CP_ch = ee.Image("users/biogeoscienceslaboxford/B11B8B4_Chabunco"),
    CP_ma = ee.Image("users/biogeoscienceslaboxford/B11B8B4_Maitencillo"),
    CP_mi = ee.Image("users/biogeoscienceslaboxford/B11B8B4_MariaIsabel"),
    CP_ni = ee.Image("users/biogeoscienceslaboxford/B11B8B4_Niebla"),
    CP_psan = ee.Image("users/biogeoscienceslaboxford/B11B8B4_PSANorte"),
    CP_psas = ee.Image("users/biogeoscienceslaboxford/B11B8B4_PSASur"),
    CP_pa = ee.Image("users/biogeoscienceslaboxford/B11B8B4_PtoAmparo"),
    CP_pc = ee.Image("users/biogeoscienceslaboxford/B11B8B4_PuntaCarrera"),
    CP_sa1 = ee.Image("users/biogeoscienceslaboxford/B11B8B4_SanAndres1"),
    CP_sa2 = ee.Image("users/biogeoscienceslaboxford/B11B8B4_SanAndres2"),
    CP_sg = ee.Image("users/biogeoscienceslaboxford/B11B8B4_SanGregorio"),
    CP_si = ee.Image("users/biogeoscienceslaboxford/B11B8B4_SanIsidro"),
    CP_tb = ee.Image("users/biogeoscienceslaboxford/B11B8B4_Tussacbottom"),
    CP_tk = ee.Image("users/biogeoscienceslaboxford/B11B8B4_Tussackelly"),
    CP_tt = ee.Image("users/biogeoscienceslaboxford/B11B8B4_Tussactop"),
    CP_ye = ee.Image("users/biogeoscienceslaboxford/B11B8B4_Yendegaia");
/////Global KDI - Final Map (Sept 2018) /////////////////////
////polygonmasks/////
//var islasImage = island.reduceToImage(['B1'],ee.Reducer.first());
var alos = alos.select('AVE')
//////Mosaic///////////////////////////////////////////////
var mosaic = ee.ImageCollection([Alaska,anchorage, arequipa, auckland, antipodes, bajacali, bc, 
cali, campbell, cchile, chatham, crozet, diego, eastafrica, falklands,gough, heardmd, kerguelen, kodiakis, lima, macquarie, melbourne, 
nwsg, nzn, nzs, namibia, oregon, patagonia, pedward, sg, tas, tdf,tristan]).map(function(image) {
    return image.multiply(512).uint8();
  }).mosaic();
var validatedKD = ee.ImageCollection([KD_ch, KD_ma, KD_mi, KD_ni, KD_psan, KD_psas, KD_pa, KD_pc, 
KD_sa1, KD_sa2, KD_sg, KD_si, KD_tb, KD_tk, KD_tt, KD_ye]).map(function(image) {
    return image.multiply(512).uint8();
  }).mosaic();
var validatedFAI = ee.ImageCollection([FA_ch, FA_Ma, FA_mi, FA_ni, FA_psan, FA_psas, FA_pa, FA_pc, 
FA_sa1, FA_sa2, FA_sg, FA_si, FA_tb, FA_tk, FA_tt, FA_ye]).map(function(image) {
    return image.multiply(512).uint8();
  }).mosaic();
var validatedNDVI = ee.ImageCollection([ND_ch, ND_ma, ND_mi, ND_ni, ND_psan, ND_psas, ND_pa, ND_pc, 
ND_sa1, ND_sa2, ND_sg, ND_si, ND_tb, ND_tk, ND_tt, ND_ye]).map(function(image) {
    return image.multiply(512).uint8();
  }).mosaic();
var compositeB11B8B4 = ee.ImageCollection([CP_bq, CP_ch, CP_ma, CP_mi, CP_ni, CP_psan, CP_psas, CP_pa, CP_pc, 
CP_sa1, CP_sa2, CP_sg, CP_si, CP_tb, CP_tk, CP_tt, CP_ye])
var alos0 = alos.eq(0)
var kdi = mosaic.select('KR');
//Map.addLayer(mosaic, {min: -0.5, max: 1, palette: [ 'darkgreen', 'green', 'yellow', 'orange', 'red', 'darkred']}, 'Kelp mosaic (original)'); //Original with false positives 
//Drone layers
var mosaicdrone = ee.ImageCollection([PSANorte, BQuemado, Chabunco, chabunco2, isidro, SAndres1, SAndres2, 
Maitencillo, niebla, MIsabel, PAmparo, PCarrera, SGregorio, PSASur, TussacBottom, TussacKelly, 
YendegaiaE2, YendegaiaE3, YendegaiaE1]).mosaic()
Map.addLayer(compositeB11B8B4, {bands:['B11','B8','B4'], min:0, max:0.5}, 'Sentinel2 composite B11B8B4, 3 months',1);
Map.addLayer(alos0, {}, 'watermask', false)
Map.addLayer(mosaic, {min: 1, max: 15, palette: [ 'darkgreen', 'green', 'yellow', 'orange', 'red', 'darkred']}, 'Kelp mosaic, average 2015-2019'); // False positives masked off
Map.addLayer(mosaicdrone, {}, 'Drone imagery')
Map.addLayer(validatedNDVI, {min: 1, max: 15, palette: [ 'darkgreen', 'green', 'yellow', 'orange', 'red', 'darkred']}, 'NDVI, average 3 months'); // False positives masked off
Map.addLayer(validatedFAI, {min: 1, max: 15, palette: [ 'darkgreen', 'green', 'yellow', 'orange', 'red', 'darkred']}, 'FAI, average 3 months'); // False positives masked off
Map.addLayer(validatedKD, {min: 1, max: 15, palette: [ 'darkgreen', 'green', 'yellow', 'orange', 'red', 'darkred']}, 'KD, average 3 months'); // False positives masked off
//var vis = {min:-1, max:1, palette:['blue', 'green', 'red']};
//var vis = {min: -0.1, max: 1, palette: [   'green', 'yellow',  'red']};
//Map.addLayer(mosaic, vis, 'Kelp Mosaic');
//##############Panel + widgets####################
var bgcolor = '#99ccff';
var text_bg_color = '#002147';
var text_fg_color = '#ffffff';
var style1 = {fontSize: '13px',    fontWeight: 'bold',    maxWidth: '320px', backgroundColor: text_bg_color, color: text_fg_color};
var style_withBorder = {fontSize: '13px',    fontWeight: 'bold',  width:'300px',  maxWidth: '320px', backgroundColor: text_bg_color, color: text_fg_color,  border: '1px solid white', padding: '5px'};
var style_header = {fontSize: '13px',    fontWeight: 'bold',  width:'300px',  maxWidth: '320px', backgroundColor: text_fg_color, color: text_bg_color, padding: '5px', margin: '15px 0 0 10px '};
var title = ui.Label({
  value: 'Supplementary material global map of giant kelp forests: High resolution validation', 
  style: {    fontSize: '20px',    fontWeight: 'bold',     maxWidth: '320px', backgroundColor: text_fg_color, color: text_bg_color , border:'1px solid white', padding: '5px'}});
var subtitle = ui.Label({
  value: 'Mora-Soto et al. A high-resolution global map of giant kelp (Macrocystis pyrifera) forests and intertidal green algae (Ulvophyceae) with Sentinel-2 images', 
  style: style_withBorder});
var subtitle1 = ui.Label({
  value: ' Active layers: NDVI, FAI, KD, Drone Imagery, Kelp mosaic (global average 2015-2019), Sentinel composite', 
  style: style_withBorder});
var subtitle2 = ui.Label({
  value: ' Additional layer: Land Mask (ALOS DSM)', 
  style: style_withBorder});
var subtitle3 = ui.Label({
  value: 'Drone imagery > 1 hectare', 
  style: style_withBorder});
var subtitle4 = ui.Label({
  value: 'Drone imagery < 1 hectare', 
  style: style_withBorder});
var subtitle5 = ui.Label({
  value: 'Drone imagery collected between 24/Jan/19 and 18/Feb/19 in the Strait of Magellan, 21/Feb/19 to 9/Mar/19 in the Patagonian Channels and Fjords, 15/Mar/19 in Niebla, 24/Mar/19 in Maitencillo, 11/Jul/19 in the Tussac Islands, and 21/Jul/19 in Yendegaia.', 
  style: style_withBorder});
var subtitle6 = ui.Label({
  value: 'Drone surveys in Chile: @Alejandra Mora-Soto. Fieldwork was funded by CONICYT (scholarship 296776-21171029 awarded to M. Palacios), Centro de Investigación de Ecosistemas Marinos de Altas Latitudes (FONDAP – IDEAL grant 15150003 from CONICYT), Centro de Investigación de Ecosistemas de la Patagonia (CIEP), South Atlantic Environmental Research Institute (SAERI), the School of Geography and the Environment - University of Oxford, St Peter’s College (Graduate Awards) and Santander Academic Travel Awards. This research is part of A.M-S’s PhD funded by CONICYT- Becas Chile.', 
  style: style_withBorder});
var subtitle7 = ui.Label({
  value: 'Drone surveys in the Tussac Islands: © SAERI, 2019.  This imagery was collected by the DPLUS065 Coastal Habitat Mapping project, grant aided by the Darwin Initiative through UK Government funding.', 
  style: style_withBorder});
var places = {
'Punta Santa Ana Norte, Strait of Magellan' : [-70.91898, -53.6273],
'San Isidro, Strait of Magellan': [-70.97307, -53.78544],
'Chabunco, Strait of Magellan': [-70.811, -52.98647],
'Punta Carrera, Strait of Magellan': [-70.93837, -53.55867],
'Niebla': [-73.400896, -39.875007],
'Tussac Top': [-57.7285, -51.67331], 
'Tussac Bottom': [-57.74549, -51.67217], 
'Tussac Kelly': [-57.76128, -51.67342],
'Yengedaia, Beagle Channel': [-68.70322, -54.90641],
};
var select = ui.Select({
  items: Object.keys(places),
  onChange: function(key) {
    Map.setCenter(places[key][0], places[key][1], 16);
  }
});
var places2 = {
  'Punta Santa Ana Sur, Strait of Magellan': [-70.92499, -53.63015],
  'Puerto Amparo': [-73.282685, -44.898675], 
  'Lobera María Isabel': [-73.424154, -44.909091], 
'Maitencillo': [-71.44127, -32.647671],
'Buque Quemado': [-69.47709, -52.33505],
'San Gregorio': [-70.07316, -52.56992], 
'Punta Santa Ana Sur': [-70.924918, -53.629988], 
'San Andres 2': [-73.33865, -44.93236], 
'San Andres 1': [-73.32285, -44.93709]
};
var select2 = ui.Select({
  items: Object.keys(places2),
  onChange: function(key) {
    Map.setCenter(places2[key][0], places2[key][1], 17);
  }
});
// Set a place holder.
select.setPlaceholder('Validation sites');
// Set a place holder.
select2.setPlaceholder('Non-validated sites');
var lon = ui.Label();
var lat = ui.Label();
var kelp = ui.Label();
// Added this
var image = ee.Image('users/mohyaqub/ox_logo').visualize();
var logo = ui.Thumbnail({
  image: image,
  params: {
    dimensions: '100x100',
    //region: box,
    format: 'png'
  },
  style: {height: '100px', width: '100px', position: 'top-left'}
});
// Widgets
var panel = ui.Panel();
panel.style().set({
  backgroundColor: '#002147',
  position: 'bottom-right',
  //width:'300px'
});
panel.add(title);
//panel.add(logo);
panel.add(subtitle);
panel.add(subtitle1);
panel.add(subtitle2);
panel.add(subtitle3);
panel.add(select);
panel.add(subtitle4);
panel.add(select2);
panel.add(subtitle5);
panel.add(subtitle6);
panel.add(subtitle7);
ui.root.add(panel);
//Map "center"
Map.setCenter(-70.9754, -53.78515, 17);
/*
/////// KDI on click //////////////////////////////
var label = new ui.Label('Click for KDI', {
  fontWeight: "bold",
  stretch: "vertical",
});
var inspector = ui.Panel([label], ui.Panel.Layout.flow('horizontal'));
function showMosaic(mosaic1) {
inspector.clear(); 
var TitleLabel = ui.Label("KDI: ", {
  fontWeight: "bold",
  stretch: "vertical",
})
var elevationLabel = ui.Label(mosaic1, {stretch: "vertical"});
var closeButton = ui.Button('Close', function() {
  inspector.style().set("shown", false)
})
inspector.add(TitleLabel)
inspector.add(elevationLabel); 
inspector.add(closeButton)
}
function inspect (coords) {
  inspector.clear();
  inspector.style().set("shown", true); 
  inspector.add(ui.Label('Loading...', {color: 'grey'})); 
  var point = ee.Geometry.Point(coords.lon, coords.lat)
  var mosaic1 = mosaic.reduceRegion({
    reducer : ee.Reducer.first(), 
    geometry: point, 
    scale:20,
  }).get('KR');
  mosaic1.evaluate(showMosaic); 
}
/////Map.onClick -> KDI 
Map.add(inspector);
Map.onClick(inspect); 
Map.style().set("cursor", "crosshair"); 
*/