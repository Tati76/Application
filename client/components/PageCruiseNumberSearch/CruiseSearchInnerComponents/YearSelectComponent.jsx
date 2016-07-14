import {getXMLHttpRequest,makeXMLHttpRequest} from '../../Functions/functionFile.js';


YearSelectComponent= React.createClass({

	readData: function(sData) {
		// console.log(JSON.parse(sData));
		var tempArray = [];
		for (var i=0 ; i<JSON.parse(sData).length ; i++ ) // put the value attribute in each year to display it
		{
			tempArray.push(JSON.parse(sData)[i]);
			tempArray[i]["value"] = JSON.parse(sData)[i].name;
		}
		// console.log(tempArray);
		this.setState({yearFile : tempArray});
		// On peut maintenant traiter les données sans encombrer l'objet XHR.
		
	},

	getInitialState(){
		var tempObject = [{}];
		var tempArray = [];
		return {
			yearFile : tempObject,
		};
	},

	componentDidMount()
	{
		makeXMLHttpRequest("http://tomcat7.imr.no:8080/DatasetExplorer/v1/count/Forskningsfart%C3%B8y",this.readData)
		
	},

	handleClick: function(event)
	{
		makeXMLHttpRequest("http://tomcat7.imr.no:8080/DatasetExplorer/v1/count/Forskningsfart%C3%B8y",this.readData)
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

	handleValue(argument)
	{
		console.log("YearSelectComponent change value :");
		console.log(argument);
		this.props.giveValue(argument);
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
				{this.state.yearFile? <MultiSelectField incomingData={this.state.yearFile} giveValue={this.handleValue} /> : <p> Loading </p>}
			</div>		
		);
		
		
	}
});
//doRemove={[false,[false]]}
// {this.state.yearFile? <MultiSelectField incomingData={this.state.yearFile}/> : <option> Loading </option>}