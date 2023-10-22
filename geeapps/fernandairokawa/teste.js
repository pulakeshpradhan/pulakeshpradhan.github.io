var P_mariana = /* color: #d63000 */ee.Geometry.Point([-43.416423940722666, -20.365232615096254]),
    imageCollection = ee.ImageCollection("LANDSAT/LT5_L1T_TOA"),
    poligono_mariana = ee.FeatureCollection("users/fernandairokawa/Mariana"),
    geometry = /* color: #98ff00 */ee.Geometry.Polygon(
        [[[-43.96499265083685, -20.882824668882808],
          [-42.08633054146185, -21.154590711856397],
          [-41.71279538521185, -19.55294905358966],
          [-43.58596433052435, -19.26799754456332]]]),
    vegetacao = /* color: #0f8b24 */ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Point([-43.31910242886539, -20.29006328226403]),
            {
              "class": 0,
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Point([-43.434115551423986, -20.307853825095368]),
            {
              "class": 0,
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Point([-43.40604891629215, -20.254476070448078]),
            {
              "class": 0,
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Point([-43.20477595181461, -20.32797640951459]),
            {
              "class": 0,
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Point([-43.30778185627912, -20.38981378945558]),
            {
              "class": 0,
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Point([-43.33009783528303, -20.34475359878869]),
            {
              "class": 0,
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Point([-43.38571612141584, -20.33863727370066]),
            {
              "class": 0,
              "system:index": "6"
            }),
        ee.Feature(
            ee.Geometry.Point([-43.44167773030256, -20.462204355396324]),
            {
              "class": 0,
              "system:index": "7"
            }),
        ee.Feature(
            ee.Geometry.Point([-43.405285518388496, -20.431000155253916]),
            {
              "class": 0,
              "system:index": "8"
            }),
        ee.Feature(
            ee.Geometry.Point([-43.391552608232246, -20.4062253022625]),
            {
              "class": 0,
              "system:index": "9"
            }),
        ee.Feature(
            ee.Geometry.Point([-43.369579951982246, -20.424887250487306]),
            {
              "class": 0,
              "system:index": "10"
            })]),
    urbanizacao = /* color: #7a7a77 */ee.Feature(
        ee.Geometry.MultiPoint(
            [[-43.4195787445413, -20.39584464751996],
             [-43.416917993198524, -20.387960372507393],
             [-43.41854877627958, -20.381363016199582],
             [-43.42073745883573, -20.3777423958364],
             [-43.42160525792747, -20.39899555713148],
             [-43.41834369176536, -20.36954874644036],
             [-43.41473880284934, -20.37598568799836],
             [-43.420918612419655, -20.36085844941668],
             [-43.42503848546653, -20.38676696335634],
             [-43.42237773412376, -20.383468294954874],
             [-43.417657046257546, -20.372525865290857]]),
        {
          "class": 1,
          "system:index": "0"
        }),
    corposdagua = /* color: #00ffff */ee.Feature(
        ee.Geometry.MultiPoint(
            [[-43.379580295111964, -20.200839422455346],
             [-43.38172606232388, -20.19987280663857],
             [-43.40288332703335, -20.19459658955709],
             [-43.2960036761346, -20.471761471184625],
             [-43.29325709410335, -20.472806797931796],
             [-43.29900775023128, -20.470957368841923],
             [-43.27664885588314, -20.472324340317826],
             [-43.279953337389486, -20.471359420539876],
             [-43.283987379747884, -20.47602314326307],
             [-43.273754027567406, -20.47526027329287],
             [-43.27287426301052, -20.476627206440245],
             [-43.2969497711282, -20.472506268060656]]),
        {
          "class": 2,
          "system:index": "0"
        }),
    soloexposto = /* color: #c29362 */ee.Feature(
        ee.Geometry.MultiPoint(
            [[-43.48302116659892, -20.203466318314334],
             [-43.48310699728739, -20.20684936934037],
             [-43.48061790732157, -20.215951022550943],
             [-43.4724639919163, -20.211923808025297],
             [-43.48387947348368, -20.21925326068288],
             [-43.48387947348368, -20.207574299281127],
             [-43.44431152609599, -20.194041717156956],
             [-43.445056883859024, -20.190556443055772],
             [-43.44239613251625, -20.18664940935054],
             [-43.45072170929848, -20.19965904872502],
             [-43.448318450021134, -20.20497536875979]]),
        {
          "class": 3,
          "system:index": "0"
        }),
    rocha = /* color: #ff0000 */ee.Feature(
        ee.Geometry.MultiPoint(
            [[-43.442839822236465, -20.355574600018677],
             [-43.43726082748549, -20.356942596401943],
             [-43.44841881698744, -20.349297755383596],
             [-43.382878061501, -20.273832545015],
             [-43.45243277783544, -20.145123520679125],
             [-43.45011534924657, -20.13835466653322],
             [-43.447797920657706, -20.13360017698117],
             [-43.37641495145374, -20.30139519007649],
             [-43.384483036170536, -20.319264920795604],
             [-43.42911499417835, -20.288192803352374]]),
        {
          "class": 4,
          "system:index": "0"
        }),
    geometry2 = /* color: #00ff00 */ee.Geometry.MultiPoint();
//var filtro = imageCollection.filterBounds(poligono_mariana).filterDate('2007-01-01','2007-12-31').filterMetadata('CLOUD_COVER','less_than',0.5)
//Map.addLayer(filtro)
//var rgb = ee.Image('LANDSAT/LT5_L1T_TOA/LT52170742007134CUB00')
//Map.addLayer(rgb,{bands:'B3,B2,B1',min:0,max:0.2})
//Map.addLayer(poligono_mariana)
//var regiao = ee.Geometry.Polygon(geometry)
//var treinamento = rgb.sample({region:geometry,scale:30,numPixels:100})
//var agrupamento = ee.Clusterer.wekaKMeans(10).train(treinamento);
//var classificacao_nsup = rgb.cluster(agrupamento)
//Map.addLayer(classificacao_nsup.randomVisualizer(), {}, 'Agrupamento')
//Adicione aqui a imagem escolhida
var rgb = ee.Image('LANDSAT/LT5_L1T_TOA/LT52170742007134CUB00');
var rgb = rgb.clip(poligono_mariana)
Map.addLayer(rgb,{bands:'B3,B2,B1',min: 0,max: 0.2});
//Amostra
var amostra =
vegetacao.merge(corposdagua).merge(urbanizacao).merge(soloexposto).merge(rocha);
Map.addLayer(amostra, {}, 'Amostra');
//Bandas que serao utilizadas na classificacao
var bandas = ['B1','B2','B3','B4','B5','B6','B7'];
//Identificacao do treinamento
var treinamento = rgb.select(bandas).sampleRegions({collection: amostra,properties: ['class'],scale: 30,
});
//Classificador Random.Forest
var classificacao = ee.Classifier.randomForest().train({
features: treinamento,
classProperty: 'class',
inputProperties: bandas,
});
//Mapeamento da classificacao supervisionada
var classificacao_sup = rgb.select(bandas).classify(classificacao);
Map.addLayer(classificacao_sup, {min: 0, max: 4, palette: ['31a354', 'c51b8a',
'2b8cbe ', 'fec44f', '636363'] }, 'Classificacao Random Forest');
//Obtendo a matriz de erro para as amostras coletadas
var precisao_treinamento = classificacao.confusionMatrix();
print('Matriz de erro: ', precisao_treinamento);
print('Precisão geral: ', precisao_treinamento.accuracy());
//Criando 30 pontos aleatorios pra validacao do mapeamento
var pontos_aleatorios = ee.FeatureCollection.randomPoints(poligono_mariana,30);
Map.addLayer(pontos_aleatorios, {}, 'Pontos aleatórios');