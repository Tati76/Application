import {getXMLHttpRequest,makeHttpRequest} from '../../Functions/functionFile.js';


YearSelectComponent= React.createClass({

	readData: function(sData) {
		
	},

	getInitialState(){
		
		return {
			yearFile : [{value :"45", name:'forty five'},{value :"34", name:'thirty four'}],
			clearAll : 0
		};
	},

	componentDidMount()
	{
		
	},

	handleClick: function(event)
	{
		
	},

	componentWillReceiveProps: function(nextProps) {

	},

	shouldComponentUpdate: function(nextProps, nextState) {
	// 	var shallowCompare = require('react-addons-shallow-compare');
	// 	return shallowCompare(this, nextProps, nextState);
	console.log(nextState.clearAll != this.state.clearAll);
		if (nextState.clearAll > this.state.clearAll)
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

	},

	clearAll(event)
	{
		var tempClAl = this.state.clearAll+1;
		console.log(tempClAl);
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
				{this.state.yearFile? <MultiSelectField clearAll={this.state.clearAll} incomingData={this.state.yearFile} giveValue={this.handleValue} doRemove={[false,""]}/> : <p> Loading </p>}
				<button onClick={this.clearAll}> clearAll </button>
			</div>		
		);
		
		
	}
});