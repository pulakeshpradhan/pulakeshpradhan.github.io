var MC = ui.import && ui.import("MC", "image", {
      "id": "users/biogeoscienceslaboxford/00_MiddleCove_L280"
    }) || ee.Image("users/biogeoscienceslaboxford/00_MiddleCove_L280"),
    SoME = ui.import && ui.import("SoME", "image", {
      "id": "users/biogeoscienceslaboxford/00_StraitMagalhanes07796_adj_modified_G215"
    }) || ee.Image("users/biogeoscienceslaboxford/00_StraitMagalhanes07796_adj_modified_G215"),
    PB = ui.import && ui.import("PB", "image", {
      "id": "users/biogeoscienceslaboxford/00_L281PacksaddleBaymodified"
    }) || ee.Image("users/biogeoscienceslaboxford/00_L281PacksaddleBaymodified"),
    EE = ui.import && ui.import("EE", "image", {
      "id": "users/biogeoscienceslaboxford/00_L292_EEntranceStraitofMag"
    }) || ee.Image("users/biogeoscienceslaboxford/00_L292_EEntranceStraitofMag"),
    BF = ui.import && ui.import("BF", "image", {
      "id": "users/biogeoscienceslaboxford/01BarfPoint1929"
    }) || ee.Image("users/biogeoscienceslaboxford/01BarfPoint1929"),
    BoI = ui.import && ui.import("BoI", "image", {
      "id": "users/biogeoscienceslaboxford/01BayofIsles1914"
    }) || ee.Image("users/biogeoscienceslaboxford/01BayofIsles1914"),
    BW = ui.import && ui.import("BW", "image", {
      "id": "users/biogeoscienceslaboxford/01BlueWhale1931"
    }) || ee.Image("users/biogeoscienceslaboxford/01BlueWhale1931"),
    CBuller = ui.import && ui.import("CBuller", "image", {
      "id": "users/biogeoscienceslaboxford/01CapeBuller1931"
    }) || ee.Image("users/biogeoscienceslaboxford/01CapeBuller1931"),
    CB05 = ui.import && ui.import("CB05", "image", {
      "id": "users/biogeoscienceslaboxford/01CumberlandBay1905"
    }) || ee.Image("users/biogeoscienceslaboxford/01CumberlandBay1905"),
    CB20 = ui.import && ui.import("CB20", "image", {
      "id": "users/biogeoscienceslaboxford/01CumberlandBay1920"
    }) || ee.Image("users/biogeoscienceslaboxford/01CumberlandBay1920"),
    CB25 = ui.import && ui.import("CB25", "image", {
      "id": "users/biogeoscienceslaboxford/01CumberlandBay1925"
    }) || ee.Image("users/biogeoscienceslaboxford/01CumberlandBay1925"),
    CB29 = ui.import && ui.import("CB29", "image", {
      "id": "users/biogeoscienceslaboxford/01CumberlandBay1929"
    }) || ee.Image("users/biogeoscienceslaboxford/01CumberlandBay1929"),
    Else = ui.import && ui.import("Else", "image", {
      "id": "users/biogeoscienceslaboxford/01Elsehul1930"
    }) || ee.Image("users/biogeoscienceslaboxford/01Elsehul1930"),
    FB = ui.import && ui.import("FB", "image", {
      "id": "users/biogeoscienceslaboxford/01FortunaBay1931"
    }) || ee.Image("users/biogeoscienceslaboxford/01FortunaBay1931"),
    HH = ui.import && ui.import("HH", "image", {
      "id": "users/biogeoscienceslaboxford/01HusvikHarbour1928"
    }) || ee.Image("users/biogeoscienceslaboxford/01HusvikHarbour1928"),
    JH = ui.import && ui.import("JH", "image", {
      "id": "users/biogeoscienceslaboxford/01JasonHarbour1929"
    }) || ee.Image("users/biogeoscienceslaboxford/01JasonHarbour1929"),
    kec05 = ui.import && ui.import("kec05", "image", {
      "id": "users/biogeoscienceslaboxford/01KingEdwardCove1905"
    }) || ee.Image("users/biogeoscienceslaboxford/01KingEdwardCove1905"),
    kec20 = ui.import && ui.import("kec20", "image", {
      "id": "users/biogeoscienceslaboxford/01KingEdwardCove1920"
    }) || ee.Image("users/biogeoscienceslaboxford/01KingEdwardCove1920"),
    LH27 = ui.import && ui.import("LH27", "image", {
      "id": "users/biogeoscienceslaboxford/01LarsenHarbour1927"
    }) || ee.Image("users/biogeoscienceslaboxford/01LarsenHarbour1927"),
    LH31 = ui.import && ui.import("LH31", "image", {
      "id": "users/biogeoscienceslaboxford/01LarsenHarbour1931"
    }) || ee.Image("users/biogeoscienceslaboxford/01LarsenHarbour1931"),
    Leith27 = ui.import && ui.import("Leith27", "image", {
      "id": "users/biogeoscienceslaboxford/01LeithHarbour1927"
    }) || ee.Image("users/biogeoscienceslaboxford/01LeithHarbour1927"),
    Leith31 = ui.import && ui.import("Leith31", "image", {
      "id": "users/biogeoscienceslaboxford/01LeithHarbour1931"
    }) || ee.Image("users/biogeoscienceslaboxford/01LeithHarbour1931"),
    Mai = ui.import && ui.import("Mai", "image", {
      "id": "users/biogeoscienceslaboxford/01Maiviken1929"
    }) || ee.Image("users/biogeoscienceslaboxford/01Maiviken1929"),
    MH = ui.import && ui.import("MH", "image", {
      "id": "users/biogeoscienceslaboxford/01MoltkeHarbour1882"
    }) || ee.Image("users/biogeoscienceslaboxford/01MoltkeHarbour1882"),
    PC = ui.import && ui.import("PC", "image", {
      "id": "users/biogeoscienceslaboxford/01PleasantCove1929"
    }) || ee.Image("users/biogeoscienceslaboxford/01PleasantCove1929"),
    PO = ui.import && ui.import("PO", "image", {
      "id": "users/biogeoscienceslaboxford/01PrinceOlaf1931"
    }) || ee.Image("users/biogeoscienceslaboxford/01PrinceOlaf1931"),
    POZ = ui.import && ui.import("POZ", "image", {
      "id": "users/biogeoscienceslaboxford/01PrinceOlaf193_zoom"
    }) || ee.Image("users/biogeoscienceslaboxford/01PrinceOlaf193_zoom"),
    RW = ui.import && ui.import("RW", "image", {
      "id": "users/biogeoscienceslaboxford/01RightWhaleBay1930"
    }) || ee.Image("users/biogeoscienceslaboxford/01RightWhaleBay1930"),
    RB = ui.import && ui.import("RB", "image", {
      "id": "users/biogeoscienceslaboxford/01RoyalBay1882"
    }) || ee.Image("users/biogeoscienceslaboxford/01RoyalBay1882"),
    SB = ui.import && ui.import("SB", "image", {
      "id": "users/biogeoscienceslaboxford/01StromnessBay1927"
    }) || ee.Image("users/biogeoscienceslaboxford/01StromnessBay1927"),
    UH27 = ui.import && ui.import("UH27", "image", {
      "id": "users/biogeoscienceslaboxford/01UndineHarbour1927"
    }) || ee.Image("users/biogeoscienceslaboxford/01UndineHarbour1927"),
    UH27Z = ui.import && ui.import("UH27Z", "image", {
      "id": "users/biogeoscienceslaboxford/01UndineHarbour1927_zoom"
    }) || ee.Image("users/biogeoscienceslaboxford/01UndineHarbour1927_zoom"),
    UH31 = ui.import && ui.import("UH31", "image", {
      "id": "users/biogeoscienceslaboxford/01UndineHarbour1931"
    }) || ee.Image("users/biogeoscienceslaboxford/01UndineHarbour1931"),
    WB = ui.import && ui.import("WB", "image", {
      "id": "users/biogeoscienceslaboxford/01WillisAndBirdIslands1931"
    }) || ee.Image("users/biogeoscienceslaboxford/01WillisAndBirdIslands1931"),
    SoM = ui.import && ui.import("SoM", "image", {
      "id": "users/biogeoscienceslaboxford/00_StraitOfMagellan_modified3"
    }) || ee.Image("users/biogeoscienceslaboxford/00_StraitOfMagellan_modified3"),
    scTdF = ui.import && ui.import("scTdF", "image", {
      "id": "users/biogeoscienceslaboxford/00_BeagleSouthCoastTdFmodified3857"
    }) || ee.Image("users/biogeoscienceslaboxford/00_BeagleSouthCoastTdFmodified3857"),
    Staten = ui.import && ui.import("Staten", "image", {
      "id": "users/biogeoscienceslaboxford/00_BeagleStatenIsland_3857"
    }) || ee.Image("users/biogeoscienceslaboxford/00_BeagleStatenIsland_3857"),
    SWcTdF = ui.import && ui.import("SWcTdF", "image", {
      "id": "users/biogeoscienceslaboxford/00_SouthweastCoastTierradelFuego_1829_30_3857"
    }) || ee.Image("users/biogeoscienceslaboxford/00_SouthweastCoastTierradelFuego_1829_30_3857"),
    GI = ui.import && ui.import("GI", "image", {
      "id": "users/biogeoscienceslaboxford/00_GoreeIsland_1834_3857"
    }) || ee.Image("users/biogeoscienceslaboxford/00_GoreeIsland_1834_3857"),
    WI = ui.import && ui.import("WI", "image", {
      "id": "users/biogeoscienceslaboxford/00_BeagleNorthEast_WollastonIs_3857"
    }) || ee.Image("users/biogeoscienceslaboxford/00_BeagleNorthEast_WollastonIs_3857"),
    ECTdF = ui.import && ui.import("ECTdF", "image", {
      "id": "users/biogeoscienceslaboxford/00_EastCoastofTierradelFuego1834_modified"
    }) || ee.Image("users/biogeoscienceslaboxford/00_EastCoastofTierradelFuego1834_modified"),
    WF = ui.import && ui.import("WF", "image", {
      "id": "users/biogeoscienceslaboxford/02_WestFalkland_3857"
    }) || ee.Image("users/biogeoscienceslaboxford/02_WestFalkland_3857"),
    EF = ui.import && ui.import("EF", "image", {
      "id": "users/biogeoscienceslaboxford/02_EastFalkland_3857"
    }) || ee.Image("users/biogeoscienceslaboxford/02_EastFalkland_3857"),
    PL = ui.import && ui.import("PL", "image", {
      "id": "users/biogeoscienceslaboxford/02_BeagleChart_PortLouis3857"
    }) || ee.Image("users/biogeoscienceslaboxford/02_BeagleChart_PortLouis3857"),
    PW = ui.import && ui.import("PW", "image", {
      "id": "users/biogeoscienceslaboxford/02_L279_PortWilliam_Falklands"
    }) || ee.Image("users/biogeoscienceslaboxford/02_L279_PortWilliam_Falklands"),
    mm = ui.import && ui.import("mm", "image", {
      "id": "users/biogeoscienceslaboxford/Falklands_3monthAverage20152019"
    }) || ee.Image("users/biogeoscienceslaboxford/Falklands_3monthAverage20152019"),
    Pata = ui.import && ui.import("Pata", "image", {
      "id": "users/biogeoscienceslaboxford/03_PatagoniaEastCoast"
    }) || ee.Image("users/biogeoscienceslaboxford/03_PatagoniaEastCoast"),
    Cha1 = ui.import && ui.import("Cha1", "image", {
      "id": "users/biogeoscienceslaboxford/ChannelsFjords_Mean20152019_1"
    }) || ee.Image("users/biogeoscienceslaboxford/ChannelsFjords_Mean20152019_1"),
    Cha2 = ui.import && ui.import("Cha2", "image", {
      "id": "users/biogeoscienceslaboxford/ChannelsFjords_Mean20152019_2"
    }) || ee.Image("users/biogeoscienceslaboxford/ChannelsFjords_Mean20152019_2"),
    Cha3 = ui.import && ui.import("Cha3", "image", {
      "id": "users/biogeoscienceslaboxford/ChannelsFjords_Mean20152019_3"
    }) || ee.Image("users/biogeoscienceslaboxford/ChannelsFjords_Mean20152019_3"),
    Cha4 = ui.import && ui.import("Cha4", "image", {
      "id": "users/biogeoscienceslaboxford/ChannelsFjords_Mean20152019_4"
    }) || ee.Image("users/biogeoscienceslaboxford/ChannelsFjords_Mean20152019_4"),
    Cha5 = ui.import && ui.import("Cha5", "image", {
      "id": "users/biogeoscienceslaboxford/ChannelsFjords_Mean20152019_5"
    }) || ee.Image("users/biogeoscienceslaboxford/ChannelsFjords_Mean20152019_5"),
    Chi = ui.import && ui.import("Chi", "image", {
      "id": "users/biogeoscienceslaboxford/Chiloense_Mean20152019"
    }) || ee.Image("users/biogeoscienceslaboxford/Chiloense_Mean20152019"),
    SG = ui.import && ui.import("SG", "image", {
      "id": "users/biogeoscienceslaboxford/SouthGeorgia_mean20162019"
    }) || ee.Image("users/biogeoscienceslaboxford/SouthGeorgia_mean20162019"),
    Falk = ui.import && ui.import("Falk", "image", {
      "id": "users/biogeoscienceslaboxford/Falklands_mean20152019"
    }) || ee.Image("users/biogeoscienceslaboxford/Falklands_mean20152019"),
    geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [],
      "displayProperties": [],
      "properties": {},
      "color": "#00ffff",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #00ffff */
    /* shown: false */
    ee.Geometry.MultiPoint(),
    geometry2 = ui.import && ui.import("geometry2", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -38.51121730130249,
                -53.79440009418473
              ],
              [
                -38.51121730130249,
                -55.08488678787792
              ],
              [
                -35.34715480130249,
                -55.08488678787792
              ],
              [
                -35.34715480130249,
                -53.79440009418473
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#bf04c2",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #bf04c2 */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[-38.51121730130249, -53.79440009418473],
          [-38.51121730130249, -55.08488678787792],
          [-35.34715480130249, -55.08488678787792],
          [-35.34715480130249, -53.79440009418473]]], null, false),
    chi = ui.import && ui.import("chi", "image", {
      "id": "users/biogeoscienceslaboxford/Chiloense_Mean20152019"
    }) || ee.Image("users/biogeoscienceslaboxford/Chiloense_Mean20152019"),
    ps = ui.import && ui.import("ps", "image", {
      "id": "users/biogeoscienceslaboxford/PataShelf_mean20152019"
    }) || ee.Image("users/biogeoscienceslaboxford/PataShelf_mean20152019"),
    dayton = ui.import && ui.import("dayton", "table", {
      "id": "users/biogeoscienceslaboxford/Dayton_kelp2"
    }) || ee.FeatureCollection("users/biogeoscienceslaboxford/Dayton_kelp2");
