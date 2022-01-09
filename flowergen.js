
//var w = 850; //1000
//var h = 700;
//var hat = 8;   //4  //6 karte //8 umschlag
var flowie;
var wid; 
var hei;
var params = [];

var col = true;
var box = false;
var boxWidth = 500;
var boxHeight = 500;
var shuffle = false;
var fill = true;
var colors = [];
var leaves = [];

var slider;


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
	case "fill":
	    fill = true;
            break;
	case "nofill":
	    fill = false;
            break;
        case "leaves":
            leaves = slider.noUiSlider.get();
            params = [];
            console.log("leaves: "+leaves);

            break;
        case "height":
            boxHeight = parseInt(document.getElementById("box-height").value) || boxHeight
        case "width":
            boxWidth = parseInt(document.getElementById("box-width").value) || boxWidth
    }
    
    if(flowie != null){
        flowie.remove();
    }
    
    
    const width = box ? boxWidth : 500
    const height = box ? boxHeight : 500
    
    flowie = new Flower(leaves, col, box, fill, width,height,8, colors, shuffle, params);
    colors = flowie.colorArr;
    document.getElementById("fillcolor1").value = colors[0].toCSS(true);
    document.getElementById("fillcolor2").value = colors[1].toCSS(true);
    document.getElementById("linecolor1").value = colors[2].toCSS(true);
    document.getElementById("linecolor2").value = colors[3].toCSS(true);

    shuffle = false;
    flowie.move(new Point(wid/3-(width / 2),hei/2-(height / 2)));
    
    params = flowie.params;
    
}

function changeColor(attr, value){
    switch(attr){
        case "fillcolor1":
            colors[0] = new Color(value);
            break;
        case "fillcolor2":
            colors[1] = new Color(value);
            break;
        case "linecolor1":
            colors[2] = new Color(value);
            break;
        case "linecolor2":
            colors[3] = new Color(value);
            break;
    }
    
    render();
}



function gui(val){
    switch(val){
        case "lineart":
            document.getElementById("shufflebtn").disabled = true;
            document.getElementById("newcolbtn").disabled = true;
            document.getElementById("fillcolor1").disabled = true;
            document.getElementById("fillcolor2").disabled = true;
            document.getElementById("linecolor1").disabled = true;
            document.getElementById("linecolor2").disabled = true;
            break;
        case "colored":
            document.getElementById("shufflebtn").disabled = false;
            document.getElementById("newcolbtn").disabled = false;
            document.getElementById("fillcolor1").disabled = false;
            document.getElementById("fillcolor2").disabled = false;
            document.getElementById("linecolor1").disabled = false;
            document.getElementById("linecolor2").disabled = false;
            break;
    }
    if (val === "inbox") {
        document.getElementById("box-size").classList.remove("hidden")
    } else if (val === "nobox") {
        document.getElementById("box-size").classList.add("hidden")
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
    
    
  slider = document.getElementById('slider');

    noUiSlider.create(slider, {
        start: [27, 32],
        connect: true,
        tooltips: [true, true],
        step: 1,
        range: {
            'min': 1,
            'max': 50
        }
    });  
    
    slider.noUiSlider.on('change.one', function () { 
        genFlower("leaves");
    });
    
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
  
}

function downloadSVG(){
    var svg = project.exportSVG({ asString: true });    
    var svgBlob = new Blob([svg], {type:"image/svg+xml;charset=utf-8"});
    var svgUrl = URL.createObjectURL(svgBlob);
    var downloadLink = document.createElement("a");
    downloadLink.href = svgUrl;
    downloadLink.download = "overflower.svg";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
}




