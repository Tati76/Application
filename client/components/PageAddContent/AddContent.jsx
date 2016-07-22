// <AddContent language={this.props.language} index={this.props.index} boxId={this.props.contentId}
// <AddContent language='Norsk' index=0 boxId="sldkfldfsdlfjsdlf" boxType="Otolitt Stor Kartong Boks" />

import { InholdInfoDb } from '../../../imports/api/inholdinfodb.js';
import boxFile from '../Boxes/BoxesInfo.json';
import settingsFile from '../languages/Settings.json';

AddContent = React.createClass({

	mixins: [ReactMeteorData],

	getMeteorData: function () {
		console.log("getMeteorData");
		var data = {};
		var handle = Meteor.subscribe('inholdinfodb');
	    if(handle.ready()) {

	    	data.sample = InholdInfoDb.findOne(this.props.boxId); // catches the wanted box
	    	data.currentClass = this.findBoxClass("English",data.sample["Box Type"]); // all in the database is in english
	    	console.log(data.sample["BoxType"]);
	    }
		return data;
	},

	findBoxClass: function(language,currentBoxType)
	{
		var resp = -1;
		for(var a = 0 ; a<boxFile.length ; a++)
		{
			console.log(boxFile[a].name[language]);
			console.log(currentBoxType);
			if(boxFile[a].name[language] == currentBoxType)
			{
				resp = boxFile[a].containerClass;
				break;
			}
		}
		return resp;
	},
	
	findBoxTypes: function(language,currentBoxType)
	{

		var tempBoxTypeList = [];
		for(var i = 0 ; i<boxFile.length ; i++)
		{
			if(this.findBoxClass(language,currentBoxType) < boxFile[i].containerClass)
			{
				tempBoxTypeList.push(boxFile[i].name[language]);
			}
		}

		return tempBoxTypeList;
	},

	getBox(language,name)
	{
		for(var i = 0 ; i<boxFile.length ; i++)
		{
			if (boxFile[i].name[language] == name)
			{
				return boxFile[i];
			}
		}
	},

	getInitialState()
	{
		return {
			language : this.props.language,
			index : this.props.index,
			boxId : this.props.boxId,
			selectedBoxType : "",
			toDisplay : [],
			obliged : [],
			cruiseSearch : [],
			dbFields : []
		};
	},

	componentWillReceiveProps: function(nextProps) {

		if(this.state.selectedBoxType != "")
		{
			var tempBox = this.getBox(this.state.language,this.state.selectedBoxType);
			this.setState({
				selectedBoxType : tempBox.name[nextProps.language],
				language : nextProps.language, 
				index: nextProps.index, 
				boxId: nextProps.boxId,
				toDisplay : tempBox.forms.content[nextProps.language],
				obliged : tempBox.forms.content.obliged,
				cruiseSearch : tempBox.forms.content.cruiseSearch,
				dbFields : tempBox.forms.content["English"]
				});
		}
		else
		{
		this.setState({
			selectedBoxType : "",
			language : nextProps.language, 
			index: nextProps.index, 
			boxId: nextProps.boxId,
			toDisplay : [],
			obliged : [],
			cruiseSearch : [],
			dbFields : []
			});
		}
		
	},

	shouldComponentUpdate: function(nextProps, nextState) {
		console.log(this.data.sample["Box Type"]);
		console.log(nextState.selectedBoxType);
		var shallowCompare = require('react-addons-shallow-compare');
		return shallowCompare(this, nextProps, nextState);
	},

	componentDidUpdate: function(prevProps, prevState){ 

	},



	clickBoxSelect(event)
	{
		console.log("box type : ",event.target.value);
		console.log(event.target.value);
		this.setState({selectedBoxType : event.target.value});

		var tempBox = this.getBox(this.props.language,event.target.value);
		console.log(tempBox.forms.content['English']);
		console.log(tempBox.forms.content[this.props.language]);
		console.log(tempBox.forms.content.obliged);
		console.log(tempBox.forms.content.cruiseSearch);
		this.setState({dbFields: tempBox.forms.content['English'],
			toDisplay : tempBox.forms.content[this.props.language],
			obliged : tempBox.forms.content.obliged,
			cruiseSearch : tempBox.forms.content.cruiseSearch,
			selectedBoxType : event.target.value});
	},

	giveValue(arg)
	{
		console.log(arg);
	},

	findContainerIdLabel(lang,type)
	{
		if(type != "" && type.length > 0)
		{
			var box = this.getBox(lang,type);
			var indexOfContentId = 0;
			for(var i = 0 ; i<box.forms.content["English"].length ; i++)
			{
				if (box.forms.content["English"][i] == "Parent Id")
				{
					indexOfContentId = i;
				}
			}

			var res = box.forms.content[this.props.language][indexOfContentId];
			console.log(res);
			return res;
		}
		else
		{
			return null;
		}

	},

	toEnglishType(boxType,currentLanguage)
	{
		var tempTypeName = "";
		for(var i = 0 ; i<boxFile.length ; i++)
		{
			if(boxFile[i].name[currentLanguage] == boxType)
			{
				tempTypeName = boxFile[i].name["English"];
				break;
			}
		}

		return tempTypeName;
	},

	clickSubmit(tempObject)
	{
		console.log(tempObject);
		tempObject["Box Type"] = this.toEnglishType(tempObject["Box Type"],this.state.language);
		try{
			Meteor.call('inholdinfodb.insert',tempObject,function(error, result)
			{ 
				var tempCurrentRouteArray = FlowRouter.current().path.split("/");
				tempCurrentRouteArray.pop();
				var tempPathString = "";
				for(var i = 1 ; i<tempCurrentRouteArray.length ; i++)
				{
					tempPathString+= "/";
					tempPathString += tempCurrentRouteArray[i];
				}
				console.log(tempPathString);

				FlowRouter.go(tempPathString);
			});
		}catch(error)
		{
			console.log(error);
		}
	},

	clickReturn(event)
	{
		var tempCurrentRouteArray = FlowRouter.current().path.split("/");
		tempCurrentRouteArray.pop();
		var tempPathString = "";
		for(var i = 1 ; i<tempCurrentRouteArray.length ; i++)
		{
			tempPathString+= "/";
			tempPathString += tempCurrentRouteArray[i];
		}
		console.log(tempPathString);

		FlowRouter.go(tempPathString);
	},

	renderPage:function(dataSample)
	{
		return(
			<div>
				<SelectBoxTypeClassComponent language={this.state.language} 
							index={this.props.index} 
							containerBox={dataSample} 
							onClick={this.clickBoxSelect}/>

				<DynamicForm language={this.state.language} 
							index={this.state.index} 
							info={[this.state.toDisplay,this.state.obliged,this.state.cruiseSearch]} 
							dbInfo={this.state.dbFields} 
							boxType={this.state.selectedBoxType} 
							giveValue={this.clickSubmit} 
							onReturn={this.clickReturn}
							placeHold={[this.state.boxId,this.findContainerIdLabel(this.state.language,this.state.selectedBoxType)]}
							isTable={false}/>
			</div>
		);
	},

	render()
	{
		return(
			<div>
				{this.data.sample? 
					this.renderPage(this.data.sample)
				 : <p> Loading </p>}
			</div>
		);
	}
});


// <DynamicForm language={this.state.language} 
// 							index={this.state.index} 
// 							info={[this.state.toDisplay,this.state.obliged,this.state.cruiseSearch]} 
// 							dbInfo={this.state.dbFields} 
// 							boxType={dataSample["Box Type"]} 
// 							giveValue={this.clickSubmit} 
							// placeHold={[this.state.boxId,this.findContainerIdLabel(this.props.language,this.state.selectedBoxType)]}/>