///Historic Subantartic Kelp
//Alejandra Mora and others, 2020
Map.setOptions('HYBRID');
//Map.setControlVisibility(null, null, false, false, false);
// Mosaic 2015-2019
var means20152019 = ee.ImageCollection([ Cha1, Cha2, Cha3, Cha4, Cha5, Chi]);//CB05,  kec05
//Patagonia
var Lowres = ee.ImageCollection([ECTdF,EE, SoM, SoME, SWcTdF, scTdF ] );
var Highres = ee.ImageCollection([WI, MC, GI, PB, Staten]);
Map.addLayer(Lowres, {}, 'Tierra del Fuego and Strait of Magellan');
Map.addLayer(Highres, {}, 'Cape Horn bays and Isla de los Estados');
Map.addLayer(means20152019, {min: 1, max: 10, palette: ['green', 'orange', 'red']}, 'Kelp presence Channels 2015-2019 mean');
//Map.addLayer(chi, {min: 0, max: 10, palette: ['green', 'orange', 'red']}, 'Chiloense')
//Falklands
var LowresF = ee.ImageCollection([WF, EF]);
//Map.addLayer(WF);
//Map.addLayer(EF);
Map.addLayer(LowresF, {}, 'West and East Falkland Is');
Map.addLayer(PW, {}, 'Port William (Stanley), Falkland Is');
Map.addLayer(PL, {min: 0, max:255}, 'Port Louis, Berkeley Sound, Falkland Is');
Map.addLayer(Falk, {min: 1, max: 10, palette: ['green', 'orange', 'red']}, 'Kelp presence Falkland Is 2015-2019 mean');
//Surveys
Map.addLayer(dayton, {}, 'Kelp surveys (decades 1970-1980)');
//South Georgia 
var col1882 = ee.ImageCollection([CB20, RB, MH, BoI, kec20]);//Fuera: CB05,  kec05
var col1925 = ee.ImageCollection([CB25,CB29,  SB, UH27, UH27Z, HH, BF,  JH, Mai, PC, LH27, Leith27]);
var col19301 = ee.ImageCollection([WB, CBuller, Else, RW, BW, FB, LH31, PO, POZ, UH31, Leith31 ]); 
Map.addLayer(col1882,  {}, 'SG Charts 1882-1920');
Map.addLayer(col1925, {}, 'SG Charts 1925-1929');
Map.addLayer(col19301, {}, 'SG Charts 1930-1931');
Map.addLayer(SG, {min: 1, max: 10, palette: ['green', 'orange', 'red']}, 'Kelp presence South Georgia 2016-2019 mean');
//Map.addLayer(sg_2016_2019, {min: 1, max: 10, palette: ['green', 'yellow', 'red']}, 'South Georgia Kelp 2016-2019 mean');
//var median = collection.reduce(ee.Reducer.median());
//Map.addLayer(chi, {min: 0, max: 10, palette: ['green', 'orange', 'red']}, 'Chiloense')
//var PS_winter19 = PS_winter19.multiply(512).uint8();
//var PS_spring19 = PS_spring19.multiply(512).uint8();
//Patagonia East Coast
Map.addLayer(Pata, {} ,'Port Desire, East Patagonia');
Map.addLayer(ps, {min: 1, max: 10, palette: ['green', 'orange', 'red']}, 'Kelp presence Patagonian Shelf 2016-2019 mean');
Map.setCenter(-54.678, -50.881, 5);
//////PANEL 
var title = ui.Label({
  value: 'The Beagle Kelp project', 
  style: {    fontSize: '20px',    fontWeight: 'bold',     maxWidth: '320px'  }});
