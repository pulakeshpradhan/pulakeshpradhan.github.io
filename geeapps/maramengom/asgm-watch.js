var Kedougou = ui.import && ui.import("Kedougou", "table", {
      "id": "users/maramengom/kedougou"
    }) || ee.FeatureCollection("users/maramengom/kedougou"),
    imageVisParam = ui.import && ui.import("imageVisParam", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "B4",
          "B3",
          "B2"
        ],
        "min": 635,
        "max": 1405,
        "gamma": 1
      }
    }) || {"opacity":1,"bands":["B4","B3","B2"],"min":635,"max":1405,"gamma":1},
    imageVisParam2 = ui.import && ui.import("imageVisParam2", "imageVisParam", {
      "params": {
        "opacity": 1,
        "bands": [
          "B4",
          "B3",
          "B2"
        ],
        "min": 347,
        "max": 2526,
        "gamma": 1
      }
    }) || {"opacity":1,"bands":["B4","B3","B2"],"min":347,"max":2526,"gamma":1},
    aoi = ui.import && ui.import("aoi", "table", {
      "id": "projects/ee-tensorflow-servir/assets/couloir-bantako"
    }) || ee.FeatureCollection("projects/ee-tensorflow-servir/assets/couloir-bantako"),
    Bantako = ui.import && ui.import("Bantako", "table", {
      "id": "users/maramengom/couloir-bantako"
    }) || ee.FeatureCollection("users/maramengom/couloir-bantako"),
    Kharakhena = ui.import && ui.import("Kharakhena", "table", {
      "id": "users/maramengom/couloirs_kharakhena"
    }) || ee.FeatureCollection("users/maramengom/couloirs_kharakhena"),
    Tinkhoto = ui.import && ui.import("Tinkhoto", "table", {
      "id": "users/maramengom/couloir-tinkoto"
    }) || ee.FeatureCollection("users/maramengom/couloir-tinkoto"),
    Garaboureya1 = ui.import && ui.import("Garaboureya1", "table", {
      "id": "users/maramengom/couloir-garaboureya"
    }) || ee.FeatureCollection("users/maramengom/couloir-garaboureya"),
    Garaboureya2 = ui.import && ui.import("Garaboureya2", "table", {
      "id": "users/maramengom/couloir-gareboureya_sud"
    }) || ee.FeatureCollection("users/maramengom/couloir-gareboureya_sud"),
    Diabougou = ui.import && ui.import("Diabougou", "table", {
      "id": "users/maramengom/couloir_diabougou"
    }) || ee.FeatureCollection("users/maramengom/couloir_diabougou"),
    Bondala = ui.import && ui.import("Bondala", "table", {
      "id": "users/maramengom/couloir-bondala"
    }) || ee.FeatureCollection("users/maramengom/couloir-bondala"),
    Daorola = ui.import && ui.import("Daorola", "table", {
      "id": "users/maramengom/couloir-doarola"
    }) || ee.FeatureCollection("users/maramengom/couloir-doarola"),
    Soreto = ui.import && ui.import("Soreto", "table", {
      "id": "users/maramengom/couloir_soreto"
    }) || ee.FeatureCollection("users/maramengom/couloir_soreto"),
    Wassadou = ui.import && ui.import("Wassadou", "table", {
      "id": "users/maramengom/couloir-wassadou"
    }) || ee.FeatureCollection("users/maramengom/couloir-wassadou"),
    Satadougou = ui.import && ui.import("Satadougou", "table", {
      "id": "users/maramengom/couloir-satadougou"
    }) || ee.FeatureCollection("users/maramengom/couloir-satadougou"),
    Kabetea = ui.import && ui.import("Kabetea", "table", {
      "id": "users/maramengom/couloir-kabetea"
    }) || ee.FeatureCollection("users/maramengom/couloir-kabetea"),
    Baqata = ui.import && ui.import("Baqata", "table", {
      "id": "users/maramengom/couloir-baqata"
    }) || ee.FeatureCollection("users/maramengom/couloir-baqata"),
    Diakhaling = ui.import && ui.import("Diakhaling", "table", {
      "id": "users/maramengom/couloir-diakhaling"
    }) || ee.FeatureCollection("users/maramengom/couloir-diakhaling"),
    Balankonko = ui.import && ui.import("Balankonko", "table", {
      "id": "users/maramengom/couloir-balankonko"
    }) || ee.FeatureCollection("users/maramengom/couloir-balankonko"),
    Lingokhoto = ui.import && ui.import("Lingokhoto", "table", {
      "id": "users/maramengom/couloir-lingokhoto"
    }) || ee.FeatureCollection("users/maramengom/couloir-lingokhoto"),
    Makana = ui.import && ui.import("Makana", "table", {
      "id": "users/maramengom/cuolir-makana"
    }) || ee.FeatureCollection("users/maramengom/cuolir-makana"),
    Soukounkou = ui.import && ui.import("Soukounkou", "table", {
      "id": "users/maramengom/Couloir_soukounkou"
    }) || ee.FeatureCollection("users/maramengom/Couloir_soukounkou"),
    Sassamba = ui.import && ui.import("Sassamba", "table", {
      "id": "users/maramengom/couloir_sassamba"
    }) || ee.FeatureCollection("users/maramengom/couloir_sassamba");
