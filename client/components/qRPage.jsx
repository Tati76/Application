import { InholdInfoDb } from '../../imports/api/inholdinfodb.js';

STRING = "";

QRPage = React.createClass({

	getInitialState() {
		console.log("getInitialState");
		return {
			objectTest : {'one' : 'Un', 'Two' : 'Deux'},
			string: ""
		};

	},

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
	    var handle = Meteor.subscribe('inholdinfodb', sampleId);
	    if(handle.ready()) {
	      data.sample = InholdInfoDb.findOne({_id: sampleId});
	     }
	    return data;
  	},

	/*componentWillReceiveProps(nextProps) { //not used yet
		
	},
	*/


	inholdInfoToString(input,index)
	{
		//marche
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
		STRING = tempString.split();
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
		console.log(tempString);
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

		console.log("rendering");
		console.log(this.data.sample);
		console.log(STRING);
		console.log(this.state.string);

		return (
			<div className="container">
			  <h2>Values</h2>
			  <p>The .table-bordered class adds borders to a table:</p>
			  <table className="table table-bordered">
			    <tbody>
			    <tr> <td colspan="2">Inhold </td></tr>
			      	{this.data.sample? Object.keys(this.data.sample.InholdInfo).map(this.renderInholdInfo) : <tr>  Loading...  </tr>}
			    <tr> <td colspan="2">Box </td></tr>	
			    	{this.data.sample? Object.keys(this.data.sample.boxInfo).map(this.renderBoxInfo) : <tr>  Loading...  </tr>}
			    	
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