var subtitle = ui.Label({
  value: 'Visualization of the UKHO Nautical Charts (1829-1931) and satellite-detected kelp forests in the Subantarctic ecoregions of Chilean Fjords, Falkland Islands (Islas Malvinas) and South Georgia.', 
  style: {    fontSize: '14px',    fontWeight: 'bold',     maxWidth: '320px'  }});
var subtitle2 = ui.Label({
  value: 'Click on the lists and adjust the transparency of the layers to explore. Kelp forests are indicated in colours according to their presence, from green (less) to red (more), between 2016 to 2019. Black points indicate previous surveys. Multiyear maps are listed below.',
  style: {    fontSize: '14px',  fontWeight: 'bold', color: 'blue',     maxWidth: '320px'  }});
var subtitle3 = ui.Label({
  value: 'Nautical Charts',
  style: {    fontSize: '14px',  fontWeight: 'bold',     maxWidth: '320px'  }});
var subtitle4 = ui.Label({
  value: 'Kelp surveys',
  style: {    fontSize: '14px',  fontWeight: 'bold',     maxWidth: '320px'  }});
var subtitle5 = ui.Label({
  value: 'Multiyear maps',
  style: {    fontSize: '14px',  fontWeight: 'bold',     maxWidth: '320px'  }});
var subtitle_references = ui.Label({
  value: 'References',
  style: {    fontSize: '14px',  fontWeight: 'bold',     maxWidth: '320px'  }});
