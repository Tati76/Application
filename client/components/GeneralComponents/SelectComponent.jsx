//<SelectComponent info= list language=   index=

import displayFile from '../languages/Settings.json';



SelectComponent= React.createClass({
	
	getInitialState(){
		return {
			 info : this.props.info,
			 index : this.props.index,
			 language : this.props.language,
			 selectedIndex : 0,
			 selectedValue : ""
		};
	},

	componentWillReceiveProps: function(nextProps) {
		this.setState({
			info : nextProps.info,
			index : nextProps.index,
			language : nextProps.language,
			selectedValue : nextProps.info[this.state.selectedIndex]
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

		if (this.state.currentElement != event.target.value && !event.target[event.target.selectedIndex].hidden)
		{
			this.setState({selectedValue : event.target.value, selectedIndex : event.target.selectedIndex});
			this.props.onClick(event);
		}

		
	},

	render(){
		console.log("render selectComponent");
		return(
			<select className="form-control input" onClick={this.handleClick}>
				<option  hidden={true}> {displayFile.setups[this.state.index].selectComponent.wait}</option>
				{this.state.info.map(this.renderSelect)}
			</select>
		);
	}
});