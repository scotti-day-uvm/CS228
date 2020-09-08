var controllerOptions = {};

var addX = 0;
var addY = 0;

var hand, fingers, index;


var x, y, z, NewX, NewY;

var rawXMin = 1000;
var rawYMin = 1000;
var rawXMax = -1000;
var rawYMax = -1000;

var width = window.innerWidth;
var height = window.innerHeight;



Leap.loop(controllerOptions, function(frame){
    clear();
    HandleFrame(frame);
} );

function HandleFrame(frame){
    if (frame.hands.length == 1) {
        hand = frame.hands[0];
        HandleHand(hand);
    }
}

function HandleHand(hand){
    index = hand.indexFinger;
    HandleFinger(index);
}

function HandleFinger(finger){
    [x,y,z] = finger.tipPosition

    if (x < rawXMin){
        rawXMin = x
    }
    if (y < rawYMin){
        rawYMin = y
    }
    if (x > rawXMax){
        rawXMax = x
    }
    if (y < rawYMax){
        rawYMax = y
    }

    NewX = width * ((x - rawXMin)/(rawXMax - rawXMin));
    NewY = height * ((y - rawYMin)/(rawYMax - rawYMin));

    circle(NewX,(height/2) - (-NewY),100);

}
