import { InholdInfoDb } from '../../../imports/api/inholdinfodb.js';

BoxDisplayer = React.createClass({
	mixins: [ReactMeteorData],

	getMeteorData: function () {
		var data = {};
		var handle = Meteor.subscribe('inholdinfodb');
	    if(handle.ready()) {

	    		data.sample = InholdInfoDb.find({"Parent Id": { $exists: false } } ).fetch(); // Only catches the boxes that are not storable in others
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
			      		if(data.sample[i].hasOwnProperty(this.props.searchOptions[0])) // if it has the property
	    				{
				      		console.log(data.samplesFittingTheCriterias);
				      		stringToSearchIn = data.sample[i][this.props.searchOptions[0]];
				      		if(stringToSearchIn.search(stringToSearch) > -1)
				      		{
				      			data.samplesFittingTheCriterias.push(data.sample[i]);
				      		}
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
			searchedAttribute : this.props.searchOptions[0],
			language : this.props.language,
			index : this.props.index
		};
	},

	componentWillReceiveProps: function(nextProps) {
		this.setState({searchedAttribute : nextProps.searchOptions[0], language:nextProps.language, index : nextProps.index});
	},

	shouldComponentUpdate: function(nextProps, nextState) {
		var shallowCompare = require('react-addons-shallow-compare');
		return shallowCompare(this, nextProps, nextState);
	},

	componentDidUpdate(prevProps, prevState){ 

	},

	renderCompo(input,index)
	{
		console.log(input);

		return(
			<div  key={index} className='btn-group col-sm-12 clearfix' style={{"height":"50px", "margin":"0px 0px 0px 0px"}}>
				<a href={FlowRouter.current().path + "/" + input._id} type="button" className="btn btn-default col-sm-11" style={{"height":"50px"}}>
					<SampleViewer language={this.state.language} index={this.state.index} key={"c"+index} dbObject={input} chosenAttribute={this.props.searchOptions[0]}/>
				</a>
				<a type="button"  className="btn btn-default col-sm-1 glyphicon glyphicon-trash text-center" onClick={this.deleteBox.bind(this,input._id)} style={{"height":"50px",'marginTop':"0px"}}></a>
			</div>
		);
			
	},

	deleteBox(id)
	{
		console.log("deleteBox : ",id);
		// Meteor.call("inholdinfodb.remove",id);
		Meteor.call("inholdinfodb.remove",id,function(error,result){console.log(result)});
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

// <div className="btn-group" role="group" aria-label="...">
// 			  <button type="button" className="btn btn-default"><a href={FlowRouter.current().path + "/" + input._id} type="button" className="btn btn-default list-group-item" >
				// <SampleViewer language={this.state.language} index={this.state.index} key={"c"+index} dbObject={input} chosenAttribute={this.props.searchOptions[0]}/>
			// </a></button>
// 			  <button type="button" className="btn btn-default"><span className="glyphicon glyphicon-print"></span></button>
// 			  </div>