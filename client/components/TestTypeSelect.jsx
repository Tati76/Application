TestTypeSelect = React.createClass({

	getInitialState: function() {
		var tempList = [];
		var tempFile = require("./languages/Settings.json").setups[this.props.index];
		for (i=0; i<tempFile.pageInholdInfo.forms.length ; i++)
		{
			tempList.push(tempFile.pageInholdInfo.forms[i].name);
		}
		
		return{
			file : tempFile,
			list : tempList
		}
	},
	
	
	
	componentWillReceiveProps: function(nextProps) {
		//change displayed list
		var tempList = [];
		var tempFile = require("./languages/Settings.json").setups[nextProps.index];
		for (i=0; i<tempFile.pageInholdInfo.forms.length ; i++)
		{
			tempList.push(tempFile.pageInholdInfo.forms[i].name);
		}
		
		this.setState({
			file : tempFile,
			list : tempList
		});
		
		
	},

	shouldComponentUpdate: function(nextProps, nextState) {
		console.log(nextProps.language);
		console.log(this.props.language);
		console.log(nextProps.language !== this.props.language);
	  return nextProps.language !== this.props.language;
	},
	
	
	
	
	renderOptions(input,index) { return (
		<option value={input} id={"TypeOption"+index}>{input}</option>
	)},
	
	
	
	
	render() { return (
		<select className="form-control input" onClick={this.props.onClick}>
			{this.state.list.map(this.renderOptions)}
		</select>
	)}

});