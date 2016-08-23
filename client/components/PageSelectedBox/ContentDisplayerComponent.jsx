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
	    			if(data.wholeContent[i].hasOwnProperty(this.props.searchOptions[0])) // if it has the property
	    			{
	    				searchingIn = data.wholeContent[i][this.props.searchOptions[0]]
		    			if ( searchingIn.search(reseachedValue) > -1)
		    			{
		    				data.content.push(data.wholeContent[i]);
		    			}
	    			}
	    			
	    		}
	    	}
	      	console.log(data.content);
	    }
	    return data;
	},
	
	getInitialState(){
		return {
			language : this.props.language,
			index : this.props.index
		};
	},

	componentWillReceiveProps: function(nextProps) {
		this.setState({language : nextProps.language,index : nextProps.index});
	},

	shouldComponentUpdate: function(nextProps, nextState) {
		var shallowCompare = require('react-addons-shallow-compare');
		return shallowCompare(this, nextProps, nextState);
	},

	componentDidUpdate: function(prevProps, prevState){ 

	},

	deleteBox(boxId)
	{
		console.log(boxId);
		Meteor.call("inholdinfodb.remove",boxId,function(error,result){console.log(result)});

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
			

			<div className='btn-group' style={{"height":"50px", "margin":"0px 0px 0px 0px"}}  key={index}>
				<a href={finalPath} className="btn btn-default col-sm-11" style={{"height":"100%"}}>
					<SampleViewer language={this.state.language} index={this.state.index} key={"c"+index} dbObject={this.data.content[input]} chosenAttribute={this.props.chosenAttribute}/>
				</a>
				<a type="button" style={{"Width":"20px","height":"100%"}} className="btn btn-default" onClick={this.deleteBox.bind(this,this.data.content[input]._id)}><span className='glyphicon glyphicon-trash text-center'></span></a>
			</div>
		);
	},

	render(){
		console.log("render ContentDisplayer");
		return(
			<div className="list-group center-block" >
				{this.data.content? Object.keys(this.data.content).map(this.renderCompo) : <p> Loading... </p>}
			</div>
		);
	}
});