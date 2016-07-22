import boxFile from '../Boxes/BoxesInfo.json';
import settingsFile from '../languages/Settings.json';


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

export function dateToString(tempdate) {
		// console.log(String(tempdate).split(" "));
		var date = tempdate;
		var stringdate = "";
		stringdate += date.getDate() + '/' + (date.getMonth() + 1) + '/' +  date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" +date.getSeconds();
		return stringdate;
};				

export function translateWord(word,desiredLanguage,boxType) {
	// console.log("test");
	try{
		var resp = word;
		for(var i = 0 ; i<boxFile.length ; i++)
		{
			// console.log(1);
			var boxNameArray = Object.keys(boxFile[i].name).slice();
			for(var a = 0 ; a < boxNameArray.length ; a++) // for all the language
			{
				// console.log(2);
				if(boxFile[i].name[boxNameArray[a]] == boxType) // FoundTheBoxType
				{

					for(var b = 0 ; b<Object.keys(boxFile[i].forms).length ; b++) // in the keys of forms (content, storage or borrowing)
					{
						// console.log(3);
						for(var c = 0 ; c<boxNameArray.length ; c++) // for all the languages
						{
							// console.log(4);
							for(var d = 0 ;d<boxFile[i].forms[Object.keys(boxFile[i].forms)[b]][boxNameArray[c]].length ; d++)// for all the array
							{
								// console.log(5);
								if(boxFile[i].forms[Object.keys(boxFile[i].forms)[b]][boxNameArray[c]][d] == word)
								{
									console.log(boxFile[i].forms[Object.keys(boxFile[i].forms)[b]][desiredLanguage][d]);
									// return boxFile[i].forms[Object.keys(boxFile[i].forms)[b]][desiredLanguage][d];
									resp = boxFile[i].forms[Object.keys(boxFile[i].forms)[b]][desiredLanguage][d];
									break;
								}
							}
						}
					}
				}
			}	
		}
		// console.log(false);
		return resp;
	} catch(error)
	{
		console.log("ERROR : ",error);
		return false;
	}
	
};