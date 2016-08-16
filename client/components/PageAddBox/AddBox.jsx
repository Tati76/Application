//<AddBox language   index
import boxFile from '../Boxes/BoxesInfo.json';
import displayFile from '../languages/Settings.json';
import { HTTP } from 'meteor/http';

AddBox= React.createClass({

	findBoxObject(boxName,prop) 
	{
		var tempFormArray = [];
		var tempObligedArray = [];
		var tempCruiseSearchArray = [];
		var tempDbFieldsArray = [];
		var tempEnglishType = "";
		for (var i = 0 ; i<boxFile.length ; i++)
		{
			if (boxFile[i].name[prop.language] == boxName)
			{
				tempFormArray = boxFile[i].forms.content[prop.language].slice();
				tempObligedArray = boxFile[i].forms.content.obliged.slice();
				tempCruiseSearchArray = boxFile[i].forms.content.cruiseSearch.slice();
				tempDbFieldsArray = boxFile[i].forms.content["English"].slice();
				tempEnglishType = boxFile[i].name["English"];
			}
		}
		var toReturn = [];
		toReturn.push(tempFormArray);
		toReturn.push(tempObligedArray);
		toReturn.push(tempCruiseSearchArray);
		toReturn.push(tempDbFieldsArray);
		toReturn.push(tempEnglishType);

		return toReturn;
	},
	
	getInitialState(){

		return {
			language:this.props.language,
			index: this.props.index,
			form : [],
			obliged : [],
			boxType : "",
			cruiseSearch : [],
			dbFields : [],
			boxType : ""
		};
	},

	componentDidMount()
	{
		HTTP.call("get","http://tomcat7.imr.no:8080/DatasetExplorer/v1/count/Forskningsfart%C3%B8y",
          {"headers": {'Access-Control-Allow-Origin':'http://localhost:3000/',
          'Access-Control-Allow-Methods':'GET, POST, OPTIONS, PUT, PATCH, DELETE',
          'Access-Control-Allow-Headers':'X-Requested-With,content-type',
          'Access-Control-Allow-Credentials': true}},
          function (error, result) {
            if (error) {
             console.log("ERROR");
            	console.error(error);
            }
            else
            {
            	console.log(result);
            }
          });
	},

	componentWillReceiveProps: function(nextProps) {
		var tempBoxObject = this.findBoxObject(event.target.value,nextProps); // bizarre event ici
		this.setState({form : tempBoxObject[0] ,
			obliged : tempBoxObject[1] ,
			cruiseSearch : tempBoxObject[2],
			boxType : tempBoxObject[4],
			language: nextProps.language,
			index: nextProps.index,
			dbFields : tempBoxObject[3]
			
		});
	},

	shouldComponentUpdate: function(nextProps, nextState) {
		var shallowCompare = require('react-addons-shallow-compare');
		return shallowCompare(this, nextProps, nextState);
	},

	componentDidUpdate: function(prevProps, prevState){ 

	},

	clickBoxSelect: function(event)
	{
		var tempBoxObject = this.findBoxObject(event.target.value,this.props);
		this.setState({form : tempBoxObject[0] ,
			obliged : tempBoxObject[1] ,
			boxType : event.target.value,
			cruiseSearch : tempBoxObject[2],
			dbFields : tempBoxObject[3],
			boxType : tempBoxObject[4]
			});
	},

	logChange(val)
	{
		console.log(val);
	},

	clickSubmit(tempObject)
	{
		console.log(tempObject);
		try{
			Meteor.call('inholdinfodb.insert',tempObject,function(error, result)
			{ 
				var tempCurrentRouteArray = FlowRouter.current().path.split("/");
				tempCurrentRouteArray.pop();
				tempCurrentRouteArray.push("SeeBoxes");
				tempCurrentRouteArray.push(result[0]);
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
		tempCurrentRouteArray.push("SeeBoxes");
		var tempPathString = "";
		for(var i = 1 ; i<tempCurrentRouteArray.length ; i++)
		{
			tempPathString+= "/";
			tempPathString += tempCurrentRouteArray[i];
		}
		console.log(tempPathString);

		FlowRouter.go(tempPathString);
	},

	render(){
		var getOptions = function(input, callback) {
		    setTimeout(function() {
		        callback(null, {
		            options: [
		                { value: 'one', label: 'One' },
		                { value: 'two', label: 'Two' }
		            ],
		            // CAREFUL! Only set this to true when there are no more options,
		            // or more specific queries will not be sent to the server.
		            complete: true
		        });
		    }, 5000);
		};

		return(
			<div className='container-fluid'>
				<SelectBoxTypeComponent 
					language={this.state.language}
					index={this.state.index} 
					onClick={this.clickBoxSelect} />
				<DynamicForm 
					language={this.state.language} 
					index={this.state.index} 
					info={[this.state.form,this.state.obliged,this.state.cruiseSearch]} 
					dbInfo={this.state.dbFields} 
					boxType={this.state.boxType} 
					giveValue={this.clickSubmit}
					onReturn={this.clickReturn}
					placeHold={[[],[]]}
					isTable={false}/>
				
			</div>
		);
	}
});