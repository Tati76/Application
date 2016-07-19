import {getXMLHttpRequest,makeXMLHttpRequest,dynamicSort} from '../../Functions/functionFile.js';



ShipSelectComponent= React.createClass({

	makeAllUrlList(yearList,shipFiles) // update step 1
	{
		var tempUrlList = [];
		var tempUrl = "http://tomcat7.imr.no:8080/DatasetExplorer/v1/count/Forskningsfart%C3%B8y/";
		if(yearList) // if some years are selected
		{
			for (var i = 0 ; i< yearList.length ; i++) // putting all the urls in an array
			{
				tempUrlList.push(tempUrl + yearList[i]);
			}
			this.makeAllXMLRequests(yearList,tempUrlList,shipFiles);
		}
		else{ // Not going Further because no year selected
			this.setState({urlList : null,shipFiles: null,displayArray : null});
		}
	},

	makeAllXMLRequests(yearList,urlList,shipFiles) // update step 2
	{
		for (var i = 0 ; i<yearList.length ; i++)
		{
			if (i== yearList.length -1)
			{
				makeXMLHttpRequest(urlList[i],this.readData,[yearList[i],true,shipFiles,urlList,yearList]);
			}
			else{
				makeXMLHttpRequest(urlList[i],this.readData,[yearList[i],false,shipFiles,urlList,yearList]);
			}
		}
		
	},

	readData: function(sData,array) // update step 3
	{  
		var tempShipFiles = this.state.shipFiles.slice();
		var tempCounter = this.state.counter;
		this.setState({counter : tempCounter+1});
		tempShipFiles.push({ year : array[0] , data : JSON.parse(sData)});
		if (this.state.counter == array[4].length) // if it's the last selected year, you can render the displayArray
		{
			this.buildDisplayArray(tempShipFiles,array);
		}
		else{
			this.setState({shipFiles : tempShipFiles.slice()},function(){});
		}
		
	},

	buildDisplayArray: function(objectArray,array) // update step 4
	{
		objectArray.sort(dynamicSort("year")).reverse();
		if(objectArray)
		{
			var tempObjectArray = [];
			for(var i = 0 ; i<objectArray.length ; i++)
			{
				tempObjectArray.push({name : objectArray[i].year, disabled: true, color : "red"}) // the year has to be seen so it's in red
				for (var a = 0 ; a<objectArray[i].data.length ; a++)
				{
					tempObjectArray.push({name : objectArray[i].data[a].name, value:objectArray[i].year+" "+objectArray[i].data[a].name});
				}
			}
			this.setState({yearList: array[4], shipFiles : array[2], urlList : array[3], displayArray : tempObjectArray.slice()});
		}
		this.setState({loading : false, counter : 0});
	},

	getInitialState(){
		var tempObject = [];
		var tempUrl = "http://tomcat7.imr.no:8080/DatasetExplorer/v1/count/Forskningsfart%C3%B8y/";
		var tempUrlList = [];
		if(this.props.yearList)
		{
			for (var i = 0 ; i< this.props.yearList.length ; i++) // putting all the urls in an array
			{
				tempUrlList.push(tempUrl + this.props.yearList[i]);
			}
		}
		tempUrl += this.props.year;

		return {
			yearList : this.props.yearList,
			urlList : tempUrlList.slice(),
			shipFiles : tempObject,
			displayArray : [],
			loading : true,
			counter : 0,
			remove : false,
			labelsToRemove :null,
			currentDisplayedValues : []
		};
	},

	componentDidMount()
	{
		
	},

	isEqualToYear(yearList,string) // compare a string to all the selected years
	{
		var response = false;
		for( var b = 0 ; b<yearList.length ; b++)
		{
			if(yearList[b] === string)
			{
				response = true;
			}
		}
		return response;
	},

	findLabelsToRemove(yearList) // find all the ships to remove compared to the yearList
	{
		var listToRemove = [];
		for (var i = 0 ; i<this.state.currentDisplayedValues.length  ; i++)
		{
			var test = this.state.currentDisplayedValues[i].split(" ")[0];
			if(!this.isEqualToYear(yearList,this.state.currentDisplayedValues[i].substring(0, 4)))
			{
				listToRemove.push(this.state.currentDisplayedValues[i]);
			}
		}

		return listToRemove;
	},

	componentWillReceiveProps: function(nextProps) {

		// remove the values that are of the wrong year 
		// console.log("ShipSelectComponent Receives Props, N2");
		if(this.state.currentDisplayedValues != null && this.state.currentDisplayedValues[0] != "" && this.state.currentDisplayedValues) // if there are some values
		{
			this.setState({labelsToRemove : this.findLabelsToRemove(nextProps.yearList),remove : true}); // remove some components (Delete not coherent values)
		}
		if(nextProps.yearList.length >0) // if a yearlist
		{
			this.setState({
				yearList : nextProps.yearList,
				loading : true,
				}, function(){
				this.makeAllUrlList(nextProps.yearList,this.state.shipFiles); // Make new ShipList
			});
		}
		else // if no  yearList put all to Zero
		{
			this.setState({
				yearList : [],
				loading : true,
				shipFiles : [],
				urlList : [],
				displayArray : []
			});
		}

	},

	shouldComponentUpdate: function(nextProps, nextState) {
			var shallowCompare = require('react-addons-shallow-compare');
			return shallowCompare(this, nextProps, nextState);
	},

	componentDidUpdate: function(prevProps, prevState){ 
		 // console.log("ShipSelectComponent did update, N2");
	},

	renderShip(input, index)
	{
		if (this.state.yearList)
		{
			return(
				<option> {this.state.shipFile[input].name} </option>
			);
		}
		else
		{
			return null ;
		}
		
	},

	handleValue(value)
	{
		var tempvalue = null;

		if(value != null && value)
		{
			this.setState({currentDisplayedValues : value.split(",")});
			this.props.giveValue(value.split(","));
		}
		else
		{
			this.setState({currentDisplayedValues : []});
			this.props.giveValue([]);
		}

		// console.log("HANDLE VALUE : ", value);
		
	},

	handleRemoveState(arg)
	{
		if(arg[0])
		{
			this.setState({remove : false, currentDisplayedValues: arg[1].split(",")});
		}
		this.props.giveValue(this.state.currentDisplayedValues);
	},

	render()
	{
			return(
				<div>
					<MultiSelectField incomingData={this.state.displayArray} loading={this.state.loading} giveValue={this.handleValue} valuesRemoved={this.handleRemoveState} doRemove={[this.state.remove,this.state.labelsToRemove]}/> 
				</div>		
			);
	}
});