// Make a button widget.
var button = ui.Button('Click me!');
// Set a callback function to run when the
// button is clicked.
button.onClick(function() {
  print('Hello, world!');
});
// Display the button in the console.
print(button);