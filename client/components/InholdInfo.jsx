
//import { InholdInfoDb } from '../imports/api/inholdinfodb.js';
InholdInfoDb = new Mongo.Collection('inholdinfodb');
InholdInfo = React.createClass({
	
	
getInitialState: function() {
		
	
		// Creating the response skeletton
		var rep = [];
		for (i=0; i<require("./languages/languages.json").Setups[this.props.index].boxInfo.content[0].inputs.length ; i++)
		{
			rep.push({id : i, name : require("./languages/languages.json").Setups[this.props.index].boxInfo.content[0].inputs[i], value : ""}); //create the response array
			//console.log(require("./languages/languages.json").Setups[this.props.index].boxInfo.content[0].inputs[i]);
		}
		return{
			contentIndex : 0,
			response : rep, // the response to send to the db
			usedLang : require("./languages/languages.json").Setups[this.props.index].language, // No the default language
			usedLangObject : require("./languages/languages.json").Setups[this.props.index], // refers to the object in fuction of the language selected 
			}
	},
	
	
	
	componentWillReceiveProps: function(nextProps) {
		this.setState({
			usedLang : require("./languages/languages.json").Setups[nextProps.index].language, // No the default language
			usedLangObject : require("./languages/languages.json").Setups[nextProps.index], // refers to the object in fuction of the language selected 
			});
			
			// if the language changes, the input has to be set to ""
			this.clearAll();
			
			
	},

	shouldComponentUpdate: function(nextProps, nextState) {
		//console.log(nextState);
		
		//console.log("COMPONENT UPDATING");
		if (nextProps.language !== this.props.language) // if a prop change, update !
		{
			return nextProps.language !== this.props.language;
		}
		else if(nextState.contentIndex !== this.state.contentIndex) // if the form changes, update !
		{
			// Set all the input values to "" when changing form
			
			//console.log("state changed");
			
			//console.log("Size of the resp state : " + this.state.response.length);
			//console.log("Size of resp : " + resp.length);
			
			//console.log(resp);
			return nextState.contentIndex !== this.state.contentIndex;
		}
		else
		{
			return false;
		}
		
	  
	},

	componentDidUpdate: function(prevProps, prevState){ // NOT used yet
		
		//console.log(prevState.contentIndex);
		
	},
	
	
	clearAll() {
		
		for (var i = 0 ; i< this.state.usedLangObject.boxInfo.content[this.state.contentIndex].inputs.length ; i++)
			{
				this.refs["a"+i].value = "";
			}
			//console.log(this.state.response);
			
		var resp = []; // put all the values to zero in the response array
			for (i=0; i<require("./languages/languages.json").Setups[0].boxInfo.content[this.state.contentIndex].inputs.length ; i++) // We put Setups[0] to have it in norwegian anyway in the db
			{
				resp.push({id : i, name : require("./languages/languages.json").Setups[0].boxInfo.content[this.state.contentIndex].inputs[i], value : ""}); //create the response array
				//console.log(require("./languages/languages.json").Setups[0].boxInfo.content[this.state.contentIndex].inputs[i]);
			}
			this.setState({response : resp.slice()});
			//console.log(resp);
			//console.log("STATE RESPONSE");
			//console.log(this.state.response);});
			
					
	},
	
	
	
	handleSubmit(event) {
		
		  this.setState({usedLang: require("./languages/languages.json").Setups[event.target.selectedIndex].language});
		  this.setState({usedLangObject : require("./languages/languages.json").Setups[event.target.selectedIndex]});
	  
	},

  handleChange(index){ // writes the input in the response object when an input is changed
	  
	  var tempArray = this.state.response.slice();
	  for(i=0;i<tempArray.length ; i++)
	  {
		  if (tempArray[i].id == index)
		  {
			  tempArray[i].value = this.refs["a"+index].value;
		  }
	  }
		this.setState({response : tempArray.slice()});
	  console.log(this.state.response);
	   //this.setState({this.state.response["By"] = "OK"});
	   
  },
  
  changeForm(event) {
	  var val = event.target.value;
	  
	  if (this.state.contentIndex !== event.target.selectedIndex)
	  {
		  // put the inputs values to 0
	  for (var i = 0 ; i< this.state.usedLangObject.boxInfo.content[this.state.contentIndex].inputs.length ; i++)
			{
				this.refs["a"+i].value = "";
			}
			
	  }
	  this.setState({contentIndex : event.target.selectedIndex});
			//console.log(this.state.response);
	  
	  // change the response array if the box changes
			var resp = []; 
			for (i=0; i<require("./languages/languages.json").Setups[0].boxInfo.content[event.target.selectedIndex].inputs.length ; i++) // We put Setups[0] to have it in norwegian anyway in the db
			{
				resp.push({id : i, name : require("./languages/languages.json").Setups[0].boxInfo.content[event.target.selectedIndex].inputs[i], value : ""}); //create the response array
				//console.log(require("./languages/languages.json").Setups[0].boxInfo.content[event.target.selectedIndex].inputs[i]);
			}
		this.setState({response : resp.slice()});
			//console.log(resp);
			//console.log("STATE RESPONSE");
			//console.log(this.state.response);});
			
			
	  
	  
	  
	  
  },
  
  nextStep(){
	  // SAVE in the DB
	  //Meteor.call('addInholdInfo',() => {return this.state.response});
	  var testt = {name : this.state.response[0].value};
	  console.log('testt : ' + testt) ;
	  console.log(testt.name);
	  
	  var thisID = InholdInfoDb.insert(this.state.response);
	  
	  console.log("ID : " + thisID);
	  //Route
	  // Creating the route to the next step
		var tempCurrentRouteArray = FlowRouter.current().path.split("/");
		var path = "";
		var tempString = "";
		for (i=1; i<3 ; i++)
		{
			tempString= "/";
			tempString += tempCurrentRouteArray[i];
			path += tempString;
			tempString = "";
		}
		path += "/";
		path += thisID;
		var res = path.concat("/BoxInfo");
	
	  FlowRouter.go(res);
  },

  renderForm(input, index) {
	  	  
    return (
        <div id="container" className="form-group" key={index}>
		<label for={"inp"+index} className="col-sm-2 control-label" for="">{input}:</label>
		<div className="col-sm-10">
			<input type="text" key={index}  onChange={this.handleChange.bind(this,index)} ref={'a'+index} className="form-control" id={"inp"+index} placeholder=""/>
		</div>
	</div>
	
    )
  }, 
  
  
  render() {
	  console.log("RENDER contentINDEX : " + this._id);
    return (
		<form className="form-horizontal" role="form" onSubmit={this.handleSubmit} media="print">
		
		<div id="container" className="form-group" key="selectBox">
		<label className="control-label col-sm-2" for="">{this.state.usedLangObject.boxInfo.content[this.state.contentIndex].test}:</label>
		<div className="col-sm-10">
			<TestTypeSelect language={this.props.language} index={this.props.index} onClick={this.changeForm} className="form-control"/>
		</div>
		</div>


			{this.state.usedLangObject.boxInfo.content[this.state.contentIndex].inputs.map(this.renderForm)}
			<button type="button" id="but" className="btn btn-default" onClick={this.clearAll}>{this.state.usedLangObject.boxInfo.content[this.state.contentIndex].button.clear}</button>
			 <button type="button" id="but" className="btn btn-default" onClick={this.nextStep}>{this.state.usedLangObject.boxInfo.content[this.state.contentIndex].button.save}</button>
		</form>) 
  }
});