BoxInfo = React.createClass({
	
	getInitialState: function() {
		var rep = [];
		for (i=0; i<require("./languages/Settings.json").setups[1].pageBoxInfo.forms[0].inputs.length ; i++)
		{
			rep.push({id : i, name : require("./languages/Settings.json").setups[1].pageBoxInfo.forms[0].inputs[i], value : ""}); //create the response array
			//console.log(require("./languages/languages.json").Setups[this.props.index].boxInfo.forms[0].inputs[i]);
		}


		//no need to add the boxType because it already has been added at the last step
		console.log(require("./languages/Settings.json").setups[1].pageBoxInfo.boxSelection);
			console.log(rep);
		return{
			formsIndex : this.props.boxIndex,
			response : rep, // the response to send to the db
			usedLang : require("./languages/Settings.json").setups[this.props.index].language, // No the default language
			usedLangObject : require("./languages/Settings.json").setups[this.props.index].pageBoxInfo, // refers to the object in fuction of the language selected 
			}
	},
	
	
	
	componentWillReceiveProps: function(nextProps) {
		this.setState({
			usedLang : require("./languages/Settings.json").setups[nextProps.index].language, 
			usedLangObject : require("./languages/Settings.json").setups[nextProps.index].pageBoxInfo, // refers to the object in fuction of the language selected 
			});
			
			// if the language changes, the input has to be set to ""
			this.clearAll();
			
			
	},

	shouldComponentUpdate: function(nextProps, nextState) {
		var shallowCompare = require('react-addons-shallow-compare');
		return shallowCompare(this, nextProps, nextState);
	},

	componentDidUpdate: function(prevProps, prevState){ // NOT used yet
		
		//console.log(prevState.formsIndex);
		
	},
	
	
	clearAll() {
		
		for (var i = 0 ; i< this.state.usedLangObject.forms[this.state.formsIndex].inputs.length ; i++)
			{
				this.refs["a"+i].value = "";
			}
			//console.log(this.state.response);
			
		var resp = []; // put all the values to zero in the response array
			for (i=0; i<require("./languages/Settings.json").setups[1].pageBoxInfo.forms[this.state.formsIndex].inputs.length ; i++) // We put setups[1] to have it in English anyway in the db
			{
				resp.push({id : i, name : require("./languages/Settings.json").setups[1].pageBoxInfo.forms[this.state.formsIndex].inputs[i], value : ""}); //create the response array
				//console.log(require("./languages/languages.json").setups[1].boxInfo.forms[this.state.formsIndex].inputs[i]);
			}
			this.setState({response : resp.slice()});
	},
	
	
	
	handleSubmit(event) {
		
		  this.setState({usedLang: require("./languages/Settings.json").setups[event.target.selectedIndex].language});
		  this.setState({usedLangObject : require("./languages/Settings.json").setups[event.target.selectedIndex].pageBoxInfo});
	  
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
	  
	   //this.setState({this.state.response["By"] = "OK"});
	   
  },
  
  changeForm(event) {
	  var val = event.target.value;
	  
	  if (this.state.formsIndex !== event.target.selectedIndex)
	  {
		  // put the inputs values to 0
	  for (var i = 0 ; i< this.state.usedLangObject.forms[this.state.formsIndex].inputs.length ; i++)
			{
				this.refs["a"+i].value = "";
			}
			
	  }
	  this.setState({formsIndex : event.target.selectedIndex});
			//console.log(this.state.response);
	  
	  // change the response array if the box changes
			var resp = []; 
			for (i=0; i<require("./languages/Settings.json").setups[1].pageBoxInfo.forms[event.target.selectedIndex].inputs.length ; i++) // We put setups[1] to have it in norwegian anyway in the db
			{
				resp.push({id : i, name : require("./languages/Settings.json").setups[1].pageBoxInfo.forms[event.target.selectedIndex].inputs[i], value : ""}); //create the response array
				//console.log(require("./languages/languages.json").setups[1].boxInfo.forms[event.target.selectedIndex].inputs[i]);
			}
			// No need to add the box type because it has already been added at the previous step	
			this.setState({response : resp.slice()});
			//console.log(resp);
			//console.log("STATE RESPONSE");
			//console.log(this.state.response);});
			
			
	  
	  
	  
	  
  },
  
  saveNPrint(){
	  // SAVE
	  var tempResp = {};
	  var tempName = "Storage "; // Using tempName to avoid double attributes in the database so in the database, example : the city where the box is, is called "Box City"
	  for (var i = 0 ; i<this.state.response.length ; i++) 
	  {
  		tempResp[tempName.concat(this.state.response[i].name)] = this.state.response[i].value;
  		tempName = "Storage ";
	  }

	  console.log("RESPONSE");
	  console.log(tempResp);
	  this.clearAll();

	  Meteor.call('inholdinfodb.update',this.props.id,tempResp,function(error, result){console.log(result);});
	  //InholdInfoDb.update({_id : this.props.id},{$set : this.state.response});
	  // PRINT
	  //window.print();
	  var pat = FlowRouter.current().path.split("/");
	  pat.pop();
	  pat.push("pageQr");
	  var temppath = "";
	  for (var i=1 ; i< pat.length ; i++) 
	  {
	  	temppath += "/";
	  	temppath += pat[i];
	  }
	 	console.log(pat);
	 	FlowRouter.go(temppath);
  },

  renderForm(input, index) {
	  	  
    return (
        <div id="container" className="form-group" key={index}>
		<label className="control-label col-sm-2" for="">{input}:</label>
		<div className="col-sm-10">
			<input type="text" key={index}  onChange={this.handleChange.bind(this,index)} ref={'a'+index} className="form-control" id="" placeholder=""/>
		</div>
	</div>
	
    )
  }, 
  
  
  render() {
	console.log("RENDER BOXINFO");
    return (
		<form className="form-horizontal" role="form" onSubmit={this.handleSubmit} media="print">
			
			{this.state.usedLangObject.forms[this.state.formsIndex].inputs.map(this.renderForm)}
			<button type="button" id="but" className="btn btn-default" onClick={this.clearAll}>{this.state.usedLangObject.buttons.clear}</button>
			<button type="button" id="but" className="btn btn-default" onClick={this.saveNPrint}>{this.state.usedLangObject.buttons.save}</button>
		</form>) 
  }
});


