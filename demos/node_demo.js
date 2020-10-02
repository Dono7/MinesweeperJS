const { Grid } = require('../app_entry')

console.log("\nRandom Grid : \n")
var g = new Grid({
    name:"My test map",
    width:18,
    height:10,
    nbbombs:30
}).initMap().spawnRdmBombs().show();