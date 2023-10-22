var office = /* color: #d63000 */ee.Geometry.Point([-75.96469046658422, 42.088266526624885]);
Map.addLayer(office, {}, 'Office');
Map.setCenter(-83.927492, 35.9566073, 16);
var panel = ui.Panel()
            .add(ui.Label('Qiusheng Wu, PhD'))
            .add(ui.Label('Assistant Professor'))
            .add(ui.Label('Department of Geography'))
            .add(ui.Label('University of Tennessee'))
var website = ui.Label('https://wetlands.io', {}, 'https://wetlands.io');
panel.add(website)
Map.add(panel)