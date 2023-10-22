var water = ee.Image('JRC/GSW1_1/GlobalSurfaceWater').select('occurrence')
var label = ui.Label({
  value: 'Use the slider to adjust water occurrence frequency (5% increments)', 
  style: {
    margin: '0 0 0 10px', 
    backgroundColor: 'f5f5f5', 
    color: '303030'
  }
})
var source = ui.Label({
  value: 'JRC Global Surface Water Mapping Layers, v1.2', 
  style: {
    margin: '0 0 0 10px', 
    backgroundColor: 'f5f5f5', 
    fontSize: '10px',
    color: '303030'
  }
})
var slider = ui.Slider({
  min: 0,
  max: 95,
  step: 5,
  onChange: function(frequency) {
    return Map.layers().set(0, ui.Map.Layer(water.updateMask(water.gte(frequency).eq(1)), {min:0,max:100,palette:colors,opacity:0.75}, 'greater than '+String(frequency)+'%'));
  },
  style: {
    stretch: 'horizontal',
    backgroundColor: 'f5f5f5',
    color: '303030'
  },
  value: 0
})
var panel = ui.Panel({
  widgets: [label, source, slider],
  layout: ui.Panel.Layout.flow('vertical'),
  style: {
    position: 'top-center',
    width: '600px',
    backgroundColor: 'f5f5f5',
    color: '303030',
    border: '1px solid #e8e8e8'
  }
})
var colors = ['d631ff','f391ff','00adff']
Map.layers().set(0, ui.Map.Layer(water.updateMask(water.gte(0).eq(1)), {min:0,max:100,palette:colors,opacity:0.75}, 'greater than 0%'))
Map.setOptions('HYBRID').setCenter(105.14, 11.57,10)
Map.add(panel)