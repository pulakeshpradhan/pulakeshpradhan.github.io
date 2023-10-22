var sw_l7 = ee.ImageCollection("users/wwfrioparaguai/surface_water"),
    sw_l8 = ee.ImageCollection("users/imazon/surface_water"),
    sw_l5 = ee.ImageCollection("users/sad1/surface_water"),
    cartas = ee.FeatureCollection("users/jonasjunnior/Bacia_Paraguai");
var geometry = cartas.geometry()
var sw_col = sw_l5.merge(sw_l7).merge(sw_l8);
var col_l5 = sw_col.filter(ee.Filter.stringContains(ee.String("system:index"), "l5"))
var col_l7 = sw_col.filter(ee.Filter.stringContains(ee.String("system:index"), "l7"))
var col_l8 = sw_col.filter(ee.Filter.stringContains(ee.String("system:index"), "l8"))
var visParams = {
  min: 0,
  max: 2500,
  palette : ["blue"]
};
var months_list = { "Janeiro" : 1, "Fevereiro" : 2, "Março" : 3, "Abril" : 4,
                    "Maio" : 5, "Junho" : 6, "Julho" : 7, "Agosto": 8,
                    "Setembro": 9, "Outubro": 10, "Novembro" : 11, "Dezembro": 12}
var valor_ano = ""
var mes = ""
var col = null
//-------------------------------Painel de opções-----------------------------------//
var main = ui.Map()
main.centerObject(geometry)
var sat_list = {
  "Landsat 5": col_l5,
  "Landsat 7": col_l7,
  "Landsat 8": col_l8
}
var sat_opt = ui.Label({
  value: "Satélites:",
  style: {
    textAlign: "center",
    backgroundColor: "FFFFFF"
  }
})
var sat_select = ui.Select({
  items: Object.keys(sat_list),
  placeholder: "Escolha o satélite"
})
var bands = ui.Label({
  value: "Bandas:",
  style: {
    textAlign: "center"
  }
})
var sw_ck_box = ui.Checkbox({
  label: "Surface water",
  value: "",
})
var rw_ck_box = ui.Checkbox({
  label: "Regular water",
  value: "",
})
var sedw_ck_box = ui.Checkbox({
  label: "Sediment water",
  value: "",
})
var gw_ck_box = ui.Checkbox({
  label: "Green water",
  value: "",
})
var hw_ck_box = ui.Checkbox({
  label: "Half water",
  value: "",
})
var sat_panel = ui.Panel({
  widgets : [sat_opt, sat_select],
  layout : ui.Panel.Layout.flow('vertical'),
  style: {
    height: "100px",
    width: "150px",
    position: 'bottom-right',
    backgroundColor: "FFFFFF"
  }
})
var bands_panel = ui.Panel({
  widgets: [bands, sw_ck_box, rw_ck_box, sedw_ck_box, gw_ck_box, hw_ck_box],
  layout: ui.Panel.Layout.flow('vertical'),
  style: {
    height: "220px",
    width: "230px",
    position: 'bottom-right',
    backgroundColor: "FFFFFF"
  }
})
var meses_select = ui.Select({
      items : Object.keys(months_list),
      placeholder: "Escolha o mês"
    })
