var controllerOptions = {};

var add_x = 0;
var add_y = 0;

var hand, fingers, finger, bones;

var proximal, distal;
var proximal_x, proximal_y, proximal_z;
var distal_x, distal_y, distal_z;

var x, y, z, new_x, new_y;

var raw_x_min = 5000;
var raw_y_min = 5000;
var raw_x_max = -5000;
var raw_y_max = -5000;

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
    fingers = hand.fingers;
    for (var i=0; i < fingers.length; i++){
        finger = fingers[i];
        for (var n =finger.bones.length-1; n>=0; n--){
            HandleBone(finger.bones[n])
        }
    }
}

function HandleFinger(finger){
    [x,y,z] = finger.tipPosition

    if (x < raw_x_min){
        raw_x_min = x
    }
    if (y < raw_y_min){
        raw_y_min = y
    }
    if (x > raw_x_max){
        raw_x_max = x
    }
    if (y < raw_y_max){
        raw_y_max = y
    }

    new_x, new_y = ScaleCoordinates(x,y);

    //circle(new_x,(height/2) - (-new_y),100);

}

function HandleBone(bone){
    proximal = bone.prevJoint;
    distal = bone.nextJoint;

    proximal_x = proximal[0];
    proximal_y = proximal[1];
    proximal_z = proximal[2];

    distal_x = distal[0];
    distal_y = distal[1];
    distal_z = distal[2];

    proximal_x, proximal_y = ScaleCoordinates(proximal_x,proximal_y);
    distal_x, distal_y = ScaleCoordinates(distal_x,distal_y);

    circle(proximal_x,(height/2) - (-proximal_y),40);


}

function ScaleCoordinates(old_x,old_y){
    new_x = width * ((old_x - raw_x_min)/(raw_x_max - raw_x_min));
    new_y = height * ((old_y - raw_y_min)/(raw_y_max - raw_y_min));
    return (new_x, new_y);
}