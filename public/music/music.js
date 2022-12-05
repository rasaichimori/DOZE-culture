var theTrack = [];

async function selectHost(){
	const sample = (arr) => arr[Math.floor(Math.random() * arr.length)]
	const res = await fetch('https://api.audius.co')
	const hosts = await res.json()
	return sample(hosts.data)
}


const userUrl = 'https://audius.co/officialrai';

const fetchUserTracks = async ()=>{
	const host = await selectHost();
	const Ures = await fetch(host+'/v1/resolve?url='+userUrl+'&app_name=rasa')
	const Ujson = await Ures.json()
	const userID = Ujson.data.id
	
	const Tres = await fetch(host+'/v1/users/'+userID+'/tracks?app_name=rasa')
	const Tjson = await Tres.json()
	const allTracks = Tjson.data
	for(var i = 0; i<allTracks.length; i++){
			const trackID = allTracks[i].id;
			const trackUrl = host+'/v1/tracks/'+trackID+'/stream?app_name=rasa';
			theTrack.push(trackUrl);
	}
	return allTracks;
	console.log(theTrack);
}

var allInfo;

fetchUserTracks().then(allTracks=>{
	for (var i =0; i<(theTrack.length); i++){
			song[i] = loadSound(theTrack[i]);
			rectY.push(0);
			order.push(0);
			bsize.push(0);
			CurTimes.push(0);
	}
	allInfo = allTracks;
	console.log(allInfo);
});
			
var song = [];

// for lightbox
var lightbox, lightboxC;


var rectY = [];
var order = [];
var bsize = [];
var CurTimes = [];
var fft;
var detail = 256;
// for music

var canvas;
var offwidth;

function setup(){
	fft = new p5.FFT(0.85,detail);
	canvas = createCanvas(600,600);
	canvas.parent("lightbox-c");
	lightbox = select('.lightbox');
	lightboxC = document.getElementById('lightbox-c');
	changeSize();
}

var mouseClicked = false;
var mCount = 0;
var pmCount = 0;

function mousePressed(){
    mouseClicked = true;
};

function mouseReleased(){
    if(mouseClicked == true){
        mCount++;
        mouseClicked = false;
    }
}

function windowResized(){
    changeSize();
}

function changeSize(){
    offwidth = lightboxC.offsetWidth;
    resizeCanvas(offwidth, windowHeight, true);
}

function link(url, winName, options) {
    winName && open(url, winName, options) || (location = url);
}

function getSum(total, num) {
    return total + num;
}

function mod(n, m) {
  return ((n % m) + m) % m;
}

var steep = 200;
var opaq = 255;
var start = false;
var sY = 600;
var Y = 0;

function draw(){
    Y+=(sY-Y)/10;
    textSize(10);
    textFont('sans-serif');
    lightbox.style('cursor','default');
    clear();
    background(0,0,0,255-opaq);
    checkLinks();
    posRect(Y);
    setOrder();
    checkSongStatus();
    drawSpectrum();
    detailBar();
    createRect();
    checkMouse();
    if(mCount!=pmCount){
        pmCount = mCount;
    }
}

function mouseWheel(event){
    sY += event.delta;
};

var x = 100;
var SongPlaying = -1;
var mouseBox = -1;

var links = [
    'https://soundcloud.com/officialrai',
    'https://open.spotify.com/artist/02XjTOUw55eQr8KgsAHRYD?si=3XG6_fSXQPa_BaSzKcegrg',
    'https://www.youtube.com/channel/UCwN2fwP_oEyHNPCFZmAicPQ',
    'https://www.instagram.com/this.is.rai/'];
var names = ["soundcloud","spotify","youtube","instagram"];

function checkLinks(){
    noStroke();
    fill(255,255,255,255-((width-300)-mouseX));     
    for(var i = 0; i<links.length; i++){
        var y = i*20;
        if(mouseY>120+y && mouseY<135+y){
            if(mouseX>width-320){
                lightbox.style('cursor','pointer');
                fill(100);
                if(mCount!=pmCount){
                    pmCount = mCount;
                    link(links[i]);
                }
            }
        }
        else{
            fill(255,255,255,255-((width-300)-mouseX));     
        }
        text(names[i],(width-300),130+y);   
    }
    fill(255,255,255,255-opaq);
    text("all songs by rai.",(width-300),100);
}

