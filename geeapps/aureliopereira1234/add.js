var table = ui.import && ui.import("table", "table", {
      "id": "users/aureliopereira1234/PIVO_1"
    }) || ee.FeatureCollection("users/aureliopereira1234/PIVO_1"),
    table2 = ui.import && ui.import("table2", "table", {
      "id": "users/aureliopereira1234/area_alex"
    }) || ee.FeatureCollection("users/aureliopereira1234/area_alex"),
    table3 = ui.import && ui.import("table3", "table", {
      "id": "users/aureliopereira1234/contorno"
    }) || ee.FeatureCollection("users/aureliopereira1234/contorno"),
    table4 = ui.import && ui.import("table4", "table", {
      "id": "users/aureliopereira1234/goiania"
    }) || ee.FeatureCollection("users/aureliopereira1234/goiania"),
    table5 = ui.import && ui.import("table5", "table", {
      "id": "users/aureliopereira1234/areatcc1"
    }) || ee.FeatureCollection("users/aureliopereira1234/areatcc1"),
    table6 = ui.import && ui.import("table6", "table", {
      "id": "users/aureliopereira1234/maggioni"
    }) || ee.FeatureCollection("users/aureliopereira1234/maggioni"),
    table7 = ui.import && ui.import("table7", "table", {
      "id": "users/aureliopereira1234/BOASORTE_LUCIANO"
    }) || ee.FeatureCollection("users/aureliopereira1234/BOASORTE_LUCIANO"),
    table8 = ui.import && ui.import("table8", "table", {
      "id": "users/aureliopereira1234/ricardovendas"
    }) || ee.FeatureCollection("users/aureliopereira1234/ricardovendas"),
    table9 = ui.import && ui.import("table9", "table", {
      "id": "users/aureliopereira1234/wilton"
    }) || ee.FeatureCollection("users/aureliopereira1234/wilton"),
    table10 = ui.import && ui.import("table10", "table", {
      "id": "users/aureliopereira1234/wilton"
    }) || ee.FeatureCollection("users/aureliopereira1234/wilton");
