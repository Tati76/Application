TestTypeSelect = React.createClass({

	getInitialState: function() {
		var tempList = [];
		var tempFile = require("./languages/languages.json").Setups[this.props.index];
		for (i=0; i<tempFile.boxInfo.content.length ; i++)
		{
			tempList.push(tempFile.boxInfo.content[i].name);
		}
		
		return{
			file : tempFile,
			list : tempList
		}
	},
	
	
	
	componentWillReceiveProps: function(nextProps) {
		//change displayed list
		var tempList = [];
		var tempFile = require("./languages/languages.json").Setups[nextProps.index];
		for (i=0; i<tempFile.boxInfo.content.length ; i++)
		{
			tempList.push(tempFile.boxInfo.content[i].name);
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