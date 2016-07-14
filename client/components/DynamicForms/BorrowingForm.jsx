//<BorrowingForm language={params.language} index={params.index} boxObject={this.data.sample} submit=true or false/>


// CLASSIFICATION OF THE DIFFERENT INPUT DISPLAYS AVAILABLE
// VALUE    EFFECT
//   0 		Nothing
//   1 		Successfull
//   2 		Warning
//   3 		ERROR
//   4 		Info





import boxFile from '../Boxes/BoxesInfo.json';
import displayFile from '../languages/Settings.json';

BorrowingForm = React.createClass({

	isErrorOnField: function()
	{
		var tempErrorArray = [];
		var errorSpotted = false;
		for (var i = 0 ; i<this.state.inputLabelsArray.length ; i++) // go through all the inputs
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

	findTheBoxTypeInTheCurrentLanguage: function(language,props)
	{
		if (props.boxObject["Box Type"] != "") // if the boxObject isn't void & if BoxType exists
		{
			var incomingBoxType = props.boxObject["Box Type"];

			for(var i = 0 ; i< boxFile.length ; i++)
			{
				if (boxFile[i].name["English"] == incomingBoxType) // this.props.boxType must be in the same language as the current one
				{
					return i;
				}
			}
		}
		else{
			console.log("Incoming BoxType indefined");
		}
		
	},

	dateToString(tempdate)
	{
		console.log(String(tempdate).split(" "));
		var date = tempdate;
		var stringdate = "";
		stringdate += date.getDate() + '/' + (date.getMonth() + 1) + '/' +  date.getFullYear() + " " + date.getHours() + ":" + date.getMinutes() + ":" +date.getSeconds();
		return stringdate;
	},
	
	findTheGoodBorrowingArray: function(language,props)
	{
		var tempInputFieldsArray = [];
		var jsonFileIndex = this.findTheBoxTypeInTheCurrentLanguage(language,props);
		tempInputFieldsArray = boxFile[jsonFileIndex].forms.borrowing[language].slice();
		return tempInputFieldsArray;
	},

	getInitialState(){
		var tempTitle = displayFile.setups[this.props.index].borrowForm.labels.title;
		var tempObligedFields = [];
		var tempDataTypeFields = [];

		var jsonFileIndex = this.findTheBoxTypeInTheCurrentLanguage(this.props.language,this.props); // find the index of the current BoxType
		tempObligedFields = boxFile[jsonFileIndex].forms.borrowing["obliged"].slice();
		tempDataTypeFields = boxFile[jsonFileIndex].forms.borrowing["dataType"].slice();
		
		// Error Array is here to check if there is any errors in the fields when clickBorrow is triggered
		var tempErrorArray = [];

		for (var i = 0 ; i< tempObligedFields.length ; i++)
		{
			tempErrorArray.push(0);
		}
		//All the inputLabels are in this state variable
		return {
			dbInputLabelsArray : this.findTheGoodBorrowingArray("English",this.props).slice(),
			inputLabelsArray : this.findTheGoodBorrowingArray(this.props.language,this.props).slice(),
			displayTitle : tempTitle,	
			obligedFields : tempObligedFields, // list of the fields that are to be filled 
			dataTypeFields : tempDataTypeFields, // list of the datatype of each input
			errorArray : tempErrorArray

		};
	},

	componentWillReceiveProps: function(nextProps) {
		if(nextProps.submit) // One button is triggered so we need to submit the form
		{
			this.handleSubmit();
		}

		var tempTitle = displayFile.setups[nextProps.index].borrowForm.labels.title;
		console.log("New language");
		console.log(nextProps.language);
		console.log("New index");
		console.log(nextProps.index);

		this.setState({
			language : nextProps.language, 
			index: nextProps.index, 
			boxId: nextProps.boxId, 
			inputLabelsArray : this.findTheGoodBorrowingArray(nextProps.language,nextProps).slice(),
			displayTitle : tempTitle
		});
	},

	shouldComponentUpdate: function(nextProps, nextState) {
		var shallowCompare = require('react-addons-shallow-compare');
		return shallowCompare(this, nextProps, nextState);
	},

	componentDidUpdate: function(prevProps, prevState){ 

	},

	handleSubmit()
	{
		console.log('submit BorrowingForm');
	},

	clickBorrow: function(event)
	{

		console.log("should save the changed info");
		var tempResponse = {};
		var borrowPrefix = "Borrowing ";
		tempResponse["Borrowing State"] = "Borrowed"; // to show that it's borrowed
		console.log(this.isErrorOnField());
		if(!this.isErrorOnField())//if there are no errors
		{
			for (var i =0 ; i<this.state.inputLabelsArray.length ; i++)
			{
					console.log(this.refs["l"+i].value);
					console.log(this.refs[i].value);
					
					tempResponse[borrowPrefix.concat(this.state.dbInputLabelsArray[i])] = this.refs[i].value;
					borrowPrefix = "Borrowing ";
			}
			tempResponse["Borrowing Date"] = this.dateToString(new Date());
			console.log(tempResponse);

			Meteor.call('inholdinfodb.update',this.props.boxObject._id,tempResponse,function(error, result){console.log(result);});

			this.props.onClick(event);
		}
		else{
			console.log("ERRORS SPOTTED");
		}

	},

	renderForm: function(input, index)
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
		return(

			<tr key={index} className={errorMessage}>
					<td className="text-center" ref={"l"+index} value={input}><label className="control-label" for={index}>{input}</label></td>
					<td className="text-center" ><div className="form-group"><input ref={index} id={index}type={this.state.dataTypeFields[index]} className="form-control"/></div></td>
			</tr>
		);
	},

	render(){

		return(

			<div className="container-fluid">
					<h2 className="text-center"> {this.state.displayTitle}</h2>
					<form>
						<table className="table table-bordered">
							<tbody>
								{this.state.inputLabelsArray.map(this.renderForm)}
							</tbody>
						</table>
						<button type="button" className="btn btn-primary center-block" onClick={this.clickBorrow} value="Lend">Lend this box (Not dynamic)</button>
					</form>
				</div>
		);
	}
});