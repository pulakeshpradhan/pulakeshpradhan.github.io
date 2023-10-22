var Ndef = ee.Image("users/angelini75/WAD/Ndef"),
    Nsur = ee.Image("users/angelini75/WAD/Nsurplus"),
    ar = ee.Image("users/angelini75/WAD/aridity"),
    built = ee.Image("users/angelini75/WAD/built"),
    fire = ee.Image("users/angelini75/WAD/fire"),
    gni = ee.Image("users/angelini75/WAD/gni"),
    lstk = ee.Image("users/angelini75/WAD/livestock"),
    lpd = ee.Image("users/angelini75/WAD/lpd"),
    negTr = ee.Image("users/angelini75/WAD/neg_veg_trend"),
    pop = ee.Image("users/angelini75/WAD/pop15"),
    popCh = ee.Image("users/angelini75/WAD/pop_change"),
    tloss = ee.Image("users/angelini75/WAD/treeLoss"),
    wstr = ee.Image("users/angelini75/WAD/w_stress"),
    gsocseq = ee.Image("users/angelini75/WAD/GSOCseq_RSR_SSM2");
var countries = ee.FeatureCollection(
    'projects/google/examples/population-explorer/LSIB_SIMPLE-with-GHSL_POP');
// PANELS ------------------------------------------------------------------------------------------------#
// control panel
var controlPanel = ui.Panel({
    layout: ui.Panel.Layout.flow('vertical'),
    style: {width: '400px'}
    });
// map panel
var map = ui.Map();
    map.style().set({cursor:'crosshair'});
    map.setOptions('HYBRID');
    map.setCenter(-0.69, 14.38, 3);
// -------------------------------------------------------------------------------------------------------#
// index panel
var indexList = [['Low-input agriculture',1], ['High-input agriculture',2], ['Aridity Index',3], ['Built-up area',4], ['Fires',5], ['Income level',6],
                 ['Livestock density',7], ['Decreasing Land Productivity' ,8], ['Climate-vegetation trends' ,9], ['Population density' , 10],
                 ['Population change' , 11], ['Forest loss'  ,12], ['Water Stress'  , 13]];
var indexBox = [];
indexList.forEach(function(name, index) {
    var checkBox = ui.Checkbox(name[0]);
    indexBox.push(checkBox);
    });
var indexPanelLabel = ui.Label({
  value: 'WAD issues',
  style: {position: 'top-right', color:'blue', textDecoration: 'underline'},
  targetUrl: 'https://wad.jrc.ec.europa.eu/geoportal'
});
var indexPanel = ui.Panel(
    [
        ui.Panel([indexBox[0], indexBox[4], indexBox[8], indexBox[12]], null, {stretch: 'horizontal'}),
        ui.Panel([indexBox[1], indexBox[5], indexBox[9]], null, {stretch: 'horizontal'}),
        ui.Panel([indexBox[2], indexBox[6], indexBox[10]], null, {stretch: 'horizontal'}),
        ui.Panel([indexBox[3], indexBox[7], indexBox[11]], null, {stretch: 'horizontal'})
    ],
    ui.Panel.Layout.Flow('horizontal'), {stretch: 'horizontal'}
    );
