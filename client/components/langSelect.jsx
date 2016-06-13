LangSelect = React.createClass({

	getInitialState: function() {
		return{
		lg : require("./languages/Settings.json"),
		usedLanguage : require("./languages/Settings.json").languages[0]
		}
	},

	getComponent(index) {
		console.log("Component is number : "+index);
	},
	
	renderOptions(input,index)  {
	return(
		//<option value={input} id={"lang"+index}>{input}</option>
		<li key={"li" + index} onClick={this.props.onClick}><a id={index}>{input}</a></li>
	)},

	clic(index) {
		console.log(index);
	},

	shouldComponentUpdate: function(nextProps, nextState) {
		//console.log(nextProps.language);
		//console.log(this.props.language);
		//console.log(nextProps.language !== this.props.language);
	  return nextProps.language !== this.props.language;
},
	
	render() {
		console.log("rendering");

		return (
		/*<select onClick={this.props.onClick} className="selectpicker" data-style="btn-primary">
			{this.state.lg.languages.map(this.renderOptions)}
		</select>*/
		<li className="dropdown" >
			<a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">{this.props.language} <span className="caret"></span></a>
			<ul className="dropdown-menu">
				{this.state.lg.languages.map(this.renderOptions)}
			</ul>
		</li>
		
	)}

});