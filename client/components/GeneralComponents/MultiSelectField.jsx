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


	componentWillReceiveProps: function(nextProps) {
		console.log("receives clearAll prop : ", nextProps.clearAll);
		if(nextProps.clearAll > this.props.clearAll)
		{
			this.clearInput();
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
		this.setState({value : null});
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