import { InholdInfoDb } from '../../imports/api/inholdinfodb.js';

STRING = "";

QRPage = React.createClass({

	mixins: [ReactMeteorData],

	getMeteorData: function () {
	    /*var handle = Meteor.subscribe("inholdinfodb",this.props.id);
	    if(handle.ready()) {
      		data.post = Posts.findOne({_id: this.props.id});
    	}
	    //console.log(this.props.id);
	    //console.log(InholdInfoDb.find({_id : this.props.id}).fetch());
	    return {comments: InholdInfoDb.findOne({_id : this.props.id})};*/
	    var data = {};
	    console.log("meteorData");
	    var sampleId = this.props.id;
	   	var tempStringmeteor = "";
	    var handle = Meteor.subscribe('inholdinfodb', sampleId);
	    if(handle.ready()) {
	      data.sample = InholdInfoDb.findOne({_id: sampleId});
	      /*for (var i = 0 ; i<Object.keys(data.sample.InholdInfo).length ; i++)
	      {
	      		tempStringmeteor += Object.keys(data.sample.InholdInfo[i]);
				tempStringmeteor += " : ";
				tempStringmeteor += data.sample.InholdInfo[Object.keys(data.sample.InholdInfo[i])];
	      }*/
	      tempStringmeteor += "InholdInfo : \n";
	      for (var count = 0 ; count < Object.keys(data.sample.InholdInfo).length ; count++)
	      {
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
	      	// put the Box values in a string
	      	tempStringmeteor += Object.keys(data.sample.boxInfo)[count] ;
	      	tempStringmeteor += " : ";
	      	tempStringmeteor += data.sample.boxInfo[Object.keys(data.sample.boxInfo)[count]];
	      	if (count < Object.keys(data.sample.boxInfo).length-1)
	      	{
	      		tempStringmeteor += ", ";
	      	}
	      }
	      data.string = tempStringmeteor;
	      console.log(Object.keys(data.sample.InholdInfo).length);
	      console.log(tempStringmeteor);
	     // data.string = InholdInfoDb.findOne({_id: sampleId})._id;
	      console.log('sample Bon');
	     }
	    return data;
  	},

	getInitialState() {
		console.log("getInitialState");
		return {
			objectTest : {'one' : 'Un', 'Two' : 'Deux'},
			string: ""
		};

	},

	componentWillMount() 
	{
		console.log("componentWillMount");
	},
  


	/*componentWillReceiveProps(nextProps) { //not used yet
		
	},
	*/

	componentDidMount : function() {
		console.log("componentDidMount");
		console.log(InholdInfoDb.findOne({_id: this.props.id}));
		console.log(this.data.sample);
		/*for (var i = 0 ; i< Object.keys(this.data.sample) ; i++)
		{
			console.log(Object.keys(this.data.sample)[i]);
			console.log(this.data.sample[Object.keys(this.data.sample)[i]]);
		}*/
	},


	inholdInfoToString(input,index)
	{
		//marche
		console.log("II");
		var tempString = this.state.string;
		tempString += input;
		tempString += " : ";
		tempString += this.data.sample.InholdInfo[input];
		this.setState({string : tempString.split()});
		
	},

	boxInfoToString(input,index)
	{
		//marche
		var tempString = this.state.string;
		tempString += input;
		tempString += " : ";
		tempString += this.data.sample.boxInfo[input];
		this.setState({string : tempString.split()});
		
	},
	/*

	shouldComponentUpdate(nextProps, nextState) {

		var shallowCompare = require('react-addons-shallow-compare');
		return shallowCompare(this, nextProps, nextState);
	},*/

	renderInholdInfo(input,index)
	{
		//marche
		var tempString = STRING;
		tempString += input;
		tempString += " : ";
		tempString += this.data.sample.InholdInfo[input];
		tempString += ", ";
		STRING = tempString.split();
		console.log(STRING);
		return (
			<tr key={"rowI"+index}>
				<td key={'keyI'+index}>{input}</td>
				<td key={'valueI'+index }>{this.data.sample.InholdInfo[input]}</td>
			</tr>
		)/*
		return (
				<p> {this.data.sample._id}</p>
			)*/
	},

	renderBoxInfo(input,index)
	{
		//marche
		var tempString = STRING;
		tempString += input;
		tempString += " : ";
		tempString += this.data.sample.boxInfo[input];
		tempString += ", ";


		STRING = tempString.split();
		console.log(STRING);
		return (
			<tr key={"rowB"+index}>
				<td key={'keyB'+index}>{input}</td>
				<td key={'valueB'+index }>{this.data.sample.boxInfo[input]}</td>
			</tr>
		)/*
		return (
				<p> {this.data.sample._id}</p>
			)*/
	},

	render() {
		console.log(this.state.objectTest);
		var QRCode = require('qrcode.react');
		return (
			<div className="container">
			  <h2>Values</h2>
			  <p>The .table-bordered class adds borders to a table:</p>
			  <table className="table table-bordered">
			    <tbody>
			    <tr> <td colspan="2">Inhold </td></tr>
			      	{this.data.sample? Object.keys(this.data.sample.InholdInfo).map(this.renderInholdInfo) : <p>  Loading...  </p>}
			    <tr> <td colspan="2">Box </td></tr>	
			    	{this.data.sample? Object.keys(this.data.sample.boxInfo).map(this.renderBoxInfo) : <p>  Loading...  </p>}
			    	<QRCode value={this.data.string} />

			    </tbody>
			  </table>
			</div>
			);/*

			return (
				<div>
				{ Object.keys(this.data.sample).map(this.renderTable) : <p> Loading... </p>}
				</div>
			)*/
	}
});