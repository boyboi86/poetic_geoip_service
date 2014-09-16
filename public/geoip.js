function GeoIP() {
	var locateUrl = "http://localhost:4000/locate";

	//locate function, success or fail callbacks will be triggered
	//once the request to the server is finished
	this.locate = function(successCallback,failCallback) {
		var xhr = new XMLHttpRequest();
		xhr.open("GET", locateUrl, true);
		xhr.onload = function (e) {
  		if (xhr.readyState === 4) {
  			json = JSON.parse(xhr.responseText);
  			if(successCallback) successCallback(json.ip,json.location);
  	  } else {
    	  console.error(xhr.statusText);
    	}
    }
    xhr.send();
  }
}



