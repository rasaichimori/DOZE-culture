var vertices = [];
var sY = 0;
var p;
var lightbox, lightboxC;
var canvas;
var mouseIn;

function setup(){
    canvas = createCanvas(400,400);
    canvas.parent("lightbox-c");
    canvas.mouseOut(Out);
    canvas.mouseOver(Over);
    lightbox = select('.lightbox');
    lightboxC = document.getElementById('lightbox-c');
    p = createElement('p','');
}

function Out(){
    mouseIn = false;
}
function Over(){
    mouseIn = true;
}
function draw(){
    clear();
    noFill();
    strokeWeight(5);
    stroke(255,0,0);
    beginShape();
    for (var i=0;i<vertices.length;i++){
        vertex(vertices[i][0]*(width/400),vertices[i][1]*(width/400));
    }
    endShape(CLOSE);
    strokeWeight(1);
    text(vertices,10,10);
    text(sY,10,30);
}

function mouseWheel(event){
    sY += event.delta;
    resizeCanvas(sY+400,sY+400);
    lightbox.style('width',sY+400+'px');
    lightbox.style('height',sY+400+'px');
};


function mouseClicked(){
    if(mouseIn){
        strokeWeight(4);
        vertices.push([floor(mouseX/(width/400)), floor(mouseY/(width/400))]);
        if(vertices.length === 1){
            point(vertices[0][0],vertices[0][1]);
        }
    }
};



function keyPressed(){
    if (keyCode === RETURN) {
        var tempString = "";
        for(var each in vertices){
            tempString += vertices[each];
            tempString += ".";
        } 
        p.html(tempString);
    }
    if (keyCode === BACKSPACE) {
        vertices.pop();
    }
};