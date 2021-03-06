function GeoIP(forcedIP) {
	var locateUrl = "http://geoip.poeticoding.com/locate";

	//locate function, success or fail callbacks will be triggered
	//once the request to the server is finished
	this.locate = function(successCallback,failCallback) {
		var xhr = new XMLHttpRequest();
		if(forcedIP) locateUrl += "?ip="+forcedIP;
		xhr.open("GET", locateUrl, true);
		xhr.timeout = 60000;
		xhr.onload = function (e) {
  		if (xhr.readyState === 4) {
  			json = JSON.parse(xhr.responseText);
  			if(successCallback) successCallback(json.ip,json.location);
  	  } else {
    	  console.error(xhr.statusText);
    	}
    }
    xhr.ontimeout = function () { 
    	if(failCallback) failCallback();
    }

    xhr.send();
  }
}



