var imageCollection = ee.ImageCollection("LANDSAT/LC08/C01/T1_TOA"),
    geometry = /* color: #d63000 */ee.Geometry.Polygon(
        [[[-43.395440332054704, -2.298436785333525],
          [-43.39681362307033, -2.416439836601226],
          [-43.09400295412502, -2.422271120927106],
          [-43.09468959963283, -2.3447473129570757],
          [-43.08885311281642, -2.2980937387451084]]]),
    imageCollectionL5 = ee.ImageCollection("LANDSAT/LT05/C01/T1_TOA"),
    agua = /* color: #ffc82d */ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Polygon(
                [[[-43.35154446761885, -2.318392754706351],
                  [-43.35257443588057, -2.329370047449777],
                  [-43.30416592757979, -2.3269687719583714],
                  [-43.30519589584151, -2.3135901623324253],
                  [-43.33334836166182, -2.3139332051846186]]]),
            {
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-43.36424740951338, -2.3513243758845808],
                  [-43.353947726896195, -2.3468649307723797],
                  [-43.36974057357588, -2.3492661722174866]]]),
            {
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-43.309922453182025, -2.359432357578897],
                  [-43.30975079180507, -2.3604185733520198],
                  [-43.30588841082363, -2.3599040260794113],
                  [-43.30335640551357, -2.3596038734157863],
                  [-43.30339932085781, -2.3589178099413393],
                  [-43.3076479399374, -2.3595181154999816],
                  [-43.30906414629726, -2.359432357578897]]]),
            {
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-43.22127455772022, -2.325690620580609],
                  [-43.224193036407144, -2.3574212401365964],
                  [-43.184111740359015, -2.363682790292855],
                  [-43.11381649568534, -2.3589662416524617],
                  [-43.15123765975443, -2.346958647240622],
                  [-43.15535747555316, -2.3363246723522733],
                  [-43.21921465134625, -2.315056483813643]]]),
            {
              "system:index": "3"
            })]),
    veg = /* color: #00ffff */ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Polygon(
                [[[-43.326638659365585, -2.356966440685679],
                  [-43.332131823428085, -2.3619404001850666],
                  [-43.330415209658554, -2.3624549467036164],
                  [-43.32560869110387, -2.358510085192663]]]),
            {
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-43.31599565399449, -2.3550797617414982],
                  [-43.31702562225621, -2.35748098904493],
                  [-43.312905749209335, -2.357652505122396],
                  [-43.31427904022496, -2.3550797617414982]]]),
            {
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-43.32097383392613, -2.3850948041978386],
                  [-43.32904191864293, -2.3861238798028013],
                  [-43.3302435482816, -2.3945279683853067],
                  [-43.31719728363316, -2.3876674917660323]]]),
            {
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-43.303328107404695, -2.373715911678495],
                  [-43.304014753433194, -2.3785183011571958],
                  [-43.291655125079046, -2.375774080642106],
                  [-43.291655125085526, -2.3723437973329893]]]),
            {
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-43.28135555238413, -2.408189997618498],
                  [-43.285132102677096, -2.4150503711881193],
                  [-43.258696250626315, -2.405102818235629],
                  [-43.259726218888034, -2.398585416605572],
                  [-43.27551906556772, -2.407160938601044]]]),
            {
              "system:index": "4"
            })]),
    n_veg = /* color: #bf04c2 */ee.FeatureCollection(
        [ee.Feature(
            ee.Geometry.Polygon(
                [[[-43.27926011932652, -2.363998585115208],
                  [-43.27960344208043, -2.365713736892206],
                  [-43.27900262726109, -2.366571311985363],
                  [-43.27634187591832, -2.3654564642608364],
                  [-43.276685198672226, -2.3644273732582355]]]),
            {
              "system:index": "0"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-43.294709643252304, -2.3553370362934776],
                  [-43.29299302948277, -2.356794924523661],
                  [-43.29213472259801, -2.3564518921362305],
                  [-43.29385133636754, -2.3550797617414982]]]),
            {
              "system:index": "1"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-43.239520510561874, -2.380120927927104],
                  [-43.24166627777379, -2.38140727696056],
                  [-43.24115129364293, -2.382179085804185],
                  [-43.239005526431015, -2.3820075727651915],
                  [-43.239005526431015, -2.3828651377465255],
                  [-43.237975558169296, -2.3818360597048507],
                  [-43.23840471161168, -2.379949414631936]]]),
            {
              "system:index": "2"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-43.25728746307652, -2.357824021178743],
                  [-43.25642915619176, -2.3598822122053718],
                  [-43.25514169586461, -2.3590246329810687],
                  [-43.253768404848984, -2.3581670532279917],
                  [-43.255227526553085, -2.357652505122396]]]),
            {
              "system:index": "3"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-43.313627891251315, -2.3443868818462867],
                  [-43.314657859513034, -2.3491893691247117],
                  [-43.30229824037241, -2.3498754373886412],
                  [-43.30573146791147, -2.3443868818462867]]]),
            {
              "system:index": "4"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-43.362620977697816, -2.341620823836625],
                  [-43.361419348059144, -2.3435075209629934],
                  [-43.34648480826422, -2.3435075209629934],
                  [-43.34596982413336, -2.34093475152432],
                  [-43.36227765494391, -2.340763233393768]]]),
            {
              "system:index": "5"
            }),
        ee.Feature(
            ee.Geometry.Polygon(
                [[[-43.179652169420535, -2.402765657912056],
                  [-43.1805104763053, -2.4084683685756034],
                  [-43.17321486778479, -2.410097710097042],
                  [-43.172699883653934, -2.406967657555376],
                  [-43.17261405296546, -2.4043092511215662],
                  [-43.17853637047034, -2.4032801891758386]]]),
            {
              "system:index": "6"
            })]);
