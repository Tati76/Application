import { InholdInfoDb } from '../../../imports/api/inholdinfodb.js';
import ipp from 'ipp';
import QRCode from 'qrcode.react';
import stylesheet from './pageQrCodeStyle.css';
import boxFile from '../Boxes/BoxesInfo.json';

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
		      		data.list.push({one : Object.keys(data.sample)[count] , two : data.sample[Object.keys(data.sample)[count]]});
		      	}
		    }
	    }
	    console.log(data.list);
	    //*****************************************************************************************
	    return data;
  	},

  	getInitialState()
  	{
  		return{
  			language : this.props.language,
  			index : this.props.index
  		}
  	},

  	componentWillReceiveProps: function(nextProps) {
		this.setState({language: nextProps.language, index: nextProps.index});
	},

	// To make the component render if a prop or a state changes
	shouldComponentUpdate: function(nextProps, nextState) {
		var shallowCompare = require('react-addons-shallow-compare');
		return shallowCompare(this, nextProps, nextState);
	},

	renderPage()
	{
		return(
			<div>
				<InfoSelector language={this.state.language} index={this.state.index} dataIn={this.data.list}/>
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
