import {getXMLHttpRequest,makeHttpRequest,dynamicSort} from '../../Functions/functionFile.js';



ShipSelectComponent= React.createClass({

	makeAllUrlList(yearList,shipFiles) // update step 1
	{

	},

	makeAllXMLRequests(yearList,urlList,shipFiles) // update step 2
	{
		
	},

	readData: function(sData,array) // update step 3
	{  
		
	},

	buildDisplayArray: function(objectArray,array) // update step 4
	{
		
	},

	getInitialState(){
		return {
			remove: false ,
			labelsToRemove : [],
			displayArray : [],
			loading: true
		};
	},

	componentDidMount()
	{
		
	},


	componentWillReceiveProps: function(nextProps) {

	

	},

	shouldComponentUpdate: function(nextProps, nextState) {
			// var shallowCompare = require('react-addons-shallow-compare');
			// return shallowCompare(this, nextProps, nextState);
	},

	componentDidUpdate: function(prevProps, prevState){ 

	},

	renderShip(input, index)
	{
		
	},

	handleValue(value)
	{

	},

	handleRemoveState(arg)
	{
		
	},

	render()
	{
			return(
				<div>
					<MultiSelectField incomingData={this.state.displayArray} loading={this.state.loading} giveValue={this.handleValue} valuesRemoved={this.handleRemoveState} doRemove={[this.state.remove,this.state.labelsToRemove]}/> 
				</div>		
			);
	}
});