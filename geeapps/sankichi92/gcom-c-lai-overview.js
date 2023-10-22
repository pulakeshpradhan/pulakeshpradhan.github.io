var App = require("users/sankichi92/gcom-c_dataset_overview:src/lai/App.js");
ui.root.clear();
var app = new App();
ui.root.add(app.sidePanel);
ui.root.add(app.splitPanel);
app.updateLAILayer(0);
app.updateLAILayer(1);
app.updatePointLayer();
app.updatePointChart();