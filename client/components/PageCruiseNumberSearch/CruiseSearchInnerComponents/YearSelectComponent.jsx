YearSelectComponent= React.createClass({

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
		this.setState({yearFile : JSON.parse(sData)});
		// On peut maintenant traiter les données sans encombrer l'objet XHR.
		
	},

	getInitialState(){
		var tempObject = {};
		var tempArray = [];
		return {
			yearFile : tempObject,
		};
	},

	componentDidMount()
	{
		this.makeXMLHttpRequest("http://tomcat7.imr.no:8080/DatasetExplorer/v1/count/Forskningsfart%C3%B8y",this.readData)
		
	},

	handleClick: function(event)
	{
		this.makeXMLHttpRequest("http://tomcat7.imr.no:8080/DatasetExplorer/v1/count/Forskningsfart%C3%B8y",this.readData)
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

	renderYear(input, index)
	{
		return(
			<option key={index}> {this.state.yearFile[input].name} </option>
		);
	},

	render(){

		return(
			<div className='container-fluid'>
				<select className="form-control input" onClick={this.props.onClick}>
					<option value="" hidden>Please select a year</option>
					{this.state.yearFile? Object.keys(this.state.yearFile).map(this.renderYear) : <option> Loading </option>}
				</select>
			</div>		
		);
		
		
	}
});