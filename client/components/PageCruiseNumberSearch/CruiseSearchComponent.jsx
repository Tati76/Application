CruiseSearch= React.createClass({
	getInitialState(){
		var tempObject = {};
		var tempArray = [];
		return {
			year : "",
			ship : ""
		};
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


	makeXMLHttpRequest : function(url,callback)
	{
		var xhr = this.getXMLHttpRequest();

		xhr.onreadystatechange = function() {
			if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
				console.log("OK"); // C'est bon \o/
				console.log(xhr.responseText); // Données textuelles récupérées		
				callback(xhr.responseText);
				return JSON.parse(xhr.responseText);
			}
		};


		xhr.open("GET", url, true);
		xhr.send(null);

	},

	readData: function(sData) {
		console.log(JSON.parse(sData));
		//this.setState({toktFileObject : JSON.parse(sData), toktFileArray : JSON.parse(sData).slice()});
		
		// On peut maintenant traiter les données sans encombrer l'objet XHR.
		
	},


	handleClick: function(event)
	{
		console.log(this.makeXMLHttpRequest("http://tomcat7.imr.no:8080/DatasetExplorer/v1/count/Forskningsfart%C3%B8y",this.readData));
		//this.makeXMLHttpRequest("http://tomcat7.imr.no:8080/DatasetExplorer/v1/count/Forskningsfart%C3%B8y/2016",this.readData);
		
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

	render(){
		console.log("render CruiseSearch");
		return(
			<div className='container-fluid'>
				<YearSelectComponent onClick={this.onYearClick}/>
				<ShipSelectComponent year={this.state.year} onClick={this.onShipClick}/>
				<CruiseDisplayComponent year={this.state.year} ship={this.state.ship}/>
			</div>
		);
	}
});

