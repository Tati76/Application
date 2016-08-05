import { InholdInfoDb } from '../../../../imports/api/inholdinfodb.js';
import {translate} from '../../Functions/functionFile.js'
import boxFile from '../../Boxes/BoxesInfo.json';
import displayFile from '../../languages/Settings.json';

EditableInfoDisplayer = React.createClass({
	findBoxObject(boxType)
	{
		var tempObject = {};
		for (var i = 0 ; i<boxFile.length ; i++)
		{
			if(boxFile[i].name["English"] == boxType)
			{
				tempObject = boxFile[i];
			}
		}
		return tempObject;
	},


	mixins: [ReactMeteorData],

	getMeteorData: function () {
		var data = {};
		var handle = Meteor.subscribe('inholdinfodb');
	    if(handle.ready()) {
	      	data.sample = InholdInfoDb.findOne(this.props.currentBoxId); // Only catches the boxes that are not storable in others
	      	data.fields = this.findBoxObject(data.sample["Box Type"]).forms.content["English"];
	      	data.finalSample = {};
	      	for (var i = 0 ; i< data.fields.length ; i++)
	      	{
	      		data.finalSample[data.fields[i]] = data.sample[data.fields[i]];
	      	}
	    }
	    return data;
	},

	getInitialState()
	{
		var tempObject = {};
		return{
			editCurrentBox : false,
			previousObject : tempObject,
			boxType : this.props.boxType,
			language : this.props.language,
			index : this.props.index
		};
	},

	componentWillReceiveProps: function(nextProps) {
		this.setState({language : nextProps.language, index : nextProps.index, boxType : nextProps.boxType});
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
		for (var i =0 ; i<Object.keys(this.data.finalSample).length ; i++)
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
		console.log("tempResponse",tempResponse);
		console.log("Finished");
		Meteor.call('inholdinfodb.update',this.props.currentBoxId,tempResponse,function(error, result){console.log(result);});

		this.props.onClick(event);

	},

	renderEditableDisplayer: function(input,index)
	{
		console.log("index : " + index);
		if (input =="createdAt")
		{
			var dateToDisplay = this.dateToString(this.data.finalSample[input])
			return(
				<tr key={index}>
					<td className="text-center" ref={"l"+index} value={input}>{translate(input,this.state.language,this.state.boxType)}</td>
					<td className="text-center" ><input ref={index} type="text" className="form-control" placeholder={dateToDisplay} value={this.data.finalSample[input]} disabled/></td>
				</tr>
			);
		}

		else if( input == "_id" || input == "Box Type")
		{
			return(
				<tr key={index}>
					<td className="text-center" ref={"l"+index} value={input}>{translate(input,this.state.language,this.state.boxType)}</td>
					<td className="text-center" ><input ref={index} type="text" className="form-control" placeholder={this.data.sample[input]} value={this.data.finalSample[input]} disabled/></td>
				</tr>
			);
		}

		else
		{
			return(
				<tr key={index}>
					<td className="text-center" ref={"l"+index} value={input}>{translate(input,this.state.language,this.state.boxType)}</td>
					<td className="text-center" ><input ref={index} type="text" className="form-control" placeholder={this.data.finalSample[input]}/></td>
				</tr>
			);
		}
	},

	pressedReturn: function(event)
	{
		this.props.onClick(event);
	},



	render(){

		
			return(
				<div className="container-fluid">
					<h2 className="text-center">{displayFile.setups[this.state.index].EditableInfoDisplayer.title}</h2>
					<form>
						<table border="1" className="table table-bordered">
							<thead>
								<tr>
								    <th Colspan="3" className="text-center"> Info </th>
								    <th> <button type="button" className="btn btn-primary center-block" onClick={this.handleSaveCurrentBox} value="SaveInfo">Save (Not dynamic)</button> </th>
								</tr>
							</thead>
							<tbody>
								{this.data.finalSample? Object.keys(this.data.finalSample).map(this.renderEditableDisplayer) : <tr><td> Loading </td></tr>}
							</tbody>
						</table>
						<button type="button" className="btn btn-primary center-block" onClick={this.pressedReturn} value='Back'>{displayFile.setups[this.state.index].EditableInfoDisplayer.buttons.return}</button>
					</form>


				</div>
			);
		
	}
});

// <DynamicForm language={this.state.language} 
// 							index={this.state.index} 
// 							info={[this.state.toDisplay,this.state.obliged,this.state.cruiseSearch]} 
// 							dbInfo={this.state.dbFields} 
// 							boxType={this.state.selectedBoxType} 
// 							giveValue={this.clickSubmit} 
// 							onReturn={this.clickReturn}
// 							placeHold={[this.state.boxId,this.findContainerIdLabel(this.state.language,this.state.selectedBoxType)]}
// 							isTable={false}/>