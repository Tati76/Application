Home = React.createClass({  

	getInitialState: function() {
		return{
			usedLang : require("./languages/Settings.json").setups[this.props.index].language, // No the default language
			usedLangObject : require("./languages/Settings.json").setups[this.props.index].pageHome, // refers to the object in fuction of the language selected 
			}
	},



	componentWillReceiveProps: function(nextProps) {
		this.setState({
			usedLang : require("./languages/Settings.json").setups[nextProps.index].language, // No the default language
			usedLangObject : require("./languages/Settings.json").setups[nextProps.index].pageHome, // refers to the object in fuction of the language selected 
			});	},

	shouldComponentUpdate: function(nextProps, nextState) {
		if (nextProps.language !== this.props.language) // if a prop change, update !
		{
			return nextProps.language !== this.props.language;
		}
		else if (nextProps.index !== this.props.index)
		{
			return nextProps.index !== this.props.index;
		}
		else
		{
			return false;
		}
	},


  render() {
	  
	  var tempCurrentRouteArray = FlowRouter.current().path.split("/");
		var path = "";
		var tempString = "";
		for (i=1; i<3 ; i++)
		{
			tempString= "/";
			tempString += tempCurrentRouteArray[i];
			path += tempString;
			tempString = "";
		}
		
	  var res = path.concat("/InholdInfo");
	  var res2 = path.concat("/Search");
	  var res3 = path.concat("/AddContent");
	  //console.log(require("./languages/Settings.json").setups[this.props.index].pageHome.hasOwnProperty("buttons"));

	  ////console.log("PATH : " + res);
	  //console.log("LANGUAGE PARAMS : " + this.props.language);
    return (
    	
		
		<div className="btn-group btn-group-justified" role="group" aria-label="...">
			  <div className="btn-group" role="group">
			    <a href={res}><button type="button" className="btn btn-default">{this.state.usedLangObject.buttons.save}</button></a>
			  </div>
			  <div className="btn-group" role="group">
			   <a href={res3}> <button type="button" className="btn btn-default">{this.state.usedLangObject.buttons.addContent}</button></a>
			  </div>
			  <div className="btn-group" role="group">
			   <a href={res2}> <button type="button" className="btn btn-default">{this.state.usedLangObject.buttons.search}</button></a>
			  </div>
		</div>
    )
  }
});