var App = function() {
  var _this = this;
  this.config = {
    years: {
      all: [
        2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010,
        2011, 2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020, 2021
      ],
      current: 2000
    },
    countries: {
      names: ['VENEZUELA'],
      current: 'VENEZUELA'
    },
    assets: {
      mosaics: "projects/mapbiomas-raisg/MOSAICOS/mosaics-pathrow-2",
      grid: 'projects/mapbiomas-raisg/DATOS_AUXILIARES/VECTORES/VENEZUELA/path-row-landast-grid',
      countries: 'projects/mapbiomas-raisg/DATOS_AUXILIARES/VECTORES/biomas-paises-2'
    },
    vis: {
      //'RGB 654', 'NDVI', 'NDFI', 'NDWI'
      'NATURAL COLOR': {
        bands: [ 'red_median', 'green_median', 'blue_median' ],
        min: 70,
        max: 2700
      },      
      'RGB 654': {
        bands: [ 'swir1_median', 'nir_median', 'red_median' ],
        min: 100,
        max: 5000
      },
      'RGB 562': {
        'bands': ['nir_median', 'swir1_median', 'blue_median'],
        "min": 100,
        "max": 4500,
      },
      'NDVI': {
        bands: 'ndvi_median',
        palette: '0e15ff,ed0404,ffe214,40f12b,227a49',
        min: 400,
        max: 20000
      },
      'NDFI': {
        bands: 'ndfi_median',
        palette: '0e15ff,ed0404,ffe214,40f12b,227a49',
        min: 0,
        max: 200
      },
      'NDMI': {
        bands: 'ndmi_median',
        palette: '0e15ff,ed0404,ffe214,40f12b,227a49',
        min: 1000,
        max: 16500
      }
    },
    centers: {
      'VENEZUELA': [-67.311, 8.631, 7],
      'CURRENT':   [-67.311, 8.631, 7],
    }
  };
  this.functions = {
    selectors: {
      countries: function(selected) {
        var path = _this.config.assets.mosaics;
        var year = _this.ui.selectors.years.input.getValue();
        var combination = _this.ui.selectors.combinations.input.getValue();
        var image = _this.functions.getmosaic(path, selected, year, combination);
        // update map layers
        var map = _this.ui.panels.right;
        var center = _this.config.centers[selected];
        map.setCenter(center[0], center[1], center[2])
        map.clear();
        map.setOptions('SATELLITE');
        map.addLayer(image, _this.config.vis[combination], combination + ' ' + year);
        _this.functions.addGrid(map, image.geometry())
      },
      years: function(selected) {
        var path = _this.config.assets.mosaics;
        var country = _this.ui.selectors.countries.input.getValue();
        var combination = _this.ui.selectors.combinations.input.getValue();
        var image = _this.functions.getmosaic(path, country, selected, combination);
        // update map layers
        var map = _this.ui.panels.right;
        map.clear();
        map.setOptions('SATELLITE');
        map.addLayer(image, _this.config.vis[combination], combination + ' ' + selected);
        _this.functions.addgrid(map, image.geometry());
      },
      combinations: function(selected) {
        var path = _this.config.assets.mosaics;
        var country = _this.ui.selectors.countries.input.getValue() || _this.config.countries.current;
        var year = _this.ui.selectors.years.input.getValue() || _this.config.years.current;
        var image = _this.functions.getmosaic(path, country, year, selected);
        // update map layers
        var map = _this.ui.panels.right;
        map.clear();
        map.setOptions('SATELLITE');
        map.addLayer(image, _this.config.vis[selected], selected + ' ' + year);
        _this.functions.addgrid(map, image.geometry());
      },
    },
    getmosaic: function(path, country, year, bandnames) {
      return ee.ImageCollection(path)
        .filter(
          ee.Filter.and(
            ee.Filter.eq('country', country),
            ee.Filter.eq('year', parseInt(year, 10))
          )
        );
    },
    addgrid: function(map, bounds) {
      var annotations = [
        {
          position: 'left',
          offset: '1%',
          margin: '1%',
          property: 'label',
          scale: Map.getScale() * 2
        }
      ];
      var grids = _this.config.assets.grid;
      var cards = ee.FeatureCollection(grids).filterBounds(bounds);
      map.addLayer(
        cards.style({ color: 'fff', fillColor: 'ffffff00', width: 1.5}),
        {},
        'ESCENAS'
      );
    }
  };
  this.ui = {
    title: ui.Label({
      value: 'LANDSAT VIEWER', 
      style: { width: '80%', margin: '12px 24px 0 24px', height: '60px', backgroundColor: '#f2f2f2', fontSize: '28px' }
    }),
    subtitle: ui.Label({
      value: 'Visualizador de mosaicos generados a partir de  escenas Landsat', 
      style: { width: '80%', margin: '0 24px 0 24px', backgroundColor: '#f2f2f2', fontSize: '14px', color: '#9E9E9E' }
    }),
    author: {
      name: ui.Label({
        value: 'Desarrollado por: ',
        style: { fontWeight: 'bold', color: 'grey', margin: '0 4px', backgroundColor: '#f2f2f2'}
      }),
      url: ui.Label({
        value: 'Emanuel Valero', 
        targetUrl: 'mailto:ejvalero10@gmail.com',
        style: { margin: '0', backgroundColor: '#f2f2f2'},
      })
    },
    selectors: {
      countries: {
        label: ui.Label({
          value: 'PAÍS',
          style: { width: '80%', margin: '0 24px', backgroundColor: '#f2f2f2' }
        }),
        input: ui.Select({
          items: _this.config.countries.names,
          placeholder: 'SELECT COUNTRY',
          value: _this.config.countries.current,
          onChange: _this.functions.selectors.countries,
          style: { width: '80%', margin: '0 24px'}
        })
      },
      years: {
        label: ui.Label({
          value: 'AÑO',
          style: { width: '80%', margin: '12px 24px 0 24px', backgroundColor: '#f2f2f2' }
        }),
        input: ui.Select({
          items: _this.config.years.all.map(function(item) { return item.toString() }),
          placeholder: '2000',
          onChange: _this.functions.selectors.years,
          style: { width: '80%', margin: '0 24px' }
        })
      },
      combinations: {
        label: ui.Label({
          value: 'BANDA',
          style: { width: '80%', margin: '12px 24px 0 24px', backgroundColor: '#f2f2f2' }
        }),
        input: ui.Select({
          items: ['NATURAL COLOR', 'RGB 654', 'RGB 562', 'NDVI', 'NDFI', 'NDMI'],
          value: 'RGB 562',
          onChange: _this.functions.selectors.combinations,
          style: { width: '80%', margin: '0 24px' }
        })
      }
    },
    panels: {
      author: ui.Panel({
        layout: ui.Panel.Layout.flow('horizontal'),
        style: { width: '80%', margin: '12px 24px 40px 20px', backgroundColor: '#f2f2f2', fontSize: '14px', color: '#9E9E9E' }
      }),
      left: ui.Panel({
        layout: ui.Panel.Layout.flow('vertical'),
        style: { width: '340px', backgroundColor: '#f2f2f2' },
      }),
      right: ui.Map()
    }
  };
  var init = function(config) {
    var path = config.assets.mosaics;
    var country = config.countries.current;
    var year = config.years.current;
    var combination = 'RGB 562';
    var image = _this.functions.getmosaic(path, country, year, combination);
    // user interface
    _this.ui.panels.left.add(_this.ui.title);
    _this.ui.panels.left.add(_this.ui.subtitle);
    _this.ui.panels.author.add(_this.ui.author.name);
    _this.ui.panels.author.add(_this.ui.author.url);
    _this.ui.panels.left.add(_this.ui.panels.author);
    var selectors = [
      _this.ui.selectors.countries,
      _this.ui.selectors.years,
      _this.ui.selectors.combinations
    ]
    selectors.forEach(function(element) {
      _this.ui.panels.left.add(element.label);
      _this.ui.panels.left.add(element.input);
    });
    var map = _this.ui.panels.right;
    var center = config.centers.CURRENT;
    map.setCenter(center[0], center[1], center[2]);    
    map.clear();
    map.setOptions('SATELLITE');
    map.addLayer(image, config.vis[combination], combination + ' ' + year, true);
    _this.functions.addgrid(map, image.geometry());
    ui.root.clear();
    ui.root.add(_this.ui.panels.left);
    ui.root.add(_this.ui.panels.right);
  };
  return init(this.config);
};
new App();