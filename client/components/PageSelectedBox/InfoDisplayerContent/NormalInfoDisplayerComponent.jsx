import { InholdInfoDb } from '../../../../imports/api/inholdinfodb.js';
import boxFile from '../../Boxes/BoxesInfo.json';
import displayFile from '../../languages/Settings.json';
import {translateWord, translate} from '../../Functions/functionFile.js'

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

	getInitialState()
	{
		return{
			language : this.props.language,
			index : this.props.index
		}
	},

	componentWillReceiveProps: function(nextProps) {
		this.setState({language: nextProps.language , index : nextProps.index});

	},

	shouldComponentUpdate: function(nextProps, nextState) {
		var shallowCompare = require('react-addons-shallow-compare');
		return shallowCompare(this, nextProps, nextState);
	},

	componentDidUpdate: function(prevProps, prevState){ 

	},

	renderNormalDisplayer: function(input,index)
	{
		if(input == "_id")
		{
			
			return(
					<tr key={index}>
						<td className="text-center">ID</td>
						<td className="text-center">{this.data.sample[input]}</td>
					</tr>
				);
		}
		else if (translate(input,this.state.language,this.data.sample["Box Type"]) == translate("Forelder Id",this.state.language,this.data.sample["Box Type"]))
		{
			var tempArray = [];
			tempArray = FlowRouter.current().path.split("/");
			tempArray.pop();
			tempArray.push(this.data.sample[input]);
			var tempPathString = "";
			for (var i = 1 ; i< tempArray.length ; i++)
			{
				tempPathString += "/";
				tempPathString += tempArray[i];
			}
			return(
					<tr key={index}>
						<td className="text-center">{input}</td>
						<td className="text-center"><a href={tempPathString}>{this.data.sample[input]}</a></td>
					</tr>
				);
		}
		else if( input.split(" ")[0] == "Borrowing" || input.split(" ")[0] == "Storage")
		{
			var space = " ";
			return(
					<tr key={index}>
						<td className="text-center">{translateWord(input.split(" ")[0],this.state.language,this.data.sample["Box Type"])} {space.concat(translateWord(input.split(" ")[1],this.state.language,this.data.sample["Box Type"]))}</td>
						<td className="text-center">{this.data.sample[input]}</td>
					</tr>
				);
		}
		else
		{
			return(
					<tr key={index}>
						<td className="text-center">{translateWord(input,this.state.language,this.data.sample["Box Type"])}</td>
						<td className="text-center">{this.data.sample[input]}</td>
					</tr>
				);
		}
	},

	handleReturn(event)
	{
		Meteor.call('inholdinfodb.update',this.props.currentBoxId,{"Borrowing State" : "Available","Borrowing Person" : "", "Borrowing Place" : "","Borrowing Date" : ""},function(error, result){console.log(result);});
		this.props.onClick(event);
	},

	clickPrint(event)
	{
		FlowRouter.go(FlowRouter.current().path + "/PageQr");
	},

	renderLendButton()
	{	
		console.log(this.data.sample);
		
		if (this.data.sample["Borrowing State"] == "Borrowed")
		{
			return(
				<div>
					<p>{displayFile.setups[this.state.index].NormalInfoDisplayer.info}</p>
					<div className="btn-group btn-group-justified" role="group" aria-label="...">
						<div className="btn-group" role="group">
							<button type="button" className="btn btn-primary" onClick={this.handleReturn} value="Return">{displayFile.setups[this.state.index].NormalInfoDisplayer.buttons.return}</button>
						</div>
						<div className="btn-group" role="group">
							 <button type="button" className="btn btn-primary" onClick={this.clickPrint}>{displayFile.setups[this.state.index].NormalInfoDisplayer.buttons.print}</button>
						</div>
						<div className="btn-group" role="group">
							 <button type="button" className="btn btn-primary" onClick={this.props.onClick} value="Store">{displayFile.setups[this.state.index].NormalInfoDisplayer.buttons.storage}</button>
						</div>
					</div>
				</div>
			);
		}
		else
		{
			return(	
				<div className="btn-group btn-group-justified" role="group" aria-label="...">
					<div className="btn-group" role="group">
						<button type="button" className="btn btn-primary" onClick={this.props.onClick} value="Lend">{displayFile.setups[this.state.index].NormalInfoDisplayer.buttons.lend}</button>
					</div>
					<div className="btn-group" role="group">
						<button type="button" className="btn btn-primary" onClick={this.clickPrint}>{displayFile.setups[this.state.index].NormalInfoDisplayer.buttons.print}</button>
					</div>
					<div className="btn-group" role="group">
						<button type="button" className="btn btn-primary" onClick={this.props.onClick} value="Store">{displayFile.setups[this.state.index].NormalInfoDisplayer.buttons.storage}</button>
					</div>
				</div>
			);
		}
	},

	render(){
		console.log("render NormalInfoDisplayer");
		return(
			<div className="container-fluid" >
				<h2 className="text-center"> {displayFile.setups[this.state.index].NormalInfoDisplayer.title}</h2>
				<form>
					<table border="1" className="table table-bordered">
						<thead>
							<tr>
							    <th Colspan="3" className="text-center"> Info </th>
							    <th> <button type="button" className="btn btn-primary center-block" onClick={this.props.onClick} value="Edit">{displayFile.setups[this.state.index].NormalInfoDisplayer.buttons.edit}</button> </th>
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