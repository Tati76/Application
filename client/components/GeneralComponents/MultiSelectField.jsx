import React from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';

const FLAVOURS = [
	{ label: 'Chocolate', value: 'chocolate' },
	{ label: 'Vanilla', value: 'vanilla' },
	{ label: 'Strawberry', value: 'strawberry' },
	{ label: 'Caramel', value: 'caramel' },
	{ label: 'Cookies and Cream', value: 'cookiescream' },
	{ label: 'Peppermint', value: 'peppermint' },
];

const WHY_WOULD_YOU = [
	{ label: 'Chocolate (are you crazy?)', value: 'chocolate', disabled: true },
].concat(FLAVOURS.slice(1));

MultiSelectField = React.createClass({
	displayName: 'MultiSelectField',
	propTypes: {
		label: React.PropTypes.string,
	},
	getInitialState () {
		console.log(this.props.incomingData);
		if(this.props.incomingData)
		{
			return {
				disabled: false,
				crazy: false,
				options: this.props.incomingData.slice(),
				value: "",
				loading : true
			};
		}
		else {
			return {
				disabled: false,
				crazy: false,
				options: [{}],
				value: "",
				loading : this.props.loading
			};
		}
		
	},


	componentWillReceiveProps: function(nextProps) {

		//the shipFile will change when the component did mount
		if (!nextProps.incomingData)
		{
			this.setState({incomingData : [], loading: nextProps.loading});
		}
		else{
			this.setState({options : nextProps.incomingData.slice(),loading: nextProps.loading},function(){});// console.log(this.state.options);});
		}
		// if(nextProps.doRemove[0] && nextProps.doRemove[1].length >0)
		// {
		// 	this.removeValues(nextProps.doRemove[1]); // remove the values at the index of doRemove[1]
		// }
	},

	shouldComponentUpdate: function(nextProps, nextState) {
		var shallowCompare = require('react-addons-shallow-compare');
		return shallowCompare(this, nextProps, nextState);
	},

	componentDidUpdate: function(prevProps, prevState){ 
		//console.log(this.state.value);
	},

	handleSelectChange (value) {
		// console.log('You\'ve selected:', value);
		console.log("change made in multifield : ",value);
		this.setState({ value });
		// console.log(value);
		// console.log(typeof value);
		this.props.giveValue(value);
	},

	// removeValues(array)
	// {
	// 	var index = 0;
	// 	var tempStateValueArray = this.state.value.split(",");
	// 	for(var i = 0 ; i < array.length ; i++)
	// 	{
	// 		index = tempStateValueArray.indexOf(array[0]); // search the element 
	// 		if (index > -1) { // delete the element
	// 		    tempStateValueArray.splice(index, 1);
	// 		}
	// 	}
	// 	var tempStateValueString = "";
	// 	for(var i = 0 ; i < tempStateValueArray.length ; i++) // reform the value
	// 	{
	// 		tempStateValueString += tempStateValueArray[i];

	// 		if(i != tempStateValueArray.length-1)
	// 		{
	// 			tempStateValueString += ",";
	// 		}
	// 	}

	// 	this.setState({value : tempStateValueString});
	// 	this.props.valuesRemoved(true);
	// },

	renderOption: function(option) {
		return <span style={{ "color": option.color }}>{option.name}</span>;
	},

	inputChange(arg)
	{
		console.log("inputChange");
		console.log(arg);
	},

	render () {
		return (
			<div className="section">
				<h3 className="section-heading">{this.props.label}</h3>
				<Select multi simpleValue value={this.state.value} isLoading={this.state.loading} placeholder="Select..." onInputChange={this.inputChange} optionRenderer={this.renderOption} options={this.state.options} valueKey="value" labelKey="value" onChange={this.handleSelectChange} />
			</div>
		);
	}
});