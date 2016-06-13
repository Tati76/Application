Header = React.createClass({  
	getInitialState: function() {
		return{
		file : require("../components/languages/languages.json").Setups[this.props.index],
		lg : require("../components/languages/languages.json")
		}
	},

	componentWillReceiveProps: function(nextProps) {
		//console.log('componentWillReceiveProps', require("../components/languages/languages.json").Setups[nextProps.index].header);
	  this.setState({
		file : require("../components/languages/languages.json").Setups[nextProps.index]
	  });
	},

	shouldComponentUpdate: function(nextProps, nextState) {
		//console.log(nextProps.language);
		//console.log(this.props.language);
		//console.log(nextProps.language !== this.props.language);
	  return nextProps.language !== this.props.language;
},

	
  render() {
	//console.log("RENDER HEADER TRIGGERED -> " + this.state.file.header);
    return (
      	<div className="navbar navbar-default navbar-fixed-top"  role="navigation">
			<div className="container">
			    <div className="navbar-header">
			    <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
			        <span className="icon-bar"></span>
			        <span className="icon-bar"></span>
			        <span className="icon-bar"></span>
      			</button>
			      <a id={"a"+this.state.file.header} className="navbar-brand" href="/No/0">{this.state.file.header}</a>
			    </div>
			    <div className="collapse navbar-collapse" id="myNavbar">
					<ul className="nav navbar-nav navbar-right">
						<LangSelect id="langsel" onClick={this.props.onClick} language={this.props.language}/>
					</ul>
				</div>
			 </div>
		</div>
    )
  }
});