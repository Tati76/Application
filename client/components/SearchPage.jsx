import { InholdInfoDb } from '../../imports/api/inholdinfodb.js';


SearchPage = React.createClass({

	mixins: [ReactMeteorData],

	getMeteorData: function () {
		var data = {};
		var handle = Meteor.subscribe('inholdinfodb');
	    if(handle.ready()) {
	      	data.sample = InholdInfoDb.find().fetch();
	      	data.list = [];
	      	for (var i = 1 ; i< data.sample.length ; i++)
	      	{
	      		data.list.push(data.sample[i]._id);
	      	}
	      	console.log(data.list);
	    }
	    return data;
	},

	getInitialState(){

		
		// var xhr = createCORSRequest('GET', "http://tomcat7.imr.no:8080/DatasetExplorer/v1/html/main.html");
		// if (!xhr) {
		//   throw new Error('CORS not supported');
		// }
		// console.log(xhr);
		return null;

	},

	renderInfo(input,index) {
		
		return(
			<p key={index}> {input} </p>
		);
	},

	testCORS(){
		console.log("testCORS");
		// Create the XHR object.
		function createCORSRequest(method, url) {
		  var xhr = new XMLHttpRequest();
		  if ("withCredentials" in xhr) {
		    // XHR for Chrome/Firefox/Opera/Safari.
		    xhr.open(method, url, true);
		  } else if (typeof XDomainRequest != "undefined") {
		    // XDomainRequest for IE.
		    xhr = new XDomainRequest();
		    xhr.open(method, url);
		  } else {
		    // CORS not supported.
		    xhr = null;
		  }
		  return xhr;
		}

		// Helper method to parse the title tag from the response.
		function getTitle(text) {
		  return text.match('<element key="url">(.*)?</element>');
		}

		
			console.log("makeCorsRequest");
		  // All HTML5 Rocks properties support CORS.
		  var url = 'http://tomcat7.imr.no:8080/apis/nmdapi/echosounder/v1/find?cruisenr=2014101&shipname=G%20O%20Sars';

		  var xhr = createCORSRequest('GET', url);
		  if (!xhr) {
		    console.log('CORS not supported');
		    return;
		  }

		  // Response handlers.
		  xhr.onload = function() {
		    var text = xhr.responseText;
		    var title = getTitle(text);
		    console.log('Response from CORS request to ' + url + ':************ ' + title);
		  };
		  xhr.onload;

		  xhr.onerror = function() {
		    console.log('Woops, there was an error making the request.');
		  };

		  xhr.send();
		  console.log(xhr.responseXML);
		  var jsonText = JSON.stringify(xmlToJson(tite));
		  console.log(jsonText);
		  console.log($.get('http://tomcat7.imr.no:8080/DatasetExplorer/v1/html/main.html'));
	},

	render() {
		return(
			<div className="container">
				{this.data.sample? this.data.list.map(this.renderInfo) : <p>  Loading...  </p>}
			<button onClick={this.testCORS}>Hello </button>
			</div>
		);
	}
});