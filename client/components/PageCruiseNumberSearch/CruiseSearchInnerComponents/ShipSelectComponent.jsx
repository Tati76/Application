ShipSelectComponent= React.createClass({

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
		this.setState({shipFile : JSON.parse(sData)});
		// On peut maintenant traiter les données sans encombrer l'objet XHR.
		
	},

	getInitialState(){
		var tempObject = {};
		var tempUrl = "http://tomcat7.imr.no:8080/DatasetExplorer/v1/count/Forskningsfart%C3%B8y/"
		tempUrl += this.props.year;
		console.log(tempUrl);

		return {
			year : this.props.year,
			url : tempUrl,
			shipFile : tempObject
		};
	},

	componentDidMount()
	{
		this.makeXMLHttpRequest(this.state.url,this.readData);
		
	},

	componentWillReceiveProps: function(nextProps) {
		var tempUrl = "http://tomcat7.imr.no:8080/DatasetExplorer/v1/count/Forskningsfart%C3%B8y/"
		tempUrl += nextProps.year;
		this.setState({
			year : nextProps.year,
			url : tempUrl,
		});
		this.makeXMLHttpRequest(tempUrl,this.readData);
		//the shipFile will change when the component did mount

	},

	shouldComponentUpdate: function(nextProps, nextState) {
		var shallowCompare = require('react-addons-shallow-compare');
		return shallowCompare(this, nextProps, nextState);
	},

	componentDidUpdate: function(prevProps, prevState){ 

	},

	renderShip(input, index)
	{
		if (this.state.year != "")
		{
			return(
				<option> {this.state.shipFile[input].name} </option>
			);
		}
		else
		{
			return null ;
		}
		
	},

	render(){
		console.log('render ShipSelectComponent');
		if (this.props.year != "")
		{
			return(
				<div className='container-fluid'>
					<select className="form-control input" onClick={this.props.onClick}>
						<option value="" hidden>Please select a ship</option>
						{this.state.shipFile? Object.keys(this.state.shipFile).map(this.renderShip) : <option> Loading </option>}
					</select>
				</div>		
			);
		}
		else{

			return(
				<div className='container-fluid'>
					<select className="form-control input" onClick={this.props.onClick}>
						<option value="" hidden>Please select a year first</option>
					</select>
				</div>		
			);

		}
	}
});