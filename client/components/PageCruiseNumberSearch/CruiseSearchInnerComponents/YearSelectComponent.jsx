import {getXMLHttpRequest,makeXMLHttpRequest} from '../../Functions/functionFile.js';
import { HTTP } from 'meteor/http';


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
			clearAll : false
		};
	},

	componentDidMount()
	{
		// makeXMLHttpRequest("http://tomcat7.imr.no:8080/DatasetExplorer/v1/count/Forskningsfart%C3%B8y",this.readData);
		this.getFunction();
		
	},

	getFunction()
	{
		// Meteor.http.get("http://tomcat7.imr.no:8080/DatasetExplorer/v1/count/Forskningsfart%C3%B8y",{}, function (error, result) {
		// 	if (error) 
		// 	{
		// 	console.log('http post FAILED!');
		// 	} 
		// 	else 
		// 	{
		// 		if (result.statusCode === 200) {
		// 		console.log('http post ok!');
		// 		}
		// 	}
		// });
		// xhr.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

	 //    // Request methods you wish to allow
	 //    xhr.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

	 //    // Request headers you wish to allow
	 //    xhr.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

	 //    // Set to true if you need the website to include cookies in the requests sent
	 //    // to the API (e.g. in case you use sessions)
	 //    xhr.setHeader('Access-Control-Allow-Origin':'http://localhost:3000','Access-Control-Allow-Methods':'GET, POST, OPTIONS, PUT, PATCH, DELETE','Access-Control-Allow-Headers':'X-Requested-With,content-type','Access-Control-Allow-Credentials', true);

		HTTP.call("get","http://tomcat7.imr.no:8080/DatasetExplorer/v1/count/Forskningsfart%C3%B8y",
          {"headers": {'Access-Control-Allow-Origin':'http://localhost:3000/Norsk/0/AddBox',
          'Access-Control-Allow-Methods':'GET, POST, OPTIONS, PUT, PATCH, DELETE',
          'Access-Control-Allow-Headers':'X-Requested-With,content-type',
          'Access-Control-Allow-Credentials': true}},
          function (error, result) {
            if (!error) {
              console.log(result);
            }
          });
	},

	handleClick: function(event)
	{
		makeXMLHttpRequest("http://tomcat7.imr.no:8080/DatasetExplorer/v1/count/Forskningsfart%C3%B8y",this.readData)
		//this.makeXMLHttpRequest("http://tomcat7.imr.no:8080/DatasetExplorer/v1/count/Forskningsfart%C3%B8y/2016",this.readData);
		
	},

	componentWillReceiveProps: function(nextProps) {
		// console.log("YearSelectComponent receives props, N1");
	},

	shouldComponentUpdate: function(nextProps, nextState) {
		var shallowCompare = require('react-addons-shallow-compare');
		return shallowCompare(this, nextProps, nextState);
	},

	componentDidUpdate: function(prevProps, prevState){ 
		// console.log("YearSelectComponent did update, N1");
	},

	handleValue(argument)
	{
		// console.log("YearSelectComponent change value :");
		// console.log(argument);
		this.props.giveValue(argument);
	},

	renderYear(input, index)
	{
		return(
			<option key={index}> {this.state.yearFile[input].name} </option>
		);
	},

	clearAll()
	{
		this.setState({clearAll : true});
	},

	render(){

		return(
			<div>
				{this.state.yearFile? <MultiSelectField clearAll={this.state.clearAll} incomingData={this.state.yearFile} giveValue={this.handleValue} doRemove={[false,""]}/> : <p> Loading </p>}
			</div>		
		);
		
		
	}
});
//doRemove={[false,[false]]}
// {this.state.yearFile? <MultiSelectField incomingData={this.state.yearFile}/> : <option> Loading </option>}