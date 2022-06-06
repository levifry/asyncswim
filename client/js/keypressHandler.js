

$('body').on('keydown', (event) => {
  var arrowPress = event.key.match(/Arrow(Up|Down|Left|Right)/);
  if (arrowPress) {
    var direction = arrowPress[1];
    // console.log('Arrow press:', arrowPress)
    SwimTeam.move(direction.toLowerCase());
  }
});

console.log('Client is running in the browser!');
