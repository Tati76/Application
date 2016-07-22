import { InholdInfoDb } from '../../../imports/api/inholdinfodb.js';


ContentDisplayer = React.createClass({
	mixins: [ReactMeteorData],

	getMeteorData: function () {
		var data = {};
		var handle = Meteor.subscribe('inholdinfodb');
		console.log(this.props.contentId);
	    if(handle.ready()) {
	    	if (this.props.searchOptions[1] == "")
	    	{
	    		data.content = InholdInfoDb.find({"Parent Id" : this.props.containerId}).fetch(); // Only catches the boxes that are not storable in others
	      		
	    	}
	    	else // Searching the wanted boxes
	    	{
	    		data.content = [];
	    		data.wholeContent = InholdInfoDb.find({"Parent Id" : this.props.containerId }).fetch();
	    		var searchingIn = "";
	    		var reseachedValue = this.props.searchOptions[1];
	    		
	    		for (var i =0; i< data.wholeContent.length ; i++)
	    		{
	    			searchingIn = data.wholeContent[i][this.props.searchOptions[0]]
	    			if ( searchingIn.search(reseachedValue) > -1)
	    			{
	    				data.content.push(data.wholeContent[i]);
	    			}
	    		}
	    	}
	      	console.log(data.content);
	    }
	    return data;
	},
	
	getInitialState(){
		return null;
	},

	componentWillReceiveProps: function(nextProps) {

	},

	shouldComponentUpdate: function(nextProps, nextState) {
		var shallowCompare = require('react-addons-shallow-compare');
		return shallowCompare(this, nextProps, nextState);
	},

	componentDidUpdate: function(prevProps, prevState){ 

	},

	renderCompo(input, index){
		var tempPath = [];
		tempPath = FlowRouter.current().path.split("/");
		tempPath.pop();
		tempPath.push(this.data.content[input]._id);
		var finalPath = "";
		for(var i = 0 ; i< tempPath.length ; i++)
		{
			finalPath += tempPath[i];
			if (i != tempPath.length-1)
			{
				finalPath += "/";
			}
			
		}

		return(
			<a href={finalPath} className="list-group-item">
				<SampleViewer key={"c"+index} dbObject={this.data.content[input]} chosenAttribute={this.props.chosenAttribute}/>
			</a>
		);
	},

	render(){
		console.log("render ContentDisplayer");
		return(
			<div className="list-group">
				{this.data.content? Object.keys(this.data.content).map(this.renderCompo) : <p> Loading... </p>}
			</div>
		);
	}
});