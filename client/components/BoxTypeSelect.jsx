BoxTypeSelect = React.createClass({

	getInitialState: function() {
		var tempList = [];
		var tempFile = require("./languages/Settings.json").setups[this.props.index].pageBoxInfo;
		for (i=0; i<tempFile.forms.length ; i++)
		{
			tempList.push(tempFile.forms[i].name);
		}
		
		return{
			file : tempFile,
			list : tempList
		}
	},
	
	
	
	componentWillReceiveProps: function(nextProps) {
		//change displayed list
		var tempList = [];
		var tempFile = require("./languages/Settings.json").setups[nextProps.index].pageBoxInfo;
		for (i=0; i<tempFile.forms.length ; i++)
		{
			tempList.push(tempFile.forms[i].name);
		}
		
		this.setState({
			file : tempFile,
			list : tempList
		});
		
		
	},

	shouldComponentUpdate: function(nextProps, nextState) {
	  return nextProps.language !== this.props.language;
	},
	
	
	
	
	renderOptions(input,index) { return (
		<option value={input} key={"boxOption"+index}>{input}</option>
	)},
	
	
	
	
	render() { return (
		<select className="form-control input" onClick={this.props.onClick}>
			{this.state.list.map(this.renderOptions)}
		</select>
	)}

});