var utils = require('users/vieiramesquita/LAPIG-GEE:CURSO_GEE_LAPIG/UTILITARIOS')
/************ S03-GERAR-MOSAICOS ************
  Para visualizar/exportar dados de seu interesse, 
  voce pode selecionar dados satelitarios alterando as variaveis:
  - "satelite", "realce", "data_inicial" e data_final.
  - "redutor"
  - "mascara"
************ OPCOES ************
  **** TRMM 3B43 V7 (GLOBAL)
    var satelite = 'TRMM' 
    var realce = 'Chuva' 
    var data_inicial = '1998-01-01'
    var data_final = '2018-07-28'
  **** ALOS DEM 30M (GLOBAL)
    var satelite = 'ALOS' 
    var realce = 'ALT' 
    nao necessita de data_inicial e/ou data_final
  **** SRTM V4 30M (GLOBAL)
    var satelite = 'SRTM' 
    var realce = 'ALT' 
    nao necessita de data_inicial e/ou data_final
  **** MOD11A2 TEMPERATURA DE SUPERFICIE (GLOBAL)
    var satelite = 'MOD11' 
    var realce = 'TEMP' 
    var data_inicial = '2000-03-05'
    var data_final = '2018-07-28'  
  **** MOD13Q1 INDICE DE VEGETACAO (GLOBAL)
    var satelite = 'MOD13' 
    var realce = 'NDVI' ou 'EVI' ou 'Agri'
    var data_inicial = '2000-02-18'
    var data_final = '2018-07-28'  
  **** MOD16A2 EVAPOTRANSPIRACAO (GLOBAL)
    var satelite = 'MOD16' 
    var realce = 'ET' ou 'PET'
    var data_inicial = '2000-01-01'
    var data_final = '2018-07-28' 
  **** LANDSAT 5
    var satelite = 'L5_TOA' ou 'L5_SR'
    var realce = 'Agri' ou 'False' ou 'True'
    var data_inicial = '1984-03-01'
    var data_final = 2012-05-05
  **** LANDSAT 7
    var satelite = 'L7_TOA' ou 'L7_SR'
    var realce = 'Agri' ou 'False' ou 'True'
    var data_inicial = '1999-01-01'
    var data_final = '2018-07-28' 
  **** LANDSAT 8
    var satelite = 'L8_TOA' ou 'L8_SR'
    var realce = 'Agri' ou 'False' ou 'True'
    var data_inicial = '2013-04-11'
    var data_final = '2018-07-28' 
  **** SENTINEL 1
    var satelite = 'S1' 
    var realce = 'SAR' 
    var data_inicial = '2014-10-03'
    var data_final = '2018-07-28'
  **** SENTINEL 2
    var satelite = 'S2' 
    var realce = 'Agri' ou 'False' ou 'False20' ou 'True'
    var data_inicial = '2015-06-23 '
    var data_final = '2018-07-28'
  **** SENTINEL 2
    var satelite = Sentinel 3: 'S3'
    var realce = 'False' ou 'True'
    var data_inicial = '2016-10-18'
    var data_final = '2018-07-28'
************ Mascaras ************
  Neste script voce poderá utilizar mascaras pre-carregadas, informar coordenadas ou desenhar vetores 
  para recortar seus mosaicos.
  Exemplos de mascaras pre-carregadas:
  BHRV (Bacia Hidrografica do Rio Vermelho): utils.vetores.BHRV
  Brasil: utils.vetores.brasil
  Biomas: utils.vetores.biomas
  Estados: utils.vetores.estados
  Municipios: utils.vetores.municipios
  Veja aqui como filtrar colecoes de dados:
  https://developers.google.com/earth-engine/feature_collection_filtering
  Veja como fazer o upload de um arquivo Shapefile aqui:
  http://shpescape.com/ft/
************ GLOSSARIO ************
  'TOA': Reflectancia de topo de atmosfera
  'SR': Reflectancia de superficie
  'Chuva': Coloracao padrao do dado. e.g. precipitacao em mm/h
  'ALT': Altitude/Elevacao em metros
  'TEMP': Temperatura de Superficie (LST)
  'NDVI': Indice de vegetacao com diferenca normalizada (Nir-Red / Nir+Red)
  'EVI': Indice de vegetacao melhorado (2.5 * (Nir - Red)/ 1 + Nir + 6*Red + 7.5*Blue)
  'ET'/'PET': Evapotranspiracao total / Evapotranspiracao potencial total em mm
  'Agri': Compoiscao colorida utilizada na deteccao de areas agricolas (Swir/Nir/Red)
  'False': Composicao colorida utilizada para dar enfase a vegetacao (Nir/Swir/Red ou Nir/Red/Green)
  'False20': Semelhante ao 'False', porém realiza a composição com as bandas de 20m de Sentinel 2
  'True': Composicao colorida que reproduz as cores "naturais" (Red/Green/Blue)
  'SAR': Diferenca de eixo de polarizacao (Radar - VV,VH,VH)
************************************/
var satelite = 'S2';
var realce = 'TRUE'
var data_inicial = '2018-02-01';
var data_final = '2018-02-28'
var paises = utils.vetores.paises.filter(ee.Filter.eq('Country', 'Ireland'));
var brasil = utils.vetores.brasil
var biomas = utils.vetores.biomas.filter(ee.Filter.eq('NM_BIOMA','CERRADO'))
var estados = utils.vetores.estados.filter(ee.Filter.eq('NM_UF','GO'))
var municipios = utils.vetores.municipios.filter(ee.Filter.eq('CD_GEOCMU','5208707'))
var clip = true
var mascara = table10
var nome_sufixo = 'WILTON'
var bandas = ['']
var diretorio_destino = 'GOOGLE_GEE_DIR'
utils.gerarMosaicos(satelite, realce, data_inicial, data_final, diretorio_destino, mascara, nome_sufixo, clip)