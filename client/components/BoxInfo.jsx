BoxInfo = React.createClass({
	
	getInitialState: function() {
		var rep = [];
		for (i=0; i<require("./languages/languages.json").Setups[this.props.index].boxInfo.forms[0].inputs.length ; i++)
		{
			rep.push({id : i, name : require("./languages/languages.json").Setups[this.props.index].boxInfo.forms[0].inputs[i], value : ""}); //create the response array
			//console.log(require("./languages/languages.json").Setups[this.props.index].boxInfo.forms[0].inputs[i]);
		}
		return{
			formsIndex : 0,
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
		else if(nextState.formsIndex !== this.state.formsIndex) // if the form changes, update !
		{
			// Set all the input values to "" when changing form
			
			//console.log("state changed");
			
			//console.log("Size of the resp state : " + this.state.response.length);
			//console.log("Size of resp : " + resp.length);
			
			//console.log(resp);
			return nextState.formsIndex !== this.state.formsIndex;
		}
		else
		{
			return false;
		}
		
	  
	},

	componentDidUpdate: function(prevProps, prevState){ // NOT used yet
		
		//console.log(prevState.formsIndex);
		
	},
	
	
	clearAll() {
		
		for (var i = 0 ; i< this.state.usedLangObject.boxInfo.forms[this.state.formsIndex].inputs.length ; i++)
			{
				this.refs["a"+i].value = "";
			}
			//console.log(this.state.response);
			
		var resp = []; // put all the values to zero in the response array
			for (i=0; i<require("./languages/languages.json").Setups[0].boxInfo.forms[this.state.formsIndex].inputs.length ; i++) // We put Setups[0] to have it in norwegian anyway in the db
			{
				resp.push({id : i, name : require("./languages/languages.json").Setups[0].boxInfo.forms[this.state.formsIndex].inputs[i], value : ""}); //create the response array
				//console.log(require("./languages/languages.json").Setups[0].boxInfo.forms[this.state.formsIndex].inputs[i]);
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
	  
	   //this.setState({this.state.response["By"] = "OK"});
	   
  },
  
  changeForm(event) {
	  var val = event.target.value;
	  
	  if (this.state.formsIndex !== event.target.selectedIndex)
	  {
		  // put the inputs values to 0
	  for (var i = 0 ; i< this.state.usedLangObject.boxInfo.forms[this.state.formsIndex].inputs.length ; i++)
			{
				this.refs["a"+i].value = "";
			}
			
	  }
	  this.setState({formsIndex : event.target.selectedIndex});
			//console.log(this.state.response);
	  
	  // change the response array if the box changes
			var resp = []; 
			for (i=0; i<require("./languages/languages.json").Setups[0].boxInfo.forms[event.target.selectedIndex].inputs.length ; i++) // We put Setups[0] to have it in norwegian anyway in the db
			{
				resp.push({id : i, name : require("./languages/languages.json").Setups[0].boxInfo.forms[event.target.selectedIndex].inputs[i], value : ""}); //create the response array
				//console.log(require("./languages/languages.json").Setups[0].boxInfo.forms[event.target.selectedIndex].inputs[i]);
			}
			this.setState({response : resp.slice()});
			//console.log(resp);
			//console.log("STATE RESPONSE");
			//console.log(this.state.response);});
			
			
	  
	  
	  
	  
  },
  
  saveNPrint(){
	  // SAVE
	  InholdInfoDb.update({_id : this.props.id},{$set : this.state.response});
	  // PRINT
	  window.print();
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
	  //console.log("RENDER FORMSINDEX : " + this.state.formsIndex);
    return (
		<form className="form-horizontal" role="form" onSubmit={this.handleSubmit} media="print">
		<div id="container" className="form-group" key="selectBox">
		<label className="control-label col-sm-2" for="">{this.state.usedLangObject.boxInfo.forms[this.state.formsIndex].box}:</label>
		<div className="col-sm-10">
		<BoxTypeSelect language={this.props.language} index={this.props.index} onClick={this.changeForm}/>
		</div>
	</div>
			{this.state.usedLangObject.boxInfo.forms[this.state.formsIndex].inputs.map(this.renderForm)}
			<button type="button" id="but" className="btn btn-default" onClick={this.clearAll}>{this.state.usedLangObject.boxInfo.forms[this.state.formsIndex].button.clear}</button>
			 <button type="button" id="but" className="btn btn-default" onClick={this.saveNPrint}>{this.state.usedLangObject.boxInfo.forms[this.state.formsIndex].button.save}</button>
		</form>) 
  }
});


