var controllerOptions = {};
var i = 0;

// width
var x = window.innerWidth/2;
// height
var y = window.innerHeight/2;

Leap.loop(controllerOptions, function(frame){
    console.log(i)
    i++
    circle(x,y,50)
}
);