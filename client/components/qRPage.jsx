import { InholdInfoDb } from '../../imports/api/inholdinfodb.js';
import ipp from 'ipp';
import QRCode from 'qrcode.react';
import stylesheet from './PageQrCode/pageQrCodeStyle.css';

QRPage = React.createClass({

	mixins: [ReactMeteorData],

	getMeteorData: function () {
	    
	    var data = {};
	    var sampleId = this.props.id;
	    var handle = Meteor.subscribe('inholdinfodb', sampleId);
	    if(handle.ready()) {
	      	data.sample = InholdInfoDb.findOne({_id: sampleId});
	      
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
	      	

	      //*****************************************************************************************
	     }
	    return data;
  	},

	renderPage()
	{
		return(
			<div>
				<InfoSelector dataIn={this.data.list}/>
			</div>
		);
	},

	render() {
		return (
			<div class="QrContainer" className="container" >
				
				{this.data.list? this.renderPage(this) : <p> Loading... </p>}
				
			</div>
		);
	}
});
