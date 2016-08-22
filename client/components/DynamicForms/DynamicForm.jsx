 // <DynamicForm language={this.props.language} 
	// index={this.props.index} 
	// info=[toDisplay list,obliged listthis.state.cruiseSearch]} 
	// dbInfo={this.state.dbFields} 
	// boxType={this.state.boxType} 
	// giveValue={this.clickSubmit} 
	// placehold={[what, where,isDisabled ?]} 
	// isTable={this.state.isTable}/>

// CLASSIFICATION OF THE DIFFERENT INPUT DISPLAYS AVAILABLE
// VALUE    EFFECT
//   0 		Nothing
//   1 		Successfull
//   2 		Warning
//   3 		ERROR
//   4 		Info

import boxFile from '../Boxes/BoxesInfo.json';
import settingsFile from '../languages/Settings.json';


DynamicForm = React.createClass({

	isErrorOnField: function()
	{
		if (this.state.boxType != "") // in case we don't want the correction
		{
			var tempErrorArray = [];
			var errorSpotted = false;
			for (var i = 0 ; i<this.state.toDisplay.length ; i++) // go through all the inputs
			{
				if(this.state.cruiseSearch[i] == 1)
				{
					if (this.state.yearList.length <1 && this.state.obliged[i]) // no cruise & obliged
					{
						tempErrorArray.push(3);
						errorSpotted = true;
					}
					else if(this.state.yearList.length <1 && !this.state.obliged[i]) // Case not filled and not obliged to (warning)
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
					if (this.state.shipList.length <1 && this.state.obliged[i]) // no cruise & obliged
					{
						tempErrorArray.push(3);
						errorSpotted = true;
					}
					else if(this.state.shipList.length <1 && !this.state.obliged[i]) // Case not filled and not obliged to (warning)
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
					if (this.state.cruiseList.length <1 && this.state.obliged[i]) // no cruise & obliged
					{
						tempErrorArray.push(3);
						errorSpotted = true;
					}
					else if(this.state.cruiseList.length <1 && !this.state.obliged[i]) // Case not filled and not obliged to (warning)
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
					if (this.refs && this.refs.length > 0)
					{
						if (this.refs[i].value.length > 0 && this.refs[i].value.trim().length ==0 && this.state.obliged[i] && this.refs[i].placeholder.length > 0 || this.refs[i].value.length == 0 && this.state.obliged[i] && this.refs[i].placeholder.length == 0 && this.refs[i].value.trim().length ==0 ||  this.refs[i].value.length > 0 && this.state.obliged[i] && this.refs[i].placeholder.length == 0 && this.refs[i].value.trim().length ==0 ) // Case not filled as obliged to (error)
						{
							tempErrorArray.push(3);
							errorSpotted = true;
						}
						else if(this.refs[i].value.length >= 0 && this.refs[i].value.trim().length ==0 && !this.state.obliged[i] && this.refs[i].placeholder.length <= 0) // Case not filled and not obliged to (warning)
						{
							tempErrorArray.push(2);
						}
						else{
							tempErrorArray.push(1);
						}
					}
					else
					{
						break;
					}
				}
				
			}
			this.setState({errorArray : tempErrorArray.slice()});

			return errorSpotted;
		}
		else 
		{
			return false;
		}
	},

	setErrorArrayToZero()
	{
		var tempArray = [];
		for (var i = 0 ; i<this.state.errorArray.length ; i++)
		{
			tempArray.push(0);
		}
		this.setState({errorArray : tempArray.slice()});
	},
	
	getInitialState(){
		//console.log(this.props.info);
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
			obliged : this.props.info[1],
			cruiseSearch : this.props.info[2],
			yearList : [],
			shipList : [],
			year : "",
			ship : "",
			cruiseList : [],
			dbInfo : this.props.dbInfo,
			boxType : this.props.boxType, 
			placeHolder : this.props.placeHold,
			isTable : this.props.isTable,
			clearYearCounter : 0,
			buttons: this.props.buttons
		};
	},

	componentWillReceiveProps: function(nextProps) {
		this.setState({placeHolder : nextProps.placeHold,
						language : nextProps.language, 
						index : nextProps.index, 
						toDisplay : nextProps.info[0], 
						obliged : nextProps.info[1],
						cruiseSearch : nextProps.info[2],
						dbInfo : nextProps.dbInfo, 
						boxType : nextProps.boxType,
						isTable : nextProps.isTable,
						buttons : nextProps.buttons
					});
		this.setErrorArrayToZero();
		//console.log(nextProps.info);
		//console.log(nextProps.placehold);
	},

	shouldComponentUpdate: function(nextProps, nextState) {
		// var shallowCompare = require('react-addons-shallow-compare');
		// return shallowCompare(this, nextProps, nextState);

		if (nextState.yearList != this.state.yearList)
		{
			return true;
		}
		else if (nextState.toDisplay != this.state.toDisplay)
		{
			return true;
		}
		else if (nextState.dbInfo != this.state.dbInfo)
		{
			return true;
		}
		else if (nextState.errorArray != this.state.errorArray)
		{
			return true;
		}
		else if (nextState.shipList != this.state.shipList)
		{
			return true;
		}
		else if (nextState.cruiseList != this.state.cruiseList)
		{
			return true;
		}
		else if (nextState.clearYearCounter > this.state.clearYearCounter)
		{
			return true;
		}
		else
		{
			return false;
		}
	},

	componentDidUpdate: function(prevProps, prevState){ 
		//console.log("**************************************************");
		//console.log("yearList : ",this.state.yearList);
		//console.log("shipList : ",this.state.shipList);
		//console.log("cruiseList : ",this.state.cruiseList);
		//console.log("**************************************************");
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
		//console.log("In the form year list is equal to : ",arg);
		if (arg == null || arg =="")
		{
			this.setState({yearList : []});
		}
		else
		{
			this.setState({yearList : arg.split(',')});
		}
	},

	handleShipList(arg)
	{
		//console.log("In the form ship list is equal to : ",arg);
		if (arg == null || arg =="")
		{
			this.setState({shipList : []});
		}
		else
		{
			this.setState({shipList : arg.split(',')});
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
		//console.log("In the form cruise list is equal to : ",arg);
		if (arg == null || arg =="")
		{
			this.setState({cruiseList : []});
		}
		else
		{
			var test = arg.split(',');
			this.setState({cruiseList : arg.split(',')});
		}
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
					<label ref={"l"+index} className="col-sm-2 control-label" htmlFor="" value={input}>{input} </label>
					<div className="col-sm-10">
						<YearSelectComponent key={index} ref={index} language={this.state.language} index={this.state.index} clearYear={this.state.clearYearCounter} className="form-control" id={"inp"+index} yearList={this.state.yearList} giveValue={this.handleYearList}/>
					</div>
				</div>
			);
		}
		else if(this.state.cruiseSearch[index] == 2)
		{
			
			return(
 			<div className={errorMessage.concat(" form-group")} key={index}>
					<label ref={"l"+index} className="col-sm-2 control-label" htmlFor="" value={input}>{input} </label>
					<div className="col-sm-10">
						<ShipSelectComponent key={index} ref={index} language={this.state.language} index={this.state.index} className="form-control" id={"inp"+index} giveValue={this.handleShipList} yearList={this.state.yearList}/>
					</div>
				</div>
			);
		}
		else if(this.state.cruiseSearch[index] == 3)
		{
 			return(
 			<div className={errorMessage.concat(" form-group")} key={index}>
					<label ref={"l"+index} className="col-sm-2 control-label" htmlFor="" value={input}>{input} </label>
					<div className="col-sm-10">
						<CruiseSelectComponent key={index} ref={index} language={this.state.language} index={this.state.index} className="form-control" id={"inp"+index} yearList={this.state.yearList} shipList={this.state.shipList} giveValue={this.handleCruiseList}/>
					</div>
				</div>
			);
		}
		else{
			var indexOfPlaceHolder = this.isInPlaceHolder(input);
			if(indexOfPlaceHolder > -1)
			{
				if (this.state.placeHolder[2][indexOfPlaceHolder]) // isDisabled
				{
					return(
						<div className={errorMessage.concat(" form-group")} key={index}>
							<label ref={"l"+index} className="col-sm-2 control-label" htmlFor="" value={input}>{input} </label>
							<div className="col-sm-10">
								<input onKeyDown={this.keydownfunction} type="text" key={index} ref={index} className="form-control" id={"inp"+index} value={this.state.placeHolder[0][indexOfPlaceHolder]} placeholder={this.state.placeHolder[0][indexOfPlaceHolder]} disabled/>
							</div>
						</div>
					);
				}
				else // if not disabled
				{
					return(
						<div className={errorMessage.concat(" form-group")} key={index}>
							<label ref={"l"+index} className="col-sm-2 control-label" htmlFor="" value={input}>{input} </label>
							<div className="col-sm-10">
								<input onKeyDown={this.keydownfunction} type="text" key={index} ref={index} className="form-control" id={"inp"+index} placeholder={this.state.placeHolder[0][indexOfPlaceHolder]}/>
							</div>
						</div>
					);
				}
				
			}
			else{
				return(
					<div className={errorMessage.concat(" form-group")} key={index}>
						<label ref={"l"+index} className="col-sm-2 control-label" htmlFor="" value={input}>{input} </label>
						<div className="col-sm-10">
							<input onKeyDown={this.keydownfunction} type="text" key={index} ref={index} className="form-control" id={"inp"+index}/>
						</div>
					</div>
				);
			}
			
		}
	},

	isInPlaceHolder(word)
	{
		for (var i = 0 ; i<this.state.placeHolder[1].length; i++)
		{
			var res = -1;
			if(this.state.placeHolder[1][i] == word)
			{
				res = i;
				break;
			}
		}
		return res;
	},

	renderFormTable(input,index)
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
				<tr className={errorMessage.concat(" form-group")} key={index}>
					<td ref={"l"+index} className="control-label text-center" htmlFor="" value={input}>{input}</td>
					<td className="text-center"><YearSelectComponent key={index} ref={index} className="form-control" id={"inp"+index} yearList={this.state.yearList} giveValue={this.handleYearList}/></td>
				</tr>
			);
		}
		else if(this.state.cruiseSearch[index] == 2)
		{
			
			return(
				<tr className={errorMessage.concat(" form-group")} key={index}>
					<td ref={"l"+index} className="control-label text-center" htmlFor="" value={input}>{input}</td>
					<td className="text-center"><ShipSelectComponent key={index} ref={index} className="form-control" id={"inp"+index} giveValue={this.handleShipList} yearList={this.state.yearList}/></td>
				</tr>
			);
		}
		else if(this.state.cruiseSearch[index] == 3)
		{
 			return(
 				<tr className={errorMessage.concat(" form-group")} key={index}>
					<td ref={"l"+index} className="control-label text-center" htmlFor="" value={input}>{input}</td>
					<td className="text-center"><CruiseSelectComponent key={index} ref={index} className="form-control" id={"inp"+index} yearList={this.state.yearList} shipList={this.state.shipList} giveValue={this.handleCruiseList}/></td>
				</tr>
			);
		}
		else{
			var indexOfPlaceHolder = this.isInPlaceHolder(input);
			if(indexOfPlaceHolder > -1)
			{
				if (this.state.placeHolder[2][indexOfPlaceHolder]) // isDisabled
				{
					return(
						<tr className={errorMessage.concat(" form-group")} key={index}>
							<td ref={"l"+index} className="control-label text-center" htmlFor="" value={input}>{input}</td>
							<td className="text-center"><input onKeyDown={this.keydownfunction} type="text" key={index} ref={index} className="form-control" id={"inp"+index} value={this.state.placeHolder[0][indexOfPlaceHolder]} placeholder={this.state.placeHolder[0][indexOfPlaceHolder]} disabled/></td>
						</tr>
					);
				}
				else // not disabled
				{
					return(
						<tr className={errorMessage.concat(" form-group")} key={index}>
							<td ref={"l"+index} className="control-label text-center" htmlFor="" value={input}>{input}</td>
							<td className="text-center"><input onKeyDown={this.keydownfunction} type="text" key={index} ref={index} className="form-control" id={"inp"+index} placeholder={this.state.placeHolder[0][indexOfPlaceHolder]}/></td>
						</tr>
					);
				}
			}
			else{
				return(
					<tr className={errorMessage.concat(" form-group")} key={index}>
						<td ref={"l"+index} className="control-label text-center" htmlFor="" value={input}>{input}</td>
						<td className="text-center"><input onKeyDown={this.keydownfunction} type="text" key={index} ref={index} className="form-control" id={"inp"+index}/></td>
					</tr>
				);
			}
			
		}
	},

	yearListToString()
	{
		var tempString = "";
		for (var i = 0 ; i< this.state.yearList.length ; i++)
		{
			tempString += this.state.yearList[i];
			if(i!= this.state.yearList.length -1)
			{
				tempString+= ", ";
			}
		}
		return tempString;
	},

	shipListToString()
	{
		var tempString = "";
		for (var i = 0 ; i< this.state.shipList.length ; i++)
		{
			tempString += this.state.shipList[i];
			if(i!= this.state.shipList.length -1)
			{
				tempString+= ", ";
			}
		}
		return tempString;
	},

	cruiseListToString()
	{
		var tempString = "";
		for (var i = 0 ; i< this.state.cruiseList.length ; i++)
		{
			tempString += this.state.cruiseList[i];
			if(i!= this.state.cruiseList.length -1)
			{
				tempString+= ", ";
			}
		}
		return tempString;
	},

	handleClick(event) //render
	{
		if(!this.isErrorOnField() && this.state.boxType.trim() != null)
		{
			var tempResponse = {};
			for (var i = 0 ; i<this.state.toDisplay.length ; i++) // go through all the inputs
			{
				tempResponse[this.refs["l"+i].value] = this.refs[i].value;
			}

			var tempObject = {};
			
			for (var i = 0 ; i<this.state.toDisplay.length ; i++) // go through all the inputs
			{
				switch (this.state.cruiseSearch[i]) {
				    case 0:
				        //console.log(this.state.dbInfo[i],this.refs[i].value);
				        if (this.refs[i].value.trim().length<=0 && this.refs[i].placeholder.trim().length >0)
				        {
				        	tempObject[this.state.dbInfo[i]] = this.refs[i].placeholder.trim();
				        }
				        else 
				        {
				        	tempObject[this.state.dbInfo[i]] = this.refs[i].value.trim();
				        }
				        
				        break;
				    case 1:
				        //console.log(this.refs["l"+i].value,this.state.yearList);
				        tempObject[this.state.dbInfo[i]] = this.yearListToString();
				        break;
				    case 2:
				        //console.log(this.refs["l"+i].value,this.state.shipList);
				        tempObject[this.state.dbInfo[i]] = this.shipListToString();
				        break;
				    case 3:
				        //console.log(this.refs["l"+i].value,this.state.cruiseList);
				        tempObject[this.state.dbInfo[i]] = this.cruiseListToString();
				        break;
				}
			}
			//console.log("tempObject",tempObject);
			if (!tempObject.hasOwnProperty("Box Type"))
			{
				tempObject["Box Type"] = this.state.boxType;
			}
			
		
			this.props.giveValue(tempObject);
			// //console.log(tempResponse);
			// //console.log("Should set in the DB");
		}
		
	},

	objectToString(object,attribute)
	{

	},

	clearAll(event)
	{
		for (var i = 0 ; i<this.state.toDisplay.length ; i++) // go through all the inputs
		{
			var test = "l"+i;
			switch (this.state.cruiseSearch[i]) {
			    case 0:
			        //console.log(this.refs["l"+String(i)].value,this.refs[i].value);
			        //console.log(this.state.dbInfo[i],this.refs[i].value);
			        this.refs[i].value = "";
			        break;
			    case 1:
			        //console.log(this.refs["l"+i].value,this.state.yearList);
			        //console.log(this.state.dbInfo[i],this.state.shipList);
			        break;
			    case 2:
			        //console.log(this.refs["l"+i].value,this.state.shipList);
			        //console.log(this.state.dbInfo[i],this.state.shipList);
			        break;
			    case 3:
			        //console.log(this.refs["l"+i].value,this.state.cruiseList);
			        //console.log(this.state.dbInfo[i],this.state.shipList);
			        break;
			}
		}
		var tempClearYearCounter = this.state.clearYearCounter + 1;
		this.setState({clearYearCounter : tempClearYearCounter});
	},

	handleReturn(event)
	{
		this.props.onReturn(event);
	},

	renderButtons()
	{
		if (this.state.buttons == "research")
		{
			return(
				<div className="btn-group btn-group-justified" role="group" aria-label="...">
					<div className="btn-group" role="group">
						<button type="button" className="btn btn-primary" onClick={this.clearAll}>{settingsFile.setups[this.state.index].AddContent.buttons.clear}</button>
					</div>
					<div className="btn-group" role="group">
						<button type="button" className="btn btn-primary" onClick={this.handleClick}>{settingsFile.setups[this.state.index].AddContent.buttons.save}</button>
					</div>
				</div>
			);
		}
		else
		{
			return(
				<div className="btn-group btn-group-justified" role="group" aria-label="...">
					<div className="btn-group" role="group">
						<button type="button" className="btn btn-primary" onClick={this.clearAll}>{settingsFile.setups[this.state.index].AddContent.buttons.clear}</button>
					</div>
					<div className="btn-group" role="group">
						<button type="button" className="btn btn-primary" onClick={this.handleClick}>{settingsFile.setups[this.state.index].AddContent.buttons.save}</button>
					</div>
					<div className="btn-group" role="group">
						<button type="button" className="btn btn-primary" onClick={this.handleReturn} value='Back'>{settingsFile.setups[this.state.index].AddContent.buttons.return}</button>
					</div>
				</div>
			);
			
		}
	},

	keydownfunction(event)
	{
		//console.log(event.keyCode);
		if (event.keyCode == 13)
		{
			this.handleClick(event);
		}
	},

	render(){
		//console.log("render DynamicForm");
		//console.log(settingsFile.setups[this.state.index].AddContent.buttons.clear);
		if(this.state.isTable)
		{
			return(
				<div className="container-fluid">
					<form onSubmit={this.handleClick}>
						<table className="table table-bordered">
							<tbody>
								{this.state.toDisplay.map(this.renderFormTable)}
							</tbody>
						</table>
						
						{this.renderButtons()}
					</form>
				</div>
			);
		}
		else
		{
			return(
				<div className="container-fluid form-horizontal" onkeyDown={this.keydownfunction}>
					{this.state.toDisplay.map(this.renderForm)}
					{this.renderButtons()}
				</div>
			);
		}
		
	}
});