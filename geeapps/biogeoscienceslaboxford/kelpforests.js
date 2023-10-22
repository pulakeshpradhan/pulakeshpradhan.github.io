var alos = ui.import && ui.import("alos", "image", {
      "id": "JAXA/ALOS/AW3D30_V1_1"
    }) || ee.Image("JAXA/ALOS/AW3D30_V1_1"),
    Alaska19 = ui.import && ui.import("Alaska19", "image", {
      "id": "users/biogeoscienceslaboxford/AlaskaOct19"
    }) || ee.Image("users/biogeoscienceslaboxford/AlaskaOct19"),
    Anchorage19 = ui.import && ui.import("Anchorage19", "image", {
      "id": "users/biogeoscienceslaboxford/AnchorageOct19"
    }) || ee.Image("users/biogeoscienceslaboxford/AnchorageOct19"),
    Antipodes19 = ui.import && ui.import("Antipodes19", "image", {
      "id": "users/biogeoscienceslaboxford/AntipodesOct19"
    }) || ee.Image("users/biogeoscienceslaboxford/AntipodesOct19"),
    Arequipa19 = ui.import && ui.import("Arequipa19", "image", {
      "id": "users/biogeoscienceslaboxford/ArequipaOct19"
    }) || ee.Image("users/biogeoscienceslaboxford/ArequipaOct19"),
    Auckland19 = ui.import && ui.import("Auckland19", "image", {
      "id": "users/biogeoscienceslaboxford/AucklandOct19"
    }) || ee.Image("users/biogeoscienceslaboxford/AucklandOct19"),
    BajaCali19 = ui.import && ui.import("BajaCali19", "image", {
      "id": "users/biogeoscienceslaboxford/BajaCaliOct19"
    }) || ee.Image("users/biogeoscienceslaboxford/BajaCaliOct19"),
    BC19 = ui.import && ui.import("BC19", "image", {
      "id": "users/biogeoscienceslaboxford/BritishColumbiaOct19"
    }) || ee.Image("users/biogeoscienceslaboxford/BritishColumbiaOct19"),
    Cali19 = ui.import && ui.import("Cali19", "image", {
      "id": "users/biogeoscienceslaboxford/CaliforniaOct19"
    }) || ee.Image("users/biogeoscienceslaboxford/CaliforniaOct19"),
    Campbell19 = ui.import && ui.import("Campbell19", "image", {
      "id": "users/biogeoscienceslaboxford/CampbellOct19"
    }) || ee.Image("users/biogeoscienceslaboxford/CampbellOct19"),
    CChile19 = ui.import && ui.import("CChile19", "image", {
      "id": "users/biogeoscienceslaboxford/CentralChileOct19"
    }) || ee.Image("users/biogeoscienceslaboxford/CentralChileOct19"),
    Chatham19 = ui.import && ui.import("Chatham19", "image", {
      "id": "users/biogeoscienceslaboxford/ChathamOct19"
    }) || ee.Image("users/biogeoscienceslaboxford/ChathamOct19"),
    Crozet19 = ui.import && ui.import("Crozet19", "image", {
      "id": "users/biogeoscienceslaboxford/CrozetOct19"
    }) || ee.Image("users/biogeoscienceslaboxford/CrozetOct19"),
    ESA19 = ui.import && ui.import("ESA19", "image", {
      "id": "users/biogeoscienceslaboxford/EastSouthAfricaOct19"
    }) || ee.Image("users/biogeoscienceslaboxford/EastSouthAfricaOct19"),
    Falklands19 = ui.import && ui.import("Falklands19", "image", {
      "id": "users/biogeoscienceslaboxford/FalklandsOct19"
    }) || ee.Image("users/biogeoscienceslaboxford/FalklandsOct19"),
    Gough19 = ui.import && ui.import("Gough19", "image", {
      "id": "users/biogeoscienceslaboxford/GoughOct19"
    }) || ee.Image("users/biogeoscienceslaboxford/GoughOct19"),
    HeardMD19 = ui.import && ui.import("HeardMD19", "image", {
      "id": "users/biogeoscienceslaboxford/HeardMDOct19"
    }) || ee.Image("users/biogeoscienceslaboxford/HeardMDOct19"),
    Kerguelen19 = ui.import && ui.import("Kerguelen19", "image", {
      "id": "users/biogeoscienceslaboxford/KerguelenOct19"
    }) || ee.Image("users/biogeoscienceslaboxford/KerguelenOct19"),
    Kodiak19 = ui.import && ui.import("Kodiak19", "image", {
      "id": "users/biogeoscienceslaboxford/KodiakIsOct19"
    }) || ee.Image("users/biogeoscienceslaboxford/KodiakIsOct19"),
    Lima19 = ui.import && ui.import("Lima19", "image", {
      "id": "users/biogeoscienceslaboxford/LimaOct19"
    }) || ee.Image("users/biogeoscienceslaboxford/LimaOct19"),
    Macquarie19 = ui.import && ui.import("Macquarie19", "image", {
      "id": "users/biogeoscienceslaboxford/MacquarieOct19"
    }) || ee.Image("users/biogeoscienceslaboxford/MacquarieOct19"),
    Melbourne19 = ui.import && ui.import("Melbourne19", "image", {
      "id": "users/biogeoscienceslaboxford/MelbourneOct19"
    }) || ee.Image("users/biogeoscienceslaboxford/MelbourneOct19"),
    NWSG19 = ui.import && ui.import("NWSG19", "image", {
      "id": "users/biogeoscienceslaboxford/NWSouthGeorgiaOct19"
    }) || ee.Image("users/biogeoscienceslaboxford/NWSouthGeorgiaOct19"),
    NZN19 = ui.import && ui.import("NZN19", "image", {
      "id": "users/biogeoscienceslaboxford/NZNorteOct19"
    }) || ee.Image("users/biogeoscienceslaboxford/NZNorteOct19"),
    NZS19 = ui.import && ui.import("NZS19", "image", {
      "id": "users/biogeoscienceslaboxford/NZSurOct19"
    }) || ee.Image("users/biogeoscienceslaboxford/NZSurOct19"),
    Namibia19 = ui.import && ui.import("Namibia19", "image", {
      "id": "users/biogeoscienceslaboxford/NamibiaOct19"
    }) || ee.Image("users/biogeoscienceslaboxford/NamibiaOct19"),
    Oregon19 = ui.import && ui.import("Oregon19", "image", {
      "id": "users/biogeoscienceslaboxford/OregonOct19"
    }) || ee.Image("users/biogeoscienceslaboxford/OregonOct19"),
    Patagonia19 = ui.import && ui.import("Patagonia19", "image", {
      "id": "users/biogeoscienceslaboxford/PatagoniaOct19"
    }) || ee.Image("users/biogeoscienceslaboxford/PatagoniaOct19"),
    PEdward19 = ui.import && ui.import("PEdward19", "image", {
      "id": "users/biogeoscienceslaboxford/PrinceEdwardOct19"
    }) || ee.Image("users/biogeoscienceslaboxford/PrinceEdwardOct19"),
    SG19 = ui.import && ui.import("SG19", "image", {
      "id": "users/biogeoscienceslaboxford/SGOct19"
    }) || ee.Image("users/biogeoscienceslaboxford/SGOct19"),
    Tasmania19 = ui.import && ui.import("Tasmania19", "image", {
      "id": "users/biogeoscienceslaboxford/TasmaniaOct19"
    }) || ee.Image("users/biogeoscienceslaboxford/TasmaniaOct19"),
    TDF19 = ui.import && ui.import("TDF19", "image", {
      "id": "users/biogeoscienceslaboxford/TierradelFuegoOct19"
    }) || ee.Image("users/biogeoscienceslaboxford/TierradelFuegoOct19"),
    Diego19 = ui.import && ui.import("Diego19", "image", {
      "id": "users/biogeoscienceslaboxford/DiegoRamirezOCT19"
    }) || ee.Image("users/biogeoscienceslaboxford/DiegoRamirezOCT19"),
    Tristan19 = ui.import && ui.import("Tristan19", "image", {
      "id": "users/biogeoscienceslaboxford/TristanOct19"
    }) || ee.Image("users/biogeoscienceslaboxford/TristanOct19"),
    ox_logo = ui.import && ui.import("ox_logo", "image", {
      "id": "users/biogeoscienceslaboxford/ox_logo"
    }) || ee.Image("users/biogeoscienceslaboxford/ox_logo"),
    table = ui.import && ui.import("table", "table", {
      "id": "users/biogeoscienceslaboxford/Sitios_TODOS_2019_EPSG3857_31Jan20"
    }) || ee.FeatureCollection("users/biogeoscienceslaboxford/Sitios_TODOS_2019_EPSG3857_31Jan20");
