var geometry = ui.import && ui.import("geometry", "geometry", {
      "geometries": [
        {
          "type": "Polygon",
          "coordinates": [
            [
              [
                -74.2496833791755,
                5.513105751688962
              ],
              [
                -74.2496833791755,
                -34.464979446011014
              ],
              [
                -33.292652129175515,
                -34.464979446011014
              ],
              [
                -33.292652129175515,
                5.513105751688962
              ]
            ]
          ],
          "geodesic": false,
          "evenOdd": true
        }
      ],
      "displayProperties": [],
      "properties": {},
      "color": "#d63000",
      "mode": "Geometry",
      "shown": false,
      "locked": false
    }) || 
    /* color: #d63000 */
    /* shown: false */
    ee.Geometry.Polygon(
        [[[-74.2496833791755, 5.513105751688962],
          [-74.2496833791755, -34.464979446011014],
          [-33.292652129175515, -34.464979446011014],
          [-33.292652129175515, 5.513105751688962]]], null, false);
// --- APP DO TCC
//  last update 2021-10-26-13:18 ->  add dados de monitoramento e links para thumbnails simples https://code.earthengine.google.com/5a7b37025a60ddaffa3918aa15340d64
//  last update 2021-10-26-10:07 ->  add mosaico com as imagens mais recentes sem nuvens  - https://code.earthengine.google.com/f98fafe04a898ba280b981672d1ce292
//  last update 2021-10-23-20:04 ->  correção do bug da solicitação da collection
//  last update 2021-10-23-20:00 ->  correção do bug da logo no grafico
// --- --- --- --- INITIAL OPTIONS AND CACHE MEMORY FOR APP
var options = {
  year:2021,
  limit:'Pantanal',
  expanse: {},
};
// --- --- --- --- DATASETS, VISUAL PARAMS AND OTHERS PARAMS
var dataset = {
  // --- --- raster
  mapbiomas_fogo:{
    monthly:{
      image:ee.Image('projects/mapbiomas-workspace/public/collection6/mapbiomas-fire-collection1-monthly-burned-coverage-1')
        .divide(100)
        .int(),
      visParams:{
        min:1,
        max:12,
        palette:['a900ff', '6f02ff', '020aff', '0675ff', '06ffff', 'ffee00', 'ff7700', 'ff0800', 'c20202', '0aa602', '0cff00'],
        bands:'burned_coverage_' + options.year,
      }
    },
    annual:{
      image:ee.Image('projects/mapbiomas-workspace/public/collection6/mapbiomas-fire-collection1-monthly-burned-coverage-1')
        .gte(1),
      visParams:{
        min:0,
        max:1,
        palette:['800000'],
        bands:'burned_coverage_' + options.year,
      }
    },
    burned_cover:{
      image:ee.Image('projects/mapbiomas-workspace/public/collection6/mapbiomas-fire-collection1-monthly-burned-coverage-1').mod(100),
      visParams:{
        min:0,
        max:49,
        palette:require('users/mapbiomas/modules:Palettes.js').get('classification6'),
        bands:'burned_coverage_' + options.year,
      }
    },
    acumulated:{
      image:ee.Image('projects/mapbiomas-workspace/public/collection6/mapbiomas-fire-collection1-fire-frequency-1')
        .gte(1)
,
      visParams:{
        min:0,
        max:1,
        palette:['ff0000'],
        bands:'fire_frequency_1985_' + options.year,
      }
    },
    acumulated_cover:{
      image:ee.Image('projects/mapbiomas-workspace/public/collection6/mapbiomas-fire-collection1-fire-frequency-1')
        .mod(100)
,
     visParams:{
        min:0,
        max:49,
        palette:require('users/mapbiomas/modules:Palettes.js').get('classification6'),
        bands:'fire_frequency_1985_' + options.year,
      }
    },
    frequency:{
      image:ee.Image('projects/mapbiomas-workspace/public/collection6/mapbiomas-fire-collection1-fire-frequency-1')
        .divide(100)
        .int()
,
      visParams:{
        min:1,
        max:36,
        palette:['ffffff','F8D71F','DAA118','BD6C12','9F360B','810004','4D0709'],
        bands:'fire_frequency_1985_' + options.year,
      }
    },
    synYearFire:{
      image:ee.Image('projects/mapbiomas-workspace/SEEG/2021/FIRE_DYNAMICS/mapbiomas-fire-collection1-year-since-fire-v1'),
      visParams:{
        min:1,
        max:options.year - 1985,
        palette:['a900ff', '6f02ff', '020aff', '0675ff', '06ffff', 'ffee00', 'ff7700', 'ff0800', 'c20202', '0aa602', '0cff00'],
        bands:'classification_' + options.year,
      }
    },
    period:{
      start:1985,
      end:2020
    }
  },
  mcd64a1:{
    monthly:{
      image:ee.Image('projects/mapbiomas-workspace/FOGO1/monthly-coverage-mcd64a1-v2')
        .divide(100)
        .int(),
      visParams:{
        min:1,
        max:12,
        palette:['a900ff', '6f02ff', '020aff', '0675ff', '06ffff', 'ffee00', 'ff7700', 'ff0800', 'c20202', '0aa602', '0cff00'],
        bands:'burned_coverage_' + options.year,
      }
    },
    annual:{
      image:ee.Image('projects/mapbiomas-workspace/FOGO1/monthly-coverage-mcd64a1-v2')
        .gte(1),
      visParams:{
        min:0,
        max:1,
        palette:['800000'],
        bands:'burned_coverage_' + options.year,
      }
    },
    burned_cover:{
      image:ee.Image('projects/mapbiomas-workspace/FOGO1/monthly-coverage-mcd64a1-v2')
        .mod(100),
      visParams:{
        min:0,
        max:49,
        palette:require('users/mapbiomas/modules:Palettes.js').get('classification6'),
        bands:'burned_coverage_' + options.year,
      }
    },
    acumulated:{
      image:ee.Image('projects/mapbiomas-workspace/FOGO1/frequency-coverage-mcd64a1-v2')
        .gte(1),
      visParams:{
        min:0,
        max:1,
        palette:['ff0000'],
        bands:'fire_frequency_2001_' + options.year,
      }
    },
    acumulated_cover:{
      image:ee.Image('projects/mapbiomas-workspace/FOGO1/frequency-coverage-mcd64a1-v2')
        .mod(100),
     visParams:{
        min:0,
        max:49,
        palette:require('users/mapbiomas/modules:Palettes.js').get('classification6'),
        bands:'fire_frequency_2001_' + options.year,
      }
    },
    frequency:{
      image:ee.Image('projects/mapbiomas-workspace/FOGO1/frequency-coverage-mcd64a1-v2')
        .divide(100)
        .int(),
      visParams:{
        min:1,
        max:36,
        palette:['ffffff','F8D71F','DAA118','BD6C12','9F360B','810004','4D0709'],
        bands:'fire_frequency_2001_' + options.year,
      }
    },
    synYearFire:{
      image:ee.Image('projects/mapbiomas-workspace/SEEG/2021/FIRE_DYNAMICS/internal-version-nasa-mcd64a1-year-since-fire-v1'),
      visParams:{
        min:1,
        max:options.year - 2001,
        palette:['a900ff', '6f02ff', '020aff', '0675ff', '06ffff', 'ffee00', 'ff7700', 'ff0800', 'c20202', '0aa602', '0cff00'],
        bands:'classification_' + options.year,
      }
    },
    period:{
      start:2001,
      end:2020
    }
  },
  fire_cci:{
    monthly:{
      image:ee.Image('projects/mapbiomas-workspace/FOGO1/monthly-coverage-firecci-v2')
        .divide(100)
        .int(),
      visParams:{
        min:1,
        max:12,
        palette:['a900ff', '6f02ff', '020aff', '0675ff', '06ffff', 'ffee00', 'ff7700', 'ff0800', 'c20202', '0aa602', '0cff00'],
        bands:'burned_coverage_' + options.year,
      }
    },
    annual:{
      image:ee.Image('projects/mapbiomas-workspace/FOGO1/monthly-coverage-firecci-v2')
        .gte(1),
      visParams:{
        min:0,
        max:1,
        palette:['800000'],
        bands:'burned_coverage_' + options.year,
      }
    },
    burned_cover:{
      image:ee.Image('projects/mapbiomas-workspace/FOGO1/monthly-coverage-firecci-v2')
        .mod(100),
      visParams:{
        min:0,
        max:49,
        palette:require('users/mapbiomas/modules:Palettes.js').get('classification6'),
        bands:'burned_coverage_' + options.year,
      }
    },
    acumulated:{
      image:ee.Image('projects/mapbiomas-workspace/FOGO1/frequency-coverage-firecci-v2')
        .gte(1),
      visParams:{
        min:0,
        max:1,
        palette:['ff0000'],
        bands:'fire_frequency_2001_' + options.year,
      }
    },
    acumulated_cover:{
      image:ee.Image('projects/mapbiomas-workspace/FOGO1/frequency-coverage-firecci-v2')
        .mod(100),
     visParams:{
        min:0,
        max:49,
        palette:require('users/mapbiomas/modules:Palettes.js').get('classification6'),
        bands:'fire_frequency_2001_' + options.year,
      }
    },
    frequency:{
      image:ee.Image('projects/mapbiomas-workspace/FOGO1/frequency-coverage-firecci-v2')
        .divide(100)
        .int(),
      visParams:{
        min:1,
        max:36,
        palette:['ffffff','F8D71F','DAA118','BD6C12','9F360B','810004','4D0709'],
        bands:'fire_frequency_2001_' + options.year,
      }
    },
    synYearFire:{
      image:ee.Image('projects/mapbiomas-workspace/SEEG/2021/FIRE_DYNAMICS/internal-version-esa-firecci-year-since-fire-v1'),
      visParams:{
        min:1,
        max:options.year - 2001,
        palette:['a900ff', '6f02ff', '020aff', '0675ff', '06ffff', 'ffee00', 'ff7700', 'ff0800', 'c20202', '0aa602', '0cff00'],
        bands:'classification_' + options.year,
      }
    },
    period:{
      start:2001,
      end:2019
    }
  },
  firms:{
    monthly:{
      image:ee.Image('projects/mapbiomas-workspace/FOGO1/monthly-coverage-firms-v2')
        .divide(100)
        .int(),
      visParams:{
        min:1,
        max:12,
        palette:['a900ff', '6f02ff', '020aff', '0675ff', '06ffff', 'ffee00', 'ff7700', 'ff0800', 'c20202', '0aa602', '0cff00'],
        bands:'burned_coverage_' + options.year,
      }
    },
    annual:{
      image:ee.Image('projects/mapbiomas-workspace/FOGO1/monthly-coverage-firms-v2')
        .gte(1),
      visParams:{
        min:0,
        max:1,
        palette:['800000'],
        bands:'burned_coverage_' + options.year,
      }
    },
    burned_cover:{
      image:ee.Image('projects/mapbiomas-workspace/FOGO1/monthly-coverage-firms-v2')
        .mod(100),
      visParams:{
        min:0,
        max:49,
        palette:require('users/mapbiomas/modules:Palettes.js').get('classification6'),
        bands:'burned_coverage_' + options.year,
      }
    },
    acumulated:{
      image:ee.Image('projects/mapbiomas-workspace/FOGO1/frequency-coverage-firms-v2')
        .gte(1),
      visParams:{
        min:0,
        max:1,
        palette:['ff0000'],
        bands:'fire_frequency_2001_' + options.year,
      }
    },
    acumulated_cover:{
      image:ee.Image('projects/mapbiomas-workspace/FOGO1/frequency-coverage-firms-v2')
        .mod(100),
     visParams:{
        min:0,
        max:49,
        palette:require('users/mapbiomas/modules:Palettes.js').get('classification6'),
        bands:'fire_frequency_2001_' + options.year,
      }
    },
    frequency:{
      image:ee.Image('projects/mapbiomas-workspace/FOGO1/frequency-coverage-firms-v2')
        .divide(100)
        .int(),
      visParams:{
        min:1,
        max:36,
        palette:['ffffff','F8D71F','DAA118','BD6C12','9F360B','810004','4D0709'],
        bands:'fire_frequency_2001_' + options.year,
      }
    },
    synYearFire:{
      image:ee.Image('projects/mapbiomas-workspace/SEEG/2021/FIRE_DYNAMICS/internal-version-nasa-firms-year-since-fire-v1'),
      visParams:{
        min:1,
        max:options.year - 2001,
        palette:['a900ff', '6f02ff', '020aff', '0675ff', '06ffff', 'ffee00', 'ff7700', 'ff0800', 'c20202', '0aa602', '0cff00'],
        bands:'classification_' + options.year,
      }
    },
    period:{
      start:2001,
      end:2020
    }
  },
  focos:{
    monthly:{
      image:ee.Image('projects/mapbiomas-workspace/FOGO1/monthly-focos-inpe-mais')
        .divide(100)
        .int(),
      visParams:{
        min:1,
        max:12,
        palette:['a900ff', '6f02ff', '020aff', '0675ff', '06ffff', 'ffee00', 'ff7700', 'ff0800', 'c20202', '0aa602', '0cff00'],
        bands:'classification_' + options.year,
      }
    },
    annual:{
      image:ee.Image('projects/mapbiomas-workspace/FOGO1/monthly-focos-inpe-mais')
        .gte(1),
      visParams:{
        min:0,
        max:1,
        palette:['800000'],
        bands:'classification_' + options.year,
      }
    },
    burned_cover:{
      image:ee.Image('projects/mapbiomas-workspace/FOGO1/monthly-focos-inpe-mais')
        .mod(100),
      visParams:{
        min:0,
        max:49,
        palette:require('users/mapbiomas/modules:Palettes.js').get('classification6'),
        bands:'classification_' + options.year,
      }
    },
    acumulated:{
      image:ee.Image('projects/mapbiomas-workspace/FOGO1/frequency-coverage-inpe-v2')
        .gte(1)
,
      visParams:{
        min:0,
        max:1,
        palette:['ff0000'],
        bands:'fire_frequency_2000_' + options.year,
      }
    },
    acumulated_cover:{
      image:ee.Image('projects/mapbiomas-workspace/FOGO1/frequency-coverage-inpe-v2')
        .mod(100)
,
     visParams:{
        min:0,
        max:49,
        palette:require('users/mapbiomas/modules:Palettes.js').get('classification6'),
        bands:'fire_frequency_2000_' + options.year,
      }
    },
    frequency:{
      image:ee.Image('projects/mapbiomas-workspace/FOGO1/frequency-coverage-inpe-v2')
        .divide(100)
        .int(),
      visParams:{
        min:1,
        max:36,
        palette:['ffffff','F8D71F','DAA118','BD6C12','9F360B','810004','4D0709'],
        bands:'fire_frequency_2000_' + options.year,
      }
    },
    synYearFire:{
      image:ee.Image(0),
      visParams:{
        min:1,
        max:options.year - 2001,
        palette:['a900ff', '6f02ff', '020aff', '0675ff', '06ffff', 'ffee00', 'ff7700', 'ff0800', 'c20202', '0aa602', '0cff00'],
        bands:'classification_' + options.year,
      }
    },
    period:{
      start:2001,
      end:2020
    }
  },
  terra:{
    collection:ee.ImageCollection("MODIS/006/MOD09A1"),//2000-03-05T00:00:00 - 2021-10-16T00:00:00
    visParams:{
        min:300,
        max:4000,
        bands:['swir1','nir','red'],
      },
    period:{
      start:2000,
      end:2021
    },
  },
  aqua:{
    collection:ee.ImageCollection("MODIS/006/MYD09A1"),//2002-07-04T00:00:00 - 2021-10-16T00:00:00
    visParams:{
        min:300,
        max:4000,
        bands:['swir1','nir','red'],
      },
    period:{
      start:2002,
      end:2021
    },
  },
  landsat_4:{
    collection:ee.ImageCollection("LANDSAT/LT04/C01/T2_SR"),//1982-08-22T00:00:00 - 1993-12-14T00:00:00
    visParams:{
        min:300,
        max:4000,
        bands:['swir1','nir','red'],
      },
    period:{
      start:1982,
      end:1993
    },
  },
  landsat_5:{
    collection:ee.ImageCollection('LANDSAT/LT05/C01/T1_SR'),//1984-01-01T00:00:00 - 2012-05-05T00:00:00
    visParams:{
        min:300,
        max:4000,
        bands:['swir1','nir','red'],
      },
    period:{
      start:1984,
      end:2012
    },
  },
  landsat_7:{
    collection:ee.ImageCollection('LANDSAT/LE07/C01/T1_SR'), //1999-01-01T00:00:00 - 2021-01-24T00:00:00 // -> use until 2012 //Scanner broker failure on May 31, 2003, causing loss of 22% of the total image 
    visParams:{
      min:300,
      max:4000,
      bands:['swir1','nir','red'],
    },
    period:{
    start:1999,
    end:2021
  },
  },
  landsat_8:{
    collection:ee.ImageCollection('LANDSAT/LC08/C01/T1_SR'),//2013-04-11T00:00:00 - 2021-01-22T00:00:00
    visParams:{
        min:300,
        max:4000,
        bands:['swir1','nir','red'],
      },
    period:{
      start:2013,
      end:2021
    }
  },
  sentinel_2:{
    collection:ee.ImageCollection("COPERNICUS/S2"),//2017-03-28T00:00:00 - 2021-10-10T00:00:00
    visParams:{
        min:300,
        max:4000,
        bands:['swir1','nir','red'],
      },
    period:{
      start:2017,
      end:2021
    }
  },
  MCD64A1:{
    collection:ee.ImageCollection("MODIS/006/MCD64A1")//2000-11-01T00:00:00 - 2021-08-01T00:00:00
      ,
    visParams:{
        min:0,
        max:1,
        bands:['BurnDate'],
        palette:'808000',
      },
    period:{
      start:2000,
      end:2021
    },
  },
  FIRMS:{
    collection:ee.ImageCollection("FIRMS")//2000-11-01T00:00:00 - 2021-10-23T00:00:00
      ,
    visParams:{
        min:0,
        max:1,
        bands:['T21'],
        palette:'808000'
      },
    period:{
      start:2000,
      end:2021
    },
  },
  FIRE_CCI:{
    collection:ee.ImageCollection("ESA/CCI/FireCCI/5_1")//2001-01-01T00:00:00 - 2019-12-31T00:00:00
    ,
    visParams:{
        min:0,
        max:1,
        bands:['BurnDate'],
        palette:'808000'
      },
    period:{
      start:2001,
      end:2019
    }
  },
};
// --- --- --- --- USER INTERFACE STYLES
var styles = {
  title:{
    backgroundColor:'cccccc',
    stretch:'horizontal',
    textAlign:'left',
    // width:'',
    height:'30px',
    margin:'0px 0px 0px 0px'
  },//label -> #
  sub_label:{  
    backgroundColor:'dddddd',
    stretch:'horizontal',
    textAlign:'center',
    // width:'',
    // height:'30px',
    margin:'0px 0px 0px 0px'
  },
  button_expanse:{
    backgroundColor:'cccccc',
    // stretch:'horizontal',
    textAlign:'center',
    // height:'20px',
    width:'60px',
    fontSize:'5px',
    margin:'0px 0px 0px 0px'
  },//button
  sub_button_expanse:{
    backgroundColor:'dddddd',
    // stretch:'horizontal',
    textAlign:'left',
    height:'20px',
    // width:'30px',
    fontSize:'5px',
    margin:'0px 0px 0px 0px'
  },//button
  sub_button_add:{
    backgroundColor:'dddddd',
    // stretch:'horizontal',
    textAlign:'left',
    height:'20px',
    // width:'30px',
    fontSize:'5px',
    margin:'0px 0px 0px 0px'
  },//button
  clearLayers:{ // button
    backgroundColor:'ffffff',
    // stretch:'horizontal',
    textAlign:'center',
    // height:'20px',
    // width:'60px',
    // fontSize:'5px',
    margin:'0px 0px 0px 0px',
    position:'top-right'
  },//button
  checkbox:{
    margin:'0px 0px 0px 0px',
    fontSize:'12px',
    minWidth:'130px',
  }, //checkBox -> ##
  slider_opacity:{ // slider
    margin:'0px 0px 0px 0px',
    stretch:'horizontal',
    fontSize:'8px'
  }, // slider
  slider:{
        stretch:'horizontal',
  },//slider year
  select:{
        stretch:'horizontal',
  },//select limit
  comumPanel:{},//panel
  subtitlePanel:{
        stretch:'both',
  },//panel
  panel:{
    width:'230px'
  },//panel principal
  thumb_logo:{
    stretch:'horizontal',
  },//panel principal
  options_thumb_logo:{
    stretch:'horizontal',
  },//panel principal
};
// --- --- --- --- FUNCTIONS
// essa função é utilizada para setar os parametros definidos pelo programador no obj options.
// O gerenciamento das listas, dicionarios e suas respectivas strings são utilizadas na UI, 
// organizando a ordem e definindo os nomes, diversas dessas variaveis também foram utilizadas
// como mapas dentro da lógica do código.
function list_keys(){
  options.keys = ['keys','models','data','geral','visParams'];
  options.models = ["mapbiomas_fogo","mcd64a1","fire_cci","firms","focos"];
  options.monitoring = ['MCD64A1','FIRMS','FIRE_CCI'];
  options.datas = ["monthly","annual","burned_cover","acumulated","acumulated_cover","frequency","synYearFire"];
  options.vectors = ['Amazônia','Caatinga','Cerrado','Mata Atlântica','Pampa','Pantanal'/*,'Brasil','Countrys'*/],
  options.limits = ['Biomas','Estados','Brasil'],
  options.mosaics = [/*'landsat_4',*/'landsat_5','landsat_7','landsat_8', 'sentinel_2','terra','aqua'];
  options.compositions = ['latest_no_cloud','median','min','max','minNBR1','maxNBR1','minNBR2','maxNBR2','minNDVI','maxNDVI'];
  options.geral = ['image','band','visParams'];
  options.visParams = ['min','max','palette'];
  // modulo para consulta dos nomes das bandas
  var bns = require('users/mapbiomas/mapbiomas-mosaics:modules/BandNames.js');
  options.bands = {
    // landsat bands -> https://www.usgs.gov/faqs/what-are-best-landsat-spectral-bands-use-my-research?qt-news_science_products=0#qt-news_science_model
    landsat_4:{
      oldBands:["B1",  "B2",   "B3", "B4", "B5",   "B7",   "pixel_qa","B6"], // identicas ao do sensor landsat 5
      newBands:["blue","green","red","nir","swir1","swir2","pixel_qa","temp"]
    },
    landsat_5:{
      oldBands:["B1",  "B2",   "B3", "B4", "B5",   "B7",   "pixel_qa","B6"],
      newBands:["blue","green","red","nir","swir1","swir2","pixel_qa","temp"]
    },
    landsat_7: {
      oldBands:["B1",  "B2",   "B3", "B4", "B5",   "B7",   "pixel_qa","B6"],
      newBands:["blue","green","red","nir","swir1","swir2","pixel_qa","temp"]
    },
    landsat_8:{
      oldBands:["B1","B2",   "B3",   "B4", "B5", "B6",   "B7",   "pixel_qa","B6"],
      newBands:["uv","blue", "green","red","nir","swir1","swir2","pixel_qa","temp"]
    },
    sentinel_2:{
      spectralInterval:[''],
      oldBands:['QA60', 'B1', 'B2',   'B3',    'B4',  'B5', 'B6', 'B7', 'B8'  ,'B8A',   'B9',         'B10',  'B11',   'B12',  'B12'],
      newBands:['QA60', 'cb', 'blue', 'green', 'red', 'red1','red2','red3','nir'  ,'nir2', 'waterVapor', 'cirrus','swir1', 'swir2','cloudShadowMask']
    },
    terra:{
      spectralInterval:['620–670',     '841–876',     '459–479',     '545–565',     '1230–1250',   '1628–1652',   '2105–2155'],
      oldBands:        ['sur_refl_b01','sur_refl_b02','sur_refl_b03','sur_refl_b04','sur_refl_b05','sur_refl_b06','sur_refl_b07','QA','SolarZenith','ViewZenith','RelativeAzimuth','StateQA','DayOfYear'],
      newBands:        ['red',         'nir',         'blue',        'green',       'nir2',        'swir1',       'swir2',       'QA','SolarZenith','ViewZenith','RelativeAzimuth','StateQA','DayOfYear',]
    },
    aqua:{
      oldBands:['sur_refl_b01','sur_refl_b02','sur_refl_b03','sur_refl_b04','sur_refl_b05','sur_refl_b06','sur_refl_b07','QA','SolarZenith','ViewZenith','RelativeAzimuth','StateQA','DayOfYear'],
      newBands:['red','nir','blue','green','nir2','swir1','swir2','QA','SolarZenith','ViewZenith','RelativeAzimuth','StateQA','DayOfYear',]
    }
  };
  options.region = ee.FeatureCollection('projects/mapbiomas-workspace/AUXILIAR/biomas_IBGE_250mil')
    .filter(ee.Filter.inList('Bioma',[options.limit]));
  options.mask = ee.Image(0).mask(0).paint(options.region,'CD_Bioma');
}
function setLayout(){
  options.mapp = ui.root.widgets().get(0);
  options.panel = ui.Panel({
    // widgets:,
    // layout;,
    style:styles.panel});
  ui.root.widgets().reset([options.mapp,options.panel]);
  options.subtitle = ui.Panel({
    // widgets:,
    layout:ui.Panel.Layout.Flow('vertical'),
    style:styles.subtitlePanel});
  var logo_image = ee.Image('users/wallacesilva/logo-unb-1_georeferenced')
    .visualize({bands:['b1','b2','b3']});
  var unb_logo_image = ui.Thumbnail({
    image:logo_image,
    params:styles.params,
    // onClick:,
    style:styles.thumb_logo
    }).setParams({
      region:logo_image.geometry()
    });
  var unb_logo = ui.Chart({
                    // dataTable:[['<p style= font-size:10px;font-family: Helvetica, sans-serif><b>Fire Cartograph Toolkit 0.1.0</b></p>']],
                    chartType:'Table',
                    options:{
                        'allowHtml': true,
                        'pagingSymbols': {
                            prev: '<img width="150" src="https://pt.wikipedia.org/wiki/Ficheiro:Webysther_20160322_-_Logo_UnB_(sem_texto).svg">',
                            next: ' '
                        },
                    },
                    downloadable:false
                })
  var ipam_logo = ui.Chart({
                    // dataTable:[['<p style= font-size:10px;font-family: Helvetica, sans-serif><b>Fire Cartograph Toolkit 0.1.0</b></p>']],
                    chartType:'Table',
                    options:{
                        'allowHtml': true,
                        'pagingSymbols': {
                            prev: '<img width="150" src="https://ipam.org.br/wp-content/uploads/2015/09/avatar-noticia.jpg">',
                            next: ' '
                        },
                    },
                    downloadable:false
                })
  var mapbiomas_logo = ui.Chart({
                    // dataTable:[['<p style= font-size:10px;font-family: Helvetica, sans-serif><b>Fire Cartograph Toolkit 0.1.0</b></p>']],
                    chartType:'Table',
                    options:{
                        'allowHtml': true,
                        'pagingSymbols': {
                            prev: '<img width="150" src="https://mapbiomas-br-site.s3.amazonaws.com/mapbiomas-brasil-logo-horizontal-v2.png">',
                            next: ' '
                        },
                    },
                    downloadable:false
                })
  options.home = ui.Panel({
    widgets:ui.Panel({
                widgets: [unb_logo_image,/*unb_logo,ipam_logo,mapbiomas_logo*/],
                'layout': ui.Panel.Layout.flow('vertical'),
                'style': {
                    'stretch': 'horizontal'
                },
            }),
    // layout;,
    style:styles.comumPanel});
  options.selectors = ui.Panel({
    // widgets:,
    // layout;,
    style:styles.comumPanel});
  options.link = ui.Label('last update 2021-10-30, click here to access the code in js',null,'https://code.earthengine.google.com/9a0e14cd63d6b3d4c72720a14c877ba8');
  options.panel.add(options.home);
  options.panel.add(options.selectors);
  options.panel.add(options.subtitle);
options.panel.add(options.link);
  options.clearLayers = ui.Button({
    label:'🧹🗺',
    onClick:function(){
      options.mapp.layers().map(function(layer){
        if (layer.getShown() === false){
          options.mapp.remove(layer)
          options[layer.getName()] = false
        return 
        }
        return layer;
      });
    },
    // layout;,
    style:styles.clearLayers});
  options.mapp.add(options.clearLayers);
}
function plotLayer(object,boolean){
  if(boolean === true){
    options.mapp.addLayer(object);
     options[object['name']] = true;
  } else {
    var layer_remove = options.mapp.layers().filter(function(layer){return layer.getName() === object['name']});
    options.mapp.remove(layer_remove[0]);
    options[object['name']] = false;
    if (layer_remove.length === 2){
    print('removeu tudo')
    options.mapp.remove(layer_remove[1]);
    }
  }
}
function makeColorBarParams(palette) {
  var params = {
    bbox: [0, 0, 1, 0.1],
    dimensions: '100x10',
    format: 'png',
    min: 0,
    max: 1,
    palette: palette,
  };
  return ui.Thumbnail({
    image: ee.Image.pixelLonLat().select(0),
    params: params,
    style: {stretch: 'horizontal', margin: '0px 8px', maxHeight: '5px'},
  });  
}
function subtitle(){
  options.subtitle.clear();
  // burned area models pré-processing
  options.models.map(function(model){
    if (dataset[model]['period']['start'] <= options.year && dataset[model]['period']['end'] >= options.year){
      styles.title['backgroundColor'] = 'ff6961';
      var title = ui.Label('[model]' + model, styles.title);
      var datas = options.datas.map(function(data){
        var check = ui.Checkbox({
          label:data,
          value:options[model + '-' + data + '-' + options.year + '-' + options.limit] || false,
          onChange:function(boolean){
            // print(boolean,model,data);
            // print(dataset[model][data]);
            var update_year = dataset[model][data]['visParams']['bands']
              .slice(0,-4);
            update_year = update_year + options.year;
              print(update_year);
            dataset[model][data]['visParams']['bands'] = update_year
            var object = {
              eeObject:dataset[model][data]['image'].updateMask(options.mask),
              visParams:dataset[model][data]['visParams'],
              name:model + '-' + data + '-' + options.year + '-' + options.limit,
              shown:true,
              opacity:1,
            };
            plotLayer(object,boolean);
          },
          // disabled:,
          style:styles.checkbox
        });
        var slider = ui.Slider({
          min:0,
          max:1,
          value:1,
          step:0.1,
          onChange:function(value){
            var layer = options.mapp.layers().filter(function(item){
              return item.getName() === model + '-' + data + '-' + options.year + '-' + options.limit;
            })[0];
            if(options[model + '-' + data + '-' + options.year + '-' + options.limit] === true){
              layer.setOpacity(value);
            }
          }, 
          // direction,
          disabled:options[model + '-' + data + '-' + options.year + '-' + options.limit] || false,
          style:styles.slider_opacity
          })
        /////////////////////////////////
        var legend = makeColorBarParams(dataset[model][data]['visParams']['palette'])
        var sub_button = ui.Button({
          label:'>',
          // onClick:
          // disabled:,
          style:styles.sub_button_expanse
          });
        var sub_panel = ui.Panel({
          widgets:[/*legend*/],
          layout:ui.Panel.Layout.Flow('vertical'),
          style:styles.comumPanel
          });
        var label = ui.Label(); 
        var interaction_canvas, interaction_region;
        sub_button.onClick(function(){
        if (sub_button.getLabel() === '>'){    
          sub_button.setLabel('v');
          sub_panel.add(legend);
          var line = ee.Image(0).mask(0).paint(options.region,'vazio',0.5)
            .visualize({palette:'black'});
          var square_canvas = ee.Geometry.Rectangle(options.mapp.getBounds())
          var square_canvas_image = ee.Image(0).mask(0).paint(square_canvas,'vazio',0.5)
            .visualize({palette:'black'});
          var square_region = options.region.geometry().bounds().buffer(ee.Number(options.mapp.getScale()).multiply(30));
          var square_region_image = ee.Image(0).mask(0).paint(square_region,'vazio',0.5)
            .visualize({palette:'black'});
        // File: style-test-gradientbar
        // Package sources: https://code.earthengine.google.com/?accept_repo=users/gena/packages
        var style = require('users/gena/packages:style')
        var text = require('users/gena/packages:text')
        var point = function (pt, x, y) {
          var ab = ee.Number(pt.get(0)).subtract(x)
          var cd = ee.Number(pt.get(1)).subtract(y)
          return ee.Geometry.Point(ee.List([x1, y1]))
        }
        var box_canvas_p1 = text.getLocation(square_canvas, 'left', '97.5%', '60%');
        var box_canvas_p2 = text.getLocation(square_canvas, 'left', '98%', '10%');
        var box_canvas = ee.Geometry.LineString([box_canvas_p1,box_canvas_p2]).bounds();
        var box_region_p1 = text.getLocation(square_region, 'right', '97.5%', '60%');
        var box_region_p2 = text.getLocation(square_region, 'right', '98%', '10%');
        var box_region = ee.Geometry.LineString([box_region_p1,box_region_p2]).bounds();
        var textProperties = { fontSize:16, textColor: '000000', outlineColor: 'ffffff', outlineWidth: 2, outlineOpacity: 0.6 }
        // add a scale bar
        var scale_canvas = style.ScaleBar.draw(box_canvas, {
          steps:4, palette: ['5ab4ac', 'f5f5f5'], multiplier: 1000, format: '%.0f', units: 'km', text: textProperties
        })
        // add a scale bar
        var scale_region = style.ScaleBar.draw(box_region, {
          steps:4, palette: ['5ab4ac', 'f5f5f5'], multiplier: 1000, format: '%.1f', units: 'km', text: textProperties
        })
          var canvas_map = dataset[model][data]['image']
            .visualize(dataset[model][data]['visParams'])
            .updateMask(options.mask)
           .blend(line)
            .blend(square_canvas_image)
            .blend(scale_canvas);
          var region_map = dataset[model][data]['image']
            .visualize(dataset[model][data]['visParams'])
            .updateMask(options.mask)
            .blend(line)
            .blend(square_region_image)
            .blend(scale_region);
          var add_layer_canvas = ui.Button('➕🗺', 
          function(){
            Map.addLayer(canvas_map,{},'Canvas Map',true)
          }, null, styles.sub_button_add);
          var add_layer_region = ui.Button('➕🗺', 
          function(){
            Map.addLayer(region_map,{},'Canvas Map',true)
          }, null, styles.sub_button_add);
          var link_canvas = canvas_map          
            .getThumbURL({
              dimensions:850,
              region:square_canvas,
              format:'png'
            });
          link_canvas = ui.Label('🏃🗺🔳',styles.sub_label,link_canvas); 
          var interaction_canvas = ui.Panel({
            widgets:[add_layer_canvas,link_canvas], 
            layout:ui.Panel.Layout.Flow('horizontal'),
            style:styles.comumPanel
          })
          sub_panel.add(interaction_canvas);
          var link_region = region_map          
            .getThumbURL({
              dimensions:850,
              region:square_region,
              format:'png'
            });
          link_region = ui.Label('🏃🗺🌎',styles.sub_label,link_region); 
          var interaction_region = ui.Panel({
            widgets:[add_layer_region,link_region], 
            layout:ui.Panel.Layout.Flow('horizontal'),
            style:styles.comumPanel
          })
          sub_panel.add(interaction_region);
        } else {
          sub_button.setLabel('>');
          options['expanse'][model] = '>';
          sub_panel.clear();
        }
      });
      if (sub_button.getLabel() === 'v'){
        panel.add(datas);
      }
        var sub_head = ui.Panel({
          widgets:[sub_button,check,slider],
          layout:ui.Panel.Layout.Flow('horizontal'),
          style:styles.comumPanel
        });
        return ui.Panel({
          widgets:[sub_head,sub_panel],
          layout:ui.Panel.Layout.Flow('vertical'),
          style:styles.comumPanel
        });
      });
      datas = ui.Panel({
        widgets:datas,
        layout:ui.Panel.Layout.Flow('vertical'),
        style:styles.comumPanel
        });
      var button = ui.Button({
        label:options['expanse'][model] || '>',
        // onClick:
        // disabled:,
        style:styles.button_expanse
        });
      var headPanel = ui.Panel({
        widgets:[button,title],
        layout:ui.Panel.Layout.Flow('horizontal'),
        style:styles.comumPanel
        });
      var panel = []
      button.onClick(function(){
        if (button.getLabel() === '>'){    
          button.setLabel('v');
          options['expanse'][model] = 'v';
          //print(options['expanse'][model])
          panel.add(datas);
        } else {
          button.setLabel('>');
          options['expanse'][model] = '>';
          panel.remove(datas);
        }
      });
      panel = ui.Panel({
        widgets:[headPanel/*,datas*/],
        layout:ui.Panel.Layout.Flow('vertical'),
        style:styles.comumPanel
        });
      if (button.getLabel() === 'v'){
        panel.add(datas);
      }
      options.subtitle.add(panel);
    } else {
      print('não temos dados ' + model + ' para esse ano.');
    }
  });
  // satelitte images
  options.mosaics.map(function(mosaic){
   if (dataset[mosaic]['period']['start'] <= options.year && dataset[mosaic]['period']['end'] >= options.year){
      styles.title['backgroundColor'] = 'c6e5b1';
      var title = ui.Label(mosaic, styles.title);
      var compositions = options.compositions.map(function(composition){
        var start = '' + options.year + '-01-01';
      var end = '' + (options.year + 1) + '-01-01';
      var eeObject = dataset[mosaic]['collection']
        .filterDate(start,end)
        .filterBounds(geometry)
        .map(function(image){return image.updateMask(options.mask)})
        .select(options.bands[mosaic]['oldBands'],options.bands[mosaic]['newBands']);
        //print(mosaic,eeObject.first(),eeObject)
      var processings_step = {
        landsat:function(collection){
          return collection
            .map(function (image) {
               var qa = image.select('pixel_qa');
               // If the cloud bit (5) is set and the cloud confidence (7) is high
               // or the cloud shadow bit is set (3), then it's a bad pixel.
               var cloud = qa.bitwiseAnd(1 << 5)
               .and(qa.bitwiseAnd(1 << 7))
               .or(qa.bitwiseAnd(1 << 3));
               // Remove edge pixels that don't occur in all bands
               var mask2 = image.mask().reduce(ee.Reducer.min());
               return image.updateMask(cloud.not()).updateMask(mask2);
          });
        },
        sentinel:function(collection){
          return collection
            .map(remove_ruido);
        },
        terra:function(collection){
          return collection;
        },
        aqua:function(collection){
          return collection;
        },
      };
      var key = mosaic.split('_'); 
      eeObject = processings_step[key[0]](eeObject)
        .map(function(image){
          var minNBR1 = image.expression({
            expression:'((nir - swir1) / (nir + swir1)) * -1',
            map:{
              swir1:image.select('swir1'),
              nir:image.select('nir'),                    
            }
          }).rename('minNBR1');
          var maxNBR1 = image.expression({
            expression:'((nir - swir1) / (nir + swir1))',
            map:{
              swir1:image.select('swir1'),
              nir:image.select('nir'),                    
            }
          }).rename('maxNBR1');
          var minNBR2 = image.expression({
            expression:'((swir1 - swir2) / (swir1 + swir2)) * -1',
            map:{
              swir2:image.select('swir2'),
              swir1:image.select('swir1'),                    
            }
          }).rename('minNBR2');
          var maxNBR2 = image.expression({
            expression:'((swir1 - swir2) / (swir1 + swir2))',
            map:{
              swir2:image.select('swir2'),
              swir1:image.select('swir1'),                    
            }
          }).rename('maxNBR2');
          var minNDVI = image.expression({
            expression:'((nir - red) / (nir + red)) * -1',
            map:{
              red:image.select('red'),
              nir:image.select('nir'),                    
            }
          }).rename('minNDVI');
          var maxNDVI = image.expression({
            expression:'((nir - red) / (nir + red))',
            map:{
              red:image.select('red'),
              nir:image.select('nir'),                    
            }
          }).rename('maxNDVI');
          return image.addBands([
            minNBR1,maxNBR1,minNBR2,maxNBR2,minNDVI,maxNDVI
          ]);
        });
      var compositionsFunctions = {
        latest_no_cloud:function(collection){
          return collection.mosaic();
        },
        median:function(collection){
          return collection.median();
        },
        min:function(collection){
          return collection.min();
        },
        max:function(collection){
          return collection.max();
        },
        minNBR1:function(collection){
          return collection.qualityMosaic('minNBR1');
        },
        maxNBR1:function(collection){
          return collection.qualityMosaic('maxNBR1');
        },
        minNBR2:function(collection){
          return collection.qualityMosaic('minNBR2');
        },
        maxNBR2:function(collection){
          return collection.qualityMosaic('maxNBR2');
        },
        minNDVI:function(collection){
          return collection.qualityMosaic('minNDVI');
        },
        maxNDVI:function(collection){
          return collection.qualityMosaic('maxNDVI');
        },
      };
        eeObject = compositionsFunctions[composition](eeObject);
        var object = {
          eeObject:eeObject,
          visParams:dataset[mosaic]['visParams'],
          name:mosaic + '-' + composition + '-' + options.year + '-' + options.limit,
          shown:true,
          opacity:1,
        };
        var check = ui.Checkbox({
          label: composition,
          value:options[mosaic +'-'+ composition + '-' + options.year + '-' + options.limit] || false,
          onChange:function(boolean){
            //print(mosaic,object);
            plotLayer(object,boolean);
          },
          // disabled:,
          style:styles.checkbox
        });
        var slider = ui.Slider({
          min:0,
          max:1,
          value:1,
          step:0.1,
          onChange:function(value){
            var layer = options.mapp.layers().filter(function(item){
              return item.getName() === mosaic + '-' + composition + '-' + options.year + '-' + options.limit;
            })[0];
            if(options[mosaic + '-' + composition + '-' + options.year + '-' + options.limit] === true){
              layer.setOpacity(value);
            }
          }, 
          // direction,
          disabled:options[mosaic + '-' + composition + '-' + options.year + '-' + options.limit] || false,
          style:styles.slider_opacity
          })
        /////////////////////////////
        var legend = makeColorBarParams(dataset[mosaic]['visParams'])
        var sub_button = ui.Button({
          label:'>',
          // onClick:
          // disabled:,
          style:styles.sub_button_expanse
          });
        var sub_panel = ui.Panel({
          widgets:[/*legend*/],
          layout:ui.Panel.Layout.Flow('vertical'),
          style:styles.comumPanel
          });
        var label = ui.Label(); 
        var interaction_canvas, interaction_region;
        sub_button.onClick(function(){
        if (sub_button.getLabel() === '>'){    
          sub_button.setLabel('v');
          sub_panel.add(legend);
          var line = ee.Image(0).mask(0).paint(options.region,'vazio',0.5)
            .visualize({palette:'black'});
          var square_canvas = ee.Geometry.Rectangle(options.mapp.getBounds())
          var square_canvas_image = ee.Image(0).mask(0).paint(square_canvas,'vazio',0.5)
            .visualize({palette:'black'});
          var square_region = options.region.geometry().bounds().buffer(ee.Number(options.mapp.getScale()).multiply(30));
          var square_region_image = ee.Image(0).mask(0).paint(square_region,'vazio',0.5)
            .visualize({palette:'black'});
        // File: style-test-gradientbar
        // Package sources: https://code.earthengine.google.com/?accept_repo=users/gena/packages
        var style = require('users/gena/packages:style')
        var text = require('users/gena/packages:text')
        var point = function (pt, x, y) {
          var ab = ee.Number(pt.get(0)).subtract(x)
          var cd = ee.Number(pt.get(1)).subtract(y)
          return ee.Geometry.Point(ee.List([x1, y1]))
        }
        var box_canvas_p1 = text.getLocation(square_canvas, 'left', '97.5%', '60%');
        var box_canvas_p2 = text.getLocation(square_canvas, 'left', '98%', '10%');
        var box_canvas = ee.Geometry.LineString([box_canvas_p1,box_canvas_p2]).bounds();
        var box_region_p1 = text.getLocation(square_region, 'right', '97.5%', '60%');
        var box_region_p2 = text.getLocation(square_region, 'right', '98%', '10%');
        var box_region = ee.Geometry.LineString([box_region_p1,box_region_p2]).bounds();
        var textProperties = { fontSize:16, textColor: '000000', outlineColor: 'ffffff', outlineWidth: 2, outlineOpacity: 0.6 }
        // add a scale bar
        var scale_canvas = style.ScaleBar.draw(box_canvas, {
          steps:4, palette: ['5ab4ac', 'f5f5f5'], multiplier: 1000, format: '%.0f', units: 'km', text: textProperties
        })
        // add a scale bar
        var scale_region = style.ScaleBar.draw(box_region, {
          steps:4, palette: ['5ab4ac', 'f5f5f5'], multiplier: 1000, format: '%.1f', units: 'km', text: textProperties
        })
          var canvas_map = eeObject
            .visualize(dataset[mosaic]['visParams'])
            .updateMask(options.mask)
           .blend(line)
            .blend(square_canvas_image)
            .blend(scale_canvas);
          var region_map = eeObject
            .visualize(dataset[mosaic]['visParams'])
            .updateMask(options.mask)
            .blend(line)
            .blend(square_region_image)
            .blend(scale_region);
          var add_layer_canvas = ui.Button('➕🗺', 
          function(){
            Map.addLayer(canvas_map,{},'Canvas Map',true)
          }, null, styles.sub_button_add);
          var add_layer_region = ui.Button('➕🗺', 
          function(){
            Map.addLayer(region_map,{},'Canvas Map',true)
          }, null, styles.sub_button_add);
          var link_canvas = canvas_map          
            .getThumbURL({
              dimensions:850,
              region:square_canvas,
              format:'png'
            });
          link_canvas = ui.Label('🏃🗺🔳',styles.sub_label,link_canvas); 
          var interaction_canvas = ui.Panel({
            widgets:[add_layer_canvas,link_canvas], 
            layout:ui.Panel.Layout.Flow('horizontal'),
            style:styles.comumPanel
          })
          sub_panel.add(interaction_canvas);
          var link_region = region_map          
            .getThumbURL({
              dimensions:850,
              region:square_region,
              format:'png'
            });
          link_region = ui.Label('🏃🗺🌎',styles.sub_label,link_region); 
          var interaction_region = ui.Panel({
            widgets:[add_layer_region,link_region], 
            layout:ui.Panel.Layout.Flow('horizontal'),
            style:styles.comumPanel
          })
          sub_panel.add(interaction_region);
        } else {
          sub_button.setLabel('>');
          options['expanse'][mosaic] = '>';
          sub_panel.clear();
        }
      });
      if (sub_button.getLabel() === 'v'){
        panel.add(datas);
      }
        var sub_head = ui.Panel({
          widgets:[sub_button,check,slider],
          layout:ui.Panel.Layout.Flow('horizontal'),
          style:styles.comumPanel
        });
        return ui.Panel({
          widgets:[sub_head,sub_panel],
          layout:ui.Panel.Layout.Flow('vertical'),
          style:styles.comumPanel
        });
      });
        compositions = ui.Panel({
        widgets:compositions,
        layout:ui.Panel.Layout.Flow('vertical'),
        style:styles.comumPanel
        });
      var button = ui.Button({
        label:options['expanse'][mosaic] || '>',
        // onClick:
        // disabled:,
        style:styles.button_expanse
        });
      var headPanel = ui.Panel({
        widgets:[button,title],
        layout:ui.Panel.Layout.Flow('horizontal'),
        style:styles.comumPanel
        });
      var panel = []
      button.onClick(function(){
        if (button.getLabel() === '>'){    
          button.setLabel('v');
          options['expanse'][mosaic] = 'v';
          // print(options['expanse'][mosaic])
          panel.add(compositions);
        } else {
          button.setLabel('>');
          options['expanse'][mosaic] = '>';
          panel.remove(compositions);
        }
      });
      panel = ui.Panel({
        widgets:[headPanel/*,datas*/],
        layout:ui.Panel.Layout.Flow('vertical'),
        style:styles.comumPanel
      });
      if (button.getLabel() === 'v'){
        panel.add(compositions);
      }
      options.subtitle.add(panel);
    } else {
      print('saiu');
    }
  });
  // burned area original models 
  options.monitoring.map(function(mosaic){
   if (dataset[mosaic]['period']['start'] <= options.year && dataset[mosaic]['period']['end'] >= options.year){
      styles.title['backgroundColor'] = 'bbf3f9';
      var title = ui.Label(mosaic, styles.title);
      var start = '' + options.year + '-01-01';
      var end = '' + (options.year + 1) + '-01-01';
      var eeObject = dataset[mosaic]['collection'].aside(print)
        .filterDate(start,end).aside(print)
        .filterBounds(geometry)
        .map(function(image){return image.updateMask(options.mask)}).aside(print)
        .mosaic()
        var object = {
          eeObject:eeObject,
          visParams:dataset[mosaic]['visParams'],
          name:mosaic + '-' + options.year + '-' + options.limit,
          shown:true,
          opacity:1,
        };
        print(mosaic,object)
        var check = ui.Checkbox({
          label: mosaic,
          value:options[mosaic + '-' + options.year + '-' + options.limit] || false,
          onChange:function(boolean){
            //print(mosaic,object);
            plotLayer(object,boolean);
          },
          // disabled:,
          style:styles.checkbox
        });
        var slider = ui.Slider({
          min:0,
          max:1,
          value:1,
          step:0.1,
          onChange:function(value){
            var layer = options.mapp.layers().filter(function(item){
              return item.getName() === mosaic + '-' + options.year + '-' + options.limit;
            })[0];
            if(options[mosaic + '-' + options.year + '-' + options.limit] === true){
              layer.setOpacity(value);
            }
          }, 
          // direction,
          disabled:options[mosaic + '-' + options.year + '-' + options.limit] || false,
          style:styles.slider_opacity
          })
        /////////////////////////////
        var legend = makeColorBarParams(dataset[mosaic]['visParams']['palette'])
        var sub_button = ui.Button({
          label:'>',
          // onClick:
          // disabled:,
          style:styles.sub_button_expanse
          });
        var sub_panel = ui.Panel({
          widgets:[/*legend*/],
          layout:ui.Panel.Layout.Flow('vertical'),
          style:styles.comumPanel
          });
        var label = ui.Label(); 
        var interaction_canvas, interaction_region;
        sub_button.onClick(function(){
        if (sub_button.getLabel() === '>'){    
          sub_button.setLabel('v');
          sub_panel.add(legend);
          var line = ee.Image(0).mask(0).paint(options.region,'vazio',0.5)
            .visualize({palette:'black'});
          var square_canvas = ee.Geometry.Rectangle(options.mapp.getBounds())
          var square_canvas_image = ee.Image(0).mask(0).paint(square_canvas,'vazio',0.5)
            .visualize({palette:'black'});
          var square_region = options.region.geometry().bounds().buffer(ee.Number(options.mapp.getScale()).multiply(30));
          var square_region_image = ee.Image(0).mask(0).paint(square_region,'vazio',0.5)
            .visualize({palette:'black'});
        // File: style-test-gradientbar
        // Package sources: https://code.earthengine.google.com/?accept_repo=users/gena/packages
        var style = require('users/gena/packages:style')
        var text = require('users/gena/packages:text');
        var point = function (pt, x, y) {
          var ab = ee.Number(pt.get(0)).subtract(x);
          var cd = ee.Number(pt.get(1)).subtract(y);
          return ee.Geometry.Point(ee.List([x1, y1]));
        };
        var box_canvas_p1 = text.getLocation(square_canvas, 'left', '97.5%', '60%');
        var box_canvas_p2 = text.getLocation(square_canvas, 'left', '98%', '10%');
        var box_canvas = ee.Geometry.LineString([box_canvas_p1,box_canvas_p2]).bounds();
        var box_region_p1 = text.getLocation(square_region, 'right', '97.5%', '60%');
        var box_region_p2 = text.getLocation(square_region, 'right', '98%', '10%');
        var box_region = ee.Geometry.LineString([box_region_p1,box_region_p2]).bounds();
        var textProperties = { fontSize:16, textColor: '000000', outlineColor: 'ffffff', outlineWidth: 2, outlineOpacity: 0.6 };
        // add a scale bar
        var scale_canvas = style.ScaleBar.draw(box_canvas, {
          steps:4, palette: ['5ab4ac', 'f5f5f5'], multiplier: 1000, format: '%.0f', units: 'km', text: textProperties
        });
        // add a scale bar
        var scale_region = style.ScaleBar.draw(box_region, {
          steps:4, palette: ['5ab4ac', 'f5f5f5'], multiplier: 1000, format: '%.1f', units: 'km', text: textProperties
        });
          var canvas_map = eeObject
            .visualize(dataset[mosaic]['visParams'])
            .updateMask(options.mask)
            .blend(line)
            .blend(square_canvas_image)
            .blend(scale_canvas);
          var region_map = eeObject
            .visualize(dataset[mosaic]['visParams'])
            .updateMask(options.mask)
            .blend(line)
            .blend(square_region_image)
            .blend(scale_region);
          var add_layer_canvas = ui.Button('➕🗺', 
          function(){
            Map.addLayer(canvas_map,{},'Canvas Map',true)
          }, null, styles.sub_button_add);
          var add_layer_region = ui.Button('➕🗺', 
          function(){
            Map.addLayer(region_map,{},'Canvas Map',true)
          }, null, styles.sub_button_add);
          var link_canvas = canvas_map          
            .getThumbURL({
              dimensions:850,
              region:square_canvas,
              format:'png'
            });
          link_canvas = ui.Label('🏃🗺🔳',styles.sub_label,link_canvas); 
          var interaction_canvas = ui.Panel({
            widgets:[add_layer_canvas,link_canvas], 
            layout:ui.Panel.Layout.Flow('horizontal'),
            style:styles.comumPanel
          })
          sub_panel.add(interaction_canvas);
          var link_region = region_map          
            .getThumbURL({
              dimensions:850,
              region:square_region,
              format:'png'
            });
          link_region = ui.Label('🏃🗺🌎',styles.sub_label,link_region); 
          var interaction_region = ui.Panel({
            widgets:[add_layer_region,link_region], 
            layout:ui.Panel.Layout.Flow('horizontal'),
            style:styles.comumPanel
          })
          sub_panel.add(interaction_region);
        } else {
          sub_button.setLabel('>');
          options['expanse'][mosaic] = '>';
          sub_panel.remove(legend);
          sub_panel.remove(interaction_region);
        }
      });
      if (sub_button.getLabel() === 'v'){
        panel.add(datas);
      }
        ////////////////////////////
      var sub_head = ui.Panel({
        widgets:[sub_button,check,slider],
        layout:ui.Panel.Layout.Flow('horizontal'),
        style:styles.comumPanel
      });
      var composition = ui.Panel({
        widgets:[sub_head,sub_panel],
        layout:ui.Panel.Layout.Flow('vertical'),
        style:styles.comumPanel
      });
      var button = ui.Button({
        label:options['expanse'][mosaic] || '>',
        // onClick:
        // disabled:,
        style:styles.button_expanse
        });
      var headPanel = ui.Panel({
        widgets:[button,title],
        layout:ui.Panel.Layout.Flow('horizontal'),
        style:styles.comumPanel
        });
      var panel = []
      button.onClick(function(){
        if (button.getLabel() === '>'){    
          button.setLabel('v');
          options['expanse'][mosaic] = 'v';
          // print(options['expanse'][mosaic])
          panel.add(composition);
        } else {
          button.setLabel('>');
          options['expanse'][mosaic] = '>';
          panel.remove(composition);
        }
      });
      panel = ui.Panel({
        widgets:[headPanel/*,datas*/],
        layout:ui.Panel.Layout.Flow('vertical'),
        style:styles.comumPanel
      });
      options.subtitle.add(panel);
    } else {
      print('saiu');
    }
  });
}
function selectors (){
  var slider = ui.Slider({
    min:1984, 
    max:2021,
    value:options.year,
    step:1,
    onChange:function(value){
      print(value);
      options.year = value;
      subtitle();
      // options.mapp.layers().forEach(function(layer){
      //   if (layer.getName().split('_')[0] === 'landsat' || layer.getName().split('_')[0] === 'sentinel'){
      //     return ;
      //   }
      //   var old_visParams = layer.getVisParams();
      //   old_visParams['bands'] = old_visParams['bands'].slice(0,-4) + options.year
      //   print(layer,old_visParams)
      //   layer.setVisParams(old_visParams)
      //   print(layer,old_visParams)
      // })
      options.models
    },
    // direction, 
    // disabled,
    style:styles.slider
    });
  var select = ui.Select({
    items:options.vectors,
    // placeholder:,
    value:options.limit,
    onChange:function(value){
      options.limit = value;
      var area = ee.FeatureCollection('projects/mapbiomas-workspace/AUXILIAR/biomas_IBGE_250mil')
        .filter(ee.Filter.inList('Bioma',[value]));
      options.mask = ee.Image(0).mask(0).paint(area,'CD_Bioma');
      options.region = area;
      subtitle();
      // print(value);
    }, 
    // disabled,
    style:styles.select
    });
  options.selectors
    .add(slider)
    .add(select);
}
// --- SENTINEL CLOUD AND SHADOW MASK
function rescale (img, thresholds) {
    return img.subtract(thresholds[0]).divide(thresholds[1] - thresholds[0]);
}
////////////////////////////////////////
// Cloud masking algorithm for Sentinel2
//Built on ideas from Landsat cloudScore algorithm
//Currently in beta and may need tweaking for individual study areas
function sentinelCloudScore(img) {
    // Compute several indicators of cloudyness and take the minimum of them.
    var score = ee.Image(1);
    // Clouds are reasonably bright in the blue and cirrus bands.
    var imgT = img.select(['blue'])
    // print("image1", imgT)
    // Map.addLayer(imgT, {min:0, max:1}, "image1")
    score = score.min(rescale(imgT, [0.1, 0.5]));
    imgT = img.select(['cb'])
    // print("image2", imgT)
    // Map.addLayer(imgT, {min:0, max:1}, "image2")
    score = score.min(rescale(imgT, [0.1, 0.3]));
    imgT = img.select(['cb']).add(img.select(['cirrus']))
    // print("image3", imgT)
    // Map.addLayer(imgT, {min:0, max:1}, "image3")
    score = score.min(rescale(imgT, [0.15, 0.2]));
    // Clouds are reasonably bright in all visible bands.
    imgT = img.select(['red']).add(img.select(['green'])).add(img.select(['blue']))
    // print("image4", imgT)
    // Map.addLayer(imgT, {min:0, max:1}, "image4")
    score = score.min(rescale(imgT, [0.2, 0.8]));
    //Clouds are moist
    var ndmi = img.normalizedDifference(['nir','swir1']);
    score = score.min(rescale(ndmi, [-0.1, 0.1]));
    // However, clouds are not snow.
    var ndsi = img.normalizedDifference(['green', 'swir1']);
//    score = score.min(rescale(ndsi, [0.8, 0.6]));
    //score = score.rename('cloudScore'); //.multiply(100).byte().
    //Map.addLayer(score, {min:0, max:1}, "image5")
    var cloudThresh = -0.15;
    var masCloud = score.gt(cloudThresh);
//    var masCloud2 = img.select('blue').gt(0.13)
//    masCloud = masCloud.blend(masCloud2)
    return masCloud
}
/////////////////////////////////////////////
/***
 * Implementation of Basic cloud shadow shift
 * 
 * Author: Gennadii Donchyts
 * License: Apache 2.0
 */
