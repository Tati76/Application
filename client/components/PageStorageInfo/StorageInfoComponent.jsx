// <Storage language={this.state.language} 
// index={this.state.index} 
// boxId={this.state.currentBoxId} 
// boxType={this.state.boxObject["Box Type"]} 
// onClick={this.handleClick} />
import {translate} from '../Functions/functionFile.js';
import { InholdInfoDb } from '../../../imports/api/inholdinfodb.js';
import boxFile from '../Boxes/BoxesInfo.json';
import displayFile from '../languages/Settings.json';
import {dateToString} from '../Functions/functionFile.js'

Storage = React.createClass({


	mixins: [ReactMeteorData],

	getMeteorData: function () {
		var data = {};
		var handle = Meteor.subscribe('inholdinfodb');
	    if(handle.ready()) 
	    {
	      	data.sample = InholdInfoDb.findOne(this.props.boxId); // Only catches the boxes that are not storable in others
	      	data.finalSample = [[],[],[]];
	      	for (var i = 0 ; i< Object.keys(data.sample).length ; i++)
	      	{
	      		var test = Object.keys(data.sample);
	      		if(Object.keys(data.sample)[i].split(" ")[0] == "Storage" && data.sample[Object.keys(data.sample)[i]].length > 0)
	      		{
	      			console.log(Object.keys(data.sample)[i].split(" ")[1]);
	      			console.log(this.state.language);
	      			console.log(data.sample['Box Type']);
	      			console.log(translate(Object.keys(data.sample)[i].split(" ")[1],this.state.language,data.sample['Box Type']));
	      			data.finalSample[1].push(translate(Object.keys(data.sample)[i].split(" ")[1],this.state.language,data.sample['Box Type']));
	      			data.finalSample[0].push(data.sample[Object.keys(data.sample)[i]]);
	      			data.finalSample[2].push(false); // the field is not disabled
	      		}
	      	}
	      	console.log("**************************************************************************************************************");
	    }
	    return data;
	},


	findInfoForDynForm(prop,boxType) // finds the info props for the dynamic form
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

	findDbFields(boxType) // finds the dbInfo props for the dynamic form
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
				{this.data.finalSample ? 
				<div>
				<h2 className="text-center text-primary"> {displayFile.setups[this.state.index].storageForm.title} </h2>
					<DynamicForm 
						language={this.state.language} 
						index={this.state.index} 
						info={this.state.info} 
						dbInfo={this.state.dbFields} 
						boxType={this.state.boxType} 
						giveValue={this.clickSubmit}
						onReturn={this.clickReturn}
						placeHold={this.data.finalSample}
						isTable={true}/>
				</div>
				 : <p> Loading... </p> }
			 </div>
		);
	}
});