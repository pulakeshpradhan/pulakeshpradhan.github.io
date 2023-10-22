var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": true,
      "locked": false
    }) || /* color: #d63000 */ee.Geometry.MultiPoint();
/*
* Visualização de todas classificações de cicatrizes do mapBiomas-Fogo(V4)
* e comparação com as cicatrizes do MODIS
*/
/*
* Projeto mapBiomasFogo-IPAM 
* Wallace Vieira da Silva - Geografia - estagiario
* contato wallce.silva@ipam.org.br
* 15 de setembro de 2020 Brasilia-DF/Brasil
*/
/*
*
* OBJETIVO: desenvolver um Toolkit para visualização dos resultados de cicatrizes de fogo por ano e por mes do ano, sendo possivel não só comparar com modis(burnedArea)
* INICIADO: 10/09/2020  -> requisição por email - Vera Laísa
* 
* 
*/
var app = {};
app.assets = {
  //constantes
  colectionModisBurnData: "MODIS/006/MCD64A1",
  collectionMapBiomasFogoBeta3:'users/geomapeamentoipam/Collection_fire_months_beta3',
  collectionMapBiomasFogoBeta3Mask:'projects/mapbiomas-workspace/TRANSVERSAIS/FOGO5_3B-MASK',
  imageMapbiomasCoverage: 'projects/mapbiomas-workspace/public/collection5/mapbiomas_collection50_integration_v1',
  collectionLandsat: require('users/geomapeamentoipam/GT_Fogo_MapBiomas:00_Tools/require-collectionAllLandsat').allLandsat2(),
  gridLandsat: 'users/geomapeamentoipam/AUXILIAR/grid_landsat',
  biomas:'users/geomapeamentoipam/AUXILIAR/biomas_IBGE_250mil',
  brasil:'projects/mapbiomas-workspace/AUXILIAR/brasil_2km',
  areasProtegidas:'projects/mapbiomas-workspace/AUXILIAR/areas-protegidas-raster',
  //repositorios
  repositorio:"users/geomapeamentoipam/RESULTADOS/",
  //listas auxiliares
  folders: ["AMAZONIA","CAATINGA","CERRADO","MATA_ATLANTICA","PAMPA","PANTANAL"],
  biomasList:["Brasil","Amazônia","Caatinga", "Cerrado","Mata Atlântica","Pampa","Pantanal"],
  landsat:["L05","L07","L08"],
  years:[2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,
        2010,2011,2012,2013,2014,2015,2016,2017,2018,2019,2020],
  monthsBand:["Jan","Feb","Mar","Apr","May","June","July","Aug","Sept","Oct","Nov","Dec"],
  months:[
      // [bandName,datePrefix,dateSufix],
      ['Jan', '-01-01', '-02-01'],
      ['Feb', '-02-01', '-03-01'],
      ['Mar', '-03-01', '-04-01'],
      ['Apr', '-04-01', '-05-01'],
      ['May', '-05-01', '-06-01'],
      ['June','-06-01', '-07-01'],
      ['July','-07-01', '-08-01'],
      ['Aug', '-08-01', '-09-01'],
      ['Sept','-09-01', '-10-01'],
      ['Oct', '-10-01', '-11-01'],
      ['Nov', '-11-01', '-12-01'],
      ['Dec', '-12-01', '-12-31'],
      ],
  monthPosition:1,
  booleans:[ 
    true,     //0-limite bioma,
    false,    //1-grid Landsat
    false,    //2-Areas Protegidas
    false,     //3-mapbiomas fogo (year),
    false,    // 4-modis (year),
    false,    //5-convergencia(anteriores)
    false,    //6-mapbiomas coverage  -> valido somente para a legenda
    false,    //7-mapbiomas fogo (month),
    false,    // 8-modis (month),
    false,    // 9-convergencia(anteriores)
    false,    //10-landsat mosaic  -> valido somente para a legenda
    false,    //11-control months
    false,    //12-frequencia mapbiomas fogo
    false,    //13-frequencia modis-> valido somente para a legenda
    true,    //14-MapBiomas Fogo Beta3 Mask
    false,    //15-MapBiomas Fogo Beta3 frequencia
      ],
  //Funçoes auxiliares
  maskcenasr: require('users/geomapeamentoipam/GT_Fogo_MapBiomas:00_Tools/GEETools').maskcenasr(),
  areaM2: require('users/geomapeamentoipam/GT_Fogo_MapBiomas:00_Tools/GEETools').areaM2(),
  paletteMapBiomas: require('users/mapbiomas/modules:Palettes.js').get('classification5'),
  //palette
  palette: ['ffffff','F8D71F','DAA118','BD6C12','9F360B','810004','4D0709'], 
  // ['#00876c','#379469','#58a066','#78ab63',
  // '#98b561','#b8bf62','#dac767','#deb256','#e09d4b',
  // '#e18745','#e06f45','#dc574a','#d43d51'],
  palettePrincipal:   [
    '000000',  //0-limite bioma,
    'AA0000',  //1-grid Landsat
    '808080',  //2-Areas Protegidas
    '000000',  //3-mapbiomas fogo (year),
    'ff8c00',  // 4-modis (year),
    '00dddd',  //5-convergencia(anteriores)
    '808080',  //6-mapbiomas coverage  -> valido somente para a legenda
    'ff8080',  //7-mapbiomas fogo (month),
    'ffcc66',  // 8-modis (month),
    '80ffff',  // 9-convergencia(anteriores)
    '808080',  //10-landsat mosaic  -> valido somente para a legenda
    'ffffff',  //11-control months
    '808080',  //12-frequencia mapbiomas fogo
    '808080',  //13-frequencia modis
    'ff3000',    //14-MapBiomas Fogo Beta3 Mask
    '808080',    //15-MapBiomas Fogo Beta3 frequencia
  ],
  // bandsReference: [
  //   ['RED', 'GREEN', 'BLUE'], //natural
  //   ['SWIR1', 'NIR', 'GREEN'], //swir
  //   ['SWIR2', 'SWIR1', 'RED'], //urban
  //   ['NIR', 'RED', 'GREEN'], //veg
  //   ['SWIR1', 'NIR', 'RED'], //FIRE
  //   ['gv','npv','cloud'], //spectral misture
  //   ['BSI'],
  //   ['NBR'],
//  ],  
  vizParamsLandsat:{
     bands: ['SWIR1','NIR','RED'],
    // gain:[0.08,0.06,0.2],
    // bias:,
     min:0,
     max:0.6,
    gamma:0.75,
    // opacity:,
    // palette:,
    forceRgbOutput:true,
  },
  //Ponteiros
  yearSelect:2018,
  monthSelect:9,
  biomaSelect:6,
  booleanMosaic:false,
};
app.loadLayer = function(){
    // print('Carregando camadas...');
    //ASSETS
    var year = app.assets.yearSelect;
    var maskcenasr = app.assets.maskcenasr;
    var areaM2 = app.assets.areaM2;
    var palettePrincipal = app.assets.palettePrincipal;
    var biomaSelect = app.assets.biomasList[app.assets.biomaSelect];
    var booleans = app.assets.booleans;
    //PRÉ-PROCESSAMENTO    
    var brasil = ee.Feature(ee.FeatureCollection(app.assets.brasil).geometry())
      .set({
        "Bioma": "Brasil",
        "CD_Bioma": 0
      });
    var bioma = ee.FeatureCollection(app.assets.biomas)
      .merge(brasil)
      .filter(ee.Filter.eq('Bioma',biomaSelect));
    var areasProtegidas = ee.Image(app.assets.areasProtegidas);
    var gridFiltred = ee.FeatureCollection(app.assets.gridLandsat)
      .filterBounds(bioma);
    var imageMapBiomasFogoBeta3 = ee.ImageCollection(app.assets.collectionMapBiomasFogoBeta3)
      .select("FireYear")
      .filter(ee.Filter.eq('year',year))
      // .filter(ee.Filter.eq('biome',biomaSelect))
      .mosaic()
      .clip(bioma.geometry());
    var imageMapBiomasFogoBeta3Mask = ee.ImageCollection(app.assets.collectionMapBiomasFogoBeta3Mask)
      .select("FireYear")
      .filter(ee.Filter.eq('year',year))
      // .filter(ee.Filter.eq('biome',biomaSelect))
      .mosaic()
      .clip(bioma.geometry());
    var imageModisBurnData = ee.ImageCollection(app.assets.colectionModisBurnData)
      .filterDate(''+year+'-01-01', ''+year+'-12-31')
      .select("BurnDate")
      .mosaic()
      .clip(bioma);// a escolha em usar o clip ao invés do filter, é para validar o uso da escala para o Brasil
    var convergencia = imageMapBiomasFogoBeta3Mask.updateMask(imageModisBurnData);
    var imageMapbiomasCoverage = ee.Image(app.assets.imageMapbiomasCoverage).select('classification_' + year)
      .clip(bioma);
      var anos = [
        2000,2001,2002,2003,2004,2005,2006,2007,2008,2009,
        2010,2011,2012,2013,2014,2015,2016,2017,2018,2019
      ];
    var frequenceMapBiomasFogoBeta3 = ee.ImageCollection(app.assets.collectionMapBiomasFogoBeta3)
      .select("FireYear")
      // .filter(ee.Filter.lte('biome',biomaSelect))
      .filter(ee.Filter.lte('year',year))
      .map(function(image){
        return ee.Image(1).updateMask(image);
      })
      .sum()
      .clip(bioma); // a escolha em usar o clip ao invés do filter, é para validar o uso da escala para o Brasil
    var frequenceMapBiomasFogoBeta3Mask = ee.ImageCollection(app.assets.collectionMapBiomasFogoBeta3Mask)
      .select("FireYear")
      // .filter(ee.Filter.lte('biome',biomaSelect))
      .filter(ee.Filter.lte('year',year))
      .map(function(image){
        return ee.Image(1).updateMask(image);
      })
      .sum()
      .clip(bioma); // a escolha em usar o clip ao invés do filter, é para validar o uso da escala para o Brasil
    var frequenceModis = anos.map(function(i){
      var frequenceModis = ee.ImageCollection(app.assets.colectionModisBurnData)
      .filterDate(''+i+'-01-01', ''+i+'-12-31')
      .select("BurnDate")
      .median()
      return ee.Image(1).updateMask(frequenceModis).set('year',i); 
    });
    frequenceModis = ee.ImageCollection(frequenceModis)
      .filter(ee.Filter.lte('year',year))
      .sum()
      .clip(bioma);
    var list12 = [11,10,9,8,7,6,5,4,3,2,1,0].reverse();
    var listMonthPlot = list12.map(function (a){
    var monthBand = app.assets.months[a][0];
    var datePrefixe = app.assets.months[a][1];
    var dateSufixe = app.assets.months[a][2];
    var imageMapBiomasFogoBeta3Month = ee.ImageCollection(app.assets.collectionMapBiomasFogoBeta3)
      .select(monthBand)
      .filter(ee.Filter.eq('year',year))
      // .filter(ee.Filter.eq('biome',biomaSelect))
      .mosaic()
      .clip(bioma);
    var imageModisBurnDataMonth = ee.ImageCollection(app.assets.colectionModisBurnData)
      .filterDate(''+year+datePrefixe, ''+year+dateSufixe)
      .select("BurnDate")
      .mosaic()
      .clip(bioma);
    var convergenciaMonth = imageMapBiomasFogoBeta3Month.updateMask(imageModisBurnDataMonth);
    var mosaicLandsat = app.assets.collectionLandsat
      .filterDate(''+year+datePrefixe, ''+year+dateSufixe)
      .filterBounds(bioma.geometry())
      .map(maskcenasr)
      // .map(function(image){
      // return image.visualize(app.assets.vizParamsLandsat);
    // })
    // .median();
    return [
    function(){Map.addLayer(mosaicLandsat, app.assets.vizParamsLandsat, 'Landsat - SWIR1-NIR-RED -'+ monthBand+ '-' + year , false)},
    function(){Map.addLayer(imageMapBiomasFogoBeta3Month, {palette:palettePrincipal[7]},'MapBiomas-Fogo-Beta3 - '+ biomaSelect + monthBand+ '-' + year, booleans[7])},
    function(){Map.addLayer(convergenciaMonth, {palette:palettePrincipal[8]}, 'Convergencia Modis|MapBiomas'+ biomaSelect +' '+ monthBand+ '-' + year, booleans[8])},
    ];
    });
    //anual
    Map.addLayer(imageMapbiomasCoverage, {palette:app.assets.paletteMapBiomas,min:0,max:45}, 'MapBiomas-Coverage - '+ biomaSelect + ' '+ year, booleans[6]);
    Map.addLayer(imageModisBurnData, {palette:palettePrincipal[4]}, 'MODIS-BurnedArea - '+ biomaSelect + ' '+ year, booleans[4]);
    Map.addLayer(imageMapBiomasFogoBeta3, {palette:palettePrincipal[3]}, 'MapBiomas-Fogo-Beta3 - '+ biomaSelect + ' '+ year, booleans[3]);
    Map.addLayer(imageMapBiomasFogoBeta3Mask, {palette:palettePrincipal[14]}, 'MapBiomas-Fogo-Beta3-Mask - '+ biomaSelect + ' '+ year, booleans[14]);
    Map.addLayer(convergencia, {palette:palettePrincipal[5]}, 'Convergencia Modis|MapBiomas - '+ biomaSelect + ' '+ year, booleans[5]);
    var vizParamsFrequency = {
      palette:app.assets.palette,
      min:0,
      max:year-2000
    }
    Map.addLayer(frequenceMapBiomasFogoBeta3Mask, vizParamsFrequency, 'frequency-MapBiomas-FogoA-Beta3 Mask '+ biomaSelect + '- from 2000 to'+ year, booleans[15]);
    Map.addLayer(frequenceMapBiomasFogoBeta3, vizParamsFrequency, 'frequency-MapBiomas-FogoA-Beta3 '+ biomaSelect + '- from 2000 to'+ year, booleans[12]);
    Map.addLayer(frequenceModis, vizParamsFrequency, 'frequency-Modis-BurnedArea '+ biomaSelect + '- from 2000 to'+ year, booleans[13]);
      var i;
      for(i in listMonthPlot){
        listMonthPlot[i][0]();
      }
      for(i in listMonthPlot){
        listMonthPlot[i][1]();
      }
      for(i in listMonthPlot){
        listMonthPlot[i][2]();
      }
    //Auxiliar
    Map.addLayer(areasProtegidas,{palette:palettePrincipal[2]},'Áreas Protegidas',booleans[2],0.5);
    var lineBioma = ee.Image(1).paint(bioma,null,0.5);
    Map.addLayer(lineBioma.updateMask(lineBioma.lt(1)),{palette:palettePrincipal[0]}, biomaSelect, booleans[0], 0.5);
    var blank = ee.Image(0).mask(0);
    //Adiciona o layer de grid de cenas
    var outline_grid = blank.paint(gridFiltred, 'AA0000', 1);
    Map.addLayer(outline_grid, {palette:palettePrincipal[1]}, 'Grid', booleans[1],0.7);
    // print("Camadas carregadas !)");
  },
