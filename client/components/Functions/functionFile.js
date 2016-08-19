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


export function makeHttpRequest(url,callback,options)
	{
		var xhr = getXMLHttpRequest();
		xhr.open("GET", url, true);
		xhr.setRequestHeader("Access-Control-Allow-Origin","http://localhost:3000/");
		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {

				callback(xhr.responseText,options);
			}
		};


		
		// Website you wish to allow to connect
	    // xhr.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

	    // // Request methods you wish to allow
	    // xhr.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

	    // // Request headers you wish to allow
	    // xhr.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

	    // // Set to true if you need the website to include cookies in the requests sent
	    // // to the API (e.g. in case you use sessions)
	    // xhr.setHeader('Access-Control-Allow-Credentials', true);
		xhr.send(null);

};

export function makeXMLHttpRequest(url,callback,options)
	{
		var xhr = getXMLHttpRequest();

		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
				
					callback(xhr.responseXML,options);
				}
			}


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

export function dateToStringOnlyDays(tempdate) {
		// console.log(String(tempdate).split(" "));
		var date = tempdate;
		var stringdate = "";
		stringdate += date.getDate() + '/' + (date.getMonth() + 1) + '/' +  date.getFullYear();
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
									// console.log(boxFile[i].forms[Object.keys(boxFile[i].forms)[b]][desiredLanguage][d]);
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

export function translate(word,desiredLanguage,boxType)
	{
		if(word != "_id" || word != "ID" || word != "Box Type")
		{
			if(word.split(" ")[0] == "Borrowing" || word.split(" ")[0] == "Storage"|| word.split(" ")[0] == "Låne" ||word.split(" ")[0] == "Lagrings")
			{
				var tempString = "";
				for(var i = 0 ; i<word.split(" ").length ; i++)
				{
					tempString += translateWord(word.split(" ")[i],desiredLanguage,boxType);
					if(i != word.split(" ").length-1)
					{
						tempString += " ";
					}
				}
				return tempString;
			}
			else
			{
				// console.log(word);
				return translateWord(word,desiredLanguage,boxType);
			}
		}
		else
		{
			return "ID";
		}
};



export function findAllPossibleAttributes(desiredLanguage)
{
	var tempArray = [];
	var tempOblidged = [];
	var tempIsCruise = [];
	var tempTest = [];
	// console.log("test");

	for (var i = 0 ; i<boxFile.length ; i++) // go through all the file 
	{

		for (var a = 0 ; a<Object.keys(boxFile[i].forms).length ; a++) // through all the keys of the forms in a box
		{
			// console.log(Object.keys(boxFile[i].forms));
			for (var b=0; b<boxFile[i].forms[Object.keys(boxFile[i].forms)[a]][desiredLanguage].length ; b++) // through the array of the selected form of the selected object
			{
				// console.log(boxFile[i].forms[Object.keys(boxFile[i].forms)[a]][desiredLanguage].length);
				// console.log(boxFile[i].forms[Object.keys(boxFile[i].forms)[a]].Norsk.length - boxFile[i].forms[Object.keys(boxFile[i].forms)[a]].English.length);
				if (tempArray.indexOf((boxFile[i].forms[Object.keys(boxFile[i].forms)[a]].prefix[desiredLanguage] + " " +boxFile[i].forms[Object.keys(boxFile[i].forms)[a]][desiredLanguage][b]).trim()) < 0) // the word is not in the array
				{
					// var pref = "";
					// if (boxFile[i].forms[Object.keys(boxFile[i].forms)[a]].hasOwnProperty('prefix'))
					// {
					// 	console.log( boxFile[i].forms[Object.keys(boxFile[i].forms)[a]]);
					// 	pref = boxFile[i].forms[Object.keys(boxFile[i].forms)[a]].prefix[desiredLanguage];
					// }
					tempArray.push((boxFile[i].forms[Object.keys(boxFile[i].forms)[a]].prefix[desiredLanguage] + " " +boxFile[i].forms[Object.keys(boxFile[i].forms)[a]][desiredLanguage][b]).trim());
					tempOblidged.push(false);
					tempIsCruise.push(boxFile[i].forms[Object.keys(boxFile[i].forms)[a]].cruiseSearch[b]);
					// tempTest.push({"prefix" : pref , "suffix" : boxFile[i].forms[Object.keys(boxFile[i].forms)[a]][desiredLanguage][b]});
				}
			}
		} 

	}
	// console.log(tempTest);
	// var finalArray = [];
	// for (var i = 0 ; i<tempTest.length ; i++)
	// {
	// 	finalArray.push(tempTest[i].prefix + " " + tempTest[i].suffix);
	// }
	var response = [[],[],[]];
	response[0] = tempArray.slice();
	response[1] = tempOblidged.slice();
	response[2] = tempIsCruise.slice();

	return response;

}