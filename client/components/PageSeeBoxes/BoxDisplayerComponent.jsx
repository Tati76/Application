import { InholdInfoDb } from '../../../imports/api/inholdinfodb.js';

BoxDisplayer = React.createClass({
	mixins: [ReactMeteorData],

	getMeteorData: function () {
		var data = {};
		var handle = Meteor.subscribe('inholdinfodb');
	    if(handle.ready()) {

	    		data.sample = InholdInfoDb.find({"Containers Id": { $exists: false } } ).fetch(); // Only catches the boxes that are not storable in others
	    		console.log(data.sample[0]);
				data.samplesFittingTheCriterias = [];
	    		if(this.props.searchOptions[1] != "")
	    		{
	    			// Search Function
			      	//*****************************************************************************************
			      	
					var stringToSearchIn = "";
					var stringToSearch = "";
					stringToSearch = this.props.searchOptions[1];
			      	for (var i=0 ; i<data.sample.length ; i++)
			      	{
			      		console.log(data.samplesFittingTheCriterias);
			      		stringToSearchIn = data.sample[i][this.props.searchOptions[0]];
			      		if(stringToSearchIn.search(stringToSearch) > -1)
			      		{
			      			data.samplesFittingTheCriterias.push(data.sample[i]);
			      		}
			      	}   	
		      		//*****************************************************************************************
	    		}
	    		else
	    		{
	    			for (var i=0 ; i<data.sample.length ; i++)
			      	{
			      		data.samplesFittingTheCriterias.push(data.sample[i]);
			      	} 
	    		}
	    		
	    }
	    return data;
	},
	
	getInitialState(){
		return {
			searchedAttribute : this.props.searchOptions[0]
		};
	},

	componentWillReceiveProps: function(nextProps) {
		this.setState({searchedAttribute : nextProps.searchOptions[0]});
	},

	shouldComponentUpdate: function(nextProps, nextState) {
		var shallowCompare = require('react-addons-shallow-compare');
		return shallowCompare(this, nextProps, nextState);
	},

	componentDidUpdate: function(prevProps, prevState){ 

	},

	renderCompo(input,index)
	{
		console.log(input);

		return(
			<a href={FlowRouter.current().path + "/" + input._id} className="list-group-item">
				<SampleViewer key={"c"+index} dbObject={input} chosenAttribute={this.props.searchOptions[0]}/>
			</a>
		);
	},

	render(){
		return(
			<div className="container-fluid">
				<div className="list-group">
					{this.data.samplesFittingTheCriterias? this.data.samplesFittingTheCriterias.map(this.renderCompo) : <p> Loading... </p>}
				</div>
			</div>
		);
	}
});