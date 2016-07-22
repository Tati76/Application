// <Storage language={this.state.language} 
// index={this.state.index} 
// boxId={this.state.currentBoxId} 
// boxType={this.state.boxObject["Box Type"]} 
// onClick={this.handleClick} />

import boxFile from '../Boxes/BoxesInfo.json';
import displayFile from '../languages/Settings.json';
import {dateToString} from '../Functions/functionFile.js'

Storage = React.createClass({

	findInfoForDynForm(prop,boxType)
	{
		var respArray = [];
		var tempInfoObject = {};
		for (var i = 0 ; i<boxFile.length ; i++)
		{
			if(boxFile[i].name["English"] == boxType)
			{
				tempInfoObject = boxFile[i];
				break;
			}
		}
		respArray.push(tempInfoObject.forms.storage[prop.language]);
		respArray.push(tempInfoObject.forms.storage.obliged);
		var tempCruiseSearch = [];
		for (var i = 0 ; i<tempInfoObject.forms.storage.obliged.length ; i++)
		{
			tempCruiseSearch.push(0);
		}
		respArray.push(tempCruiseSearch);
		return respArray
	},

	findDbFields(boxType)
	{
		var respArray = [];
		var tempInfoObject = {};
		for (var i = 0 ; i<boxFile.length ; i++)
		{
			if(boxFile[i].name["English"] == boxType)
			{
				console.log(boxFile[i].forms.storage["English"]);
				respArray = boxFile[i].forms.storage["English"].slice();
				break;
			}
		}
		return respArray;
	},
	
	getInitialState(){

		return {
			language : this.props.language,
			index : this.props.index,
			boxType : this.props.boxType,
			info : this.findInfoForDynForm(this.props,this.props.boxType).slice(),
			dbFields : this.findDbFields(this.props.boxType).slice(),
			boxId : this.props.boxId

		};
	},

	componentWillReceiveProps: function(nextProps) {
		this.setState({
			language : nextProps.language, 
			index: nextProps.index,
			boxType : nextProps.boxType,
			info : this.findInfoForDynForm(nextProps,nextProps.boxType).slice(),
			dbFields : this.findDbFields(nextProps.boxType).slice(),
			boxId : nextProps.boxId
		});
	},

	shouldComponentUpdate: function(nextProps, nextState) {
		var shallowCompare = require('react-addons-shallow-compare');
		return shallowCompare(this, nextProps, nextState);
	},

	componentDidUpdate: function(prevProps, prevState){ 

	},

	clickSubmit(event)
	{
		console.log("click Submit : ", event.target.value);
	},

	clickReturn(event)
	{
		console.log("click Return : ", event.target.value);
		this.props.onClick(event);
	},

	clickSubmit(arg)
	{
		var tempResp = {};
		for (var i = 0 ; i<Object.keys(arg).length ; i++)
		{
			if (Object.keys(arg)[i] != 'Box Type')
			{
				tempResp["Storage "+Object.keys(arg)[i]] = arg[Object.keys(arg)[i]];
			}
		}
		console.log("REPONSE FINALE : " , tempResp);

		Meteor.call('inholdinfodb.update',this.state.boxId,tempResp,function(error, result){console.log("GOOD")});

		var e = {"target" : {"value" : "Back"}}; // simulates the wish to come backwards
		console.log(e);
		console.log("click submit :", arg);
		console.log("Store In the Database");
		this.props.onClick(e);
	},

	render(){
		return(
			<div className="container-fluid">
			<h2 className="text-center"> {displayFile.setups[this.state.index].storageForm.title} </h2>
				<DynamicForm 
					language={this.state.language} 
					index={this.state.index} 
					info={this.state.info} 
					dbInfo={this.state.dbFields} 
					boxType={this.state.boxType} 
					giveValue={this.clickSubmit}
					onReturn={this.clickReturn}
					placeHold={["",""]}
					isTable={true}/>
			
			</div>
		);
	}
});