function checkSongStatus(){
    for(var i = 0; i<song.length; i++){
        var j = order[i];
        if(song[j].isLoaded()){
            if(song[j].currentTime()>0){
                CurTimes[j] = song[j].currentTime();
            }
        }
    }
}

function keyPressed() {
  if (keyCode == 32) {
      playSong(mouseBox,-1);
  }
}

function playSong(num,jump){
    if(SongPlaying != -1){
        if(jump != -1){
            if(SongPlaying != num){
                song[SongPlaying].pause();
                SongPlaying = num;
                song[num].stop();
                song[num].play(0,1,0.5,jump);
            }
            else{
                song[num].jump(jump);
            }
        }
        else{
            song[SongPlaying].pause();
            if(SongPlaying != num){
                if(mouseBox != -1){
                    song[num].play();
                    SongPlaying = num;
                }
                else{
                    SongPlaying = -1;
                }
            }
            else{
                SongPlaying = -1;
            }
        }
    }
    else{
        SongPlaying = num;
        if(jump != -1){
            song[num].stop();
            song[num].play(0,1,0.5,jump);
        }
        else{
            if(mouseBox != -1){
                song[num].play();
            }
        }
    }
}



function checkMouse(){
    var closest = -1;
    var bY = 0;
    for(var i = 0; i<rectY.length; i++){
        var j = order[i];
        var y = rectY[j] + windowHeight/2;
        if(mouseX>x && mouseX<x+500 && mouseY>y-15 && mouseY<y+85){
            closest = j;
            bY = y;
        }
        bsize[j]+=((10-bsize[j])/10);
    }
    mouseBox = closest;
    if(mouseBox != -1){
        start = true;
        if(song[closest].isLoaded()){
            var Tline = createVector(x+50+(350*CurTimes[mouseBox]/song[mouseBox].duration()),bY+60);
            if(dist(mouseX,mouseY,x+30,bY+30)<20){
                lightbox.style('cursor','pointer');
                if(mouseClicked){
                    bsize[closest]+=((5-bsize[closest])/10);
                }
                else{
                    bsize[closest]+=((15-bsize[closest])/10); 
                }
                if(mCount!=pmCount){
                    pmCount = mCount;
                    playSong(closest,-1);
                }
            }
            if(dist(mouseX,mouseY,constrain(mouseX,x+50,x+400),bY+60)<5){
                lightbox.style('cursor','pointer');   
                strokeWeight(3);
                stroke(100);
                line(Tline.x,bY+60,mouseX,bY+60);
                if(mouseClicked){
                    Tline.x = mouseX
                    stroke(255);
                    line(x+50,Tline.y,mouseX,Tline.y);
                }
                if(mCount!=pmCount){
                    pmCount = mCount;
                    playSong(closest,(constrain(mouseX,x+51,x+399)-x-50)/350*song[closest].duration());
                }
            }
            stroke(255);
            strokeWeight(8);
            if(dist(mouseX,mouseY,Tline.x,Tline.y)<5){
                strokeWeight(10);
            }
            point(Tline.x,Tline.y);
        }
    }
    if(start){
        if(mouseX<x+500 && mouseX>x && mouseY<630){
            if(opaq<250){
                opaq+=500/frameRate();
            }
        }
        else{
            if(opaq>0){
                opaq-=500/frameRate();
            }
        }
    }
}

function createRect(){
    for(var i = 0; i<rectY.length; i++){
        var j = order[i];
        var y = rectY[j] + windowHeight/2;
        var btype = 'play';
        noStroke();
        fill(255, abs(rectY[j])+60, 217,opaq);
        if(SongPlaying == j){
            btype = 'pause';
            fill(255, 30, 100,opaq);
        }
        rect(x,y-15,500,100);
        if(song[j].isLoaded()){
            var o = opaq;
            if(SongPlaying ==j ){
                o = 255;
            }
            stroke(255,255,255,o);    
            Pbutton(x+30,y+30,bsize[j],btype);
            var tline = createVector(x+50+(350*CurTimes[j]/song[j].duration()),y+60);
            strokeWeight(1);
            if(mouseBox == j){
                strokeWeight(3);
            }
            stroke(0,0,0,o);
            line(x+50,y+60,x+400,y+60);
            stroke(255,255,255,o);
            line(x+50,y+60,tline.x,tline.y);
            
            noStroke();
            fill(255,255,255,opaq);
            strokeWeight(1);
            text(translateNames(allInfo[j].title),250,y+30);
            text(translateTimes(CurTimes[j]),x+410,y+60);
            text(translateTimes(song[j].duration()),x+450,y+60);
        }
        else{
            fill(255);
            text('Loading',x+200,y);
        }
    }
}

