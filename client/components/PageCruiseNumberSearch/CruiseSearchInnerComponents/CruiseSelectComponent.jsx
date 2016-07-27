import {getXMLHttpRequest,makeHttpRequest,makeXMLHttpRequest,dateToStringOnlyDays} from '../../Functions/functionFile.js';


CruiseSelectComponent= React.createClass({

	makeAllUrls(prop) // step 1
	{
		var voidArray = [];
		this.setState({allCruise : voidArray,periodeArray : []});
		var tempUrl = "http://tomcat7.imr.no:8080/DatasetExplorer/v1/count/Forskningsfart%C3%B8y/";
		if (prop.shipList)
		{
			var tempUrlArray = [];
			for(var i = 0 ; i<prop.shipList.length ; i++)
			{
				tempUrl = "http://tomcat7.imr.no:8080/DatasetExplorer/v1/count/Forskningsfart%C3%B8y/";
				tempUrl += encodeURI(prop.shipList[i].year);
				tempUrl += "/";
				tempUrl += encodeURI(prop.shipList[i].ship);
				tempUrlArray.push(tempUrl);
			}
			this.setState({urlArray : tempUrlArray.slice()},function(){this.makeAllHttpRequests();});
		}
	},

	makeAllHttpRequests() //step 2
	{	
		this.setState({cruiseCounter : 0});
		for (var i = 0 ; i< this.state.urlArray.length ; i++)
		{
			if (i == this.state.urlArray.length -1 )
			{
				makeHttpRequest(this.state.urlArray[i],this.readData,[String(this.state.shipList[i].year) + " " + this.state.shipList[i].ship,true]);
			}
			else {
				makeHttpRequest(this.state.urlArray[i],this.readData,[String(this.state.shipList[i].year) + " " + this.state.shipList[i].ship,false]);
			}
			
		}
	},

	readData: function(sData,option) {//step 3

		var tempCount = this.state.counter+1;
		this.setState({counter : tempCount});

		var tempAllCruise = this.state.allCruise;
		var newCruiseCounter = this.state.cruiseCounter+JSON.parse(sData).length;

		tempAllCruise.push({data : JSON.parse(sData), value : option[0],cruise : option[0]});

		if (this.state.counter == this.state.urlArray.length) // if all the XMLHttpRequests are made
		{
			this.setState({allCruise : tempAllCruise.slice(), counter : 0, cruiseCounter : newCruiseCounter},function(){this.getAllDates();});
		}
		else{
			this.setState({allCruise : tempAllCruise.slice(), cruiseCounter : newCruiseCounter},function(){});
		}
		
	},

	getAllDates()
	{
		var tempCounter = 0;
		var tempPeriodeUrl = 'http://tomcat7.imr.no:8080/apis/nmdapi/cruise/v1/Forskningsfart%C3%B8y/';
		for (var i = 0 ; i< this.state.allCruise.length; i++)
		{
			var tempYear = this.state.allCruise[i].cruise.slice(0,4);
			var tempShip = this.state.allCruise[i].cruise.slice(5,this.state.allCruise[i].cruise.length);
			for (var a = 0 ; a < this.state.allCruise[i].data.length ; a++)
			{
				tempPeriodeUrl = 'http://tomcat7.imr.no:8080/apis/nmdapi/cruise/v1/Forskningsfart%C3%B8y/';
				tempPeriodeUrl += encodeURI(tempYear);
				tempPeriodeUrl += "/";
				tempPeriodeUrl += encodeURI(tempShip); 
				tempPeriodeUrl += "/";
				tempPeriodeUrl += encodeURI(this.state.allCruise[i].data[a].name); // cruiseNr
				tempCounter++;
				//make dateRequest
				makeXMLHttpRequest(tempPeriodeUrl,this.readXMLPeriodeData,[i,a]);

			}
		}

	},

	readXMLPeriodeData(sData,infos) // info with cruise index and cruiseNr in data index
	{
		var tempCountr = this.state.periodeReceiverCounter;
		this.setState({periodeReceiverCounter : tempCountr+1});
		console.log(sData);
		var startTime = new Date(sData.getElementsByTagName("startTime")[0].childNodes[0].nodeValue);
    	var stopTime = new Date(sData.getElementsByTagName("stopTime")[0].childNodes[0].nodeValue);
    	console.log("Periode : ",dateToStringOnlyDays(startTime) + " - " + dateToStringOnlyDays(stopTime));
		console.log(this.state.cruiseCounter);
		console.log(this.state.periodeReceiverCounter);
		var tempPeriode = "    (" + dateToStringOnlyDays(startTime) + " - " + dateToStringOnlyDays(stopTime) + ")";
		var tempPeriodeArray = this.state.periodeArray;
		tempPeriodeArray.push([infos[0],infos[1],tempPeriode]);
		this.setState({periodeArray : tempPeriodeArray});
		if (this.state.cruiseCounter == this.state.periodeReceiverCounter)
		{
			var tempAllCruiseObject = this.state.allCruise;
			for (var i = 0 ; i<this.state.periodeArray.length ; i++)
			{
				tempAllCruiseObject[this.state.periodeArray[i][0]].data[this.state.periodeArray[i][1]].addToName = "        " + this.state.periodeArray[i][2];
			}
			this.setState({periodeArray : [],allCruise: tempAllCruiseObject,cruiseCounter : 0,periodeReceiverCounter : 0});
			this.createDisplayArray();
		}
	},

	createDisplayArray() //step 4
	{
		if("data" in this.state.allCruise[0])
		{
			var tempCruiseArray = [];
			for(var i = 0 ; i< this.state.shipList.length ; i++) // get all the ships selected
			{	
				tempCruiseArray.push({value : this.state.allCruise[i].value, name : this.state.allCruise[i].value  , disabled: true,color : "red", cruise : this.state.allCruise[i].value}); // add the boat & the year
				for (var a = 0 ; a<this.state.allCruise[i].data.length ; a++) // going through all the cruise nr
				{
					tempCruiseArray.push({value : this.state.allCruise[i].data[a].name, name : this.state.allCruise[i].data[a].name + this.state.allCruise[i].data[a].addToName, cruise : this.state.allCruise[i].value });
				}
			}
			this.setState({ displayArray : tempCruiseArray.slice(),loading : false});
		}
	},

	getInitialState(){

		return {
			allCruise : [],
			yearList : this.props.yearList,
			shipList : this.props.shipList,
			remove : false,
			labelsToRemove : [],
			loading : true,
			currentDisplayedValues : [],
			counter : 0,
			displayArray : [],
			cruiseCounter : 0,
			periodeReceiverCounter : 0,
			periodeArray : []
		};
	},

	componentDidMount()
	{
		
	},

	isExistingShip : function(state,prop)
	{
		var res = false;
		for( var a = 0 ; a < prop.length ; a++)
		{
			if(state.cruise.slice(5,state.cruise.length) == prop[a].ship) // if the cruise number is not corresponding to a cruise currently available
			{
				res = true;
			}
		}
		return res;
	},


	removeUnexistingCruise : function(nextProps)
	{ 
		// find all the cruises that doesn't exist anymore
		var listToRemove = [];
		for( var i = 0 ; i<this.state.allCruise.length ; i++)
		{
			if(!this.isExistingShip(this.state.allCruise[i],nextProps.shipList))
			{
				listToRemove.push(this.state.allCruise[i].name); // get the name of the cruise that are not existing
			}
		}

		return listToRemove;
		// console.log(listToRemove);
	},

	componentWillReceiveProps: function(nextProps) {
		// console.log("CruiseSelectComponent receives props, N3");

		this.setState({labelsToRemove : this.removeUnexistingCruise(nextProps),remove : true}); // remove the labels
		console.log("RECEIVED PROPS CRUISE");
		if(nextProps.shipList.length > 0 && nextProps.shipList[0] != "") // if there are some ships
		{
			this.setState({shipList : nextProps.shipList.slice(),yearList : nextProps.yearList.slice()}); 
			this.setState({allCruise : []},function(){this.makeAllUrls(nextProps);});
		}

		else //if no ships
		{
			this.setState({
				allCruise : [],
				yearList : this.props.yearList,
				shipList : [],
				remove : false,
				labelsToRemove : [],
				currentDisplayedValues : [],
				loading : true,
				displayArray : [],
				cruiseCounter : 0,
				periodeReceiverCounter : 0
			});
		}
	},

	shouldComponentUpdate: function(nextProps, nextState) {
		if (this.state.displayArray != nextState.displayArray)
		{
			return true;
		}
		else
		{
			return false
		}
	},

	componentDidUpdate: function(prevProps, prevState){
		// console.log("CruiseSelectComponent did update, N3");
		// console.log("allCruise",this.state.allCruise);
		// console.log("currentDisplayedValues", this.state.currentDisplayedValues);
	},

	findCruise(cruiseNr,allCruise)
	{
		var cruiseName = "";
		for(var a = 0 ; a<allCruise.length ; a++)
		{
			for(var b = 0 ; b<allCruise[a].data.length ; b++)
			{
				if(allCruise[a].data[b].name == cruiseNr)
				{
					cruiseName = allCruise[a].cruise;
					return cruiseName;
				}
			}
		}
		return cruiseName;
	},

	handleGiveValue(arg)
	{
		// console.log(this.state.allCruise);
		if(arg == null) 
		{
			this.setState({currentDisplayedValues : []});
			this.props.giveValue([]);
		}
		else if (arg.length > 0)
		{
			var tempResponse = [];
			for(var i=0; i<arg.split(",").length ; i++) // for each cruiseNr selected, we try to find the cruiseName linked to it
			{
				tempResponse.push({cruiseNr : arg.split(",")[i], cruise : this.findCruise(arg.split(",")[i],this.state.allCruise)});
			}
			this.setState({currentDisplayedValues : arg.split(",")});
			this.props.giveValue(tempResponse);
		}
	},

	handleRemoveState(arg)
	{
		if(arg[0]) // the labels have been removed
		{
			this.setState({remove : false, currentDisplayedValues: arg[1].split(",")});
		}
	},

	render(){
			return(
				<div>
					<MultiSelectField incomingData={this.state.displayArray} loading={this.state.loading} giveValue={this.handleGiveValue} valuesRemoved={this.handleRemoveState} doRemove={[this.state.remove,this.state.labelsToRemove]}/>
				</div>		
			);
		
	}
});