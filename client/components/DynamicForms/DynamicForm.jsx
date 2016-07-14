// <DynamicForm language={this.props.language} index={this.props.index} info=[toDisplay list,obliged list]

// CLASSIFICATION OF THE DIFFERENT INPUT DISPLAYS AVAILABLE
// VALUE    EFFECT
//   0 		Nothing
//   1 		Successfull
//   2 		Warning
//   3 		ERROR
//   4 		Info



DynamicForm = React.createClass({

	isErrorOnField: function()
	{
		var tempErrorArray = [];
		var errorSpotted = false;
		for (var i = 0 ; i<this.state.toDisplay.length ; i++) // go through all the inputs
		{
			if (this.refs[i].value == "" && this.state.obligedFields[i]) // Case not filled as obliged to (error)
			{
				tempErrorArray.push(3);
				errorSpotted = true;
			}
			else if(this.refs[i].value == "" && !this.state.obligedFields[i]) // Case not filled and not obliged to (warning)
			{
				tempErrorArray.push(2);
			}
			else{
				tempErrorArray.push(1);
			}
		}
		this.setState({errorArray : tempErrorArray.slice()});

		return errorSpotted;
	},
	
	getInitialState(){
		var tempErrorArray = [];
		for (var i = 0 ; i< this.props.info[0] ; i++)
		{
			tempErrorArray.push(0);
		}
		
		return {
			language : this.props.language,
			index : this.props.index,
			toDisplay : this.props.info[0],
			errorArray : tempErrorArray.slice(),
			obligedFields : this.props.info[1],
			yearList : null,
			shipList : null,
			year : "",
			ship : ""
		};
	},

	componentWillReceiveProps: function(nextProps) {
		this.setState({language : nextProps.language, index : nextProps.index, toDisplay : nextProps.info[0], obliged : nextProps.info[1]});
	},

	shouldComponentUpdate: function(nextProps, nextState) {
		var shallowCompare = require('react-addons-shallow-compare');
		return shallowCompare(this, nextProps, nextState);
	},

	componentDidUpdate: function(prevProps, prevState){ 

	},

	handleYearList(arg)
	{
		console.log("In the form year list is equal to :");
		console.log(arg);
		//this.setState({yearList : arg.split(",").slice()},function(){console.log(this.state.yearList);});
		if(!arg)
		{
			this.setState({yearList : null, shipList : null },function(){console.log("yearlist : ",this.state.yearList);console.log("shipList", this.state.shipList);});
		}
		else
		{
			this.setState({yearList : arg.split(",").slice()},function(){console.log("yearlist : ",this.state.yearList);console.log("shipList", this.state.shipList);});
		}
	},

	handleShipList(arg)
	{
		console.log("In the form ship list is equal to :");
		console.log(arg);
		var tempShipList = [];
		if (arg)
		{
				for (var i = 0 ; i<arg.split(",").length ; i++)
			{
				tempShipList.push({year : arg.split(",")[i].slice(0,4) , ship : arg.split(",")[i].slice(5,arg.length)});
			}
			// console.log(tempShipList);
			this.setState({shipList : tempShipList},function(){console.log(this.state.shipList);});
		}
		else{
			this.setState({shipList : []},function(){console.log(this.state.shipList);});
		}
		
	},

	handleCruiseList(arg)
	{
		console.log("In the form cruise list is equal to :");
		console.log(arg);
	},

	renderForm: function(input,index)
	{
		var errorMessage = "";
		switch (this.state.errorArray[index]) {
		    case 0:
		        errorMessage = "";
		        break;
		    case 1:
		        errorMessage = "has-success";
		        break;
		    case 2:
		        errorMessage = "has-warning";
		        break;
		    case 3:
		        errorMessage = "has-error";
		        break;
		    case 4:
		        errorMessage = "has-info";
		        break;
		}

		if (input == "Date" || input == "Dato")
		{
			return(
 			<div className={errorMessage.concat(" form-group")} key={index}>
					<label for={"inp"+index} ref={"l"+index} className="col-sm-2 control-label" for="" value={input}>{input} </label>
					<div className="col-sm-10">
						<YearSelectComponent key={index} ref={index} className="form-control" id={"inp"+index} giveValue={this.handleYearList}/>
					</div>
				</div>
			);
		}
		else if( input == "Ship" || input == "Fartøy")
		{
			
			return(
 			<div className={errorMessage.concat(" form-group")} key={index}>
					<label for={"inp"+index} ref={"l"+index} className="col-sm-2 control-label" for="" value={input}>{input} </label>
					<div className="col-sm-10">
						<ShipSelectComponent key={index} ref={index} className="form-control" id={"inp"+index} giveValue={this.handleShipList} yearList={this.state.yearList}/>
					</div>
				</div>
			);
		}
		else if( input=="Cruise Nur" || input == "ToktNer")
		{
 			return(
 			<div className={errorMessage.concat(" form-group")} key={index}>
					<label for={"inp"+index} ref={"l"+index} className="col-sm-2 control-label" for="" value={input}>{input} </label>
					<div className="col-sm-10">
						<CruiseSelectComponent key={index} ref={index} className="form-control" id={"inp"+index} yearList={this.state.yearList} shipList={this.state.shipList} giveValue={this.handleCruiseList}/>
					</div>
				</div>
			);
		}
		else{
			return(
				<div className={errorMessage.concat(" form-group")} key={index}>
					<label for={"inp"+index} ref={"l"+index} className="col-sm-2 control-label" for="" value={input}>{input} </label>
					<div className="col-sm-10">
						<input type="text" key={index} ref={index} className="form-control" id={"inp"+index}/>
					</div>
				</div>
			);
		}
	},

	handleClick(event)
	{
		if(!this.isErrorOnField())
		{
			var tempResponse = {};
			for (var i = 0 ; i<this.state.toDisplay.length ; i++) // go through all the inputs
			{
				tempResponse[this.refs["l"+i].value] = this.refs[i].value;
			}

			console.log(tempResponse);
			console.log("Should set in the DB");
		}
		
	},

	render(){
		return(
			<div className="container-fluid form-horizontal">
				 {this.state.toDisplay.map(this.renderForm)}
				 <button className="btn btn-primary center-block" onClick={this.handleClick}> submit (not dyn) </button>
			</div>
		);
	}
});