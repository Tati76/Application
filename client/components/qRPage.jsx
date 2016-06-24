import { InholdInfoDb } from '../../imports/api/inholdinfodb.js';
import ipp from 'ipp';
import QRCode from 'qrcode.react';
import stylesheet from './PageQrCode/pageQrCodeStyle.css';

QRPage = React.createClass({

	mixins: [ReactMeteorData],

	getMeteorData: function () {
	    
	    var data = {};

	    var sampleId = this.props.id;
	   	var tempStringmeteor = "";
	    var handle = Meteor.subscribe('inholdinfodb', sampleId);
	    if(handle.ready()) {
	      	data.sample = InholdInfoDb.findOne({_id: sampleId});
	      
	      	// PUT ALL THE INFO IN THE QRCODE STRING CONTENT
	      	//*****************************************************************************************
	      	tempStringmeteor += "InholdInfo : \n";
	      	data.List = [];
	      	if (Object.keys(data.sample.InholdInfo).length)
	      	{
		      	for (var count = 0 ; count < Object.keys(data.sample.InholdInfo).length ; count++)
		      	{
		      		data.List.push({one : Object.keys(data.sample.InholdInfo)[count] , two : data.sample.InholdInfo[Object.keys(data.sample.InholdInfo)[count]]});
			      	// put the Inhold values in a string
			      	tempStringmeteor += Object.keys(data.sample.InholdInfo)[count] ;
			      	tempStringmeteor += " : ";
			      	tempStringmeteor += data.sample.InholdInfo[Object.keys(data.sample.InholdInfo)[count]];
			      	if (count < Object.keys(data.sample.InholdInfo).length-1)
			      	{
			      		tempStringmeteor += ", ";
			      	}
		      	}
		      	tempStringmeteor += "\n \n boxInfo : \n";

		      	for (var count = 0 ; count < Object.keys(data.sample.boxInfo).length ; count++)
		      	{
		      		data.List.push({one : Object.keys(data.sample.boxInfo)[count], two : data.sample.boxInfo[Object.keys(data.sample.boxInfo)[count]]});
			      	// put the Box values in a string
			      	tempStringmeteor += Object.keys(data.sample.boxInfo)[count] ;
			      	tempStringmeteor += " : ";
			      	tempStringmeteor += data.sample.boxInfo[Object.keys(data.sample.boxInfo)[count]];
			      	if (count < Object.keys(data.sample.boxInfo).length-1)
			      	{
			      		tempStringmeteor += ", ";
			      	}
		      	}
	      	}
	      	data.string = tempStringmeteor;

	      //*****************************************************************************************
	     }
	    return data;
  	},

	getInitialState() {

		return {
			objectTest : {'one' : 'Un', 'Two' : 'Deux'},
			string: ""
		};
	},


	inholdInfoToString(input,index)
	{
		var tempString = this.state.string;
		tempString += input;
		tempString += " : ";
		tempString += this.data.sample.InholdInfo[input];
		this.setState({string : tempString.split()});
		
	},

	boxInfoToString(input,index)
	{
		var tempString = this.state.string;
		tempString += input;
		tempString += " : ";
		tempString += this.data.sample.boxInfo[input];
		this.setState({string : tempString.split()});
		
	},

	renderInholdInfo(input,index)
	{
		return (
			<tr key={"rowI"+index}>
				<td key={'keyI'+index} className='text-center'>{input}</td>
				<td key={'valueI'+index } className='text-center'>{this.data.sample.InholdInfo[input]}</td>
			</tr>
		)
	},

	renderBoxInfo(input,index)
	{
		return (
			<tr className={stylesheet.cell} key={"rowB"+index}>
				<td key={'keyB'+index} style={{'font-style': 'italic'}} className='text-center'>{input}</td>
				<td key={'valueB'+index } className='text-center'>{this.data.sample.boxInfo[input]}</td>
			</tr>
		)
	},

	renderPage()
	{
		return(
			<div>
				<InfoSelector dataIn={this.data.List}/>
			</div>
		);
	},

	render() {
		return (
			<div class="QrContainer" className="container" >
				
				{this.data.List? this.renderPage(this) : <p> Loading... </p>}
				
			</div>
		);
	}
});


/*<button  type="button" className="btn btn-default hidden-print" onClick={this.handleClick}>Print</button>
				
<table className={stylesheet.table} style={{'maxWidth':'80mm'}}>

							<tbody>
							    <tr className={stylesheet.cell}> <th colspan="2" className='text-center'>Inhold</th></tr>
							    {this.data.sample? Object.keys(this.data.sample.InholdInfo).map(this.renderInholdInfo) : <p>  Loading...  </p>}
							    <tr className={stylesheet.cell}> <th colspan="2" className='text-center'>Box</th></tr>	
							    {this.data.sample? Object.keys(this.data.sample.boxInfo).map(this.renderBoxInfo) : <p>  Loading...  </p>}	    	
							</tbody>
						</table>
						
						<QRCode style={{'margin':'auto'}} value={this.data.string} size="196"/>
						*/