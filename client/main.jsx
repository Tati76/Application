import React from 'react';
import '../imports/startup/accounts-config.js';


MainLayout = React.createClass({ 
	getInitialState: function() {
		return{
		language : "Norsk",
		index : 0,
		currentRoute : FlowRouter.current().path.substring(5)
		}
	}, 

	changeLanguage(event) {

		var tempCurrentRouteArray = FlowRouter.current().path.split("/");

		var tempCurrentRoute = "";
		for (i=3; i<tempCurrentRouteArray.length ; i++) // takes the route but the language and the index that is going to be changed to route to the new URL
		{
			tempCurrentRoute += "/";
			tempCurrentRoute += tempCurrentRouteArray[i];
		}
		
		this.setState({currentRoute : tempCurrentRoute});

		this.setState({language : event.target.text},function() {console.log(this.state.language);});
		this.setState({index : event.target.id},function() {FlowRouter.go('/'+this.state.language+'/'+this.state.index+'/'+ this.state.currentRoute);});
		 
	},
	
	render() {

	    return (
	    	<div className="container">
	    		<header>
	    			<Header id="Header" language={this.state.language} index={this.state.index} onClick={this.changeLanguage}/>
				</header>
				<main id="contentDiv" className="vcenter center-block">
					
					{this.props.content}
				</main>
				<footer>
		        	<Footer id="Footer" language={this.state.language} index={this.state.index}/>
				</footer>
			</div> 
	    )
	}
});