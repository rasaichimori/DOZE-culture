var allSlides = [//for the gallery
    'gallery/artist-page.png',
    'gallery/lil-girl.png',
    'gallery/phone-girl.png',
    'gallery/dark-man.png',
    'gallery/skull.png',
    'gallery/flower.png',
    'gallery/dark-dragon.png',
    'gallery/light-dragon.png',
    'gallery/mask1.png'
];

var allSongs = [
    'songs/gold.mp3',
    'songs/lona.mp3',
    'songs/Emergence.mp3',
    "songs/almond%20island.wav",
    "songs/five%20-%20arrow%20arrow.mp3",
    "songs/BOP.BACK.wav",
    "songs/eventide.wav",
    "songs/five%20-%20gosh.mp3",
    "songs/glass%20soda.wav",
    "songs/rai.%20-%2010%20second%20jam%20(episode%204).mp3",
];

var allWalkFrames = [
    
];

var up;
var bgslide = [];
var song = [];


//for animate

var bg;
var g = 0;

// for lightbox
var lightbox, lightboxC;

var slidenum = 0;
//lightbox background and content


var songs = [];
var order = [];
var played = [];
var bsize = [];
var CurTimes = [];
var fft;
var detail = 256;
// for music




//for back button button
var bx, by;

var canvas;
var offwidth;

var loadingPercent = 0;
var loading = true;

function soundIsLoaded(songs){
    loading = false;
}

function imageIsLoaded(image,length){
    loading = false;
    loadingPercent += (1/length);
}


function setup(){
    fontStrange = loadFont('/public/fonts/Strange.ttf');
    fontAmatic = loadFont('/public/fonts/AmaticSC-Regular.ttf')
    
    if(page == 'gallery'){
        for (var i =0; i<(allSlides.length); i++){
            bgslide[i] = loadImage(allSlides[i],imageIsLoaded(allSlides.length));
            
        }
    }
    
    if(page == 'music'){
        fft = new p5.FFT(0.85,detail);
        for (var i =0; i<(allSongs.length); i++){
            song[i] = loadSound(allSongs[i],soundIsLoaded);
            songs.push(0);
            order.push(0);
            played.push(0);
            bsize.push(0);
            CurTimes.push(0);
        }
    }
    
    if(page == 'doze'){
        up = loadImage('sleep/up.png');
        for (var i =1; i<27; i++){
            loading = true;
            bgslide[i-1] = loadImage('sleep/frame'+[i]+'.png',imageIsLoaded(26));
        }
    }
    
    if(page == 'walk'){
        for (var i=0; i<12; i++){
            loading = true;
//            bgslide[i] = loadImage('frames/frame3.png',imageIsLoaded(13));
            bgslide[i] = loadImage('frames/frame'+[i]+'.png',imageIsLoaded(13));
        }
    }
    
    if(page == 'clothes'){
        loading = false;
    }
    if(page == 'contact' || page == 'main'){
        loading = false;
        for (var i = 0; i < 50; i++) {
            Alldots[i] = new dot(
              random(0, windowWidth), //xposition
              random(0, windowHeight), //yposition
              random(-5, 5), //xspeed
              random(-5, 5), //yspeed
              i
            );
            allPosx.push(0);
            allPosy.push(0);
          }
    }
    canvas = createCanvas(600,600);
    canvas.parent("lightbox-c");
    bg = select('.background'); //background
    lightbox = select('.lightbox');
    lightboxC = document.getElementById('lightbox-c');
    changeSize();
}

function openLb(){
    lightbox.style('display','block');
    changeSize();
}
function closeLb(){
    lightbox.style('display','none');
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
    if(page == 'gallery'){
        resizeCanvas(offwidth, offwidth, true);
    }
    else
    {
        resizeCanvas(offwidth, windowHeight, true);
    }
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



var pages = ['music','clothes','gallery','contact','walk','doze','about'];


function loadingScreen(){
    background(0);
    stroke(255);
    fill(255);
    textSize(26);
    textFont(fontStrange);
    text('l o a d i n g',height/2-23,height/2);
    text(round(loadingPercent*100),height/2,height/2+40);
    line(height/4,height*(3/4),height*(3/4),height*(3/4));
    stroke('pink');
    line(height/4,height*(3/4),height/2*loadingPercent+(height*1/4),height*(3/4));
}