function projectShadows(cloudMask,image, meanAzimuth, meanZenith){
  var dilatePixels = 3; //(2)Pixels to dilate around clouds
  var contractPixels = 1;//(1)Pixels to reduce cloud mask and dark shadows by to reduce inclusion of single-pixel comission errors
  //Find dark pixels
  var darkPixels = image.normalizedDifference(['green', 'swir2']).gt(0.13)
//  var darkPixels = image.select('nir2').lt(0.1)
//  darkPixels = darkPixels.unmask(darkPixels2)
    //Get scale of image
  var nominalScale = cloudMask.projection().nominalScale();
  //Find where cloud shadows should be based on solar geometry
  //Convert to radians
  var azR = ee.Number(meanAzimuth).multiply(Math.PI).divide(180.0).add(
                        ee.Number(0.5).multiply(Math.PI));
  var zenR  = ee.Number(0.5).multiply(Math.PI).subtract(ee.Number(meanZenith).multiply(Math.PI).divide(180.0));
  // print("azR", azR)
  // print("zenR", zenR)
  var cloudHeights = ee.List.sequence(200, 5000, 100);
  //Find the shadows
  var shadows = cloudHeights.map(function(cloudHeight){
      cloudHeight = ee.Number(cloudHeight);
      var shadowCastedDistance = zenR.tan().multiply(cloudHeight);//Distance shadow is cast
      //print("shadowCastedDistance", shadowCastedDistance)
      var x = azR.sin().multiply(shadowCastedDistance).divide(nominalScale);//Y distance of shadow
      var y = azR.cos().multiply(shadowCastedDistance).divide(nominalScale);//X distance of shadow
      //print(x,y)
      return cloudMask.changeProj(
          cloudMask.projection(), 
          cloudMask.projection().translate((x.multiply(-1)), (y.multiply(-1)))
        );
  });
  var shadowMask = ee.ImageCollection.fromImages(shadows).max();
  //Map.addLayer(shadowMask, {min: 0, max: 1}, "image7")
  //Map.addLayer(shadowMask.updateMask(shadowMask),{'min':0,'max':1,'palette':'880'},'Shadow mask');
  //Create shadow mask
  shadowMask = shadowMask.and(cloudMask.not());
  shadowMask = shadowMask.and(darkPixels).focal_min(contractPixels).focal_max(dilatePixels);
  var cloudShadowMask = shadowMask.or(cloudMask);
  image = image.updateMask(cloudShadowMask.not()).addBands(shadowMask.rename(['cloudShadowMask']));
  // image = image.updateMask(image.focal_min(2).select('nir2').gt(0.035))
  // image = image.updateMask(image.focal_max(2).select('blue').lt(0.17))
  return image;
}
//////////////////////////////////////////////////////
//Function for wrapping the entire process to be applied across collection
function wrapIt(img){
  var meanAzimuth = img.get('MEAN_SOLAR_AZIMUTH_ANGLE') ;
  var meanZenith = img.get('MEAN_SOLAR_ZENITH_ANGLE');
  img = img.select(banda1,banda2)/*.divide(10000)*/
  var cloudMask = sentinelCloudScore(img);
  cloudMask = cloudMask.focal_min(2).focal_max(3);
  //Map.addLayer(cloudMask , {'min':0,'max':1,'palette':'f0ebe7'},'Cloud mask');
  ///////////////////////////////////////////////////////
  // print('a',meanAzimuth);
  // print('z',meanZenith)
  img = projectShadows(cloudMask, img, meanAzimuth, meanZenith);
  return img;
}
function remove_ruido(image){
  image = image.divide(10000)
  image = image.updateMask(image.focal_min(2).select('nir2').gt(0.01))
  image = image.updateMask(image.focal_max(2).select('blue').lt(0.3))
  return image.multiply(10000)
}
function start (){
  print('options',options);
  list_keys();
  setLayout();
  subtitle();
  selectors();
  print('options',options);
}
function app (){
  start();
}
app();