indexBox[0].setValue(0);
// submit panel
var submitButton = ui.Button({label: 'Next step'});
submitButton.style().set('stretch', 'horizontal');
//########### ADD PANELS TO INTERFACE ################################################
controlPanel.add(indexPanelLabel);
controlPanel.add(indexPanel);
controlPanel.add(submitButton);
ui.root.clear();
ui.root.add(controlPanel);
ui.root.add(map);
// Bind actions to functions -----------------------------------------------------------------------------#
var loadComposite = function() {
        var pal_bin = {
            min: 0,
            max: 0.2,
            palette: ['ffffcc','006837'],
        };
        var empty = ee.Image().byte();
        if(indexBox[0].getValue() === true){
            empty = empty.addBands({srcImg:[Ndef]});
            map.addLayer(Ndef, pal_bin, 'N deficit').set({ shown: false });
        }
        if(indexBox[1].getValue() === true){
            empty = empty.addBands({srcImg:[Nsur]});
            map.addLayer(Nsur, pal_bin, 'N surplus').set({ shown: false });
        }
        if(indexBox[2].getValue() === true){
            empty = empty.addBands({srcImg:[ar]});
            map.addLayer(ar, pal_bin, 'Aridity').set({ shown: false });
        }
        if(indexBox[3].getValue() === true){
            empty = empty.addBands({srcImg:[built]});
            map.addLayer(built, pal_bin, 'Built').set({ shown: false });
        }
        if(indexBox[4].getValue() === true){
            empty = empty.addBands({srcImg:[fire]});
            map.addLayer(fire, pal_bin, 'Fires').set({ shown: false });
        }
        if(indexBox[5].getValue() === true){
            empty = empty.addBands({srcImg:[gni]});
            map.addLayer(gni, pal_bin, 'GNI').set({ shown: false });
        }
        if(indexBox[6].getValue() === true){
            empty = empty.addBands({srcImg:[lstk]});
            map.addLayer(lstk, pal_bin, 'Exess of Livestock').set({ shown: false });
        }
        if(indexBox[7].getValue() === true){
            empty = empty.addBands({srcImg:[lpd]});
            map.addLayer(lpd, pal_bin, 'LPD').set({ shown: false });
        }
        if(indexBox[8].getValue() === true){
            empty = empty.addBands({srcImg:[negTr]});
            map.addLayer(negTr, pal_bin, 'Neg. Veg. Trend').set({ shown: false });
        }
        if(indexBox[9].getValue() === true){
            empty = empty.addBands({srcImg:[pop]});
            map.addLayer(pop, pal_bin, 'Population').set({ shown: false });
        }
        if(indexBox[10].getValue() === true){
            empty = empty.addBands({srcImg:[popCh]});
            map.addLayer(popCh, pal_bin, 'Pop. change').set({ shown: false });
        }
        if(indexBox[11].getValue() === true){
            empty = empty.addBands({srcImg:[tloss]});
            map.addLayer(tloss, pal_bin, 'Forest loss').set({ shown: false });
        }
        if(indexBox[12].getValue() === true){
            empty = empty.addBands({srcImg:[wstr]});
            map.addLayer(wstr, pal_bin, 'Water stress').set({ shown: false });
        }
        // delete firts band
        empty = empty.select(
            empty.bandNames().filter(
                ee.Filter.stringEndsWith('item', 'constant').not()));
        var suma = empty.reduce("sum");
        var bands = empty.bandNames().length().getInfo();
        // GSOCseq panel
        var socseqSectionLabel = ui.Label('Define a threshold for potential SOCseq Tn C/ha.year',{fontWeight: 'bold'});
        var socseqLabel = ui.Label('SOCseq');
        var socseqslider = ui.Slider({min:0, max:0.2, value:0.07, step:0.005});
        socseqslider.style().set('stretch', 'horizontal');
        var socPanel = ui.Panel(
            [
                socseqSectionLabel,
                ui.Panel([socseqLabel, socseqslider], ui.Panel.Layout.Flow('horizontal'), {stretch: 'horizontal'}) 
            ] 
        );
        // threshold Issus panel 
        var issueSectionLabel = ui.Label('Define a threshold of minimum number of issues',{fontWeight: 'bold'});
        var issueLabel = ui.Label('Issues');
        var issueSlider = ui.Slider({min:0, max:bands, value:0, step:1});
        issueSlider.style().set('stretch', 'horizontal');
        var issuePanel = ui.Panel(
            [
                issueSectionLabel,
                ui.Panel([issueLabel, issueSlider], ui.Panel.Layout.Flow('horizontal'), {stretch: 'horizontal'}) 
            ] 
        );
        // add soc panel
        controlPanel.add(socPanel);
        // add issue panel
        controlPanel.add(issuePanel);
        // new submit button
        var submitButton2 = ui.Button({label: 'Submit'});
        submitButton2.style().set('stretch', 'horizontal');
        controlPanel.add(submitButton2);
        // Next Step #######################################################################
        var loadComposite2 = function() {
            var threshold_gsocseq = socseqslider.getValue();
            var threshold_issues = issueSlider.getValue();
            // mask
            var m_i = suma.gte(threshold_issues);
            var m_g = gsocseq.gte(threshold_gsocseq);
            // get layers
            suma = suma.updateMask(m_i);
            gsocseq = gsocseq.updateMask(m_g);
            var result = m_i.multiply(m_g);
            result = result.updateMask(result.gt(0));
            var pal_suma = {
                min: 0,
                max: bands,
                palette: ['b3cde3','8c96c6', '810f7c'],
            };
            var pal_gsoc = {
                min: 0,
                max: 0.2,
                palette: ['fff7bc','fec44f', 'd95f0e'],
            };
            var pal_res = {
                min: 1,
                max: 1,
                palette: ['cc66cc'],
            };
            map.addLayer(suma, pal_suma, 'Sum of issues').set({ shown: false });
            map.addLayer(gsocseq, pal_gsoc, 'GSOCseq').set({ shown: true });
            map.addLayer(result, pal_res, 'Priority areas');
            var COUNTRIES_STYLE = {color: '26458d', fillColor: '00000000'};
            var HIGHLIGHT_STYLE = {color: '8856a7', fillColor: '8856a7C0'};
            map.addLayer(countries.style(COUNTRIES_STYLE));
            // Create a panel and add it to the map.
            var inspector = ui.Panel([ui.Label('Click to get info')]);
            map.add(inspector);
            // SOC Seq #######################################################################
            /*
                * The legend panel in the bottom-left
            */
            // A color bar widget. Makes a horizontal color bar to display the given
            // color palette.
            function ColorBar(palette) {
                return ui.Thumbnail({
                    image: ee.Image.pixelLonLat().select(0),
                    params: {
                        bbox: [0, 0, 1, 0.1],
                        dimensions: '100x10',
                        format: 'png',
                        min: 0,
                        max: 1,
                        palette: palette,
                    },
                    style: {stretch: 'horizontal', margin: '0px 8px'},
                });
            }
            // Returns our labeled legend, with a color bar and three labels representing
            // the minimum, middle, and maximum values.
            function makeLegend() {
                var labelPanel = ui.Panel(
                    [
                        ui.Label((0), {margin: '4px 8px'}),
                        ui.Label((0.1),{margin: '4px 8px', textAlign: 'center', stretch: 'horizontal'}),
                        ui.Label(('>0.2'), {margin: '4px 8px'})
                    ],
                    ui.Panel.Layout.flow('horizontal'));
                return ui.Panel([ColorBar(pal_gsoc.palette), labelPanel]);
            }
            // Styling for the legend title.
            var LEGEND_TITLE_STYLE = {
                fontSize: '20px',
                fontWeight: 'bold',
                stretch: 'horizontal',
                textAlign: 'center',
                margin: '4px',
            };
            // Styling for the legend footnotes.
            var LEGEND_FOOTNOTE_STYLE = {
                fontSize: '10px',
                stretch: 'horizontal',
                textAlign: 'center',
                margin: '4px',
            };
            // Assemble the legend panel.
               map.add(ui.Panel(
                    [
                        ui.Label('GSOCseq above threshold', LEGEND_TITLE_STYLE), makeLegend(),
                        ui.Label(
                            '(Tn C per hectars per year)', LEGEND_FOOTNOTE_STYLE),
                        ui.Label(
                            'Based on scenario 10% increase C input under sustainable soil management', LEGEND_FOOTNOTE_STYLE),
                        ui.Label('Source: GSOCseq (FAO/GSP)', LEGEND_FOOTNOTE_STYLE)
                    ],
                    ui.Panel.Layout.flow('vertical'),
                    {width: '230px', position: 'bottom-left'}));
// ################################ country statistics ############################################
          // A list of points the user has clicked on, as [lon,lat] tuples.
              var selectedPoints = [];
              var b = bands + 4
              // Returns the list of countries the user has selected.
              function getSelectedCountries() {
                return countries.filterBounds(ee.Geometry.MultiPoint(selectedPoints));
              }
              // Generic Function to remove a property from a feature
              var removeProperty = function(feat, property) {
                var properties = feat.propertyNames()
                var selectProperties = properties.filter(ee.Filter.neq('item', property))
                return feat.select(selectProperties)
              }
              print(result)
              countries = result.reduceRegions({
                collection: countries,
                reducer: ee.Reducer.sum(),
                scale: 1000,
              });
              print(countries)
              countries = countries.map(function(feat) {
                return removeProperty(feat, 'Population')
              })
              // Makes a bar chart of the given FeatureCollection of countries by name.
              function makeResultsBarChart(countries) {
                var chart = ui.Chart.feature.byFeature(countries, 'Name');
                chart.setChartType('BarChart');
                chart.setOptions({
                  title: 'Area under the given thresholds',
                  colors: ['cc66cc'],
                  legend: {position: 'none'},
                  vAxis: {title: null},
                  hAxis: {title: 'Square km of selected areas', minValue: 0}
                });
                chart.style().set({stretch: 'both'});
                return chart;
              }
              // Makes a table of the given FeatureCollection of countries by name.
              function makeResultsTable(countries) {
                var table = ui.Chart.feature.byFeature(countries, 'Name');
                table.setChartType('Table');
                table.setOptions({allowHtml: true, pageSize: 5});
                table.style().set({stretch: 'both'});
                return table;
              }
              // Updates the map overlay using the currently-selected countries.
              function updateOverlay() {
                var overlay = getSelectedCountries().style(HIGHLIGHT_STYLE);
                map.layers().set(b, ui.Map.Layer(overlay));
              }
              // Updates the chart using the currently-selected charting function,
              function updateChart() {
                var chartBuilder = chartTypeToggleButton.value;
                var chart = chartBuilder(getSelectedCountries());
                resultsPanel.clear().add(chart).add(buttonPanel);
              }
              // Clears the set of selected points and resets the overlay and results
              // panel to their default state.
              function clearResults() {
                selectedPoints = [];
                map.layers().remove(map.layers().get(b));
                var instructionsLabel = ui.Label('Select regions to compare areas.');
                resultsPanel.widgets().reset([instructionsLabel]);
              }
              // Register a click handler for the map that adds the clicked point to the
              // list and updates the map overlay and chart accordingly.
              function handleMapClick(location) {
                selectedPoints.push([location.lon, location.lat]);
                updateOverlay();
                updateChart();
              }
              map.onClick(handleMapClick);
              // A button widget that toggles (or cycles) between states.
              // To construct a ToggleButton, supply an array of objects describing
              // the desired states, each with 'label' and 'value' properties.
              function ToggleButton(states, onClick) {
                var index = 0;
                var button = ui.Button(states[index].label);
                button.value = states[index].value;
                button.onClick(function() {
                  index = ++index % states.length;
                  button.setLabel(states[index].label);
                  button.value = states[index].value;
                  onClick();
                });
                return button;
              }
              // Our chart type toggle button: the button text is the opposite of the
              // current state, since you click the button to switch states.
              var chartTypeToggleButton = ToggleButton(
                  [
                    {
                      label: 'Display results as table',
                      value: makeResultsBarChart,
                    },
                    {
                      label: 'Display results as chart',
                      value: makeResultsTable,
                    }
                  ],
                  updateChart);
              // A panel containing the two buttons .
              var buttonPanel = ui.Panel(
                  [ui.Button('Clear results', clearResults), chartTypeToggleButton],
                  ui.Panel.Layout.Flow('horizontal'), {margin: '0 0 0 auto', width: '500px'});
              var resultsPanel = ui.Panel({style: {position: 'bottom-right'}});
              map.add(resultsPanel);
              clearResults();
            // // Next Step #######################################################################
            // // new submit button 3 reset
            //   var submitButton3 = ui.Button({label: 'Reset'});
            //   submitButton3.style().set('stretch', 'horizontal');
            //   controlPanel.add(submitButton3);
            //   var loadComposite3 = function() {
            //       inspector.clear();
            //       // map.clear();
            //       // gsocseq.clear();
            //       controlPanel.add(indexPanelLabel);
            //       controlPanel.add(indexPanel);
            //       controlPanel.add(submitButton);
            //       ui.root.clear();
            //       ui.root.add(controlPanel);
            //       ui.root.add(map);
            //       map.layers().reset();
            //   };
            //   submitButton3.onClick(loadComposite3);
        };
        submitButton2.onClick(loadComposite2);
    };
    submitButton.onClick(loadComposite);