var subtitle_dayton = ui.Label({
  value: 'Dayton, P. K. (1985). The structure and regulation of some South American kelp communities. Ecological monographs, 55(4), 447-468.',
  style: {    fontSize: '14px',     maxWidth: '320px'  }});
  var subtitle_so = ui.Label({
  value: 'Santelices, B., & Ojeda, F. P. (1984). Population dynamics of coastal forests Macrocystis pyrifera in Puerto Toro, Isla Navarino, Southern Chile. Marine ecology progress series. Oldendorf, 14(2), 175-183.',
  style: {    fontSize: '14px',     maxWidth: '320px'  }});
var subtitle_bvt = ui.Label({
  value: 'Van Tussenbroek, B. I. (1989). Observations on branched Macrocystis pyrifera (L.) C. Agardh (Laminariales, Phaeophyta) in the Falkland Islands. Phycologia, 28(2), 169-180.',
  style: {    fontSize: '14px',     maxWidth: '320px'  }});
  var subtitle_bvt2 = ui.Label({
  value: 'Van Tussenbroek, B. I. (1989). Morphological variations of Macrocystis pyrifera in the Falkland Islands in relation to environment and season. Marine Biology, 102(4), 545-556.',
  style: {    fontSize: '14px',     maxWidth: '320px'  }});
