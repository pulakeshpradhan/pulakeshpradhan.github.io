Map.style().set('cursor', 'hand');
//var logos = require('users/CartasSol/package:Arida/EXEINI');
//var Logo = logos.mapbiomas
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
            'width': '300px',
            'textAlign': 'center'
        }
    });
    return thumbnail;
};
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
var Header = ui.Label('Layers Arida', estiloHeader);
var label_dateT0_input = ui.Label('Initial Year', estilogeral);
var T_dateT0_input = ui.Textbox({
    placeholder: 'year',
    onChange: function(text) {
      t0 = text;
    }
  });
var label_dateT1_input = ui.Label('Final Year', estilogeral);
var T_dateT1_input = ui.Textbox({
    placeholder: 'year',
    onChange: function(text) {
      t1 = text;
    }
  });
var label_map_output = ui.Label('Maps to Visualize', estilogeral);
var checkedMap = {
    prod: false,
    carb: false,
    tcob: false,
    CVeg: false,
    Wsurf: false
}
var cbMapProd = ui.Checkbox('Productivity', false);
var cbMapCarb = ui.Checkbox('Carbon', false);
var cbMapTCob = ui.Checkbox('Transitions', false);
var cbMapCobVeg = ui.Checkbox('Land cover/use', false);
var cbMapWSurf = ui.Checkbox('Water', false);
cbMapProd.onChange(function(checked) {        
    checkedMap.prod = checked;
  });
cbMapCarb.onChange(function(checked) {        
    checkedMap.carb = checked;
  });
cbMapTCob.onChange(function(checked) {        
    checkedMap.tcob = checked;
  });
cbMapCobVeg.onChange(function(checked) {        
    checkedMap.CVeg = checked;
  });
cbMapWSurf.onChange(function(checked) {        
    checkedMap.Wsurf = checked;
  });
var label_region_input = ui.Label('Region', estilogeral);
var T_region = ui.Textbox({
    placeholder: 'Semiarido'    
  }).setDisabled(true);
var label_Asset = ui.Label('idAsset to Export', estilogeral);
var idAseet = 'projects/mapbiomas-arida/Biomas_Mapbiomas'
var T_asset = ui.Textbox({
    placeholder: idAseet,
    style: {width: '240px'},
    onChange: function(text) {
        idAseet = text;
      }        
  })//.setDisabled(true);
/*
var panelLogo = ui.Panel({
    'layout': ui.Panel.Layout.flow('vertical'),
    'style': {
        'margin': '0px 0px 0px 20px',
    },
}) 
panelLogo.add(Logo)
*/
var Logo = aridas();
var buttonStyle1 = {
    position: 'top-center',
    border: '1px solid #000000',
    width: '200px',
}
var buttonVisual = ui.Button({
  label: 'Read from Asset',
  style: buttonStyle1,
});
buttonVisual.style().set(buttonStyle1);
var buttonExport = ui.Button({
  label: 'Export to driver map loaded',
  style: buttonStyle1,
});
buttonExport.style().set(buttonStyle1);
var buttonStyle2 = {
    position: 'top-center',
    border: '1px solid #000000',
    width: '120px',
    margin: "0px 50px 0px 50px"
}
var buttonClear = ui.Button({
  label: 'Clear Maps',
  style: buttonStyle2,
});
buttonClear.style().set(buttonStyle2);
//adicionar paneles 
pnPrincipal.add(Logo);
pnPrincipal.add(Header);
pnPrincipal.add(label_dateT0_input);
pnPrincipal.add(T_dateT0_input);
pnPrincipal.add(label_dateT1_input);
pnPrincipal.add(T_dateT1_input);
pnPrincipal.add(label_map_output);
pnPrincipal.add(cbMapProd);
pnPrincipal.add(cbMapCarb);
pnPrincipal.add(cbMapTCob);
pnPrincipal.add(cbMapCobVeg);
pnPrincipal.add(cbMapWSurf);
pnPrincipal.add(label_region_input);
pnPrincipal.add(T_region);
pnPrincipal.add(label_Asset);
pnPrincipal.add(T_asset);
pnPrincipal.add(buttonVisual); //
pnPrincipal.add(buttonExport);
pnPrincipal.add(buttonClear);
ui.root.add(pnPrincipal);
// proceso de exportação 
exports.start_date = T_dateT0_input
exports.final_date = T_dateT1_input
exports.Production = cbMapProd
exports.Carbono = cbMapCarb
exports.TCobertura = cbMapTCob
exports.CobVegetation = cbMapCobVeg
exports.WSurface = cbMapWSurf
exports.checkedMap = checkedMap
exports.asset = idAseet
exports.visual = buttonVisual
exports.export = buttonExport
exports.clear = buttonClear