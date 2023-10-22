/** 
//(i) Mapa de Superfície de água (2000-2018) – abrangendo as ASD. Esse mapa será obtido da coleção de mapas do projeto mapbiomas e inserido no dashboard do projeto.
//(ii) Mapa de cobertura vegetal e uso do solo (2000-2018) – abrangendo as ASD. Esse mapa será obtido da coleção de mapas do projeto mapbiomas e inserido no dashboard do projeto.
//(iii) Mapas de Transições da Cobertura Vegetal (2000-2018) - abrangendo as ASD. Esse mapa será obtido da coleção de mapas do projeto mapbiomas e inserido no dashboard do projeto.
//(iv) Mapa de carbono (2000-2018) - abrangendo as ASD. A metodologia para elaboração do mapa está em elaboração
//(v) Mapa de produtividade primária líquida (2000-2018). A metodologia para elaboração do mapa está descrita no item 2.2.2. Produtividade Primária.
//(vi) Mapas de variação de biomassa vegetal (2018-2019) – abrangendo as URAD
**/
//
//var logos = require('users/CartasSol/package:Arida/EXEINI');
var biome = 'CAATINGA';
var version = '1'
var ano = '2010'
var parametros = require('users/CartasSol/package:Arida/GUIexport_Vrs1')
var region = ee.FeatureCollection('users/rnvuefsppgm/aridapolgeral').geometry()
var assetLand = ee.ImageCollection('projects/mapbiomas-arida/ColecaoLandsat_v2');
var assetMapBiomas = ee.Image('projects/mapbiomas-workspace/public/collection3/mapbiomas_collection3_integration_v1')
var assetTransicoes = ee.Image('projects/mapbiomas-workspace/public/collection3/mapbiomas_collection3_transitions_v1')
var visualizado = false
var exportado = false
var ImgExp = ee.Image(0)
// Grid Landsat para cortar bordas das cenas
var landgrid = ee.FeatureCollection('ft:1qNHyIqgUjShP2gQAcfGXw-XoxWwCRn5ZXNVqKIS5');
var gridFeatureCollection = ee.FeatureCollection('ft:1wCmguQD-xQs2gMH3B-hdOdrwy_hZAq4XFw1rU8PN');
// Require the Palettes module
var palettes = require('users/mapbiomas/modules:Palettes.js');
var visclass = {'min': 0, 'max': 33, 'palette': palettes.get('classification2'), 'format': 'png'}
var ndvi_color = 
  'FFFFFF,FFFCFF,FFF9FF,FFF7FF,FFF4FF,FFF2FF,FFEFFF,FFECFF,FFEAFF,FFE7FF,FFE5FF,FFE2FF,FFE0FF,'+
  'FFDDFF,FFDAFF,FFD8FF,FFD5FF,FFD3FF,FFD0FF,FFCEFF,FFCBFF,FFC8FF,FFC6FF,FFC3FF,FFC1FF,FFBEFF,'+
  'BCFF,FFB9FF,FFB6FF,FFB4FF,FFB1FF,FFAFFF,FFACFF,FFAAFF,FFA7FF,FFA4FF,FFA2FF,FF9FFF,FF9DFF,'+
  'FF9AFF,FF97FF,FF95FF,FF92FF,FF90FF,FF8DFF,FF8BFF,FF88FF,FF85FF,FF83FF,FF80FF,FF7EFF,FF7BFF,'+
  'FF6EFF,FF6CFF,FF69FF,FF67FF,FF79FF,FF76FF,FF73FF,FF71FF,FF64FF,FF61FF,FF5FFF,FF5CFF,FF5AFF,'+
  'FF57FF,FF55FF,FF52FF,FF4FFF,FF4DFF,FF4AFF,FF48FF,FF45FF,FF42FF,FF40FF,FF3DFF,FF3BFF,FF38FF,'+
  'FF36FF,FF33FF,FF30FF,FF2EFF,FF2BFF,FF29FF,FF26FF,FF24FF,FF21FF,FF1EFF,FF1CFF,FF19FF,FF17FF,'+
  'FF14FF,FF12FF,FF0FFF,FF0CFF,FF0AFF,FF07FF,FF05FF,FF02FF,FF00FF,FF00FF,FF0AF4,FF15E9,FF1FDF,'+
  'FF2AD4,FF35C9,FF3FBF,FF4AB4,FF55AA,FF5F9F,FF6A94,FF748A,FF7F7F,FF8A74,FF946A,FF9F5F,FFAA55,'+
  'FFB44A,FFBF3F,FFC935,FFD42A,FFDF1F,FFE915,FFF40A,FFFF00,FFFF00,FFFB00,FFF700,FFF300,FFF000,'+
  'FFEC00,FFE800,FFE400,FFE100,FFDD00,FFD900,FFD500,FFD200,FFCE00,FFCA00,FFC600,FFC300,FFBF00,'+
  'FFBB00,FFB700,FFB400,FFB000,FFAC00,FFA800,FFA500,FFA500,F7A400,F0A300,E8A200,E1A200,D9A100,'+
  'D2A000,CA9F00,C39F00,BB9E00,B49D00,AC9C00,A59C00,9D9B00,969A00,8E9900,879900,7F9800,789700,'+
  '709700,699600,619500,5A9400,529400,4B9300,439200,349100,2D9000,258F00,1E8E00,168E00,0F8D00,'+
  '078C00,008C00,008C00,008700,008300,007F00,007A00,007600,007200,006E00,006900,006500,006100,'+
  '005C00,005800,005400,005000,004C00';
