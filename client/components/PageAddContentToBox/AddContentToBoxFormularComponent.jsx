import { InholdInfoDb } from '../../../imports/api/inholdinfodb.js';
import boxFile from '../Boxes/BoxesInfo.json';
import settingsFile from '../languages/Settings.json';

AddContentToBoxFormular = React.createClass({
	
	findTheInputArray : function(boxName)
	{
		for (var i =0 ; i< settingsFile.setups[1].pageInholdInfo.forms.length ; i++)
		{
			if(settingsFile.setups[1].pageInholdInfo.forms[i].name == boxName)
			{
				var result = settingsFile.setups[1].pageInholdInfo.forms[i].inputs.slice();
			}
		}

		return result;
	},

	createResponseSkeleton(selectedObject){
		var tempResp = [];
		for(var i = 0 ; i<selectedObject.length ; i++) // create the response skeleton
		{
			if(selectedObject[i] == "Containers Id")
			{
				tempResp.push({name : selectedObject[i] , value : this.props.boxId});
			}

			else{
				tempResp.push({name : selectedObject[i] , value : ""});
			}
		}
		// Add the box type
		tempResp.push({name : "Box Type" , value : this.props.boxType});
		
		return tempResp;
	},

	changeResponseStateValue: function(index,input){
		var tempArray = this.state.response.slice();
		tempArray[index].value = input;
		this.setState({response : tempArray.slice()});
	},

	clearAll()
	{
		console.log(this.state.selectedBoxTypeAttributes.length);
		for (var i = 0 ; i<this.state.selectedBoxTypeAttributes.length ; i++) 
		{
			
			if (this.refs["l"+i].value == "Containers Id")// The Containers Id cannot be changed
			{
				console.log(this.refs["l"+i].value);
			}
			else{
				console.log(this.refs[i].value);
				console.log(this.refs["l"+i].value);
				this.refs[i].value = "";
			}
			
		}

		this.setState({ response : this.createResponseSkeleton(this.state.selectedBoxTypeAttributes)});
	},

	getInitialState(){
		console.log("BOX TYPE PROPS : " + this.props.boxTypeToAdd);
		var tempBoxTypeAttributes = this.findTheInputArray(this.props.boxTypeToAdd).slice();
		var tempResponse = this.createResponseSkeleton(tempBoxTypeAttributes).slice();
		console.log(tempResponse);

		return {
			selectedBoxTypeAttributes :tempBoxTypeAttributes.slice(),
			response : tempResponse
		};
	},

	componentWillReceiveProps: function(nextProps) {
		var tempBTA = this.findTheInputArray(nextProps.boxTypeToAdd).slice(); // New BoxType Choosen 
		var tempR = this.createResponseSkeleton(tempBTA).slice(); // adapt the new response skeleton vs the new choosen box
		this.clearAll(); //clearAll the inputs
		console.log(tempBTA);
		console.log(tempR);
		this.setState({selectedBoxTypeAttributes : tempBTA});
		this.setState({response : tempR});
	},

	shouldComponentUpdate: function(nextProps, nextState) {
		var shallowCompare = require('react-addons-shallow-compare');
		return shallowCompare(this, nextProps, nextState);
	},

	componentDidUpdate: function(prevProps, prevState){ 

	},

	handleSave: function(event)
	{
		console.log(event.target.value);
		var insertableResponse ={};
		for (var i=0 ; i< this.state.response.length ; i++) 
		{
			insertableResponse[this.state.response[i].name] = this.state.response[i].value;
		}
		console.log(insertableResponse);

		Meteor.call('inholdinfodb.insert',insertableResponse,this.state.contentIndex,function(error, result){ console.log(result) }); // insert in the Database

		// Route to the Container Box Again

		var pathArray = FlowRouter.current().path.split("/");
		console.log(pathArray);
	  	pathArray.pop();
	  	console.log(pathArray);
	  	var tempPath = "";
	  	for (var i =1; i<pathArray.length ; i++)
	  	{
	  		tempPath += "/";
	  		tempPath += pathArray[i];
	  		
	  		console.log(tempPath);
	  	}
	  	console.log(tempPath);
	  	FlowRouter.go(tempPath);
	},

	handleTypingInput: function(index,event)
	{
		console.log(this.state.response);
		this.changeResponseStateValue(index,event.target.value);
	},


	renderForm(input,index){

		if(input =="Containers Id")
		{
			return(
				<div key={index} className="form-group form-group-sm">
				    <label ref={"l"+index} for="" className="col-sm-2 control-label" value={input}>{input}</label>
				    <div className="col-sm-10">
				      	<input type="text" ref={index} className="form-control" id="" placeholder={this.props.boxId} disabled/>
				    </div>
				</div>
			);
		}
		else{
			return(
			<div key={index} className="form-group form-group-sm">
			    <label ref={"l"+index} for="" className="col-sm-2 control-label" value={input}>{input}</label>
			    <div className="col-sm-10">
			      	<input type="text" ref={index} className="form-control" id="" onChange={this.handleTypingInput.bind(this,index)}/>
			    </div>
			</div>
			);
		}
		
	},

	render(){
		return(
			<div className="container-flux" style={{"border":"1px solid black","paddingLeft" : "30px","paddingRight" : "30px"}}>
				<h2 className="text-center"> Form (Not dynamic)</h2>
				<form className="form-horizontal">
					{this.state.selectedBoxTypeAttributes.map(this.renderForm)}
				</form>
				<button type="button" className="btn btn-primary" onClick={this.clearAll}>Clear All (Not dynamic)</button>
				<button type="button" className="btn btn-primary" onClick={this.handleSave}>Save (Not dynamic)</button>
			</div>
		);
	}
});