//Cria a função de remoção de nuvens
var removeNuvem = function(e){
  return e.mask(e.select('BQA').eq(2720))
}
//Filtra as Imagens Landsat por geometria e data e remove as nuvens
var imageCollection2017 = imageCollection
                  .filterDate('2017-10-01','2018-03-30')
                  .filterBounds(geometry)
                  .map(removeNuvem)
//Aplica um redutor de mediana na coleção filtrada
var median_img = imageCollection2017.median()
//Cria o NDWI da imagem médiana e renomeia o nome da banda Constant para NDWI
var ndwi = median_img.normalizedDifference(['B3','B6']).rename('NDWI')
//Atribui a banda NDWI na imagem médiana
median_img = median_img.addBands(ndwi)
//Mostra a imagem médiana com Falsa cor
Map.addLayer(median_img,{bands:['B6','B5','B4'],min:0.01,max:0.45},'Pantanal - Falsa Cor')
//Mostra a imagem médiana com a Banda NDWI
Map.addLayer(median_img,{bands:['NDWI'],min:-0.50362,max:0.901},'Pantanal - NDWI')
//Coleta as amostras para o treinamento de Água
var data_treinamento_agua = median_img
                          .addBands(ee.Image(1).rename('Classe'))
                            .sampleRegions({
                              collection:agua,
                              scale:30
                            })
//Coleta as amostras para o treinamento de Não Veg
var data_treinamento_nveg = median_img
                          .addBands(ee.Image(0).rename('Classe'))
                            .sampleRegions({
                              collection:n_veg,
                              scale:30,
                            })
                            //Coleta as amostras para o treinamento de Veg
var data_treinamento_veg = median_img
                          .addBands(ee.Image(2).rename('Classe'))
                            .sampleRegions({
                              collection:veg,
                              scale:30,
                            })
//Faz a união do dado de treinamento de Água com o Não Água
var uniao_fc = data_treinamento_agua
.merge(data_treinamento_nveg)
.merge(data_treinamento_veg)
print('Tamanho Dataset',uniao_fc.size())
//Executa o treinamento do classificador
var classificador = ee.Classifier.randomForest(10).train(uniao_fc,'Classe',['NDWI','B2','B3','B4','B5','B6','B7'])
//Executa a classificação
var imagem_classificada = median_img.classify(classificador)
//Mostra os dados classificados
Map.addLayer(imagem_classificada,{palette:['9dff44','00a0ff'],min:0,max:1},'Classificacao 2017')
print(classificador.confusionMatrix())
//Acuracia das amostras
print('Acuracia amostras', 
classificador.confusionMatrix().accuracy())
print('Acuracia produtor (correctColuna / totalColuna) ', 
classificador.confusionMatrix().producersAccuracy())
print('Acuracia usuario = (correctLinha / totalLinha)', 
classificador.confusionMatrix().consumersAccuracy())