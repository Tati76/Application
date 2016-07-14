//<SelectComponent info= list language=   index=

import displayFile from '../languages/Settings.json';



SelectComponent= React.createClass({
	
	getInitialState(){
		return {
			 info : this.props.info,
			 index : this.props.index,
			 language : this.props.language
		};
	},

	componentWillReceiveProps: function(nextProps) {
		this.setState({
			info : nextProps.info,
			index : nextProps.index,
			language : nextProps.language
		});
	},

	shouldComponentUpdate: function(nextProps, nextState) {
		var shallowCompare = require('react-addons-shallow-compare');
		return shallowCompare(this, nextProps, nextState);
	},

	componentDidUpdate: function(prevProps, prevState){ 

	},

	renderSelect(input, index)
	{
		return(
			<option key={index}> {input} </option>
		);
	},

	handleClick(event)
	{

		if (this.state.currentElement != event.target.value)
		{
			console.log(event.target.value);
			console.log(event.target.selectedIndex);
			this.setState({currentElement : event.target.value});
			this.props.onClick(event);
		}

		
	},

	render(){
		console.log(this.state.language);
		return(
			<select className="form-control input" onClick={this.handleClick}>
				<option  hidden> {displayFile.setups[this.state.index].selectComponent.wait}</option>
				{this.state.info.map(this.renderSelect)}
			</select>
		);
	}
});