var App = require("users/sankichi92/gcom-c_dataset_overview:src/sst/App.js");
ui.root.clear();
var app = new App();
ui.root.add(app.panel);
ui.root.add(app.map);
app.updateSSTLayer();
app.updatePointLayer();
app.updatePointValueLabel();
app.updatePointChart();