var months_label = ui.Label({
  value: "Meses",
  style:{
    textAlign : "center"
  }
})
var meses_panel = ui.Panel({
  layout : ui.Panel.Layout.flow('vertical'),
  style: {
    height: "100px",
    width: "150px",
    position: 'bottom-left',
    backgroundColor: "FFFFFF"
  }
})
var years_panel = ui.Panel({
    layout : ui.Panel.Layout.flow('vertical')
})
var att_btn = ui.Button({
  label: "Atualizar mapa",
})
var att_panel = ui.Panel({
  layout: ui.Panel.Layout.flow('vertical'),
  style: {
    height: "62px",
    width: "125px",
    position: 'top-center',
    backgroundColor: "FFFFFF"
  }
})
main.add(bands_panel);
main.add(sat_panel)
//-------------------------------Painel de anos-------------------------------------//
sat_select.onChange(function(key){
  col = sat_list[key]
  years_panel.clear()
  ui.root.remove(years_panel)
  var year_definition = ee.Algorithms.If(sat_list[key] == col_l5,
  [1985, 2011],
    ee.Algorithms.If(sat_list[key] == col_l7,
    [1999, 2018],
      ee.Algorithms.If(sat_list[key] == col_l8,
      [2013, 2018])
    )
  )
  var year_begin = ee.List(year_definition).get(0);
  var year_end = ee.List(year_definition).get(1);
  var years = ee.List.sequence(ee.Number(year_begin), ee.Number(year_end));
  var collection1 = years.map(function (year_number) {
      return ee.Feature(null, {
          'year': ee.Number(year_number).format('%d'),
          'band': 'classification_' + year_number,
          'system:yValue': 0
      });
  });
  var chart = ui.Chart.feature.byFeature(collection1, 'year', 'system:yValue')
      .setChartType('LineChart')
      .setOptions({
          legend: 'none',
          lineWidth: 1,
          pointSize: 5,
          height: 100,
          vAxis: {
              gridlines: {
                  count: 0
              }
          },
          'chartArea': {
              left: 30,
              top: 10,
              right: 30,
              width: '100%',
              height: '80%'
          },
          hAxis: {
              textPosition: 'in',
              showTextEvery: 1,
              interpolateNulls: true,
              slantedTextAngle: 90,
              slantedText: true,
              textStyle: {
                  color: '#000000',
                  fontSize: 12,
                  fontName: 'Arial',
                  bold: false,
                  italic: false
              }
          },
          tooltip :{
            trigger: 'none',
          },
          colors: ['#FF0000'],
          crosshair: {
              trigger: 'both',
              orientation: 'vertical',
              focused: {
                  color: '#0000ff'
              }
          }
      });
  chart.style().set({
      position: 'bottom-center',
      width: '100%',
      height: '150px',
      margin: '0px',
      padding: '0px',
  });
  years_panel.add(chart);
  ui.root.add(years_panel)
  chart.onClick(function(xValue){
    valor_ano = ee.String(xValue);
    meses_panel.clear()
    try{
      main.remove(meses_panel)
    }
    catch(e){
    }
    print(valor_ano)
    meses_panel.add(months_label).add(meses_select)
    main.add(meses_panel)
  });
});
meses_select.onChange(function(key){
    att_panel.clear()
    try{
      main.remove(att_panel)
    }
    catch(e){
    }
    att_panel.add(att_btn) 
    main.add(att_panel)
    mes = ee.String("_").cat(ee.Number(months_list[key]).format()).cat("_l")
})
att_btn.onClick(function(){
      var image_shown = col.filter(ee.Filter.stringContains(
                                             ee.String("system:index"), valor_ano))
                                      .filter(ee.Filter.stringContains(
                                              ee.String("system:index"), mes))
      print(image_shown)
      var ck_btn_list = {1 : sw_ck_box,
                         2 : rw_ck_box,
                         3 : sedw_ck_box,
                         4 : gw_ck_box,
                         5 : hw_ck_box
      }
      var bands_list = {
        1: "surface_water",
        2: "regular_water",
        3: "sediment_water",
        4: "green_water",
        5: "half_water"
      }
      if(main.layers().get(0)){
        main.layers().map(function(i){
          main.remove(i)
        })
      }
      Object.keys(ck_btn_list).map(function(key){
        if(ck_btn_list[key].getValue()){
            main.addLayer(image_shown.select(bands_list[key]), visParams, bands_list[key])
        }
      })
    })
//-------------------------------Years function------------------------//
ui.root.widgets().reset([main])
ui.root.setLayout(ui.Panel.Layout.flow('vertical'));