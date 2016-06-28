import { InholdInfoDb } from '../../../imports/api/inholdinfodb.js';

AddContent = React.createClass({

	mixins: [ReactMeteorData],

	getMeteorData: function () 
	{
		var data = {};
		var handle = Meteor.subscribe('inholdinfodb');
	    if(handle.ready()) {
	      	data.sample = InholdInfoDb.find({InholdInfo: { ContainersId : { $exists: true } } } ).fetch(); // Only catches the boxes that are not storable in others
	      	console.log(data.sample);
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
		return (<p> test </p>);
	},

	render()
	{
		return(<div>
				{this.data.sample? Object.keys(this.data.sample).map(this.renderPage) : <p> Loading... </p>}
			</div>

		);
	}
	
});