//para reclassificar Mapbiomas 
var classMB = [  3,  4,  5,  9, 11, 12, 15, 18, 19, 20, 21, 23, 24, 25, 29, 30, 31, 32, 33];
var newClassMB = [  1,  1,  1,  3,  2,  2,  3,  3,  3,  3,  3,  2,  5,  5,  2,  5,  4,  2,  4]
var classTrans = [ 315, 318, 319, 320, 321, 324, 325, 330, 415, 418, 419, 420, 421, 424, 425, 430,
                  1215,1218,1219,1220,1221,1224,1225,1230, 153, 154,1512, 183, 184,1812, 193, 194,1912,
                  203, 204,2012, 213, 214,2112, 243, 244,2412, 253, 254,2512]
var newClasT = [ 1,1,1,1,1,1, 1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
                 2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2]
var visNDVI = {'min':0, 'max':200, 'palette':ndvi_color};
var visUSO = {'min': 1, 'max': 5, 'palette': '428229,d1f771,f7dc71,070ff4,e51d1d', 'format': 'png'};
var visTrans = {'min': 1, 'max': 2, 'palette': 'ff0000,48ff00', 'format': 'png'}
var visCO2f = {'min':50, 'max':150, 'palette': 'f90000, f0f900, 057709'}
var blank = ee.Image(0).mask(0);
var outline = blank.paint(region, 'AA0000', 2); 
var visPar = {'palette':'000000','opacity': 0.6};
Map.addLayer(outline, visPar, 'Limite', false);
var VisualizaMaps = function(ano, chBox){
    ImgExp = ee.Image(ImgExp).clip(region)
    var DictlayerAnos = ee.Dictionary({})
    //(i) Mapa de Superfície de água (2000-2018) – abrangendo as ASD. Esse mapa será obtido da coleção de mapas do projeto mapbiomas e inserido no dashboard do projeto.
    var mapaAgua = assetMapBiomas.select('classification_'+ano)
    //print(mapaAgua)
    mapaAgua = mapaAgua.remap([33],[33],27)
    mapaAgua = mapaAgua.mask(mapaAgua.neq(27)).clip(region)
    //(ii) Mapa de cobertura vegetal e uso do solo (2000-2018) – abrangendo as ASD. Esse mapa será obtido da coleção de mapas do projeto mapbiomas e inserido no dashboard do projeto.
    var mapaUSO = assetMapBiomas.select('classification_'+ ano)
    //print("aqui mapa de uso", mapaUSO)
    mapaUSO = mapaUSO.remap(classMB, newClassMB, 27)
    mapaUSO = mapaUSO.mask(mapaUSO.neq(27)).clip(region)
    //print(mapaUSO)
    //(iii) Mapas de Transições da Cobertura Vegetal (2000-2018) - abrangendo as ASD. Esse mapa será obtido da coleção de mapas do projeto mapbiomas e inserido no dashboard do projeto.
    var ano1 = parseInt(ano)
    var ano2 = ano1 + 1
    //print(ano2)
    var mapaTransicao = assetTransicoes.select('transition_'+ano1+'_'+ano2)
    mapaTransicao = mapaTransicao.remap(classTrans, newClasT ,27)
    mapaTransicao = mapaTransicao.mask(mapaTransicao.neq(27)).clip(region)
    //(iv) Mapa de carbono (2000-2018) - abrangendo as ASD. A metodologia para elaboração do mapa está em elaboração
    var evi2max = assetLand.filterMetadata('year','equals', parseInt(ano)).mosaic().select(['max_evi2','max_pri'])
    evi2max = evi2max.clip(region)
    var CO2flux = evi2max.normalizedDifference(['max_evi2','max_pri'])
    CO2flux = CO2flux.add(1).multiply(100)
    //(v) Mapa de produtividade primária líquida (2000-2018). A metodologia para elaboração do mapa está descrita no item 2.2.2. Produtividade Primária.
    var ndvimax = assetLand.filterMetadata('year','equals', parseInt(ano)).mosaic().select('max_ndvi')
    ndvimax = ndvimax.clip(region)
    //manejar os box
    //var DictlayerAnos = ee.Dictionary({})
   if (chBox.prod){
        print("condicionais")
        Map.addLayer(ndvimax, visNDVI, '(v) Produtividade P. líquida ('+ano+')', true);
        ndvimax = ndvimax.set('ano', ano)
        ndvimax = ndvimax.set('description', "productividade_" + ano)
        ImgExp = ImgExp.addBands(ndvimax)
        //DictlayerAnos = DictlayerAnos.set('productividade_', ndvimax);        
    }
    if(chBox.carb){
        print("condicionais")
        Map.addLayer(CO2flux, visCO2f, '(iv) Mapa carbono ('+ano+')', true);        
        CO2flux = CO2flux.rename( "carbono_" + ano) //+ ano
        ImgExp = ImgExp.addBands(CO2flux)
        //DictlayerAnos = DictlayerAnos.set('carbono_', CO2flux);
    }
    if (chBox.tcob){
        Map.addLayer(mapaTransicao, visTrans, '(iii) Transições Cobertura Vegetal ('+ano1+'/'+ano2+')', true);
        mapaTransicao = mapaTransicao.rename("transition_" + ano)        
        ImgExp = ImgExp.addBands(mapaTransicao)
        //DictlayerAnos = ee.Dictionary(DictlayerAnos).set('transcition_', mapaTransicao);
    }
    if (chBox.CVeg){
        Map.addLayer(mapaUSO, visUSO, '(ii) Cobertura vegetal e uso ('+ano+')', true);       
        mapaUSO = mapaUSO.rename("mapaUso_" + ano)
        ImgExp = ImgExp.addBands(mapaUSO)
        //DictlayerAnos = ee.Dictionary(DictlayerAnos).set('uso_', mapaUSO);
    }
    if (chBox.Wsurf){
        Map.addLayer(mapaAgua, visclass, '(i) Superfície de água ('+ano+')', true);       
        mapaAgua = mapaAgua.rename("Agua_" + ano)
        ImgExp = ImgExp.addBands(mapaAgua)
        //DictlayerAnos = ee.Dictionary(DictlayerAnos).set('agua_', mapaAgua);
    }
    //print("Imagem cheia", ImgExp)
    //dicExp = ee.Dictionary(dicExp).set(ano.toString(),  DictlayerAnos)
    //print(ano, ImgExp)
    visualizado = true
}
var ExportarMaps = function(ano, chBox){
     //(i) Mapa de Superfície de água (2000-2018) – abrangendo as ASD. Esse mapa será obtido da coleção de mapas do projeto mapbiomas e inserido no dashboard do projeto.
    var mapaAgua = assetMapBiomas.select('classification_'+ano)
    //print(mapaAgua)
    mapaAgua = mapaAgua.remap([33],[33],27)
    mapaAgua = mapaAgua.mask(mapaAgua.neq(27)).clip(region)
    //(ii) Mapa de cobertura vegetal e uso do solo (2000-2018) – abrangendo as ASD. Esse mapa será obtido da coleção de mapas do projeto mapbiomas e inserido no dashboard do projeto.
    var mapaUSO = assetMapBiomas.select('classification_'+ ano)
    //print("aqui mapa de uso", mapaUSO)
    mapaUSO = mapaUSO.remap(classMB, newClassMB, 27)
    mapaUSO = mapaUSO.mask(mapaUSO.neq(27)).clip(region)
    ///print(mapaUSO)
    //(iii) Mapas de Transições da Cobertura Vegetal (2000-2018) - abrangendo as ASD. Esse mapa será obtido da coleção de mapas do projeto mapbiomas e inserido no dashboard do projeto.
    var ano1 = parseInt(ano)
    var ano2 = ano1 + 1
    //print(ano2)
    var mapaTransicao = assetTransicoes.select('transition_'+ano1+'_'+ano2)
    mapaTransicao = mapaTransicao.remap(classTrans, newClasT ,27)
    mapaTransicao = mapaTransicao.mask(mapaTransicao.neq(27)).clip(region)
    //(iv) Mapa de carbono (2000-2018) - abrangendo as ASD. A metodologia para elaboração do mapa está em elaboração
    var evi2max = assetLand.filterMetadata('year','equals', parseInt(ano)).mosaic().select(['max_evi2','max_pri'])
    evi2max = evi2max.clip(region)
    var CO2flux = evi2max.normalizedDifference(['max_evi2','max_pri'])
    CO2flux = CO2flux.add(1).multiply(100)
    //(v) Mapa de produtividade primária líquida (2000-2018). A metodologia para elaboração do mapa está descrita no item 2.2.2. Produtividade Primária.
    var ndvimax = assetLand.filterMetadata('year','equals', parseInt(ano)).mosaic().select('max_ndvi')
    ndvimax = ndvimax.clip(region)
    //manejar os box
    var paramExp = {
        image: ndvimax, 
        description: "production_"+ano, 
        folder: 'Arida', 
        scale: 30, 
        maxPixels: 1e13, 
        region: region
    }
    if (chBox.prod){
        paramExp.image = ndvimax
        paramExp.description = "production_"+ano
        Export.image.toDrive(paramExp)            
    }
    if(chBox.carb){
        paramExp.image = CO2flux
        paramExp.description = "Carbono_"+ano
        Export.image.toDrive(paramExp)          
    }
    if (chBox.tcob){
        paramExp.image = mapaTransicao
        paramExp.description = "transcition_"+ano
        Export.image.toDrive(paramExp)        
    }
    if (chBox.CVeg){
        paramExp.image = mapaUSO
        paramExp.description = "mapaUso_"+ano
        Export.image.toDrive(paramExp)        
    }
    if (chBox.Wsurf){
        paramExp.image = mapaAgua
        paramExp.description = "mapaAgua_"+ano
        Export.image.toDrive(paramExp)        
    }
    exportado = true
}
var ExportarMapsLoaded = function(ano){
    if (exportado === false){
        //print("esta exportando")
        var listNomMapas = ImgExp.bandNames()
        listNomMapas = listNomMapas.remove("constant")
        //print("os nomes das bandas", listNomMapas)
        listNomMapas.evaluate(function(secuencia){
            //manejar os box
            var paramExp = {
                image: ee.Image(0), 
                description: "", 
                folder: 'Arida', 
                scale: 30,
                maxPixels: 1e13, 
                region: region
            }
            secuencia.forEach(function(nome){
                var MapaImg = ee.Image(ImgExp).select(nome)
                paramExp.image = MapaImg
                paramExp.description = nome
                Export.image.toDrive(paramExp)
            })
        })
    }
    exportado = true
}
var getParameters = function(){
    var startDate = parametros.start_date.getValue();
    var endDate = parametros.final_date.getValue();
    var Production = parametros.Production
    var Carbono = parametros.Carbono
    var TCob = parametros.TCobertura
    var CobVeg = parametros.CobVegetation
    var WSurf = parametros.WSurface
    var chekMaps = parametros.checkedMap
    var casset = parametros.asset;
    var param = {      
      "startDate": startDate, 
      "endDate": endDate,
      "Production": Production,
      "Carbono":Carbono,
      "TrasCob": TCob,
      "CobertVeg": CobVeg,
      "WaterSurf": WSurf,
      "mapCheck": chekMaps,
      "idAsset": casset, 
    }
    return param
}
var procesoVisual = function(){
    var parameters = getParameters()
    var startDate = parameters["startDate"];
    var endDate = parameters["endDate"];
    var boxProduct = parameters["Production"];
    var boxCarbono = parameters["Carbono"];
    var boxTransCob = parameters["TrasCob"];
    var boxCobVeg = parameters["CobertVeg"];
    var boxWaterS = parameters["WaterSurf"];
    var checkBox = parameters["mapCheck"]
    var dirasset = parameters["idAsset"];
    //print('ano inicial , ano final')
    //print(startDate, endDate);
    var t00 = parseInt(startDate)
    var t11 = parseInt(endDate)
    if (t00 < 2000){
        t00 = 2000;
    }
    if (t11 > 2017){
        t11 = 2017;
    }
    var seq = ee.List.sequence(t00, t11)
    //print(t00)
    //print(seq)
    Map.setCenter(-40.97, -9.06, 5)
    seq.evaluate(function(secuencia){
        secuencia.forEach(function(ano){
            VisualizaMaps(ano, checkBox);
        })
    })
}
var procesoExport = function(){
    var parameters = getParameters()
    var startDate = parameters["startDate"];
    var endDate = parameters["endDate"];
    var checkBox = parameters["mapCheck"]
    var dirasset = parameters["idAsset"];
    print('ano inicial , ano final')
    print(startDate, endDate);
    var t00 = parseInt(startDate)
    var t11 = parseInt(endDate)
    if (t00 < 2000){
        t00 = 2000;
    }
    if (t11 > 2017){
        t11 = 2017;
    }
    var seq = ee.List.sequence(t00, t11)
    //print(t00)
    //print(seq)
    Map.setCenter(-40.97, -9.06, 6)
    if (visualizado === true){
        seq.evaluate(function(secuencia){
            secuencia.forEach(function(ano){
                ExportarMapsLoaded(ano);
            })
        })
    }
    else{
        seq.evaluate(function(secuencia){
            secuencia.forEach(function(ano){
                ExportarMaps(ano,  checkBox);
            })
        })
    }
}
parametros.visual.onClick(procesoVisual)
//parametros.export.onClick(procesoExport)
parametros.clear.onClick(function(){
    visualizado = false   
    exportado = false
    Map.layers().reset()
})