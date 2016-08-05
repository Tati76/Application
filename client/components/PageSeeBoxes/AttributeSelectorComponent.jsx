import { InholdInfoDb } from '../../../imports/api/inholdinfodb.js';
import {translate} from '../Functions/functionFile.js';

AttributeSelector = React.createClass({
	mixins: [ReactMeteorData],

	getMeteorData: function () {
		var data = {};
		var handle = Meteor.subscribe('inholdinfodb');
	    if(handle.ready()) {

	    		data.sample = InholdInfoDb.find({"Parent Id": { $exists: false } } ).fetch(); // Only catches the boxes that are not storable in others
	    		console.log(data.sample);
		      	// Prepare the object for the info selector component
		      	//*****************************************************************************************
		      	data.list = [];
		      	if (Object.keys(data.sample[0]).length)
		      	{
			      	for (var count = 0 ; count < Object.keys(data.sample[0]).length ; count++)
			      	{
			      		data.list.push(Object.keys(data.sample[0])[count]);
			      	}
			      	
		      	}
		      	console.log(data.list);      	
	      	

	      //*****************************************************************************************
	    }
	    return data;
	},
	
	getInitialState(){
		return {
			language : this.props.language,
			index : this.props.index,
			boxType : this.props.boxType
		};
	},

	componentWillReceiveProps: function(nextProps) {
		this.setState({language : nextProps.language, index : nextProps.index, boxType : nextProps.boxType});
	},

	shouldComponentUpdate: function(nextProps, nextState) {
		var shallowCompare = require('react-addons-shallow-compare');
		return shallowCompare(this, nextProps, nextState);
	},

	componentDidUpdate: function(prevProps, prevState){ 

	},

	renderSelector(input,index)
	{

		return(
			<option key={index} value={input}> {translate(input,this.state.language,this.state.boxType)}</option>
		);
	},

	render(){
		return(
			<div> 
				<select className='form-control input' onClick={this.props.onClick}>
					{this.data.list? this.data.list.map(this.renderSelector) : <option> Loading </option>}
				</select>
			</div>
		);
	}
});