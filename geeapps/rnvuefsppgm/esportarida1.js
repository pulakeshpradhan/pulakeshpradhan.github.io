Map.style().set('cursor', 'hand');
//var logos = require('users/mapbiomas/modules:Logos.js');
//var Logo = logos.mapbiomas
//
var pnPrincipal = ui.Panel();
var t0 = '2017-01-01'
var t1 = '2017-12-31'
pnPrincipal.style().set({
    //layout: ui.Panel.Layout.flow('vertical'),
    width: '260px',
    position: 'bottom-right',
    border: '0.5px solid #000000',
    backgroundColor: '#FFFFFF'
});
var estiloHeader = { fontWeight: 'bold', 
                      fontSize: '20px',
                     textAlign: 'center', 
                     backgroundColor: '#FFFFFF' 
                    }
var estilogeral = { fontWeight: 'bold', 
                        fontSize: '18px',
                        textAlign: 'center', 
                        backgroundColor: '#FFFFFF' 
                    }
var Header = ui.Label('Processo de amostras', estiloHeader);
var label_dateT0_input = ui.Label('Initial year', estilogeral);
var T_dateT0_input = ui.Textbox({
    placeholder: 'year',
    onChange: function(text) {
      t0 = text;
    }
  });
var label_dateT1_input = ui.Label('Final year', estilogeral);
var T_dateT1_input = ui.Textbox({
    placeholder: 'year',
    onChange: function(text) {
      t1 = text;
    }
  });
var label_region_input = ui.Label('Region', estilogeral);
var T_region = ui.Textbox({
    placeholder: 'Semiarido'    
  }).setDisabled(true);
var label_Features = ui.Label('see the generated features', estilogeral);
var feat = {
           'median_green':'median_green',
           'median_red':'median_red',
           'median_nir':'median_nir',
           'median_swir1':'median_swir1', 
           'median_red_wet':'median_red_wet',
           'median_nir_wet':'median_nir_wet',
           'median_swir1_wet':'median_swir1_wet', 
           'median_red_dry':'median_red_dry',
           'median_nir_dry':'median_nir_dry',
           'median_swir1_dry':'median_swir1_dry',
           'median_ndvi':'median_ndvi',
           'median_pri':'median_pri',
           'median_evi2':'median_evi2',
           'stdDev_ndvi':'stdDev_ndvi',   
           'max_ndvi':'max_ndvi',
           'max_evi2':'max_evi2',
           'max_pri':'max_pri'
        };
var estiloFeat = { 
          fontWeight: 'bold', 
           fontSize: '12px',
           textAlign: 'center',
           width: '180px',
           backgroundColor: '#FFFFFF' 
       }           
var T_Features = ui.Select({
    items: Object.keys(feat),
    value: "median_green",
    disabled: false,
    style: estiloFeat   
  });
var label_Asset = ui.Label('idAsset from project', estilogeral);
var idAseet = 'projects/mapbiomas-arida/ColecaoLandsat_v1/';
var T_asset = ui.Textbox({
    placeholder: idAseet,
    style: {width: '240px'},
    onChange: function(text) {
        idAseet = text;
      }        
  })//.setDisabled(true);
var asset_label = ui.Label('Export Images to Driver', estilogeral);
var buttonStyle1 = {
    position: 'top-center',
    border: '1px solid #000000',
    width: '200px'
}
var buttonExport = ui.Button({
  label: 'Export to Asset',
  style: buttonStyle1,
});
buttonExport.style().set(buttonStyle1);
var asset = "users/rnvuefsppgm/aridalogo/aridalogoEXEINI";
var aridas = function () {
    var logo = ee.Image(asset).select(['b3', 'b2', 'b1'])
                              .visualize({bands: ['b1', 'b2', 'b3'], min: 0, max: 255});//,  gamma: [1.3, 1.3, 1]
    //print(logo)
    //logo = logo.where(logo.select(3).neq(255), 255);
    var thumbnail = ui.Thumbnail({
        image: logo,
        params: {
            dimensions: '371x136',
            format: 'png'
        },
        style: {
            'position': 'top-center',
            'height': '120px',
            'width': '260px',
            'textAlign': 'center'
        }
    });
    return thumbnail;
};
var Logo = aridas();
//adicionar paneles 
pnPrincipal.add(Logo);
pnPrincipal.add(Header);
pnPrincipal.add(label_dateT0_input);
pnPrincipal.add(T_dateT0_input);
pnPrincipal.add(label_dateT1_input);
pnPrincipal.add(T_dateT1_input);
pnPrincipal.add(label_region_input);
pnPrincipal.add(T_region);
pnPrincipal.add(label_Features);
pnPrincipal.add(T_Features);
pnPrincipal.add(label_Asset);
pnPrincipal.add(T_asset);
pnPrincipal.add(asset_label);
pnPrincipal.add(buttonExport);
ui.root.add(pnPrincipal);
exports.yearI = T_dateT0_input
exports.yearF = T_dateT1_input
exports.asset = idAseet
exports.export = buttonExport