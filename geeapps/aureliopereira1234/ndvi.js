var table = ee.FeatureCollection("users/aureliopereira1234/thales");
var utils = require('users/vieiramesquita/LAPIG-GEE:CURSO_GEE_LAPIG/UTILITARIOS')
/* 
/************ S07-GERAR-MOSAICOS-INDICES-SINTESE ************
  Para visualizar/exportar dados de seu interesse, 
  voce pode selecionar dados satelitarios alterando as variaveis:
  - "satelite", "realce", "data_inicial" e data_final.
  - "redutor"
  - expressao
  - regiao
  - estatistica
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
  http://www.shpescape.com/
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
  ARI_1 & ARI_2 : Anthocyanin Reflectance Index 
  CAI : Cellulose Absorption Index
  CRI1 : Carotenoid Reflectance Index 1
  EVI_1 : Enhanced Vegetation Index
  EVI_2 : Enhanced Vegetation Index 2 
  MSI : Moisture Stress Index
  NDBI : Normalized Difference Build-up Index
  NDII : Normalized Difference Infrared Index 
  NDVI : Normalized Difference Vegetation Index
  NDWI_1  & NDWI_2 : Normalized Difference Water Index
  PRI : Photochemical Reflectance Index
  PSRI : Plant Senescence Reflectance Index 
  PSSR : Pigment Specific Simple Ratio
  RGR : Red-Green Ratio
  RVSI : Red-Edge Vegetation Stress Index
  SATVI : Soil Adjusted Total Vegetation Index 
  SIPI_1 & SIPI_2 : Structure Insensitive Pigment Index 
  VARI : Visible Atmospherically Resistant Index
  VIG : Visible Index Green
************************************/
var satelite = 'MOD11';
var realce = 'TEMP'
var data_inicial = '2019-01-01';
var data_final = '2019-12-31';
var filtro = ee.Reducer.mean()
var estatistica = ee.Reducer.min()
                      .combine(ee.Reducer.max(), null, true)
                      .combine(ee.Reducer.mean(), null, true)
                       .combine(ee.Reducer.mode(), null, true)
var paises = utils.vetores.paises.filter(ee.Filter.eq('Country', 'United States'));
var brasil = utils.vetores.brasil
var bioma = utils.vetores.biomas//.filter(ee.Filter.eq('NM_BIOMA','PANTANAL'))
var estado = utils.vetores.estados//.filter(ee.Filter.eq('NM_UF','GO'))
var municipio = utils.vetores.municipios.filter(ee.Filter.eq('CD_GEOCMU','5208707'))
var bhrv = utils.vetores.BHRV
var regiao = table
var nome_sufixo = 'CHUVA_BIOMAS'
var bandas = ['']
var diretorio_destino = 'GOOGLE_GEE_DIR'
utils.gerarEstatisticaZona(satelite, realce, data_inicial, data_final, diretorio_destino, regiao,filtro,estatistica, nome_sufixo, true)
/*
Voce tambem pode realizar buscas por coordenadas e selecionar bandas
Basta apenas remover o comentario das linhas abaixo e digitar a latitude
e longitude do local desejado; Para selecionar a banda do sensor escolhido
basta apenas passas o nome da mesma entre chaves. e.g. ['B4','B3','B2']
*/
//utils.gerarEstatisticaZona(satelite, realce, data_inicial, data_final, diretorio_destino, regiao,filtro,estatistica, nome_sufixo, true, novasBandas)