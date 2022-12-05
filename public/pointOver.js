function createBorder(str){
    fill(0);
    var points = readString(str);
    beginShape();
    for (var i=0;i<points.length;i++){
        curveVertex(random(0,5)+points[i].x,random(0,5)+points[i].y);
    }
    endShape(CLOSE);
}

function readString(str){
    var splitString = split(str, '.');
    var p = [];
    for(var i = 0; i<splitString.length-1; i++){
        var slots = split(splitString[i], ',')
        slots[0] = int(slots[0])*(height/400)+(width/2)-(height/2);
        slots[1] = int(slots[1])*(height/400);
        p.push(createVector(slots[0],slots[1]))
    }
    return p;
}

function PointOver(pointX,pointY,str){
    var pointIn;
    var points = readString(str);
    var over = [];
    for(var i = 0; i<points.length-2; i++){
       if((getscale1(pointX,pointY,points,0,i+1,i+2)+getscale2(pointX,pointY,points,0,i+1,i+2))<1 && getscale1(pointX,pointY,points,0,i+1,i+2)>0 && getscale2(pointX,pointY,points,0,i+1,i+2)>0){
            over.push(1);
        }
        else{
            over.push(0);
        }
    }

    var total = 0;
    for(var i = 0; i<over.length; i++){
        total += over[i];
    }
    if ((total/2) != floor(total/2)){
        pointIn = true;
    }else{
        pointIn = false;
    }
    return pointIn;
}

function getscale1(Px,Py,p,a,b,c){
    return (p[a].x*(p[c].y-p[a].y)+(Py-p[a].y)*(p[c].x-p[a].x)-Px*(p[c].y-p[a].y))/((p[b].y-p[a].y)*(p[c].x-p[a].x)-(p[b].x-p[a].x)*(p[c].y-p[a].y));
}

function getscale2(Px,Py,p,a,b,c){
    if (p[c].y-p[a].y == 0){
        p[c].y++;
    }
    return (Py-p[a].y-getscale1(Px,Py,p,a,b,c)*(p[b].y-p[a].y))/(p[c].y-p[a].y)
}