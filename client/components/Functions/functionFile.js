export function PrintHello() {
	console.log("hello");
};


export function getXMLHttpRequest() {
		var xhr = null;
		
		if (window.XMLHttpRequest || window.ActiveXObject) {  // creating a xmlHttpRequest object for many different browser versions
			if (window.ActiveXObject) {
				try {
					xhr = new ActiveXObject("Msxml2.XMLHTTP");
				} catch(e) {
					xhr = new ActiveXObject("Microsoft.XMLHTTP");
				}
			} else {
				xhr = new XMLHttpRequest(); 
			}
		} else {
			alert("Impossible to use XMLHTTPRequest...");
			return null;
		}
		// console.log("FUNCTION FILE FUNCTION");
		return xhr;
};


export function makeXMLHttpRequest(url,callback,options)
	{
		var xhr = getXMLHttpRequest();

		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
				// console.log("OK"); // C'est bon \o/
				//console.log(xhr.responseText); // Données textuelles récupérées		
				callback(xhr.responseText,options);
				return JSON.parse(xhr.responseText);
			}
		};


		xhr.open("GET", url, true);
		xhr.send(null);

};

export function dynamicSort(property) {
    	var sortOrder = 1;
	    if(property[0] === "-") {
	        sortOrder = -1;
	        property = property.substr(1);
	    }
	    return function(a,b){
	        var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
	        return result * sortOrder;
	    };
};