
//var w = 850; //1000
//var h = 700;
//var hat = 8;   //4  //6 karte //8 umschlag
var flowie;
var wid; 
var hei;
var params = [];

var col = true;
var box = false;
var shuffle = false;
var colors = [];

function test(val){
    alert(val);
}    

function clear(){
    paper.project.activeLayer.removeChildren();
    //paper.view.draw();
}

function rand(min, max){

    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function render(val){
    
    switch(val){
        case "New Leaves":
            params = [];
            break;
        case "Shuffle Colors":
            shuffle = true;
            break;
        case "New Colors":
            colors = [];
            break;
        case "lineart":
            col = false;
            break;
        case "colored":
            col = true;
            break;
        case "inbox":
            box = true;
            break;
        case "nobox":
            box = false;
            break;
    }
    
    if(flowie != null){
        flowie.remove();
    }
    
    

    
    flowie = new Flower(col, box, 500,500,8, colors, shuffle, params);
    colors = flowie.colorArr;

    shuffle = false;
    flowie.move(new Point(wid/3-250,hei/2-250));
    
    params = flowie.params;
    
}

function gui(val){
    switch(val){
        case "lineart":
            document.getElementById("shufflebtn").disabled = true;
            document.getElementById("newcolbtn").disabled = true;
            break;
        case "colored":
            document.getElementById("shufflebtn").disabled = false;
            document.getElementById("newcolbtn").disabled = false;
            break;
    }
}

function genFlower(val){   
    
    gui(val);
    
    setTimeout(function() {
        render(val);
    }, 100);
    
}




var t;
paper.install(window);
window.onload = function() {
  paper.setup('myCanvas');
  
    wid = window.innerWidth;//document.body.clientWidth;
    hei = window.innerHeight;
  
    genFlower();
    


  //fabric
  /*for(var i = 0; i<23; i++){
      for(var j = 0; j<10; j++){
        var diff = 0;
        if(j%2==1){
            diff = -200;
        }
        var flowie = new Flower(true, false, 500,500,8);
        flowie.move(new Point(400*i+diff,300*j+150));
        console.log(i+" "+j);
      }
  }*/
  t = new Tool();
   t.onKeyUp = function(event) {
      if(event.character == "Y") {
           downloadAsSVG();
      } 
   }
}

var downloadAsSVG = function (fileName) {

   if(!fileName) {
       fileName = "paperjs_example.svg"
   }

   var url = "data:image/svg+xml;utf8," + encodeURIComponent(paper.project.exportSVG({asString:true}));

   var link = document.createElement("a");
   link.download = fileName;
   link.href = url;
   link.click();
}




