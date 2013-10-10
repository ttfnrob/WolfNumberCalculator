
function executeGLORIA(url,callback) {
	// Define base of GLORIA endpoints
	var baseGLORIA = "https://venus.datsi.fi.upm.es:8443";
	var contextID = "114";
	this_url = baseGLORIA+url.replace("contextID",contextID);
	
	// Perform AJAX request
	$.ajax({
		url: this_url,
		type: 'GET',
		dataType: 'json',
		success: function(data,textStatus) { console.log('success: '+ data); },
		erorr: function(xhr,textStatus,code) { console.log('error: '+ code); },
		beforeSend: function (xhr) {
    		xhr.setRequestHeader ("Authorization", "Basic cHVibGljLXdvbGY6R0xPUklBLWRlbW9uc3RyYXRvcg==");
		}
    })
	.done(function() {
		console.log( "second success" );
	})
	.fail(function(xhr,textStatus,errThrown) {
		console.log('error: ' + errThrown);
	})
	.complete(function(xhr, textStatus) {
        console.log(xhr.status);
        callback(xhr.status);
    });

}

function listPublicExperiments() {
	url = "/GLORIAAPI/experiments/offline/list";
	executeGLORIA(url, function(result) {
		console.log("API reports "+result);
	});
}

function listMyExperiments() {
	url = "/GLORIAAPI/experiments/active";
}

// 
function loadContext() {
	url = "/GLORIAAPI/experiments/context/contextID/execute/load";
}

function saveContext() {
	url = "/GLORIAAPI/experiments/context/contextID/execute/save";
}

function getExperimentDetails() {
	url = "/GLORIAAPI/experiments/context/contextID/";
}

function postMarkers() {
	url = "/GLORIAAPI/experiments/context/contextID/parameters/markers";
	// example_data = '{ "image": 18, "spots" : [
 //      {"n": 3, "x": 123, "y": 456},
 //      {"n": 6, "x": 67, "y": 89}
 //    ]}';
}