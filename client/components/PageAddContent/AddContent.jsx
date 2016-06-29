import { InholdInfoDb } from '../../../imports/api/inholdinfodb.js';

AddContent = React.createClass({

	mixins: [ReactMeteorData],

	getMeteorData: function () 
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
		return null;
	},

	renderPage(index,input) 
	{
		console.log( index);
		console.log(input);
		return (<p key={"test"+index}> test </p>);
	},

	renderOptions(input,index) 
	{
		console.log(input);
		return(
			<option key={"o"+index}> {input} </option>
		);
	},

	renderCompo(input,index)
	{
		console.log(this.data.sample[input]);
		return(
			<a href={ FlowRouter.current().path +"/"+this.data.sample[input]._id} className="list-group-item">
				<SampleViewer key={"c"+index} dbObject={this.data.sample[input]} chosenAttribute='length'/>
			</a>
		);
	},

	render()
	{

				
		return(	
				<div className='container-fluid' >
					<div class="row">
	    				<div class="col-lg-4 col-lg-offset-4">
							<form className="form-inline ">
							  	<div className="form-group center-block">
								    <select className="form-control input" onClick={this.props.onClick}>
										{this.data.list? this.data.list.map(this.renderOptions) : <option> Loading... </option>}
									</select>

								    <input type="text" className="form-control" id="exampleInputEmail2" placeholder="jane.doe@example.com"/>
							  	
								  	<button type="button" className="btn btn-default">
									  	<span className="glyphicon glyphicon-search" aria-hidden="true"></span>
									</button>

								</div>
							</form>
							<div className="container-fluid">
								<div className="list-group">
									{this.data.sample? Object.keys(this.data.sample).map(this.renderCompo) : <p> Loading... </p>}
								</div>
							</div>
						</div>
					</div>
				</div>

		);
	}

	
});


