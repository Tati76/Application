Home = React.createClass({  
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
	  ////console.log("PATH : " + res);
	  //console.log("LANGUAGE PARAMS : " + this.props.language);
    return (
    	
	    /*<div className="row">
		  <a href={res} className="btn btn-default col-md-2 col-md-offset-1">Lagre</a>
		  <a href="#" className="btn btn-default col-md-2 col-md-offset-2">Search</a>
		</div>*/

		<div className="btn-group btn-group-justified" role="group" aria-label="...">
			  <div className="btn-group" role="group">
			    <a href={res}><button type="button" className="btn btn-default">Lagre</button></a>
			  </div>
			  <div className="btn-group" role="group">
			   <a href="#"> <button type="button" className="btn btn-default">Search</button></a>
			  </div>
		</div>

		/*<div className="btn-group btn-group-justified" role="group" aria-label="...">
			  <div className="btn-group" role="group">
			    <button type="button" className="btn btn-default">Left</button>
			  </div>
			  <div className="btn-group" role="group">
			    <button type="button" className="btn btn-default">Middle</button>
			  </div>
			  <div className="btn-group" role="group">
			    <button type="button" className="btn btn-default">Right</button>
			  </div>
		</div>*/
    )
  }
});