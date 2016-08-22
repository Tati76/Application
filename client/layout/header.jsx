import displayFile from "../components/languages/Settings.json";

Header = React.createClass({  
	getInitialState: function() {

		return{
		file : displayFile.setups[this.props.index].header,
		language : this.props.language,
		index : this.props.index,
		path : FlowRouter.current().path
		}
	},

	componentWillReceiveProps: function(nextProps) {
		//console.log('componentWillReceiveProps', require("../components/languages/languages.json").Setups[nextProps.index].header);
	  this.setState({
		file : displayFile.setups[nextProps.index].header,
		language : nextProps.language,
		index : nextProps.index
	  });
	},

	shouldComponentUpdate: function(nextProps, nextState) {
	 	return true;
	},

	componentDidUpdate(prevProps,prevState)
	{
		if (FlowRouter.current().path != this.state.path)
		{
			this.setState({path : FlowRouter.current().path});
		}
	},

	
  render() {
	//console.log("RENDER HEADER TRIGGERED -> " + this.state.file.header);
	var active = [];
	console.log(this.state.path.split("/").length);
	if(this.state.path.split("/")[this.state.path.split("/").length-1] == "SeeBoxes")
	{
		active = ["active",""];
	}
	else if (this.state.path.split("/")[this.state.path.split("/").length-1] == "LoadCruiseNr")
	{
		active = ["","active"];
	}
	else
	{
		active = ["",""];
	}
    return (
      	<div className="navbar navbar-default navbar-fixed-top"  role="navigation">
			<div className="container">
			    <div className="navbar-header">
			    <button type="button" className="navbar-toggle" data-toggle="collapse" data-target="#myNavbar">
			        <span className="icon-bar"></span>
			        <span className="icon-bar"></span>
			        <span className="icon-bar"></span>
      			</button>
			      <a id={"a"+this.state.file.text} className="navbar-brand" href={"/"+this.props.language+"/"+this.props.index}><strong>{this.state.file.text}</strong></a>
			    </div>
			    <div className="collapse navbar-collapse" id="myNavbar">
			    	<ul className="nav navbar-nav">
			    		<li className={active[0]}><a className="nav navbar-nav navbar-left navbar-brand" href={"/"+this.props.language+"/"+this.props.index+"/SeeBoxes"}> {this.state.file.links.one} </a></li>
			    		<li className={active[1]}><a className="nav navbar-nav navbar-left navbar-brand" href={"/"+this.props.language+"/"+this.props.index+"/LoadCruiseNr"}> {this.state.file.links.two} </a></li>
			    	</ul>
			    	
					<ul className="nav navbar-nav navbar-right">
						<LangSelect id="langsel" onClick={this.props.onClick} language={this.props.language}/>
					</ul>
				</div>
			 </div>
		</div>
    )
  }
});