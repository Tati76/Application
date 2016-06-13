Header = React.createClass({  
	getInitialState: function() {

		return{
		file : require("../components/languages/Settings.json").setups[this.props.index].header
		}
	},

	componentWillReceiveProps: function(nextProps) {
		//console.log('componentWillReceiveProps', require("../components/languages/languages.json").Setups[nextProps.index].header);
	  this.setState({
		file : require("../components/languages/Settings.json").setups[nextProps.index].header
	  });
	},

	shouldComponentUpdate: function(nextProps, nextState) {
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
			      <a id={"a"+this.state.file.text} className="navbar-brand" href={"/"+this.props.language+"/"+this.props.index}>{this.state.file.text}</a>
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