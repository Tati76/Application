CruiseDisplayComponent= React.createClass({

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
			alert("Impossible to use XMLHTTPRequest...");
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
		this.setState({cruiseFile : JSON.parse(sData)});
		// On peut maintenant traiter les données sans encombrer l'objet XHR.
		
	},

	getInitialState(){
		var tempObject = {};
		var tempUrl = "http://tomcat7.imr.no:8080/DatasetExplorer/v1/count/Forskningsfart%C3%B8y/"
		tempUrl += this.props.year;
		tempUrl += "/";
		tempUrl += this.props.ship;
		console.log(tempUrl);

		return {
			year : this.props.year,
			url : tempUrl,
			ship : this.props.ship,
			cruiseFile : tempObject
		};
	},

	componentDidMount()
	{
		this.makeXMLHttpRequest(this.state.url,this.readData);
		
	},

	componentWillReceiveProps: function(nextProps) {
		var tempUrl = "http://tomcat7.imr.no:8080/DatasetExplorer/v1/count/Forskningsfart%C3%B8y/"
		tempUrl += nextProps.year;
		tempUrl += "/";
		tempUrl += nextProps.ship;
		this.setState({
			year : nextProps.year,
			url : tempUrl,
			ship : nextProps.ship
		});
		this.makeXMLHttpRequest(tempUrl,this.readData);
		//the cruiseFile will change when the component did mount

	},

	shouldComponentUpdate: function(nextProps, nextState) {
		var shallowCompare = require('react-addons-shallow-compare');
		return shallowCompare(this, nextProps, nextState);
	},

	componentDidUpdate: function(prevProps, prevState){ 

	},

	renderCruise(input, index)
	{
		return(
			<p> {this.state.cruiseFile[input].name} </p>
		);
	},

	render(){
		console.log('render ShipSelectComponent');
		if (this.props.ship != "")
		{
			return(
				<div className='container-fluid'>
					{this.state.cruiseFile? Object.keys(this.state.cruiseFile).map(this.renderCruise) : <p> Loading </p>}
				</div>		
			);
		}
		else{

			return(
				<div className='container-fluid'>
					<p> No Cruise Yet </p>
				</div>		
			);

		}
	}
});