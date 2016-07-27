import React from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';


MultiSelectField = React.createClass({
	displayName: 'MultiSelectField',
	propTypes: {
		label: React.PropTypes.string,
	},
	getInitialState () {
		// console.log(this.props.incomingData);
		if(this.props.incomingData)
		{
			return {
				disabled: false,
				crazy: false,
				options: this.props.incomingData.slice(),
				value: "",
				loading : true,
				clearAll : false
			};
		}
		else {
			return {
				disabled: false,
				crazy: false,
				options: [{}],
				value: "",
				loading : this.props.loading,
				clearAll : false
			};
		}
		
	},


	componentWillReceiveProps: function(nextProps) {

		//the shipFile will change when the component did mount
		if (!nextProps.incomingData)
		{
			this.setState({incomingData : [], loading: nextProps.loading, value : null});
		}
		else{
			this.setState({options : nextProps.incomingData.slice(),loading: nextProps.loading},function(){});// console.log(this.state.options);});
		}
		if(nextProps.doRemove[0] && nextProps.doRemove[1].length >0)
		{
			this.removeValues(nextProps.doRemove[1]); // remove the values at the index of doRemove[1]
		}
	},

	shouldComponentUpdate: function(nextProps, nextState) {
		if(nextState.value != this.state.value || nextState.options != this.state.options)
		{
			return true;
		}
		else
		{
			return false;
		}
		// var shallowCompare = require('react-addons-shallow-compare');
		// return shallowCompare(this, nextProps, nextState);
	},

	componentDidUpdate: function(prevProps, prevState){ 
		//console.log(this.state.value);
	},

	handleSelectChange (value) {
		// console.log('You\'ve selected:', value);
		// console.log("change made in multifield : ",value);
		// console.log(typeof value);
		this.setState({ value });
		// console.log(value);
		// console.log(typeof value);
		this.props.giveValue(value);
	},

	removeValues(array)
	{
		var index = 0;
		var tempStateValueArray = this.state.value.split(",");
		for(var i = 0 ; i < array.length ; i++)
		{
			index = tempStateValueArray.indexOf(array[i]); // search the element 

			if (index > -1) 
			{ // delete the element
			    tempStateValueArray.splice(index, 1);
			}
		}
		var tempStateValueString = "";
		for(var i = 0 ; i < tempStateValueArray.length ; i++) // reform the value
		{
			tempStateValueString += tempStateValueArray[i];

			if(i != tempStateValueArray.length-1)
			{
				tempStateValueString += ",";
			}
		}
		this.setState({value : tempStateValueString});
		this.setState({clearAll : true});
		this.props.valuesRemoved([true,tempStateValueString]);
		this.setState({clearAll : false});

	},

	renderOption: function(option) {
		return <span style={{ "color": option.color }}>{option.name}</span>;
	},

	inputChange(arg)
	{
		// console.log("inputChange");
		// console.log(arg);
	},

	clearInput()
	{
		this.setState({value : ""});
		this.props.valuesRemoved([true,""]);

	},

	render () {
		return (
			<div>
				<Select multi simpleValue value={this.state.value} resetValue={null} disabled={false} clearable={true} isLoading={this.state.loading} placeholder="Select..." onInputChange={this.inputChange} optionRenderer={this.renderOption} options={this.state.options} valueKey="value" labelKey="value" onChange={this.handleSelectChange} />
				<button onClick={this.clearInput}>clear</button>
			</div>
		);
	}
});

//<h3 className="section-heading">{this.props.label}</h3>