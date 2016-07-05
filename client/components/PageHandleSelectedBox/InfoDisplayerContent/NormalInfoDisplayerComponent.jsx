import { InholdInfoDb } from '../../../../imports/api/inholdinfodb.js';


NormalInfoDisplayer = React.createClass({

	mixins: [ReactMeteorData],

	getMeteorData: function () {
		var data = {};
		var handle = Meteor.subscribe('inholdinfodb');
	    if(handle.ready()) {
	      	data.sample = InholdInfoDb.findOne(this.props.currentBoxId); // Only catches the boxes that are not storable in others
	    }
	    console.log(data.sample);
	    return data;
	},

	componentWillReceiveProps: function(nextProps) {

	},

	shouldComponentUpdate: function(nextProps, nextState) {
		var shallowCompare = require('react-addons-shallow-compare');
		return shallowCompare(this, nextProps, nextState);
	},

	componentDidUpdate: function(prevProps, prevState){ 

	},

	dateToString : function(choosenDate)
	{
		var tempSplit = choosenDate.toString().split(" ");
		var tempDate = "";
		for (var i=0 ; i<4; i++)
		{
			tempDate += tempSplit[i];
			tempDate += " ";
		}
		return tempDate;
	},

	renderNormalDisplayer: function(input,index)
	{
		//console.log(input);
		if (input =="createdAt")
		{
			var dateToDisplay = this.dateToString(this.data.sample[input])
			return(
				<tr key={index}>
					<td className="text-center">{input} (Not dynamic)</td>
					<td className="text-center">{dateToDisplay}</td>
				</tr>
			);
		}

		else
		{
			return(
				<tr key={index}>
					<td className="text-center">{input} (Not dynamic)</td>
					<td className="text-center">{this.data.sample[input]}</td>
				</tr>
			);
		}
	},

	handleReturn(event)
	{
		Meteor.call('inholdinfodb.update',this.props.currentBoxId,{"Lend" : "no"},function(error, result){console.log(result);});
		this.props.onClick(event);
	},

	renderLendButton()
	{	
		console.log(this.data.sample);
		
		if (this.data.sample.Lend == "yes")
		{
			return(
				<div className="container-fluid">
					<p> Box Already Lent (Not Dynamic)</p>
					<button type="button" className="btn btn-primary center-block" onClick={this.handleReturn} value="Return">Return this Box (Not dynamic)</button>
				</div>
			);
		}
		else
		{
			return(	
				<button type="button" className="btn btn-primary center-block" onClick={this.props.onClick} value="Lend">Lend this box (Not dynamic)</button>
			);
		}
	},

	render(){
		console.log("render NormalInfoDisplayer");
		return(
			<div className="container-fluid" >
				<h2 className="text-center"> Info Displayer (Not dynamic)</h2>
				<form>
					<table border="1" className="table table-bordered">
						<thead>
							<tr>
							    <th Colspan="3" className="text-center"> Info </th>
							    <th> <button type="button" className="btn btn-primary center-block" onClick={this.props.onClick} value="Edit">Edit (Not dynamic)</button> </th>
							</tr>
						</thead>
						<tbody>
							{this.data.sample? Object.keys(this.data.sample).map(this.renderNormalDisplayer) : <tr><td> Loading </td></tr>}
						</tbody>
					</table>
					{this.data.sample? this.renderLendButton() : <p> Loading.. </p>}
				</form>
				
			</div>
		);
	}
});