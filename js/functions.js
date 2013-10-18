function getURLParameter(name) {
    return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.search)||[,""])[1].replace(/\+/g, '%20'))||null;
}

function dec2hex(i) {
   return (i+0x10000).toString(16).substr(-2).toUpperCase();
}

function circles2JSON() {
	output = "id,x,y,day\n"
	$("circle").each(function( index ) {
		output+=index + "," + $(this).attr('cx') + "," + $(this).attr('cy') + "," + $(this).attr('class') + "\n";
	});
	return output
}

function paths2JSON() {
  output = "id,x1,y1,x2,y2,day\n"
  $("path").each(function( index ) {
    coords = $(this).attr('d').split("M")[1].replace("L",",").split(",")
    output+=index + "," + coords[0] + "," + coords[1] + "," + coords[2] + "," + coords[2] + "," + $(this).attr('class') + "\n";
  });
  return output
}

function dragger() { 
    this.dx = this.dy = 0; 
}; 

function mover(s) { 
    return function(dx, dy) {    // store reference to the set in the closure (there is no way of referencing it from Elements) 
        (s || this).translate(dx - this.dx, dy - this.dy); 
        this.dx = dx; 
        this.dy = dy; 
    } 
}; 

function undo(){
  if (marker_count>0) {
    $(".set-"+(marker_count-1)).remove();
    marker_count = marker_count-1
  }
}

function spotCount(){            
  var sum = 0;
  var all = $(".text tspan");
  $(all).each(function() {              
    var sents = $(this).text();
    sum = sum + Number(sents);
  });
  return sum;
}

function getWolf(){
  k = 1;
  G = marker_count;
  var s = spotCount();
  var W = k*((10*G)+s);
  return W;
}

function updateQuick() {
  if (marker_count > 0) {
    if (spotCount()>0) {
      $("#wolf-contents").text("Wolf Number: R="+getWolf());
    } else {
      $("#wolf-contents").text("Indicate number of spots in group using +/- buttons");
    }
  } else {
    $("#wolf-contents").text("Double-click to mark a sunspot group.");
  }
}

function checkSourceURL() {
  if (getURLParameter("url")) {
    $('option:selected', 'select').removeAttr('selected');
    $("option[value='"+getURLParameter("url")+"']").attr('selected', 'selected');
  }
}

function loadURL() {
  if (getURLParameter("url")) {
    return getURLParameter("url");
    checkSourceURL();
  } else {
    return "data/"+window.obs+"/1.jpg";
  }
}

function resetImage(){
  $(".button").remove();
  marker_count = 0;
  updateQuick();
}
