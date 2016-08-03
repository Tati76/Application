Footer = React.createClass({
	
	getInitialState: function() {
		return ({
			file : require("../components/languages/Settings.json").setups[this.props.index].footer
		})
	},
	
	componentWillReceiveProps: function(nextProps) {
		//console.log(nextProps.language);
		this.setState({file : require("../components/languages/Settings.json").setups[nextProps.index].footer});
	},

	shouldComponentUpdate: function(nextProps, nextState) { // to render the Footer if the language is changed
		//console.log(nextProps.language);
		//console.log(this.props.language);
		//console.log(nextProps.language !== this.props.language);
		return nextProps.language !== this.props.language;
	},
	
	
	
	render() {
		//console.log("IIIINNNDEX : " + this.props.index);
		return (
		  /*<div className="footer" class="text-center">
			<label class="text-center">{this.state.file.footer}</label>
		  </div>*/
		<div className="navbar navbar-default navbar-fixed-bottom">
		    <div className="container">
				<div className="navbar-header">
				      <a className="navbar-brand">{this.state.file.text}</a>
				</div>
				<div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
					<ul className="nav navbar-nav navbar-right">
						<li><a className="navbar-link">2016</a></li>
					</ul>
				</div>
			</div>
		</div>
		)
  }
});