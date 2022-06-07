

$('body').on('keydown', (event) => {
  var arrowPress = event.key.match(/Arrow(Up|Down|Left|Right)/);
  if (arrowPress) {
    var direction = arrowPress[1];
    console.log(arrowPress)
    // console.log('Arrow press:', arrowPress)
    SwimTeam.move(direction.toLowerCase());
  }
  //how do we make the arrows combine?
    //we need to say if both are down we do a thing for each.


});
//
console.log('Client is running in the browser!');
