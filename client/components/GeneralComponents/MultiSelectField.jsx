import React from 'react';
import Select from 'react-select';
import 'react-select/dist/react-select.css';


MultiSelectField = React.createClass({
	displayName: 'MultiSelectField',
	propTypes: {
		label: React.PropTypes.string,
	},

	getInitialState () {
		return{
			value : null,
			loading : this.props.loading,
			options : this.props.incomingData
		}
		
	},

	isInIncData(stateValue,incDatas)
	{
		var res = false;
		for (var a = 0 ; a<incDatas.length ; a++)
		{
			if (stateValue == incDatas[a].value)
			{
				res = true ;
				break;
			}
		}
		return res;
	},

	clearImpossibleValues(incomingData)
	{
		if (this.state.value != null)
		{
			var tempStateValue = this.state.value.split(',');
			for (var i = 0 ; i<tempStateValue.length ; i++)
			{ 
				var isInData = this.isInIncData(tempStateValue[i],incomingData); // check if some data
				if(!isInData)
				{
					tempStateValue.splice(i,1);
					i=i-1;
				}
			}


			var tempResponseString = '';
			for (var i = 0 ; i<tempStateValue.length; i++) // make a string to replace value
			{
				tempResponseString += tempStateValue[i];
				if (i != tempStateValue.length-1)
				{
					tempResponseString += ",";
				}
			}
			this.setState({value : tempResponseString});
			this.props.giveValue(tempResponseString);
		}
	},

	componentWillReceiveProps: function(nextProps) {
		this.setState({options : nextProps.incomingData,loading : nextProps.loading});
		console.log("receives clearAll prop : ", nextProps.clearAll);
		if(nextProps.clearAll > this.props.clearAll)
		{
			this.clearInput();
		}
		if(nextProps.incomingData.length < this.props.incomingData.length)
		{
			if(this.state.value != null)
			{
				this.clearImpossibleValues(nextProps.incomingData);
			}
		}
	},

	shouldComponentUpdate: function(nextProps, nextState) {
		var shallowCompare = require('react-addons-shallow-compare');
		return shallowCompare(this, nextProps, nextState);
	},

	componentDidUpdate: function(prevProps, prevState){ 
		//console.log(this.state.value);
	},

	handleSelectChange (value) {
		this.setState({value});
		console.log("value",value);
		this.props.giveValue(value);
	},

	removeValues(array)
	{
		

	},

	renderOption: function(option) {
		return <span style={{ "color": option.color }}>{option.name}</span>;
	},

	inputChange(arg)
	{
		
	},

	clearInput()
	{
		// this.setState({value : null});
		// // this.props.giveValue(null);
		var tempObjectArray = [{value : ""}];
		this.clearImpossibleValues(tempObjectArray);
	},

	render () {
		return (
			<div>
				<Select multi simpleValue value={this.state.value} resetValue={null} disabled={false} clearable={true} isLoading={this.state.loading} placeholder="Select..." onInputChange={this.inputChange} optionRenderer={this.renderOption} options={this.state.options} valueKey="value" labelKey="name" onChange={this.handleSelectChange} />
				<button onClick={this.clearInput}>clear</button>
			</div>
		);
	}
});

//<h3 className="section-heading">{this.props.label}</h3>