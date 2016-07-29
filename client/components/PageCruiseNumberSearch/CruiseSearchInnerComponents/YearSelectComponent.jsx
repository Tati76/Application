import {getXMLHttpRequest,makeHttpRequest} from '../../Functions/functionFile.js';


YearSelectComponent= React.createClass({

	readData: function(sData,option) {

		var tempArray = [];
		for (var i=0 ; i<JSON.parse(sData).length ; i++ ) // put the value attribute in each year to display it
		{
			tempArray.push(JSON.parse(sData)[i]);
			tempArray[i]["value"] = JSON.parse(sData)[i].name;
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
		makeHttpRequest("http://tomcat7.imr.no:8080/DatasetExplorer/v1/count/Forskningsfart%C3%B8y",this.readData,null);
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
	//console.log(nextState.clearAll != this.state.clearAll);
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
		//console.log(tempClAl);
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