var author = ui.Label({
  value: 'Author: Alejandra Mora-Soto, DPhil Student in Geography and the Environment, University of Oxford (2020).', 
  style: {    fontSize: '14px',  fontWeight: 'bold', color: 'blue',   maxWidth: '320px'  }})  ;
//var collab = ui.Label({
  //value: 'This is a collaborative transoceanic project, made with data and help from Austin Capsey (UKHO), Alan M. Friedlander (National Geographic  Neil Golding and Paul Brewin (SAERI), Paul Dayton (UCSD), Giles Richardson (MAST), Daphne Damm (Puerto Natales), Tom Hart and Nacho Juárez (Zoology, Oxford), Mauricio Palacios (UACh, UMAG). AMS Thesis is supervised by Marc Macias-Fauria (Geography, Oxford). Last update: July 2020. ',
  //style: {    fontSize: '14px',   color: 'blue',  maxWidth: '320px'  }}) ; 
// collaborations from Marc Macias-Fauria, (Biogeosciences Lab, University of Oxford),  Catalina Velasco (U. de Magallanes), Alan Friedlander and Whitney Goodell (NatGeo), Tom Hart and Nacho Juárez (Zoology, Oxford), 
//South America
var places = {
'Freshwater Bay, Strait of Magellan 1834': [-70.9448, -53.376],
  'Guanaco Point, Navarino Island': [-67.194, -55.2932], 
  'Laredo Bay, Strait of Magellan 1834': [-70.7781, -52.9285],
  'Middle Cove, Wollaston Island 1834': [-67.3623, -55.5969],
   'Packsaddle Bay, Hardy Peninsula 1834': [-68.0925, -55.4404], 
    'Thetis Bay, Tierra del Fuego 1834 (Unclick Isla de los Estados)' : [-65.20478, -54.6303],
   'Wollaston Island 1834' : [-67.29862, -55.72824],
};
var select = ui.Select({
  items: Object.keys(places),
  onChange: function(key) {
    Map.setCenter(places[key][0], places[key][1], 11)},
  style: {    fontSize: '18px',     fontWeight: 'bold',     maxWidth: '320px'  }
});
// Set a place holder.
select.setPlaceholder('South America');
//Falklands
var places2 = {
'Port Louis in Berkeley Sound, Falklands 1835': [-58.0243, -51.5513], 
'Port William, Falklands 1834': [-57.7731, -51.6654], 
'Kelp Point, Falklands 1834': [-58.1848, -51.8659], 
'Sea Lion, Falklands 1834': [-59.0169, -52.4347], 
'New Island, Falklands 1834': [-61.2798, -51.7375],
'Jason Islands, Falklands 1834': [-61.1285, -51.0641]
};
var select2 = ui.Select({
  items: Object.keys(places2),
  onChange: function(key) {
    Map.setCenter(places2[key][0], places2[key][1],11);
  }
});
select2.setPlaceholder('Falkland Islands (Malvinas)');
//South Georgia
var places3 = {
  'Bay of Isles, 1914': [-37.2875, -54.023],
  'Blue Whale Harbour 1931': [-37.01362, -54.0721], 
  //'Cook Bay': [-37.12275, -54.05797],
  'Elsehul 1930': [-37.96828, -54.02091],
  'Fortuna Bay 1931': [-36.8018, -54.1353], 
  'Jason Harbour 1929': [-36.57443, -54.19904],
  'Husvik Harbour 1928': [-36.69622, -54.18096],
  'King Edward Cove 1920': [-36.49872, -54.28393],
  'Larsen Harbour 1927 1931': [-36.00687, -54.83555], 
  'Leith Harbour 1927 1931': [-36.67658, -54.14407], 
  'Maiviken 1929' : [-36.50596, -54.24565],
  'Moltke Harbour 1882': [-36.07298, -54.52385], 
  'Pleasant Cove 1929': [-36.298, -54.2789], 
  'Prince Olaf Harbour 1931': [-37.15159, -54.06059], 
  'Right Whale Bay 1930': [-37.67223, -54.00723],
 // 'Royal Bay 1882' : [-36.0496, -54.553],
'Undine Harbour 1927': [-37.96093, -54.03788], 
'Willis and Bird Islands 1931': [-38.0498, -54.0061]
};
var select3 = ui.Select({
  items: Object.keys(places3),
  onChange: function(key) {
    Map.setCenter(places3[key][0], places3[key][1],12);
  }
});
select3.setPlaceholder('South Georgia');
//Patagonia
var places4 = {
  'Port Desire 1834': [-65.87398, -47.76667],
};
var select4 = ui.Select({
  items: Object.keys(places4),
  onChange: function(key) {
    Map.setCenter(places4[key][0], places4[key][1], 10);
  }
});
select4.setPlaceholder('Patagonia- Port Desire');
// Surveys
//Paul Dayton 1972-63
var places5 = {
  'Puerto Lasserre (exposed)': [-63.8606, -54.7314],
'Puerto Cook (exposed)': [-63.9969, -54.7331],
'Puerto Back (exposed)': [-63.8888, -54.7799],
'Puerto Vancouver (exposed)': [-64.0739, -54.7881],
'Isla Colnett (exposed)': [-64.2332, -54.7285],
'Bahia Colnett (exposed)': [-64.3337, -54.6992],
'Bahia Santa Antonia (exposed)': [-64.5136, -54.7405],
'Isla Alexander (exposed)': [-64.398, -54.833],
'Bahia Crossley(exposed)': [-64.6995, -54.7924],
'Bahia Thetis (exposed)': [-65.2245, -54.6338],
'Bahia Valentin (exposed)': [-65.4827, -54.8969],
'Bahia Sloggett (exposed)': [-66.3956, -55.0117],
'Cta Awaia Kirrh (Sheltered)': [-69.0366, -55.0002],
'Canal Ocasion (Sheltered)': [-71.9956, -54.5563],
'Punta Valparaiso (Sheltered)': [-71.3614, -54.369],
'Isla Carlos III (Sheltered)': [-72.2468, -53.6566],
'Bahia Campana (Sheltered)': [-70.817, -53.9328], 
'Isla Stratford (Sheltered)': [-74.7984, -50.19163], 
'Bahia Tom (Sheltered)': [-74.79831, -50.1874], 
'Puerto Eden (Sheltered)': [-74.43663, -49.16329], 
'Isla Scout (Exposed)': [-74.673, -47.959], 
'Isla San Pedro (Exposed)': [-74.888, -47.7195], 
'Isla Waller (Sheltered)': [-75.2614, -46.8063], 
'Isla Baja (Sheltered)': [-75.2532, -46.716], 
'Isla Cono (Exposed)': [-75.5048, -46.5884], 
'Isla Luz (Sheltered)': [-73.92667, -45.45346], 
'Punta Quinlan (Exposed)': [-74.1338, -45.392], 
'Canal Unicornio (Sheltered)': [-74.2642, -45.405], 
'Isla Auchilu (Exposed)': [-74.5545, -45.3434], 
'Isla Tres Dedos (Exposed)': [-74.5551, -45.3028], 
'Isla Camiao (Exposed)': [-73.2596, -43.913], 
'Isla Campos (Exposed)': [-73.6565, -43.9061], 
'Punta Puquitin (Exposed)': [-73.7863, -43.8322], 
'Isla Marta (Exposed)': [-74.0019, -43.7975], 
'Isla San Pedro- Corcovado (Exposed)': [-73.6831, -43.3723], 
'Isla Acui (Exposed)': [-73.4458, -42.9207], 
'Punta Lelbun (Exposed)': [-73.5042, -42.7817], 
};
var select5 = ui.Select({
  items: Object.keys(places5),
  onChange: function(key) {
    Map.setCenter(places5[key][0], places5[key][1], 12);
  }
});
select5.setPlaceholder('Dayton Surveys, 1972-1973');
var placesb = {
  'Stanley Harbour (protected)': [-57.867, -51.69033],
    'Kelly Rocks (exposed)': [-57.76068, -51.67341],
     'Berkeley Sound': [-58.1652, -51.5452],
      'White Rock Bay': [-59.3465, -51.5185],
   'Pebble Island': [-59.4708, -51.3167],
    'Saunders Island': [-60.0785, -51.37],
    'West Point Island': [-60.6816, -51.34],
    'Beaver Island': [-61.2044, -51.8269],
'Fox Bay': [-60.0767, -51.963],
};
var selectbvt = ui.Select({
  items: Object.keys(placesb),
  onChange: function(keyb) {
    Map.setCenter(placesb[keyb][0], placesb[keyb][1], 12);
  }
});
selectbvt.setPlaceholder('van Tussenbroek, 1985-1987');
var placestoro = {
  'Puerto Toro, Navarino Island': [-67.07359, -55.07645],
};
var selecttoro = ui.Select({
  items: Object.keys(placestoro),
  onChange: function(keyt) {
    Map.setCenter(placestoro[keyt][0], placestoro[keyt][1], 12);
    }});
