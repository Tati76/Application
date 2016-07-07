import { InholdInfoDb } from '../../../../imports/api/inholdinfodb.js';


EditableInfoDisplayer = React.createClass({

	mixins: [ReactMeteorData],

	getMeteorData: function () {
		var data = {};
		var handle = Meteor.subscribe('inholdinfodb');
	    if(handle.ready()) {
	      	data.sample = InholdInfoDb.findOne(this.props.currentBoxId); // Only catches the boxes that are not storable in others
	    }
	    return data;
	},

	getInitialState()
	{
		var tempObject = {};
		return{
			editCurrentBox : false,
			previousObject : tempObject
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

	handleSaveCurrentBox(event)
	{

		console.log("should save the changed info");
		var tempResponse = {};
		for (var i =0 ; i<Object.keys(this.data.sample).length ; i++)
		{
			if (this.refs["l"+i].value != "createdAt" && this.refs["l"+i].value != "Box Type" && this.refs["l"+i].value != "_id" )
			{
				console.log(this.refs["l"+i].value);
				console.log(this.refs[i].value);
				if (this.refs[i].value != "") // If there is no modification, the value in the database will not change
				{
					tempResponse[this.refs["l"+i].value] = this.refs[i].value;
				}
				
			}
		}
		console.log(tempResponse);

		 Meteor.call('inholdinfodb.update',this.props.currentBoxId,tempResponse,function(error, result){console.log(result);});

		 this.props.onClick(event);

	},

	renderEditableDisplayer: function(input,index)
	{
		console.log("index : " + index);
		if (input =="createdAt")
		{
			var dateToDisplay = this.dateToString(this.data.sample[input])
			return(
				<tr key={index}>
					<td className="text-center" ref={"l"+index} value={input}>{input} (Not dynamic)</td>
					<td className="text-center" ><input ref={index} type="text" className="form-control" placeholder={dateToDisplay} value={this.data.sample[input]} disabled/></td>
				</tr>
			);
		}

		else if( input == "_id" || input == "Box Type")
		{
			return(
				<tr key={index}>
					<td className="text-center" ref={"l"+index} value={input}>{input} (Not dynamic)</td>
					<td className="text-center" ><input ref={index} type="text" className="form-control" placeholder={this.data.sample[input]} value={this.data.sample[input]} disabled/></td>
				</tr>
			);
		}

		else
		{
			return(
				<tr key={index}>
					<td className="text-center" ref={"l"+index} value={input}>{input} (Not dynamic)</td>
					<td className="text-center" ><input ref={index} type="text" className="form-control" placeholder={this.data.sample[input]}/></td>
				</tr>
			);
		}
	},



	render(){

		
			return(
				<div className="container-fluid">
					<h2 className="text-center"> Info Displayer (Not dynamic)</h2>
					<form>
						<table border="1" className="table table-bordered">
							<thead>
								<tr>
								    <th Colspan="3" className="text-center"> Info </th>
								    <th> <button type="button" className="btn btn-primary center-block" onClick={this.handleSaveCurrentBox} value="SaveInfo">Save (Not dynamic)</button> </th>
								</tr>
							</thead>
							<tbody>
								{this.data.sample? Object.keys(this.data.sample).map(this.renderEditableDisplayer) : <tr><td> Loading </td></tr>}
							</tbody>
						</table>
					</form>
				</div>
			);
		
	}
});