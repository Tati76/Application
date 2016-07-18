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
			if(this.state.cruiseSearch[i] == 1)
			{
				if (this.state.yearList.length <1 && this.state.obligedFields[i]) // no cruise & obliged
				{
					tempErrorArray.push(3);
					errorSpotted = true;
				}
				else if(this.state.yearList.length <1 && !this.state.obligedFields[i]) // Case not filled and not obliged to (warning)
				{
					tempErrorArray.push(2);
				}
				else
				{
					tempErrorArray.push(1);
				}
			}
			else if (this.state.cruiseSearch[i] == 2)
			{
				if (this.state.shipList.length <1 && this.state.obligedFields[i]) // no cruise & obliged
				{
					tempErrorArray.push(3);
					errorSpotted = true;
				}
				else if(this.state.shipList.length <1 && !this.state.obligedFields[i]) // Case not filled and not obliged to (warning)
				{
					tempErrorArray.push(2);
				}
				else
				{
					tempErrorArray.push(1);
				}
			}
			else if(this.state.cruiseSearch[i] == 3)
			{
				if (this.state.cruiseList.length <1 && this.state.obligedFields[i]) // no cruise & obliged
				{
					tempErrorArray.push(3);
					errorSpotted = true;
				}
				else if(this.state.cruiseList.length <1 && !this.state.obligedFields[i]) // Case not filled and not obliged to (warning)
				{
					tempErrorArray.push(2);
				}
				else
				{
					tempErrorArray.push(1);
				}
			}
			else
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
			cruiseSearch : this.props.info[2],
			yearList : [],
			shipList : [],
			year : "",
			ship : "",
			cruiseList : []
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
		console.log("**************************************************");
		console.log("yearList : ",this.state.yearList);
		console.log("shipList : ",this.state.shipList);
		console.log("cruiseList : ",this.state.cruiseList);
		console.log("**************************************************");
	},

	isInYearList(yearList,ship)
	{
		var res = false;
		for(var a = 0; a < yearList.length ; a++)
		{
			if(ship.year == yearList[a])
			{
				res = true;
			}
		}
		return res;
	},

	handleYearList(arg)
	{
		// console.log("In the form year list is equal to :");
		// console.log(arg);
		//this.setState({yearList : arg.split(",").slice()},function(){console.log(this.state.yearList);});
		if(!arg) // if no year
		{
			this.setState({yearList : [], shipList : [] },function(){});//console.log("yearlist : ",this.state.yearList);console.log("shipList", this.state.shipList);});
		}
		else // if some years selected
		{
			var tempShipList = this.state.shipList;
			var tempShipListNameArray = [];
			for(var i = 0 ; i< tempShipList.length ; i++) // delete the ships that are not in the yearList
			{
				if(!this.isInYearList(arg.split(","),tempShipList[i]))
				{
					tempShipList.splice(i,1); // delete the ship
					i=i-1;
				}
				else
				{
					tempShipListNameArray.push(String(tempShipList[i].year + " " + tempShipList[i].ship));
				}
			}

			this.setState({yearList : arg.split(",").slice()},function(){this.handleShipList(tempShipListNameArray);});//console.log("yearlist : ",this.state.yearList);console.log("shipList", this.state.shipList);this.handleShipList(tempShipListNameArray)});
		}
	},

	handleShipList(arg)
	{
		// console.log("In the form ship list is equal to :");
		// console.log(arg);
		var tempArg = arg;
		var tempShipList = [];
		if (arg!== null)
		{
			if(arg.length >0 ) // if some ships selected
			{
				

				for (var i = 0 ; i<tempArg.length ; i++) 
				{
					if(!this.isInYearList(this.state.yearList,{year : tempArg[i].slice(0,4)})) // delete the ships that are not allowed
					{
						tempArg.splice(i,1); // delete the ship
						i=i-1;
					}
					else
					{
						tempShipList.push({year : tempArg[i].slice(0,4) , ship : tempArg[i].slice(5,tempArg[i].length)});
					}
					
				}
				// console.log(tempShipList);
				this.setState({shipList : tempShipList},function(){this.handleCruiseList(this.state.cruiseList);});//console.log(this.state.shipList);this.handleCruiseList(this.state.cruiseList)});
			}
			else{
				this.setState({shipList : []},function(){});//console.log(this.state.shipList);});
			}
		}
		else
		{ // if no ship selected
			this.setState({shipList : []},function(){});//console.log(this.state.shipList);});
		}
		
	},

	isInShipList(inCruise,shipList)
	{
		var response = false;
		var tempCruiseName = "";
		for(var a = 0 ; a< shipList.length ; a++)
		{
			tempCruiseName = shipList[a].year + " " + shipList[a].ship;
			if(inCruise == tempCruiseName)
			{
				response = true;
			}
		}
		return response;
	},

	handleCruiseList(arg)
	{
		var tempCruiseList = [];
		// verify if the cruiseNr is from the ships in shipList
		for(var i = 0 ; i<arg.length ; i++)
		{
			if(this.isInShipList(arg[i].cruise,this.state.shipList)) // existing cruise so the cruiseNr has to be added to the response array
			{
				tempCruiseList.push(arg[i]);
			}
		}
		// console.log("In the form cruise list is equal to :");
		// console.log(arg);
		this.setState({cruiseList : tempCruiseList.slice()});
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

		if (this.state.cruiseSearch[index] == 1)
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
		else if(this.state.cruiseSearch[index] == 2)
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
		else if(this.state.cruiseSearch[index] == 3)
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

	handleClick(event) //render
	{
		if(!this.isErrorOnField())
		{
			var tempResponse = {};
			for (var i = 0 ; i<this.state.toDisplay.length ; i++) // go through all the inputs
			{
				tempResponse[this.refs["l"+i].value] = this.refs[i].value;
			}

			// console.log(tempResponse);
			// console.log("Should set in the DB");
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