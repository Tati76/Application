import {getXMLHttpRequest,makeHttpRequest,createCORSRequest,} from '../../Functions/functionFile.js';
import { HTTP } from 'meteor/http';

// test

YearSelectComponent= React.createClass({

	readData: function(sData,option) {

		var tempArray = [];
		for (var i=0 ; i<sData.length ; i++ ) // put the value attribute in each year to display it
		{
			tempArray.push(sData[i]);
			tempArray[i]["value"] = sData[i].name;
		}
		this.setState({yearFile : tempArray,loading : false});
		
	},

	getInitialState(){
		return {
			yearFile : [],
			clearAll : 0,
			loading : true,
			language: this.props.language,
			index : this.props.index
		};
	},

	componentDidMount()
	{
		// http://jsonplaceholder.typicode.com/posts/1
		// makeHttpRequest("http://tomcat7.imr.no:8080/DatasetExplorer/v1/count/Forskningsfart%C3%B8y",this.readData,null);
		// this.getFunction();*
		// var url = "http://tomcat7.imr.no:8080/DatasetExplorer/v1/count/Forskningsfart%C3%B8y";
		// var xhr = createCORSRequest('GET', url);
		// xhr.setRequestHeader('Access-Control-Allow-Origin', '*');
		// //console.log(xhr);
		// xhr.send()
		// //console.log(xhr);
		// //console.log(xhr.getAllResponseHeaders());
		Meteor.call('getJson',"http://tomcat7.imr.no:8080/DatasetExplorer/v1/count/Forskningsfart%C3%B8y",null,this.getCORSValues);
		// this.getFunction();

	},

	getCORSValues(error,result)
	{
		if (error)
		{
			console.error(error);
		}
		else
		{
			//console.log(result[0]);
			//console.log(result[1]);
			this.readData(result[0].data,result[1]);
		}
	},

	getFunction()
	{
		// Meteor.http.get("http://tomcat7.imr.no:8080/DatasetExplorer/v1/count/Forskningsfart%C3%B8y",{}, function (error, result) {
		// 	if (error) 
		// 	{
		// 	//console.log('http post FAILED!');
		// 	} 
		// 	else 
		// 	{
		// 		if (result.statusCode === 200) {
		// 		//console.log('http post ok!');
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

		HTTP.call("get","http://jsonplaceholder.typicode.com/posts/1",
          {},
          function (error, result) {
            if (error) {
            	//console.log('error');
              console.error(error);
            }
            else
            {
            	//console.log(result);
            }
          });
	},

	handleClick: function(event)
	{
		
	},

	componentWillReceiveProps: function(nextProps) {
		this.setState({language: nextProps.language, index : nextProps.index});
		if (nextProps.clearYear > this.props.clearYear)
		{
			this.clearAll();
		}
	},

	shouldComponentUpdate: function(nextProps, nextState) {
	// 	var shallowCompare = require('react-addons-shallow-compare');
	// 	return shallowCompare(this, nextProps, nextState);
	////console.log(nextState.clearAll != this.state.clearAll);
		if(this.state.language != nextState.language)
		{
			return true;
		}
		if (nextState.clearAll > this.state.clearAll || this.state.yearFile != nextState.yearFile)
		{
			return true;
		}
		else
		{
			return false;
		}
	},

	componentDidUpdate: function(prevProps, prevState){ 

	},

	handleValue(argument)
	{
		this.props.giveValue(argument);
	},

	clearAll(event)
	{
		var tempClAl = this.state.clearAll+1;
		////console.log(tempClAl);
		this.setState({clearAll : tempClAl});
	},

	renderYear(input, index)
	{
		return(
			<option key={index}> {this.state.yearFile[input].name} </option>
		);
	},

	render(){

		return(
			<div>
				<MultiSelectField language={this.state.language} index={this.state.index} clearAll={this.state.clearAll} loading={this.state.loading} incomingData={this.state.yearFile} giveValue={this.handleValue} doRemove={[false,""]}/>
			</div>		
		);
		
		
	}
});