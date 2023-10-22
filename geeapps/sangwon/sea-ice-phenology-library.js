var Alert = ui.import && ui.import("Alert", "table", {
      "id": "users/sangwon/Alert_trend"
    }) || ee.FeatureCollection("users/sangwon/Alert_trend"),
    Arctic_Bay = ui.import && ui.import("Arctic_Bay", "table", {
      "id": "users/sangwon/Arctic_Bay_trend"
    }) || ee.FeatureCollection("users/sangwon/Arctic_Bay_trend"),
    Arviat = ui.import && ui.import("Arviat", "table", {
      "id": "users/sangwon/Arviat_trend"
    }) || ee.FeatureCollection("users/sangwon/Arviat_trend"),
    Cambridge_Bay = ui.import && ui.import("Cambridge_Bay", "table", {
      "id": "users/sangwon/Cambridge_Bay_trend"
    }) || ee.FeatureCollection("users/sangwon/Cambridge_Bay_trend"),
    Chesterfield_Inlet = ui.import && ui.import("Chesterfield_Inlet", "table", {
      "id": "users/sangwon/Chesterfield_Inlet_trend"
    }) || ee.FeatureCollection("users/sangwon/Chesterfield_Inlet_trend"),
    Churchill = ui.import && ui.import("Churchill", "table", {
      "id": "users/sangwon/Churchill_trend"
    }) || ee.FeatureCollection("users/sangwon/Churchill_trend"),
    Clyde_River = ui.import && ui.import("Clyde_River", "table", {
      "id": "users/sangwon/Clyde_River_trend"
    }) || ee.FeatureCollection("users/sangwon/Clyde_River_trend"),
    Coral_Harbour = ui.import && ui.import("Coral_Harbour", "table", {
      "id": "users/sangwon/Coral_Harbour_trend"
    }) || ee.FeatureCollection("users/sangwon/Coral_Harbour_trend"),
    Eureka = ui.import && ui.import("Eureka", "table", {
      "id": "users/sangwon/Eureka_trend"
    }) || ee.FeatureCollection("users/sangwon/Eureka_trend"),
    Gjoa_Haven = ui.import && ui.import("Gjoa_Haven", "table", {
      "id": "users/sangwon/Gjoa_Haven_trend"
    }) || ee.FeatureCollection("users/sangwon/Gjoa_Haven_trend"),
    Grise_Fjord = ui.import && ui.import("Grise_Fjord", "table", {
      "id": "users/sangwon/Grise_Fjord_trend"
    }) || ee.FeatureCollection("users/sangwon/Grise_Fjord_trend"),
    Igloolik = ui.import && ui.import("Igloolik", "table", {
      "id": "users/sangwon/Igloolik_trend"
    }) || ee.FeatureCollection("users/sangwon/Igloolik_trend"),
    Ikersak = ui.import && ui.import("Ikersak", "table", {
      "id": "users/sangwon/Ikersak_trend"
    }) || ee.FeatureCollection("users/sangwon/Ikersak_trend"),
    Iqaluit = ui.import && ui.import("Iqaluit", "table", {
      "id": "users/sangwon/Iqaluit_trend"
    }) || ee.FeatureCollection("users/sangwon/Iqaluit_trend"),
    Kangiqsualujjuaq = ui.import && ui.import("Kangiqsualujjuaq", "table", {
      "id": "users/sangwon/Kangiqsualujjuaq_trend"
    }) || ee.FeatureCollection("users/sangwon/Kangiqsualujjuaq_trend"),
    Kinngait = ui.import && ui.import("Kinngait", "table", {
      "id": "users/sangwon/Kinngait_trend"
    }) || ee.FeatureCollection("users/sangwon/Kinngait_trend"),
    Kugaaruk = ui.import && ui.import("Kugaaruk", "table", {
      "id": "users/sangwon/Kugaaruk_trend"
    }) || ee.FeatureCollection("users/sangwon/Kugaaruk_trend"),
    Kugluktuk = ui.import && ui.import("Kugluktuk", "table", {
      "id": "users/sangwon/Kugluktuk_trend"
    }) || ee.FeatureCollection("users/sangwon/Kugluktuk_trend"),
    Nain = ui.import && ui.import("Nain", "table", {
      "id": "users/sangwon/Nain_trend"
    }) || ee.FeatureCollection("users/sangwon/Nain_trend"),
    Naujaat = ui.import && ui.import("Naujaat", "table", {
      "id": "users/sangwon/Naujaat_trend"
    }) || ee.FeatureCollection("users/sangwon/Naujaat_trend"),
    Pangnirtung = ui.import && ui.import("Pangnirtung", "table", {
      "id": "users/sangwon/Pangnirtung_trend"
    }) || ee.FeatureCollection("users/sangwon/Pangnirtung_trend"),
    Paulatuk = ui.import && ui.import("Paulatuk", "table", {
      "id": "users/sangwon/Paulatuk_trend"
    }) || ee.FeatureCollection("users/sangwon/Paulatuk_trend"),
    Pond_Inlet = ui.import && ui.import("Pond_Inlet", "table", {
      "id": "users/sangwon/Pond_Inlet_trend"
    }) || ee.FeatureCollection("users/sangwon/Pond_Inlet_trend"),
    Qaanaaq = ui.import && ui.import("Qaanaaq", "table", {
      "id": "users/sangwon/Qaanaaq_trend"
    }) || ee.FeatureCollection("users/sangwon/Qaanaaq_trend"),
    Qikiqtarjuaq = ui.import && ui.import("Qikiqtarjuaq", "table", {
      "id": "users/sangwon/Qikiqtarjuaq_trend"
    }) || ee.FeatureCollection("users/sangwon/Qikiqtarjuaq_trend"),
    Rankin_Inlet = ui.import && ui.import("Rankin_Inlet", "table", {
      "id": "users/sangwon/Rankin_Inlet_trend"
    }) || ee.FeatureCollection("users/sangwon/Rankin_Inlet_trend"),
    Resolute = ui.import && ui.import("Resolute", "table", {
      "id": "users/sangwon/Resolute_trend"
    }) || ee.FeatureCollection("users/sangwon/Resolute_trend"),
    Sachs_Harbour = ui.import && ui.import("Sachs_Harbour", "table", {
      "id": "users/sangwon/Sachs_Harbour_trend"
    }) || ee.FeatureCollection("users/sangwon/Sachs_Harbour_trend"),
    Sanikiluaq = ui.import && ui.import("Sanikiluaq", "table", {
      "id": "users/sangwon/Sanikiluaq_trend"
    }) || ee.FeatureCollection("users/sangwon/Sanikiluaq_trend"),
    Taloyoak = ui.import && ui.import("Taloyoak", "table", {
      "id": "users/sangwon/Taloyoak_trend"
    }) || ee.FeatureCollection("users/sangwon/Taloyoak_trend"),
    Tuktoyaktuk = ui.import && ui.import("Tuktoyaktuk", "table", {
      "id": "users/sangwon/Tuktoyaktuk_trend"
    }) || ee.FeatureCollection("users/sangwon/Tuktoyaktuk_trend"),
    Ulukhaktok = ui.import && ui.import("Ulukhaktok", "table", {
      "id": "users/sangwon/Ulukhaktok_trend"
    }) || ee.FeatureCollection("users/sangwon/Ulukhaktok_trend"),
    Whale_Cove = ui.import && ui.import("Whale_Cove", "table", {
      "id": "users/sangwon/Whale_Cove_trend"
    }) || ee.FeatureCollection("users/sangwon/Whale_Cove_trend");