selecttoro.setPlaceholder('Moreno, Ojeda, Santelices, Jara, 1979-1980');
var style_header = {fontSize: '13px',    fontWeight: 'bold',  width:'300px',  maxWidth: '320px', backgroundColor: 'lightblue', padding: '5px', margin: '15px 0 0 10px '};
var map_af = ui.Label('Freshwater- Aguafresca',style_header , 'https://biogeoscienceslaboxford.users.earthengine.app/view/beaglekelpaguafresca');
var map_go = ui.Label('Goeree Roads',style_header , 'https://biogeoscienceslaboxford.users.earthengine.app/view/beaglekelpgoereeroads');
var map_la = ui.Label('Laredo Peninsula',style_header , 'https://biogeoscienceslaboxford.users.earthengine.app/view/beaglekelplaredo');
var map_mi = ui.Label('Mitre Peninsula',style_header , 'https://biogeoscienceslaboxford.users.earthengine.app/view/beaglekelpmitre');
var map_pa = ui.Label('Packsaddle Bay',style_header , 'https://biogeoscienceslaboxford.users.earthengine.app/view/beaglekelppacksaddle');
var map_wo = ui.Label('Wollaston Island',style_header , 'https://biogeoscienceslaboxford.users.earthengine.app/view/beaglekelpwollaston');
var map_de = ui.Label('Port Desire',style_header , 'https://biogeoscienceslaboxford.users.earthengine.app/view/beaglekelpdeseado');
var map_sg = ui.Label('South Georgia',style_header , 'https://biogeoscienceslaboxford.users.earthengine.app/view/beaglekelpsouthgeorgia');
var map_fa = ui.Label('Falkland Islands (Malvinas)',style_header , 'https://biogeoscienceslaboxford.users.earthengine.app/view/beaglekelpfalklands');
var panel = ui.Panel();
panel.add(title);
panel.add(subtitle);
panel.add(subtitle2);
panel.add(subtitle3);
panel.add(select);
panel.add(select2);
panel.add(select3);
panel.add(select4);
panel.add(subtitle4);
panel.add(select5);
panel.add(selectbvt);
panel.add(selecttoro);
panel.add(subtitle5);
panel.add(map_af);
panel.add(map_go);
panel.add(map_la);
panel.add(map_mi);
panel.add(map_pa);
panel.add(map_wo);
panel.add(map_de);
panel.add(map_sg);
panel.add(map_fa);
panel.add(subtitle_references);
panel.add(subtitle_dayton);
panel.add(subtitle_so);
panel.add(subtitle_bvt);
panel.add(subtitle_bvt2);
panel.add(author);
//panel.add(collab);
ui.root.add(panel);
/*
Map.addLayer(BF)
Map.addLayer(BoI)
Map.addLayer(BW)
Map.addLayer(CBuller)
Map.addLayer(CB05)
Map.addLayer(CB20)
Map.addLayer(CB25)
Map.addLayer(CB29)
Map.addLayer(Else)
Map.addLayer(FB)
Map.addLayer(HH)
Map.addLayer(JH)
Map.addLayer(kec05)
Map.addLayer(kec20)
Map.addLayer(LH27)
Map.addLayer(LH31)
Map.addLayer(Leith27)
Map.addLayer(Leith31)
Map.addLayer(Mai)
Map.addLayer(MH)
Map.addLayer(PC)
Map.addLayer(PO)
Map.addLayer(POZ)
Map.addLayer(RW)
Map.addLayer(RB)
Map.addLayer(SB)
Map.addLayer(UH27)
Map.addLayer(UH27Z)
Map.addLayer(UH31)
Map.addLayer(WB)
Map.centerObject(LH27)
*/
 //Map.addLayer(EE);
//Map.addLayer(SoM);
//Map.addLayer(SoME);
//Map.addLayer(scTdF);
//Map.addLayer(ECTdF);
//Map.addLayer(Staten);
//Map.addLayer(SWcTdF);
//Map.addLayer(MC);
//Map.addLayer(GI);
//Map.addLayer(WI);
//Map.addLayer(PB);
/*
var sg2016 = ee.ImageCollection([sg_2016_01, sg_2016_02, sg_2016_b]);//
var sg2017 = ee.ImageCollection([sg_2017_01, sg_2017_02, sg_2017_b]);//
var sg2018 = ee.ImageCollection([sg_2018_01, sg_2018_02, sg_2018_b]);//
var sg2019 = ee.ImageCollection([sg_2019_01, sg_2019_02, sg_2019_b]);//
*/
/*
Export.image.toAsset({
  image: sg_2016_2019 , 
  description: 'SouthGeorgia_mean20162019', 
  region: geometry2, 
  scale: 20, 
  maxPixels: 1e13
  })
*/