function translateTimes(secs){
    var mins = floor(secs/60);
    var seconds = str(round(secs)-(mins*60));
		if(seconds<10){
			seconds = "0"+seconds;
		}
    var string = (mins+":"+seconds);
    return string;
}

function translateNames(name){
    var string = str(allInfo[0].user.name)+' - '+str(name);
    return string;
}


function Pbutton(x,y,s,pp){
    if(pp === 'play'){
      strokeWeight(1);
      var x1 = x-(s/2);
      var x2 = x+s;
      var y1 = y-sqrt(pow(s,2)-pow(s/2,2));
      var y2 = y;
      var y3 = y+sqrt(pow(s,2)-pow(s/2,2));
      triangle(x1,y1,x2,y2,x1,y3);
    }
    else{
      strokeWeight(2);
      s+=5
      line(x-(s/4),y+(s/2),x-(s/4),y-(s/2));
      line(x+(s/4),y+(s/2),x+(s/4),y-(s/2));
    }
}

function posRect(rel){
  for(var i = 0; i<rectY.length; i++){
    var y;
    var dist = rectY.length;
    var p = mod(((rel/100)-i),dist)-(dist/2);
    if(p>0){
       y = (steep/(p+1))-steep;
    }
    else{
       y = ((steep/(p-1))+steep);
    }
    rectY.splice(i,1,y);
  }
}

var AllBoxes = [];
class box{
	constructor(x,y,id){
		this.x = x;
		this.y = y;
		this.id = id;
	}
	calc(){
			var y;
			var dist = AllBoxes.length;
			var p = mod(((rel/100)-this.id),dist)-(dist/2);
			if(p>0){
				 y = (steep/(p+1))-steep;
			}
			else{
				 y = ((steep/(p-1))+steep);
			}
			this.y = y;
	}
}

function setOrder(){
  for(var i = 0; i<rectY.length; i++){
    var ord = rectY.length-1;
    for(var j = 0; j<rectY.length; j++){
      if(i==j){
        j++;
      }
      if(abs(rectY[i])>abs(rectY[j])){
         ord--;
      }
      if(abs(rectY[i])==abs(rectY[j])){
        if(rectY[i]>rectY[j]){
          ord--;
        }
      }
    }
    order[ord] = i;
  }
}

var specHistory = [];
var lineDetail = 25;
var specDetail = 5;
var dragged = false;
function drawSpectrum(){
    if(specHistory.length<100){
        specHistory.push(0);
    }
    else{
        var spectrum = fft.analyze();
        speed = 0;
        specHistory.splice(0,0,spectrum);
        specHistory.pop();
        stroke(255)
        noFill();
        strokeWeight(1);
        for(var j = 0; j<lineDetail; j++){
            var c = (100/lineDetail*j)*6
            beginShape();
            var tempSpec = specHistory[j];
            for(var i = 0; i<tempSpec.length; i+=specDetail){
                amp = map(tempSpec[i],0,256,400,100);
                var tX = i*(640/detail)+width/2;
                vertex(tX-c,amp+i*(128/detail)+c/4);
            }
            endShape();
        }
    }
}

function detailBar(){
    textFont()
    text('zoom',x,630);
    var mOver;
    if(!mouseClicked){
        dragged = false;
    }
    if(dragged){
        lineDetail = round(constrain((mouseX-x)/5,1,100));
    }
    if(mouseX>x&&mouseX<x+500&&mouseY>630&&mouseY<670){
        mOver = true;
        strokeWeight(5);
        if (mouseClicked){  
            dragged = true;
        }
        
    }
    else{
        mOver = false;
        strokeWeight(2);
    }
    stroke(0);
    line(x,650,x+500,650);
    stroke(255);
    line(x,650,x+(lineDetail*5),650);
    if(mOver||dragged){
        ellipse(x+(lineDetail*5),650,10);
    }
}