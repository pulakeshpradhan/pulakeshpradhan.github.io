var NO2 = ui.import && ui.import("NO2", "imageCollection", {
      "id": "COPERNICUS/S5P/NRTI/L3_NO2"
    }) || ee.ImageCollection("COPERNICUS/S5P/NRTI/L3_NO2");
var today = ee.Date(Date.now());
var lastWeek = today.advance(-1, 'month');
var lastYear = today.advance(-1,'year');
var lastYearWeek = lastYear.advance(-1,'month');
var viz_params = {min: 0.00006303293215214387, max: 0.0001051761385436167, palette: ['#00ff00','ffff00','ff0000'],opacity: 0.80}
var NO2_2019 = NO2.filterDate(lastYearWeek,lastYear)
                  .select('NO2_column_number_density')
                  .mean();
var NO2_2020 = NO2.filterDate(lastWeek,today)
                  .select('NO2_column_number_density')
                  .mean();                  
// Map.addLayer(NO2_2019,viz_params, '2019');
// Map.addLayer(NO2_2020,viz_params, '2020');
var leftMap = ui.Map();
// leftMap.setControlVisibility(false);
var rightMap = ui.Map();
// rightMap.setControlVisibility(false);
var leftMapImage = ui.Map.Layer(NO2_2019,viz_params);
var rightMapImage = ui.Map.Layer(NO2_2020,viz_params);
// Create a SplitPanel to hold the adjacent, linked maps.
var splitPanel = ui.SplitPanel({
  firstPanel: leftMap.add(leftMapImage),
  secondPanel: rightMap.add(rightMapImage),
  wipe: true,
  style: {stretch: 'both'}
});
// Set the SplitPanel as the only thing in the UI root.
ui.root.widgets().reset([splitPanel]);
var linker = ui.Map.Linker([leftMap, rightMap]);
leftMap.setCenter(-100, 40, 5);