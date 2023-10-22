// A UI to interactively filter a collection, select an individual image
// from the results, display it with a variety of visualizations, and export it.
Map.setCenter(-66.7225845, 46.0275848, 9); // Center on the Grand Canyon.
// The namespace for our application.  All the state is kept in here.
var app = {};
/** Creates the UI panels. */
app.createPanels = function() {
  /* The introduction section. */
  app.intro = {
    panel: ui.Panel([
      ui.Label({
        value: 'NB Flood',
        style: {fontWeight: 'bold', fontSize: '24px', margin: '10px 5px'}
      }),
      ui.Label('This app allows you to show NB.')
    ])
  };
};
 /* The collection filter controls. */
  app.filters = {
    mapCenter: ui.Checkbox({label: 'Filter to map center', value: true}),
    variable1: ui.Textbox(15),
    variable2: ui.Textbox(10),
    variable3: ui.Textbox(5),
    output: ui.Textbox(),
    applyButton: ui.Button('Apply Button', app.applyFilters),
    loadingLabel: ui.Label({
      value: 'Loading...',
      style: {stretch: 'vertical', color: 'gray', shown: false}
    })
  };
  /* The panel for the filter control widgets. */
  app.filters.panel = ui.Panel({
    widgets: [
      ui.Label('Input Independent Variables', {fontWeight: 'bold'}),
      ui.Label('Variable 1', app.HELPER_TEXT_STYLE), app.filters. variable1,
      ui.Label('Variable 2', app.HELPER_TEXT_STYLE), app.filters. variable2,
      ui.Label('Variable 3', app.HELPER_TEXT_STYLE), app.filters. variable3,
      //app.filters.mapCenter,
      ui.Label('Output', app.HELPER_TEXT_STYLE), app.filters. output,
      ui.Panel([
        app.filters.applyButton,
        app.filters.loadingLabel
      ], ui.Panel.Layout.flow('horizontal'))
    ],
    style: app.SECTION_STYLE
  });
/** Creates the application interface. */
app.boot = function() {
  app.createPanels();
  var main = ui.Panel({
    widgets: [
      app.intro.panel,
      app.filters.panel
    ],
    style: {width: '320px', padding: '8px'}
  });
  Map.setCenter(-66, 46, 9);
  ui.root.insert(0, main);
};
app.boot();