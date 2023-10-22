var App = require("users/sankichi92/gcom-c_dataset_overview:src/chla/App.js");
ui.root.clear();
var app = new App();
ui.root.add(app.panel);
ui.root.add(app.map);
app.updateCHLALayer();
app.updatePointLayer();
app.updatePointChart();