Map.addLayer(Kedougou)
Map.centerObject(Kedougou)
var S2= ee.ImageCollection('COPERNICUS/S2') 
          .filterDate('2015-12-01','2015-12-31')
          .filterMetadata('CLOUDY_PIXEL_PERCENTAGE','less_than',5)
          .filterBounds(Kedougou)
          .select('B2','B3','B4','B8','B11','B12')
//print(S2)  
var start = ee.ImageCollection('COPERNICUS/S2') 
          .filterDate('2015-12-18','2015-12-20')
          .filterMetadata('CLOUDY_PIXEL_PERCENTAGE','less_than',5)
          .filterBounds(Kedougou)
          .select('B2','B3','B4')
          .max()
//Map.addLayer(start)
var now=ee.Date(Date.now()) 
var Now = now.advance(-10,'day') 
var S2now= ee.ImageCollection('COPERNICUS/S2_SR') 
          .filterDate(Now, now)
          .filterMetadata('CLOUDY_PIXEL_PERCENTAGE','less_than',5)
          .filterBounds(Kedougou)
          .select('B2','B3','B4') 
//print(S2now)
//Map.addLayer(S2now)
var aoi= Bantako.merge(Kharakhena).merge(Tinkhoto).merge(Garaboureya1)
                .merge(Garaboureya2).merge(Diabougou).merge(Bondala)
                .merge(Daorola).merge(Makana).merge(Sassamba)
                .merge(Soreto).merge(Soukounkou).merge(Balankonko)
                .merge(Baqata).merge(Diakhaling).merge(Garaboureya2)
                .merge(Kabetea).merge(Lingokhoto).merge(Satadougou).merge(Wassadou)
var empty = ee.Image().byte();
var couloirs = empty.paint({
  featureCollection: aoi,
  color: 1,
  width: 3
});
var leftMap = ui.Map();// Créer la carte qui sera à gauche.
leftMap.setCenter(-12.440,12.837,15)// Centrer sur la mine de Toro-Gold
leftMap.setControlVisibility(false);
leftMap.setControlVisibility({zoomControl: true})
leftMap.layers().set(0, ui.Map.Layer(start, {bands:['B4','B3','B2'],min:635, max:1405},' Image: 2015')); 
leftMap.layers().set(1, ui.Map.Layer(couloirs, {palette: 'FF0000'},'Couloirs Orpaillage')); 
leftMap.add(ui.Label("Décembre 2015", {position: "bottom-left", 
                                              fontSize: "30px", 
                                              color: "black", 
                                              backgroundColor: "white",
                                              fontFamily: "Sans-serif"
}))
var rightMap = ui.Map();// Créer la carte qui sera à droite .
rightMap.setControlVisibility(false);
rightMap.layers().set(0, ui.Map.Layer(S2now, {bands:['B4','B3','B2'],min:1143.62, max:3477.38}));
rightMap.layers().set(1, ui.Map.Layer(couloirs, {palette: 'FF0000'},'Couloirs Orpaillage'));
rightMap.add(ui.Label("Actuellement", {position: "bottom-right", 
                                              fontSize: "30px", 
                                              color: "black", 
                                              backgroundColor: "white",
                                              fontFamily: "Sans-serif"
}))
// Combiner les deux cartes
var splitPanel = ui.SplitPanel({
  firstPanel: leftMap,
  secondPanel: rightMap,
  orientation: 'horizontal',
  wipe: true,
  style: {stretch: 'both'}
});
var Bantakokouta = new ui.Button({
  label: 'BANTAKOKOUTA',
  style: {stretch: 'horizontal'},
  onClick: function() {
      leftMap.setCenter(-12.219,12.768,14)
    }
});
var Karakhena = new ui.Button({
  label:'KHARAKHENA',
  style: {stretch: 'horizontal'},
  onClick: function() {
    leftMap.setCenter(-11.515,12.920,14)
  }
});
var Tenkhoto = new ui.Button({
  label: 'TENKHOTO',
  style: {stretch: 'horizontal'},
  onClick: function() {
      leftMap.setCenter(-12.128,12.923,14)
    }
});
var Gareboureya1 = new ui.Button({
  label:'GAREBOUREYA SUD',
  style: {stretch: 'horizontal'},
  onClick: function() {
    leftMap.setCenter(-11.442, 12.696,14)
  }
});
var Gareboureya2 = new ui.Button({
  label:'GAREBOUREYA',
  style: {stretch: 'horizontal'},
  onClick: function() {
    leftMap.setCenter(-11.474, 12.756,14)
  }
});
var Diabougu = new ui.Button({
  label:'DIABOUGOU',
  style: {stretch: 'horizontal'},
  onClick: function() {
    leftMap.setCenter(-11.937, 13.478,14)
  }
});
var Bondalaa = new ui.Button({
  label:'BONDALA',
  style: {stretch: 'horizontal'},
  onClick: function() {
    leftMap.setCenter(-11.662, 13.311,13)
  }
});
var Darola = new ui.Button({
  label:'DAOROLA',
  style: {stretch: 'horizontal'},
  onClick: function() {
    leftMap.setCenter(-11.482, 13.051,14)
  }
});
var Makhana = new ui.Button({
  label:'MAKANA',
  style: {stretch: 'horizontal'},
  onClick: function() {
    leftMap.setCenter(-12.116, 12.993,15)
  }
});
var Sansamba = new ui.Button({
  label:'SASSAMBA',
  style: {stretch: 'horizontal'},
  onClick: function() {
    leftMap.setCenter(-11.383, 12.966,15)
  }
});
var Soretto = new ui.Button({
  label:'SORETO',
  style: {stretch: 'horizontal'},
  onClick: function() {
    leftMap.setCenter(-11.910, 13.386,14)
  }
});
var Soukounkoun = new ui.Button({
  label:'SOUKOUNKOU',
  style: {stretch: 'horizontal'},
  onClick: function() {
    leftMap.setCenter(-11.899, 13.439,14)
  }
});
var Balakonko = new ui.Button({
  label:'BALANKONKO',
  style: {stretch: 'horizontal'},
  onClick: function() {
    leftMap.setCenter(-11.603, 13.113,13)
  }
});
var Baquata = new ui.Button({
  label:'BAQATA',
  style: {stretch: 'horizontal'},
  onClick: function() {
    leftMap.setCenter(-11.415, 12.820,16)
  }
});
var Diakaling = new ui.Button({
  label:'DIAKHALING',
  style: {stretch: 'horizontal'},
  onClick: function() {
    leftMap.setCenter(-11.920, 13.234,14)
  }
});
var Kabatea = new ui.Button({
  label:'KABATEA',
  style: {stretch: 'horizontal'},
  onClick: function() {
    leftMap.setCenter(-11.415, 12.956,15)
  }
});
var Linguekhoto = new ui.Button({
  label:'LINGOKHOTO',
  style: {stretch: 'horizontal'},
  onClick: function() {
    leftMap.setCenter(-11.540, 13.126,14)
  }
});
var Satadougu = new ui.Button({
  label:'SATADOUGOU',
  style: {stretch: 'horizontal'},
  onClick: function() {
    leftMap.setCenter(-11.438, 12.633,14)
  }
});
var Wassadu = new ui.Button({
  label:'WASSADOU',
  style: {stretch: 'horizontal'},
  onClick: function() {
    leftMap.setCenter(-12.392, 12.758,14)
  }
}); 
var title=ui.Label("Surveillance des activités d'orpaillage au Sénégal",
                    {color:'white',
                    fontSize:'30px', 
                    textAlign:'center', 
                    fontWeight:'bold', 
                    fontFamily:'sherif',
                    backgroundColor:'black'
                    })