//Custom blue background
var customblue =[    {
        "featureType": "all",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#95a3c2"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "gamma": 0.01
            },
            {
                "lightness": 20
            },
            {
                "weight": "1.39"
            },
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "weight": "0.96"
            },
            {
                "saturation": "9"
            },
            {
                "visibility": "on"
            },
            {
                "color": "#000000"
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
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [
            {
                "lightness": 30
            },
            {
                "saturation": "9"
            },
            {
                "color": "#99c4a5"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "saturation": 20
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
            {
                "lightness": 20
            },
            {
                "saturation": -20
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
            {
                "lightness": 10
            },
            {
                "saturation": -30
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#193a55"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "saturation": 25
            },
            {
                "lightness": 25
            },
            {
                "weight": "0.01"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "lightness": -20
            }
        ]
    }
]
//Map.setOptions('Custom', {'Custom': customblue});
Map.setOptions('HYBRID');
//Map.setControlVisibility(null, null, false, false, false)
/////Global KDI - Final Map (Nov 2018) /////////////////////
var alos = alos.select('AVE')
var bgcolor = '#99ccff';
var text_bg_color = '#002147';
var text_fg_color = '#ffffff';
var style1 = {fontSize: '13px',    fontWeight: 'bold',    maxWidth: '320px', backgroundColor: text_bg_color, color: text_fg_color};
var style_withBorder = {fontSize: '13px',    fontWeight: 'bold',  width:'300px',  maxWidth: '320px', backgroundColor: text_bg_color, color: text_fg_color,  border: '1px solid white', padding: '5px'};
var style_header = {fontSize: '13px',    fontWeight: 'bold',  width:'300px',  maxWidth: '320px', backgroundColor: text_fg_color, color: text_bg_color, padding: '5px', margin: '15px 0 0 10px '};
//////Mosaic///////////////////////////////////////////////
var mosaic = ee.ImageCollection([Alaska19, Anchorage19, Antipodes19, Arequipa19, BajaCali19, BC19, 
Campbell19, Cali19, CChile19, Chatham19, Crozet19, Diego19, ESA19, Falklands19, Gough19, HeardMD19, Kerguelen19, 
Kodiak19 , Lima19 , Macquarie19, Melbourne19, NWSG19, NZN19, NZS19, Namibia19, Oregon19, 
Patagonia19, PEdward19, SG19, Tasmania19, TDF19, 
Auckland19, Tristan19]).map(function(image) {
    return image.multiply(512).uint8();
  }).mosaic();
var alos0 = alos.eq(0)
Map.addLayer(alos0, {}, 'watermask', false)
Map.addLayer(mosaic, {min: 1, max: 15, palette: [ 'darkgreen', 'green', 'yellow', 'orange', 'red', 'darkred']}, 'Kelp mosaic'); // False positives masked off
//##############Panel + widgets####################
var title = ui.Label({
  value: 'Global map of giant kelp forests', 
  style: {    fontSize: '20px',    fontWeight: 'bold',     maxWidth: '320px', backgroundColor: text_fg_color, color: text_bg_color , border:'1px solid white', padding: '5px'}});
/*var ox_logo = ui.Thumbnail({
   image: 'https://drive.google.com/file/d/1qc2AJL146NUS3-0KZKLMG8idEygq7WED/view?usp=sharing',
   params: {
     dimensions: '256x256',
     region: box,
     format: 'png'
   },
   style: {height: '300px', width: '300px'}
});*/
var subtitle = ui.Label({
  value: 'This is a map of the extension of the giant kelp, Macrocystis pyrifera. Click on "Fly to" to have a closer look. If you click on a pixel, you would see the value of the pixel (Kelp Difference or KD) on the top of the map. The colour legend is below the list of places.', 
  style: {    fontSize: '13px',    fontWeight: 'bold',    maxWidth: '320px', backgroundColor: text_bg_color, color: text_fg_color}});
var subtitle11 = ui.Label({
  value: 'Points = Forests observed and recorded in surveys and/or research.', 
  style: {    fontSize: '12px',    fontWeight: 'bold',    maxWidth: '320px', backgroundColor: text_bg_color, color: text_fg_color  }});
var subtitle10 = ui.Label({
  value: 'Fly to:', 
  style: style_header});
var subtitle2 = ui.Label({
  value: 'Disclaimer: Pixels may include some degree of omission due to topography errors or areas with high tidal ranges. There can be commission errors due to other photosynthetic organisms in estuarial areas. Pixels show a permanent presence of kelp within the same area over 4 years; phenological and seasonal changes are not represented. Areas smaller than 40m in diameter or 1 hectare in area could not be represented.',
  style: {    fontSize: '13px',    fontWeight: 'bold',    maxWidth: '320px', backgroundColor: text_bg_color, color: text_fg_color  }});
var subtitle4 = ui.Label({
  value: 'Methodology headlines: Kelp Difference (KD) applied in Sentinel2-L1C images, averaged from 26 Jun 2015 to 23 Jun 2019. Pixel size: 10m. KD is rescaled in 0-255.', 
  style: {    fontSize: '13px',    fontWeight: 'bold',    maxWidth: '320px', backgroundColor: text_bg_color, color: text_fg_color  }});
var subtitle3 = ui.Label(
  'Created and developed by Alejandra Mora-Soto, DPhil Student in Geography and the Environment, University of Oxford.', 
  {    fontSize: '13px',    fontWeight: 'bold',    maxWidth: '320px',    backgroundColor: text_bg_color, color: text_fg_color});
var subtitle3_email = ui.Label('alejandra.morasoto@ouce.ox.ac.uk',style1,'mailto:alejandra.morasoto@ouce.ox.ac.uk');
var subtitle23_howToCite = ui.Label('HOW TO CITE: ', style_header);  
var subtitle23 = ui.Label(
  'Mora-Soto, A.; Palacios, M.; Macaya, E.C.; Gómez, I.; Huovinen, P.; Pérez-Matus, A.; Young, M.; Golding, N.; Toro, M.; Yaqub, M.; Macias-Fauria, M. A High-Resolution Global Map of Giant Kelp (Macrocystis pyrifera) Forests and Intertidal Green Algae (Ulvophyceae) with Sentinel-2 Imagery. Remote Sens. 2020, 12, 694.', 
  style1
  );
  var subtitle23_link = ui.Label('Research Paper: Click here',style_header , 'https://www.mdpi.com/2072-4292/12/4/694');
var subtitle5 = ui.Label({
  value: 'Colours per pixel: ', 
  style: style_header});
var subtitle6 = ui.Label({
  value: 'Red (KD 11 or higher): Dense Macrocystis pyrifera canopies throughout the period of study (2017–2019).', 
  style: {    fontSize: '13px',    fontWeight: 'bold',    maxWidth: '320px',    color: 'red', backgroundColor: text_bg_color, border: '1px solid red', padding:'5px' }});
var subtitle7 = ui.Label({
  value: 'Yellow (KD 6 – 10): Canopies of medium density and/or less permanent.', 
  style: {
    fontSize: '13px',    fontWeight: 'bold',    maxWidth: '320px',    color: 'orange', backgroundColor: text_bg_color, border: '1px solid orange', padding:'5px'  }});
var subtitle8 = ui.Label({
 value: 'Green (KD 1 – 5): Canopies of low density or less permanent.', 
 style: {
   fontSize: '13px',
    fontWeight: 'bold',
    maxWidth: '320px',
    color: 'green',
    backgroundColor: text_bg_color, border: '1px solid green', padding:'5px'
  }
});
var subtitle9 = ui.Label({
  value: 'Map range: Chile, Argentina from Valdes Peninsula to Tierra del Fuego, Southern Islands from Tristan da Cunha (11°S) to South Georgia (54°S), South Africa (up to 24°S), Tasmania and New Zealand.', 
  style: {
    fontSize: '13px',
    fontWeight: 'bold',
    maxWidth: '320px'
  }
});
var subtitle12 = ui.Label({
  value: 'References (secondary data)', 
  style: style_header});
var subtitle30 = ui.Label({
  value: 'Buschmann, A. H., Vásquez, J. A., Osorio, P., Reyes, E., Filún, L., Hernández-González, M. C., & Vega, A. (2004). The effect of water movement, temperature and salinity on abundance and reproductive patterns of Macrocystis spp.(Phaeophyta) at different latitudes in Chile. Marine Biology, 145(5), 849-862.',   
  style: style_withBorder});
var subtitle34 = ui.Label({
  value: 'Cavanaugh, K. C., Siegel, D. A., Kinlan, B. P., & Reed, D. C. (2010). Scaling giant kelp field measurements to regional scales using satellite observations. Marine Ecology Progress Series, 403, 13-27.',   
  style: style_withBorder});
var subtitle32 = ui.Label({
  value: 'Friedlander, A. M., Ballesteros, E., Bell, T. W., Giddens, J., Henning, B., Hüne, M., ... & Sala, E. (2018). Marine biodiversity at the end of the world: Cape Horn and Diego Ramírez islands. PloS one, 13(1).',   
  style: style_withBorder});
var subtitle17 = ui.Label({
  value: 'Golding. N, & Black. B., 2020.  Final Report from the DPLUS065 Mapping Falklands and South Georgia coastal margins for spatial planning project.  SAERI. 81pp', 
  style: style_withBorder});
var subtitle13 = ui.Label({
  value: 'Institute for Marine and Antarctic Studies, University of Tasmania (2017). Seamap Australia: National Benthic Habitat Classification Scheme. Available at: https://seamapaustralia.org/',   style: style_withBorder});
var subtitle14 = ui.Label({
  value: 'Macaya, E. C., & Zuccarello, G. C. (2010). Dna barcoding and genetic divergence in the giant kelp Macrocystis. Journal of Phycology, 46(4), 736. doi:10.1111/j.1529-8817.2010.00845.x', 
  style: style_withBorder});
var subtitle15 = ui.Label({
  value: 'Mansilla, A. & Avila, M. (2007). Bases biológicas para el manejo de macroalgas pardas en la XII Región. Proyecto FIP 2005-44, Chile', 
  style: style_withBorder});
var subtitle28 = ui.Label({
  value: 'Mansilla, A., Ávila, M., Ramírez, M. E., Rodriguez, J. P., Rosenfeld, S., Ojeda, J., & Marambio, J. (2013). Macroalgas marinas bentónicas del submareal somero de la ecorregión subantártica de Magallanes, Chile. In Anales del Instituto de la Patagonia (Vol. 41, No. 2, pp. 51-64). Universidad de Magallanes.', 
  style: style_withBorder});
var subtitle25 = ui.Label({
  value: 'Nijland, W., Reshitnyk, L., & Rubidge, E. (2019). Satellite remote sensing of canopy-forming kelp on a complex coastline: A novel procedure using the Landsat image archive. Remote sensing of environment, 220, 41-50.', 
  style: style_withBorder});
var subtitle29 = ui.Label({
  value: 'Pérez-Matus, A., Ferry-Graham, L. A., Cea, A., & Vásquez, J. A. (2008). Community structure of temperate reef fishes in kelp-dominated subtidal habitats of northern Chile. Marine and Freshwater Research, 58(12), 1069-1085.', 
  style: style_withBorder});
var subtitle16 = ui.Label({
  value: 'Pérez Matus, A., Hiriart-Bertrand, L., Fernandez, I., Silva, J.A., Mora A. (2017) Evaluación ecológica de la Anchoveta y los hábitas costeros dominados por Macroalgas pardas en el norte grande de Chile: Mejorando el conocimiento ecosistémico para el manejo pesquero. Informe técnico para Oceana Chile.', 
  style: style_withBorder});
var subtitle26 = ui.Label({
  value: 'Pfister, C. A., Berry, H. D., & Mumford, T. (2018). The dynamics of kelp forests in the Northeast Pacific Ocean and the relationship with environmental drivers. Journal of Ecology, 106(4), 1520-1533.', 
  style: style_withBorder});
var subtitle31 = ui.Label({
  value: 'Schiel, D. R., & Foster, M. S. (2015). The biology and ecology of giant kelp forests. Univ of California Press.', 
  style: style_withBorder});
var subtitle18 = ui.Label({
  value: 'References (primary data)', 
  style: style_header});
var subtitle19 = ui.Label({
  value: 'Hamamé, M., Betti. F., Mora-Soto A. Centro de Estudios de la Patagonia (CIEP) (2018-2019) Puyuhuapi and Canal Magdalena surveys', 
  style: style_withBorder});
var subtitle20 = ui.Label({
  value: 'Hüne, M., Luchsinger, F., Fundación Ictiológica (2019) Cape Horn and Beagle Channel surveys', 
  style: style_withBorder});  
var subtitle21 = ui.Label({
  value: 'Macaya, E. C. (2010-2019). World surveys.', 
  style: style_withBorder});
var subtitle22 = ui.Label({
   value: 'Drone surveys in Chile: @Alejandra Mora-Soto. Fieldwork was funded by CONICYT (scholarship 296776-21171029 awarded to M. Palacios), Centro de Investigación de Ecosistemas Marinos de Altas Latitudes (FONDAP – IDEAL grant 15150003 from CONICYT), Centro de Investigación de Ecosistemas de la Patagonia (CIEP), South Atlantic Environmental Research Institute (SAERI), the School of Geography and the Environment - University of Oxford, St Peter’s College (Graduate Awards) and Santander Academic Travel Awards. This research is part of A.M-S’s PhD funded by CONICYT- Becas Chile.', 
  style: style_withBorder});
var subtitle27 = ui.Label({
  value: 'Drone surveys in the Tussac Islands: © SAERI, 2019.  This imagery was collected by the DPLUS065 Coastal Habitat Mapping project, grant aided by the Darwin Initiative through UK Government funding.',   style:style_withBorder});
var subtitle33 = ui.Label({
  value: 'Last update: 01 Apr 2021',  
  style:style1});
var places = {
//Chile
'Hornos Island, Cape Horn Archipelago (Chile)' : [-67.2247, -55.96118],
'Grevy Island, Cape Horn Archipelago (Chile)': [-67.59029, -55.58931],
'Orange Bay, Hardy Peninsula (Chile)': [-68.03881, -55.5525],
'Bahia Tekenika, Hardy Peninsula (Chile)': [-68.1318, -55.3982], 
'Bahia Wulaia, Navarino Island (Chile)': [-68.164404, -55.037551],
'Murray Channel (Chile)': [-68.36694, -54.979],
'Glaciar Yendegaia (Chile)': [-68.76091, -54.87246],
//'Caleta Olla (Chile)': [-69.14907, -54.94175],
'Puerto Toro (Chile)': [-67.07118, -55.07337],
'Bahia Aguila, Parque de Agostini (Chile)': [-70.47553, -54.45088], 
'Isla London (Chile)': [-71.90938, -54.68543], 
'Puerto North (Chile)': [-72.19888, -54.12982],
'Islote Tucker (Chile)': [-70.29232, -54.16594],
'Isla Tamar (Chile)': [-73.79859, -52.91025],
'Bahia El Aguila, Strait of Magellan (Chile)': [-70.97628, -53.78356],
'Puerto del Hambre, Strait of Magellan (Chile)': [-70.92667, -53.61422],
//'Canal de las Montañas, Magallanes (Chile)': [-73.2841, -51.9316],
//'Canal Concepción, Wilcock Peninsula (Chile)': [-74.6711, -50.1523],
'Canal Messier (Chile)': [-74.535377, -48.38499], 
//'Golfo San Esteban (Chile)': [-74.46366, -46.82916],
'Canal Moraleda (Chile)': [-73.578131, -45.234959],
'Isla Guafo, Chiloé (Chile)': [-74.76702, -43.56332],
'Pumillahue, Chiloé (Chile)': [-74.01987, -41.87731],
//'Canal Moraleda (Chile)': [-73.7543, -45.4103],
//'Quellón, Chiloé (Chile)': [-73.6154, -43.1399],
//'Achao, Chiloé (Chile)': [-73.48632, -42.46943],
//'Curaco de Velez, Chiloé (Chile)': [-73.6127, -42.4417],
//'Huinay, Palena (Chile)': [-72.416155, -42.38136],
//'Cucao, Chiloé (Chile)': [-74.12234, -42.66889],
'Bahía Mansa, Los Lagos (Chile)': [-73.753576, -40.600377],
'Niebla, Los Ríos (Chile)': [-73.40073, -39.87534], 
'Los Molinos, Los Ríos (Chile)': [-73.40894, -39.834],
'Caleta Chome, Hualpén (Chile)': [-73.21259, -36.77311], 
'Punta Loncoyen, Los Ríos (Chile)': [-73.409882, -39.823724],
'Isla Damas, Atacama (Chile)': [-71.51936, -29.24186],
'Pisagua, Tarapacá (Chile)': [-70.2065, -19.62392],
//Peru
'Paracas (Peru)': [-76.28672, -13.99576],
//'Atico (Peru)': [-74.04113, -15.96755],
//New Zealand
'Auckland Island (New Zealand)': [166.02762, -50.78879], 
'Stewart Island (New Zealand)': [168.145387, -46.863507], 
'Chathman Islands (New Zealand)': [-176.22531, -43.75485],
'Wellington (New Zealand)': [174.83068, -41.33445],
//'Low Head (Tasmania)': [146.7848, -41.07662], 
};
var places2 = {
  //Mexico 
'Islas Todos los Santos, Baja California (Mexico)' : [-116.7944, 31.8032], 
'Bahia Tortugas, Baja California (Mexico)' : [-114.86841, 27.63648], 
'Isla de Cedros, Baja California (Mexico)' : [-115.36169, 28.10765], 
'Puerto Nuevo, Baja California (Mexico)' : [-116.95643, 32.2428], 
'Isla San Martin, Baja California (Mexico)' : [-116.10424, 30.49001], 
//California
'La Jolla, San Diego, California (USA)': [-117.2899, 32.8287],  
'Point Loma, San Diego, California (USA)': [-117.27008, 32.70214], 
'Santa Barbara, California (USA)': [-119.8665, 34.40429], 
'Malibu, Los Angeles, California (USA)': [-118.92099, 34.03979], 
'San Nicolas Island, California (USA)': [-119.57411, 33.24816],
'Palos Verdes, Los Angeles, California (USA)': [-118.41369, 33.74361], 
'Point Concepcion, California (USA)': [-120.42275, 34.44776], 
'Naples, Santa Barbara, California (USA)': [-119.95457, 34.43183],
'Camel Bay, California (USA)' : [-121.94586, 36.56457], 
'Santa Rosa Island, California (USA)' : [-120.213894, 33.964042], 
'San Miguel Island, California (USA)' : [-120.40481, 34.02701], 
'Santa Cruz Island, California (USA)' : [-119.84763, 33.96329], 
'San Clemente Island, California (USA)' : [-118.5222, 32.8856], 
'Cape Flattery, Washington (USA)' : [-124.68474, 48.39144], 
'Cape Alava, Washington (USA)' : [-124.74318, 48.16116], 
'Destruction Island, Washington (USA)' : [-124.48226, 47.67913], 
'Strait of Juan de Fuca, Washington (USA)' : [-124.0371, 48.18055], 
//British Columbia 
'Goose Island, British Columbia (Canada)' : [-128.4806, 51.939],
'Simonds Group, British Columbia (Canada)' : [-128.28534, 51.95673],
'McNaughton Group, British Columbia (Canada)' : [-128.20919, 51.92928],
'McMullin Group, British Columbia (Canada)' : [-128.41682, 52.05607],
'Tribal Group, British Columbia (Canada)' : [-128.32161, 52.04677],
'Striker Region, British Columbia (Canada)' : [-128.38411, 52.10488],
'Princess Alice Island, British Columbia (Canada)' : [-128.42774, 52.12115],
//Alaska
'Keku Strait Alaska (USA)' : [-133.67767, 56.487888],
};
var places3 = {
//Argentina
'Ushuaia, Beagle Channel (Argentina)': [-68.26124, -54.84366],
'Isla de los Estados (Argentina)': [-64.24287, -54.73558], 
'Rio Grande, Tierra del Fuego (Argentina)': [-67.7592, -53.7266],
//Falklands
'Fitzroy, Falkland Islands (Malvinas), (British Overseas Territories)' : [-58.23592, -51.87532],
'Sealion Island, Falkland Islands (Malvinas), (British Overseas Territories)': [-59.08305, -52.44201],
'Stanley, Falkland Islands (Malvinas), (British Overseas Territories)': [-57.84549, -51.69224],
//South Georgia 
'Leith Harbour, South Georgia Islands (British Overseas Territories)': [-36.66983, -54.15608],
'Cobblers Cove, South Georgia Islands (British Overseas Territories)': [-36.29978, -54.27905],
//Tristan da Cunha 
'Gough Island, Tristan da Cunha archipelago (British Overseas Territories)': [-9.949825, -40.277801], 
'Tristan da Cunha (British Overseas Territories)': [-12.214988, -37.122767], 
'Nightingale Island, Tristan da Cunha Archipelago (British Overseas Territories)': [-12.47775, -37.41338],
'Inaccesible Island, Tristan da Cunha Archipelago (British Overseas Territories)': [-12.662587, -37.285574], 
//South Africa 
'Oudekraal (South Africa)': [18.34881, -33.98526], 
'Duiker Island (South Africa)': [18.326662, -34.058571],   
'Kommetjie (South Africa)': [18.31854, -34.13956],   
'Dyer Island (South Africa)': [19.41033, -34.68446],
'Quoin Point (South Africa)': [19.6513, -34.7854],  
'Cape Peninsula (South Africa)': [18.3777, -34.2736],  
'Betty´s Bay (South Africa)': [18.885963, -34.375374],  
'Hoek-van-die-berg (South Africa)': [19.12368, -34.41893],  
'Agulhas Cape (South Africa)': [19.91859, -34.79604]
}; 
var places4 ={
//Marion
'Prince Edward Island, Prince Edward Islands (South Africa)': [38.002167, -46.646355], 
'Marion Island, Prince Edward Islands (South Africa)': [37.8705, -46.88016],
//Crozet
'Île de la Possession, Crozet Islands (French Overseas Territories)': [51.79328, -46.37004], 
'Île de lEst , Crozet Islands (French Overseas Territories)': [52.23485, -46.3828], 
'Îlots des Apôtres , Crozet Islands (French Overseas Territories)': [50.42079, -45.95897], 
'Île aux Cochons, Crozet Islands (French Overseas Territories)': [50.2801, -46.1379], 
'Île des Pingouins, Crozet Islands (French Overseas Territories)': [50.41657, -46.41729],
//Kerguelen
'Baie Rhodes, Îles Kerguelen (French Overseas Territories)': [69.59084, -48.94963], 
'Port-aux-Français, Îles Kerguelen (French Overseas Territories)': [70.21395, -49.35733], 
//Australia
'Warrnambool (Australia)': [142.46785, -38.40049], 
'Port Campbell (Australia)': [143.07421, -38.65195], 
'Cape Otway (Australia)': [143.52231, -38.85639], 
'Marengo reefs (Australia)': [143.66947, -38.777222], 
'Port Fairy (Australia)': [142.22682, -38.39429], 
'Actaeon Island, Tasmania (Australia)': [146.997191, -43.528607], 
'Pankake Bay, Tasmania (Australia)': [146.920808, -43.570014], 
'Kelly Rocks, Tasmania (Australia)': [146.908718, -43.562528], 
  }
var select = ui.Select({
  items: Object.keys(places),
  onChange: function(key) {
    Map.setCenter(places[key][0], places[key][1], 15);
  }
});
// Set a place holder.
select.setPlaceholder('South Pacific Ocean');
var select2 = ui.Select({
  items: Object.keys(places2),
  onChange: function(key) {
    Map.setCenter(places2[key][0], places2[key][1], 15);
  }
});
// Set a place holder.
select2.setPlaceholder('North Pacific Ocean');
var select3 = ui.Select({
  items: Object.keys(places3),
  onChange: function(key) {
    Map.setCenter(places3[key][0], places3[key][1], 15);
  }
});
// Set a place holder.
select3.setPlaceholder('South Atlantic Ocean');
var select4 = ui.Select({
  items: Object.keys(places4),
  onChange: function(key) {
    Map.setCenter(places4[key][0], places4[key][1], 15);
  }
});
// Set a place holder.
select4.setPlaceholder('South Indian Ocean');
var lon = ui.Label();
var lat = ui.Label();
var kelp = ui.Label();
/////// KDI on click //////////////////////////////
var label = new ui.Label('Click on pixels for KD value or points for name', {
  fontWeight: "bold",
  stretch: "vertical",
});
var inspector = ui.Panel([label], ui.Panel.Layout.flow('horizontal'));
function updateText(strings) {
  var labels = strings.map(function(s) {
    return ui.Label(s)
  });
  inspector.widgets().reset(labels);
}
var message1 = "";
var message2 = "";
function showMosaic(mosaic1) {
  //inspector.clear(); 
  var TitleLabel = ui.Label("KD: ", {
    fontWeight: "bold",
    stretch: "vertical",
  })
  var elevationLabel = ui.Label(mosaic1, {stretch: "vertical"});
  var closeButton = ui.Button('Close', function() {
    inspector.style().set("shown", false)
  })
  inspector.add(TitleLabel);
  inspector.add(elevationLabel); 
  inspector.add(closeButton);
  //alert('mosiac is called - ' + mosaic1);
}
function showNearest(f) {
  alert(f.type);
  updateText("test2");
}
// converts the table a feature collection
var list = ee.FeatureCollection(table); 
//alert(list);
// inspect function to execute on clicking on the map
function inspect (coords) {
  //alert(coords.lon);
  inspector.clear();
  inspector.style().set("shown", true); 
  //inspector.add(ui.Label('Loading...', {color: 'grey'})); 
  var point = ee.Geometry.Point(coords.lon, coords.lat)
  var mosaic1 = mosaic.reduceRegion({
    reducer : ee.Reducer.first(), 
    geometry: point, 
    scale:10,
  }).get('kdi2');
  // find the nearest region on the select point
  var scale = Map.getScale();
  var searchRadius = 10;
  var selection = point.buffer(scale * searchRadius, scale);
  selectionLayer.setEeObject(selection);
  // find the nearest feature (use 10 screen pixels as a search buffer)
  var nearestFeature = list.filterBounds(selection).first();
  //nearestFeature.evaluate(showNearest);
  // Show the selected feature
  //alert(nearestFeature);
  nearestFeature.evaluate(function(f) {
    //alert(f.type);
    if(f === null) {
      updateText(['No features found'])
      return
    }
    updateText([
      'Name: ' + f.properties.Name,
      //'Name: ' + f.properties.Surname
    ]);
    inspector.widgets().reset(labels)
  });
  // evaluate mosaic to print KDI
  mosaic1.evaluate(showMosaic); 
}
/////Map.onClick -> KDI 
//Map.addLayer(list);
Map.add(inspector);
Map.onClick(inspect); 
Map.style().set("cursor", "crosshair"); 
/*var logo = ui.Image({
  src: 'https://drive.google.com/file/d/1qc2AJL146NUS3-0KZKLMG8idEygq7WED/view?usp=sharing',
  style: {    fontSize: '20px',    fontWeight: 'bold',     maxWidth: '320px'  }});
*/
var image = ee.Image('https://www.earth.ox.ac.uk/wp-content/themes/v1/images/Oxford_uni-2x.png').visualize({
//var image = ee.Image('LANDSAT/LC08/C01/T1_TOA/LC08_044034_20140318').visualize({  
/*  bands: ['B3', 'B2', 'B1'],
  min: 0,
  max: 1200,*/
  //gamma: [1.3, 1.3, 1]
});
var logo = ui.Thumbnail({
  image: image,
  params: {
    dimensions: '256x256',
    //region: box,
    format: 'png'
  },
  style: {height: '300px', width: '300px'}
});
//////////////////////////////
// add inspector
// Widgets
var panel = ui.Panel();
panel.style().set({
  backgroundColor: '#002147',
  position: 'bottom-right'
});
var es_image = ee.Image(ox_logo).visualize({});
var logo = ui.Thumbnail({
  image: es_image,
  params: {
    dimensions: '100x100',
    //region: box,
    format: 'png'
  },
  style: {height: '100px', width: '100px'}
});
panel.add(logo);
panel.add(title);
panel.add(subtitle23_link);
panel.add(subtitle);
panel.add(subtitle11);
panel.add(subtitle10);
panel.add(select);
panel.add(select2);//
panel.add(select4); //
panel.add(select3);//
panel.add(subtitle5);
panel.add(subtitle6);
panel.add(subtitle7);
panel.add(subtitle8);
panel.add(subtitle4);
panel.add(subtitle3);
panel.add(subtitle3_email);
panel.add(subtitle23_howToCite);
panel.add(subtitle23);
panel.add(subtitle2);
panel.add(subtitle12);
panel.add(subtitle30);
panel.add(subtitle34);
panel.add(subtitle32);
panel.add(subtitle17);
panel.add(subtitle13);
panel.add(subtitle14);
panel.add(subtitle15);
panel.add(subtitle28);
panel.add(subtitle25);
panel.add(subtitle29);
panel.add(subtitle16);
panel.add(subtitle26);
panel.add(subtitle31);
panel.add(subtitle18);
panel.add(subtitle19);
panel.add(subtitle20);
panel.add(subtitle21);
panel.add(subtitle22);
panel.add(subtitle27);
panel.add(subtitle33);
ui.root.add(panel);
//Map "center"
//Map.setCenter(-71.02, -48.69, 3);
////////////////Kelp explorer///////////////////////////
///Fly to (exciting places)
Map.setCenter(-142.95, 0.17, 2)
Map.addLayer(table, {palette: 'red'}, 'Surveys') //Erasmo Macaya 
var selectionLayer = ui.Map.Layer(ee.Image(), { color: 'feb24c' }, 'selection');
Map.layers().add(selectionLayer);