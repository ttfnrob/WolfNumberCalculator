// NEED SOME NUMBERS AND VALUES TO START
window.num = 1;
window.obs = "default"
window.minnum = 1;
window.maxnum = 26;
window.marker_count = 0;

//INITIALISE SVG
var skymap = Raphael("skymap", "100%", "100%");
var sketchpad = Raphael("paper", "100%", "100%");

// INITIALISE
var start = function(){
    // storing original coordinates
    this.ox = this.attr("cx");
    this.oy = this.attr("cy");
    this.oo = this.attr("opacity");
    this.attr({opacity: 1.0});      
},
move = function (dx, dy) {
    // move will be called with dx and dy
    this.attr({cx: this.ox + dx, cy: this.oy + dy});
},
up = function () {
    this.attr({opacity: this.oo});        
};

var myImg = new Image();
myImg.src = loadURL();
myImg.onload = function() {
  var width = myImg.width;
  var height = myImg.height;
  var scale = (560/width);

  var c = skymap.image(loadURL(), 0, 0, width*scale, height*scale);
}

$("#info").click( function(){
  $("#about").toggle();
});

$("#about").click( function(){
  $("#about").toggle();
});

$("#forward1").click( function(){
  incrementValue(+1); 
});

$("#forward5").click( function(){
  incrementValue(+5); 
});

$("#back1").click( function(){
  incrementValue(-1); 
});

$("#back5").click( function(){
  incrementValue(-5); 
});

$("#data-source").change(function(){
  var base = "";
  if (document.URL.split('?')[0]) {
    base = document.URL.split('?')[0];
  } else {
    base = document.URL;
  }
  if (this.value === "default"){
    document.location = base;
  } else {
    document.location = base+"?url="+this.value;
  }
}); 

$('#paper').on('dblclick', function(evt) {
   
  base = $('#paper').offset();
  var x = evt.clientX - base.left;
  var y = evt.clientY - base.top;
   
  col = "#7ACDFF";

  var ctext = sketchpad.set();
  c = sketchpad.circle(x-4 ,y-4,16).attr({ fill: col });
  var text = sketchpad.text(x-4, y-4, "1").attr({fill: '#000000', 'font-size': 14});

  var plus = sketchpad.set();
  cplus = sketchpad.circle(x+20 ,y-4,8).attr({ fill: "#000000" })
  .click(function () {
    num = parseInt(text.attr('text'));
    text.attr('text', num+1);
    updateQuick();
  });

  tplus = sketchpad.text(x+20, y-4, "+").attr({fill: '#ffffff'})
  .click(function () {
    num = parseInt(text.attr('text'));
    text.attr('text', num+1);
    updateQuick();
  });
  plus.push(cplus,tplus);

  var minus = sketchpad.set();
  cminus = sketchpad.circle(x-28 ,y-4,8).attr({ fill: "#000000" })
  .click(function () {
    num = parseInt(text.attr('text'));
    if (num>0) { text.attr('text', num-1)};
    updateQuick()();
  });
  tminus = sketchpad.text(x-28, y-4, "-").attr({fill: '#ffffff'})
  .click(function () {
    num = parseInt(text.attr('text'));
    if (num>0) { text.attr('text', num-1)};
    updateQuick()();
  });
  minus.push(cminus,tminus);

  text.node.setAttribute('id', "number-"+marker_count);
  text.id = "number_"+marker_count;

  c.node.setAttribute('class', "button set-"+marker_count);
  text.node.setAttribute('class', "text maintext button set-"+marker_count);
  cplus.node.setAttribute('class', "button set-"+marker_count);
  tplus.node.setAttribute('class', "button set-"+marker_count);
  cminus.node.setAttribute('class', "button set-"+marker_count);
  tminus.node.setAttribute('class', "button set-"+marker_count);

  ctext.push(c,text,plus,minus);
  ctext.drag(mover(ctext), dragger); 

  marker_count+=1;
  updateQuick();

  $(".button").dblclick(function (e) {
    e.stopPropagation();
});
});

$("#undo").click( function() {
  undo();
});

$('input[name="finish"]').click(function (){
  postMarkersAndSave(window.imageID)
});

$('input[name="save"]').click(function (){
  postMarkers(window.imageID)
});
