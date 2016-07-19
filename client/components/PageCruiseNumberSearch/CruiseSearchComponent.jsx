CruiseSearch = React.createClass({
	getInitialState(){
		var tempObject = {};
		var tempArray = [];
		return {
			year : "",
			ship : "",
			startTime : new Date(),
			stopTime : new Date(),
			chosenDate : new Date()
		};
	},

	dateInBetween(date)
	{
		if (date >= this.state.startTime && date <= this.state.stopTime)
		{
			return "true";
		}
		else{
			return "false";
		}
	},

	getXMLHttpRequest:function () {
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
			alert("Votre navigateur ne supporte pas l'objet XMLHTTPRequest...");
			return null;
		}
		
		return xhr;
	},


	makeXMLHttpRequest : function(url,callback,dataType)
	{
		var xhr = this.getXMLHttpRequest();

		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
				console.log("OK"); // C'est bon \o/
				switch(dataType)
				{
					case "json" :
					callback(JSON.parse(xhr.responseText));
					case "XML" : 
					callback(xhr.responseXML);
				}
				//console.log(xhr.responseText); // Données textuelles récupérées		
				//callback(xhr.responseXML);
				//return JSON.parse(xhr.responseText);
			}
		};


		xhr.open("GET", url, true);
		xhr.send(null);

	},

	readData: function(sData) {
		console.log(sData);
    	var startTime = sData.getElementsByTagName("startTime")[0].childNodes[0].nodeValue;
    	var stopTime = sData.getElementsByTagName("stopTime")[0].childNodes[0].nodeValue;
    	console.log(startTime);
    	console.log(typeof startTime);
    	var tempStartDate = new Date(startTime);
    	console.log(tempStartDate);
    	console.log(stopTime);
    	console.log(typeof stopTime);
    	var tempStopDate = new Date(stopTime);
    	this.setState({startTime : tempStartDate, stopTime : tempStopDate});
    	console.log(tempStopDate);
    	console.log(tempStartDate.getDate() - tempStopDate.getDate());
		console.log(typeof sData);
		
		//this.setState({toktFileObject : JSON.parse(sData), toktFileArray : JSON.parse(sData).slice()});
		
		// On peut maintenant traiter les données sans encombrer l'objet XHR.
		
	},

	handleClick: function(event)
	{
		//this.makeXMLHttpRequest("http://tomcat7.imr.no:8080/DatasetExplorer/v1/count/Forskningsfart%C3%B8y",this.readData,"json");
		//this.makeXMLHttpRequest("http://tomcat7.imr.no:8080/DatasetExplorer/v1/count/Forskningsfart%C3%B8y/2016",this.readData);
		this.makeXMLHttpRequest("http://tomcat7-test.imr.no:8080/apis/nmdapi/cruise/v1/Forskningsfart%C3%B8y/2016/Dr%20Fridtjof%20Nansen-LGWS/4-2016-1172-1",this.readData,"XML");
		
	},

	componentWillReceiveProps: function(nextProps) {

	},

	shouldComponentUpdate: function(nextProps, nextState) {
		var shallowCompare = require('react-addons-shallow-compare');
		return shallowCompare(this, nextProps, nextState);
	},

	componentDidUpdate: function(prevProps, prevState){ 

	},

	onYearClick(event)
	{
		console.log(event.target.value);
		if(event.target.value != this.state.year)
		{
			this.setState({year : event.target.value, ship : ""});
		}
		
	},

	onShipClick(event)
	{
		console.log(event.target.value);
		if(event.target.value != this.state.ship)
		{
			this.setState({ship : event.target.value});
		}
	},

	dateChange(event)
	{
		console.log(event.target.value);
		console.log(typeof event.target.value);
		console.log(new Date(event.target.value));
		this.setState({chosenDate : new Date(event.target.value)});
	},

	render(){
		console.log("render CruiseSearch");
		return(
			<div className='container-fluid'>
				<button onClick={this.handleClick}> CLick </button>
				<input type="date" id="myDate" onChange={this.dateChange}/>
				<p> Date in between : {this.dateInBetween(this.state.chosenDate)} </p>
				<DynamicForm language={this.props.language} index={this.props.index} info={[["Date","Ship","Cruise Number","Test"],[true,false,true,false],[1,2,3,0]]}/>
				<SelectBoxTypeComponent language={this.props.language} index={this.props.index}  />
			</div>
		);
	}
});

// <YearSelectComponent onClick={this.onYearClick}/>
// 				<ShipSelectComponent year={this.state.year} onClick={this.onShipClick}/>
// 				<CruiseDisplayComponent year={this.state.year} ship={this.state.ship}/>