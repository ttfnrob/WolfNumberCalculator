function executeGLORIA(url,callback) {
	// Define base of GLORIA endpoints
	// var baseGLORIA = "https://ws.users.gloria-project.eu:8443"; //Production
	// var baseGLORIA = "https://venus.datsi.fi.upm.es:8443"; // HTTPS
	var baseGLORIA = "http://venus.datsi.fi.upm.es:8080"; //HTTP
	var contextID = "114";
	this_url = baseGLORIA+url.replace("contextID",contextID);
	
	// Perform AJAX request
	$.ajax({
		url: this_url,
		type: 'GET',
		dataType: 'json',
		beforeSend: function (xhr) {
    		xhr.setRequestHeader ("Authorization", "Basic "+btoa("public-wolf:GLORIA-demonstrator"));
		}
    })
	.done(function(data, textStatus) {
		callback(data);
	})
	.fail(function(xhr,textStatus,errThrown) {
		console.log('error: ' + textStatus);
	})
	.complete(function(xhr, textStatus) {
        console.log("API responds with: " + xhr.status);
    });
}

function postGLORIA(url,data,callback) {
	// Define base of GLORIA endpoints
	// var baseGLORIA = "https://ws.users.gloria-project.eu:8443"; //Production
	// var baseGLORIA = "https://venus.datsi.fi.upm.es:8443"; // HTTPS
	var baseGLORIA = "http://venus.datsi.fi.upm.es:8080"; //HTTP
	var contextID = "114";
	this_url = baseGLORIA+url.replace("contextID",contextID);
	
	// Perform AJAX request
	$.ajax({
		url: this_url,
		type: 'POST',
		data: "\""+data+"\"",
		dataType: 'json',
		contentType:"application/json",
		beforeSend: function (xhr) {
    		xhr.setRequestHeader ("Authorization", "Basic "+btoa("public-wolf:GLORIA-demonstrator"));
		}
    })
	.done(function(data, textStatus) {
		callback(data);
	})
	.fail(function(xhr,textStatus,errThrown) {
		console.log('error: ' + textStatus);
	})
	.complete(function(xhr, textStatus) {
        console.log("API responds with: " + xhr.status);
    });

}

function listPublicExperiments() {
	url = "/GLORIAAPI/experiments/offline/list";
	executeGLORIA(url, function(result) {
		//Callback function for API response
		console.log("Offline Experiments:");
		$.each( result, function( key, value ) {
		  console.log( key + ": " + value );
		});
	});
}

function listMyExperiments() {
	url = "/GLORIAAPI/experiments/active";
	executeGLORIA(url, function(result) {
		//Callback function for API response
		console.log("Offline Experiments:");
		$.each( result, function( key, value ) {
		  console.log( key + ": " + value );
		});
	});
}

function setDate(dateString) {
	url = "/GLORIAAPI/experiments/context/contextID/parameters/date";
	postGLORIA(url, dateString, function(result) {
		//Callback function for API response
		console.log("Date set.");
	});
}

function loadContext(dateString) {
	url = "/GLORIAAPI/experiments/context/contextID/execute/load/";
	executeGLORIA(url, function(result) {
		//Callback function for API response
		console.log("Loaded experiment.");
	});
}

function saveContext() {
	url = "/GLORIAAPI/experiments/context/contextID/execute/save";
	executeGLORIA(url, function(result) {
		//Callback function for API response
		console.log("Saved experiment.");
	});
}

function getExperimentDetails() {
	url = "/GLORIAAPI/experiments/context/contextID/";
	executeGLORIA(url, function(result) {
		//Callback function for API response
		console.log("Experiment details:", result);
		loadExperimentImage(result);
	});
}

function postMarkers(ImageID) {
	url = "/GLORIAAPI/experiments/context/contextID/parameters/markers";
	the_data = markers2JSON(ImageID);
	// example_data = '{ "image": '+ImageID+', "spots" : [ {"n": 3, "x": 123, "y": 456}, {"n": 6, "x": 67, "y": 89} ] }';
 	postGLORIA(url, the_data, function(result) {
		//Callback function for API response
		console.log("Posted marker positions.");
	});
}

function postMarkersAndSave(ImageID) {
	url = "/GLORIAAPI/experiments/context/contextID/parameters/markers";
	the_data = markers2JSON(ImageID);
	// example_data = '{ "image": '+ImageID+', "spots" : [ {"n": 3, "x": 123, "y": 456}, {"n": 6, "x": 67, "y": 89} ] }';
 	postGLORIA(url, the_data, function(result) {
		//Callback function for API response
		console.log("Posted marker positions.");
		setupExperiment();
	});
}

function loadExperimentImage(result) {
	var myImg = new Image();
	window.imageID = result.image.id;
	myImg.src = result.image.jpg;
	console.log(myImg.src);
	myImg.onload = function() {
		$("#skymap").empty();
		var skymap = Raphael("skymap", "100%", "100%");
		var width = myImg.width;
		var height = myImg.height;
		var scale = (560/width);
		var c = skymap.image(myImg.src, 0, 0, width*scale, height*scale);
	}
}

function markers2JSON(ImageID) {
	output = '{"image":'+ImageID+', "spots":[';
	list = [];
	$(".maintext").each(function( index ) {
		list[index] = '{"'+index + '":[' + '{"x":'+$(this).attr('x') + '},' + '{"y":'+$(this).attr('y') + "}," + '{"n":'+$(this).children("tspan").text()+'}' + ']}';
	});
	output+=list.join()+']}';
	return output;
}

function setupExperiment() {
	resetImage()
	setDate("2013-08-03T00:00:00");
	loadContext();
	getExperimentDetails();
}