var mapPanel = ui.Map().setControlVisibility({layerList: false, fullscreenControl: true, drawingToolsControl: false});
var graphPanel = ui.Panel({style: {stretch: 'horizontal', height: "40%"}});
graphPanel.add(ui.Label({value: "Select a Location to View Sea Ice Phenological Trend", style: {textAlign: "center"}}));
graphPanel.add(ui.Panel([
  ui.Panel([
    ui.Label({value: 'Developed by ', style: {margin: "0px 4px 0px 0px"}}),
    ui.Label({value: 'ICE lab at University of Victoria', style: {margin: "0px 4px 0px 0px", color: "blue"}}).setUrl("https://icelab.ca/")
  ], ui.Panel.Layout.flow('horizontal'), {margin: "0px 8px 0px 8px"}),
  ui.Panel([
    ui.Label({value: 'Developer/Maintainer: ', style: {margin: "0px 4px 0px 0px"}}),
    ui.Label({value: 'Sangwon Lim', style: {margin: "0px 4px 0px 0px", color: "blue"}}).setUrl("https://github.com/sum1lim")
  ], ui.Panel.Layout.flow('horizontal'), {margin: "0px 4px 0px 8px"})
]));
var tables = ee.Dictionary({
	Arctic_Bay: Arctic_Bay,
	Grise_Fjord: Grise_Fjord,
	Pond_Inlet: Pond_Inlet,
	Qaanaaq: Qaanaaq,
	Resolute: Resolute,
	Cambridge_Bay: Cambridge_Bay,
	Gjoa_Haven: Gjoa_Haven,
	Igloolik: Igloolik,
	Kugaaruk: Kugaaruk,
	Naujaat: Naujaat,
	Taloyoak: Taloyoak,
	Kinngait: Kinngait,
	Clyde_River: Clyde_River,
	Iqaluit: Iqaluit,
	Pangnirtung: Pangnirtung,
	Qikiqtarjuaq: Qikiqtarjuaq,
	Ikersak: Ikersak,
	Kugluktuk: Kugluktuk,
	Paulatuk: Paulatuk,
	Sachs_Harbour: Sachs_Harbour,
	Tuktoyaktuk: Tuktoyaktuk,
	Ulukhaktok: Ulukhaktok,
	Arviat: Arviat,
	Chesterfield_Inlet: Chesterfield_Inlet,
	Coral_Harbour: Coral_Harbour,
	Rankin_Inlet: Rankin_Inlet,
	Sanikiluaq: Sanikiluaq,
	Whale_Cove: Whale_Cove,
	Churchill: Churchill,
	Kangiqsualujjuaq: Kangiqsualujjuaq,
	Nain: Nain,
	Eureka: Eureka,
	Alert: Alert,
});
var communities = ee.Dictionary({
	Arctic_Bay:         [-85.148,73.038], //Arctic Bay
	Grise_Fjord:        [-82.902,76.419], //Grise Fjord
	Pond_Inlet:         [-77.959,72.7], //Pond Inlet
	Qaanaaq:            [-69.229,77.467], //Qaanaaq
	Resolute:           [-94.83,74.697], //Resolute
	Cambridge_Bay:      [-105.06,69.117], //Cambridge Bay
	Gjoa_Haven:         [-95.85,68.636], //Gjoa Haven
	Igloolik:           [-81.825,69.373], //Igloolik
	Kugaaruk:           [-89.825,68.535], //Kugaaruk
	Naujaat:            [-86.245,66.528], //Naujaat
	Taloyoak:           [-93.527,69.537], //Taloyoak
	Kinngait:           [-76.541,64.23], //Kinngait
	Clyde_River:        [-68.601,70.476], //Clyde River
	Iqaluit:            [-68.517,63.747], //Iqaluit
	Pangnirtung:        [-65.701,66.147], //Pangnirtung
	Qikiqtarjuaq:       [-64.026,67.556], //Qikiqtarjuaq
	Ikersak:            [-52.131,70.677], //Ikersak
	Kugluktuk:          [-115.097,67.825], //Kugluktuk
	Paulatuk:           [-124.071,69.351], //Paulatuk
	Sachs_Harbour:      [-125.247,71.985], //Sachs Harbour
	Tuktoyaktuk:        [-133.034,69.445], //Tuktoyaktuk
	Ulukhaktok:         [-117.77,70.737], //Ulukhaktok
	Arviat:             [-94.062,61.108], //Arviat
	Chesterfield_Inlet: [-90.737,63.347], //Chesterfield Inlet
	Coral_Harbour:      [-83.17,64.139], //Coral Harbour
	Rankin_Inlet:       [-92.085,62.808], //Rankin Inlet
	Sanikiluaq:         [-79.223,56.541], //Sanikiluaq
	Whale_Cove:         [-92.602,62.243], //Whale Cove
	Churchill:          [-94.186944,58.780833], //Churchill 
	Kangiqsualujjuaq:   [-65.95,58.683333], //Kangiqsualujjuaq
	Nain:               [-61.718889,56.536389], //Nain
// 	Grise_Fjord:        [-82.895833,76.416667], //Grise Fjord
	Eureka:             [-85.95,79.983333], //Eureka 
	Alert:              [-62.366667,82.5], //Alert
});
var communities_layer = ee.Geometry.MultiPoint(communities.values());
mapPanel.onClick(function(coords) {
  var click_point = ee.Geometry.Point(coords.lon, coords.lat);
  var selected_point = communities.keys().iterate(function (curr, prev) {
    var dist = click_point.distance(ee.Geometry.Point(communities.get(curr)));
    var min_dist = ee.Number(ee.List(prev).get(1));
    return ee.Algorithms.If(
      ee.Number(dist).lt(min_dist), 
      [curr, dist], 
      prev
    );
  }, [communities.keys().get(0), click_point.distance(ee.Geometry.Point(communities.get(communities.keys().get(0))))]);
  var threshold = ee.Number(1000).multiply(ee.Number(2).pow(ee.Number(10).subtract(mapPanel.getZoom())));
  ee.List(selected_point).get(1).evaluate(function(result) {
    if (result < threshold.getInfo()) {
      var table = ee.FeatureCollection(tables.get(ee.List(selected_point).get(0))).sort("Year");
      var MO_count = table.reduceColumns({reducer: ee.Reducer.count(), selectors: ['MO']}).get("count");
      var OW_count = table.reduceColumns({reducer: ee.Reducer.count(), selectors: ['OW']}).get("count");
      var FO_count = table.reduceColumns({reducer: ee.Reducer.count(), selectors: ['FO']}).get("count");
      if (MO_count.getInfo() === 0) {
        table = table.map(function (feat) {
          return feat.set("MO", ee.Number(feat.get("Year")).multiply(-1));
        });
        MO_count = ee.Number(table.size());
      }
      if (OW_count.getInfo() === 0) {
        table = table.map(function (feat) {
          return feat.set("OW", ee.Number(feat.get("Year")).multiply(-1));
        });      
        OW_count = ee.Number(table.size());
      }
      if (FO_count.getInfo() === 0) {
        table = table.map(function (feat) {
          return feat.set("FO", ee.Number(feat.get("Year")).multiply(-1));
        });      
        FO_count = ee.Number(table.size());
      }
      var selector_li = ee.List(["Year"]);
      if (MO_count.getInfo() > 1) {
        selector_li = selector_li.add("MO");
      }
      if (OW_count.getInfo() > 1) {
        selector_li = selector_li.add("OW");
      }
      if (FO_count.getInfo() > 1) {
        selector_li = selector_li.add("FO");
      }
      var linearFit = ee.List(table.reduceColumns({
        reducer: ee.Reducer.ridgeRegression(1, selector_li.size().subtract(1)),
        selectors: selector_li
      }).get("coefficients")).getInfo();
      var y_intersects = ee.List(linearFit[0]);
      var slopes = ee.List(linearFit[1]);
      if (MO_count.getInfo() == 1) {
        table.first().set("MO", 1);
        y_intersects = y_intersects.insert(0, -1);
        slopes = slopes.insert(0, 0);
      }
      if (OW_count.getInfo() == 1) {
        table.first().set("OW", 1);
        y_intersects = y_intersects.insert(1, -1);
        slopes = slopes.insert(1, 0);
      }
      if (FO_count.getInfo() == 1) {
        y_intersects = y_intersects.insert(2, -1);
        slopes = slopes.insert(2, 0);
      }
      table = table.map(function (feat) {
        return feat.set(
          'system:index', ee.String(feat.get("Year")), 
          "Year", ee.String(feat.get("Year")),
          "MO trend", ee.Number(feat.get("Year")).multiply(slopes.get(0)).add(y_intersects.get(0)),
          "OW trend", ee.Number(feat.get("Year")).multiply(slopes.get(1)).add(y_intersects.get(1)),
          "FO trend", ee.Number(feat.get("Year")).multiply(slopes.get(2)).add(y_intersects.get(2)),
          "MO mean", table.aggregate_mean("MO"),
          "OW mean", table.aggregate_mean("OW"),
          "FO mean", table.aggregate_mean("FO")
        );
      });
      var MO_properties = ["MO"];
      var MO_series = {0: {pointSize: 3, lineWidth: 0, color: "Red"}};
      var OW_properties = ["OW"];
      var OW_series = {0: {pointSize: 3, lineWidth: 0, color: "Green"}};
      var FO_properties = ["FO"];
      var FO_series = {0: {pointSize: 3, lineWidth: 0, color: "Blue"}};
      if (MO_count.getInfo() > 10) {
        MO_properties.push("MO trend");
        MO_properties.push("MO mean");
        MO_series[1] = {pointSize: 0, lineWidth: 1, color: "Red"};
        MO_series[2] = {pointSize: 0, lineWidth: 1, color: "Black", lineDashStyle: [4, 4]};
      }
      if (OW_count.getInfo() > 10) {
        OW_properties.push("OW trend");
        OW_properties.push("OW mean");
        OW_series[1] = {pointSize: 0, lineWidth: 1, color: "Green"};
        OW_series[2] = {pointSize: 0, lineWidth: 1, color: "Black", lineDashStyle: [4, 4]};
      }
      if (FO_count.getInfo() > 10) {
        FO_properties.push("FO trend");
        FO_properties.push("FO mean");
        FO_series[1] = {pointSize: 0, lineWidth: 1, color: "Blue"};
        FO_series[2] = {pointSize: 0, lineWidth: 1, color: "Black", lineDashStyle: [4, 4]};
      }
      var chart = ui.Chart.feature.byFeature({features: table, xProperty: 'Year', yProperties: MO_properties})
        .setOptions({
          title: ee.String(ee.List(selected_point).get(0)).replace("_", " ").cat(" Melt Onset Trend").getInfo(),
          vAxis: {
            title: 'Day of Year',
            viewWindow:{min: table.aggregate_min("MO"), max: table.aggregate_max("MO")}
          },        
          series: MO_series
        });
      // Generate Melt Onset Graph
      var MO_button = ui.Button({label: "Melt Onset", onClick: function() {
        chart = ui.Chart.feature.byFeature({features: table, xProperty: 'Year', yProperties: MO_properties})
          .setOptions({
            title: ee.String(ee.List(selected_point).get(0)).replace("_", " ").cat(" Melt Onset Trend").getInfo(),
            vAxis: {
              title: 'Day of Year',
              viewWindow:{min: table.aggregate_min("MO"), max: table.aggregate_max("MO")}
            },        
            series: MO_series
          });
        chart.style().set("height", "75%");
        graphPanel.widgets().set(1, chart);
      },
      style: {height: "60%"}});
      // Generate Open Water Graph
      var OW_button = ui.Button({label: "Open Water", onClick: function() {
        chart = ui.Chart.feature.byFeature({features: table, xProperty: 'Year', yProperties: OW_properties})
          .setOptions({
            title: ee.String(ee.List(selected_point).get(0)).replace("_", " ").cat(" Open Water Trend").getInfo(),
            vAxis: {
              title: 'Day of Year',
              viewWindow:{min: table.aggregate_min("OW"), max: table.aggregate_max("OW")}
            },        
            series: OW_series
          });
        chart.style().set("height", "75%");
        graphPanel.widgets().set(1, chart);
      },
      style: {height: "60%"}});
      // Generate Freeze Onset Graph
      var FO_button = ui.Button({label: "Freeze Onset", onClick: function() {
        chart = ui.Chart.feature.byFeature({features: table, xProperty: 'Year', yProperties: FO_properties})
          .setOptions({
            title: ee.String(ee.List(selected_point).get(0)).replace("_", " ").cat(" Freeze Onset Trend").getInfo(),
            vAxis: {
              title: 'Day of Year',
              viewWindow:{min: table.aggregate_min("FO"), max: table.aggregate_max("FO")}
            },        
            series: FO_series
          });
        chart.style().set("height", "75%");
        graphPanel.widgets().set(1, chart);
      },
      style: {height: "60%"}});
      chart.style().set("height", "75%");
      graphPanel.widgets().set(1, chart);
      var buttonPanel = ui.Panel({
        style: {stretch: 'horizontal'}, 
        layout: ui.Panel.Layout.flow('horizontal')
      });
      buttonPanel.add(MO_button);
      buttonPanel.add(OW_button);
      buttonPanel.add(FO_button);
      var DOYcalculatorPanel = ui.Panel({
        style: {stretch: 'horizontal'}, 
        layout: ui.Panel.Layout.flow('horizontal')
      });
      var year_li = [];
      var DOY_li = [];
      for (var i = 2000; i < 2022; i++) {
        year_li.push(i.toString());
      }
      for (var j = 1; j < 366; j++) {
        DOY_li.push(j.toString());
      }
      var calendar_date_label = ui.Label(" = ");
      var year_select = ui.Select({items: year_li, placeholder: "Year", onChange: function (Year) {
        var DOY = doy_select.getValue()-1;
        if (DOY < 0) {
          DOY = 0;
        }
        var calendar_date = ee.Date(Year+'-01-01').advance(DOY, 'day');
        calendar_date_label.setValue(" = "
          +calendar_date.get('Year').getInfo()+'-'
          +calendar_date.get('month').getInfo()+'-'
          +calendar_date.get('day').getInfo());        
      }});
      var doy_select = ui.Select({items: DOY_li, placeholder: "Day of Year", onChange: function (DOY) {
        var calendar_date = ee.Date(year_select.getValue()+'-01-01').advance(parseInt(DOY)-1, 'day');
        calendar_date_label.setValue(" = "
          +calendar_date.get('Year').getInfo()+'-'
          +calendar_date.get('month').getInfo()+'-'
          +calendar_date.get('day').getInfo());
      }});
      DOYcalculatorPanel.add(year_select);
      DOYcalculatorPanel.add(doy_select);
      DOYcalculatorPanel.add(calendar_date_label);
      var utilityPanel = ui.SplitPanel({firstPanel: buttonPanel, secondPanel: DOYcalculatorPanel, wipe: false});
      graphPanel.widgets().set(0, utilityPanel);
    }
  });
});
mapPanel.layers().set(0, communities_layer);
mapPanel.centerObject(communities_layer, 5);
mapPanel.style().set('cursor', 'crosshair');
ui.root.clear();
ui.root.setLayout(ui.Panel.Layout.flow("vertical"));
ui.root.add(ui.SplitPanel(mapPanel, graphPanel, "vertical"));