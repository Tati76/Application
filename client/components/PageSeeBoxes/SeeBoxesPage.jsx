import { InholdInfoDb } from '../../../imports/api/inholdinfodb.js';

SeeBoxes = React.createClass({

	mixins: [ReactMeteorData],

	getMeteorData: function () 
	{
		console.log(this.props.boxId);
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
			searchValue : ""

		};
	},

	componentWillReceiveProps: function(nextProps) {

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

			<div className="form-group center-block">

				<AttributeSelector onClick={this.handleSearchAttribute}/>
				<input type="text" className="form-control" id="exampleInputEmail2" placeholder="Search Content (Not Dynamic)" onChange={this.handleSearch}/>
				<button type="button" className="btn btn-default">
					<span className="glyphicon glyphicon-search" aria-hidden="true"></span>
				</button>
			</div>
		);
	},

	render()
	{

				
		return(	
				<div className='container-fluid' >
					<div className="row">
	    				<div className="col-lg-4 col-lg-offset-4">
							<form className="form-inline ">
							  	{this.renderSearch()}
							</form>

							<BoxDisplayer searchOptions={[this.state.searchAttribute,this.state.searchValue]}/>

							<button type="button" className="btn btn-primary">Add Box (Not Dynamic)</button>
						</div>
					</div>
				</div>

		);
	}

	
});
//onClick={this.handleSearchAttribute}


//<BoxDisplayer searchOptions={[this.state.searchAttribute,this.state.searchValue]}/>