var texts = ui.Label({
              value: "Cet outil a été développé pour la surveillance de l'orpaillage au sein et en dehors des couloirs  "+
                    " officiels qui ont été définis par l'Etat du Sénégal. Ces couloirs officiels sont délimités par les bordures en rouge."+ 
                    " Les données Sentinel-2 ont été ulilisées. La haute résolution spatiale et temporelle de ces données permet de détecter "+
                    " les changements à l'état de surface liés à l'orpaillage et de suivre l'évolution des zone exploitée depuis décembre 2015",
              style: {fontSize: '12px', }});
texts.style().set({textAlign:'justify'}); 
var contact = ui.Label({
            value:'Ndeye Marame Ngom\n'
                  +"Email:maramengom@gmail.com\n",
                  style: {fontSize: '11px', color:'blue',fontWeight:'bold', }
})
var contact1 = ui.Label({
            value:'Dr. Modou Mbaye\n'
                  +"Email:my.gandhy@gmail.com\n",
                  style: {fontSize: '11px', color:'blue',fontWeight:'bold', }
})
var corridors = ui.Label({
            value:"Liste des couloirs d'orpaillage officiels du Sénégal\n",
                  style: {fontSize: '20px', color:'white',fontWeight:'bold',fontFamily:'sherif',
                    backgroundColor:'black' }
})
var panels= [title,texts,contact,contact1,corridors,Bantakokouta,Balakonko,Baquata,Bondalaa,Darola,Diabougu,Diakaling, Gareboureya1,Gareboureya2,Kabatea,Karakhena,Linguekhoto,
              Makhana, Sansamba,Satadougu, Soretto,Soukounkoun,Tenkhoto, Wassadu]
var toolPanel = ui.Panel(panels, 'flow', {width: '20%'});
ui.root.widgets().reset([splitPanel, toolPanel]);
var linker = ui.Map.Linker([leftMap, rightMap]);
ui.root.setLayout(ui.Panel.Layout.flow('horizontal'));