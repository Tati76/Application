import { InholdInfoDb } from '../../../imports/api/inholdinfodb.js';


AddContentSelectedBox = React.createClass({
	mixins: [ReactMeteorData],

	getMeteorData: function () 
	{
		var data = {};
		var handle = Meteor.subscribe('inholdinfodb');
	    if(handle.ready()) {
	      	data.sample = InholdInfoDb.findOne(this.props.boxId); // Only catches the boxes that are not storable in others
	      	console.log(typeof data.sample);
	    
	      	console.log(data.sample);
	      	// Prepare the object for the info selector component
	      	//*****************************************************************************************
	      	data.list = [];
	      	if (Object.keys(data.sample).length)
	      	{
		      	for (var count = 0 ; count < Object.keys(data.sample).length ; count++)
		      	{
		      		if(Object.keys(data.sample)[count] == "createdAt") // to handle the date and make it printable by transforming it in string and shortening it
		      		{
		      			var tempSplit = data.sample[Object.keys(data.sample)[count]].toString().split(" ");
		      			var tempDate = "";
		      			for (var i=0 ; i<4; i++)
		      			{
		      				tempDate += tempSplit[i];
		      				tempDate += " ";
		      			}
		      			data.list.push({one : Object.keys(data.sample)[count] , two : tempDate});
		      		}
		      		else { // if not a date, do nothing
		      			data.list.push({one : Object.keys(data.sample)[count] , two : data.sample[Object.keys(data.sample)[count]]});
		      		}
		      		
			      	
		      	}
		      	
	      	}
	      	console.log(data.list);
	    }
	    return data;
	},

	renderPage(input, index)
	{
		return(
			<p key={index}> {input.one} : {input.two} </p>
		);
	},

	render(){
		return(

			<div className='container-fluid'>
				<p> {this.props.boxId} </p>

				{this.data.list? this.data.list.map(this.renderPage) : <p> Loading.. </p>}
			</div>

		);
	}
});