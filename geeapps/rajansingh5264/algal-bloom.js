var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [],
      "displayProperties": [],
      "properties": {},
      "color": "#23cba7",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #23cba7 */ee.Geometry.MultiPoint();
var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [],
      "displayProperties": [],
      "properties": {},
      "color": "#23cba7",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #23cba7 */ee.Geometry.MultiPoint();
Map.setCenter(-54.355357524029195, -25.789668935919924, 6)
var logo = ee.Image('users/gustavoonagel/Logo_AlgaeMap').visualize({ 
    bands:  ['b1', 'b2', 'b3'],
    min: 0,
    max: 256
    });
var thumb = ui.Thumbnail({
    image: logo,
    params: {
        format: 'png'
        },
    style: {stretch: 'horizontal', height: '0px', width: '0px',padding :'0'}
    });
var toolPanel = ui.Panel(thumb);
///////////////////// Botões FAKE ////////////////////////////////////////////////////////////////////////////////////////////////////////////
var selDateFake = ui.Button({
    label: "Select a date",
    onClick: Mensagem,
  })
var buttonFake = ui.Button({
  label: "Display Image",
  onClick: Mensagem,
})
function Mensagem() {
    var LABEL_STYLE1 = {
    color: '#ff0000',
    position: 'top-right',
    fontSize: '15px',
  };
  var Warning = ui.Label('Please, select the Region ---> ', LABEL_STYLE1)
  var JRC = ee.Image('JRC/GSW1_0/GlobalSurfaceWater');                            //// Get just within Pekel
  var dataset = JRC.select('occurrence').eq(90)
  var visualization = {
    palette: ['00BFFF	']
  };
  Map.clear()
  Map.add(Warning)
  Map.add(selDateFake)
  Map.add(buttonFake)
  Map.setOptions('Gray', {'Gray': GRAYMAP});
  Map.addLayer(dataset.clipToCollection(Reservatorios), visualization, 'Water Bodies');
}
Map.add(selDateFake)
Map.add(buttonFake)
////// Reservoirs
var RS = ee.FeatureCollection('projects/ee-algalbloom-gee4geo/assets/RS_UY') 
var ugrhs = ee.FeatureCollection('users/gustavoonagel/UGRHI') 
var reservatorio = ee.FeatureCollection('projects/ee-algalbloom-gee4geo/assets/Reservatorios_SP_2019_Tiet') 
var reservatorio1 = ee.FeatureCollection('projects/ee-algalbloom-gee4geo/assets/massa_dagua_ANA_777_BaciasEstados')
var reservatorio2 = ee.FeatureCollection('projects/ee-algalbloom-gee4geo/assets/massa_dagua_ANA_BH_CAxias_UY')
var reservatorio3 = ee.FeatureCollection('projects/ee-algalbloom-gee4geo/assets/BOLIVIA_lakes1')
var Bacia = ee.FeatureCollection('projects/ee-algalbloom-gee4geo/assets/Sub_bacias_17_all')
var cordoba = ee.FeatureCollection('projects/ee-algalbloom-gee4geo/assets/Cordoba_Arg')
var AltoTiete = ugrhs.filter(ee.Filter.inList('Codigo', ee.List([ 6])));
var ParaibaSul = ugrhs.filter(ee.Filter.inList('Codigo', ee.List([ 2])));
var TieteSorocaba = ugrhs.filter(ee.Filter.inList('Codigo', ee.List([ 10])));
var PCJ = ugrhs.filter(ee.Filter.inList('Codigo', ee.List([ 5])));
var RioGrande = Bacia.filter(ee.Filter.inList('fid', ee.List([ 257])));
var Paranaíba = Bacia.filter(ee.Filter.inList('fid', ee.List([ 258])));
var Paranapanema = Bacia.filter(ee.Filter.inList('fid', ee.List([ 251])));
var Itaipu = Bacia.filter(ee.Filter.inList('fid', ee.List([ 250])));
var Iguaçu = Bacia.filter(ee.Filter.inList('fid', ee.List([ 249])));
var ItaGuaçu = Itaipu.merge(Iguaçu)
var BaixoTiete = ugrhs.filter(ee.Filter.inList('Codigo', ee.List([ 19])));
var MedioTiete = ugrhs.filter(ee.Filter.inList('Codigo', ee.List([ 16])));
var AltoTiete0 = ugrhs.filter(ee.Filter.inList('Codigo', ee.List([ 13])));
var AltoTiete1 = ugrhs.filter(ee.Filter.inList('Codigo', ee.List([ 10])));
var AltoTiete2 = ugrhs.filter(ee.Filter.inList('Codigo', ee.List([ 5])));
var Tiete = BaixoTiete.merge(MedioTiete).merge(AltoTiete0).merge(AltoTiete1).merge(AltoTiete2)
// Rio Alto Tietê
var Billings = reservatorio1.filter(ee.Filter.inList('gid', ee.List([38060])))
var Guarapiranga = reservatorio1.filter(ee.Filter.inList('gid', ee.List([42615])))
var taiaçupeba = reservatorio1.filter(ee.Filter.inList('gid', ee.List([60600])))
var RioJundia = reservatorio1.filter(ee.Filter.inList('gid', ee.List([20232])))
var Henry = reservatorio1.filter(ee.Filter.inList('gid', ee.List([62798])))
var Paiva = reservatorio1.filter(ee.Filter.inList('gid', ee.List([159])))
var Ponte = reservatorio1.filter(ee.Filter.inList('gid', ee.List([61734])))
// Paraíba do Sul
var Paraibuna1 = reservatorio1.filter(ee.Filter.inList('gid', ee.List([61838, 241755])))
var Nilo = reservatorio1.filter(ee.Filter.inList('gid', ee.List([61310])))
var SantaBranca = reservatorio1.filter(ee.Filter.inList('gid', ee.List([13716])))
var Jaguari = reservatorio1.filter(ee.Filter.inList('gid', ee.List([61660])))
var FunilRJ = reservatorio1.filter(ee.Filter.inList('gid', ee.List([61857])))
var LajesRJ = reservatorio1.filter(ee.Filter.inList('gid', ee.List([42399])))
var Paracambi = reservatorio1.filter(ee.Filter.inList('gid', ee.List([58140])))
// Tiete
var TresIsmaos = reservatorio1.filter(ee.Filter.inList('gid', ee.List([26014])))
var NovaAvanhandava = reservatorio1.filter(ee.Filter.inList('gid', ee.List([61750])))
var Promissao = reservatorio1.filter(ee.Filter.inList('gid', ee.List([56441])))
var Ibitinga = reservatorio1.filter(ee.Filter.inList('gid', ee.List([11638])))
var Bariri = reservatorio1.filter(ee.Filter.inList('gid', ee.List([51649])))
var BarraBonita = reservatorio1.filter(ee.Filter.inList('gid', ee.List([987])))
var Ituparanga = reservatorio1.filter(ee.Filter.inList('gid', ee.List([61946])))
// PCJ
var Jacarei = reservatorio1.filter(ee.Filter.inList('gid', ee.List([241712, 1009, 61913, 61664]))) // tá com problema
var RioCachoeira = reservatorio1.filter(ee.Filter.inList('gid', ee.List([61913])))
var RioAtibainha = reservatorio1.filter(ee.Filter.inList('gid', ee.List([61664])))
var Americana = reservatorio1.filter(ee.Filter.inList('gid', ee.List([241619])))
// RIO GRANDE
var Camargos = reservatorio1.filter(ee.Filter.inList('gid', ee.List([40841])))
var Funil = reservatorio1.filter(ee.Filter.inList('gid', ee.List([241659])))
var Furnas = reservatorio1.filter(ee.Filter.inList('gid', ee.List([61269, 17052])))
var Caconde = reservatorio1.filter(ee.Filter.inList('gid', ee.List([10080])))
var Mascarenhas = reservatorio1.filter(ee.Filter.inList('gid', ee.List([241722])))
var Estreito = reservatorio1.filter(ee.Filter.inList('gid', ee.List([11227])))
var Jaguara = reservatorio1.filter(ee.Filter.inList('esp_cd', ee.List([3793])))    ///// Rever
var VoltaGrande = reservatorio1.filter(ee.Filter.inList('gid', ee.List([58363])))
var PortoColombia = reservatorio1.filter(ee.Filter.inList('gid', ee.List([42064])))
var Igarapava = reservatorio1.filter(ee.Filter.inList('gid', ee.List([61791])))
var Marimbondo = reservatorio1.filter(ee.Filter.inList('gid', ee.List([61368])))
var AguaVermelha = reservatorio1.filter(ee.Filter.inList('gid', ee.List([50605])))
// RIO PARANAÍBA
var NovaPonte = reservatorio1.filter(ee.Filter.inList('gid', ee.List([56763])))
var Batalha = reservatorio1.filter(ee.Filter.inList('gid', ee.List([32243])))
var Emborcação = reservatorio1.filter(ee.Filter.inList('gid', ee.List([11402])))
var SerradoFacão = reservatorio1.filter(ee.Filter.inList('gid', ee.List([41800])))
var Miranda = reservatorio1.filter(ee.Filter.inList('gid', ee.List([9916])))
var AmadorAguiarI = reservatorio1.filter(ee.Filter.inList('gid', ee.List([31579])))
var AmadorAguiarII = reservatorio1.filter(ee.Filter.inList('gid', ee.List([61057])))
var Itumbiara = reservatorio1.filter(ee.Filter.inList('gid', ee.List([45804])))
var CorumbáI = reservatorio1.filter(ee.Filter.inList('gid', ee.List([1048])))
var CorumbáIII = reservatorio1.filter(ee.Filter.inList('gid', ee.List([41451])))
var CorumbáIV = reservatorio1.filter(ee.Filter.inList('gid', ee.List([61117])))
var CachoeiraDourada = reservatorio1.filter(ee.Filter.inList('gid', ee.List([23514])))
var SãoSimão = reservatorio1.filter(ee.Filter.inList('gid', ee.List([61180])))
var IlhaSolteira = reservatorio1.filter(ee.Filter.inList('gid', ee.List([687])))
var Itumbiara = reservatorio1.filter(ee.Filter.inList('gid', ee.List([45804])))
var PortoPrimavera = reservatorio1.filter(ee.Filter.inList('gid', ee.List([241716])))
// Paranapanema
var GovJaimeCanet = reservatorio1.filter(ee.Filter.inList('gid', ee.List([26145])))
var Jurumirim = reservatorio1.filter(ee.Filter.inList('gid', ee.List([42174])))
var Chavantes = reservatorio1.filter(ee.Filter.inList('gid', ee.List([61492])))
var CanoasII = reservatorio1.filter(ee.Filter.inList('gid', ee.List([241717])))
var CanoasI = reservatorio1.filter(ee.Filter.inList('gid', ee.List([241718])))
var Capivara = reservatorio1.filter(ee.Filter.inList('gid', ee.List([990])))
var Taquaruçu = reservatorio1.filter(ee.Filter.inList('gid', ee.List([241233])))
var Rosana = reservatorio1.filter(ee.Filter.inList('gid', ee.List([241780])))
var Piraju = reservatorio1.filter(ee.Filter.inList('gid', ee.List([56065])))
// ITAIPU AND IGUAÇU
var ItaipuBinacional = reservatorio1.filter(ee.Filter.inList('gid', ee.List([53479])))
var GovernadorBentoMunhoz = reservatorio1.filter(ee.Filter.inList('gid', ee.List([41764])))
var GovernadorNeyAminthas = reservatorio1.filter(ee.Filter.inList('gid', ee.List([18706])))
var SaltoSantiago = reservatorio1.filter(ee.Filter.inList('gid', ee.List([61853])))
var SaltoOsório = reservatorio1.filter(ee.Filter.inList('gid', ee.List([6269])))
var SaltoCaxias = reservatorio1.filter(ee.Filter.inList('gid', ee.List([61922])))
var BaixoIguaçu = reservatorio1.filter(ee.Filter.inList('gid', ee.List([242711])))
var SantaClara = reservatorio1.filter(ee.Filter.inList('gid', ee.List([9791, 61453, 61471])))
// SC
var BarraGrande = reservatorio1.filter(ee.Filter.inList('gid', ee.List([7082])))
var FozChape = reservatorio1.filter(ee.Filter.inList('gid', ee.List([24388])))
var Machadinho = reservatorio1.filter(ee.Filter.inList('gid', ee.List([55048])))
var CamposNovos = reservatorio1.filter(ee.Filter.inList('gid', ee.List([61613])))
var Ita = reservatorio1.filter(ee.Filter.inList('gid', ee.List([61767])));
var Garibaldi = reservatorio1.filter(ee.Filter.inList('gid', ee.List([240525])));
var Imarui = reservatorio1.filter(ee.Filter.inList('gid', ee.List([23667])));
var Ibirapuera = reservatorio1.filter(ee.Filter.inList('gid', ee.List([20623])));
var Floripa = reservatorio1.filter(ee.Filter.inList('gid', ee.List([866, 36398])));
// RS
var LagosdosPatos = reservatorio1.filter(ee.Filter.inList('gid', ee.List([671])));
var LagoaMirim = reservatorio1.filter(ee.Filter.inList('gid', ee.List([412])));
var LagoaMangueira = reservatorio1.filter(ee.Filter.inList('gid', ee.List([83])));
var SantaBárbara = reservatorio1.filter(ee.Filter.inList('gid', ee.List([8824])));
var Chasqueiro = reservatorio1.filter(ee.Filter.inList('gid', ee.List([24855])));
var Duro = reservatorio1.filter(ee.Filter.inList('gid', ee.List([53619])));
var PassoReal = reservatorio1.filter(ee.Filter.inList('gid', ee.List([42621])));
var PassoFundo = reservatorio1.filter(ee.Filter.inList('gid', ee.List([41309])));
var Curitiba = reservatorio1.filter(ee.Filter.inList('gid', ee.List([19845,49545,58332,61259,61409,61974])));
var Caxias = reservatorio2.filter(ee.Filter.inList('esp_cd', ee.List([4,7506,7507,7563,44067])));
// Rio Sao Francisco
var BH = reservatorio1.filter(ee.Filter.inList('gid', ee.List([9528,19855,42217,42723,62258])));
var Pampulha = reservatorio2.filter(ee.Filter.inList('esp_cd', ee.List([4276])));
var Queimado = reservatorio1.filter(ee.Filter.inList('gid', ee.List([43064])));
var TresMarias = reservatorio1.filter(ee.Filter.inList('gid', ee.List([22736])));
var Sobradinho = reservatorio1.filter(ee.Filter.inList('gid', ee.List([61258])));
var Xingo = reservatorio1.filter(ee.Filter.inList('gid', ee.List([26407])));
var LuizGonzaga = reservatorio1.filter(ee.Filter.inList('gid', ee.List([61051])));
var PauloAfonso = reservatorio1.filter(ee.Filter.inList('gid', ee.List([61530, 61590])));
//Nordeste
var Salvador = reservatorio1.filter(ee.Filter.inList('gid', ee.List([636, 21237, 57500])));
var BaiaSalvador = reservatorio1.filter(ee.Filter.inList('gid', ee.List([240752])));
var Mundua = reservatorio1.filter(ee.Filter.inList('gid', ee.List([241195, 242098])));
var Recife = reservatorio1.filter(ee.Filter.inList('gid', ee.List([8030,24486,58021,59654,61674,61772])));
var Coremas = reservatorio1.filter(ee.Filter.inList('gid', ee.List([18565,61768])));
var Epitacio = reservatorio1.filter(ee.Filter.inList('gid', ee.List([62626])));
var Armando = reservatorio1.filter(ee.Filter.inList('gid', ee.List([42491,57980])));
var Apodi = reservatorio1.filter(ee.Filter.inList('gid', ee.List([53390,56310,57723,61407,61482])));
var Castanhao = reservatorio1.filter(ee.Filter.inList('gid', ee.List([6684])));
var Oros = reservatorio1.filter(ee.Filter.inList('gid', ee.List([34892])));
var Lisboa = reservatorio1.filter(ee.Filter.inList('gid', ee.List([240999])));
var Araras = reservatorio1.filter(ee.Filter.inList('gid', ee.List([61862])));
var Piracuruca = reservatorio1.filter(ee.Filter.inList('gid', ee.List([61879])));
var Flores = reservatorio1.filter(ee.Filter.inList('gid', ee.List([38287])));
var BoaEsperanca = reservatorio1.filter(ee.Filter.inList('gid', ee.List([10742])));
var Estreito2 = reservatorio1.filter(ee.Filter.inList('gid', ee.List([42109])));
var Magalhaes = reservatorio1.filter(ee.Filter.inList('gid', ee.List([241714])));
var PeixeAngical = reservatorio1.filter(ee.Filter.inList('gid', ee.List([41242,61958])));
var Mesa = reservatorio1.filter(ee.Filter.inList('gid', ee.List([737,241719])));
var Brasilia = reservatorio1.filter(ee.Filter.inList('gid', ee.List([61343,61388,241715])));
// Região Norte
var Tucurui = reservatorio1.filter(ee.Filter.inList('gid', ee.List([48434])));
var Belem = reservatorio1.filter(ee.Filter.inList('gid', ee.List([12524])));
var Curuai = reservatorio1.filter(ee.Filter.inList('gid', ee.List([43175])));
var Xingu = reservatorio1.filter(ee.Filter.inList('gid', ee.List([240998])));
var Tapajos = reservatorio1.filter(ee.Filter.inList('gid', ee.List([39996])));
var Balbina = reservatorio1.filter(ee.Filter.inList('gid', ee.List([19782])));
var Manso = reservatorio1.filter(ee.Filter.inList('gid', ee.List([62007])));
var Samuel = reservatorio1.filter(ee.Filter.inList('gid', ee.List([61868])));
//RJ
var Guanabara = reservatorio1.filter(ee.Filter.inList('gid', ee.List([241196])));
var RJ = reservatorio1.filter(ee.Filter.inList('gid', ee.List([13631,13869,19826,20261,33724])));
var Saquarema = reservatorio1.filter(ee.Filter.inList('gid', ee.List([4329,8537,13866,41393,41538])));
var Araruama = reservatorio1.filter(ee.Filter.inList('gid', ee.List([32462])));
var Jaturnaíba = reservatorio1.filter(ee.Filter.inList('gid', ee.List([30460])));
var Feia = reservatorio1.filter(ee.Filter.inList('gid', ee.List([41352])));
var Vitoria = reservatorio1.filter(ee.Filter.inList('gid', ee.List([34790])));
//Piaui
var Piaui = reservatorio1.filter(ee.Filter.inList('gid', ee.List([34978, 50693,59627,61675,62216])));
//Uruguay
var Bonete = reservatorio2.filter(ee.Filter.inList('esp_cd', ee.List([10])));
var Salto = reservatorio2.filter(ee.Filter.inList('esp_cd', ee.List([9])));
//Bolivia
var Bolivia = reservatorio3.filter(ee.Filter.inList('OBJECTID', ee.List([1512,1513,1514,2161,2088,2082,6530,6529,2079,2080])));
//Argentina- CORDOBA
//var embalses_Arg = cordoba.filter(ee.Filter.inList('OBJECTID', ee.List([1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28])));
var Pichanas = cordoba.filter(ee.Filter.inList('OBJECTID', ee.List([19])));
var SanRoque = cordoba.filter(ee.Filter.inList('OBJECTID', ee.List([5])));
var Costilla = cordoba.filter(ee.Filter.inList('ID', ee.List([1])));
var CruzEje = cordoba.filter(ee.Filter.inList('OBJECTID', ee.List([16])));
var Molinos = cordoba.filter(ee.Filter.inList('OBJECTID', ee.List([6])));
var Rio3 = cordoba.filter(ee.Filter.inList('OBJECTID', ee.List([14])));
var LaVina = cordoba.filter(ee.Filter.inList('OBJECTID', ee.List([9])));
var List = {
  'BRA/SP/TIETE/Represa Billings': Billings,
  'BRA/SP/TIETE/Represa Guarapiranga': Guarapiranga,
  'BRA/SP/TIETE/Represa Taiaçupeba': taiaçupeba,
  'BRA/SP/TIETE/Represa Jundiaí': RioJundia,
  'BRA/SP/TIETE/Represa Paiva Castro': Paiva,
  'BRA/SP/TIETE/Represa Ponte Nova': Ponte,
  'BRA/SP/PCJ/Sist. Cantareira': Jacarei,
  'BRA/SP/PCJ/PCH Americana': Americana,
  'BRA/SP/TIETE/UHE Três Irmãos': TresIsmaos,
  'BRA/SP/TIETE/UHE Nova Avanhandava': NovaAvanhandava,
  'BRA/SP/TIETE/UHE Promissão': Promissao,
  'BRA/SP/TIETE/UHE Ibitinga': Ibitinga,
  'BRA/SP/TIETE/UHE Bariri': Bariri,
  'BRA/SP/TIETE/UHE Barra Bonita': BarraBonita,
  'BRA/SP/TIETE/UHE Ituparanga': Ituparanga,
  'BRA/SP/PARAIBAdoSUL/UHE Paraibuna': Paraibuna1,
  'BRA/SP/PARAIBAdoSUL/UHE Santa Branca': SantaBranca,
  'BRA/SP/PARAIBAdoSUL/UHE Jaguari': Jaguari,
  'BRA/RJ/PARAIBAdoSUL/UHE Funil': FunilRJ,
  'BRA/RJ/PARAIBAdoSUL/UHE Fontes Nova': LajesRJ,
  'BRA/RJ/PARAIBAdoSUL/PCH Paracambi': Paracambi,
  'BRA/RJ/PARAIBAdoSUL/UHE Nilo Peçanha': Nilo,
  'BRA/RJ/Baía de Guanabara': Guanabara,
  'BRA/RJ/Lagoas Cariocas': RJ,
  'BRA/RJ/Lagoas Saquarema e Maricá': Saquarema,
  'BRA/RJ/Lagoa Araruama': Araruama,
  'BRA/RJ/Lagoa Juturnaíba': Jaturnaíba,
  'BRA/RJ/Lagoa Feia': Feia,
  //'BRA/ES/Baía de Vitória': Vitoria,
  'BRA/MG/PARANAÍBA/UHE Batalha': Batalha,
  'BRA/MG/PARANAÍBA/UHE Nova Ponte': NovaPonte,
  'BRA/GO/PARANAÍBA/UHE Emborcação': Emborcação,
  'BRA/GO/PARANAÍBA/UHE Serra do Facão': SerradoFacão,
  'BRA/MG/PARANAÍBA/UHE Miranda': Miranda,
  'BRA/MG/PARANAÍBA/UHE Amador Aguiar I': AmadorAguiarI,
  'BRA/MG/PARANAÍBA/UHE Amador Aguiar II': AmadorAguiarII,
  'BRA/GO/PARANAÍBA/UHE Corumbá I': CorumbáI,
  'BRA/GO/PARANAÍBA/UHE Corumbá III': CorumbáIII,
  'BRA/GO/PARANAÍBA/UHE Corumbá IV': CorumbáIV,
  'BRA/MG/PARANAÍBA/UHE Cachoeira Dourada': CachoeiraDourada,
  'BRA/GO/PARANAÍBA/UHE São Simão': SãoSimão,
  'BRA/SP/PARANAÍBA/UHE Ilha Solteira': IlhaSolteira,
  'BRA/SP/PARANAÍBA/UHE Itumbiara': Itumbiara,
  'BRA/SP/PARANAÍBA/UHE Porto Primavera': PortoPrimavera,
  //'BRA/GO/UHE Serra da Mesa': Mesa,
  //'BRA/DF/Brasília e região': Brasilia,
  //'BRA/MT/UHE Manso': Manso,
  'BRA/PR/PARANAPANEMA/UHE Gov.Jaime Canet': GovJaimeCanet,
  'BRA/SP/PARANAPANEMA/UHE Jurumirim': Jurumirim,
  'BRA/PR/PARANAPANEMA/UHE Chavantes': Chavantes,
  'BRA/SP/PARANAPANEMA/UHE CanoasII': CanoasII,
  'BRA/SP/PARANAPANEMA/UHE CanoasI': CanoasI,
  'BRA/PR/PARANAPANEMA/UHE Capivara': Capivara,
  'BRA/SP/PARANAPANEMA/UHE Taquaruçu': Taquaruçu,
  'BRA/PR/PARANAPANEMA/UHE Rosana': Rosana,
  'BRA/SP/PARANAPANEMA/UHE Pirajú': Piraju,
  'BRA/MG/GRANDE/UHE Camargos': Camargos,
  'BRA/MG/GRANDE/UHE Funil': Funil,
  'BRA/MG/GRANDE/UHE Furnas': Furnas,
  'BRA/SP/GRANDE/UHE Caconde': Caconde,
  'BRA/MG/GRANDE/UHE Mascarenhas': Mascarenhas,
  'BRA/MG/GRANDE/UHE Estreito': Estreito,
  'BRA/SP/GRANDE/UHE Jaguara': Jaguara,
  'BRA/MG/GRANDE/UHE Volta Grande': VoltaGrande,
  'BRA/MG/GRANDE/UHE Porto Colômbia': PortoColombia,
  'BRA/SP/GRANDE/UHE Igarapava': Igarapava,
  'BRA/SP/GRANDE/UHE Marimbondo': Marimbondo,
  'BRA/SP/GRANDE/UHE Água Vermelha': AguaVermelha,
  //54
  'BRA & PAR/UHE Itaipu Binacional': ItaipuBinacional,
  'BRA/PR/IGUAÇU/UHE Gov. Bento Munhoz': GovernadorBentoMunhoz,
  'BRA/PR/IGUAÇU/UHE Gov. Ney Aminthas': GovernadorNeyAminthas,
  'BRA/PR/IGUAÇU/UHE Salto Santiago': SaltoSantiago,
  'BRA/PR/IGUAÇU/UHE Salto Osório': SaltoOsório,
  'BRA/PR/IGUAÇU/UHE Salto Caxias': SaltoCaxias,
  'BRA/PR/IGUAÇU/UHE Baixo Iguaçu': BaixoIguaçu,
  'BRA/PR/IGUAÇU/UHE Santa Clara': SantaClara,
  'BRA/PR/IGUAÇU/UHE Gov. José Richa': SantaClara,
  //'BRA/PR/Curitiba': Curitiba,
  'BRA/SC/RIO URUGUAI/UHE Barra Grande': BarraGrande,
  'BRA/SC/RIO URUGUAI/UHE Foz do Chapecó': FozChape,
  'BRA/SC/RIO URUGUAI/UHE Campos Novos': CamposNovos,
  'BRA/SC/RIO URUGUAI/UHE Machadinho': Machadinho,
  'BRA/SC/RIO URUGUAI/UHE Itá': Ita,
  'BRA/SC/RIO URUGUAI/UHE Garibaldi': Garibaldi,
  //'BRA/SC/Lagoa do Imaruí': Imarui,
  //'BRA/SC/Lagoa de Ibirapuera': Ibirapuera,
  //'BRA/SC/Florianópolis': Floripa,
  'BRA/RS/Barragem Arroio Duro': Duro,
  'BRA/RS/UHE Passo Real': PassoReal,
  'BRA/RS/UHE Passo Fundo': PassoFundo,
  'BRA/RS/Caxias do Sul': Caxias,
  'BRA/RS/Lagoa dos Patos': LagosdosPatos,
  'BRA/RS/Lagoa Mangueira': LagoaMangueira,
  'BRA/RS/Reservatório Santa Bárbara': SantaBárbara,
  'BRA/RS/Reservatório Chasqueiro': Chasqueiro,
  'BRA & URU/Lagoa Mirim': LagoaMirim,
  'BRA/MG/Belo Horizonte e região': BH,
  'BRA/MG/Lagoa da Pampulha': Pampulha,
  //'BRA/MG/SÃO FRANCISCO/UHE Queimado': Queimado,
  'BRA/MG/SÃO FRANCISCO/UHE Três Marias': TresMarias,
  //'BRA/BA/SÃO FRANCISCO/UHE Sobradinho': Sobradinho,
  //'BRA/SE/SÃO FRANCISCO/UHE Xingo': Xingo,
  //'BRA/PE/SÃO FRANCISCO/UHE Luiz Gonzaga': LuizGonzaga,
  //'BRA/BA/SÃO FRANCISCO/UHE Paulo Afonso': PauloAfonso,
  //'BRA/BA/Represas Salvador': Salvador,
  //'BRA/BA/Baía de Todos os Santos': BaiaSalvador,
  //'BRA/AL/Lagoas Munduá e Manguaba': Mundua,
  //'BRA/PE/Recife e região': Recife,
  //'BRA/PB/Açudes Coremas e Mãe DÁgua': Coremas,
  //'BRA/PB/Açude Epitácio Pessoa': Epitacio,
  //'BRA/RN/Barragem Armando Gonçalves': Armando,
  //'BRA/RN/Açude Apodí e região': Apodi,
  //'BRA/CE/Açude Castanhão': Castanhao,
  //'BRA/CE/Açude Orós': Oros,
  //'BRA/CE/Açude Arrojado Lisboa': Lisboa,
  //'BRA/CE/Açude Araras': Araras,
  //'BRA/PI/Açude Piracuruca': Piracuruca,
  //'BRA/PI e MA/UHE Boa Esperança': BoaEsperanca,
  //'BRA/MA/Açude Flores': Flores,
  //'BRA/TO e MA/UHE Estreito': Estreito2,
  //'BRA/TO/UHE Luis E. Magalhães': Magalhaes,
  //'BRA/TO/UHE Peixe-Angical': PeixeAngical,
  //'BRA/PA/Tapajós': Tapajos,
  //'BRA/PA/Lago Curuai': Curuai,
  //'BRA/PA/Xingu': Xingu,
  //'BRA/PA/Tucurui': Tucurui,
  //'BRA/PA/Belém': Belem,
  //'BRA/AM/UHE Balbina': Balbina,
  //'BRA/RO/UHE Samuel': Samuel,
  //105
  'BRA/PARNAIBA/Piaui1': Piaui,
  'URU/Rincon del Bonete': Bonete,
  'URU/Salto Grande ': Salto,
  'BOL/Lagos Amazônicos': Bolivia,
  'ARG/Cordoba/Laguna Costilla': Costilla,
  'ARG/Cordoba/San Roque': SanRoque,
  'ARG/Cordoba/Cruz del Eje': CruzEje,
  'ARG/Cordoba/Pichanas': Pichanas,
  'ARG/Cordoba/Los Molinos': Molinos,
  'ARG/Cordoba/Río III': Rio3,
  'ARG/Cordoba/Allende (La Viña)': LaVina
};
////////////////////////////////////////////////////// Get the NDCI ////////////////////////// ///////////////////////////////////////
var reservatoriosAll = Bacia.merge(RS)
var col = ee.ImageCollection('projects/ee-algalbloom-gee4geo/assets/NDCI_daily');     //// NDCI
///// Pre Processing of the NDCI ImageCollection
////////////////////////////////////////// Shows an inicial image //////////////////////////////////////////////////////////////////////
/// Insere um mapaBase
var GRAYMAP = [
{   // Dial down the map saturation.
stylers: [ { saturation: -100 } ]
},{ // Dial down the label darkness.
elementType: 'labels',
stylers: [ { lightness: 20 } ]
},{ // Simplify the road geometries.
featureType: 'road',
elementType: 'geometry',
stylers: [ { visibility: 'simplified' } ]
},{ // Turn off road labels.
featureType: 'road',
elementType: 'labels',
stylers: [ { visibility: 'off' } ]
},{ // Turn off all icons.
elementType: 'labels.icon',
stylers: [ { visibility: 'off' } ]
},{ // Turn off all POIs.
featureType: 'poi',
elementType: 'all',
stylers: [ { visibility: 'off' }]
}
];
Map.setOptions('Gray', {'Gray': GRAYMAP});
/// Insere corpos d'água 
var Reservatorios = ee.FeatureCollection(reservatorio.merge(reservatorio1).merge(reservatorio2).merge(reservatorio3).merge(cordoba));
var BuracoLagosdosPatos = ee.Geometry.Rectangle([-51.18, -30.57, -50.817, -30.77]);
var BuracoLagosdosPatos1 = ee.Geometry.Rectangle([-51.4625, -31.23, -51.31, -31.39]);
var BuracoLagosdosPatos2 = ee.Geometry.Rectangle([-51.87, -31.42,  -51.65, -31.67]);
var LagoadosPatos = ee.FeatureCollection([BuracoLagosdosPatos, BuracoLagosdosPatos1, BuracoLagosdosPatos2])
var background = 1;
var LagoadosPatos = ee.Image(background).clip(LagoadosPatos).rename('occurrence');
var JRC = ee.Image('JRC/GSW1_0/GlobalSurfaceWater');                            //// Get just within Pekel
var JRC = JRC.select('occurrence')
var JRC = ee.ImageCollection([JRC.gte(10).selfMask(), LagoadosPatos]).mosaic().clipToCollection(Reservatorios)
var agua = JRC
var BB_mask = JRC
var visualization = {
  palette: ['00BFFF	']
};
Map.addLayer(JRC, visualization, 'Water Bodies');
/// Insere um cursor legal
Map.setControlVisibility(false);
Map.setControlVisibility({scaleControl: true, zoomControl: true});
Map.style().set({cursor: 'crosshair'});  
/////////////////////////////////////// FUNCTION TO PROCESS TIME SERIES /////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function updateMap(BB_mask, region3, selection, fromDate, toDate, Month1, Month2) {
  Map.clear()
  //////////////////// Pega a região de interesse
  region3 = List[select.getValue()] 
  var now = Date.now();       //getting time at UTC
  var eeNow = ee.Date(now)
  var s2Clouds = ee.ImageCollection('COPERNICUS/S2_CLOUD_PROBABILITY').filterBounds(region3).filterDate('2021-11-01', eeNow);
  var s2_orig = ee.ImageCollection('COPERNICUS/S2_SR').filterBounds(region3).filterDate('2021-11-01', eeNow);
  var MAX_CLOUD_PROBABILITY = 10;
  function maskClouds(img) {
        var clouds = ee.Image(img.get('cloud_mask')).select('probability');
        var isNotCloud = clouds.lt(MAX_CLOUD_PROBABILITY);
        return img.updateMask(isNotCloud);
  }
  function maskEdges(s2_img) {
        return s2_img.updateMask(
            s2_img.select('B8A').mask().updateMask(s2_img.select('B9').mask()));
  }
  s2_orig = s2_orig.map(maskEdges);
  s2Clouds = s2Clouds;
  var s2SrWithCloudMask = ee.Join.saveFirst('cloud_mask').apply({
        primary: s2_orig,
        secondary: s2Clouds,
        condition:
            ee.Filter.equals({leftField: 'system:index', rightField: 'system:index'})
  });
  var s2CloudMasked =
          ee.ImageCollection(s2SrWithCloudMask).map(maskClouds);
  function bandcor (img) {
        var band4 = img.select('B4').multiply(0.935).add(101.52).rename('B4');
        var band5 = img.select('B5').multiply(0.9086).add(75.575).rename('B5');
        var band12 = img.select('B12').multiply(0.8943).rename('B12');
        //var glint = atmcor.subtract(atmcor.select('B12'))//.updateMask(BB_mask);
    return img.addBands([band4, band5, band12], ['B4', 'B5', 'B12'], true)//.updateMask(mask_cloud)//.updateMask(mask_agua)//
            .select(['B4', 'B5', 'B12'])
            .copyProperties(img, ['system:index', 'system:time_start']);
                  }
  function NDCI2(image) {
          var glint = image.subtract(image.select('B12'))
          var NDCIn = glint.normalizedDifference(['B5', 'B4']);
          var NDCIname = NDCIn.rename(['NDCIn_mean']).updateMask(BB_mask);
    return NDCIname.copyProperties(image, ['system:index', 'system:time_start']);
      } 
  function DATA2(img) {
        var date  = ee.Date(img.get('system:time_start'));
        var date_daily = date.format('YYYY-MM-dd');
      return img.set('eedate', ee.Date.fromYMD(date.get('year'), date.get('month'), date.get('day')))
                  .set('year', (date.get('year')))
                  .set('month', (date.get('month')))
                  .set('day', (date.get('day')))
      }
    function DATA(image) {
        var image_data = image.set('eedate', ee.Date.fromYMD(image.get('year'),image.get('month'),image.get('day')))
         return image_data.select('NDCIn_mean');
      } 
    function FACTOR(image) {
         return image.select('NDCIn_mean').divide(1000).copyProperties(image,['system:asset_size', 'year', 'month', 'day', 'eedate', 'system:index']);
      } 
    var SIAC_data = col.filterBounds(region3)
                      .map(DATA).map(FACTOR).sort('eedate', false);
    var sen2cor_data = s2CloudMasked.filterBounds(region3)
                      .map(bandcor).map(NDCI2).map(DATA2).sort('eedate', false);
    var col_data = SIAC_data.merge(sen2cor_data.distinct('eedate'))
    SIAC_data = 0
    sen2cor_data = 0
    s2Clouds = 0
    s2_orig = 0
    s2SrWithCloudMask = 0
    s2CloudMasked = 0
  var GRAYMAP = [
  {   // Dial down the map saturation.
  stylers: [ { saturation: -100 } ]
  },{ // Dial down the label darkness.
  elementType: 'labels',
  stylers: [ { lightness: 20 } ]
  },{ // Simplify the road geometries.
  featureType: 'road',
  elementType: 'geometry',
  stylers: [ { visibility: 'simplified' } ]
  },{ // Turn off road labels.
  featureType: 'road',
  elementType: 'labels',
  stylers: [ { visibility: 'off' } ]
  },{ // Turn off all icons.
  elementType: 'labels.icon',
  stylers: [ { visibility: 'off' } ]
  },{ // Turn off all POIs.
  featureType: 'poi',
  elementType: 'all',
  stylers: [ { visibility: 'off' }]
  }
  ];
  Map.setOptions('Gray', {'Gray': GRAYMAP});
  /////////////////// Faz um zoom no centro da imagem
  var centre = List[select.getValue()].geometry().centroid().coordinates();                     ///// Define the image center
  Map.setCenter(ee.Number(centre.get(0)).getInfo(), ee.Number(centre.get(1)).getInfo(), 10);
  //////////////////// Extract the Year and Month
  var Ano11 = Ano1.getValue()
  fromDate = Anos[Ano11]
  var Ano22 = Ano2.getValue()
  toDate = Anos[Ano22]
  var Mes11 = Mes1.getValue()
  Month1 = Meses[Mes11]
  var Mes22 = Mes2.getValue()
  Month2 = Meses[Mes22]
  ////////////////// Máscaras de água usado
  var BuracoLagosdosPatos = ee.Geometry.Rectangle([-51.18, -30.57, -50.817, -30.77]);
  var BuracoLagosdosPatos1 = ee.Geometry.Rectangle([-51.4625, -31.23, -51.31, -31.39]);
  var BuracoLagosdosPatos2 = ee.Geometry.Rectangle([-51.87, -31.42,  -51.65, -31.67]);
  var LagoadosPatos = ee.FeatureCollection([BuracoLagosdosPatos, BuracoLagosdosPatos1, BuracoLagosdosPatos2])
  var Piaui = ee.FeatureCollection('projects/ee-algalbloom-gee4geo/assets/Reservatorios_Piaui')
  var background = 1;
  var Piaui = ee.Image(background).clip(Piaui).rename('occurrence');
  var LagoadosPatos = ee.Image(background).clip(LagoadosPatos).rename('occurrence');
  var JRC = ee.Image('JRC/GSW1_0/GlobalSurfaceWater');                            //// Get just within Pekel
  var JRC = JRC.select('occurrence')
  var JRC = ee.ImageCollection([JRC.gte(10).selfMask(), LagoadosPatos, Piaui]).mosaic().clipToCollection(Reservatorios)
  var BB_mask = JRC
  ////////////////// Aplica as datas na seleção de imagens NDCI
  var collection1 = col_data                                                        //// Filter the Dates
                    .filterMetadata("year","less_than",toDate + 1)
                    .filterMetadata("year","greater_than",fromDate - 1)
                    .filterMetadata("month","less_than",Month2 + 1)
                    .filterMetadata("month","greater_than",Month1 - 1)
  ///////////////// Aplica uma função para calcular o Chla no ImageCollection e para calcular áreas de Bloom
  var decision_tree = function(image){                                              //// Calculate the Chla 
    var NDCI = image.select('NDCIn_mean').updateMask(BB_mask)
    var Bloom = NDCI.gte(0.025).rename('Bloom')
    var chla = image.expression(
      '(24.49 * ((NDCI + 1) ** 7.48))', {    // 18.45 * ((NDCI + 1) ** 9.23
        'NDCI': image.select('NDCIn_mean'),
      });
    var chla = chla.rename('Chla');
    return chla.addBands(NDCI).addBands(Bloom).copyProperties(image); 
  };
  var chla = collection1.map(decision_tree)
  ////////////// Calcula a frequência de Bloom
  var BloomFreq = chla.select('Bloom').sum().divide(chla.select('Bloom').count()).updateMask(BB_mask);                                            //// Calculate the Bloom Frequency
  //////////////// Define as Cores e palettes das imagens
  var vis = {min:0, max:100, palette: ['blue','green','Yellow','red']};                         //// Color Scale for Chla
  var palettesNDCI = require('users/gena/packages:palettes');                                   //// Color Scale for Bloom
  var visNDCI = {min:-0.2, max:0.3, palette: palettesNDCI.matplotlib.viridis[7]};               //// Color Scale for Bloom
  var palettes = require('users/gena/packages:palettes');                                       //// Color Scale for Bloom
  var vis1 = {min:0, max:1, palette: palettes.cmocean.Balance[7]};                              //// Color Scale for Bloom
  /////////////// Insere as imagens no Mapa
  Map.addLayer(chla.select('NDCIn_mean').mean().clip(region3).updateMask(BB_mask), visNDCI, 'NDCI Temporal MEAN', false)
  Map.addLayer(chla.select('NDCIn_mean').max().clip(region3).updateMask(BB_mask), visNDCI, 'NDCI Temporal MAXIMUM', false);
  Map.addLayer(chla.select('NDCIn_mean').min().clip(region3).updateMask(BB_mask), visNDCI, 'NDCI Temporal MINIMUM', false)
  Map.addLayer(chla.select('Chla').mean().clip(region3).updateMask(BB_mask), vis, 'Chl-a Temporal MEAN')
  Map.addLayer(chla.select('Chla').min().clip(region3).updateMask(BB_mask), vis, 'Chl-a Temporal MINIMUM', false)
  Map.addLayer(chla.select('Chla').max().clip(region3).updateMask(BB_mask), vis, 'Chl-a Temporal MAXIMUM', false);
  Map.addLayer(BloomFreq.clip(region3), vis1, 'Bloom Frequency', false);//// Add the mean Chla Image; 
  //////////////////////////////////////////// Cria o Inspector (o usuário clica na imagem e obtem valores do pixel clicado)
  var header = ui.Label('Inspector', {fontWeight: 'bold', fontSize: '15px'}) ///// nagel
  var toolPanel = ui.Panel([header], 'flow', {width: '200px', position: 'bottom-right'});  
  var dataset = ee.Image(chla.mean().clip(region3))
  var dataset1 = ee.Image(BloomFreq.clip(region3))
  Map.onClick(function(coords) {
      var location = 'lon: ' + coords.lon.toFixed(4) + ' ' +
                     'lat: ' + coords.lat.toFixed(4);
      var click_point = ee.Geometry.Point(coords.lon, coords.lat);
      var demValue = dataset.reduceRegion(ee.Reducer.first(), click_point, 90).evaluate(function(val){
        var demText = 'Mean Chla: ' + val.Chla.toFixed(2);
        toolPanel.widgets().set(2, ui.Label(demText));
      });
      var demValue2 = dataset.reduceRegion(ee.Reducer.first(), click_point, 90).evaluate(function(val2){
        var demText2 = 'Mean NDCI: ' + val2.NDCIn_mean.toFixed(2);
        toolPanel.widgets().set(3, ui.Label(demText2));
      });
      var demValue1 = dataset1.reduceRegion(ee.Reducer.first(), click_point, 90).evaluate(function(val1){
        var demText1 = 'Bloom Frequency: ' + val1.Bloom.toFixed(2);
        toolPanel.widgets().set(4, ui.Label(demText1));
      });
      toolPanel.widgets().set(1, ui.Label(location));
    // Edit: To be temporary, the "loading..." panel number has to be the same as the demText panel number (changed from 1 to 2).
      toolPanel.widgets().set(2, ui.Label("loading..."))
      toolPanel.widgets().set(3, ui.Label("loading..."))
      toolPanel.widgets().set(4, ui.Label("loading..."));
      Map.add(toolPanel);
    });
  ////////////////////////////////////////// Códigos para mostrar a legenda no Mapa
  //////// Legend for Chla 
  function makeColorBarParams(palette) {
    return {
      bbox: [0, 0, 1, 0.1],
      dimensions: '100x10',
      format: 'png',
      min: 0,
      max: 1,
      palette: palette,
    };
  }
  ///////// Cria uma barra de corres para a legenda (CHLA)
  var colorBar_CHLA = ui.Thumbnail({
    image: ee.Image.pixelLonLat().select(0),
    params: makeColorBarParams(vis.palette),
    style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
  });
  ////////// Cria um panel com três números para a legenda (CHLA)
  var legendLabels_CHLA = ui.Panel({
    widgets: [
      ui.Label(vis.min, {margin: '4px 8px'}),
      ui.Label(
          (vis.max / 2),
          {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
      ui.Label(vis.max, {margin: '4px 8px'})
    ],
    layout: ui.Panel.Layout.flow('horizontal')
  });
  ////////// Título da legenda (CHLA)
  var legendTitle_CHLA = ui.Label({
    value: 'Chla Temporal (min, max, mean)',
    style: {fontWeight: 'bold'}
  }); 
  /////// Legend for Algal Bloom
  var palettes = require('users/gena/packages:palettes');
  var vis1 = {min:0, max:1, palette: palettes.cmocean.Balance[7]};
  function makeColorBarParams1(palette) {
    return {
      bbox: [0, 0, 1, 0.1],
      dimensions: '100x10',
      format: 'png',
      min: 0,
      max: 1,
      palette: palette,
    };
  }
  ///////// Cria uma barra de corres para a legenda (BLOOM)
  var colorBar_BLOOM = ui.Thumbnail({
    image: ee.Image.pixelLonLat().select(0),
    params: makeColorBarParams1(vis1.palette),
    style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
  });
  ////////// Cria um panel com três números para a legenda (BLOOM)
  var legendLabels_BLOOM = ui.Panel({
    widgets: [
      ui.Label(vis1.min, {margin: '4px 8px'}),
      ui.Label(
          (vis1.max / 2),
          {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
      ui.Label(vis1.max, {margin: '4px 8px'})
    ],
    layout: ui.Panel.Layout.flow('horizontal')
  });
  ////////// Título da legenda (BLOOM)
  var legendTitle_BLOOM = ui.Label({
    value: 'Bloom Frequency',
    style: {fontWeight: 'bold'}
  });
  ////////// NDCI Legend
  function makeColorBarParams2(palette) {
    return {
      bbox: [0, 0, 1, 0.1],
      dimensions: '100x10',
      format: 'png',
      min: 0,
      max: 1,
      palette: palette,
    };
  }
  ///////// Cria uma barra de corres para a legenda (BLOOM)
  var colorBar_NDCI = ui.Thumbnail({
    image: ee.Image.pixelLonLat().select(0),
    params: makeColorBarParams2(visNDCI.palette),
    style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
  });
  ////////// Cria um panel com três números para a legenda (BLOOM)
  var legendLabels_NDCI = ui.Panel({
    widgets: [
      ui.Label(visNDCI.min, {margin: '4px 8px'}),
      ui.Label(
          (visNDCI.max / 2),
          {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
      ui.Label(visNDCI.max, {margin: '4px 8px'})
    ],
    layout: ui.Panel.Layout.flow('horizontal')
  });
  ////////// Título da legenda (BLOOM)
  var legendTitle_NDCI = ui.Label({
    value: 'NDCI',
    style: {fontWeight: 'bold'}
  });
  /////////////////////// Cria um Panel para incluir as barras e legendas. 
  var legend = ui.Panel({
  style: {
    position: 'top-left',
    padding: '8px 15px'
  }
  });
  ////////////////////// Junta as legendas em um únnico lugar
  var legend = legend.add(legendTitle_NDCI).add(colorBar_NDCI).add(legendLabels_NDCI).add(legendTitle_CHLA)
                .add(colorBar_CHLA).add(legendLabels_CHLA).add(legendTitle_BLOOM).add(colorBar_BLOOM).add(legendLabels_BLOOM)
  Map.add(legend);
  /////////////////////////////////////////////////////// Adicionar botões de download
  ////////// Chla download
  var Chla130 = chla.select('Chla').mean().clip(region3)
  function downloadImg130() {
    var downloadArgs130 = {
      name: 'Chla_Temporal_Mean',
      crs: 'EPSG:3857',
      scale: 30,
      maxPixels: 1e13,
      region: region3.geometry()
   };
   var url130 = Chla130.getDownloadURL(downloadArgs130);
   urlLabel130.setUrl(url130);
   urlLabel130.style().set({shown: true});
  }
  var downloadButton130 = ui.Button('Download Mean Chl-a (30m)', downloadImg130);
  var urlLabel130 = ui.Label('Download', {shown: false});
  var panel130 = ui.Panel([downloadButton130, urlLabel130]);
  var Chla190 = chla.select('Chla').mean().clip(region3)
  function downloadImg190() {
    var downloadArgs190 = {
      name: 'Chla_Temporal_Mean',
      crs: 'EPSG:3857',
      scale: 90,
      maxPixels: 1e13,
      region: region3.geometry()
   };
   var url190 = Chla190.getDownloadURL(downloadArgs190);
   urlLabel190.setUrl(url190);
   urlLabel190.style().set({shown: true});
  }
  var downloadButton190 = ui.Button('Mean Chl-a (90m)', downloadImg190);
  var urlLabel190 = ui.Label('Download', {shown: false});
  var panel190 = ui.Panel([downloadButton190, urlLabel190]);
  ////////// NDCI download
  var img1 = chla.select('NDCIn_mean').mean().clip(region3)
  function downloadImg1() {
    var downloadArgs1 = {
      name: 'NDCI_Temporal_Mean',
      crs: 'EPSG:3857',
      scale: 30,
      maxPixels: 1e13,
      region: region3.geometry()
   };
   var url1 = img1.getDownloadURL(downloadArgs1);
   urlLabel1.setUrl(url1);
   urlLabel1.style().set({shown: true});
  }
  var downloadButton1 = ui.Button('Mean NDCI (30m)', downloadImg1);
  var urlLabel1 = ui.Label('Download', {shown: false});
  var panel1 = ui.Panel([downloadButton1, urlLabel1]);
  var NDCI290 = chla.select('NDCIn_mean').mean().clip(region3)
  function downloadImg290() {
    var downloadArgs290 = {
      name: 'NDCI_Temporal_Mean',
      crs: 'EPSG:3857',
      scale: 90,
      maxPixels: 1e13,
      region: region3.geometry()
   };
   var url290 = NDCI290.getDownloadURL(downloadArgs290);
   urlLabel290.setUrl(url290);
   urlLabel290.style().set({shown: true});
  }
  var downloadButton290 = ui.Button('Mean NDCI (90m)', downloadImg290);
  var urlLabel290 = ui.Label('Download', {shown: false});
  var panel290 = ui.Panel([downloadButton290, urlLabel290]);
  ////////// Bloom download
  var img2 = BloomFreq.clip(region3)
  function downloadImg2() {
    var downloadArgs2 = {
      name: 'Bloom_Frequency',
      crs: 'EPSG:3857',
      scale: 30,
      maxPixels: 1e13,
      region: region3.geometry()
   };
   var url2 = img2.getDownloadURL(downloadArgs2);
   urlLabel2.setUrl(url2);
   urlLabel2.style().set({shown: true});
  }
  var downloadButton2 = ui.Button('Bloom Frequency (30m)', downloadImg2);
  var urlLabel2 = ui.Label('Download', {shown: false});
  var panel2 = ui.Panel([downloadButton2, urlLabel2]);
  var img390 = BloomFreq.clip(region3)
  function downloadImg390() {
    var downloadArgs390 = {
      name: 'Bloom_Frequency',
      crs: 'EPSG:3857',
      scale: 90,
      maxPixels: 1e13,
      region: region3.geometry()
   };
   var url390 = img390.getDownloadURL(downloadArgs390);
   urlLabel390.setUrl(url390);
   urlLabel390.style().set({shown: true});
  }
  var downloadButton390 = ui.Button('Bloom Frequency (90m)', downloadImg390);
  var urlLabel390 = ui.Label('Download', {shown: false});
  var panel390 = ui.Panel([downloadButton390, urlLabel390]);
  var legendDownload = ui.Panel({
    layout: ui.Panel.Layout.flow('horizontal'),
    style: {
      position: 'bottom-left',
      padding: '8px 15px'
    }
    });
  /////// Adiciona todos os downloads em um único só panel
  var legend = legendDownload.add(panel130).add(panel190).add(panel1).add(panel290).add(panel2).add(panel390)
  Map.add(legend);
  ///////////////////////////// Repetir o código do Single Image Analysis ///////////////////////////////////////////////////////////////////
  //////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
  region3 = List[select.getValue()]
  var BuracoLagosdosPatos = ee.Geometry.Rectangle([-51.18, -30.57, -50.817, -30.77]);
  var BuracoLagosdosPatos1 = ee.Geometry.Rectangle([-51.4625, -31.23, -51.31, -31.39]);
  var BuracoLagosdosPatos2 = ee.Geometry.Rectangle([-51.87, -31.42,  -51.65, -31.67]);
  var LagoadosPatos = ee.FeatureCollection([BuracoLagosdosPatos, BuracoLagosdosPatos1, BuracoLagosdosPatos2])
  var Piaui = ee.FeatureCollection('projects/ee-algalbloom-gee4geo/assets/Reservatorios_Piaui')
  var background = 1;
  var Piaui = ee.Image(background).clip(Piaui).rename('occurrence');
  var LagoadosPatos = ee.Image(background).clip(LagoadosPatos).rename('occurrence');
  var JRC = ee.Image('JRC/GSW1_0/GlobalSurfaceWater');                            //// Get just within Pekel
  var JRC = JRC.select('occurrence')
  var JRC = ee.ImageCollection([JRC.gte(10).selfMask(), LagoadosPatos, Piaui]).mosaic().clipToCollection(Reservatorios)
  var BB_mask = JRC
  var now = Date.now();       //getting time at UTC
  var eeNow = ee.Date(now)
  var s2Clouds = ee.ImageCollection('COPERNICUS/S2_CLOUD_PROBABILITY').filterBounds(region3).filterDate('2021-11-01', eeNow);
  var s2_orig = ee.ImageCollection('COPERNICUS/S2_SR').filterBounds(region3).filterDate('2021-11-01', eeNow);
  var MAX_CLOUD_PROBABILITY = 10;
  function maskClouds(img) {
        var clouds = ee.Image(img.get('cloud_mask')).select('probability');
        var isNotCloud = clouds.lt(MAX_CLOUD_PROBABILITY);
        return img.updateMask(isNotCloud);
  }
  function maskEdges(s2_img) {
        return s2_img.updateMask(
            s2_img.select('B8A').mask().updateMask(s2_img.select('B9').mask()));
  }
  s2_orig = s2_orig.map(maskEdges);
  s2Clouds = s2Clouds;
  var s2SrWithCloudMask = ee.Join.saveFirst('cloud_mask').apply({
        primary: s2_orig,
        secondary: s2Clouds,
        condition:
            ee.Filter.equals({leftField: 'system:index', rightField: 'system:index'})
  });
  var s2CloudMasked =
          ee.ImageCollection(s2SrWithCloudMask).map(maskClouds);
  function bandcor (img) {
        var band4 = img.select('B4').multiply(0.935).add(101.52).rename('B4');
        var band5 = img.select('B5').multiply(0.9086).add(75.575).rename('B5');
        var band12 = img.select('B12').multiply(0.8943).rename('B12');
        //var glint = atmcor.subtract(atmcor.select('B12'))//.updateMask(BB_mask);
    return img.addBands([band4, band5, band12], ['B4', 'B5', 'B12'], true)//.updateMask(mask_cloud)//.updateMask(mask_agua)//
            .select(['B4', 'B5', 'B12'])
            .copyProperties(img, ['system:index', 'system:time_start']);
                  }
  function NDCI2(image) {
          var glint = image.subtract(image.select('B12'))
          var NDCIn = glint.normalizedDifference(['B5', 'B4']);
          var NDCIname = NDCIn.rename(['NDCIn_mean']);
    return NDCIname.copyProperties(image, ['system:index', 'system:time_start']);
      } 
  function DATA2(img) {
        var date  = ee.Date(img.get('system:time_start'));
        var date_daily = date.format('YYYY-MM-dd');
      return img.set('eedate', ee.Date.fromYMD(date.get('year'), date.get('month'), date.get('day')))
                  .set('year', (date.get('year')))
                  .set('month', (date.get('month')))
                  .set('day', (date.get('day')))
      }
    function DATA(image) {
        var image_data = image.set('eedate', ee.Date.fromYMD(image.get('year'),image.get('month'),image.get('day')))
         return image_data.select('NDCIn_mean');
      } 
    function FACTOR(image) {
         return image.select('NDCIn_mean').divide(1000).copyProperties(image,['system:asset_size', 'year', 'month', 'day', 'eedate', 'system:index']);
      } 
    var SIAC_data = col.filterBounds(region3)
                      .map(DATA).map(FACTOR).sort('eedate', false);
    var sen2cor_data = s2CloudMasked.filterBounds(region3)
                      .map(bandcor).map(NDCI2).map(DATA2).sort('eedate', false);
    var col_data = SIAC_data.merge(sen2cor_data.distinct('eedate'))
    SIAC_data = 0
    sen2cor_data = 0
    s2Clouds = 0
    s2_orig = 0
    s2SrWithCloudMask = 0
    s2CloudMasked = 0
  var clipe = region3.geometry()
  var visualization = {
  bands: ['occurrence'],
  min: 90,
  max: 100,
  palette: ['00BFFF	']
  };
  var collection11 = ee.ImageCollection('COPERNICUS/S2')
        .select(['B2'])
        .filterBounds(region3)
        // Pre-filter to get less cloudy granules.
        .filter(ee.Filter.neq('system:band_names', []));
  var Meses1 = collection11
    .map(function(image) {
      return ee.Feature(null, {'date': image.date().format('YYYY-MM-dd')})
    })
    .distinct('date')
    .aggregate_array('date')
  var selDate11 = ui.Select({
    placeholder: "Select a date",
  })
  var dateList1 = Meses1
  var selDate1 = ui.Select({placeholder: "Select a date", items: dateList1.getInfo()})
  var button1 = ui.Button({
  label: "Display Image",
  onClick: updateMap1
  })
  var panelSingleChla = ui.Panel({
  style:{width:"450px",backgroundColor:"white"} 
  })
  //ui.root.add(panelSingleChla.add(selDate1).add(button1))
  Map.add(selDate1)
  Map.add(button1)
  function updateMap1(BB_mask, region1, selection1, fromDate1Year, fromDate1Month, fromDate1Day, fcGeom, GRAYMAP) {
      //////////// Pega a região selecionada (reservatório ou bacia)
      var BuracoLagosdosPatos = ee.Geometry.Rectangle([-51.18, -30.57, -50.817, -30.77]);
      var BuracoLagosdosPatos1 = ee.Geometry.Rectangle([-51.4625, -31.23, -51.31, -31.39]);
      var BuracoLagosdosPatos2 = ee.Geometry.Rectangle([-51.87, -31.42,  -51.65, -31.67]);
      var LagoadosPatos = ee.FeatureCollection([BuracoLagosdosPatos, BuracoLagosdosPatos1, BuracoLagosdosPatos2])
      var Piaui = ee.FeatureCollection('projects/ee-algalbloom-gee4geo/assets/Reservatorios_Piaui')
      var background = 1;
      var Piaui = ee.Image(background).clip(Piaui).rename('occurrence');
      var LagoadosPatos = ee.Image(background).clip(LagoadosPatos).rename('occurrence');
      var JRC = ee.Image('JRC/GSW1_0/GlobalSurfaceWater');                            //// Get just within Pekel
      var JRC = JRC.select('occurrence')
      var JRC = ee.ImageCollection([JRC.gte(10).selfMask(), LagoadosPatos, Piaui]).mosaic().clipToCollection(Reservatorios)
      var BB_mask = JRC
      region1 = List[select.getValue()]
      var now = Date.now();       //getting time at UTC
      var eeNow = ee.Date(now)
      var s2Clouds = ee.ImageCollection('COPERNICUS/S2_CLOUD_PROBABILITY').filterBounds(region1).filterDate('2021-11-01', eeNow);
      var s2_orig = ee.ImageCollection('COPERNICUS/S2_SR').filterBounds(region1).filterDate('2021-11-01', eeNow);
      var MAX_CLOUD_PROBABILITY = 10;
      function maskClouds(img) {
        var clouds = ee.Image(img.get('cloud_mask')).select('probability');
        var isNotCloud = clouds.lt(MAX_CLOUD_PROBABILITY);
        return img.updateMask(isNotCloud);
      }
      function maskEdges(s2_img) {
        return s2_img.updateMask(
            s2_img.select('B8A').mask().updateMask(s2_img.select('B9').mask()));
      }
      s2_orig = s2_orig.map(maskEdges);
      s2Clouds = s2Clouds;
      var s2SrWithCloudMask = ee.Join.saveFirst('cloud_mask').apply({
        primary: s2_orig,
        secondary: s2Clouds,
        condition:
            ee.Filter.equals({leftField: 'system:index', rightField: 'system:index'})
      });
      var s2CloudMasked =
          ee.ImageCollection(s2SrWithCloudMask).map(maskClouds);
      function bandcor (img) {
        var band4 = img.select('B4').multiply(0.935).add(101.52).rename('B4');
        var band5 = img.select('B5').multiply(0.9086).add(75.575).rename('B5');
        var band12 = img.select('B12').multiply(0.8943).rename('B12');
        var band44 = img.select('B4').rename('B44');
        var band55 = img.select('B5').rename('B55');
        var band1212 = img.select('B12').rename('B1212');
        //var glint = atmcor.subtract(atmcor.select('B12'))//.updateMask(BB_mask);
        return img.addBands([band4, band5, band12, band44, band55, band1212], ['B4', 'B5', 'B12', 'B44', 'B55', 'B1212'], true).updateMask(BB_mask)//.updateMask(mask_cloud)//.updateMask(mask_agua)//
            .select(['B3', 'B4', 'B5', 'B8', 'B12', 'B44', 'B55', 'B1212'])
            .copyProperties(img, ['system:index', 'system:time_start']);
                  }
      function NDCI2(image) {
          var glint = image.subtract(image.select('B12'))
          var NDCIn = glint.normalizedDifference(['B5', 'B4']);
          var NDCIname = NDCIn.rename(['NDCIn_mean']).updateMask(BB_mask);
        return image.addBands(NDCIname).copyProperties(image, ['system:index', 'system:time_start']);
      } 
      function DATA2(img) {
        var date  = ee.Date(img.get('system:time_start'));
        var date_daily = date.format('YYYY-MM-dd');
        return img.set('eedate', ee.Date.fromYMD(date.get('year'), date.get('month'), date.get('day')))
                  .set('year', (date.get('year')))
                  .set('month', (date.get('month')))
                  .set('day', (date.get('day')))
      }
      function DATA(image) {
        var image_data = image.set('eedate', ee.Date.fromYMD(image.get('year'),image.get('month'),image.get('day')))
         return image_data.select(['NDCIn_mean']);
      } 
      function FACTOR(image) {
         return image.select('NDCIn_mean').divide(1000).copyProperties(image,['system:asset_size', 'year', 'month', 'day', 'eedate', 'system:index']);
      } 
      var SIAC_data = col.filterBounds(region1)
                      .map(DATA).map(FACTOR).sort('eedate', false);
      var sen2cor_data = s2CloudMasked.filterBounds(region1)
                      .map(bandcor).map(NDCI2).map(DATA2).sort('eedate', false);
      var col_data = SIAC_data.merge(sen2cor_data.select('NDCIn_mean').distinct('eedate'))
      SIAC_data = 0
      s2Clouds = 0
      s2_orig = 0
      s2SrWithCloudMask = 0
      s2CloudMasked = 0
      ///////////// O mapa é clareado novamente 
      Map.clear()
      ///////////// Adiciona o mapa base cinza
      var GRAYMAP = [
      {   // Dial down the map saturation.
      stylers: [ { saturation: -100 } ]
      },{ // Dial down the label darkness.
      elementType: 'labels',
      stylers: [ { lightness: 20 } ]
      },{ // Simplify the road geometries.
      featureType: 'road',
      elementType: 'geometry',
      stylers: [ { visibility: 'simplified' } ]
      },{ // Turn off road labels.
      featureType: 'road',
      elementType: 'labels',
      stylers: [ { visibility: 'off' } ]
      },{ // Turn off all icons.
      elementType: 'labels.icon',
      stylers: [ { visibility: 'off' } ]
      },{ // Turn off all POIs.
      featureType: 'poi',
      elementType: 'all',
      stylers: [ { visibility: 'off' }]
      }
      ];
      Map.setOptions('Gray', {'Gray': GRAYMAP});
      ////////// Pega a máscara de água de Pekel (caso queira usar posteriormente)
      var BuracoLagosdosPatos = ee.Geometry.Rectangle([-51.18, -30.57, -50.817, -30.77]);
      var BuracoLagosdosPatos1 = ee.Geometry.Rectangle([-51.4625, -31.23, -51.31, -31.39]);
      var BuracoLagosdosPatos2 = ee.Geometry.Rectangle([-51.87, -31.42,  -51.65, -31.67]);
      var LagoadosPatos = ee.FeatureCollection([BuracoLagosdosPatos, BuracoLagosdosPatos1, BuracoLagosdosPatos2])
      var Piaui = ee.FeatureCollection('projects/ee-algalbloom-gee4geo/assets/Reservatorios_Piaui')
      var background = 1;
      var Piaui = ee.Image(background).clip(Piaui).rename('occurrence');
      var LagoadosPatos = ee.Image(background).clip(LagoadosPatos).rename('occurrence');
      var JRC = ee.Image('JRC/GSW1_0/GlobalSurfaceWater');                            //// Get just within Pekel
      var JRC = JRC.select('occurrence')
      var JRC = ee.ImageCollection([JRC.gte(10).selfMask(), LagoadosPatos, Piaui]).mosaic().clipToCollection(Reservatorios)
      var BB_mask = JRC
      //// Definir o centro da imagem
      var centre1 = List[select.getValue()].geometry().centroid().coordinates();
      Map.setCenter(ee.Number(centre1.get(0)).getInfo(), ee.Number(centre1.get(1)).getInfo(), 10);
      ///////////// Os botões de escolher data e o botão de processar é mostrado novamente (foram eliminados no Map.clear)
      Map.add(selDate1)
      Map.add(button1)
      ////////// Pega as datas selecionada e cria um intervalo (para adicionar uma image RGB Sentinel como Layer)
      var fromDateSentinel = ee.Date(selDate1.getValue()).advance(-1,"day").format("yyyy-MM-dd"); ////// Uma data do dia anterior à selecionada
      var toDateSentinel = ee.Date(selDate1.getValue()).advance(+1,"day").format("yyyy-MM-dd");   ////// Uma data três dias posteriores à selecionada (possibilita cobrir uma área maior em locais de diferente passagem do satélite)
      //////////////////////////////////////////////// Macrófitas 
      function NDVI(image) {
          var NDVIn = image.normalizedDifference(['B8', 'B44']);
          var NDVIname = NDVIn.rename(['NDVIn']).updateMask(BB_mask)//.multiply(1000).round();
        return image.addBands(NDVIname).copyProperties(image, ['system:index', 'system:time_start']);
      } 
      function NDWI(image) {
          var NDWIn = image.normalizedDifference(['B3', 'B1212']);
          var NDWIname = NDWIn.rename(['NDWIn']).updateMask(BB_mask)//.multiply(1000).round();
        return image.addBands(NDWIname).copyProperties(image, ['system:index', 'system:time_start']);
      }
      function NDBI(image) {
          var NDBIn = image.normalizedDifference(['B1212', 'B8']);
          var NDBIname = NDBIn.rename(['NDBIn']).updateMask(BB_mask)//.multiply(1000).round();
        return image.addBands(NDBIname).copyProperties(image, ['system:index', 'system:time_start']);
      } 
      function macro_class(image) {
        var NDCI = image.select('NDCIn_mean')
        var NDWI = image.select('NDWIn')
        var NDBI = image.select('NDBIn')
        var macrofitas = NDCI.gte(0.024).and(NDWI.lt(0.6)).and(NDBI.lt(-0.5)).selfMask().rename('macrof');
        var solo = NDCI.gte(0.024).and(NDWI.lt(0.6)).and(NDBI.gt(-0.5)).rename('solo');
        var ndci_macro = NDCI.where(macrofitas, 55).rename('NDCI_macro').eq(55).selfMask() 
        return image.addBands([ndci_macro])}//.unmask(solo)}
      sen2cor_data = sen2cor_data
                  .filterDate(fromDateSentinel, toDateSentinel)
                  .map(NDWI)
                  .map(NDBI)
                  .map(macro_class)
      var macrofita = sen2cor_data.select('NDCI_macro').mean()
      ////////// Pega uma imagem Sentinel da data para adicionar como um Layer
      var Sentinel = ee.ImageCollection('COPERNICUS/S2')
        .filterDate(fromDateSentinel, toDateSentinel)
        .select(['B4', 'B3', 'B2'])
        .filterBounds(region3)
      var rgbVis = {
        min: 300,
        max: 1300,
        bands: ['B4', 'B3', 'B2'],
      };
      ////////// Pega as datas selecionada para filtrar a coleção de NDCI
      fromDate1Year = ee.Date(selDate1.getValue()).format("yyyy"); /// Pega o ano
      fromDate1Month = ee.Date(selDate1.getValue()).format("MM");  /// Pega o mês
      fromDate1Day = ee.Date(selDate1.getValue()).format("dd");    /// Pega o dia
      //////// Coleção de imagem NDCI (filtrar pela data)
      var collection2 = col_data                                                        
                        .filterMetadata("year","equals", ee.Number.parse(fromDate1Year))
                        .filterMetadata("month","equals", ee.Number.parse(fromDate1Month))
                        .filterMetadata("day","equals", ee.Number.parse(fromDate1Day))
      ////////// Função para calcular o Chla e Bloom
      var decision_tree = function(image){                                              //// Calculate the Chla 
        var NDCI = image.select('NDCIn_mean').updateMask(BB_mask)
        var Bloom = NDCI.gte(0.025).rename('Bloom')
        var chla = image.expression(
          '(24.49 * ((NDCI + 1) ** 7.48))', {
            'NDCI': image.select('NDCIn_mean'),
          });
        var chla = chla.rename('Chla').updateMask(BB_mask);
        return chla.addBands(NDCI).addBands(Bloom).copyProperties(image); 
      };
      var chla1 = collection2.map(decision_tree).mean().updateMask(BB_mask)    //// Coloca-se média para formar uma imagem ee.Image (média de uma imagem sem mudar os valores)
      /////// Pegar os valores de NDCI e dividir em classes tróficas
      collection2 = collection2.mean()   //// Coloca-se uma média para transformar em ee.Image
      var slice = collection2.expression(
            "(b('NDCIn_mean') > 0.1265) ? 5" +
            ": (b('NDCIn_mean') > 0.0245) ? 4" +
            ": (b('NDCIn_mean') > -0.0934) ? 3" +
            ": (b('NDCIn_mean') > -0.13) ? 2" +
            ": (b('NDCIn_mean') > -0.30) ? 1" +
            ": -99" );
      var mask2 = slice.neq(-99)
      var slicename = slice.rename(['NDCI_class']).updateMask(mask2);
      ////// Cria as Palettes para os mapas
      var vis = {min:0, max:100, palette: ['blue','green','Yellow','red']};                         //// Color Scale for Chla
      var palettesNDCI = require('users/gena/packages:palettes');                                   //// Color Scale for NDCI
      var visNDCI = {min:-0.2, max:0.3, palette: palettesNDCI.matplotlib.viridis[7]};               //// Color Scale for NDCI
      var vis1 = {min:0, max:1, palette: ['000000', '00FF00']};                                     //// Color Scale for Bloom
      var visIET = {min:1, max:5, palette: ['#0000FF', '#00FFFF', '#008000', '#FFBF00', '#FF0000']};///  Color Scale for 
      ////// Adicionar os Layers
      Map.addLayer(Sentinel, rgbVis, 'Sentinel RGB')  
      Map.addLayer(chla1.select('NDCIn_mean').clip(region1), visNDCI, 'NDCI value', false)
      Map.addLayer(chla1.select('Chla').clip(region1), vis, 'Chl-a Concentration')
      Map.addLayer(slicename.select('NDCI_class').clip(region1), visIET, 'TSI Classes', false)
      Map.addLayer(chla1.select('Bloom').clip(region1), vis1, 'BLOOM', false)
      //Map.addLayer(macrofita.clip(region3), {palette: ['red']}, 'Macrófitas', false);  
      ///////////////////////// Legendas /////////////////////////////////////////////////////////////
      ///////// Chla 
      /// Criar um thumbnail (CHLA)
      var vis = {min:0, max:100, palette: ['blue','green','Yellow','red']};
      function makeColorBarParams(palette) {
        return {
          bbox: [0, 0, 1, 0.1],
          dimensions: '100x10',
          format: 'png',
          min: 0,
          max: 1,
          palette: palette,
        };
      }
    //// Criação de uma barra de cores (CHLA)
      var colorBar_CHLA = ui.Thumbnail({
        image: ee.Image.pixelLonLat().select(0),
        params: makeColorBarParams(vis.palette),
        style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
      });
    ////// Create a panel with three numbers for the legend. (CHLA)
      var legendLabels_CHLA = ui.Panel({
        widgets: [
          ui.Label(vis.min, {margin: '4px 8px'}),
          ui.Label(
              (vis.max / 2),
              {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
          ui.Label(vis.max, {margin: '4px 8px'})
        ],
        layout: ui.Panel.Layout.flow('horizontal')
      });
      ////// Título da legenda (CHLA)
      var legendTitle_CHLA = ui.Label({
        value: 'Concentration of Chla',
        style: {fontWeight: 'bold'}
      });
      /////// Legenda para Bloom
      /// Criar um thumbnail (BLOOM)
      function makeColorBarParams1(palette) {
        return {
          bbox: [0, 0, 1, 0.1],
          dimensions: '100x10',
          format: 'png',
          min: 0,
          max: 1,
          palette: palette,
        };
      }
      //// Criação de uma barra de cores (BLOOM)
      var colorBar_BLOOM = ui.Thumbnail({
        image: ee.Image.pixelLonLat().select(0),
        params: makeColorBarParams1(vis1.palette),
        style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
      });
      ////// Título da legenda (BLOOM)
      var legend_BLOOM = ui.Panel({
      style: {
        position: 'top-left',
        padding: '8px 15px'
      }
      });
      ////// Cria e estiliza as classes de Bloom 
      var makeRow = function(color, name) {
          var colorBox = ui.Label({
            style: {
              backgroundColor: '#' + color,
              padding: '10px',
              margin: '0 0 4px 0'
            }
          });
          var description = ui.Label({
            value: name,
            style: {margin: '0 0 4px 6px'}
          });
          return ui.Panel({
            widgets: [colorBox, description],
            layout: ui.Panel.Layout.Flow('horizontal')
          });
      };
      var legendTitle_BLOOM = ui.Label({
        value: 'Bloom',
        style: {fontWeight: 'bold'}
      });
      var palette = ['000000', '00FF00'];
      var names = ['Non-Bloom','Bloom'];
      for (var i = 0; i < 2; i++) {
        legend_BLOOM.add(makeRow(palette[i], names[i]));
        }  
       /////// Legend for classes IET
      function makeColorBarParamsIET(palette) {
        return {
          bbox: [0, 0, 1, 0.1],
          dimensions: '100x10',
          format: 'png',
          min: 0,
          max: 1,
          palette: palette,
        };
      }
      //// Criação de uma barra de cores (IET)
      var colorBarIET = ui.Thumbnail({
        image: ee.Image.pixelLonLat().select(0),
        params: makeColorBarParamsIET(visIET.palette),
        style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
      });
      ////// Create a panel with three numbers for the legend. (IET)
      var legendIET = ui.Panel({
      style: {
        position: 'top-left',
        padding: '8px 15px'
      }
      });
      ////// Cria e estiliza as classes de IET 
      var makeRow = function(color, name) {
          // Create the label that is actually the colored box.
          var colorBox = ui.Label({
            style: {
              backgroundColor: '#' + color,
              // Use padding to give the box height and width.
              padding: '10px',
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
            layout: ui.Panel.Layout.Flow('horizontal')
          });
      };
      var legendTitleIET = ui.Label({
        value: 'TSI Classes',
        style: {fontWeight: 'bold'}
      });
      var paletteIET = ['0000FF', '00FFFF', '008000', 'FFBF00', 'FF0000']; // Arrumado
      // name of the legend
      var namesIET = ['Oligo','Meso', 'Eutrophic','Super', 'Hyper'];
      // Add color and and names
      for (var i = 0; i < 5; i++) {
        legendIET.add(makeRow(paletteIET[i], namesIET[i]));
        }  
      ////////// NDCI Legend
      function makeColorBarParams2(palette) {
        return {
          bbox: [0, 0, 1, 0.1],
          dimensions: '100x10',
          format: 'png',
          min: 0,
          max: 1,
          palette: palette,
        };
      }
      //// Criação de uma barra de cores (NDCI)
      var colorBar_NDCI = ui.Thumbnail({
        image: ee.Image.pixelLonLat().select(0),
        params: makeColorBarParams2(visNDCI.palette),
        style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
      });
      ////// Create a panel with three numbers for the legend. (NDCI)
      var legendLabels_NDCI = ui.Panel({
        widgets: [
          ui.Label(visNDCI.min, {margin: '4px 8px'}),
          ui.Label(
              (visNDCI.max / 2),
              {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
          ui.Label(visNDCI.max, {margin: '4px 8px'})
        ],
        layout: ui.Panel.Layout.flow('horizontal')
      });
      ////// Título da legenda (NDCI)
      var legendTitle_NDCI = ui.Label({
        value: 'NDCI',
        style: {fontWeight: 'bold'}
      });
      //////// Panel inicial para hospedar todas as legendas 
      var legend = ui.Panel({
      style: {
        position: 'top-left',
        padding: '8px 15px'
      }
      });
      ///////// Adicionar as legendas
      var legend = legend.add(legendTitle_NDCI).add(colorBar_NDCI).add(legendLabels_NDCI).add(legendTitle_CHLA)
                    .add(colorBar_CHLA).add(legendLabels_CHLA).add(legendTitle_BLOOM).add(legend_BLOOM).add(legendTitleIET).add(legendIET)
      Map.add(legend);
      ////////////////// Add Chla Download button /////////////////////////////////////////////////////
      var mask = ee.Image.constant(1).clip(region1.geometry()).mask().not()
      var img = chla1.select('Chla').clip(region1).unmask(0)
      function downloadImg() {
        var downloadArgs = {
          name: 'Chla_image',
          crs: 'EPSG:3857',
          scale: 30,
          maxPixels: 1e13,
          region: region1.geometry()
       };
       var url = img.getDownloadURL(downloadArgs);
       urlLabel.setUrl(url);
       urlLabel.style().set({shown: true});
      }
      var downloadButton = ui.Button('Download Chl-a (30m)', downloadImg);
      var urlLabel = ui.Label('Download', {shown: false});
      var panel = ui.Panel([downloadButton, urlLabel]);
      var img999 = chla1.select('Chla').clip(region1).unmask(0)
      function downloadImg999() {
        var downloadArgs = {
          name: 'Chla_image',
          crs: 'EPSG:3857',
          scale: 90,
          maxPixels: 1e13,
          region: region1.geometry()
       };
       var url999 = img999.getDownloadURL(downloadArgs999);
       urlLabel999.setUrl(url999);
       urlLabel999.style().set({shown: true});
      }
      var downloadButton999 = ui.Button('Chl-a (90m)', downloadImg999);
      var urlLabel999 = ui.Label('Download', {shown: false});
      var panel999 = ui.Panel([downloadButton999, urlLabel999]);
      /////// Add Chla Download button 
      var img1 = chla1.select('NDCIn_mean').clip(region1)
      function downloadImg1() {
        var downloadArgs1 = {
          name: 'NDCI_image',
          crs: 'EPSG:3857',
          scale: 30,
          maxPixels: 1e13,
          region: region1.geometry()
       };
       var url1 = img1.getDownloadURL(downloadArgs1);
       urlLabel1.setUrl(url1);
       urlLabel1.style().set({shown: true});
      }
      var downloadButton1 = ui.Button('Download NDCI (30m)', downloadImg1);
      var urlLabel1 = ui.Label('Download', {shown: false});
      var panel1 = ui.Panel([downloadButton1, urlLabel1]);
      var img11 = chla1.select('NDCIn_mean').clip(region1)
      function downloadImg11() {
        var downloadArgs11 = {
          name: 'NDCI_image',
          crs: 'EPSG:3857',
          scale: 90,
          maxPixels: 1e13,
          region: region1.geometry()
       };
       var url11 = img11.getDownloadURL(downloadArgs11);
       urlLabel11.setUrl(url11);
       urlLabel11.style().set({shown: true});
      }
      var downloadButton11 = ui.Button('NDCI (90m)', downloadImg11);
      var urlLabel11 = ui.Label('Download', {shown: false});
      var panel11 = ui.Panel([downloadButton11, urlLabel11]);
      /////// Add Bloom Download button
      var img2 = chla1.select('Bloom').clip(region1)
      function downloadImg2() {
        var downloadArgs2 = {
          name: 'Bloom_image',
          crs: 'EPSG:3857',
          scale: 30,
          maxPixels: 1e13,
          region: region1.geometry()
       };
       var url2 = img2.getDownloadURL(downloadArgs2);
       urlLabel2.setUrl(url2);
       urlLabel2.style().set({shown: true});
      }
      var downloadButton2 = ui.Button('Bloom Class (30m)', downloadImg2);
      var urlLabel2 = ui.Label('Download', {shown: false});
      var panel2 = ui.Panel([downloadButton2, urlLabel2]);
      var img22 = chla1.select('Bloom').clip(region1)
      function downloadImg22() {
        var downloadArgs22 = {
          name: 'Bloom_image',
          crs: 'EPSG:3857',
          scale: 90,
          maxPixels: 1e13,
          region: region1.geometry()
       };
       var url22 = img22.getDownloadURL(downloadArgs22);
       urlLabel22.setUrl(url22);
       urlLabel22.style().set({shown: true});
      }
      var downloadButton22 = ui.Button('Bloom Class (90m)', downloadImg22);
      var urlLabel22 = ui.Label('Download', {shown: false});
      var panel22 = ui.Panel([downloadButton22, urlLabel22]);
      /////// Add IET Download button
      var img3 = slicename.select('NDCI_class').clip(region1)
      function downloadImg3() {
        var downloadArgs3 = {
          name: 'NDCI_image',
          crs: 'EPSG:3857',
          scale: 30,
          maxPixels: 1e13,
          region: region1.geometry()
       };
       var url3 = img3.getDownloadURL(downloadArgs3);
       urlLabel3.setUrl(url3);
       urlLabel3.style().set({shown: true});
      }
      var downloadButton3 = ui.Button('TSI Class (30m)', downloadImg3);
      var urlLabel3 = ui.Label('Download', {shown: false});
      var panel3 = ui.Panel([downloadButton3, urlLabel3]);
      var img33 = slicename.select('NDCI_class').clip(region1)
      function downloadImg33() {
        var downloadArgs33 = {
          name: 'NDCI_image',
          crs: 'EPSG:3857',
          scale: 90,
          maxPixels: 1e13,
          region: region1.geometry()
       };
       var url33 = img33.getDownloadURL(downloadArgs33);
       urlLabel33.setUrl(url33);
       urlLabel33.style().set({shown: true});
      }
      var downloadButton33 = ui.Button('TSI Class (90m)', downloadImg33);
      var urlLabel33 = ui.Label('Download', {shown: false});
      var panel33 = ui.Panel([downloadButton33, urlLabel33]);
      var legendDownload = ui.Panel({
        layout: ui.Panel.Layout.flow('horizontal'),
        style: {
          position: 'bottom-left',
          padding: '8px 15px'
        }
        });
      var legend = legendDownload.add(panel).add(panel999).add(panel1).add(panel2).add(panel22).add(panel3).add(panel33)
      Map.add(legend);
    //////////////////////////////////////////// Cria o Inspector (o usuário clica na imagem e obtem valores do pixel clicado)  
    var header = ui.Label('Inspector', {fontWeight: 'bold', fontSize: '15px'}) 
    var toolPanel = ui.Panel([header], 'flow', {width: '200px', position: 'bottom-right'});  
    var dataset = ee.Image(chla1.clip(region1))
    Map.onClick(function(coords) {
      var location = 'lon: ' + coords.lon.toFixed(3) + ' ' +
                     'lat: ' + coords.lat.toFixed(3);
      var click_point = ee.Geometry.Point(coords.lon, coords.lat);
      var demValue = dataset.reduceRegion(ee.Reducer.first(), click_point, 90).evaluate(function(val){
        var demText = 'Chla: ' + val.Chla.toFixed(2) + '   ' + 'NDCI: ' + val.NDCIn_mean.toFixed(2);
        toolPanel.widgets().set(2, ui.Label(demText));
      });
      toolPanel.widgets().set(1, ui.Label(location));
    // Edit: To be temporary, the "loading..." panel number has to be the same as the demText panel number (changed from 1 to 2).
      toolPanel.widgets().set(2, ui.Label("loading..."));
      Map.add(toolPanel);
    });
          } 
}
/////////////////////////////// OME IMAGE ANALYSIS //////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////// FUNÇÃO TESTE PARA CALCULAR A LISTA DE DATAS /////////////////////////////////////
function getDate(BB_mask, region3, region1, selection1, fromDate1Year, fromDate1Month, fromDate1Day, fcGeom, GRAYMAP) {
  //////////// Exclui coisas da imagem
  Map.clear()
  ////////////// Zoom para a região escolhida
  var centre1 = List[select.getValue()].geometry().centroid().coordinates();
  Map.setCenter(ee.Number(centre1.get(0)).getInfo(), ee.Number(centre1.get(1)).getInfo(), 10);
  ///////////// Adiciona um mapabase
  var GRAYMAP = [
  {   // Dial down the map saturation.
  stylers: [ { saturation: -100 } ]
  },{ // Dial down the label darkness.
  elementType: 'labels',
  stylers: [ { lightness: 20 } ]
  },{ // Simplify the road geometries.
  featureType: 'road',
  elementType: 'geometry',
  stylers: [ { visibility: 'simplified' } ]
  },{ // Turn off road labels.
  featureType: 'road',
  elementType: 'labels',
  stylers: [ { visibility: 'off' } ]
  },{ // Turn off all icons.
  elementType: 'labels.icon',
  stylers: [ { visibility: 'off' } ]
  },{ // Turn off all POIs.
  featureType: 'poi',
  elementType: 'all',
  stylers: [ { visibility: 'off' }]
  }
  ];
  Map.setOptions('Gray', {'Gray': GRAYMAP});
  /////////// Seleciona a região escolhida
  region3 = List[select.getValue()]
  var clipe = region3.geometry()
  ////////// Adiciona um layer de água no reservatório desejado
  var visualization = {
  bands: ['occurrence'],
  min: 90,
  max: 100,
  palette: ['00BFFF	']
  };
  Map.addLayer(agua.clip(clipe), visualization, 'Water Bodies');
  //////////// Pega uma coleção de imagens Sentinel (para identificar as datas disponíveis)
  var collection11 = ee.ImageCollection('COPERNICUS/S2')
        .select(['B2'])
        .filterBounds(region3)
        // Pre-filter to get less cloudy granules.
        .filter(ee.Filter.neq('system:band_names', []))
        .filter(ee.Filter.lt('CLOUDY_PIXEL_PERCENTAGE',90));
  //////////////// Cria uma coleção de datas
  var Meses1 = collection11
    .map(function(image) {
      return ee.Feature(null, {'date': image.date().format('YYYY-MM-dd')})
    })
    .distinct('date')
    .aggregate_array('date')
  //////////////// Widgets para fornecer as datas disponíveis e para selecioná-las
  var dateList1 = Meses1
  var selDate1 = ui.Select({placeholder: "Select a date", items: dateList1.getInfo()})
  ///////////////// Botão para processar o single image analysis
  var button1 = ui.Button({
  label: "Display Image",
  onClick: updateMap1
  })
  /////// Adiciona no mapa os botões para escolher a data e o botão para mostrar a imagem. 
  Map.add(selDate1)
  Map.add(button1)
  ////////////////////////////////// Função para processar o Single image analysis
  function updateMap1(region1, selection1, fromDate1Year, fromDate1Month, fromDate1Day, fcGeom, GRAYMAP) {
      var BuracoLagosdosPatos = ee.Geometry.Rectangle([-51.18, -30.57, -50.817, -30.77]);
      var BuracoLagosdosPatos1 = ee.Geometry.Rectangle([-51.4625, -31.23, -51.31, -31.39]);
      var BuracoLagosdosPatos2 = ee.Geometry.Rectangle([-51.87, -31.42,  -51.65, -31.67]);
      var LagoadosPatos = ee.FeatureCollection([BuracoLagosdosPatos, BuracoLagosdosPatos1, BuracoLagosdosPatos2])
      var Piaui = ee.FeatureCollection('projects/ee-algalbloom-gee4geo/assets/Reservatorios_Piaui')
      var background = 1;
      var Piaui = ee.Image(background).clip(Piaui).rename('occurrence');
      var LagoadosPatos = ee.Image(background).clip(LagoadosPatos).rename('occurrence');
      var JRC = ee.Image('JRC/GSW1_0/GlobalSurfaceWater');                            //// Get just within Pekel
      var JRC = JRC.select('occurrence')
      var JRC = ee.ImageCollection([JRC.gte(10).selfMask(), LagoadosPatos, Piaui]).mosaic().clipToCollection(Reservatorios)
      var BB_mask = JRC
      //////////// Pega a região selecionada (reservatório ou bacia)
      region1 = List[select.getValue()]
      var now = Date.now();       //getting time at UTC
      var eeNow = ee.Date(now)
      var s2Clouds = ee.ImageCollection('COPERNICUS/S2_CLOUD_PROBABILITY').filterBounds(region1).filterDate('2021-11-01', eeNow);
      var s2_orig = ee.ImageCollection('COPERNICUS/S2_SR').filterBounds(region1).filterDate('2021-11-01', eeNow);
      var MAX_CLOUD_PROBABILITY = 10;
      function maskClouds(img) {
        var clouds = ee.Image(img.get('cloud_mask')).select('probability');
        var isNotCloud = clouds.lt(MAX_CLOUD_PROBABILITY);
        return img.updateMask(isNotCloud);
      }
      function maskEdges(s2_img) {
        return s2_img.updateMask(
            s2_img.select('B8A').mask().updateMask(s2_img.select('B9').mask()));
      }
      s2_orig = s2_orig.map(maskEdges);
      s2Clouds = s2Clouds;
      var s2SrWithCloudMask = ee.Join.saveFirst('cloud_mask').apply({
        primary: s2_orig,
        secondary: s2Clouds,
        condition:
            ee.Filter.equals({leftField: 'system:index', rightField: 'system:index'})
      });
      var s2CloudMasked =
          ee.ImageCollection(s2SrWithCloudMask).map(maskClouds);
      function bandcor (img) {
        var band4 = img.select('B4').multiply(0.935).add(101.52).rename('B4');
        var band5 = img.select('B5').multiply(0.9086).add(75.575).rename('B5');
        var band12 = img.select('B12').multiply(0.8943).rename('B12');
        var band44 = img.select('B4').rename('B44');
        var band55 = img.select('B5').rename('B55');
        var band1212 = img.select('B12').rename('B1212');
        //var glint = atmcor.subtract(atmcor.select('B12'))//.updateMask(BB_mask);
        return img.addBands([band4, band5, band12, band44, band55, band1212], ['B4', 'B5', 'B12', 'B44', 'B55', 'B1212'], true).updateMask(BB_mask)//.updateMask(mask_cloud)//.updateMask(mask_agua)//
            .select(['B3', 'B4', 'B5', 'B8', 'B12', 'B44', 'B55', 'B1212'])
            .copyProperties(img, ['system:index', 'system:time_start']);
                  }
      function NDCI2(image) {
          var glint = image.subtract(image.select('B12'))
          var NDCIn = glint.normalizedDifference(['B5', 'B4']);
          var NDCIname = NDCIn.rename(['NDCIn_mean']).updateMask(BB_mask.selfMask());
        return image.addBands(NDCIname).copyProperties(image, ['system:index', 'system:time_start']);
      } 
      function DATA2(img) {
        var date  = ee.Date(img.get('system:time_start'));
        var date_daily = date.format('YYYY-MM-dd');
        return img.set('eedate', ee.Date.fromYMD(date.get('year'), date.get('month'), date.get('day')))
                  .set('year', (date.get('year')))
                  .set('month', (date.get('month')))
                  .set('day', (date.get('day')))
      }
      function DATA(image) {
        var image_data = image.set('eedate', ee.Date.fromYMD(image.get('year'),image.get('month'),image.get('day')))
         return image_data.select(['NDCIn_mean']);
      } 
      function FACTOR(image) {
         return image.select('NDCIn_mean').divide(1000).copyProperties(image,['system:asset_size', 'year', 'month', 'day', 'eedate', 'system:index']);
      } 
      var SIAC_data = col.filterBounds(region1)
                      .map(DATA).map(FACTOR).sort('eedate', false);
      var sen2cor_data = s2CloudMasked.filterBounds(region1)
                      .map(bandcor).map(NDCI2).map(DATA2).sort('eedate', false);
      var col_data = SIAC_data.merge(sen2cor_data.select('NDCIn_mean').distinct('eedate'))
      SIAC_data = 0
      s2Clouds = 0
      s2_orig = 0
      s2SrWithCloudMask = 0
      s2CloudMasked = 0
      ///////////// O mapa é clareado novamente 
      Map.clear()
      ///////////// Adiciona o mapa base cinza
      var GRAYMAP = [
      {   // Dial down the map saturation.
      stylers: [ { saturation: -100 } ]
      },{ // Dial down the label darkness.
      elementType: 'labels',
      stylers: [ { lightness: 20 } ]
      },{ // Simplify the road geometries.
      featureType: 'road',
      elementType: 'geometry',
      stylers: [ { visibility: 'simplified' } ]
      },{ // Turn off road labels.
      featureType: 'road',
      elementType: 'labels',
      stylers: [ { visibility: 'off' } ]
      },{ // Turn off all icons.
      elementType: 'labels.icon',
      stylers: [ { visibility: 'off' } ]
      },{ // Turn off all POIs.
      featureType: 'poi',
      elementType: 'all',
      stylers: [ { visibility: 'off' }]
      }
      ];
      Map.setOptions('Gray', {'Gray': GRAYMAP});
      ////////// Pega a máscara de água de Pekel (caso queira usar posteriormente)
      var BuracoLagosdosPatos = ee.Geometry.Rectangle([-51.18, -30.57, -50.817, -30.77]);
      var BuracoLagosdosPatos1 = ee.Geometry.Rectangle([-51.4625, -31.23, -51.31, -31.39]);
      var BuracoLagosdosPatos2 = ee.Geometry.Rectangle([-51.87, -31.42,  -51.65, -31.67]);
      var LagoadosPatos = ee.FeatureCollection([BuracoLagosdosPatos, BuracoLagosdosPatos1, BuracoLagosdosPatos2])
      var Piaui = ee.FeatureCollection('projects/ee-algalbloom-gee4geo/assets/Reservatorios_Piaui')
      var background = 1;
      var Piaui = ee.Image(background).clip(Piaui).rename('occurrence');
      var LagoadosPatos = ee.Image(background).clip(LagoadosPatos).rename('occurrence');
      var JRC = ee.Image('JRC/GSW1_0/GlobalSurfaceWater');                            //// Get just within Pekel
      var JRC = JRC.select('occurrence')
      var JRC = ee.ImageCollection([JRC.gte(10).selfMask(), LagoadosPatos, Piaui]).mosaic().clipToCollection(Reservatorios)
      var BB_mask = JRC
      //// Definir o centro da imagem
      var centre1 = List[select.getValue()].geometry().centroid().coordinates();
      Map.setCenter(ee.Number(centre1.get(0)).getInfo(), ee.Number(centre1.get(1)).getInfo(), 10);
      ///////////// Os botões de escolher data e o botão de processar é mostrado novamente (foram eliminados no Map.clear)
      Map.add(selDate1)
      Map.add(button1)
      ////////// Pega as datas selecionada e cria um intervalo (para adicionar uma image RGB Sentinel como Layer)
      var fromDateSentinel = ee.Date(selDate1.getValue()).advance(-1,"day").format("yyyy-MM-dd"); ////// Uma data do dia anterior à selecionada
      var toDateSentinel = ee.Date(selDate1.getValue()).advance(+1,"day").format("yyyy-MM-dd");   ////// Uma data três dias posteriores à selecionada (possibilita cobrir uma área maior em locais de diferente passagem do satélite)
      //////////////////////////////////////////////// Macrófitas 
      function NDWI(image) {
          var NDWIn = image.normalizedDifference(['B3', 'B1212']);
          var NDWIname = NDWIn.rename(['NDWIn']).updateMask(BB_mask)//.multiply(1000).round();
        return image.addBands(NDWIname).copyProperties(image, ['system:index', 'system:time_start']);
      }
      function NDBI(image) {
          var NDBIn = image.normalizedDifference(['B1212', 'B8']);
          var NDBIname = NDBIn.rename(['NDBIn']).updateMask(BB_mask)//.multiply(1000).round();
        return image.addBands(NDBIname).copyProperties(image, ['system:index', 'system:time_start']);
      } 
      function macro_class(image) {
        var NDCI = image.select('NDCIn_mean')
        var NDWI = image.select('NDWIn')
        var NDBI = image.select('NDBIn')
        var macrofitas = NDCI.gte(0.024).and(NDWI.lt(0.6)).and(NDBI.lt(-0.5)).selfMask().rename('macrof');
        var solo = NDCI.gte(0.024).and(NDWI.lt(0.6)).and(NDBI.gt(-0.5)).rename('solo');
        var ndci_macro = NDCI.where(macrofitas, 55).rename('NDCI_macro').eq(55).selfMask() 
        return image.addBands([ndci_macro])}//.unmask(solo)}
      sen2cor_data = sen2cor_data
                  .filterDate(fromDateSentinel, toDateSentinel)
                  .map(NDWI)
                  .map(NDBI)
                  .map(macro_class)
      var macrofita = sen2cor_data.select('NDCI_macro').mean()
      ////////// Pega uma imagem Sentinel da data para adicionar como um Layer
      var Sentinel = ee.ImageCollection('COPERNICUS/S2')
        .filterDate(fromDateSentinel, toDateSentinel)
        .select(['B4', 'B3', 'B2'])
        .filterBounds(region3)
      var rgbVis = {
        min: 300,
        max: 1300,
        bands: ['B4', 'B3', 'B2'],
      };
      ////////// Pega as datas selecionada para filtrar a coleção de NDCI
      fromDate1Year = ee.Date(selDate1.getValue()).format("yyyy"); /// Pega o ano
      fromDate1Month = ee.Date(selDate1.getValue()).format("MM");  /// Pega o mês
      fromDate1Day = ee.Date(selDate1.getValue()).format("dd");    /// Pega o dia
      //////// Coleção de imagem NDCI (filtrar pela data)
      var collection2 = col_data                                                        
                        .filterMetadata("year","equals", ee.Number.parse(fromDate1Year))
                        .filterMetadata("month","equals", ee.Number.parse(fromDate1Month))
                        .filterMetadata("day","equals", ee.Number.parse(fromDate1Day))
      ////////// Função para calcular o Chla e Bloom
      var decision_tree = function(image){                                              //// Calculate the Chla 
        var NDCI = image.select('NDCIn_mean').updateMask(BB_mask)
        var Bloom = NDCI.gte(0.025).rename('Bloom')
        var chla = image.expression(
          '(24.49 * ((NDCI + 1) ** 7.48))', {
            'NDCI': image.select('NDCIn_mean'),
          });
        var chla = chla.rename('Chla').updateMask(BB_mask);
        return chla.addBands(NDCI).addBands(Bloom).copyProperties(image); 
      };
      var chla1 = collection2.map(decision_tree).mean().updateMask(BB_mask)    //// Coloca-se média para formar uma imagem ee.Image (média de uma imagem sem mudar os valores)
      /////// Pegar os valores de NDCI e dividir em classes tróficas
      collection2 = collection2.mean()   //// Coloca-se uma média para transformar em ee.Image
      var slice = collection2.expression(
            "(b('NDCIn_mean') > 0.1265) ? 5" +
            ": (b('NDCIn_mean') > 0.0245) ? 4" +
            ": (b('NDCIn_mean') > -0.0934) ? 3" +
            ": (b('NDCIn_mean') > -0.13) ? 2" +
            ": (b('NDCIn_mean') > -0.30) ? 1" +
            ": -99" );
      var mask2 = slice.neq(-99)
      var slicename = slice.rename(['NDCI_class']).updateMask(mask2);
      ////// Cria as Palettes para os mapas
      var vis = {min:0, max:100, palette: ['blue','green','Yellow','red']};                         //// Color Scale for Chla
      var palettesNDCI = require('users/gena/packages:palettes');                                   //// Color Scale for NDCI
      var visNDCI = {min:-0.2, max:0.3, palette: palettesNDCI.matplotlib.viridis[7]};               //// Color Scale for NDCI
      var vis1 = {min:0, max:1, palette: ['000000', '00FF00']};                                     //// Color Scale for Bloom
      var visIET = {min:1, max:5, palette: ['#0000FF', '#00FFFF', '#008000', '#FFBF00', '#FF0000']};///  Color Scale for 
      ////// Adicionar os Layers
      Map.addLayer(Sentinel, rgbVis, 'Sentinel RGB')  
      Map.addLayer(chla1.select('NDCIn_mean').clip(region1), visNDCI, 'NDCI value', false)
      Map.addLayer(chla1.select('Chla').clip(region1), vis, 'Chl-a Concentration')
      Map.addLayer(slicename.select('NDCI_class').clip(region1), visIET, 'TSI Classes', false)
      Map.addLayer(chla1.select('Bloom').clip(region1), vis1, 'BLOOM', false)
      //Map.addLayer(macrofita.clip(region3), {palette: ['red']}, 'Macrófitas', false);  
      ///////////////////////// Legendas /////////////////////////////////////////////////////////////
      ///////// Chla 
      /// Criar um thumbnail (CHLA)
      var vis = {min:0, max:100, palette: ['blue','green','Yellow','red']};
      function makeColorBarParams(palette) {
        return {
          bbox: [0, 0, 1, 0.1],
          dimensions: '100x10',
          format: 'png',
          min: 0,
          max: 1,
          palette: palette,
        };
      }
    //// Criação de uma barra de cores (CHLA)
      var colorBar_CHLA = ui.Thumbnail({
        image: ee.Image.pixelLonLat().select(0),
        params: makeColorBarParams(vis.palette),
        style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
      });
    ////// Create a panel with three numbers for the legend. (CHLA)
      var legendLabels_CHLA = ui.Panel({
        widgets: [
          ui.Label(vis.min, {margin: '4px 8px'}),
          ui.Label(
              (vis.max / 2),
              {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
          ui.Label(vis.max, {margin: '4px 8px'})
        ],
        layout: ui.Panel.Layout.flow('horizontal')
      });
      ////// Título da legenda (CHLA)
      var legendTitle_CHLA = ui.Label({
        value: 'Concentration of Chla',
        style: {fontWeight: 'bold'}
      });
      /////// Legenda para Bloom
      /// Criar um thumbnail (BLOOM)
      function makeColorBarParams1(palette) {
        return {
          bbox: [0, 0, 1, 0.1],
          dimensions: '100x10',
          format: 'png',
          min: 0,
          max: 1,
          palette: palette,
        };
      }
      //// Criação de uma barra de cores (BLOOM)
      var colorBar_BLOOM = ui.Thumbnail({
        image: ee.Image.pixelLonLat().select(0),
        params: makeColorBarParams1(vis1.palette),
        style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
      });
      ////// Título da legenda (BLOOM)
      var legend_BLOOM = ui.Panel({
      style: {
        position: 'top-left',
        padding: '8px 15px'
      }
      });
      ////// Cria e estiliza as classes de Bloom 
      var makeRow = function(color, name) {
          var colorBox = ui.Label({
            style: {
              backgroundColor: '#' + color,
              padding: '10px',
              margin: '0 0 4px 0'
            }
          });
          var description = ui.Label({
            value: name,
            style: {margin: '0 0 4px 6px'}
          });
          return ui.Panel({
            widgets: [colorBox, description],
            layout: ui.Panel.Layout.Flow('horizontal')
          });
      };
      var legendTitle_BLOOM = ui.Label({
        value: 'Bloom',
        style: {fontWeight: 'bold'}
      });
      var palette = ['000000', '00FF00'];
      var names = ['Non-Bloom','Bloom'];
      for (var i = 0; i < 2; i++) {
        legend_BLOOM.add(makeRow(palette[i], names[i]));
        }  
       /////// Legend for classes IET
      function makeColorBarParamsIET(palette) {
        return {
          bbox: [0, 0, 1, 0.1],
          dimensions: '100x10',
          format: 'png',
          min: 0,
          max: 1,
          palette: palette,
        };
      }
      //// Criação de uma barra de cores (IET)
      var colorBarIET = ui.Thumbnail({
        image: ee.Image.pixelLonLat().select(0),
        params: makeColorBarParamsIET(visIET.palette),
        style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
      });
      ////// Create a panel with three numbers for the legend. (IET)
      var legendIET = ui.Panel({
      style: {
        position: 'top-left',
        padding: '8px 15px'
      }
      });
      ////// Cria e estiliza as classes de IET 
      var makeRow = function(color, name) {
          // Create the label that is actually the colored box.
          var colorBox = ui.Label({
            style: {
              backgroundColor: '#' + color,
              // Use padding to give the box height and width.
              padding: '10px',
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
            layout: ui.Panel.Layout.Flow('horizontal')
          });
      };
      var legendTitleIET = ui.Label({
        value: 'TSI Classes',
        style: {fontWeight: 'bold'}
      });
      var paletteIET = ['0000FF', '00FFFF', '008000', 'FFBF00', 'FF0000']; // Arrumado
      // name of the legend
      var namesIET = ['Oligo','Meso', 'Eutrophic','Super', 'Hyper'];
      // Add color and and names
      for (var i = 0; i < 5; i++) {
        legendIET.add(makeRow(paletteIET[i], namesIET[i]));
        }  
      ////////// NDCI Legend
      function makeColorBarParams2(palette) {
        return {
          bbox: [0, 0, 1, 0.1],
          dimensions: '100x10',
          format: 'png',
          min: 0,
          max: 1,
          palette: palette,
        };
      }
      //// Criação de uma barra de cores (NDCI)
      var colorBar_NDCI = ui.Thumbnail({
        image: ee.Image.pixelLonLat().select(0),
        params: makeColorBarParams2(visNDCI.palette),
        style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '24px'},
      });
      ////// Create a panel with three numbers for the legend. (NDCI)
      var legendLabels_NDCI = ui.Panel({
        widgets: [
          ui.Label(visNDCI.min, {margin: '4px 8px'}),
          ui.Label(
              (visNDCI.max / 2),
              {margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
          ui.Label(visNDCI.max, {margin: '4px 8px'})
        ],
        layout: ui.Panel.Layout.flow('horizontal')
      });
      ////// Título da legenda (NDCI)
      var legendTitle_NDCI = ui.Label({
        value: 'NDCI',
        style: {fontWeight: 'bold'}
      });
      //////// Panel inicial para hospedar todas as legendas 
      var legend = ui.Panel({
      style: {
        position: 'top-left',
        padding: '8px 15px'
      }
      });
      ///////// Adicionar as legendas
      var legend = legend.add(legendTitle_NDCI).add(colorBar_NDCI).add(legendLabels_NDCI).add(legendTitle_CHLA)
                    .add(colorBar_CHLA).add(legendLabels_CHLA).add(legendTitle_BLOOM).add(legend_BLOOM).add(legendTitleIET).add(legendIET)
      Map.add(legend);
      ////////////////// Add Chla Download button /////////////////////////////////////////////////////
      var mask = ee.Image.constant(1).clip(region1.geometry()).mask().not()
      var img = chla1.select('Chla').clip(region1).unmask(0)
      function downloadImg() {
        var downloadArgs = {
          name: 'Chla_image',
          crs: 'EPSG:3857',
          scale: 30,
          maxPixels: 1e13,
          region: region1.geometry()
       };
       var url = img.getDownloadURL(downloadArgs);
       urlLabel.setUrl(url);
       urlLabel.style().set({shown: true});
      }
      var downloadButton = ui.Button('DOWNLOAD Chl-a (30m)', downloadImg);
      var urlLabel = ui.Label('Download', {shown: false});
      var panel = ui.Panel([downloadButton, urlLabel]);
      var img999 = chla1.select('Chla').clip(region1).unmask(0)
      function downloadImg999() {
        var downloadArgs999 = {
          name: 'Chla_image',
          crs: 'EPSG:3857',
          scale: 90,
          maxPixels: 1e13,
          region: region1.geometry()
       };
       var url999 = img999.getDownloadURL(downloadArgs999);
       urlLabel999.setUrl(url999);
       urlLabel999.style().set({shown: true});
      }
      var downloadButton999 = ui.Button('Chl-a (90m)', downloadImg999);
      var urlLabel999 = ui.Label('Download', {shown: false});
      var panel999 = ui.Panel([downloadButton999, urlLabel999]);
      /////// Add Chla Download button 
      var img1 = chla1.select('NDCIn_mean').clip(region1)
      function downloadImg1() {
        var downloadArgs1 = {
          name: 'NDCI_image',
          crs: 'EPSG:3857',
          scale: 30,
          maxPixels: 1e13,
          region: region1.geometry()
       };
       var url1 = img1.getDownloadURL(downloadArgs1);
       urlLabel1.setUrl(url1);
       urlLabel1.style().set({shown: true});
      }
      var downloadButton1 = ui.Button('NDCI (30m)', downloadImg1);
      var urlLabel1 = ui.Label('Download', {shown: false});
      var panel1 = ui.Panel([downloadButton1, urlLabel1]);
      var img11 = chla1.select('NDCIn_mean').clip(region1)
      function downloadImg11() {
        var downloadArgs11 = {
          name: 'NDCI_image',
          crs: 'EPSG:3857',
          scale: 90,
          maxPixels: 1e13,
          region: region1.geometry()
       };
       var url11 = img11.getDownloadURL(downloadArgs11);
       urlLabel11.setUrl(url11);
       urlLabel11.style().set({shown: true});
      }
      var downloadButton11 = ui.Button('NDCI (90m)', downloadImg11);
      var urlLabel11 = ui.Label('Download', {shown: false});
      var panel11 = ui.Panel([downloadButton11, urlLabel11]);
      /////// Add Bloom Download button
      var img2 = chla1.select('Bloom').clip(region1)
      function downloadImg2() {
        var downloadArgs2 = {
          name: 'Bloom_image',
          crs: 'EPSG:3857',
          scale: 30,
          maxPixels: 1e13,
          region: region1.geometry()
       };
       var url2 = img2.getDownloadURL(downloadArgs2);
       urlLabel2.setUrl(url2);
       urlLabel2.style().set({shown: true});
      }
      var downloadButton2 = ui.Button('Bloom Class (30m)', downloadImg2);
      var urlLabel2 = ui.Label('Download', {shown: false});
      var panel2 = ui.Panel([downloadButton2, urlLabel2]);
      var img22 = chla1.select('Bloom').clip(region1)
      function downloadImg22() {
        var downloadArgs22 = {
          name: 'Bloom_image',
          crs: 'EPSG:3857',
          scale: 90,
          maxPixels: 1e13,
          region: region1.geometry()
       };
       var url22 = img22.getDownloadURL(downloadArgs22);
       urlLabel22.setUrl(url22);
       urlLabel22.style().set({shown: true});
      }
      var downloadButton22 = ui.Button('Bloom Class (90m)', downloadImg22);
      var urlLabel22 = ui.Label('Download', {shown: false});
      var panel22 = ui.Panel([downloadButton22, urlLabel22]);
      /////// Add IET Download button
      var img3 = slicename.select('NDCI_class').clip(region1)
      function downloadImg3() {
        var downloadArgs3 = {
          name: 'NDCI_image',
          crs: 'EPSG:3857',
          scale: 30,
          maxPixels: 1e13,
          region: region1.geometry()
       };
       var url3 = img3.getDownloadURL(downloadArgs3);
       urlLabel3.setUrl(url3);
       urlLabel3.style().set({shown: true});
      }
      var downloadButton3 = ui.Button('TSI Class (30m)', downloadImg3);
      var urlLabel3 = ui.Label('Download', {shown: false});
      var panel3 = ui.Panel([downloadButton3, urlLabel3]);
      var img33 = slicename.select('NDCI_class').clip(region1)
      function downloadImg33() {
        var downloadArgs33 = {
          name: 'NDCI_image',
          crs: 'EPSG:3857',
          scale: 90,
          maxPixels: 1e13,
          region: region1.geometry()
       };
       var url33 = img33.getDownloadURL(downloadArgs33);
       urlLabel33.setUrl(url33);
       urlLabel33.style().set({shown: true});
      }
      var downloadButton33 = ui.Button('TSI Class (90m)', downloadImg33);
      var urlLabel33 = ui.Label('Download', {shown: false});
      var panel33 = ui.Panel([downloadButton33, urlLabel33]);
      var legendDownload = ui.Panel({
        layout: ui.Panel.Layout.flow('horizontal'),
        style: {
          position: 'bottom-left',
          padding: '8px 15px'
        }
        });
      var legend = legendDownload.add(panel).add(panel999).add(panel1).add(panel11).add(panel3).add(panel33)
      Map.add(legend);
    //////////////////////////////////////////// Cria o Inspector (o usuário clica na imagem e obtem valores do pixel clicado)  
    var header = ui.Label('Inspector', {fontWeight: 'bold', fontSize: '15px'}) ///// nagel
    var toolPanel = ui.Panel([header], 'flow', {width: '200px', position: 'bottom-right'});  
    var dataset = ee.Image(chla1.clip(region1))
    Map.onClick(function(coords) {
      var location = 'lon: ' + coords.lon.toFixed(3) + ' ' +
                     'lat: ' + coords.lat.toFixed(3);
      var click_point = ee.Geometry.Point(coords.lon, coords.lat);
      var demValue = dataset.reduceRegion(ee.Reducer.first(), click_point, 90).evaluate(function(val){
        var demText = 'Chla: ' + val.Chla.toFixed(2) + '   ' + 'NDCI: ' + val.NDCIn_mean.toFixed(2);
        toolPanel.widgets().set(2, ui.Label(demText));
      });
      toolPanel.widgets().set(1, ui.Label(location));
    // Edit: To be temporary, the "loading..." panel number has to be the same as the demText panel number (changed from 1 to 2).
      toolPanel.widgets().set(2, ui.Label("loading..."));
      Map.add(toolPanel);
    });
          } 
        }
///////////////////// ADICIONAR GEOMETRIA  /////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function chartNdviTimeSeries(Buf, Sca, fromDate, toDate, Month1, Month2) {
  var BuracoLagosdosPatos = ee.Geometry.Rectangle([-51.18, -30.57, -50.817, -30.77]);
  var BuracoLagosdosPatos1 = ee.Geometry.Rectangle([-51.4625, -31.23, -51.31, -31.39]);
  var BuracoLagosdosPatos2 = ee.Geometry.Rectangle([-51.87, -31.42,  -51.65, -31.67]);
  var LagoadosPatos = ee.FeatureCollection([BuracoLagosdosPatos, BuracoLagosdosPatos1, BuracoLagosdosPatos2])
  var Piaui = ee.FeatureCollection('projects/ee-algalbloom-gee4geo/assets/Reservatorios_Piaui')
  var background = 1;
  var Piaui = ee.Image(background).clip(Piaui).rename('occurrence');
  var LagoadosPatos = ee.Image(background).clip(LagoadosPatos).rename('occurrence');
  var JRC = ee.Image('JRC/GSW1_0/GlobalSurfaceWater');                            //// Get just within Pekel
  var JRC = JRC.select('occurrence')
  var JRC = ee.ImageCollection([JRC.gte(10).selfMask(), LagoadosPatos, Piaui]).mosaic().clipToCollection(Reservatorios)
  var BB_mask = JRC
  //////////////////// Pega a região de interesse
  var region3 = List[select.getValue()] 
  var now = Date.now();       //getting time at UTC
  var eeNow = ee.Date(now)
  var s2Clouds = ee.ImageCollection('COPERNICUS/S2_CLOUD_PROBABILITY').filterBounds(region3).filterDate('2021-11-01', eeNow);
  var s2_orig = ee.ImageCollection('COPERNICUS/S2_SR').filterBounds(region3).filterDate('2021-11-01', eeNow);
      var MAX_CLOUD_PROBABILITY = 10;
      function maskClouds(img) {
        var clouds = ee.Image(img.get('cloud_mask')).select('probability');
        var isNotCloud = clouds.lt(MAX_CLOUD_PROBABILITY);
        return img.updateMask(isNotCloud);
      }
      function maskEdges(s2_img) {
        return s2_img.updateMask(
            s2_img.select('B8A').mask().updateMask(s2_img.select('B9').mask()));
      }
      s2_orig = s2_orig.map(maskEdges);
      s2Clouds = s2Clouds;
      var s2SrWithCloudMask = ee.Join.saveFirst('cloud_mask').apply({
        primary: s2_orig,
        secondary: s2Clouds,
        condition:
            ee.Filter.equals({leftField: 'system:index', rightField: 'system:index'})
      });
      var s2CloudMasked =
          ee.ImageCollection(s2SrWithCloudMask).map(maskClouds);
      function bandcor (img) {
        var band4 = img.select('B4').multiply(0.935).add(101.52).rename('B4');
        var band5 = img.select('B5').multiply(0.9086).add(75.575).rename('B5');
        var band12 = img.select('B12').multiply(0.8943).rename('B12');
        var band44 = img.select('B4').rename('B44');
        var band55 = img.select('B5').rename('B55');
        var band1212 = img.select('B12').rename('B1212');
        //var glint = atmcor.subtract(atmcor.select('B12'))//.updateMask(BB_mask);
        return img.addBands([band4, band5, band12, band44, band55, band1212], ['B4', 'B5', 'B12', 'B44', 'B55', 'B1212'], true).updateMask(BB_mask)//.updateMask(mask_cloud)//.updateMask(mask_agua)//
            .select(['B3', 'B4', 'B5', 'B8', 'B12', 'B44', 'B55', 'B1212'])
            .copyProperties(img, ['system:index', 'system:time_start']);
                  }
      function NDCI2(image) {
          var glint = image.subtract(image.select('B12'))
          var NDCIn = glint.normalizedDifference(['B5', 'B4']);
          var NDCIname = NDCIn.rename(['NDCIn_mean']).updateMask(BB_mask);
          return image.addBands(NDCIname).copyProperties(image, ['system:index', 'system:time_start']);
      } 
      function DATA2(img) {
        var date  = ee.Date(img.get('system:time_start'));
        var date_daily = date.format('YYYY-MM-dd');
        return img.set('eedate', ee.Date.fromYMD(date.get('year'), date.get('month'), date.get('day')))
                  .set('year', (date.get('year')))
                  .set('month', (date.get('month')))
                  .set('day', (date.get('day')))
      }
      ///////// Macrófitas
      function NDWI(image) {
          var NDWIn = image.normalizedDifference(['B3', 'B1212']);
          var NDWIname = NDWIn.rename(['NDWIn']).updateMask(BB_mask)//.multiply(1000).round();
        return image.addBands(NDWIname).copyProperties(image, ['system:index', 'system:time_start']);
      }
      function NDBI(image) {
          var NDBIn = image.normalizedDifference(['B1212', 'B8']);
          var NDBIname = NDBIn.rename(['NDBIn']).updateMask(BB_mask)//.multiply(1000).round();
        return image.addBands(NDBIname).copyProperties(image, ['system:index', 'system:time_start']);
      } 
      function macro_class(image) {
        var NDCI = image.select('NDCIn_mean')
        var NDWI = image.select('NDWIn')
        var NDBI = image.select('NDBIn')
        var macrofitas = NDCI.gte(0.024).and(NDWI.lt(0.6)).and(NDBI.lt(-0.5)).selfMask().rename('macrof');
        var solo = NDCI.gte(0.024).and(NDWI.lt(0.6)).and(NDBI.gt(-0.5)).rename('solo');
        var ndci_macro = NDCI.where(macrofitas, 55).rename('NDCI_macro').eq(55).selfMask() 
        return NDCI.addBands([ndci_macro])}//.unmask(solo)}
    function DATA(image) {
        var image_data = image.set('eedate', ee.Date.fromYMD(image.get('year'),image.get('month'),image.get('day')))
         return image_data.select('NDCIn_mean');
      } 
    function FACTOR(image) {
        var macro = image.select('NDCIn_mean').lt(-10000).selfMask().rename('NDCI_macro')
        var NDCI =  image.select('NDCIn_mean').divide(1000)
        return NDCI.addBands(macro).copyProperties(image,['system:asset_size', 'year', 'month', 'day', 'eedate', 'system:index']);
      } 
    var SIAC_data = col.filterBounds(region3)
                      .map(DATA).map(FACTOR).sort('eedate', false);
    print(SIAC_data)
    var sen2cor_data = s2CloudMasked.filterBounds(region3)
                      .map(bandcor).map(NDCI2).map(DATA2)
                      .map(NDWI)
                      .map(NDBI)
                      .map(macro_class)
                      .sort('eedate', false);
    var col_data = SIAC_data.merge(sen2cor_data.distinct('eedate')).sort('eedate', false)
    SIAC_data = 0
    sen2cor_data = 0
    s2Clouds = 0
    s2_orig = 0
    s2SrWithCloudMask = 0
    s2CloudMasked = 0
  //panelChart2 = panelChart2
  Buf = parseFloat(buffer.getValue())
  Sca = parseFloat(scaleNumber.getValue())
  var BuracoLagosdosPatos = ee.Geometry.Rectangle([-51.18, -30.57, -50.817, -30.77]);
  var BuracoLagosdosPatos1 = ee.Geometry.Rectangle([-51.4625, -31.23, -51.31, -31.39]);
  var BuracoLagosdosPatos2 = ee.Geometry.Rectangle([-51.87, -31.42,  -51.65, -31.67]);
  var LagoadosPatos = ee.FeatureCollection([BuracoLagosdosPatos, BuracoLagosdosPatos1, BuracoLagosdosPatos2])
  var Piaui = ee.FeatureCollection('projects/ee-algalbloom-gee4geo/assets/Reservatorios_Piaui')
  var background = 1;
  var Piaui = ee.Image(background).clip(Piaui).rename('occurrence');
  var LagoadosPatos = ee.Image(background).clip(LagoadosPatos).rename('occurrence');
  var JRC = ee.Image('JRC/GSW1_0/GlobalSurfaceWater');                            //// Get just within Pekel
  var JRC = JRC.select('occurrence')
  var JRC = ee.ImageCollection([JRC.gte(10).selfMask(), LagoadosPatos, Piaui]).mosaic().clipToCollection(Reservatorios)
  var BB_mask = JRC
  var Ano11 = Ano1.getValue()
  fromDate = Anos[Ano11]
  var Ano22 = Ano2.getValue()
  toDate = Anos[Ano22]
  var Mes11 = Mes1.getValue()
  Month1 = Meses[Mes11]
  var Mes22 = Mes2.getValue()
  Month2 = Meses[Mes22]
  // Make the chart panel visible the first time a geometry is drawn.
  if (!panel.style().get('shown')) {
    panel.style().set('shown', true);
  }
  // Get the drawn geometry; it will define the reduction region.
  var aoi = drawingTools.layers().get(0).getEeObject();
  aoi = aoi.buffer(Buf + 1)
  // Set the drawing mode back to null; turns drawing off.
  drawingTools.setShape(null);
  // Reduction scale is based on map scale to avoid memory/timeout errors.
  var mapScale = Map.getScale();
  var scale = mapScale > 5000 ? mapScale * 2 : 5000;
  ///////////// Aplicar as funções em imagens Sentinel  
  var collection1 = col_data
                    //// Filter the Dates
                    .filterMetadata("year","less_than",toDate + 1)
                    .filterMetadata("year","greater_than",fromDate - 1)
                    .filterMetadata("month","less_than",Month2 + 1)
                    .filterMetadata("month","greater_than",Month1 - 1)
                    .filter(ee.Filter.neq('system:band_names', []))
                    .sort('eedate', false);
  print(collection1)
    //collection1 = collection1.map(detectar_duplicador)
  //collection1 = ee.ImageCollection(collection1.distinct('eedate'))
  print(ee.ImageCollection(collection1))
  //////////Função para calcular o Chla
  var decision_tree = function(image){                                              //// Calculate the Chla 
    var NDCI = image.select('NDCIn_mean').updateMask(BB_mask)
    var Bloom = NDCI.gte(0.025).rename('Bloom')
    var chla = image.expression(
      '(24.49 * ((NDCI + 1) ** 7.48))', {
        'NDCI': image.select('NDCIn_mean'),
      });
    var chla = chla.rename('Chla');
    return chla.addBands(NDCI).addBands(Bloom).copyProperties(image); 
  };
  var chla = collection1.map(decision_tree)
  ///// Macrófitas
  var chartMacro = ui.Chart.image.series(collection1.select(['NDCI_macro']).filter(ee.Filter.neq('system:band_names', [])), region3, ee.Reducer.count(),
   Sca, 'eedate').setChartType('ScatterChart')
                  .setOptions({
                    titlePostion: 'none',
                    legend: {position: 'none'},
                    hAxis: {title: 'Date'},
                    vAxis: {title: 'Macrophytes (number of pixels)'},
                    series: {0: {color: '23cba7'}},
                  });
  // Chart NDVI time series for the selected area of interest.
  var chart = ui.Chart.image.series(chla.select(['Chla']).filter(ee.Filter.neq('system:band_names', [])), aoi,ee.Reducer.mean(),
   Sca, 'eedate').setChartType('ScatterChart')
                  .setOptions({
                    titlePostion: 'none',
                    legend: {position: 'none'},
                    hAxis: {title: 'Date'},
                    vAxis: {title: 'Chla (mg/m^3)'},
                    series: {0: {color: '23cba7'}},
                  });
  var chartNDCI = ui.Chart.image.series(chla.select(['NDCIn_mean']).filter(ee.Filter.neq('system:band_names', [])), aoi,ee.Reducer.mean(),
   Sca, 'eedate').setChartType('ScatterChart')
                  .setOptions({
                    titlePostion: 'none',
                    legend: {position: 'none'},
                    hAxis: {title: 'Date'},
                    vAxis: {title: 'NDCI'},
                    series: {0: {color: '23cba7'}},
                  });
  var months = ee.List.sequence(Month1, Month2);
  var years = ee.List.sequence(fromDate, toDate);
  var byMonthYear = ee.ImageCollection.fromImages(
  years.map(function(y) {
    return months.map(function (m) {
      return collection1
        .filterMetadata("month","equals", m)
        .filterMetadata("year","equals", y)
        .mean()
        .set('month', m).set('year', y)
        .set('Date', ee.Date.fromYMD(y, m, 1, null))
  });
  }).flatten());
  // Cria uma série de dados anuais
  function NDCI_class(image) {
  var slice = image.select('NDCIn_mean')
  var Hyper = slice.gte(0.1265).rename('E - Hyper')
  var Super = slice.gte(0.0245).and(slice.lt(0.1265)).rename('D - Super')
  var Eutrofico = slice.gte(-0.0934).and(slice.lt(0.0245)).rename('C - Eutrophic')
  var Meso = slice.gte(-0.13).and(slice.lt(-0.0934)).rename('B - Meso')
  var Oligo = slice.gte(-0.30).and(slice.lt(-0.13)).rename('A - Oligo')
  return image.addBands([Oligo, Meso, Eutrofico, Super, Hyper])}
  var classe = byMonthYear.map(NDCI_class)
  var classeDaily = chla.map(NDCI_class).select(['A - Oligo', 'B - Meso', 'C - Eutrophic', 'D - Super', 'E - Hyper'])
  var classes = classe.select(['A - Oligo', 'B - Meso', 'C - Eutrophic', 'D - Super', 'E - Hyper'])
  var chart1 = ui.Chart.image.series(classes.filter(ee.Filter.neq('system:band_names', [])), aoi, ee.Reducer.sum(), Sca, 'Date')
        .setChartType('ColumnChart')
        .setOptions({
          bestEffort: true,
          maxPixels: 1e13,
          isStacked: 'relative', 
          title: 'TSI',
          hAxis: {title: 'Date', titleTextStyle: {italic: false, bold: true}},
          vAxis: {
            title: 'Classes percentage (relative)',
            titleTextStyle: {italic: false, bold: true}
          },
          lineWidth: 2,
          colors: ['#0000FF', '#00FFFF', '#008000', '#FFBF00', '#FF0000'], // Arrumado
          curveType: 'function',
          bar: {groupWidth: '1000%'}
        });
  var chart2 = ui.Chart.image.series(classeDaily.filter(ee.Filter.neq('system:band_names', [])), aoi, ee.Reducer.sum(), Sca, 'eedate')
        .setChartType('ColumnChart')
        .setOptions({
          bestEffort: true,
          maxPixels: 1e13,
          isStacked: 'absolute', 
          title: 'TSI',
          hAxis: {title: 'Date (Daily Images)', titleTextStyle: {italic: false, bold: true}},
          vAxis: {
            title: 'Pixel Count (absolute)',
            titleTextStyle: {italic: false, bold: true}
          },
          lineWidth: 2,
          colors: ['#0000FF', '#00FFFF', '#008000', '#FFBF00', '#FF0000'], // Arrumado
          curveType: 'function',
          bar: {groupWidth: '1000%'}
        });
  byMonthYear = byMonthYear.filter(ee.Filter.neq('system:band_names', []))
  // Define GIF visualization parameters.
  var decision_tree1 = function(image){                                              //// Calculate the Chla 
    var chla = image.expression(
      '(24.49 * ((NDCI + 1) ** 7.48))', {
        'NDCI': image.select('NDCIn_mean'),
      });
    var chla = chla.rename('Chla').updateMask(BB_mask);
    return chla.copyProperties(image); 
  };
  var ChlaMonth = byMonthYear.map(decision_tree1).filter(ee.Filter.neq('system:band_names', []))
  var visParams = {
  min: 0,
  max: 100,
  palette: ['blue','green','Yellow','red'],
  };
  // Create RGB visualization images for use as animation frames.
  var rgbVis = ChlaMonth.map(function(img) {
    return img.visualize(visParams);
  });
  var gifParams = {
    'region': aoi,
    'dimensions': 600,
    'crs': 'EPSG:3857',
    'framesPerSecond': 2
  };
  // Print the GIF URL to the console.
  var URL = ui.Label(rgbVis.getVideoThumbURL(gifParams)); //ui.Label.setUrl
  var URL = (ui.Label('Link to the video').setUrl(rgbVis.getVideoThumbURL(gifParams)))
  var thumb = ui.Thumbnail(rgbVis, gifParams);
  var checkBox_chartMacro = ui.Checkbox({
  label: "Show total macrophytes",
  onChange: addChartMacro
        })
  var checkBox_chart = ui.Checkbox({
  label: "Show mean Chla",
  onChange: addChart
        })
   var checkBox_chartNDCI = ui.Checkbox({
  label: "Show mean NDCI",
  onChange: addChartNDCI
        })
  var checkBox_chart1 = ui.Checkbox({
  label: "Show monthly TSI",
  onChange: addChart1
        })
  var checkBox_chart2 = ui.Checkbox({
  label: "Show daily TSI",
  onChange: addChart2
        })
  var checkBox_Thumbnail = ui.Checkbox({
  label: "Show Chla Video",
  onChange: addChartThumbnail
        })
  function addChartMacro (ifChecked){
    if (ifChecked) {  panelChart.add(chartMacro)}
    else {panelChart.clear()}
  }
  function addChart (ifChecked){
    if (ifChecked) {  panelChart.add(chart)}
    else {panelChart.clear()}
  }
   function addChartNDCI (ifChecked){
      if (ifChecked) {  panelChart.add(chartNDCI)}
      else {panelChart.clear()}
    }
   function addChart1 (ifChecked){
    if (ifChecked) {  panelChart.add(chart1)}
    else {panelChart.clear()}
  }
   function addChart2 (ifChecked){
    if (ifChecked) {  panelChart.add(chart2)}
    else {panelChart.clear()}
  }
  function addChartThumbnail (ifChecked){
    if (ifChecked) {  panelChart.add(URL).add(thumb)}
    else {panelChart.clear()}
  }
  // Replace the existing chart in the chart panel with the new chart.
  Map.addLayer(aoi, {}, 'Draw Geometry (with buffer)')
  panelChart.clear()
  panelChart2.clear()
  panelChart2.add(ui.Panel([checkBox_chart, checkBox_chart1, checkBox_chart2], ui.Panel.Layout.flow('horizontal')))
              .add(ui.Panel([checkBox_chartNDCI, checkBox_Thumbnail], ui.Panel.Layout.flow('horizontal')))
              //.add(ui.Panel([checkBox_chartMacro], ui.Panel.Layout.flow('horizontal')))
} 
///////////////////////////////////////////////////////////////////// Create a Panel and widgets //////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
/////////////////////////// Panel principal
var panel = ui.Panel({
  style:{width:"460px",backgroundColor:"white", border:"2px solid black"} })
////////////////////////// Texto introdutório do Panel
var intro = ui.Panel([
  ui.Label({
    value: 'Algae Bloom Monitoring System - Latin America',
    style: {fontSize: '18px', fontWeight: 'bold'}
  }),
  ui.Label('         ')]);
/////////////////////////// Select the region  
var Region_interest_label = ui.Label('1 - Select the region of interest', LABEL_STYLE)
var select = ui.Select({
  items: Object.keys(List),
  onChange: getDate,
  placeholder: "Select a Region of Interest",
  style: {stretch: 'horizontal', maxHeight: '24px'},})
///////////////////////////// Botão para zoom em uma coordenada 
var lon = ui.Textbox({
  placeholder: 'Longitude, ex. -64.731',
  style: {maxWidth: 10, width: 10, whiteSpace: 'pre'},
  onChange: function(value) {
    // set value with a dedicated method
    lon.setValue(value);
    return(value);
  }
});
var lat = ui.Textbox({
  placeholder: 'Latitude, ex. -30.778',
  style: {maxWidth: 10, width: 10, whiteSpace: 'pre'},
  onChange: function(value) {
    // set value with a dedicated method
    lat.setValue(value);
    return(value);
  }
});
var Lo;
var La;
var buttonCoord = ui.Button({
  label: 'Zoom(opt.)',
  onClick: function() {
    Lo = parseFloat(lon.getValue());
    La = parseFloat(lat.getValue());
    Map.setCenter(Lo, La, 15);
    var point = ee.Geometry.Point([Lo, La]);
    Map.addLayer(point, {},'Point')
  }
});
//////// Label para dizer que se inicia o Temporal Analysis 
var Temporal_analysis = ui.Label('Temporal Analysis', LABEL_STYLE1)
////////////////////////// Select the Months
var season_2_name = ui.Label('3 - Select month interval', LABEL_STYLE)
var Meses = {
  'January' : 1,
  'February' : 2,
  'March' : 3,
  'April': 4, 
  'May': 5, 
  'June': 6,
  'July': 7, 
  'August': 8,
  'September': 9,
  'October': 10,
  'November': 11,
  'December': 12};
var Mes1 = ui.Select({
  placeholder: "Jan - Dec",
  items: Object.keys(Meses),})
var Mes2 = ui.Select({
  placeholder: "Jan - Dec",
  items: Object.keys(Meses),})
/////////////////// Select the years
var season_1_name = ui.Label('2 - Select year interval', LABEL_STYLE)
var Anos = {
  '2015' : 2015,
  '2016' : 2016,
  '2017' : 2017,
  '2018': 2018, 
  '2019': 2019, 
  '2020': 2020,
  '2021': 2021,
  '2022': 2022
};
var Ano1 = ui.Select({
  placeholder: "2015 - 2020",
  items: Object.keys(Anos),})
var Ano2 = ui.Select({
  placeholder: "2015 - 2020",
  items: Object.keys(Anos),})
/////////////////// Botão para calcular a Time-Series
var button = ui.Button({
  label: "4 - Calculate Spatial Stats. (Optional, otherwise go to 5)",
  onClick: updateMap,     ////////////////// Quero colocar getDate junto
  style: {stretch: 'horizontal', maxHeight: '24px'}
})
/////////////////// Gráficos 
/////////// Definir o buffer das geometrias
var Variables = ui.Label('5 - Graph Analysis (enter buffer and scale and then go to 6)', LABEL_STYLE)
var buffer = ui.Textbox({
  placeholder: 'Buffer (m), min 1',
  onChange: function(valueBuffer) {
    // set value with a dedicated method
    buffer.setValue(valueBuffer);
    return(valueBuffer);
  }
});
var Buf
/////////// Definir a escala das geometries
var scaleNumber = ui.Textbox({
  placeholder: 'Scale (m), ex. 30 or 90',
  onChange: function(valueScale) {
    // set value with a dedicated method
    scaleNumber.setValue(valueScale);
    return(valueScale);
  }
});
var Sca
/////// Desenhar as geometrias (Essa função possibilita o usuário desenhar a geometria no mapa, e mostra a geometria desenhada) - Não sei como funciona. 
var drawingTools = Map.drawingTools();
drawingTools.setShown(false);
while (drawingTools.layers().length() > 0) {
  var layer = drawingTools.layers().get(0);
  drawingTools.layers().remove(layer);
}
var dummyGeometry =
    ui.Map.GeometryLayer({geometries: null, name: 'geometry', color: '23cba7'});
drawingTools.layers().add(dummyGeometry);
function clearGeometry() {
  var layers = drawingTools.layers();
  layers.get(0).geometries().remove(layers.get(0).geometries().get(0));
}
function drawRectangle() {
  clearGeometry();
  drawingTools.setShape('rectangle');
  drawingTools.draw();
}
function drawPolygon() {
  clearGeometry();
  drawingTools.setShape('polygon');
  drawingTools.draw();
}
function drawPoint() {
  clearGeometry();
  drawingTools.setShape('point');
  drawingTools.draw();
}
var chartPanel = ui.Panel({
  style:
      {height: '235px', width: '600px', position: 'bottom-right', shown: false}
});
drawingTools.onDraw(ui.util.debounce(chartNdviTimeSeries, 500));
drawingTools.onEdit(ui.util.debounce(chartNdviTimeSeries, 500));
var symbol = {
  rectangle: '⬛',
  polygon: '🔺',
  point: '📍',
};
var LABEL_STYLE = {
  fontWeight: '300',
  textAlign: 'center',
  fontSize: '14px',
  padding: '2px',
};
var LABEL_STYLE1 = {
  fontWeight: '300',
  textAlign: 'center',
  fontSize: '20px',
  padding: '2px',
};
var controlPanel = ui.Panel({
  widgets: [
    ui.Label('6 - Draw for Time Series', LABEL_STYLE),
    ui.Button({
      label: symbol.rectangle + ' Rectangle',
      onClick: drawRectangle,
      style: {stretch: 'vertical'}
    }),
    ui.Button({
      label: symbol.polygon + ' Polygon',
      onClick: drawPolygon,
      style: {stretch: 'vertical'}
    }),
    ui.Button({
      label: symbol.point + ' Point',
      onClick: drawPoint,
      style: {stretch: 'vertical'}
    }),
  ],
  style: {position: 'bottom-left'},
  layout: ui.Panel.Layout.flow('horizontal'),
});
Map.add(chartPanel);
///////////// Panels para os gráficos
var panel1 = ui.Panel({
  style:{width:"450px",backgroundColor:"white"} 
})
var panelChart = ui.Panel({
  style:{width:"450px",backgroundColor:"white"} 
})
var panelChart2 = ui.Panel({
  style:{width:"450px",backgroundColor:"white"} 
})
/////// Escritas em branco para dar espaçamento 
var Nothing = ui.Label('                         ', LABEL_STYLE)
var Nothing1 = ui.Label('                         ', LABEL_STYLE)
/////// Link do tutorial do App
var link = (ui.Label('By: Rajan Kumar Singh, Researcher-Orbitx Aerospace (P) Ltd').setUrl('https://rajansingh5264.maps.arcgis.com/home/index.html'))
//////// Adicionar todos os widgets dentro do Panel
ui.root.add(panel.add(ui.Panel([toolPanel], ui.Panel.Layout.flow('horizontal'))).add(link).add(Region_interest_label)
  .add(ui.Panel(select)).add(ui.Panel([lon, lat, buttonCoord], ui.Panel.Layout.flow('horizontal')))
  .add(ui.Panel(Temporal_analysis)).add(ui.Panel([season_1_name, Ano1, Ano2], ui.Panel.Layout.flow('horizontal'))).add(ui.Panel([season_2_name, Mes1, Mes2], ui.Panel.Layout.flow('horizontal'))).add(ui.Panel([button], ui.Panel.Layout.flow('horizontal')))
  .add(Nothing).add(Variables).add(ui.Panel([buffer, scaleNumber], ui.Panel.Layout.flow('horizontal'))).add(controlPanel).add(panelChart2).add(panelChart))