app.loadControlInterface = function(){
    // print("Carregando controles de interface...");
    //ASSETS
    // https://www.caracteresespeciais.com/2009/09/lista-com-2-mil-caracteres-especiais.html  ->  list with 2,000 special characters
      // favorites : ["❖","◆","◇","◆","◈","◉","▣","▩","■","♨","❘","❙","❚","☭","~","♯","═","─","━","▬",
      //"▲","△","▶","▷","▼","▽","◀","◁","◢","◣","◤","◥","☀","☁","☂","☃","☄","★","☆","✲",
      //"✳","✴","✵","✶","✷","✸","✹","✺","✻","✼","✽","✾","✿","❀","❁","❂","❃","❄","❅","❆","❇","❈","❉","❊","❋]
    var year = app.assets.yearSelect;
    var booleans = app.assets.booleans;
    var biomaSelect = app.assets.biomasList[app.assets.biomaSelect];
    // var titulo = "Mapa de Cicatrizes no " + biomaSelect + " || " + year + " || " + "V4";
    var styles = {
      // geral sizes
      principalTitleSize:"24px",
      titleSize:"22px",
      titleMargin:'0px 100px 0px 0px',
      subTitleSize:"16px",
      subTitleMargin:'0px 10px 0px 0px',
      comumSize:"12px",
      comumMargin:'0px 0px 0px 0px',
      iconSize:"14px",
      backgroundColorComum:"ffffff00", // fundo da tela principal - referencia porcentagem hexadecimal ->
      backgroundColorPrincipal:"ffffffff", // fundo da tela principal - referencia porcentagem hexadecimal ->
       // geral colors             
      color:app.assets.palettePrincipal
    };
    var panelStyle = {
      comum:{
        margin:styles.comumMargin,
        backgroundColor:styles.backgroundColorComum,
        textAlign:'center',
      },
      principal:{
        margin:styles.comumMargin,
        backgroundColor:styles.backgroundColorPrincipal,
        position:'bottom-left',
        textAlign:'center',
      }
    }
    //FUNÇOES
    function legendFunction (list){
        var icon = list[0];
        var name = list[1];
        var positionLayer = list[2];
        var color = list[3];
        var boolean = list[4];
        var line = ui.Panel({
            widgets: [
              ui.Label({
                value:icon,
                style:{
                  color:color,
                  fontSize:styles.iconSize,
                  margin:styles.comumMargin,
                  backgroundColor:styles.backgroundColorComum
                }
              }),
              ui.Checkbox({
                label:name,
                value:boolean,
                onChange:function(value){
                Map.layers().get(positionLayer).setShown(value);
                // print(positionLayer, value);
                },
                // disabled:,
                style:{
                  fontSize:styles.comumSize,
                  margin:styles.comumMargin,
                  backgroundColor:styles.backgroundColorComum
                }
              })
            ],
            layout:ui.Panel.Layout.flow('horizontal'),
            style: {
              margin:styles.comumMargin,
              backgroundColor:styles.backgroundColorComum
            }
        });
      return line;
    }
    function legendFunctionForMonths (list){
        var icon = list[0];
        var name = list[1];
        var booleanPosition = list[2];
        var color = list[3];
        var boolean = list[4];
        var min = list[5];
        var line = ui.Panel({
            widgets: [
              ui.Label({
                value:icon,
                style:{
                  color:color,
                  fontSize:styles.iconSize,
                  margin:styles.comumMargin,
                  backgroundColor:styles.backgroundColorComum
                }
              }),
              ui.Checkbox({
                label:name,
                value:app.assets.booleans[booleanPosition],
                onChange:function(value){
                  Map.layers().get(app.assets.monthPosition).setShown(value);
                  app.assets.booleans[booleanPosition] = value;
                },
                // disabled:app.assets.booleans[11],
                style:{
                  fontSize:styles.comumSize,
                  margin:styles.comumMargin,
                  backgroundColor:styles.backgroundColorComum
                }
              })
            ],
            layout:ui.Panel.Layout.flow('horizontal'),
            style: {
              margin:styles.comumMargin,
              backgroundColor:styles.backgroundColorComum
            }
        });
      return line;
    }
    //ITENS
    // [x] - ui.label - "legend" - title
    var legendLabel = ui.Label({
      value: 'Legend',
      style: {
        fontWeight: 'bold',
        fontSize: styles.titleSize,
        margin: styles.titleMargin,
        padding: '5px 0px 0px 0px',
        backgroundColor:styles.backgroundColorComum
      }
    })
    // [x] - ui.select - controle escala espacial - subTitle
    var scaleSelect = ui.Select({
      items:[ 
        {label:'Brasil',value:0},
        {label:'Amazônia',value:1},
        {label:'Caatinga',value:2},
        {label:'Cerrado',value:3},
        {label:'Mata Atlântica',value:4},
        {label:'Pampa',value:5},
        {label:'Pantanal',value:6}
      ],
    placeholder:'Escolha um Bioma',
    value:app.assets.biomaSelect,
    onChange:function(value){
      Map.clear();
      app.assets.biomaSelect = value;
      var brasil = ee.Feature(ee.FeatureCollection(app.assets.brasil).geometry())
      .set({
        "Bioma": "Brasil",
        "CD_Bioma": 0
      });
      var centerObject = ee.FeatureCollection(app.assets.biomas)
          .merge(brasil)
        .filter(ee.Filter.eq('Bioma',app.assets.biomasList[value]));
      Map.centerObject(centerObject.geometry());
        app.loadLayer();
        app.loadControlInterface();       
    },
        style:{
          width: '100px',
          height: '45px',
          // padding: 'px',
          textAlign: 'center',
          margin:styles.subTitleMargin,
          backgroundColor:styles.backgroundColorComum
        }
      })
    // [x] - ui.label - "Auxiliary" - subTitle
    var auxiliaryLabel = ui.Label({
      value: 'Auxiliary',
      style: {
        fontWeight: 'bold',
        fontSize: styles.subTitleSize,
        margin: styles.subTitleMargin,
        backgroundColor:styles.backgroundColorComum
      }
    });
    // [x] - listLegend1 - limite bioma, grid Landsat, Areas Protegidas - comum
    var somador = 8+36;
    var listLegend1 =[
        ["━ ","Limite do Bioma",  somador + 1, styles.color[0],booleans[0]],
        ["▣","Grid Landsat",  somador + 2, styles.color[1],booleans[1]],
        ["◆","Areas protegidas", somador,styles.color[2] ,booleans[2]],
      ];
    listLegend1 = listLegend1.map(legendFunction);
    listLegend1 = ui.Panel({
            widgets: listLegend1,
            layout:ui.Panel.Layout.flow('vertical'),
            style: {
              margin:styles.comumMargin,
              backgroundColor:styles.backgroundColorComum
            }
        });
    // [x] - ui.label - "Year" - subTitle
    var YearLabel = ui.Label({
      value: 'Year',
      style: {
        // fontWeight: 'bold',
        fontSize: styles.subTitleSize,
        margin: styles.subTitleMargin,
        backgroundColor:styles.backgroundColorComum
      }
    });
    // [x] - ui.slider - controle ano - comum
    var sliderYear = ui.Slider({
          min:2000,
          max:2020,
          value:app.assets.yearSelect,
          step:1,
          onChange:function(value){
            // print(value)
            Map.clear();
            app.assets.yearSelect = value;
              app.loadLayer();
              app.loadControlInterface();   
          },
          direction:'horizontal',
        // disabled:,
        style:{
          width: '200px',
          // height: '45px',
          fontSize:styles.comumSize,
          margin:styles.comumMargin,
          backgroundColor:styles.backgroundColorComum
        }
      })
    // [x] - listLegend2 - ▶ fogo (year), modis (year), convergencia(anteriores) - comum
    var listLegend2 =[
        ["❖","Mapbiomas-Fogo-Beta3",  2, styles.color[3],booleans[3]],
        ["❖","Mapbiomas-Fogo-Beta3-Mask",  3, styles.color[14],booleans[14]],
        ["❖","Modis-BurnedArea",  1, styles.color[4],booleans[4]],
        ["❖","Convergencia", 4,styles.color[5],booleans[5]],
      ];
    listLegend2 = listLegend2.map(legendFunction);
    listLegend2 = ui.Panel({
            widgets: listLegend2,
            layout:ui.Panel.Layout.flow('vertical'),
            style: {
              margin:styles.comumMargin,
              backgroundColor:styles.backgroundColorComum
            }
        });
    // [x] - listLegend-3 - mosaico MAPBIOMAS coverage - comum
    var listLegend3 =[
      ["▶","MapBiomas-Coverage",  0, styles.color[6],booleans[6]],
      ["▶","Frequency-MapBiomas Fogo Beta3",  6, styles.color[12],booleans[12]],
      ["▶","Frequency-MapBiomas Fogo Beta3 Mask",  5, styles.color[15],booleans[15]],
      ["▶","Frequency-Modis-BurnedArea",  7, styles.color[13],booleans[13]],
      ];
    listLegend3 = listLegend3.map(legendFunction);
    listLegend3 = ui.Panel({
            widgets:listLegend3,
            layout:ui.Panel.Layout.flow('vertical'),
            style: {
              margin:styles.comumMargin,
              backgroundColor:styles.backgroundColorComum
            }
        });
    // [x] - ui.Chekbox - "Month" - subTitle
    var monthCheckbox = ui.Checkbox({
      label:'Month',
      value:booleans[11],
      onChange:function(value){
        app.assets.booleans[11] = value;
        // print(value);
      },
      // disabled,
      style:{
        fontSize:styles.subTitleSize,
        margin:styles.subTitleMargin,
        backgroundColor:styles.backgroundColorComum
      }
    })
    // [x] - ui.slider - controle mes - comum
    var sliderMonth = ui.Slider({
          min:1,
          max:12,
          value:app.assets.yearSelect,
          step:1,
          onChange:function(value){
            // print(value)
          app.assets.monthPosition = value
          var somador = 9;
          var valores = {
            landsat: somador + value,
            modis: somador + 12 + value,
            mapbiomas: somador + 24 + value,
            convergencia: somador + 36 + value,
          };
            for (var i = somador + 1; i < 48; i++){
              Map.layers().get(i).setShown(false);
            }
            if (app.assets.booleans[11] === true){
              if (app.assets.booleans[10] === true){
                Map.layers().get(valores.landsat).setShown(app.assets.booleans[10]);
              }
              if (app.assets.booleans[8] === true){
                Map.layers().get(valores.modis).setShown(app.assets.booleans[8]);
              }
              if (app.assets.booleans[7] === true){
                Map.layers().get(valores.mapbiomas).setShown(app.assets.booleans[7]);
              }
              if (app.assets.booleans[9] === true){
                Map.layers().get(valores.convergencia).setShown(app.assets.booleans[9]);
              }
            }
          },
          direction:'horizontal',
        // disabled:booleans[11],
        style:{
          width: '200px',
          // height: '45px',
          fontSize:styles.comumSize,
          margin:styles.comumMargin,
          backgroundColor:styles.backgroundColorComum
        }
      })
    // [x] - listLegend-4 - mapbiomas fogo (month), modis (month), convergencia(anteriores) - comum
    somador = 6;
    var listLegend4 =[
        ["❖","MapBiomas-Fogo-Beta3",  8, styles.color[7],booleans[7],somador],
        ["❖","Modis-BurnedArea",  9, styles.color[8],booleans[8],somador + 12],
        ["❖","Convergencia", 9,styles.color[9],booleans[9],somador + 24],
      ];
    listLegend4 = listLegend4.map(legendFunctionForMonths);
    listLegend4 = ui.Panel({
            widgets: listLegend4,
            layout:ui.Panel.Layout.flow('vertical'),
            style: {
              margin:styles.comumMargin,
              backgroundColor:styles.backgroundColorComum
            }
        });
    // [x] - listLegend-5 - mosaico require-allLandsat - comum
    var listLegend5 =[
        ["❖","Mosaic-Landsat ('B6,B5,B4')",  10, styles.color[10],booleans[10],somador + 36],
      ];
      listLegend5 = listLegend5.map(legendFunctionForMonths);
      listLegend5 = ui.Panel({
            widgets: listLegend5,
            layout:ui.Panel.Layout.flow('vertical'),
            style: {
              margin:styles.comumMargin,
              backgroundColor:styles.backgroundColorComum
            }
        });
    var colorBar = ui.Thumbnail({
          image: ee.Image.pixelLonLat().select(0),
          params: {
            bbox: [0, 0, 1, 0.1],
            dimensions: '100x10',
            format: 'png',
            min: 0,
            max: 1,
            palette: app.assets.palette,
          },
          style: {
            stretch: 'horizontal',
            maxHeight: '10px',
            margin:styles.comumMargin,
            backgroundColor:styles.backgroundColorComum},
        });
var PANEL_A_4_2 = ui.Panel({
style:panelStyle.comum
}).add(listLegend4)
.add(listLegend5);
var PANEL_A_4_1 = ui.Panel({
style:panelStyle.comum,
layout:ui.Panel.Layout.flow('horizontal'),
}) 
.add(monthCheckbox)
.add(sliderMonth)
var PANEL_A_4 = ui.Panel({
style:panelStyle.comum,
layout:ui.Panel.Layout.flow('vertical'),
}).add(PANEL_A_4_1)
.add(PANEL_A_4_2)
var PANEL_A_3_2 = ui.Panel({
style:panelStyle.comum,
layout:ui.Panel.Layout.flow('vertical'),
})
.add(listLegend2)
.add(listLegend3)
.add(colorBar);
var PANEL_A_3_1 = ui.Panel({
style:panelStyle.comum,
layout:ui.Panel.Layout.flow('horizontal'),
}).add(YearLabel)
.add(sliderYear)
var PANEL_A_3 = ui.Panel({
style:panelStyle.comum,
layout:ui.Panel.Layout.flow('vertical'),
})
.add(PANEL_A_3_1)
.add(PANEL_A_3_2)
var PANEL_A_2_2 = ui.Panel({
style:panelStyle.comum
}).add(listLegend1);
var PANEL_A_2_1 = ui.Panel({
style:panelStyle.comum
}).add(auxiliaryLabel);
  var PANEL_A_2 = ui.Panel({
    style:panelStyle.comum
  }).add(PANEL_A_2_1)
  .add(PANEL_A_2_2)
var PANEL_A_1 = ui.Panel({
  style:panelStyle.comum,
  layout:ui.Panel.Layout.flow('horizontal'),
})
  .add(legendLabel)
  .add(scaleSelect)
var PANEL_A = ui.Panel({
  style:panelStyle.principal,
  layout:ui.Panel.Layout.flow('vertical'),
  widgets:[
    PANEL_A_1,
    PANEL_A_2,
    PANEL_A_3,
    // PANEL_A_4
    ]
});
Map.add(PANEL_A)
/*
    // Map.add(PANEL_A);
//*/
    // //TITLE
    // var logo = require('users/mapbiomas/modules:Logos.js').mapbiomas;
    // var titleMap = ui.Label({
    //   value: titulo,
    //   style: {
    //     fontWeight: 'bold',
    //     fontSize: styles.principalTitleSize,
    //     padding: '5px 0px 0px 0px',
    //     backgroundColor:styles.backgroundColorComum,
    //     }
    //   });
    // var panelTile = ui.Panel({
    //   widgets:[titleMap],
    //   // widgets:[logo,titleMap],
    //   layout: ui.Panel.Layout.flow('horizontal'),
    //   style: {
    //     // position:'top-left',
    //     padding: '0px 100px',
    //     backgroundColor:styles.backgroundBackgroundColor,
    //     textAlign:"center",
    //   }
    // });
    // Map.add(panelTile);
    // print("Controles de interface carregados !)");
  },
app.iniciar = function() {
  print('🤹🏽🌀');
  print('Iniciando rotina...🚀🌎🛰️📡💫💻️');
  app.loadLayer();
  app.loadControlInterface();
  print('Rotina iniciada com sucesso...🔥🗺️');
};
var center = ee.Feature(ee.FeatureCollection(app.assets.brasil)
  .geometry());
Map.centerObject(center);
app.iniciar();