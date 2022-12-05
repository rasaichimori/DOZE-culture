var sY = 0;
var NumberOfFrames = 12;
var Y = 0;
function mouseWheel(event){
    ///* This is if I want the scroll to happen regardless
    
    sY += event.delta;

    //*/
    
    
    
    /*  This is if I want the scolling to stop if it hits the bottom or top
    
    var sY = window.scrollY;
    */
    
    
    
    //set the g value to where the scroll point is 
    //I made the scroll values simpler and repeated it so it can go through the frames
    
    
//    g = ((Y) % NumberOfFrames+1);
    //change the image to g value
    
//    bg.style('background-image', 'url(rawFrames/frame'+g+'.png)');
};

function walk(){
    Y+=(sY-Y)/10;
    g = (Math.floor(NumberOfFrames*(((1/NumberOfFrames)*Math.floor(Y/16))-(Math.floor(((1/NumberOfFrames)*Math.floor(Y/16))))))+1);
    bg.style('background-image', 'url(animations/frame'+g+'.svg)');
}