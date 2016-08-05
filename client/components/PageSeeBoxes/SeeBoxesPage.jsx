import { InholdInfoDb } from '../../../imports/api/inholdinfodb.js';
import {translateWord} from '../Functions/functionFile.js'
import boxFile from '../Boxes/BoxesInfo.json';
import displayFile from '../languages/Settings.json';

SeeBoxes = React.createClass({

	mixins: [ReactMeteorData],

	getMeteorData() 
	{
		var data = {};
		var handle = Meteor.subscribe('inholdinfodb');
	    if(handle.ready()) {

	    		data.sample = InholdInfoDb.find({"Containers Id": { $exists: false } } ).fetch(); // Only catches the boxes that are not storable in others
	    		console.log(data.sample);
		      	// Prepare the object for the info selector component
		      	//*****************************************************************************************
		      	data.list = [];
		      	if (Object.keys(data.sample[0]).length)
		      	{
			      	for (var count = 0 ; count < Object.keys(data.sample[0]).length ; count++)
			      	{
			      		data.list.push(Object.keys(data.sample[0])[count]);
			      	}
			      	
		      	}
		      	console.log(data.list);      	
	      	

	      //*****************************************************************************************
	    }
	    return data;
	},

	getInitialState()
	{
		return {
			searchAttribute : "_id",
			searchValue : "",
			language: this.props.language,
			index : this.props.index

		};
	},

	componentWillReceiveProps: function(nextProps) {
		this.setState({language : nextProps.language , index: nextProps.index});
	},

	shouldComponentUpdate: function(nextProps, nextState) {
		var shallowCompare = require('react-addons-shallow-compare');
		return shallowCompare(this, nextProps, nextState);
	},

	componentDidUpdate: function(prevProps, prevState){ 

	},

	handleSearch : function(event)
	{
		console.log(event.target.value);
		this.setState({searchValue : event.target.value});
	},

	handleSearchAttribute: function(event)
	{
		if(event.target.value != this.state.searchAttribute)
		{
			console.log(event.target.value);
			this.setState({searchAttribute : event.target.value});
		}
	},

	renderSearch() 
	{
		return(
			<div className="center-block">
				<form className="form-inline" >
					<div className="form-group">
						<div style={{"display":"inline-block"}}><AttributeSelector onClick={this.handleSearchAttribute} language={this.state.language} index={this.state.index} boxType={"Otolith Storage Box"}/></div>
						<input type="text" className="form-control" placeholder={displayFile.setups[this.state.index].searchComponent.input.placeholder} onChange={this.handleSearch}/>
						<button type="button" className="btn btn-default">
							<span className="glyphicon glyphicon-search" aria-hidden="true"></span>
						</button>
					</div>
				</form>
			</div>
		);
	},


	clickAddBox()
	{
		var tempArray = [];
		tempArray = FlowRouter.current().path.split("/");
		tempArray.pop();
		tempArray.push("AddBox");
		var tempPathString = "";
		for (var i = 1 ; i< tempArray.length ; i++)
		{
			tempPathString += "/";
			tempPathString += tempArray[i];
		}

		FlowRouter.go(tempPathString);
	},

	render()
	{

				
		return(	
				<div className='container-fluid' >
					<div className="row center-block">
						<div className="text-center">
							{this.renderSearch()}
							<div style={{"margin-top":"20px"}}>
								<BoxDisplayer language={this.state.language} index={this.state.index} searchOptions={[this.state.searchAttribute,this.state.searchValue]}/>
								<button  type="button" className="btn btn-primary center-block" onClick={this.clickAddBox}>{displayFile.setups[this.state.index].SeeBoxPage.buttons.addContent}</button>
							</div>
						</div>
					</div>
				</div>

		);
	}

	
});
//onClick={this.handleSearchAttribute}


//<BoxDisplayer searchOptions={[this.state.searchAttribute,this.state.searchValue]}/>